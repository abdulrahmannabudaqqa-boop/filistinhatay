/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { HomePage } from './components/HomePage';
import { ImportantLinks } from './components/ImportantLinks';
import { LoginModal } from './components/LoginModal';

// Dynamic lazy-loaded components for optimal bundle splitting
const NewsSection = lazy(() => import('./components/NewsSection').then(m => ({ default: m.NewsSection })));
const CoursesSection = lazy(() => import('./components/CoursesSection').then(m => ({ default: m.CoursesSection })));
const ActivitiesSection = lazy(() => import('./components/ActivitiesSection').then(m => ({ default: m.ActivitiesSection })));
const PastActivitiesSection = lazy(() => import('./components/PastActivitiesSection').then(m => ({ default: m.PastActivitiesSection })));
const UniversityInfoSection = lazy(() => import('./components/UniversityInfoSection').then(m => ({ default: m.UniversityInfoSection })));
const ResidencySection = lazy(() => import('./components/ResidencySection').then(m => ({ default: m.ResidencySection })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(m => ({ default: m.AdminPanel })));
const DeptAnnouncementsSection = lazy(() => import('./components/DeptAnnouncementsSection').then(m => ({ default: m.DeptAnnouncementsSection })));
const DirectorySection = lazy(() => import('./components/DirectorySection').then(m => ({ default: m.DirectorySection })));

// @ts-ignore
import logoImg from './assets/images/logo.jpeg';

import { 
  NewsItem, CourseItem, DeptAnnouncementItem, ActivityItem, ImportantLink, 
  UniversityInfo, TopAnnouncement, DirectoryMember 
} from './types';

import { 
  initialNews, initialCourses, initialDeptAnnouncements, initialActivities, 
  initialImportantLinks, initialUniversityInfo, initialAnnouncements,
  initialDirectoryMembers
} from './data/initialData';

import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Sanitize all data recursively before sending to Firestore to guarantee no undefined fields are passed
function sanitizeForFirestore(obj: any): any {
  if (obj === undefined) return null;
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeForFirestore(item));
  }
  const clean: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = sanitizeForFirestore(value);
    } else {
      clean[key] = '';
    }
  }
  return clean;
}

function AppMain() {
  const { t, dir } = useLanguage();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pales_union_admin_logged') === 'true';
  });

  const [logo, setLogo] = useState<string>(() => {
    return localStorage.getItem('pales_union_custom_logo') || logoImg;
  });

  // Main Persistent States initialized directly and synchronously from local storage or initial values
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_news');
      return saved ? JSON.parse(saved) : initialNews;
    } catch (e) {
      return initialNews;
    }
  });

  const [directoryMembers, setDirectoryMembers] = useState<DirectoryMember[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_directory_members');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialDirectoryMembers;
      }
      return initialDirectoryMembers;
    } catch (e) {
      return initialDirectoryMembers;
    }
  });

  const [courses, setCourses] = useState<CourseItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_courses');
      return saved ? JSON.parse(saved) : initialCourses;
    } catch (e) {
      return initialCourses;
    }
  });

  const [deptAnnouncements, setDeptAnnouncements] = useState<DeptAnnouncementItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_dept_announcements');
      return saved ? JSON.parse(saved) : initialDeptAnnouncements;
    } catch (e) {
      return initialDeptAnnouncements;
    }
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_activities');
      return saved ? JSON.parse(saved) : initialActivities;
    } catch (e) {
      return initialActivities;
    }
  });

  const [links, setLinks] = useState<ImportantLink[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_links');
      return saved ? JSON.parse(saved) : initialImportantLinks;
    } catch (e) {
      return initialImportantLinks;
    }
  });

  const [univInfo, setUnivInfo] = useState<UniversityInfo>(() => {
    try {
      const saved = localStorage.getItem('pales_union_univ_info');
      return saved ? JSON.parse(saved) : initialUniversityInfo;
    } catch (e) {
      return initialUniversityInfo;
    }
  });

  const [announcements, setAnnouncements] = useState<TopAnnouncement[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_announcements');
      return saved ? JSON.parse(saved) : initialAnnouncements;
    } catch (e) {
      return initialAnnouncements;
    }
  });

  const [assistants, setAssistants] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('pales_union_assistants');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Helper to save updates to Firestore with merge capability and local cache sync
  const saveToFirestore = async (updates: any) => {
    try {
      const sanitized = sanitizeForFirestore(updates);
      const docRef = doc(db, 'portal_data', 'global_settings');
      await setDoc(docRef, sanitized, { merge: true });
      console.log('Saved to Firestore successfully across devices:', Object.keys(updates));
      return true;
    } catch (err) {
      console.error('Failed to save to Firestore:', err);
      return false;
    }
  };

  // Real-time bidirectional synchronization with Firestore across all devices and tabs
  useEffect(() => {
    const docRef = doc(db, 'portal_data', 'global_settings');
    
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      try {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const missingFieldsToSeed: Record<string, any> = {};

          if (data.news && Array.isArray(data.news)) {
            setNews(data.news);
            localStorage.setItem('pales_union_news', JSON.stringify(data.news));
          } else {
            missingFieldsToSeed.news = initialNews;
          }

          if (data.directoryMembers && Array.isArray(data.directoryMembers)) {
            setDirectoryMembers(data.directoryMembers);
            localStorage.setItem('pales_union_directory_members', JSON.stringify(data.directoryMembers));
          } else {
            // Automatically initialize directory members in Firestore if not present yet
            missingFieldsToSeed.directoryMembers = initialDirectoryMembers;
            setDirectoryMembers(initialDirectoryMembers);
            localStorage.setItem('pales_union_directory_members', JSON.stringify(initialDirectoryMembers));
          }

          if (data.courses && Array.isArray(data.courses)) {
            setCourses(data.courses);
            localStorage.setItem('pales_union_courses', JSON.stringify(data.courses));
          } else {
            missingFieldsToSeed.courses = initialCourses;
          }

          if (data.deptAnnouncements && Array.isArray(data.deptAnnouncements)) {
            setDeptAnnouncements(data.deptAnnouncements);
            localStorage.setItem('pales_union_dept_announcements', JSON.stringify(data.deptAnnouncements));
          } else {
            missingFieldsToSeed.deptAnnouncements = initialDeptAnnouncements;
          }

          if (data.activities && Array.isArray(data.activities)) {
            setActivities(data.activities);
            localStorage.setItem('pales_union_activities', JSON.stringify(data.activities));
          } else {
            missingFieldsToSeed.activities = initialActivities;
          }

          if (data.links && Array.isArray(data.links)) {
            setLinks(data.links);
            localStorage.setItem('pales_union_links', JSON.stringify(data.links));
          } else {
            missingFieldsToSeed.links = initialImportantLinks;
          }

          if (data.univInfo) {
            setUnivInfo(data.univInfo);
            localStorage.setItem('pales_union_univ_info', JSON.stringify(data.univInfo));
          } else {
            missingFieldsToSeed.univInfo = initialUniversityInfo;
          }

          if (data.announcements && Array.isArray(data.announcements)) {
            setAnnouncements(data.announcements);
            localStorage.setItem('pales_union_announcements', JSON.stringify(data.announcements));
          } else {
            missingFieldsToSeed.announcements = initialAnnouncements;
          }

          if (data.logo) {
            setLogo(data.logo);
            localStorage.setItem('pales_union_custom_logo', data.logo);
          }

          if (data.assistants && Array.isArray(data.assistants)) {
            setAssistants(data.assistants);
            localStorage.setItem('pales_union_assistants', JSON.stringify(data.assistants));
          }

          // If any column/field was missing in Firestore, sync it immediately
          if (Object.keys(missingFieldsToSeed).length > 0) {
            console.log('Seeding missing columns/fields in Firestore database:', Object.keys(missingFieldsToSeed));
            await setDoc(docRef, sanitizeForFirestore(missingFieldsToSeed), { merge: true });
          }
        } else {
          // Document does not exist yet (first-time deployment). Let's seed it.
          const seedPayload = {
            news: initialNews,
            directoryMembers: initialDirectoryMembers,
            courses: initialCourses,
            deptAnnouncements: initialDeptAnnouncements,
            activities: initialActivities,
            links: initialImportantLinks,
            univInfo: initialUniversityInfo,
            announcements: initialAnnouncements,
            logo: logoImg,
            assistants: []
          };
          await setDoc(docRef, sanitizeForFirestore(seedPayload));
        }
      } catch (err) {
        console.error('Error in Firestore real-time listener handler:', err);
      }
    }, (error) => {
      console.error('Firestore snapshot listener failed:', error);
    });

    return () => unsubscribe();
  }, []);

  // Ensure the default tab is always 'home' upon entering the website, while supporting in-page navigation
  useEffect(() => {
    // When a user visits the website root or refreshes without explicit navigation intent, ensure home is set
    const handleUrlTab = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const hashParam = window.location.hash.replace('#', '');
      
      const target = tabParam || hashParam;
      const validTabs = ['home', 'directory', 'news', 'links', 'courses', 'deptAnnouncements', 'activities', 'pastActivities', 'university', 'residency', 'admin'];
      if (target && validTabs.includes(target)) {
        setCurrentTab(target);
      } else {
        setCurrentTab('home');
      }
    };

    handleUrlTab();
    window.addEventListener('popstate', handleUrlTab);
    return () => window.removeEventListener('popstate', handleUrlTab);
  }, []);

  // Keep browser URL query param in sync with active tab
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (currentTab === 'home') {
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('tab', currentTab);
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn('Could not sync URL state:', e);
    }
  }, [currentTab]);

  // Sync helpers with local storage and Firestore to persist modifications globally
  const updateNewsState = (newNews: NewsItem[]) => {
    setNews(newNews);
    localStorage.setItem('pales_union_news', JSON.stringify(newNews));
    saveToFirestore({ news: newNews });
  };

  const updateDirectoryMembersState = (newMembers: DirectoryMember[]) => {
    setDirectoryMembers(newMembers);
    localStorage.setItem('pales_union_directory_members', JSON.stringify(newMembers));
    saveToFirestore({ directoryMembers: newMembers });
  };

  const updateCoursesState = (newCourses: CourseItem[]) => {
    setCourses(newCourses);
    localStorage.setItem('pales_union_courses', JSON.stringify(newCourses));
    saveToFirestore({ courses: newCourses });
  };

  const updateDeptAnnState = (newDeptAnns: DeptAnnouncementItem[]) => {
    setDeptAnnouncements(newDeptAnns);
    localStorage.setItem('pales_union_dept_announcements', JSON.stringify(newDeptAnns));
    saveToFirestore({ deptAnnouncements: newDeptAnns });
  };

  const updateActivitiesState = (newActs: ActivityItem[]) => {
    setActivities(newActs);
    localStorage.setItem('pales_union_activities', JSON.stringify(newActs));
    saveToFirestore({ activities: newActs });
  };

  const updateLinksState = (newLinks: ImportantLink[]) => {
    setLinks(newLinks);
    localStorage.setItem('pales_union_links', JSON.stringify(newLinks));
    saveToFirestore({ links: newLinks });
  };

  const updateUnivState = (newUniv: UniversityInfo) => {
    setUnivInfo(newUniv);
    localStorage.setItem('pales_union_univ_info', JSON.stringify(newUniv));
    saveToFirestore({ univInfo: newUniv });
  };

  const updateAnnState = (newAnns: TopAnnouncement[]) => {
    setAnnouncements(newAnns);
    localStorage.setItem('pales_union_announcements', JSON.stringify(newAnns));
    saveToFirestore({ announcements: newAnns });
  };

  const updateAssistantsState = (newAssistants: any[]) => {
    setAssistants(newAssistants);
    localStorage.setItem('pales_union_assistants', JSON.stringify(newAssistants));
    saveToFirestore({ assistants: newAssistants });
  };

  // ADMIN OPERATIONS: NEWS
  const handleSaveNewsItem = (item: NewsItem) => {
    const exists = news.some(n => n.id === item.id);
    let updatedNews: NewsItem[];
    if (exists) {
      updatedNews = news.map(n => n.id === item.id ? item : n);
    } else {
      updatedNews = [item, ...news];
    }
    updateNewsState(updatedNews);
  };

  const handleDeleteNewsItem = (id: string) => {
    const updatedNews = news.filter(n => n.id !== id);
    updateNewsState(updatedNews);
  };

  // ADMIN OPERATIONS: DIRECTORY MEMBERS
  const handleSaveDirectoryMemberItem = (item: DirectoryMember) => {
    const exists = directoryMembers.some(m => m.id === item.id);
    let updated: DirectoryMember[];
    if (exists) {
      updated = directoryMembers.map(m => m.id === item.id ? item : m);
    } else {
      updated = [item, ...directoryMembers];
    }
    updateDirectoryMembersState(updated);
  };

  const handleDeleteDirectoryMemberItem = (id: string) => {
    const updated = directoryMembers.filter(m => m.id !== id);
    updateDirectoryMembersState(updated);
  };

  // ADMIN OPERATIONS: COURSES
  const handleSaveCourseItem = (item: CourseItem) => {
    const exists = courses.some(c => c.id === item.id);
    let updatedCourses: CourseItem[];
    if (exists) {
      updatedCourses = courses.map(c => c.id === item.id ? item : c);
    } else {
      updatedCourses = [item, ...courses];
    }
    updateCoursesState(updatedCourses);
  };

  const handleDeleteCourseItem = (id: string) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    updateCoursesState(updatedCourses);
  };

  // ADMIN OPERATIONS: DEPARTMENT ANNOUNCEMENTS
  const handleSaveDeptAnnItem = (item: DeptAnnouncementItem) => {
    const exists = deptAnnouncements.some(d => d.id === item.id);
    let updatedDeptAnns: DeptAnnouncementItem[];
    if (exists) {
      updatedDeptAnns = deptAnnouncements.map(d => d.id === item.id ? item : d);
    } else {
      updatedDeptAnns = [item, ...deptAnnouncements];
    }
    updateDeptAnnState(updatedDeptAnns);
  };

  const handleDeleteDeptAnnItem = (id: string) => {
    const updatedDeptAnns = deptAnnouncements.filter(d => d.id !== id);
    updateDeptAnnState(updatedDeptAnns);
  };

  // ADMIN OPERATIONS: ACTIVITIES
  const handleSaveActivityItem = (item: ActivityItem) => {
    const exists = activities.some(a => a.id === item.id);
    let updatedActs: ActivityItem[];
    if (exists) {
      updatedActs = activities.map(a => a.id === item.id ? item : a);
    } else {
      updatedActs = [item, ...activities];
    }
    updateActivitiesState(updatedActs);
  };

  const handleDeleteActivityItem = (id: string) => {
    const updatedActs = activities.filter(a => a.id !== id);
    updateActivitiesState(updatedActs);
  };

  // ADMIN OPERATIONS: LINKS
  const handleSaveLinkItem = (item: ImportantLink) => {
    const exists = links.some(l => l.id === item.id);
    let updatedLinks: ImportantLink[];
    if (exists) {
      updatedLinks = links.map(l => l.id === item.id ? item : l);
    } else {
      updatedLinks = [item, ...links];
    }
    updateLinksState(updatedLinks);
  };

  const handleDeleteLinkItem = (id: string) => {
    const updatedLinks = links.filter(l => l.id !== id);
    updateLinksState(updatedLinks);
  };

  // ADMIN OPERATIONS: ANNOUNCEMENTS
  const handleSaveAnnItem = (item: TopAnnouncement) => {
    const exists = announcements.some(a => a.id === item.id);
    let updatedAnns: TopAnnouncement[];
    if (exists) {
      updatedAnns = announcements.map(a => a.id === item.id ? item : a);
    } else {
      updatedAnns = [item, ...announcements];
    }
    updateAnnState(updatedAnns);
  };

  const handleDeleteAnnItem = (id: string) => {
    const updatedAnns = announcements.filter(a => a.id !== id);
    updateAnnState(updatedAnns);
  };

  // STUDENT OPERATION: REGISTER FOR AN EVENT
  const handleRegisterForActivity = (
    activityId: string, 
    regData: { 
      name: string; 
      studentId: string; 
      phone: string; 
      email: string;
      firstName?: string;
      lastName?: string;
      major?: string;
    }
  ): boolean => {
    let success = false;
    const updatedActs = activities.map(act => {
      if (act.id === activityId) {
        if (!act.registrationEnabled) return act;
        if (act.maxSeats && act.registeredCount >= act.maxSeats) return act;
        
        success = true;
        const currentRegs = act.registrations || [];
        return {
          ...act,
          registeredCount: act.registeredCount + 1,
          registrations: [regData, ...currentRegs]
        };
      }
      return act;
    });

    if (success) {
      updateActivitiesState(updatedActs);
    }
    return success;
  };

  // STUDENT OPERATION: REGISTER FOR A COURSE/LESSON
  const handleRegisterForCourse = (
    courseId: string,
    regData: {
      name: string;
      studentId: string;
      phone: string;
      email: string;
      firstName?: string;
      lastName?: string;
      major?: string;
    }
  ): boolean => {
    let success = false;
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        success = true;
        const currentRegs = course.registrations || [];
        return {
          ...course,
          registrations: [regData, ...currentRegs]
        };
      }
      return course;
    });

    if (success) {
      updateCoursesState(updatedCourses);
    }
    return success;
  };

  // NEWS OPERATION: INCREMENT VIEWS COUNTER
  const handleIncrementNewsViews = (id: string) => {
    const updatedNews = news.map(item => {
      if (item.id === id) {
        return { ...item, views: item.views + 1 };
      }
      return item;
    });
    updateNewsState(updatedNews);
  };

  // Admin Logged Status handlers
  const handleLoginSuccess = () => {
    isAdminLoggedInTrue();
  };

  const isAdminLoggedInTrue = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('pales_union_admin_logged', 'true');
    setCurrentTab('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pales_union_admin_logged');
    localStorage.removeItem('pales_union_admin_username');
    if (currentTab === 'admin') {
      setCurrentTab('home');
    }
  };

  const renderActiveSection = () => {
    switch (currentTab) {
      case 'directory':
        return <DirectorySection members={directoryMembers} />;
      case 'news':
        return <NewsSection news={news} incrementViews={handleIncrementNewsViews} />;
      case 'links':
        return <ImportantLinks links={links} />;
      case 'courses':
        return <CoursesSection courses={courses} registerForCourse={handleRegisterForCourse} />;
      case 'deptAnnouncements':
        return <DeptAnnouncementsSection announcements={deptAnnouncements} />;
      case 'activities':
        return (
          <ActivitiesSection 
            activities={activities.filter(a => !a.isPast)} 
            registerForActivity={handleRegisterForActivity} 
          />
        );
      case 'pastActivities':
        return <PastActivitiesSection activities={activities} />;
      case 'university':
        return <UniversityInfoSection info={univInfo} />;
      case 'residency':
        return <ResidencySection />;
      case 'admin':
        return isAdminLoggedIn ? (
          <AdminPanel
            news={news}
            directoryMembers={directoryMembers}
            courses={courses}
            deptAnnouncements={deptAnnouncements}
            activities={activities}
            links={links}
            univInfo={univInfo}
            announcements={announcements}
            logo={logo}
            assistants={assistants}
            onSaveLogo={(newLogo: string) => {
              setLogo(newLogo);
              localStorage.setItem('pales_union_custom_logo', newLogo);
              saveToFirestore({ logo: newLogo });
            }}
            onSaveNews={handleSaveNewsItem}
            onDeleteNews={handleDeleteNewsItem}
            onSaveDirectoryMember={handleSaveDirectoryMemberItem}
            onDeleteDirectoryMember={handleDeleteDirectoryMemberItem}
            onSaveCourse={handleSaveCourseItem}
            onDeleteCourse={handleDeleteCourseItem}
            onSaveDeptAnn={handleSaveDeptAnnItem}
            onDeleteDeptAnn={handleDeleteDeptAnnItem}
            onSaveActivity={handleSaveActivityItem}
            onDeleteActivity={handleDeleteActivityItem}
            onSaveLink={handleSaveLinkItem}
            onDeleteLink={handleDeleteLinkItem}
            onSaveUnivInfo={updateUnivState}
            onSaveAnn={handleSaveAnnItem}
            onDeleteAnn={handleDeleteAnnItem}
            onSaveAssistants={updateAssistantsState}
          />
        ) : (
          <HomePage 
            news={news} 
            activities={activities} 
            links={links} 
            setCurrentTab={setCurrentTab} 
          />
        );
      default:
        return (
          <HomePage 
            news={news} 
            activities={activities} 
            links={links} 
            setCurrentTab={setCurrentTab} 
          />
        );
    }
  };

  return (
    <div id="pales-union-portal-root" className="min-h-screen flex flex-col bg-geometric-pattern font-sans antialiased text-slate-800 dark:text-slate-100 relative transition-colors">
      
      {/* Decorative top gold lining */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-red-700 to-amber-500 w-full" />

      {/* Top Announcements Ticker */}
      <AnnouncementBanner announcements={announcements} />

      {/* Main Header / Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
        onOpenLogin={() => setIsLoginOpen(true)}
        logo={logo}
      />

      {/* Main Page Canvas Stage */}
      <main id="app-main-content-stage" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[350px] py-12">
            <div className="w-10 h-10 border-3 border-emerald-600 dark:border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              {t('loading') || 'جارٍ التحميل...'}
            </span>
          </div>
        }>
          {renderActiveSection()}
        </Suspense>
      </main>

      {/* Shared Footer component */}
      <Footer logo={logo} univInfo={univInfo} />

      {/* Admin Login Dialog */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        assistants={assistants}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppMain />
      </LanguageProvider>
    </ThemeProvider>
  );
}

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getLiveUniversityNews, callGroqChat, stripUrls, UniversityNewsItem } from './server/groqService';

const PORT = 3000;

// Initialize Firebase Web SDK
let db: any = null;
try {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(firebaseConfigPath)) {
    const config = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf8'));
    const app = initializeApp(config);
    if (config.firestoreDatabaseId) {
      db = getFirestore(app, config.firestoreDatabaseId);
    } else {
      db = getFirestore(app);
    }
    console.log('Firebase Firestore Web SDK initialized successfully on backend.');
  } else {
    console.warn('firebase-applet-config.json not found, falling back to local file storage.');
  }
} catch (error) {
  console.error('Failed to initialize Firebase on backend:', error);
}

// Lazy initialization of Gemini client
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiInstance = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }
  return aiInstance;
}

// Fallback high-quality translated news
const fallbackNews: UniversityNewsItem[] = [
  {
    id: 'iste-news-fallback-1',
    titleTr: 'Uluslararası Öğrenci Başvuruları Başladı!',
    titleAr: 'بدء استقبال طلبات الطلاب الدوليين في جامعة İSTE!',
    contentTr: 'İskenderun Teknik Üniversitesi 2026-2027 akademik yılı uluslararası öğrenci başvuru süreci resmi olarak başlamıştır. Adaylar online sistem üzerinden belgelerini teslim edebilirler.',
    contentAr: 'بدأت رسمياً عملية تقديم طلبات الطلاب الدوليين في جامعة إسكندرون التقنية للعام الدراسي 2026-2027. يمكن للمرشحين تقديم وثائقهم عبر النظام الإلكتروني مباشرة.',
    date: '2026-06-20',
    categoryTr: 'Uluslararası',
    categoryAr: 'شؤون دولية',
    link: '',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-news-fallback-2',
    titleTr: 'Erasmus+ Öğrenim ve Staj Hareketliliği Sonuçları Açıklandı',
    titleAr: 'إعلان نتائج منح التبادل الطلابي والتدريب Erasmus+',
    contentTr: 'Dış İlişkiler Koordinatörlüğü tarafından yürütülen Erasmus+ programı öğrenim ve staj hareketliliği başvuru sonuçları öğrenci bilgi sisteminde ilan edilmiştir.',
    contentAr: 'أعلن مكتب العلاقات الخارجية عن نتائج طلبات برنامج التبادل الدراسي والتدريب المهني Erasmus+ على نظام معلومات الطلاب.',
    date: '2026-06-18',
    categoryTr: 'Duyuru',
    categoryAr: 'إعلان',
    link: '',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-news-fallback-3',
    titleTr: 'Yabancı Uyruklu Öğrenciler İçin Türkçe Yeterlilik Sınavı',
    titleAr: 'امتحان كفاءة اللغة التركية للطلاب الأجانب (TÖMER)',
    contentTr: 'İSTE TÖMER bünyesinde yeni kayıt yaptıran yabancı uyruklu öğrenciler için Türkçe Yeterlilik Muafiyet Sınavı 1 Temmuz 2026 tarihinde yapılacaktır.',
    contentAr: 'سيعقد امتحان الإعفاء وكفاءة اللغة التركية للطلاب الأجانب المسجلين حديثاً في مركز TÖMER بجامعة İSTE في تاريخ 1 يوليو 2026.',
    date: '2026-06-15',
    categoryTr: 'Sınav Duyuruları',
    categoryAr: 'إعلانات الامتحانات',
    link: '',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-news-fallback-4',
    titleTr: 'Mühendislik Fakültesi Akreditasyon Başarısı',
    titleAr: 'نجاح اعتماد كلية الهندسة بجامعة إسكندرون التقنية',
    contentTr: 'Mühendislik ve Doğa Bilimleri Fakültesi bünyesindeki Bilgisayar, Elektrik-Elektronik ve İnşaat Mühendisliği bölümleri MÜDEK tarafından akredite edilmiştir.',
    contentAr: 'تم اعتماد أقسام هندسة الكمبيوتر، الهندسة الكهربائية والإلكترونية، والهندسة المدنية في كلية الهندسة والعلوم الطبيعية من قبل جمعية تقييم واعتماد البرامج الهندسية MÜDEK.',
    date: '2026-06-10',
    categoryTr: 'Haber',
    categoryAr: 'أخبار',
    link: '',
    isRelevantToForeigners: false
  },
  {
    id: 'iste-news-fallback-5',
    titleTr: 'Teknofest Başvurularında İSTE Projelerine Büyük İlgi',
    titleAr: 'اهتمام كبير بمشاريع جامعة İSTE في طلبات تكنوفست',
    contentTr: 'Türkiye\'nin en büyük teknoloji festivali Teknofest\'e bu yıl İSTE öğrencilerinden rekor sayıda proje başvurusu yapıldı. Takımlarımıza başarılar dileriz.',
    contentAr: 'تم تسجيل رقم قياسي في عدد طلبات المشاريع المقدمة من طلاب جامعة İSTE في مهرجان التكنولوجيا الأكبر في تركيا تكنوفست Teknofest هذا العام. نتمنى التوفيق لفرقنا.',
    date: '2026-06-05',
    categoryTr: 'Haber',
    categoryAr: 'أخبار',
    link: '',
    isRelevantToForeigners: false
  }
];

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Routes for persisting custom portal data
  app.get('/api/site-data', async (req, res) => {
    try {
      const filePath = path.join(process.cwd(), 'site-data.json');
      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Cache latest data to local disk file
            try {
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            } catch (wErr) {}
            return res.json({ success: true, siteData: data });
          }
        } catch (dbErr) {
          console.warn('Firestore getDoc in /api/site-data error, reading local file:', dbErr);
        }
      }

      // Local fallback
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(content);
        return res.json({ success: true, siteData: parsed });
      }
      return res.json({ success: true, siteData: null });
    } catch (err) {
      console.error('Error reading site data:', err);
      res.status(500).json({ success: false, error: 'Failed to read site data' });
    }
  });

  app.post('/api/site-data', async (req, res) => {
    try {
      const updates = req.body;
      const filePath = path.join(process.cwd(), 'site-data.json');
      let currentData: any = {};
      if (fs.existsSync(filePath)) {
        try {
          currentData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {}
      }

      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            currentData = { ...currentData, ...docSnap.data() };
          }
        } catch (e) {
          console.warn('Could not read existing doc before write in /api/site-data:', e);
        }
      }

      // Helper to merge registrations safely without losing existing students
      const mergeRegistrationsSafe = (oldRegs: any[] = [], newRegs: any[] = []) => {
        const map = new Map<string, any>();
        oldRegs.forEach((r: any) => {
          if (!r) return;
          const key = r.id || `${(r.email || '').trim().toLowerCase()}_${(r.phone || '').trim()}_${(r.name || '').trim()}`;
          map.set(key, r);
        });
        newRegs.forEach((r: any) => {
          if (!r) return;
          const key = r.id || `${(r.email || '').trim().toLowerCase()}_${(r.phone || '').trim()}_${(r.name || '').trim()}`;
          // Keep existing registration with date/id if available, or update
          if (map.has(key)) {
            map.set(key, { ...map.get(key), ...r });
          } else {
            map.set(key, r);
          }
        });
        return Array.from(map.values());
      };

      // If courses are updated by admin, do not wipe existing student registrations
      if (Array.isArray(updates.courses) && Array.isArray(currentData.courses)) {
        updates.courses = updates.courses.map((newCourse: any) => {
          const oldCourse = currentData.courses.find((c: any) => c.id === newCourse.id);
          if (oldCourse && Array.isArray(oldCourse.registrations) && oldCourse.registrations.length > 0) {
            const incomingRegs = Array.isArray(newCourse.registrations) ? newCourse.registrations : [];
            const mergedRegs = mergeRegistrationsSafe(oldCourse.registrations, incomingRegs);
            return {
              ...newCourse,
              registrations: mergedRegs,
              registeredCount: Math.max(mergedRegs.length, newCourse.registeredCount || 0, oldCourse.registeredCount || 0)
            };
          }
          return newCourse;
        });
      }

      // If activities are updated by admin, do not wipe existing student registrations
      if (Array.isArray(updates.activities) && Array.isArray(currentData.activities)) {
        updates.activities = updates.activities.map((newAct: any) => {
          const oldAct = currentData.activities.find((a: any) => a.id === newAct.id);
          if (oldAct && Array.isArray(oldAct.registrations) && oldAct.registrations.length > 0) {
            const incomingRegs = Array.isArray(newAct.registrations) ? newAct.registrations : [];
            const mergedRegs = mergeRegistrationsSafe(oldAct.registrations, incomingRegs);
            return {
              ...newAct,
              registrations: mergedRegs,
              registeredCount: Math.max(mergedRegs.length, newAct.registeredCount || 0, oldAct.registeredCount || 0)
            };
          }
          return newAct;
        });
      }

      const mergedData = { ...currentData, ...updates };

      // Save to disk first for durability
      try {
        fs.writeFileSync(filePath, JSON.stringify(mergedData, null, 2), 'utf8');
      } catch (fErr) {
        console.error('Could not write to site-data.json:', fErr);
      }

      // Save to Firestore
      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          await setDoc(docRef, mergedData, { merge: true });
          if (updates.courses) {
            await setDoc(doc(db, 'portal_data', 'courses'), { list: mergedData.courses }, { merge: true });
          }
          if (updates.activities) {
            await setDoc(doc(db, 'portal_data', 'activities'), { list: mergedData.activities }, { merge: true });
          }
        } catch (dbErr) {
          console.error('Firestore save failed in /api/site-data:', dbErr);
        }
      }

      res.json({ success: true, siteData: mergedData });
    } catch (err) {
      console.error('Error saving site data:', err);
      res.status(500).json({ success: false, error: 'Failed to save site data' });
    }
  });

  // Dedicated API Route to register student for a course
  app.post('/api/register-course', async (req, res) => {
    try {
      const { courseId, registration } = req.body;
      if (!courseId || !registration) {
        return res.status(400).json({ success: false, error: 'courseId and registration data required' });
      }

      const filePath = path.join(process.cwd(), 'site-data.json');
      let currentData: any = {};
      if (fs.existsSync(filePath)) {
        try { currentData = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) {}
      }

      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            currentData = { ...currentData, ...docSnap.data() };
          }
        } catch (e) {
          console.warn('Firestore read error in register-course:', e);
        }
      }

      const courses = Array.isArray(currentData.courses) ? currentData.courses : [];
      let updatedCourse: any = null;
      const updatedCourses = courses.map((c: any) => {
        if (c.id === courseId) {
          const currentRegs = Array.isArray(c.registrations) ? c.registrations : [];
          // Deduplicate by email and phone
          const regEmail = (registration.email || '').trim().toLowerCase();
          const regPhone = (registration.phone || '').trim();
          const alreadyExists = currentRegs.some((r: any) => 
            (regEmail && (r.email || '').trim().toLowerCase() === regEmail) ||
            (regPhone && (r.phone || '').trim() === regPhone)
          );

          const newReg = {
            ...registration,
            id: `reg-course-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            registeredAt: new Date().toISOString()
          };

          const mergedRegs = alreadyExists 
            ? currentRegs.map((r: any) => ((regEmail && (r.email || '').trim().toLowerCase() === regEmail) || (regPhone && (r.phone || '').trim() === regPhone)) ? { ...r, ...registration } : r)
            : [newReg, ...currentRegs];

          updatedCourse = {
            ...c,
            registeredCount: mergedRegs.length,
            registrations: mergedRegs
          };
          return updatedCourse;
        }
        return c;
      });

      if (!updatedCourse) {
        return res.status(404).json({ success: false, error: 'Course not found' });
      }

      currentData.courses = updatedCourses;

      try {
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
      } catch (e) {}

      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          await setDoc(docRef, { courses: updatedCourses }, { merge: true });
          await setDoc(doc(db, 'portal_data', 'courses'), { list: updatedCourses }, { merge: true });
        } catch (dbErr) {
          console.error('Firestore save failed in register-course:', dbErr);
        }
      }

      return res.json({ success: true, course: updatedCourse, courses: updatedCourses });
    } catch (err: any) {
      console.error('Error in /api/register-course:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Dedicated API Route to register student for an activity
  app.post('/api/register-activity', async (req, res) => {
    try {
      const { activityId, registration } = req.body;
      if (!activityId || !registration) {
        return res.status(400).json({ success: false, error: 'activityId and registration data required' });
      }

      const filePath = path.join(process.cwd(), 'site-data.json');
      let currentData: any = {};
      if (fs.existsSync(filePath)) {
        try { currentData = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) {}
      }

      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            currentData = { ...currentData, ...docSnap.data() };
          }
        } catch (e) {
          console.warn('Firestore read error in register-activity:', e);
        }
      }

      const activities = Array.isArray(currentData.activities) ? currentData.activities : [];
      let updatedActivity: any = null;
      const updatedActivities = activities.map((a: any) => {
        if (a.id === activityId) {
          const currentRegs = Array.isArray(a.registrations) ? a.registrations : [];
          const regEmail = (registration.email || '').trim().toLowerCase();
          const regPhone = (registration.phone || '').trim();
          const alreadyExists = currentRegs.some((r: any) => 
            (regEmail && (r.email || '').trim().toLowerCase() === regEmail) ||
            (regPhone && (r.phone || '').trim() === regPhone)
          );

          const newReg = {
            ...registration,
            id: `reg-act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            registeredAt: new Date().toISOString()
          };

          const mergedRegs = alreadyExists 
            ? currentRegs.map((r: any) => ((regEmail && (r.email || '').trim().toLowerCase() === regEmail) || (regPhone && (r.phone || '').trim() === regPhone)) ? { ...r, ...registration } : r)
            : [newReg, ...currentRegs];

          updatedActivity = {
            ...a,
            registeredCount: mergedRegs.length,
            registrations: mergedRegs
          };
          return updatedActivity;
        }
        return a;
      });

      if (!updatedActivity) {
        return res.status(404).json({ success: false, error: 'Activity not found' });
      }

      currentData.activities = updatedActivities;

      try {
        fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf8');
      } catch (e) {}

      if (db) {
        try {
          const docRef = doc(db, 'portal_data', 'global_settings');
          await setDoc(docRef, { activities: updatedActivities }, { merge: true });
          await setDoc(doc(db, 'portal_data', 'activities'), { list: updatedActivities }, { merge: true });
        } catch (dbErr) {
          console.error('Firestore save failed in register-activity:', dbErr);
        }
      }

      return res.json({ success: true, activity: updatedActivity, activities: updatedActivities });
    } catch (err: any) {
      console.error('Error in /api/register-activity:', err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // API Route to fetch actual İSTE news scraped live from iste.edu.tr and translated via Gemini/Groq AI
  app.get('/api/university-news', async (req, res) => {
    try {
      const forceRefresh = req.query.refresh === 'true' || req.query.force === 'true';
      const result = await getLiveUniversityNews(forceRefresh);
      const rawData = (result.data && result.data.length > 0) ? result.data : fallbackNews;
      
      const cleanData = rawData.map(item => ({
        ...item,
        titleAr: stripUrls(item.titleAr || ''),
        contentAr: stripUrls(item.contentAr || ''),
        titleTr: stripUrls(item.titleTr || ''),
        contentTr: stripUrls(item.contentTr || ''),
        link: ''
      })).sort((a, b) => {
        if (a.isRelevantToForeigners && !b.isRelevantToForeigners) return -1;
        if (!a.isRelevantToForeigners && b.isRelevantToForeigners) return 1;
        return (b.date || '').localeCompare(a.date || '');
      });

      return res.json({
        success: true,
        source: result.source || 'fallback',
        lastUpdated: result.lastUpdated,
        data: cleanData
      });
    } catch (error) {
      console.error('Error in fetching university news:', error);
      const cleanFallback = fallbackNews.map(item => ({
        ...item,
        titleAr: stripUrls(item.titleAr || ''),
        contentAr: stripUrls(item.contentAr || ''),
        link: ''
      }));
      res.json({ success: true, source: 'fallback-error', data: cleanFallback });
    }
  });

  // General AI translation route powered by Groq AI
  app.post('/api/ai/translate', async (req, res) => {
    try {
      const { text, targetLang = 'ar' } = req.body;
      if (!text) {
        return res.status(400).json({ success: false, error: 'Text is required' });
      }
      const responseText = await callGroqChat([
        {
          role: 'system',
          content: `You are an academic translation assistant for Palestinian and Turkish students. Translate the following text into ${targetLang === 'ar' ? 'clear, professional Arabic' : 'clear Turkish'}. Output only the translation without explanations.`
        },
        { role: 'user', content: text }
      ]);
      res.json({ success: true, translation: responseText });
    } catch (err: any) {
      console.error('AI translation error:', err);
      res.status(500).json({ success: false, error: err.message || 'Translation failed' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Declare vite variable to make it accessible in our custom routing handler
  let vite: any = null;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
  }

  // 1. Helper function to escape HTML attributes for safe meta tag rendering
  function escapeHtmlAttr(str: string): string {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // 2. Helper function to fetch course or activity metadata from Firestore or local fallback
  async function getShareMetadata(tab: string, id: string) {
    let data: any = null;
    try {
      if (db) {
        const docRef = doc(db, 'portal_data', 'global_settings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          data = docSnap.data();
        }
      }
      if (!data) {
        const filePath = path.join(process.cwd(), 'site-data.json');
        if (fs.existsSync(filePath)) {
          data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
      }
    } catch (err) {
      console.error('Error reading site data for metadata:', err);
    }

    if (!data) return null;

    if (tab === 'activities' && data.activities) {
      const activity = data.activities.find((a: any) => a.id === id);
      if (activity) {
        return {
          title: activity.title?.ar || activity.title?.tr || 'فعالية التجمع',
          description: activity.description?.ar || activity.description?.tr || '',
          image: activity.image || '',
          type: 'activity'
        };
      }
    } else if (tab === 'courses' && data.courses) {
      const course = data.courses.find((c: any) => c.id === id);
      if (course) {
        const facultyText = course.faculty?.ar || course.faculty?.tr || '';
        const deptText = course.department?.ar || course.department?.tr || '';
        const defaultDescAr = `مادة تعليمية ومكتبة رقمية تخص قسم ${deptText} في ${facultyText} بجامعة إسكندرون التقنية. تصفح الملفات المرفقة وملفات الدرايف والامتحانات السابقة المحلولة.`;
        return {
          title: course.title?.ar || course.title?.tr || 'مادة تعليمية',
          description: course.description?.ar || course.description?.tr || defaultDescAr,
          image: '',
          type: 'course'
        };
      }
    }
    return null;
  }

  // Helper to serve default logo when no custom image exists or if there is an error
  function serveDefaultLogo(res: any) {
    const localLogoPath = path.join(process.cwd(), 'src', 'assets', 'images', 'logo.jpeg');
    if (fs.existsSync(localLogoPath)) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.sendFile(localLogoPath);
    }
    return res.status(404).send('Not Found');
  }

  // 3. API Route to serve binary images of activities or fallback logo for course sharing
  app.get('/api/share-image', async (req, res) => {
    const { tab, id } = req.query;
    if (!tab || !id) {
      return serveDefaultLogo(res);
    }

    try {
      let data: any = null;
      if (db) {
        const docRef = doc(db, 'portal_data', 'global_settings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          data = docSnap.data();
        }
      }
      if (!data) {
        const filePath = path.join(process.cwd(), 'site-data.json');
        if (fs.existsSync(filePath)) {
          data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
      }

      if (!data) {
        return serveDefaultLogo(res);
      }

      let base64Image = '';

      if (tab === 'activities' && data.activities) {
        const activity = data.activities.find((a: any) => a.id === id);
        if (activity && activity.image) {
          base64Image = activity.image;
        }
      } else if (tab === 'courses' && data.courses) {
        const course = data.courses.find((c: any) => c.id === id);
        if (course && course.image) {
          base64Image = course.image;
        }
      }

      if (!base64Image && data.logo) {
        base64Image = data.logo;
      }

      if (!base64Image) {
        return serveDefaultLogo(res);
      }

      // Convert Base64 data URI to binary buffer
      const matches = base64Image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        if (base64Image.startsWith('http')) {
          return res.redirect(base64Image);
        }
        return serveDefaultLogo(res);
      }

      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');

      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
      return res.send(buffer);
    } catch (error) {
      console.error('Error serving share image:', error);
      return serveDefaultLogo(res);
    }
  });

  // 4. Custom Page Loader to handle dynamic Open Graph tags (dynamic SEO previews for WhatsApp, etc.)
  app.get(['/', '/index.html'], async (req, res, next) => {
    const { tab, id } = req.query;
    
    let templatePath = '';
    if (process.env.NODE_ENV !== 'production') {
      templatePath = path.join(process.cwd(), 'index.html');
    } else {
      templatePath = path.join(process.cwd(), 'dist', 'index.html');
    }

    if (!fs.existsSync(templatePath)) {
      return next();
    }

    try {
      let html = fs.readFileSync(templatePath, 'utf8');

      if (process.env.NODE_ENV !== 'production' && vite) {
        html = await vite.transformIndexHtml(req.url, html);
      }

      // Default values
      let title = 'تجمع الطلاب الفلسطينيين - جامعة إسكندرون التقنية | Filistin Öğrenci Topluluğu - İSTE';
      let description = 'المنصة الرسمية للتمثيل الطلابي والثقافي للطلاب الفلسطينيين في هاتاي بجامعة إسكندرون التقنية. نعمل على مد جسور التواصل الأكاديمي ودعم وتوجيه طلابنا.';
      const host = req.get('host') || 'filistinhatay-gt-tc.vercel.app';
      const protocol = req.secure || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
      const siteUrl = `${protocol}://${host}`;
      let imageUrl = `${siteUrl}/api/share-image`;
      let pageUrl = siteUrl;

      if (tab && id) {
        const metadata = await getShareMetadata(String(tab), String(id));
        if (metadata) {
          title = `${metadata.title} | تجمع الطلاب الفلسطينيين`;
          description = metadata.description || description;
          imageUrl = `${siteUrl}/api/share-image?tab=${tab}&id=${id}`;
          pageUrl = `${siteUrl}?tab=${tab}&id=${id}`;
        }
      }

      const escapedTitle = escapeHtmlAttr(title);
      const escapedDesc = escapeHtmlAttr(description.substring(0, 200));
      const escapedImageUrl = escapeHtmlAttr(imageUrl);
      const escapedPageUrl = escapeHtmlAttr(pageUrl);

      // Replace title tag
      html = html.replace(/<title>.*?<\/title>/gi, `<title>${escapedTitle}</title>`);

      // Strip existing duplicate meta tags from static index.html to ensure clean dynamic injection
      html = html.replace(/<meta\s+property="og:[^"]+"\s+content="[^"]*"\s*\/?>/gi, '');
      html = html.replace(/<meta\s+property="twitter:[^"]+"\s+content="[^"]*"\s*\/?>/gi, '');
      html = html.replace(/<meta\s+name="twitter:[^"]+"\s+content="[^"]*"\s*\/?>/gi, '');
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi, '');

      // Dynamic Open Graph & Twitter meta tags
      const metaBlock = `
    <!-- Dynamic Open Graph / Share Meta Tags by AI Coding Agent -->
    <meta name="description" content="${escapedDesc}" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:image" content="${escapedImageUrl}" />
    <meta property="og:url" content="${escapedPageUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="تجمع الطلاب الفلسطينيين" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapedTitle}" />
    <meta name="twitter:description" content="${escapedDesc}" />
    <meta name="twitter:image" content="${escapedImageUrl}" />
      `;

      if (html.includes('</head>')) {
        html = html.replace('</head>', `${metaBlock}\n  </head>`);
      } else {
        html = html.replace('<head>', `<head>\n${metaBlock}`);
      }

      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } catch (err) {
      console.error('Error rendering dynamic page metadata:', err);
      return next();
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    if (vite) {
      app.use(vite.middlewares);
    }
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import React, { useState, useEffect } from 'react';
import { NewsItem, UniversityNewsItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { initialUniversityNews } from '../data/initialData';
import { 
  Search, Eye, Calendar, Tag, ArrowLeft, Newspaper, 
  Globe, RefreshCw, Sparkles, AlertTriangle, 
  ChevronDown, ChevronUp, Bell, BookOpen, Clock, Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsSectionProps {
  news: NewsItem[];
  incrementViews: (id: string) => void;
  defaultNewsType?: 'union' | 'university';
}

export const NewsSection: React.FC<NewsSectionProps> = ({ 
  news, 
  incrementViews,
  defaultNewsType = 'union' 
}) => {
  const { getText, language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [univCategoryFilter, setUnivCategoryFilter] = useState<string>('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Dual-mode news switcher ('union' = Union News, 'university' = University Website News)
  const [newsType, setNewsType] = useState<'union' | 'university'>(defaultNewsType);
  const [univNews, setUnivNews] = useState<UniversityNewsItem[]>(() => {
    try {
      const cached = localStorage.getItem('pales_union_live_iste_news');
      return cached ? JSON.parse(cached) : initialUniversityNews;
    } catch {
      return initialUniversityNews;
    }
  });
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string | null>(() => {
    return localStorage.getItem('pales_union_live_iste_time') || null;
  });
  const [isLoadingUniv, setIsLoadingUniv] = useState(false);
  const [univError, setUnivError] = useState<string | null>(null);
  const [foreignOnly, setForeignOnly] = useState(true);
  const [expandedTrId, setExpandedTrId] = useState<Record<string, boolean>>({});

  // Extract unique categories for Union News in both languages
  const uniqueCategories = Array.from(new Set(news.map(item => item.category.tr)));

  const handleNewsClick = (item: NewsItem) => {
    incrementViews(item.id);
    setSelectedNews({ ...item, views: item.views + 1 });
  };

  const toggleExpandTr = (id: string) => {
    setExpandedTrId(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchUniversityNews = async (forceRefresh = false) => {
    setIsLoadingUniv(true);
    setUnivError(null);
    try {
      const url = forceRefresh ? '/api/university-news?refresh=true' : '/api/university-news';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setUnivNews(json.data);
        if (json.lastUpdated) {
          setLastUpdatedTime(json.lastUpdated);
          try {
            localStorage.setItem('pales_union_live_iste_time', json.lastUpdated);
          } catch {}
        }
        try {
          localStorage.setItem('pales_union_live_iste_news', JSON.stringify(json.data));
        } catch (e) {
          console.warn('Could not save to localStorage', e);
        }
      } else if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        setUnivNews(json.data);
      }
    } catch (err: any) {
      console.error('Error fetching university announcements:', err);
      setUnivError(language === 'ar' ? 'تعذر الاتصال المباشر حالياً بموقع الجامعة، يتم عرض أحدث البيانات المخزنة مؤقتاً.' : 'Üniversite sitesine doğrudan ulaşılamadı, kayıtlı güncel veriler gösteriliyor.');
    } finally {
      setIsLoadingUniv(false);
    }
  };

  // Automatically fetch university news on initial mount and when university tab is activated
  useEffect(() => {
    fetchUniversityNews(false);
  }, []);

  useEffect(() => {
    if (newsType === 'university' && univNews.length === 0) {
      fetchUniversityNews(false);
    }
  }, [newsType]);

  // Filtering for Union News
  const filteredNews = news.filter((item) => {
    const categoryMatch = selectedCategory === 'all' || item.category.tr === selectedCategory;
    const titleMatch = getText(item.title).toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = getText(item.content).toLowerCase().includes(searchTerm.toLowerCase());
    const tagsMatch = item.tags.some(tag => getText(tag).toLowerCase().includes(searchTerm.toLowerCase()));
    
    return categoryMatch && (titleMatch || contentMatch || tagsMatch);
  });

  // Filtering for University News
  const filteredUnivNews = univNews
    .filter((item) => {
      if (foreignOnly && !item.isRelevantToForeigners) {
        return false;
      }
      // Category filter
      if (univCategoryFilter !== 'all') {
        if (univCategoryFilter === 'ogrenci' && !item.categoryTr.includes('Öğrenci')) return false;
        if (univCategoryFilter === 'yabanci_dil' && !item.categoryTr.includes('Yabancı Dil') && !item.categoryTr.includes('Sınav')) return false;
        if (univCategoryFilter === 'haber' && item.categoryTr !== 'Haber') return false;
        if (univCategoryFilter === 'genel' && !item.categoryTr.includes('Genel') && item.categoryTr === 'Haber') return false;
      }

      const term = searchTerm.toLowerCase();
      if (!term) return true;

      return (
        item.titleTr.toLowerCase().includes(term) ||
        item.titleAr.toLowerCase().includes(term) ||
        item.contentTr.toLowerCase().includes(term) ||
        item.contentAr.toLowerCase().includes(term) ||
        item.categoryTr.toLowerCase().includes(term) ||
        item.categoryAr.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => {
      // Prioritize announcements relevant to foreign students first
      if (a.isRelevantToForeigners && !b.isRelevantToForeigners) return -1;
      if (!a.isRelevantToForeigners && b.isRelevantToForeigners) return 1;
      // Secondary: sort by date newest first
      return b.date.localeCompare(a.date);
    });

  const foreignStudentsCount = univNews.filter(n => n.isRelevantToForeigners).length;

  return (
    <div id="news-section-root" className="space-y-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Page Title & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 text-xs font-extrabold border border-red-200 dark:border-red-900/50">
          <Globe className="w-3.5 h-3.5 text-red-600 animate-pulse" />
          <span>{language === 'ar' ? 'الأخبار والإعلانات الجامعية المباشرة' : 'Üniversite Haber ve Duyuru Merkezi'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2">
          <Newspaper className="w-6 h-6 text-red-600" />
          <span>{t('latestNews')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          {language === 'ar' 
            ? 'تابع جميع مستجدات ونشاطات التجمع الطلابي، بالإضافة إلى الإعلانات الرسمية اللحظية من موقع جامعة إسكندرون التقنية İSTE مترجمة بالذكاء الاصطناعي.'
            : 'Topluluk etkinliklerinin yanı sıra İskenderun Teknik Üniversitesi (İSTE) web sitesinden canlı çekilen resmi duyuruları takip edin.'}
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full"></div>
      </div>

      {/* Modern Main Toggle Bar Switcher (Union News vs University Official) */}
      <div className="flex justify-center select-none">
        <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row gap-1.5 w-full max-w-md">
          <button
            id="toggle-union-news-btn"
            onClick={() => {
              setNewsType('union');
              setSelectedNews(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              newsType === 'union'
                ? 'bg-red-700 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700/60'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>{language === 'ar' ? 'أخبار ونشاطات التجمع' : 'Topluluk Haberleri'}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${newsType === 'union' ? 'bg-red-900/60 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {news.length}
            </span>
          </button>

          <button
            id="toggle-university-news-btn"
            onClick={() => {
              setNewsType('university');
              setSelectedNews(null);
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              newsType === 'university'
                ? 'bg-slate-900 dark:bg-slate-950 text-white shadow-md border border-slate-700'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700/60'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ar' ? 'إعلانات جامعة İSTE' : 'İSTE Resmi Duyuruları'}</span>
            <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedNews ? (
          <motion.div
            key={`${newsType}-list`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Search & Categories Bar */}
            <div className="bg-white dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-2.5 h-4 w-4 text-slate-400`} />
                  <input
                    id="news-search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={newsType === 'university' 
                      ? (language === 'ar' ? 'بحث في إعلانات وأخبار الجامعة (عربي / تركي)...' : 'Duyurularda ara (TR / AR)...')
                      : t('searchPlaceholder')}
                    className={`w-full ${language === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition`}
                  />
                </div>

                {/* University News Control Actions */}
                {newsType === 'university' && (
                  <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                    {/* Foreign only toggle */}
                    <button
                      id="toggle-foreign-only-btn"
                      onClick={() => setForeignOnly(!foreignOnly)}
                      className={`px-3 py-1.5 text-xs font-extrabold rounded-xl transition border flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        foreignOnly
                          ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'ar' ? 'يخص الطلاب الدوليين فقط' : 'Yalnızca Uluslararası Öğrenciler'}</span>
                      <span className="bg-amber-400/30 text-amber-900 dark:text-amber-200 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                        {foreignStudentsCount}
                      </span>
                    </button>

                    {/* Refresh Button */}
                    <button
                      id="refresh-univ-news-btn"
                      onClick={() => fetchUniversityNews(true)}
                      disabled={isLoadingUniv}
                      className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-extrabold shadow-sm transition flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUniv ? 'animate-spin' : ''}`} />
                      <span>{isLoadingUniv 
                        ? (language === 'ar' ? 'جاري المزامنة...' : 'Senkronize ediliyor...')
                        : (language === 'ar' ? 'تحديث فوري من موقع الجامعة' : 'Siteden Canlı Güncelle')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Category Pills Filters */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] font-bold text-slate-400 mr-1 select-none">
                  {language === 'ar' ? 'التصنيف:' : 'Kategori:'}
                </span>

                {newsType === 'union' ? (
                  <>
                    <button
                      id="category-filter-all"
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t('allCategories')}
                    </button>
                    {news.length > 0 && uniqueCategories.map((catTr) => {
                      const correspondingNews = news.find(n => n.category.tr === catTr);
                      const catLabel = correspondingNews ? getText(correspondingNews.category) : catTr;
                      return (
                        <button
                          id={`category-filter-${catTr}`}
                          key={catTr}
                          onClick={() => setSelectedCategory(catTr)}
                          className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                            selectedCategory === catTr
                              ? 'bg-red-700 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {catLabel}
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {[
                      { id: 'all', labelAr: 'جميع الإعلانات والأخبار', labelTr: 'Tümü' },
                      { id: 'ogrenci', labelAr: 'شؤون الطلاب (ÖİDB)', labelTr: 'Öğrenci İşleri' },
                      { id: 'yabanci_dil', labelAr: 'اللغات والامتحانات (YDYO)', labelTr: 'Yabancı Diller & Sınavlar' },
                      { id: 'haber', labelAr: 'أخبار الجامعة (Haberler)', labelTr: 'Üniversite Haberleri' },
                      { id: 'genel', labelAr: 'إعلانات عامة', labelTr: 'Genel Duyurular' }
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setUnivCategoryFilter(cat.id)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                          univCategoryFilter === cat.id
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {language === 'ar' ? cat.labelAr : cat.labelTr}
                      </button>
                    ))}
                  </>
                )}
              </div>

            </div>

            {/* Render Union News list */}
            {newsType === 'union' && (
              filteredNews.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs shadow-sm">
                  {t('noNewsFound')}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map((item, idx) => (
                    <motion.article
                      id={`news-card-${item.id}`}
                      key={item.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => handleNewsClick(item)}
                      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-red-600/40 transition duration-200 cursor-pointer flex flex-col group h-full"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={getText(item.title)}
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute top-2.5 right-2.5 bg-slate-900/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md backdrop-blur border border-white/10">
                          {getText(item.category)}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-4 flex flex-col flex-1 space-y-2.5">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold select-none">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.date}</span>
                          </span>
                          <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-700">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}</span>
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition line-clamp-2 leading-tight">
                          {getText(item.title)}
                        </h3>

                        {/* Content Snippet */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
                          {getText(item.content)}
                        </p>

                        {/* Tags & Read More Action */}
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-2 select-none">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 2).map((tag, tagIdx) => (
                              <span key={tagIdx} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-[9px] font-bold border border-red-100 dark:border-red-900/50">
                                <Tag className="w-2.5 h-2.5 text-red-600" />
                                <span>{getText(tag)}</span>
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] font-bold text-red-600 group-hover:underline flex items-center gap-0.5">
                            {t('readMore')}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )
            )}

            {/* Render Live University News list */}
            {newsType === 'university' && (
              <div className="space-y-6">
                
                {/* Information Header Bar */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-burgundy-950 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-amber-400" />
                      <h3 className="font-extrabold text-sm sm:text-base text-white">
                        {language === 'ar' ? 'إعلانات جامعة إسكندرون التقنية الرسمية (İSTE)' : 'İskenderun Teknik Üniversitesi Resmi Duyuruları'}
                      </h3>
                      <span className="bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <span className="w-1.5 h-1.5 bg-slate-950 rounded-full animate-ping"></span>
                        LIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar' 
                        ? 'يتم سحب هذه الإعلانات لحظياً ومباشرة من البوابة الرسمية للجامعة iste.edu.tr مع الترجمة الذكية الفورية للغة العربية.'
                        : 'Bu duyurular iste.edu.tr adresinden anlık olarak çekilmekte ve yapay zeka ile Türkçe-Arapça sunulmaktadır.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center shrink-0 text-[11px] text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? 'عدد الإعلانات المتاحة:' : 'Mevcut Duyuru:'} <strong>{filteredUnivNews.length}</strong></span>
                  </div>
                </div>

                {/* Non-intrusive offline/fallback warning notice if live API is unavailable */}
                {univError && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 rounded-2xl border border-amber-200 dark:border-amber-900/50 shadow-xs flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="font-semibold">{univError}</span>
                    </div>
                    <button
                      onClick={() => fetchUniversityNews(true)}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[11px] font-extrabold shadow-xs transition shrink-0 cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>{language === 'ar' ? 'إعادة المحاولة' : 'Yeniden Dene'}</span>
                    </button>
                  </div>
                )}

                {isLoadingUniv && univNews.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="w-8 h-8 text-red-600 animate-spin" />
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-bold">
                      {language === 'ar' ? 'جاري الاتصال بموقع جامعة İSTE وسحب أحدث الإعلانات والمزامنة الفورية...' : 'İSTE duyuruları çekiliyor ve yapay zeka ile çevriliyor...'}
                    </span>
                  </div>
                ) : filteredUnivNews.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 text-xs shadow-sm">
                    {t('noNewsFound')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredUnivNews.map((item, idx) => {
                      const isTrExpanded = !!expandedTrId[item.id];
                      const isJustCopied = copiedId === item.id;

                      return (
                        <motion.div
                          id={`univ-news-card-${item.id}`}
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-red-600/30 transition duration-200 p-5 sm:p-6 space-y-4"
                        >
                          {/* Top Badges & Meta Info */}
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-semibold select-none">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200 dark:border-slate-700">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span>{item.date}</span>
                              </span>
                              <span className="bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                                {language === 'ar' ? item.categoryAr : item.categoryTr}
                              </span>
                              {item.categoryTr === 'Haber' && (
                                <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                  Haber
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5">
                              {item.isRelevantToForeigners && (
                                <span className="bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-extrabold px-2.5 py-0.5 rounded-lg text-[11px] flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-amber-600" />
                                  <span>{language === 'ar' ? 'يخص الطلاب الدوليين والأجانب' : 'Uluslararası Öğrencileri İlgilendirir'}</span>
                                </span>
                              )}
                              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>iste.edu.tr</span>
                              </span>
                            </div>
                          </div>

                          {/* Bilingual Titles */}
                          <div className="space-y-1.5">
                            {/* Arabic Title */}
                            <h4 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                              <span className="text-red-600 font-extrabold mr-2 bg-red-50 dark:bg-red-950/50 px-1.5 py-0.5 rounded text-[11px]">
                                AR
                              </span>
                              <span>{item.titleAr}</span>
                            </h4>
                            
                            {/* Turkish Title */}
                            <h5 className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 leading-snug" dir="ltr">
                              <span className="text-slate-400 font-extrabold mr-2 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px]">
                                TR
                              </span>
                              <span>{item.titleTr}</span>
                            </h5>
                          </div>

                          {/* Arabic Content Summary */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                            <div className="flex items-center gap-1 text-[10px] font-extrabold text-red-600 uppercase mb-1">
                              <BookOpen className="w-3 h-3" />
                              <span>{language === 'ar' ? 'ملخص الإعلان الرسمي (عربي):' : 'Arapça Özeti:'}</span>
                            </div>
                            <p className="whitespace-pre-wrap leading-relaxed">{item.contentAr}</p>
                          </div>

                          {/* Toggleable Original Turkish Content */}
                          <div className="space-y-2">
                            <button
                              onClick={() => toggleExpandTr(item.id)}
                              className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition select-none"
                            >
                              <span>{isTrExpanded 
                                ? (language === 'ar' ? 'إخفاء النص التركي الأصلي' : 'Orijinal Türkçe Metni Gizle')
                                : (language === 'ar' ? 'عرض النص التركي الأصلي الكامل' : 'Orijinal Türkçe Metni Göster')}</span>
                              {isTrExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {isTrExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                                dir="ltr"
                              >
                                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Orijinal İSTE Metni:</span>
                                <p className="whitespace-pre-wrap">{item.contentTr}</p>
                              </motion.div>
                            )}
                          </div>

                          {/* Information Footer without external links */}
                          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 select-none text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Building className="w-3.5 h-3.5 text-slate-400" />
                              <span>{language === 'ar' ? 'مصدر الإعلان: موقع جامعة إسكندرون التقنية' : 'Kaynak: İskenderun Teknik Üniversitesi'}</span>
                            </span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400 font-semibold">
                              {language === 'ar' ? 'معتمد رسمياً' : 'Resmi Duyuru'}
                            </span>
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </motion.div>
        ) : (
          /* News Detail View (Only applicable to Local Union News) */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md"
          >
            {/* Header / Back Action */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <button
                id="back-to-news-btn"
                onClick={() => setSelectedNews(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 transition cursor-pointer"
              >
                <ArrowLeft className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
                <span>{t('backToNews')}</span>
              </button>
              <span className="bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                {getText(selectedNews.category)}
              </span>
            </div>

            {/* Image banner */}
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={selectedNews.image}
                alt={getText(selectedNews.title)}
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Core News Info */}
            <div className="p-6 sm:p-8 space-y-4">
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-800 pb-3 select-none">
                <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedNews.date}</span>
                </span>
                <span className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded border border-slate-100 dark:border-slate-700">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedNews.views} {t('newsViews')}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {getText(selectedNews.title)}
              </h1>

              {/* Content Body */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-justify">
                {getText(selectedNews.content)}
              </p>

              {/* Tags block */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-wrap gap-1.5 select-none">
                {selectedNews.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-extrabold border border-slate-200 dark:border-slate-700">
                    <Tag className="w-3 h-3 text-slate-400" />
                    <span>{getText(tag)}</span>
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

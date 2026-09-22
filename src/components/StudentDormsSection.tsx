import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Building,
  MapPin,
  Phone,
  Navigation,
  ExternalLink,
  Search,
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Users,
  Utensils,
  Wifi,
  Flame,
  FileText,
  Info,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Clock,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  iskenderunDormitories,
  dormitoryApplicationSteps,
  rentalTips
} from '../data/dormitoriesData';
import { StudentDormitory, DormitoryGender, DormitoryType } from '../types';

export const StudentDormsSection: React.FC = () => {
  const { language, t } = useLanguage();

  // Helper to extract multilingual text safely
  const getText = (obj: any): string => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.ar || obj.tr || '';
  };

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'dorms' | 'guide' | 'tips'>('dorms');
  const [selectedDormModal, setSelectedDormModal] = useState<StudentDormitory | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy handler
  const handleCopy = (text: string, id: string) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Type filter definitions
  const typeFilters = [
    { id: 'all', label: { ar: 'جميع السكنات', tr: 'Tüm Yurtlar' } },
    { id: 'kyk', label: { ar: 'سكنات KYK الحكومية', tr: 'KYK Devlet Yurtları' } },
    { id: 'apart', label: { ar: 'شقق وأبارت الطلاب', tr: 'Öğrenci Apartları' } },
    { id: 'private', label: { ar: 'سكنات خاصة فاخرة', tr: 'Özel Yurtlar' } }
  ];

  // Gender filter definitions
  const genderFilters = [
    { id: 'all', label: { ar: 'الكل', tr: 'Tümü' } },
    { id: 'male', label: { ar: 'طلاب ذكور (Erkek)', tr: 'Erkek Öğrenci' } },
    { id: 'female', label: { ar: 'طالبات إناث (Kız)', tr: 'Kız Öğrenci' } },
    { id: 'mixed', label: { ar: 'مشترك / شقق', tr: 'Karma / Apart' } }
  ];

  // Filtered Dormitories
  const filteredDorms = useMemo(() => {
    return iskenderunDormitories.filter((dorm) => {
      // Type Filter
      if (selectedType !== 'all' && dorm.type !== selectedType) {
        return false;
      }

      // Gender Filter
      if (selectedGender !== 'all' && dorm.gender !== selectedGender) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameAr = dorm.name.ar?.toLowerCase() || '';
        const nameTr = dorm.name.tr?.toLowerCase() || '';
        const descAr = dorm.description.ar?.toLowerCase() || '';
        const descTr = dorm.description.tr?.toLowerCase() || '';
        const neighAr = dorm.neighborhood.ar?.toLowerCase() || '';
        const neighTr = dorm.neighborhood.tr?.toLowerCase() || '';

        const matches =
          nameAr.includes(q) ||
          nameTr.includes(q) ||
          descAr.includes(q) ||
          descTr.includes(q) ||
          neighAr.includes(q) ||
          neighTr.includes(q);

        if (!matches) return false;
      }

      return true;
    });
  }, [selectedType, selectedGender, searchQuery]);

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-3 sm:px-6 pb-16">
      {/* ===================== HERO SECTION ===================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-burgundy-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold">
            <Home className="w-4 h-4" />
            <span>
              {language === 'ar'
                ? 'جامعة إسكندرون التقنية (İSTE) والمناطق المحيطة'
                : 'İskenderun Teknik Üniversitesi ve Çevresi'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'ar'
              ? 'دليل السكنات الطلابية والشقق في إسكندرون'
              : 'İskenderun Öğrenci Yurtları ve Barınma Rehberi'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            {language === 'ar'
              ? 'دليل شامل ودقيق ومحدث لسكنات KYK الحكومية (ذكور وإناث)، الشقق والأبارت المحيطة بالجامعة، السكنات الخاصة، مع روابط المواقع المباشرة على الخريطة وإرشادات التقديم وتثبيت النفوس.'
              : 'İskenderun\'da okuyan üniversite öğrencileri için KYK devlet yurtları, kampüse yakın apartlar, özel rezidanslar ve harita konumlarıyla eksiksiz barınma rehberi.'}
          </p>

          {/* Quick Counter Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-1.5 font-bold text-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'سكنات KYK معتمدة' : 'Onaylı KYK Yurtları'}</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-1.5 font-bold text-slate-100">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'مواقع دقيقة على Google Maps' : 'Google Harita Konumları'}</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-1.5 font-bold text-slate-100">
              <Utensils className="w-4 h-4 text-red-400" />
              <span>{language === 'ar' ? 'دعم وجبات طعام حكومية' : 'Beslenme Yardımı'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ===================== NAVIGATION TABS ===================== */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('dorms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            activeTab === 'dorms'
              ? 'bg-burgundy-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>{language === 'ar' ? 'قائمة السكنات والشقق' : 'Yurtlar ve Apartlar'}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20">
            {iskenderunDormitories.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-burgundy-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'ar' ? 'خطوات التقديم على KYK' : 'KYK Başvuru Adımları'}</span>
        </button>

        <button
          onClick={() => setActiveTab('tips')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
            activeTab === 'tips'
              ? 'bg-burgundy-700 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'ar' ? 'نصائح عقود الإيجار والنفوس' : 'Kira ve Adres Rehberi'}</span>
        </button>
      </div>

      {/* ===================== TAB 1: DORMS LIST ===================== */}
      {activeTab === 'dorms' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث باسم السكن، الحي، أو نوع الغرف (مثال: ذكور، إناث، KYK، مصطفى كمال)...'
                    : 'Yurt adı, mahalle veya oda tipine göre ara (ör: kız, erkek, KYK, apart)...'
                }
                className="w-full ps-10 pe-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-burgundy-700 dark:focus:ring-red-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Rows: Type and Gender */}
            <div className="space-y-3 pt-1">
              {/* Type Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-extrabold text-slate-500 dark:text-slate-400 me-1 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400" />
                  <span>{language === 'ar' ? 'نوع السكن:' : 'Yurt Tipi:'}</span>
                </span>
                {typeFilters.map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setSelectedType(tf.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      selectedType === tf.id
                        ? 'bg-burgundy-700 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {getText(tf.label)}
                  </button>
                ))}
              </div>

              {/* Gender Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-extrabold text-slate-500 dark:text-slate-400 me-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400" />
                  <span>{language === 'ar' ? 'الفئة:' : 'Kategori:'}</span>
                </span>
                {genderFilters.map((gf) => (
                  <button
                    key={gf.id}
                    onClick={() => setSelectedGender(gf.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                      selectedGender === gf.id
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {getText(gf.label)}
                  </button>
                ))}

                {(selectedType !== 'all' || selectedGender !== 'all' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedGender('all');
                      setSearchQuery('');
                    }}
                    className="text-burgundy-700 dark:text-red-400 hover:underline text-[11px] font-extrabold ms-auto cursor-pointer"
                  >
                    {language === 'ar' ? 'إعادة ضبط' : 'Sıfırla'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-xs sm:text-sm block">
                  {language === 'ar' ? 'معلومة هامة للمغتربين والطلبة الجدد:' : 'Yeni ve Uluslararası Öğrenciler İçin:'}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {language === 'ar'
                    ? 'سكن الذكور الأقرب لمدرجات جامعة İSTE هو "سكن إسكندرون الحكومي - حي ميدان" (مشي 5 دقائق). وللبنات "سكن 5 تموز" (8 دقائق بالباص). وللسكن المستقل، حي مصطفى كمال هو الحي الأكثر ملاصقة للجامعة.'
                    : 'İSTE Merkez kampüsüne en yakın erkek yurdu Meydan KYK yurdudur. Kız öğrenciler için 5 Temmuz Yurdu öne çıkar. Özel apart için Mustafa Kemal Mahallesi kampüse sıfır konumdadır.'}
                </p>
              </div>
            </div>
            <a
              href="https://kyk.gsb.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 transition"
            >
              <span>{language === 'ar' ? 'بوابة GSB الرسمية' : 'GSB Portalı'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* DORMS CARDS GRID */}
          {filteredDorms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDorms.map((dorm) => {
                const isKyk = dorm.type === 'kyk';
                const isMale = dorm.gender === 'male';
                const isFemale = dorm.gender === 'female';

                return (
                  <motion.div
                    key={dorm.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-burgundy-700/40 dark:hover:border-red-500/40 transition duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    <div>
                      {/* Card Image Banner */}
                      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden shrink-0">
                        <img
                          src={dorm.image}
                          alt={getText(dorm.name)}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=70';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-2 z-10 select-none">
                          {/* Type Badge */}
                          <span
                            className={`px-3 py-1 rounded-xl text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 border border-white/10 ${
                              isKyk ? 'bg-red-700' : 'bg-indigo-700'
                            }`}
                          >
                            <Building className="w-3 h-3 text-amber-400" />
                            <span>{getText(dorm.typeLabel)}</span>
                          </span>

                          {/* Gender Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-xl font-bold text-[11px] flex items-center gap-1 border border-white/10 text-white ${
                              isFemale
                                ? 'bg-pink-600/90'
                                : isMale
                                ? 'bg-blue-600/90'
                                : 'bg-slate-800/90'
                            }`}
                          >
                            <Users className="w-3 h-3" />
                            <span>{getText(dorm.genderLabel)}</span>
                          </span>
                        </div>

                        {/* Popular / Campus Proximity Tag */}
                        {dorm.isPopularForStudents && (
                          <div className="absolute bottom-3 start-3 z-10">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>{language === 'ar' ? 'خيار شائع لطلبة İSTE' : 'İSTE Öğrencileri İçin Popüler'}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Dorm Title */}
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-burgundy-700 dark:group-hover:text-red-400 transition-colors">
                          {getText(dorm.name)}
                        </h3>

                        {/* Neighborhood */}
                        <div className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                          <MapPin className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          <span className="font-bold">{getText(dorm.neighborhood)}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                          {getText(dorm.description)}
                        </p>

                        {/* Distance to University */}
                        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                          <Navigation className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400 shrink-0" />
                          <span className="font-bold">{getText(dorm.proximityToUniv)}</span>
                        </div>

                        {/* Capacity and Rooms if available */}
                        {(dorm.capacity || dorm.roomTypes) && (
                          <div className="flex flex-wrap items-center gap-2 text-[11px]">
                            {dorm.capacity && (
                              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold">
                                {language === 'ar' ? `السعة: ${dorm.capacity}` : `Kapasite: ${dorm.capacity}`}
                              </span>
                            )}
                            {dorm.roomTypes && (
                              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold">
                                {getText(dorm.roomTypes)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Top Features */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                            {language === 'ar' ? 'أبرز المزايا والخدمات:' : 'Öne Çıkan Özellikler:'}
                          </span>
                          <div className="space-y-1">
                            {dorm.features.slice(0, 3).map((feat, idx) => (
                              <div
                                key={idx}
                                className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span className="font-medium">{getText(feat)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2.5 bg-slate-50/50 dark:bg-slate-850">
                      {/* Copy Address */}
                      <button
                        onClick={() => handleCopy(getText(dorm.address), dorm.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        title={language === 'ar' ? 'نسخ العنوان' : 'Adresi Kopyala'}
                      >
                        {copiedId === dorm.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 text-[11px] font-extrabold">
                              {language === 'ar' ? 'تم النسخ' : 'Kopyalandı'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{language === 'ar' ? 'العنوان' : 'Adres'}</span>
                          </>
                        )}
                      </button>

                      {/* Phone link if exists */}
                      {dorm.phone && (
                        <a
                          href={`tel:${dorm.phone.replace(/[^0-9]/g, '')}`}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition"
                          title={dorm.phone}
                        >
                          <Phone className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400" />
                          <span className="text-[11px]">{dorm.phone}</span>
                        </a>
                      )}

                      {/* Details Modal Trigger */}
                      <button
                        onClick={() => setSelectedDormModal(dorm)}
                        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold transition cursor-pointer"
                      >
                        {language === 'ar' ? 'التفاصيل' : 'Detaylar'}
                      </button>

                      {/* Google Maps Direct Button */}
                      <a
                        href={dorm.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3.5 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer min-w-[140px]"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>{language === 'ar' ? 'الخريطة' : 'Harita'}</span>
                        <ExternalLink className="w-3 h-3 text-white/80" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold">
              {language === 'ar'
                ? 'لا توجد سكنات مطابقة لمعايير البحث والتصفية المحددة.'
                : 'Arama kriterlerinize uygun yurt bulunamadı.'}
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 2: KYK APPLICATION GUIDE ===================== */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-burgundy-700 dark:text-red-400" />
              <span>
                {language === 'ar'
                  ? 'دليل وخطوات التقديم على سكنات KYK عبر e-Devlet للطلاب'
                  : 'Öğrenciler İçin e-Devlet KYK Yurt Başvuru Rehberi'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'تُشرف وزارة الشباب والرياضة التركية (Gençlik ve Spor Bakanlığı - GSB) على سكنات KYK الحكومية، وتوفر للطلاب المقيمين إقامة مريحة تشمل وجبتين يوميتين مدعومتين وإنترنت مجانياً. إليك الخطوات الرسمية للتسجيل:'
                : 'GSB bünyesindeki KYK yurtları, öğrencilere uygun ücretli barınma ve günlük beslenme desteği sağlar. İşte adım adım başvuru ve kayıt süreci:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dormitoryApplicationSteps.map((step) => (
              <div
                key={step.step}
                className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-burgundy-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {getText(step.title)}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed ps-11">
                  {getText(step.description)}
                </p>
              </div>
            ))}
          </div>

          {/* Required Documents Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h3 className="font-extrabold text-sm sm:text-base text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>
                {language === 'ar'
                  ? 'الأوراق المطلوبة عند تثبيت السكن في إدارة KYK:'
                  : 'Yurda Kesin Kayıt İçin Gerekli Evraklar:'}
              </span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>{language === 'ar' ? 'وثيقة الطالب الفعالة (Öğrenci Belgesi) مستخرجة حديثاً من e-Devlet' : 'Güncel e-Devlet öğrenci belgesi'}</li>
              <li>{language === 'ar' ? 'صورة بطاقة الإقامة (İkamet İzni) أو صورة جواز السفر الرسمي' : 'Kimlik / İkamet belgesi veya pasaport fotokopisi'}</li>
              <li>{language === 'ar' ? '4 صور شخصية بيومترية حديثة' : '4 adet biyometrik vesikalık fotoğraf'}</li>
              <li>{language === 'ar' ? 'إيصال دفع رسوم التأمين الأولى عبر بنك زراعات (Ziraat Dekontu)' : 'Ziraat Bankası ilk kayıt ve güvence bedeli dekontu'}</li>
              <li>{language === 'ar' ? 'الموافقة على وثيقة التعهد الإلكترونية (Taahhütname) عبر e-Devlet' : 'e-Devlet üzerinden onaylanmış taahhütname'}</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===================== TAB 3: RENTAL & ADDRESS TIPS ===================== */}
      {activeTab === 'tips' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-burgundy-700 dark:text-red-400" />
              <span>
                {language === 'ar'
                  ? 'نصائح استئجار الشقق وعقود الإيجار والنفوس في إسكندرون'
                  : 'İskenderun\'da Ev Kiralama, Sözleşme ve Nüfus Adres Rehberi'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'إذا اخترت العيش في شقة خاصة أو استوديو مستقل في أحياء إسكندرون (مثل مصطفى كمال أو موديرن إيفلير)، فإليك أهم النقاط القانونية لضمان حقوقك وحماية إقامتك الطلابية:'
                : 'Öğrenci evi veya özel apart tutarken dikkat edilmesi gereken yasal süreçler ve ikamet için adres tescil adımları:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rentalTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-burgundy-50 dark:bg-burgundy-950/40 text-burgundy-700 dark:text-red-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                    {getText(tip.title)}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {getText(tip.content)}
                </p>
              </div>
            ))}
          </div>

          {/* Direct Government Links for Bills & Address */}
          <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                {language === 'ar' ? 'بوابة تثبيت النفوس الإلكترونية (e-Devlet Adres Bildirimi):' : 'e-Devlet Adres Değişikliği Bildirimi:'}
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                {language === 'ar'
                  ? 'يمكنك حجز موعد في نفوس إسكندرون أو التثبيت الرقمي عبر بوابة الحكومة الإلكترونية.'
                  : 'İskenderun İlçe Nüfus Müdürlüğü randevusu için resmi portali kullanabilirsiniz.'}
              </p>
            </div>
            <a
              href="https://randevu.nvi.gov.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold rounded-xl shadow-xs flex items-center gap-1.5 transition hover:opacity-90"
            >
              <span>{language === 'ar' ? 'حجز موعد النفوس' : 'Nüfus Randevu Portalı'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ===================== DORM DETAILS MODAL ===================== */}
      <AnimatePresence>
        {selectedDormModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative my-6"
            >
              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] bg-slate-950 overflow-hidden">
                <img
                  src={selectedDormModal.image}
                  alt={getText(selectedDormModal.name)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedDormModal(null)}
                  className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title & Badges on Image */}
                <div className="absolute bottom-4 start-4 end-4 z-10 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-burgundy-700 text-white font-extrabold text-[11px]">
                      {getText(selectedDormModal.typeLabel)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/20 backdrop-blur-md text-white font-bold text-[11px]">
                      {getText(selectedDormModal.genderLabel)}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                    {getText(selectedDormModal.name)}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
                {/* Address & Distance */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span className="font-bold">{getText(selectedDormModal.address)}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Navigation className="w-4 h-4 text-burgundy-700 dark:text-red-400 shrink-0 mt-0.5" />
                    <span>{getText(selectedDormModal.proximityToUniv)}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {getText(selectedDormModal.description)}
                </p>

                {/* All Features */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {language === 'ar' ? 'جميع الخدمات والمرافق:' : 'Tüm Olanaklar ve Hizmetler:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDormModal.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{getText(feat)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Application Guide if available */}
                {selectedDormModal.applicationGuide && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 text-xs space-y-1">
                    <span className="font-extrabold block flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                      {language === 'ar' ? 'طريقة التقديم والتسجيل:' : 'Başvuru ve Kayıt Süreci:'}
                    </span>
                    <p className="leading-relaxed">{getText(selectedDormModal.applicationGuide)}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950">
                <button
                  onClick={() => handleCopy(getText(selectedDormModal.address), 'modal')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedId === 'modal' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">{language === 'ar' ? 'تم نسخ العنوان' : 'Adres Kopyalandı'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{language === 'ar' ? 'نسخ العنوان' : 'Adresi Kopyala'}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDormModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {language === 'ar' ? 'إغلاق' : 'Kapat'}
                  </button>

                  <a
                    href={selectedDormModal.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? 'فتح الموقع في Google Maps' : 'Google Harita\'da Aç'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

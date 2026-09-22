import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { iskenderunPlaces, iskenderunWeeklyBazaars } from '../data/iskenderunData';
import { IskenderunPlace, WeeklyBazaar } from '../types';
import {
  MapPin, ShoppingBag, Landmark, Compass, Calendar, Clock,
  ExternalLink, Search, Sparkles, Building2, Check, Copy,
  Navigation, Trees, Eye, Info, CheckCircle2, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IskenderunGuideSection: React.FC = () => {
  const { t, getText, language, dir } = useLanguage();
  const [activeView, setActiveView] = useState<'bazaars' | 'places'>('bazaars');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedPlaceCategory, setSelectedPlaceCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeModalPlace, setActiveModalPlace] = useState<IskenderunPlace | null>(null);

  const daysList: Array<{ id: string; label: { ar: string; tr: string } }> = [
    { id: 'all', label: { ar: 'كل أيام الأسبوع', tr: 'Tüm Günler' } },
    { id: 'monday', label: { ar: 'الإثنين (Pazartesi)', tr: 'Pazartesi' } },
    { id: 'tuesday', label: { ar: 'الثلاثاء (Salı)', tr: 'Salı' } },
    { id: 'wednesday', label: { ar: 'الأربعاء (Çarşamba)', tr: 'Çarşamba' } },
    { id: 'thursday', label: { ar: 'الخميس (Perşembe)', tr: 'Perşembe' } },
    { id: 'friday', label: { ar: 'الجمعة (Cuma)', tr: 'Cuma' } },
    { id: 'saturday', label: { ar: 'السبت (Cumartesi)', tr: 'Cumartesi' } },
    { id: 'sunday', label: { ar: 'الأحد (Pazar)', tr: 'Pazar' } }
  ];

  const placeCategories: Array<{ id: string; label: { ar: string; tr: string } }> = [
    { id: 'all', label: { ar: 'جميع المعالم', tr: 'Tüm Yerler' } },
    { id: 'coast', label: { ar: 'الكورنيش والشواطئ', tr: 'Sahil & Plajlar' } },
    { id: 'park', label: { ar: 'الحدائق والمتنزهات', tr: 'Parklar & Doğal Alanlar' } },
    { id: 'historic', label: { ar: 'المواقع التاريخية والمعمارية', tr: 'Tarihi Yapılar & Külliyeler' } },
    { id: 'museum', label: { ar: 'المتاحف والثقافة', tr: 'Müzeler' } },
    { id: 'landmark', label: { ar: 'الأسواق والمصايف', tr: 'Çarşılar & Yaylalar' } }
  ];

  // Filtered Bazaars
  const filteredBazaars = useMemo(() => {
    return iskenderunWeeklyBazaars.filter((bazaar) => {
      const name = getText(bazaar.name).toLowerCase();
      const hood = getText(bazaar.neighborhood).toLowerCase();
      const details = getText(bazaar.locationDetails).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query || name.includes(query) || hood.includes(query) || details.includes(query);
      const matchesDay = selectedDay === 'all' || bazaar.day === selectedDay;

      return matchesSearch && matchesDay;
    });
  }, [searchQuery, selectedDay, language]);

  // Filtered Places
  const filteredPlaces = useMemo(() => {
    return iskenderunPlaces.filter((place) => {
      const name = getText(place.name).toLowerCase();
      const desc = getText(place.description).toLowerCase();
      const address = getText(place.address).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query || name.includes(query) || desc.includes(query) || address.includes(query);
      const matchesCategory = selectedPlaceCategory === 'all' || place.category === selectedPlaceCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedPlaceCategory, language]);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div id="iskenderun-guide-root" className="space-y-10 animate-fade-in" dir={dir}>
      {/* Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-burgundy-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-amber-500/25 shadow-xl">
        {/* Subtle geometric overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="iskPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="20" cy="20" r="3" fill="#f59e0b" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#iskPattern)" />
          </svg>
        </div>

        {/* Decorative corner tags */}
        <div className="absolute top-4 end-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/40 rounded-tr-xl pointer-events-none hidden sm:block" />
        <div className="absolute bottom-4 start-4 w-12 h-12 border-b-2 border-l-2 border-amber-500/40 rounded-bl-xl pointer-events-none hidden sm:block" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-extrabold shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {language === 'ar' ? 'بيانات معتمدة من بلدية إسكندرون (İskenderun Belediyesi)' : 'İskenderun Belediyesi Resmi Verileri'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'ar'
              ? 'دليل معالم وبازارات مدينة إسكندرون'
              : 'İskenderun Şehir Rehberi & Haftalık Semt Pazarları'}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed text-justify font-medium">
            {language === 'ar'
              ? 'دليل استرشادي شامل لطلاب جامعة إسكندرون التقنية والمقيمين؛ يجمع أهم معالم المدينة الطبيعية، الكورنيش، والحدائق العامة والمتاحف بروابط مواقعها الدقيقة، بالإضافة إلى جدول ومواقع البازارات والأسواق الشعبية الأسبوعية لشراء الخضار والفواكه ومستلزمات المعيشة بأوفر الأسعار.'
              : 'İskenderun Teknik Üniversitesi (İSTE) öğrencileri ve kent sakinleri için hazırlanmış kapsamlı rehber. Sahil kordonu, millet parkı, deniz müzesi gibi simge noktaların harita konumları ile haftanın her günü kurulan mahalle semt pazarlarının güncel takvim ve yerleri.'}
          </p>

          {/* Municipality Links & Quick Info */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <a
              href="https://iskenderun.bel.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/15 transition duration-150"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'بوابة بلدية إسكندرون الرسمية' : 'İskenderun Belediyesi Web Sitesi'}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? '7 أيام من الأسواق الشعبية' : 'Haftanın 7 Günü Semt Pazarı'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mode Toggle Switcher: Bazaars vs Important Places */}
      <div className="flex justify-center select-none">
        <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm flex gap-2 w-full max-w-md">
          <button
            id="view-toggle-bazaars"
            onClick={() => {
              setActiveView('bazaars');
              setSearchQuery('');
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeView === 'bazaars'
                ? 'bg-burgundy-700 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>{language === 'ar' ? 'البازارات الأسبوعية' : 'Haftalık Semt Pazarları'}</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {iskenderunWeeklyBazaars.length}
            </span>
          </button>

          <button
            id="view-toggle-places"
            onClick={() => {
              setActiveView('places');
              setSearchQuery('');
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeView === 'places'
                ? 'bg-burgundy-700 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>{language === 'ar' ? 'أهم الأماكن والمعالم' : 'Önemli Yerler & Parklar'}</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {iskenderunPlaces.length}
            </span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="iskenderun-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeView === 'bazaars'
                ? (language === 'ar' ? 'ابحث عن بازار، حي، أو يوم بالأسبوع...' : 'Pazar adı, mahalle veya gün ara...')
                : (language === 'ar' ? 'ابحث عن حديقة، معلم سياحي، كورنيش، متحف...' : 'Park, sahil, müze veya tarihi yer ara...')
            }
            className="w-full ps-10 pe-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-burgundy-700 dark:focus:ring-red-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Chips based on view */}
        {activeView === 'bazaars' ? (
          <div className="space-y-2 select-none">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400" />
                <span>{language === 'ar' ? 'تصفية حسب يوم البازار:' : 'Güne Göre Filtrele:'}</span>
              </span>
              {(selectedDay !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDay('all');
                    setSearchQuery('');
                  }}
                  className="text-burgundy-700 dark:text-red-400 hover:underline text-[11px] font-bold"
                >
                  {language === 'ar' ? 'إعادة تعيين' : 'Sıfırla'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {daysList.map((day) => {
                const isSelected = selectedDay === day.id;
                return (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-burgundy-700 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {getText(day.label)}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-2 select-none">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400" />
                <span>{language === 'ar' ? 'تصنيف الأماكن:' : 'Kategoriye Göre Filtrele:'}</span>
              </span>
              {(selectedPlaceCategory !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedPlaceCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-burgundy-700 dark:text-red-400 hover:underline text-[11px] font-bold"
                >
                  {language === 'ar' ? 'إعادة تعيين' : 'Sıfırla'}
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {placeCategories.map((cat) => {
                const isSelected = selectedPlaceCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedPlaceCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-burgundy-700 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {getText(cat.label)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CONTENT GRID */}
      {activeView === 'bazaars' ? (
        /* ======================== BAZAARS VIEW ======================== */
        <div className="space-y-6">
          {/* Important Tip Banner for İSTE Students */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold text-xs sm:text-sm block">
                  {language === 'ar' ? 'نصيحة توفير هامة لطلاب İSTE:' : 'İSTE Öğrencileri İçin Önemli Tasarruf İpucu:'}
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  {language === 'ar'
                    ? 'أقرب وأنسب بازار لسكنات وحرم جامعة İSTE هو "بازار السبت في حي مصطفى كمال" (على مسافة 5 دقائق مشياً)، وبازار الأربعاء الكبير في عصمت إينونو لتسوق الملابس والمستلزمات.'
                    : 'Merkez kampüse ve KYK yurtlarına en yakın pazar "Mustafa Kemal Cumartesi Pazarı"dır (yürüyerek 5-10 dk). Kıyafet ve geniş ürün yelpazesi için Çarşamba Pazarı önerilir.'}
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Mustafa+Kemal+Mahallesi+Pazar%C4%B1+%C4%B0skenderun"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1.5 transition"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'موقع بازار الجامعة' : 'Kampüs Pazarı Konumu'}</span>
            </a>
          </div>

          {/* Bazaars List */}
          {filteredBazaars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBazaars.map((bazaar) => {
                const isCampusClosest = bazaar.id === 'bazaar-cumartesi-mustafa-kemal';
                return (
                  <motion.div
                    key={bazaar.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white dark:bg-slate-800 rounded-2xl border-2 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between overflow-hidden group ${
                      isCampusClosest
                        ? 'border-amber-500/70 dark:border-amber-500/50 bg-gradient-to-br from-white via-amber-50/20 to-white dark:from-slate-800 dark:via-amber-950/10 dark:to-slate-800'
                        : 'border-slate-200 dark:border-slate-700 hover:border-burgundy-700/40'
                    }`}
                  >
                    {/* Card Top: Bazaar Photo & Floating Badges */}
                    <div>
                      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden shrink-0">
                        <img
                          src={bazaar.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=70'}
                          alt={getText(bazaar.name)}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=70';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 start-3 end-3 flex items-center justify-between gap-2 z-10 select-none">
                          <span className="px-3 py-1 rounded-xl bg-burgundy-700/90 backdrop-blur-md text-white font-extrabold text-xs shadow-sm flex items-center gap-1.5 border border-white/10">
                            <Calendar className="w-3 h-3 text-amber-400" />
                            <span>{getText(bazaar.dayName)}</span>
                          </span>

                          <span className="px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-slate-200 font-bold text-[11px] flex items-center gap-1 border border-white/10">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span dir="ltr">{bazaar.hours}</span>
                          </span>
                        </div>

                        {/* Special Tag for Closest to Campus */}
                        {isCampusClosest && (
                          <div className="absolute bottom-3 start-3 z-10">
                            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>{language === 'ar' ? 'الأقرب لحرم وسكنات İSTE' : 'İSTE Kampüsüne En Yakın'}</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Bazaar Title */}
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-burgundy-700 dark:group-hover:text-red-400 transition-colors">
                          {getText(bazaar.name)}
                        </h3>

                        {/* Neighborhood / Location & GPS Coordinates */}
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <div className="flex items-start gap-1.5">
                            <MapPin className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                            <span className="font-bold">{getText(bazaar.neighborhood)}</span>
                          </div>
                          {bazaar.coordinates && (
                            <span 
                              className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700/80 flex items-center gap-1 shadow-2xs"
                              title={language === 'ar' ? 'الإحداثيات الجغرافية المباشرة لموقع البازار' : 'Pazar yerinin doğrudan GPS koordinatları'}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                              <span>{bazaar.coordinates.lat.toFixed(4)}, {bazaar.coordinates.lng.toFixed(4)}</span>
                            </span>
                          )}
                        </div>

                        {/* Location Detailed Description */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
                          {getText(bazaar.locationDetails)}
                        </p>

                        {/* Proximity / Distance Note */}
                        {bazaar.proximityToUniv && (
                          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                            <Navigation className="w-3.5 h-3.5 text-burgundy-700 dark:text-red-400 shrink-0" />
                            <span className="font-bold">{getText(bazaar.proximityToUniv)}</span>
                          </div>
                        )}

                        {/* Items sold tags */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                            {language === 'ar' ? 'أبرز ما تجده في البازار:' : 'Pazarda Bulabileceğiniz Ürünler:'}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {bazaar.itemsSold.map((item, itemIdx) => (
                              <span
                                key={itemIdx}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50 flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                <span>{getText(item)}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons: Open in Google Maps */}
                    <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-850">
                      <button
                        onClick={() => handleCopyLink(bazaar.mapUrl, bazaar.id)}
                        className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        title={language === 'ar' ? 'نسخ رابط الموقع' : 'Konum Linkini Kopyala'}
                      >
                        {copiedId === bazaar.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 text-[11px] font-extrabold">
                              {language === 'ar' ? 'تم النسخ!' : 'Kopyalandı!'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px] hidden sm:inline">{language === 'ar' ? 'نسخ' : 'Kopyala'}</span>
                          </>
                        )}
                      </button>

                      <a
                        href={bazaar.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5 text-amber-400" />
                        <span>{language === 'ar' ? 'افتح الموقع على خريطة Google' : 'Google Haritalar\'da Aç'}</span>
                        <ExternalLink className="w-3 h-3 text-white/80" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold">
              {language === 'ar' ? 'لا توجد بازارات تطابق هذا البحث أو اليوم.' : 'Arama kriterlerinize uygun pazar bulunamadı.'}
            </div>
          )}
        </div>
      ) : (
        /* ======================== PLACES & LANDMARKS VIEW ======================== */
        <div className="space-y-6">
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <motion.article
                  key={place.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-burgundy-700/40 transition duration-300 flex flex-col overflow-hidden group justify-between"
                >
                  {/* Top Image + Badges */}
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden">
                      <img
                        src={place.image}
                        alt={getText(place.name)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 end-3 z-10">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-extrabold text-[10px] border border-white/20 shadow-sm">
                          {getText(place.categoryLabel)}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-burgundy-700 dark:group-hover:text-red-400 transition-colors leading-snug">
                        {getText(place.name)}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-justify line-clamp-3">
                        {getText(place.description)}
                      </p>

                      {/* Features */}
                      <div className="space-y-1 pt-1">
                        {place.features.slice(0, 2).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="truncate">{getText(feat)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Address */}
                      <div className="pt-2 text-[11px] text-slate-400 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{getText(place.address)}</span>
                      </div>

                      {/* Student Tip Note (if available) */}
                      {place.tipsForStudents && (
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-[10px] text-amber-900 dark:text-amber-200 space-y-0.5">
                          <span className="font-extrabold block">
                            {language === 'ar' ? '💡 نصيحة للطلاب:' : '💡 Öğrenciye Not:'}
                          </span>
                          <p className="leading-relaxed">{getText(place.tipsForStudents)}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Google Maps Navigation Button */}
                  <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveModalPlace(place)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      title={language === 'ar' ? 'عرض التفاصيل' : 'Detayları İncele'}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="text-[11px]">{language === 'ar' ? 'التفاصيل' : 'Detay'}</span>
                    </button>

                    <a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px]">{language === 'ar' ? 'الموقع على الخريطة' : 'Haritada Gör'}</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 text-slate-400 text-xs font-bold">
              {language === 'ar' ? 'لا توجد أماكن تطابق هذا البحث.' : 'Arama kriterlerinize uygun yer bulunamadı.'}
            </div>
          )}
        </div>
      )}

      {/* DETAIL MODAL FOR PLACES */}
      <AnimatePresence>
        {activeModalPlace && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalPlace(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] bg-slate-900 shrink-0">
                <img
                  src={activeModalPlace.image}
                  alt={getText(activeModalPlace.name)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setActiveModalPlace(null)}
                  className="absolute top-4 end-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 start-5 end-5 space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px]">
                    {getText(activeModalPlace.categoryLabel)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {getText(activeModalPlace.name)}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs sm:text-sm">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                  {getText(activeModalPlace.description)}
                </p>

                {/* Features */}
                <div className="space-y-1.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-150 dark:border-slate-700/60">
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 block text-xs">
                    {language === 'ar' ? 'مميزات ومرافق المكان:' : 'Öne Çıkan Özellikler:'}
                  </span>
                  <div className="space-y-1 pt-1">
                    {activeModalPlace.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{getText(feat)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address & Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      {language === 'ar' ? 'العنوان' : 'Adres'}
                    </span>
                    <p className="font-bold text-slate-700 dark:text-slate-200">{getText(activeModalPlace.address)}</p>
                  </div>

                  {activeModalPlace.workingHours && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-150 dark:border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        {language === 'ar' ? 'ساعات العمل' : 'Çalışma Saatleri'}
                      </span>
                      <p className="font-bold text-slate-700 dark:text-slate-200">{getText(activeModalPlace.workingHours)}</p>
                    </div>
                  )}
                </div>

                {/* Student Tip */}
                {activeModalPlace.tipsForStudents && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-950 dark:text-amber-200 space-y-1 text-xs">
                    <span className="font-extrabold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {language === 'ar' ? 'نصيحة وإرشاد للطلاب:' : 'Öğrenciler İçin Tavsiye:'}
                    </span>
                    <p className="leading-relaxed">{getText(activeModalPlace.tipsForStudents)}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setActiveModalPlace(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {language === 'ar' ? 'إغلاق' : 'Kapat'}
                </button>

                <a
                  href={activeModalPlace.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? 'الانتقال بالخريطة (Google Maps)' : 'Google Haritalar ile Yol Tarifi'}</span>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

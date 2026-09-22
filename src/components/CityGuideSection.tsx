import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CityPlace, CityPlaceCategory } from '../types';
import { 
  MapPin, Coffee, ShoppingBag, Bus, Building2, HeartPulse, Utensils, 
  Search, ExternalLink, Copy, Check, Sparkles, Compass, 
  Wifi, BookOpen, Clock, Phone, Share2, HelpCircle, X, ChevronRight, Info, Calendar, Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CityGuideSectionProps {
  places: CityPlace[];
}

export const CityGuideSection: React.FC<CityGuideSectionProps> = ({ places = [] }) => {
  const { t, getText, language, dir } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const categories: Array<{ id: string; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: t('allPlaces'), icon: <Compass className="w-4 h-4" /> },
    { id: 'bazaars', label: t('catBazaars'), icon: <Store className="w-4 h-4" /> },
    { id: 'cafes', label: t('catCafes'), icon: <Coffee className="w-4 h-4" /> },
    { id: 'districts', label: t('catDistricts'), icon: <Compass className="w-4 h-4" /> },
    { id: 'shopping', label: t('catShopping'), icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'transport', label: t('catTransport'), icon: <Bus className="w-4 h-4" /> },
    { id: 'services', label: t('catServices'), icon: <Building2 className="w-4 h-4" /> },
    { id: 'hospitals', label: t('catHospitals'), icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'food', label: t('catFood'), icon: <Utensils className="w-4 h-4" /> }
  ];

  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameAr = place.name?.ar?.toLowerCase() || '';
      const nameTr = place.name?.tr?.toLowerCase() || '';
      const descAr = place.description?.ar?.toLowerCase() || '';
      const descTr = place.description?.tr?.toLowerCase() || '';
      const districtAr = place.district?.ar?.toLowerCase() || '';
      const districtTr = place.district?.tr?.toLowerCase() || '';
      const addressAr = place.address?.ar?.toLowerCase() || '';
      const addressTr = place.address?.tr?.toLowerCase() || '';
      const tipsAr = place.studentTips?.ar?.toLowerCase() || '';
      const tipsTr = place.studentTips?.tr?.toLowerCase() || '';
      const dayAr = place.operatingDay?.ar?.toLowerCase() || '';
      const dayTr = place.operatingDay?.tr?.toLowerCase() || '';

      return (
        nameAr.includes(q) ||
        nameTr.includes(q) ||
        descAr.includes(q) ||
        descTr.includes(q) ||
        districtAr.includes(q) ||
        districtTr.includes(q) ||
        addressAr.includes(q) ||
        addressTr.includes(q) ||
        tipsAr.includes(q) ||
        tipsTr.includes(q) ||
        dayAr.includes(q) ||
        dayTr.includes(q)
      );
    });
  }, [places, selectedCategory, searchQuery]);

  const handleCopyAddress = (place: CityPlace) => {
    const textToCopy = `${getText(place.name)} - ${getText(place.address)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(place.id);
      setShareToast(t('addressCopied'));
      setTimeout(() => {
        setCopiedId(null);
        setShareToast(null);
      }, 3000);
    });
  };

  const handleSharePlace = (place: CityPlace) => {
    const title = getText(place.name);
    const dayText = place.operatingDay ? `\n${t('operatingDayLabel')}: ${getText(place.operatingDay)}` : '';
    const text = `${title} (${getText(place.district)})${dayText}\n${getText(place.address)}`;
    const url = place.googleMapsUrl || window.location.href;

    if (navigator.share) {
      navigator.share({ title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
        setShareToast(language === 'ar' ? 'تم نسخ معلومات الموقع إلى الحافظة!' : 'Mekan bilgileri panoya kopyalandı!');
        setTimeout(() => setShareToast(null), 3000);
      });
    }
  };

  const getCategoryBadgeColor = (cat: CityPlaceCategory) => {
    switch (cat) {
      case 'bazaars':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';
      case 'cafes':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/50';
      case 'districts':
        return 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/50';
      case 'shopping':
        return 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50';
      case 'transport':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50';
      case 'services':
        return 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50';
      case 'hospitals':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/50';
      case 'food':
        return 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800/50';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getCategoryLabel = (cat: CityPlaceCategory) => {
    switch (cat) {
      case 'bazaars': return t('catBazaars');
      case 'cafes': return t('catCafes');
      case 'districts': return t('catDistricts');
      case 'shopping': return t('catShopping');
      case 'transport': return t('catTransport');
      case 'services': return t('catServices');
      case 'hospitals': return t('catHospitals');
      case 'food': return t('catFood');
      default: return cat;
    }
  };

  const renderFeatureBadge = (feature: string) => {
    switch (feature) {
      case 'wifi':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <Wifi className="w-3 h-3" />
            {t('featWifi')}
          </span>
        );
      case 'study':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
            <BookOpen className="w-3 h-3" />
            {t('featStudy')}
          </span>
        );
      case 'budget':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            <Sparkles className="w-3 h-3" />
            {t('featBudget')}
          </span>
        );
      case 'sea_view':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40">
            <Compass className="w-3 h-3" />
            {t('featSeaView')}
          </span>
        );
      case 'open_late':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40">
            <Clock className="w-3 h-3" />
            {t('featOpenLate')}
          </span>
        );
      case 'bus_stop':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800/40">
            <Bus className="w-3 h-3" />
            {t('featBusStop')}
          </span>
        );
      case 'campus':
        return (
          <span key={feature} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
            <Building2 className="w-3 h-3" />
            {t('featCampus')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div id="city-guide-section" className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold"
          >
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{shareToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-burgundy-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-sm border border-white/15">
            <MapPin className="w-3.5 h-3.5 text-red-400" />
            <span>İskenderun, Hatay • {t('cityGuide')}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            {t('cityGuideTitle')}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {t('cityGuideSub')}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="open-student-guide-modal-btn"
              onClick={() => setIsGuideModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs sm:text-sm font-bold shadow-sm transition transform active:scale-95"
            >
              <Info className="w-4 h-4" />
              <span>{t('readStudentGuide')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Search & Category Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'}`} />
          <input
            id="city-guide-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchCityPlaceholder')}
            className={`w-full py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition ${
              dir === 'rtl' ? 'pr-10 pl-10' : 'pl-10 pr-10'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ${
                dir === 'rtl' ? 'left-3' : 'right-3'
              }`}
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none select-none">
          {categories.map((cat) => (
            <button
              id={`cat-filter-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-burgundy-700 text-white border-burgundy-700 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Status text */}
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            {filteredPlaces.length} {t('placesCount')}
          </span>
          {searchQuery && (
            <span>
              {language === 'ar' ? `نتائج البحث عن "${searchQuery}"` : `"${searchQuery}" için sonuçlar`}
            </span>
          )}
        </div>

        {/* Weekly Bazaars Schedule Quick Bar */}
        {(selectedCategory === 'bazaars' || selectedCategory === 'all') && (
          <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-emerald-800/40 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-emerald-400 shrink-0" />
                <h3 className="font-extrabold text-sm sm:text-base">
                  {t('bazaarScheduleTitle')}
                </h3>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {language === 'ar' ? '7 أيام أسبوعياً' : 'Haftanın 7 Günü'}
              </span>
            </div>

            <p className="text-emerald-100/80 text-xs leading-relaxed">
              {t('bazaarScheduleSub')}
            </p>

            {/* Days grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
              {[
                { dayAr: 'الإثنين', dayTr: 'Pazartesi', placeAr: 'إسمت إينونو', placeTr: 'İsmet İnönü' },
                { dayAr: 'الثلاثاء', dayTr: 'Salı', placeAr: 'بارباروس', placeTr: 'Barbaros' },
                { dayAr: 'الأربعاء', dayTr: 'Çarşamba', placeAr: 'ميدان / ساكاريا', placeTr: 'Meydan' },
                { dayAr: 'الخميس', dayTr: 'Perşembe', placeAr: 'نُمونة والمشافي', placeTr: 'Numune' },
                { dayAr: 'الجمعة', dayTr: 'Cuma', placeAr: 'مودافا إيفلار', placeTr: 'Modernevler' },
                { dayAr: 'السبت', dayTr: 'Cumartesi', placeAr: 'مرادية وبنارباشي', placeTr: 'Muradiye' },
                { dayAr: 'الأحد', dayTr: 'Pazar', placeAr: 'إسنتيبي', placeTr: 'Esentepe' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory('bazaars');
                    setSearchQuery(language === 'ar' ? item.dayAr : item.dayTr);
                  }}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-emerald-600/40 border border-white/15 hover:border-emerald-400/50 transition text-center group cursor-pointer"
                >
                  <span className="text-xs font-black text-emerald-300 group-hover:text-emerald-200">
                    {language === 'ar' ? item.dayAr : item.dayTr}
                  </span>
                  <span className="text-[11px] text-white/90 truncate w-full mt-0.5">
                    {language === 'ar' ? item.placeAr : item.placeTr}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Places Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const isCopied = copiedId === place.id;
            return (
              <div
                id={`city-place-card-${place.id}`}
                key={place.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                {/* Image and Badges */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={place.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'}
                    alt={getText(place.name)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeColor(place.category)}`}>
                      {getCategoryLabel(place.category)}
                    </span>

                    {place.isPopularForStudents && (
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/90 text-white backdrop-blur-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{t('studentPopular')}</span>
                      </span>
                    )}
                  </div>

                  {/* District label in image bottom */}
                  <div className="absolute bottom-2.5 right-3 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{getText(place.district)}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-snug">
                      {getText(place.name)}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {getText(place.description)}
                    </p>
                  </div>

                  {/* Operating Day Highlight if Bazaar */}
                  {place.operatingDay && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{t('operatingDayLabel')}:</span>
                      </div>
                      <span className="font-extrabold px-2.5 py-0.5 rounded-lg bg-emerald-600 text-white text-xs shadow-xs">
                        {t('bazaarDayPrefix')} {getText(place.operatingDay)}
                      </span>
                    </div>
                  )}

                  {/* Features list */}
                  {place.features && place.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {place.features.map(f => renderFeatureBadge(f))}
                    </div>
                  )}

                  {/* Student Tips Highlight Box */}
                  {place.studentTips && (
                    <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                      <div className="flex items-center gap-1 font-bold text-[11px] text-amber-800 dark:text-amber-300">
                        <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span>{t('studentTipsLabel')}:</span>
                      </div>
                      <p className="leading-relaxed">
                        {getText(place.studentTips)}
                      </p>
                    </div>
                  )}

                  {/* Metadata Row: Hours & Address */}
                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                    {place.openingHours && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{t('openingHoursLabel')}: {getText(place.openingHours)}</span>
                      </div>
                    )}

                    {place.address && (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 font-bold text-[11px] text-slate-700 dark:text-slate-200">
                            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{place.category === 'bazaars' ? t('bazaarAddressNote') : t('districtLabel')}:</span>
                          </span>
                          <button
                            id={`copy-address-inline-${place.id}`}
                            type="button"
                            onClick={() => handleCopyAddress(place)}
                            className="text-[10px] font-semibold text-burgundy-700 dark:text-burgundy-400 hover:underline flex items-center gap-0.5 cursor-pointer"
                            title={t('copyAddress')}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">{t('addressCopied')}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>{t('copyAddress')}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                          {getText(place.address)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      id={`maps-link-${place.id}`}
                      href={place.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(getText(place.name) + ' Iskenderun')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-burgundy-700 hover:bg-burgundy-800 text-white text-xs font-bold transition shadow-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t('openInGoogleMaps')}</span>
                    </a>

                    <button
                      id={`copy-address-btn-${place.id}`}
                      type="button"
                      onClick={() => handleCopyAddress(place)}
                      title={t('copyAddress')}
                      className={`p-2 rounded-xl border transition ${
                        isCopied
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      id={`share-place-btn-${place.id}`}
                      type="button"
                      onClick={() => handleSharePlace(place)}
                      title={t('sharePlace')}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <MapPin className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
          <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
            {t('noPlacesFound')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            {language === 'ar'
              ? 'جرّب البحث بكلمة مختلفة أو اختر تصنيفاً آخر لاستعراض الأماكن والمواقع.'
              : 'Farklı bir kelime ile aramayı deneyin veya diğer kategorilere göz atın.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-burgundy-700 text-white text-xs font-bold hover:bg-burgundy-800 transition"
          >
            {language === 'ar' ? 'عرض جميع الأماكن' : 'Tüm Mekanları Göster'}
          </button>
        </div>
      )}

      {/* Comprehensive Student Guide Modal */}
      <AnimatePresence>
        {isGuideModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/70 dark:bg-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-burgundy-700 text-white flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {t('quickStudentGuideModalTitle')}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'إرشادات عملية وحيوية لكل طالب مغترب في إسكندرون' : 'İskenderun\'da okuyan yabancı öğrenciler için pratik yaşam tüyoları'}
                    </p>
                  </div>
                </div>
                <button
                  id="close-guide-modal-btn"
                  onClick={() => setIsGuideModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {/* 1. Hatay Kart */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <Bus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{language === 'ar' ? '1. كارت المواصلات الطلابي المخفض (Öğrenci Hatay Kart)' : '1. İndirimli Öğrenci Hatay Kartı'}</span>
                  </div>
                  <p>
                    {language === 'ar'
                      ? 'يمنحك كارت الطالب خصماً كبيراً على جميع باصات النقل داخل إسكندرون وإلى أنطاكيا. لاستخراجه:'
                      : 'Şehir içi otobüslerde büyük indirim sağlayan öğrenci kartı çıkarmak için:'}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 font-medium">
                    <li>{language === 'ar' ? 'استخرج وثيقة طالب حديثة (Öğrenci Belgesi) من نظام OBS أو e-Devlet.' : 'OBS veya e-Devlet üzerinden güncel Öğrenci Belgesi çıktısı alın.'}</li>
                    <li>{language === 'ar' ? 'صورة شخصية واحدة + صورة بطاقة الإقامة أو الكيملك.' : '1 adet vesikalık fotoğraf ve kimlik/ikamet kartınız.'}</li>
                    <li>{language === 'ar' ? 'توجه إلى كشك بلدية هاتاي عند مواقف الباصات المركزية في ساحة إسكندرون وسوف تستلمه فوراً.' : 'İskenderun Meydanı\'ndaki Hatay Kart merkezine giderek birkaç dakikada kartınızı teslim alın.'}</li>
                  </ul>
                </div>

                {/* 2. Dolmuş Routes */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>{language === 'ar' ? '2. خطوط باصات الدولموش وحرم الجامعة (İSTE Kampüs Dolmuşları)' : '2. Kampüs Dolmuş Hatları & Ulaşım'}</span>
                  </div>
                  <p>
                    {language === 'ar'
                      ? 'تنطلق حافلات الدولموش بشكل دوري ومستمر من بوابة الحرم الجامعي المركزي نحو وسط المدينة (Çarşı)، شارع شهيد بامير، مول بارك فوربس والكورنيش. الأجرة تدفع إما كاش أو بالبطاقة.'
                      : 'Merkez kampüs kapısından Çarşı, Şehit Pamir, Park Forbes AVM ve Sahil yönüne düzenli dolmuşlar çalışmaktadır.'}
                  </p>
                </div>

                {/* 3. Train to Adana & Mersin */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <Compass className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>{language === 'ar' ? '3. قطار إسكندرون الاقتصادي (TCDD Treni)' : '3. Ekonomik Adana ve Mersin Tren Seferleri'}</span>
                  </div>
                  <p>
                    {language === 'ar'
                      ? 'محطة القطار في إسكندرون توفر يومياً رحلات منتظمة ومكيفة نحو دورت يول، عثمانية، أضنة، ومرسين. تذكرة القطار للطلاب تكلفتها منخفضة جداً (حوالي نصف تكلفة باص السفر) وتعد أفضل وسيلة لزيارة أضنة والتسوق أو الوصول لمطار شاكر باشا.'
                      : 'İskenderun Garı\'ndan kalkan bölgesel trenler, öğrencilere %50 indirimli olup Adana ve Mersin\'e seyahat etmenin en ekonomik ve rahat yoludur.'}
                  </p>
                </div>

                {/* 4. Nüfus & Address Registration */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>{language === 'ar' ? '4. تثبيت عنوان السكن في النفوس (Adres Kaydı)' : '4. Nüfus Adres Tescili (Adres Kaydı)'}</span>
                  </div>
                  <p>
                    {language === 'ar'
                      ? 'فور استئجار شقة أو السكن في سكن جامعي، يجب عليك الذهاب إلى مديرية النفوس (İlçe Nüfus Müdürlüğü) في مبنى القائممقامية لتسجيل عنوانك على نظام الدولة. هذا الإجراء ضروري قانونياً لتجنب إيقاف الكيملك أو الإقامة الطلابية.'
                      : 'Yurt veya ev kiraladıktan sonra Hükümet Konağı\'ndaki Nüfus Müdürlüğü\'ne giderek adresinizi tescil ettirmeniz yasal bir zorunluluktur.'}
                  </p>
                </div>

                {/* 5. Health & Emergency */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
                    <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>{language === 'ar' ? '5. الرعاية الصحية والطوارئ والصيدليات المناوبة' : '5. Sağlık Hizmetleri, Acil ve Nöbetçi Eczaneler'}</span>
                  </div>
                  <p>
                    {language === 'ar'
                      ? 'في الحالات الطارئة، توجه مباشرة لقسم الإسعاف في مشفى إسكندرون الحكومي الجديد (مفتوح 24/7 ومجاني للحالات الطارئة). رقم الطوارئ الموحد في كل تركيا هو 112. أما لمعرفة الصيدلية المناوبة ليلاً أو في العطل، ابحث في جوجل أو الخرائط عن "İskenderun Nöbetçi Eczane".'
                      : 'Acil durumlarda İskenderun Devlet Hastanesi Acil Servisi 7/24 hizmet vermektedir. Türkiye genelinde acil çağrı numarası 112\'dir. Gece açık eczaneler için "İskenderun Nöbetçi Eczane" araması yapabilirsiniz.'}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end bg-slate-50/70 dark:bg-slate-800/40">
                <button
                  onClick={() => setIsGuideModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition"
                >
                  {language === 'ar' ? 'إغلاق الدليل' : 'Kapat'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

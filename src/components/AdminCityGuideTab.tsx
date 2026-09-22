import React, { useState } from 'react';
import { CityPlace, CityPlaceCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Plus, Edit2, Trash2, MapPin, Search, ExternalLink, Sparkles, 
  Crop, Eye, Save, X, Coffee, ShoppingBag, Bus, Building2, HeartPulse, Utensils, Compass, Store, Calendar
} from 'lucide-react';
import { compressDataUrl } from '../utils/imageCompressor';

interface AdminCityGuideTabProps {
  places: CityPlace[];
  onSavePlace: (item: CityPlace) => void;
  onDeletePlace: (id: string) => void;
  onOpenCropper?: (
    imageSrc: string,
    setter: (imgUrl: string) => void,
    preset?: 'free' | '16:9' | '4:3' | '1:1' | '3:2',
    title?: string
  ) => void;
  handleImageUpload?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (imgUrl: string) => void,
    preset?: 'free' | '16:9' | '4:3' | '1:1' | '3:2',
    customTitle?: string
  ) => void;
}

export const AdminCityGuideTab: React.FC<AdminCityGuideTabProps> = ({
  places = [],
  onSavePlace,
  onDeletePlace,
  onOpenCropper,
  handleImageUpload
}) => {
  const { t, getText, language, dir } = useLanguage();
  const [editItem, setEditItem] = useState<CityPlace | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: Array<{ id: CityPlaceCategory; labelAr: string; labelTr: string }> = [
    { id: 'bazaars', labelAr: 'البازارات والأسواق الأسبوعية', labelTr: 'Semt Pazarları (Haftalık Pazar)' },
    { id: 'cafes', labelAr: 'المقاهي ومساحات الدراسة', labelTr: 'Çalışma Kafeleri & Kütüphaneler' },
    { id: 'districts', labelAr: 'المناطق والكورنيش والمعالم', labelTr: 'Önemli Bölgeler & Sahil' },
    { id: 'shopping', labelAr: 'مراكز التسوق والأسواق', labelTr: 'AVM & Alışveriş Merkezleri' },
    { id: 'transport', labelAr: 'المواصلات ومحطات السفر', labelTr: 'Toplu Taşıma & Seyahat İstasyonları' },
    { id: 'services', labelAr: 'الدوائر الحكومية والنفوس', labelTr: 'Resmi Kurumlar & Göç/Nüfus' },
    { id: 'hospitals', labelAr: 'المشافي والصحة والطوارئ', labelTr: 'Hastaneler & Acil Sağlık' },
    { id: 'food', labelAr: 'شاورما وأكلات إسكندرون', labelTr: 'Meşhur İskenderun Döneri & Lezzetler' }
  ];

  const availableFeatures: Array<{ id: string; labelAr: string; labelTr: string }> = [
    { id: 'wifi', labelAr: 'واي فاي سريع', labelTr: 'Hızlı Wi-Fi' },
    { id: 'study', labelAr: 'جلسات هادئة للدراسة', labelTr: 'Sessiz Çalışma Alanı' },
    { id: 'budget', labelAr: 'أسعار اقتصادية للطلاب', labelTr: 'Bütçe Dostu Fiyat' },
    { id: 'sea_view', labelAr: 'إطلالة بحرية', labelTr: 'Deniz Manzaralı' },
    { id: 'open_late', labelAr: 'يفتح لساعات متأخرة', labelTr: 'Gece Açık' },
    { id: 'bus_stop', labelAr: 'موقف باص قريب', labelTr: 'Otobüs Durağı Yakını' },
    { id: 'campus', labelAr: 'داخل حرم الجامعة', labelTr: 'Kampüs İçi' }
  ];

  const handleStartEdit = (place?: CityPlace) => {
    if (place) {
      setEditItem(JSON.parse(JSON.stringify(place)));
    } else {
      setEditItem({
        id: `place-${Date.now()}`,
        name: { ar: '', tr: '' },
        category: 'bazaars',
        description: { ar: '', tr: '' },
        address: { ar: '', tr: '' },
        district: { ar: '', tr: '' },
        googleMapsUrl: '',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
        isPopularForStudents: true,
        studentTips: { ar: '', tr: '' },
        openingHours: { ar: '08:00 صباحاً - 19:00 مساءً', tr: '08:00 - 19:00' },
        operatingDay: { ar: '', tr: '' },
        phone: '',
        features: ['budget', 'bus_stop']
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem || !editItem.id) return;

    const arName = editItem.name?.ar?.trim() || editItem.name?.tr?.trim() || '';
    const trName = editItem.name?.tr?.trim() || editItem.name?.ar?.trim() || '';

    if (!arName && !trName) {
      alert(language === 'ar' ? 'يرجى كتابة اسم الموقع أو البازار' : 'Lütfen mekan veya pazar adını giriniz');
      return;
    }

    let finalImage = editItem.image?.trim() || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800';
    if (finalImage.startsWith('data:image')) {
      try {
        finalImage = await compressDataUrl(finalImage, 800, 600, 0.72);
      } catch (err) {
        console.warn('Image optimization fallback:', err);
      }
    }

    const cleanPlace: CityPlace = {
      id: editItem.id,
      name: { ar: arName, tr: trName },
      category: editItem.category || 'cafes',
      description: {
        ar: editItem.description?.ar?.trim() || editItem.description?.tr?.trim() || '',
        tr: editItem.description?.tr?.trim() || editItem.description?.ar?.trim() || ''
      },
      address: {
        ar: editItem.address?.ar?.trim() || editItem.address?.tr?.trim() || '',
        tr: editItem.address?.tr?.trim() || editItem.address?.ar?.trim() || ''
      },
      district: {
        ar: editItem.district?.ar?.trim() || editItem.district?.tr?.trim() || (language === 'ar' ? 'وسط المدينة' : 'Merkez'),
        tr: editItem.district?.tr?.trim() || editItem.district?.ar?.trim() || (language === 'ar' ? 'وسط المدينة' : 'Merkez')
      },
      googleMapsUrl: editItem.googleMapsUrl?.trim() || `https://maps.google.com/?q=${encodeURIComponent(arName + ' Iskenderun')}`,
      image: finalImage,
      isPopularForStudents: !!editItem.isPopularForStudents,
      studentTips: {
        ar: editItem.studentTips?.ar?.trim() || '',
        tr: editItem.studentTips?.tr?.trim() || ''
      },
      openingHours: {
        ar: editItem.openingHours?.ar?.trim() || '',
        tr: editItem.openingHours?.tr?.trim() || ''
      },
      operatingDay: {
        ar: editItem.operatingDay?.ar?.trim() || '',
        tr: editItem.operatingDay?.tr?.trim() || ''
      },
      phone: editItem.phone?.trim() || '',
      features: editItem.features || []
    };

    onSavePlace(cleanPlace);
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirmDelete'))) {
      onDeletePlace(id);
    }
  };

  const toggleFeature = (featId: string) => {
    if (!editItem) return;
    const current = editItem.features || [];
    if (current.includes(featId)) {
      setEditItem({ ...editItem, features: current.filter(f => f !== featId) });
    } else {
      setEditItem({ ...editItem, features: [...current, featId] });
    }
  };

  const filtered = places.filter(place => {
    const matchCat = filterCategory === 'all' || place.category === filterCategory;
    if (!matchCat) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameAr = place.name?.ar?.toLowerCase() || '';
    const nameTr = place.name?.tr?.toLowerCase() || '';
    const distAr = place.district?.ar?.toLowerCase() || '';
    const distTr = place.district?.tr?.toLowerCase() || '';
    const addrAr = place.address?.ar?.toLowerCase() || '';
    const addrTr = place.address?.tr?.toLowerCase() || '';
    const dayAr = place.operatingDay?.ar?.toLowerCase() || '';
    const dayTr = place.operatingDay?.tr?.toLowerCase() || '';
    return nameAr.includes(q) || nameTr.includes(q) || distAr.includes(q) || distTr.includes(q) || addrAr.includes(q) || addrTr.includes(q) || dayAr.includes(q) || dayTr.includes(q);
  });

  return (
    <div id="admin-tab-city-places-content" className="space-y-4 text-xs">
      {editItem ? (
        <form onSubmit={handleSave} className="space-y-4">
          <div className="border-b border-slate-100 pb-2 mb-2 flex justify-between items-center select-none">
            <h3 className="font-extrabold text-sm text-slate-800">
              {editItem.name?.ar ? t('editBtn') : t('addNew')} - {language === 'ar' ? 'دليل إسكندرون' : 'İskenderun Rehberi'}
            </h3>
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="text-slate-400 hover:text-slate-600 text-lg"
            >
              &times;
            </button>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('titleAr')} (اسم المكان بالعربية)</label>
              <input
                id="place-form-name-ar"
                type="text"
                required
                value={editItem.name?.ar || ''}
                onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name!, ar: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="مثال: مقهى كوتوبانيس (Kitabevi Cafe)"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('titleTr')} (Mekan Adı Türkçe)</label>
              <input
                id="place-form-name-tr"
                type="text"
                required
                value={editItem.name?.tr || ''}
                onChange={(e) => setEditItem({ ...editItem, name: { ...editItem.name!, tr: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="Örnek: Kitabevi Kafe & Çalışma Salonu"
              />
            </div>
          </div>

          {/* Category & District */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('categoryAr')} (التصنيف)</label>
              <select
                id="place-form-category"
                value={editItem.category}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value as CityPlaceCategory })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'ar' ? c.labelAr : c.labelTr}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'الحي / المنطقة بالعربية' : 'Bölge / Semt (Arapça)'}</label>
              <input
                type="text"
                value={editItem.district?.ar || ''}
                onChange={(e) => setEditItem({ ...editItem, district: { ...editItem.district!, ar: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="مثال: الكورنيش (Sahil)"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'الحي / المنطقة بالتركية' : 'Bölge / Semt (Türkçe)'}</label>
              <input
                type="text"
                value={editItem.district?.tr || ''}
                onChange={(e) => setEditItem({ ...editItem, district: { ...editItem.district!, tr: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="Örnek: Sahil Kordonu"
              />
            </div>
          </div>

          {/* Description Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('descAr')} (الوصف بالعربية)</label>
              <textarea
                rows={3}
                value={editItem.description?.ar || ''}
                onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description!, ar: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="نبذة عن المكان وميزاته وخدماته..."
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('descTr')} (Açıklama Türkçe)</label>
              <textarea
                rows={3}
                value={editItem.description?.tr || ''}
                onChange={(e) => setEditItem({ ...editItem, description: { ...editItem.description!, tr: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="Mekan hakkında kısa açıklama..."
              />
            </div>
          </div>

          {/* Student Tips Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-xl bg-amber-50/60 border border-amber-200">
            <div className="space-y-1">
              <label className="block font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'ar' ? 'نصيحة وإرشاد للطلاب بالعربية' : 'Öğrenci Tavsiyesi (Arapça)'}</span>
              </label>
              <textarea
                rows={2}
                value={editItem.studentTips?.ar || ''}
                onChange={(e) => setEditItem({ ...editItem, studentTips: { ...editItem.studentTips!, ar: e.target.value } })}
                className="w-full p-2 border border-amber-200 rounded-lg text-xs bg-white"
                placeholder="مثال: يفضل المجيء صباحاً للدراسة الهادئة، يوجد خصم للطلاب 15%..."
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-amber-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'ar' ? 'نصيحة وإرشاد للطلاب بالتركية' : 'Öğrenci Tavsiyesi (Türkçe)'}</span>
              </label>
              <textarea
                rows={2}
                value={editItem.studentTips?.tr || ''}
                onChange={(e) => setEditItem({ ...editItem, studentTips: { ...editItem.studentTips!, tr: e.target.value } })}
                className="w-full p-2 border border-amber-200 rounded-lg text-xs bg-white"
                placeholder="Örnek: Sabah saatlerinde sessiz çalışma için ideal, öğrenciye indirim var..."
              />
            </div>
          </div>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'العنوان التفصيلي بالعربية' : 'Açık Adres (Arapça)'}</label>
              <input
                type="text"
                value={editItem.address?.ar || ''}
                onChange={(e) => setEditItem({ ...editItem, address: { ...editItem.address!, ar: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="مثال: شارع مصطفى كمال، بجوار ساحة الشهيد بامير..."
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'العنوان التفصيلي بالتركية' : 'Açık Adres (Türkçe)'}</label>
              <input
                type="text"
                value={editItem.address?.tr || ''}
                onChange={(e) => setEditItem({ ...editItem, address: { ...editItem.address!, tr: e.target.value } })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="Örnek: Şehit Pamir Cad. No: 12, İskenderun..."
              />
            </div>
          </div>

          {/* Operating Day (Pazar Günü - Semt Pazarları) */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <label className="block font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>{language === 'ar' ? 'يوم البازار الأسبوعي (خاص بالبازارات والأسواق)' : 'Haftalık Pazar Günü (Semt Pazarları İçin)'}</span>
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold">
                {language === 'ar' ? 'اضغط لتحديد اليوم بسرعة' : 'Hızlı Gün Seçimi'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-emerald-800">{language === 'ar' ? 'اليوم بالعربية' : 'Arapça Gün'}</label>
                <input
                  type="text"
                  value={editItem.operatingDay?.ar || ''}
                  onChange={(e) => setEditItem({ ...editItem, operatingDay: { ...editItem.operatingDay || { ar: '', tr: '' }, ar: e.target.value } })}
                  className="w-full p-2 border border-emerald-300 rounded-lg text-xs bg-white"
                  placeholder="مثال: الإثنين أو الأربعاء"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-emerald-800">{language === 'ar' ? 'اليوم بالتركية' : 'Türkçe Gün'}</label>
                <input
                  type="text"
                  value={editItem.operatingDay?.tr || ''}
                  onChange={(e) => setEditItem({ ...editItem, operatingDay: { ...editItem.operatingDay || { ar: '', tr: '' }, tr: e.target.value } })}
                  className="w-full p-2 border border-emerald-300 rounded-lg text-xs bg-white"
                  placeholder="Örn: Pazartesi veya Çarşamba"
                />
              </div>
            </div>

            {/* Quick day buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { ar: 'الإثنين', tr: 'Pazartesi' },
                { ar: 'الثلاثاء', tr: 'Salı' },
                { ar: 'الأربعاء', tr: 'Çarşamba' },
                { ar: 'الخميس', tr: 'Perşembe' },
                { ar: 'الجمعة', tr: 'Cuma' },
                { ar: 'السبت', tr: 'Cumartesi' },
                { ar: 'الأحد', tr: 'Pazar' }
              ].map((d, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setEditItem({
                    ...editItem,
                    category: 'bazaars',
                    operatingDay: { ar: d.ar, tr: d.tr }
                  })}
                  className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 transition cursor-pointer"
                >
                  {language === 'ar' ? d.ar : d.tr}
                </button>
              ))}
            </div>
          </div>

          {/* Maps URL & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'رابط خرائط جوجل (Google Maps URL)' : 'Google Harita Bağlantısı'}</label>
              <input
                type="url"
                value={editItem.googleMapsUrl || ''}
                onChange={(e) => setEditItem({ ...editItem, googleMapsUrl: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="https://maps.google.com/?q=..."
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{t('imageUrl')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editItem.image || ''}
                  onChange={(e) => setEditItem({ ...editItem, image: e.target.value })}
                  className="flex-1 p-2 border border-slate-200 rounded-lg text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
                {handleImageUpload && (
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer flex items-center gap-1 font-bold whitespace-nowrap">
                    <Crop className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'رفع صورة' : 'Yükle'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => setEditItem({ ...editItem, image: url }), '16:9', 'صورة المكان')}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Hours & Phone & Student Popular Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'ساعات العمل' : 'Çalışma Saatleri'}</label>
              <input
                type="text"
                value={editItem.openingHours?.ar || ''}
                onChange={(e) => setEditItem({
                  ...editItem,
                  openingHours: { ar: e.target.value, tr: e.target.value }
                })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="08:00 - 23:00"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">{language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Telefon (İsteğe bağlı)'}</label>
              <input
                type="text"
                value={editItem.phone || ''}
                onChange={(e) => setEditItem({ ...editItem, phone: e.target.value })}
                className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                placeholder="+90 326 ..."
              />
            </div>

            <div className="pt-4">
              <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={!!editItem.isPopularForStudents}
                  onChange={(e) => setEditItem({ ...editItem, isPopularForStudents: e.target.checked })}
                  className="rounded text-burgundy-700 focus:ring-burgundy-500 w-4 h-4"
                />
                <span>{language === 'ar' ? 'تمييز كمكان مفضل ومناسب للطلاب 🎓' : 'Öğrenci Dostu Olarak Öne Çıkar 🎓'}</span>
              </label>
            </div>
          </div>

          {/* Feature Tag Checkboxes */}
          <div className="space-y-1.5 pt-2">
            <label className="block font-bold text-slate-700">{language === 'ar' ? 'المزايا المتوفرة في المكان:' : 'Mevcut Özellikler:'}</label>
            <div className="flex flex-wrap gap-2">
              {availableFeatures.map((f) => {
                const isSelected = (editItem.features || []).includes(f.id);
                return (
                  <button
                    type="button"
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                      isSelected
                        ? 'bg-burgundy-700 text-white border-burgundy-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {language === 'ar' ? f.labelAr : f.labelTr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <button
              id="save-city-place-btn"
              type="submit"
              className="px-5 py-2.5 bg-burgundy-700 hover:bg-burgundy-800 text-white font-extrabold rounded-lg shadow flex items-center gap-1.5 transition"
            >
              <Save className="w-4 h-4" />
              <span>{t('saveBtn')}</span>
            </button>
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition"
            >
              {language === 'ar' ? 'إلغاء' : 'İptal'}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Header row: Add button + Search + Category Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                id="admin-add-city-place-btn"
                onClick={() => handleStartEdit()}
                className="px-3.5 py-2 bg-burgundy-700 hover:bg-burgundy-800 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة مكان / موقع جديد' : 'Yeni Mekan Ekle'}</span>
              </button>
              <span className="text-slate-400 font-semibold text-xs">
                ({places.length} {language === 'ar' ? 'مكان مدرج' : 'Mekan'})
              </span>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700"
              >
                <option value="all">{language === 'ar' ? 'جميع التصنيفات' : 'Tüm Kategoriler'}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'ar' ? c.labelAr : c.labelTr}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 sm:w-48">
                <Search className={`absolute top-2.5 w-3.5 h-3.5 text-slate-400 ${dir === 'rtl' ? 'right-2.5' : 'left-2.5'}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث...' : 'Ara...'}
                  className={`w-full py-1.5 border border-slate-200 rounded-lg text-xs ${
                    dir === 'rtl' ? 'pr-8 pl-2' : 'pl-8 pr-2'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Places Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((place) => (
              <div
                key={place.id}
                className="p-3 bg-white border border-slate-200 rounded-xl hover:shadow-xs transition flex flex-col justify-between space-y-2"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={place.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300'}
                    alt={getText(place.name)}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {categories.find(c => c.id === place.category)?.[language === 'ar' ? 'labelAr' : 'labelTr'] || place.category}
                      </span>
                      {place.isPopularForStudents && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                          🎓 {language === 'ar' ? 'مفضل' : 'Öne Çıkan'}
                        </span>
                      )}
                      {place.operatingDay && (place.operatingDay.ar || place.operatingDay.tr) && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{getText(place.operatingDay)}</span>
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 truncate mt-1 text-xs">
                      {getText(place.name)}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      <span className="font-medium text-slate-700">{getText(place.district)}</span>
                      {place.address && (place.address.ar || place.address.tr) && (
                        <span> • {getText(place.address)}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[11px]">
                  <a
                    href={place.googleMapsUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-burgundy-700 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{language === 'ar' ? 'الخريطة' : 'Harita'}</span>
                  </a>

                  <div className="flex gap-1.5">
                    <button
                      id={`edit-place-${place.id}`}
                      onClick={() => handleStartEdit(place)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title={t('editBtn')}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      id={`delete-place-${place.id}`}
                      onClick={() => handleDelete(place.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title={t('deleteBtn')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>{language === 'ar' ? 'لا توجد أماكن مطابقة للبحث.' : 'Aramaya uygun mekan bulunamadı.'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

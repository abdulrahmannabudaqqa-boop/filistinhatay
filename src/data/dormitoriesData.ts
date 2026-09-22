import { StudentDormitory } from '../types';

export const iskenderunDormitories: StudentDormitory[] = [
  {
    id: 'dorm-kyk-iskenderun-erkek',
    name: {
      ar: 'سكن إسكندرون الحكومي للذكور (KYK İskenderun Erkek Öğrenci Yurdu)',
      tr: 'KYK İskenderun Erkek Öğrenci Yurdu (Meydan Yurdu)'
    },
    type: 'kyk',
    typeLabel: {
      ar: 'سكن حكومي (KYK - GSB)',
      tr: 'Devlet Yurdu (KYK / GSB)'
    },
    gender: 'male',
    genderLabel: {
      ar: 'طلاب ذكور (Erkek)',
      tr: 'Erkek Öğrenci'
    },
    neighborhood: {
      ar: 'حي ميدان (Meydan Mahallesi) - ملاصق لحرم جامعة İSTE',
      tr: 'Meydan Mahallesi (İSTE Merkez Kampüs Yanı)'
    },
    address: {
      ar: 'حي ميدان، شارع 543، رقم 6G، إسكندرون / هاتاي',
      tr: 'Meydan Mah. 543. Sokak No: 6G/101, İskenderun / Hatay'
    },
    description: {
      ar: 'السكن الحكومي الأكبر والأقرب للطلاب الذكور في إسكندرون؛ يقع على مسافة مشي قصيرة جداً من الحرم الجامعي المركزي لجامعة إسكندرون التقنية (İSTE). يوفر بيئة دراسية متكاملة مع وجبتي طعام حكوميتين يومياً، صالات رياضية، وإنترنت GSB فائق السرعة.',
      tr: 'İSTE Merkez Kampüsüne yürüme mesafesinde olan, Hatay Gençlik ve Spor İl Müdürlüğü\'ne bağlı modern devlet erkek yurdu. Günde iki öğün devlet beslenme yardımı, çalışma salonları, spor sahaları ve 7/24 güvenlik sunar.'
    },
    features: [
      { ar: 'أقرب سكن ذكور لحرم جامعة İSTE (مشي 3 إلى 7 دقائق لكليات الهندسة)', tr: 'İSTE Merkez Kampüsüne yürüme mesafesi (3-7 dakika)' },
      { ar: 'وجبتا طعام يومياً (فطور صباحي وعشاء ساخن مدعوم حكومياً)', tr: 'Ücretsiz / devlet destekli günlük sabah kahvaltısı ve akşam yemeği' },
      { ar: 'قاعات استذكار ومطالعة هادئة مفتوحة 24 ساعة', tr: '24 saat açık sessiz ders çalışma ve etüt salonları' },
      { ar: 'ملاعب كرة قدم، سلة، وصالة لياقة بدنية مجانية', tr: 'Futbol sahası, basketbol alanı ve fitness salonu' },
      { ar: 'خدمات غسيل وكوي ملابس مجانية بالكامل داخل السكن', tr: 'Ücretsiz çamaşırhane ve ütü odaları' },
      { ar: 'إنترنت حكومي GSB WiFi سريع ومجاني للطلاب', tr: 'Kesintisiz ve ücretsiz GSB WiFi internet hizmeti' },
      { ar: 'حراسة وأمن مشدد على مدار 24 ساعة مع بوابات إلكترونية', tr: 'Kartlı geçiş sistemi ve 7/24 güvenlik personeli' }
    ],
    capacity: '1,100 طالب',
    roomTypes: {
      ar: 'غرف مجهزة تتسع لـ 3 إلى 4 طلاب مع دواليب ومكاتب مستقلة',
      tr: '3 ve 4 kişilik ferah odalar, kişisel çalışma masası ve kilitli dolaplar'
    },
    servicesIncluded: [
      { ar: 'فطور وعشاء يومي', tr: 'Sabah & Akşam Yemeği' },
      { ar: 'مياه ساخنة وتدفئة مركزية 24/7', tr: '7/24 Sıcak Su & Merkezi Isıtma' },
      { ar: 'غسالات ومجففات ملابس مجانية', tr: 'Ücretsiz Çamaşırhane' },
      { ar: 'أمن واستقبال مدار الساعة', tr: '7/24 Güvenlik & Resepsiyon' }
    ],
    proximityToUniv: {
      ar: 'مشي 5 دقائق فقط من البوابات الرئيسية لكليات الهندسة وإدارة الأعمال في İSTE',
      tr: 'İSTE Merkez Kampüsü dersliklerine ve fakültelerine yürüyerek 5 dakika'
    },
    phone: '0 (326) 615 25 15',
    mapUrl: 'https://maps.google.com/?q=KYK+%C4%B0skenderun+Erkek+%C3%96%C4%9Frenci+Yurdu+Meydan',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=70',
    applicationGuide: {
      ar: 'يتم التقديم عبر بوابة الحكومة الإلكترونية e-Devlet بعد إعلان وزارة الشباب والرياضة (GSB). يحق للطلاب الدوليين والفلسطينيين الحاصلين على رقم TC أو وثيقة الطالب التقديم في المواعيد المحددة.',
      tr: 'Başvurular her yıl Gençlik ve Spor Bakanlığı (GSB) takvimine göre e-Devlet kapısı üzerinden yapılır.'
    },
    isPopularForStudents: true
  },
  {
    id: 'dorm-kyk-5-temmuz-kiz',
    name: {
      ar: 'سكن 5 تموز الحكومي للطالبات (KYK 5 Temmuz Kız Öğrenci Yurdu)',
      tr: 'KYK 5 Temmuz Kız Öğrenci Yurdu'
    },
    type: 'kyk',
    typeLabel: {
      ar: 'سكن حكومي (KYK - GSB)',
      tr: 'Devlet Yurdu (KYK / GSB)'
    },
    gender: 'female',
    genderLabel: {
      ar: 'طالبات إناث (Kız)',
      tr: 'Kız Öğrenci'
    },
    neighborhood: {
      ar: 'حي سكاريا وميدان (Sakarya / Meydan)',
      tr: 'Sakarya & Meydan Mahallesi'
    },
    address: {
      ar: 'حي سكاريا، شارع 144، إسكندرون / هاتاي (قرب الطريق الرئيسي للجامعة)',
      tr: 'Sakarya Mah. 144. Sokak No: 15, İskenderun / Hatay'
    },
    description: {
      ar: 'السكن الحكومي الرئيسي المعتمد لطالبات جامعة إسكندرون التقنية. يتمتع ببنية تحتية حديثة، حراسة أمنية نسائية ورسمية مشددة، غرف مريحة، وجبات طعام صحية ومطابخ للخدمة الذاتية، وموقع استراتيجي يتيح الوصول السريع للجامعة ومركز المدينة.',
      tr: 'İSTE\'de öğrenim gören kız öğrenciler için tasarlanmış geniş kapasiteli ana KYK yurdudur. Güvenlik, konfor, devlet beslenme desteği, etüt salonları ve sosyal imkânlarıyla kız öğrencilere huzurlu ve güvenli bir yuva sağlar.'
    },
    features: [
      { ar: 'حراسة وأمن نسائي مشدد ورقابة كاميرات على مدار الساعة', tr: '7/24 kadın güvenlik personeli ve kameralı güvenlik sistemi' },
      { ar: 'وجبتا طعام يوميتان غنيتان وصحيتان (فطور وعشاء)', tr: 'Günde 2 öğün zengin ve besleyici devlet yemek yardımı' },
      { ar: 'قاعات مطالعة جماعية وفردية مكيفة ومجهزة بالإنترنت', tr: 'Klimalı ve internet donanımlı geniş çalışma ve etüt salonları' },
      { ar: 'مغاسل ملابس أوتوماتيكية ومكاوٍ ومجففات مجانية', tr: 'Tam otomatik çamaşır ve kurutma makineleri' },
      { ar: 'عيادة طبية وتمريضية للإسعافات الأولية داخل السكن', tr: 'Revir ve ilk yardım sağlık hizmeti' },
      { ar: 'حديقة داخلية آمنة وجلسات خضراء وكافتيريا طلابية', tr: 'Geniş yeşil bahçe, kamelyalar ve kantin' },
      { ar: 'قريب من خطوط السرافيس وباصات البلدية المباشرة للحرم', tr: 'Kampüse giden belediye otobüsleri ve dolmuş duraklarına yakın' }
    ],
    capacity: '850+ طالبة',
    roomTypes: {
      ar: 'غرف لـ 3 و 4 طالبات مع حمام داخلي وتدفئة ومكاتب شخصية',
      tr: '3 ve 4 kişilik banyolu/ferah odalar, bazalı yataklar ve kişisel dolaplar'
    },
    servicesIncluded: [
      { ar: 'فطور وعشاء يومي', tr: 'Sabah & Akşam Yemeği' },
      { ar: 'تدفئة مركزية ومياه ساخنة', tr: 'Merkezi Isıtma & 7/24 Sıcak Su' },
      { ar: 'إنترنت فايبر GSB WiFi', tr: 'GSB WiFi İnternet' },
      { ar: 'أمن نسائي وبوابات ذكية', tr: 'Kadın Güvenlik & Turnike Sistemi' }
    ],
    proximityToUniv: {
      ar: 'حوالي 8 إلى 10 دقائق بالمواصلات المباشرة إلى بوابات جامعة İSTE',
      tr: 'İSTE Merkez Kampüsüne dolmuş veya belediye otobüsüyle 8-10 dakika'
    },
    phone: '0 (326) 615 25 15',
    mapUrl: 'https://maps.google.com/?q=KYK+5+Temmuz+K%C4%B1z+%C3%96%C4%9Frenci+Yurdu+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=70',
    applicationGuide: {
      ar: 'التقديم سنوي إلكترونياً عبر e-Devlet. يُنصح بالتحضير المبكر للأوراق الرسمية (قيد الطالب الفعال وجواز السفر أو بطاقة الإقامة).',
      tr: 'e-Devlet üzerinden her akademik yıl başında açılan GSB yurt başvuruları ile kayıt yapılır.'
    },
    isPopularForStudents: true
  },
  {
    id: 'dorm-kyk-muhyiddin-ibni-arabi',
    name: {
      ar: 'سكن محيي الدين ابن عربي للذكور (KYK Muhyiddin İbn-i Arabi Yurdu)',
      tr: 'KYK Muhyiddin İbn-i Arabi Erkek Öğrenci Yurdu'
    },
    type: 'kyk',
    typeLabel: {
      ar: 'سكن حكومي (KYK - GSB)',
      tr: 'Devlet Yurdu (KYK / GSB)'
    },
    gender: 'male',
    genderLabel: {
      ar: 'طلاب ذكور (Erkek)',
      tr: 'Erkek Öğrenci'
    },
    neighborhood: {
      ar: 'حي غورسيل (Gürsel Mahallesi)',
      tr: 'Gürsel Mahallesi'
    },
    address: {
      ar: 'حي غورسيل، إسكندرون / هاتاي',
      tr: 'Gürsel Mah., İskenderun / Hatay'
    },
    description: {
      ar: 'سكن حكومي هادئ تابع لوزارة الشباب والرياضة التركية (GSB)، يقع في حي غورسيل ويمتاز ببيئة مريحة ومنظمة للطلاب الذين يفضلون الهدوء في المذاكرة والمبيت مع توفير كافة خدمات الإعاشة والدعم الغذائي.',
      tr: 'Gürsel Mahallesi\'nde yer alan, öğrencilere sakin ve konforlu bir barınma ortamı sunan KYK yurdudur. Düzenli beslenme desteği, etüt alanları ve modern altyapıya sahiptir.'
    },
    features: [
      { ar: 'بيئة هادئة ومثالية للدراسة والتركيز العالي', tr: 'Sessiz, ders çalışmaya son derece elverişli huzurlu ortam' },
      { ar: 'وجبات طعام مدعومة فطوراً وعشاءً يومياً', tr: 'Sabah kahvaltısı ve akşam yemeği desteği' },
      { ar: 'قاعات مطالعة وصالات تلفاز واستراحة', tr: 'Ders çalışma odaları ve dinlenme salonları' },
      { ar: 'شبكة إنترنت لاسلكية سريعة GSB WiFi', tr: 'Yüksek hızlı GSB WiFi ağı' },
      { ar: 'مغسلة ملابس مجانية وخدمات صيانة ونظافة دورية', tr: 'Düzenli temizlik, bakım ve çamaşırhane hizmetleri' }
    ],
    capacity: '600 طالب',
    roomTypes: {
      ar: 'غرف لـ 3 أو 4 طلاب مع أسرة مريحة وخزائن أمانات',
      tr: '3-4 kişilik düzenli odalar'
    },
    servicesIncluded: [
      { ar: 'وجبتي طعام يومياً', tr: 'Günde 2 Öğün Yemek' },
      { ar: 'مياه ساخنة وتدفئة', tr: 'Sıcak Su & Isıtma' },
      { ar: 'أمن مدار الساعة', tr: '7/24 Güvenlik' }
    ],
    proximityToUniv: {
      ar: 'حوالي 10 دقائق بالمواصلات العامة أو السيرفيس إلى جامعة İSTE',
      tr: 'İSTE Merkez Kampüsüne dolmuşla yaklaşık 10 dakika'
    },
    phone: '0 (326) 617 10 20',
    mapUrl: 'https://maps.google.com/?q=Muhyiddin+Ibni+Arabi+Erkek+Yurdu+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=70',
    isPopularForStudents: false
  },
  {
    id: 'dorm-kyk-korfez-erkek',
    name: {
      ar: 'سكن كورفاز للذكور (KYK Körfez Erkek Öğrenci Yurdu)',
      tr: 'KYK Körfez Erkek Öğrenci Yurdu'
    },
    type: 'kyk',
    typeLabel: {
      ar: 'سكن حكومي (KYK - GSB)',
      tr: 'Devlet Yurdu (KYK / GSB)'
    },
    gender: 'male',
    genderLabel: {
      ar: 'طلاب ذكور (Erkek)',
      tr: 'Erkek Öğrenci'
    },
    neighborhood: {
      ar: 'شارع البروفيسور معمر أكسوي (Prof. Muammer Aksoy Cd.)',
      tr: 'Prof. Dr. Muammer Aksoy Caddesi'
    },
    address: {
      ar: 'شارع البروفيسور د. معمر أكسوي رقم 60B، إسكندرون / هاتاي',
      tr: 'Prof. Dr. Muammer Aksoy Cd. No: 60B, İskenderun / Hatay'
    },
    description: {
      ar: 'يقع على أحد أهم الشوارع الرئيسية في إسكندرون، ما يجعله ذا وصول فائق السهولة لكافة أحياء المدينة ومحطة القطار والجامعة. يمتاز بتقديم كافة الامتيازات الحكومية من وجبات وإقامة مدعومة.',
      tr: 'İskenderun\'un ana arterlerinden Prof. Muammer Aksoy Caddesi üzerinde bulunan, ulaşım kolaylığı ve merkezi konumuyla öne çıkan devlet erkek yurdu.'
    },
    features: [
      { ar: 'موقع حيوي ممتاز على الشارع الرئيسي مباشرة', tr: 'Ana cadde üzerinde merkezi ve kolay ulaşılabilir lokasyon' },
      { ar: 'وجبات طعام صباحية ومسائية وفق معايير وزارة الصحة', tr: 'Sağlıklı ve kontrollü sabah & akşam yemekleri' },
      { ar: 'قاعات مذاكرة مجهزة بإضاءة طبية مريحة للعين', tr: 'Özel aydınlatmalı ferah ders çalışma salonları' },
      { ar: 'خدمات غسيل ملابس وتدفئة مركزية ومياه ساخنة', tr: 'Çamaşırhane, sıcak su ve merkezi ısıtma' }
    ],
    capacity: '500 طالب',
    roomTypes: {
      ar: 'غرف لـ 3 و 4 طلاب',
      tr: '3-4 kişilik odalar'
    },
    servicesIncluded: [
      { ar: 'طعام مدعوم حكومياً', tr: 'Devlet Yemek Desteği' },
      { ar: 'إنترنت GSB', tr: 'GSB İnternet' },
      { ar: 'أمن وحراسة', tr: 'Güvenlik' }
    ],
    proximityToUniv: {
      ar: 'حوالي 7 دقائق بالحافلة إلى جامعة İSTE',
      tr: 'İSTE Merkez Kampüsüne toplu taşımayla 7 dakika'
    },
    mapUrl: 'https://maps.google.com/?q=K%C3%B6rfez+Erkek+%C3%96%C4%9Frenci+Yurdu+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=70',
    isPopularForStudents: false
  },
  {
    id: 'dorm-kyk-dortyol',
    name: {
      ar: 'سكن دوريتول الجامعي (Dörtyol KYK Öğrenci Yurdu)',
      tr: 'KYK Dörtyol Öğrenci Yurdu'
    },
    type: 'kyk',
    typeLabel: {
      ar: 'سكن حكومي (KYK - فرع دوريتول)',
      tr: 'Devlet Yurdu (Dörtyol Birimi)'
    },
    gender: 'mixed',
    genderLabel: {
      ar: 'مختلط - أجنحة منفصلة تماماً (Kız & Erkek Blokları)',
      tr: 'Kız ve Erkek Ayrı Bloklar'
    },
    neighborhood: {
      ar: 'حي صناعي، دوريتول / هاتاي (Dörtyol)',
      tr: 'Sanayi Mahallesi, Dörtyol / Hatay'
    },
    address: {
      ar: 'حي صناعي، حرم دوريتول لجامعة İSTE، دوريتول / هاتاي',
      tr: 'Sanayi Mah. İSTE Dörtyol Yerleşkesi Yanı, Dörtyol / Hatay'
    },
    description: {
      ar: 'سكن مخصص لطلاب وطالبات كليات ومعاهد دوريتول التابعة لجامعة إسكندرون التقنية (İSTE Dörtyol Yerleşkesi). يقع بجانب الحرم الفرعي مباشرة ويوفر أجنحة سكنية منفصلة تماماً لكل من الذكور والإناث.',
      tr: 'İskenderun Teknik Üniversitesi Dörtyol Meslek Yüksekokulu ve yerleşkesi öğrencileri için ayrılmış, kız ve erkek blokları bağımsız devlet yurdudur.'
    },
    features: [
      { ar: 'ملاصق لحرم دوريتول التابع لـ İSTE (مشي دقيقتين)', tr: 'İSTE Dörtyol Yerleşkesine 2 dakika yürüme mesafesi' },
      { ar: 'أبنية منفصلة تماماً للطلاب وللطالبات مع أمن مستقل', tr: 'Kız ve erkek öğrenciler için bağımsız bloklar ve girişler' },
      { ar: 'وجبتا طعام يوميتان وشبكة إنترنت ومكتبات', tr: 'Günde 2 öğün yemek, internet ve kütüphane' },
      { ar: 'مغاسل ملابس وصالات أنشطة رياضية', tr: 'Çamaşırhane ve spor aktiviteleri' }
    ],
    capacity: '700 طالب وطالبة',
    roomTypes: {
      ar: 'غرف لـ 3 و 4 أفراد',
      tr: '3 ve 4 kişilik odalar'
    },
    servicesIncluded: [
      { ar: 'وجبات يومية', tr: 'Yemek Servisi' },
      { ar: 'إنترنت ومذاكرة', tr: 'İnternet & Etüt' },
      { ar: 'مياه ساخنة وتدفئة', tr: 'Sıcak Su & Isıtma' }
    ],
    proximityToUniv: {
      ar: 'مشي دقيقتين فقط إلى كليات ومعاهد فرع دوريتول التابع لجامعة İSTE',
      tr: 'İSTE Dörtyol Kampüsüne yürüyerek 2 dakika'
    },
    phone: '0 (326) 712 80 90',
    mapUrl: 'https://maps.google.com/?q=D%C3%B6rtyol+KYK+%C3%96%C4%9Frenci+Yurdu',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=70',
    isPopularForStudents: false
  },
  {
    id: 'dorm-apart-mustafa-kemal',
    name: {
      ar: 'شقق وأبارت حي مصطفى كمال الطلابية (Mustafa Kemal Öğrenci Apartları)',
      tr: 'Mustafa Kemal Mahallesi Öğrenci Apart & Rezidansları'
    },
    type: 'apart',
    typeLabel: {
      ar: 'شقق واستوديوهات مفروشة (Apart)',
      tr: 'Özel Apart / Öğrenci Evi'
    },
    gender: 'mixed',
    genderLabel: {
      ar: 'خيارات للشباب وللبنات (شقق مستقلة وعائلية)',
      tr: 'Kız & Erkek Ayrı Binalar / Daireler'
    },
    neighborhood: {
      ar: 'حي مصطفى كمال (الحي الجامعي المحيط بـ İSTE)',
      tr: 'Mustafa Kemal Mahallesi (Kampüs Çevresi)'
    },
    address: {
      ar: 'محيط بوابات جامعة إسكندرون التقنية، حي مصطفى كمال، إسكندرون',
      tr: 'Mustafa Kemal Mah. İSTE Giriş Kapıları Çevresi, İskenderun / Hatay'
    },
    description: {
      ar: 'المنطقة السكنية الأكثر تفضيلاً وشهرة بين طلاب جامعة İSTE. تضم مئات الشقق المفروشة (أنماط 1+0 استوديو، 1+1، و 2+1) المخصصة للطلاب. تقع حرفياً على بعد خطوات من مدرجات وكليات الجامعة وسوق السبت والمقاهي.',
      tr: 'İSTE öğrencilerinin ev ve apart kiralamada bir numaralı tercihidir. 1+0, 1+1 ve 2+1 eşyalı öğrenci apartları, yemek mekanları, kafeler ve marketlerle çevrilidir. Kampüse sıfır mesafededir.'
    },
    features: [
      { ar: 'موقع استثنائي: دقيقة إلى 5 دقائق مشياً لأي كلية في الجامعة', tr: 'Kampüse yürüyerek 1-5 dakika mesafede sıfır konum' },
      { ar: 'شقق مفروشة بالكامل: غسالة، ثلاجة، تلفاز، تكييف، مكاتب، أسرة', tr: 'Full eşyalı daireler (klima, beyaz eşya, baza, çalışma masası)' },
      { ar: 'حرية كاملة دون مواعيد إغلاق أو قيود دخول وخروج', tr: 'Giriş-çıkış saati kısıtlaması olmaksızın tam bağımsız yaşam' },
      { ar: 'إنترنت فايبر سريع وشبكات غاز طبيعي (Doğalgaz) موفرة', tr: 'Bireysel kombi / doğalgaz ve fiber internet altyapısı' },
      { ar: 'بجوار بازار السبت الشعبي وجميع السوبرماركت (BİM, A101, Şok)', tr: 'Semt pazarı ve tüm zincir marketlere komşu' }
    ],
    capacity: 'عشرات المجمعات والعمارات المستقلة',
    roomTypes: {
      ar: 'استوديوهات فردية 1+0، شقق 1+1 لشخص أو شخصين، وشقق 2+1 للمجموعات',
      tr: '1+0 Stüdyo, 1+1 ve 2+1 paylaşımlı veya tek kişilik seçenekler'
    },
    servicesIncluded: [
      { ar: 'أثاث متكامل ومطبخ خاص', tr: 'Eşyalı Daire & Özel Mutfak' },
      { ar: 'حرية استقلالية تامة', tr: 'Bağımsız Yaşam' },
      { ar: 'قرب متناهٍ من القاعات', tr: 'Dersliklere Yürüme Mesafesi' }
    ],
    proximityToUniv: {
      ar: 'من دقيقة إلى 5 دقائق مشياً على الأقدام فقط (صفر مسافة)',
      tr: 'İSTE Merkez Kampüsüne yürüyerek 1-5 dakika (Sıfır Mesafe)'
    },
    mapUrl: 'https://maps.google.com/?q=Mustafa+Kemal+Mahallesi+%C4%B0skenderun+%C3%96%C4%9Frenci+Apart',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=70',
    applicationGuide: {
      ar: 'يتم الاستئجار المباشر من الملاك أو المكاتب العقارية الموثوقة (Emlak). يُنصح بفحص الشقة والتأكد من بنود عقد الإيجار (Kira Sözleşmesi) ودفع الإيجار عبر الحساب البنكي الرسمي.',
      tr: 'Doğrudan ev sahipleri veya bölgedeki yetkili emlak danışmanları aracılığıyla kiralanır. Kira sözleşmesi yapılması zorunludur.'
    },
    isPopularForStudents: true
  },
  {
    id: 'dorm-private-modern-evler-kiz',
    name: {
      ar: 'سكنات موديرن إيفلير والساحل الخاصة للطالبات (Modern Evler Özel Kız Yurtları)',
      tr: 'Modern Evler Özel Kız Öğrenci Yurtları & Rezidans'
    },
    type: 'private',
    typeLabel: {
      ar: 'سكن خاص معتمد (Özel Yurt)',
      tr: 'Özel Kız Yurdu'
    },
    gender: 'female',
    genderLabel: {
      ar: 'طالبات إناث حصراً (Kız Öğrenci)',
      tr: 'Kız Öğrenci'
    },
    neighborhood: {
      ar: 'حي موديرن إيفلير (Modern Evler Mahallesi)',
      tr: 'Modern Evler Mahallesi'
    },
    address: {
      ar: 'حي موديرن إيفلير، قرب خط المواصلات الرئيسي، إسكندرون / هاتاي',
      tr: 'Modern Evler Mah., İskenderun / Hatay'
    },
    description: {
      ar: 'سكنات خاصة حديثة مرخصة من وزارة التربية والتعليم التركية، توفر بيئة فندقية هادئة وفاخرة للطالبات مع خدمات نظافة فندقية دورية، مشرفات سكن مقيمات، مطاعم خاصة، ومستويات أمان مرتفعة جداً في أرقى أحياء إسكندرون السكنية.',
      tr: 'Modern Evler Mahallesi\'nin nezih atmosferinde, MEB onaylı özel kız öğrenci rezidansları. Otel konseptinde temizlik, leziz yemekler, güvenlik ve huzurlu etüt ortamı sunar.'
    },
    features: [
      { ar: 'حراسة وإشراف نسائي مقيم 24 ساعة وكاميرات مراقبة متطورة', tr: '24 saat kadın yönetici, özel güvenlik ve kamera kaydı' },
      { ar: 'غرف فندقية مفردة ومزدوجة بحمامات خاصة وشاشات تلفاز', tr: 'Özel banyolu tek veya 2 kişilik lüks odalar' },
      { ar: 'وجبات طعام صباحية ومسائية مجهزة بنظام البوفيه المفتوح', tr: 'Açık büfe sabah kahvaltısı ve leziz akşam yemekleri' },
      { ar: 'خدمة تنظيف الغرف الدورية وتغيير المفارش أسبوعياً', tr: 'Haftalık oda temizliği ve nevresim değişimi' },
      { ar: 'مولدة كهرباء احتياطية ونظام طاقة شمسية وتدفئة مركزية', tr: 'Kesintisiz jeneratör ve sıcak su güvencesi' }
    ],
    capacity: '200 طالبة',
    roomTypes: {
      ar: 'غرف فردية (VIP)، غرف ثنائية، وغرف ثلاثية فاخرة',
      tr: '1, 2 ve 3 kişilik suit odalar'
    },
    servicesIncluded: [
      { ar: 'بوفيه طعام مفتوح', tr: 'Açık Büfe Yemek' },
      { ar: 'تنظيف غرف فندقي', tr: 'Oda Temizliği' },
      { ar: 'إنترنت فايبر عالي السرعة', tr: 'Yüksek Hızlı Fiber İnternet' },
      { ar: 'أمان وإشراف مقيم', tr: 'Güvenlik ve Yönetici' }
    ],
    proximityToUniv: {
      ar: 'حوالي 5 إلى 7 دقائق بالحافلة المباشرة أو السيرفيس إلى بوابات الجامعة',
      tr: 'İSTE Merkez Kampüsüne dolmuşla 5-7 dakika'
    },
    phone: '0 (326) 618 00 00',
    mapUrl: 'https://maps.google.com/?q=Modern+Evler+%C4%B0skenderun+%C3%96%C4%9Frenci+Yurdu',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=70',
    isPopularForStudents: true
  },
  {
    id: 'dorm-housing-zones-guide',
    name: {
      ar: 'دليل مناطق استئجار الشقق الطلابية في إسكندرون (İskenderun Ev Kiralama Bölgeleri)',
      tr: 'İskenderun Öğrenci Ev Kiralama Bölgeleri Rehberi'
    },
    type: 'apart',
    typeLabel: {
      ar: 'دليل مناطق الشقق (Bölgeler)',
      tr: 'Bölge Rehberi'
    },
    gender: 'mixed',
    genderLabel: {
      ar: 'كافة الطلاب والطالبات (Öğrenciler İçin)',
      tr: 'Tüm Öğrenciler'
    },
    neighborhood: {
      ar: 'أحياء: مصطفى كمال، موديرن إيفلير، كوجاتيبي، وإسنتيبي',
      tr: 'Mustafa Kemal, Modern Evler, Kocatepe, Esentepe'
    },
    address: {
      ar: 'مدينة إسكندرون، محافظة هاتاي',
      tr: 'İskenderun / Hatay'
    },
    description: {
      ar: 'دليل مفصل للأحياء السكنية الأنسب لإقامة الطلاب في إسكندرون؛ يقارن بين أسعار الإيجارات، وتوافر السرافيس والمواصلات، وقرب الأسواق ومراكز الخدمات من جامعة إسكندرون التقنية (İSTE).',
      tr: 'İskenderun\'da üniversite okurken ev tutmak isteyen öğrenciler için mahallelerin kira seviyelerini, ulaşım hatlarını ve kampüse olan mesafelerini özetleyen rehber.'
    },
    features: [
      { ar: 'حي مصطفى كمال: الأقرب للجامعة، الأكثر حيوية، مليء بالمطاعم وبازار السبت', tr: 'Mustafa Kemal Mah: Kampüse sıfır, en sosyal, cumartesi pazarı ve kafeler bölgesi' },
      { ar: 'حي موديرن إيفلير: الحي الأهدأ والأرقى، عمارات حديثة، 5 دقائق بالباص للجامعة', tr: 'Modern Evler Mah: Nezih, sakin, yeni yapılar, kampüse 5 dakika dolmuş' },
      { ar: 'حي كوجاتيبي وإسنتيبي: خيارات إيجار أكثر توفيراً، وقريبة من خطوط المواصلات', tr: 'Kocatepe & Esentepe: Daha ekonomik kira seçenekleri, toplu taşımaya yakın' },
      { ar: 'حي الكورنيش وتشاي: لمحبي العيش قرب شاطئ البحر وسوق إسكندرون المركزي', tr: 'Sahil & Çarşı: Deniz kıyısı ve merkezi şehir olanakları sevenler için' }
    ],
    servicesIncluded: [
      { ar: 'نصائح عقود الإيجار الرسمية', tr: 'Kira Sözleşmesi Tavsiyeleri' },
      { ar: 'تثبيت قيد النفوس (Adres Kaydı)', tr: 'Nüfus Adres Tescili' },
      { ar: 'إرشادات فواتير الغاز والكهرباء', tr: 'Abonelik İşlemleri Rehberi' }
    ],
    proximityToUniv: {
      ar: 'من مشي دقيقتين إلى 10 دقائق بالمواصلات حسب الحي المختار',
      tr: 'Seçilen mahalleye göre 2 ila 10 dakika arası ulaşım'
    },
    mapUrl: 'https://maps.google.com/?q=%C4%B0skenderun+Teknik+%C3%9Cniversitesi',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=70',
    isPopularForStudents: true
  }
];

export const dormitoryApplicationSteps = [
  {
    step: 1,
    title: {
      ar: 'الحصول على وثيقة الطالب الفعالة (Öğrenci Belgesi)',
      tr: 'Aktif Öğrenci Belgesinin Temini'
    },
    description: {
      ar: 'استخرج وثيقة الطالب الإلكترونية عبر نظام e-Devlet أو من شؤون الطلاب (Öğrenci İşleri) في جامعة İSTE للتأكد من تفعيل قيدك الأكاديمي للعام الدراسي.',
      tr: 'e-Devlet kapısı üzerinden veya İSTE Öğrenci İşleri Daire Başkanlığı\'ndan güncel öğrenci belgenizi temin edin.'
    }
  },
  {
    step: 2,
    title: {
      ar: 'التقديم عبر بوابة الحكومة الإلكترونية e-Devlet (GSB Yurt Başvurusu)',
      tr: 'e-Devlet GSB Yurt Başvurusunun Yapılması'
    },
    description: {
      ar: 'ادخل إلى خدمة "Gençlik ve Spor Bakanlığı Yurt Başvurusu" في e-Devlet خلال فترة التقديم السنوية، واملأ بياناتك الشخصية بدقة مع إدخال رقم هاتف تركي فعال.',
      tr: 'Başvuru döneminde e-Devlet üzerinde GSB Yurt Başvuru formunu doldurun ve bilgilerinizi eksiksiz onaylayın.'
    }
  },
  {
    step: 3,
    title: {
      ar: 'متابعة نتائج القبول وتثبيت التسجيل (Taahhütname Onayı)',
      tr: 'Sonuçların Takibi ve Taahhütname Onayı'
    },
    description: {
      ar: 'فور إعلان النتائج، يجب عليك الموافقة على وثيقة التعهد (Taahhütname) عبر e-Devlet وتسديد رسوم التأمين الأولية عبر بنك زراعات (Ziraat Bankası) لتثبيت مقعدك رسمياً.',
      tr: 'Yerleştirme sonucu açıklandığında e-Devlet\'ten taahhütnameyi onaylayın ve Ziraat Bankası üzerinden ilk kayıt ücretini yatırın.'
    }
  },
  {
    step: 4,
    title: {
      ar: 'تسليم الوثائق واستلام الغرفة في السكن',
      tr: 'Evrak Teslimi ve Yurda Yerleşme'
    },
    description: {
      ar: 'توجه إلى إدارة السكن في إسكندرون مصطحباً: صورة جواز السفر أو الإقامة، 4 صور شخصية، وثيقة الطالب، وإيصال الدفع لاستلام مفتاح الغرفة وبطاقة الدخول الذكية.',
      tr: 'Öğrenci belgesi, kimlik/pasaport fotokopisi, fotoğraflar ve dekont ile birlikte ilgili yurt müdürlüğüne başvurarak odanıza yerleşin.'
    }
  }
];

export const rentalTips = [
  {
    title: {
      ar: 'عقد الإيجار الرسمي (Kira Sözleşmesi)',
      tr: 'Resmi Kira Sözleşmesi İmzalanması'
    },
    content: {
      ar: 'لا تدفع أي مبلغ نقدي دون توقيع عقد إيجار رسمي موضح فيه أسماء المستأجرين، قيمة الإيجار، وقيمة التأمين (Depozito)، وطريقة السداد عبر الحساب البنكي الرسمي IBAN.',
      tr: 'Depozito ve kira bedellerini mutlaka banka havalesi (IBAN) ile açıklamalı olarak ödeyin ve yazılı kira kontratı yapın.'
    }
  },
  {
    title: {
      ar: 'تثبيت العنوان في دائرة النفوس (Nüfus Adres Kaydı)',
      tr: 'Nüfus Müdürlüğü Adres Tescili'
    },
    content: {
      ar: 'يعد تثبيت العنوان في مديرية نفوس إسكندرون شرطاً أساسياً لتجديد إقامة الطالب (İkamet İzni). خذ عقد الإيجار وفاتورة كهرباء أو ماء مصدقة إلى إدارة النفوس لتسجيل عنوانك.',
      tr: 'Öğrenci ikamet izninizin devamı için noter onaylı kira sözleşmesi veya faturanızla İskenderun İlçe Nüfus Müdürlüğü\'ne adres bildiriminde bulunun.'
    }
  },
  {
    title: {
      ar: 'فواتير الغاز والكهرباء والماء (Abonelikler)',
      tr: 'Elektrik, Su ve Doğalgaz Abonelikleri'
    },
    content: {
      ar: 'تأكد من فتح اشتراكات العدادات باسم أحد الطلاب في الشقة عبر تطبيقات الشركات (Toroslar EDAŞ للكهرباء، HATSU للمياه، Aksa Doğalgaz للغاز) وتجنب الفواتير المشتركة غير الموثقة.',
      tr: 'Abonelikleri üzerinize alırken öğrenci indirimlerinden ve online randevu sistemlerinden faydalanın.'
    }
  },
  {
    title: {
      ar: 'التأمين والأثاث ومصروفات العمارة (Aidat)',
      tr: 'Depozito, Eşya Kontrolü ve Apartman Aidatı'
    },
    content: {
      ar: 'قبل استلام الشقة، صوّر كل أثاث الشقة وحالة الجدران والأجهزة، واسأل صاحب العقار عن قيمة العائدات الشهرية للعمارة (Aidat) لمنع أي مفاجآت في التكاليف.',
      tr: 'Evi teslim alırken mevcut eşyaların durumunu fotoğraflayın ve aylık bina aidat tutarını baştan netleştirin.'
    }
  }
];

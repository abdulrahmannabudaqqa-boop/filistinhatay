import { IskenderunPlace, WeeklyBazaar } from '../types';

export const iskenderunPlaces: IskenderunPlace[] = [
  {
    id: 'place-sahil-kordonu',
    name: {
      ar: 'كورنيش وساحل إسكندرون (İskenderun Sahil Kordonu)',
      tr: 'İskenderun Sahil Kordonu & Atatürk Anıt Alanı'
    },
    category: 'coast',
    categoryLabel: {
      ar: 'واجهة بحرية وكورنيش',
      tr: 'Sahil & Kordon'
    },
    description: {
      ar: 'أحد أطول وأجمل الكورنيشات البحرية على ساحل البحر الأبيض المتوسط في تركيا. يمتد الكورنيش على طول خليج إسكندرون، ويضم مسارات مخصصة للمشي وركوب الدراجات الهوائية، حدائق نخيل استوائية، ومقاهي البلدية وملاعب أطفال، ويوفر إطلالة ساحرة تجمع بين أمواج البحر وزرقة جبال الأمانوس عند الغروب.',
      tr: 'Akdeniz\'in en uzun ve popüler sahil bantlarından biri. Yürüyüş ve bisiklet yolları, palmiye ağaçları, İskenderun Körfezi manzarası, Atatürk Anıtı Meydanı ve belediyeye ait dinlenme alanlarıyla kentin simgesel yaşam merkezidir.'
    },
    features: [
      { ar: 'مسار دراجات وممشى رياضي بطول الساحل', tr: 'Geniş yürüyüş ve bisiklet parkurları' },
      { ar: 'ميدان النصب التذكاري لاحتفالات المدينة', tr: 'Atatürk Anıtı ve etkinlik meydanı' },
      { ar: 'مقاهي ومقاعد استراحة بلدية بأسعار طلابية', tr: 'Belediye sosyal tesisleri ve kafeler' },
      { ar: 'إطلالة خلابة على الغروب في خليج إسكندرون', tr: 'Körfez ve gün batımı manzarası' }
    ],
    address: {
      ar: 'شارع أتاتورك، الواجهة البحرية، وسط إسكندرون، هاتاي',
      tr: 'Atatürk Bulvarı, Sahil Şeridi, Merkez, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=Atat%C3%BCrk+An%C4%B1t%C4%B1+%C4%B0skenderun+Sahil',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'مفتوح 24 ساعة (المرافق والإنارة تعمل يومياً)',
      tr: '7/24 Açık (Sosyal tesisler: 08:00 - 23:30)'
    },
    tipsForStudents: {
      ar: 'يمكنك الوصول إليه من حرم جامعة İSTE المركزي بسهولة عبر حافلات النقل الداخلي المتجهة لوسط المدينة (Çarşı) في أقل من 15 دقيقة، أو الاستمتاع بركوب الدراجات.',
      tr: 'Merkez kampüsten dolmuşlarla veya bisikletle 10-15 dakikada ulaşılabilir. Ders sonrası dinlenmek için idealdir.'
    }
  },
  {
    id: 'place-millet-parki',
    name: {
      ar: 'حديقة الشعب المركزية (Millet Parkı)',
      tr: 'İskenderun Millet Parkı'
    },
    category: 'park',
    categoryLabel: {
      ar: 'حديقة عامة ومتنزه',
      tr: 'Şehir Parkı'
    },
    description: {
      ar: 'أنشأتها بلدية إسكندرون على مساحة تقارب 50 دونماً في موقع المطار القديم واستاد 5 تموز سابقاً. تُعد متنفساً طبيعياً كبيراً للمدينة، وتحتوي على بحيرة بيولوجية اصطناعية، مدرج مسرحي مكشوف، سينما صيفية، وملاعب كرة سلة وطائرة، بالإضافة إلى مكتبة ومسارات جري مظللة.',
      tr: 'İskenderun Belediyesi ve Çevre Bakanlığı iş birliğiyle yaklaşık 50 dönüm alan üzerine inşa edilen modern şehir parkı. Biyolojik arıtmalı göleti, amfi tiyatrosu, yürüyüş ve spor parkurları, kütüphanesi ve dinlenme kamelyalarıyla gençlerin ve öğrencilerin gözdesidir.'
    },
    features: [
      { ar: 'بحيرة مائية بيولوجية ونوافير جميلة', tr: 'Biyolojik yapay gölet ve su gösterileri' },
      { ar: 'ملاعب كرة سلة وطائرة ومسار جري مطاطي', tr: 'Basketbol/voleybol sahaları ve tartan pist' },
      { ar: 'مكتبة هادئة ومدرج للمحاضرات والأنشطة', tr: 'Millet Kütüphanesi ve açık hava amfisi' },
      { ar: 'مناطق جلسات عائلية وشبابية مريحة', tr: 'Geniş yeşil alanlar ve kamelyalar' }
    ],
    address: {
      ar: 'حي ميدان، خلف الكورنيش، إسكندرون، هاتاي',
      tr: 'Meydan Mahallesi, 5 Temmuz Cad. Civarı, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=%C4%B0skenderun+Millet+Park%C4%B1',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'يومياً: 06:00 صباحاً - 00:00 منتصف الليل',
      tr: 'Hergün: 06:00 - 00:00'
    },
    tipsForStudents: {
      ar: 'مكان ممتاز للمذاكرة الجماعية في الهواء الطلق أو ممارسة الرياضة الصباحية بالقرب من قلب المدينة.',
      tr: 'Açık havada ders çalışmak, spor yapmak ve arkadaş gruplarıyla toplanmak için mükemmel bir atmosfer sunar.'
    }
  },
  {
    id: 'place-deniz-muzesi',
    name: {
      ar: 'متحف إسكندرون البحري (İskenderun Deniz Müzesi)',
      tr: 'İskenderun Deniz Müzesi & Kültür Sitesi'
    },
    category: 'museum',
    categoryLabel: {
      ar: 'متحف وتاريخ بحري',
      tr: 'Müze & Kültür'
    },
    description: {
      ar: 'ثالث متحف بحري تم افتتاحه في الجمهورية التركية (عام 2009). يقع في مبنى قيادة القوات البحرية التاريخي على الكورنيش، ويعرض وثائق ونماذج لسفن تاريخية ومقتنيات بحرية ومدافع تعود للعهد العثماني وفترة انضمام لواء إسكندرون وهاتاي للجمهورية.',
      tr: 'Türkiye\'nin üçüncü deniz müzesi olarak 2009 yılında hizmete açılmıştır. Türk denizcilik tarihi, Akdeniz muharebeleri, İskenderun ve Hatay\'ın kurtuluş süreci ile denizcilik objelerini, tarihi silahları ve gemi maketlerini sergilemektedir.'
    },
    features: [
      { ar: 'نماذج لسفن حربية وغواصات تاريخية', tr: 'Tarihi gemi, fırkateyn ve denizaltı maketleri' },
      { ar: 'مدافع وعتاد بحري عثماني أصيل', tr: 'Osmanlı ve erken Cumhuriyet dönemi deniz topları' },
      { ar: 'قاعة توثيق تحرير هاتاي وانضمامها للجمهورية', tr: 'Hatay\'ın Türkiye\'ye katılış sergi salonu' },
      { ar: 'رسوم دخول رمزية جداً للطلاب بالبطاقة الجامعية', tr: 'Öğrenci kimliğiyle çok uygun indirimli giriş' }
    ],
    address: {
      ar: 'شارع أتاتورك، قيادة القاعدة البحرية، إسكندرون، هاتاي',
      tr: 'Atatürk Bulvarı, Deniz Üs Komutanlığı Yanı, Merkez, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=%C4%B0skenderun+Deniz+M%C3%BCzesi',
    image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'الثلاثاء - الأحد: 09:00 - 17:00 (مغلق يوم الاثنين)',
      tr: 'Salı - Pazar: 09:00 - 17:00 (Pazartesi kapalıdır)'
    },
    tipsForStudents: {
      ar: 'تأكد من إبراز بطاقتك الجامعية الصادرة من İSTE للحصول على التذكرة المخفضة للطلاب.',
      tr: 'İSTE öğrenci kimlik kartınızı gişede ibraz ederek indirimli bilet avantajından yararlanabilirsiniz.'
    }
  },
  {
    id: 'place-ziraat-parki',
    name: {
      ar: 'منتزه زراعات بارك العائلي (Ziraat Parkı)',
      tr: 'İskenderun Belediyesi Ziraat Park & Aile Bahçesi'
    },
    category: 'park',
    categoryLabel: {
      ar: 'حديقة بيئية وثقافية',
      tr: 'Ekolojik Park & Sosyal Tesis'
    },
    description: {
      ar: 'مشروع بيئي رائد نفذته بلدية إسكندرون على أرض زراعية قديمة. يحتوي على بساتين تضم آلاف أشجار الحمضيات والبرتقال والليمون، وتقوم البلدية بتوزيع ثمارها مجاناً على الأهالي في موسم الحصاد. يضم كافيه بلدية بأسعار رمزية ومناطق تنزه واسعة.',
      tr: 'İskenderun Belediyesi bünyesinde bölgenin en büyük tematik yeşil alanlarından biri. Binlerce narenciye ağacı (portakal, mandalina, limon), yürüyüş yolları, çocuk oyun alanları ve uygun fiyatlı Ziraat Park Aile Kafe hizmet vermektedir.'
    },
    features: [
      { ar: 'بساتين برتقال وحمضيات أصيلة في قلب المدينة', tr: 'Geniş narenciye ve meyve bahçeleri' },
      { ar: 'كافيه البلدية بأسعار اقتصادية مدعومة', tr: 'İskenderun Belediyesi Sosyal Kafe' },
      { ar: 'أجواء ريفية هادئة مناسبة للقراءة والاسترخاء', tr: 'Doğal, sakin dinlenme ve kitap okuma alanları' }
    ],
    address: {
      ar: 'حي عصمت إينونو (İsmet İnönü Mah)، إسكندرون، هاتاي',
      tr: 'İsmet İnönü Mahallesi, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=Ziraat+Park+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'يومياً: 08:00 - 23:00',
      tr: 'Hergün: 08:00 - 23:00'
    },
    tipsForStudents: {
      ar: 'يقع بالقرب من منطقة بازار الأربعاء، ويعد محطة رائعة لتناول الشاي والقهوة بأسعار مخفضة جداً بعد التسوق أو الدوام.',
      tr: 'Çarşamba Pazarı\'na yakın konumdadır. Uygun fiyatlı çay-kahve içmek ve doğayla baş başa kalmak için birebirdir.'
    }
  },
  {
    id: 'place-tarihi-carsi',
    name: {
      ar: 'سوق إسكندرون التاريخي وشارع الشهيد بامير (Tarihi Çarşı)',
      tr: 'Tarihi Çarşı & Şehit Pamir Caddesi'
    },
    category: 'landmark',
    categoryLabel: {
      ar: 'أسواق تجارية وتاريخية',
      tr: 'Tarihi Çarşı & Alışveriş'
    },
    description: {
      ar: 'المركز التجاري والشريان النابض لمدينة إسكندرون. يضم محلات التوابل والبهارات، محامص القهوة التقليدية، ومحلات بيع حلاوة الجبن والكنافة الإسكندرونية الشهيرة، بالإضافة لأزقة التسوق التاريخية ذات العمارة الحجرية القديمة.',
      tr: 'Kentin en işlek ticaret ve kültür aksı. Şehit Pamir ve Ulucami çevresinde uzanan tarihi dükkanlar, baharatçılar, yöresel Hatay tatlıcıları, künefeciler ve giyim çarşıları burada yer alır.'
    },
    features: [
      { ar: 'محلات التوابل والزعتر والزيتون وزيت الغار', tr: 'Geleneksel baharatçılar, defne sabunları ve zeytinyağı' },
      { ar: 'أشهر محلات الكنافة وحلاوة الجبن بالآيسكريم', tr: 'Hatay künefesi ve meşhur tatlıcılar' },
      { ar: 'مراكز صرافة، بنوك، ومستلزمات دراسية وشخصية', tr: 'Döviz büroları, bankalar ve kırtasiyeler' }
    ],
    address: {
      ar: 'شارع الشهيد بامير، مركز المدينة، إسكندرون، هاتاي',
      tr: 'Şehit Pamir Caddesi & Kanatlı Cad., Merkez, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=%C5%9Eehit+Pamir+Caddesi+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'المحلات تعمل يومياً: 08:30 - 21:00 (باستثناء الأحد لبعض المحال)',
      tr: 'Genellikle 08:30 - 21:00 arası açık'
    },
    tipsForStudents: {
      ar: 'هنا تجد كافة فروع البنوك الرسمية (Ziraat, Vakıf, Halkbank) التي يحتاجها الطلاب لدفع الرسوم واستخراج البطاقات البنكية.',
      tr: 'Öğrenci harç yatırma ve banka kartı işlemleri için tüm ana banka şubeleri bu cadde üzerindedir.'
    }
  },
  {
    id: 'place-nihal-atakas-camii',
    name: {
      ar: 'جامع نهال أتاكاش الساحلي (Nihal Atakaş Camii)',
      tr: 'Nihal Atakaş Camii (Sahil Camii)'
    },
    category: 'historic',
    categoryLabel: {
      ar: 'معلم ديني ومعماري',
      tr: 'Dini & Mimari Yapı'
    },
    description: {
      ar: 'تحفة معمارية بارزة تزيّن كورنيش إسكندرون، تجمع بين أصالة العمارة العثمانية والزخارف السلجوقية. يتسع المسجد لأكثر من 3000 مصلٍ، ويطل مباشرة على أمواج البحر بمئذنتين رشيقتين وقبة متميزة، ويُعد من أبرز المعالم الحديثة التي يفتخر بها أهالي المدينة.',
      tr: 'İskenderun sahil bandında denizle iç içe konumlanan abidevi cami. Osmanlı ve Selçuklu mimari motifleriyle inşa edilmiş olup 3.000 kişilik kapasitesi ve sahil siluetine kattığı zarafetle kentin önemli simgelerindendir.'
    },
    features: [
      { ar: 'موقع ساحلي مميز ومفتوح على نسيم البحر', tr: 'Deniz manzaralı geniş sahil avlusu' },
      { ar: 'تصميم زخرفي إسلامي بالرخام الطبيعي', tr: 'Selçuklu ve Osmanlı taş işçiliği' },
      { ar: 'مكان رحب لصلاة الجمعة والمناسبات الدينية', tr: 'Geniş ibadet kapasitesi ve şadırvan' }
    ],
    address: {
      ar: 'طريق الساحل، مقابل الكورنيش، إسكندرون، هاتاي',
      tr: 'Çay Mahallesi, Sahil Kordonu, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=Nihal+Ataka%C5%9F+Camii+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'مفتوح في جميع أوقات الصلوات الخمس يومياً',
      tr: 'Tüm vakit namazlarında açıktır'
    },
    tipsForStudents: {
      ar: 'يقع مباشرة على مسار المشي الساحلي، وتوجد أمامه مساحات خضراء رائعة للجلوس والراحة.',
      tr: 'Sahil yürüyüşü esnasında kolayca ziyaret edilebilir, ferah avlusunda dinlenilebilir.'
    }
  },
  {
    id: 'place-orman-parki',
    name: {
      ar: 'منتزه غابة إسكندرون والمطل البانورامي (Orman Parkı & Seyir Terası)',
      tr: 'İskenderun Seyir Terası & Orman Mesire Alanı'
    },
    category: 'park',
    categoryLabel: {
      ar: 'مطل طبيعي وتخييم',
      tr: 'Doğal Mesire Alanı'
    },
    description: {
      ar: 'منتزه طبيعي يقع على السفوح الخضراء لجبال الأمانوس المطلة على المدينة. يوفر شرفة مراقبة بانورامية تطل على كامل خليج إسكندرون والسفن والميناء والمدينة بأكملها، ومجهّز بمناطق للشواء والجلوس الخشبي والمقاهي العائلية.',
      tr: 'Amanos Dağları eteklerinde kurulu, İskenderun Körfezi\'ni ve limanını kuşbakışı seyretme imkânı sunan seyir terası ve mesire alanı. Temiz dağ havası, piknik alanları ve doğa yürüyüşü rotaları barındırır.'
    },
    features: [
      { ar: 'إطلالة بانورامية ساحرة على البحر والمدينة بالكامل', tr: 'Tüm kenti ve körfezi gören panoramik manzara' },
      { ar: 'جلسات خشبية ومظلات للتنزه العائلي والطلابي', tr: 'Piknik kamelyaları ve dinlenme tesisleri' },
      { ar: 'هواء نقي ومسارات للمشي بين أشجار الصنوبر', tr: 'Çam ormanları içinde temiz hava' }
    ],
    address: {
      ar: 'سفوح جبال الأمانوس، حي نومونة / دينيزجيلار، إسكندرون، هاتاي',
      tr: 'Amanos Dağı Etekleri, Numune Mevkii, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=%C4%B0skenderun+Seyir+Teras%C4%B1',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'يومياً: 08:00 صباحاً - 22:30 مساءً',
      tr: 'Hergün: 08:00 - 22:30'
    },
    tipsForStudents: {
      ar: 'يُفضل زيارته في عطلة نهاية الأسبوع قبيل وقت الغروب لالتقاط صور تذكارية مذهلة للمدينة من الأعلى.',
      tr: 'Gün batımı saatinde şehri yukarıdan fotoğraflamak ve hafta sonu kafa dinlemek için harika bir yerdir.'
    }
  },
  {
    id: 'place-sokullu-payas',
    name: {
      ar: 'مجمع صوقوللو محمد باشا وقلعة باياس (Sokullu Mehmet Paşa Külliyesi)',
      tr: 'Sokullu Mehmet Paşa Külliyesi & Payas Kalesi'
    },
    category: 'historic',
    categoryLabel: {
      ar: 'آثار وتراث عثماني',
      tr: 'Tarihi Külliye & Kale'
    },
    description: {
      ar: 'تحفة تاريخية شيدها كبير المهندسين العثمانيين المعمار سنان عام 1574 بأمر من الصدر الأعظم صوقوللو محمد باشا. يضم المجمع خاناً ضخماً للقوافل (كاروانسراي)، وسوقاً مسقوفاً (بيدستان) يضم دكاكين وحرفيين، ومدرسة، ومسجداً وحماماً أثرياً، بجانب قلعة باياس وبرج الجن التاريخي، على بعد 15 دقيقة فقط من إسكندرون.',
      tr: '1574 yılında Sadrazam Sokullu Mehmet Paşa adına Mimar Sinan tarafından inşa edilen muazzam külliye. Kervansaray, arasta (çarşı), hamam, medrese, cami ve yanı başındaki tarihi Payas Kalesi ile bölgenin en önemli tarihi miras alanıdır.'
    },
    features: [
      { ar: 'تصميم هندسي متكامل من إبداع المعمار سنان', tr: 'Mimar Sinan\'ın eşsiz mimari eseri' },
      { ar: 'سوق حرفي قديم يعمل حتى اليوم بالحرف اليدوية', tr: 'Tarihi arasta ve el sanatları atölyeleri' },
      { ar: 'قلعة باياس الصليبية-العثمانية المحصنة وخندقها', tr: 'Payas Kalesi ve tarihi savunma burçları' }
    ],
    address: {
      ar: 'منطقة باياس، شمال إسكندرون (15 دقيقة بالحافلة)، هاتاي',
      tr: 'Payas İlçe Merkezi, İskenderun-Dörtyol Arası / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=Sokullu+Mehmet+Pa%C5%9Fa+K%C3%BClliyesi+Payas',
    image: 'https://images.unsplash.com/photo-1548625361-16a7f05b0728?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'يومياً: 08:30 - 18:00 (الدخول مجاني للعامة)',
      tr: 'Hergün: 08:30 - 18:00 (Giriş Ücretsizdir)'
    },
    tipsForStudents: {
      ar: 'يمكن للطلاب الذهاب بالحافلات الصغيرة (Dolmuş) من محطة إسكندرون المتجهة إلى باياس بتكلفة بسيطة جداً لقضاء جولة تاريخية لا تُنسى.',
      tr: 'İskenderun otogarından Payas dolmuşlarıyla 20 dakikada ulaşılabilir. Tarih meraklısı öğrenciler için kaçırılmayacak bir yerdir.'
    }
  },
  {
    id: 'place-arsuz-plaji',
    name: {
      ar: 'شواطئ وكورنيش أرسوز (Arsuz Sahili ve Plajları)',
      tr: 'Arsuz Sahili, Plajları ve Tarihi Evleri'
    },
    category: 'coast',
    categoryLabel: {
      ar: 'شواطئ واستجمام',
      tr: 'Plaj & Deniz'
    },
    description: {
      ar: 'المصيف والواحة البحرية المحببة لطلاب إسكندرون على بعد 25 دقيقة فقط جنوب المدينة. تتميز أرسوز بمياهها الصافية الهادئة وشواطئها الرملية الخالية من الصخور، وطواحينها ومنازلها الحجرية التراثية، ومقاهيها المنتشرة على مصب النهر في البحر.',
      tr: 'İskenderun\'a komşu, bölgenin en ünlü sahil ve tatil kasabası. İnce kumlu denize girilebilir halk plajları, Arsuz Çayı üzerindeki balıkçı restoranları ve tarihi Rum evleriyle yaz aylarında öğrencilerin bir numaralı kaçış noktasıdır.'
    },
    features: [
      { ar: 'شواطئ رملية واسعة مثالية للسباحة في الصيف', tr: 'Yüzmeye elverişli kumluk halk plajları' },
      { ar: 'مصب نهر أرسوز والقوارب الترفيهية', tr: 'Nehir ve deniz buluşma noktası' },
      { ar: 'أزقة ومنازل تاريخية ومطاعم المأكولات البحرية', tr: 'Tarihi sokaklar ve kafeler' }
    ],
    address: {
      ar: 'أرسوز (جنوب إسكندرون بـ 25 كم)، هاتاي',
      tr: 'Arsuz Merkez & Sahil Yolu / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=Arsuz+Halk+Plaj%C4%B1+Hatay',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'الشواطئ العامة مفتوحة طوال اليوم',
      tr: 'Plajlar 7/24 halka açıktır'
    },
    tipsForStudents: {
      ar: 'تنطلق حافلات أرسوز باستمرار من كراج إسكندرون، وتبلغ أجرة النقل مبالغ مناسبة جداً للطلاب.',
      tr: 'İskenderun şehir merkezinden her 15 dakikada kalkan Arsuz dolmuşlarıyla kolayca gidilebilir.'
    }
  },
  {
    id: 'place-sogukoluk',
    name: {
      ar: 'مرتفعات غوزال يايلا وصوغوك أولوك (Güzelyayla - Soğukoluk Yaylası)',
      tr: 'Güzelyayla (Soğukoluk) Yaylası'
    },
    category: 'landmark',
    categoryLabel: {
      ar: 'مرتفعات جبلية ومصايف',
      tr: 'Doğa & Yayla'
    },
    description: {
      ar: 'مصيف جبلي تاريخي وشهير في جبال الأمانوس يبعد 18 كم عن إسكندرون، يرتفع حوالي 800 متر عن سطح البحر. يمتاز بهوائه البارد العليل حتى في ذروة الصيف، وتكثر فيه ينابيع المياه العذبة ومطاعم المشاوي الجبلية وأشجار الغابات الكثيفة.',
      tr: 'İskenderun\'a yaklaşık 18 km mesafede, Amanos Dağları\'nın 800 metre rakımında yer alan tarihi yayla. Yazın bunaltıcı sıcaklarında serin havası, gür çam ormanları, buz gibi su kaynakları ve yayla restoranlarıyla ünlüdür.'
    },
    features: [
      { ar: 'مناخ بارد ومنعش وطبيعة بكر خضراء', tr: 'Yazın bile serin, temiz yayla havası' },
      { ar: 'جلسات شواء ومطاعم ريفية بأسعار معقولة', tr: 'Piknik yerleri ve kır lokantaları' },
      { ar: 'مسارات للمشي الجبلي واستكشاف الطبيعة', tr: 'Doğa yürüyüşü ve trekking parkurları' }
    ],
    address: {
      ar: 'مرتفعات بيلين / صوغوك أولوك، ريف إسكندرون، هاتاي',
      tr: 'Belen Geçidi Üzeri, Soğukoluk (Güzelyayla) Mevkii, İskenderun / Hatay'
    },
    mapUrl: 'https://maps.google.com/?q=So%C4%9Fukoluk+G%C3%BCzelyayla+%C4%B0skenderun',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=70',
    workingHours: {
      ar: 'المنطقة الطبيعية مفتوحة على مدار اليوم',
      tr: 'Yaylaya erişim serbesttir'
    },
    tipsForStudents: {
      ar: 'في أشهر الصيف الحارة (يوليو وأغسطس)، تُعد هذه المرتفعات الملاذ الأفضل للدراسة أو التخييم بعيداً عن حرارة الساحل.',
      tr: 'Yaz sıcaklarında serinlemek ve doğa gezisi yapmak için üniversite öğrenci topluluklarının sıkça gezi düzenlediği bir yayladır.'
    }
  }
];

export const iskenderunWeeklyBazaars: WeeklyBazaar[] = [
  {
    id: 'bazaar-pazartesi-cankaya',
    name: {
      ar: 'بازار تشانكايا (Pazartesi Pazarı - Çankaya)',
      tr: 'Çankaya Pazartesi Semt Pazarı'
    },
    day: 'monday',
    dayName: {
      ar: 'الإثنين',
      tr: 'Pazartesi'
    },
    neighborhood: {
      ar: 'حي تشانكايا (Çankaya Mahallesi)',
      tr: 'Çankaya Mahallesi'
    },
    locationDetails: {
      ar: 'يُقام في الشوارع المركزية لحي تشانكايا (شارع 350 ومحيط شارع الشهيد أوغوزهان)، ويخدم سكان المناطق المرتفعة وسكنات الطلاب المحيطة.',
      tr: 'Çankaya Mahallesi 350. Sokak ve Şehit Er Oğuzhan Cd. civarında kurulur. Taze meyve, sebze ve temel ev gereçleri bulunur.'
    },
    itemsSold: [
      { ar: 'خضار وفواكه طازجة مباشرة من المزارع', tr: 'Taze sebze ve meyveler' },
      { ar: 'أجبان، زيتون، ألبان، وبيض بلدي', tr: 'Köy peyniri, zeytin ve süt ürünleri' },
      { ar: 'أدوات منزلية ومستلزمات مطبخ اقتصادية', tr: 'Züccaciye ve mutfak gereçleri' }
    ],
    hours: '08:00 - 18:30',
    coordinates: { lat: 36.56842, lng: 36.17724 },
    mapUrl: 'https://www.google.com/maps?q=36.56842,36.17724+(Cankaya+Pazartesi+Pazari+Iskenderun)',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'يبعد حوالي 10 دقائق بالحافلة من الحرم المركزي لـ İSTE',
      tr: 'İSTE Merkez kampüsüne araçla yaklaşık 10 dakika mesafede'
    }
  },
  {
    id: 'bazaar-sali-modern-evler',
    name: {
      ar: 'بازار موديرن إيفلير وكوجاتيبي (Salı Pazarı - Modern Evler)',
      tr: 'Modern Evler / Kocatepe Salı Semt Pazarı'
    },
    day: 'tuesday',
    dayName: {
      ar: 'الثلاثاء',
      tr: 'Salı'
    },
    neighborhood: {
      ar: 'حي موديرن إيفلير وكوجاتيبي (Modern Evler / Kocatepe)',
      tr: 'Modern Evler ve Kocatepe Mahallesi'
    },
    locationDetails: {
      ar: 'سوق حيوي يغطي منطقة موديرن إيفلير (شارع 305 وشارع كوجاتيبي)، إحدى أكبر المناطق السكنية في إسكندرون التي يقطنها الكثير من الطلاب وعائلات الأساتذة.',
      tr: 'Modern Evler Mahallesi 305. Sokak ve Kocatepe pazar alanında geniş katılımla kurulur. Bölgenin en işlek salı pazarlarındandır.'
    },
    itemsSold: [
      { ar: 'خضراوات وفواكه موسمية وبقوليات رخيصة', tr: 'Mevsimlik meyve, sebze ve bakliyat' },
      { ar: 'ملابس وأحذية وأقمشة بأسعار مخفضة', tr: 'Uygun fiyatlı giyim, tekstil ve ayakkabı' },
      { ar: 'توابل وزعتر ومخللات هاتاي المشهورة', tr: 'Hatay baharatları, kuru gıda ve turşular' }
    ],
    hours: '08:00 - 18:30',
    coordinates: { lat: 36.59124, lng: 36.18341 },
    mapUrl: 'https://www.google.com/maps?q=36.59124,36.18341+(Modern+Evler+Sali+Pazari+Iskenderun)',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'قريب جداً من خطوط سرافيس الطلاب وسكنات موديرن إيفلير',
      tr: 'Öğrenci evlerinin yoğun olduğu bölgede yer alır'
    }
  },
  {
    id: 'bazaar-carsamba-ismet-inonu',
    name: {
      ar: 'بازار عصمت إينونو الضخم (Çarşamba Pazarı - İsmet İnönü)',
      tr: 'İsmet İnönü Çarşamba Pazarı (Büyük Çarşamba Pazarı)'
    },
    day: 'wednesday',
    dayName: {
      ar: 'الأربعاء',
      tr: 'Çarşamba'
    },
    neighborhood: {
      ar: 'حي عصمت إينونو (İsmet İnönü Mahallesi) - بجوار زراعات بارك',
      tr: 'İsmet İnönü Mahallesi Kapalı/Açık Pazar Alanı'
    },
    locationDetails: {
      ar: 'أحد أشهر وأكبر الأسواق الأسبوعية في إسكندرون على الإطلاق (شارع الشهيد بوليس أيهان كيفراك)! يتميز بتنوع هائل في الملابس، الأقمشة، الأواني المنزلية، إضافة لأقسام الخضار والفواكه.',
      tr: 'İskenderun\'un en büyük ve en çok ziyaret edilen haftalık pazarlarından biridir. Şehit Polis Ayhan Kıvrak Cd. Ziraat Parkı arkasında kurulur.'
    },
    itemsSold: [
      { ar: 'سوق ملابس وأحذية وأغطية سرائر ضخم جداً', tr: 'Büyük giyim, ayakkabı ve tekstil pazarı' },
      { ar: 'أسعار خضار وفواكه هي الأوفر أسبوعياً', tr: 'Büyük toptancı ve üretici sebze-meyve tezgâhları' },
      { ar: 'منتجات ريفية: دبس رمان، صابون غار، زيت زيتون', tr: 'Nar ekşisi, defne sabunu, zeytinyağı ve köy salçaları' }
    ],
    hours: '07:30 - 19:00',
    coordinates: { lat: 36.58285, lng: 36.16642 },
    mapUrl: 'https://www.google.com/maps?q=36.58285,36.16642+(Ismet+Inonu+Carsamba+Pazari+Iskenderun)',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'على بعد 7 دقائق بالحافلة من الجامعة، بجوار منتزه زراعات بارك',
      tr: 'Ziraat Parkı\'na komşu, kampüse ve yurtlara çok kolay ulaşım'
    }
  },
  {
    id: 'bazaar-persembe-feyzan',
    name: {
      ar: 'بازار الخميس - قناة فيزان وجمهوريات (Perşembe Pazarı)',
      tr: 'Cumhuriyet & Feyzan Kanalı Perşembe Pazarı'
    },
    day: 'thursday',
    dayName: {
      ar: 'الخميس',
      tr: 'Perşembe'
    },
    neighborhood: {
      ar: 'حي جمهوريات، شارع مدحت باشا (على طول قناة فيزان)',
      tr: 'Cumhuriyet Mahallesi, Mithat Paşa Caddesi & Feyzan Kanalı'
    },
    locationDetails: {
      ar: 'يقام على امتداد مجرى قناة فيزان الشهيرة في حي جمهوريات وشارع مدحت باشا، ويُعد مقصداً معتاداً للتسوق الأسبوعي للعائلات والطلاب القاطنين في مركز المدينة ومحيط محطة القطار.',
      tr: 'Cumhuriyet Mahallesi\'nde, Mithat Paşa Cd. ve Feyzan Kanalı boyunca uzanan geleneksel pazar. Şehir merkezine yürüme mesafesindedir.'
    },
    itemsSold: [
      { ar: 'خضار ورقية طازجة، حمضيات، طماطم، بطاطس', tr: 'Taze yeşillikler, narenciye ve sebzeler' },
      { ar: 'مستلزمات دراسية ومنزلية وأدوات بلاستيكية', tr: 'Plastik eşyalar, ev temizlik malzemeleri' },
      { ar: 'أسماك بحرية طازجة من صيادي خليج إسكندرون', tr: 'Körfezden taze günlük balık tezgâhları' }
    ],
    hours: '08:00 - 18:30',
    coordinates: { lat: 36.58622, lng: 36.16105 },
    mapUrl: 'https://www.google.com/maps?q=36.58622,36.16105+(Cumhuriyet+Feyzan+Kanali+Persembe+Pazari)',
    image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'قريب من محطة قطار إسكندرون ووسط البلد',
      tr: 'Tren garına ve şehir merkezine yakın'
    }
  },
  {
    id: 'bazaar-cuma-eski-hal',
    name: {
      ar: 'سوق الجمعة للقرى والمنتجات البلدية (Cuma Köy Pazarı - Eski Hal)',
      tr: 'Eski Hal / Çay Mahallesi Cuma Köy Pazarı'
    },
    day: 'friday',
    dayName: {
      ar: 'الجمعة',
      tr: 'Cuma'
    },
    neighborhood: {
      ar: 'منطقة سوق الخضار القديم (Eski Hal)، حي تشاي',
      tr: 'Eski Hal Civarı, Çay Mahallesi'
    },
    locationDetails: {
      ar: 'سوق ريفي صباحي فريد في حي تشاي (شارع 108)، يجلب فيه فلاحو وسيدات قرى جبال الأمانوس وريف هاتاي منتجاتهم العضوية الطازجة (زبدة بلدية، أعشاب طبية، زعتر بري، بيض بلدي، خضار غير مرشوشة).',
      tr: 'Çay Mahallesi 108. Sokak Eski Hal mevkiinde kurulan organik köy pazarı. Yöresel peynirler, doğal tereyağı, taze toplanmış köy otları ve doğal sebzeler bulunur.'
    },
    itemsSold: [
      { ar: 'منتجات طبيعية عضوية 100% من أيدي الفلاحين', tr: 'Doğal köy ürünleri ve yayla yeşillikleri' },
      { ar: 'جبنة الحلوم المقلية والجبنة المدخنة والمشللة', tr: 'Hatay sıkma ve sünme peynirleri' },
      { ar: 'فطائر وخبز التنور الساخن (Biberli Ekmek)', tr: 'Sıcak tandır ekmeği ve biberli ekmek' }
    ],
    hours: '06:00 - 14:00 (صباحي فقط)',
    coordinates: { lat: 36.59154, lng: 36.16952 },
    mapUrl: 'https://www.google.com/maps?q=36.59154,36.16952+(Cay+Mahallesi+Eski+Hal+Cuma+Pazari)',
    image: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'في مركز المدينة، مفضل للزيارة في ساعات الصباح الباكر يوم الجمعة',
      tr: 'Cuma sabahı erken saatlerde ziyaret edilmesi tavsiye edilir'
    }
  },
  {
    id: 'bazaar-cumartesi-mustafa-kemal',
    name: {
      ar: 'بازار مصطفى كمال (الأقرب للجامعة) - السبت (Cumartesi Pazarı)',
      tr: 'Mustafa Kemal Cumartesi Semt Pazarı (Kampüse En Yakın)'
    },
    day: 'saturday',
    dayName: {
      ar: 'السبت',
      tr: 'Cumartesi'
    },
    neighborhood: {
      ar: 'حي مصطفى كمال (Mustafa Kemal Mah) - بجوار الحرم المركزي لـ İSTE',
      tr: 'Mustafa Kemal Mahallesi Kapalı Semt Pazarı'
    },
    locationDetails: {
      ar: 'أهم وأقرب بازار أسبوعي لطلاب جامعة إسكندرون التقنية (İSTE)! يقع في شارع 1019 رقم 2C بجوار سكنات الطلاب وحي مصطفى كمال، ويقصده آلاف الطلاب صباح كل سبت لشراء احتياجات الأسبوع بأسعار التوفير.',
      tr: 'Mustafa Kemal Mahallesi 1019. Sokak No:2C adresinde, İSTE Merkez Kampüsü ve öğrenci yurtlarının bitişiğinde kurulur. Öğrencilerin ana alışveriş merkezidir.'
    },
    itemsSold: [
      { ar: 'خضار وفواكه بالصناديق والكيلو بأرخص أسعار الأسبوع', tr: 'Haftalık taze sebze ve meyve alışverişi' },
      { ar: 'بيض، أجبان، حليب، مكسرات، ومأكولات خفيفة', tr: 'Kahvaltılıklar, kuru yemiş ve yumurta' },
      { ar: 'مستلزمات الغرف والملابس القطنية للطلاب', tr: 'Öğrenci odası ihtiyaçları, tişört ve çoraplar' }
    ],
    hours: '08:00 - 19:30',
    coordinates: { lat: 36.57463, lng: 36.15584 },
    mapUrl: 'https://www.google.com/maps?q=36.57463,36.15584+(Mustafa+Kemal+Cumartesi+Halk+Pazari)',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'مشي 5 إلى 10 دقائق فقط من بوابات وسكنات جامعة İSTE!',
      tr: 'İSTE Merkez Kampüsü ve yurtlardan yürüyerek 5-10 dakika!'
    }
  },
  {
    id: 'bazaar-cumartesi-sakarya',
    name: {
      ar: 'بازار سكاريا المسقوف - السبت (Sakarya Kapalı Semt Pazarı)',
      tr: 'Sakarya Mahallesi Çok Amaçlı Kapalı Semt Pazarı'
    },
    day: 'saturday',
    dayName: {
      ar: 'السبت',
      tr: 'Cumartesi'
    },
    neighborhood: {
      ar: 'حي سكاريا (Sakarya Mahallesi)',
      tr: 'Sakarya Mahallesi'
    },
    locationDetails: {
      ar: 'مجمع أسواق مسقوف أنشأته بلدية إسكندرون في شارع 1890 بحي سكاريا لحماية المتسوقين من الأمطار وحرارة الشمس، سوق نظيف ومنظم جداً يضم مواقف سيارات ومرافق عامة.',
      tr: 'Sakarya Mahallesi 1890. Sokak üzerinde İskenderun Belediyesi modern kapalı pazaryeri. Yağmurdan ve güneşten korunaklı ferah alışveriş imkânı sunar.'
    },
    itemsSold: [
      { ar: 'خضار وفواكه مرتبة بنظام وتعقيم', tr: 'Düzenli ve hijyenik sebze/meyve tezgâhları' },
      { ar: 'أقسام مخصصة لمنتجات الألبان والأجبان المبردة', tr: 'Soğuk zincirli şarküteri ve peynir çeşitleri' },
      { ar: 'سوق ملابس وخردوات منزلية', tr: 'Tekstil, züccaciye ve genel ihtiyaçlar' }
    ],
    hours: '08:00 - 19:00',
    coordinates: { lat: 36.57951, lng: 36.17208 },
    mapUrl: 'https://www.google.com/maps?q=36.57951,36.17208+(Sakarya+Kapali+Semt+Pazari+Iskenderun)',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'يبعد 8 دقائق بالحافلة من حرم الجامعة',
      tr: 'Kampüse dolmuşla yaklaşık 8 dakika mesafede'
    }
  },
  {
    id: 'bazaar-pazar-esentepe',
    name: {
      ar: 'بازار الأحد - إيسين تبي ودوملوبينار (Pazar Günü Semt Pazarı)',
      tr: 'Esentepe & Dumlupınar Pazar Günü Pazarı'
    },
    day: 'sunday',
    dayName: {
      ar: 'الأحد',
      tr: 'Pazar'
    },
    neighborhood: {
      ar: 'حي إيسين تبي ودوملوبينار (Esentepe / Dumlupınar)',
      tr: 'Esentepe ve Dumlupınar Mahallesi'
    },
    locationDetails: {
      ar: 'يقام يوم الأحد في حي إسنتيبي (نهاية شارع كوجاتيبي وشارع 391) لخدمة الموظفين والطلاب في يوم العطلة الرسمية، يحتوي على تشكيلة منوعة من الأغذية والملابس.',
      tr: 'Esentepe Mahallesi Kocatepe Cd. sonu ve 391. Sokak civarında pazar günü kurulan mahalle pazarı.'
    },
    itemsSold: [
      { ar: 'خضار وفواكه أسبوعية طازجة', tr: 'Haftalık taze sebze ve meyveler' },
      { ar: 'ملابس وأدوات منزلية بسيطة', tr: 'Giyim ve pratik ev aletleri' },
      { ar: 'بهارات وأعشاب برية وزيتون', tr: 'Yöresel zeytin ve baharatlar' }
    ],
    hours: '08:30 - 18:00',
    coordinates: { lat: 36.56455, lng: 36.16523 },
    mapUrl: 'https://www.google.com/maps?q=36.56455,36.16523+(Esentepe+Dumlupinar+Pazar+Pazari)',
    image: 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?w=800&auto=format&fit=crop&q=70',
    proximityToUniv: {
      ar: 'في المناطق السكنية المرتفعة، مواصلات السيرفيس متوفرة يوم الأحد',
      tr: 'Pazar günleri minibüslerle kolay ulaşım sağlanır'
    }
  }
];

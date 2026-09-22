import { NewsItem, CourseItem, ActivityItem, ImportantLink, UniversityInfo, TopAnnouncement, DeptAnnouncementItem, UniversityNewsItem, DirectoryMember, CityPlace } from '../types';

export const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: {
      ar: "إطلاق الدليل الإرشادي للتسجيل الإلكتروني للفصل الدراسي الجديد",
      tr: "Yeni Dönem Elektronik Kayıt Başvuru Kılavuzu Yayınlandı"
    },
    content: {
      ar: "يسر الهيئة الإدارية لتجمع الطلاب الفلسطينيين في جامعة إسكندرون التقنية إطلاق الدليل الإرشادي المتكامل للتسجيل للطلاب المستجدين والحاليين. يحتوي هذا الدليل على شرح مفصل لخطوات تفعيل القيد واختيار المواد الدراسية وحل المشاكل التقنية في نظام الـ OBS. ندعو جميع الطلاب لمراجعته والتواصل معنا في حال وجود أي استفسار.",
      tr: "İskenderun Teknik Üniversitesi Filistin Öğrenci Topluluğu Yönetim Kurulu, yeni ve mevcut öğrenciler için kapsamlı kayıt kılavuzunu yayınlamaktan mutluluk duyar. Bu kılavuz, OBS sisteminde kayıt yenileme, ders seçimi ve karşılaşılan teknik sorunların çözümü hakkında ayrıntılı bilgiler içermektedir. Tüm öğrencilerin kılavuzu incelemelerini ve soruları için bizimle iletişime geçmelerini rica ederiz."
    },
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60",
    category: {
      ar: "إعلانات عامة",
      tr: "Genel Duyurular"
    },
    date: "2026-06-25",
    tags: [
      { ar: "تسجيل", tr: "Kayıt" },
      { ar: "جامعة إسكندرون", tr: "İSTE" },
      { ar: "مستجدين", tr: "Yeni Öğrenciler" }
    ],
    views: 142
  },
  {
    id: "news-2",
    title: {
      ar: "تجمع الطلاب ينظم معرض التراث والثقافة الفلسطينية في حرم الجامعة",
      tr: "Öğrenci Topluluğu Kampüste Filistin Kültür ve Miras Sergisi Düzenledi"
    },
    content: {
      ar: "بمشاركة واسعة من رئيس الجامعة وعمداء الكليات والطلاب من مختلف الجنسيات، أقام تجمع الطلاب الفلسطينيين معرضاً ثقافياً متكاملاً شمل زوايا للمطرزات التراثية، والصور التاريخية، والمأكولات الشعبية الفلسطينية مثل الكنافة والمسخن، بالإضافة إلى عروض الدبكة الشعبية التي لاقت تفاعلاً كبيراً من الحضور التركي والدولي، لتعزيز الروابط الثقافية وتوضيح الهوية الفلسطينية الأصيلة.",
      tr: "Rektörümüz, fakülte dekanları ve farklı uyruklardan öğrencilerin yoğun katılımıyla, Filistin Öğrenci Topluluğu kampüste kapsamlı bir kültürel sergi düzenledi. Sergide geleneksel el yapımı nakışlar, tarihi fotoğraflar ve Künefe ile Musahhan gibi Filistin'in meşhur lezzetlerinin yer aldığı köşelerin yanı sıra, Türk ve uluslararası öğrencilerden büyük ilgi gören geleneksel Dabke dans gösterileri de yer aldı. Bu etkinlik kültürel bağları güçlendirmeyi ve Filistin kimliğini tanıtmayı amaçlamaktadır."
    },
    image: "https://images.unsplash.com/photo-1605281317010-fe5fed77a941?w=800&auto=format&fit=crop&q=60",
    category: {
      ar: "أنشطة ثقافية",
      tr: "Kültürel Faaliyetler"
    },
    date: "2026-06-20",
    tags: [
      { ar: "ثقافة", tr: "Kültür" },
      { ar: "معرض", tr: "Sergi" },
      { ar: "تراث فلسطيني", tr: "Filistin Mirası" }
    ],
    views: 289
  },
  {
    id: "news-3",
    title: {
      ar: "تنظيم دورة لغة تركية تقوية مجانية بالتعاون مع مركز اللغات بالجامعة",
      tr: "Üniversite Dil Merkezi İşbirliğiyle Ücretsiz Destekleyici Türkçe Kursu Düzenleniyor"
    },
    content: {
      ar: "يعلن تجمع الطلاب عن بدء التسجيل في دورة المحادثة والكتابة باللغة التركية للمستويين المتوسط والمتقدم. تهدف الدورة إلى مساعدة الطلاب الفلسطينيين والعرب على الاندماج الأكاديمي والاجتماعي بشكل أفضل وتجاوز الصعوبات اللغوية في المحاضرات. سيقدم الدورة أساتذة مختصون من مركز لغات الجامعة في قاعات كلية الهندسة.",
      tr: "Öğrenci Topluluğu, orta ve ileri düzeyler için Türkçe konuşma ve yazma kursu kayıtlarının başladığını duyurur. Kurs, Filistinli ve Arap öğrencilerin akademik ve sosyal entegrasyonunu kolaylaştırmayı ve derslerdeki dil engellerini aşmalarına yardımcı olmayı hedeflemektedir. Kurs, Mühendislik Fakültesi dersliklerinde üniversite dil merkezinden uzman eğitmenler tarafından verilecektir."
    },
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60",
    category: {
      ar: "أكاديمي",
      tr: "Akademik"
    },
    date: "2026-06-18",
    tags: [
      { ar: "لغات", tr: "Diller" },
      { ar: "دورة", tr: "Kurs" },
      { ar: "تركي", tr: "Türkçe" }
    ],
    views: 185
  }
];

export const initialImportantLinks: ImportantLink[] = [
  {
    id: "link-1",
    title: {
      ar: "الموقع الرسمي لجامعة إسكندرون التقنية",
      tr: "İskenderun Teknik Üniversitesi Resmi Web Sitesi"
    },
    description: {
      ar: "البوابة الرئيسية للجامعة للوصول إلى كافة الأخبار، الكليات، والإعلانات الأكاديمية الرسمية.",
      tr: "Üniversitenin tüm resmi haberlerine, fakültelerine ve akademik duyurularına erişim için ana portal."
    },
    url: "https://iste.edu.tr",
    iconName: "Globe"
  },
  {
    id: "link-2",
    title: {
      ar: "نظام شؤون الطلاب والدرجات (OBS)",
      tr: "Öğrenci Bilgi Sistemi (OBS)"
    },
    description: {
      ar: "بوابة الطالب لمتابعة العلامات، الغيابات، اختيار المواد والجدول الدراسي الفصلي.",
      tr: "Notları, devamsızlıkları, ders seçimlerini ve dönem ders programını takip etmek için öğrenci portalı."
    },
    url: "https://obs.iste.edu.tr",
    iconName: "GraduationCap"
  },
  {
    id: "link-3",
    title: {
      ar: "دليل الطالب الدولي - جامعة إسكندرون",
      tr: "İSTE Uluslararası Öğrenci Ofisi"
    },
    description: {
      ar: "موقع مكتب الطلاب الدوليين بالجامعة ويحتوي على شروط القبول، الرسوم الدراسية، ومعلومات الإقامة والفيزا.",
      tr: "Üniversite Uluslararası Öğrenci Ofisi web sitesi; kabul şartları, harç ücretleri, ikamet ve vize bilgilerini içerir."
    },
    url: "https://iste.edu.tr/uio",
    iconName: "FileText"
  },
  {
    id: "link-4",
    title: {
      ar: "بوابة المكتبة الإلكترونية المركزية",
      tr: "Merkez Kütüphane Veritabanı Portal"
    },
    description: {
      ar: "تتيح الوصول المجاني لملايين الكتب الرقمية، الأبحاث العلمية، والمقالات لطلاب الجامعة.",
      tr: "Üniversite öğrencileri için milyonlarca dijital kitaba, bilimsel araştırmaya ve makaleye ücretsiz erişim sağlar."
    },
    url: "https://kutuphane.iste.edu.tr",
    iconName: "BookOpen"
  },
  {
    id: "link-5",
    title: {
      ar: "نظام إدارة التعلم الإلكتروني (İSTE-UBOM)",
      tr: "Öğrenme Yönetim Sistemi (İSTE-UBOM)"
    },
    description: {
      ar: "البوابة الرسمية للمواد التعليمية والدروس الإلكترونية والتعليم عن بُعد.",
      tr: "Çevrimiçi uzaktan eğitim dersleri ve eğitim materyalleri için resmi portal."
    },
    url: "http://ubom.iste.edu.tr/",
    iconName: "Laptop"
  }
];

export const initialCourses: CourseItem[] = [
  {
    id: "course-1",
    title: {
      ar: "خوارزميات وهياكل البيانات - ملخصات ومسائل محلولة",
      tr: "Algoritmalar ve Veri Yapıları - Özetler ve Çözümlü Sorular"
    },
    faculty: {
      ar: "كلية الهندسة والعلوم الطبيعية",
      tr: "Mühendislik ve Doğa Bilimleri Fakültesi"
    },
    department: {
      ar: "هندسة الكمبيوتر",
      tr: "Bilgisayar Mühendisliği"
    },
    category: {
      ar: "هندسة برمجيات",
      tr: "Yazılım Mühendisliği"
    },
    description: {
      ar: "ملف متكامل يحتوي على شرح لأهم مواضيع المادة مثل الأشجار والثنائيات والفرز والبحث، بالإضافة إلى نماذج من امتحانات سابقة محلولة بالتفصيل لمساعدة طلاب السنة الثانية.",
      tr: "Ağaçlar, ikili aramalar, sıralama ve arama gibi konularda özet açıklamaların yanı sıra, ikinci sınıf öğrencilerine yardımcı olmak için ayrıntılı çözümlü eski sınav örneklerini içeren kapsamlı bir dosya."
    },
    pdfUrl: "data:application/pdf;base64,JVBERi0xLjQKJ...", // Mock PDF placeholder
    pdfName: "Algorithms_&_Data_Structures_Guide.pdf",
    pdfFiles: [
      {
        id: "pdf-1-f1",
        name: "Algorithms_&_Data_Structures_Guide.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "4.5 MB",
        type: "application/pdf"
      },
      {
        id: "pdf-1-f2",
        name: "Algorithms_Cheatsheet_QuickRef.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "1.2 MB",
        type: "application/pdf"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=RBSGKlAia3M",
    externalUrl: "https://visualgo.net",
    driveUrl: "https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j-sample-algorithms",
    dateAdded: "2026-06-22",
    year: { ar: "السنة الثانية", tr: "2. Sınıf" },
    semester: { ar: "الفصل الأول (خريف)", tr: "Güz Dönemi" },
    driveFolders: [
      {
        id: "f1-c1",
        name: {
          ar: "📚 المحاضرات وسلايدات الشرح",
          tr: "📚 Ders Slaytları ve Anlatımlar"
        },
        files: [
          { id: "fi-1-1", name: { ar: "المحاضرة 1: مقدمة في تعقيد الوقت والنمو", tr: "Ders 1: Zaman Karmaşıklığı ve Büyüme Analizi" }, type: "pdf", size: "2.4 MB", url: "#" },
          { id: "fi-1-2", name: { ar: "المحاضرة 2-3: هياكل البيانات الخطية (Arrays, Stack, Queue)", tr: "Ders 2-3: Doğrusal Veri Yapıları (Diziler, Yığın, Kuyruk)" }, type: "pdf", size: "3.8 MB", url: "#" },
          { id: "fi-1-3", name: { ar: "المحاضرة 4-5: الأشجار الثنائية وأشجار البحث (BST)", tr: "Ders 4-5: İkili Ağaçlar ve Arama Ağaçları (BST)" }, type: "pdf", size: "4.1 MB", url: "#" }
        ]
      },
      {
        id: "f1-c2",
        name: {
          ar: "📝 الامتحانات السابقة والحلول النموذجية",
          tr: "📝 Geçmiş Sınav Soruları ve Çؤ°zümleri"
        },
        files: [
          { id: "fi-2-1", name: { ar: "حل الامتحان النصفي (Midterm) لعام 2025", tr: "2025 Vize Sınavı Soruları ve Çözüm Anahtarı" }, type: "pdf", size: "1.5 MB", url: "#" },
          { id: "fi-2-2", name: { ar: "نماذج الامتحان النهائي (Final) مع الأجوبة", tr: "Geçmiş Dönem Final Sınavı Çözümlü Soru Arşivi" }, type: "pdf", size: "2.9 MB", url: "#" }
        ]
      },
      {
        id: "f1-c3",
        name: {
          ar: "💻 كود ومشاريع عملية ومصادر",
          tr: "💻 Pratik Kodlama ve Projeler"
        },
        files: [
          { id: "fi-3-1", name: { ar: "مستودع الأكواد والتمارين التطبيقية بلغة C++", tr: "C++ Pratik Kodlama ve Algoritma Örnekleri" }, type: "zip", size: "1.2 MB", url: "#" },
          { id: "fi-3-2", name: { ar: "رابط مباشر لأداة VisuAlgo لتمثيل الخوارزميات تفاعلياً", tr: "Etkileşimli Algoritma Görselleştirici (VisuAlgo)" }, type: "link", size: "رابط خارgi", url: "https://visualgo.net" }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: {
      ar: "كتاب قواعد اللغة التركية للمستوى الأول والثاني (A1 - A2)",
      tr: "Yabancılar İçin Türkçe Dilbilgisi Kılavuzu (A1 - A2)"
    },
    faculty: {
      ar: "مدرسة اللغات الأجنبية",
      tr: "Yabancı Diller Yüksekokulu"
    },
    department: {
      ar: "المدرسة التحضيرية للغات",
      tr: "Yabancı Diller Yüksekokulu"
    },
    category: {
      ar: "مستندات تعليمية للغات",
      tr: "Dil Eğitim Belgeleri"
    },
    description: {
      ar: "مرجع رائع من إعداد طلاب فلسطينيين متفوقين باللغة التركية، يشرح القواعد الأساسية، لواحق الجمع، أزمنة الأفعال، وحالات الأسماء مع أمثلة باللغتين العربية والتركية.",
      tr: "Türkçe dilinde başarılı olan Filistinli öğrenciler tarafından hazırlanan, temel dilbilgisi kurallarını, çoğul eklerini, fiil zamanlarını ve isim durumlarını Arapça ve Türkçe örneklerle açıklayan harika bir referans."
    },
    pdfUrl: "data:application/pdf;base64,JVBERi0xLjQKJ...",
    pdfName: "Turkish_A1_A2_Grammar_Arabic_Guide.pdf",
    pdfFiles: [
      {
        id: "pdf-2-f1",
        name: "Turkish_A1_A2_Grammar_Arabic_Guide.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "2.1 MB",
        type: "application/pdf"
      },
      {
        id: "pdf-2-f2",
        name: "Daily_Turkish_Conversation_Campus_Guide.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "1.1 MB",
        type: "application/pdf"
      }
    ],
    externalUrl: "https://www.turkcedersi.com",
    driveUrl: "https://drive.google.com/drive/folders/1x2y3z4a5b6c7d8e9f-sample-turkish",
    dateAdded: "2026-06-15",
    year: { ar: "السنة التحضيرية", tr: "Hazırlık Sınıfı" },
    semester: { ar: "الفصل الأول (خريف)", tr: "Güz Dönemi" },
    driveFolders: [
      {
        id: "f2-c1",
        name: {
          ar: "📖 كتب المنهج المعتمدة والملخصات",
          tr: "📖 Ders Kitapları ve Özetler"
        },
        files: [
          { id: "fi-2-1-1", name: { ar: "منهج إسطنبول لتعليم التركية للأجانب - كتاب الطالب A1", tr: "Yabancılar İçin İstanbul Türkçe Öğretim Seti Ders Kitabı A1" }, type: "pdf", size: "15.4 MB", url: "#" },
          { id: "fi-2-1-2", name: { ar: "منهج إسطنبول لتعليم التركية للأجانب - كتاب التمارين A1", tr: "İstanbul Türkçe Öğretim Seti Çalışma Kitabı A1" }, type: "pdf", size: "8.2 MB", url: "#" },
          { id: "fi-2-1-3", name: { ar: "دليل القواعد المختصر بالأمثلة العربية لطلاب A1-A2", tr: "Arapça Anlatımlı Pratik Türkçe Dilbilgisi Kılavuzu A1-A2" }, type: "pdf", size: "2.1 MB", url: "#" }
        ]
      },
      {
        id: "f2-c2",
        name: {
          ar: "🗣️ محادثات صوتية وتمارين استماع",
          tr: "🗣️ Dinleme ve Pratik Dosyaları"
        },
        files: [
          { id: "fi-2-2-1", name: { ar: "أهم 100 جملة محادثة مستخدمة في الحرم الجامعي", tr: "Kampüste En Çok Kullanılan 100 Pratik Türkçe Kalıp" }, type: "pdf", size: "1.1 MB", url: "#" },
          { id: "fi-2-2-2", name: { ar: "الملفات الصوتية المرفقة بدرس الاستماع الأول", tr: "İstanbul Türkçe Seti A1 Dinleme Dosyaları Arşivi" }, type: "zip", size: "24.5 MB", url: "#" }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: {
      ar: "الرياضيات الهندسية 1 - كالكولاس شرح وتمارين",
      tr: "Genel Matematik I - Calculus Konu Anlatımı ve Soru Çözümleri"
    },
    faculty: {
      ar: "كلية الهندسة والعلوم الطبيعية",
      tr: "Mühendislik ve Doğa Bilimleri Fakültesi"
    },
    department: {
      ar: "الهندسة المدنية",
      tr: "İnşaat Mühendisliği"
    },
    category: {
      ar: "علوم أساسية",
      tr: "Temel Bilimler"
    },
    description: {
      ar: "سلسلة شروحات في التفاضل والتكامل، النهايات، المشتقات، وتطبيقات التكامل، مخصصة لطلاب السنة الأولى في التخصصات الهندسية المختلفة في جامعة إسكندرون التقنية.",
      tr: "İskenderun Teknik Üniversitesi'ndeki farklı mühendislik bölümlerinin birinci sınıf öğrencilerine yönelik limit, türev, integral ve integral uygulamaları konularını içeren ders notları ve çözümlü pratik çalışma soruları."
    },
    pdfUrl: "data:application/pdf;base64,JVBERi0xLjQKJ...",
    pdfName: "Calculus_1_Engineering_Notes.pdf",
    pdfFiles: [
      {
        id: "pdf-3-f1",
        name: "Calculus_1_Engineering_Notes.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "3.2 MB",
        type: "application/pdf"
      },
      {
        id: "pdf-3-f2",
        name: "Calculus_Limit_Derivative_Solved_Examples.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "1.8 MB",
        type: "application/pdf"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=W_YgPZ08oOQ",
    driveUrl: "https://drive.google.com/drive/folders/1m2n3o4p5q6r7s8t9u-sample-calculus",
    dateAdded: "2026-06-10",
    year: { ar: "السنة الأولى", tr: "1. Sınıf" },
    semester: { ar: "الفصل الأول (خريف)", tr: "Güz Dönemi" },
    driveFolders: [
      {
        id: "f3-c1",
        name: {
          ar: "📚 دفاتر المادة والمذكرات الورقية",
          tr: "📚 Ders Notları ve Özet Föyler"
        },
        files: [
          { id: "fi-3-1-1", name: { ar: "الباب الأول: النهايات والاتصال وتطبيقاتها", tr: "Bölüm 1: Limit ve Süreklilik Konu Anlatım Defteri" }, type: "pdf", size: "3.2 MB", url: "#" },
          { id: "fi-3-1-2", name: { ar: "الباب الثاني: قواعد الاشتقاق وتطبيقات القيم القصوى", tr: "Bölüm 2: Türev Kuralları ve Maksimum-Minimum Uygulamaları" }, type: "pdf", size: "4.7 MB", url: "#" },
          { id: "fi-3-1-3", name: { ar: "الباب الثالث: التكامل المحدد وغير المحدد وحساب المساحة", tr: "Bölüm 3: Belirli ve Belirsiz İntegral, Alan ve Hacim Hesabı" }, type: "pdf", size: "5.5 MB", url: "#" }
        ]
      },
      {
        id: "f3-c2",
        name: {
          ar: "✍️ تمارين محلولة ونماذج امتحانات سابقة",
          tr: "✍️ Çözümlü Alıştırmalar ve Sınav Arşivi"
        },
        files: [
          { id: "fi-3-2-1", name: { ar: "بنك الأسئلة المعتمد - 150 سؤالاً محلولاً بالتفصيل للامتحان النهائي", tr: "Analiz I Sınavına Hazırlık - 150 Çözümlü Alıştırma Kitapçığı" }, type: "pdf", size: "6.8 MB", url: "#" },
          { id: "fi-3-2-2", name: { ar: "حل نموذج امتحان منتصف الفصل خريف 2024", tr: "Güz 2024 Dönemi Vize Sınavı Çözüm Anahtarı" }, type: "pdf", size: "1.8 MB", url: "#" }
        ]
      }
    ]
  },
  {
    id: "course-leadership",
    title: {
      ar: "دورة القيادة وإدارة الفرق - المنهج التدريبي المتكامل والحقيبة التدريبية",
      tr: "Liderlik ve Takım Yönetimi Kursu - Kapsamlı Eğitim Seti ve Materyalleri"
    },
    faculty: {
      ar: "مركز تطوير المهارات والقيادة الطلابية",
      tr: "Liderlik ve Beceri Geliştirme Merkezi"
    },
    department: {
      ar: "القيادة وإدارة الفرق",
      tr: "Liderlik ve Takım Yönetimi"
    },
    category: {
      ar: "تطوير القيادة والإدارة",
      tr: "Liderlik ve Yönetim Becerileri"
    },
    description: {
      ar: "حقيبة تدريبية متكاملة لبرنامج القيادة وإدارة فرق العمل الطلابية والتطوعية. تشمل الحقيبة استراتيجيات التخطيط وصناعة القرار، بناء فرق العمل وتوزيع الأدوار، حل النزاعات وإدارة الأزمات، والاتصال المؤسسي الفعال مع عروض تقديمية وملخصات تدريبية.",
      tr: "Öğrenci ve gönüllü ekipler için liderlik ve takım yönetimi kapsamlı eğitim seti. Stratejik planlama ve karar alma, takım kurma ve rol dağılımı, kriz ve çatışma yönetimi ile kurumsal iletişim sunumları ve pratik uygulama rehberlerini içerir."
    },
    pdfUrl: "data:application/pdf;base64,JVBERi0xLjQKJ...",
    pdfName: "Leadership_and_Team_Management_Guide_2026.pdf",
    pdfFiles: [
      {
        id: "pdf-lead-1",
        name: "Leadership_and_Team_Management_Guide_2026.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "3.8 MB",
        type: "application/pdf"
      },
      {
        id: "pdf-lead-2",
        name: "Team_Dynamics_and_Conflict_Resolution.pdf",
        url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
        size: "2.1 MB",
        type: "application/pdf"
      }
    ],
    videoUrl: "https://www.youtube.com/watch?v=fW8amMCVAJQ",
    driveUrl: "https://drive.google.com/drive/folders/1lead-team-management-archive-2026",
    dateAdded: "2026-06-28",
    year: { ar: "دورة عامة", tr: "Genel Eğitim" },
    semester: { ar: "فصل الصيف", tr: "Yaz Dönemi" },
    driveFolders: [
      {
        id: "fl-lead-1",
        name: {
          ar: "📊 شرائح الحقيبة التدريبية والمحاضرات",
          tr: "📊 Eğitim Sunumları ve Ders Slaytları"
        },
        files: [
          { id: "fl-1-1", name: { ar: "الوحدة الأولى: صفات القائد الفعال ونظريات القيادة الحديثة", tr: "Modül 1: Etkili Liderlik Özellikleri ve Modern Liderlik Teorileri" }, type: "pdf", size: "3.5 MB", url: "#" },
          { id: "fl-1-2", name: { ar: "الوحدة الثانية: مراحل بناء الفريق وتوزيع الأدوار (Tuckman Model)", tr: "Modül 2: Takım Oluşturma Aşamaları ve Rol Dağılımı" }, type: "pdf", size: "2.9 MB", url: "#" },
          { id: "fl-1-3", name: { ar: "الوحدة الثالثة: إدارة النزاعات والتفاوض الإيجابي داخل الفريق", tr: "Modül 3: Takım İçi Çatışma Yönetimi ve Müzakere Teknikleri" }, type: "pdf", size: "4.2 MB", url: "#" }
        ]
      },
      {
        id: "fl-lead-2",
        name: {
          ar: "📋 أدوات التقييم العملي ونماذج التخطيط",
          tr: "📋 Pratik Değerlendirme Araçları ve Planlama Şablonları"
        },
        files: [
          { id: "fl-2-1", name: { ar: "نموذج خطة عمل المشروع وتوزيع المهام (Worksheet)", tr: "Proje Eylem Planı ve Görev Dağılım Şablonu" }, type: "pdf", size: "1.2 MB", url: "#" },
          { id: "fl-2-2", name: { ar: "اختبار أنماط الشخصية القيادية وطرق التعامل معها", tr: "Liderlik Tarzı Değerlendirme Testi ve Analiz Rehberi" }, type: "pdf", size: "1.8 MB", url: "#" }
        ]
      }
    ]
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: "activity-1",
    title: {
      ar: "يوم التراث الفلسطيني والقدس في الحرم الجامعي",
      tr: "Kampüste Filistin Miras ve Kudüs Günü Etkinliği"
    },
    description: {
      ar: "يدعوكم تجمع الطلاب الفلسطينيين بالتعاون مع عمادة شؤون الطلاب للمشاركة الفعالة في يوم التراث الفلسطيني. سيتخلل الفعالية معرض فني، سرد لتاريخ القضية، زاوية لارتداء الكوفية والتقاط الصور، تذوق الأكلات الشعبية وفقرات إنشادية تراثية ودبكة جماعية. الحضور مفتوح لجميع الطلاب والمدرسين بالجامعة.",
      tr: "Filistin Öğrenci Topluluğu, Sağlık Kültür ve Spor Daire Başkanlığı işbirliğiyle sizleri Filistin Miras Günü etkinliğine davet ediyor. Etkinlikte sanat sergisi, Filistin davasının tarihi anlatımı, poşu (Keffiyeh) takıp fotoğraf çekilme köşesi, yöresel lezzetlerin ikramı, geleneksel şarkılar ve Dabke halk dansları yer alacaktır. Katılım tüm üniversite öğrencilerine ve akademisyenlerine açıktır."
    },
    date: "2026-07-05",
    time: "12:00 - 16:30",
    location: {
      ar: "القاعة الزرقاء الكبرى والساحة الخارجية - الحرم الرئيسي",
      tr: "Mavi Büyük Salon ve Dış Bahçe - Merkez Kampüs"
    },
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 47,
    maxSeats: 150,
    registrations: []
  },
  {
    id: "activity-2",
    title: {
      ar: "ورشة عمل: الإرشاد الأكاديمي والتحضير للفصل الدراسي الجديد",
      tr: "Çalıştay: Akademik Rehberlik ve Yeni Döneme Hazırlık"
    },
    description: {
      ar: "ورشة عمل يلقيها نخبة من الطلاب المتميزين في السنوات المتقدمة والخريجين لتقديم النصائح حول كيفية اختيار المواد الدراسية، زيادة المعدل التراكمي (GPA)، وكيفية الاستفادة القصوى من الخدمات المكتبية والمختبرات بالجامعة، إضافةً إلى التوجيه بخصوص السكن والإقامة والمنح المتاحة.",
      tr: "Üst sınıflardaki başarılı öğrenciler ve mezunlar tarafından verilecek bu çalıştayda ders seçimi, genel not ortalamasını (GNO) yükseltme, üniversitenin kütüphane ve laboratuvar imkanlarından en iyi şekilde yararlanma gibi konular ele alınacaktır. Ayrıca barınma, ikamet izni ve burslar hakkında rehberlik sağlanacaktır."
    },
    date: "2026-07-02",
    time: "14:00 - 16:00",
    location: {
      ar: "قاعة الندوات - مكتبة الجامعة المركزية",
      tr: "Seminer Salonu - Merkez Kütüphane"
    },
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 18,
    maxSeats: 50,
    registrations: []
  },
  {
    id: "activity-3",
    title: {
      ar: "بطولة التجمع السنوية لكرة القدم السباعية",
      tr: "Geleneksel Öğrenci Topluluğu 7'li Halı Saha Futbol Turnuvası"
    },
    description: {
      ar: "ينظم تجمع الطلاب بطولة كرة قدم ودية تجمع فرقاً من مختلف الكليات والجنسيات في الجامعة لتعزيز أواصر الصداقة والترابط الاجتماعي والرياضي. يرجى من قادة الفرق تسجيل بيانات اللاعبين قبل الموعد المحدد. ستُوزع كؤوس وميداليات للفرق الفائزة بالمركزين الأول والثاني.",
      tr: "Öğrenci Topluluğu, dostluk, sosyal kaynaşma ve spor kültürünü pekiştirmek amacıyla üniversitedeki farklı fakülte ve uyruklardan takımları bir araya getiren dostluk futbol turnuvası düzenliyor. Takım kaptanlarının oyuncu bilgilerini belirtilen tarihten önce kaydetmesi rica olunur. Dereceye giren birinci ve ikinci takımlara kupa ve madalyalar verilecektir."
    },
    date: "2026-07-12",
    time: "17:00 - 21:00",
    location: {
      ar: "الملاعب العشبية بالمدينة الرياضية للجامعة",
      tr: "Üniversite Spor Kompleksi Halı Sahaları"
    },
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 8,
    maxSeats: 16, // number of teams
    registrations: []
  },
  {
    id: "activity-leadership",
    title: {
      ar: "دورة القيادة وإدارة الفرق الطلابية - ورشة تدريبية معتمدة",
      tr: "Öğrenci Liderliği ve Takım Yönetimi Eğitimi - Sertifikalı Çalıştay"
    },
    description: {
      ar: "دورة تدريبية مكثفة ومعتمدة ينظمها تجمع الطلاب الفلسطينيين لتمكين الطلاب وتنمية مهاراتهم القيادية، وإدارة فرق العمل والمبادرات التطوعية بكفاءة عالية، وحل النزاعات، وإدارة الوقت والضغوط في بيئة العمل الجماعي. يقدم الدورة مدربون معتمدون، ويحصل المشاركون على شهادة إتمام رسمية.",
      tr: "Filistin Öğrenci Topluluğu tarafından öğrencileri güçlendirmek, liderlik ve takım yönetimi becerilerini, gönüllü girişimleri ve kriz çözümünü yüksek verimlilikle yönetmeyi öğretmek amacıyla düzenlenen sertifikalı yoğun eğitim çalıştayı."
    },
    date: "2026-07-25",
    time: "14:00 - 18:00",
    location: {
      ar: "المدرج المركزي الكبير - كلية الهندسة (الحرم الرئيسي)",
      tr: "Büyük Merkezi Amfi - Mühendislik Fakültesi (Merkez Kampüs)"
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 32,
    maxSeats: 80,
    registrations: []
  },
  {
    id: "activity-cv-interview",
    title: {
      ar: "ورشة إعداد السيرة الذاتية واجتياز مقابلات العمل الأكاديمية والمهنية",
      tr: "CV Hazırlama ve Profesyonel Mülakat Teknikleri Çalıştayı"
    },
    description: {
      ar: "ورشة عمل تفاعلية لمساعدة الطلاب والخريجين على صياغة سيرة ذاتية احترافية باللغتين الإنجليزية والتركية مطابقة لمعايير ATS، واكتساب مهارات الإقناع وإبراز نقاط القوة واجتياز المقابلات الشخصية بنجاح للتقديم على المنح وفرص العمل.",
      tr: "Öğrencilere ve mezunlara yönelik, ATS standartlarına uygun İngilizce ve Türkçe profesyonel özgeçmiş hazırlama, mülakat teknikleri ve burs/iş başvurularında öne çıkma stratejilerini içeren etkileşimli çalıştay."
    },
    date: "2026-07-18",
    time: "15:30 - 17:30",
    location: {
      ar: "قاعة السيمينار - مكتبة الجامعة المركزية",
      tr: "Seminer Salonu - Merkez Kütüphane"
    },
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 24,
    maxSeats: 60,
    registrations: []
  },
  {
    id: "activity-trip",
    title: {
      ar: "رحلة التجمع الاستكشافية السنوية لمعالم هاتاي وبحيرة غولباشي",
      tr: "Topluluk Geleneksel Hatay Tarihi ve Gölbaşı Doğa Gezisi"
    },
    description: {
      ar: "رحلة ترفيهية وثقافية تجمع طلاب التجمع لزيارة أهم المعالم التاريخية في هاتاي، مغارة وقناة تيتوس في صمنداغ، وشواطئ إسكندرون وبحيرة غولباشي الطبيعية لقضاء يوم ترفيهي مليء بالمسابقات والفعاليات الأخوية.",
      tr: "Öğrencilerimizi bir araya getiren, Hatay'ın tarihi yerlerini, Titus Tünelini, İskenderun sahilini ve Gölbaşı Tabiat Parkı'nı kapsayan eğlenceli ve kültürel geleneksel bahar gezisi."
    },
    date: "2026-07-28",
    time: "08:30 - 19:30",
    location: {
      ar: "نقطة الانطلاق: البوابة الرئيسية لجامعة إسكندرون التقنية",
      tr: "Buluşma Noktası: İSTE Merkez Kampüs Ana Giriş Kapısı"
    },
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: true,
    registeredCount: 52,
    maxSeats: 90,
    registrations: []
  },
  {
    id: "activity-past-1",
    title: {
      ar: "معرض التراث والثقافة الفلسطينية الأول",
      tr: "1. Filistin Miras ve Kültür Sergisi"
    },
    description: {
      ar: "أقام تجمع الطلاب الفلسطينيين معرضاً ثقافياً متكاملاً شمل زوايا للمطرزات التراثية، والصور التاريخية لمدن فلسطين، والمأكولات الشعبية لتعزيز الهوية والوعي الثقافي والوطني.",
      tr: "Öğrenci topluluğumuz, kültürel kimliği pekiştirmek amacıyla geleneksel el sanatları, tarihi şehir resimleri ve yöresel lezzetler içeren kapsamlı bir kültür sergisi düzenlemiştir."
    },
    date: "2025-11-20",
    time: "10:00 - 17:00",
    location: {
      ar: "بهو كلية الهندسة - الحرم الرئيسي",
      tr: "Mühendislik Fakültesi Fuaye Alanı"
    },
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: false,
    registeredCount: 120,
    maxSeats: 150,
    registrations: [],
    isPast: true
  },
  {
    id: "activity-past-2",
    title: {
      ar: "دورة أساسيات البرمجة بالتعاون مع قسم الحاسوب",
      tr: "Bilgisayar Bölümü İşbirliğiyle Temel Programlama Eğitimi"
    },
    description: {
      ar: "سلسلة من ورش العمل التفاعلية لتعليم لغة Python وحل المشكلات البرمجية للطلاب الجدد لتسهيل انطلاقتهم الأكاديمية.",
      tr: "Yeni öğrencilerin akademik başlangıçlarını kolaylaştırmak için Python dili ve algoritma geliştirmeyi amaçlayan etkileşimli bir çalıştay serisi."
    },
    date: "2026-03-10",
    time: "15:00 - 17:00",
    location: {
      ar: "مختبر الحاسوب المركزي - كلية الهندسة",
      tr: "Merkez Bilgisayar Laboratuvarı - Mühendislik Fakültesi"
    },
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: false,
    registeredCount: 35,
    maxSeats: 40,
    registrations: [],
    isPast: true
  },
  {
    id: "activity-past-iftar",
    title: {
      ar: "إفطار رمضان الجماعي السنوي لطلبة التجمع والجالية",
      tr: "Geleneksel Topluluk Ramazan İftarı ve Kültür Buluşması"
    },
    description: {
      ar: "أقام تجمع الطلاب الفلسطينيين مأدبة الإفطار الرمضاني السنوية المباركة لجمع شمل الطلاب الفلسطينيين والمغتربين في أجواء عائلية وأخوية مميزة، تخللها برامج ثقافية ومسابقات رمضانية وتوزيع هدايا تذكارية.",
      tr: "Öğrenci topluluğumuz, Filistinli ve misafir öğrencileri kardeşlik atmosferinde bir araya getiren geleneksel iftar yemeğini düzenlemiş, iftar sonrası kültürel yarışmalar gerçekleştirilmiştir."
    },
    date: "2026-03-24",
    time: "18:20 - 21:00",
    location: {
      ar: "قاعة المناسبات والمطعم المركزي بالجامعة",
      tr: "Üniversite Merkezi Sosyal Tesisleri ve Yemekhanesi"
    },
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: false,
    registeredCount: 115,
    maxSeats: 120,
    registrations: [],
    isPast: true
  },
  {
    id: "activity-past-chess",
    title: {
      ar: "بطولة التجمع لتنس الطاولة والشطرنج لعام 2026",
      tr: "Masa Tenisi ve Satranç Turnuvası 2026"
    },
    description: {
      ar: "اختتم تجمع الطلاب الفلسطينيين فعاليات البطولة الودية للشطرنج وتنس الطاولة والتي شارك فيها العشرات من طلبة الجامعة في أجواء حماسية وتنافسية راقية، وتم تتويج الفائزين بالمراكز الثلاثة الأولى.",
      tr: "Öğrenci Topluluğumuz, kampüste onlarca öğrencinin katılımıyla dostluk ve centilmenlik içinde geçen satranç ve masa tenisi turnuvasını tamamlamış ve dereceye girenlere madalyalarını takdim etmiştir."
    },
    date: "2026-04-18",
    time: "14:00 - 18:00",
    location: {
      ar: "الصالة المغلقة بالمدينة الرياضية للجامعة",
      tr: "Üniversite Spor Kompleksi Kapalı Spor Salonu"
    },
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&auto=format&fit=crop&q=60",
    registrationEnabled: false,
    registeredCount: 32,
    maxSeats: 32,
    registrations: [],
    isPast: true
  }
];

export const initialUniversityInfo: UniversityInfo = {
  id: "univ-1",
  description: {
    ar: "تأسست جامعة إسكندرون التقنية (İSTE) في عام 2015 كواحدة من الجامعات الحكومية الرائدة التي تركز بشكل كبير على العلوم التقنية، والتطوير التكنولوجي، والعلوم البحرية في تركيا. تقع الجامعة في مدينة إسكندرون الساحلية الجميلة في محافظة هاتاي، وتتميز ببنيتها التحتية الحديثة ومختبراتها المتطورة وشراكاتها القوية مع القطاعات الصناعية والبحرية.",
    tr: "İskenderun Teknik Üniversitesi (İSTE), 2015 yılında teknik bilimlere, teknolojik gelişmeye ve denizcilik bilimlerine güçlü bir odaklanmayla kurulan öncü devlet üniversitelerinden biridir. Hatay'ın şirin sahil kenti İskenderun'da yer alan üniversite, modern altyapısı, gelişmiş laboratuvarları ve endüstriyel ile denizcilik sektörleriyle kurduğu güçlü işbirlikleri ile dikkat çekmektedir."
  },
  history: {
    ar: "انفصلت الجامعة عن جامعة مصطفى كمال وبدأت مسيرتها كصرح أكاديمي تكنولوجي فريد يهدف لإنتاج المعرفة وتحويلها إلى تكنولوجيا قابلة للتطبيق الصناعي والريادي. تضم الجامعة اليوم آلاف الطلاب الأتراك والدوليين ومنهم العشرات من الطلاب الفلسطينيين الذين يسعون للتميز الأكاديمي في مجالات الهندسة، العمارة، الطيران، والبحار.",
    tr: "Mustafa Kemal Üniversitesi bünyesindeki mühendislik ve denizcilik birimlerinin ayrılmasıyla kurulan İSTE, bilgiyi üretmeyi ve onu endüstriyel ile girişimci uygulanabilir teknolojiye dönüştürmeyi amaçlayan benzersiz bir teknolojik akademik yapı olarak yolculuğuna başladı. Bugün üniversite, mühendislik, mimarlık, havacılık ve denizcilik gibi alanlarda akademik başarıyı hedefleyen onlarca Filistinli öğrenci de dahil olmak üzere binlerce Türk ve uluslararası öğrenciye ev sahipliği yapmaktadır."
  },
  faculties: [
    {
      name: {
        ar: "كلية الهندسة والعلوم الطبيعية",
        tr: "Mühendislik ve Doğa Bilimleri Fakültesi"
      },
      departments: [
        { ar: "هندسة الكمبيوتر", tr: "Bilgisayar Mühendisliği" },
        { ar: "الهندسة الكهربائية والإلكترونية", tr: "Elektrik-Elektronik Mühendisliği" },
        { ar: "الهندسة المدنية", tr: "İnşaat Mühendisliği" },
        { ar: "الهندسة الميكانيكية", tr: "Makine Mühendisliği" },
        { ar: "الهندسة الكيميائية", tr: "Kimya Mühendisliği" },
        { ar: "هندسة المعادن والمواد", tr: "Metalurji ve Malzeme Mühendisliği" },
        { ar: "الهندسة الصناعية", tr: "Endüstri Mühendisliği" }
      ]
    },
    {
      name: {
        ar: "كلية بارباروس خير الدين لبناء السفن والعلوم البحرية",
        tr: "Barbaros Hayrettin Gemi İnşaatı ve Denizcilik Fakültesi"
      },
      departments: [
        { ar: "هندسة بناء السفن والآلات البحرية", tr: "Gemi İnşaatı ve Gemi Makineleri Mühendisliği" },
        { ar: "إدارة النقل البحري واللوجستيات", tr: "Deniz Ulaştırma İşletme Mühendisliği" }
      ]
    },
    {
      name: {
        ar: "كلية الطيران والعلوم الفضائية",
        tr: "Havacılık ve Uzay Bilimleri Fakültesi"
      },
      departments: [
        { ar: "إدارة الطيران", tr: "Havacılık Yönetimi" },
        { ar: "هندسة الطيران والـجوفضاء", tr: "Havacılık ve Uzay Mühendisliği" }
      ]
    },
    {
      name: {
        ar: "كلية العمارة والتصميم",
        tr: "Mimarlık ve Tasarım Fakültesi"
      },
      departments: [
        { ar: "الهندسة المعمارية", tr: "Mimarlık" },
        { ar: "عمارة المناظر الطبيعية (اللاندسكيب)", tr: "Peyzaj Mimarlığı" },
        { ar: "التصميم الصناعي", tr: "Endüstriyel Tasarım" }
      ]
    },
    {
      name: {
        ar: "كلية السياحة",
        tr: "Turizm Fakültesi"
      },
      departments: [
        { ar: "الإرشاد السياحي", tr: "Turist Rehberliği" },
        { ar: "إدارة الفنادق والضيافة", tr: "Turizm İşletmeciliği" },
        { ar: "فن الطهي والطهو", tr: "Gastronomi ve Mutfak Sanatları" }
      ]
    },
    {
      name: {
        ar: "مدرسة اللغات الأجنبية",
        tr: "Yabancı Diller Yüksekokulu"
      },
      departments: [
        { ar: "المدرسة التحضيرية للغات", tr: "Hazırlık Sınıfı" }
      ]
    }
  ],
  contactEmail: "filistin.hatay@gmail.com",
  contactPhone: "+90 (326) 613 56 00",
  address: {
    ar: "شارع مصطفى كمال، الحي المركزي، 31200 إسكندرون، هاتاي، تركيا",
    tr: "Mustafa Kemal Mah. Merkez Kampüs, 31200 İskenderun / Hatay, Türkiye"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3209.6895318684994!2d36.19502757656641!3d36.56157147229707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152fa979f8b4a2ab%3A0xe54d6a13d1cf50c3!2s%C4%B0skenderun%20Teknik%20%C3%9Cniversitesi%20(%C4%B0STE)!5e0!3m2!1str!2str!4v1719440000000!5m2!1str!2str"
};

export const initialAnnouncements: TopAnnouncement[] = [
  {
    id: "ann-1",
    text: {
      ar: "📢 التسجيل للفصل الدراسي الجديد يبدأ في 1 يوليو - تجمع الطلاب متواجد يومياً في كلية الهندسة لمساعدتكم في الإجراءات وتثبيت القيد.",
      tr: "📢 Yeni dönem ders kayıtları 1 Temmuz'da başlıyor - Öğrenci Topluluğu işlemlerinizde yardımcı olmak için her gün Mühendislik Fakültesinde hazır bulunacaktır."
    },
    type: "info",
    active: true
  },
  {
    id: "ann-2",
    text: {
      ar: "🇵🇸 ترقبوا فعالية 'يوم التراث الفلسطيني والقدس' في حرم الجامعة الرئيسي يوم الأربعاء 5 يوليو. تفاصيل التسجيل متوفرة في قسم الأنشطة.",
      tr: "🇵🇸 Merkez kampüsümüzde düzenlenecek 'Filistin Kültür ve Kudüs Günü' etkinliğimize davetlisiniz. Kayıt detayları Aktiviteler sekmesinde yer almaktadır."
    },
    type: "critical",
    active: true
  },
  {
    id: "ann-3",
    text: {
      ar: "📚 تم رفع ملفات تلخيص وهامش المذاكرة لمادة 'خوارزميات وهياكل البيانات' في قسم المواد التعليمية باللغتين.",
      tr: "📚 Veri Yapıları ve Algoritmalar dersi için hazırlanmış Türkçe ve Arapça özet ve pratik ders çalışma notları Eğitim Materyalleri sekmesine yüklenmiştir."
    },
    type: "warning",
    active: true
  }
];

export const initialDeptAnnouncements: DeptAnnouncementItem[] = [
  {
    id: "dept-ann-1",
    title: {
      ar: "تعديل جدول امتحان مادة هياكل البيانات والبرمجة",
      tr: "Veri Yapıları ve Algoritmalar Sınav Programı Değişikliği"
    },
    faculty: { ar: "كلية الهندسة والعلوم الطبيعية", tr: "Mühendislik ve Doğa Bilimleri Fakültesi" },
    department: { ar: "هندسة الكمبيوتر", tr: "Bilgisayar Mühendisliği" },
    description: {
      ar: "نحيطكم علماً بأنه قد تم نقل موعد امتحان مادة هياكل البيانات والبرمجة ليصبح يوم الإثنين القادم الساعة 10:00 صباحاً في قاعة 204 بدلاً من يوم الأحد بسبب تعارض الجداول المباشر في الكلية.",
      tr: "Ders çakışmaları nedeniyle, Veri Yapıları ve Algoritmalar sınav saati önümüzdeki Pazartesi günü saat 10:00'da Derslik 204 olarak güncellenmiştir."
    },
    dateAdded: "2026-06-25",
    pdfFiles: [],
    externalUrl: ""
  },
  {
    id: "dept-ann-2",
    title: {
      ar: "إعلان هام لطلاب السنة التحضيرية - نموذج امتحان الإعفاء",
      tr: "Hazırlık Sınıfı Öğrencileri İçin Muafiyet Sınavı Örneği"
    },
    faculty: { ar: "مدرسة اللغات الأجنبية", tr: "Yabancı Diller Yüksekokulu" },
    department: { ar: "المدرسة التحضيرية للغات", tr: "Hazırlık Sınıfı" },
    description: {
      ar: "تم رفع ملف يحتوي على النماذج الاسترشادية لامتحان معافاة اللغة الإنجليزية والتركية لطلاب التحضيري الجدد لمساعدتكم في الاستعداد للامتحان القادم.",
      tr: "Yeni kayıtlı hazırlık öğrencileri için İngilizce ve Türkçe muafiyet sınavlarına hazırlık olması amacıyla eski dönem sınav örnekleri ve kılavuzu eklenmiştir."
    },
    dateAdded: "2026-06-24",
    pdfFiles: [
      {
        id: "file-muafiyet-1",
        name: "Yabancı Dil Muafiyet Sınav Kılavuzu.pdf",
        url: "https://iste.edu.tr/ydyo",
        size: "1.4 MB",
        type: "pdf"
      }
    ],
    externalUrl: "https://iste.edu.tr/ydyo"
  },
  {
    id: "dept-ann-3",
    title: {
      ar: "مشروع التخرج الأول لقسم الهندسة الصناعية",
      tr: "Endüstri Mühendisliği Bitirme Projesi I Esasları"
    },
    faculty: { ar: "كلية الهندسة والعلوم الطبيعية", tr: "Mühendislik ve Doğa Bilimleri Fakültesi" },
    department: { ar: "الهندسة الصناعية", tr: "Endüstri Mühendisliği" },
    description: {
      ar: "إلى جميع طلاب السنة الأخيرة في قسم الهندسة الصناعية، يرجى مراجعة الكتيب المرفق الذي يوضح القواعد العامة والمعايير المطلوبة لاختيار وتسليم مقترحات مشاريع التخرج لهذا الفصل الدراسي والمواعيد النهائية للتسليم.",
      tr: "Endüstri Mühendisliği son sınıf öğrencilerinin dikkatine: Bu dönemki bitirme projelerinin konu seçimi ve teslim kriterlerini açıklayan esaslar kılavuzu ekte sunulmuştur."
    },
    dateAdded: "2026-06-26",
    pdfFiles: [
      {
        id: "file-ind-1",
        name: "Endüstri_Muhendisligi_Bitirme_Projesi_Esaslari.pdf",
        url: "#",
        size: "820 KB",
        type: "pdf"
      }
    ],
    externalUrl: ""
  }
];

export const initialUniversityNews: UniversityNewsItem[] = [
  {
    id: 'iste-live-2026-08-14-1',
    titleTr: 'İSKENDERUN TEKNİK ÜNİVERSİTESİ 2026-2027 EĞİTİM-ÖĞRETİM YILI ÖN LİSANS VE LİSANS DÜZEYİNDE 2. ULUSLARARASI ÖĞRENCİ ALIM İLANI',
    titleAr: 'إعلان القبول والمفاضلة الثانية للطلاب الدوليين لدرجتي الدبلوم والبكالوريوس للعام الدراسي 2026-2027',
    contentTr: 'Üniversitemiz ön lisans ve lisans programlarına, 2025 veya 2026 yılında yapılmış olan ÖSYM Türkiye Yurt Dışından Öğrenci Kabul Sınavı (TR-YÖS) ve lise diploma notu kriterlerine göre uluslararası öğrenci alınacaktır. Başvurular online sistem üzerinden alınacaktır.',
    contentAr: 'أعلنت جامعة إسكندرون التقنية عن فتح باب المفاضلة الثانية للطلاب الدوليين والأجانب في مختلف الكليات والمعاهد بالاعتماد على اختبار TR-YÖS أو الشهادة الثانوية. يتم استلام الطلبات عبر البوابة الإلكترونية الرسمية.',
    date: '2026-08-14',
    categoryTr: 'Öğrenci İşleri',
    categoryAr: 'شؤون الطلاب والقبول',
    link: 'https://iste.edu.tr/duyuru-merkezi/oidb/2026/08/14/6853',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-live-2026-08-14-2',
    titleTr: 'Af Başvurusunda Bulunacak Öğrencilerin Dikkatine (Geçici 85. Madde)',
    titleAr: 'تنبيه هام للطلاب الراغبين في التقديم على العفو الطلابي وإعادة القيد (المادة 85)',
    contentTr: '2547 Sayılı Yükseköğretim Kanunu\'nun Geçici 85. Maddesi kapsamında yeniden öğrenim hakkı; Resmi Gazete\'de yayımlanarak yürürlüğe girmiştir. Başvurular ilgili fakülte ve enstitü müdürlüklerine şahsen veya posta yoluyla yapılacaktır.',
    contentAr: 'تم تفعيل حق إعادة الدراسة بموجب المادة المؤقتة 85 من قانون التعليم العالي رقم 2547. يمكن للطلاب الذين انقطع قيدهم تقديم طلبات إعادة الالتحاق لدى عمادات الكليات والمعاهد المعنية.',
    date: '2026-08-14',
    categoryTr: 'Lisansüstü / Öğrenci İşleri',
    categoryAr: 'دراسات عليا وشؤون الطلاب',
    link: 'https://www.iste.edu.tr/duyuru-merkezi/lee/2026/08/14/6855',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-live-2026-08-04-4',
    titleTr: 'Yabancı Diller Yüksekokulu Muafiyet ve Yeterlilik Sınavı Takvimi',
    titleAr: 'جدول ومواعيد امتحانات الإعفاء وتحديد المستوى في مدرسة اللغات الأجنبية',
    contentTr: '2026-2027 Eğitim Öğretim Yılı Güz Yarıyılı Zorunlu Yabancı Dil Hazırlık Sınıfı Yeterlilik ve Muafiyet Sınavı takvimi ve sınav giriş yerleri ilan edilmiştir. Sınav Merkez Kampüs dersliklerinde gerçekleştirilecektir.',
    contentAr: 'تم الإعلان عن جدول وأماكن عقد امتحانات الكفاءة والإعفاء من السنة التحضيرية للغات الأجنبية (الإنجليزية والتركية) للفصل الدراسي الخريفي 2026-2027 بالحرم الجامعي المركزي.',
    date: '2026-08-04',
    categoryTr: 'Yabancı Diller',
    categoryAr: 'اللغات الأجنبية والتحضيري',
    link: 'https://iste.edu.tr/duyuru-merkezi/mydk/2026/08/04/6817',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-live-2026-08-03-3',
    titleTr: '2026-2027 Akademik Yılı Ders Kayıt ve Harç Ücreti Ödeme Tarihleri',
    titleAr: 'مواعيد اختيار المواد وتسديد الرسوم الدراسية (الهارج) للعام الدراسي 2026-2027',
    contentTr: '2026-2027 Güz Yarıyılı ders kayıtları ve katkı payı / öğrenim ücreti (harç) ödeme işlemleri Öğrenci Bilgi Sistemi (OBS) üzerinden gerçekleştirilecektir. İkinci öğretim ve uluslararası öğrencilerin harç ödemelerini Vakıfbank şube veya ATM\'lerinden öğrenci numarası ile yapmaları gerekmektedir.',
    contentAr: 'أعلنت رئاسة شؤون الطلاب عن فتح باب تثبيت المواد ودفع الرسوم الجامعية (الهارج) للفصل الدراسي الخريفي عبر نظام الـ OBS. يتوجب على الطلاب الدوليين وطلاب التعليم المسائي الدفع عبر بنك الوقف باستخدام الرقم الجامعي.',
    date: '2026-08-03',
    categoryTr: 'Öğrenci İşleri',
    categoryAr: 'شؤون الطلاب والتسجيل',
    link: 'https://iste.edu.tr/duyuru-merkezi/oidb/2026/08/03/6814',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-live-2026-07-28-5',
    titleTr: 'Uluslararası Öğrenciler İçin Öğrenci İkamet İzni Başvuru ve Evrak Teslim Süreci',
    titleAr: 'إجراءات تقديم وتسليم أوراق الإقامة الطلابية للطلاب الأجانب في هاتاي',
    contentTr: 'İçişleri Bakanlığı Göç İdaresi Başkanlığı protokolü gereğince, yeni kayıt yaptıran uluslararası öğrencilerin ikamet izin başvuru dosyaları Üniversitemiz Uluslararası Öğrenci Ofisi tarafından teslim alınarak İl Göç İdaresi Müdürlüğüne iletilecektir.',
    contentAr: 'وفقاً لبروتوكول رئاسة إدارة الهجرة مع الجامعات التركية، يتم تسليم ملفات طلبات الإقامة الطلابية لأول مرة أو التمديد مباشرة لمكتب شؤون الطلاب الدوليين بجامعة إسكندرون التقنية لإرسالها لإدارة هجرة هاتاي.',
    date: '2026-07-28',
    categoryTr: 'Uluslararası Ofis',
    categoryAr: 'مكتب الطلاب الدوليين',
    link: 'https://iste.edu.tr/uio/duyurular/ikamet-sureci',
    isRelevantToForeigners: true
  },
  {
    id: 'iste-live-2026-07-20-6',
    titleTr: 'Erasmus+ 2026-2027 Güz Dönemi Öğrenci Öğrenim ve Staj Hareketliliği Başvuruları',
    titleAr: 'فتح باب التقديم لبرنامج التبادل الطلابي الأوروبي Erasmus+ للفصل القادم',
    contentTr: 'Avrupa Birliği Erasmus+ programı kapsamında 2026-2027 akademik yılı öğrenim ve staj hareketliliği başvuruları başlamıştır. Yeterli dil puanına sahip tüm lisans ve lisansüstü öğrencilerimiz başvuruda bulunabilirler.',
    contentAr: 'أعلن مكتب العلاقات الدولية بجامعة إسكندرون التقنية عن بدء استقبال طلبات المنح والتدريب لبرنامج إيراسموس+ للتبادل الدراسي في الجامعات الأوروبية الشريكة للعام الأكاديمي 2026-2027.',
    date: '2026-07-20',
    categoryTr: 'Dış İlişkiler',
    categoryAr: 'العلاقات الخارجية والتبادل',
    link: 'https://iste.edu.tr/erasmus/duyurular',
    isRelevantToForeigners: true
  }
];

export const initialDirectoryMembers: DirectoryMember[] = [
  {
    id: "member-1",
    name: {
      ar: "عبد الرحمن أبو دقة",
      tr: "Abdelrahman Abu Daqqa"
    },
    major: {
      ar: "هندسة الكمبيوتر والبرمجيات",
      tr: "Bilgisayar Mühendisliği"
    },
    category: {
      ar: "الهيئة الإدارية",
      tr: "Yönetim Kurulu"
    },
    roleTitle: {
      ar: "رئيس تجمع الطلاب الفلسطينيين",
      tr: "Topluluk Başkanı"
    },
    academicYear: {
      ar: "سنة رابعة",
      tr: "4. Sınıf"
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    email: "filistin.hatay@gmail.com",
    phone: "+90 552 000 00 00",
    linkedin: "https://linkedin.com",
    bio: {
      ar: "مهتم بالأنظمة السحابية والذكاء الاصطناعي، ومسؤول عن تنسيق أنشطة التجمع والربط الأكاديمي مع الجامعة.",
      tr: "Bulut sistemleri ve yapay zeka ile ilgileniyor, topluluk etkinlikleri ve üniversite ile akademik koordinasyondan sorumlu."
    }
  }
];

export const initialCityPlaces: CityPlace[] = [
  {
    id: "place-1",
    name: {
      ar: "إسبريسو لاب إسكندرون (على الكورنيش)",
      tr: "Espressolab İskenderun Sahil"
    },
    category: "cafes",
    description: {
      ar: "أحد أشهر المقاهي الحديثة والمفضلة للطلاب للدراسة الفردية والجماعية، يوفر قاعات مريحة، جلسات هادئة، مقابس شحن وفيرة، وإطلالة مباشرة على بحر إسكندرون.",
      tr: "Öğrencilerin bireysel ve grup çalışmaları için en çok tercih ettiği modern kahve zinciri. Geniş çalışma masaları, bol priz, sessiz alanlar ve sahil manzarası sunar."
    },
    address: {
      ar: "شارع أتاتورك بولفار، الكورنيش البحري، إسكندرون / هاتاي",
      tr: "Atatürk Bulvarı Sahil Kordonu, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش البحري (Sahil)",
      tr: "Sahil Kordonu"
    },
    googleMapsUrl: "https://maps.google.com/?q=Espressolab+Iskenderun",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "تتوفر مقابس شحن في معظم الطاولات بالدور العلوي، والإنترنت سريع وممتاز للتحضير للامتحانات أو العمل على مشاريع التخرج.",
      tr: "Üst kattaki çoğu masada priz mevcuttur. Hızlı Wi-Fi ve sınav hazırlıkları için ideal ferah ortam."
    },
    openingHours: {
      ar: "08:00 صباحاً - 01:00 ليلاً",
      tr: "08:00 - 01:00"
    },
    phone: "+90 326 614 00 00",
    features: ["wifi", "study", "sea_view", "open_late"]
  },
  {
    id: "place-2",
    name: {
      ar: "المكتبة المركزية وصالات الاستذكار بحرم الجامعة (İSTE)",
      tr: "İSTE Kampüs Merkez Kütüphanesi & Çalışma Alanları"
    },
    category: "cafes",
    description: {
      ar: "المكتبة الأكاديمية الرئيسية داخل الحرم الجامعي المركزي، تضم مئات الآلاف من المراجع والكتب وصالات المطالعة الفردية والجماعية المكيفة.",
      tr: "Merkez kampüs içerisindeki ana akademik kütüphane. Yüz binlerce kaynak, bireysel ve grup çalışma salonları ve klimalı ortam sunar."
    },
    address: {
      ar: "الحرم الجامعي المركزي لجامعة إسكندرون التقنية (İSTE Merkez Kampüs)",
      tr: "İskenderun Teknik Üniversitesi Merkez Kampüsü, İskenderun / Hatay"
    },
    district: {
      ar: "حرم الجامعة المركزي (Kampüs)",
      tr: "Merkez Kampüs"
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Teknik+Universitesi+Merkez+Kutuphanesi",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "الدخول ببطاقة الطالب الجامعية مجاناً. شبكة الإنترنت سريعة (Eduroam)، وتفتح خلال فترات الامتحانات الرسمية طوال 24 ساعة مع تقديم شاي وضيافة.",
      tr: "Öğrenci kimliğiyle ücretsiz giriş yapılır. Eduroam hızlı interneti mevcuttur ve vize/final haftalarında 24 saat açıktır."
    },
    openingHours: {
      ar: "08:30 - 22:00 (و 24 ساعة أيام الامتحانات)",
      tr: "08:30 - 22:00 (Sınav haftalarında 7/24)"
    },
    features: ["wifi", "study", "budget"]
  },
  {
    id: "place-3",
    name: {
      ar: "ديفيد بيبول كافيه وطعام (David People)",
      tr: "David People Coffee & Food İskenderun"
    },
    category: "cafes",
    description: {
      ar: "مقهى ومطعم واسع يجمع بين الأجواء الاجتماعية الراقية والجلسات المريحة لتناول القهوة والوجبات الخفيفة والاجتماعات الطلابية.",
      tr: "Geniş iç ve bahçe alanı, kaliteli kahve çeşitleri ve zengin yemek menüsüyle öğrencilerin uğrak mekanı."
    },
    address: {
      ar: "شارع الكورنيش، مقابل الممشى البحري، إسكندرون",
      tr: "Sahil Kordonu Caddesi, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش (Sahil)",
      tr: "Sahil"
    },
    googleMapsUrl: "https://maps.google.com/?q=David+People+Iskenderun",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "مكان ملائم جداً للقاءات فرق العمل والمشاريع الطلابية أو أخذ استراحة مميزة بعد أسبوع دراسي حافل.",
      tr: "Grup proje toplantıları ve sahil havası eşliğinde mola vermek için çok uygundur."
    },
    openingHours: {
      ar: "09:00 صباحاً - 00:00 منتصف الليل",
      tr: "09:00 - 00:00"
    },
    features: ["wifi", "study", "sea_view", "food"]
  },
  {
    id: "place-4",
    name: {
      ar: "ستاربكس إسكندرون الكورنيش (Starbucks Sahil)",
      tr: "Starbucks İskenderun Sahil"
    },
    category: "cafes",
    description: {
      ar: "فرع ستاربكس المطل مباشرة على البحر ومارينا إسكندرون، يوفر جلسات خارجية في الهواء الطلق ومكان مفضل لشرب القهوة ومراجعة الدروس.",
      tr: "İskenderun Marinası ve deniz kenarında yer alan, açık hava oturma alanlarına sahip popüler kahve zinciri."
    },
    address: {
      ar: "أتاتورك بولفار، مقابل رصيف الميناء، إسكندرون",
      tr: "Atatürk Bulvarı Sahil, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش (Sahil)",
      tr: "Sahil"
    },
    googleMapsUrl: "https://maps.google.com/?q=Starbucks+Iskenderun+Sahil",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "في فترات الصباح الباكر تكون الأجواء هادئة للغاية ومثالية للقراءة مع نسيم البحر المنعش.",
      tr: "Sabah saatlerinde oldukça sakin olup deniz esintisi eşliğinde ders çalışmak için çok keyiflidir."
    },
    openingHours: {
      ar: "07:30 صباحاً - 01:00 ليلاً",
      tr: "07:30 - 01:00"
    },
    features: ["wifi", "sea_view", "open_late"]
  },
  {
    id: "place-5",
    name: {
      ar: "كورنيش إسكندرون البحري وممشى النخيل (Sahil Kordonu)",
      tr: "İskenderun Sahil Kordonu & Atatürk Anıt Alanı"
    },
    category: "districts",
    description: {
      ar: "أطول وأجمل ممشى بحري في منطقة هاتاي، متصل بحدائق عامة وملاعب ومسارات للدراجات الهوائية ومقاعد استراحة، ويعد المتنفس الأول لطلاب الجامعة.",
      tr: "Bölgenin en uzun ve güzel sahil bandı. Bisiklet yolları, yeşil parklar, anıt meydanı ve kafeleriyle kentin kalbi."
    },
    address: {
      ar: "طريق الساحل الممتد من الميناء حتى كارا آغاتش، إسكندرون",
      tr: "Sahil Şeridi, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش البحري (Sahil)",
      tr: "Sahil Kordonu"
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Sahil+Kordonu",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "يمكنك استئجار دراجة هوائية أو السير على الأقدام لمشاهدة غروب الشمس الرائع خلف جبال الأمانوس، ومكان رائع لتفريغ طاقة الدراسة.",
      tr: "Bisiklet kiralayabilir, gün batımını seyredebilir veya arkadaşlarınızla çimlerde oturarak dinlenebilirsiniz."
    },
    openingHours: {
      ar: "مفتوح 24 ساعة طوال الأسبوع (عام ومجاني)",
      tr: "7/24 Açık (Halka Açık)"
    },
    features: ["sea_view", "budget", "open_late"]
  },
  {
    id: "place-6",
    name: {
      ar: "شارع شهيد بامير وسوق إسكندرون التجاري (Şehit Pamir)",
      tr: "Şehit Pamir Caddesi & Çarşı Merkezi"
    },
    category: "districts",
    description: {
      ar: "الشارع الرئيسي النابض لوسط إسكندرون، يحتوي على فروع كبرى البنوك التركية، ومراكز الاتصالات (Turkcell, Vodafone, Telekom)، ومحلات الصرافة والملابس والقرطاسيات.",
      tr: "İskenderun şehir merkezinin ana arteri. Tüm banka şubeleri, operatör bayileri, döviz büroları ve kırtasiyeler bu caddededir."
    },
    address: {
      ar: "شارع شهيد بامير، وسط مدينة إسكندرون",
      tr: "Şehit Pamir Caddesi, İskenderun / Hatay"
    },
    district: {
      ar: "وسط البلد (Çarşı / Merkez)",
      tr: "Şehir Merkezi"
    },
    googleMapsUrl: "https://maps.google.com/?q=Sehit+Pamir+Caddesi+Iskenderun",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "إذا أردت استخراج خط هاتف تركي، فتح حساب بنكي (Ziraat / Vakıfbank / İş Bankası)، أو طباعة وتصوير أوراق جامعية، فهذا هو المكان الأساسي.",
      tr: "Banka hesabı açma, öğrenci hattı çıkarma ve ucuz fotokopi çekimi için gidilecek merkez caddedir."
    },
    openingHours: {
      ar: "المحلات من 09:00 - 21:00",
      tr: "Mağazalar: 09:00 - 21:00"
    },
    features: ["shopping", "budget"]
  },
  {
    id: "place-7",
    name: {
      ar: "مركز تسوق بارك فوربس (Park Forbes AVM)",
      tr: "Park Forbes Alışveriş Merkezi"
    },
    category: "shopping",
    description: {
      ar: "أحدث وأكبر مول تجاري مغلق في إسكندرون بإطلالة بحرية، يحتوي على سينما Cinemaximum، ومتاجر أزياء وإلكترونيات عالمية ومحلية، وساحة مطاعم سريعة ومقاهي.",
      tr: "İskenderun'un deniz kenarındaki en modern AVM'si. Sinema salonları, eğlence alanları, ünlü giyim markaları ve zengin yemek katı mevcuttur."
    },
    address: {
      ar: "تشاي محلسي، بجانب فندق الهيلتون ومرفأ إسكندرون",
      tr: "Çay Mah., Sahil Kordonu / Liman Yanı, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش / الميناء",
      tr: "Sahil / Liman"
    },
    googleMapsUrl: "https://maps.google.com/?q=Park+Forbes+AVM+Iskenderun",
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd302?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "تمر باصات الدولموش القادمة من الجامعة بجانبه مباشرة. ممتاز للتسوق في الشتاء أو الصيف الحار بفضل التكييف المركزي.",
      tr: "Kampüs dolmuşları hemen önünden geçer. Sinema günlerinde öğrenci indirimleri mevcuttur."
    },
    openingHours: {
      ar: "10:00 صباحاً - 22:00 مساءً",
      tr: "10:00 - 22:00"
    },
    phone: "+90 326 618 80 80",
    features: ["shopping", "food", "sea_view", "wifi"]
  },
  {
    id: "place-8",
    name: {
      ar: "مركز تسوق برايم مول إسكندرون (Primemall AVM)",
      tr: "Primemall İskenderun AVM"
    },
    category: "shopping",
    description: {
      ar: "مركز تسوق واسع يضم هايبرماركت كارفور ومتاجر ملابس ومستلزمات منزلية وإلكترونيات تناسب احتياجات تجهيز الشقق والسكن الطلابي.",
      tr: "CarrefourSA, TeknoSA ve çeşitli giyim mağazalarıyla öğrencilerin ev eşyası ve genel alışveriş ihtiyaçlarına hitap eden AVM."
    },
    address: {
      ar: "حي نُمونة، شارع إبراهيم كارا أوغلان أوغلو، رقم 29/3، إسكندرون / هاتاي",
      tr: "Numune Mah., İbrahim Karaoğlanoğlu Cad. No:29/3, İskenderun / Hatay"
    },
    district: {
      ar: "حي نُمونة (Numune)",
      tr: "Numune Mahallesi"
    },
    googleMapsUrl: "https://maps.google.com/?q=Primemall+Iskenderun",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: false,
    studentTips: {
      ar: "ممتاز لشراء أدوات المطبخ والمفروشات الخفيفة عند الانتقال لسكن جديد بفضل عروض كارفور المستمرة.",
      tr: "Yeni eve çıkan öğrenciler için mutfak gereçleri ve nevresim takımlarında uygun fırsatlar bulunur."
    },
    openingHours: {
      ar: "10:00 صباحاً - 22:00 مساءً",
      tr: "10:00 - 22:00"
    },
    features: ["shopping", "food", "wifi"]
  },
  {
    id: "place-9",
    name: {
      ar: "مركز استخراج وتعبئة كارت المواصلات الطلابي (Hatay Kart)",
      tr: "Hatay Kart Başvuru & Kart Basım Merkezi"
    },
    category: "transport",
    description: {
      ar: "المكتب الرسمي التابع لبلدية هاتاي الكبرى لإصدار بطاقة المواصلات الطلابية المخفضة (İndirimli Öğrenci Kartı) التي تمنح حسماً كبيراً على باصات النقل العام.",
      tr: "Hatay Büyükşehir Belediyesi toplu taşıma araçlarında geçerli indirimli öğrenci kartı basım ve vizeleme merkezi."
    },
    address: {
      ar: "فرع كراج الحافلات (الأوتوجار) وفرع شارع 5 تموز (بجانب البلدية القديمة)، إسكندرون",
      tr: "İskenderun Otogarı Ofisi & Çay Mah., 5 Temmuz Cad. (Eski Kaymakamlık Yanı), İskenderun / Hatay"
    },
    district: {
      ar: "كراج السفر / وسط البلد",
      tr: "Otogar & Çarşı"
    },
    googleMapsUrl: "https://maps.google.com/?q=Hatay+Kart+Iskenderun",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "الأوراق المطلوبة: وثيقة طالب حديثة (Öğrenci Belgesi)، صورة شخصية، وبطاقة الإقامة أو الكيملك. يستغرق استخراج الكارت 3 دقائق فقط!",
      tr: "Gerekli evraklar: Öğrenci Belgesi (e-Devlet çıktısı), 1 adet vesikalık fotoğraf ve kimlik kartı. Kartınız birkaç dakikada teslim edilir."
    },
    openingHours: {
      ar: "08:30 - 17:00 (الاثنين - الجمعة)",
      tr: "08:30 - 17:00 (Hafta İçi)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "place-10",
    name: {
      ar: "كراج حافلات السفر بين المدن (أوتوجار إسكندرون)",
      tr: "İskenderun Şehirlerarası Otobüs Terminali (Otogar)"
    },
    category: "transport",
    description: {
      ar: "المحطة المركزية التي تنطلق منها شركات الحافلات الكبرى (Kamil Koç, Metro, Pamukkale, Has Turizm, Jet Turizm) نحو كافة المدن التركية ورحلات أنطاكيا.",
      tr: "Türkiye'nin dört bir yanına sefer düzenleyen otobüs firmalarının ana kalkış terminali."
    },
    address: {
      ar: "حي دوملوبينار، شارع 312 رقم 7، إسكندرون / هاتاي",
      tr: "Dumlupınar Mah., 312. Sokak No:7, İskenderun / Hatay"
    },
    district: {
      ar: "دوملوبينار (Dumlupınar)",
      tr: "Dumlupınar Mah."
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Otogari",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "للسفر إلى مركز أنطاكيا، تنطلق ميني باصات سريعة من الأوتوجار كل 15-20 دقيقة طوال اليوم بأسعار رخيصة جداً.",
      tr: "Antakya merkeze gitmek için terminalden her 15-20 dakikada bir düzenli minibüs seferleri kalkmaktadır."
    },
    openingHours: {
      ar: "مفتوح 24 ساعة يومياً",
      tr: "7/24 Açık"
    },
    features: ["bus_stop", "open_late"]
  },
  {
    id: "place-11",
    name: {
      ar: "محطة قطار إسكندرون التاريخية (TCDD Gar)",
      tr: "TCDD İskenderun Tren Garı"
    },
    category: "transport",
    description: {
      ar: "محطة القطار التاريخية التابعة للسكك الحديدية التركية، توفر رحلات قطار يومية منتظمة ورخيصة جداً ومريحة للطلاب بين إسكندرون ودورت يول وعثمانية وأضنة ومرسين.",
      tr: "İskenderun - Dörtyol - Osmaniye - Adana - Mersin güzergahında her gün çok ucuz ve konforlu bölgesel tren seferleri düzenleyen istasyon."
    },
    address: {
      ar: "حي سافاش، شارع المحطة مع شارع أتاتورك، إسكندرون / هاتاي",
      tr: "Savaş Mah., İstasyon Meydanı & Atatürk Cad., İskenderun / Hatay"
    },
    district: {
      ar: "ميدان المحطة (İstasyon)",
      tr: "İstasyon Meydanı"
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Tren+Gari",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "تذكرة القطار للطلاب أقل من نصف سعر باص السفر! وهي أفضل وأوفر وسيلة للذهاب إلى أضنة أو التسوق في مرسين.",
      tr: "Öğrencilere yaklaşık %50 indirim uygulanır. Adana ve Mersin'e gitmenin en ekonomik ve rahat yoludur."
    },
    openingHours: {
      ar: "06:00 صباحاً - 20:00 مساءً",
      tr: "06:00 - 20:00"
    },
    features: ["budget", "sightseeing"]
  },
  {
    id: "place-12",
    name: {
      ar: "مديرية إدارة الهجرة - مكتب إسكندرون (Göç İdaresi)",
      tr: "Hatay İl Göç İdaresi İskenderun Çalışma Grubu"
    },
    category: "services",
    description: {
      ar: "المكتب الرسمي الحكومي المختص بمعاملات شؤون الطلاب الأجانب، استلام ملفات الإقامة الطلابية لأول مرة أو التجديد، أخذ البصمات، وتحديث البيانات.",
      tr: "Yabancı öğrencilerin ikamet izni (öğrenci ikameti) dosya teslimi, parmak izi ve kayıt işlemlerinin yapıldığı resmi merci."
    },
    address: {
      ar: "حي دنيزجيلار، شارع أتاتورك 1، إسكندرون / هاتاي (هاتف: 03266456085)",
      tr: "Denizciler Mah., Atatürk 1 Caddesi, İskenderun / Hatay (Tel: +90 326 645 60 85)"
    },
    district: {
      ar: "دنيزجيلار (Denizciler)",
      tr: "Denizciler Mah."
    },
    googleMapsUrl: "https://maps.google.com/?q=Hatay+Goc+Idaresi+Iskenderun",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "تأكد من حجز الموعد عبر موقع e-ikamet.goc.gov.tr وتجهيز استمارة الموعد موقعة، وثيقة الطالب، التأمين الصحي، وصور بيومترية قبل الذهاب.",
      tr: "Randevu belgesi, öğrenci belgesi, geçerli sağlık sigortası ve biyometrik fotoğrafla randevu saatinizde gidiniz."
    },
    openingHours: {
      ar: "08:30 - 17:00 (الاثنين إلى الجمعة)",
      tr: "08:30 - 17:00 (Hafta İçi)"
    },
    features: ["services"]
  },
  {
    id: "place-13",
    name: {
      ar: "مديرية النفوس لتثبيت السكن والبيانات (Nüfus Müdürlüğü)",
      tr: "İskenderun İlçe Nüfus Müdürlüğü"
    },
    category: "services",
    description: {
      ar: "دائرة النفوس الرسمية المسؤولة عن تثبيت عنوان السكن الفعلي للطالب (Adres Kaydı / Tescili) في سجلات الدولة التركية ونظام الـ e-Devlet وهو شرط لتجديد الإقامة.",
      tr: "Öğrencilerin ikamet adreslerini (yurt veya ev) MERNIS sistemine ve e-Devlet'e tescil ettirdiği nüfus müdürlüğü."
    },
    address: {
      ar: "حي سافاش، شارع أتاتورك بولفار رقم 45 (مبنى القائممقامية)، إسكندرون / هاتاي",
      tr: "Savaş Mah., Atatürk Bulvarı No:45 (Kaymakamlık Hizmet Binası), İskenderun / Hatay"
    },
    district: {
      ar: "وسط البلد (Savaş Mah.)",
      tr: "Savaş Mah."
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Ilce+Nufus+Mudurlugu",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "إذا كنت تسكن في سكن جامعي (KYK أو سكن خاص)، اطلب وثيقة إثبات سكن من إدارة السكن. أما إن كنت مستأجراً لشقة، فاحضر عقد الإيجار الموثق عند النوتر وفاتورة باسمك.",
      tr: "Yurtta kalıyorsanız yurt müdürlüğünden barınma belgesi, evde kalıyorsanız noter onaylı kira sözleşmesi ve adınıza fatura ile başvurunuz."
    },
    openingHours: {
      ar: "08:30 - 17:00 (أيام الدوام الرسمي)",
      tr: "08:30 - 17:00 (Hafta İçi)"
    },
    features: ["services"]
  },
  {
    id: "place-14",
    name: {
      ar: "مكتب البريد المركزي التركي (PTT Merkez)",
      tr: "PTT İskenderun Merkez Müdürlüğü"
    },
    category: "services",
    description: {
      ar: "المكتب الرئيسي لشركة البريد التركي PTT في إسكندرون؛ يقدم خدمات إصدار كلمة مرور بوابة الحكومة الإلكترونية (e-Devlet)، واستلام الطرود البريدية، والتحويلات.",
      tr: "e-Devlet şifresi alımı, kargo teslimi ve resmi tebligat işlemleri için İskenderun PTT ana şubesi."
    },
    address: {
      ar: "حي بارباروس، شارع إبراهيم كارا أوغلان أوغلو رقم 4، إسكندرون / هاتاي",
      tr: "Barbaros Mah., İbrahim Karaoğlanoğlu Cad. No:4, İskenderun / Hatay"
    },
    district: {
      ar: "بارباروس (Barbaros)",
      tr: "Barbaros Mah."
    },
    googleMapsUrl: "https://maps.google.com/?q=PTT+Iskenderun+Merkez",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "فور استلامك لبطاقة الإقامة (Kimlik)، توجه للـ PTT وأبرز الكيملك للموظف وسيعطيك شفرة e-Devlet في ظرف مغلق فوراً مقابل رسوم رمزية (حوالي 10-20 ليرة).",
      tr: "İkamet kartınızla PTT'ye giderek birkaç lira karşılığında anında e-Devlet şifrenizi temin edebilirsiniz."
    },
    openingHours: {
      ar: "08:30 - 17:00 (الاثنين إلى الجمعة)",
      tr: "08:30 - 17:00 (Hafta İçi)"
    },
    features: ["services", "budget"]
  },
  {
    id: "place-15",
    name: {
      ar: "مشفى إسكندرون الحكومي العام (Devlet Hastanesi)",
      tr: "İskenderun Devlet Hastanesi (Yeni Bina)"
    },
    category: "hospitals",
    description: {
      ar: "المشفى الحكومي التخصصي الأكبر في إسكندرون، يقدم خدمات الطوارئ على مدار 24 ساعة وكافة العيادات الاستشارية والتحاليل والأشعة المشمولة بالتأمين الصحي للطلاب (GSS).",
      tr: "Yabancı öğrenci genel sağlık sigortası kapsamında poliklinik muayenesi ve 7/24 acil servis hizmeti veren ana devlet hastanesi."
    },
    address: {
      ar: "حي نُمونة، شارع 903 رقم 31A (قرب شارع الدكتور صادق أحمد)، إسكندرون / هاتاي",
      tr: "Numune Mah., 903. Sokak No:31A (Dr. Sadık Ahmet Cad. Civarı), İskenderun / Hatay"
    },
    district: {
      ar: "نُمونة (Numune)",
      tr: "Numune Mah."
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Devlet+Hastanesi",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "لزيارة العيادات نهاراً، خذ موعداً مسبقاً عبر تطبيق MHRS أو اتصل بالرقم 182. وفي الحالات الإسعافية العاجلة توجه مباشرة لقسم الطوارئ (Acil Servis).",
      tr: "Poliklinik için MHRS uygulamasından veya 182'den randevu alabilirsiniz. Acil durumlarda doğrudan acil servise başvurunuz."
    },
    openingHours: {
      ar: "الطوارئ 24/7 طوال الأسبوع، والعيادات نهاراً",
      tr: "Acil Servis 7/24, Poliklinikler: 08:30 - 17:00"
    },
    phone: "+90 326 618 40 00",
    features: ["services", "hospitals"]
  },
  {
    id: "place-16",
    name: {
      ar: "مطاعم شاورما إسكندرون الشهيرة (İskenderun Döneri)",
      tr: "Meşhur İskenderun Döneri Durakları (Petek & Ali Usta)"
    },
    category: "food",
    description: {
      ar: "إسكندرون هي مهد الشاورما التركية بالخبز المحمص الخاص مع الصلصة الغنية والبهارات الحاتية اللذيذة والجبن، وهي الوجبة الطلابية الأكثر تفضيلاً وشهرة في المدينة.",
      tr: "Özel sosu, kaşarı ve çıtır lavaşıyla tüm Türkiye'de meşhur olan orijinal İskenderun dönerinin lezzet durakları."
    },
    address: {
      ar: "شارع شهيد بامير ومحيط ساحة أتاتورك، إسكندرون",
      tr: "Şehit Pamir ve Çarşı Çevresi, İskenderun / Hatay"
    },
    district: {
      ar: "وسط البلد (Çarşı)",
      tr: "Şehir Çarşısı"
    },
    googleMapsUrl: "https://maps.google.com/?q=Iskenderun+Doner",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "وجبة مشبعة جداً واقتصادية في نفس الوقت. اطلب 'Soslu Kaşarlı Dürüm' لتذوق النكهة الحقيقية لشاورما إسكندرون الأصلية.",
      tr: "Öğrenciler için hem lezzetli hem de doyurucu en popüler öğle yemeğidir. Soslu ve kaşarlı dürüm denemeniz tavsiye edilir."
    },
    openingHours: {
      ar: "10:30 صباحاً - 23:00 مساءً",
      tr: "10:30 - 23:00"
    },
    features: ["food", "budget"]
  },
  {
    id: "place-17",
    name: {
      ar: "حلويات بيتك التاريخية والكنافة (Tarihi Petek Pastanesi)",
      tr: "Tarihi Petek Pastanesi (1942)"
    },
    category: "food",
    description: {
      ar: "المعلم التاريخي الأبرز للحلويات في إسكندرون منذ عام 1942، يشتهر بتقديم الكنافة الحاتية بالجبن البلدي الطازج، والآيس كريم التركي والحلويات الشرقية الفاخرة.",
      tr: "1942'den bu yana İskenderun'un lezzet simgesi. Geleneksel Hatay künefesi, dondurma ve tatlı çeşitleriyle meşhur tarihi mekan."
    },
    address: {
      ar: "شارع أتاتورك، الكورنيش البحري، إسكندرون",
      tr: "Atatürk Bulvarı No:34 Sahil, İskenderun / Hatay"
    },
    district: {
      ar: "الكورنيش (Sahil)",
      tr: "Sahil"
    },
    googleMapsUrl: "https://maps.google.com/?q=Tarihi+Petek+Pastanesi+Iskenderun",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
    isPopularForStudents: true,
    studentTips: {
      ar: "الكنافة تقدم ساخنة مباشرة من الفرن، مكان رائع جداً لأخذ ضيوفك أو زملائك لتجربة حلوى هاتاي الأصلية.",
      tr: "Sıcak künefe ve dondurması eşsizdir. Dönem sonu kutlamaları ve misafirlerinizi ağırlamak için ideal tarihi durak."
    },
    openingHours: {
      ar: "08:00 صباحاً - 00:00 منتصف الليل",
      tr: "08:00 - 00:00"
    },
    phone: "+90 326 614 10 00",
    features: ["food", "sea_view"]
  },
  {
    id: "bazaar-1-pazartesi",
    name: {
      ar: "بازار الإثنين - حي تشانكايا (Çankaya Pazartesi Pazarı)",
      tr: "Çankaya Pazartesi Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الإثنين",
      tr: "Pazartesi"
    },
    description: {
      ar: "بازار يوم الإثنين الأسبوعي الشهير في حي تشانكايا؛ يوفر خضروات وفواكه طازجة، أجبان ريفية، بيض بلدي، وملابس منزلية بأسعار مخفضة.",
      tr: "Çankaya mahallesinde her Pazartesi kurulan taze sebze, meyve, süt ürünleri ve giyim için popüler semt pazarı."
    },
    address: {
      ar: "حي تشانكايا، شارع 350 ومحيط شارع الشهيد أوغوزهان، مساحة السوق، إسكندرون / هاتاي",
      tr: "Çankaya Mah., 350. Sokak & Şehit Er Oğuzhan Cd. Semt Pazarı Alanı, İskenderun / Hatay"
    },
    district: {
      ar: "تشانكايا (Çankaya)",
      tr: "Çankaya Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.56842,36.17724+(Cankaya+Pazartesi+Pazari+Iskenderun)",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "أفضل وقت للتسوق صباحاً من 9:00 إلى 12:00 للحصول على أفضل بضاعة طازجة، أو بعد العصر (16:30) للحصول على أفضل التخفيضات والأسعار الرخيصة.",
      tr: "Taze ürünler için sabah saatleri, daha uygun fiyatlar için ikindi sonrası 16:30 civarı ziyaret edilmesi tavsiye edilir."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم إثنين)",
      tr: "08:00 - 19:00 (Her Pazartesi)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-2-sali",
    name: {
      ar: "بازار الثلاثاء - حي بارباروس ودوملوبينار (Barbaros Salı Pazarı)",
      tr: "Barbaros & Dumlupınar Salı Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الثلاثاء",
      tr: "Salı"
    },
    description: {
      ar: "بازار الثلاثاء الأسبوعي، يضم تشكيلة كبيرة من المأكولات والمؤن والأجبان الريفية والزيتون والمخللات والملابس بأسعار مناسبة جداً.",
      tr: "Salı günleri kurulan zengin şarküteri, peynir, zeytin, taze sebze ve uygun fiyatlı giyim pazarı."
    },
    address: {
      ar: "حي بارباروس، شارع 147 وتقاطع شارع مدحت باشا، إسكندرون / هاتاي",
      tr: "Barbaros Mah., 147. Sokak & Mithatpaşa Cd. Kapalı Semt Pazarı, İskenderun / Hatay"
    },
    district: {
      ar: "بارباروس (Barbaros)",
      tr: "Barbaros Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.59124,36.18341+(Barbaros+Sali+Pazari+Iskenderun)",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "ممتاز لشراء زيت الزيتون، الزعتر الأخضر، وجبن الحلوم والجبن الأبيض البلدي من المزارعين مباشرة.",
      tr: "Köy peyniri, zeytin ve taze Hatay lezzetlerini doğrudan üreticiden almak için mükemmeldir."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم ثلاثاء)",
      tr: "08:00 - 19:00 (Her Salı)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-3-carsamba",
    name: {
      ar: "بازار الأربعاء - حي ساكاريا وإسمت إينونو (Sakarya Çarşamba Pazarı)",
      tr: "Sakarya & İsmet İnönü Kapalı Çarşamba Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الأربعاء",
      tr: "Çarşamba"
    },
    description: {
      ar: "أحد أكبر وأشهر البازارات الأسبوعية في إسكندرون، مسقوف ومغطى ويوفر كل مستلزمات المطبخ والخضار والفاكهة والأدوات المنزلية.",
      tr: "İskenderun'un en modern kapalı pazar yerlerinden biri; hava şartlarından etkilenmeden rahat alışveriş imkanı sunar."
    },
    address: {
      ar: "حي ساكاريا، شارع الشهيد أيخان كيفراك، مساحة البازار المغلق، إسكندرون / هاتاي",
      tr: "Sakarya Mah., Şehit Polis Ayhan Kıvrak Cd. Kapalı Pazar Alanı, İskenderun / Hatay"
    },
    district: {
      ar: "ساكاريا (Sakarya)",
      tr: "Sakarya Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.58285,36.16642+(Sakarya+Ismet+Inonu+Carsamba+Pazari)",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "البازار مغطى ومسقوف ومحمي من الشمس والمطر، وبجانبه مباشرة موقف سرافيس ينقلك مباشرة للجامعة ولكافة الأحياء.",
      tr: "Kapalı pazar alanı sayesinde her hava koşulunda rahat alışveriş imkanı sunar, dolmuş durağı hemen yanındadır."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:30 مساءً (كل يوم أربعاء)",
      tr: "08:00 - 19:30 (Her Çarşamba)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-4-persembe",
    name: {
      ar: "بازار الخميس - حي نُمونة (سوق الخضار والأسماك المركزي - Numune Perşembe Pazarı)",
      tr: "Numune Perşembe Pazarı (Sebze ve Balık Semt Pazarı)"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الخميس",
      tr: "Perşembe"
    },
    description: {
      ar: "أشهر وأكبر بازار أسبوعي في إسكندرون؛ يشتهر بسوق الأسماك البحرية الطازجة، وتشكيلة هائلة من الخضروات والفواكه والملابس الرخيصة، ويقع قرب دوار باتش الشهير.",
      tr: "İskenderun'un en meşhur ve en hareketli pazarı. Taze balık pazarı, sebze-meyve ve giyim reyonlarıyla Paç Meydanı ve eski hastane civarında kurulur."
    },
    address: {
      ar: "حي نُمونة، طريق البازار (Semt Pazarı Yolu)، شارع 152 قرب دوار باتش (Paç Meydanı)، إسكندرون / هاتاي",
      tr: "Numune Mah., Semt Pazarı Yolu, 152. Sokak (Paç Meydanı & Eski Devlet Hastanesi Civarı), İskenderun / Hatay"
    },
    district: {
      ar: "نُمونة / باتش (Numune)",
      tr: "Numune Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.58622,36.16105+(Numune+Persembe+Pazari+Iskenderun)",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "تتوفر فيه أسماك البحر الأبيض المتوسط الطازجة بأسعار أرخص بكثير من المحلات والمطاعم العادية.",
      tr: "Taze Akdeniz balıklarını ve mevsim yeşilliklerini oldukça uygun fiyata bulabilirsiniz."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم خميس)",
      tr: "08:00 - 19:00 (Her Perşembe)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-5-cuma",
    name: {
      ar: "بازار الجمعة - حي مودرن إفلر وسوق القرى (Modernevler Cuma Pazarı)",
      tr: "Modernevler Kapalı Cuma Pazarı & Eski Hal Köy Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الجمعة",
      tr: "Cuma"
    },
    description: {
      ar: "بازار الجمعة المغلق؛ ممتاز للتسوق الأسبوعي ومستلزمات الطبخ. كما يُقام صباحاً في منطقة الهال القديم سوق المزارعين الطبيعي للمنتجات القروية.",
      tr: "Geniş kapalı alana sahip cuma pazarı; kuru bakliyat, taze yeşillikler ve ev ihtiyaçları için oldukça zengindir. Sabah erken saatlerde köy pazarı kurulur."
    },
    address: {
      ar: "حي مودرن إفلر، شارع 308، مساحة البازار المغلق وسوق الهال القديم، إسكندرون / هاتاي",
      tr: "Modernevler Mah., 308. Sokak Kapalı Pazar Yeri Alanı, İskenderun / Hatay"
    },
    district: {
      ar: "مودرن إفلر (Modernevler)",
      tr: "Modernevler Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.59154,36.16952+(Cay+Eski+Hal+Cuma+Koy+Pazari)",
    image: "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "قريب من السكن الطلابي وسهل الحركة بعربات التسوق لتوافر ممرات واسعة ومسقوفة ونظيفة.",
      tr: "Geniş koridorları ve kapalı çatısı ile düzenli ve temiz bir pazar ortamına sahiptir."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم جمعة)",
      tr: "08:00 - 19:00 (Her Cuma)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-6-cumartesi",
    name: {
      ar: "بازار السبت - حي مصطفى كمال وبولوتيبي (Mustafa Kemal & Bulutepe Pazarı)",
      tr: "Mustafa Kemal & Bulutepe Cumartesi Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "السبت",
      tr: "Cumartesi"
    },
    description: {
      ar: "بازار السبت لعطلة نهاية الأسبوع؛ يزوره الطلاب للتسوق وتجهيز مستلزمات الأسبوع الجديد من خضار، بهارات حاتية عريقة، أواني، وملابس بأسعار مناسبة.",
      tr: "Hafta sonu kurulan cumartesi pazarı; taze Hatay baharatları, taze sebze ve uygun fiyatlı mutfak gereçleri barındırır."
    },
    address: {
      ar: "حي مصطفى كمال، شارع 544 مساحة السوق الأسبوعي، إسكندرون / هاتاي",
      tr: "Mustafa Kemal Mah., 544. Sokak Semt Pazarı Alanı, İskenderun / Hatay"
    },
    district: {
      ar: "مصطفى كمال (Mustafa Kemal)",
      tr: "Mustafa Kemal Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.57463,36.15584+(Mustafa+Kemal+Cumartesi+Halk+Pazari)",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "فرصة رائعة بعد أسبوع دراسي لشراء مؤونة الأسبوع والاستمتاع بأجواء البازار التركي التقليدي وتذوق الأطعمة المحلية.",
      tr: "Haftalık yemek hazırlığı yapan öğrenciler için hafta sonu en ideal pazar durağıdır."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم سبت)",
      tr: "08:00 - 19:00 (Her Cumartesi)"
    },
    features: ["budget", "bus_stop"]
  },
  {
    id: "bazaar-7-pazar",
    name: {
      ar: "بازار الأحد - حي إسنتيبي ودوملوبينار (Esentepe & Dumlupınar Pazar Pazarı)",
      tr: "Esentepe & Dumlupınar Pazar Pazarı"
    },
    category: "bazaars",
    operatingDay: {
      ar: "الأحد",
      tr: "Pazar"
    },
    description: {
      ar: "بازار يوم الأحد الأخير في الأسبوع قبل بدء الدراسة والدوام الجامعي، يوفر كل احتياجات المنزل الطازجة وأسعار تنافسية جداً في نهاية اليوم.",
      tr: "Pazar günleri kurulan, yeni ders haftası öncesi mutfak alışverişi için öğrencilerin sıkça tercih ettiği semt pazarı."
    },
    address: {
      ar: "حي إسنتيبي، شارع كوجاتيبي وشارع 391، إسكندرون / هاتاي",
      tr: "Esentepe Mah., Kocatepe Cd. & 391. Sokak Civarı, İskenderun / Hatay"
    },
    district: {
      ar: "إسنتيبي (Esentepe)",
      tr: "Esentepe Mah."
    },
    googleMapsUrl: "https://www.google.com/maps?q=36.56455,36.16523+(Esentepe+Dumlupinar+Pazar+Pazari)",
    image: "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?w=600&auto=format&fit=crop&q=65",
    isPopularForStudents: true,
    studentTips: {
      ar: "إذا كنت تريد شراء كميات بأسعار رخيصة جداً، اذهب بين الساعة 17:00 و 18:30 قبل إغلاق البازار للحصول على تخفيضات البائعين لتصفية البضاعة.",
      tr: "Öğrenciler için pazarın kapanış saatlerine yakın (17:00 - 18:30) çok uygun indirimli fiyatlar oluşur."
    },
    openingHours: {
      ar: "08:00 صباحاً - 19:00 مساءً (كل يوم أحد)",
      tr: "08:00 - 19:00 (Her Pazar)"
    },
    features: ["budget", "bus_stop"]
  }
];

import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

export interface UniversityNewsItem {
  id: string;
  titleTr: string;
  titleAr: string;
  contentTr: string;
  contentAr: string;
  date: string;
  categoryTr: string;
  categoryAr: string;
  link: string;
  isRelevantToForeigners: boolean;
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const PRIMARY_GROQ_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_GROQ_MODEL = 'allam-2-7b';

// In-memory cache
let cachedNews: UniversityNewsItem[] = [];
let lastCacheTime = 0;
let lastCacheTimestampStr = new Date().toISOString();
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

const CACHE_FILE_PATH = path.join(process.cwd(), 'cached-iste-news.json');

/**
 * Removes any URL or web links from text string
 */
export function stripUrls(text: string): string {
  if (!text) return '';
  return text
    .replace(/https?:\/\/[^\s]+/gi, '')
    .replace(/www\.[^\s]+/gi, '')
    .replace(/([a-zA-Z0-9.-]+\.edu\.tr[^\s]*)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if announcement keywords indicate relevance to foreign/international students
 */
export function checkForeignRelevance(title: string, content: string, categoryTr = ''): boolean {
  if (categoryTr === 'Yabancı Diller' || categoryTr === 'Öğrenci İşleri') {
    return true;
  }
  const combined = (title + ' ' + content).toLowerCase();
  const keywords = [
    'uluslararası', 'yabancı', 'yos', 'yös', 'tr-yös', 'erasmus', 'mevlana', 'farabi',
    'tömer', 'tomer', 'yabancı dil', 'muafiyet', 'hazırlık', 'ikamet', 'pasaport',
    'göç idaresi', 'denklik', 'af başvuru', 'yatay geçiş', 'öğrenci işleri', 'harç',
    'katkı payı', 'obs', 'kayıt', 'sınav', 'intibak', 'ders kayıt', 'akademik takvim',
    'oryantasyon', 'burs', 'öğrenci kimlik', 'yurt', 'diploma', 'öğrenci'
  ];
  return keywords.some(k => combined.includes(k));
}

// Initialize cache from disk if available
try {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedNews = parsed
        .map((item: any) => ({
          ...item,
          titleAr: stripUrls(item.titleAr || ''),
          contentAr: stripUrls(item.contentAr || ''),
          contentTr: stripUrls(item.contentTr || ''),
          link: '',
          isRelevantToForeigners: checkForeignRelevance(item.titleTr || '', item.contentTr || '', item.categoryTr || '')
        }))
        .sort((a: any, b: any) => {
          if (a.isRelevantToForeigners && !b.isRelevantToForeigners) return -1;
          if (!a.isRelevantToForeigners && b.isRelevantToForeigners) return 1;
          return (b.date || '').localeCompare(a.date || '');
        });
      lastCacheTime = Date.now();
      lastCacheTimestampStr = new Date().toISOString();
    }
  }
} catch (e) {
  console.warn('Could not read cached-iste-news.json:', e);
}

// Gemini AI client instance
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

/**
 * Call Groq Chat Completions API
 */
export async function callGroqChat(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: { model?: string }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not configured');
  }

  const models = [options?.model || PRIMARY_GROQ_MODEL, FALLBACK_GROQ_MODEL, 'openai/gpt-oss-20b'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Groq API (${model}) failed with ${response.status}:`, errorText);
        lastError = new Error(`Groq ${model} failed: ${errorText}`);
        continue;
      }

      const data = await response.json() as any;
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim().length > 0) {
        return content.trim();
      }
    } catch (e) {
      console.warn(`Groq request exception for ${model}:`, e);
      lastError = e;
    }
  }

  throw lastError || new Error('All Groq models failed');
}

/**
 * Thorough unescape of HTML entities and cleanup of tags
 */
export function cleanHtml(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&ldquo;|&rdquo;/gi, '"')
    .replace(/&hellip;/gi, '...')
    .replace(/&ndash;|&mdash;/gi, '-')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&Uuml;/g, 'Ü').replace(/&uuml;/g, 'ü')
    .replace(/&Ouml;/g, 'Ö').replace(/&ouml;/g, 'ö')
    .replace(/&Ccedil;/g, 'Ç').replace(/&ccedil;/g, 'ç')
    .replace(/&Icirc;/g, 'Î').replace(/&icirc;/g, 'î')
    .replace(/&Scedil;/g, 'Ş').replace(/&scedil;/g, 'ş')
    .replace(/&Gbreve;/g, 'Ğ').replace(/&gbreve;/g, 'ğ')
    .replace(/&#(\d+);/g, (_, dec) => {
      try {
        return String.fromCharCode(parseInt(dec, 10));
      } catch {
        return '';
      }
    })
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Scrapes an announcement detail page
 */
async function scrapeAnnouncementDetail(url: string): Promise<{ title: string; content: string; date: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'text/html,application/xhtml+xml,application/xml',
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return { title: '', content: '', date: '' };
    }

    const html = await res.text();

    // Title
    let title = '';
    const titleMatch = html.match(/<div[^>]*class=["'][^"']*text-title[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
                       html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (titleMatch) {
      title = cleanHtml(titleMatch[1]);
    }

    // Content
    let content = '';
    const contentMatch = html.match(/<div[^>]*class=["'][^"']*text-container[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
    if (contentMatch) {
      content = cleanHtml(contentMatch[1]);
    } else {
      const pMatches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
      if (pMatches) {
        content = pMatches.map(p => cleanHtml(p)).filter(t => t.length > 20).join(' ');
      }
    }

    // Date
    let date = '';
    const dateMatch = html.match(/class=["'][^"']*date[^"']*["'][^>]*>[\s\S]*?(\d{2}\/\d{2}\/\d{4})/i) ||
                      html.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (dateMatch) {
      const parts = dateMatch[1].split('/');
      date = `${parts[2]}-${parts[1]}-${parts[0]}`;
    } else {
      const urlDateMatch = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
      if (urlDateMatch) {
        date = `${urlDateMatch[1]}-${urlDateMatch[2]}-${urlDateMatch[3]}`;
      }
    }

    return { title, content, date };
  } catch (err) {
    return { title: '', content: '', date: '' };
  }
}

/**
 * Scrapes announcements and news from iste.edu.tr
 */
export async function scrapeIsteRawAnnouncements(): Promise<Array<{
  id: string;
  link: string;
  titleTr: string;
  contentTr: string;
  date: string;
  categoryTr: string;
}>> {
  const targetUrls = [
    'https://iste.edu.tr/duyuru-merkezi',
    'https://iste.edu.tr/duyuru-merkezi/oidb',
    'https://iste.edu.tr/duyuru-merkezi/ydyo',
    'https://iste.edu.tr/haber-merkezi',
    'https://iste.edu.tr'
  ];

  // Robust link regex that captures both root announcements and department announcements
  const linkRegex = /href=["'](https?:\/\/(?:www\.)?iste\.edu\.tr\/(?:duyuru-merkezi|haber-merkezi)(?:\/[a-zA-Z0-9_-]+)*\/\d{4}\/\d{2}\/(?:\d{2}\/)?\d+)["']/gi;

  const scrapedLinks: Array<{ link: string; initialDate: string; categoryTr: string }> = [];
  const seenLinks = new Set<string>();

  await Promise.all(
    targetUrls.map(async (targetUrl) => {
      try {
        const res = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
            'Accept': 'text/html,application/xhtml+xml,application/xml',
          },
          signal: AbortSignal.timeout(6000),
        });

        if (!res.ok) return;
        const html = await res.text();

        let match: RegExpExecArray | null;
        while ((match = linkRegex.exec(html)) !== null) {
          const rawLink = match[1];
          // normalize https://www.iste.edu.tr to https://iste.edu.tr
          const link = rawLink.replace('https://www.iste.edu.tr', 'https://iste.edu.tr');

          if (!seenLinks.has(link)) {
            seenLinks.add(link);
            const dateMatch = link.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
            const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : '2026-09-10';

            const categoryTr = link.includes('/oidb') ? 'Öğrenci İşleri' :
                               link.includes('/ydyo') ? 'Yabancı Diller' :
                               link.includes('/lee') ? 'Lisansüstü' :
                               link.includes('haber-merkezi') ? 'Haber' : 'Genel Duyuru';

            scrapedLinks.push({ link, initialDate: date, categoryTr });
          }
        }
      } catch (e) {
        console.warn(`Error scraping ${targetUrl}:`, e);
      }
    })
  );

  // Separate announcements and news
  const announcementsList = scrapedLinks.filter(item => item.categoryTr !== 'Haber');
  const newsList = scrapedLinks.filter(item => item.categoryTr === 'Haber');

  announcementsList.sort((a, b) => b.initialDate.localeCompare(a.initialDate));
  newsList.sort((a, b) => b.initialDate.localeCompare(a.initialDate));

  // Prioritize announcements specifically from Student Affairs (OIDB) and Foreign Languages (YDYO) which directly serve foreign students
  const foreignAnnouncements = announcementsList.filter(item => 
    item.categoryTr === 'Yabancı Diller' || item.categoryTr === 'Öğrenci İşleri'
  );
  const generalAnnouncements = announcementsList.filter(item => 
    item.categoryTr !== 'Yabancı Diller' && item.categoryTr !== 'Öğrenci İşleri'
  );

  // Take mostly student affairs & language school announcements (8-9 items) + 2 general news items
  const selectedLinks = [
    ...foreignAnnouncements.slice(0, 8),
    ...generalAnnouncements.slice(0, 2),
    ...newsList.slice(0, 2)
  ];

  selectedLinks.sort((a, b) => b.initialDate.localeCompare(a.initialDate));

  // Fetch details concurrently
  const details = await Promise.all(
    selectedLinks.map(async (item, idx) => {
      const detail = await scrapeAnnouncementDetail(item.link);
      const finalDate = detail.date || item.initialDate;
      const id = `iste-${finalDate}-${idx + 1}`;
      return {
        id,
        link: item.link,
        titleTr: detail.title || 'İSTE Duyurusu',
        contentTr: stripUrls(detail.content || 'Detaylar ve başvuru bilgileri için resmi duyuru sayfasını inceleyiniz.'),
        date: finalDate,
        categoryTr: item.categoryTr
      };
    })
  );

  return details.filter(d => d.titleTr.length > 3);
}

export function getRuleTitle(rawTitle: string): string {
  const tLower = rawTitle.toLowerCase();
  if (/halıflex|haliflex/i.test(tLower)) return 'إعلان مناقصة لتوريد وتركيب سجاد للمكاتب والمرافق الجامعية (Halıfleks)';
  if (/atlas enerji/i.test(tLower)) return 'رئيس جامعة إسكندرون التقنية يزور شركة أطلس للطاقة لبحث سبل التعاون والتدريب الطلابي';
  if (/emeğe vefa/i.test(tLower)) return 'حفل تكريم ووفاء للموظفين المحالين للتقاعد في جامعة إسكندرون التقنية';
  if (/deniz bilimleri/i.test(tLower)) return 'تطوير ودعم أبحاث وتطبيقات علوم البحار والاستزراع المائي في جامعة İSTE';
  if (/konservatuvar/i.test(tLower) && /ziyaret/i.test(tLower)) return 'إدارة الجامعة تزور معهد مصطفى يازيجي الموسيقي الوطني بمناسبة العام الدراسي الجديد';
  if (/taziye/i.test(tLower)) return 'برقية تعزية ومواساة من رئاسة جامعة إسكندرون التقنية';
  if (/laboratuvar/i.test(tLower)) return 'إعلان مناقصة لتوريد مستلزمات وتجهيزات مخبرية لكليات الجامعة';
  if (/genel kurul/i.test(tLower)) return 'انعقاد اجتماع الهيئة العامة لمدرسة اللغات الأجنبية للعام الدراسي 2026-2027';
  if (/iran/i.test(tLower)) return 'إجراءات الانتقال الأفقي والالتحاق كطالب خاص للطلاب الأتراك الدارسين في إيران';
  if (/değişim programları|erasmus|mevlana|farabi/i.test(tLower)) return 'امتحان اللغة الأجنبية لبرامج التبادل الطلابي (إيراسموس، مولانا، فارابي) 2026-2';
  if (/ortak zorunlu ingilizce|ingilizce i ve ii/i.test(tLower)) return 'إعلان امتحان الإعفاء لمادتي اللغة الإنجليزية المشتركة (İngilizce I و II)';
  if (/dgs yerleştirme/i.test(tLower)) return 'إجراءات تسجيل وتثبيت قيد الطلاب المقبولين في الجامعة عبر امتحان الانتقال الرأسي (DGS)';
  if (/yatay geçiş/i.test(tLower)) return 'نتائج وإجراءات طلبات الانتقال الأفقي بين التخصصات والجامعات للعام الدراسي 2026-2027';
  if (/af başvuru/i.test(tLower)) return 'تنبيه هام بشأن التقديم على العفو الطلابي وإعادة القيد (المادة المؤقتة 85)';
  if (/ders kayıt/i.test(tLower)) return 'إجراءات تثبيت المواد واختيار المقررات الدراسية للفصل الخريفي عبر بوابة OBS';
  if (/muafiyet|intibak/i.test(tLower)) return 'إعلان طلبات معادلة وإعفاء المواد الدراسية للطلبة المستجدين في الجامعة';
  if (/tek ders sınav/i.test(tLower)) return 'إعلان بخصوص امتحان المادة الواحدة للتخرج بعد المدرسة الصيفية';
  if (/uluslararası öğrenci|yabancı öğrenci/i.test(tLower)) return 'إعلان مفاضلة وقبول الطلاب الدوليين والأجانب لدرجتي الدبلوم والبكالوريوس';
  if (/türk sanatı.*kongre/i.test(tLower)) return 'المؤتمر الدولي العشرون للفنون والتاريخ والتراث التركي في جامعة İSTE';
  if (/oryantasyon/i.test(tLower)) return 'اجتماع اللقاء التعريفي والإرشادي للعام الأكاديمي 2026-2027';
  if (/yemek bursu/i.test(tLower)) return 'إعلان بدء التقديم على المنحة الغذائية الطلابية';
  if (/öğrenci kimlik/i.test(tLower)) return 'إعلان استلام البطاقات الجامعية للطلاب الجدد';
  if (/akademik takvim/i.test(tLower)) return 'إعلان التقويم الأكاديمي الرسمي للعام الجامعي';
  if (/teknofest/i.test(tLower)) return 'إنجاز ومشاركة مميزة لفرق ومشاريع جامعة İSTE في مهرجان تكنوفست';
  return rawTitle;
}

export function getRuleContent(rawTitle: string, rawContent: string): string {
  const tLower = (rawTitle + ' ' + rawContent).toLowerCase();
  if (/halıflex|haliflex/i.test(tLower)) return 'أعلنت رئاسة الدائرة الإدارية والمالية بجامعة إسكندرون التقنية عن طرح مناقصة لشراء وتوريد سجاد مكتبي ومستلزمات أرضيات لصالح وحدات الجامعة.';
  if (/atlas enerji/i.test(tLower)) return 'أجرى رئيس الجامعة زيارة رسمية لمنشآت الطاقة لبحث تعزيز التعاون المشترك وتوفير فرص تدريب عملي لطلاب الهندسة.';
  if (/emeğe vefa/i.test(tLower)) return 'أقامت الجامعة حفلاً تكريمياً للموظفين المتقاعدين تقديراً لجهودهم وتفانيهم في خدمة الجامعة ومسيرتها الأكاديمية.';
  if (/deniz bilimleri/i.test(tLower)) return 'تواصل الجامعة تعزيز قدراتها البحثية والتطبيقية وتطوير التدريب العملي لطلاب كلية علوم وتكنولوجيا البحار.';
  if (/konservatuvar/i.test(tLower)) return 'زار وفد من رئاسة الجامعة المعهد الموسيقي الوطني لمتابعة التجهيزات والالتقاء بالكادر الأكاديمي والطلبة.';
  if (/taziye/i.test(tLower)) return 'نعت رئاسة الجامعة الفقيدة داعية لها بالرحمة والمغفرة ولأسرتها الكريمة بالصبر والسلوان.';
  if (/laboratuvar/i.test(tLower)) return 'طرحت الجامعة مناقصة رسمية لتزويد المختبرات العلمية بالمعدات والمواد اللازمة للعام الدراسي الجديد.';
  if (/genel kurul/i.test(tLower)) return 'عقدت مدرسة اللغات اجتماعاً تنسيقياً لبحث خطط تدريس اللغات والامتحانات التحضيرية للعام الأكاديمي الجديد.';
  if (/iran/i.test(tLower)) return 'بناءً على قرارات مجلس التعليم العالي التركي (YÖK)، تم تحديد مواعيد وشروط استكمال الدراسة كطالب خاص أو التحويل لكليات الجامعة.';
  if (/değişim programları|erasmus|mevlana|farabi/i.test(tLower)) return 'أعلنت مدرسة اللغات الأجنبية عن مواعيد التسجيل لامتحان تحديد مستوى وإعفاء اللغة لبرامج التبادل الدولي عبر البوابة الإلكترونية.';
  if (/ortak zorunlu ingilizce|ingilizce i ve ii/i.test(tLower)) return 'أعلنت مدرسة اللغات عن مواعيد وأماكن انعقاد امتحان الإعفاء من مقرري اللغة الإنجليزية الإلزاميين للطلاب الجدد.';
  if (/dgs yerleştirme/i.test(tLower)) return 'أعلنت رئاسة شؤون الطلاب عن الجدول الزمني والأوراق المطلوبة لتثبيت قيد الطلاب المقبولين من المعاهد الفنية لدرجة البكالوريوس عبر بوابة e-Devlet أو بالحضور المباشر.';
  if (/yatay geçiş/i.test(tLower)) return 'أعلنت الجامعة عن نتائج وتقويم تثبيت القيد للطلبة المقبولين في برامج البكالوريوس والدبلوم عبر الانتقال.';
  if (/af başvuru/i.test(tLower)) return 'يمكن للطلبة الراغبين بالاستفادة من قانون العفو الطلابي مراجعة عمادة الكلية أو إدارة شؤون الطلاب لتقديم الوثائق المطلوبة.';
  if (/ders kayıt/i.test(tLower)) return 'تذكير للطلاب بضرورة إتمام تثبيت المقررات الدراسية عبر بوابة أتمتة الطلاب (OBS) ومصادقة المرشد الأكاديمي في المواعيد المحددة.';
  if (/muafiyet|intibak/i.test(tLower)) return 'إجراءات تقديم طلبات احتساب المواد السابقة والشهادات المعتمدة لدى رئاسة شؤون الطلاب عبر نظام الـ OBS.';
  if (/tek ders sınav/i.test(tLower)) return 'أعلنت الكليات عن موعد وشروط التقدم لامتحان المادة الواحدة للطلاب المتبقي عليهم مادة وحيدة لإنهاء متطلبات التخرج.';
  return rawContent ? rawContent.substring(0, 250) : 'للمزيد من التفاصيل والتعليمات الرسمية، يرجى زيارة رابط الإعلان المباشر على موقع الجامعة iste.edu.tr.';
}

/**
 * Fast & fluent translation using Gemini 3.8 Flash
 */
async function translateWithGemini(
  rawItems: Array<{ id: string; link: string; titleTr: string; contentTr: string; date: string; categoryTr: string }>
): Promise<UniversityNewsItem[] | null> {
  const ai = getGemini();
  if (!ai) return null;

  const trimmedItems = rawItems.slice(0, 10).map(item => ({
    id: item.id,
    titleTr: item.titleTr.substring(0, 200),
    contentSnippetTr: item.contentTr.substring(0, 300),
    categoryTr: item.categoryTr
  }));

  const prompt = `Translate these Iskenderun Technical University (İSTE) announcements and news items into formal Arabic for Palestinian and Arab university students in Turkey.
Provide an engaging Arabic title, an accurate Arabic summary, and the translated category.
Return ONLY a valid JSON array matching this exact schema:
[
  {
    "id": "matching item id",
    "titleAr": "Clear, professional Arabic title",
    "contentAr": "Informative Arabic summary explaining dates, procedures, or highlights",
    "categoryAr": "Arabic category (e.g. شؤون الطلاب, اللغات والامتحانات, دراسات عليا, أخبار الجامعة, إعلانات عامة)",
    "isRelevantToForeigners": true/false
  }
]

Announcements to translate:
${JSON.stringify(trimmedItems, null, 2)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const responseText = response.text?.trim() || '';
    let parsed: any[] = [];
    try {
      parsed = JSON.parse(responseText);
    } catch {
      const match = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (match) parsed = JSON.parse(match[0]);
    }

    if (Array.isArray(parsed) && parsed.length > 0) {
      return rawItems.map((raw) => {
        const tr = parsed.find(p => p.id === raw.id) || {};
        const titleAr = (tr.titleAr && tr.titleAr.trim() !== raw.titleTr.trim())
          ? tr.titleAr
          : getRuleTitle(raw.titleTr);
        const rawContentAr = (tr.contentAr && tr.contentAr.trim() !== raw.contentTr.trim())
          ? tr.contentAr
          : getRuleContent(raw.titleTr, raw.contentTr);

        return {
          id: raw.id,
          titleTr: raw.titleTr,
          titleAr: stripUrls(titleAr),
          contentTr: stripUrls(raw.contentTr),
          contentAr: stripUrls(rawContentAr),
          date: raw.date,
          categoryTr: raw.categoryTr,
          categoryAr: tr.categoryAr || mapCategoryToAr(raw.categoryTr),
          link: '',
          isRelevantToForeigners: typeof tr.isRelevantToForeigners === 'boolean'
            ? tr.isRelevantToForeigners
            : checkForeignRelevance(raw.titleTr, raw.contentTr, raw.categoryTr)
        };
      });
    }
  } catch (err) {
    console.warn('Gemini translation failed, will try Groq fallback:', err);
  }

  return null;
}

/**
 * Fallback translation using Groq AI
 */
async function translateWithGroq(
  rawItems: Array<{ id: string; link: string; titleTr: string; contentTr: string; date: string; categoryTr: string }>
): Promise<UniversityNewsItem[] | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const trimmedItems = rawItems.slice(0, 10).map(item => ({
    id: item.id,
    titleTr: item.titleTr.substring(0, 150),
    contentSnippetTr: item.contentTr.substring(0, 250),
    categoryTr: item.categoryTr
  }));

  const prompt = `Translate these university announcements from Iskenderun Technical University to Arabic for university students.
Return a valid JSON array only:
[
  {
    "id": "id",
    "titleAr": "Arabic title",
    "contentAr": "Arabic summary",
    "categoryAr": "Arabic category",
    "isRelevantToForeigners": true
  }
]
${JSON.stringify(trimmedItems, null, 2)}`;

  try {
    const text = await callGroqChat([
      { role: 'system', content: 'You are an academic translation assistant. Output ONLY valid JSON array.' },
      { role: 'user', content: prompt }
    ]);

    const match = text.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (match) {
      const items = JSON.parse(match[0]);
      if (Array.isArray(items) && items.length > 0) {
        return rawItems.map((raw) => {
          const tr = items.find((it: any) => it.id === raw.id) || {};
          const titleAr = (tr.titleAr && tr.titleAr.trim() !== raw.titleTr.trim())
            ? tr.titleAr
            : getRuleTitle(raw.titleTr);
          const rawContentAr = (tr.contentAr && tr.contentAr.trim() !== raw.contentTr.trim())
            ? tr.contentAr
            : getRuleContent(raw.titleTr, raw.contentTr);

          return {
            id: raw.id,
            titleTr: raw.titleTr,
            titleAr: stripUrls(titleAr),
            contentTr: stripUrls(raw.contentTr),
            contentAr: stripUrls(rawContentAr),
            date: raw.date,
            categoryTr: raw.categoryTr,
            categoryAr: tr.categoryAr || mapCategoryToAr(raw.categoryTr),
            link: '',
            isRelevantToForeigners: typeof tr.isRelevantToForeigners === 'boolean'
              ? tr.isRelevantToForeigners
              : checkForeignRelevance(raw.titleTr, raw.contentTr, raw.categoryTr)
          };
        });
      }
    }
  } catch (err) {
    console.warn('Groq translation failed:', err);
  }

  return null;
}

/**
 * Intelligent dictionary fallback for category names
 */
function mapCategoryToAr(catTr: string): string {
  switch (catTr) {
    case 'Öğrenci İşleri': return 'شؤون الطلاب';
    case 'Yabancı Diller': return 'اللغات والامتحانات';
    case 'Lisansüstü': return 'دراسات عليا';
    case 'Haber': return 'أخبار الجامعة';
    case 'Genel Duyuru': return 'إعلانات عامة';
    default: return 'إعلانات رسمية';
  }
}

/**
 * Quick smart translation fallback when AI is unavailable
 */
function applySmartRuleTranslation(
  rawItems: Array<{ id: string; link: string; titleTr: string; contentTr: string; date: string; categoryTr: string }>
): UniversityNewsItem[] {
  return rawItems.map(item => {
    let titleAr = item.titleTr;
    let contentAr = item.contentTr;

    // Comprehensive phrases replacement for readable, fluent Arabic preview
    const tLower = item.titleTr.toLowerCase();

    if (/halıflex|haliflex/i.test(tLower)) {
      titleAr = 'إعلان مناقصة لتوريد وتركيب سجاد للمكاتب والمرافق الجامعية (Halıfleks)';
      contentAr = 'أعلنت رئاسة الدائرة الإدارية والمالية بجامعة إسكندرون التقنية عن طرح مناقصة لتوريد سجاد ومستلزمات أرضيات لصالح وحدات الجامعة.';
    } else if (/atlas enerji/i.test(tLower)) {
      titleAr = 'رئيس جامعة إسكندرون التقنية يزور شركة أطلس للطاقة لبحث سبل التعاون والتدريب الطلابي';
      contentAr = 'أجرى رئيس الجامعة زيارة رسمية لمنشآت الطاقة لبحث تعزيز التعاون المشترك وتوفير فرص تدريب عملي لطلاب الهندسة.';
    } else if (/emeğe vefa/i.test(tLower)) {
      titleAr = 'حفل تكريم ووفاء للموظفين المحالين للتقاعد في جامعة إسكندرون التقنية';
      contentAr = 'أقامت الجامعة حفلاً تكريمياً للموظفين تقديراً لجهودهم وتفانيهم في خدمة الجامعة ومسيرتها الأكاديمية.';
    } else if (/deniz bilimleri/i.test(tLower)) {
      titleAr = 'تطوير ودعم أبحاث وتطبيقات علوم البحار والاستزراع المائي في جامعة İSTE';
      contentAr = 'تواصل الجامعة تعزيز قدراتها البحثية والتطبيقية وتطوير التدريب العملي لطلاب كلية علوم وتكنولوجيا البحار.';
    } else if (/konservatuvar/i.test(tLower) && /ziyaret/i.test(tLower)) {
      titleAr = 'إدارة الجامعة تزور معهد مصطفى يازيجي الموسيقي الوطني بمناسبة العام الدراسي الجديد';
      contentAr = 'زار وفد من رئاسة الجامعة المعهد الموسيقي الوطني لمتابعة التجهيزات والالتقاء بالكادر الأكاديمي والطلبة.';
    } else if (/taziye/i.test(tLower)) {
      titleAr = 'برقية تعزية ومواساة من رئاسة جامعة إسكندرون التقنية';
      contentAr = 'نعت رئاسة الجامعة الفقيدة داعية لها بالرحمة والمغفرة ولأسرتها الكريمة بالصبر والسلوان.';
    } else if (/laboratuvar/i.test(tLower) && /alım/i.test(tLower)) {
      titleAr = 'إعلان مناقصة لتوريد مستلزمات وتجهيزات مخبرية لكليات الجامعة';
      contentAr = 'طرحت الجامعة مناقصة رسمية لتزويد المختبرات العلمية بالمعدات والمواد اللازمة للعام الدراسي الجديد.';
    } else if (/genel kurul/i.test(tLower)) {
      titleAr = 'انعقاد اجتماع الهيئة العامة لمدرسة اللغات الأجنبية للعام الدراسي 2026-2027';
      contentAr = 'عقدت مدرسة اللغات اجتماعاً تنسيقياً لبحث خطط تدريس اللغات والامتحانات التحضيرية للعام الأكاديمي الجديد.';
    } else if (/iran/i.test(tLower) && /yatay geçiş/i.test(tLower)) {
      titleAr = 'إجراءات الانتقال الأفقي والالتحاق كطالب خاص للطلاب الأتراك الدارسين في إيران';
      contentAr = 'بناءً على قرارات مجلس التعليم العالي التركي (YÖK)، تم تحديد مواعيد وشروط استكمال الدراسة كطالب خاص أو التحويل لكليات الجامعة.';
    } else if (/değişim programları|erasmus|mevlana|farabi/i.test(tLower)) {
      titleAr = 'امتحان اللغة الأجنبية لبرامج التبادل الطلابي (إيراسموس، مولانا، فارابي) 2026-2';
      contentAr = 'إعلان رسمي من مدرسة اللغات الأجنبية بجامعة İSTE بخصوص مواعيد وإجراءات التسجيل لامتحان اللغة لبرامج التبادل الدولي.';
    } else if (/ortak zorunlu ingilizce|ingilizce i ve ii/i.test(tLower)) {
      titleAr = 'إعلان امتحان الإعفاء لمادتي اللغة الإنجليزية المشتركة (İngilizce I و II)';
      contentAr = 'أعلنت مدرسة اللغات عن مواعيد وأماكن انعقاد امتحان الإعفاء من مقرري اللغة الإنجليزية الإلزاميين للطلاب المستجدين.';
    } else if (/dgs yerleştirme/i.test(tLower)) {
      titleAr = 'إجراءات تسجيل وتثبيت قيد الطلاب المقبولين في الجامعة عبر امتحان الانتقال الرأسي (DGS)';
      contentAr = 'أعلنت رئاسة شؤون الطلاب عن بدء استلام ملفات وتثبيت قيد الطلاب المقبولين عبر نظام الحكومة الإلكترونية أو الحضور الشخصي.';
    } else if (/yatay geçiş/i.test(tLower)) {
      titleAr = 'نتائج وإجراءات طلبات الانتقال الأفقي بين التخصصات والجامعات للعام الدراسي 2026-2027';
      contentAr = 'أعلنت الجامعة عن نتائج وتقويم تثبيت القيد للطلبة المقبولين في برامج البكالوريوس والدبلوم عبر الانتقال.';
    } else if (/af başvuru/i.test(tLower)) {
      titleAr = 'تنبيه هام بشأن التقديم على العفو الطلابي وإعادة القيد (المادة المؤقتة 85)';
      contentAr = 'يمكن للطلبة الراغبين بالاستفادة من قانون العفو الطلابي مراجعة عمادة الكلية أو إدارة شؤون الطلاب لتقديم الوثائق المطلوبة.';
    } else if (/ders kayıt/i.test(tLower)) {
      titleAr = 'إجراءات تثبيت المواد واختيار المقررات الدراسية للفصل الخريفي عبر بوابة OBS';
      contentAr = 'تذكير للطلاب بضرورة إتمام تثبيت المقررات الدراسية عبر بوابة أتمتة الطلاب (OBS) ومصادقة المرشد الأكاديمي في المواعيد المحددة.';
    } else if (/muafiyet|intibak/i.test(tLower)) {
      titleAr = 'إعلان طلبات معادلة وإعفاء المواد الدراسية للطلبة المستجدين في الجامعة';
      contentAr = 'إجراءات تقديم طلبات احتساب المواد السابقة والشهادات المعتمدة لدى رئاسة شؤون الطلاب عبر نظام الـ OBS.';
    } else if (/tek ders sınav/i.test(tLower)) {
      titleAr = 'إعلان بخصوص امتحان المادة الواحدة للتخرج بعد المدرسة الصيفية';
      contentAr = 'أعلنت الكليات عن موعد وشروط التقدم لامتحان المادة الواحدة للطلاب المتبقي عليهم مادة وحيدة لإنهاء متطلبات التخرج.';
    } else if (/uluslararası öğrenci|yabancı öğrenci/i.test(tLower)) {
      titleAr = 'إعلان مفاضلة وقبول الطلاب الدوليين والأجانب لدرجتي الدبلوم والبكالوريوس';
      contentAr = 'أعلنت جامعة إسكندرون التقنية عن فتح باب التسجيل والمفاضلة للطلاب الدوليين وفق معايير TR-YÖS والشهادة الثانوية.';
    } else if (/türk sanatı.*kongre/i.test(tLower)) {
      titleAr = 'المؤتمر الدولي العشرون للفنون والتاريخ والتراث التركي في جامعة İSTE';
      contentAr = 'تستضيف الجامعة فعاليات المؤتمر الدولي بمشاركة نخبة من الأكاديميين والباحثين من مختلف الجامعات.';
    } else if (/teknofest/i.test(tLower)) {
      titleAr = 'إنجاز ومشاركة مميزة لفرق ومشاريع جامعة İSTE في مهرجان تكنوفست';
      contentAr = 'حققت فرق الجامعة التكنولوجية مراكز متقدمة في مسابقات تكنوفست بدعم من حاضنة الأعمال ومركز الابتكار الجامعي.';
    }

    return {
      id: item.id,
      titleTr: item.titleTr,
      titleAr: stripUrls(titleAr),
      contentTr: stripUrls(item.contentTr),
      contentAr: stripUrls(contentAr),
      date: item.date,
      categoryTr: item.categoryTr,
      categoryAr: mapCategoryToAr(item.categoryTr),
      link: '',
      isRelevantToForeigners: checkForeignRelevance(item.titleTr, item.contentTr, item.categoryTr)
    };
  });
}

/**
 * Main function to fetch live university news
 */
export async function getLiveUniversityNews(forceRefresh = false): Promise<{
  data: UniversityNewsItem[];
  source: string;
  lastUpdated: string;
}> {
  const isCacheValid = !forceRefresh && cachedNews.length > 0 && (Date.now() - lastCacheTime < CACHE_TTL_MS);

  if (isCacheValid) {
    return { data: cachedNews, source: 'cache', lastUpdated: lastCacheTimestampStr };
  }

  console.log(`[UniversityNews] Scraping live announcements from iste.edu.tr (forceRefresh=${forceRefresh})...`);

  try {
    const rawItems = await scrapeIsteRawAnnouncements();

    if (rawItems.length > 0) {
      let translated: UniversityNewsItem[] | null = null;
      let usedSource = 'live-gemini';

      // 1. Try Gemini first (super fast and fluent)
      try {
        translated = await translateWithGemini(rawItems);
      } catch (err) {
        console.warn('[UniversityNews] Gemini translation attempt failed:', err);
      }

      // 2. If Gemini didn't return, try Groq
      if (!translated || translated.length === 0) {
        try {
          translated = await translateWithGroq(rawItems);
          if (translated) usedSource = 'live-groq';
        } catch (err) {
          console.warn('[UniversityNews] Groq translation attempt failed:', err);
        }
      }

      // 3. If both AI models failed, apply smart rule-based translation
      if (!translated || translated.length === 0) {
        translated = applySmartRuleTranslation(rawItems);
        usedSource = 'live-scraped-rules';
      }

      if (translated && translated.length > 0) {
        // Prioritize items relevant to foreign students first, then newest date
        translated.sort((a, b) => {
          if (a.isRelevantToForeigners && !b.isRelevantToForeigners) return -1;
          if (!a.isRelevantToForeigners && b.isRelevantToForeigners) return 1;
          return b.date.localeCompare(a.date);
        });

        cachedNews = translated;
        lastCacheTime = Date.now();
        lastCacheTimestampStr = new Date().toISOString();

        // Persist to disk
        try {
          fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(translated, null, 2), 'utf8');
        } catch (e) {
          console.warn('[UniversityNews] Failed to save cached-iste-news.json:', e);
        }

        return { data: translated, source: usedSource, lastUpdated: lastCacheTimestampStr };
      }
    }
  } catch (error) {
    console.error('[UniversityNews] Failed to scrape and translate live news:', error);
  }

  // Fallback to in-memory/disk cache if available
  if (cachedNews.length > 0) {
    return { data: cachedNews, source: 'stale-cache', lastUpdated: lastCacheTimestampStr };
  }

  return { data: [], source: 'empty', lastUpdated: lastCacheTimestampStr };
}

// Background preload on boot
setTimeout(() => {
  getLiveUniversityNews(false)
    .then(res => {
      console.log(`[UniversityNews] Background preloader completed. Loaded ${res.data.length} items from ${res.source}.`);
    })
    .catch(err => {
      console.warn('[UniversityNews] Background preloader caught error:', err);
    });
}, 2000);

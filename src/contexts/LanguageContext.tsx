import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  const dir = language === 'en' ? 'ltr' : 'rtl';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

const getTranslations = (lang: Language): Record<string, string> => {
  const translations: Record<Language, Record<string, string>> = {
    en: {
      // Header
      'header.title': 'Quranic Insight',
      'header.howItWorks': 'How It Works',
      'header.features': 'Features',
      'header.explore': 'Explore',
      'header.library': 'Library',
      'header.signIn': 'Sign In',
      'header.getStarted': 'Get Started',
      
      // Hero Section
      'hero.title': 'Turn Quranic guidance into actionable wisdom',
      'hero.subtitle': 'Discover insights from the Quran that speak directly to your life journey. No fluff, just meaningful reflection and practical action.',
      'hero.cta': 'Begin Your Journey',
      'hero.explore': 'Explore Surahs',
      
      // How It Works
      'how.title': 'How It Works',
      'how.step1.title': 'Share Your Journey',
      'how.step1.desc': 'Quick quiz about your values, challenges, and goals',
      'how.step2.title': 'Explore Personalized Insights',
      'how.step2.desc': 'Receive Quranic wisdom tailored to your situation',
      'how.step3.title': 'Take Action',
      'how.step3.desc': 'Transform insights into concrete steps',
      'how.step4.title': 'Reflect & Grow',
      'how.step4.desc': 'Journal your progress and deepen understanding',
      
      // Features
      'features.title': 'Core Features',
      'features.personalized.title': 'Personalized Insights',
      'features.personalized.desc': 'Quranic wisdom contextualized to your life stage, challenges, and goals',
      'features.action.title': 'Action Plans',
      'features.action.desc': 'Convert spiritual insights into practical daily actions with measurable outcomes',
      'features.library.title': 'Your Library',
      'features.library.desc': 'Save, organize, and track insights that resonate with your journey',
      'features.reflection.title': 'Reflection Tools',
      'features.reflection.desc': 'Journal prompts and guided reflection to deepen your understanding',
      
      // Transparency
      'transparency.title': 'Built with Humility & Transparency',
      'transparency.desc': 'This platform uses AI to surface relevant Quranic passages, but wisdom comes from scholars and your own reflection. We never claim to replace authentic Islamic knowledge or guidance from qualified teachers.',
      'transparency.aiTitle': 'AI-Powered Discovery',
      'transparency.aiDesc': 'Technology helps surface relevant verses, but interpretation stays grounded in classical tafsir',
      'transparency.scholarTitle': 'Scholar-Backed',
      'transparency.scholarDesc': 'All interpretations reference established Islamic scholarship and traditional sources',
      'transparency.privacyTitle': 'Your Data is Private',
      'transparency.privacyDesc': 'Your reflections, notes, and journey remain completely private and secure',
      
      // CTA Section
      'cta.title': 'Ready to transform guidance into action?',
      'cta.subtitle': 'Begin your personalized journey through the Quran. No credit card required. Start reflecting today.',
      'cta.button': 'Get Started Free',
      'cta.demo': 'Watch Demo',
      'cta.footer': 'Join thousands seeking deeper connection with Quranic wisdom',
      
      // Footer
      'footer.tagline': 'Transforming Quranic wisdom into actionable guidance',
      'footer.about': 'About',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Service',
      'footer.contact': 'Contact',
      
      // Onboarding
      'onboarding.step': 'Step',
      'onboarding.of': 'of',
      'onboarding.complete': 'complete',
      'onboarding.back': 'Back',
      'onboarding.next': 'Next',
      'onboarding.finish': 'Complete',
      'onboarding.optional': 'Anything else you\'d like to share? (Optional)',
      'onboarding.placeholder': 'Share your thoughts...',
      
      // Onboarding Steps
      'onboarding.values.title': 'Your Core Values',
      'onboarding.values.desc': 'What matters most in your life right now?',
      'onboarding.lifeStage.title': 'Life Stage',
      'onboarding.lifeStage.desc': 'Where are you in your journey?',
      'onboarding.challenges.title': 'Current Challenges',
      'onboarding.challenges.desc': 'What are you navigating right now? (Select all that apply)',
      'onboarding.goals.title': 'Spiritual Goals',
      'onboarding.goals.desc': 'What do you hope to cultivate?',
      'onboarding.learning.title': 'Learning Preference',
      'onboarding.learning.desc': 'How do you best absorb wisdom?',
      
      // Explore
      'explore.title': 'Explore the Quran',
      'explore.subtitle': 'Select a Surah to discover personalized insights',
      'explore.search': 'Search Surahs...',
      'explore.insights': 'insights',
      
      // Library
      'library.title': 'Your Library',
      'library.subtitle': 'Manage your saved insights and action plans',
      'library.active': 'Active',
      'library.archived': 'Archived',
      'library.saved': 'Saved',
      'library.empty': 'No insights yet. Start exploring!',
      'library.notes': 'Your Notes',
      'library.notesPlaceholder': 'Add your thoughts and reflections...',
      'library.saveNotes': 'Save Notes',
      'library.viewPlan': 'View Action Plan',
      'library.archive': 'Archive',
      
      // Surah Detail
      'surah.overview': 'Overview',
      'surah.revelation': 'Revelation',
      'surah.verses': 'verses',
      'surah.readTime': 'min read',
      'surah.themes': 'Key Themes',
      'surah.insights': 'Personalized Insights',
      'surah.backToExplore': 'Back to Explore',
      
      // Insight Card
      'insight.foundation': 'Quranic Foundation',
      'insight.relevance': 'Personal Relevance',
      'insight.reflection': 'Reflection Prompt',
      'insight.addToLibrary': 'Add to My Library',
      'insight.inLibrary': 'In Library',
      
      // Action Plan Modal
      'action.title': 'Create Action Plan',
      'action.subtitle': 'Transform this insight into concrete steps',
      'action.what': 'What will you do?',
      'action.whatPlaceholder': 'e.g., Practice gratitude journaling every morning',
      'action.when': 'When?',
      'action.whenPlaceholder': 'e.g., Every morning after Fajr',
      'action.howOften': 'How often?',
      'action.howOftenPlaceholder': 'e.g., Daily for 30 days',
      'action.metrics': 'Success Metrics',
      'action.metricsPlaceholder': 'e.g., Complete 7 consecutive days without missing',
      'action.cancel': 'Cancel',
      'action.save': 'Save to Library',
      
      // Auth
      'auth.welcome': 'Welcome to Quranic Insight',
      'auth.signUpTitle': 'Create Your Account',
      'auth.signInTitle': 'Sign In',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.signUp': 'Sign Up',
      'auth.signIn': 'Sign In',
      'auth.haveAccount': 'Already have an account?',
      'auth.noAccount': 'Don\'t have an account?',
      'auth.switchToSignIn': 'Sign in',
      'auth.switchToSignUp': 'Sign up',
    },
    ar: {
      // Header
      'header.title': 'بصيرة قرآنية',
      'header.howItWorks': 'كيف يعمل',
      'header.features': 'المميزات',
      'header.explore': 'استكشف',
      'header.library': 'مكتبتي',
      'header.signIn': 'تسجيل الدخول',
      'header.getStarted': 'ابدأ الآن',
      
      // Hero Section
      'hero.title': 'حوّل الهداية القرآنية إلى حكمة عملية',
      'hero.subtitle': 'اكتشف رؤى من القرآن تتحدث مباشرة إلى رحلة حياتك. لا زوائد، فقط تأمل ذو معنى وعمل عملي.',
      'hero.cta': 'ابدأ رحلتك',
      'hero.explore': 'استكشف السور',
      
      // How It Works
      'how.title': 'كيف يعمل',
      'how.step1.title': 'شارك رحلتك',
      'how.step1.desc': 'اختبار سريع حول قيمك وتحدياتك وأهدافك',
      'how.step2.title': 'استكشف رؤى شخصية',
      'how.step2.desc': 'احصل على حكمة قرآنية مصممة لموقفك',
      'how.step3.title': 'اتخذ إجراءً',
      'how.step3.desc': 'حوّل الرؤى إلى خطوات ملموسة',
      'how.step4.title': 'تأمل وانمُ',
      'how.step4.desc': 'دوّن تقدمك وعمّق فهمك',
      
      // Features
      'features.title': 'المميزات الأساسية',
      'features.personalized.title': 'رؤى شخصية',
      'features.personalized.desc': 'حكمة قرآنية في سياق مرحلة حياتك وتحدياتك وأهدافك',
      'features.action.title': 'خطط العمل',
      'features.action.desc': 'حوّل الرؤى الروحية إلى أفعال يومية عملية بنتائج قابلة للقياس',
      'features.library.title': 'مكتبتك',
      'features.library.desc': 'احفظ ونظم وتتبع الرؤى التي تتناغم مع رحلتك',
      'features.reflection.title': 'أدوات التأمل',
      'features.reflection.desc': 'مطالبات المجلة والتأمل الموجه لتعميق فهمك',
      
      // Transparency
      'transparency.title': 'مبني بتواضع وشفافية',
      'transparency.desc': 'تستخدم هذه المنصة الذكاء الاصطناعي لإبراز المقاطع القرآنية ذات الصلة، لكن الحكمة تأتي من العلماء وتأملك الخاص. لا ندعي أبداً أننا نستبدل المعرفة الإسلامية الأصيلة أو التوجيه من المعلمين المؤهلين.',
      'transparency.aiTitle': 'اكتشاف مدعوم بالذكاء الاصطناعي',
      'transparency.aiDesc': 'التكنولوجيا تساعد على إبراز الآيات ذات الصلة، لكن التفسير يظل مبنياً على التفسير الكلاسيكي',
      'transparency.scholarTitle': 'مدعوم من العلماء',
      'transparency.scholarDesc': 'جميع التفسيرات تشير إلى المنح الإسلامية الراسخة والمصادر التقليدية',
      'transparency.privacyTitle': 'بياناتك خاصة',
      'transparency.privacyDesc': 'تظل تأملاتك وملاحظاتك ورحلتك خاصة وآمنة تماماً',
      
      // CTA Section
      'cta.title': 'هل أنت مستعد لتحويل الهداية إلى عمل؟',
      'cta.subtitle': 'ابدأ رحلتك الشخصية عبر القرآن. لا حاجة لبطاقة ائتمان. ابدأ التأمل اليوم.',
      'cta.button': 'ابدأ مجاناً',
      'cta.demo': 'شاهد العرض التوضيحي',
      'cta.footer': 'انضم إلى الآلاف الذين يسعون إلى اتصال أعمق بالحكمة القرآنية',
      
      // Footer
      'footer.tagline': 'تحويل الحكمة القرآنية إلى إرشادات عملية',
      'footer.about': 'عن',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.terms': 'شروط الخدمة',
      'footer.contact': 'اتصل',
      
      // Onboarding
      'onboarding.step': 'خطوة',
      'onboarding.of': 'من',
      'onboarding.complete': 'مكتمل',
      'onboarding.back': 'رجوع',
      'onboarding.next': 'التالي',
      'onboarding.finish': 'إنهاء',
      'onboarding.optional': 'أي شيء آخر تود مشاركته؟ (اختياري)',
      'onboarding.placeholder': 'شارك أفكارك...',
      
      // Explore
      'explore.title': 'استكشف القرآن',
      'explore.subtitle': 'اختر سورة لاكتشاف رؤى شخصية',
      'explore.search': 'ابحث عن السور...',
      'explore.insights': 'رؤى',
      
      // Library
      'library.title': 'مكتبتك',
      'library.subtitle': 'إدارة رؤيتك المحفوظة وخطط العمل',
      'library.active': 'نشط',
      'library.archived': 'مؤرشف',
      'library.saved': 'محفوظ',
      'library.empty': 'لا توجد رؤى بعد. ابدأ الاستكشاف!',
      'library.notes': 'ملاحظاتك',
      'library.notesPlaceholder': 'أضف أفكارك وتأملاتك...',
      'library.saveNotes': 'حفظ الملاحظات',
      'library.viewPlan': 'عرض خطة العمل',
      'library.archive': 'أرشفة',
      
      // Surah Detail
      'surah.overview': 'نظرة عامة',
      'surah.revelation': 'النزول',
      'surah.verses': 'آيات',
      'surah.readTime': 'دقيقة قراءة',
      'surah.themes': 'المواضيع الرئيسية',
      'surah.insights': 'رؤى شخصية',
      'surah.backToExplore': 'العودة إلى الاستكشاف',
      
      // Insight Card
      'insight.foundation': 'الأساس القرآني',
      'insight.relevance': 'الصلة الشخصية',
      'insight.reflection': 'مطالبة التأمل',
      'insight.addToLibrary': 'إضافة إلى مكتبتي',
      'insight.inLibrary': 'في المكتبة',
      
      // Action Plan Modal
      'action.title': 'إنشاء خطة عمل',
      'action.subtitle': 'حوّل هذه الرؤية إلى خطوات ملموسة',
      'action.what': 'ماذا ستفعل؟',
      'action.whatPlaceholder': 'مثال: ممارسة تدوين الامتنان كل صباح',
      'action.when': 'متى؟',
      'action.whenPlaceholder': 'مثال: كل صباح بعد الفجر',
      'action.howOften': 'كم مرة؟',
      'action.howOftenPlaceholder': 'مثال: يومياً لمدة 30 يوماً',
      'action.metrics': 'مقاييس النجاح',
      'action.metricsPlaceholder': 'مثال: إكمال 7 أيام متتالية دون تفويت',
      'action.cancel': 'إلغاء',
      'action.save': 'حفظ في المكتبة',
      
      // Auth
      'auth.welcome': 'مرحباً بك في بصيرة قرآنية',
      'auth.signUpTitle': 'إنشاء حسابك',
      'auth.signInTitle': 'تسجيل الدخول',
      'auth.email': 'البريد الإلكتروني',
      'auth.password': 'كلمة المرور',
      'auth.signUp': 'إنشاء حساب',
      'auth.signIn': 'تسجيل الدخول',
      'auth.haveAccount': 'هل لديك حساب بالفعل؟',
      'auth.noAccount': 'ليس لديك حساب؟',
      'auth.switchToSignIn': 'تسجيل الدخول',
      'auth.switchToSignUp': 'إنشاء حساب',
    },
    ur: {
      // Header
      'header.title': 'قرآنی بصیرت',
      'header.howItWorks': 'یہ کیسے کام کرتا ہے',
      'header.features': 'خصوصیات',
      'header.explore': 'دریافت کریں',
      'header.library': 'میری لائبریری',
      'header.signIn': 'سائن ان',
      'header.getStarted': 'شروع کریں',
      
      // Hero Section
      'hero.title': 'قرآنی رہنمائی کو قابل عمل حکمت میں تبدیل کریں',
      'hero.subtitle': 'قرآن سے ایسی بصیرتیں دریافت کریں جو آپ کی زندگی کے سفر سے براہ راست بات کرتی ہیں۔ کوئی فضول بات نہیں، صرف معنی خیز غور و فکر اور عملی اقدام۔',
      'hero.cta': 'اپنا سفر شروع کریں',
      'hero.explore': 'سورتیں دریافت کریں',
      
      // How It Works
      'how.title': 'یہ کیسے کام کرتا ہے',
      'how.step1.title': 'اپنا سفر شیئر کریں',
      'how.step1.desc': 'اپنی اقدار، چیلنجز اور اہداف کے بارے میں فوری کوئز',
      'how.step2.title': 'ذاتی بصیرتیں دریافت کریں',
      'how.step2.desc': 'اپنی صورتحال کے مطابق قرآنی حکمت حاصل کریں',
      'how.step3.title': 'عمل کریں',
      'how.step3.desc': 'بصیرتوں کو ٹھوس اقدامات میں تبدیل کریں',
      'how.step4.title': 'غور کریں اور بڑھیں',
      'how.step4.desc': 'اپنی پیش رفت کو نوٹ کریں اور سمجھ کو گہرا کریں',
      
      // Features
      'features.title': 'بنیادی خصوصیات',
      'features.personalized.title': 'ذاتی بصیرتیں',
      'features.personalized.desc': 'آپ کی زندگی کے مرحلے، چیلنجز اور اہداف کے تناظر میں قرآنی حکمت',
      'features.action.title': 'ایکشن پلانز',
      'features.action.desc': 'روحانی بصیرتوں کو قابل پیمائش نتائج کے ساتھ عملی روزانہ کے اعمال میں تبدیل کریں',
      'features.library.title': 'آپ کی لائبریری',
      'features.library.desc': 'اپنے سفر سے گونجنے والی بصیرتوں کو محفوظ، منظم اور ٹریک کریں',
      'features.reflection.title': 'غور و فکر کے اوزار',
      'features.reflection.desc': 'اپنی سمجھ کو گہرا کرنے کے لیے جرنل پرامپٹس اور رہنمائی شدہ غور و فکر',
      
      // Transparency
      'transparency.title': 'عاجزی اور شفافیت کے ساتھ بنایا گیا',
      'transparency.desc': 'یہ پلیٹ فارم متعلقہ قرآنی اقتباسات کو ابھارنے کے لیے AI استعمال کرتا ہے، لیکن حکمت علماء اور آپ کے اپنے غور و فکر سے آتی ہے۔ ہم کبھی یہ دعویٰ نہیں کرتے کہ ہم مستند اسلامی علم یا اہل اساتذہ کی رہنمائی کی جگہ لیں۔',
      'transparency.aiTitle': 'AI سے چلنے والی دریافت',
      'transparency.aiDesc': 'ٹیکنالوجی متعلقہ آیات کو ابھارنے میں مدد کرتی ہے، لیکن تشریح کلاسیکی تفسیر پر مبنی رہتی ہے',
      'transparency.scholarTitle': 'علماء کی حمایت یافتہ',
      'transparency.scholarDesc': 'تمام تشریحات قائم شدہ اسلامی اسکالرشپ اور روایتی ذرائع کا حوالہ دیتی ہیں',
      'transparency.privacyTitle': 'آپ کا ڈیٹا نجی ہے',
      'transparency.privacyDesc': 'آپ کے غور و فکر، نوٹس اور سفر مکمل طور پر نجی اور محفوظ رہتے ہیں',
      
      // CTA Section
      'cta.title': 'رہنمائی کو عمل میں تبدیل کرنے کے لیے تیار ہیں؟',
      'cta.subtitle': 'قرآن کے ذریعے اپنا ذاتی سفر شروع کریں۔ کریڈٹ کارڈ کی ضرورت نہیں۔ آج ہی غور و فکر شروع کریں۔',
      'cta.button': 'مفت شروع کریں',
      'cta.demo': 'ڈیمو دیکھیں',
      'cta.footer': 'قرآنی حکمت کے ساتھ گہرا تعلق تلاش کرنے والے ہزاروں لوگوں میں شامل ہوں',
      
      // Footer
      'footer.tagline': 'قرآنی حکمت کو قابل عمل رہنمائی میں تبدیل کرنا',
      'footer.about': 'کے بارے میں',
      'footer.privacy': 'رازداری کی پالیسی',
      'footer.terms': 'سروس کی شرائط',
      'footer.contact': 'رابطہ',
      
      // Onboarding
      'onboarding.step': 'قدم',
      'onboarding.of': 'میں سے',
      'onboarding.complete': 'مکمل',
      'onboarding.back': 'واپس',
      'onboarding.next': 'اگلا',
      'onboarding.finish': 'مکمل کریں',
      'onboarding.optional': 'کچھ اور جو آپ شیئر کرنا چاہتے ہیں؟ (اختیاری)',
      'onboarding.placeholder': 'اپنے خیالات شیئر کریں...',
      
      // Explore
      'explore.title': 'قرآن دریافت کریں',
      'explore.subtitle': 'ذاتی بصیرتیں دریافت کرنے کے لیے ایک سورت منتخب کریں',
      'explore.search': 'سورتیں تلاش کریں...',
      'explore.insights': 'بصیرتیں',
      
      // Library
      'library.title': 'آپ کی لائبریری',
      'library.subtitle': 'اپنی محفوظ کردہ بصیرتوں اور ایکشن پلانز کا نظم کریں',
      'library.active': 'فعال',
      'library.archived': 'محفوظ شدہ',
      'library.saved': 'محفوظ',
      'library.empty': 'ابھی تک کوئی بصیرت نہیں۔ دریافت کرنا شروع کریں!',
      'library.notes': 'آپ کے نوٹس',
      'library.notesPlaceholder': 'اپنے خیالات اور غور و فکر شامل کریں...',
      'library.saveNotes': 'نوٹس محفوظ کریں',
      'library.viewPlan': 'ایکشن پلان دیکھیں',
      'library.archive': 'محفوظ کریں',
      
      // Surah Detail
      'surah.overview': 'جائزہ',
      'surah.revelation': 'نزول',
      'surah.verses': 'آیات',
      'surah.readTime': 'منٹ پڑھنا',
      'surah.themes': 'کلیدی موضوعات',
      'surah.insights': 'ذاتی بصیرتیں',
      'surah.backToExplore': 'دریافت پر واپس جائیں',
      
      // Insight Card
      'insight.foundation': 'قرآنی بنیاد',
      'insight.relevance': 'ذاتی متعلقہ',
      'insight.reflection': 'غور و فکر کا اشارہ',
      'insight.addToLibrary': 'میری لائبریری میں شامل کریں',
      'insight.inLibrary': 'لائبریری میں',
      
      // Action Plan Modal
      'action.title': 'ایکشن پلان بنائیں',
      'action.subtitle': 'اس بصیرت کو ٹھوس اقدامات میں تبدیل کریں',
      'action.what': 'آپ کیا کریں گے؟',
      'action.whatPlaceholder': 'مثال: ہر صبح شکر گزاری کی جرنلنگ کی مشق کریں',
      'action.when': 'کب؟',
      'action.whenPlaceholder': 'مثال: فجر کے بعد ہر صبح',
      'action.howOften': 'کتنی بار؟',
      'action.howOftenPlaceholder': 'مثال: 30 دنوں کے لیے روزانہ',
      'action.metrics': 'کامیابی کے پیمانے',
      'action.metricsPlaceholder': 'مثال: مسلسل 7 دن بغیر چھوڑے مکمل کریں',
      'action.cancel': 'منسوخ',
      'action.save': 'لائبریری میں محفوظ کریں',
      
      // Auth
      'auth.welcome': 'قرآنی بصیرت میں خوش آمدید',
      'auth.signUpTitle': 'اپنا اکاؤنٹ بنائیں',
      'auth.signInTitle': 'سائن ان کریں',
      'auth.email': 'ای میل',
      'auth.password': 'پاس ورڈ',
      'auth.signUp': 'سائن اپ',
      'auth.signIn': 'سائن ان',
      'auth.haveAccount': 'پہلے سے اکاؤنٹ ہے؟',
      'auth.noAccount': 'اکاؤنٹ نہیں ہے؟',
      'auth.switchToSignIn': 'سائن ان کریں',
      'auth.switchToSignUp': 'سائن اپ کریں',
    },
  };
  
  return translations[lang];
};

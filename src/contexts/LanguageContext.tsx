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

      // Explore
      'explore.title': 'Explore Surahs',
      'explore.subtitle': 'Discover personalized insights from all 114 Surahs',
      'explore.search': 'Search by name, number, or theme...',
      'explore.verses': 'verses',
      'explore.insights': 'personalized insights',
      'explore.exploreBtn': 'Explore →',

      // Library
      'library.title': 'Your Wisdom Library',
      'library.subtitle': 'Track your active practices, archive completed ones, and save inspiration',
      'library.active': 'Active',
      'library.archived': 'Archived',
      'library.saved': 'Saved',
      'library.noItems': 'No items yet. Start exploring Surahs to add insights!',
      'library.added': 'Added',
      'library.actionPlan': 'Action Plan',
      'library.what': 'What:',
      'library.when': 'When:',
      'library.frequency': 'Frequency:',
      'library.success': 'Success looks like:',
      'library.reflections': 'Your Reflections',
      'library.edit': 'Edit',
      'library.save': 'Save',
      'library.cancel': 'Cancel',
      'library.noReflections': 'No reflections yet. Click Edit to add your thoughts.',
      'library.notesPlaceholder': 'How is this practice going? What have you noticed?',

      // Surah Detail
      'surah.backToExplore': 'Back to Explore',
      'surah.number': 'Surah',
      'surah.verses': 'verses',
      'surah.read': 'read',
      'surah.personalizedInsights': 'personalized insights',
      'surah.keyThemes': 'Key Themes',
      'surah.revelationContext': 'Revelation Context',
      'surah.tailoredTitle': 'Insights Tailored For You',
      'surah.whyMatters': 'Why This Matters to You',
      'surah.reflectionPrompt': 'Reflection Prompt',
      'surah.addToLibrary': 'Add to My Library',
      'surah.actionTitle': 'Design Your Action Plan',
      'surah.actionDesc': 'Transform this insight into a concrete, measurable practice',
      'surah.whatLabel': 'What will you do?',
      'surah.whatPlaceholder': 'E.g., When I feel anxious, I will pause and make dua before taking action...',
      'surah.whenLabel': 'When?',
      'surah.whenPlaceholder': 'E.g., Morning, after Fajr...',
      'surah.frequencyLabel': 'How often?',
      'surah.frequencyPlaceholder': 'E.g., Daily, weekly...',
      'surah.metricsLabel': 'How will you know it\'s working?',
      'surah.metricsPlaceholder': 'E.g., I feel calmer, my relationships improve, I sleep better...',
      'surah.saveLibrary': 'Save to Library',

      // How It Works
      'how.title': 'How It Works',
      'how.subtitle': 'A calm, deliberate process from insight to implementation',
      'how.step1Title': 'Share Your Context',
      'how.step1Desc': 'Tell us about your values, life stage, challenges, and spiritual goals through a thoughtful quiz.',
      'how.step2Title': 'Receive Insights',
      'how.step2Desc': 'Get personalized Quranic wisdom with ayah references, translations, and context tailored to your life.',
      'how.step3Title': 'Design Your Action',
      'how.step3Desc': 'Transform insights into concrete action plans with what, when, how, and success metrics you define.',
      'how.step4Title': 'Reflect & Grow',
      'how.step4Desc': 'Journal your experiences, track reflections, and let the wisdom deepen over time.',

      // Features
      'features.title': 'Core Features',
      'features.subtitle': 'Everything you need to transform Quranic wisdom into lived practice',
      'features.surahTitle': 'Surah Exploration',
      'features.surahDesc': 'Browse all 114 Surahs with Makki/Madani context, themes, and revelation background. See estimated reading time and personalized insight counts.',
      'features.insightTitle': 'Personalized Insights',
      'features.insightDesc': 'AI-powered analysis connects Quranic verses to your life context. Each insight includes ayah reference, Arabic text, translation, and relevance.',
      'features.libraryTitle': 'Your Wisdom Library',
      'features.libraryDesc': 'Organize insights into Active, Archived, and Saved. Add notes, life area tags, and implementation designs. Your spiritual growth, tracked.',
      'features.reflectionTitle': 'Reflection Prompts',
      'features.reflectionDesc': 'Daily and weekly prompts help you pause, contemplate, and journal. Rich-text editor for deep reflection on how insights manifest.',
      'features.reminderTitle': 'Smart Reminders',
      'features.reminderDesc': 'Calendar integration and notification hooks (WhatsApp, Telegram) keep insights active. Focus Mode for distraction-free contemplation.',
      'features.searchTitle': 'Discovery & Search',
      'features.searchDesc': 'Find wisdom by theme, life situation, Surah, or ayah. Filter by active/archived status. Surface the guidance you need, when you need it.',

      // Transparency
      'transparency.title': 'Trust & Transparency',
      'transparency.subtitle': 'Built with honesty and reverence for the sacred text',
      'transparency.scholarTitle': 'Scholar-Backed AI',
      'transparency.scholarDesc': 'Our AI is trained on verified Quranic translations and classical tafsir. Every insight references authentic sources.',
      'transparency.metricsTitle': 'No Performative Metrics',
      'transparency.metricsDesc': 'No likes, no streaks, no public leaderboards. Your spiritual journey is between you and Allah.',
      'transparency.processTitle': 'Transparent Process',
      'transparency.processDesc': 'See exactly how insights are generated—ayah references, context, and how they map to your profile.',
      'transparency.humilityTitle': 'Humility First',
      'transparency.humilityDesc': 'We don\'t claim perfection. This is a tool for reflection, not a replacement for scholars or community.',

      // Hero Section
      'hero.title': 'Turn Quranic guidance into actionable wisdom, personalized for your life',
      'hero.subtitle': 'A calm, deliberate space to connect with the Quran—no fluff, no performative metrics. Just reflection, action, and growth.',
      'hero.cta': 'Begin Your Journey',
      'hero.explore': 'Explore Surahs',

      // CTA Section
      'cta.title': 'Ready to transform guidance into action?',
      'cta.subtitle': 'Begin your personalized journey through the Quran. No credit card required. Start reflecting today.',
      'cta.button': 'Get Started Free',

      // Footer
      'footer.tagline': 'Transforming Quranic wisdom into actionable guidance',

      // Onboarding
      'onboarding.step': 'Step',
      'onboarding.of': 'of',
      'onboarding.back': 'Back',
      'onboarding.next': 'Next',
      'onboarding.finish': 'Complete',
      'onboarding.step1Title': 'What values guide your life?',
      'onboarding.step1Subtitle': 'Select the principles that resonate most with you.',
      'onboarding.step2Title': 'Where are you in life right now?',
      'onboarding.step2Subtitle': 'This helps us understand your context.',
      'onboarding.step3Title': 'What challenges are you navigating?',
      'onboarding.step3Subtitle': 'We all face trials. What are yours?',
      'onboarding.step4Title': 'What are your spiritual goals?',
      'onboarding.step4Subtitle': 'What do you hope to cultivate?',
      'onboarding.step5Title': 'How do you learn best?',
      'onboarding.step5Subtitle': 'Understanding your style helps us personalize insights.',

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

      // Explore
      'explore.title': 'استكشف السور',
      'explore.subtitle': 'اكتشف رؤى شخصية من جميع السور الـ 114',
      'explore.search': 'البحث بالاسم أو الرقم أو الموضوع...',
      'explore.verses': 'آيات',
      'explore.insights': 'رؤى شخصية',
      'explore.exploreBtn': 'استكشف ←',

      // Library
      'library.title': 'مكتبة حكمتك',
      'library.subtitle': 'تتبع ممارساتك النشطة، وأرشف المكتملة، واحفظ الإلهام',
      'library.active': 'نشط',
      'library.archived': 'مؤرشف',
      'library.saved': 'محفوظ',
      'library.noItems': 'لا توجد عناصر بعد. ابدأ باستكشاف السور لإضافة رؤى!',
      'library.added': 'أضيف في',
      'library.actionPlan': 'خطة العمل',
      'library.what': 'ماذا:',
      'library.when': 'متى:',
      'library.frequency': 'التكرار:',
      'library.success': 'النجاح يبدو كالتالي:',
      'library.reflections': 'تأملاتك',
      'library.edit': 'تعديل',
      'library.save': 'حفظ',
      'library.cancel': 'إلغاء',
      'library.noReflections': 'لا توجد تأملات بعد. انقر على تعديل لإضافة أفكارك.',
      'library.notesPlaceholder': 'كيف تسير هذه الممارسة؟ ماذا لاحظت؟',

      // Surah Detail
      'surah.backToExplore': 'العودة إلى الاستكشاف',
      'surah.number': 'سورة',
      'surah.verses': 'آيات',
      'surah.read': 'قراءة',
      'surah.personalizedInsights': 'رؤى شخصية',
      'surah.keyThemes': 'المواضيع الرئيسية',
      'surah.revelationContext': 'سياق النزول',
      'surah.tailoredTitle': 'رؤى مصممة لك',
      'surah.whyMatters': 'لماذا هذا مهم لك',
      'surah.reflectionPrompt': 'مطالبة التأمل',
      'surah.addToLibrary': 'أضف إلى مكتبتي',
      'surah.actionTitle': 'صمم خطة عملك',
      'surah.actionDesc': 'حول هذه الرؤية إلى ممارسة ملموسة وقابلة للقياس',
      'surah.whatLabel': 'ماذا ستفعل؟',
      'surah.whatPlaceholder': 'مثال: عندما أشعر بالقلق، سأتوقف وأدعو قبل اتخاذ أي إجراء...',
      'surah.whenLabel': 'متى؟',
      'surah.whenPlaceholder': 'مثال: الصباح، بعد الفجر...',
      'surah.frequencyLabel': 'كم مرة؟',
      'surah.frequencyPlaceholder': 'مثال: يوميًا، أسبوعيًا...',
      'surah.metricsLabel': 'كيف ستعرف أنه يعمل؟',
      'surah.metricsPlaceholder': 'مثال: أشعر بالهدوء، تتحسن علاقاتي، أنام بشكل أفضل...',
      'surah.saveLibrary': 'حفظ في المكتبة',

      // How It Works
      'how.title': 'كيف يعمل',
      'how.subtitle': 'عملية هادئة ومتأنية من الرؤية إلى التنفيذ',
      'how.step1Title': 'شارك سياقك',
      'how.step1Desc': 'أخبرنا عن قيمك ومرحلة حياتك وتحدياتك وأهدافك الروحية من خلال اختبار مدروس.',
      'how.step2Title': 'تلقَّ الرؤى',
      'how.step2Desc': 'احصل على حكمة قرآنية شخصية مع مراجع الآيات والترجمات والسياق المصمم لحياتك.',
      'how.step3Title': 'صمم عملك',
      'how.step3Desc': 'حول الرؤى إلى خطط عمل ملموسة مع ما ومتى وكيف ومقاييس النجاح التي تحددها.',
      'how.step4Title': 'تأمل وانمُ',
      'how.step4Desc': 'دوّن تجاربك، وتتبع تأملاتك، ودع الحكمة تتعمق مع مرور الوقت.',

      // Features
      'features.title': 'المميزات الأساسية',
      'features.subtitle': 'كل ما تحتاجه لتحويل الحكمة القرآنية إلى ممارسة معاشة',
      'features.surahTitle': 'استكشاف السور',
      'features.surahDesc': 'تصفح جميع السور الـ 114 مع سياق مكي/مدني والمواضيع وخلفية النزول. شاهد وقت القراءة المقدر وعدد الرؤى الشخصية.',
      'features.insightTitle': 'رؤى شخصية',
      'features.insightDesc': 'تحليل مدعوم بالذكاء الاصطناعي يربط الآيات القرآنية بسياق حياتك. تتضمن كل رؤية مرجع الآية والنص العربي والترجمة والصلة.',
      'features.libraryTitle': 'مكتبة حكمتك',
      'features.libraryDesc': 'نظم الرؤى إلى نشطة ومؤرشفة ومحفوظة. أضف ملاحظات ووسوم مجالات الحياة وتصاميم التنفيذ. نموك الروحي، متتبع.',
      'features.reflectionTitle': 'مطالبات التأمل',
      'features.reflectionDesc': 'تساعدك المطالبات اليومية والأسبوعية على التوقف والتأمل والتدوين. محرر نصوص غني للتأمل العميق في كيفية ظهور الرؤى.',
      'features.reminderTitle': 'تذكيرات ذكية',
      'features.reminderDesc': 'تكامل التقويم وخطافات الإشعارات (واتساب، تيليجرام) تحافظ على نشاط الرؤى. وضع التركيز للتأمل بدون تشتيت.',
      'features.searchTitle': 'الاكتشاف والبحث',
      'features.searchDesc': 'ابحث عن الحكمة حسب الموضوع أو وضع الحياة أو السورة أو الآية. صفِّ حسب الحالة النشطة/المؤرشفة. اظهر الإرشاد الذي تحتاجه، عندما تحتاجه.',

      // Transparency
      'transparency.title': 'الثقة والشفافية',
      'transparency.subtitle': 'مبني بأمانة واحترام للنص المقدس',
      'transparency.scholarTitle': 'ذكاء اصطناعي مدعوم من العلماء',
      'transparency.scholarDesc': 'ذكاؤنا الاصطناعي مدرب على ترجمات قرآنية موثقة وتفسير كلاسيكي. كل رؤية تشير إلى مصادر أصيلة.',
      'transparency.metricsTitle': 'لا مقاييس أداء',
      'transparency.metricsDesc': 'لا إعجابات، لا سلاسل، لا لوحات صدارة عامة. رحلتك الروحية بينك وبين الله.',
      'transparency.processTitle': 'عملية شفافة',
      'transparency.processDesc': 'انظر بالضبط كيف يتم إنشاء الرؤى - مراجع الآيات والسياق وكيف تتوافق مع ملفك الشخصي.',
      'transparency.humilityTitle': 'التواضع أولاً',
      'transparency.humilityDesc': 'لا ندعي الكمال. هذه أداة للتأمل، وليست بديلاً عن العلماء أو المجتمع.',

      // Hero Section
      'hero.title': 'حول الهداية القرآنية إلى حكمة عملية، شخصية لحياتك',
      'hero.subtitle': 'مساحة هادئة ومتأنية للاتصال بالقرآن - لا زوائد، لا مقاييس أداء. فقط التأمل والعمل والنمو.',
      'hero.cta': 'ابدأ رحلتك',
      'hero.explore': 'استكشف السور',

      // CTA Section
      'cta.title': 'هل أنت مستعد لتحويل الهداية إلى عمل؟',
      'cta.subtitle': 'ابدأ رحلتك الشخصية عبر القرآن. لا حاجة لبطاقة ائتمان. ابدأ التأمل اليوم.',
      'cta.button': 'ابدأ مجاناً',

      // Footer
      'footer.tagline': 'تحويل الحكمة القرآنية إلى إرشاد عملي',

      // Onboarding
      'onboarding.step': 'خطوة',
      'onboarding.of': 'من',
      'onboarding.back': 'رجوع',
      'onboarding.next': 'التالي',
      'onboarding.finish': 'إكمال',
      'onboarding.step1Title': 'ما هي القيم التي توجه حياتك؟',
      'onboarding.step1Subtitle': 'اختر المبادئ التي تتردد صداها معك أكثر.',
      'onboarding.step2Title': 'أين أنت في الحياة الآن؟',
      'onboarding.step2Subtitle': 'هذا يساعدنا على فهم سياقك.',
      'onboarding.step3Title': 'ما هي التحديات التي تواجهها؟',
      'onboarding.step3Subtitle': 'نواجه جميعًا التجارب. ما هي تجاربك؟',
      'onboarding.step4Title': 'ما هي أهدافك الروحية؟',
      'onboarding.step4Subtitle': 'ما الذي تأمل في تنميته؟',
      'onboarding.step5Title': 'كيف تتعلم بشكل أفضل؟',
      'onboarding.step5Subtitle': 'فهم أسلوبك يساعدنا على تخصيص الرؤى.',

      // Auth
      'auth.welcome': 'مرحبًا بك في بصيرة قرآنية',
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

      // Explore
      'explore.title': 'سورتیں دریافت کریں',
      'explore.subtitle': 'تمام 114 سورتوں سے ذاتی بصیرتیں دریافت کریں',
      'explore.search': 'نام، نمبر یا موضوع سے تلاش کریں...',
      'explore.verses': 'آیات',
      'explore.insights': 'ذاتی بصیرتیں',
      'explore.exploreBtn': 'دریافت کریں ←',

      // Library
      'library.title': 'آپ کی حکمت کی لائبریری',
      'library.subtitle': 'اپنی فعال مشقوں کو ٹریک کریں، مکمل شدہ کو محفوظ کریں، اور الہام محفوظ کریں',
      'library.active': 'فعال',
      'library.archived': 'محفوظ شدہ',
      'library.saved': 'محفوظ کردہ',
      'library.noItems': 'ابھی تک کوئی آئٹمز نہیں۔ بصیرتیں شامل کرنے کے لیے سورتیں دریافت کرنا شروع کریں!',
      'library.added': 'شامل کیا گیا',
      'library.actionPlan': 'ایکشن پلان',
      'library.what': 'کیا:',
      'library.when': 'کب:',
      'library.frequency': 'تعدد:',
      'library.success': 'کامیابی اس طرح نظر آتی ہے:',
      'library.reflections': 'آپ کے خیالات',
      'library.edit': 'ترمیم',
      'library.save': 'محفوظ کریں',
      'library.cancel': 'منسوخ',
      'library.noReflections': 'ابھی تک کوئی خیالات نہیں۔ اپنے خیالات شامل کرنے کے لیے ترمیم پر کلک کریں۔',
      'library.notesPlaceholder': 'یہ عمل کیسا چل رہا ہے؟ آپ نے کیا محسوس کیا؟',

      // Surah Detail
      'surah.backToExplore': 'دریافت کی طرف واپس',
      'surah.number': 'سورہ',
      'surah.verses': 'آیات',
      'surah.read': 'پڑھیں',
      'surah.personalizedInsights': 'ذاتی بصیرتیں',
      'surah.keyThemes': 'اہم موضوعات',
      'surah.revelationContext': 'نزول کا سیاق و سباق',
      'surah.tailoredTitle': 'آپ کے لیے تیار کردہ بصیرتیں',
      'surah.whyMatters': 'یہ آپ کے لیے کیوں اہم ہے',
      'surah.reflectionPrompt': 'غور و فکر کا اشارہ',
      'surah.addToLibrary': 'میری لائبریری میں شامل کریں',
      'surah.actionTitle': 'اپنا ایکشن پلان ڈیزائن کریں',
      'surah.actionDesc': 'اس بصیرت کو ٹھوس، قابل پیمائش عمل میں تبدیل کریں',
      'surah.whatLabel': 'آپ کیا کریں گے؟',
      'surah.whatPlaceholder': 'مثال: جب میں پریشان محسوس کروں، میں کوئی بھی اقدام کرنے سے پہلے رک کر دعا کروں گا...',
      'surah.whenLabel': 'کب؟',
      'surah.whenPlaceholder': 'مثال: صبح، فجر کے بعد...',
      'surah.frequencyLabel': 'کتنی بار؟',
      'surah.frequencyPlaceholder': 'مثال: روزانہ، ہفتہ وار...',
      'surah.metricsLabel': 'آپ کو کیسے پتہ چلے گا کہ یہ کام کر رہا ہے؟',
      'surah.metricsPlaceholder': 'مثال: میں پرسکون محسوس کرتا ہوں، میرے تعلقات بہتر ہوتے ہیں، میں بہتر سوتا ہوں...',
      'surah.saveLibrary': 'لائبریری میں محفوظ کریں',

      // How It Works
      'how.title': 'یہ کیسے کام کرتا ہے',
      'how.subtitle': 'بصیرت سے عمل درآمد تک ایک پرسکون، سوچا سمجھا عمل',
      'how.step1Title': 'اپنا سیاق و سباق شیئر کریں',
      'how.step1Desc': 'ایک سوچے سمجھے کوئز کے ذریعے ہمیں اپنی اقدار، زندگی کے مرحلے، چیلنجز اور روحانی اہداف کے بارے میں بتائیں۔',
      'how.step2Title': 'بصیرتیں حاصل کریں',
      'how.step2Desc': 'آیات کے حوالوں، ترجموں اور آپ کی زندگی کے مطابق سیاق و سباق کے ساتھ ذاتی نوعیت کی قرآنی حکمت حاصل کریں۔',
      'how.step3Title': 'اپنا عمل ڈیزائن کریں',
      'how.step3Desc': 'بصیرتوں کو ٹھوس ایکشن پلانز میں تبدیل کریں جس میں کیا، کب، کیسے اور کامیابی کے پیمانے شامل ہیں جو آپ طے کرتے ہیں۔',
      'how.step4Title': 'غور کریں اور بڑھیں',
      'how.step4Desc': 'اپنے تجربات کو نوٹ کریں، خیالات کو ٹریک کریں، اور حکمت کو وقت کے ساتھ گہرا ہونے دیں۔',

      // Features
      'features.title': 'بنیادی خصوصیات',
      'features.subtitle': 'قرآنی حکمت کو زندہ عمل میں تبدیل کرنے کے لیے وہ سب کچھ جس کی آپ کو ضرورت ہے',
      'features.surahTitle': 'سورہ کی تلاش',
      'features.surahDesc': 'مکی/مدنی سیاق و سباق، موضوعات، اور نزول کی پس منظر کے ساتھ تمام 114 سورتوں کو براؤز کریں۔ تخمینی پڑھنے کا وقت اور ذاتی بصیرتوں کی تعداد دیکھیں۔',
      'features.insightTitle': 'ذاتی بصیرتیں',
      'features.insightDesc': 'AI سے چلنے والا تجزیہ قرآنی آیات کو آپ کی زندگی کے سیاق و سباق سے جوڑتا ہے۔ ہر بصیرت میں آیت کا حوالہ، عربی متن، ترجمہ اور مطابقت شامل ہے۔',
      'features.libraryTitle': 'آپ کی حکمت کی لائبریری',
      'features.libraryDesc': 'بصیرتوں کو فعال، محفوظ شدہ اور محفوظ کردہ میں منظم کریں۔ نوٹس، زندگی کے شعبوں کے ٹیگز، اور نفاذ کے ڈیزائن شامل کریں۔ آپ کی روحانی ترقی، ٹریک شدہ۔',
      'features.reflectionTitle': 'غور و فکر کے اشارے',
      'features.reflectionDesc': 'روزانہ اور ہفتہ وار اشارے آپ کو رکنے، سوچنے اور نوٹ کرنے میں مدد کرتے ہیں۔ بصیرتوں کے ظاہر ہونے کی گہری عکاسی کے لیے رچ ٹیکسٹ ایڈیٹر۔',
      'features.reminderTitle': 'سمارٹ یاددہانیاں',
      'features.reminderDesc': 'کیلنڈر کا انضمام اور اطلاع کے ہکس (واٹس ایپ، ٹیلیگرام) بصیرتوں کو فعال رکھتے ہیں۔ بغیر خلل کے غور و فکر کے لیے فوکس موڈ۔',
      'features.searchTitle': 'دریافت اور تلاش',
      'features.searchDesc': 'موضوع، زندگی کی صورتحال، سورہ، یا آیت کے ذریعے حکمت تلاش کریں۔ فعال/محفوظ شدہ حیثیت کے لحاظ سے فلٹر کریں۔ جب آپ کو ضرورت ہو، رہنمائی کو سامنے لائیں۔',

      // Transparency
      'transparency.title': 'اعتماد اور شفافیت',
      'transparency.subtitle': 'مقدس متن کے لیے ایمانداری اور احترام کے ساتھ بنایا گیا',
      'transparency.scholarTitle': 'علماء کی حمایت یافتہ AI',
      'transparency.scholarDesc': 'ہماری AI تصدیق شدہ قرآنی تراجم اور کلاسیکی تفسیر پر تربیت یافتہ ہے۔ ہر بصیرت مستند ذرائع کا حوالہ دیتی ہے۔',
      'transparency.metricsTitle': 'کوئی کارکردگی کی پیمائشیں نہیں',
      'transparency.metricsDesc': 'کوئی لائکس نہیں، کوئی سلسلے نہیں، کوئی عوامی لیڈر بورڈز نہیں۔ آپ کا روحانی سفر آپ اور اللہ کے درمیان ہے۔',
      'transparency.processTitle': 'شفاف عمل',
      'transparency.processDesc': 'بالکل دیکھیں کہ بصیرتیں کیسے بنائی جاتی ہیں - آیت کے حوالے، سیاق و سباق، اور وہ آپ کے پروفائل سے کیسے میل کھاتے ہیں۔',
      'transparency.humilityTitle': 'عاجزی پہلے',
      'transparency.humilityDesc': 'ہم کمال کا دعویٰ نہیں کرتے۔ یہ غور و فکر کا ایک آلہ ہے، علماء یا برادری کا متبادل نہیں۔',

      // Hero Section
      'hero.title': 'قرآنی رہنمائی کو قابل عمل حکمت میں تبدیل کریں، آپ کی زندگی کے لیے ذاتی نوعیت کی',
      'hero.subtitle': 'قرآن سے جڑنے کے لیے ایک پرسکون، سوچا سمجھا مقام - کوئی فضول چیز نہیں، کوئی کارکردگی کی پیمائش نہیں۔ صرف غور و فکر، عمل اور ترقی۔',
      'hero.cta': 'اپنا سفر شروع کریں',
      'hero.explore': 'سورتیں دریافت کریں',

      // CTA Section
      'cta.title': 'رہنمائی کو عمل میں تبدیل کرنے کے لیے تیار ہیں؟',
      'cta.subtitle': 'قرآن کے ذریعے اپنا ذاتی سفر شروع کریں۔ کریڈٹ کارڈ کی ضرورت نہیں۔ آج ہی غور و فکر شروع کریں۔',
      'cta.button': 'مفت شروع کریں',

      // Footer
      'footer.tagline': 'قرآنی حکمت کو قابل عمل رہنمائی میں تبدیل کرنا',

      // Onboarding
      'onboarding.step': 'قدم',
      'onboarding.of': 'میں سے',
      'onboarding.back': 'واپس',
      'onboarding.next': 'اگلا',
      'onboarding.finish': 'مکمل',
      'onboarding.step1Title': 'آپ کی زندگی کو کون سی اقدار رہنمائی کرتی ہیں؟',
      'onboarding.step1Subtitle': 'وہ اصول منتخب کریں جو آپ کے ساتھ سب سے زیادہ گونجتے ہیں۔',
      'onboarding.step2Title': 'آپ ابھی زندگی میں کہاں ہیں؟',
      'onboarding.step2Subtitle': 'یہ ہمیں آپ کا سیاق و سباق سمجھنے میں مدد کرتا ہے۔',
      'onboarding.step3Title': 'آپ کن چیلنجز کا سامنا کر رہے ہیں؟',
      'onboarding.step3Subtitle': 'ہم سب آزمائشوں کا سامنا کرتے ہیں۔ آپ کے کیا ہیں؟',
      'onboarding.step4Title': 'آپ کے روحانی اہداف کیا ہیں؟',
      'onboarding.step4Subtitle': 'آپ کیا پیدا کرنے کی امید رکھتے ہیں؟',
      'onboarding.step5Title': 'آپ بہترین طریقے سے کیسے سیکھتے ہیں؟',
      'onboarding.step5Subtitle': 'آپ کے انداز کو سمجھنا ہمیں بصیرتوں کو ذاتی نوعیت دینے میں مدد کرتا ہے۔',

      // Auth
      'auth.welcome': 'قرآنی بصیرت میں خوش آمدید',
      'auth.signUpTitle': 'اپنا اکاؤنٹ بنائیں',
      'auth.signInTitle': 'سائن ان',
      'auth.email': 'ای میل',
      'auth.password': 'پاس ورڈ',
      'auth.signUp': 'سائن اپ',
      'auth.signIn': 'سائن ان',
      'auth.haveAccount': 'پہلے سے اکاؤنٹ ہے؟',
      'auth.noAccount': 'اکاؤنٹ نہیں ہے؟',
      'auth.switchToSignIn': 'سائن ان',
      'auth.switchToSignUp': 'سائن اپ',
    },
  };

  return translations[lang] || translations.en;
};

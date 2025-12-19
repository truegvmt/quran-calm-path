import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ar' | 'ur'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  direction: 'ltr' | 'rtl'
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية', ur: 'ہوم' },
  'nav.explore': { en: 'Explore', ar: 'استكشف', ur: 'دریافت کریں' },
  'nav.library': { en: 'Library', ar: 'المكتبة', ur: 'لائبریری' },
  'nav.signIn': { en: 'Sign In', ar: 'تسجيل الدخول', ur: 'سائن ان' },
  'nav.getStarted': { en: 'Get Started', ar: 'ابدأ الآن', ur: 'شروع کریں' },
  
  // Hero Section
  'hero.title': { en: 'Discover Meaningful Insights from the Quran', ar: 'اكتشف رؤى ذات معنى من القرآن', ur: 'قرآن سے معنی خیز بصیرت دریافت کریں' },
  'hero.subtitle': { en: 'AI-powered reflections personalized for your spiritual journey', ar: 'تأملات مدعومة بالذكاء الاصطناعي مخصصة لرحلتك الروحية', ur: 'آپ کے روحانی سفر کے لیے مخصوص AI سے تیار شدہ عکاسی' },
  'hero.cta': { en: 'Begin Your Journey', ar: 'ابدأ رحلتك', ur: 'اپنا سفر شروع کریں' },
  'hero.secondary': { en: 'Learn More', ar: 'اعرف المزيد', ur: 'مزید جانیں' },

  // How It Works
  'howItWorks.title': { en: 'How It Works', ar: 'كيف يعمل', ur: 'یہ کیسے کام کرتا ہے' },
  'howItWorks.subtitle': { en: 'Three simple steps to meaningful insights', ar: 'ثلاث خطوات بسيطة للحصول على رؤى ذات معنى', ur: 'معنی خیز بصیرت کے لیے تین آسان مراحل' },
  'howItWorks.step1.title': { en: 'Share Your Context', ar: 'شارك سياقك', ur: 'اپنا سیاق و سباق بتائیں' },
  'howItWorks.step1.desc': { en: 'Tell us about your life stage, interests, and what guidance you seek', ar: 'أخبرنا عن مرحلة حياتك واهتماماتك والإرشاد الذي تبحث عنه', ur: 'ہمیں اپنی زندگی کے مرحلے، دلچسپیوں اور مطلوبہ رہنمائی کے بارے میں بتائیں' },
  'howItWorks.step2.title': { en: 'Receive Personalized Verses', ar: 'احصل على آيات مخصصة', ur: 'ذاتی آیات حاصل کریں' },
  'howItWorks.step2.desc': { en: 'Our AI matches Quranic verses relevant to your situation', ar: 'يقوم الذكاء الاصطناعي بمطابقة الآيات القرآنية ذات الصلة بحالتك', ur: 'ہماری AI آپ کی صورتحال سے متعلق قرآنی آیات کا انتخاب کرتی ہے' },
  'howItWorks.step3.title': { en: 'Explore Deep Insights', ar: 'استكشف رؤى عميقة', ur: 'گہری بصیرت دریافت کریں' },
  'howItWorks.step3.desc': { en: 'Get thoughtful reflections and practical applications', ar: 'احصل على تأملات مدروسة وتطبيقات عملية', ur: 'سوچ بچار کی عکاسی اور عملی اطلاق حاصل کریں' },

  // Features
  'features.title': { en: 'Features', ar: 'الميزات', ur: 'خصوصیات' },
  'features.subtitle': { en: 'Tools to deepen your connection with the Quran', ar: 'أدوات لتعميق علاقتك بالقرآن', ur: 'قرآن سے اپنا تعلق گہرا کرنے کے اوزار' },
  'features.personalized.title': { en: 'Personalized Insights', ar: 'رؤى مخصصة', ur: 'ذاتی بصیرت' },
  'features.personalized.desc': { en: 'AI-generated reflections tailored to your life context', ar: 'تأملات مولدة بالذكاء الاصطناعي مصممة لسياق حياتك', ur: 'آپ کی زندگی کے سیاق کے مطابق AI سے تیار شدہ عکاسی' },
  'features.library.title': { en: 'Personal Library', ar: 'المكتبة الشخصية', ur: 'ذاتی لائبریری' },
  'features.library.desc': { en: 'Save and organize your favorite verses and insights', ar: 'احفظ ونظم آياتك ورؤاك المفضلة', ur: 'اپنی پسندیدہ آیات اور بصیرت محفوظ اور منظم کریں' },
  'features.multilingual.title': { en: 'Multilingual Support', ar: 'دعم متعدد اللغات', ur: 'کثیر لسانی معاونت' },
  'features.multilingual.desc': { en: 'Available in English, Arabic, and Urdu', ar: 'متاح بالإنجليزية والعربية والأردية', ur: 'انگریزی، عربی اور اردو میں دستیاب' },
  'features.daily.title': { en: 'Daily Reflections', ar: 'تأملات يومية', ur: 'روزانہ تفکرات' },
  'features.daily.desc': { en: 'Fresh insights delivered to inspire your day', ar: 'رؤى جديدة لإلهام يومك', ur: 'آپ کے دن کو متاثر کرنے کے لیے تازہ بصیرت' },

  // Transparency
  'transparency.title': { en: 'Our Commitment to Authenticity', ar: 'التزامنا بالأصالة', ur: 'صداقت کے لیے ہمارا عزم' },
  'transparency.subtitle': { en: 'AI assists, scholars verify, you decide', ar: 'الذكاء الاصطناعي يساعد، العلماء يتحققون، أنت تقرر', ur: 'AI مدد کرتی ہے، علماء تصدیق کرتے ہیں، آپ فیصلہ کرتے ہیں' },
  'transparency.point1': { en: 'All insights are clearly marked as AI-generated', ar: 'جميع الرؤى موسومة بوضوح على أنها مولدة بالذكاء الاصطناعي', ur: 'تمام بصیرت واضح طور پر AI سے تیار شدہ کے طور پر نشان زد ہیں' },
  'transparency.point2': { en: 'Original Quranic text always provided alongside translations', ar: 'النص القرآني الأصلي متاح دائمًا مع الترجمات', ur: 'اصل قرآنی متن ہمیشہ ترجمے کے ساتھ فراہم کیا جاتا ہے' },
  'transparency.point3': { en: 'Users encouraged to verify with qualified scholars', ar: 'نشجع المستخدمين على التحقق مع العلماء المؤهلين', ur: 'صارفین کو اہل علماء سے تصدیق کرنے کی ترغیب دی جاتی ہے' },
  'transparency.point4': { en: 'Community feedback helps improve accuracy', ar: 'ملاحظات المجتمع تساعد في تحسين الدقة', ur: 'کمیونٹی فیڈبیک درستگی بہتر کرنے میں مدد کرتا ہے' },

  // CTA
  'cta.title': { en: 'Begin Your Spiritual Journey Today', ar: 'ابدأ رحلتك الروحية اليوم', ur: 'آج اپنا روحانی سفر شروع کریں' },
  'cta.subtitle': { en: 'Join thousands discovering meaningful connections with the Quran', ar: 'انضم إلى الآلاف الذين يكتشفون روابط ذات معنى مع القرآن', ur: 'قرآن کے ساتھ معنی خیز تعلقات دریافت کرنے والے ہزاروں میں شامل ہوں' },
  'cta.button': { en: 'Start Free', ar: 'ابدأ مجانًا', ur: 'مفت شروع کریں' },

  // Footer
  'footer.tagline': { en: 'Connecting hearts with the Quran through meaningful insights', ar: 'ربط القلوب بالقرآن من خلال رؤى ذات معنى', ur: 'معنی خیز بصیرت کے ذریعے قرآن سے دلوں کو جوڑنا' },
  'footer.product': { en: 'Product', ar: 'المنتج', ur: 'پروڈکٹ' },
  'footer.company': { en: 'Company', ar: 'الشركة', ur: 'کمپنی' },
  'footer.legal': { en: 'Legal', ar: 'قانوني', ur: 'قانونی' },
  'footer.about': { en: 'About', ar: 'حول', ur: 'بارے میں' },
  'footer.contact': { en: 'Contact', ar: 'اتصل', ur: 'رابطہ' },
  'footer.privacy': { en: 'Privacy', ar: 'الخصوصية', ur: 'رازداری' },
  'footer.terms': { en: 'Terms', ar: 'الشروط', ur: 'شرائط' },
  'footer.rights': { en: 'All rights reserved', ar: 'جميع الحقوق محفوظة', ur: 'جملہ حقوق محفوظ ہیں' },

  // Onboarding
  'onboarding.title': { en: 'Personalize Your Experience', ar: 'خصص تجربتك', ur: 'اپنا تجربہ ذاتی بنائیں' },
  'onboarding.step': { en: 'Step', ar: 'خطوة', ur: 'مرحلہ' },
  'onboarding.of': { en: 'of', ar: 'من', ur: 'میں سے' },
  'onboarding.next': { en: 'Next', ar: 'التالي', ur: 'اگلا' },
  'onboarding.back': { en: 'Back', ar: 'رجوع', ur: 'واپس' },
  'onboarding.finish': { en: 'Finish', ar: 'إنهاء', ur: 'مکمل' },
  'onboarding.skip': { en: 'Skip', ar: 'تخطي', ur: 'چھوڑیں' },
  'onboarding.lifeStage': { en: 'What stage of life are you in?', ar: 'في أي مرحلة من حياتك أنت؟', ur: 'آپ زندگی کے کس مرحلے میں ہیں؟' },
  'onboarding.interests': { en: 'What topics interest you most?', ar: 'ما المواضيع التي تهمك أكثر؟', ur: 'آپ کو کون سے موضوعات سب سے زیادہ دلچسپ لگتے ہیں؟' },
  'onboarding.goals': { en: 'What are your spiritual goals?', ar: 'ما هي أهدافك الروحية؟', ur: 'آپ کے روحانی مقاصد کیا ہیں؟' },
  'onboarding.student': { en: 'Student', ar: 'طالب', ur: 'طالب علم' },
  'onboarding.professional': { en: 'Professional', ar: 'محترف', ur: 'پیشہ ور' },
  'onboarding.parent': { en: 'Parent', ar: 'والد/والدة', ur: 'والدین' },
  'onboarding.retired': { en: 'Retired', ar: 'متقاعد', ur: 'ریٹائرڈ' },
  'onboarding.faith': { en: 'Faith & Belief', ar: 'الإيمان والعقيدة', ur: 'ایمان و عقیدہ' },
  'onboarding.family': { en: 'Family & Relationships', ar: 'الأسرة والعلاقات', ur: 'خاندان اور تعلقات' },
  'onboarding.career': { en: 'Career & Purpose', ar: 'المهنة والهدف', ur: 'کیریئر اور مقصد' },
  'onboarding.health': { en: 'Health & Wellbeing', ar: 'الصحة والرفاهية', ur: 'صحت اور فلاح' },
  'onboarding.ethics': { en: 'Ethics & Character', ar: 'الأخلاق والشخصية', ur: 'اخلاقیات اور کردار' },
  'onboarding.community': { en: 'Community & Society', ar: 'المجتمع', ur: 'معاشرہ' },
  'onboarding.deeperUnderstanding': { en: 'Deeper Understanding', ar: 'فهم أعمق', ur: 'گہری سمجھ' },
  'onboarding.dailyReflection': { en: 'Daily Reflection', ar: 'تأمل يومي', ur: 'روزانہ تفکر' },
  'onboarding.personalGrowth': { en: 'Personal Growth', ar: 'النمو الشخصي', ur: 'ذاتی ترقی' },
  'onboarding.spiritualConnection': { en: 'Spiritual Connection', ar: 'الاتصال الروحي', ur: 'روحانی تعلق' },

  // Explore Page
  'explore.title': { en: 'Explore the Quran', ar: 'استكشف القرآن', ur: 'قرآن دریافت کریں' },
  'explore.subtitle': { en: 'Browse all 114 Surahs', ar: 'تصفح جميع السور الـ 114', ur: 'تمام 114 سورتیں دیکھیں' },
  'explore.search': { en: 'Search surahs...', ar: 'ابحث عن السور...', ur: 'سورتیں تلاش کریں...' },
  'explore.verses': { en: 'verses', ar: 'آيات', ur: 'آیات' },
  'explore.insights': { en: 'insights', ar: 'رؤى', ur: 'بصیرت' },
  'explore.revelation': { en: 'Revelation', ar: 'الوحي', ur: 'وحی' },
  'explore.meccan': { en: 'Meccan', ar: 'مكية', ur: 'مکی' },
  'explore.medinan': { en: 'Medinan', ar: 'مدنية', ur: 'مدنی' },

  // Library Page
  'library.title': { en: 'Your Library', ar: 'مكتبتك', ur: 'آپ کی لائبریری' },
  'library.subtitle': { en: 'Saved verses and insights', ar: 'الآيات والرؤى المحفوظة', ur: 'محفوظ آیات اور بصیرت' },
  'library.empty': { en: 'Your library is empty', ar: 'مكتبتك فارغة', ur: 'آپ کی لائبریری خالی ہے' },
  'library.emptyDesc': { en: 'Save verses and insights while exploring to build your collection', ar: 'احفظ الآيات والرؤى أثناء الاستكشاف لبناء مجموعتك', ur: 'دریافت کرتے ہوئے آیات اور بصیرت محفوظ کریں' },
  'library.startExploring': { en: 'Start Exploring', ar: 'ابدأ الاستكشاف', ur: 'دریافت شروع کریں' },
  'library.savedVerses': { en: 'Saved Verses', ar: 'الآيات المحفوظة', ur: 'محفوظ آیات' },
  'library.savedInsights': { en: 'Saved Insights', ar: 'الرؤى المحفوظة', ur: 'محفوظ بصیرت' },
  'library.folders': { en: 'Folders', ar: 'المجلدات', ur: 'فولڈرز' },
  'library.all': { en: 'All', ar: 'الكل', ur: 'سب' },
  'library.recent': { en: 'Recent', ar: 'الأخيرة', ur: 'حالیہ' },
  'library.favorites': { en: 'Favorites', ar: 'المفضلة', ur: 'پسندیدہ' },

  // Surah Detail
  'surah.verses': { en: 'Verses', ar: 'الآيات', ur: 'آیات' },
  'surah.insights': { en: 'AI Insights', ar: 'رؤى الذكاء الاصطناعي', ur: 'AI بصیرت' },
  'surah.translation': { en: 'Translation', ar: 'الترجمة', ur: 'ترجمہ' },
  'surah.tafsir': { en: 'Tafsir', ar: 'التفسير', ur: 'تفسیر' },
  'surah.save': { en: 'Save', ar: 'حفظ', ur: 'محفوظ کریں' },
  'surah.share': { en: 'Share', ar: 'مشاركة', ur: 'شیئر کریں' },
  'surah.play': { en: 'Play Audio', ar: 'تشغيل الصوت', ur: 'آڈیو چلائیں' },
  'surah.generateInsight': { en: 'Generate Insight', ar: 'توليد رؤية', ur: 'بصیرت پیدا کریں' },
  'surah.aiDisclaimer': { en: 'AI-generated content. Please verify with qualified scholars.', ar: 'محتوى مولد بالذكاء الاصطناعي. يرجى التحقق مع العلماء المؤهلين.', ur: 'AI سے تیار شدہ مواد۔ براہ کرم اہل علماء سے تصدیق کریں۔' },
  'surah.back': { en: 'Back to Explore', ar: 'العودة للاستكشاف', ur: 'دریافت پر واپس' },

  // Auth Page
  'auth.signIn': { en: 'Sign In', ar: 'تسجيل الدخول', ur: 'سائن ان' },
  'auth.signUp': { en: 'Sign Up', ar: 'إنشاء حساب', ur: 'سائن اپ' },
  'auth.email': { en: 'Email', ar: 'البريد الإلكتروني', ur: 'ای میل' },
  'auth.password': { en: 'Password', ar: 'كلمة المرور', ur: 'پاس ورڈ' },
  'auth.confirmPassword': { en: 'Confirm Password', ar: 'تأكيد كلمة المرور', ur: 'پاس ورڈ کی تصدیق' },
  'auth.forgotPassword': { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟', ur: 'پاس ورڈ بھول گئے؟' },
  'auth.noAccount': { en: "Don't have an account?", ar: 'ليس لديك حساب؟', ur: 'اکاؤنٹ نہیں ہے؟' },
  'auth.hasAccount': { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟', ur: 'پہلے سے اکاؤنٹ ہے؟' },
  'auth.continue': { en: 'Continue', ar: 'متابعة', ur: 'جاری رکھیں' },
  'auth.welcome': { en: 'Welcome back', ar: 'مرحبًا بعودتك', ur: 'واپسی پر خوش آمدید' },
  'auth.createAccount': { en: 'Create your account', ar: 'أنشئ حسابك', ur: 'اپنا اکاؤنٹ بنائیں' },

  // Common
  'common.loading': { en: 'Loading...', ar: 'جاري التحميل...', ur: 'لوڈ ہو رہا ہے...' },
  'common.error': { en: 'An error occurred', ar: 'حدث خطأ', ur: 'ایک خرابی پیش آئی' },
  'common.retry': { en: 'Retry', ar: 'إعادة المحاولة', ur: 'دوبارہ کوشش کریں' },
  'common.close': { en: 'Close', ar: 'إغلاق', ur: 'بند کریں' },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  const direction = language === 'ar' || language === 'ur' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = language
  }, [language, direction])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, direction }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
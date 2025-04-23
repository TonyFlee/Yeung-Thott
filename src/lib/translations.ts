export type Language = "en" | "km";

type TranslationKey =
  | "home"
  | "about"
  | "gallery"
  | "updates"
  | "contact"
  | "welcomeTitle"
  | "welcomeSubtitle"
  | "contactUs"
  | "learnMore"
  | "professionalService"
  | "qualityAssurance"
  | "bilingualSupport"
  | "aboutTitle"
  | "aboutSubtitle"
  | "ourStory"
  | "readMore"
  | "whatWeOffer"
  | "ourGallery"
  | "gallerySubtitle"
  | "viewFullGallery"
  | "latestUpdates"
  | "updatesSubtitle"
  | "visitFacebook"
  | "getInTouch"
  | "contactSubtitle"
  | "contactInfo"
  | "name"
  | "email"
  | "subject"
  | "message"
  | "sendMessage"
  | "quickLinks"
  | "privacyPolicy"
  | "termsOfService"
  | "allRightsReserved";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    home: "Home",
    about: "About",
    gallery: "Gallery",
    updates: "Updates",
    contact: "Contact",
    welcomeTitle: "Welcome to YEUNG THOTT",
    welcomeSubtitle:
      "A professional team dedicated to excellence and innovation. Discover our services and see how we can help you achieve your goals.",
    contactUs: "Contact Us",
    learnMore: "Learn More",
    professionalService: "Professional Service",
    qualityAssurance: "Quality Assurance",
    bilingualSupport: "Bilingual Support",
    aboutTitle: "About YEUNG THOTT",
    aboutSubtitle:
      "We are a dedicated team committed to excellence and innovation in everything we do. Our mission is to deliver exceptional results that exceed expectations.",
    ourStory: "Our Story",
    readMore: "Read More",
    whatWeOffer: "What We Offer",
    ourGallery: "Our Gallery",
    gallerySubtitle:
      "Explore our portfolio of work and see the quality and creativity we bring to every project.",
    viewFullGallery: "View Full Gallery",
    latestUpdates: "Latest Updates",
    updatesSubtitle:
      "Stay connected with our latest news and updates from our Facebook page.",
    visitFacebook: "Visit Our Facebook Page",
    getInTouch: "Get In Touch",
    contactSubtitle:
      "Have questions or want to work with us? Reach out and we'll get back to you as soon as possible.",
    contactInfo: "Contact Info",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    quickLinks: "Quick Links",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved.",
  },
  km: {
    home: "ទំព័រដើម",
    about: "អំពីយើង",
    gallery: "វិចិត្រសាល",
    updates: "ព័ត៌មានថ្មីៗ",
    contact: "ទំនាក់ទំនង",
    welcomeTitle: "សូមស្វាគមន៍មកកាន់ YEUNG THOTT",
    welcomeSubtitle:
      "ក្រុមអ្នកជំនាញដែលប្តេជ្ញាចិត្តចំពោះភាពឧត្តមនិងនវានុវត្តន៍។ ស្វែងយល់ពីសេវាកម្មរបស់យើងហើយមើលថាតើយើងអាចជួយអ្នកសម្រេចគោលដៅរបស់អ្នកយ៉ាងដូចម្តេច។",
    contactUs: "ទាក់ទងមកយើង",
    learnMore: "ស្វែងយល់បន្ថែម",
    professionalService: "សេវាកម្មជំនាញ",
    qualityAssurance: "ការធានាគុណភាព",
    bilingualSupport: "ការគាំទ្រពីរភាសា",
    aboutTitle: "អំពី YEUNG THOTT",
    aboutSubtitle:
      "យើងជាក្រុមដែលប្តេជ្ញាចិត្តចំពោះភាពឧត្តមនិងនវានុវត្តន៍ក្នុងអ្វីគ្រប់យ៉ាងដែលយើងធ្វើ។ បេសកកម្មរបស់យើងគឺផ្តល់លទ្ធផលដ៏អស្ចារ្យដែលលើសពីការរំពឹងទុក។",
    ourStory: "រឿងរ៉ាវរបស់យើង",
    readMore: "អានបន្ថែម",
    whatWeOffer: "អ្វីដែលយើងផ្តល់ជូន",
    ourGallery: "វិចិត្រសាលរបស់យើង",
    gallerySubtitle:
      "រុករកសមិទ្ធិផលការងាររបស់យើងហើយមើលគុណភាពនិងភាពច្នៃប្រឌិតដែលយើងនាំមកគ្រប់គម្រោង។",
    viewFullGallery: "មើលវិចិត្រសាលទាំងមូល",
    latestUpdates: "ព័ត៌មានថ្មីៗបំផុត",
    updatesSubtitle:
      "បន្តភ្ជាប់ទំនាក់ទំនងជាមួយព័ត៌មាននិងការធ្វើបច្ចុប្បន្នភាពចុងក្រោយបំផុតពីទំព័រហ្វេសប៊ុករបស់យើង។",
    visitFacebook: "ទស្សនាទំព័រហ្វេសប៊ុករបស់យើង",
    getInTouch: "ទាក់ទងមកយើង",
    contactSubtitle:
      "មានសំណួរឬចង់ធ្វើការជាមួយយើង? ទាក់ទងមកយើងហើយយើងនឹងឆ្លើយតបវិញឱ្យបានឆាប់តាមដែលអាចធ្វើទៅបាន។",
    contactInfo: "ព័ត៌មានទំនាក់ទំនង",
    name: "ឈ្មោះ",
    email: "អ៊ីមែល",
    subject: "ប្រធានបទ",
    message: "សារ",
    sendMessage: "ផ្ញើសារ",
    quickLinks: "តំណភ្ជាប់រហ័ស",
    privacyPolicy: "គោលការណ៍ឯកជនភាព",
    termsOfService: "លក្ខខណ្ឌនៃសេវាកម្ម",
    allRightsReserved: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    showMore: "បង្ហាញបន្ថែម",
    loading: "កំពុងផ្ទុក...",
    all: "ទាំងអស់",
    projects: "គម្រោង",
    team: "ក្រុម",
    events: "ព្រឹត្តិការណ៍",
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
    address: "១២៣ ផ្លូវមេន ភ្នំពេញ កម្ពុជា",
    phone: "+៨៥៥ ៦៩ ៨៩៥ ៤៤៣",
    emailAddress: "yeungthott@gmail.com",
    teamCollaboration: "កិច្ចសហការក្រុម",
    fastDelivery: "ការដឹកជញ្ជូនរហ័ស",
    clearCommunication: "ការទំនាក់ទំនងច្បាស់លាស់",
    creativeSolutions: "ដំណោះស្រាយច្នៃប្រឌិត",
    foundedWithVision:
      "បង្កើតឡើងដោយមានចក្ខុវិស័យដើម្បីធ្វើឱ្យមានភាពខុសប្លែក YEUNG THOTT បានរីកចម្រើនពីក្រុមតូចមួយទៅជាអង្គការដែលរីកចម្រើន។ យើងជឿលើអំណាចនៃកិច្ចសហការភាពច្នៃប្រឌិតនិងការប្តេជ្ញាចិត្ត។",
    diverseTalents:
      "ក្រុមរបស់យើងបានប្រមូលផ្តុំទេពកោសល្យនិងទស្សនវិស័យផ្សេងៗគ្នា ដែលរួបរួមគ្នាដោយចំណង់ចំណូលចិត្តរួមសម្រាប់ភាពឧត្តមនិងនវានុវត្តន៍។",
    comprehensiveRange:
      "ស្វែងយល់ពីសេវាកម្មគ្រប់ជ្រុងជ្រោយរបស់យើងដែលត្រូវបានរចនាឡើងដើម្បីបំពេញតម្រូវការរបស់អ្នកនិងលើសពីការរំពឹងទុករបស់អ្នក។",
    likes: "ចូលចិត្ត",
    comments: "មតិ",
    shares: "ចែករំលែក",
  },
};

export function useTranslation(language: Language) {
  return {
    t: (key: TranslationKey) => translations[language][key] || key,
  };
}

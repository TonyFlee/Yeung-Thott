export type Language = "en" | "km";

type TranslationKey =
  | "nameweb"
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
  | "allRightsReserved"
  | "showMore"
  | "showLess"
  | "loading"
  | "all"
  | "project"
  | "team"
  | "events"
  | "sport"
  | "dashboard"
  | "address"
  | "phone"
  | "emailAddress"
  | "teamCollaboration"
  | "fastDelivery"
  | "clearCommunication"
  | "creativeSolutions"
  | "professionalServiceDescription"
  | "teamCollaborationDescription"
  | "fastDeliveryDescription"
  | "qualityAssuranceDescription"
  | "clearCommunicationDescription"
  | "creativeSolutionsDescription"
  | "foundedWithVision"
  | "diverseTalents"
  | "comprehensiveRange"
  | "prompt"
  | "likes"
  | "comments"
  | "shares"
  | "missionVisionTitle"
  | "missionText"
  | "visionText"
  | "excellence"
  | "excellenceDesc"
  | "innovation"
  | "innovationDesc"
  | "integrity"
  | "integrityDesc"
  | "teamwork"
  | "teamworkDesc"
  | "ourTeamImageAlt"
  | "ourStoryTitle"
  | "ourStoryP1"
  | "ourStoryP2"
  | "ourStoryP3"
  | "ourStoryP4"
  | "growthTimelineTitle"
  | "today"
  | "2025"
  | "timeline2025Title"
  | "timeline2025Desc"
  | "timeline2020Title"
  | "timeline2020Desc"
  | "timeline2022Title"
  | "timeline2022Desc"
  | "timelineTodayTitle"
  | "timelineTodayDesc"
  | "meetOurTeam"
  | "member1Name"
  | "member1Role"
  | "member1Desc"
  | "member2Name"
  | "member2Role"
  | "member2Desc"
  | "buymecoffee"
  | "buymecoffeeDesc";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    nameweb: "YEUNG THOTT",
    home: "Home",
    about: "About",
    gallery: "Gallery",
    updates: "Updates",
    contact: "Contact",
    welcomeTitle: "WELCOME TO YEUNG THOTT",
    welcomeSubtitle:
      "We're a passionate team of beginners, eager to learn and grow. Explore our journey and see how we're working hard to turn ideas into reality.",
    contactUs: "Contact Us",
    learnMore: "Learn More",
    professionalService: "Professional Service",
    qualityAssurance: "Quality Assurance",
    bilingualSupport: "Bilingual Support",
    aboutTitle: "About Us",
    aboutSubtitle:
      "We are a group of beginners who are passionate about learning and growing. Even though we’re just starting out, we’re committed to doing our best and making great things together.",
    ourStory: "Our Story",
    readMore: "Read More",
    whatWeOffer: "What We Offer",
    ourGallery: "Our Gallery",
    gallerySubtitle:
      "Explore our portfolio of work and see the quality and creativity we bring to every project.",
    viewFullGallery: "View Full Gallery",
    latestUpdates: "Latest Updates",
    updatesSubtitle:
      "Stay in touch with us! Follow our Facebook page for the latest news and updates.",
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
    showMore: "Show More",
    showLess: "Show Less",
    loading: "Loading...",
    all: "All",
    project: "Projects",
    team: "Team",
    events: "Events",
    sport: "Sport",
    dashboard: "Dashboard",
    address: "123 Main Street, Phnom Penh, Cambodia",
    phone: "+855 69 895 443",
    emailAddress: "yeungthott@gmail.com",
    teamCollaboration: "Team Collaboration",
    fastDelivery: "Fast Delivery",
    clearCommunication: "Clear Communication",
    creativeSolutions: "Creative Solutions",
    professionalServiceDescription: 
      "We do our best to offer great services that match what our clients need.",
    teamCollaborationDescription:
      "We always work together and help each other to get the best results.",
    fastDeliveryDescription:   
      "We try our best to finish projects on time, while still keeping the quality high.",
    qualityAssuranceDescription:  
        "We carefully check our work to make sure everything is done well.",
    clearCommunicationDescription:
      "We talk clearly and openly with our clients so everyone understands each other.",
    creativeSolutionsDescription:
      "We use creative thinking to find new and smart ways to solve problems.",
    foundedWithVision: "YEUNG THOTT started as a small group of friends with big dreams. At first, we didn’t have much—just our passion, curiosity, and the hope that we could create something meaningful. We didn’t come from professional backgrounds, but we believed that with enough effort, anyone can learn, improve, and make a difference.",
    diverseTalents: "At YEUNG THOTT, we welcome everyone with an open heart. We believe in growing together, helping one another, and building a future filled with hope, innovation, and positive change. Our story is just beginning, and we’re excited for what lies ahead.",
    comprehensiveRange: "Take a look at all the services we offer. We’ve created them to fit your needs and hopefully give you even more than you expected.",
    prompt: "Preserving life’s most beautiful moments through the lens. Let’s turn your memories into timeless art.📸🍃",
    likes: "Likes",
    comments: "Comments",
    shares: "Shares",
    missionVisionTitle: "Our Mission & Vision",
    missionText: "At YEUNG THOTT, our mission is to do our best and create great results that make our clients happy. We always focus on new ideas, good quality, and making sure people are satisfied with our work.",
    visionText: "We hope to become a well-known and trusted team. We want people to know us for our hard work, creative thinking, and the good things we bring to our clients and our community.",
    excellence: "Excellence",
    excellenceDesc: "We always try to do our best in everything we do.",
    innovation: "Innovation",
    innovationDesc: "We like to try new ideas and find smart, creative solutions.",
    integrity: "Integrity",
    integrityDesc: "We are honest and open in the way we work.",
    teamwork: "Teamwork",
    teamworkDesc: "We work together and help each other to reach our goals.",
    ourTeamImageAlt: "Our Team",
    ourStoryTitle: "Our Story",
    ourStoryP1: "YEUNG THOTT started as a small group of friends with big dreams. At first, we didn’t have much—just our passion, curiosity, and the hope that we could create something meaningful. We didn’t come from professional backgrounds, but we believed that with enough effort, anyone can learn, improve, and make a difference.",
    ourStoryP2: "In the beginning, we faced many challenges. We made mistakes, learned new skills, and supported each other through every step. Slowly, our small team started to grow, and so did our vision. What began as a simple idea has now become a journey we are truly proud of.",
    ourStoryP3: "We believe that teamwork, creativity, and dedication can build something special. That’s why we always push ourselves to be better every day. Even though we’re still beginners in many ways, we are passionate learners, and we are not afraid to take risks or try new things.",
    ourStoryP4: "At YEUNG THOTT, we welcome everyone with an open heart. We believe in growing together, helping one another, and building a future filled with hope, innovation, and positive change. Our story is just beginning, and we’re excited for what lies ahead.",
    growthTimelineTitle: "Our Growth Timeline",
    today: "Today",
    2025: "2025",
    timeline2025Title: "2025: The Beginning",
    timeline2025Desc: "YEUNG THOTT was founded with a small team of dedicated professionals, starting on January 21, 2025.",
    timeline2020Title: "2020: Expansion",
    timeline2020Desc: "We expanded our team and services to meet growing demand.",
    timeline2022Title: "2022: Innovation",
    timeline2022Desc: "We introduced new innovative approaches and technologies to our work.",
    timelineTodayTitle: "Today: Looking Forward",
    timelineTodayDesc: "We continue to grow and evolve, always focused on delivering excellence.",
    meetOurTeam: "Meet Our Team",
    member1Name: "Uth David",
    member1Role: "Photographer & Color Grader",
    member1Desc: "Uth David is a passionate professional with expertise in photography and color grading. His dedication to creativity and precision allows him to deliver exceptional visual results. With a strong eye for detail, he plays a key role in producing high-quality, innovative work.",
    member2Name: "Torn Visal",
    member2Role: "Social Media Manager",
    member2Desc: "Torn Visal is a skilled social media manager with a knack for creating engaging content and building online communities. His strategic approach to social media helps connect our brand with our audience, ensuring that our message resonates and reaches the right people.",
    buymecoffee: "Buy Me a Coffee",
    buymecoffeeDesc: "Enjoying my work? A coffee would really help me keep going and create more awesome content. Your support means a lot! ☕❤️",
  },
  km: {
    nameweb: "យើងថត",
    home: "ទំព័រដើម",
    about: "អំពីយើង",
    gallery: "វិចិត្រសាល",
    updates: "ព័ត៌មានថ្មីៗ",
    contact: "ទំនាក់ទំនង",
    welcomeTitle: "សូមស្វាគមន៍មកកាន់ YEUNG THOTT",
    welcomeSubtitle:
      "ពួកយើងគឺជាក្រុមដ៏ស្មោះត្រង់នៃអ្នកចាប់ផ្ដើមដែលពេញដោយក្តីស្រមៃ និងការខិតខំប្រឹងប្រែង។ សូមរុករកដំណើររបស់ពួកយើង ហើយមើលថាពួកយើងកំពុងបំផ្លាញគំនិតទៅជាការពិតយ៉ាងដូចម្តេច។",
    contactUs: "ទាក់ទងមកយើង",
    learnMore: "ស្វែងយល់បន្ថែម",
    professionalService: "សេវាកម្មជំនាញ",
    qualityAssurance: "ការធានាគុណភាព",
    bilingualSupport: "ការគាំទ្រពីរភាសា",
    aboutTitle: "អំពីពួកយើង",
    aboutSubtitle:
      "ពួកយើងគឺជាក្រុមអ្នកចាប់ផ្ដើមដែលមានចិត្តស្រឡាញ់ក្នុងការស្វែងយល់ និងអភិវឌ្ឍខ្លួនឯង។ ទោះបីជាពួកយើងទើបចាប់ផ្ដើមក៏ដោយ ពួកយើងក៏សង្ឃឹមថានឹងធ្វើអោយបានល្អបំផុត និងបង្កើតអ្វីថ្មីៗជាមួយគ្នា។",
    ourStory: "រឿងរ៉ាវរបស់យើង",
    readMore: "អានបន្ថែម",
    whatWeOffer: "អ្វីដែលយើងផ្តល់ជូន",
    ourGallery: "វិចិត្រសាលរបស់យើង",
    gallerySubtitle:
      "រុករកសមិទ្ធិផលការងាររបស់យើងហើយមើលគុណភាពនិងភាពច្នៃប្រឌិតដែលយើងនាំមកគ្រប់គម្រោង។",
    viewFullGallery: "មើលវិចិត្រសាលទាំងមូល",
    latestUpdates: "ព័ត៌មានថ្មីៗបំផុត",
    updatesSubtitle:
      "តាមដានព័ត៌មានថ្មីៗ និងការអាប់ដេតពីយើងតាមរយៈទំព័រហ្វេសប៊ុករបស់យើង។",
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
    showLess: "បង្ហាញតិចជាងនេះ",
    loading: "កំពុងផ្ទុក...",
    all: "ទាំងអស់",
    project: "គម្រោង",
    team: "ក្រុម",
    events: "ព្រឹត្តិការណ៍",
    sport: "កីឡា",
    dashboard: "ផ្ទាំងគ្រប់គ្រង",
    address: "១២៣ ផ្លូវមេន ភ្នំពេញ កម្ពុជា",
    phone: "+៨៥៥ ៦៩ ៨៩៥ ៤៤៣",
    emailAddress: "yeungthott@gmail.com",
    teamCollaboration: "កិច្ចសហការក្រុម",
    fastDelivery: "ការដឹកជញ្ជូនរហ័ស",
    clearCommunication: "ការទំនាក់ទំនងច្បាស់លាស់",
    creativeSolutions: "ដំណោះស្រាយច្នៃប្រឌិត",
    professionalServiceDescription:
      "ពួកយើងខិតខំផ្តល់សេវាកម្មល្អៗដែលសមរម្យនឹងតំរូវការរបស់អតិថិជន។",
    teamCollaborationDescription:
      "ក្រុមរបស់យើងធ្វើការរួមគ្នាដោយសាមគ្គី ដើម្បីឱ្យបានលទ្ធផលល្អបំផុតសម្រាប់អតិថិជន។",
    fastDeliveryDescription:
      "ពួកយើងមានមោទនភាពក្នុងការសម្រេចគម្រោងឱ្យទាន់ពេលវេលា ដោយមិនបាត់បង់គុណភាពឡើយ។",
    qualityAssuranceDescription:
      "ពួកយើងមានការត្រួតពិនិត្យគុណភាពយ៉ាងម៉ឹងម៉ាត់ ដើម្បីធានាថាសេវាកម្មមានគុណភាពខ្ពស់។",
    clearCommunicationDescription:
      "ពួកយើងរក្សាការទំនាក់ទំនងបើកចំហជាមួយអតិថិជន ដើម្បីឱ្យមានការយល់ដឹងគ្នាដោយច្បាស់។",
    creativeSolutionsDescription:
      "ពួកយើងប្រើស្នាដៃច្នៃប្រឌិតក្នុងគម្រោងទាំងអស់ ដើម្បីរកដំណោះស្រាយដែលខុសពីគេ។",
    foundedWithVision:
      "យើងថត ត្រូវបានបង្កើតឡើងដោយក្រុមមិត្តភក្តិតិចនាក់មួយដែលមានសុបិន្ដធំ។ ចាប់ផ្ដើមពីគ្មានអ្វីច្រើនទេ មានតែចំណង់ចំណូលចិត្ត ការចង់រៀន និងការស្រមៃថា ពួកយើងអាចបង្កើតអ្វីមួយមានអត្ថន័យបាន។ ទោះបីជាពួកយើងមិនមែនជាអ្នកមានបទពិសោធន៍វិជ្ជាជីវៈក៏ដោយ ប៉ុន្តែពួកយើងជឿថា ប្រសិនបើខិតខំគ្រប់គ្នាអាចរៀន និងអភិវឌ្ឍខ្លួនបាន។",
    diverseTalents:
      "នៅ យើងថត ពួកយើងស្វាគមន៍គ្រប់គ្នាដោយបេះដូងបើកចំហ។ ពួកយើងជឿថាការលូតលាស់រួមគ្នា ការជួយស្របគ្នា និងការបង្កើតអនាគតដ៏ភ្លឺចាំងគឺជាភាពស្រស់ស្រាយនៃដំណើររបស់យើង។ រឿងរ៉ាវរបស់ពួកយើងទើបតែចាប់ផ្ដើម ហើយពួកយើងរីករាយក្នុងអនាគតមុខ។",
    comprehensiveRange:
      "សូមស្វែងរកសេវាកម្មនានារបស់យើងដែលត្រូវបានរៀបចំឡើងដើម្បីបំពេញតំរូវការរបស់អ្នក និងផ្តល់អ្វីៗល្អជាងដែលអ្នករំពឹងទុក។",
    prompt:
      "រក្សាទុកពេលវេលាដ៏ស្រស់ស្អាតបំផុតរបស់ជីវិតតាមរយៈកញ្ចក់។ យើងមកដល់ដើម្បីបំលែងអនុស្សាវរីយ៍របស់អ្នកឱ្យទៅជាសិល្បៈដែលគ្មានកាលកំណត់។📸🍃",
    likes: "ចូលចិត្ត",
    comments: "មតិ",
    shares: "ចែករំលែក",
    missionVisionTitle: "បេសកកម្ម និងចក្ខុវិស័យរបស់យើង",
    missionText: "នៅ យើងថត បេសកកម្មរបស់យើងគឺខិតខំធ្វើអោយបានល្អបំផុត និងបង្កើតលទ្ធផលល្អៗ ដែលអាចឆ្លងលើសពីការរំពឹងទុក។ ពួកយើងផ្តោតលើគំនិតថ្មីៗ គុណភាព និងការពេញចិត្តរបស់អតិថិជននៅក្នុងអ្វីៗគ្រប់យ៉ាង។",
    visionText: "ចក្ខុវិស័យរបស់យើងគឺក្លាយជាក្រុមដែលគេជឿជាក់ និងស្គាល់យ៉ាងល្អ។ ពួកយើងចង់ឱ្យមនុស្សស្គាល់យើងដោយសារការខិតខំ អត្ថិភាព និងអ្វីល្អៗដែលយើងធ្វើសម្រាប់អតិថិជន និងសហគមន៍។",
    excellence: "ភាពឧត្តម",
    excellenceDesc: "ពួកយើងតែងតែខិតខំធ្វើអោយបានល្អបំផុតក្នុងអ្វីៗទាំងអស់។",
    innovation: "នវានុវត្តន៍",
    innovationDesc: "ពួកយើងចូលចិត្តសាកល្បងគំនិតថ្មីៗ និងរកដំណោះស្រាយច្នៃប្រឌិត។",
    integrity: "ភាពស្មោះត្រង់",
    integrityDesc: "ពួកយើងធ្វើការជាមួយភាពស្មោះត្រង់ និងបើកចំហ។",
    teamwork: "ការធ្វើការជាក្រុម",
    teamworkDesc: "ពួកយើងធ្វើការជាក្រុម និងជួយគ្នាដើម្បីសម្រេចគោលបំណងរួម។",
    ourTeamImageAlt: "ក្រុមរបស់យើង",
    ourStoryTitle: "រឿងរ៉ាវរបស់យើង",
    ourStoryP1: "យើងថត ត្រូវបានបង្កើតឡើងដោយក្រុមមិត្តភក្តិតិចនាក់មួយដែលមានសុបិន្ដធំ។ ចាប់ផ្ដើមពីគ្មានអ្វីច្រើនទេ មានតែចំណង់ចំណូលចិត្ត ការចង់រៀន និងការស្រមៃថា ពួកយើងអាចបង្កើតអ្វីមួយមានអត្ថន័យបាន។ ទោះបីជាពួកយើងមិនមែនជាអ្នកមានបទពិសោធន៍វិជ្ជាជីវៈក៏ដោយ ប៉ុន្តែពួកយើងជឿថា ប្រសិនបើខិតខំគ្រប់គ្នាអាចរៀន និងអភិវឌ្ឍខ្លួនបាន។",
    ourStoryP2: "នៅដំណាក់កាលដំបូង ពួកយើងបានជួបបញ្ហាច្រើន។ ធ្វើខុសៗ រៀនចំណេះដឹងថ្មីៗ និងជួយគាំទ្រនឹងគ្នាទាំងអស់។ បន្តិចម្តងៗ ក្រុមតូចៗរបស់យើងចាប់ផ្ដើមរីកចម្រើន ហើយចក្ខុវិស័យក៏ធំធេងឡើងផងដែរ។ អ្វីដែលចាប់ផ្ដើមជាគំនិតតិចតួចឥឡូវនេះបានក្លាយជាដំណើរដែលពោរពេញដោយមោទនភាព។",
    ourStoryP3: "ពួកយើងជឿជាក់លើអាទិភាពនៃការធ្វើការជាក្រុម ការច្នៃប្រឌិត និងការខិតខំ។ ពួកយើងតែងតែខិតខំអោយខ្លួនប្រសើរឡើងជារៀងរាល់ថ្ងៃ។ ទោះបីជាពួកយើងនៅតែជាអ្នកចាប់ផ្ដើមក្នុងខ្លះៗក៏ដោយ ប៉ុន្តែពួកយើងជាអ្នកចង់រៀន និងមិនខ្លាចក្នុងការសាកល្បងអ្វីថ្មីៗឡើយ។",
    ourStoryP4: "នៅ យើងថត ពួកយើងស្វាគមន៍គ្រប់គ្នាដោយបេះដូងបើកចំហ។ ពួកយើងជឿថាការលូតលាស់រួមគ្នា ការជួយស្របគ្នា និងការបង្កើតអនាគតដ៏ភ្លឺចាំងគឺជាភាពស្រស់ស្រាយនៃដំណើររបស់យើង។ រឿងរ៉ាវរបស់ពួកយើងទើបតែចាប់ផ្ដើម ហើយពួកយើងរីករាយក្នុងអនាគតមុខ។",
    growthTimelineTitle: "កំណត់ពេលវេលាកំណើនរបស់យើង",
    today: "ថ្ងៃនេះ",
    2025: "២០២៥",
    timeline2025Title: "២០២៥៖ ការចាប់ផ្តើម",
    timeline2025Desc: "យើងថត ត្រូវបានបង្កើតឡើងដោយក្រុមតូចមួយនៃអ្នកជំនាញដែលមានចិត្តស្មោះត្រង់ នៅថ្ងៃទី ២១ ខែមករា ឆ្នាំ ២០២៥។",
    timeline2020Title: "២០២០៖ ការពង្រីក",
    timeline2020Desc: "យើងបានពង្រីកក្រុម និងសេវាកម្មរបស់យើងដើម្បីបំពេញតម្រូវការកាន់តែច្រើន។",
    timeline2022Title: "២០២២៖ នវានុវត្តន៍",
    timeline2022Desc: "យើងបានណែនាំវិធីសាស្រ្ត និងបច្ចេកវិទ្យាថ្មីៗដល់ការងាររបស់យើង។",
    timelineTodayTitle: "ថ្ងៃនេះ៖ មើលទៅមុខ",
    timelineTodayDesc: "ពួកយើងបន្តលូតលាស់ និងអភិវឌ្ឍ តែងតែផ្តោតលើការផ្តល់លទ្ធផលល្អបំផុត។",
    meetOurTeam: "ស្គាល់ក្រុមរបស់យើង",
    member1Name: "អ៊ុត ដាវីត",
    member1Role: "អ្នកថតរូប និងអ្នកធ្វើក្រុមពណ៌",
    member1Desc: "អ៊ុត ដាវីត គឺជាអ្នកជំនាញមានចិត្តស្មោះត្រង់ក្នុងវិស័យថតរូប និងការកែពណ៌។ ការខិតខំរបស់គាត់ក្នុងការច្នៃប្រឌិត និងភាពត្រឹមត្រូវអនុញ្ញាតឱ្យគាត់ផ្តល់លទ្ធផលវិចិត្រសិល្ប៍ល្អឥតខ្ចោះ។ មានការយល់ឃើញច្បាស់ពីលម្អិត គាត់មានតួនាទីសំខាន់ក្នុងការផ្តល់ការងារដែលមានគុណភាពខ្ពស់ និងច្នៃប្រឌិត។",
    member2Name: "ទន វិសាល",
    member2Role: "អ្នកគ្រប់គ្រងទំព័រ និងអ្នកបង្កើតមាតិកា",
    member2Desc: "ទន វិសាល គឺកំពុងស្ថិតនៅដំណាក់កាលដំបូងនៃអាជីពរបស់គាត់ក្នុងការគ្រប់គ្រងទំព័រហ្វេសប៊ុក និងគេហទំព័រ។ និងធ្វើការផ្សព្វផ្សាយរូបភាពជាប្រចាំ ដើម្បីធានាថាការងាររបស់ក្រុមបានឈានទៅកាន់អ្នកទស្សនាកាន់តែមានអារម្មណ៍ល្អ។ ហើយផ្តោតលើការស្វែងរក និងការលូតលាស់ នៅក្នុងការរក្សាទំនាក់ទំនងអនឡាញសកម្ម។",
    buymecoffee: "ជួយគាំទ្រយើង",
    buymecoffeeDesc: "រីករាយនឹងការងាររបស់ខ្ញុំ? កាហ្វេពិតជាអាចជួយខ្ញុំបន្ត និងបង្កើតខ្លឹមសារដ៏អស្ចារ្យបន្ថែមទៀត។ ការគាំទ្ររបស់អ្នកមានន័យច្រើន! ☕❤️"  
  },
};

export function useTranslation(language: Language) {
  return {
    t: (key: TranslationKey) => translations[language][key] || key,
  };
}

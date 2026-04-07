import type { Locale } from "@/lib/i18n";

export const brandAssets = {
  logo: "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/LOGO-removebg-preview.png",
  heroPrimary:
    "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/construction-1.jpg",
  heroSecondary:
    "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/construction-site-with-building-cranes.jpg",
  aboutFeature:
    "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/modern-curved-glass-building-exterior.jpg",
} as const;

export const siteCopy = {
  nav: {
    brand: "AYDINER CONSTRUCTION",
    contactCta: {
      tr: "Bize Ulaşın",
      en: "Get in Touch",
    },
    links: {
      tr: [
        { label: "Ana Sayfa", href: "#home" },
        { label: "Hakkımızda", href: "#about" },
        { label: "Hizmetler", href: "#services" },
        { label: "Projeler", href: "#projects" },
        { label: "Süreç", href: "#process" },
        { label: "İletişim", href: "#contact" },
      ],
      en: [
        { label: "Homepage", href: "#home" },
        { label: "About Us", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "#projects" },
        { label: "Process", href: "#process" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  },
  hero: {
    eyebrow: {
      tr: "geleceği inşa ediyoruz",
      en: "building the future",
    },
    title: {
      tr: "Geçmişi onarıyoruz.",
      en: "We repair the past.",
    },
    text: {
      tr: "Yenilik yaklaşımımız sayesinde üstlendiğimiz her projede en yeni teknolojiyi ve sürdürülebilir uygulamaları kullanıyoruz. Yaratıcılığı hassas mühendislikle birleştiriyoruz.",
      en: "Our commitment to innovation enables us to use the latest technology and sustainable applications in every project we undertake. We blend creativity with precision engineering.",
    },
    explore: {
      tr: "Projelerimizi İnceleyin",
      en: "Examine Our Projects",
    },
    talk: {
      tr: "İletişime Geçin",
      en: "Contact Us",
    },
    cards: {
      tr: [
        {
          title: "Odak",
          text: "Konut, eğitim ve havacılık yapıları",
        },
        {
          title: "Uzmanlık",
          text: "Kalite, koordinasyon ve teslim disiplini",
        },
        {
          title: "Yaklaşım",
          text: "Teknoloji, sürdürülebilirlik ve hassas mühendislik",
        },
      ],
      en: [
        {
          title: "Focus",
          text: "Residential, education, and aviation structures",
        },
        {
          title: "Expertise",
          text: "Quality, coordination, and delivery discipline",
        },
        {
          title: "Approach",
          text: "Technology, sustainability, and precision engineering",
        },
      ],
    },
    liveMap: {
      tr: "Canlı Proje Haritası",
      en: "Live Project Map",
    },
  },
  stats: {
    tr: [
      { value: "25+", label: "Profesyonel Ekip" },
      { value: "20+", label: "Yıllık Deneyim" },
      { value: "59", label: "Referans Proje" },
      { value: "100%", label: "Müşteri Odağı" },
    ],
    en: [
      { value: "25+", label: "Professionals in Our Team" },
      { value: "20+", label: "Annual Experience" },
      { value: "59", label: "Completed References" },
      { value: "100%", label: "Customer Focus" },
    ],
  },
  about: {
    eyebrow: { tr: "Hakkımızda", en: "About Us" },
    title: {
      tr: "İnşaat sektörüne kalite ve hassasiyetle liderlik ediyoruz.",
      en: "We lead the construction industry with quality and precision.",
    },
    text1: {
      tr: "Aydıner Construction olarak yalnızca yapılar inşa etmiyor; yenilik ve hassasiyetle alanları dönüştüren vizyoner bir yaklaşım sunuyoruz. 20 yılı aşkın süredir gökdelenlerden konut projelerine kadar birçok alanda kalite ve detay odağıyla çalışıyoruz.",
      en: "Aydiner Construction is more than just a builder. We are visionaries dedicated to transforming spaces with innovation and precision. For more than 20 years, we have worked on projects ranging from skyscrapers to housing developments with a strong focus on quality and detail.",
    },
    text2: {
      tr: "Deneyimli mühendislerimiz ve modern teknolojimiz sayesinde projeleri baştan sona yönetebilir, zorluklara sahada çözüm üretebilir ve dayanıklı sonuçlar sağlayabiliriz.",
      en: "With experienced engineers and modern technology, we can guide projects from start to finish, solve challenges on site, and deliver durable results.",
    },
    panelTitle: {
      tr: "Deneyimli mühendisler",
      en: "Experienced engineers",
    },
    panelText: {
      tr: "Bilgi ve pratik beceri, ekiplerimizin projeleri baştan sona zorluklarla baş ederek yönetmesini sağlar.",
      en: "Knowledge and practical skills enable our teams to cope with challenges from start to finish.",
    },
    leftStats: {
      tr: [
        "kalite ve detay odağıyla şekillenen sektör deneyimi.",
        "modern teknoloji ve saha organizasyonuyla desteklenen aktif proje yaklaşımı.",
      ],
      en: [
        "years of sector experience shaped by quality and attention to detail.",
        "an active project approach supported by modern technology and site organization.",
      ],
    },
    clarityTitle: {
      tr: "Modern teknoloji",
      en: "Modern technology",
    },
    clarityText: {
      tr: "Güncel araçlar ve yazılımlar ekiplerimizin süreçleri kolaylaştırarak daha kontrollü teslimat yapmasını sağlar.",
      en: "State-of-the-art tools and software help our teams simplify processes and deliver with better control.",
    },
    disciplineTitle: {
      tr: "Kalite güvencesi",
      en: "Quality assurance",
    },
    disciplineText: {
      tr: "Her aşamada kaliteyi önceliklendirir, güven veren ve uzun ömürlü yapılar ortaya koyarız.",
      en: "We prioritize quality at every stage and deliver structures that build trust and long-term confidence.",
    },
    references: {
      tr: "Projelerimiz",
      en: "Our Projects",
    },
    services: {
      tr: "Hizmetlerimiz",
      en: "What We Do",
    },
  },
  services: {
    eyebrow: { tr: "Neler Yapıyoruz?", en: "What are We Doing?" },
    title: {
      tr: "Başlangıçtan sona kalite sunuyoruz.",
      en: "We offer quality from start to finish.",
    },
    items: {
      tr: [
        {
          title: "Renovasyon",
          short: "Mekânları işlev ve estetik açısından dönüştüren yenileme çözümleri.",
          detail:
            "Alanları daha kullanışlı, dayanıklı ve çağdaş hale getirmek için hassas saha organizasyonu ve yaratıcı uygulama yaklaşımını birlikte kullanıyoruz.",
        },
        {
          title: "Sürdürülebilir Yapı",
          short: "Çevreye duyarlı uygulamalar ve malzemelerle uzun ömürlü yapılar.",
          detail:
            "Malzeme seçiminden saha uygulamasına kadar daha verimli ve çevreye duyarlı sonuçlar hedefliyoruz.",
        },
        {
          title: "İnşaat Yönetimi",
          short: "Planlama aşamasından tamamlamaya kadar proje yönetimi desteği.",
          detail:
            "Uzman kadromuzla zamanlama, saha koordinasyonu, kalite takibi ve uygulama süreçlerini bütüncül şekilde yönetiyoruz.",
        },
        {
          title: "Konut Yapıları",
          short: "Konfor, stil ve işlevselliği bir araya getiren özel konut çözümleri.",
          detail:
            "Konut projelerinde yaşam kalitesini artıran, dayanıklı ve estetik yapılar oluşturmak için teknik ve mimari süreçleri birlikte yönetiyoruz.",
        },
      ],
      en: [
        {
          title: "Renovation",
          short: "Transformation solutions that improve functionality and style.",
          detail:
            "We transform spaces with precision and creativity to improve usability, durability, and design quality.",
        },
        {
          title: "Sustainable building",
          short: "Environmentally friendly applications and materials for long-term structures.",
          detail:
            "We implement environmentally responsible practices and material choices to create more sustainable structures.",
        },
        {
          title: "Construction Management",
          short: "Project management support from planning through completion.",
          detail:
            "With our expert staff, we manage planning, site coordination, quality follow-up, and execution control in an integrated way.",
        },
        {
          title: "Residential building",
          short: "Specially built homes that combine comfort, style, and functionality.",
          detail:
            "We coordinate technical and architectural aspects of residential projects to create durable, livable, and refined spaces.",
        },
      ],
    },
  },
  process: {
    eyebrow: { tr: "Nasıl Çalışıyoruz?", en: "How Do We Work?" },
    title: {
      tr: "Projenizin bizimle yolculuğu",
      en: "The journey of your project with us",
    },
    steps: {
      tr: [
        {
          title: "Planlama ve Tasarım",
          text: "İlk aşamada proje ihtiyaçları ve hedefleri tanımlanır; mimari planlar, mühendislik çizimleri ve proje özellikleri geliştirilir.",
        },
        {
          title: "İzin ve Onay",
          text: "Yerel otoritelerden gerekli izinler alınır; yapı yönetmelikleri, mevzuat ve imar gereklilikleriyle uyum sağlanır.",
        },
        {
          title: "Saha Hazırlığı ve Temizlik",
          text: "Mevcut yapılar, bitki örtüsü veya engeller temizlenerek inşaat faaliyetleri için saha hazırlanır.",
        },
        {
          title: "Temel ve Kazı",
          text: "Yapı için sağlam bir temel oluşturulur; zemin hazırlığı, kazılar ve gerekli temel imalatları yürütülür.",
        },
        {
          title: "Teslim ve Tamamlama",
          text: "Son kontroller, teslim hazırlıkları ve kalite güvence adımları tamamlanarak proje kapanışı gerçekleştirilir.",
        },
      ],
      en: [
        {
          title: "Planning and design",
          text: "In this initial stage, project requirements and objectives are defined and the design concept is developed, including architectural plans, engineering drawings, and project features.",
        },
        {
          title: "Permission and approval",
          text: "This stage includes obtaining the necessary permissions and approvals from local authorities and ensuring compliance with building codes, regulations, and zoning requirements.",
        },
        {
          title: "Field preparation and cleaning",
          text: "The construction site is prepared by clearing existing structures, vegetation, or obstacles for the start of construction activities.",
        },
        {
          title: "Foundation and excavation",
          text: "The foundation is built and a solid base is provided for the structure. Excavations are carried out to prepare the ground and create the necessary trenches and foundations.",
        },
        {
          title: "Delivery and completion",
          text: "Final checks, handover preparation, and quality assurance steps are completed as the project moves toward closeout.",
        },
      ],
    },
  },
  projects: {
    eyebrow: { tr: "Projelerimiz", en: "Our Projects" },
    title: {
      tr: "Öne çıkan proje referanslarımız",
      en: "We build dreams in a project",
    },
    mapHint: {
      tr: "Referans projeleri harita üzerinde gerçek lokasyonlarına yakın yerleşimlerle inceleyin.",
      en: "Explore the reference projects on the map with placements aligned to their real locations.",
    },
  },
  faq: {
    eyebrow: { tr: "S.S.S.", en: "S.S.S." },
    title: {
      tr: "Sık Sorulan Sorular",
      en: "Frequently Asked Questions",
    },
    items: {
      tr: [
        {
          title: "Aydıner İnşaat hangi alanlarda hizmet verir?",
          text: "Aydıner Construction; konut, ticari yapılar, altyapı projeleri ve kentsel dönüşüm alanlarında anahtar teslim çözümler sunar. Projelendirme aşamasından teslimata kadar tüm süreçleri yönetir.",
        },
        {
          title: "Projelerinizde hangi kalite standartlarını uyguluyorsunuz?",
          text: "Tüm projelerimizde TSE ve ISO kalite standartlarına uygun malzeme ve işçilik kullanılır. Güvenlik, dayanıklılık ve estetik her işimizin temel öncelikleridir.",
        },
        {
          title: "Devam eden projelerinizi nasıl takip edebilirim?",
          text: "Güncel projeleri web sitemiz ve sosyal medya hesaplarımız üzerinden takip edebilir, ayrıca iletişim kanallarımız üzerinden detaylı bilgi talep edebilirsiniz.",
        },
        {
          title: "Kentsel dönüşüm projelerinde hizmet veriyor musunuz?",
          text: "Evet. Ruhsatlı kentsel dönüşüm danışmanlığı ve uygulama hizmetleri sunuyor, başvuru sürecinden inşaatın tamamlanmasına kadar destek veriyoruz.",
        },
      ],
      en: [
        {
          title: "In which areas does Aydiner Construction serve?",
          text: "Aydiner Construction offers turnkey solutions in residential, commercial buildings, infrastructure projects, and urban transformation areas. It manages all processes from the project phase to turnkey delivery.",
        },
        {
          title: "What quality standards do you apply in your projects?",
          text: "In all our projects, materials and workmanship in accordance with TSE and ISO quality standards are used. Safety, durability, and aesthetics are the main priorities of every project.",
        },
        {
          title: "How can I track your ongoing projects?",
          text: "You can follow our current projects and review developments regularly on our website and social media accounts. You can also request detailed information through our contact channels.",
        },
        {
          title: "Do you provide services in urban transformation projects?",
          text: "Yes, as Aydiner Construction, we offer licensed urban transformation consultancy and implementation services from application through completion.",
        },
      ],
    },
  },
  contact: {
    eyebrow: { tr: "İletişim", en: "Contact" },
    title: {
      tr: "Birlikte büyük projeler inşa edelim!",
      en: "Let's Build Great Projects Together!",
    },
    text: {
      tr: "Bugün bizimle iletişime geçin ve hayalinizdeki inşaat projesine doğru yolculuğunuza başlayın.",
      en: "Contact us today and start your journey toward the construction project of your dreams!",
    },
    start: { tr: "İletişime Geç", en: "Contact Us" },
    review: { tr: "Projeleri İncele", en: "Review Projects" },
    officeLabel: { tr: "Ofis", en: "Office" },
    officeValue: {
      tr: "Altayçeşme Mahallesi Çam Sokak No:16, Dap Royal Center D Blok Kat:9 Ofis No:41, Maltepe / İstanbul",
      en: "Altaycesme Mahallesi Cam Sokak No:16, Dap Royal Center D Block Floor:9 Office:41, Maltepe / Istanbul",
    },
    availability: {
      tr: "Telefon: (0216) 309 16 46 | E-posta: info@aydinerinsaat.com.tr",
      en: "Phone: (0216) 309 16 46 | Email: info@aydinerinsaat.com.tr",
    },
  },
  footer: {
    text: {
      tr: "Yalnızca yapılar inşa etmiyoruz; gelecek nesiller için sağlam temeller atıyoruz.",
      en: "We don’t just build structures — we lay solid foundations for future generations.",
    },
    contact: { tr: "İletişim", en: "Contact Information" },
    links: { tr: "Hızlı Linkler", en: "Quick Link" },
    copyright: {
      tr: "© 2025 Aydıner İnşaat. Tüm hakları saklıdır.",
      en: "© 2025 Aydiner Construction. All rights reserved.",
    },
  },
  projectDetail: {
    back: { tr: "Ana Sayfaya Dön", en: "Back to Homepage" },
    status: { tr: "Durum", en: "Status" },
    latitude: { tr: "Enlem", en: "Latitude" },
    longitude: { tr: "Boylam", en: "Longitude" },
    category: { tr: "Kategori", en: "Category" },
    overview: { tr: "Proje Özeti", en: "Project Overview" },
    overviewText: {
      tr: "Bu referans, uygulama kapsamı, saha koordinasyonu ve teslim disiplini açısından Aydıner Construction yaklaşımını özetler.",
      en: "This reference summarizes the Aydiner Construction approach in terms of execution scope, site coordination, and delivery discipline.",
    },
    scope: { tr: "Kapsam Başlıkları", en: "Scope Highlights" },
    metrics: { tr: "Proje Metrikleri", en: "Project Metrics" },
    yearText: {
      tr: "Yıl bilgisi:",
      en: "Year reference:",
    },
    yearTail: {
      tr: "Detaylı galeri, aşama fotoğrafları ve ek dokümantasyon bu şablona sonradan eklenebilir.",
      en: "Detailed galleries, milestone photos, and supporting documentation can be added to this template later.",
    },
  },
} satisfies Record<string, unknown>;

export function getSiteCopy(locale: Locale) {
  return {
    nav: {
      brand: siteCopy.nav.brand,
      contactCta: siteCopy.nav.contactCta[locale],
      links: siteCopy.nav.links[locale],
    },
    hero: {
      eyebrow: siteCopy.hero.eyebrow[locale],
      title: siteCopy.hero.title[locale],
      text: siteCopy.hero.text[locale],
      explore: siteCopy.hero.explore[locale],
      talk: siteCopy.hero.talk[locale],
      cards: siteCopy.hero.cards[locale],
      liveMap: siteCopy.hero.liveMap[locale],
    },
    stats: siteCopy.stats[locale],
    about: {
      eyebrow: siteCopy.about.eyebrow[locale],
      title: siteCopy.about.title[locale],
      text1: siteCopy.about.text1[locale],
      text2: siteCopy.about.text2[locale],
      panelTitle: siteCopy.about.panelTitle[locale],
      panelText: siteCopy.about.panelText[locale],
      leftStats: siteCopy.about.leftStats[locale],
      clarityTitle: siteCopy.about.clarityTitle[locale],
      clarityText: siteCopy.about.clarityText[locale],
      disciplineTitle: siteCopy.about.disciplineTitle[locale],
      disciplineText: siteCopy.about.disciplineText[locale],
      references: siteCopy.about.references[locale],
      services: siteCopy.about.services[locale],
    },
    services: {
      eyebrow: siteCopy.services.eyebrow[locale],
      title: siteCopy.services.title[locale],
      items: siteCopy.services.items[locale],
    },
    process: {
      eyebrow: siteCopy.process.eyebrow[locale],
      title: siteCopy.process.title[locale],
      steps: siteCopy.process.steps[locale],
    },
    projects: {
      eyebrow: siteCopy.projects.eyebrow[locale],
      title: siteCopy.projects.title[locale],
      mapHint: siteCopy.projects.mapHint[locale],
    },
    faq: {
      eyebrow: siteCopy.faq.eyebrow[locale],
      title: siteCopy.faq.title[locale],
      items: siteCopy.faq.items[locale],
    },
    contact: {
      eyebrow: siteCopy.contact.eyebrow[locale],
      title: siteCopy.contact.title[locale],
      text: siteCopy.contact.text[locale],
      start: siteCopy.contact.start[locale],
      review: siteCopy.contact.review[locale],
      officeLabel: siteCopy.contact.officeLabel[locale],
      officeValue: siteCopy.contact.officeValue[locale],
      availability: siteCopy.contact.availability[locale],
    },
    footer: {
      text: siteCopy.footer.text[locale],
      contact: siteCopy.footer.contact[locale],
      links: siteCopy.footer.links[locale],
      copyright: siteCopy.footer.copyright[locale],
    },
    projectDetail: {
      back: siteCopy.projectDetail.back[locale],
      status: siteCopy.projectDetail.status[locale],
      latitude: siteCopy.projectDetail.latitude[locale],
      longitude: siteCopy.projectDetail.longitude[locale],
      category: siteCopy.projectDetail.category[locale],
      overview: siteCopy.projectDetail.overview[locale],
      overviewText: siteCopy.projectDetail.overviewText[locale],
      scope: siteCopy.projectDetail.scope[locale],
      metrics: siteCopy.projectDetail.metrics[locale],
      yearText: siteCopy.projectDetail.yearText[locale],
      yearTail: siteCopy.projectDetail.yearTail[locale],
    },
  };
}

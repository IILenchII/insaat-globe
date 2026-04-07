import { getLocalizedText, type Locale, type LocalizedText } from "@/lib/i18n";

type MetricKey = "area" | "duration" | "scope" | "employer" | "status";
type MetricTuple = [MetricKey, string, string];

type ProjectMetric = {
  label: LocalizedText;
  value: LocalizedText;
};

export type Project = {
  slug: string;
  name: LocalizedText;
  country: LocalizedText;
  city: LocalizedText;
  lat: number;
  lon: number;
  status: LocalizedText;
  category: LocalizedText;
  year: string;
  summary: LocalizedText;
  scope: LocalizedText[];
  metrics: ProjectMetric[];
  images: string[];
  primaryImage: string;
};

const METRIC_LABELS: Record<MetricKey, LocalizedText> = {
  area: { tr: "İnşaat Alanı", en: "Construction Area" },
  duration: { tr: "İş Süresi", en: "Job Duration" },
  scope: { tr: "İş Kapsamı", en: "Scope of Work" },
  employer: { tr: "İşveren", en: "Employer" },
  status: { tr: "İş Durumu", en: "Job Status" },
};

const STATUS_LABELS = {
  completed: { tr: "Tamamlandı", en: "Completed" },
  ongoing: { tr: "Devam Ediyor", en: "Ongoing" },
} as const;

const CATEGORY_LABELS = {
  aviation: { tr: "Havacılık Yapısı", en: "Aviation Facility" },
  commercial: { tr: "Ticari Yapı", en: "Commercial Building" },
  education: { tr: "Eğitim Yapısı", en: "Education Facility" },
  healthcare: { tr: "Sağlık Yapısı", en: "Healthcare Facility" },
  hospitality: { tr: "Konaklama Yapısı", en: "Hospitality Project" },
  industrial: { tr: "Endüstriyel Tesis", en: "Industrial Facility" },
  infrastructure: { tr: "Altyapı Projesi", en: "Infrastructure Project" },
  logistics: { tr: "Lojistik Yapısı", en: "Logistics Facility" },
  public: { tr: "Kamu Yapısı", en: "Public Building" },
  residential: { tr: "Konut Projesi", en: "Residential Project" },
  sports: { tr: "Spor Yapısı", en: "Sports Facility" },
} as const;

const FALLBACK_IMAGE =
  "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/construction-1.jpg";

const projectLocations = {
  "ashgabat-center": {
    city: { tr: "Aşkabat", en: "Ashgabat" },
    country: { tr: "Türkmenistan", en: "Turkmenistan" },
    lat: 37.9601,
    lon: 58.3261,
  },
  "ashgabat-hippodrome": {
    city: { tr: "Aşkabat / Hipodrom", en: "Ashgabat / Hippodrome" },
    country: { tr: "Türkmenistan", en: "Turkmenistan" },
    lat: 37.9104,
    lon: 58.3921,
  },
  "awaza-turkmenistan": {
    city: { tr: "Awaza", en: "Awaza" },
    country: { tr: "Türkmenistan", en: "Turkmenistan" },
    lat: 39.9742,
    lon: 52.8346,
  },
  "balikesir-akcay": {
    city: { tr: "Akçay / Balıkesir", en: "Akcay / Balikesir" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 39.5877,
    lon: 26.9327,
  },
  "doha-al-khor": {
    city: { tr: "Doha / Al Khor Koridoru", en: "Doha / Al Khor Corridor" },
    country: { tr: "Katar", en: "Qatar" },
    lat: 25.4279,
    lon: 51.4769,
  },
  "doha-duhail": {
    city: { tr: "Doha / Duhail", en: "Doha / Duhail" },
    country: { tr: "Katar", en: "Qatar" },
    lat: 25.3575,
    lon: 51.4537,
  },
  "gaziantep-sehitkamil": {
    city: { tr: "Gaziantep / Şehitkamil", en: "Gaziantep / Sehitkamil" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 37.0825,
    lon: 37.351,
  },
  "istanbul-airport": {
    city: { tr: "İstanbul Havalimanı", en: "Istanbul Airport" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.2753,
    lon: 28.7519,
  },
  "istanbul-arnavutkoy": {
    city: { tr: "İstanbul / Arnavutköy", en: "Istanbul / Arnavutkoy" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.1857,
    lon: 28.7418,
  },
  "istanbul-besiktas": {
    city: { tr: "İstanbul / Beşiktaş", en: "Istanbul / Besiktas" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0392,
    lon: 28.9947,
  },
  "istanbul-camlica": {
    city: { tr: "İstanbul / Çamlıca", en: "Istanbul / Camlica" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0272,
    lon: 29.0763,
  },
  "istanbul-cekmekoy": {
    city: { tr: "İstanbul / Çekmeköy", en: "Istanbul / Cekmekoy" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0334,
    lon: 29.1763,
  },
  "istanbul-dudullu": {
    city: { tr: "İstanbul / Dudullu", en: "Istanbul / Dudullu" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.9925,
    lon: 29.1667,
  },
  "istanbul-hadimkoy": {
    city: { tr: "İstanbul / Hadımköy", en: "Istanbul / Hadimkoy" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.1114,
    lon: 28.6508,
  },
  "istanbul-kartal": {
    city: { tr: "İstanbul / Kartal", en: "Istanbul / Kartal" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.8881,
    lon: 29.1856,
  },
  "istanbul-kucukkoy": {
    city: { tr: "İstanbul / Küçükköy", en: "Istanbul / Kucukkoy" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0749,
    lon: 28.8444,
  },
  "istanbul-maslak": {
    city: { tr: "İstanbul / Maslak", en: "Istanbul / Maslak" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.1084,
    lon: 29.0186,
  },
  "istanbul-ortakoy": {
    city: { tr: "İstanbul / Ortaköy", en: "Istanbul / Ortakoy" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0589,
    lon: 29.0362,
  },
  "istanbul-sile": {
    city: { tr: "İstanbul / Şile", en: "Istanbul / Sile" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.1749,
    lon: 29.6104,
  },
  "istanbul-silivri": {
    city: { tr: "İstanbul / Silivri", en: "Istanbul / Silivri" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0722,
    lon: 28.2479,
  },
  "istanbul-tuyap": {
    city: { tr: "İstanbul / Büyükçekmece", en: "Istanbul / Buyukcekmece" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0259,
    lon: 28.6242,
  },
  "istanbul-ucaksavar": {
    city: { tr: "İstanbul / Uçaksavar", en: "Istanbul / Ucaksavar" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0671,
    lon: 29.0348,
  },
  "istanbul-umraniye": {
    city: { tr: "İstanbul / Ümraniye", en: "Istanbul / Umraniye" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 41.0244,
    lon: 29.1245,
  },
  "izmir-bornova": {
    city: { tr: "İzmir / Bornova", en: "Izmir / Bornova" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 38.4674,
    lon: 27.2177,
  },
  "kazakhstan-astana": {
    city: { tr: "Astana", en: "Astana" },
    country: { tr: "Kazakistan", en: "Kazakhstan" },
    lat: 51.1694,
    lon: 71.4491,
  },
  "kocaeli-cayirova": {
    city: { tr: "Çayırova / Kocaeli", en: "Cayirova / Kocaeli" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.8241,
    lon: 29.3722,
  },
  "kocaeli-dilovasi": {
    city: { tr: "Dilovası / Kocaeli", en: "Dilovasi / Kocaeli" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.787,
    lon: 29.5304,
  },
  "kocaeli-gosb": {
    city: { tr: "Gebze GOSB / Kocaeli", en: "Gebze GOSB / Kocaeli" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.8226,
    lon: 29.4301,
  },
  "kocaeli-sekerpinar": {
    city: { tr: "Şekerpınar / Kocaeli", en: "Sekerpinar / Kocaeli" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.8852,
    lon: 29.3778,
  },
  "moscow-vavilon": {
    city: { tr: "Moskova / Rostokino", en: "Moscow / Rostokino" },
    country: { tr: "Rusya", en: "Russia" },
    lat: 55.8447,
    lon: 37.6614,
  },
  "moscow-victoria": {
    city: { tr: "Moskova", en: "Moscow" },
    country: { tr: "Rusya", en: "Russia" },
    lat: 55.7558,
    lon: 37.6176,
  },
  "qatar-lusail": {
    city: { tr: "Lusail", en: "Lusail" },
    country: { tr: "Katar", en: "Qatar" },
    lat: 25.4238,
    lon: 51.5176,
  },
  "sakarya-adapazari": {
    city: { tr: "Sakarya / Adapazarı", en: "Sakarya / Adapazari" },
    country: { tr: "Türkiye", en: "Turkey" },
    lat: 40.7762,
    lon: 30.4033,
  },
  turkmenbashi: {
    city: { tr: "Türkmenbaşı", en: "Turkmenbashi" },
    country: { tr: "Türkmenistan", en: "Turkmenistan" },
    lat: 40.0221,
    lon: 52.9552,
  },
} as const;

const projectCoordinateOverrides: Record<string, { lat: number; lon: number }> = {
  "Bilfen School Building Maslak - Istanbul": {
    lat: 41.1208958,
    lon: 29.0066919,
  },
  "A School Project School In Silivri": {
    lat: 41.0871165,
    lon: 28.2054187,
  },
  "Çekmeköy Doğa College Building": {
    lat: 41.0363906,
    lon: 29.1620733,
  },
  "Sile Anatolian Teacher High School": {
    lat: 41.146341,
    lon: 29.578503,
  },
  "Küçükköy Autistic Children Education Center": {
    lat: 41.0725893,
    lon: 28.9041316,
  },
  "Işık University Şile Campus": {
    lat: 41.1541642,
    lon: 29.5688606,
  },
};

function rawProject(
  name: LocalizedText,
  locationKey: keyof typeof projectLocations,
  images: string[],
  metrics: MetricTuple[]
) {
  return { name, locationKey, images, metrics };
}

const rawProjects = [
  rawProject(
    { tr: "Bilnet Çamlıca - İstanbul", en: "Bilnet Istanbul Camlica" },
    "istanbul-camlica",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Frame-42997-1.png"],
    [
      ["area", "1000 m2", "1000 m2"],
      ["duration", "1 Ay / 2023", "1 Month / 2023"],
      ["scope", "Betonarme güçlendirme", "concrete reinforcement"],
    ]
  ),
  rawProject(
    {
      tr: "Q-Rail Al Khor Otoyolu ve Metro Yerleşim Projesi",
      en: "Q-Doha Expressway and Metro Rail residential project",
    },
    "doha-al-khor",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Frame-42998.png"],
    [
      ["area", "1.330 MT", "1.330 MT"],
      ["duration", "8 Ay / 2019", "8 Months / 2019"],
      ["scope", "Üstyapı Beton İnşaatı", "Superstructure concrete construction"],
    ]
  ),
  rawProject(
    { tr: "Duhail Ve Gharrafa Kavşağı", en: "Junction And To Gharraf Duhail" },
    "doha-duhail",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Frame-42999.png"],
    [
      ["employer", "Ashghal Qatar", "Ashghal Qatar"],
      ["duration", "2020", "2020"],
      ["scope", "Duhail ve Gharrafa Kavşağı", "Duhail and Gharrafa junction"],
    ]
  ),
  rawProject(
    { tr: "Bilfen Maslak Okul Binası - İstanbul", en: "Bilfen School Building Maslak - Istanbul" },
    "istanbul-maslak",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-20.31.53-1.png"],
    [
      ["area", "13.000 m2", "13.000 m2"],
      ["duration", "12 Ay 2019/2020", "12 Months 2019/2020"],
      ["scope", "Kaba ve ince işleri", "Coarse and fine works"],
    ]
  ),
  rawProject(
    { tr: "THY İstanbul Havalimanı Hangar Projesi", en: "Turkish Airlines Istanbul airport hangar Project" },
    "istanbul-airport",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-20.33.13-1.png"],
    [
      ["area", "79.000 m2", "79.000 m2"],
      ["duration", "8 Ay / 2018", "8 Months / 2018"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    {
      tr: "THY İstanbul Havalimanı Bakım Atölyesi Projesi",
      en: "Istanbul airport Turkish Airlines maintenance workshop project",
    },
    "istanbul-airport",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-20.36.07-1.png"],
    [
      ["area", "40.000 m2", "40.000 m2"],
      ["duration", "8 Ay / 2018", "8 Months / 2018"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    {
      tr: "THY İstanbul Havalimanı Enerji Binası Projesi",
      en: "Turkish Airlines Istanbul airport building project Energy",
    },
    "istanbul-airport",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.38.44-1.png"],
    [
      ["area", "20.000 m2", "20.000 m2"],
      ["duration", "5 Ay / 2019", "5 Months / 2019"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Bilnet Matbaacılık Fabrika Binası - İstanbul", en: "Bilnet Printing Factory Building - Istanbul" },
    "istanbul-umraniye",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.47.57-1.png"],
    [
      ["area", "9.850 m2", "9.850 m2"],
      ["duration", "8 Ay / 2017", "8 Months / 2017"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "CST Kimya Fabrikası - Kocaeli", en: "Chemistry CST Factory - Kocaeli" },
    "kocaeli-dilovasi",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.51.47-1.png"],
    [
      ["area", "4.850 m2", "4.850 m2"],
      ["duration", "8 Ay / 2017", "8 Months / 2017"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Oran Okulları - Kartal", en: "Rate Schools - Eagle" },
    "istanbul-kartal",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.53.42-1.png"],
    [
      ["area", "13.000 m2", "13.000 m2"],
      ["duration", "8 Ay / 2017", "8 Months / 2017"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Kale Daire Kartal - İstanbul", en: "The Castle Apartment Kartal - Istanbul" },
    "istanbul-kartal",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.56.04-1.png"],
    [
      ["area", "37.500 m2", "37.500 m2"],
      ["duration", "12 Ay / 2016", "12 Months / 2016"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Bilfen Fen Lisesi - İzmir", en: "Bilfen Fen Lisesi - Izmir" },
    "izmir-bornova",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-22.57.55-1.png"],
    [
      ["area", "11.300 m2", "11.300 m2"],
      ["duration", "5 Ay / 2016", "5 Months / 2016"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Mektebim Okul Projesi Silivri", en: "A School Project School In Silivri" },
    "istanbul-silivri",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.00.55-1.png"],
    [
      ["area", "10.375 m2", "10.375 m2"],
      ["duration", "4 Ay / 2017", "4 Months / 2017"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Bilnet Sakarya Kampüsü", en: "Bilnet Campus Sakarya" },
    "sakarya-adapazari",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.02.21-1.png"],
    [
      ["area", "5.250 m2", "5.250 m2"],
      ["duration", "6 Ay / 2017", "6 Months / 2017"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Arnavutköy Okul Projesi - İstanbul", en: "School Project Arnavutköy - Istanbul" },
    "istanbul-arnavutkoy",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.05.45-1.png"],
    [
      ["area", "9.500 m2", "9.500 m2"],
      ["duration", "12 Ay / 2016", "12 Months / 2016"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Şamekan Otel Awaza - Türkmenistan", en: "Awaza Hotel Samekan - Turkmenistan" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.08.22-1.png"],
    [
      ["area", "32.000 m2", "32.000 m2"],
      ["duration", "22 Ay / 2013", "22 Months / 2013"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Koluman Plaza - Gaziantep", en: "Koluman Plaza - Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.10.27-1.png"],
    [
      ["area", "32.050 m2", "32.050 m2"],
      ["duration", "18 Ay / 2014", "18 Months / 2014"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Ak Evler - Aşkabat / Türkmenistan", en: "Houses Ak - Ashgabat / Turkmenistan" },
    "ashgabat-center",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.13.41-1.png"],
    [
      ["area", "40.000 m2", "40.000 m2"],
      ["duration", "24 Ay / 2010", "24 Months / 2010"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Medeniyet Villaları - Avaza / Türkmenistan", en: "Villas Civilization - To The Top Of My Lungs / Turkmenistan" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.15.40-1.png"],
    [
      ["area", "20.000 m2", "20.000 m2"],
      ["duration", "18 Ay / 2013", "18 Months / 2013"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Hipodrom - Aşkabat / Türkmenistan", en: "Hippodrome - Ashgabat / Turkmenistan" },
    "ashgabat-hippodrome",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.17.00-1.png"],
    [
      ["area", "50.000 m2", "50.000 m2"],
      ["duration", "10 Ay / 2010", "10 Months / 2010"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Awaza Kerwen Otel Projesi", en: "Kerwen Awaza Hotel Project" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.19.55-1.png"],
    [
      ["area", "18.000 m2", "18.000 m2"],
      ["duration", "8 Ay / 2009", "8 Months / 2009"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Awaza Kuwwat Otel Projesi", en: "Quwwat Awaza Hotel Project" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.21.55-1.png"],
    [
      ["area", "17.000 m2", "17.000 m2"],
      ["duration", "8 Ay / 2009", "8 Months / 2009"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Awaza Köprü Projesi", en: "Awaza Bridge Project" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.23.47-1.png"],
    [
      ["area", "3.000 m2", "3.000 m2"],
      ["duration", "6 Ay / 2013", "6 Months / 2013"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Awaza Otopark Projesi", en: "Parking Project Awaza" },
    "awaza-turkmenistan",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.26.46-1.png"],
    [
      ["area", "6.000 m2", "6.000 m2"],
      ["duration", "6 Ay / 2012", "6 Months / 2012"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Nebitgaz Villa Projesi", en: "Nebitgaz Villa Project" },
    "ashgabat-center",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.32.20-1.png"],
    [
      ["area", "26.000 m2", "26.000 m2"],
      ["duration", "10 Ay / 2014", "10 Months / 2014"],
      ["scope", "İnce İnşaat", "Slim Construction"],
    ]
  ),
  rawProject(
    { tr: "Türkmenbaşı Okul & Kreş Projesi", en: "Turkmenbashi School & Nursery Project" },
    "turkmenbashi",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.28.52-1.png"],
    [
      ["area", "12.000 m2", "12.000 m2"],
      ["duration", "12 Ay / 2010", "12 Months / 2010"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Gaziantep Şehit Kamil Yurt Binası", en: "Dormitory Building Gaziantep Şehit Kamil" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.31.37-1.png"],
    [
      ["area", "18.000 m2", "18.000 m2"],
      ["duration", "8 Ay / 2014", "8 Months / 2014"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "20 Dairelik Konut Projesi - Kartal / İstanbul", en: "20 Flats Housing Project - Kartal / Istanbul" },
    "istanbul-kartal",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.31.37-1.png"],
    [
      ["area", "2.500 m2", "2.500 m2"],
      ["duration", "12 Ay / 2008", "12 Months / 2008"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Eltesan İş Merkezi - Dudullu / İstanbul", en: "Eltesan The Business Centre - Dudullu, Istanbul" },
    "istanbul-dudullu",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.38.22-1.png"],
    [
      ["area", "2.100 m2", "2.100 m2"],
      ["duration", "10 Ay / 2004", "10 Months / 2004"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Green Chemicals İş Merkezi / İstanbul", en: "Green Chemicals Business Center / Istanbul" },
    "istanbul-umraniye",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.40.00-1.png"],
    [
      ["area", "3.000 m2", "3.000 m2"],
      ["duration", "7 Ay / 2002", "7 Months / 2002"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Gürbüz Plaza İş Merkezi - İstanbul", en: "Robust Plaza Business Center - Istanbul" },
    "istanbul-umraniye",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.43.38-1.png"],
    [
      ["area", "1.800 m2", "1.800 m2"],
      ["duration", "6 Ay / 2002", "6 Months / 2002"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Aras Holding Yönetim Binası - İstanbul", en: "Aras Holding Executive Building - Istanbul" },
    "istanbul-umraniye",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.45.19-1.png"],
    [
      ["area", "10.000 m2", "10.000 m2"],
      ["duration", "8 Ay / 2000", "8 Months / 2000"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Çekmeköy Doğa Koleji Yapı", en: "Çekmeköy Doğa College Building" },
    "istanbul-cekmekoy",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.47.03-1.png"],
    [
      ["area", "14.000 m2", "14.000 m2"],
      ["duration", "16 Ay / 2013", "16 Months / 2013"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Gaziantep Doğa Koleji Yapı", en: "The Nature Of The College Building In Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/17-1.png"],
    [
      ["area", "13.000 m2", "13.000 m2"],
      ["duration", "16 Ay / 2012", "16 Months / 2012"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Özel Sanko Koleji - Gaziantep", en: "Private Sanko University, Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/sankokolejifoto-1.png"],
    [
      ["area", "7.000 m2", "7.000 m2"],
      ["duration", "16 Ay / 2011", "16 Months / 2011"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Can Tekinalp İş Merkezi - Gaziantep", en: "Tekinalp Business Centre Bell - Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.52.49-1.png"],
    [
      ["area", "6.000 m2", "6.000 m2"],
      ["duration", "16 Ay / 2010", "16 Months / 2010"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Doha Köprü ve Viyadük Projesi - Lusail Cp4 Katar", en: "Bridge and viaduct project in Doha - Qatar Lusail Cp4" },
    "qatar-lusail",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.55.09-1.png"],
    [
      ["area", "30.000 m2", "30.000 m2"],
      ["duration", "20 Ay / 2013", "20 Months / 2013"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Abdülkadir Konukoğlu Bağ Evi - Gaziantep", en: "Abdulkadir Konukoğlu Bond House - Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.56.19-1.png"],
    [
      ["area", "3.800 m2", "3.800 m2"],
      ["duration", "16 Ay / 2011", "16 Months / 2011"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Şile Anadolu Öğretmen Lisesi", en: "Sile Anatolian Teacher High School" },
    "istanbul-sile",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-29-at-23.59.01-1.png"],
    [
      ["area", "10.000 m2", "10.000 m2"],
      ["duration", "14 Ay / 2007", "14 Months / 2007"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Küçükköy Otistik Çocuklar Eğitim Merkezi", en: "Küçükköy Autistic Children Education Center" },
    "istanbul-kucukkoy",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/k_20140254_IMG_2093-1.png"],
    [
      ["area", "5.500 m2", "5.500 m2"],
      ["duration", "12 Ay / 2008", "12 Months / 2008"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Victoria Plaza Alışveriş Merkezi - Moskova", en: "Victoria Plaza Mall - Moscow" },
    "moscow-victoria",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/26f9c6e2ba9efffc864757f0ab2f880a-1.png"],
    [
      ["area", "25.000 m2", "25.000 m2"],
      ["duration", "12 Ay / 2006", "12 Months / 2006"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Zolotov Vavilon Alışveriş Merkezi - Moskova", en: "Zolotov Vavilon Shopping Mall - Moscow" },
    "moscow-vavilon",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.06.16-1.png"],
    [
      ["area", "80.000 m2", "80.000 m2"],
      ["duration", "18 Ay / 2006", "18 Months / 2006"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Levent Akson Ev Projesi Tuzla - İstanbul", en: "Home Project Axons Tuzla Levent - Istanbul" },
    "istanbul-kartal",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.08.24-1.png"],
    [
      ["area", "300 m2", "300 m2"],
      ["duration", "4 Ay / 2005", "4 Months / 2005"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Les Ottoman’s Oteli Ortaköy -İstanbul", en: "Les Ortakoy Im Hotel" },
    "istanbul-ortakoy",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.06.16-1.png"],
    [
      ["area", "8.500 m2", "8.500 m2"],
      ["duration", "13 Ay / 2005", "13 Months / 2005"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "BJK İnönü Stadyumu", en: "BJK Inonu Stadium" },
    "istanbul-besiktas",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.10.55-1.png"],
    [
      ["area", "-", "-"],
      ["duration", "2 Ay / 2004", "2 Months / 2004"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "B.Ü. Uçaksavar Öğrenci Yurdu", en: "B. U. Student Dormitory Flak" },
    "istanbul-ucaksavar",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.45.50-1.png"],
    [
      ["area", "22.000 m2", "22.000 m2"],
      ["duration", "20 Ay / 1997", "20 Months / 1997"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Kuveyt Türk Bankası Tatil Köyü Akçay Balıkesir", en: "Kuveyt Turk Bank Holiday Village Balıkesir Akçay" },
    "balikesir-akcay",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.47.32-1.png"],
    [
      ["area", "10.000 m2", "10.000 m2"],
      ["duration", "24 Ay / 1998", "24 Months / 1998"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "GOSB idari ve Sosyal Tesisleri - Gebze", en: "Administrative and social facilities gosb - Gebze" },
    "kocaeli-gosb",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/gebze_organize_sanayi_bolgesi_gosb_akilli_bolgeye_donusuyor_h1868-1.png"],
    [
      ["area", "11.000 m2", "11.000 m2"],
      ["duration", "10 Ay / 1996", "10 Months / 1996"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    {
      tr: "Tüyap Fuarcılık ve Kongre Merkezi Beylikdüzü - İstanbul",
      en: "TÜYAP fair, convention and Congress Center, Büyükçekmece - Istanbul",
    },
    "istanbul-tuyap",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/TUYAP-1.png"],
    [
      ["area", "135.000 m2", "135.000 m2"],
      ["duration", "18 Ay / 1996", "18 Months / 1996"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Işık Üniversitesi Şile Kampüsü", en: "Işık University Şile Campus" },
    "istanbul-sile",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Isik_University_Sile_Campus_2010_OTRS-1.png"],
    [
      ["area", "12.000 m2", "12.000 m2"],
      ["duration", "6 Ay / 2006", "6 Months / 2006"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Dudullu ABB Elektrik Fabrikası", en: "ABB Electric Factory Dudullu" },
    "istanbul-dudullu",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/abb-fabrikasini-hitachi-ye-devretti-1.png"],
    [
      ["area", "12.000 m2", "12.000 m2"],
      ["duration", "7 Ay / 2006", "7 Months / 2006"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Aras Kargo Hadımköy Aktarma ve Depolama Merkezi", en: "Aras Kargo Hadımköy transfer and storage Center" },
    "istanbul-hadimkoy",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.56.07-1.png"],
    [
      ["area", "4.000 m2", "4.000 m2"],
      ["duration", "6 Ay / 2002", "6 Months / 2002"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Gaziantep Özkaya Bölge Hastanesi", en: "Özkaya Regional Hospital In Gaziantep" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.58.10-1.png"],
    [
      ["area", "19.000 m2", "19.000 m2"],
      ["duration", "12 Ay / 2013", "12 Months / 2013"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    {
      tr: "Mc. Donald’s Ekmek Fabrikası Şekerpınar - Gebze - Kocaeli",
      en: "Mc. Donald's Bread Factory Şekerpınar - Gebze - Kocaeli",
    },
    "kocaeli-sekerpinar",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-00.59.45-1.png"],
    [
      ["area", "8.000 m2", "8.000 m2"],
      ["duration", "6 Ay / 1998", "6 Months / 1998"],
      ["scope", "Kaba ve İnce İnşaat", "coarse and fine construction"],
    ]
  ),
  rawProject(
    { tr: "Tadım Gıda Fabrikası Gaziantep", en: "Gaziantep Tasting Food Factory" },
    "gaziantep-sehitkamil",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-01.01.12-1.png"],
    [
      ["area", "5.000 m2", "5.000 m2"],
      ["duration", "6 Ay / 2011", "6 Months / 2011"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "İş Merkezi Kazakistan", en: "Business Center, Kazakhstan" },
    "kazakhstan-astana",
    ["https://aydinernakliyatinsaat.com/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-01.17.38-1.png"],
    [
      ["area", "25.000 m2", "25.000 m2"],
      ["duration", "10 Ay / 2007", "10 Months / 2007"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "RKS Motor - Çekmeköy", en: "RKS Motor - Çekmeköy" },
    "istanbul-cekmekoy",
    [
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam10001.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam20002.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam30003.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam40004.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam50005.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/Kubamotorcam60006.png",
    ],
    [
      ["area", "50.000 m2", "50.000 m2"],
      ["duration", "1 Yıl / 2025", "1 Year / 2025"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "Çayırova Aydıner Konut Projesi", en: "Çayırova Corde Housing Project" },
    "kocaeli-cayirova",
    [
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-03-at-16.25.34-1.png",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-03-at-16.24.45-1.png",
    ],
    [
      ["area", "2.500 m2", "2.500 m2"],
      ["duration", "1 Yıl / 2025", "1 Year / 2025"],
      ["scope", "Kaba İnşaat", "Rough Construction"],
    ]
  ),
  rawProject(
    { tr: "RKS Otomotiv Cekmekoy Fabrika Projesi", en: "RKS Automotive Çekmeköy Factory Project" },
    "istanbul-cekmekoy",
    [
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.10-1.jpg",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.10.jpg",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.11-1.jpg",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.11-2.jpg",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.11-3.jpg",
      "https://aydinernakliyatinsaat.com/wp-content/uploads/2025/07/WhatsApp-Image-2025-10-16-at-10.10.11.jpg",
    ],
    [
      ["area", "41.000 m2", "41.000 m2"],
      ["duration", "1 Yıl", "1 Year"],
      ["status", "Devam Eden Proje", "Ongoing Project"],
    ]
  ),
] as const;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferCategory(name: LocalizedText) {
  const text = `${name.tr} ${name.en}`.toLowerCase();

  if (
    /havalimani|airport|hangar/.test(text)
  ) {
    return "aviation";
  }

  if (
    /kargo|depolama|aktarma|transfer|storage/.test(text)
  ) {
    return "logistics";
  }

  if (
    /kopru|köprü|viyaduk|viyadük|junction|kavsak|kavşak|metro|otoyolu|bridge|parking|otopark/.test(
      text
    )
  ) {
    return "infrastructure";
  }

  if (/otel|hotel/.test(text)) {
    return "hospitality";
  }

  if (/hastane|hospital/.test(text)) {
    return "healthcare";
  }

  if (/stadyum|stadium|hipodrom|hippodrome/.test(text)) {
    return "sports";
  }

  if (
    /fabrika|factory|kimya|printing|motor/.test(text)
  ) {
    return "industrial";
  }

  if (
    /plaza|alisveris|alışveriş|shopping|mall|is merkezi|iş merkezi|business centre|business center|holding/.test(
      text
    )
  ) {
    return "commercial";
  }

  if (
    /konut|housing|villa|evler|apartment|daire|residential/.test(text)
  ) {
    return "residential";
  }

  if (
    /okul|kolej|lise|universite|üniversite|school|college|campus|kampus|kampüsü|nursery|kreş|yurt|dormitory/.test(
      text
    )
  ) {
    return "education";
  }

  return "public";
}

function inferStatus(metrics: MetricTuple[]) {
  const joined = metrics.map((metric) => `${metric[1]} ${metric[2]}`).join(" ");
  return /devam|ongoing/i.test(joined) ? "ongoing" : "completed";
}

function extractYear(metrics: MetricTuple[], statusKey: keyof typeof STATUS_LABELS) {
  const joined = metrics.map((metric) => `${metric[1]} ${metric[2]}`).join(" ");
  const matches = joined.match(/(?:19|20)\d{2}/g);

  if (matches && matches.length > 0) {
    return matches[matches.length - 1];
  }

  return statusKey === "ongoing" ? "2025" : "-";
}

function buildMetrics(metrics: MetricTuple[]): ProjectMetric[] {
  return metrics.map(([key, trValue, enValue]) => ({
    label: METRIC_LABELS[key],
    value: { tr: trValue, en: enValue },
  }));
}

function buildSummary(
  category: LocalizedText,
  city: LocalizedText,
  metrics: ProjectMetric[]
): LocalizedText {
  const [firstMetric, secondMetric, thirdMetric] = metrics;

  return {
    tr: `${city.tr} lokasyonundaki bu ${category.tr.toLowerCase()} projesi için resmi proje sayfasında ${firstMetric.label.tr.toLowerCase()} ${firstMetric.value.tr}, ${secondMetric.label.tr.toLowerCase()} ${secondMetric.value.tr} ve ${thirdMetric.label.tr.toLowerCase()} ${thirdMetric.value.tr} bilgileri yer alıyor.`,
    en: `The official project page lists this ${category.en.toLowerCase()} in ${city.en} with ${firstMetric.label.en.toLowerCase()} ${firstMetric.value.en}, ${secondMetric.label.en.toLowerCase()} ${secondMetric.value.en}, and ${thirdMetric.label.en.toLowerCase()} ${thirdMetric.value.en}.`,
  };
}

function buildScope(
  city: LocalizedText,
  country: LocalizedText,
  metrics: ProjectMetric[],
  status: LocalizedText
) {
  const [firstMetric, , thirdMetric] = metrics;

  return [
    {
      tr: `${thirdMetric.label.tr}: ${thirdMetric.value.tr}`,
      en: `${thirdMetric.label.en}: ${thirdMetric.value.en}`,
    },
    {
      tr: `${firstMetric.label.tr}: ${firstMetric.value.tr}`,
      en: `${firstMetric.label.en}: ${firstMetric.value.en}`,
    },
    {
      tr: `Konum: ${city.tr}, ${country.tr} • Durum: ${status.tr}`,
      en: `Location: ${city.en}, ${country.en} • Status: ${status.en}`,
    },
  ];
}

export const projects: Project[] = rawProjects.map((rawProjectItem) => {
  const location = projectLocations[rawProjectItem.locationKey];
  const coordinateOverride = projectCoordinateOverrides[rawProjectItem.name.en];
  const statusKey = inferStatus(rawProjectItem.metrics);
  const status = STATUS_LABELS[statusKey];
  const category = CATEGORY_LABELS[inferCategory(rawProjectItem.name)];
  const metrics = buildMetrics(rawProjectItem.metrics);
  const images = rawProjectItem.images.length > 0 ? rawProjectItem.images : [FALLBACK_IMAGE];
  const primaryImage = images[0];

  return {
    slug: slugify(rawProjectItem.name.en),
    name: rawProjectItem.name,
    country: location.country,
    city: location.city,
    lat: coordinateOverride?.lat ?? location.lat,
    lon: coordinateOverride?.lon ?? location.lon,
    status,
    category,
    year: extractYear(rawProjectItem.metrics, statusKey),
    summary: buildSummary(category, location.city, metrics),
    scope: buildScope(location.city, location.country, metrics, status),
    metrics,
    images,
    primaryImage,
  };
});

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectContent(project: Project, locale: Locale) {
  return {
    name: getLocalizedText(project.name, locale),
    country: getLocalizedText(project.country, locale),
    city: getLocalizedText(project.city, locale),
    status: getLocalizedText(project.status, locale),
    category: getLocalizedText(project.category, locale),
    summary: getLocalizedText(project.summary, locale),
    scope: project.scope.map((item) => getLocalizedText(item, locale)),
    metrics: project.metrics.map((metric) => ({
      label: getLocalizedText(metric.label, locale),
      value: getLocalizedText(metric.value, locale),
    })),
    images: project.images,
    primaryImage: project.primaryImage,
  };
}

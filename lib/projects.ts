import { getLocalizedText, type Locale, type LocalizedText } from "@/lib/i18n";

type ProjectMetric = {
  label: LocalizedText;
  value: string;
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
};

export const projects: Project[] = [
  {
    slug: "bilnet-camlica-istanbul",
    name: {
      tr: "Bilnet Çamlıca - İstanbul",
      en: "Bilnet Camlica - Istanbul",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.0236,
    lon: 29.0832,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Eğitim Yapısı", en: "Education Building" },
    year: "2019",
    summary: {
      tr: "Kısa sürede tamamlanan bu eğitim projesi, betonarme kapsamı ve hızlı saha mobilizasyonuyla öne çıkar.",
      en: "This education project stood out with its reinforced concrete scope and rapid site mobilization within a short delivery timeline.",
    },
    scope: [
      { tr: "Betonarme uygulamaları", en: "Reinforced concrete works" },
      { tr: "Hızlı saha organizasyonu", en: "Rapid site organization" },
      { tr: "Kısa süreli teslim programı", en: "Short-term delivery program" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "1,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "1 month" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Reinforced Concrete" },
    ],
  },
  {
    slug: "bilfen-maslak-school-building",
    name: {
      tr: "Bilfen Maslak Okul Binası - İstanbul",
      en: "Bilfen Maslak School Building - Istanbul",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.1077,
    lon: 29.0217,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Okul Binası", en: "School Building" },
    year: "2020",
    summary: {
      tr: "Kaba ve ince işlerin birlikte yönetildiği bu okul binası, planlama ve kalite takibi açısından güçlü saha koordinasyonu gerektirdi.",
      en: "This school building combined rough and fine works and required strong site coordination for planning and quality control.",
    },
    scope: [
      { tr: "Kaba ve ince işler", en: "Rough and fine work" },
      { tr: "Eğitim yapısı koordinasyonu", en: "Education facility coordination" },
      { tr: "Aşamalı teslim planlaması", en: "Phased delivery planning" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "13,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "12 months / 2019-2020" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Rough and Fine Work" },
    ],
  },
  {
    slug: "thy-istanbul-airport-hangar-project",
    name: {
      tr: "THY İstanbul Havalimanı Hangar Projesi",
      en: "THY Istanbul Airport Hangar Project",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.2753,
    lon: 28.7519,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Havacılık Yapısı", en: "Aviation Facility" },
    year: "2018",
    summary: {
      tr: "Büyük ölçekli kaba inşaat ve sıkı saha lojistiği gerektiren bu hangar projesi, havalimanı operasyonlarına uyumlu şekilde tamamlandı.",
      en: "This hangar project involved large-scale rough construction and tight logistics executed in line with airport operations.",
    },
    scope: [
      { tr: "Kaba inşaat uygulamaları", en: "Rough construction" },
      { tr: "Havalimanı lojistik koordinasyonu", en: "Airport logistics coordination" },
      { tr: "Yüksek metrajlı saha üretimi", en: "High-volume field production" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "79,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "8 Months / 2018" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Rough Construction" },
    ],
  },
  {
    slug: "thy-istanbul-airport-maintenance-workshop-project",
    name: {
      tr: "THY İstanbul Havalimanı Bakım Atölyesi Projesi",
      en: "THY Istanbul Airport Maintenance Workshop Project",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.2715,
    lon: 28.7485,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Bakım Tesisi", en: "Maintenance Facility" },
    year: "2018",
    summary: {
      tr: "Bakım atölyesi projesi, operasyonel sahada kontrollü kaba inşaat ve teslim öncesi kalite takibiyle yürütüldü.",
      en: "This maintenance workshop project was delivered with controlled rough construction and disciplined pre-handover quality follow-up in an operational field environment.",
    },
    scope: [
      { tr: "Bakım tesisi kaba inşaat işleri", en: "Rough construction for maintenance facility" },
      { tr: "Operasyonel saha koordinasyonu", en: "Operational site coordination" },
      { tr: "Teslim öncesi kontroller", en: "Pre-handover checks" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "40,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "8 Months / 2018" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Rough Construction" },
    ],
  },
  {
    slug: "thy-istanbul-airport-energy-building-project",
    name: {
      tr: "THY İstanbul Havalimanı Enerji Binası Projesi",
      en: "THY Istanbul Airport Energy Building Project",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.2684,
    lon: 28.7447,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Enerji Yapısı", en: "Energy Building" },
    year: "2019",
    summary: {
      tr: "Teknik altyapı ve kaba inşaat süreçlerini bir araya getiren bu enerji binası projesi, sıkı program kontrolüyle teslim edildi.",
      en: "This energy building project combined technical infrastructure and rough construction processes under strict schedule control.",
    },
    scope: [
      { tr: "Teknik yapı kaba inşaat işleri", en: "Rough construction for technical building" },
      { tr: "Altyapı senkronizasyonu", en: "Infrastructure synchronization" },
      { tr: "Program bazlı üretim takibi", en: "Program-based production tracking" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "20,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "5 months / 2019" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Rough Construction" },
    ],
  },
  {
    slug: "cekmekoy-doga-college-building",
    name: {
      tr: "Çekmeköy Doğa Koleji Binası",
      en: "Cekmekoy Doga College Building",
    },
    country: { tr: "Türkiye", en: "Turkiye" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.0327,
    lon: 29.1734,
    status: { tr: "Tamamlandı", en: "Completed" },
    category: { tr: "Eğitim Kampüsü", en: "Education Campus" },
    year: "2013",
    summary: {
      tr: "Uzun süreli program yönetimi ve kaba-ince iş bütünlüğü gerektiren bu kampüs yapısı, eğitim projelerindeki deneyimi güçlendiren önemli bir referanstır.",
      en: "This campus structure required long-duration program management and integrated rough and fine works, making it a strong education-sector reference.",
    },
    scope: [
      { tr: "Kaba ve ince inşaat işleri", en: "Rough and fine construction" },
      { tr: "Uzun süreli saha planlama disiplini", en: "Long-duration site planning discipline" },
      { tr: "Eğitim yapısı teslim koordinasyonu", en: "Education facility delivery coordination" },
    ],
    metrics: [
      { label: { tr: "İnşaat Alanı", en: "Construction Area" }, value: "14,000 m2" },
      { label: { tr: "İş Süresi", en: "Job Duration" }, value: "16 months / 2013" },
      { label: { tr: "İş Kapsamı", en: "Scope of Work" }, value: "Rough and Fine Construction" },
    ],
  },
];

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
      value: metric.value,
    })),
  };
}

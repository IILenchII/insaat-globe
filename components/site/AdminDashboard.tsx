"use client";

import Image from "next/image";
import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { brandAssets } from "@/lib/siteCopy";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getLocalizedText, type LocalizedText } from "@/lib/i18n";
import type { Project } from "@/lib/projects";

type ProjectDraft = Project;

function createDraft(project: Project): ProjectDraft {
  return {
    ...project,
    name: { ...project.name },
    country: { ...project.country },
    city: { ...project.city },
    status: { ...project.status },
    category: { ...project.category },
    summary: { ...project.summary },
    scope: project.scope.map((item) => ({ ...item })),
    metrics: project.metrics.map((metric) => ({
      label: { ...metric.label },
      value: { ...metric.value },
    })),
    images: [...project.images],
  };
}

function createDraftMap(projects: Project[]) {
  return Object.fromEntries(projects.map((project) => [project.slug, createDraft(project)]));
}

function createEmptyProject() {
  const id = Date.now().toString().slice(-8);

  return createDraft({
    slug: `new-project-${id}`,
    name: { tr: `Yeni Proje ${id}`, en: `New Project ${id}` },
    country: { tr: "Türkiye", en: "Turkey" },
    city: { tr: "İstanbul", en: "Istanbul" },
    lat: 41.0082,
    lon: 28.9784,
    status: { tr: "Devam Ediyor", en: "Ongoing" },
    category: { tr: "Konut Projesi", en: "Residential Project" },
    year: new Date().getFullYear().toString(),
    summary: {
      tr: "Bu proje admin panelinden oluşturulan yeni bir taslak kaydıdır.",
      en: "This project is a new draft record created from the admin panel.",
    },
    scope: [
      {
        tr: "Kapsam maddesi buraya yazılır",
        en: "Scope item is written here",
      },
    ],
    metrics: [
      {
        label: { tr: "İnşaat Alanı", en: "Construction Area" },
        value: { tr: "TBD", en: "TBD" },
      },
      {
        label: { tr: "İş Süresi", en: "Job Duration" },
        value: { tr: "TBD", en: "TBD" },
      },
      {
        label: { tr: "İş Kapsamı", en: "Scope of Work" },
        value: { tr: "TBD", en: "TBD" },
      },
    ],
    images: [brandAssets.heroPrimary],
    primaryImage: brandAssets.heroPrimary,
  });
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "gold";
}) {
  return (
    <div
      className={`rounded-[24px] border p-5 shadow-[0_18px_40px_rgba(23,40,59,0.05)] ${
        tone === "gold"
          ? "border-[#bb8c39]/22 bg-[linear-gradient(180deg,#fff8ea_0%,#f8ecd7_100%)]"
          : "border-[#1d365c]/10 bg-white/80"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#17283b]/46">
        {label}
      </p>
      <p className="mt-3 text-3xl font-black text-[#13263f]">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { locale } = useLanguage();
  const [authState, setAuthState] = useState<"loading" | "guest" | "authenticated">(
    "loading"
  );
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [drafts, setDrafts] = useState<Record<string, ProjectDraft>>({});
  const [initialDrafts, setInitialDrafts] = useState<Record<string, ProjectDraft>>({});
  const [saveFeedback, setSaveFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const deferredSearch = useDeferredValue(search);
  const allDrafts = useMemo(() => Object.values(drafts), [drafts]);

  async function loadProjects() {
    const response = await fetch("/api/admin/projects", { cache: "no-store" });

    if (response.status === 401) {
      setAuthState("guest");
      return;
    }

    const data = (await response.json()) as { projects: Project[] };
    const draftMap = createDraftMap(data.projects);

    startTransition(() => {
      setDrafts(draftMap);
      setInitialDrafts(draftMap);
      setSelectedSlug((current) =>
        current && draftMap[current] ? current : data.projects[0]?.slug ?? ""
      );
      setAuthState("authenticated");
    });
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLocaleLowerCase("tr");

    return allDrafts.filter((project) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          project.slug,
          project.year,
          project.name.tr,
          project.name.en,
          project.city.tr,
          project.city.en,
          project.country.tr,
          project.country.en,
          project.category.tr,
          project.category.en,
        ]
          .join(" ")
          .toLocaleLowerCase("tr")
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        project.status.tr === statusFilter ||
        project.status.en === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        project.category.tr === categoryFilter ||
        project.category.en === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [allDrafts, categoryFilter, deferredSearch, statusFilter]);

  const selectedProject =
    drafts[selectedSlug] ?? filteredProjects[0] ?? allDrafts[0] ?? null;

  const statuses = useMemo(
    () =>
      Array.from(
        new Map(allDrafts.map((project) => [project.status.tr, project.status])).values()
      ),
    [allDrafts]
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Map(allDrafts.map((project) => [project.category.tr, project.category])).values()
      ),
    [allDrafts]
  );

  const stats = useMemo(() => {
    const ongoing = allDrafts.filter((project) => project.status.en === "Ongoing").length;
    const completed = allDrafts.length - ongoing;
    const countries = new Set(allDrafts.map((project) => project.country.en)).size;
    const categoriesCount = new Set(allDrafts.map((project) => project.category.en)).size;

    return { ongoing, completed, countries, categoriesCount };
  }, [allDrafts]);

  const isDirty = useMemo(() => {
    if (!selectedProject) {
      return false;
    }

    return JSON.stringify(selectedProject) !== JSON.stringify(initialDrafts[selectedProject.slug]);
  }, [initialDrafts, selectedProject]);

  function updateLocalizedField(
    slug: string,
    field: "name" | "city" | "country" | "summary",
    language: keyof LocalizedText,
    value: string
  ) {
    setDrafts((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        [field]: {
          ...current[slug][field],
          [language]: value,
        },
      },
    }));
  }

  function updateField<K extends keyof ProjectDraft>(
    slug: string,
    field: K,
    value: ProjectDraft[K]
  ) {
    setDrafts((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        [field]: value,
      },
    }));
  }

  function updateScope(language: keyof LocalizedText, value: string) {
    if (!selectedProject) {
      return;
    }

    const rows = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const nextScope = rows.map((row, index) => ({
      tr: language === "tr" ? row : selectedProject.scope[index]?.tr ?? row,
      en: language === "en" ? row : selectedProject.scope[index]?.en ?? row,
    }));

    updateField(selectedProject.slug, "scope", nextScope);
  }

  function updateImages(value: string) {
    if (!selectedProject) {
      return;
    }

    const urls = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    updateField(selectedProject.slug, "images", urls);
    updateField(selectedProject.slug, "primaryImage", urls[0] ?? "");
  }

  function resetSelectedProject() {
    if (!selectedProject) {
      return;
    }

    const original = initialDrafts[selectedProject.slug];

    if (!original) {
      return;
    }

    setDrafts((current) => ({
      ...current,
      [selectedProject.slug]: createDraft(original),
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAuthPending(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setLoginError(data.error ?? "Giriş başarısız oldu.");
        return;
      }

      setPassword("");
      await loadProjects();
    } finally {
      setIsAuthPending(false);
    }
  }

  async function handleLogout() {
    setIsAuthPending(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setDrafts({});
      setInitialDrafts({});
      setSelectedSlug("");
      setAuthState("guest");
    } finally {
      setIsAuthPending(false);
    }
  }

  async function saveSelectedProject() {
    if (!selectedProject) {
      return;
    }

    setIsSaving(true);
    setSaveFeedback("");

    try {
      const response = await fetch(`/api/admin/projects/${selectedProject.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: selectedProject }),
      });

      if (response.status === 401) {
        setAuthState("guest");
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSaveFeedback(data.error ?? "Kaydetme sırasında bir hata oluştu.");
        return;
      }

      const data = (await response.json()) as { projects: Project[] };
      const draftMap = createDraftMap(data.projects);
      setDrafts(draftMap);
      setInitialDrafts(draftMap);
      setSaveFeedback(locale === "tr" ? "Proje kaydedildi." : "Project saved.");
    } finally {
      setIsSaving(false);
    }
  }

  async function addProject() {
    const nextProject = createEmptyProject();
    setIsSaving(true);
    setSaveFeedback("");
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");

    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project: nextProject }),
      });

      if (response.status === 401) {
        setAuthState("guest");
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSaveFeedback(data.error ?? "Yeni proje oluşturulamadı.");
        return;
      }

      const data = (await response.json()) as { projects: Project[]; project: Project };
      const draftMap = createDraftMap(data.projects);
      setDrafts(draftMap);
      setInitialDrafts(draftMap);
      setSelectedSlug(data.project.slug);
      setSaveFeedback(
        locale === "tr"
          ? "Yeni proje oluşturuldu ve kaydedildi. Sol listede en üstte görebilirsin."
          : "New project created and saved. You can find it at the top of the left list."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteSelectedProject() {
    if (!selectedProject) {
      return;
    }

    const confirmed = window.confirm(
      locale === "tr"
        ? `${getLocalizedText(selectedProject.name, locale)} projesini silmek istiyor musun?`
        : `Do you want to delete ${getLocalizedText(selectedProject.name, locale)}?`
    );

    if (!confirmed) {
      return;
    }

    setIsSaving(true);
    setSaveFeedback("");

    try {
      const response = await fetch(`/api/admin/projects/${selectedProject.slug}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        setAuthState("guest");
        return;
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSaveFeedback(data.error ?? "Proje silinemedi.");
        return;
      }

      const data = (await response.json()) as { projects: Project[] };
      const draftMap = createDraftMap(data.projects);
      setDrafts(draftMap);
      setInitialDrafts(draftMap);
      setSelectedSlug(data.projects[0]?.slug ?? "");
      setSaveFeedback(locale === "tr" ? "Proje silindi." : "Project deleted.");
    } finally {
      setIsSaving(false);
    }
  }

  const scopeTr = selectedProject?.scope.map((item) => item.tr).join("\n") ?? "";
  const scopeEn = selectedProject?.scope.map((item) => item.en).join("\n") ?? "";
  const imagesValue = selectedProject?.images.join("\n") ?? "";
  const draftPreview = selectedProject ? JSON.stringify(selectedProject, null, 2) : "";

  if (authState === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fffbf5_0%,#f2eadc_100%)] px-6">
        <div className="rounded-[28px] border border-[#1d365c]/10 bg-white/86 px-8 py-6 text-sm text-[#17283b]/66 shadow-[0_20px_60px_rgba(23,40,59,0.08)]">
          {locale === "tr" ? "Admin paneli yükleniyor..." : "Loading admin panel..."}
        </div>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fffbf5_0%,#f2eadc_100%)] px-4 py-10 text-[#17283b]">
        <div className="w-full max-w-[560px] rounded-[36px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.88)] p-6 shadow-[0_30px_90px_rgba(23,40,59,0.08)] sm:p-8">
          <div className="relative h-16 w-[180px]">
            <Image
              src={brandAssets.logo}
              alt="Aydiner Construction"
              fill
              sizes="180px"
              className="object-contain object-left"
              priority
            />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#bb8c39]">
            {locale === "tr" ? "Güvenli Giriş" : "Secure Access"}
          </p>
          <h1 className="mt-3 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-4xl font-bold tracking-[-0.03em] text-[#13263f]">
            {locale === "tr" ? "Admin Paneli" : "Admin Panel"}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#17283b]/66">
            {locale === "tr"
              ? "Bu panel proje içeriklerini yönetmek için kullanılır. Varsayılan demo giriş bilgisi `admin / aydiner123` olarak ayarlanmıştır; istersen daha sonra environment variable ile değiştirebiliriz."
              : "This panel is used to manage project content. The default demo credential is set to `admin / aydiner123`; we can move it to environment variables later."}
          </p>

          <form onSubmit={handleLogin} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              {locale === "tr" ? "Kullanıcı Adı" : "Username"}
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              {locale === "tr" ? "Şifre" : "Password"}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
              />
            </label>

            {loginError ? (
              <div className="rounded-[18px] border border-[#d95a5a]/20 bg-[#fff1f1] px-4 py-3 text-sm text-[#9e3131]">
                {loginError}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isAuthPending}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#f1c450]/70 bg-[linear-gradient(180deg,#f4cf71_0%,#e8bb4f_100%)] px-5 py-3 text-sm font-semibold text-[#112640] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isAuthPending
                ? locale === "tr"
                  ? "Giriş yapılıyor..."
                  : "Signing in..."
                : locale === "tr"
                  ? "Panele Gir"
                  : "Enter Panel"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffbf5_0%,#f2eadc_100%)] px-4 py-6 text-[#17283b] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1480px]">
        <header className="rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.88)] p-5 shadow-[0_30px_90px_rgba(23,40,59,0.08)] sm:p-7">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative h-16 w-[180px] sm:h-[4.5rem] sm:w-[220px]">
                <Image
                  src={brandAssets.logo}
                  alt="Aydiner Construction"
                  fill
                  sizes="220px"
                  className="object-contain object-left"
                  priority
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#bb8c39]">
                  {locale === "tr" ? "İç Panel" : "Internal Panel"}
                </p>
                <h1 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-3xl font-bold tracking-[-0.03em] text-[#13263f] sm:text-4xl">
                  {locale === "tr"
                    ? "Aydiner Admin Arayüzü"
                    : "Aydiner Admin Interface"}
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#17283b]/66">
                  {locale === "tr"
                    ? "Bu sürümde giriş ekranı, proje ekle/sil aksiyonları ve dosyaya yazan gerçek kayıt API’si aktif. Kayıtlar `data/projects.json` içine yazılır ve public site yeniden yüklendiğinde yeni içerikleri okur."
                    : "This version ships with a login screen, add/delete actions, and a real save API writing to disk. Records are written into `data/projects.json`, and the public site reads the latest content on refresh."}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
                <StatCard
                  label={locale === "tr" ? "Toplam Proje" : "Total Projects"}
                  value={String(allDrafts.length)}
                  tone="gold"
                />
                <StatCard
                  label={locale === "tr" ? "Aktif Filtre" : "Filtered"}
                  value={String(filteredProjects.length)}
                />
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isAuthPending}
                className="rounded-full border border-[#1d365c]/10 bg-white px-4 py-3 text-sm font-semibold text-[#17283b] transition hover:border-[#bb8c39]/30 hover:bg-[#fffaf2]"
              >
                {locale === "tr" ? "Çıkış Yap" : "Log Out"}
              </button>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={locale === "tr" ? "Tamamlanan" : "Completed"}
            value={String(stats.completed)}
          />
          <StatCard
            label={locale === "tr" ? "Devam Eden" : "Ongoing"}
            value={String(stats.ongoing)}
          />
          <StatCard
            label={locale === "tr" ? "Ülke" : "Countries"}
            value={String(stats.countries)}
          />
          <StatCard
            label={locale === "tr" ? "Kategori" : "Categories"}
            value={String(stats.categoriesCount)}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_24px_72px_rgba(23,40,59,0.07)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#bb8c39]">
                  {locale === "tr" ? "Proje Havuzu" : "Project Pool"}
                </p>
                <h2 className="mt-2 text-xl font-black text-[#13263f]">
                  {locale === "tr" ? "İçerik Yönetimi" : "Content Management"}
                </h2>
              </div>
              <button
                type="button"
                onClick={addProject}
                disabled={isSaving}
                className="rounded-full border border-[#bb8c39]/24 bg-[#fff7ea] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#13263f] transition hover:bg-[#ffefcf]"
              >
                {locale === "tr" ? "Yeni Proje" : "New Project"}
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  locale === "tr"
                    ? "Proje, şehir, yıl veya slug ara"
                    : "Search project, city, year, or slug"
                }
                className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#bb8c39]/45 focus:ring-2 focus:ring-[#bb8c39]/12"
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#bb8c39]/45"
                >
                  <option value="all">
                    {locale === "tr" ? "Tüm durumlar" : "All statuses"}
                  </option>
                  {statuses.map((status) => (
                    <option key={status.en} value={getLocalizedText(status, locale)}>
                      {getLocalizedText(status, locale)}
                    </option>
                  ))}
                </select>

                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#bb8c39]/45"
                >
                  <option value="all">
                    {locale === "tr" ? "Tüm kategoriler" : "All categories"}
                  </option>
                  {categories.map((category) => (
                    <option key={category.en} value={getLocalizedText(category, locale)}>
                      {getLocalizedText(category, locale)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 max-h-[880px] space-y-3 overflow-y-auto pr-1">
              {filteredProjects.map((project) => {
                const isActive = selectedProject?.slug === project.slug;

                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => setSelectedSlug(project.slug)}
                    className={`w-full rounded-[24px] border p-4 text-left transition ${
                      isActive
                        ? "border-[#bb8c39]/35 bg-[linear-gradient(180deg,#fff8ea_0%,#f7ecda_100%)] shadow-[0_18px_38px_rgba(23,40,59,0.07)]"
                        : "border-[#1d365c]/10 bg-white/82 hover:border-[#bb8c39]/22 hover:bg-[#fffaf2]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#bb8c39]">
                          {getLocalizedText(project.category, locale)}
                        </p>
                        <h3 className="mt-2 text-sm font-bold leading-6 text-[#13263f]">
                          {getLocalizedText(project.name, locale)}
                        </h3>
                      </div>
                      <span className="rounded-full bg-[#13263f]/6 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#17283b]/56">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-[#17283b]/62">
                      {getLocalizedText(project.city, locale)}, {getLocalizedText(project.country, locale)}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-[#17283b]/54">
                      <span>{getLocalizedText(project.status, locale)}</span>
                      <span>{project.slug}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="space-y-6">
            {selectedProject ? (
              <>
                <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.1fr)_360px]">
                  <div className="rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_24px_72px_rgba(23,40,59,0.07)] sm:p-6">
                    <div className="flex flex-col gap-4 border-b border-[#1d365c]/10 pb-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#bb8c39]">
                          {locale === "tr" ? "Seçili Proje" : "Selected Project"}
                        </p>
                        <h2 className="mt-2 font-['Iowan_Old_Style','Palatino_Linotype','Book_Antiqua',Georgia,serif] text-3xl font-bold tracking-[-0.03em] text-[#13263f]">
                          {getLocalizedText(selectedProject.name, locale)}
                        </h2>
                        <p className="mt-2 text-sm text-[#17283b]/62">
                          {selectedProject.slug}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={resetSelectedProject}
                          className="rounded-full border border-[#1d365c]/10 bg-white px-4 py-2 text-sm font-semibold text-[#17283b] transition hover:border-[#bb8c39]/35 hover:bg-[#fffaf2]"
                        >
                          {locale === "tr" ? "Taslağı Sıfırla" : "Reset Draft"}
                        </button>
                        <button
                          type="button"
                          onClick={saveSelectedProject}
                          disabled={isSaving || !isDirty}
                          className="rounded-full border border-[#f1c450]/70 bg-[linear-gradient(180deg,#f4cf71_0%,#e8bb4f_100%)] px-4 py-2 text-sm font-semibold text-[#112640] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isSaving
                            ? locale === "tr"
                              ? "Kaydediliyor..."
                              : "Saving..."
                            : locale === "tr"
                              ? "Projeyi Kaydet"
                              : "Save Project"}
                        </button>
                        <button
                          type="button"
                          onClick={deleteSelectedProject}
                          disabled={isSaving}
                          className="rounded-full border border-[#d95a5a]/24 bg-[#fff1f1] px-4 py-2 text-sm font-semibold text-[#a23b3b] transition hover:bg-[#ffe3e3]"
                        >
                          {locale === "tr" ? "Projeyi Sil" : "Delete Project"}
                        </button>
                        <a
                          href={`/projects/${selectedProject.slug}`}
                          className="rounded-full border border-[#bb8c39]/30 bg-[#fff7e6] px-4 py-2 text-sm font-semibold text-[#13263f] transition hover:bg-[#fff0cb]"
                        >
                          {locale === "tr" ? "Detay Sayfasını Aç" : "Open Detail Page"}
                        </a>
                      </div>
                    </div>

                    {saveFeedback ? (
                      <div className="mt-4 rounded-[18px] border border-[#1d365c]/10 bg-[#fffaf2] px-4 py-3 text-sm text-[#17283b]/72">
                        {saveFeedback}
                      </div>
                    ) : null}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Proje Adı (TR)" : "Project Name (TR)"}
                        <input
                          value={selectedProject.name.tr}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "name", "tr", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Project Name (EN)
                        <input
                          value={selectedProject.name.en}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "name", "en", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Şehir (TR)" : "City (TR)"}
                        <input
                          value={selectedProject.city.tr}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "city", "tr", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        City (EN)
                        <input
                          value={selectedProject.city.en}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "city", "en", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Ülke (TR)" : "Country (TR)"}
                        <input
                          value={selectedProject.country.tr}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "country", "tr", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Country (EN)
                        <input
                          value={selectedProject.country.en}
                          onChange={(event) =>
                            updateLocalizedField(selectedProject.slug, "country", "en", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-4">
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Yıl" : "Year"}
                        <input
                          value={selectedProject.year}
                          onChange={(event) =>
                            updateField(selectedProject.slug, "year", event.target.value)
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Lat
                        <input
                          type="number"
                          step="0.0001"
                          value={selectedProject.lat}
                          onChange={(event) =>
                            updateField(selectedProject.slug, "lat", Number(event.target.value))
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Lon
                        <input
                          type="number"
                          step="0.0001"
                          value={selectedProject.lon}
                          onChange={(event) =>
                            updateField(selectedProject.slug, "lon", Number(event.target.value))
                          }
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <div className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Durum" : "Status"}
                        <div className="rounded-[18px] border border-[#1d365c]/10 bg-[#f9f4ea] px-4 py-3 font-normal text-[#17283b]/72">
                          {getLocalizedText(selectedProject.status, locale)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Özet (TR)" : "Summary (TR)"}
                        <textarea
                          value={selectedProject.summary.tr}
                          onChange={(event) =>
                            updateLocalizedField(
                              selectedProject.slug,
                              "summary",
                              "tr",
                              event.target.value
                            )
                          }
                          rows={5}
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Summary (EN)
                        <textarea
                          value={selectedProject.summary.en}
                          onChange={(event) =>
                            updateLocalizedField(
                              selectedProject.slug,
                              "summary",
                              "en",
                              event.target.value
                            )
                          }
                          rows={5}
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        {locale === "tr" ? "Kapsam Maddeleri (TR)" : "Scope Items (TR)"}
                        <textarea
                          value={scopeTr}
                          onChange={(event) => updateScope("tr", event.target.value)}
                          rows={5}
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                      <label className="grid gap-2 text-sm font-medium text-[#17283b]">
                        Scope Items (EN)
                        <textarea
                          value={scopeEn}
                          onChange={(event) => updateScope("en", event.target.value)}
                          rows={5}
                          className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                        />
                      </label>
                    </div>

                    <label className="mt-4 grid gap-2 text-sm font-medium text-[#17283b]">
                      {locale === "tr" ? "Görsel URL’leri" : "Image URLs"}
                      <textarea
                        value={imagesValue}
                        onChange={(event) => updateImages(event.target.value)}
                        rows={6}
                        className="rounded-[18px] border border-[#1d365c]/10 bg-white px-4 py-3 font-normal outline-none transition focus:border-[#bb8c39]/45"
                      />
                    </label>
                  </div>

                  <aside className="space-y-6">
                    <div className="overflow-hidden rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_24px_72px_rgba(23,40,59,0.07)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#bb8c39]">
                        {locale === "tr" ? "Görsel Önizleme" : "Visual Preview"}
                      </p>
                      <div className="relative mt-4 h-[220px] overflow-hidden rounded-[24px] bg-[#f2eadc]">
                        {selectedProject.primaryImage ? (
                          <Image
                            src={selectedProject.primaryImage}
                            alt={getLocalizedText(selectedProject.name, locale)}
                            fill
                            sizes="360px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[#1d365c]/10 bg-[#fff7ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#17283b]/64">
                          {getLocalizedText(selectedProject.category, locale)}
                        </span>
                        <span className="rounded-full border border-[#1d365c]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#17283b]/64">
                          {selectedProject.year}
                        </span>
                        <span className="rounded-full border border-[#1d365c]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#17283b]/64">
                          {isDirty
                            ? locale === "tr"
                              ? "Kaydedilmedi"
                              : "Unsaved"
                            : locale === "tr"
                              ? "Güncel"
                              : "Synced"}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_24px_72px_rgba(23,40,59,0.07)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#bb8c39]">
                        {locale === "tr" ? "Metrikler" : "Metrics"}
                      </p>
                      <div className="mt-4 space-y-3">
                        {selectedProject.metrics.map((metric) => (
                          <div
                            key={`${metric.label.en}-${metric.value.en}`}
                            className="rounded-[20px] border border-[#1d365c]/10 bg-white/90 p-4"
                          >
                            <p className="text-xs uppercase tracking-[0.2em] text-[#17283b]/46">
                              {getLocalizedText(metric.label, locale)}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-[#13263f]">
                              {getLocalizedText(metric.value, locale)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>

                <div className="rounded-[32px] border border-[#1d365c]/10 bg-[rgba(255,255,255,0.84)] p-5 shadow-[0_24px_72px_rgba(23,40,59,0.07)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#bb8c39]">
                        {locale === "tr" ? "JSON Önizleme" : "JSON Preview"}
                      </p>
                      <h3 className="mt-2 text-xl font-black text-[#13263f]">
                        {locale === "tr"
                          ? "Seçilen projenin kayıt çıktısı"
                          : "Saved output of the selected project"}
                      </h3>
                    </div>
                    <div className="rounded-full border border-[#1d365c]/10 bg-[#fff7ea] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#17283b]/60">
                      data/projects.json
                    </div>
                  </div>
                  <pre className="mt-5 overflow-x-auto rounded-[24px] bg-[#13263f] p-5 text-xs leading-6 text-[#f7f2e8]">
                    <code>{draftPreview}</code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="rounded-[32px] border border-dashed border-[#1d365c]/14 bg-[rgba(255,255,255,0.72)] p-8 text-center text-[#17283b]/68">
                {locale === "tr"
                  ? "Filtrelere uyan proje bulunamadı."
                  : "No project matched the active filters."}
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}

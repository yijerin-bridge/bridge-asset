import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { ceoProfile } from "@/lib/profile";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${site.url}/#organization`,
    name: site.legalName,
    alternateName: [site.name, site.nameEn],
    url: site.url,
    logo: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: site.tagline,
    foundingDate: site.founded,
    founder: { "@type": "Person", name: site.ceo },
    telephone: `+82-${site.phone.replace(/^0/, "").replace(/-/g, "-")}`,
    email: site.email,
    vatID: site.bizNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: "KR",
    sameAs: [site.sns.blog, site.sns.instagram, site.sns.youtube],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "자산관리 서비스",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${site.url}/services/${s.slug}`,
        },
      })),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: site.url,
    inLanguage: "ko-KR",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about#ceo`,
    name: ceoProfile.name,
    jobTitle: ceoProfile.role,
    worksFor: { "@id": `${site.url}/#organization` },
    description: ceoProfile.intro,
    url: `${site.url}/about`,
    sameAs: [site.sns.blog, site.sns.instagram, site.sns.youtube, site.sns.notion],
    knowsAbout: [
      "자산관리",
      "재무설계",
      "퇴직연금",
      "스타트업 투자",
      "역외펀드",
      "보험",
    ],
    hasCredential: ceoProfile.certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
  };
}

export function serviceJsonLd(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    url: `${site.url}/services/${s.slug}`,
    serviceType: s.title,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "KR",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

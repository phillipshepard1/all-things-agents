/**
 * JSON-LD Structured Data Component
 * Used for adding schema.org markup to pages for rich snippets
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schema generators

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Client Keeper",
    "alternateName": "Client Keeper CRM",
    "url": "https://clientkeeper.io",
    "logo": "https://clientkeeper.io/logo.png",
    "description": "The simple CRM built specifically for real estate agents. Manage clients, automate follow-ups, and close more deals.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@clientkeeper.io",
    },
    "sameAs": [
      // Add social media URLs when available
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Client Keeper",
    "url": "https://clientkeeper.io",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://clientkeeper.io/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Client Keeper CRM",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "description": "AI-powered CRM built specifically for real estate agents. Features MYRA AI assistant for effortless data entry, automated follow-up reminders, and transaction tracking.",
    "offers": {
      "@type": "Offer",
      "price": "19.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "19.00",
        "priceCurrency": "USD",
        "unitCode": "MON",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": "1",
          "unitCode": "MON",
        },
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1",
    },
    "featureList": [
      "MYRA AI Assistant for voice and text data entry",
      "Automated follow-up reminders",
      "Birthday and anniversary alerts",
      "Transaction tracking",
      "Mobile app for iOS and Android",
      "Email integration",
      "Lead source tracking",
      "Team collaboration",
    ],
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "url": post.url,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.authorName,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Client Keeper",
      "logo": {
        "@type": "ImageObject",
        "url": "https://clientkeeper.io/logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function generateMobileAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Client Keeper CRM",
    "operatingSystem": "iOS, Android",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered CRM app built specifically for real estate agents. Features MYRA AI assistant for voice-powered data entry, automated follow-up reminders, and transaction tracking.",
    "offers": {
      "@type": "Offer",
      "price": "19.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "19.00",
        "priceCurrency": "USD",
        "unitCode": "MON",
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "500",
      "bestRating": "5",
      "worstRating": "1",
    },
    "downloadUrl": [
      "https://apps.apple.com/us/app/client-keeper-crm/id6756403940",
      "https://play.google.com/store/apps/details?id=com.clientkeeper.crm",
    ],
  };
}

export function generateCollectionPageSchema(params: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": params.name,
    "description": params.description,
    "url": params.url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Client Keeper",
      "url": "https://clientkeeper.io",
    },
  };
}

export function generateWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Client Keeper CRM Web App",
    "applicationCategory": "BusinessApplication",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": "Full-featured web-based CRM for real estate agents. Access your contacts, pipeline, and AI assistant MYRA from any browser.",
    "offers": {
      "@type": "Offer",
      "price": "19.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "19.00",
        "priceCurrency": "USD",
        "unitCode": "MON",
      },
    },
    "featureList": [
      "Dashboard with pipeline overview",
      "Contact management",
      "MYRA AI assistant",
      "Transaction tracking",
      "Follow-up reminders",
      "Email integration",
      "Team collaboration",
    ],
  };
}

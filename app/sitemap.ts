import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clientkeeper.io";

  // Static pages with their priorities
  const staticPages: MetadataRoute.Sitemap = [
    // Client Keeper CRM main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/client-keeper-crm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/client-keeper-crm/mobile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/client-keeper-crm/web-app`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Landing pages
    {
      url: `${baseUrl}/client-keeper-crm/lp/voice-notes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/client-keeper-crm/lp/follow-up`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/client-keeper-crm/lp/work-life`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/client-keeper-crm/lp/organization`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/client-keeper-crm/lp/mobile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Blog
    {
      url: `${baseUrl}/client-keeper-crm/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    // Support docs
    {
      url: `${baseUrl}/client-keeper-crm/support`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    // Legal pages
    {
      url: `${baseUrl}/client-keeper-crm/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/client-keeper-crm/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // Hub pages
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Fetch dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (posts) {
      blogPosts = posts.map((post) => ({
        url: `${baseUrl}/client-keeper-crm/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {
    // Silently fail if database is unavailable during build
  }

  // Fetch blog categories
  let blogCategories: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: categories } = await supabase
      .from("blog_categories")
      .select("slug")
      .eq("is_active", true);

    if (categories) {
      blogCategories = categories.map((category) => ({
        url: `${baseUrl}/client-keeper-crm/blog/category/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      }));
    }
  } catch {
    // Silently fail if database is unavailable during build
  }

  return [...staticPages, ...blogPosts, ...blogCategories];
}

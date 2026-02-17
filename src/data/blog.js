// AUTO-GENERATED — do not edit manually.
// Update via Google Sheets and run: npm run fetch-blog

export const blogPosts = [];

export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}

export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured) || blogPosts[0];
}

export const blogCategories = ["All"];

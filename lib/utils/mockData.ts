import { Article, CategoryType, ReloadingData, HomepageData } from '../types';

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'New Pistol Technology Revolutionizes Accuracy',
    slug: 'new-pistol-technology-revolutionizes-accuracy',
    excerpt: 'Latest innovations in pistol design are setting new standards for accuracy and reliability in competitive shooting.',
    content: `
      <p>The firearms industry has witnessed a remarkable breakthrough in pistol technology that promises to change the landscape of competitive shooting forever.</p>
      
      <h2>Revolutionary Design</h2>
      <p>Engineers have developed a new barrel stabilization system that reduces recoil by 40% while maintaining the same power and velocity. This technology uses advanced materials and precision manufacturing techniques.</p>
      
      <h2>Performance Benefits</h2>
      <p>Early testing shows significant improvements in accuracy, with shooters reporting tighter groupings at all distances. The reduced recoil also allows for faster follow-up shots and improved control.</p>
      
      <h2>Market Impact</h2>
      <p>Industry experts predict this technology will become standard in premium pistols within the next two years, with budget models following shortly after.</p>
    `,
    category: 'pistol',
    categoryName: 'Pistol',
    author: 'John Smith',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    featuredImage: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=1200&h=800&fit=crop',
    tags: ['pistol', 'technology', 'innovation'],
    isFeatured: true,
    isTrending: true,
    viewCount: 1520,
  },
  {
    id: '2',
    title: 'Rifle Ammunition Shortage: What You Need to Know',
    slug: 'rifle-ammunition-shortage-what-you-need-to-know',
    excerpt: 'Understanding the current ammunition shortage and how it affects rifle owners across the country.',
    content: '<p>The ongoing ammunition shortage continues to impact shooters nationwide...</p>',
    category: 'rifle',
    author: 'Sarah Johnson',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    featuredImage: 'https://images.unsplash.com/photo-1614887468227-28e7a86c2df3?w=1200&h=800&fit=crop',
    tags: ['ammunition', 'rifle', 'shortage'],
    isFeatured: true,
    viewCount: 2340,
  },
  {
    id: '3',
    title: 'Top 10 Shotguns for Home Defense in 2025',
    slug: 'top-10-shotguns-home-defense-2025',
    excerpt: 'Our comprehensive review of the best shotguns for home protection, tested and rated by experts.',
    content: '<p>When it comes to home defense, shotguns remain a popular choice...</p>',
    category: 'shotgun',
    author: 'Mike Davis',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    featuredImage: 'https://images.unsplash.com/photo-1614887468218-f099c6f79e47?w=1200&h=800&fit=crop',
    tags: ['shotgun', 'home-defense', 'review'],
    isFeatured: true,
    isTrending: true,
    viewCount: 3120,
  },
  {
    id: '4',
    title: 'Classic Revolvers: A Timeless Choice',
    slug: 'classic-revolvers-timeless-choice',
    excerpt: 'Exploring why revolvers continue to be favored by enthusiasts despite modern semi-automatic alternatives.',
    content: '<p>Revolvers have been around for over 150 years...</p>',
    category: 'revolver',
    author: 'Robert Lee',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    featuredImage: 'https://images.unsplash.com/photo-1595590424262-f21b64a7d0cb?w=1200&h=800&fit=crop',
    tags: ['revolver', 'classic', 'review'],
    isTrending: true,
    viewCount: 1890,
  },
  {
    id: '5',
    title: 'Understanding Ballistics: A Beginner\'s Guide',
    slug: 'understanding-ballistics-beginners-guide',
    excerpt: 'Learn the fundamentals of ammunition ballistics and how it affects your shooting performance.',
    content: '<p>Ballistics is the science of projectiles and firearms. Understanding ballistics helps shooters make informed decisions about ammunition selection and improve accuracy.</p>',
    category: 'ammunition',
    author: 'Dr. Emily Carter',
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    featuredImage: 'https://images.unsplash.com/photo-1614887468227-28e7a86c2df3?w=1200&h=800&fit=crop',
    tags: ['ammunition', 'education', 'ballistics'],
    viewCount: 2150,
  },
];

// Generate more articles
export const generateMockArticles = (category: CategoryType, count: number = 10): Article[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${category}-${i + 1}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Article ${i + 1}`,
    slug: `${category}-article-${i + 1}`,
    excerpt: `This is a sample excerpt for ${category} article number ${i + 1}. It provides a brief overview of the content.`,
    content: `<p>Full content for ${category} article ${i + 1}...</p>`,
    category,
    author: 'Staff Writer',
    publishedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
    featuredImage: `https://images.unsplash.com/photo-${1614887468220 + i}?w=1200&h=800&fit=crop`,
    tags: [category, 'firearms'],
    viewCount: Math.floor(Math.random() * 3000) + 500,
  }));
};

export const mockReloadingData: ReloadingData[] = [
  {
    id: '1',
    caliber: '.308 Winchester',
    bulletWeight: '168 gr',
    powder: 'Varget',
    powderWeight: '44.0 gr',
    velocity: '2650 fps',
    pressure: '58,000 psi',
    notes: 'Excellent accuracy at 600 yards',
  },
  {
    id: '2',
    caliber: '.223 Remington',
    bulletWeight: '55 gr',
    powder: 'H335',
    powderWeight: '25.0 gr',
    velocity: '3240 fps',
    pressure: '52,000 psi',
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(a => a.slug === slug);
};

export const getArticlesByCategory = (category: CategoryType): Article[] => {
  return [...mockArticles.filter(a => a.category === category), ...generateMockArticles(category, 10)];
};

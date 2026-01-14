import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, CATEGORIES, generateExcerpt } from '@/lib/utils/helpers';
import { getArticlesByCategory } from '@/lib/api/services';
import ShareButtons from '@/components/article/ShareButtons';

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

function getCategorySlugById(id: number): string {
    const categoryMap: Record<number, string> = {
        1: 'news',
        2: 'ammunition',
        3: 'pistol',
        4: 'rifle',
        5: 'shotgun',
        6: 'revolver',
        7: 'reloading',
        8: 'optics',
        9: 'accessories',
        10: 'history',
    };
    return categoryMap[id] || 'news';
}


export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;

    const allArticles = await Promise.all(
        CATEGORIES.map(async (cat) => {
            try {
                return await getArticlesByCategory(cat.slug);
            } catch {
                return [];
            }
        })
    );

    const article = allArticles.flat().find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const categorySlug = getCategorySlugById(article.category);
    const categoryName = CATEGORIES.find(c => c.slug === categorySlug)?.name || 'Article';
    const excerpt = generateExcerpt(article.content, 200);
    const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/article/${article.slug}`;

    return (
        <article className="bg-white">
            {/* Breadcrumbs */}
            <div className="border-b border-[#e4e4e4]">
                <div className="container-custom py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-[#bb1919]">
                            Home
                        </Link>
                        <span className="text-gray-400">/</span>
                        <Link
                            href={`/${categorySlug}`}
                            className="text-gray-600 hover:text-[#bb1919]"
                        >
                            {categoryName}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 line-clamp-1">{article.title}</span>
                    </nav>
                </div>
            </div>

            {/* Article Header */}
            <div className="container-custom py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Category Badge */}
                    <div className="mb-4">
                        <Link
                            href={`/${categorySlug}`}
                            className="inline-block bg-[#bb1919] text-white text-xs font-bold px-3 py-1 uppercase hover:bg-[#a01616] transition-colors"
                        >
                            {categoryName}
                        </Link>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        {article.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 pb-6 border-b border-[#e4e4e4]">
                        {article.author && (
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">By {article.author}</span>
                            </div>
                        )}
                        <time>{formatDate(article.published_at)}</time>
                    </div>

                    {/* Featured Image */}
                    {article.image && (
                        <div className="relative h-[400px] md:h-[500px] my-8">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover rounded"
                                priority
                                sizes="(max-width: 896px) 100vw, 896px"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div
                        className="article-content prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-[#e4e4e4]">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-sm font-semibold text-gray-700">Tags:</span>
                                {article.tags.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/search?q=${tag}`}
                                        className="text-sm bg-[#f2f2f2] hover:bg-[#e4e4e4] px-3 py-1 rounded transition-colors"
                                    >
                                        Tag {tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Share Buttons */}
                    <ShareButtons title={article.title} url={articleUrl} />
                </div>
            </div>
        </article>
    );
}
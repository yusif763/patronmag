import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getCategoryName } from '@/lib/utils/helpers';
import { getArticleBySlug, mockArticles } from '@/lib/utils/mockData';
import ShareButtons from '@/components/article/ShareButtons';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | PatronMag`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.featuredImage ? [article.featuredImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

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
              href={`/${article.category}`}
              className="text-gray-600 hover:text-[#bb1919]"
            >
              {getCategoryName(article.category)}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <Link
              href={`/${article.category}`}
              className="inline-block bg-[#bb1919] text-white text-xs font-bold px-3 py-1 uppercase hover:bg-[#a01616] transition-colors"
            >
              {getCategoryName(article.category)}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-600 pb-6 border-b border-[#e4e4e4]">
            {article.author && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">By {article.author}</span>
              </div>
            )}
            <time>{formatDate(article.publishedAt)}</time>
            {article.viewCount && (
              <span>{article.viewCount.toLocaleString()} views</span>
            )}
          </div>

          {/* Featured Image */}
          {article.featuredImage && (
            <div className="relative h-[400px] md:h-[500px] my-8">
              <Image
                src={article.featuredImage}
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
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-sm bg-[#f2f2f2] hover:bg-[#e4e4e4] px-3 py-1 rounded transition-colors"
                  >
                    {tag}
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

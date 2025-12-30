interface LoadingSkeletonProps {
  variant?: 'article' | 'featured' | 'small' | 'horizontal';
  count?: number;
}

export default function LoadingSkeleton({ 
  variant = 'article', 
  count = 1 
}: LoadingSkeletonProps) {
  if (variant === 'featured') {
    return (
      <div className="relative h-[400px] md:h-[500px] skeleton rounded-none" />
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-32 h-24 skeleton flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-16 skeleton" />
              <div className="h-4 skeleton" />
              <div className="h-4 w-3/4 skeleton" />
              <div className="h-3 w-24 skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-16 skeleton" />
            <div className="h-4 skeleton" />
            <div className="h-4 w-4/5 skeleton" />
            <div className="h-3 w-24 skeleton" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-48 skeleton" />
          <div className="h-3 w-20 skeleton" />
          <div className="h-5 skeleton" />
          <div className="h-5 w-4/5 skeleton" />
          <div className="h-4 skeleton" />
          <div className="h-4 w-3/4 skeleton" />
          <div className="h-3 w-24 skeleton" />
        </div>
      ))}
    </div>
  );
}

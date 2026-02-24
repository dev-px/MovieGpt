const ShimmerBlock = ({ className }) => (
    <div
        className={`bg-gray-800/60 animate-pulse rounded ${className}`}
    />
);

const MovieDetailsShimmer = () => {
    return (
        <div className="bg-black text-white min-h-screen">

            {/* HERO SHIMMER */}
            <div className="relative h-[50vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden">

                {/* Image shimmer */}
                <ShimmerBlock className="w-full h-full" />

                <div className="absolute bottom-6 sm:bottom-10 left-6 md:left-16 max-w-2xl md:max-w-3xl z-50 space-y-4">

                    {/* Title */}
                    <ShimmerBlock className="h-10 w-3/4" />

                    {/* Tagline */}
                    <ShimmerBlock className="h-4 w-1/2" />

                    {/* Meta info row */}
                    <div className="flex gap-3">
                        <ShimmerBlock className="h-6 w-16" />
                        <ShimmerBlock className="h-6 w-20" />
                        <ShimmerBlock className="h-6 w-24" />
                        <ShimmerBlock className="h-6 w-32" />
                    </div>

                    {/* Play button */}
                    <ShimmerBlock className="h-10 w-28" />
                </div>
            </div>

            {/* DETAILS SECTION SHIMMER */}
            <div className="px-6 sm:px-10 md:px-16 py-10 md:py-14 space-y-8">

                {/* Overview */}
                <div className="space-y-3">
                    <ShimmerBlock className="h-6 w-40" />
                    <ShimmerBlock className="h-4 w-full" />
                    <ShimmerBlock className="h-4 w-5/6" />
                    <ShimmerBlock className="h-4 w-4/6" />
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <ShimmerBlock className="h-4 w-24" />
                            <ShimmerBlock className="h-4 w-40" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsShimmer;

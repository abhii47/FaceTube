export const FeedSkeleton = () => {
    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="bg-[#183D3D] rounded-xl h-72 animate-pulse"
                />
            ))}
        </div>
    );
};
export default function YouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const isPlaceholder = videoId === "REPLACE_ME";

  if (isPlaceholder) {
    return (
      <div className="aspect-video w-full bg-white/10 border-2 border-dashed border-white/40 flex items-center justify-center text-white/70 text-sm font-display uppercase tracking-wide text-center px-4">
        Add the &ldquo;freelance quarterback&rdquo; YouTube video ID here
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

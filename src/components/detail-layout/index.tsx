import { PodcastDetailCard } from "../podcast-detail-card";

interface DetailLayoutProps {
  children: React.ReactNode;
}

export const DetailLayout = ({ children }: DetailLayoutProps) => {
  return (
    <section className="flex gap-4">
      <article className="min-w-200px p-4">
        <PodcastDetailCard />
      </article>
      <article className="flex-1">{children}</article>
    </section>
  );
};

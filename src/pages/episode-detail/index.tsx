import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { DetailLayout } from "../../components/index";
import { podcastApi } from "../../services/podcast";
import { formatDate } from "../../utils/format-date";

interface PodcastDetail {
  artworkUrl600: string;
  collectionName: string;
  trackName: string;
  episodeUrl: string;
  genres: {
    name: string;
  }[];
  releaseDate: string;
  description: string;
  trackId: number;
}

interface PodcastEpisode {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

const EpisodeDetails = () => {
  const [podcastDetail, setPodcastDetail] = useState<PodcastDetail | null>(
    null
  );
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();

  const handlePodcastClick = () => {
    navigate(-1);
  };

  const {
    data: ptmr,
    isLoading,
    isSuccess,
  } = podcastApi.useGetPodcastEpisodesQuery(podcastId);

  useEffect(() => {
    const _podcastDetail = ptmr?.contents
      ? JSON.parse(ptmr?.contents)
      : { results: [] };

    setPodcastDetail(
      _podcastDetail.results.find(
        (t: { trackId: string | undefined }) => t.trackId == episodeId
      )
    );
  }, [ptmr]);

  const _podcastDetail = ptmr?.contents
    ? JSON.parse(ptmr?.contents)
    : { results: [] };

  return (
    <DetailLayout>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <img
          src={podcastDetail?.artworkUrl600}
          alt={podcastDetail?.collectionName}
          width="100"
          height="100"
          style={{ cursor: "pointer", marginRight: 16 }}
        />
        <div>
          <h2 style={{ cursor: "pointer", marginBottom: 0 }}>
            {podcastDetail?.trackName}
          </h2>
          <div>
            {podcastDetail?.episodeUrl && (
              <audio
                controls
                src={podcastDetail.episodeUrl}
                style={{ width: "100%" }}
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            )}
          </div>
        </div>
      </Container>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && podcastDetail ? (
          <div>
            <p>Artist: {podcastDetail.collectionName}</p>
            <p>Track: {podcastDetail.trackName}</p>
            {podcastDetail?.genres?.map(({ name }) => (
              <p>Genre: {name}</p>
            ))}
            <p>
              Release date:{" "}
              {podcastDetail.releaseDate &&
                formatDate(podcastDetail.releaseDate)}
            </p>
            <p>Description: {podcastDetail.description}</p>
            <button
              type="button"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 mt-8"
              onClick={handlePodcastClick}
            >
              Back to Podcast
            </button>
          </div>
        ) : (
          <p>Failed to load podcast.</p>
        )}
      </Container>
    </DetailLayout>
  );
};

export default EpisodeDetails;

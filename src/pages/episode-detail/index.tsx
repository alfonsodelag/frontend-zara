import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { DetailLayout } from "../../components/index";
import { podcastApi } from "../../services/podcast";
import { formatDate } from "../../utils/format-date";
import { formatSeconds } from "../../utils/format-seconds";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const navigate = useNavigate();

  const handlePodcastClick = () => {
    navigate(-1);
  };

  const {
    data: ptmr,
    isLoading,
    isSuccess,
  } = podcastApi.useGetEpisodeByIdQuery({ podcastId, episodeId });

  const podcastDetail = {};

  console.log("episodio detalle:", ptmr);

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
          src={podcastDetail?.artworkUrl100}
          alt={podcastDetail?.collectionName}
          width="100"
          height="100"
          style={{ cursor: "pointer", marginRight: 16 }}
        />
        <div>
          <h2 style={{ cursor: "pointer", marginBottom: 0 }}>
            {podcastDetail?.collectionName}
          </h2>
          <p style={{ cursor: "pointer" }}>{podcastDetail?.artistName}</p>
          {podcastDetail?.feedUrl && (
            <audio
              controls
              src={podcastDetail.feedUrl}
              style={{ width: "100%" }}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          )}
        </div>
      </Container>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : isSuccess && podcastDetail ? (
          <div>
            <p>Artist: {podcastDetail.artistName}</p>
            <p>Track: {podcastDetail.trackName}</p>
            <p>Genre: {podcastDetail.primaryGenreName}</p>
            <p>
              Release date:{" "}
              {podcastDetail.releaseDate &&
                formatDate(podcastDetail.releaseDate)}
            </p>
            <p>Track count: {podcastDetail.trackCount}</p>
            <p>Explicitness: {podcastDetail.trackExplicitness}</p>
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

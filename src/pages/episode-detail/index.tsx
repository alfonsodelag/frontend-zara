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
  const {
    data: ptmr,
    isLoading,
    isSuccess,
  } = podcastApi.useGetPodcastByIdQuery(podcastId);
  const podcastDetail = ptmr && JSON.parse(ptmr.contents);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePodcastClick = () => {
    navigate(`/podcast/${podcastId}`);
  };

  const episode =
    isSuccess &&
    podcastDetail?.results?.find((episode) => episode.trackId === episodeId);

  const handleTitleClick = () => {
    window.open(episode?.trackViewUrl, "_blank");
  };

  const handleAuthorClick = () => {
    window.open(episode?.artistViewUrl, "_blank");
  };

  const descriptionHtml = { __html: episode?.longDescription || "" };

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
          onClick={handlePodcastClick}
          style={{ cursor: "pointer", marginRight: 16 }}
        />
        <div>
          <h2
            onClick={handlePodcastClick}
            style={{ cursor: "pointer", marginBottom: 0 }}
          >
            {podcastDetail?.collectionName}
          </h2>
          <p onClick={handleAuthorClick} style={{ cursor: "pointer" }}>
            {podcastDetail?.artistName}
          </p>
        </div>
      </Container>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 style={{ marginBottom: 16 }}>{episode?.trackName}</h1>
            <audio
              src={episode?.enclosureUrl}
              controls
              style={{ marginBottom: 16 }}
            />
            <div dangerouslySetInnerHTML={descriptionHtml} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <div>
                <p>Released on {formatDate(episode?.releaseDate)}</p>
                <p>
                  Duration:{" "}
                  {typeof episode?.trackTimeMillis === "number"
                    ? formatSeconds(episode?.trackTimeMillis / 1000)
                    : "Unknown"}
                  Duration: {formatSeconds(episode?.trackTimeMillis / 1000)}
                </p>
              </div>
              <button
                type="button"
                className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handlePodcastClick}
              >
                Back to Podcast
              </button>
            </div>
          </>
        )}
      </Container>
    </DetailLayout>
  );
};

export default EpisodeDetails;

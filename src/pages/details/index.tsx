import { useMemo, useEffect } from "react";
import { Column } from "react-table";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../components/container";
import { DetailLayout } from "../../components/index";
import Table from "../../components/podcast-detail-table";
import { podcastApi } from "../../services/podcast";
import { formatDate } from "../../utils/format-date";
import { formatSeconds } from "../../utils/format-seconds";

type Podcast = {
  trackId: string;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
};

type Row = {
  trackId: any;
  id: string;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
};
const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { data: ptmr, isLoading } =
    podcastApi.useGetPodcastByIdQuery(podcastId);

  const podcastDetail = ptmr && JSON.parse(ptmr.contents);
  const navigate = useNavigate();

  const columns: Column<Row>[] = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "trackName",
      },
      {
        Header: "Date",
        accessor: "releaseDate",
        Cell: ({ value }) => <span>{formatDate(value)}</span>,
      },
      {
        Header: "Duration",
        accessor: "trackTimeMillis",
        Cell: ({ value }) => <span>{formatSeconds(value)}</span>,
      },
    ],
    []
  );

  const { data: episodesData } =
    podcastApi.useGetPodcastEpisodesQuery(podcastId);

  const handleRowClick = (row: Row) => {
    navigate(`/podcast/${podcastId}/episode/${row.trackId}`);
  };

  const _episodesData = episodesData?.contents
    ? JSON.parse(episodesData?.contents)
    : { results: [] };

  return (
    <DetailLayout>
      <Container sx={{ marginBottom: 16 }}>
        <h2> Episodes: 66</h2>
      </Container>
      <Container>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            handleRowClick={handleRowClick}
            data={_episodesData.results}
            columns={columns}
          />
        )}
      </Container>
    </DetailLayout>
  );
};

export default PodcastDetail;

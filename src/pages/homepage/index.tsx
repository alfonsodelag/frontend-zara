import { useMemo, useState } from "react";
import { SearchBox, PodcastList } from "../../components";
import { podcastApi } from "../../services/podcast";

interface SearchContainerProps {
  filteredItems: any[];
  setSearchText: (text: string) => void;
}

const SearchContainer = ({
  filteredItems,
  setSearchText,
}: SearchContainerProps) => (
  <div className="flex justify-end items-center gap-2 mb-12">
    <span className="bg-blue-500 text-white rounded-full font-bold p-1">
      {filteredItems.length}
    </span>
    <SearchBox onChange={setSearchText} />
  </div>
);

const Home = () => {
  const { data, isLoading, error } = podcastApi.useGetPodcastsQuery({});
  const [searchText, setSearchText] = useState("");

  const filterByText = (field: string) =>
    field.toLowerCase().includes(searchText.toLowerCase());

  const podcastList = data && JSON.parse(data.contents).feed.entry;

  const filteredItems = useMemo(() => {
    if (searchText.length === 0) return podcastList;
    return podcastList.filter((podcast: any) => {
      const name = podcast["im:name"]["label"];
      const author = podcast["im:artist"]["label"];
      return filterByText(name) || filterByText(author);
    });
  }, [podcastList, searchText]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ("message" in error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>Error: Something went wrong</div>;
    }
  }

  return (
    <>
      <SearchContainer
        filteredItems={filteredItems}
        setSearchText={setSearchText}
      />
      <PodcastList podcastList={filteredItems} />
    </>
  );
};

export default Home;

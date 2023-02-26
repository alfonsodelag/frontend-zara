import { useDispatch } from "react-redux";
import { saveCurrentPodcast } from "../../state/details.slice";
import { PodcastCard } from "../podcastcard";

type Podcast = {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:image": {
    label: string;
  }[];
  "im:name": {
    label: string;
  };
  "im:artist": {
    label: string;
  };
};

type Props = {
  podcastList: Podcast[];
};

export const PodcastList = ({ podcastList }: Props) => {
  const dispatch = useDispatch();

  // Save the podcastList to local storage
  localStorage.setItem("podcastList", JSON.stringify(podcastList));

  return (
    <section className="flex flex-wrap justify-center gap-16 my-8">
      {podcastList.map((podcast) => {
        const id = podcast.id.attributes["im:id"];
        const image = podcast["im:image"][1]["label"];
        const name = podcast["im:name"]["label"];
        const author = podcast["im:artist"]["label"];

        const handleClick = () => {
          dispatch(saveCurrentPodcast(podcast));
        };

        return (
          <PodcastCard
            key={id}
            id={id}
            image={image}
            name={name}
            author={author}
            onClick={handleClick}
          />
        );
      })}
    </section>
  );
};

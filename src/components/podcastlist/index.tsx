import { useDispatch } from "react-redux";
import { saveCurrentPodcast } from "../../state/details.slice";
import { PodcastCard } from "../podcastcard";

export const PodcastList = ({ podcastList }) => {
  const dispatch = useDispatch();

  return (
    <section className="flex flex-wrap justify-center gap-8">
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

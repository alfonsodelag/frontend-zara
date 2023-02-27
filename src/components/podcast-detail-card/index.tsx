import { useSelector } from "react-redux";

export const PodcastDetailCard = () => {
  const { currentPodcast } = useSelector((state) => state.podcast);

  if (!currentPodcast) {
    const podcastList = JSON.parse(localStorage.getItem("podcastList"));
    const id = localStorage.getItem("currentPodcastId");
    const podcast = podcastList.find(
      (podcast) => podcast.id.attributes["im:id"] === id
    );

    if (!podcast) {
      return null;
    }

    const image = podcast["im:image"][2]["label"];
    const name = podcast["im:name"]["label"];
    const author = podcast["im:artist"]["label"];
    const description = podcast["summary"]["label"];

    return (
      <div className="flex flex-col p-4 shadow-md max-w-xs min-w-xs">
        <div className="text-center pb-4 border-b border-gray-300">
          <img
            className="rounded-lg h-48 w-48 mx-auto"
            src={image}
            alt={name}
          />
        </div>
        <div className="pt-4 pb-4 border-b border-gray-300">
          <h3 className="text-sm">{name}</h3>
          <p className="text-xs">by {author}</p>
        </div>
        <div className="pt-4">
          <strong className="text-sm block mb-4">Description:</strong>
          <p className="text-sm leading-5">{description}</p>
        </div>
      </div>
    );
  }

  const image = currentPodcast["im:image"][2]["label"];
  const name = currentPodcast["im:name"]["label"];
  const author = currentPodcast["im:artist"]["label"];
  const description = currentPodcast["summary"]["label"];

  // Save the currentPodcast id to local storage
  localStorage.setItem(
    "currentPodcastId",
    currentPodcast.id.attributes["im:id"]
  );

  return (
    <div className="flex flex-col p-4 shadow-md max-w-xs min-w-xs">
      <div className="text-center pb-4 border-b border-gray-300">
        <img className="rounded-lg h-48 w-48 mx-auto" src={image} alt={name} />
      </div>
      <div className="pt-4 pb-4 border-b border-gray-300">
        <h3 className="text-sm">{name}</h3>
        <p className="text-xs">by {author}</p>
      </div>
      <div className="pt-4">
        <strong className="text-sm block mb-4">Description:</strong>
        <p className="text-sm leading-5">{description}</p>
      </div>
    </div>
  );
};

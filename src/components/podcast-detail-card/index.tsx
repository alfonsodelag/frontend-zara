import { useSelector } from "react-redux";

export const PodcastDetailCard = () => {
  const { currentPodcast: podcast } = useSelector((state) => state.podcast);

  const image = podcast["im:image"][2]["label"];
  const name = podcast["im:name"]["label"];
  const author = podcast["im:artist"]["label"];
  const description = podcast["summary"]["label"];

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

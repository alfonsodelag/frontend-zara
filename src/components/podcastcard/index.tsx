import { useNavigate } from "react-router-dom";

interface PodcastCardProps {
  id: string;
  image: string;
  name: string;
  author: string;
  onClick: () => void;
}

export const PodcastCard = ({ id, name, image, author, onClick }: PodcastCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="h-56 w-48 bg-white shadow-lg relative text-center flex flex-col justify-end p-4 transition transform hover:scale-105 cursor-pointer"
      onClick={() => {
        onClick();
        navigate(`/podcast/${id}`);
      }}
      key={id}
    >
      <img
        className="w-24 h-24 rounded-full mx-auto absolute -top-8 left-1/2 transform -translate-x-1/2"
        src={image}
        alt={name}
      />
      <h3 className="font-bold text-lg truncate">{name}</h3>
      <p className="text-gray-500 text-sm">{`Author: ${author}`}</p>
    </div>
  );
};

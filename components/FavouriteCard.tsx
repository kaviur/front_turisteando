import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

interface CardProps {
  imageSrc: string;
  title: string;
}

export default function FavouriteCard({
  imageSrc,
  title,
}: CardProps) {
    return (
      <div className="rounded-3xl overflow-hidden w-full h-44  flex items-center ">
          <Image
          className="w-32 h-32 rounded-xl  "
            src={imageSrc}
            alt={title}
            width={400} 
            height={400}
          />
        <div className="m-2 p-2">
          <h2 className="">{title}</h2>
          <div className="flex flex-col ">
            <div className="flex items-center gap-1">
            <FaLocationDot />
            <p>Location, Pais</p>
            </div>
            <div className="flex ">
              <p>Rating</p>
              <div className="divider divider-horizontal mx-0"></div>
              <p>No Reviews</p>
            </div>
          </div>
        </div>
        <button className="btn btn-ghost text-secondary px-2 border border-gray-300 h-20 rounded-full hover:bg-base-200" >
        <IoIosArrowForward size={24}/>

        </button>
      </div>
    );
  }
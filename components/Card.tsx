import Image from "next/image";

interface CardProps {
  imageSrc: string;            
  title: string;               
  isPrimary: boolean;          
  description: string;         
}

export default function Card({ imageSrc, title, isPrimary, description }: CardProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <Image src={imageSrc} alt={title} width={400} height={400} />
      </figure>
      <div className="card-body">
        <h2 className={`card-title ${isPrimary ? "text-primary" : "text-secondary"}`}>
          {title} <span className="text-gray-500">País</span>
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
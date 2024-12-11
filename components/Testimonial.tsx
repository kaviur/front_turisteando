"use client"
import Image from "next/image";

interface TestimonialProps {
  userImage: string;       // Ruta de la imagen del usuario
  userName: string;        // Nombre del usuario
  city: string;            // Ciudad del usuario
  country: string;         // País del usuario
  date: string;            // Fecha en formato "mes año"
  reviewText: string;      // Texto de la experiencia del usuario
  rating: number;
}

export default function Testimonial({
  userImage,
  userName,
  city,
  country,
  date,
  reviewText,
  rating,
}: TestimonialProps) {
  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n.charAt(0).toUpperCase())
      .join(""); // Retorna las iniciales en mayúscula
  };
  //const [rating, setRating] = useState(0);  // Estado para calificación de estrellas

  // const handleRating = (star: number) => {
  //   setRating(star);
  // };

  return (
    <div className="max-w-xl w-full mb-12 min-h-80 h-80 max-h-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl bg-base-100 p-2 ">
      <div className="flex items-center gap-4">
        {/* Foto de usuario */}
        {userImage ? (
        <Image src={userImage} alt={`${userName}'s photo`} width={50} height={50} className="rounded-full" />
      ) : (
        <div className="w-12 h-12 bg-[#FF0178] flex items-center justify-center text-white rounded-full">
          <span className="text-xl font-semibold">{getInitials(userName)}</span>
        </div>
      )}
        {/* Nombre y ubicación */}
        <div>
          <h3 className="text-lg font-semibold">{userName}</h3>
          <p className="text-sm text-gray-500">{`${city}, ${country} | ${date}`}</p>
        </div>
      </div>
      
      {/* Calificación de estrellas */}
      <div className="flex items-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            //onClick={() => handleRating(star)}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill={star <= rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.62L12 2 9.19 8.62 2 9.25l5.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
      
      {/* Texto de la experiencia */}
      <p className="mt-4 text-gray-700 px-3 text-base h-42 leading-relaxed overflow-hidden">{reviewText}</p>
    </div>
  );
}
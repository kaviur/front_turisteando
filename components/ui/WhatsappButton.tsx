import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const WhatsappButton = () => {
  return (
    <Link
      aria-label="Chat en WhatsApp"
      href="https://wa.me/59898169673"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 z-50"
    >
      <FaWhatsapp className="text-3xl" />
    </Link>
  );
};

export default WhatsappButton;

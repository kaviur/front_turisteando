import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";
import WhatsappButton from "../ui/WhatsappButton";
const imageStyle = {
  width: "auto",
};
export const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content p-10 max-w-screen-2xl mx-auto">
      {/* Logo y navegación */}
      <div className="divider mb-8"></div>
      <div className="footer flex flex-row justify-around items-center md:items-start gap-6">
        <aside className="mb-4 md:mb-0 ">
          <Image
            style={imageStyle}
            src="/logo.png"
            alt="Logo"
            width={160}
            height={160}
          />
        </aside>

        {/* Secciones */}
        <div className="hidden md:flex lg:gap-6 gap-4 justify-around text-gray-500">
          <nav className="flex flex-col gap-4">
            <h6 className="footer-title font-bold text-gray-800 text-lg">
              Sobre Nosotros
            </h6>
            <a className="link link-hover">Sobre Turisteando</a>
            <a className="link link-hover">Como reservar</a>
            <a className="link link-hover">Preguntas frecuentes</a>
          </nav>

          <nav className="flex flex-col gap-4">
            <h6 className="footer-title font-bold text-gray-800 text-lg">
              Soporte
            </h6>
            <a className="link link-hover">Ayuda</a>
            <a className="link link-hover">Contáctenos</a>
            <a className="link link-hover">Políticas de privacidad</a>
            <Link href="/terms-and-conditions" className="link link-hover">
              Términos de servicio
            </Link>
          </nav>

          <nav className="flex flex-col gap-4">
            <h6 className="footer-title font-bold text-gray-800 text-lg">
              Descarga Nuestra APP
            </h6>
            <a className="link link-hover">Turisteando para Android</a>
            <a className="link link-hover">Turisteando para IOS</a>
            <a className="link link-hover">Sitio web</a>

            <div className="flex flex-col h-24 gap-2 ">
              <Image
                className="cursor-pointer max-w-24"
                style={imageStyle}
                src="/appstore.png"
                alt="App Store"
                width={120}
                height={40}
              />
              <Image
                className="cursor-pointer max-w-24"
                style={imageStyle}
                src="/googleplay.png"
                alt="Google Play"
                width={120}
                height={20}
              />
            </div>
          </nav>
        </div>
      </div>
      <div className="divider mt-6"></div>
      {/* Redes Sociales */}
      <div className="mt-6 flex items-center justify-between text-gray-600">
        <div className="flex justify-center gap-8 flex-grow">
          <Link href="#">
            <FaTwitter size={24} />
          </Link>
          <Link href="#">
            <FaInstagram size={24} />
          </Link>
          <Link href="#">
            <FaFacebookSquare size={24} />
          </Link>
        </div>
      </div>
      <p className="text-gray-500 text-center mt-6">2024 © Turisteando</p>
      <WhatsappButton />
    </footer>
  );
};

import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-base-100 text-base-content p-10">
      {/* Logo y navegación */}
      <div className="footer flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6">
        <aside className="mb-4 md:mb-0">
          <Image src="/logo.png" alt="Logo" width={160} height={160} />
        </aside>

        {/* Secciones */}
        <div className="hidden md:flex flex-col gap-8 text-center md:text-left">
          <nav>
            <h6 className="footer-title text-lg">Sobre Nosotros</h6>
            <a className="link link-hover">Sobre Turisteando</a>
            <a className="link link-hover">Como reservar</a>
            <a className="link link-hover">Preguntas frecuentes</a>
          </nav>

          <nav>
            <h6 className="footer-title text-lg">Soporte</h6>
            <a className="link link-hover">Ayuda</a>
            <a className="link link-hover">Contáctenos</a>
            <a className="link link-hover">Políticas de privacidad</a>
            <a className="link link-hover">Términos de servicio</a>
          </nav>

          <nav>
            <h6 className="footer-title text-lg">Descarga Nuestra APP</h6>
            <a className="link link-hover">Turisteando para Android</a>
            <a className="link link-hover">Turisteando para IOS</a>
            <div className="flex justify-center md:justify-start gap-2 mt-2">
              <Image
                src="/appstore.png"
                alt="App Store"
                width={80}
                height={40}
              />
              <Image
                src="/googleplay.png"
                alt="Google Play"
                width={80}
                height={40}
              />
            </div>
          </nav>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="mt-6 flex justify-center gap-8 text-accent">
        <Link href="#" className="text-bodydark1">
          <FaTwitter size={24} />
        </Link>
        <Link href="#" className="text-bodydark1">
          <FaInstagram size={24} />
        </Link>
        <Link href="#" className="text-bodydark1">
          <FaFacebookSquare size={24} />
        </Link>
      </div>
      <p className="text-accent text-center mt-6">2024 © Turisteando</p>
    </footer>
  );
};
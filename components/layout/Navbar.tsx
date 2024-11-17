"use client";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarDays } from "react-icons/fa6";
import { AiOutlineSetting } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/actions";
const imageStyle = {
  width: "auto",
  height: "auto",
};

export const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="z-20 bg-opacity-90 backdrop-blur-lg block md:fixed top-0 left-0 w-full bg-base-100">
      <div className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
        <div className=" ">
          <Link className="btn btn-ghost text-xl hidden md:block" href="/">
            <Image
              style={imageStyle}
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
            />
          </Link>

          {/* Mobile Menu hamburger */}
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu z-50 menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/tours"} className="px-2 py-4">
                  Tours
                </Link>
              </li>
              <li>
                <Link href={"/activities"} className="px-2 py-4">
                  Actividades
                </Link>
              </li>
              <li>
                <Link href={"/news"} className="px-2 py-4">
                  Novedades
                </Link>
              </li>
              <li>
                <Link href={"/favorites"} className="px-2 py-4">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="menu menu-horizontal">
            <li>
              <Link href={"/tours"} className="px-2">
                Tours
              </Link>
            </li>
            <li>
              <Link href={"/activities"} className="px-2">
                Actividades
              </Link>
            </li>
            <li>
              <Link href={"/news"} className="px-2">
                Novedades
              </Link>
            </li>
            <li>
              <Link href={"/favorites"} className="px-2">
                Favoritos
              </Link>
            </li>
          </ul>
        </div>

        {/* User info (Desktop and Mobile) */}
        {session ? (
          <div className="flex items-center gap-2">
            <p className="block md:hidden">Hola, {user?.name}! 👋</p>
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-2 justify-center">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <div className="bg-secondary w-full h-full flex justify-center items-center">
                      <p className="text-white font-semibold text-base">
                        {user?.name?.charAt(0).toUpperCase()}
                        {/*  @ts-expect-error: Error en la validación de tipos */}
                        {user?.lastName?.charAt(0).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
                <div role="button" tabIndex={0}>
                  <RiArrowDropDownLine size={24} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="py-4" href={"/reservations"}>
                    <FaRegCalendarDays className="mr-2" />
                    Mis reservas
                  </Link>
                </li>
                <li>
                  <Link className="py-4" href={"/profile"}>
                    <FaUser className="mr-2" />
                    Perfil
                  </Link>
                </li>
                {/*  @ts-expect-error: Error en la validación de tipos */}
                {user?.role === "ADMIN" && (
                  <li>
                    <Link className="py-4" href={"/admin"}>
                      <AiOutlineSetting className="mr-2" />
                      Dashboard
                    </Link>
                  </li>
                )}
                <div className="divider my-0"></div>
                <li>
                  <button
                    className="py-4 text-accent justify-center"
                    onClick={() => logout()}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <div className="block md:hidden">
              {" "}
              <Link href={"/login"}>
                <PrimaryButton text="Iniciar Sesión" style="mr-3" />
              </Link>{" "}
            </div>
            <div className="hidden md:block">
              <Link href={"/login"}>
                <PrimaryButton text="Iniciar Sesión" style="mr-3" />
              </Link>
              <Link href={"/register"}>
                <SecondaryButton
                  text="Crear Cuenta"
                  style="btn-ghost border border-gray-200"
                />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

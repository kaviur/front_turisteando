"use client";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaLocationDot, FaRegCalendarDays } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <div className="z-10 bg-opacity-0 backdrop-blur-md block md:fixed top-0 left-0 w-full bg-base-100">
      <div className="flex justify-between items-center bg-base-100 bg-opacity-80 backdrop-blur-lg md:shadow-lg p-4">
        <div className=" ">
          <Link className="btn  btn-ghost text-xl hidden md:block" href="/">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
          </Link>

          {/* Mobile Menu hamburger */}
          <div className="dropdown">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
          <ul className="menu menu-horizontal ">
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

        {/* User info desktop */}
        <div className="flex flex-col items-start justify-center gap-2 md:hidden font-semibold ">
          {/* Username desde el backend */}
          <p className="">Hola, Juan Pérez! 👋</p>
          <div className="flex items-center gap-2 text-secondary">
            <FaLocationDot size={16}/>
          {/* Ubicacion desde el backend */}
            <span className="text-xs">Lima, Perú</span>
          </div>
        </div>

        {/* Login and Signup Buttons */}
        <div className="hidden md:block">
          <PrimaryButton text="Iniciar Sesión" style="mr-3" />
          <SecondaryButton
            text="Crear Cuenta"
            style="btn-ghost border border-gray-200"
          />
        </div>
        {/* User info mobile */}
        <div className="dropdown dropdown-end md:hidden">
          <div className="flex items-center gap-2 justify-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <div className="bg-secondary w-full h-full flex justify-center items-center">
                  <p className="text-white font-semibold text-base">NC</p>
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
                <FaRegCalendarDays color="oklch(var(--s))" className="mr-2" />
                Mis reservas
              </Link>
            </li>
            <li>
              <Link className="py-4" href={"/profile"}>
                <FaUser color="oklch(var(--s))" className="mr-2"/>
                Profile
              </Link>
            </li>
            <div className="divider my-0"></div>
            <li>
              <Link className="py-4 text-accent justify-center " href={"/logout"}>
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
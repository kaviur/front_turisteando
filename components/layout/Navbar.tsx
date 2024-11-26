"use client";
import Image from "next/image";
import Link from "next/link";

import { DropdownUser } from "../DropdownUser/DropdowUser";
const imageStyle = {
  width: "auto",
  height: "auto",
};

export const Navbar = () => {
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
          <div className="dropdown z-20">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost md:hidden z-20"
            >
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
              <li className="z-20">
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
        <DropdownUser />
      </div>
    </div>
  );
};

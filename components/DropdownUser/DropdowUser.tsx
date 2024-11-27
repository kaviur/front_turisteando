"use client";
import Link from "next/link";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegCalendarDays, FaUser } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import { getSession, useSession } from "next-auth/react";
import LogoutButton from "../ui/LogoutButton";
import { useEffect } from "react";

export const DropdownUser = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const refetchSession = async () => {
    await getSession(); // Forzar actualización de la sesión
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      refetchSession();
    }
  }, [status]);

  return (
    <>
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
                <LogoutButton />
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
    </>
  );
};

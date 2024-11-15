"use client";
import { Footer } from "@/components/layout/Footer";
import { Main } from "@/components/layout/Main";
import { Navbar } from "@/components/layout/Navbar";
import { Tabs } from "@/components/Tabs";
import { TabsPagination } from "@/components/TabsPagination";

export default function Home() {
  return (
    <>
      {" "}
      <Navbar />
      <div className="md:mt-28 mt-12  max-w-screen-2xl mx-auto ">
        <TabsPagination isMobile={false} />
      </div>
      <Footer />
    </>
  );
}

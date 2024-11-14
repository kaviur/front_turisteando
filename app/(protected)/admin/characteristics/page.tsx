/* "use client";

import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Characteristics } from "@/types/characteristics";
import { useEffect, useState } from "react"; */

const CharacteristicsPage = () => {
  /* const [characteristics, setCharacteristics] = useState<Characteristics[]>([]);

  useEffect(() => {
    // Llama a la API para obtener las características
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/characteristics`)
      .then((res) => res.json())
      .then((data) => setCharacteristics(data))
      .catch((error) => console.error("Error fetching characteristics:", error));
  }, []); */

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Características</h1>
      {/* <ReusableTable data={characteristics} /> */}
    </div>
  );
};

export default CharacteristicsPage;

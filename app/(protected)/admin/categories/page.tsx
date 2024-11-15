"use client";

import ReusableTable from "@/components/ReusableTable/ReusableTable";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    // Llama a la API para obtener las categorías
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all`,{
      
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data); // Aquí haces el console.log de la data
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      {/* <ReusableTable data={categories} /> */}
    </div>
  );
};

export default CategoriesPage;

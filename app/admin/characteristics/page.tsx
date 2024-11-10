import AddProductForm from "@/components/AddProductForm/AddProductForm";

export default function Home() {
  return (
    <>
      <div className="ml-96 flex justify-center">
        {/* Cambiar a componente characteristics */}
        <AddProductForm />
      </div>
    </>
  );
}

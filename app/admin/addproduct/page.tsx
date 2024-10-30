// app/admin/addproduct/page.tsx
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import AddProductForm from "@/app/admin/addproduct/AddProductForm";

export default function AddProductPage() {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <div className="flex-1"> 
        <AddProductForm />
      </div>
      <Footer />
    </div>
  );
}

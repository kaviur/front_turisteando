"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Component() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <Button className="bg-pink-500 hover:bg-pink-600 text-white mt-36">
            Agregar Producto
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-pink-500">Agregar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <Input
              id="name"
              placeholder="Ingresar Nombre del Producto"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Categoría
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona la categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="category1">Categoría 1</SelectItem>
                <SelectItem value="category2">Categoría 2</SelectItem>
                <SelectItem value="category3">Categoría 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="description"
              placeholder="Ingresa la descripción del producto"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Precio
            </label>
            <Input
              id="price"
              type="number"
              placeholder="Ingresar precio del producto"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Imagen
            </label>
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden" // Ocultar el input original
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setImage(file);
                }}
              />
              <button
                onClick={() => document.getElementById("image")?.click()} // Hacer clic en el input oculto
                className="flex items-center justify-center w-full h-10 bg-slate-50 border border-gray-300 rounded-md hover:bg-slate-100 focus:outline-none"
              >
                {image ? (
                  <span className="text-sm text-slate-600">{image.name}</span>
                ) : (
                  <span className="text-sm text-gray-500">
                    Seleccionar archivo
                  </span>
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            Crear Producto
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

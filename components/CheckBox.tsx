import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CheckboxProps = {
  isChecked: boolean; // Estado inicial proporcionado por el padre
  onChange: (newCheckedState: boolean) => void; // Callback para notificar el cambio
};

export default function Checkbox({ isChecked, onChange }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked); // Inicializa el estado con la prop
  const router = useRouter();
  
  // Sincronizar el estado local con la prop isChecked
  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = () => {
    const newCheckedState = !checked; // Cambiar el estado
    setChecked(newCheckedState); // Actualiza el estado local
    onChange(!newCheckedState); // Notificar al padre

  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={checked} // Vincular el estado local
          onChange={handleChange} // Llamar a handleChange cuando cambie el checkbox
        />
      </label>
    </div>
  );
}
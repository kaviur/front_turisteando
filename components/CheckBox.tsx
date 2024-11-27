import { useState } from "react";

type CheckboxProps = {
  isChecked: boolean; // Nueva prop para manejar el estado inicial
};

export default function Checkbox({ isChecked }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked); // Inicializar el estado con la prop

  const handleChange = () => {
    setChecked(!checked); // Cambiar el estado al hacer clic
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          checked={checked} // Vincular el estado
          onChange={handleChange} // Manejar cambios
        />
      </label>
    </div>
  );
}
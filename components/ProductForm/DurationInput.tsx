interface DurationInputProps {
    value: string; // Duración completa como string (e.g., "3 Días")
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      type: "durationValue" | "durationUnit"
    ) => void;
  }
  
  const DurationInput: React.FC<DurationInputProps> = ({ value, onChange }) => {
    const [number, unit] = value.split(" "); // Divide el valor en número y unidad
  
    return (
      <div className="flex items-center gap-4">
        {/* Input para número */}
        <input
          type="number"
          min="1"
          value={number || ""}
          onChange={(e) => onChange(e, "durationValue")}
          placeholder="Duración"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-accent active:border-accent disabled:cursor-default disabled:bg-whiter"
        />
        
        {/* Select para unidad */}
        <select
          value={unit || "Días"}
          onChange={(e) => onChange(e, "durationUnit")}
          className="select w-32"
        >
          <option value="Horas">Horas</option>
          <option value="Días">Días</option>
          <option value="Semanas">Semanas</option>
          <option value="Meses">Meses</option>
        </select>
      </div>
    );
  };
  
  export default DurationInput;
  
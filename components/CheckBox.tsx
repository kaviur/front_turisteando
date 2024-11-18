import { useState } from 'react';

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="form-control">
    <label className="label cursor-pointer">
      <input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
    </label>
  </div>
  );
}
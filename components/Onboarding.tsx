import React from 'react';

interface OnboardingProps {
  onSkip: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onSkip }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <img src="/onboarding.png" alt="Onboarding" className="w-3/4 mb-6" />
      <h2 className="text-2xl mb-4">¡Bienvenido a nuestra app!</h2>
      <div className="space-x-4 mb-6">
        <button className="btn btn-primary">Iniciar Sesión</button>
        <button className="btn btn-secondary">Registrar</button>
      </div>
      <button onClick={onSkip} className="text-sm text-gray-500 underline">
        Omitir
      </button>
    </div>
  );
};

export default Onboarding;

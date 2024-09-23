"use client"

import { useState } from 'react';
import EstimationForm from './components/EstimationForm';
import Result from './components/Result';
import { calculateEstimation } from './utils/calculate';

export default function Home() {
  const [estimation, setEstimation] = useState(null);

  const handleFormSubmit = (formData : any) => {
    const result = calculateEstimation(formData);
    setEstimation({
      ...formData,
      totalCost: result.totalCost,
      totalHours: result.totalHours,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Application de Devis pour Freelances</h1>
      <EstimationForm onSubmit={handleFormSubmit} />
      {estimation && <Result estimation={estimation} />}
    </div>
  );
}
"use client"

import { useState } from 'react';
import EstimationForm from './components/EstimationForm';
import Result from './components/Result';
import { calculateEstimation } from './utils/calculate';

interface Estimation {
  projectName: string;
  complexity: 'low' | 'medium' | 'high';
  features: number;
  hourlyRate: number;
  estimatedHours: number;
  totalCost: number;
  totalHours: number;
}

const Home: React.FC = () =>{
  const [estimation, setEstimation] = useState<Estimation | null>(null);

  const handleFormSubmit = (formData: Omit<Estimation, 'totalCost' | 'totalHours'>) => {
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

export default Home;
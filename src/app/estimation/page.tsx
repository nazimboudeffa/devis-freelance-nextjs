"use client"

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import EstimationForm from '@/components/EstimationForm';
import Result from '@/components/Result';
import { calculateEstimation } from '@/utils/calculate';

type Complexity = 'low' | 'medium' | 'high';

interface Estimation {
  projectName: string;
  complexity: Complexity;
  features: number;
  dailyRate: number;
  hoursPerDay: number;
  totalDays: number;
  totalCost: number;
  tasks: string[]; // Liste des tâches sélectionnées
  totalHours: number; // Durée totale estimée en heures
}

const Home: React.FC = () =>{
  const [estimation, setEstimation] = useState<Estimation | null>(null);

  const handleFormSubmit = (formData: Omit<Estimation, 'totalCost' | 'totalDays'>) => {
    const result = calculateEstimation(formData);
    setEstimation({
      ...formData,
      totalDays: result.totalDays,
      totalCost: result.totalCost,
    });
  };

  return (
    <div className="p-5">
      <NavBar />
      <div className="flex flex-col items-center justify-center">
      <EstimationForm onSubmit={handleFormSubmit} />
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
      {estimation && <Result estimation={estimation} />}
      </div>
    </div>
  );
}

export default Home;
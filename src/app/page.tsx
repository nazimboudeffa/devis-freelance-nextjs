"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EstimationForm from './components/EstimationForm';
import Result from './components/Result';
import { calculateEstimation } from './utils/calculate';

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
      <div className="flex justify-between align-center">
      <h1>Devis pour Freelances</h1>
      <div className="flex flex-row gap-2">
        <Link href="https://github.com/nazimboudeffa/devis-freelance-nextjs" passHref={true}>                   
        <Image
            src="github.svg"
            alt="GitHub"
            height={40}
            width={40} 
        />
        </Link>
        <Link href="https://fr.tipeee.com/nazimboudeffa" passHref={true}>                   
        <Image
            src="tipeee_tip_btn.svg"
            alt="tip"
            height={80}
            width={70} 
        />
        </Link>
      </div>
      </div>
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
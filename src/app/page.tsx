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
  estimatedDays: number;
  hoursPerDay: number;
  totalCost: number;
}

const Home: React.FC = () =>{
  const [estimation, setEstimation] = useState<Estimation | null>(null);

  const handleFormSubmit = (formData: Omit<Estimation, 'totalCost'>) => {
    const result = calculateEstimation(formData);
    setEstimation({
      ...formData,
      totalCost: result.totalCost,
    });
  };

  return (
    <div className="p-5">
      <div className="flex justify-between align-center">
      <h1>Devis pour Freelances</h1>
      <Link href="https://fr.tipeee.com/nazimboudeffa" passHref={true}>                   
      <Image
          src="tipeee_tip_btn.svg"
          alt="tip"
          height={80}
          width={70} 
      />
      </Link>
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
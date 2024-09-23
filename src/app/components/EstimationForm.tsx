import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface FormData {
  projectName: string;
  complexity: 'low' | 'medium' | 'high';
  features: number;
  hourlyRate: number;
  estimatedHours: number;
}

interface EstimationFormProps {
  onSubmit: (formData: FormData) => void;
}

type Complexity = 'low' | 'medium' | 'high';

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [complexity, setComplexity] = useState<Complexity>('low');
  const [features, setFeatures] = useState<number>(1);
  const [hourlyRate, setHourlyRate] = useState<number>(50); // Par défaut, 50€/h
  const [estimatedHours, setEstimatedHours] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      projectName,
      complexity,
      features,
      hourlyRate,
      estimatedHours,
    });
  };

  return (
    <>
    <Link href="https://fr.tipeee.com/nazimboudeffa" passHref={true}>                   
      <Image
          src="tipeee_tip_btn.svg"
          alt="tip"
          height={80}
          width={70} 
      />
    </Link>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom du projet :</label>
        <input 
          type="text" 
          value={projectName} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Complexité :</label>
        <select value={complexity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value as Complexity)}>
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
      </div>
      <div>
        <label>Nombre de fonctionnalités :</label>
        <input 
          type="number"
          value={features} 
          onChange={(e) => setFeatures(Number(e.target.value))} 
          min="1" 
          required 
        />
      </div>
      <div>
        <label>Taux horaire (€/h) :</label>
        <input 
          type="number" 
          value={hourlyRate} 
          onChange={(e) => setHourlyRate(Number(e.target.value))} 
          min="1" 
          required 
        />
      </div>
      <div>
        <label>Estimation des heures :</label>
        <input 
          type="number" 
          value={estimatedHours} 
          onChange={(e) => setEstimatedHours(Number(e.target.value))} 
          min="1" 
          required 
        />
      </div>
      <button className="btn btn-primary" type="submit">Estimer le devis</button>
    </form>
    </>
  );
};

export default EstimationForm;

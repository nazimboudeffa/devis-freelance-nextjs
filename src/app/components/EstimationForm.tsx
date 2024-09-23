import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EstimationForm = ({ onSubmit }: any) => {
  const [projectName, setProjectName] = useState('');
  const [complexity, setComplexity] = useState('low');
  const [features, setFeatures] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(50); // Par défaut, 50€/h
  const [estimatedHours, setEstimatedHours] = useState(10);

  const handleSubmit = (e: any) => {
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
          onChange={(e) => setProjectName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Complexité :</label>
        <select value={complexity} onChange={(e) => setComplexity(e.target.value)}>
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
          onChange={(e : any) => setFeatures(e.target.value)} 
          min="1" 
          required 
        />
      </div>
      <div>
        <label>Taux horaire (€/h) :</label>
        <input 
          type="number" 
          value={hourlyRate} 
          onChange={(e : any) => setHourlyRate(e.target.value)} 
          min="1" 
          required 
        />
      </div>
      <div>
        <label>Estimation des heures :</label>
        <input 
          type="number" 
          value={estimatedHours} 
          onChange={(e : any) => setEstimatedHours(e.target.value)} 
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

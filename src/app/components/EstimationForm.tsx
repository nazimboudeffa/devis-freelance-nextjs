import { useState } from 'react';

interface FormData {
  projectName: string;
  complexity: 'low' | 'medium' | 'high';
  features: number;
  dailyRate: number; // TJM (Tarif Journalier Moyen)
  estimatedDays: number;
  hoursPerDay: number; // Nombre d'heures par jour
}

interface EstimationFormProps {
  onSubmit: (formData: FormData) => void;
}

type Complexity = 'low' | 'medium' | 'high';

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [complexity, setComplexity] = useState<Complexity>('low');
  const [features, setFeatures] = useState<number>(1);
  const [dailyRate, setDailyRate] = useState<number>(250); // Exemple : 400 €/jour
  const [estimatedDays, setEstimatedDays] = useState<number>(5); // Estimation en jours
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // Par défaut, 8 heures/jour


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      projectName,
      complexity,
      features,
      dailyRate,
      estimatedDays,
      hoursPerDay,
    });
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className="w-full">
        <label>Nom du projet
        <input 
          type="text" 
          value={projectName} 
          className="input input-bordered w-full"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} 
          required 
        />
        </label>
      </div>
      <br />
      <div className="w-full">
        <label>Complexité
        <select value={complexity} className="select select-bordered w-full" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value as Complexity)}>
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
        </label>
      </div>
      <br/>
      <div className="w-full">
        <label>Nombre de fonctionnalités
        <input 
          type="number"
          value={features}
          className="input input-bordered w-full" 
          onChange={(e) => setFeatures(Number(e.target.value))} 
          min="1" 
          required 
        />
        </label>
      </div>
      <br />
      <div className="w-full">
        <label>TJM (€/jour)
        <input
          className="input input-bordered w-full"
          type="number"
          value={dailyRate}
          onChange={(e) => setDailyRate(Number(e.target.value))}
          min="1"
          required
        />
        </label>
      </div>
      <br />
      <div className="w-full">
        <label>Estimation des jours
        <input
          className="input input-bordered w-full"
          type="number"
          value={estimatedDays}
          onChange={(e) => setEstimatedDays(Number(e.target.value))}
          min="1"
          required
        />
        </label>
      </div>
      <br />
      <div className="w-full">
        <label>Heures par jour
        <input
          className="input input-bordered w-full"
          type="number"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(Number(e.target.value))}
          min="1"
          max="24"
          required
        />
        </label>
      </div>
      <br/>
      <button className="btn btn-primary" type="submit">Estimer le devis</button>
    </form>
    </>
  );
};

export default EstimationForm;

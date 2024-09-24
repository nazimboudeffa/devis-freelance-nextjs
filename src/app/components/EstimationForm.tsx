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
      <div className="flex justify-between">
        <label>Nom du projet </label>
        <input 
          type="text" 
          value={projectName} 
          className="input input-bordered w-full max-w-xs"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)} 
          required 
        />
      </div>
      <br />
      <div className="flex justify-between">
        <label>Complexité </label>
        <select value={complexity} className="select select-bordered w-full max-w-xs" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setComplexity(e.target.value as Complexity)}>
          <option value="low">Faible</option>
          <option value="medium">Moyenne</option>
          <option value="high">Élevée</option>
        </select>
      </div>
      <br/>
      <div className="flex justify-between">
        <label>Nombre de fonctionnalités </label>
        <input 
          type="number"
          value={features}
          className="input input-bordered w-full max-w-xs" 
          onChange={(e) => setFeatures(Number(e.target.value))} 
          min="1" 
          required 
        />
      </div>
      <br />
      <div className="flex justify-between">
        <label>TJM (€/jour) </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="number"
          value={dailyRate}
          onChange={(e) => setDailyRate(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <br />
      <div className="flex justify-between">
        <label>Estimation des jours </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="number"
          value={estimatedDays}
          onChange={(e) => setEstimatedDays(Number(e.target.value))}
          min="1"
          required
        />
      </div>
      <br />
      <div className="flex justify-between">
        <label>Heures par jour </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="number"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(Number(e.target.value))}
          min="1"
          max="24"
          required
        />
      </div>
      <br/>
      <button className="btn btn-primary" type="submit">Estimer le devis</button>
    </form>
    </>
  );
};

export default EstimationForm;

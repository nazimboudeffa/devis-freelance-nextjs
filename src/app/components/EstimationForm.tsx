import { useState } from 'react';
import Select from 'react-select';

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

// Liste des tâches pour un projet SaaS Next.js
const taskOptions = [
  { value: 'Configuration du projet Next.js', label: 'Configuration du projet Next.js' },
  { value: 'Développement de l\'authentification utilisateur', label: 'Développement de l\'authentification utilisateur' },
  { value: 'Intégration d\'une API REST/GraphQL', label: 'Intégration d\'une API REST/GraphQL' },
  { value: 'Mise en place de la gestion des utilisateurs', label: 'Mise en place de la gestion des utilisateurs' },
  { value: 'Mise en place d\'un système de paiement', label: 'Mise en place d\'un système de paiement' },
  { value: 'Développement d\'un tableau de bord', label: 'Développement d\'un tableau de bord' },
  { value: 'Tests unitaires et E2E', label: 'Tests unitaires et E2E' },
  { value: 'Optimisation SEO', label: 'Optimisation SEO' },
  { value: 'Déploiement sur Vercel/Heroku', label: 'Déploiement sur Vercel/Heroku' },
];

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('Projet Freelance');
  const [complexity, setComplexity] = useState<Complexity>('low');
  const [features, setFeatures] = useState<number>(1);
  const [dailyRate, setDailyRate] = useState<number>(250); // Exemple : 400 €/jour
  const [estimatedDays, setEstimatedDays] = useState<number>(5); // Estimation en jours
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // Par défaut, 8 heures/jour
  const [tasks, setTasks] = useState<string[]>([]); // Stocke les tâches sélectionnées

  // Gestion de la sélection des tâches via react-select
  const handleTaskSelection = (selectedOptions: any) => {
    const selectedTasks = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setTasks(selectedTasks);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      projectName,
      complexity,
      features,
      dailyRate,
      estimatedDays,
      hoursPerDay,
      tasks,
    });
  };

  return (
    <>
    <div className="w-[500px]">
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
        <label>Tâches à réaliser
        <Select
          isMulti
          options={taskOptions}
          onChange={handleTaskSelection}
          placeholder="Sélectionnez les tâches"
        />
        </label>
      </div>
      <div className="w-full">
        {tasks.length > 0 && (
            <ul>
              {tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
        )}
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
    </div>
    </>
  );
};

export default EstimationForm;

import { technologyOptions, technologyTasksMap } from '../data/tasks';
import { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

// Définition du type des options
type OptionType = {
  value: string;
  label: string;
  estimatedHours: number; // Nouveau champ pour le temps estimé de la tâche
};

interface FormData {
  projectName: string;
  complexity: 'low' | 'medium' | 'high';
  features: number;
  dailyRate: number; // TJM (Tarif Journalier Moyen)
  hoursPerDay: number; // Nombre d'heures par jour
  tasks: string[]; // Liste des tâches sélectionnées
  technology: string; // Technologie sélectionnée
  totalHours: number; // Durée totale estimée en heures
}

interface EstimationFormProps {
  onSubmit: (formData: FormData) => void;
}

type Complexity = 'low' | 'medium' | 'high';

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('Projet Freelance');
  const [complexity, setComplexity] = useState<Complexity>('low');
  const [features, setFeatures] = useState<number>(0);
  const [dailyRate, setDailyRate] = useState<number>(250); // Exemple : 400 €/jour
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // Par défaut, 8 heures/jour
  const [tasks, setTasks] = useState<string[]>([]); // Stocke les tâches sélectionnées
  const [technology, setTechnology] = useState<string>(''); // Technologie sélectionnée
  const [availableTasks, setAvailableTasks] = useState<OptionType[]>([]); // Tâches disponibles selon la technologie
  const [totalHours, setTotalHours] = useState<number>(0); // Durée totale estimée en heures

  // Gestion de la sélection des tâches via react-select
  const handleTaskSelection = (
    selectedOptions: MultiValue<OptionType>, // Utilisation de MultiValue pour les options multiples
  ) => {
    const selectedTasks = selectedOptions.map((option) => option.value);
    setTasks(selectedTasks);
    setFeatures(selectedTasks.length); // Mettre à jour le nombre de fonctionnalités

    // Calcul du temps total estimé pour les tâches sélectionnées
    const total = selectedOptions.reduce((sum, option) => sum + option.estimatedHours, 0);
    setTotalHours(total);
    console.log('Total hours:', total);
  };

  // Gestion de la sélection de la technologie via react-select
  const handleTechnologySelection = (
    selectedOption: SingleValue<OptionType> // Utilisation de SingleValue pour la sélection simple
  ) => {
    const selectedTech = selectedOption?.value || '';
    setTechnology(selectedTech);

    // Mettre à jour les tâches disponibles en fonction de la technologie sélectionnée
    if (selectedTech) {
      setAvailableTasks(technologyTasksMap[selectedTech] || []);
    } else {
      setAvailableTasks([]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      projectName,
      complexity,
      features,
      dailyRate,
      hoursPerDay,
      tasks,
      technology,
      totalHours,
    });
  };

  return (
    <>
    <div className="w-80 md:w-[500px] mt-5">
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
      <div>
        <label>Technologie</label>
        <Select
          options={technologyOptions}
          onChange={handleTechnologySelection}
          placeholder="Sélectionnez la technologie"
        />
      </div>
      {availableTasks.length > 0 && (
        <>
        <br />
        <div>
          <label>Tâches à réaliser</label>
          <Select
            isMulti
            options={availableTasks}
            onChange={handleTaskSelection}
            placeholder="Sélectionnez les tâches"
          />
        </div>
        </>
      )}
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
      <button className="btn btn-primary w-full" type="submit">Estimer le devis</button>
    </form>
    </div>
    </>
  );
};

export default EstimationForm;

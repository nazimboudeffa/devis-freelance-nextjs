import { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

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

// Définition du type des options
type OptionType = {
  value: string;
  label: string;
  estimatedHours: number; // Nouveau champ pour le temps estimé de la tâche
};

interface EstimationFormProps {
  onSubmit: (formData: FormData) => void;
}

type Complexity = 'low' | 'medium' | 'high';

// Liste des technologies possibles pour un projet SaaS Next.js
const technologyOptions: OptionType[] = [
  { value: 'nextjs', label: 'Next.js', estimatedHours: 0 },
  { value: 'react', label: 'React.js', estimatedHours: 0 },
  { value: 'typescript', label: 'TypeScript', estimatedHours: 0 },
  { value: 'nodejs', label: 'Node.js', estimatedHours: 0 },
  { value: 'graphql', label: 'GraphQL', estimatedHours: 0 },
  { value: 'tailwindcss', label: 'Tailwind CSS', estimatedHours: 0 },
  { value: 'prisma', label: 'Prisma', estimatedHours: 0 },
  { value: 'mongodb', label: 'MongoDB', estimatedHours: 0 },
  { value: 'postgresql', label: 'PostgreSQL', estimatedHours: 0 },
];

// Mappage des technologies aux tâches associées, avec le temps estimé pour chaque tâche
const technologyTasksMap: { [key: string]: OptionType[] } = {
  nextjs: [
    { value: 'Configuration du projet Next.js', label: 'Configuration du projet Next.js', estimatedHours: 8 },
    { value: 'Routing dynamique', label: 'Routing dynamique', estimatedHours: 5 },
    { value: 'Optimisation du rendu côté serveur', label: 'Optimisation du rendu côté serveur', estimatedHours: 7 },
  ],
  react: [
    { value: 'Configuration du projet React', label: 'Configuration du projet React', estimatedHours: 6 },
    { value: 'Développement des composants', label: 'Développement des composants', estimatedHours: 10 },
    { value: 'Gestion de l\'état avec Redux', label: 'Gestion de l\'état avec Redux', estimatedHours: 8 },
  ],
  typescript: [
    { value: 'Ajout de TypeScript au projet', label: 'Ajout de TypeScript au projet', estimatedHours: 4 },
    { value: 'Typage des composants', label: 'Typage des composants', estimatedHours: 6 },
  ],
  nodejs: [
    { value: 'Création de l\'API avec Node.js', label: 'Création de l\'API avec Node.js', estimatedHours: 10 },
    { value: 'Mise en place d\'Express', label: 'Mise en place d\'Express', estimatedHours: 5 },
  ],
  graphql: [
    { value: 'Création d\'une API GraphQL', label: 'Création d\'une API GraphQL', estimatedHours: 8 },
    { value: 'Mise en place de Apollo Server', label: 'Mise en place de Apollo Server', estimatedHours: 6 },
  ],
  tailwindcss: [
    { value: 'Ajout de Tailwind CSS', label: 'Ajout de Tailwind CSS', estimatedHours: 3 },
    { value: 'Création de composants stylisés', label: 'Création de composants stylisés', estimatedHours: 7 },
  ],
  prisma: [
    { value: 'Intégration de Prisma', label: 'Intégration de Prisma', estimatedHours: 5 },
    { value: 'Gestion des migrations de base de données', label: 'Gestion des migrations de base de données', estimatedHours: 4 },
  ],
  mongodb: [
    { value: 'Connexion à MongoDB', label: 'Connexion à MongoDB', estimatedHours: 6 },
    { value: 'Création des modèles de données', label: 'Création des modèles de données', estimatedHours: 5 },
  ],
  postgresql: [
    { value: 'Connexion à PostgreSQL', label: 'Connexion à PostgreSQL', estimatedHours: 6 },
    { value: 'Création des schémas de base de données', label: 'Création des schémas de base de données', estimatedHours: 7 },
  ],
};

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
      <button className="btn btn-primary" type="submit">Estimer le devis</button>
    </form>
    </div>
    </>
  );
};

export default EstimationForm;

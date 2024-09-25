import { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

interface FormData {
  projectName: string;
  complexity: 'low' | 'medium' | 'high';
  features: number;
  dailyRate: number; // TJM (Tarif Journalier Moyen)
  estimatedDays: number;
  hoursPerDay: number; // Nombre d'heures par jour
  tasks: string[]; // Liste des tâches sélectionnées
  technology: string; // Technologie sélectionnée
}

// Définition du type des options
type OptionType = {
  value: string;
  label: string;
};

interface EstimationFormProps {
  onSubmit: (formData: FormData) => void;
}

type Complexity = 'low' | 'medium' | 'high';

// Liste des technologies possibles pour un projet SaaS Next.js
const technologyOptions: OptionType[] = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'react', label: 'React.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'graphql', label: 'GraphQL' },
  { value: 'tailwindcss', label: 'Tailwind CSS' },
  { value: 'prisma', label: 'Prisma' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
];

// Mappage des technologies aux tâches associées
const technologyTasksMap: { [key: string]: OptionType[] } = {
  nextjs: [
    { value: 'Configuration du projet Next.js', label: 'Configuration du projet Next.js' },
    { value: 'Développement de l\'authentification utilisateur', label: 'Développement de l\'authentification utilisateur' },
    { value: 'Intégration d\'une API REST', label: 'Intégration d\'une API REST' },
    { value: 'Mise en place de la gestion des utilisateurs', label: 'Mise en place de la gestion des utilisateurs' },
    { value: 'Mise en place d\'un système de paiement', label: 'Mise en place d\'un système de paiement' },
    { value: 'Développement d\'un tableau de bord', label: 'Développement d\'un tableau de bord' },
    { value: 'Tests unitaires', label: 'Tests unitaires' },
    { value: 'Optimisation SEO', label: 'Optimisation SEO' },
    { value: 'Déploiement sur Vercel/Heroku', label: 'Déploiement sur Vercel/Heroku' },
  ],
  react: [
    { value: 'Configuration du projet React', label: 'Configuration du projet React' },
    { value: 'Développement des composants', label: 'Développement des composants' },
    { value: 'Gestion de l\'état avec Redux', label: 'Gestion de l\'état avec Redux' },
  ],
  typescript: [
    { value: 'Ajout de TypeScript au projet', label: 'Ajout de TypeScript au projet' },
    { value: 'Typage des composants', label: 'Typage des composants' },
  ],
  nodejs: [
    { value: 'Création de l\'API avec Node.js', label: 'Création de l\'API avec Node.js' },
    { value: 'Mise en place d\'Express', label: 'Mise en place d\'Express' },
  ],
  graphql: [
    { value: 'Création d\'une API GraphQL', label: 'Création d\'une API GraphQL' },
    { value: 'Mise en place de Apollo Server', label: 'Mise en place de Apollo Server' },
  ],
  tailwindcss: [
    { value: 'Ajout de Tailwind CSS', label: 'Ajout de Tailwind CSS' },
    { value: 'Création de composants stylisés', label: 'Création de composants stylisés' },
  ],
  prisma: [
    { value: 'Intégration de Prisma', label: 'Intégration de Prisma' },
    { value: 'Gestion des migrations de base de données', label: 'Gestion des migrations de base de données' },
  ],
  mongodb: [
    { value: 'Connexion à MongoDB', label: 'Connexion à MongoDB' },
    { value: 'Création des modèles de données', label: 'Création des modèles de données' },
  ],
  postgresql: [
    { value: 'Connexion à PostgreSQL', label: 'Connexion à PostgreSQL' },
    { value: 'Création des schémas de base de données', label: 'Création des schémas de base de données' },
  ],
};

const EstimationForm: React.FC<EstimationFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('Projet Freelance');
  const [complexity, setComplexity] = useState<Complexity>('low');
  const [features, setFeatures] = useState<number>(1);
  const [dailyRate, setDailyRate] = useState<number>(250); // Exemple : 400 €/jour
  const [estimatedDays, setEstimatedDays] = useState<number>(5); // Estimation en jours
  const [hoursPerDay, setHoursPerDay] = useState<number>(8); // Par défaut, 8 heures/jour
  const [tasks, setTasks] = useState<string[]>([]); // Stocke les tâches sélectionnées
  const [technology, setTechnology] = useState<string>(''); // Technologie sélectionnée
  const [availableTasks, setAvailableTasks] = useState<OptionType[]>([]); // Tâches disponibles selon la technologie

  // Gestion de la sélection des tâches via react-select
  const handleTaskSelection = (
    selectedOptions: MultiValue<OptionType>, // Utilisation de MultiValue pour les options multiples
  ) => {
    const selectedTasks = selectedOptions.map((option) => option.value);
    setTasks(selectedTasks);
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
      estimatedDays,
      hoursPerDay,
      tasks,
      technology,
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

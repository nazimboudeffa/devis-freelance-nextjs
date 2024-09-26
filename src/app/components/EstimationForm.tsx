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
    // Initialisation et configuration
    { value: 'Initialisation du projet Next.js 14', label: 'Initialisation du projet Next.js 14', estimatedHours: 3 },
    { value: 'Configuration des routes App Router', label: 'Configuration des routes App Router', estimatedHours: 2 },
    { value: 'Mise en place des layouts imbriqués', label: 'Mise en place des layouts imbriqués', estimatedHours: 4 },
    { value: 'Configuration de TypeScript', label: 'Configuration de TypeScript', estimatedHours: 2 },
    { value: 'Configuration du linter ESLint', label: 'Configuration du linter ESLint', estimatedHours: 1 },
    { value: 'Mise en place de Prettier pour le formatage du code', label: 'Mise en place de Prettier pour le formatage du code', estimatedHours: 1 },

    // Pages et composants
    { value: 'Création des pages statiques avec SSG', label: 'Création des pages statiques avec SSG', estimatedHours: 4 },
    { value: 'Mise en place du rendu côté serveur (SSR)', label: 'Mise en place du rendu côté serveur (SSR)', estimatedHours: 5 },
    { value: 'Création de composants client et serveur', label: 'Création de composants client et serveur', estimatedHours: 3 },
    { value: 'Utilisation de React Server Components (RSC)', label: 'Utilisation de React Server Components (RSC)', estimatedHours: 5 },

    // Gestion de l'état et des données
    { value: 'Gestion de l\'état avec React Context', label: 'Gestion de l\'état avec React Context', estimatedHours: 3 },
    { value: 'Utilisation de Redux pour la gestion d\'état avancée', label: 'Utilisation de Redux pour la gestion d\'état avancée', estimatedHours: 5 },
    { value: 'Mise en place du préchargement des données avec SWR', label: 'Mise en place du préchargement des données avec SWR', estimatedHours: 2 },
    { value: 'Gestion des données avec API Routes', label: 'Gestion des données avec API Routes', estimatedHours: 4 },

    // Authentification et sécurité
    { value: 'Implémentation de l\'authentification (NextAuth.js)', label: 'Implémentation de l\'authentification (NextAuth.js)', estimatedHours: 6 },
    { value: 'Mise en place de la sécurité (headers, CORS, etc.)', label: 'Mise en place de la sécurité (headers, CORS, etc.)', estimatedHours: 2 },
    { value: 'Gestion des permissions et rôles utilisateurs', label: 'Gestion des permissions et rôles utilisateurs', estimatedHours: 4 },

    // Optimisations
    { value: 'Optimisation des performances (images, lazy loading)', label: 'Optimisation des performances (images, lazy loading)', estimatedHours: 3 },
    { value: 'Optimisation du code avec Turbopack', label: 'Optimisation du code avec Turbopack', estimatedHours: 5 },
    { value: 'Optimisation des performances avec le streaming SSR', label: 'Optimisation des performances avec le streaming SSR', estimatedHours: 5 },
    { value: 'Mise en cache des requêtes (ISR)', label: 'Mise en cache des requêtes (ISR)', estimatedHours: 3 },

    // SEO et accessibilité
    { value: 'Mise en place du SEO (balises meta, OpenGraph, etc.)', label: 'Mise en place du SEO (balises meta, OpenGraph, etc.)', estimatedHours: 2 },
    { value: 'Optimisation de l\'accessibilité (WCAG)', label: 'Optimisation de l\'accessibilité (WCAG)', estimatedHours: 3 },

    // Intégration de services externes
    { value: 'Intégration d\'une base de données avec Prisma', label: 'Intégration d\'une base de données avec Prisma', estimatedHours: 6 },
    { value: 'Connexion à une API externe (REST ou GraphQL)', label: 'Connexion à une API externe (REST ou GraphQL)', estimatedHours: 4 },
    { value: 'Implémentation des WebSockets pour les fonctionnalités en temps réel', label: 'Implémentation des WebSockets pour les fonctionnalités en temps réel', estimatedHours: 6 },
    { value: 'Utilisation de services tiers (Stripe, Firebase)', label: 'Utilisation de services tiers (Stripe, Firebase)', estimatedHours: 4 },

    // Tests et validation
    { value: 'Mise en place des tests unitaires (Jest)', label: 'Mise en place des tests unitaires (Jest)', estimatedHours: 3 },
    { value: 'Configuration des tests end-to-end (Cypress)', label: 'Configuration des tests end-to-end (Cypress)', estimatedHours: 4 },
    { value: 'Mise en place des tests de performance (Lighthouse)', label: 'Mise en place des tests de performance (Lighthouse)', estimatedHours: 2 },

    // Internationalisation
    { value: 'Mise en place du multi-langue (i18n)', label: 'Mise en place du multi-langue (i18n)', estimatedHours: 4 },

    // Gestion des erreurs et monitoring
    { value: 'Gestion des erreurs et des pages 404/500 personnalisées', label: 'Gestion des erreurs et des pages 404/500 personnalisées', estimatedHours: 2 },
    { value: 'Mise en place d\'un système de monitoring (Sentry)', label: 'Mise en place d\'un système de monitoring (Sentry)', estimatedHours: 3 },

    // Déploiement et CI/CD
    { value: 'Déploiement sur Vercel', label: 'Déploiement sur Vercel', estimatedHours: 2 },
    { value: 'Mise en place d\'un pipeline CI/CD (GitHub Actions)', label: 'Mise en place d\'un pipeline CI/CD (GitHub Actions)', estimatedHours: 4 },
    { value: 'Configuration des environnements (staging, production)', label: 'Configuration des environnements (staging, production)', estimatedHours: 2 },

    // Autres fonctionnalités
    { value: 'Création d\'un design system avec Tailwind CSS', label: 'Création d\'un design system avec Tailwind CSS', estimatedHours: 5 },
    { value: 'Pagination côté serveur', label: 'Pagination côté serveur', estimatedHours: 3 },
    { value: 'Mise en place de l\'infinite scroll', label: 'Mise en place de l\'infinite scroll', estimatedHours: 3 },
    { value: 'Ajout de l\'upload de fichiers', label: 'Ajout de l\'upload de fichiers', estimatedHours: 3 },
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

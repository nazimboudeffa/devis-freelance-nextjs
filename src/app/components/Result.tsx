import { useRouter } from 'next/navigation';

interface ResultProps {
  estimation: {
    projectName: string;
    tasks: string[];
    complexity: 'low' | 'medium' | 'high';
    features: number;
    dailyRate: number;
    hoursPerDay: number;
    totalCost: number;
    totalDays: number;
  };
}

const Result: React.FC<ResultProps> = ({ estimation }) => {

  const router = useRouter();

  const handleRedirectToDevisPage = () => {
    // On passe tous les paramètres de l'objet estimation dans l'URL sous forme de query string
    const queryParams = new URLSearchParams({
      projectName: estimation.projectName,
      complexity: estimation.complexity,
      features: estimation.features.toString(),
      dailyRate: estimation.dailyRate.toString(),
      hoursPerDay: estimation.hoursPerDay.toString(),
      totalDays: estimation.totalDays.toString(),
      totalCost: estimation.totalCost.toString(),
      tasks: estimation.tasks.join(','), // Convertir le tableau des tâches en une chaîne de caractères séparée par des virgules
    }).toString();

    // Redirection vers la page /devis avec les paramètres
    router.push(`/devis?${queryParams}`);
  };

  return (
    <div className="w-[500px]">
      <div className="flex flex-col justify-center items-center">
        <p>Temps total estimé : {estimation.totalDays} jours</p>
        <p>Coût total estimé : {estimation.totalCost} €</p>
      </div>
      <br />
      <div>
        <button className="btn btn-secondary w-full" onClick={handleRedirectToDevisPage}>Voir le devis</button>
      </div>
    </div>
  );
}
  
export default Result;
  
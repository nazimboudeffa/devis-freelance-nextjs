interface ResultProps {
  estimation: {
    projectName: string;
    complexity: 'low' | 'medium' | 'high';
    features: number;
    dailyRate: number;
    estimatedDays: number;
    hoursPerDay: number;
    totalCost: number;
  };
}

const Result: React.FC<ResultProps> = ({ estimation }) => {
  const { projectName, complexity, features, dailyRate, estimatedDays, hoursPerDay, totalCost } = estimation;

  return (
    <div>
      <h2>Résumé du projet : {projectName}</h2>
      <p>Complexité : {complexity}</p>
      <p>Nombre de fonctionnalités : {features}</p>
      <p>TJM : {dailyRate} €/jour</p>
      <p>Temps estimé : {estimatedDays} jours</p>
      <p>Heures par jour : {hoursPerDay}</p>
      <h3>Coût total estimé : {totalCost} €</h3>
    </div>
  );
}
  
export default Result;
  
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
  const { projectName, tasks, complexity, features, dailyRate, hoursPerDay, totalCost, totalDays } = estimation;

  return (
    <div>
      <h2>Résumé du projet : {projectName}</h2>
      <p>Complexité : {complexity}</p>
      <p>Nombre de fonctionnalités : {features}</p>
      <p>TJM : {dailyRate} €/jour</p>
      <p>Heures par jour : {hoursPerDay}</p>
      <h4>Tâches sélectionnées :</h4>
      <ul>
        {tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      <p>Temps total estimé : {totalDays} jours</p>
      <h3>Coût total estimé : {totalCost} €</h3>
    </div>
  );
}
  
export default Result;
  
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
  const { totalCost, totalDays } = estimation;

  return (
    <div>
      <p>Temps total estimé : {totalDays} jours</p>
      <p>Coût total estimé : {totalCost} €</p>
    </div>
  );
}
  
export default Result;
  
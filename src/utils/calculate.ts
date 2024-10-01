interface EstimationInput {
  complexity: 'low' | 'medium' | 'high';
  features: number;
  dailyRate: number; // TJM
  hoursPerDay: number; // Nombre d'heures travaillées par jour
  totalHours: number; // Durée totale estimée en heures
}

interface EstimationResult {
  totalDays: number;
  totalCost: number;
}

export const calculateEstimation = ({ complexity, dailyRate, totalHours, hoursPerDay, }: EstimationInput): EstimationResult => {
    let complexityMultiplier = 1;
  
    switch (complexity) {
      case 'high':
        complexityMultiplier = 2;
        break;
      case 'medium':
        complexityMultiplier = 1.5;
        break;
      default:
        complexityMultiplier = 1;
    }
  
    // Calcul du nombre total de jours en fonction des fonctionnalités et de la complexité
    const totalDays = Math.ceil(totalHours / hoursPerDay) * complexityMultiplier;
    
    // Calcul du coût total basé sur le TJM et le nombre total de jours
    const totalCost = totalDays * dailyRate * (hoursPerDay / 8);
  
    return {
      totalDays: totalDays,
      totalCost: parseFloat(totalCost.toFixed(2)),
    };
  };
  
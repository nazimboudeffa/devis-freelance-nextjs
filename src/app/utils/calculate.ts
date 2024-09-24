interface EstimationInput {
  complexity: 'low' | 'medium' | 'high';
  features: number;
  dailyRate: number; // TJM
  estimatedDays: number;
  hoursPerDay: number; // Nombre d'heures travaillées par jour
}

interface EstimationResult {
  totalDays: number;
  totalCost: number;
}

export const calculateEstimation = ({ complexity, features, dailyRate, estimatedDays, hoursPerDay, }: EstimationInput): EstimationResult => {
    let complexityMultiplier = 1;
  
    switch (complexity) {
      case 'medium':
        complexityMultiplier = 1.5;
        break;
      case 'high':
        complexityMultiplier = 2;
        break;
      default:
        complexityMultiplier = 1;
    }
  
    // Calcul du nombre total de jours en fonction des fonctionnalités et de la complexité
    const totalDays = estimatedDays * features * complexityMultiplier;
    
    // Calcul du coût total basé sur le TJM et le nombre total de jours
    const totalCost = totalDays * dailyRate;
  
    return {
      totalDays,
      totalCost: parseFloat(totalCost.toFixed(2)),
    };
  };
  
interface EstimationInput {
  complexity: 'low' | 'medium' | 'high';
  features: number;
  hourlyRate: number;
  estimatedHours: number;
}

interface EstimationResult {
  totalHours: number;
  totalCost: number;
}

export const calculateEstimation = ({ complexity, features, hourlyRate, estimatedHours }: EstimationInput): EstimationResult => {
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
  
    const totalHours = estimatedHours * features * complexityMultiplier;
    const totalCost = totalHours * hourlyRate;
  
    return {
      totalHours,
      totalCost: parseFloat(totalCost.toFixed(2)),
    };
  };
  
export const calculateEstimation = ({ complexity, features, hourlyRate, estimatedHours } : any) => {
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
      totalCost: totalCost.toFixed(2),
    };
  };
  
const Result = ({ estimation } : any) => {
    const { projectName, complexity, features, hourlyRate, estimatedHours, totalCost } = estimation;
  
    return (
      <div>
        <h2>Résumé du projet : {projectName}</h2>
        <p>Complexité : {complexity}</p>
        <p>Nombre de fonctionnalités : {features}</p>
        <p>Taux horaire : {hourlyRate} €/h</p>
        <p>Temps estimé : {estimatedHours} heures</p>
        <h3>Coût total estimé : {totalCost} €</h3>
      </div>
    );
  };
  
  export default Result;
  
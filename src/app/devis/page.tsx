"use client";

// app/devis/page.tsx
import React from 'react';
import NavBar from '../components/NavBar';
import { useSearchParams } from 'next/navigation';

const DevisPage = () => {
  const searchParams = useSearchParams();
  
  // Récupération des paramètres de l'URL
  const projectName = searchParams.get('projectName');
  const complexity = searchParams.get('complexity');
  const features = searchParams.get('features');
  const dailyRate = searchParams.get('dailyRate');
  const hoursPerDay = searchParams.get('hoursPerDay');
  const totalDays = searchParams.get('totalDays');
  const totalCost = searchParams.get('totalCost');
  const tasks = searchParams.get('tasks')?.split(','); // Conversion en tableau
  const totalHours = searchParams.get('totalHours');

  return (
    <div className="p-5">
    <NavBar />
    <div className="flex flex-col items-center justify-center">
      <h1>Devis détaillé</h1>
      <div>
        <p><strong>Nom du projet :</strong> {projectName}</p>
        <p><strong>Complexité :</strong> {complexity}</p>
        <p><strong>Nombre de fonctionnalités :</strong> {features}</p>
        <p><strong>Taux journalier :</strong> {dailyRate} €</p>
        <p><strong>Heures par jour :</strong> {hoursPerDay}</p>
        <p><strong>Nombre total de jours :</strong> {totalDays}</p>
        <p><strong>Total des heures estimées :</strong> {totalHours} h</p>
        <p><strong>Coût total estimé :</strong> {totalCost} €</p>
      </div>
      <h3>Tâches :</h3>
      <ul>
        {tasks?.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default DevisPage;
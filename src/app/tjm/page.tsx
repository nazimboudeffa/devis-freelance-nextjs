"use client"

import NavBar from "@/components/NavBar";
import { useState } from "react";

export default function Home() {
  // État pour les charges mensuelles et le TJM calculé
  const [charges, setCharges] = useState<number>(0);
  const [tjm, setTjm] = useState<number>(0);
  const [joursTravailles, setJoursTravailles] = useState(20); // Par défaut 20 jours par mois travaillés

  // Fonction de calcul du TJM
  const calculerTJM = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tjmCalcule = charges / joursTravailles; // Simple division
    setTjm(parseFloat(tjmCalcule.toFixed(2))); // 2 décimales
  };

  return (
    <>
    <NavBar />
    <div className="flex flex-col items-center justify-center">
    <div className="w-80 md:w-[500px] mt-5">
      <h1>Calculateur de TJM</h1>
      <form onSubmit={calculerTJM}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Charges mensuelles totales (€) :
            <input
              type="number"
              value={charges}
              onChange={(e) => setCharges(parseFloat(e.target.value))}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Jours travaillés par mois :
            <input
              type="number"
              value={joursTravailles}
              onChange={(e) => setJoursTravailles(parseInt(e.target.value))}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Calculer TJM
        </button>
      </form>

      {tjm && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Votre TJM est de : {tjm} €/jour</h2>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
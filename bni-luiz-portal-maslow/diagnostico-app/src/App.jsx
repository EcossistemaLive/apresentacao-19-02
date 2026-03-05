import React, { useState } from 'react';
import MaslowForm from './components/MaslowForm';
import ResultScreen from './components/ResultScreen';

function App() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setShowResult(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-3xl w-full">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold kinetic-gradient mb-2 pb-2">
            Diagnóstico de Times
          </h1>
          <p className="text-slate-300 text-lg">
            Avalie o estágio de desenvolvimento da sua equipe baseado na Pirâmide de Maslow
          </p>
        </header>

        {showResult ? (
          <ResultScreen answers={answers} onRestart={handleRestart} />
        ) : (
          <MaslowForm onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}

export default App;

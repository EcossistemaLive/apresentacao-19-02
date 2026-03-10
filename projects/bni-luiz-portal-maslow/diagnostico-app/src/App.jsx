import React, { useState } from 'react';
import MaslowForm from './components/MaslowForm';
import DataCollectionForm from './components/DataCollectionForm';
import ResultScreen from './components/ResultScreen';
import { saveDiagnosticsResult } from './firebase';

function App() {
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState(null);
  const [step, setStep] = useState('survey'); // 'survey' | 'collection' | 'result'
  const [isSaving, setIsSaving] = useState(false);

  const handleSurveyComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setStep('collection');
  };

  const handleDataSubmit = async (data) => {
    setUserData(data);
    setIsSaving(true);

    try {
      if (data.nome && data.email) {
        await saveDiagnosticsResult(data, answers);
      }
    } catch (e) {
      console.error("Erro ao salvar no Firebase. Exibindo resultado mesmo assim.");
    } finally {
      setIsSaving(false);
      setStep('result');
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setUserData(null);
    setStep('survey');
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

        {step === 'survey' && (
          <MaslowForm onComplete={handleSurveyComplete} />
        )}

        {step === 'collection' && (
          <DataCollectionForm onSubmit={handleDataSubmit} />
        )}

        {step === 'result' && (
          <ResultScreen answers={answers} userData={userData} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;

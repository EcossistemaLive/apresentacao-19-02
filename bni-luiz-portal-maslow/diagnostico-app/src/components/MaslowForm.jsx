import React, { useState } from 'react';
import { maslowData, likertOptions } from '../data/questions';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

const allQuestions = maslowData.flatMap((stage, stageIndex) =>
    stage.questions.map((q, qIndex) => ({
        stageName: stage.stage,
        stageIndex,
        questionText: q,
        questionIndex: qIndex,
        globalIndex: stageIndex * 4 + qIndex
    }))
);

export default function MaslowForm({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const currentQ = allQuestions[currentIndex];
    // Calculate progress based on answered questions
    const progress = (Object.keys(answers).length / allQuestions.length) * 100;

    const handleSelect = (value) => {
        const newAnswers = {
            ...answers,
            [currentQ.globalIndex]: {
                stageIndex: currentQ.stageIndex,
                value
            }
        };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentIndex < allQuestions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete(answers);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const isAnswered = answers[currentQ.globalIndex] !== undefined;

    return (
        <div className="glass-card p-6 md:p-10 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white/5">
                <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="mb-8 mt-4 flex justify-between items-center">
                <span className="text-green-400 text-sm font-semibold tracking-wider uppercase">
                    {currentQ.stageName}
                </span>
                <span className="text-slate-400 text-sm font-medium">
                    Questão {currentIndex + 1} de {allQuestions.length}
                </span>
            </div>

            <div key={currentIndex} className="animate-fade-in-up">
                <div className="min-h-[120px] mb-8">
                    <h2 className="text-2xl md:text-3xl font-medium text-white leading-snug">
                        {currentQ.questionText}
                    </h2>
                </div>

                <div className="space-y-3 mb-12">
                    {likertOptions.map((option) => {
                        const selected = answers[currentQ.globalIndex]?.value === option.value;
                        return (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${selected
                                    ? 'bg-green-600/20 border-green-500 shadow-[0_0_20px_rgba(0,232,0,0.15)] ring-1 ring-green-500/50'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                <span className="text-lg text-slate-100">{option.label}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-green-400' : 'border-slate-500 shadow-inner bg-black/20'}`}>
                                    {selected && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${currentIndex === 0 ? 'text-slate-600 cursor-not-allowed opacity-50' : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                >
                    <ChevronLeft size={20} /> Anterior
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${!isAnswered
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                        : 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/30'
                        }`}
                >
                    {currentIndex === allQuestions.length - 1 ? (
                        <>Ver Resultado <CheckCircle size={20} /></>
                    ) : (
                        <>Próxima <ChevronRight size={20} /></>
                    )}
                </button>
            </div>
        </div>
    );
}

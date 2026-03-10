import React from 'react';
import { maslowData } from '../data/questions';
import { BarChart, RefreshCw, Award } from 'lucide-react';

export default function ResultScreen({ answers, onRestart }) {
    // Calculate scores
    const stageScores = maslowData.map((stage, index) => {
        let sum = 0;
        for (let i = 0; i < 4; i++) {
            const globalIndex = index * 4 + i;
            sum += answers[globalIndex]?.value || 0;
        }
        const percentage = (sum / 20) * 100;
        return {
            name: stage.stage,
            score: sum,
            percentage,
            originalIndex: index
        };
    });

    // Find dominant stage (highest percentage)
    let dominantStage = stageScores[0];
    stageScores.forEach(stage => {
        if (stage.percentage > dominantStage.percentage) {
            dominantStage = stage;
        }
    });

    const getAnalysisText = (index) => {
        switch (index) {
            case 0: return "Foco em necessidades básicas. É fundamental revisar se a equipe possui ferramentas, recursos e remuneração justa para operar sem gargalos.";
            case 1: return "A segurança é a principal preocupação atual. O líder precisa promover forte segurança psicológica, transparência nas expectativas e intervir em conflitos.";
            case 2: return "O time está na fase de pertencimento social. Fortalecer a colaboração genuína, integração entre os membros e manter a 'porta aberta' trará os melhores resultados.";
            case 3: return "Sua liderança busca focar na estima e reconhecimento. Eles precisam de elogios estruturados, feedbacks de desenvolvimento (1:1s) e saber do próprio impacto na empresa.";
            case 4: return "Foco no mais alto nível: Autorrealização! Sua equipe deve ganhar autonomia total, projetos desafiadores e conexão com o propósito estratégico e PDIs muito claros.";
            default: return "";
        }
    };

    return (
        <div className="glass-card p-6 md:p-10 animate-fade-in">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 text-green-400 mb-6 shadow-[0_0_30px_rgba(0,232,0,0.2)] border border-green-500/20">
                    <Award size={40} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Resultado do Diagnóstico</h2>
                <p className="text-slate-300 text-lg">Confira em qual estágio sua equipe se encontra predominantemente</p>
            </div>

            <div className="mb-8 md:mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/10 border border-green-500/30 relative overflow-hidden backdrop-blur-sm shadow-xl">
                <div className="absolute top-0 left-0 w-1.5 md:w-2 h-full bg-gradient-to-b from-green-400 to-emerald-500"></div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4">
                    <div>
                        <h3 className="text-xs md:text-lg text-green-200/80 mb-1 font-medium tracking-wide uppercase">Estágio Dominante</h3>
                        <h4 className="text-xl md:text-4xl font-bold text-white text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-white">{dominantStage.name}</h4>
                    </div>
                    <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-bl from-green-400 to-emerald-300">
                        {dominantStage.percentage.toFixed(0)}%
                    </div>
                </div>
                <p className="text-base md:text-xl text-slate-200 leading-relaxed border-t border-white/10 pt-4 md:pt-6 mt-2">
                    {getAnalysisText(dominantStage.originalIndex)}
                </p>
            </div>

            <div className="space-y-6 mb-12 bg-black/20 p-6 md:p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <BarChart className="text-green-400" size={24} />
                    Visão Geral dos Indicadores
                </h3>
                {stageScores.map((stage) => (
                    <div key={stage.name} className="relative group">
                        <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                            <span className={`font-medium transition-colors ${stage.name === dominantStage.name ? 'text-green-300' : 'text-slate-300'}`}>
                                {stage.name}
                            </span>
                            <span className={`font-bold ${stage.name === dominantStage.name ? 'text-green-400' : 'text-slate-400'}`}>
                                {stage.percentage.toFixed(0)}%
                            </span>
                        </div>
                        <div className="w-full h-2.5 sm:h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${stage.name === dominantStage.name
                                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-[0_0_10px_rgba(0,232,0,0.5)]'
                                    : 'bg-slate-600'
                                    }`}
                                style={{ width: `${stage.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={onRestart}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-medium transition-all shadow-lg hover:shadow-xl group"
                >
                    <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                    Refazer Diagnóstico
                </button>
            </div>
        </div>
    );
}

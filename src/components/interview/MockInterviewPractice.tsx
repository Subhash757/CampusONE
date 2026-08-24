import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockInterviewQuestions } from '../../data/mockData';

export const MockInterviewPractice: React.FC = () => {
  const { addInterviewAttempt, setActiveScreen, currentUser } = useApp();
  const currentQuestion = mockInterviewQuestions[0];

  const [responseAnswer, setResponseAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDurationSeconds(d => d + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeakingQuestion(true);
      utterance.onend = () => setIsSpeakingQuestion(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate live voice speech-to-text transcript typing
      const simulatedSample = "I would design a distributed rate limiter using the Token Bucket algorithm stored inside Redis nodes. Lua scripts ensure atomic execution and prevents race conditions under high concurrent API loads.";
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < simulatedSample.length) {
          setResponseAnswer(simulatedSample.substring(0, idx + 1));
          idx += 3;
        } else {
          clearInterval(interval);
          setIsRecording(false);
        }
      }, 50);
    } else {
      setIsRecording(false);
    }
  };

  const handleSubmitAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseAnswer.trim()) return;

    // Evaluate keyword matches
    const matched = currentQuestion.expectedKeywords.filter(kw =>
      responseAnswer.toLowerCase().includes(kw.toLowerCase())
    );

    const matchRatio = matched.length / currentQuestion.expectedKeywords.length;
    const techScore = Math.min(96, Math.max(65, Math.round(matchRatio * 100)));
    const commScore = responseAnswer.length > 80 ? 90 : 70;
    const structScore = 85;
    const confScore = isRecording ? 92 : 86;
    const overall = Math.round((techScore + commScore + structScore + confScore) / 4);

    addInterviewAttempt({
      id: `att_int_${Date.now()}`,
      studentId: currentUser.id,
      categoryId: currentQuestion.categoryId,
      questionId: currentQuestion.id,
      questionTitle: currentQuestion.title,
      userAnswerText: responseAnswer,
      userAudioSimulated: true,
      durationSeconds,
      scores: {
        technicalAccuracy: techScore,
        communication: commScore,
        structure: structScore,
        confidence: confScore,
        overall
      },
      matchedKeywords: matched.length > 0 ? matched : ['Token Bucket', 'Redis', 'Concurrency'],
      aiFeedback: `Excellent analysis! You matched ${matched.length} key architecture terms including ${matched.join(', ')}. Perfect explanation of atomic Redis transactions.`,
      improvementTips: [
        'Consider discussing sliding window memory trade-offs when scaling keys.',
        'Detail fallback strategies during unexpected Redis cluster latency spikes.'
      ],
      completedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    });

    setActiveScreen('interview_report');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex items-center justify-between glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-widest">
            AI INTERVIEW SIMULATOR ROOM
          </span>
          <h1 className="text-xl font-bold text-white">{currentQuestion.title}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 font-mono text-xs text-cyan-300 border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>{Math.floor(durationSeconds / 60)}m {durationSeconds % 60}s</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virtual Avatar & Question Prompt */}
        <div className="lg:col-span-2 space-y-5">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4 text-center relative overflow-hidden">
            {/* Animated Avatar Visualizer */}
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 via-teal-500 to-violet-600 p-[3px] shadow-glow-cyan">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative">
                <Sparkles className={`w-10 h-10 text-cyan-400 ${isSpeakingQuestion ? 'animate-bounce' : ''}`} />
                {isSpeakingQuestion && (
                  <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSpeakText(currentQuestion.questionText)}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeakingQuestion ? 'AI Speaking...' : 'Listen to AI Prompt'}</span>
              </button>

              <h2 className="text-sm font-bold text-slate-100 leading-relaxed px-4">
                "{currentQuestion.questionText}"
              </h2>
            </div>
          </div>

          {/* Answer Input Form */}
          <form onSubmit={handleSubmitAttempt} className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Your Response (Voice or Typed):</label>
              <button
                type="button"
                onClick={toggleRecording}
                className={`flex items-center space-x-2 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white border-rose-400 shadow-glow-alert animate-pulse'
                    : 'bg-slate-800 text-cyan-300 border-cyan-500/30 hover:bg-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Listening (Click to Stop)' : 'Start Voice Input'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={responseAnswer}
              onChange={(e) => setResponseAnswer(e.target.value)}
              placeholder="Speak or type your structured technical explanation..."
              className="w-full bg-slate-900 border border-white/10 rounded-2xl p-4 text-xs text-white focus:border-cyan-500 outline-none leading-relaxed"
              required
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'View Question Hints'}</span>
              </button>

              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-xs shadow-glow-cyan hover:opacity-90"
              >
                <Send className="w-4 h-4" />
                <span>Submit Response for AI Analysis</span>
              </button>
            </div>
          </form>
        </div>

        {/* Hints & Keyword Expectations Sidebar */}
        <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">
            Key Architecture Parameters
          </h3>

          <div className="space-y-2 text-xs">
            <p className="text-slate-400">Target Keywords for Top Score:</p>
            <div className="flex flex-wrap gap-1.5">
              {currentQuestion.expectedKeywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-white/10 text-cyan-300 font-mono text-[10px]">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {showHints && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2 text-xs animate-in fade-in">
              <span className="font-bold text-amber-300 font-mono">Suggested Hints:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                {currentQuestion.hints.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

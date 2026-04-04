'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, Flame, Sparkles } from 'lucide-react';
import type { QuizQuestion } from '@/data/lessons/van-gogh-starry-night';
import { useGamificationStore } from '@/stores/gamificationStore';

/**
 * VIEWPORT GUIDE (Triple Responsive):
 * - Mobile (sp):  0-567px   | single column | full width buttons
 * - Tablet (md):  568-767px | single column | medium width
 * - Desktop (lg): 768px+    | centered | max-width
 */

interface QuizBlockProps {
  questions: QuizQuestion[];
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  showExplanation: boolean;
  isComplete: boolean;
}

export default function QuizBlock({ questions }: QuizBlockProps) {
  const { t } = useTranslation('quiz');
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: Array(questions.length).fill(null),
    showExplanation: false,
    isComplete: false,
  });

  const currentQ = questions[state.currentQuestion];
  const isAnswered = state.answers[state.currentQuestion] !== null;
  const isCorrect =
    isAnswered && state.answers[state.currentQuestion] === currentQ.correctAnswer;

  // Calculate score and XP
  const score = useMemo(() => {
    const correct = state.answers.filter(
      (answer, idx) => answer === questions[idx].correctAnswer
    ).length;
    return (correct / questions.length) * 100;
  }, [state.answers, questions]);

  const xpEarned = useMemo(() => {
    const baseXP = 100;
    const correctCount = state.answers.filter(
      (answer, idx) => answer === questions[idx].correctAnswer
    ).length;
    return baseXP + correctCount * 50;
  }, [state.answers, questions]);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;

    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestion] = optionIndex;
    setState((prev) => ({
      ...prev,
      answers: newAnswers,
      showExplanation: true,
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    }
  };

  const handleReset = () => {
    setState({
      currentQuestion: 0,
      answers: Array(questions.length).fill(null),
      showExplanation: false,
      isComplete: false,
    });
  };

  // Award XP when quiz is completed
  const { performAction } = useGamificationStore();
  const [xpAwarded, setXpAwarded] = useState(false);

  useEffect(() => {
    if (state.isComplete && !xpAwarded) {
      const correctCount = state.answers.filter(
        (answer, idx) => answer === questions[idx].correctAnswer
      ).length;
      const isPerfect = correctCount === questions.length;
      performAction('complete_quiz', {
        perfect: isPerfect,
      });
      setXpAwarded(true);
    }
  }, [state.isComplete, xpAwarded, state.answers, questions, score, performAction]);

  if (state.isComplete) {
    return (
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-art-gold/20 to-art-wine/20 rounded-lg p-8 sm:p-12 md:p-16 text-center border-2 border-art-gold/40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-center mb-6 sm:mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-art-gold" />
            </motion.div>

            {score === 100 ? (
              <motion.h3
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-art-charcoal mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('perfect', '¡Puntuación Perfecta!')}
              </motion.h3>
            ) : (
              <motion.h3
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-art-charcoal mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t('complete', 'Lección Completada')}
              </motion.h3>
            )}

            <motion.div
              className="my-8 sm:my-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-art-gold mb-4">
                {Math.round(score)}%
              </p>
              <p className="font-serif text-lg sm:text-xl text-art-charcoal mb-6">
                {t('score', 'Puntuación')}: {state.answers.filter(
                  (answer, idx) => answer === questions[idx].correctAnswer
                ).length} / {questions.length}
              </p>
              <p className="font-serif text-2xl sm:text-3xl font-semibold text-art-wine">
                {t('xpEarned', '+{{xp}} XP', {
                  xp: xpEarned,
                })}
              </p>
            </motion.div>

            <motion.button
              onClick={handleReset}
              className="mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-4 bg-art-gold hover:bg-art-gold-light text-white font-serif font-semibold rounded-lg transition-all duration-300 text-base sm:text-lg active:scale-95 min-h-12 sm:min-h-14"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('tryAgain', 'Intentar de nuevo')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <motion.div
          className="mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="font-serif text-sm sm:text-base text-art-charcoal">
              {t('question', 'Pregunta {{current}} de {{total}}', {
                current: state.currentQuestion + 1,
                total: questions.length,
              })}
            </p>
            <p className="font-serif text-sm sm:text-base font-semibold text-art-gold">
              {Math.round(((state.currentQuestion + 1) / questions.length) * 100)}%
            </p>
          </div>
          <div className="w-full h-2 bg-art-cream rounded-full overflow-hidden border border-art-gold/20">
            <motion.div
              className="h-full bg-gradient-to-r from-art-gold to-art-wine"
              initial={{ width: 0 }}
              animate={{
                width: `${((state.currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`question-${state.currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-lg border-2 border-art-gold/20 p-6 sm:p-8 md:p-10"
          >
            {/* Question text */}
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-art-charcoal mb-8 sm:mb-10 md:mb-12 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Answer options */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-8 sm:mb-10 md:mb-12">
              {currentQ.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 sm:p-5 md:p-6 text-left font-serif rounded-lg transition-all duration-300 border-2 min-h-12 sm:min-h-14 text-base sm:text-lg flex items-center gap-3 ${
                    state.answers[state.currentQuestion] === idx
                      ? isCorrect
                        ? 'bg-green-50 border-green-500 text-art-charcoal'
                        : 'bg-red-50 border-red-500 text-art-charcoal'
                      : isAnswered
                        ? 'bg-art-cream border-art-gold/20 text-art-charcoal/50 cursor-not-allowed'
                        : 'bg-white border-art-gold/20 hover:border-art-gold hover:bg-art-cream text-art-charcoal hover:text-art-charcoal'
                  }`}
                  whileHover={!isAnswered ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                >
                  {state.answers[state.currentQuestion] === idx ? (
                    isCorrect ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-red-600" />
                    )
                  ) : (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-current flex-shrink-0" />
                  )}
                  <span>{option}</span>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {state.showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 sm:p-5 md:p-6 rounded-lg border-l-4 mb-8 sm:mb-10 ${
                    isCorrect
                      ? 'bg-green-50 border-green-500 text-art-charcoal'
                      : 'bg-yellow-50 border-amber-500 text-art-charcoal'
                  }`}
                >
                  <p className="font-serif font-semibold mb-2 text-base sm:text-lg">
                    {isCorrect ? t('correct', '¡Correcto!') : t('incorrect', 'No exactamente...')}
                  </p>
                  <p className="font-serif text-sm sm:text-base leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {state.showExplanation && (
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-art-gold hover:bg-art-gold-light text-white font-serif font-semibold rounded-lg transition-all duration-300 text-base sm:text-lg active:scale-95 min-h-12 sm:min-h-14"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {state.currentQuestion < questions.length - 1
                  ? t('continue', 'Continuar')
                  : t('seeResults', 'Ver Resultados')}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

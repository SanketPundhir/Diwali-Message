/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BackgroundElements } from './components/BackgroundElements';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Surprise1Welcome } from './components/Surprise1Welcome';
import { Surprise2Gifts } from './components/Surprise2Gifts';
import { Surprise3LightDiyas } from './components/Surprise3LightDiyas';
import { Surprise4Fireworks } from './components/Surprise4Fireworks';
import { Surprise5Quiz } from './components/Surprise5Quiz';
import { Surprise6LoveLetter } from './components/Surprise6LoveLetter';
import { Surprise7FinalShayari } from './components/Surprise7FinalShayari';
import { romanticAudio } from './utils/audio';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSurprises = 7;

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSurprises));
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const handleJumpToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen w-full romantic-gradient-bg relative flex flex-col justify-between overflow-x-hidden pt-12 sm:pt-14 pb-8">
      {/* Background Ambience: Fairy Lights, Falling Petals, Fireflies, Audio Controls */}
      <BackgroundElements
        currentStep={currentStep}
        totalSteps={totalSurprises}
        onRestart={handleRestart}
        isStarted={currentStep > 0}
      />

      {/* Main Content Area with Smooth Step Transitions */}
      <main className="flex-1 flex items-center justify-center relative z-10 w-full">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}

          {currentStep === 1 && (
            <Surprise1Welcome key="surprise1" onNext={handleNextStep} />
          )}

          {currentStep === 2 && (
            <Surprise2Gifts key="surprise2" onNext={handleNextStep} />
          )}

          {currentStep === 3 && (
            <Surprise3LightDiyas key="surprise3" onNext={handleNextStep} />
          )}

          {currentStep === 4 && (
            <Surprise4Fireworks key="surprise4" onNext={handleNextStep} />
          )}

          {currentStep === 5 && (
            <Surprise5Quiz key="surprise5" onNext={handleNextStep} />
          )}

          {currentStep === 6 && (
            <Surprise6LoveLetter key="surprise6" onNext={handleNextStep} />
          )}

          {currentStep === 7 && (
            <Surprise7FinalShayari
              key="surprise7"
              onRestart={handleRestart}
              onJumpToStep={handleJumpToStep}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Romantic Footer */}
      <footer className="w-full text-center py-3 relative z-10 text-xs text-rose-500/80 font-medium">
        Made with infinite love for Bhutki Darling Baccha ❤️ | Diwali Special
      </footer>
    </div>
  );
}

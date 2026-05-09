/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icons, Skill } from './types';
import Library from './components/Library';
import Builder from './components/Builder';
import Planner from './components/Planner';
import Workout from './components/Workout';

export interface WorkoutExercise extends Skill {
  sets: number;
  reps: number;
  holdTime: number;
  restTime: number;
}

export interface DayWorkout {
  name: string;
  duration: string;
  exercises: WorkoutExercise[];
}

export type WeeklySchedule = {
  [key: string]: DayWorkout;
};

type Screen = 'library' | 'builder' | 'planner' | 'workout' | 'dashboard';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('library');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [activeWorkoutExercises, setActiveWorkoutExercises] = useState<WorkoutExercise[]>([]);

  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule>({
    'Monday': { name: 'Push Power', duration: '45 min', exercises: [] },
    'Tuesday': { name: 'Rest Day', duration: '', exercises: [] },
    'Wednesday': { name: 'Pull Strength', duration: '60 min', exercises: [] },
    'Thursday': { name: 'Rest Day', duration: '', exercises: [] },
    'Friday': { name: 'Legs & Core', duration: '50 min', exercises: [] },
    'Saturday': { name: 'Rest Day', duration: '', exercises: [] },
    'Sunday': { name: 'Full Body', duration: '55 min', exercises: [] },
  });

  const navItems = [
    { id: 'library', label: 'Library', icon: <Icons.Layout size={18} /> },
    { id: 'planner', label: 'Planner', icon: <Icons.Calendar size={18} /> },
    { id: 'builder', label: 'Builder', icon: <Icons.Plus size={18} /> },
    { id: 'workout', label: 'Live Workout', icon: <Icons.Flame size={18} /> },
    { id: 'profile', label: 'Profile', icon: <Icons.User size={18} /> },
  ];

  const handleEditDay = (day: string) => {
    setSelectedDay(day);
    setActiveScreen('builder');
  };

  const handleStartWorkout = (exercises: WorkoutExercise[]) => {
    if (exercises.length === 0) return;
    setActiveWorkoutExercises(exercises);
    setActiveScreen('workout');
  };

  const handleSaveWorkout = (day: string, exercises: WorkoutExercise[], startImmediately = false) => {
    if (day !== 'New Session') {
      setWeeklySchedule(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          exercises,
          name: exercises.length > 0 ? (prev[day].name === 'Rest Day' ? 'Custom Routine' : prev[day].name) : 'Rest Day',
          duration: `${exercises.length * 10} min`
        }
      }));
    }
    
    if (startImmediately) {
      handleStartWorkout(exercises);
    } else {
      setActiveScreen('planner');
      setSelectedDay(null);
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'library': return <Library isDarkMode={isDarkMode} />;
      case 'builder': return (
        <Builder 
          activeDay={selectedDay || 'New Session'} 
          initialExercises={selectedDay ? weeklySchedule[selectedDay].exercises : []}
          onSave={(day, exs) => handleSaveWorkout(day, exs, false)}
          onStart={(day, exs) => handleSaveWorkout(day, exs, true)}
          onCancel={() => {
            setActiveScreen('planner');
            setSelectedDay(null);
          }}
        />
      );
      case 'planner': return (
        <Planner 
          schedule={weeklySchedule}
          onEditDay={handleEditDay}
          onStartDay={(day) => handleStartWorkout(weeklySchedule[day].exercises)}
        />
      );
      case 'workout': return (
        <Workout 
          exercises={activeWorkoutExercises}
          onEnd={() => setActiveScreen('library')} 
        />
      );
      default: return <Library isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeScreen === 'workout' || isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 px-6 py-4 border-b flex items-center justify-between transition-colors ${activeScreen === 'workout' || isDarkMode ? 'bg-[#0f172a]/80 border-slate-700' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveScreen('library')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Icons.Dumbbell size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Calisthenics <span className="text-blue-500">Pro</span>
          </h1>
        </div>

        <nav className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => (
            item.id === 'profile' ? (
              <button 
                key={item.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Phu" alt="Avatar" />
                </div>
                <span className="hidden md:inline font-medium text-sm">{item.label}</span>
              </button>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id as Screen)}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg flex items-center gap-2 ${
                  activeScreen === item.id 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
                {activeScreen === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            )
          ))}
          
          {activeScreen !== 'workout' && (
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Icons.Zap size={20} className="text-yellow-400" /> : <Icons.Zap size={20} className="text-slate-500" />}
            </button>
          )}

          {activeScreen === 'builder' && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95">
              Save Workout
            </button>
          )}
          
          {activeScreen === 'workout' && (
            <button 
              onClick={() => setActiveScreen('library')}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg shadow-red-500/30 transition-all active:scale-95"
            >
              End Workout
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`mt-20 border-t p-8 text-center ${activeScreen === 'workout' || isDarkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Icons.Dumbbell size={20} />
          <p className="font-bold">Calisthenics Pro</p>
        </div>
        <p className="text-sm">© 2026 Professional Training Platform. Build your strength anywhere.</p>
      </footer>
    </div>
  );
}

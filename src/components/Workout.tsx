import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icons, skillsData } from '../types';
import { WorkoutExercise } from '../App';

export default function Workout({ exercises: initialExercises, onEnd }: { exercises: WorkoutExercise[], onEnd: () => void }) {
  const [exercises, setExercises] = useState<WorkoutExercise[]>(initialExercises);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(0); 
  const [isActive, setIsActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [sessionTimeLimit, setSessionTimeLimit] = useState(45 * 60); // Default 45 mins
  const [isSetup, setIsSetup] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [swappingIndex, setSwappingIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const currentExercise = exercises[currentExerciseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isSetup) {
      interval = setInterval(() => {
        setTotalTime(prev => prev + 1);
        if (isResting) {
          setTimeLeft(prev => {
            if (prev <= 1) {
              setIsResting(false);
              setIsActive(false);
              return 60;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isResting, isSetup]);

  const handleReset = () => {
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setTimeLeft(60);
    setTotalTime(0);
    setIsActive(false);
    setIsResting(false);
  };

  const nextSet = () => {
    if (!currentExercise) return;
    
    if (currentSet < currentExercise.sets) {
      setCurrentSet(prev => prev + 1);
      setTimeLeft(currentExercise.restTime);
      setIsResting(true);
      setIsActive(true);
    } else {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        setTimeLeft(60);
        setIsResting(false);
        setIsActive(false);
      } else {
        onEnd();
      }
    }
  };

  const swapExercise = (index: number, newSkill: any) => {
    const updated = [...exercises];
    updated[index] = {
      ...updated[index],
      id: newSkill.id,
      name: newSkill.name,
      category: newSkill.category,
      muscleGroup: newSkill.muscleGroup,
      image: newSkill.image,
      difficulty: newSkill.difficulty,
      equipment: newSkill.equipment
    };
    setExercises(updated);
    setSwappingIndex(null);
  };

  const jumpToExercise = (index: number) => {
    setCurrentExerciseIndex(index);
    setCurrentSet(1);
    setIsResting(false);
    setIsActive(false);
    setTimeLeft(60);
  };

  const moveExercise = (index: number, dir: 'up' | 'down') => {
    const newIndex = dir === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= exercises.length) return;
    
    const updated = [...exercises];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    
    setExercises(updated);
    
    // If we moved the currently active exercise, follow it
    if (index === currentExerciseIndex) {
      setCurrentExerciseIndex(newIndex);
    } 
    // If another exercise moved into the current active position, update to keep current exercise active
    else if (newIndex === currentExerciseIndex) {
      setCurrentExerciseIndex(index);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentExercise) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Icons.Target size={64} className="text-slate-200" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No exercises selected for this session.</p>
        <button onClick={onEnd} className="bg-slate-800 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px]">Return to Planner</button>
      </div>
    );
  }

  const progress = ((currentExerciseIndex) / exercises.length) * 100 + ((currentSet / currentExercise.sets) * (100 / exercises.length));
  const remainingSessionTime = sessionTimeLimit - totalTime;

  if (isSetup) {
    return (
      <div className="max-w-xl mx-auto py-20 px-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mb-8">
           <Icons.Clock size={40} />
        </div>
        <h1 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Workout Session Setup</h1>
        <p className="text-slate-500 mb-12 uppercase font-black text-[10px] tracking-[0.2em]">Set your target time for this training block</p>
        
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] w-full mb-10">
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">Session Duration (minutes)</p>
           <div className="flex items-center justify-center gap-6">
              <button 
                onClick={() => setSessionTimeLimit(prev => Math.max(300, prev - 300))}
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
              >-</button>
              <span className="text-5xl font-black text-white tabular-nums">{Math.floor(sessionTimeLimit / 60)}</span>
              <button 
                onClick={() => setSessionTimeLimit(prev => prev + 300)}
                className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all"
              >+</button>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
           <button 
            onClick={() => setIsSetup(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
           >
             Start Training <Icons.Play size={18} fill="currentColor" />
           </button>
           <button onClick={onEnd} className="text-slate-500 font-black uppercase tracking-widest text-[10px] py-4">Cancel Session</button>
        </div>
      </div>
    );
  }

  const filteredSkills = skillsData.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[80vh]">
      {/* Session Progress Header */}
      <div className="lg:col-span-12 space-y-4 mb-8">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black text-slate-100 uppercase tracking-tighter italic">Live Training</h1>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Session Countdown</p>
                <p className={`text-2xl font-black tabular-nums ${remainingSessionTime < 300 ? 'text-rose-500 animate-pulse' : 'text-blue-500'}`}>
                  {formatTime(Math.max(0, remainingSessionTime))}
                </p>
              </div>
              <div className="w-px h-10 bg-slate-800" />
              <button 
                onClick={() => setShowSummary(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 p-3 rounded-xl transition-all flex items-center gap-2 text-xs font-black uppercase tracking-widest"
              >
                <Icons.Layout size={18} /> Routine
              </button>
            </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-emerald-500 h-full transition-all duration-1000" 
          />
        </div>
      </div>

      {/* Main Timer Area */}
      <div className="lg:col-span-8 flex flex-col items-center justify-center">
        <div className="bg-slate-800/40 border border-slate-700/50 p-12 rounded-[3rem] w-full flex flex-col items-center relative isolation overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl -z-10" />
          
          <div className="grid grid-cols-1 gap-20 mb-12">
            <div className="text-center relative flex items-center justify-center p-8">
              <svg className="absolute w-72 h-72 -rotate-90">
                <circle
                  cx="144"
                  cy="144"
                  r="130"
                  className="stroke-slate-700/50 fill-none"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="144"
                  cy="144"
                  r="130"
                  className={`${isResting ? 'stroke-rose-500' : 'stroke-blue-500'} fill-none`}
                  strokeWidth="12"
                  strokeDasharray="816.8" 
                  animate={{ strokeDashoffset: isResting ? 816.8 * (1 - timeLeft / currentExercise.restTime) : 0 }}
                  transition={{ duration: 1, ease: "linear" }}
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="relative z-10 flex flex-col items-center">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{isResting ? 'Take a Rest' : 'Work Time'}</p>
                <p className={`text-8xl font-black tabular-nums transition-colors ${isResting ? 'text-rose-500' : 'text-blue-500'}`}>
                  {isResting ? formatTime(timeLeft) : 'GO'}
                </p>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-4">Total Time: {formatTime(totalTime)}</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16 space-y-2">
            <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Upcoming Reps</p>
            <h2 className="text-4xl text-slate-100 font-black uppercase tracking-tighter">{currentExercise.name}</h2>
            <div className="flex items-center justify-center gap-10 mt-6 bg-slate-900/50 px-8 py-4 rounded-3xl border border-slate-700/50">
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase font-black mb-1">Set</span>
                 <span className="text-4xl text-slate-100 font-black">{currentSet} <span className="text-slate-600 text-sm">/ {currentExercise.sets}</span></span>
              </div>
              <div className="w-px h-12 bg-slate-700" />
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-500 uppercase font-black mb-1">{currentExercise.category === 'STATIC' ? 'Hold' : 'Reps'}</span>
                 <span className="text-4xl text-slate-100 font-black">{currentExercise.category === 'STATIC' ? `${currentExercise.holdTime}s` : currentExercise.reps}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={handleReset}
              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white transition-all active:scale-95 shadow-lg"
              title="Reset Routine"
            >
              <Icons.RotateCcw size={24} />
            </button>

            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-24 h-24 rounded-[2rem] flex items-center justify-center ${isActive ? 'bg-amber-500 shadow-amber-500/20' : 'bg-blue-600 shadow-blue-500/20'} text-white shadow-xl active:scale-95 transition-all group`}
            >
              {isActive ? <Icons.Pause size={40} fill="currentColor" /> : <Icons.Play size={40} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
              onClick={nextSet}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-3"
            >
               Complete Set <Icons.ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Side Summary Section */}
      <div className={`${showSummary ? 'fixed inset-0 z-50 p-6 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm' : 'hidden lg:block lg:col-span-4'}`}>
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 h-full max-h-[80vh] overflow-hidden flex flex-col w-full max-w-md shadow-2xl relative">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-lg font-black uppercase tracking-tighter italic">Routine Summary</h2>
             {showSummary && (
               <button onClick={() => setShowSummary(false)} className="text-slate-500 hover:text-white p-2">
                  <Icons.Plus size={24} className="rotate-45" />
               </button>
             )}
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
            {exercises.map((ex, idx) => {
              const state = idx < currentExerciseIndex ? 'done' : idx === currentExerciseIndex ? 'active' : 'upcoming';
              return (
                <div 
                  key={idx}
                  onClick={() => jumpToExercise(idx)}
                  className={`p-4 rounded-2xl border transition-all group cursor-pointer relative overflow-hidden ${
                    state === 'done' ? 'bg-slate-800/20 border-slate-700/30 opacity-60 hover:opacity-100' :
                    state === 'active' ? 'bg-blue-600/10 border-blue-500/30 scale-[1.02] shadow-lg shadow-blue-500/5' :
                    'bg-slate-800/40 border-slate-700/50 hover:border-slate-500/50'
                  }`}
                >
                  {state === 'active' && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" 
                    />
                  )}
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${
                        state === 'done' ? 'bg-emerald-500 text-white' :
                        state === 'active' ? 'bg-blue-500 text-white' :
                        'bg-slate-700 text-slate-400'
                      }`}>
                        {state === 'done' ? <Icons.RotateCcw size={14} className="rotate-180" /> : idx + 1}
                      </div>
                      <div>
                        <p className={`font-black uppercase tracking-tight text-xs ${state === 'active' ? 'text-blue-500' : 'text-slate-100'}`}>
                          {ex.name}
                        </p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          {ex.sets} Sets • {ex.category === 'STATIC' ? `${ex.holdTime}s Hold` : `${ex.reps} Reps`}
                        </p>
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        disabled={idx === 0}
                        onClick={(e) => { e.stopPropagation(); moveExercise(idx, 'up'); }}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-10"
                        title="Move Up"
                      >
                        <Icons.ChevronRight size={14} className="-rotate-90" />
                      </button>
                      <button 
                        disabled={idx === exercises.length - 1}
                        onClick={(e) => { e.stopPropagation(); moveExercise(idx, 'down'); }}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-10"
                        title="Move Down"
                      >
                        <Icons.ChevronRight size={14} className="rotate-90" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSwappingIndex(idx); }}
                      className="text-[8px] font-black uppercase text-slate-500 hover:text-blue-500 transition-all flex items-center gap-1"
                    >
                      <Icons.RotateCcw size={10} /> Swap Skill
                    </button>
                    
                    {state !== 'active' && (
                      <span className="text-[7px] font-black uppercase text-slate-600 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to switch
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
             <button 
              onClick={onEnd}
              className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all border border-rose-500/20"
             >
               Terminate Session
             </button>
          </div>

          {/* Swap Skill Modal Overlay */}
          <AnimatePresence>
            {swappingIndex !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/95 z-50 p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">Select Replacement</h3>
                  <button onClick={() => setSwappingIndex(null)} className="text-slate-500 hover:text-white">
                    <Icons.Plus size={20} className="rotate-45" />
                  </button>
                </div>
                
                <div className="relative mb-6">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input 
                    type="text"
                    placeholder="Search Skills..."
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-hide">
                   {filteredSkills.map(skill => (
                     <button
                        key={skill.id}
                        onClick={() => swapExercise(swappingIndex, skill)}
                        className="w-full text-left p-3 rounded-xl border border-slate-800 hover:border-blue-500/50 bg-slate-900/50 hover:bg-blue-500/5 transition-all group"
                     >
                       <div className="flex items-center justify-between">
                         <div>
                            <p className="text-xs font-black uppercase tracking-tight text-slate-200 group-hover:text-blue-500">{skill.name}</p>
                            <p className="text-[9px] font-bold text-slate-600 uppercase mt-0.5">{skill.category} • {skill.difficulty}</p>
                         </div>
                         <Icons.ArrowRight size={14} className="text-slate-700 group-hover:text-blue-500" />
                       </div>
                     </button>
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}


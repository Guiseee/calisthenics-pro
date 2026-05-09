import { useState } from 'react';
import { motion } from 'motion/react';
import { Icons, skillsData, Skill } from '../types';
import { WorkoutExercise } from '../App';

interface BuilderProps {
  activeDay: string;
  initialExercises: WorkoutExercise[];
  onSave: (day: string, exercises: WorkoutExercise[]) => void;
  onStart: (day: string, exercises: WorkoutExercise[]) => void;
  onCancel: () => void;
}

export default function Builder({ activeDay, initialExercises, onSave, onStart, onCancel }: BuilderProps) {
  const [routine, setRoutine] = useState<WorkoutExercise[]>(initialExercises);
  const [emomMode, setEmomMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'PUSH', 'PULL', 'LEGS', 'CORE', 'STATIC'];

  const filteredSkills = skillsData.filter(s => 
    (activeCategory === 'All' || s.category === activeCategory) &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToRoutine = (skill: Skill) => {
    const newItem: WorkoutExercise = {
      ...skill,
      sets: 3,
      reps: 8,
      holdTime: 10,
      restTime: 60,
    };
    setRoutine([...routine, newItem]);
  };

  const removeFromRoutine = (index: number) => {
    setRoutine(routine.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<WorkoutExercise>) => {
    const newRoutine = [...routine];
    newRoutine[index] = { ...newRoutine[index], ...updates };
    setRoutine(newRoutine);
  };

  const calculateTotalTime = () => {
    return routine.reduce((acc, item) => {
      const workTime = item.category === 'STATIC' ? item.holdTime : (item.reps * 3);
      return acc + (item.sets * (workTime + item.restTime));
    }, 0) / 60;
  };

  const totalTime = calculateTotalTime();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workout Builder {activeDay !== 'New Session' && `for ${activeDay}`}</h1>
          <p className="text-slate-500">{activeDay === 'New Session' ? 'Create a quick routine and start training.' : `Customize your schedule for ${activeDay}.`}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
            <button 
              onClick={() => onSave(activeDay, routine)}
              className="px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all"
            >
              Confirm
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
            <button 
              onClick={() => onStart(activeDay, routine)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <Icons.Play size={14} fill="currentColor" /> Start Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Skill Library Selector */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm overflow-hidden h-[700px] flex flex-col">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icons.Layout size={18} className="text-blue-500" />
              Skill Library
            </h2>
            
            <div className="relative mb-4">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search skills..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6 uppercase tracking-tight">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {filteredSkills.map(skill => (
                <button
                  key={skill.id}
                  onClick={() => addToRoutine(skill)}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border border-slate-50 dark:border-slate-800 hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex-shrink-0 flex items-center justify-center text-blue-500">
                    {skill.category === 'PULL' ? <Icons.ArrowRight size={18} className="-rotate-90" /> : 
                     skill.category === 'PUSH' ? <Icons.ArrowRight size={18} className="rotate-90" /> : 
                     <Icons.Zap size={18} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate uppercase tracking-tight">{skill.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{skill.difficulty}</p>
                  </div>
                  <Icons.Plus size={16} className="ml-auto text-slate-300 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Builder Viewport */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2">
              Routine Editor - {routine.length} Exercises
            </h2>
            <div className="flex items-center gap-4 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-sm font-medium text-slate-500">EMOM Mode</span>
              <button 
                onClick={() => setEmomMode(!emomMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${emomMode ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'}`}
              >
                <motion.div 
                  animate={{ x: emomMode ? 24 : 0 }}
                  className="w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
              <Icons.Info size={16} className="text-slate-400 cursor-help" />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] min-h-[600px] p-6 space-y-4">
            {routine.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 mt-40">
                <Icons.Target size={48} className="opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">Drop items here to build routine</p>
              </div>
            ) : (
              routine.map((item, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`${item.id}-${index}`}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-3xl shadow-sm relative group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500">
                      {item.category === 'PULL' ? <Icons.ArrowRight size={24} className="-rotate-90" /> : 
                       item.category === 'PUSH' ? <Icons.ArrowRight size={24} className="rotate-90" /> : 
                       <Icons.Zap size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg uppercase tracking-tight">{item.name}</h3>
                      <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                        {item.difficulty}
                      </span>
                    </div>
                    <div className="ml-auto flex items-center gap-3">
                      <button 
                        onClick={() => removeFromRoutine(index)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Icons.Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Sets</label>
                      <input 
                        type="number" 
                        value={item.sets}
                        onChange={(e) => updateItem(index, { sets: parseInt(e.target.value) })}
                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">{item.category === 'STATIC' ? 'Hold' : 'Reps'}</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={item.category === 'STATIC' ? item.holdTime : item.reps}
                          onChange={(e) => updateItem(index, item.category === 'STATIC' ? { holdTime: parseInt(e.target.value) } : { reps: parseInt(e.target.value) })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">{item.category === 'STATIC' ? 'S' : ''}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Rest</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={item.restTime}
                          onChange={(e) => updateItem(index, { restTime: parseInt(e.target.value) })}
                          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2 px-3 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">S</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end">
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Volume</p>
                       <p className="font-bold">Balanced</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Workout Summary Stats */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-slate-400 text-sm">Routine Summary</h2>

            <div className="space-y-6">
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Time Estimation</p>
                <p className="text-4xl font-bold text-blue-600 tracking-tight">{Math.round(totalTime)}<span className="text-sm font-medium ml-1">min</span></p>
              </div>
              
              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Exercises</p>
                <p className="text-3xl font-bold tracking-tight">{routine.length}</p>
              </div>

              <div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Focus</p>
                <p className="text-3xl font-bold tracking-tight">Moderate</p>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-700 my-8" />

              <div className="space-y-4">
                {[
                  { label: 'Intensity', value: '7.5/10', icon: <Icons.Flame size={14} className="text-orange-500" /> },
                  { label: 'Complexity', value: 'Advanced', icon: <Icons.Target size={14} className="text-blue-500" /> },
                  { label: 'Recovery', value: '48 Hours', icon: <Icons.Clock size={14} className="text-emerald-500" /> },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2">
                       {stat.icon}
                       <span className="text-slate-500 font-medium">{stat.label}</span>
                    </div>
                    <span className="font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mt-10">
                <button 
                  onClick={() => onSave(activeDay, routine)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group"
                >
                  <Icons.Target size={20} className="group-hover:scale-110 transition-transform" /> Confirm Routine
                </button>
                <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest">Saved to {activeDay}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

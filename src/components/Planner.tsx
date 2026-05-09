import { Icons } from '../types';
import { WeeklySchedule } from '../App';

interface PlannerProps {
  schedule: WeeklySchedule;
  onEditDay: (day: string) => void;
  onStartDay: (day: string) => void;
}

export default function Planner({ schedule, onEditDay, onStartDay }: PlannerProps) {
  const days = Object.keys(schedule);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Weekly Training Routine</h1>
          <p className="text-slate-500">Plan and manage your professional calisthenics schedule.</p>
        </div>
        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-sm">
          Copy Previous Week
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Icons.Calendar size={200} />
        </div>

        <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-10">Training Volume & Frequency</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Workouts</p>
            <p className="text-4xl font-black text-blue-600">{Object.values(schedule).filter(d => d.exercises.length > 0).length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Estimated Volume</p>
            <p className="text-4xl font-black">Moderate</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Skill Focus</p>
            <p className="text-4xl font-black">Pull / Push</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 relative z-10">
          {days.map((day) => {
            const data = schedule[day];
            const isRest = data.exercises.length === 0;

            return (
              <div 
                key={day}
                className={`group rounded-3xl border flex flex-col min-h-[320px] overflow-hidden transition-all hover:shadow-2xl ${
                  isRest 
                    ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100' 
                    : 'bg-white dark:bg-slate-800 border-blue-100 dark:border-blue-900/30 shadow-sm'
                }`}
              >
                <div className={`p-4 text-center border-b font-black text-[10px] uppercase tracking-widest ${isRest ? 'bg-slate-100 dark:bg-slate-900 border-slate-200' : 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 text-blue-600'}`}>
                  {day}
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-4 relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${isRest ? 'bg-slate-100 text-slate-300' : 'bg-blue-50 text-blue-500'}`}>
                    {isRest ? <Icons.Zap size={32} /> : <Icons.Dumbbell size={32} />}
                  </div>
                  <div>
                    <p className={`font-black uppercase tracking-tight text-sm ${isRest ? 'text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                      {data.name}
                    </p>
                    {!isRest && (
                      <p className="text-[10px] font-bold text-blue-500 uppercase mt-1 tracking-widest">{data.duration}</p>
                    )}
                  </div>

                  {!isRest && (
                    <div className="mt-4 flex flex-wrap justify-center gap-1">
                       {data.exercises.slice(0, 3).map((ex, i) => (
                         <div key={i} className="w-2 h-2 bg-blue-500 rounded-full opacity-50" title={ex.name} />
                       ))}
                       {data.exercises.length > 3 && <span className="text-[8px] font-bold text-slate-400">+{data.exercises.length - 3}</span>}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t flex gap-2">
                  <button 
                    onClick={() => onEditDay(day)}
                    className="flex-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-600 hover:text-white px-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter transition-all"
                  >
                    Edit Routine
                  </button>
                  {!isRest && (
                    <button 
                      onClick={() => onStartDay(day)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl transition-all"
                    >
                      <Icons.Play size={14} fill="currentColor" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

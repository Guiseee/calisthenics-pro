import { useState } from 'react';
import { motion } from 'motion/react';
import { Icons, skillsData, Skill } from '../types';

export default function Library({ isDarkMode }: { isDarkMode: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const filteredSkills = skillsData.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle.length === 0 || skill.muscleGroup.some(m => selectedMuscle.includes(m));
    const matchesEquipment = selectedEquipment.length === 0 || skill.equipment.some(e => selectedEquipment.includes(e));
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs'];
  const equipmentList = ['Bar', 'Rings', 'Parallel Bars', 'Floor', 'None'];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Icons.Filter size={20} className="text-blue-500" />
            Filters
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Muscle Groups</h3>
              <div className="space-y-3">
                {muscleGroups.map(group => (
                  <label key={group} className="flex items-center gap-3 group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                      checked={selectedMuscle.includes(group)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedMuscle([...selectedMuscle, group]);
                        else setSelectedMuscle(selectedMuscle.filter(m => m !== group));
                      }}
                    />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors">{group}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800" />

            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Equipment</h3>
              <div className="space-y-3">
                {equipmentList.map(item => (
                  <label key={item} className="flex items-center gap-3 group cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                      checked={selectedEquipment.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedEquipment([...selectedEquipment, item]);
                        else setSelectedEquipment(selectedEquipment.filter(e => e !== item));
                      }}
                    />
                    <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Calisthenics Skill Library</h1>
          <p className="text-slate-500 dark:text-slate-400">Browse through our collection of exercises and master your progression path.</p>
        </div>

        <div className="relative mb-12">
          <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search skills, muscle groups, equipment..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Icons.Filter size={18} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Skills List Grid */}
        <div className="space-y-16">
        {['PULL', 'PUSH', 'CORE', 'LEGS', 'STATIC'].map(cat => {
            const skillsInCat = filteredSkills.filter(s => s.category === cat);
            if (skillsInCat.length === 0) return null;

            return (
              <section key={cat} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-500 rounded-full" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter">{cat}</h2>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    {skillsInCat.length} Skills
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {skillsInCat.map((skill) => (
                    <div key={skill.id}>
                      <SkillCard skill={skill} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface SkillCardProps {
  skill: Skill;
}

function SkillCard({ skill }: SkillCardProps) {
  const difficultyColors = {
    Beginner: 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    Intermediate: 'bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    Advanced: 'bg-orange-100/50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
    Hardcore: 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400',
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 mb-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all">
        {skill.category === 'PULL' ? <Icons.ArrowRight className="-rotate-90" size={20} /> : 
         skill.category === 'PUSH' ? <Icons.ArrowRight className="rotate-90" size={20} /> : 
         skill.category === 'CORE' ? <Icons.Flame size={20} /> :
         skill.category === 'LEGS' ? <Icons.Zap size={20} /> :
         <Icons.Target size={20} />}
      </div>
      
      <h3 className="font-black text-sm mb-3 group-hover:text-blue-500 transition-colors uppercase tracking-tight leading-tight min-h-[2.5rem] flex items-center justify-center">
        {skill.name}
      </h3>
      
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 w-full flex flex-col gap-2">
        <span className={`text-[8px] mx-auto uppercase font-black px-2.5 py-1 rounded-lg ${difficultyColors[skill.difficulty]}`}>
          {skill.difficulty}
        </span>
        <div className="flex items-center justify-center gap-1.5">
           {skill.equipment.slice(0, 2).map((eq, i) => (
             <span key={i} className="text-[7px] font-bold text-slate-400 uppercase">{eq}</span>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

import { 
  Dumbbell, 
  Search, 
  Filter, 
  ChevronRight, 
  Play, 
  Pause, 
  SkipForward, 
  Clock, 
  Layout, 
  Calendar, 
  User,
  Plus,
  Trash2,
  Share2,
  Info,
  Flame,
  Zap,
  Target,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const Icons = {
  Dumbbell,
  Search,
  Filter,
  ChevronRight,
  Play,
  Pause,
  SkipForward,
  Clock,
  Layout,
  Calendar,
  User,
  Plus,
  Trash2,
  Share2,
  Info,
  Flame,
  Zap,
  Target,
  ArrowRight,
  RotateCcw
};

export interface Skill {
  id: string;
  name: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hardcore';
  muscleGroup: string[];
  equipment: string[];
  image: string;
  category: 'PUSH' | 'PULL' | 'LEGS' | 'CORE' | 'STATIC';
}

export const skillsData: Skill[] = [
  // PUSH
  {
    id: 'knee-push-up',
    name: 'Knee Push-up',
    difficulty: 'Beginner',
    muscleGroup: ['Chest', 'Arms'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'push-up',
    name: 'Push-up',
    difficulty: 'Beginner',
    muscleGroup: ['Chest', 'Arms'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'diamond-push-up',
    name: 'Diamond Push-up',
    difficulty: 'Intermediate',
    muscleGroup: ['Triceps', 'Chest'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'wide-push-up',
    name: 'Wide Push-up',
    difficulty: 'Intermediate',
    muscleGroup: ['Chest'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'archer-push-up-push',
    name: 'Archer Push-up',
    difficulty: 'Advanced',
    muscleGroup: ['Chest', 'Shoulders'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'pseudo-planche-pushup-push',
    name: 'Pseudo Planche Push-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Chest'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'one-arm-push-up',
    name: 'One Arm Push-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Chest', 'Core'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'pike-push-up',
    name: 'Pike Push-up',
    difficulty: 'Beginner',
    muscleGroup: ['Shoulders'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'handstand-pushup-push',
    name: 'Handstand Push-up',
    difficulty: 'Advanced',
    muscleGroup: ['Shoulders', 'Arms'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'planche-lean-push',
    name: 'Planche Lean',
    difficulty: 'Intermediate',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Floor'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'tuck-planche-push',
    name: 'Tuck Planche',
    difficulty: 'Advanced',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Floor', 'Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'tuck-planche-pu',
    name: 'Tuck Planche Push-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Chest'],
    equipment: ['Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'adv-tuck-planche-push',
    name: 'Advanced Tuck Planche',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'straddle-planche-push',
    name: 'Straddle Planche',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'full-planche-push',
    name: 'Full Planche',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'planche-pushup-push',
    name: 'Planche Push-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Chest'],
    equipment: ['Floor', 'Parallettes'],
    category: 'PUSH',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },

  // PULL
  {
    id: 'dead-hang',
    name: 'Dead Hang',
    difficulty: 'Beginner',
    muscleGroup: ['Grip', 'Shoulders'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c32f850c?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'scapular-pull-up',
    name: 'Scapular Pull-up',
    difficulty: 'Beginner',
    muscleGroup: ['Back', 'Shoulders'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c32f850c?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'assisted-pull-up',
    name: 'Assisted Pull-up',
    difficulty: 'Beginner',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar', 'Bands'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'pull-up',
    name: 'Pull-up',
    difficulty: 'Intermediate',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'chin-up',
    name: 'Chin-up',
    difficulty: 'Intermediate',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'archer-pull-up-pull',
    name: 'Archer Pull-up',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a35e?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'chest-to-bar-pull-up',
    name: 'Chest-to-bar Pull-up',
    difficulty: 'Intermediate',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'l-sit-pull-up',
    name: 'L-sit Pull-up',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Arms', 'Core'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'typewriter-pull-up',
    name: 'Typewriter Pull-up',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1591940742878-13aba4b7a35e?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'one-arm-pull-up-pull',
    name: 'One Arm Pull-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1598971639058-fab3c32f850c?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'tuck-front-lever-pull',
    name: 'Tuck Front Lever',
    difficulty: 'Intermediate',
    muscleGroup: ['Back', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'adv-tuck-front-lever-pull',
    name: 'Advanced Tuck Front Lever',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'straddle-front-lever-pull',
    name: 'Straddle Front Lever',
    difficulty: 'Hardcore',
    muscleGroup: ['Back', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'full-front-lever-pull',
    name: 'Full Front Lever',
    difficulty: 'Hardcore',
    muscleGroup: ['Back', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'front-lever-pull-up',
    name: 'Front Lever Pull-up',
    difficulty: 'Hardcore',
    muscleGroup: ['Back', 'Arms'],
    equipment: ['Bar', 'Rings'],
    category: 'PULL',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },

  // CORE
  {
    id: 'plank-core',
    name: 'Plank',
    difficulty: 'Beginner',
    muscleGroup: ['Core'],
    equipment: ['Floor'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'hanging-knee-raise',
    name: 'Hanging Knee Raise',
    difficulty: 'Beginner',
    muscleGroup: ['Core'],
    equipment: ['Bar'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'leg-raise-core',
    name: 'Leg Raise',
    difficulty: 'Intermediate',
    muscleGroup: ['Core'],
    equipment: ['Floor', 'Bar'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'toes-to-bar',
    name: 'Toes to Bar',
    difficulty: 'Intermediate',
    muscleGroup: ['Core'],
    equipment: ['Bar'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'l-sit-core',
    name: 'L-sit',
    difficulty: 'Intermediate',
    muscleGroup: ['Core', 'Shoulders'],
    equipment: ['Floor', 'Parallettes'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'v-sit-core',
    name: 'V-sit',
    difficulty: 'Advanced',
    muscleGroup: ['Core'],
    equipment: ['Floor'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'dragon-flag-core',
    name: 'Dragon Flag',
    difficulty: 'Advanced',
    muscleGroup: ['Core'],
    equipment: ['Bar', 'Bench'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'windshield-wiper',
    name: 'Windshield Wiper',
    difficulty: 'Advanced',
    muscleGroup: ['Core', 'Obliques'],
    equipment: ['Bar'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'human-flag-core',
    name: 'Human Flag',
    difficulty: 'Hardcore',
    muscleGroup: ['Core', 'Shoulders'],
    equipment: ['Pole', 'Bar'],
    category: 'CORE',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },

  // LEGS
  {
    id: 'squat-legs',
    name: 'Squat',
    difficulty: 'Beginner',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'lunges-legs',
    name: 'Lunges',
    difficulty: 'Beginner',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    difficulty: 'Intermediate',
    muscleGroup: ['Legs'],
    equipment: ['Floor', 'Bench'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'jump-squat',
    name: 'Jump Squat',
    difficulty: 'Intermediate',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'pistol-squat-legs',
    name: 'Pistol Squat',
    difficulty: 'Advanced',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'shrimp-squat-legs',
    name: 'Shrimp Squat',
    difficulty: 'Advanced',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'nordic-curl-legs',
    name: 'Nordic Curl',
    difficulty: 'Advanced',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'dragon-squat',
    name: 'Dragon Squat',
    difficulty: 'Hardcore',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'single-leg-jump',
    name: 'Single Leg Jump',
    difficulty: 'Intermediate',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'sissy-squat',
    name: 'Sissy Squat',
    difficulty: 'Advanced',
    muscleGroup: ['Legs'],
    equipment: ['Floor'],
    category: 'LEGS',
    image: 'https://images.unsplash.com/photo-1536922645426-5d658ab49b81?q=80&w=400&h=300&fit=crop'
  },

  // STATIC
  {
    id: 'frog-stand',
    name: 'Frog Stand',
    difficulty: 'Beginner',
    muscleGroup: ['Shoulders', 'Arms'],
    equipment: ['Floor'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'crow-pose',
    name: 'Crow Pose',
    difficulty: 'Beginner',
    muscleGroup: ['Shoulders', 'Arms'],
    equipment: ['Floor'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'handstand-wall-static',
    name: 'Handstand (Wall)',
    difficulty: 'Beginner',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Floor', 'Wall'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'handstand-freestanding',
    name: 'Handstand (Freestanding)',
    difficulty: 'Intermediate',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Floor'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'l-sit-hold',
    name: 'L-sit Hold',
    difficulty: 'Intermediate',
    muscleGroup: ['Core', 'Shoulders'],
    equipment: ['Floor', 'Parallettes'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'tuck-planche-static',
    name: 'Tuck Planche',
    difficulty: 'Advanced',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'front-lever-static',
    name: 'Front Lever',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'back-lever-static',
    name: 'Back Lever',
    difficulty: 'Advanced',
    muscleGroup: ['Back', 'Shoulders', 'Core'],
    equipment: ['Bar', 'Rings'],
    category: 'STATIC',
    image: 'https://plus.unsplash.com/premium_photo-1664107142718-d0e808168fbc?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'human-flag-static',
    name: 'Human Flag',
    difficulty: 'Advanced',
    muscleGroup: ['Core', 'Shoulders'],
    equipment: ['Pole'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'straddle-planche-static',
    name: 'Straddle Planche',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  },
  {
    id: 'full-planche-static',
    name: 'Full Planche',
    difficulty: 'Hardcore',
    muscleGroup: ['Shoulders', 'Core'],
    equipment: ['Parallettes'],
    category: 'STATIC',
    image: 'https://images.unsplash.com/photo-1590239068551-99c8496bbdc1?q=80&w=400&h=300&fit=crop'
  }
];

import { create } from 'zustand';

interface OptionStore {
  specialFilter: string | null;
  removeEmpties: boolean;
  setSpecialFilter: (value: string) => void;
}

const useOptionStore = create<OptionStore>()(set => ({
  specialFilter: null,
  removeEmpties: true,

  setSpecialFilter: (value: string) => set(() => ({ specialFilter: value }))
}));

export default useOptionStore;

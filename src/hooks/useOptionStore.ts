import { create } from 'zustand';

interface OptionStore {
  specialFilter: string | null;
  removeFull: boolean;
  setSpecialFilter: (value: string) => void;
}

const useOptionStore = create<OptionStore>()(set => ({
  specialFilter: null,
  removeFull: true,

  setSpecialFilter: (value: string) => set(() => ({ specialFilter: value }))
}));

export default useOptionStore;

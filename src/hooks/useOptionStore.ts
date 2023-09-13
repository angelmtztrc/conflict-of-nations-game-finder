import { create } from 'zustand';

const useOptionStore = create(set => ({
  options: {
    specialFilter: null,
    removeEmpties: true
  },

  setSpecialFilter: (value: string) => set(() => ({ specialFilter: value }))
}));

export default useOptionStore;

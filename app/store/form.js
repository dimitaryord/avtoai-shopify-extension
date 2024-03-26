import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import setupObject from "../setup/setup.json";

const useFormStore = create(
  persist(
    (set, get) => ({
      formData: null,
      currentStep: 1,
      totalSteps: Object.keys(setupObject).length,
      nextStep: () => {
        if (get().currentStep < get().totalSteps)
          set({ currentStep: get().currentStep + 1 });
      },
      previousStep: () => {
        if (get().currentStep > 1) set({ currentStep: get().currentStep - 1 });
      },
      setFormData: (formData) =>
        set({
          formData: { ...get().formData, ...formData },
        }),
      refreshFormData: () => set({ formData: null, currentStep: 1 }),
    }),
    {
      name: "form-data-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFormStore;

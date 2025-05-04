import { defineStore } from "pinia";
import { useCityStore } from "../city";
import { useCategoryStore } from "../category";
import { BACKEND_PORT, Firm } from "../../shared";


export const useFirmsStore = defineStore('firms', {
  state: () => ({
    firms: null as Firm[] | null,
    firmsLoading: true,
  }),

  actions: {
    async getFirms(page, limit): Promise<Firm[] | null> {
      const cityStore = useCityStore()
      const categoryStore = useCategoryStore()
      try {
        if (
          !cityStore.city ||
          ['Выберите город'].indexOf(cityStore.city) !== -1 ||
          !categoryStore.category ||
          ['Выберите категорию'].indexOf(categoryStore.category) !== -1
        ) {
          return null;
        }

        const firms = await fetch(
          `${BACKEND_PORT}/api/firms_by_abbr?city_id=${cityStore.city}&category_id=${categoryStore.category}&page=${page}&limit=${limit}`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
          },
        )
          .then((res) => res.json())
          .catch(() => {
            console.warn('error');
          });
        this.firms = firms?.data?.firms || null;
      } catch (error) {
        console.warn(error);
        return null;
      } finally {
        this.firmsLoading = false
      }
    },
  },
})
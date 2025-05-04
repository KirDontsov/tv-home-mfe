import { defineStore } from "pinia";
import { BACKEND_PORT, CitiesQueryResult, City } from "../../shared";

export const useCitiesStore = defineStore('cities', {
  state: () => ({
    cities: null as City[] | null,
    citiesLoading: true,
  }),

  actions: {
    async getCities(): Promise<City[] | null> {
      try {
        const cities: CitiesQueryResult = await fetch(`${BACKEND_PORT}/api/cities?page=${1}&limit=${10}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        })
          .then((res) => res.json())
          .catch(() => {
            console.warn('error');
          });
        this.cities = cities?.data?.cities?.filter((x) => x?.is_active === 'true') || null;
      } catch (error) {
        console.warn(error);
        return null;
      } finally {
        this.citiesLoading = false;
      }
    },
  },
})
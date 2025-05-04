import { defineStore } from "pinia";
import { BACKEND_PORT, CategoriesQueryResult, Category } from "../../shared";

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: null as Category[] | null,
    categoriesLoading: true,
  }),

  actions: {
    async getCategories(): Promise<Category[] | null> {
      try {
        const categories: CategoriesQueryResult = await fetch(
          `${BACKEND_PORT}/api/categories?page=${1}&limit=${10}`,
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
          },
        )
          .then((res) => res.json())
          .catch(() => {
            console.warn('error');
          });

        this.categories = categories?.data?.categories?.filter((x) => x?.is_active === 'true') || null;
      } catch (error) {
        console.warn(error);
        return null;
      } finally {
        this.categoriesLoading = false;
      }
    },
  },
})
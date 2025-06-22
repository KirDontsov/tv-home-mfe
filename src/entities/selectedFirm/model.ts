import { defineStore } from 'pinia';
import { BACKEND_PORT, type Firm } from '../../shared';

export const useSelectedFirmStore = defineStore('selectedFirm', {
  state: () => ({
    firm: null as Firm | null,
    firmLoading: false,
  }),
  actions: {
    async getFirm(firm_id): Promise<Firm[] | null> {
      try {
        this.firmLoading = true;

        const firm = await fetch(`${BACKEND_PORT}/api/firm_by_url/${firm_id}`, {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        })
          .then((res) => res.json())
          .catch(() => {
            console.warn('error getFirm');
          });
        this.firm = firm?.data?.firm || null;
      } catch (error) {
        console.warn(error);
        return null;
      } finally {
        this.firmLoading = false;
      }
    },
  },
});

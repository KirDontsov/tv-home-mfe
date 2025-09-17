import { defineStore } from 'pinia';
import type { AvitoMeta, AvitoItemAnalyticsParams, AvitoAdsByFeedResponse, AvitoAd } from '@/shared';
import { getAvitoItemAnalytics, getAvitoItems } from '@/shared/api/avito';

export interface AvitoAnalytics {
  views: string;
  contacts: string;
  viewsToContactsConversion: string;
  favorites: string;
  averageViewCost: string;
  averageContactCost: string;
  impressions: string;
  impressionsToViewsConversion: string;
  spending: string;
}

// Analytics API response interface
export interface AvitoAnalyticsResponse {
  result: {
    dataTotalCount: number;
    groupings: AvitoAnalyticsGrouping[];
    timestamp: string;
  };
}

export interface AvitoAnalyticsGrouping {
  id: number;
  metrics: AvitoMetric[];
  type: string;
}

export interface AvitoMetric {
  slug: string;
  value: number;
}

export const useAvitoItemsStore = defineStore('avito-items', {
  state: () => ({
    meta: null as AvitoMeta | null,
    items: [] as AvitoAd[],
    itemsLoading: true,
    category: null as string,
    analyticsData: null as AvitoAnalytics,
    analyticsLoading: false,
    analyticsError: null as string | null,
  }),

  actions: {
    async getAvitoItems(): Promise<AvitoAdsByFeedResponse | null> {
      try {
        this.itemsLoading = true;
        const res = await getAvitoItems();

        if (res && res.status === 'success') {
          // Flatten all ads from all feeds
          const allAds: AvitoAd[] = [];
          res.data.forEach((feed) => {
            allAds.push(...feed.ads);
          });

          // Add ads directly to the store (no transformation needed)
          // We need to cast to AvitoAd to satisfy TypeScript
          this.items.push(...(allAds as AvitoAd[]));
          this.category = res.data?.[0].category;

          // Create a mock meta object since we don't have pagination in the new structure
          this.meta = {
            page: 1,
            per_page: allAds.length,
          };
        }

        return res;
      } catch (error) {
        console.warn(error);
        return null;
      } finally {
        this.itemsLoading = false;
      }
    },

    async getItemsAnalytics(params: AvitoItemAnalyticsParams): Promise<void> {
      try {
        this.analyticsLoading = true;
        this.analyticsError = null;

        // Fetch analytics data
        const analyticsResponse = await getAvitoItemAnalytics(params);

        this.analyticsData = analyticsResponse.data?.groupings;
        return analyticsResponse.data;
      } catch (error) {
        console.error('Error fetching analytics:', error);
        this.analyticsError = 'Failed to fetch analytics data';
      } finally {
        this.analyticsLoading = false;
      }
    },
    setItemsLoading(loading: boolean): void {
      this.itemsLoading = loading;
    },
  },
});

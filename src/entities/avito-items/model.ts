import { defineStore } from 'pinia';
import type { AvitoGetItemsResponse, AvitoMeta, AvitoItem, AvitoItemAnalyticsParams } from '@/shared';
import { getAvitoItemAnalytics, getAvitoItems } from '@/shared/api/avito';
import type { AvitoTokenParams } from '@/shared';

export interface AvitoItemWithAnalytics extends AvitoItem {
  analytics?: {
    views: number;
    contacts: number;
    viewsToContactsConversion: number;
    favorites: number;
    averageViewCost: number;
    averageContactCost: number;
    impressions: number;
    impressionsToViewsConversion: number;
    spending: number;
  };
}

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
    items: [] as AvitoItemWithAnalytics[],
    itemsLoading: true,
    analyticsData: null as AvitoAnalytics,
    analyticsLoading: false,
    analyticsError: null as string | null,
  }),

  actions: {
    async getAvitoItems({ avito_token, page }: AvitoTokenParams): Promise<AvitoGetItemsResponse | null> {
      try {
        this.itemsLoading = true;
        const res = await getAvitoItems({ avito_token, page });

        if (res) {
          this.items.push(...(res?.data?.items || []));
          this.meta = res?.data?.meta || null;
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

        this.analyticsData = analyticsResponse.data;
        return analyticsResponse.data;
      } catch (error) {
        console.error('Error fetching analytics:', error);
        this.analyticsError = 'Failed to fetch analytics data';
      } finally {
        this.analyticsLoading = false;
      }
    },

    // Helper method to combine items with their analytics
    combineItemsWithAnalytics(groupings: AvitoAnalyticsGrouping[]): void {
      // Create a map for quick lookup of analytics by item ID
      const analyticsMap = new Map<number, AvitoAnalyticsGrouping>();
      groupings.forEach((grouping) => {
        analyticsMap.set(grouping.id, grouping);
      });

      const res = this.items.map((item) => {
        const grouping = analyticsMap.get(item.id);
        if (!grouping) return item;

        return {
          ...item,
          analytics: this.transformMetrics(grouping.metrics),
        };
      });

      // Update items with their analytics
      this.items = res;
    },

    // Helper method to transform metrics array to the required analytics object
    transformMetrics(metrics: AvitoMetric[]): AvitoItemWithAnalytics['analytics'] {
      const metricsMap = new Map<string, string>();

      metrics.forEach((metric) => {
        metricsMap.set(metric.slug, metric.value.toString());
      });

      return {
        impressions: Number(metricsMap.get('impressions') || '0'),
        views: Number(metricsMap.get('views') || '0'),
        contacts: Number(metricsMap.get('contacts') || '0'),
        viewsToContactsConversion: Number(Number(metricsMap.get('viewsToContactsConversion')) || '0').toFixed(2),
        favorites: Number(metricsMap.get('favorites') || '0'),
        averageViewCost: Number(Number(metricsMap.get('averageViewCost')) / 100 || '0'),
        averageContactCost: Number(Number(metricsMap.get('averageContactCost')) / 100 || '0'),
        impressionsToViewsConversion: Number(Number(metricsMap.get('impressionsToViewsConversion')) || '0').toFixed(2),
        spending: Number(Number(metricsMap.get('spending')) / 100 || '0'),
      };
    },
    setItemsLoading(loading: boolean): void {
      this.itemLoading = loading;
    },
  },
});

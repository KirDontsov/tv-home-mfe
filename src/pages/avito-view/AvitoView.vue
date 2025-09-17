<template>
  <PageContainer :loading="avitoItemsStore.itemsLoading" :expanded="sidebarStore.expanded.value">
    <template #body>
      <CsvExporter
        v-if="avitoItemsStore.items?.length > 0 && !avitoItemsStore.itemsLoading"
        :items="avitoItemsStore.items"
      />
      <div
        v-if="avitoItemsStore.items?.length > 0 && !avitoItemsStore.itemsLoading"
        class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full"
      >
        <ItemCard
          :item="item"
          :analytics-data="avitoItemsStore.analyticsData"
          :analytics-loading="avitoItemsStore.analyticsLoading"
          :key="item.ad_id"
          v-for="item in avitoItemsStore.items"
          @select="handleSelect"
        />
      </div>

      <ItemForm />
    </template>
  </PageContainer>
</template>

<script setup>
import { useAvitoItemFormStore, useAvitoItemsStore, useCookies, useSidebarStore } from '@/entities';
import PageContainer from '@/features/page-container';
import { onMounted } from 'vue';
import { getAvitoToken } from '@/shared/api/avito';
import ItemCard from '@/features/item-card';
import CsvExporter from '@/features/csv-exporter';
import ItemForm from '@/features/item-form/index.js';

const { value: avito_token } = useCookies('avito_token');
const { value: user_id } = useCookies('user_id');

const sidebarStore = useSidebarStore();
const avitoItemsStore = useAvitoItemsStore();
const avitoItemFormStore = useAvitoItemFormStore();

onMounted(async () => {
  if (!avito_token.value) {
    await getAvitoToken();
  } else {
    if (avito_token.value && user_id.value) {
      await avitoItemsStore.getAvitoItems();

      await avitoItemsStore.getItemsAnalytics({
        avito_token: avito_token.value,
        account_id: `${user_id.value}`,
        dateFrom: '2025-08-01',
        dateTo: '2025-08-31',
        grouping: 'item',
        limit: 100,
        metrics: [
          'views',
          'contacts',
          'favorites',
          'viewsToContactsConversion',
          'averageViewCost',
          'averageContactCost',
          'impressions',
          'impressionsToViewsConversion',
          'spending',
        ],
        offset: 0,
      });
      avitoItemsStore.setItemsLoading(false);
    }
  }
});

const handleSelect = (value) => avitoItemFormStore.setSelected(value);
</script>

<style></style>

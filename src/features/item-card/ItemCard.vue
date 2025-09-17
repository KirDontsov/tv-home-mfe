<template>
  <div
    :id="item?.ad_id"
    @click.stop="handleSelect"
    class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
  >
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
        {{ getFieldValue('Title') || 'Без названия' }}
      </h5>
    </div>
    <!-- Upper part - Item fields in 2 grid columns -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Left column - Dynamic fields from item.fields -->
      <div>
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-600">
          <!-- Display all fields from item -->
          <li v-for="field in item.fields" :key="field.field_id" class="py-3 sm:py-4">
            <div class="flex items-start">
              <div class="shrink-0"></div>
              <div class="flex gap-4 items-center justify-between w-full ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {{ getCategoryFieldLabel(field.tag) }}:
                </p>
                <div v-for="value in field.values" :key="value.field_value_id" class="mt-1 overflow-hidden">
                  <p class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white truncate">
                    {{ value.value }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Right column - Basic item info -->
      <div class="flex flex-col  gap-6">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-600">
          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">ID:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ item.ad_id }}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Avito ID:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ item.avito_ad_id }}
              </div>
            </div>
          </li>

          <!-- Parsed ID -->
          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Parsed ID:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ item.parsed_id }}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Статус:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ item.status }}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Активно:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ item.is_active ? 'Да' : 'Нет' }}
              </div>
            </div>
          </li>

          <li class="py-3 sm:py-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Дата создания:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ formatDate(item.created_ts) }}
              </div>
            </div>
          </li>
        </ul>

        <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mx-4">
          Аналитика
        </h5>

        <!-- Show loader when analytics are loading -->
        <div v-if="analyticsLoading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          <span class="ml-2 text-gray-700 dark:text-gray-300">Загрузка аналитики...</span>
        </div>

        <!-- Show analytics data when loaded -->
        <ul v-else role="list" class="divide-y divide-gray-200 dark:divide-gray-600">
          <!-- Analytics -->
          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Просмотров:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('views') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('impressions') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов в просмотры:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('impressionsToViewsConversion') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Контакты:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('contacts') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов в контакты:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('viewsToContactsConversion') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Избранное:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ getMetricValue('favorites') }}
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Ср. цена просмотра:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ formatCurrency(getMetricValue('averageViewCost')) }} &#8381
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Ср. цена контакта:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ formatCurrency(getMetricValue('averageContactCost')) }} &#8381
              </div>
            </div>
          </li>

          <li v-if="getAnalyticsForItem()" class="py-3 sm:pt-4">
            <div class="flex items-center">
              <div class="shrink-0"></div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Затраты:</p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {{ formatCurrency(getMetricValue('spending')) }} &#8381
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { AvitoAd, AvitoItemAnalytics } from '@/shared/interfaces/avito';

interface Props {
  item: AvitoAd;
  analyticsData: AvitoItemAnalytics[] | null;
  analyticsLoading?: boolean;
  categoryFields?: any[]; // CategoryField[] type would be better but requires import
}

interface Emits {
  (e: 'select', value: string): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const handleSelect = ({ currentTarget }) => {
  emit('select', currentTarget.id);
};

// Function to find matching analytics data for this item
const getAnalyticsForItem = () => {
  if (!props.analyticsData || !props.item.avito_ad_id) {
    return null;
  }
  
  // Find the analytics grouping that matches this item's avito_ad_id
  const matchingGrouping = props.analyticsData?.find(
    grouping => grouping.id.toString() === props.item.avito_ad_id
  );
  
  return matchingGrouping ? matchingGrouping.metrics : null;
};

// Helper function to get metric value by slug
const getMetricValue = (slug: string): string | number => {
  const analytics = getAnalyticsForItem();
  if (!analytics) return '';
  
  const metric = analytics?.find(m => m.slug === slug);
  if (!metric) return '';
  
  // Format specific metrics
  if (slug === 'averageViewCost' || slug === 'averageContactCost' || slug === 'spending') {
    return metric.value / 100; // Convert from kopeks to rubles
  }
  
  if (slug === 'viewsToContactsConversion' || slug === 'impressionsToViewsConversion') {
    return (metric.value * 100).toFixed(2) + '%'; // Convert to percentage
  }
  
  return metric.value;
};

// Helper function to format currency values
const formatCurrency = (value: number): string => {
  if (typeof value !== 'number') return '';
  return value.toFixed(2);
};

// Helper function to extract field value by tag
const getFieldValue = (tag: string): string => {
  const field = props.item.fields?.find((f) => f.tag === tag);
  if (field && field.values.length > 0) {
    return field.values[0].value;
  }
  return '';
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to get category field label by tag
const getCategoryFieldLabel = (tag: string): string => {
  if (!props.categoryFields) return tag;
  
  const categoryField = props.categoryFields.find((field) => field.tag === tag);
  return categoryField ? categoryField.label : tag;
};
</script>

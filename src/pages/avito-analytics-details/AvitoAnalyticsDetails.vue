<!-- components/AvitoAnalyticsDetails.vue -->
<template>
  <PageContainer :loading="avitoAnalyticsAdsStore.loading" :expanded="sidebarStore.expanded.value">
    <template #body>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600"
      >
        <h2 class="text-xl font-semibold text-gray-80 dark:text-white mb-6">
          Детали запроса Avito: {{ selectedRequest?.createdTs ? formatDate(selectedRequest.createdTs) : '' }}
        </h2>

        <!-- Error message -->
        <div
          v-if="avitoAnalyticsAdsStore.error"
          class="mb-4 p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-90 dark:text-red-100"
        >
          {{ avitoAnalyticsAdsStore.error }}
        </div>

        <!-- Table to display ads data -->
        <div
          v-if="avitoAnalyticsAdsStore.ads && avitoAnalyticsAdsStore.ads.length > 0"
          class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-full"
        >
          <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3 font-medium">ID объявления</th>
                <th scope="col" class="px-3 py-3 font-medium">Название</th>
                <th scope="col" class="px-3 py-3 font-medium">Цена</th>
                <th scope="col" class="px-3 py-3 font-medium">Позиция</th>
                <th scope="col" class="px-3 py-3 font-medium">Просмотры</th>
                <th scope="col" class="px-3 py-3 font-medium">Продвижение</th>
                <th scope="col" class="px-3 py-3 font-medium">Город запроса</th>
                <th scope="col" class="px-3 py-3 font-medium">Поиск запроса</th>
                <th scope="col" class="px-3 py-3 font-medium">Дата объявления</th>
                <th scope="col" class="px-3 py-3 font-medium">ID объявления Avito</th>
                <th scope="col" class="px-3 py-3 font-medium">Категории</th>
                <th scope="col" class="px-3 py-3 font-medium">Имя продавца</th>
                <th scope="col" class="px-3 py-3 font-medium">Тип продавца</th>
                <th scope="col" class="px-3 py-3 font-medium">Рейтинг</th>
                <th scope="col" class="px-3 py-3 font-medium">Кол-во отзывов</th>
                <th scope="col" class="px-3 py-3 font-medium">Кол-во фото</th>
                <th scope="col" class="px-3 py-3 font-medium">Адрес</th>
                <th scope="col" class="px-3 py-3 font-medium">Описание</th>
                <th scope="col" class="px-3 py-3 font-medium">Доставка</th>
                <th scope="col" class="px-3 py-3 font-medium">Кол-во объявлений</th>
                <th scope="col" class="px-3 py-3 font-medium">Кол-во закрытых объявлений</th>
                <th scope="col" class="px-3 py-3 font-medium">Дата создания</th>
                <th scope="col" class="px-3 py-3 font-medium">Дата запуска</th>
                <th scope="col" class="px-3 py-3 font-medium">Время ответа</th>
                <th scope="col" class="px-3 py-3 font-medium">Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ad, index) in avitoAnalyticsAdsStore.ads"
                :key="ad.ad_id"
                :class="[
                  'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600',
                  ad.my_ad ? 'border-2 border-blue-500 dark:border-blue-400' : ''
                ]"
              >
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate" :title="ad.ad_id">
                  <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">
                    <a
                      :href="ad.link"
                      target="_blank"
                      class="text-blue-600 hover:underline dark:text-blue-50 truncate max-w-xs inline-block"
                      :title="ad.link"
                    >
                      {{ ad.ad_id || 'N/A' }}
                    </a>
                  </td>
                </td>
                <TextPopup
                  :text-value="ad.title || 'N/A'"
                  :max-length="40"
                  title="Название"
                  custom-class="max-w-xs"
                />
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.price || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.position || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.views || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                  <PromotionDisplay :promotion-value="ad.promotion || 'N/A'" />
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.city_query || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.search_query || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.ad_date || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.avito_ad_id || 'N/A' }}</td>
                <td
                  class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate"
                  :title="ad.categories"
                >
                  {{ ad.categories || 'N/A' }}
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">
                  <a
                    :href="ad.seller_id"
                    target="_blank"
                    class="text-blue-600 hover:underline dark:text-blue-50 truncate max-w-xs inline-block"
                    :title="ad.seller_id"
                  >
                    {{ ad.seller_name || 'N/A' }}
                  </a></td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.seller_type || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.rating || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.reviews_count || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.photo_count || 'N/A' }}</td>
                <TextPopup
                  :text-value="ad.address || 'N/A'"
                  :max-length="40"
                  :showCopyButton="false"
                  title="Адрес"
                  custom-class="max-w-xs"
                />
                <TextPopup
                  :text-value="ad.description || 'N/A'"
                  :max-length="50"
                  title="Описание"
                  custom-class="max-w-xs"
                />
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.delivery || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.ads_count || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.closed_ads_count || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.created_ts ? formatDate(ad.created_ts) : 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.run_date ? formatDate(ad.run_date) : 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.answer_time || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.register_date || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-else-if="
            !avitoAnalyticsAdsStore.loading && avitoAnalyticsAdsStore.ads && avitoAnalyticsAdsStore.ads.length === 0
          "
          class="text-center py-4 text-gray-50 dark:text-gray-400"
        >
          Нет данных для отображения
        </div>
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '@/entities';
import { useAvitoAnalyticsAdsStore } from '@/entities/avito-analytics-ads';
import PageContainer from '@/features/page-container';
import TextPopup from '@/shared/components/TextPopup.vue';
import PromotionDisplay from '@/shared/components/PromotionDisplay.vue';

const route = useRoute();
const sidebarStore = useSidebarStore();
const avitoAnalyticsAdsStore = useAvitoAnalyticsAdsStore();

// Find the selected request from the store requests
const selectedRequest = computed(() => {
  const requestId = route.params.id as string;
  return avitoAnalyticsAdsStore.requests.find((req) => req.request_id === requestId) || null;
});

onMounted(async () => {
  const requestId = route.params.id as string;
  if (requestId) {
    // Fetch ads data
    await avitoAnalyticsAdsStore.fetchAdsData(requestId);

    // Try to fetch requests if they're not already loaded
    if (avitoAnalyticsAdsStore.requests.length === 0) {
      await avitoAnalyticsAdsStore.fetchRequests();
    }
  }
});

const formatDate = (dateString: string) => {
  // Convert the date string to a more readable format
 const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
</script>

<style scoped>
/* Custom styles for the component */
</style>

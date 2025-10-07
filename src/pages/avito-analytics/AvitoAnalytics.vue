<!-- components/AvitoAnalytics.vue -->
<template>
  <PageContainer :loading="avitoAnalyticsAdsStore.loading" :expanded="sidebarStore.expanded.value">
    <template #body>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600"
      >
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">Аналитика Avito</h2>

        <!-- Error message -->
        <div
          v-if="avitoAnalyticsAdsStore.error"
          class="mb-4 p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-100"
        >
          {{ avitoAnalyticsAdsStore.error }}
        </div>

        <!-- Table to display avito requests -->
        <div
          v-if="avitoAnalyticsAdsStore.requests && avitoAnalyticsAdsStore.requests.length > 0"
          class="relative overflow-x-auto shadow-md sm:rounded-lg"
        >
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 font-medium">ID запроса</th>
                <th scope="col" class="px-6 py-3 font-medium">Запрос</th>
                <th scope="col" class="px-6 py-3 font-medium">Город</th>
                <th scope="col" class="px-6 py-3 font-medium">Координаты</th>
                <th scope="col" class="px-6 py-3 font-medium">Радиус</th>
                <th scope="col" class="px-6 py-3 font-medium">Район</th>
                <th scope="col" class="px-6 py-3 font-medium">Дата создания</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(request, index) in avitoAnalyticsAdsStore.requests"
                :key="request.request_id"
                @click="selectRequest(request.request_id)"
                :class="{
                  'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer': true,
                  'bg-blue-100 dark:bg-blue-900': avitoAnalyticsAdsStore.selectedRequestId === request.request_id,
                }"
              >
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.request_id }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.request || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.city || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.coords || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.radius || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.district || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {{ formatDate(request.created_ts) || 'N/A' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-else-if="
            !avitoAnalyticsAdsStore.loading &&
            avitoAnalyticsAdsStore.requests &&
            avitoAnalyticsAdsStore.requests.length === 0
          "
          class="text-center py-4 text-gray-50 dark:text-gray-400"
        >
          Нет данных для отображения
        </div>

        <div v-else-if="avitoAnalyticsAdsStore.loading" class="text-center py-4 text-gray-50 dark:text-gray-400">
          Загрузка данных...
        </div>

        <!-- Table to display ads data when a request is selected -->
        <div
          v-if="avitoAnalyticsAdsStore.ads && avitoAnalyticsAdsStore.ads.length > 0"
          class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 max-w-full"
        >
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Рекламные объявления</h3>
          <table class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3 font-medium">ID объявления</th>
                <th scope="col" class="px-3 py-3 font-medium">Название</th>
                <th scope="col" class="px-3 py-3 font-medium">Цена</th>
                <th scope="col" class="px-3 py-3 font-medium">Позиция</th>
                <th scope="col" class="px-3 py-3 font-medium">Просмотры</th>
                <th scope="col" class="px-3 py-3 font-medium">Продвижение</th>
                <th scope="col" class="px-3 py-3 font-medium">Ссылка</th>
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
                <th scope="col" class="px-3 py-3 font-medium">Дата создания</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ad, index) in avitoAnalyticsAdsStore.ads"
                :key="ad.ad_id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate" :title="ad.ad_id">
                  {{ ad.ad_id || 'N/A' }}
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate relative">
                  <TextPopup
                    :text-value="ad.title || 'N/A'"
                    :max-length="50"
                    title="Название"
                    custom-class="max-w-xs"
                  />
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.price || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.position || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.views || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                  <PromotionDisplay :promotion-value="ad.promotion || 'N/A'" />
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">
                  <a
                    v-if="ad.link"
                    :href="ad.link"
                    target="_blank"
                    class="text-blue-600 hover:underline dark:text-blue-50 truncate max-w-xs inline-block"
                    :title="ad.link"
                    >Ссылка</a
                  >
                  <span v-else>N/A</span>
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
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.seller_name || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.seller_type || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.rating || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.reviews_count || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.photo_count || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate relative">
                  <TextPopup
                    :text-value="ad.address || 'N/A'"
                    :max-length="50"
                    title="Адрес"
                    custom-class="max-w-xs"
                  />
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">
                  {{ formatDate(ad.created_ts) || 'N/A' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebarStore } from '@/entities';
import { useAvitoAnalyticsAdsStore } from '@/entities/avito-analytics-ads';
import PageContainer from '@/features/page-container';
import TextPopup from '@/shared/components/TextPopup.vue';
import PromotionDisplay from '@/shared/components/PromotionDisplay.vue';

const router = useRouter();
const sidebarStore = useSidebarStore();
const avitoAnalyticsAdsStore = useAvitoAnalyticsAdsStore();

const selectRequest = async (requestId: string) => {
  avitoAnalyticsAdsStore.selectRequest(requestId);
  router.push(`/avito-analytics/${requestId}`);
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

onMounted(async () => {
  await avitoAnalyticsAdsStore.fetchRequests();
});
</script>

<style scoped>
/* Custom styles for the component */
</style>

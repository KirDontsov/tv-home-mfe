<!-- components/AvitoAnalytics.vue -->
<template>
  <PageContainer :loading="avitoAnalyticsAdsStore.loading" :expanded="sidebarStore.expanded.value">
    <template #body>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Аналитика Avito</h2>
          <button
            @click="navigateToNewRequest"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-blue-800 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Создать новый запрос
          </button>
        </div>

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
                <th scope="col" class="px-6 py-3 font-medium">Дата сканирования</th>
                <th scope="col" class="px-6 py-3 font-medium">Запрос</th>
                <th scope="col" class="px-6 py-3 font-medium">Город</th>
                <th scope="col" class="px-6 py-3 font-medium">Координаты</th>
                <th scope="col" class="px-6 py-3 font-medium">Радиус</th>
                <th scope="col" class="px-6 py-3 font-medium">Район</th>
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
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {{ formatDate(request.createdTs) || 'N/A' }}
                </td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.request || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.city || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.coords || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.radius || 'N/A' }}</td>
                <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ request.district || 'N/A' }}</td>
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

const router = useRouter();
const sidebarStore = useSidebarStore();
const avitoAnalyticsAdsStore = useAvitoAnalyticsAdsStore();

const selectRequest = async (requestId: string) => {
  avitoAnalyticsAdsStore.selectRequest(requestId);
  router.push(`/avito-analytics/${requestId}`);
};

const navigateToNewRequest = () => {
  router.push('/avito-analytics/create');
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
  });
};

onMounted(async () => {
  await avitoAnalyticsAdsStore.fetchRequests();
});
</script>

<style scoped>
/* Custom styles for the component */
</style>

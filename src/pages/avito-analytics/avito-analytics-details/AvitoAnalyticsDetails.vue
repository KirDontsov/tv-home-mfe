<!-- components/AvitoAnalyticsDetails.vue -->
<template>
  <PageContainer :loading="avitoAnalyticsAdsStore.loading">
    <template #body>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600"
      >
        <div class="flex items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-semibold text-gray-80 dark:text-white">
              {{ selectedRequest?.createdTs ? formatDate(selectedRequest.createdTs) : '' }}
            </h2>
            <h2 class="text-xl font-semibold text-gray-80 dark:text-white">
              {{ selectedRequest?.city }}
            </h2>
            <h2 class="text-xl font-semibold text-gray-80 dark:text-white">
              {{ selectedRequest?.request }}
            </h2>
          </div>
          <CsvDownloadButton
            :request-id="route.params.id as string"
            button-class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200"
          />
        </div>

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
            <thead class="text-xs text-gray-700 bg-gray-50 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-3 font-medium">ID объявления</th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('title')"
                >
                  Название
                  <span v-if="sortColumn === 'title'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('price')"
                >
                  Цена
                  <span v-if="sortColumn === 'price'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('position')"
                >
                  Позиция
                  <span v-if="sortColumn === 'position'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('views')"
                >
                  Просмотры
                  <span v-if="sortColumn === 'views'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('promotion')"
                >
                  Продвижение
                  <span v-if="sortColumn === 'promotion'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('city_query')"
                >
                  Город
                  <span v-if="sortColumn === 'city_query'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('ad_date')"
                >
                  Дата
                  <span v-if="sortColumn === 'ad_date'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('categories')"
                >
                  Категории
                  <span v-if="sortColumn === 'categories'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('seller_name')"
                >
                  Имя продавца
                  <span v-if="sortColumn === 'seller_name'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-10 dark:hover:bg-gray-600"
                  @click="sortTable('seller_type')"
                >
                  Тип продавца
                  <span v-if="sortColumn === 'seller_type'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('rating')"
                >
                  Рейтинг
                  <span v-if="sortColumn === 'rating'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('reviews_count')"
                >
                  Кол-во отзывов
                  <span v-if="sortColumn === 'reviews_count'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('photo_count')"
                >
                  Кол-во фото
                  <span v-if="sortColumn === 'photo_count'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('address')"
                >
                  Адрес
                  <span v-if="sortColumn === 'address'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('description')"
                >
                  Описание
                  <span v-if="sortColumn === 'description'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-10 dark:hover:bg-gray-600"
                  @click="sortTable('delivery')"
                >
                  Доставка
                  <span v-if="sortColumn === 'delivery'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('ads_count')"
                >
                  Кол-во об.
                  <span v-if="sortColumn === 'ads_count'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-10 dark:hover:bg-gray-600"
                  @click="sortTable('closed_ads_count')"
                >
                  Кол-во закрытых об.
                  <span v-if="sortColumn === 'closed_ads_count'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('created_ts')"
                >
                  Дата создания
                  <span v-if="sortColumn === 'created_ts'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('answer_time')"
                >
                  Время ответа
                  <span v-if="sortColumn === 'answer_time'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th
                  scope="col"
                  class="px-3 py-3 font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  @click="sortTable('register_date')"
                >
                  Дата регистрации
                  <span v-if="sortColumn === 'register_date'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ad, index) in avitoAnalyticsAdsStore.ads"
                :key="ad.ad_id"
                :class="[
                  'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600',
                  ad.my_ad === '*' ? 'bg-blue-50 dark:bg-green-900 dark:hover:bg-green-800' : '',
                ]"
              >
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate" :title="ad.ad_id">
                  <a
                    :href="ad.link"
                    target="_blank"
                    class="text-blue-600 hover:underline dark:text-blue-50 truncate max-w-xs inline-block"
                    :title="ad.link"
                  >
                    {{ ad.avito_ad_id || 'N/A' }}
                  </a>
                </td>
                <TextPopup :text-value="ad.title || 'N/A'" :max-length="40" title="Название" custom-class="max-w-xs" />
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.price || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.position || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.views || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white max-w-xs truncate">
                  <PromotionDisplay :promotion-value="ad.promotion || 'N/A'" />
                </td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.city_query || 'N/A' }}</td>
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">{{ ad.ad_date || 'N/A' }}</td>
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
                  </a>
                </td>
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
                <td class="px-3 py-2 font-medium text-gray-900 dark:text-white">
                  {{ ad.createdTs ? formatDate(ad.createdTs) : 'N/A' }}
                </td>
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

        <!-- Progress display section -->
        <div
          v-if="showProgress || progressData"
          class="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Прогресс обработки
          </h3>

          <div v-if="progressData" class="space-y-4">
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-base font-medium text-blue-700 dark:text-white">Прогресс</span>
                <span class="text-sm font-medium text-blue-700 dark:text-white"
                  >{{ calculateProgressPercentage() }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                <div
                  class="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out dark:bg-blue-50"
                  :style="{ width: calculateProgressPercentage() + '%' }"
                ></div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center">
                <div
                  class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-90 dark:text-blue-300 mr-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Обработано</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ progressData.current_ads }} / {{ progressData.total_ads }}
                  </div>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-30 mr-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 10-16 8 8 0 000 16zm1-12a1 0 10-2 0v4a1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">Статус</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ progressData.status }}</div>
                </div>
              </div>

              <div class="flex items-center">
                <div
                  class="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 mr-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">ID задачи</div>
                  <div class="text-sm text-gray-50 dark:text-gray-400 break-all">{{ progressData.task_id }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-sm text-gray-700 dark:text-gray-400">Ожидание данных о прогрессе...</div>
        </div>
      </div>
    </template>
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAvitoAnalyticsAdsStore } from '@/entities/avito-analytics-ads';
import PageContainer from '@/features/page-container';
import TextPopup from '@/shared/components/TextPopup.vue';
import PromotionDisplay from '@/shared/components/PromotionDisplay.vue';
import { CsvDownloadButton } from '@/features/csv-download-button';

const route = useRoute();
const avitoAnalyticsAdsStore = useAvitoAnalyticsAdsStore();

// WebSocket connection
let ws: WebSocket | null = null;
const wsUrl = 'ws://localhost:8080/api/ws';

// Counter to track messages and update table every 5 messages
let messageCounter = 0;

// Progress tracking
interface ProgressData {
  task_id: string;
  user_id: string;
  progress: number;
  total_ads: number;
  current_ads: number;
  status: string;
  message: string;
  timestamp: string;
}

const progressData = ref<ProgressData | null>(null);
const showProgress = ref(false);

// Sorting state
const sortColumn = ref<string | null>(null);
const sortDirection = ref<'asc' | 'desc'>('asc');

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

  // Establish WebSocket connection to listen for progress
  connectWebSocket(true);
});

onUnmounted(() => {
  // Close WebSocket connection when component is unmounted
  closeWebSocket();
});

const formatDate = (dateString: string) => {
  // Convert the date string to a more readable format
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const connectWebSocket = (shouldShowProgress = true) => {
  try {
    // Check if there's already an open WebSocket connection
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('WebSocket connection already open');
      // If we should show progress and it's not already shown, show it
      if (shouldShowProgress && !showProgress.value) {
        showProgress.value = true;
      }
      return;
    }

    // Close any existing connection before creating a new one
    if (ws) {
      ws.close();
    }

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connection established');
      if (shouldShowProgress) {
        showProgress.value = true;
      }
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received WebSocket message:', message);

      progressData.value = message;

      // Increment message counter
      messageCounter++;

      // Update table data every 5 messages
      if (messageCounter % 5 === 0 && message.task_id) {
        // Fetch updated ads data based on the task_id
        avitoAnalyticsAdsStore.fetchAdsData(message.task_id);
      }

      // If the task is complete, close the connection
      if (message.status === 'completed' || message.status === 'failed') {
        closeWebSocket();
        // Fetch final data when task is complete
        if (message.task_id) {
          avitoAnalyticsAdsStore.fetchAdsData(message.task_id);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      closeWebSocket();
    };
  } catch (error) {
    console.error('Error establishing WebSocket connection:', error);
  }
};

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

const calculateProgressPercentage = () => {
  if (!progressData.value) return 0;

  // Use current_ads and total_ads to calculate percentage to ensure it stays within 0-100%
  if (progressData.value.total_ads > 0) {
    const calculatedPercentage = (progressData.value.current_ads / progressData.value.total_ads) * 100;
    return Math.round(calculatedPercentage);
  }

  // Fallback to the progress field if total_ads is 0 or invalid, but cap it at 10%
  const progressPercentage = progressData.value.progress * 100;
  return Math.min(Math.round(progressPercentage), 100);
};

// Sorting function
const sortTable = (column: string) => {
  // If clicking the same column, toggle direction; otherwise, set to ascending
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = column;
    sortDirection.value = 'asc';
  }

  // Sort the ads data
  if (avitoAnalyticsAdsStore.ads) {
    avitoAnalyticsAdsStore.ads.sort((a, b) => {
      // Get the values to compare based on the column
      let valA: any = a[column];
      let valB: any = b[column];

      // Handle special cases for different data types
      if (
        column === 'price' ||
        column === 'position' ||
        column === 'views' ||
        column === 'rating' ||
        column === 'reviews_count' ||
        column === 'photo_count' ||
        column === 'ads_count' ||
        column === 'closed_ads_count' ||
        column === 'answer_time'
      ) {
        // Convert to numbers for numeric comparison
        valA = parseFloat(valA) || 0;
        valB = parseFloat(valB) || 0;
      } else if (column === 'ad_date' || column === 'createdTs' || column === 'register_date') {
        // Convert to dates for date comparison
        valA = new Date(valA) || new Date(0);
        valB = new Date(valB) || new Date(0);
      } else {
        // For string values, ensure they're strings
        valA = valA ? String(valA).toLowerCase() : '';
        valB = valB ? String(valB).toLowerCase() : '';
      }

      // Perform comparison based on sort direction
      if (sortDirection.value === 'asc') {
        if (valA < valB) return -1;
        if (valA > valB) return 1;
      } else {
        if (valA > valB) return -1;
        if (valA < valB) return 1;
      }
      return 0;
    });
  }
};
</script>

<style scoped>
/* Custom styles for the component */
</style>

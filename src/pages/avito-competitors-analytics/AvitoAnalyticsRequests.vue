<!-- components/AvitoCompetitorsAnalytics.vue -->
<template>
  <PageContainer :loading="loading" :expanded="sidebarStore.expanded.value">
    <template #body>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600"
      >
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white mb-6">Анализ конкурентов Avito</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Request field -->
          <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <div class="mb-3">
              <label for="request" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Запрос <span class="text-red-500">*</span>
              </label>
            </div>
            <input
              id="request"
              v-model="formData.request"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700 transition-colors duration-200"
              placeholder="Введите запрос, например: ремонт фар"
            />
          </div>

          <!-- City field -->
          <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <div class="mb-3">
              <label for="city" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Город <span class="text-red-500">*</span>
              </label>
            </div>
            <input
              id="city"
              v-model="formData.city"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700 transition-colors duration-200"
              placeholder="Введите город"
            />
          </div>

          <!-- Coords field -->
          <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <div class="mb-3">
              <label for="coords" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Координаты
              </label>
            </div>
            <input
              id="coords"
              v-model="formData.coords"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700 transition-colors duration-200"
              placeholder="Введите координаты в формате: широта,долгота"
            />
          </div>

          <!-- Radius field -->
          <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <div class="mb-3">
              <label for="radius" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Радиус </label>
            </div>
            <input
              id="radius"
              v-model="formData.radius"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700 transition-colors duration-200"
              placeholder="Введите радиус в метрах"
            />
          </div>

          <!-- District field -->
          <div class="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg">
            <div class="mb-3">
              <label for="district" class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Район </label>
            </div>
            <input
              id="district"
              v-model="formData.district"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:bg-gray-700 transition-colors duration-200"
              placeholder="Введите район"
            />
          </div>

          <!-- Form actions -->
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="handleReset"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:bg-gray-700 transition-colors duration-200"
            >
              Сбросить
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {{ loading ? 'Загрузка...' : 'Отправить запрос' }}
            </button>
          </div>
        </form>

        <!-- Progress display section -->
        <div
          v-if="showProgress || progressData"
          class="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
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
                  class="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out dark:bg-blue-500"
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
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 0 10-2 0v4a1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
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
import { ref, onMounted, onUnmounted } from 'vue';
import { useSidebarStore } from '@/entities';
import PageContainer from '@/features/page-container';
import { sendAvitoCompetitorsRequest } from '@/shared/api/avito';

const sidebarStore = useSidebarStore();

interface FormData {
  request: string;
  city: string;
  coords: string;
  radius: string;
  district: string;
}

const initialFormData: FormData = {
  request: '',
  city: '',
  coords: '',
  radius: '',
  district: '',
};

// WebSocket connection
let ws: WebSocket | null = null;
const wsUrl = 'ws://localhost:8080/api/ws';

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

const formData = ref<FormData>({ ...initialFormData });
const loading = ref(false);
const progressData = ref<ProgressData | null>(null);
const showProgress = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    showProgress.value = false;
    progressData.value = null;

    // Send the POST request to the backend
    const response = await sendAvitoCompetitorsRequest(formData.value);

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response:', responseData);

      // Establish WebSocket connection to listen for progress
      connectWebSocket(true);
    } else {
      alert('Произошла ошибка при отправке запроса');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Произошла ошибка при отправке запроса. Пожалуйста, попробуйте еще раз.');
    loading.value = false;
  }
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
      loading.value = false;
      if (shouldShowProgress) {
        showProgress.value = true;
      }
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received WebSocket message:', message);
      
      progressData.value = message;
      
      // If the task is complete, close the connection
      if (message.status === 'completed' || message.status === 'failed') {
        closeWebSocket();
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      loading.value = false;
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      loading.value = false;
      alert('Произошла ошибка при подключении к WebSocket');
    };
  } catch (error) {
    console.error('Error establishing WebSocket connection:', error);
    loading.value = false;
  }
};

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

const handleReset = () => {
  formData.value = { ...initialFormData };
  closeWebSocket();
  showProgress.value = false;
  progressData.value = null;
};

onMounted(() => {
  // Establish WebSocket connection when component is mounted to listen for any ongoing tasks
  connectWebSocket(false);
});

onUnmounted(() => {
  // Close WebSocket connection when component is unmounted
  closeWebSocket();
});

const calculateProgressPercentage = () => {
  if (!progressData.value) return 0;

  // Use current_ads and total_ads to calculate percentage to ensure it stays within 0-100%
  if (progressData.value.total_ads > 0) {
    const calculatedPercentage = (progressData.value.current_ads / progressData.value.total_ads) * 100;
    return Math.round(calculatedPercentage);
  }

  // Fallback to the progress field if total_ads is 0 or invalid, but cap it at 100%
  const progressPercentage = progressData.value.progress * 100;
  return Math.min(Math.round(progressPercentage), 100);
};
</script>

<style scoped>
/* Custom styles for form elements */
</style>

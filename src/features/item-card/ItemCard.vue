<template>
  <div
    :id="item?.id"
    @click.stop="handleSelect"
    class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
  >
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ item.title }}</h5>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-600">
        <li class="py-3 sm:py-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">ID:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item.id }}
            </div>
          </div>
        </li>

        <li class="py-3 sm:py-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Цена:</p>
              <!--                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ item.price }}</p>-->
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item.price }} &#8381;
            </div>
          </div>
        </li>
        <li class="py-3 sm:py-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Адресс:</p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ item.address }}</p>
            </div>
          </div>
        </li>

        <li class="py-3 sm:py-4">
          <div class="flex-1 min-w-0 ms-4 truncate">
            <a :href="item.url" target="_blank" class="text-sm text-gray-500 truncate dark:text-gray-400">
              {{ item.url }}
            </a>
          </div>
        </li>
        <li class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Категория:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item.category.name }}
            </div>
          </div>
        </li>

        <!--        analytics-->

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Просмотров:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.views }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.impressions }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов в просмотры:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.impressionsToViewsConversion }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Контакты:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.contacts }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Показов в контакты:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.viewsToContactsConversion }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Избранное:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.favorites }}
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Ср. цена просмотра:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.averageViewCost }} &#8381
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Ср. цена контакта:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.averageContactCost }} &#8381
            </div>
          </div>
        </li>

        <li v-if="item?.analytics" class="py-3 sm:pt-4">
          <div class="flex items-center">
            <div class="shrink-0"></div>
            <div class="flex-1 min-w-0 ms-4">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">Затраты:</p>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              {{ item?.analytics?.spending }} &#8381
            </div>
          </div>
        </li>

        <li class="pt-3 sm:py-4 pb-0">
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvitoItem } from '@/shared';

interface Props {
  item: AvitoItem;
}

interface Emits {
  (e: 'select', value: number): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const handleSelect = ({currentTarget}) => {
  emit('select', currentTarget.id);
}
</script>

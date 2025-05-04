<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink, useRoute } from "vue-router";
import { useFirmsStore } from "./entities";

const route = useRoute()
const expandedStore = useLocalStorage('sidebar-expanded', '')
const firmsStore = useFirmsStore()
const expanded = ref();
const firm = ref();

const currentFirm = computed(() => {
  return firmsStore.firms?.find((firm) => firm.url === route.params.id)
})

onMounted(() => {
  expanded.value = expandedStore
  firm.value = firmsStore.firms?.find((firm) => firm.url === route.params.id)
})

watch(expandedStore, () => {
  expanded.value = expandedStore.value
})
</script>

<template>
  <div :class="{ 'sm:ml-[64px]': expanded === 'false' }" class="sm:ml-64 p-4 relative top-[78px]">
    <div class="flex flex-col gap-2 justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-800 px-8 py-4">
      <RouterLink to="/">Back</RouterLink>
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.name }}
    </div>

    <div class="grid grid-cols-2 gap-4 ">
      <div class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        {{ currentFirm?.firm_id }}
      </div>
      <div class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        {{ $route.params.id }}
      </div>
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.address }}
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.site }}
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.default_phone }}
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.description }}
    </div>

    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
      {{ currentFirm?.coords }}
    </div>

    <div class="grid grid-cols-2 gap-4 ">
      <div class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        {{ currentFirm?.rating }}
      </div>

      <div class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        {{ currentFirm?.reviews_count }}
      </div>
    </div>
  </div>
</template>

<style>
</style>

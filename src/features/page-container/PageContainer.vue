<template>
  <div :class="{ 'sm:ml-[64px]': expanded === 'false' }" class="sm:ml-64 p-4 relative top-[78px]">
    <div class="grid grid-cols-1 gap-4">
      <!-- Show loader when analytics are loading -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <span class="ml-2 text-gray-700 dark:text-gray-300">Загрузка аналитики...</span>
      </div>
      <slot v-else name="body" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  expanded?: string;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  expanded: 'true',
  loading: false,
});
</script>

<style></style>

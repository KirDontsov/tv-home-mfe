<template>
  <div :class="{ 'sm:ml-[64px]': expanded === 'false' }" class="sm:ml-64 p-4 relative top-[78px]">
    <div class="grid grid-cols-1 gap-4">
      <div
        v-if="loading"
        class="flex flex-col gap-2 justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-700 px-8 py-4"
      >
        Loading...
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

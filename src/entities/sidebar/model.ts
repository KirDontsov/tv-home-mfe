import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

export const useSidebarStore = () => {
  const expandedStore = useLocalStorage('sidebar-expanded', '');

  const expanded = ref();

  onMounted(() => {
    expanded.value = expandedStore.value;
  });

  watch(expandedStore, () => {
    expanded.value = expandedStore.value;
  });

  return { expanded };
};

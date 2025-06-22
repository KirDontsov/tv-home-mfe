<template>
  <div :class="{ 'sm:ml-[64px]': expanded === 'false' }" class="sm:ml-64 p-4 relative top-[78px]">
    <div class="grid grid-cols-2 gap-4 ">
      <div class="flex flex-col gap-2 justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-700 px-8 py-4">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Город</label>
        <select id="selectedCity" v-model="selectedCity"  class="max-w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-4 px-4 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-if="!citiesStore.citiesLoading" :key="city.city_id" v-for="city in citiesStore.cities" :value="city.abbreviation">{{ city.name }}</option>
        </select>
      </div>
      <div class="flex flex-col gap-2 justify-center mb-4 rounded-sm bg-gray-50 dark:bg-gray-700 px-8 py-4">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Категория</label>
        <select id="selectedCategory" v-model="selectedCategory" class="max-w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-4 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option v-if="!categoriesStore.categoriesLoading" :key="category.category_id" v-for="category in categoriesStore.categories" :value="category.abbreviation">{{ category.name }}</option>
        </select>
      </div>
    </div>
    <div v-if="(firmsStore.firms?.length > 0 && !firmsStore.firmsLoading)" class="flex px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-700">
      <ul class="text-2xl text-gray-400 dark:text-gray-500">
        <!-- TODO: сделать таблицу -->
        <router-link :key="firm.firm_id" :to="'/firm/' + firm.url" v-for="firm in firmsStore.firms" class="flex">{{ firm.name }}</router-link>
      </ul>
    </div>
    <div v-if="(firmsStore.firms?.length > 0 && !firmsStore.firmsLoading)" class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-700">
      Pagination
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { ref, watch, onMounted, computed } from "vue";
import { useCitiesStore, useCategoriesStore, useCityStore, useCategoryStore, useFirmsStore } from "./entities";

const expandedStore = useLocalStorage('sidebar-expanded', '')
const citiesStore = useCitiesStore()
const categoriesStore = useCategoriesStore()
const cityStore = useCityStore()
const firmsStore = useFirmsStore()
const expanded = ref();

const selectedCity = computed({
  get() {
    return cityStore.city
  },
  set(val) {
    cityStore.setCity(val)
  }
})
const categoryStore = useCategoryStore()
const selectedCategory = computed({
  get() {
    return categoryStore.category
  },
  set(val) {
    categoryStore.setCategory(val)
  }
})

onMounted(() => {
  expanded.value = expandedStore
  citiesStore.getCities()
  categoriesStore.getCategories()
})

watch(expandedStore, () => {
  expanded.value = expandedStore.value
})

watch([selectedCity, selectedCategory], () => {
  firmsStore.getFirms(1, 30)
})

</script>

<style>
</style>

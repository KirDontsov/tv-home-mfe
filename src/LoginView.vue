<template>
  <div class="sm:ml-64 p-4 relative top-[78px]">
    <div class="flex items-center justify-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-700">Login</div>
    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-700">
      <input
        type="text"
        id="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="email@mail.ru"
        v-model="email"
      />
      <input
        type="password"
        id="firm_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Firm name"
        v-model="password"
      />
    </div>
    <div class="flex items-center px-8 py-4 mb-4 rounded-sm bg-gray-50 dark:bg-gray-700">
      <button @click="handleSubmit">Войти</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BACKEND_PORT } from '@/shared';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref();
const password = ref();

const handleSubmit = async () => {
  try {
    const res = await fetch(`${BACKEND_PORT}/api/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (res.ok) {
      await router.push('/');
    } else {
      console.warn('Ошибка HTTP: ' + res.status);
    }
  } catch (e) {
    console.log(e);
  }
};
</script>

<style></style>

<template>
  <div class="main">
    <div v-if="store.isLoading" class="spinner-custom" role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill" />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>

    <table class="bg-blue-200">
      <thead>
        <tr>
          <th @click="changeSort('id')" class="cursor-pointer">
            ID
            <span v-if="sortKey === 'id'">{{ sortDirection === 'asc' ? '↑' : '↓' }}</span>
          </th>
          <th>
            Title
          </th>
          <th>
            Body
          </th>
        </tr>

      </thead>
      <tbody v-if="!store.isLoading">

        <tr  v-for="post in paginatedPosts" :key="post.id">
          <td class="py-4 px-4 border border-slate-1000 ">{{ post.id }}</td>
          <td class="py-4 px-4 border border-slate-1000">{{ post.title }}</td>
          <td class="py-4 px-4 border border-slate-1000">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between mt-4">
      <button v-bind:class="{'bg-gray-500': page === 1}" class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="prevPage"
        :disabled="page === 1">Previous</button>
      <button v-bind:class="{'bg-gray-500': page === totalPages}" class="bg-blue-500 text-white px-4 py-2 rounded-md" @click="nextPage"
        :disabled="page === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePostStore } from '~/store/postStore';
import type { Post } from '~/store/postStore';

const store = usePostStore();
const page = ref(1);
const perPage = 10;
const sortKey = ref<keyof Post>('id');
const sortDirection = ref<'asc' | 'desc'>('asc');


onMounted(() => {
  store.fetchPosts();
});

const paginatedPosts = computed(() => {
  const sortedPosts = [...store.posts].sort((a, b) => {
    const result = a[sortKey.value] > b[sortKey.value] ? 1 : -1;
    return sortDirection.value === 'asc' ? result : -result;
  });
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  return sortedPosts.slice(start, end);
});
const totalPages = computed(() => Math.ceil(store.posts.length / perPage));

const prevPage = async () => {
  if (page.value > 1) {
    store.toggleIsLoading()
    page.value--
    await updatePosts();
    store.toggleIsLoading()
  };
};

const nextPage = async () => {
  if (page.value < totalPages.value) {
    store.toggleIsLoading()
    page.value++;
    await updatePosts();
    store.toggleIsLoading()
  }
};

const changeSort = (key: keyof Post) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const updatePosts = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500); // Simulate a delay for demonstration purposes
  });
};

</script>

<style scoped>

.spinner-custom {
  position: absolute;
  margin: auto;
  top: 50%;
  right: 50%;
}
.main {
  position: relative;
}
</style>
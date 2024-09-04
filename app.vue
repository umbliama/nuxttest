<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold mb-6">Posts</h1>
    <button @click="openModal" class="bg-green-500 text-white px-4 py-2 rounded-md mb-4">Create New Post</button>
    <PostTable />
    <CreatePostModal v-model:modelValue="isModalOpen" />
  </div>
</template>

<script setup lang="ts">
import PostTable from './components/PostTable.vue';
import CreatePostModal from './components/CreatePostModal.vue';
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true
};

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl mb-4">Create Post</h2>
        <form @submit.prevent="createPost">
          <div class="mb-4">
            <label class="block mb-2">Title</label>
            <input v-model="title" type="text" class="w-full p-2 border border-gray-300 rounded-md" required>
          </div>
          <div class="mb-4">
            <label class="block mb-2">Body</label>
            <textarea v-model="body" class="w-full p-2 border border-gray-300 rounded-md" required></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button>
            <button @click="closeModal" class="ml-4 bg-red-500 px-4  py-2  rounded-md text-white">Close</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref,defineEmits, defineProps } from 'vue';
  import { usePostStore } from '~/store/postStore';
  

  const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const store = usePostStore();
const title = ref('');
const body = ref('');
const isLoading = ref(false);


const isOpen = computed(() => props.modelValue);

const createPost = async () => {
  await store.addPost({ title: title.value, body: body.value });
  title.value = ''
  body.value = ''
  closeModal();
};

const closeModal = () => {
  emit('update:modelValue', false);
};
  </script>
  
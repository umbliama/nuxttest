import { defineStore } from 'pinia';
import axios from 'axios';

export type Post = {
    id: number;
    title: string;
    body: string;
  };
  

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [] as Array<{ id: number, title: string, body: string }>,
    isLoading: false,
  }),

  actions: {
    async fetchPosts() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        this.isLoading = false;
      }
    },
    async addPost(newPost: { title: string, body: string }) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        this.posts.unshift(response.data);
      } catch (error) {
        console.error('Failed to add post', error);
      }
    },
    sortPosts(key: keyof Post) {
      this.posts.sort((a, b) => a[key] > b[key] ? 1 : -1);
    },
    toggleIsLoading() {
        this.isLoading = !this.isLoading
    }
  },
}); 

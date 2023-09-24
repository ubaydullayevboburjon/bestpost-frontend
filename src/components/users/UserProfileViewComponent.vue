<script lang="ts">
import { defineComponent } from 'vue';
import axios from '../../plugins/axios'
export default defineComponent({
  props: {
    id: Number,
    firstName: String,
    lastName: String,
    username: String,
    imagePath: String,
    email: String,
    createdAt: String,
    updatedAt: String,
  },
  data() {
    return {
      baseURL: "" as string,
      imageFullPath: "" as string,
    }
  },
  methods: {
    load() {

      this.baseURL = axios.defaults.baseURL!;
      this.imageFullPath = this.baseURL + "/" + this.imagePath;
    },
  },
  mounted(){
    this.load()
  }
})
</script>

<template>
    <a href="#"
      class="flex p-2 mr-2 mb-3 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img class="object-cover w-full  md:h-auto md:w-48 " v-bind:src="imageFullPath" alt=""
        style="border-radius: 100%; width: 100px ;height: 100px;">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ firstName }} {{ lastName }}</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ username }}</p>
      </div>
</a></template>
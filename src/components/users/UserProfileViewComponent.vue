<script lang="ts">
import { defineComponent } from 'vue';
import axios from '../../plugins/axios'
import {formatDate} from '../../helpers/DateHelper'
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
  mounted() {
    this.load()
  }
})
</script>

<template>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

  <tbody>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

      <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img class="w-10 h-10 rounded-full" v-bind:src="imageFullPath" alt="Jese image">
        <div class="pl-3">
          <div class="text-base font-semibold">{{ firstName }} {{ lastName }}</div>
          <div class="font-normal text-gray-500">{{ email }}</div>
        </div>
      </th>
      <td class="px-6 py-4">
        React Developer
      </td>
      <td class="px-6 py-4">
        <div class="flex items-center">
          <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
        </div>
      </td>
    </tr>
  </tbody>
</table>
</template>
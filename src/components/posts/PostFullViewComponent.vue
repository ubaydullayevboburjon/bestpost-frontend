<script lang="ts">
import { getToken } from '@/helpers/TokenHelper';
import axios from '../../plugins/axios';
import { defineComponent } from 'vue';
import FlowbiteSetup from '@/FlowbiteSetup.vue';
import type { DatetimeFormatProps, DateTimeOptions } from 'vue-i18n';

export default defineComponent({
    data() {
        return {
            imagePathProfile: "" as string,
            firstName: "" as string,
            lastName: "" as string,
            id: 0 as number,
            postId:0 as number,
            userId: 0 as number,
            title: "" as string,
            description: "" as string,
            imagPath: "" as string,
            createdAt: "" as DateTimeOptions,
            updatedAt: "" as string,
            isCheked: false as boolean,
            imageFullPath: "" as string,
            baseURL: "" as string,
        };
    },
    methods: {
        async getData() {
             var post = this.$route.params.id;
             this.postId = Number(post)
            var response = await axios.get("/api/posts/" + this.postId);
            const responseData = response.data as any;
            if (responseData) {
                this.title = responseData.title;
                this.description = responseData.description;
                this.userId = responseData.userId;
                this.createdAt = responseData.created;
                this.imageFullPath = this.baseURL + "/" + responseData.imagePath || "";
                console.log(this.createdAt)
                console.log("Salom")
            }
        },
        async getDataAsync() {
            try {
                const response = await axios.get("/api/users/profile", {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`
                    }
                });
                if (response.status !== 200) {
                    this.$router.push("/");
                }
                const responseData = response.data as any;
                if (responseData) {
                    this.firstName = responseData.firstName || "";
                    this.lastName = responseData.lastName || "";
                    this.id = responseData.id;
                    this.imagePathProfile = this.baseURL + "/" + responseData.imagePath || "";
                    this.createdAt = responseData.created;
                   
                }
                if (this.id == this.userId) {
                    this.isCheked = true;
                }
            }
            catch (error) {
                console.error('Malumotlarni olishda xatolik:', error);
               
            }
        },
        load() {
            this.baseURL = axios.defaults.baseURL!;
        },
        async deletePost() {
            var response = await axios.delete("/api/posts/"+this.postId);
            console.log(response.data)
            this.$router.push("/");
        }
    },
    created() {
      this.getData();
      this.getDataAsync();
      this.load();
    },
    components: { FlowbiteSetup }
});
</script>

<template>
  <FlowbiteSetup></FlowbiteSetup>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <div class="container p-5" style="
      margin: 0 auto;
      width: 1200px;
      border-radius: 7px;
      min-height: 20vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    ">
    <a href="#" style="width: 800px"
      class="p-2 mr-2 mb-3 flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div class="top flex pb-2" style="display: flex; align-items: center; border-bottom: 1px solid">
        <div class="images flex" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px">
          <img v-bind:src="imagePathProfile" alt=""
            style="margin-right: 15px; border-radius: 50%; width: 100%; height: 100%" />
        </div>
        <div class="info flex" style="display: flex; justify-content: space-between;  width: 100%">
          <div class="title flex">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white" style="font-size: 20px; margin-right: 10px">
              {{ firstName }}
            </h3>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white" style="font-size: 20px">
              {{ lastName }}
            </h3>
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
              <path
                d="M180-80q-24 0-42-18t-18-42v-620q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600v-430H180v430Zm0-490h600v-130H180v130Zm0 0v-130 130Zm300 230q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
            </svg>
            <p class="text-left ml-1 text-gray-500 dark:text-gray-400">{{createdAt}}</p>
          </div>
        </div>
      </div>
      <div class="bottom mt-2" style="text-align: center">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-3"
          style="font-size: 36px; line-height: 1; padding: 15px 0 25px 0">
          {{ title }}
        </h2>

        <div class="img mb-10" style="width: 100%; height: 500px; display: flex; justify-content: center">
          <img v-bind:src="imageFullPath" alt="" style="height: 100%; width: 85%; object-fit: cover;border-radius:7px;" />
        </div>

        <p v-html="description" class="text-left text-gray-500 dark:text-gray-400" style="padding: 0 55px;">
        </p>
        <div class="right" style="display: flex;justify-content: end;align-items: center;margin-top: 15px;">
          <button v-show="isCheked == true" type="button"
            class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Edit</button>

          <button v-show="isCheked == true" data-modal-target="popup-modal" data-modal-toggle="popup-modal"
            class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            type="button">
            Delete
          </button>

          <div id="popup-modal" tabindex="-1"
            class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="p-6 text-center">
                  <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{{ $t("forDelete") }}</h3>
                  <button @click="deletePost()" data-modal-hide="popup-modal" type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    {{ $t("ok") }}
                  </button>
                  <button data-modal-hide="popup-modal" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                    {{ $t("cancel") }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
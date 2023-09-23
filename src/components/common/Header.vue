<script  lang="ts">
import ThemeSwitcher from "@/components/common/ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import FlowbiteSetup from "@/FlowbiteSetup.vue";
import axios from "../../plugins/axios";
import { defineComponent } from "vue";
import { UserViewModel } from "@/viewmodels/UserViewModel";
import { getToken } from "@/helpers/TokenHelper";

export default defineComponent({
  components:{
    ThemeSwitcher,LanguageSwitcher,FlowbiteSetup,axios,defineComponent
  },
  data() {
    return {
      imageFullPath: "" as string,
      firstName: "" as string,
      lastName: "" as string,
      email: "" as string,
      baseURL: "" as String,

      profil:[] as UserViewModel[],
      content: false as boolean
    }
  },
  methods: {
    async getDataAsync() {
      try {
        this.baseURL = axios.defaults.baseURL!;
        const response = await axios.get("/api/users/profile",{
          headers:{
            'Authorization' : `Bearer ${getToken()}`
          }
        });
        if(response.status!==200){
          this.$router.push("/")
        }
        const responseData = response.data as any;
        if (responseData) {
          this.firstName = responseData.firstName || "";
          this.lastName = responseData.lastName || "";
          this.email = responseData.email || "";
          this.imageFullPath = this.baseURL + "/" + responseData.imagePath || "";
        }
        

      } catch (error) {
        console.error('Malumotlarni olishda xatolik:', error);
      }
    },
    async checker(){
            var token = getToken();
            if(token == undefined || token == ""){
                this.$router.push("/auth/login")
            }
            else if(token != ""){
                const response = await axios.get("/api/users/profile",{
                headers:{
                    'Authorization' : `Bearer ${getToken()}`
                }
                });
                if(response == undefined){
                this.$router.push("/auth/login")
                }
                console.log(response.data)
            }

        },

    signout(){
      document.cookie = "access_token=" + "" + "; expires: SESSION; path=/";
      document.documentElement.classList.remove('dark')
    },
  
  },
  
  created(){
        this.checker();
        this.getDataAsync();
    },
  
});

</script>
<template>
  <FlowbiteSetup></FlowbiteSetup>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between" style="height: 70px;">
        <div class="flex items-center justify-start">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <a href="/" class="flex ml-2 md:mr-24">
            <img src="../../assets/logo.png" class="h-8 mr-3" alt="FlowBite Logo" style="height: 100px; width: 100px;" />
            <span
              class="self-center text-xl font-semibold sm:text-4xl whitespace-nowrap dark:text-white font-[Mooli]">Best
              post</span>
          </a>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user"></div>
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800"
            style="margin-left: 360px;">
            <li>
              <a href="/"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-3 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{
                  $t("home") }}</a>
            </li>
            <li>
              <a href="#"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-3 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{
                  $t("users") }}</a>
            </li>
            <li>
              <a href="/create-post"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-3 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{
                  $t("create") }}</a>
            </li>
            <li>
              <a href="/about"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-3 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{{
                  $t("about") }}</a>
            </li>
          </ul>
        </div>
        <div class="flex items-center">
          <LanguageSwitcher style="margin-right: 8px;"></LanguageSwitcher>
          <ThemeSwitcher style="margin-right: 8px;"></ThemeSwitcher>
          <div class="flex items-center ml-3">
            <div style="margin-right: 25px;">
              <button type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false" data-dropdown-toggle="dropdown-user">
                <span class="sr-only">Open user menu</span>
                <img class="w-9 h-9 rounded-full" v-bind:src="imageFullPath"
                  alt="user photo">
              </button>
            </div>
            <div
              class="z-50 hidden my-4 ml-3 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user" style="">
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ firstName }} {{ lastName }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  {{ email }}
                </p>
              </div>
            <ul class="py-1" role="none">
              <li>
                <a href="profile-settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem">{{ $t("settings") }}</a>
              </li>
              <li>
                <a href="/auth/login"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  role="menuitem" @click="signout()">{{ $t("signout") }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<style>@import url('https://fonts.googleapis.com/css2?family=Mooli&display=swap');</style>


<template>
  <div style="margin-bottom: 20px;margin-left: 170px;">
    <nav class="flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            {{ $t("home") }}
          </a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{ $t("blog") }}</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("create") }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
  <div class="w-full flex flex-wrap" style="display: flex; justify-content: center;position: relative; gap: 20px;">
    <div class="flex" style="flex-direction: row; justify-content: start; width: 80%; margin-left: 18px; gap: 100px;">
      <div style="margin-top: 15px;">
        <input v-model="editorTitle" class=" text-sm  block w-full dark:bg-transparent dark:border-transparent dark:placeholder-gray-400 dark:text-white" style="border:none;border-bottom: 1px solid; outline: none; font-size: 20px; padding: 10px; width: 300px;" placeholder="Enter blog title">
      </div>
      <div style="margin-top: 22px;">
        <input @change="handleFileChange" accept="image/jpeg, image/png, image/jpg" style="border-radius: 15px;" class="block w-full text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
      </div>
    </div>
    <div style="width: 1200px; margin-top: 10px;">
      <ckeditor 
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      ></ckeditor>
    </div>
  </div>
  <div class="flex" style="margin-left: 170px;margin-top: 30px;">
      <button @click="btnCancel()" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{{ $t("cancel") }}</button>
      <button @click="sendData()" type="button" class="text-white bg-gray-800 border border-gray-300 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{{ $t("publishPost") }}</button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from '../../plugins/axios';
import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Hello, CKEditor!</p>',
      editorTitle:"" as string,
      editorImage: null as File | null,
      editorConfig: {
        // CKEditor configuration options go here
      },
    };
  },
  methods:{
    getdata(){
      console.log(this.editorData);
    },
    handleFileChange(event: any) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.editorImage = files[0]; 
      }
      else {
        this.editorImage = null;
      }
    },
    async sendData(){
      if(this.editorImage){
        const formData = new FormData();
        formData.append("Title",this.editorTitle);
        formData.append("Description",this.editorData);
        formData.append("Image",this.editorImage);
        
        var response = await axios.post("/api/posts/create", formData)
        if(response.status === 200) this.$router.push("/")
      }
    },
    btnCancel(){
      this.$router.push("/")
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

    
  },
  created() {
      this.checker();
  },

});
</script>
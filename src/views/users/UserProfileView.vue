<script  lang="ts">
import { defineComponent } from 'vue'
import axios from "../../plugins/axios"
import FlowbiteSetup from '../../FlowbiteSetup.vue'
import { UserViewModel } from '@/viewmodels/UserViewModel';

export default defineComponent({
  components:{
    FlowbiteSetup,axios,defineComponent
  },
  data() {
    return {
      imageFullPath: "" as string,
      firstName: "" as string,
      lastName: "" as string,
      email: "" as string,
      username: "" as string,
      baseURL: "" as string,
      checkData:false as boolean,
      errorMessage:"" as string,

      profil:[] as UserViewModel[],
      content: false as boolean
    }
  },
  methods: {
    async getDataAsync() {
      try {
        this.baseURL = axios.defaults.baseURL!;

        const response = await axios.get("/api/user/profile");
        const responseData = response.data as any;
        if (responseData) {
          this.firstName = responseData.firstName || "";
          this.lastName = responseData.lastName || "";
          this.email = responseData.email || "";
          this.username = responseData.username || "";
          this.imageFullPath = this.baseURL + "/" + responseData.imagePath || "";
        }

      } catch (error) {
        console.error('Malumotlarni olishda xatolik:', error);
      }
    },
    async updateAsync(){
      this.dataCheker();
      if(this.checkData===false){

        try {
          const formdata = new FormData();
          formdata.append("FirstName",this.firstName)
          formdata.append("LastName",this.lastName)
          formdata.append("Username",this.username)
          
          const response = await axios.put("/api/user/update",formdata,{
            headers:{
              'Content-Type':'multipart/form-data'
            }
          })
          location.reload();
        }
        catch{
          
        }
      }
    },
      dataCheker(){
      if(this.firstName.length<3) this.errorMessage = "First name is required!",this.checkData = true;
      else if(this.lastName.length<3) this.errorMessage = "Last name is required!",this.checkData = true;
      else if(this.username.length<3) this.errorMessage = "Username is invalid!",this.checkData = true;
      
    },
    btnCancel(){
      this.$router.push("/")
    },
    signout(){
      document.cookie =  "access_token=" + "" + "; expires: SESSION; path=/";
      document.documentElement.classList.remove('dark')
    }

  },

  async mounted() {
    await this.getDataAsync();
  },
  
});
</script>

<template>
    <FlowbiteSetup></FlowbiteSetup>
    <div class="w-full" style="display: flex; justify-content: center;position: relative;">

        <div class=" mb-5 border rounded-lg border-gray-600 w-3/5 flex" style="display: flex;flex-direction: column;">
            <div style="font-size: 22px;border-bottom: 1px solid rgb(186, 180, 180);display: block; padding: 10px;">
                <h2 style="width: 50px; cursor: pointer;font-family: 'Playfair Display', serif;"
                class="fw-bold pt-2 pb-2 ml-4 block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Profile</h2>
            </div>
            <div class="flex flex p-4">
                <div style="width: 150px; height: 150px; border-radius: 50%;overflow: hidden; margin-left: 34px;">
                    <img v-bind:src="imageFullPath" alt="">
                </div>
                
            </div>

        </div>
    </div>

      <div v-show="checkData === true" style="display: flex; justify-content: center; width: 913px; margin-left: 303px;" class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-700" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span class="sr-only"></span>
          <div>
            <span class="font-medium">{{ errorMessage }}</span> 
          </div>
      </div>
    <div class="flex justify-between" style="display: flex; justify-content: center;">

        <div class="w-3/5">
            <div class="w-full mb-5 p-5 border rounded-lg border-gray-600">
                <h3 class="font-bold mb-5 text-gray-900 dark:text-white">Profile Settings</h3>
                
                <form>
                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input v-model="firstName" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input v-model="lastName" type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required>
                        </div>
                    
                    </div>
                    <div class="mb-6">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input v-model="username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@johndoe" required>
                    </div> 
                    <div class="mb-6">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"  >Email address</label>
                        <input readonly v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required>
                    </div>  
                    <div class="mb-6">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••">
                    </div> 
                    <div class="mb-6">
                        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••">
                    </div> 
                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
                        </div>
                        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <button type="button" @click="btnCancel()" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button>
                    <button type="submit" @click="updateAsync()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
                </form>

            </div>
        </div>
    </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&family=Oswald&family=Playfair+Display:wght@600&display=swap');
</style>
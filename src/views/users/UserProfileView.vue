<script  lang="ts">
import { defineComponent } from 'vue'
import axios from "../../plugins/axios"
import FlowbiteSetup from '../../FlowbiteSetup.vue'
import { UserViewModel } from '@/viewmodels/UserViewModel';
import { getToken } from '@/helpers/TokenHelper';
import { ResetDto } from '@/dtos/ResetPasswordDto';

export default defineComponent({
  components: {
    FlowbiteSetup, axios, defineComponent
  },
  data() {
    return {
      imageFullPath: "" as string,
      firstName: "" as string,
      lastName: "" as string,
      email: "" as string,
      username: "" as string,
      baseURL: "" as string,
      checkData: false as boolean,
      errorFristName: false as boolean,
      errorLastname: false as boolean,
      errorUsername: false as boolean,

      defaultImage: false as boolean,
      profileImage:null as File | null,
      succes: false as boolean,
      profil: [] as UserViewModel[],
      content: false as boolean,

      oldPassword:"" as string,
      newPassword:"" as string,
      confirmPassword:"" as string,

      errorOldPassword: false as boolean,
      errorNewPassword: false as boolean,
      errorConfirmPassword: false as boolean,
      checkPassword: false as boolean,
    }
  },
  methods: {
    async getDataAsync() {
      try {
        this.baseURL = axios.defaults.baseURL!;

        const response = await axios.get("/api/users/profile");
        const responseData = response.data as any;
        if (responseData) {
          this.firstName = responseData.firstName || "";
          this.lastName = responseData.lastName || "";
          this.email = responseData.email || "";
          this.username = responseData.username || "";
          if(responseData.imagePath == ""){
            this.defaultImage = true;
          }
          else{
            this.imageFullPath = this.baseURL + "/" + responseData.imagePath || "";
          }
        }

      } catch (error) {
        console.error('Malumotlarni olishda xatolik:', error);
      }
    },
    async updateAsync() {
      this.dataCheker();
      if (this.checkData === true) {

        try {
          const formdata = new FormData();
          formdata.append("FirstName", this.firstName)
          formdata.append("LastName", this.lastName)
          formdata.append("Username", this.username)

          const response = await axios.put("/api/users", formdata, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          this.succes = true;
          // location.reload();
        }
        catch {

        }
      }
    },
    async resetPassword(){
      debugger
      this.checkPasswordValidator();
      if(this.checkPassword == true){
        var resetDto = new ResetDto();
            resetDto.oldPassword = this.oldPassword;
            resetDto.newPassword = this.newPassword;
            var jsonContent: string = JSON.stringify(resetDto);
        var response = await axios.put("api/users/reset/password",jsonContent,{
          headers: {
                    'Content-Type': 'application/json'
                }
        });
        if(response == undefined || response.status != 200){
          this.errorOldPassword = true;
        }
        else if (response.status == 200){
          this.succes = true;
          this.oldPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
          this.errorOldPassword = false;
          this.errorNewPassword = false;
          this.errorConfirmPassword = false;
        }
      }
    },
    checkPasswordValidator(){
      if(this.oldPassword.length<8) this.errorOldPassword = true;
      else if(this.newPassword.length<8) this.errorNewPassword = true;
      else if(this.confirmPassword.length<8 || this.newPassword != this.confirmPassword) this.errorConfirmPassword = true;
      else this.checkPassword = true;
    },

    async imageRomove(){
      var response = await axios.delete("/api/users/delete/image");
      location.reload();
    },
    async imageUpdate(){
      if(this.profileImage != null){
        const formData = new FormData();
        formData.append("Image",this.profileImage)
        var response = await axios.put("api/users/upload/image",formData);
        location.reload();
      }
    },
    dataCheker() {
      if (this.firstName.length < 3) this.errorFristName = true;
      else if (this.lastName.length < 3) this.errorLastname = true;
      else if (this.username.length < 3)  this.errorUsername = true;
      else this.checkData = true;

    },
    btnCancel() {
      this.$router.push("/")
    },
    signout() {
      document.cookie = "access_token=" + "" + "; expires: SESSION; path=/";
      document.documentElement.classList.remove('dark')
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
            }

        },
    handleFileChange(event: any) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.profileImage = files[0];
        this.imageUpdate() 
      }
      else {
        this.profileImage = null;
      }
    },

  },
  async created() {
    this.checker();
    await this.getDataAsync();
  },

});
</script>

<template>
  <FlowbiteSetup></FlowbiteSetup>
  <div style="margin-bottom: 20px;margin-left: 302px;">
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
            <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">{{ $t("profile") }}</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{{ $t("settings") }}</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
  <div class="w-full" style="display: flex; justify-content: center;position: relative;">

    <div class="border rounded-lg border-gray-600 w-3/5 flex mb-5" style="width: 913px;">
      <div class="  border-gray-600 flex"
        style="display: flex;flex-direction: column;border-right: 1px solid gray; width: 250px;height: 100%;border-bottom-left-radius: 7px;border-top-left-radius: 7px;">
        <div style="font-size: 22px;border-bottom: 1px solid rgb(186, 180, 180);display: block; padding: 10px;">
          <h2 style="width: 50px; cursor: pointer;font-family: 'Playfair Display', serif;"
            class="fw-bold pt-2 pb-2 ml-4 block  text-gray-1200  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            {{ $t("profile") }}</h2>
        </div>
        <div class=" flex p-4" style="display: flex;flex-direction: column; align-items: center;justify-content: center;">
          <div style="width: 150px; height: 150px; border-radius: 50%;overflow: hidden;">
            <img v-show="defaultImage == true" src="../../assets/images.png" alt="">
            <img v-show="defaultImage == false" v-bind:src="imageFullPath" alt="">
          </div>
          <div class="delEdit flex mt-3">
            <div class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center mr-2  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              <label>
                  <input @change="handleFileChange" type="file" class="form-control form-control-solid" style="display:none" accept=".jpg, .png, .jpeg, .svg, .webp">
                 <icon name="edit"/>
              </label>
            </div>
            <button type="button" @click="imageRomove()"
              class="p-1 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  text-center  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
              <icon class="text-gray-900 dark:text-white w-6 h-6" name="delete" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap"
        style="width: 100%;display: flex;justify-content: space-around;padding: 10px;padding-top: 50px;">
        <div v-show="errorFristName == false" style="width: 50%;padding: 10px;height: 0;">
          <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("firstname")
          }}</label>
          <input v-model="firstName" type="text" id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John" required>
        </div>

        <div v-show="errorFristName == true" style="width: 50%;padding: 10px;height: 0;">
          <label for="first_name" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{ $t("firstname")
          }}</label>
          <input v-model="firstName" type="text" id="first_name"
            class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            placeholder="John" required>
        </div>

        <div v-show="errorLastname == false" style="width: 50%;padding: 10px;height: 0;margin-bottom: 35px;">
          <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("lastname")
          }}</label>
          <input v-model="lastName" type="text" id="last_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Doe" required>
        </div>

        <div v-show="errorLastname == true" style="width: 50%;padding: 10px;height: 0;margin-bottom: 35px;">
          <label for="last_name" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{ $t("lastname")
          }}</label>
          <input v-model="lastName" type="text" id="last_name"
            class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            placeholder="Doe" required>
        </div>

        <div v-show="errorUsername == false" class="" style="width: 100%;padding: 10px;height: 0;margin-top: 10px;margin-bottom: 70px;">
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ $t("username")
          }}</label>
          <input v-model="username" type="text" id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="@johndoe" required>
        </div>

        <div v-show="errorUsername == true" class="" style="width: 100%;padding: 10px;height: 0;margin-top: 10px;margin-bottom: 70px;">
          <label for="username" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{ $t("username")
          }}</label>
          <input v-model="username" type="text" id="username"
            class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            placeholder="@johndoe" required>
        </div>

        <div class="" style="width: 100%;display: flex;justify-content: end;align-items: center;height: 45px;">
          <button type="button"  @click="updateAsync()" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">{{ $t("change") }}</button>

        </div>
      </div>

    </div>
  </div>


  <div v-show="succes === true" style="display: flex; justify-content: center; width: 913px; margin-left: 303px;"
    class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200 dark:bg-gray-700 dark:text-green-700"
    role="alert">
    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
      fill="currentColor" viewBox="0 0 20 20">
      <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span class="sr-only"></span>
    <div>
      <span class="font-medium">{{ $t("success") }}</span>
    </div>
  </div>
 
  <div class="flex justify-between" style="display: flex; justify-content: center;">
    <div class="w-3/5">
      <div class="w-full mb-5 p-5 border rounded-lg border-gray-600">
        <h3  class="font-bold mb-5 text-gray-1200 dark:text-white">{{ $t("profileSettings") }}</h3>

        <div class="border-dark border border-dashed p-3 flex flex-col justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:border-gray-500 dark:hover:bg-gray-600">
                <span class="svg-icon svg-icon-2tx svg-icon-dark me-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="currentColor"></path>
                        <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="currentColor"></path>
                    </svg>
                </span>
                <div class="d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap">
                    <div class="mb-3 mb-md-0 fw-semibold">
                        <h4 class="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">{{ $t("userPaswordInfo1") }}</h4>
                        <div class="fs-6 text-gray-700 pe-7">{{ $t("userPaswordInfo2") }}</div>
                    </div>
                </div>
            </div>
        <form>
          <div class="grid gap-6 mb-6 md:grid-cols-2">


          </div>

          <div v-show="errorOldPassword == false" class="mb-6">
            <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
              $t("currentPassword") }}</label>
            <input type="password" id="email" v-model="oldPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••" required>
          </div>

          <div v-show="errorOldPassword == true" class="mb-6">
            <label for="password"  class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{
              $t("currentPassword") }}</label>
            <input type="password" id="email" v-model="oldPassword"
              class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              placeholder="•••••••••" required>
          </div>

          <div v-show="errorNewPassword == false" class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
              $t("newPassword") }}</label>
            <input type="password" id="password" v-model="newPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••">
          </div>

          <div v-show="errorNewPassword == true" class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{
              $t("newPassword") }}</label>
            <input type="password" id="password" v-model="newPassword"
              class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              placeholder="•••••••••">
          </div>

          <div v-show="errorConfirmPassword == false" class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
              $t("confirmPassword") }}</label>
            <input type="password" id="password" v-model="confirmPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••">
          </div>

          <div v-show="errorConfirmPassword == true" class="mb-6">
            <label for="confirm_password" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">{{
              $t("confirmPassword") }}</label>
            <input type="password" id="confirm_password" v-model="confirmPassword"
              class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              placeholder="•••••••••">
          </div>

          <div class="flex items-start mb-6">
          </div>
          <button type="button" @click="btnCancel()" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">{{$t("cancel") }}</button>
         <button type="button" @click="resetPassword()"  class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">{{ $t("change") }}</button>
        </form>

      </div>
    </div>
  </div>
</template>




<script lang="ts">
import { defineComponent } from 'vue'
import axios from "@/plugins/axios"
import FlowbiteSetup from '@/FlowbiteSetup.vue';
import {ConfirmDto} from '../../dtos/AuthConfirmDto'
export default defineComponent({
    data() {
        return {
            email: "" as string,
            password: "" as string,

            checkEmail:false as boolean,
            checkPassword:false as boolean,
            checkAll:false as boolean,
            inputEror:"" as string,
            existError: false as boolean,
            statuscode:0 as number,
            code:"" as string,
            forConfirm: false as boolean,
            confirmError: false as boolean

        };
    },
    watch:{
        code(){
            this.code = this.code.replace(/[^0-9]/g,'');
        }
    },
    methods: {
        async registerAsync(){
          this.existError = false;
          this.checkData();
          if(this.checkAll){
            const formData = new FormData();
            formData.append('Email', this.email.toString());
            formData.append('Password', this.password.toString());
            
            const response = await axios.post('/api/auth/register',formData,{
              headers:{
                'Content-Type':'multipart/form-data'
              }
            })
            this.statuscode = response.status
            if(this.statuscode === 409) {
              this.existError = true
              this.inputEror = "This email is already registered!"
            }
            else if(this.statuscode === 200){
              this.sendCode();
            }
          }
        },
        async sendCode(){
            if(this.statuscode ===200 ){
              var responseCode = await axios.post('/api/auth/register/send-code?email='+ this.email);
              this.forConfirm = true;
            }
        },

        async confirmAsync(){
          var confirmDto = new ConfirmDto();
          confirmDto.email = this.email;
          confirmDto.code = this.code;
          var jsonContent: string = JSON.stringify(confirmDto);
          var response = await axios.post("/api/auth/register/verify", jsonContent, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if(response.status ===200){
            var token: string = response.data.token;
            document.cookie = "access_token=" + token + "; expires: SESSION; path=/";
            this.$router.push('/')
          }
          else{
            this.confirmError = true;
          }
        },

        checkData(){
          if(this.email.length<10){
            this.inputEror = "Inavlid email!"
            this.checkEmail = true 
          }
          else if(true){
            const belgilarSoni: number = this.password.length;
            const kattaHarflar: RegExp = /[A-Z]/;
            const kichikHarflar: RegExp = /[a-z]/;
            const raqamlar: RegExp = /[0-9]/;
            const simvollar: RegExp = /[!@#$%^&*(),.?":{}|<>]/;

            const belgi1: boolean = belgilarSoni >= 8;
            const belgi2: boolean = kattaHarflar.test(this.password);
            const belgi3: boolean = kichikHarflar.test(this.password);
            const belgi4: boolean = raqamlar.test(this.password);
            const belgi5: boolean = simvollar.test(this.password);

            if(belgi1 && belgi2 && belgi3 && belgi4 && belgi5){
              this.checkAll = true;
            }
            else{
              this.checkPassword = true
              this.inputEror = "Password is not strong password!"
            }
            
          }
          if(this.checkAll===false) this.existError = true
        },
    },
});
</script>
<template>
  <FlowbiteSetup></FlowbiteSetup>
  <div class="form-wrap" v-show="forConfirm === false">
    <form class="login">
    
      <h2 style="margin-bottom: 10px;">Reset password !</h2>
      <h1 style="font-family: Arial, Helvetica, sans-serif; font-weight: bold; margin-bottom: 10px;">We send code your email!</h1>
        <div v-show="existError===true" id="alert-border-2" class="flex items-center p-4 mb-4 mb-4 text-red-800  bg-red-100 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
            role="alert">
            <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div class="ml-3 text-sm font-medium" style="width: 290px;">
            {{ inputEror }}
            </div>
        </div>
  
  <div class="inputs relative" v-show="forConfirm === false">
   
    
    <icon name="email" class="icon" style=" position: absolute;z-index: 1;top: 14px;left: 5px;" />
    <div class="input ">
      <input v-model="email" type="email" placeholder="Email" style="padding: 0 35px;" />
    </div>
    
    <icon name="password" class="icon" style=" position: absolute;z-index: 1;top: 70px;left: 5px;" />
    <div class="input ">
      <input v-model="password" type="password" placeholder="Password" style="padding: 0 35px;" />
    </div>
    
  </div>
  <button type="button" @click="registerAsync()" style="width: 150px;"
  class="mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send code</button>

</form>
</div>

<div class="form-wrap" v-show="forConfirm === true">
    <form class="login">
      <h2>Confirm code</h2>
        <h3 style="margin-bottom: 20px;">Your email {{ email }}</h3>

      <div v-show="confirmError===true" id="alert-border-2" class="flex items-center p-4 mb-4 mb-4 text-red-800  bg-red-100 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
        role="alert">
        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div class="ml-3 text-sm font-medium" style="width: 290px;">
          Incorrect code!
        </div>
      </div>

    <div class="inputs relative">
        <icon name="email" class="icon" style=" position: absolute;z-index: 1;top: 14px;left: 5px;" />
        <div class="input">
          <input v-model="code" style="padding:0 140px; font-size: larger;" type="text" maxlength="6" placeholder="Code"  />
        </div>
    </div>
      <button class="mt-2" @click="sendCode()">Resend code</button>
      <button type="button" @click="confirmAsync()" style="width: 150px;"
        class="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Check</button>
    </form>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');

.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 100%) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  .login {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }
  }

  h2 {
    text-align: center;
    font-size: 32px;
    color: #303030;
    font-weight: 900;
    font-family: 'Quicksand', sans-serif;

    @media (min-width: 900px) {
      font-size: 40px;
    }
  }

  .inputs {
    width: 100%;
    max-width: 350px;
    font-family: 'Quicksand', sans-serif;

    .input {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 8px;
      border-radius: 10px;
      overflow: hidden;
      input {
        position: relative;
        display: flex;
        justify-content: center;
        width: 100%;
        border: none;
        background-color: #f2f7f6;
        padding: 4px 4px 4px 30px;
        height: 50px;

        &:focus {
        outline: none;
        box-shadow: none;
        }
      }

      .icon {
        width: 12px;
        position: absolute;
        left: 6px;
      }
    }
  }

  .forgot-password {
    text-decoration: none;
    color: #000;
    cursor: pointer;
    font-size: 14px;
    margin: 16px 0 32px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease all;

    &:hover {
      border-color: #303030;
    }
  }
}</style>

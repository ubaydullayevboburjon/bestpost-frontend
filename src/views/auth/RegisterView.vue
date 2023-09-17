<script lang="ts">
import { defineComponent } from 'vue'
import axios from "@/plugins/axios"
import FlowbiteSetup from '@/FlowbiteSetup.vue';
import {ConfirmDto} from '../../dtos/AuthConfirmDto'
export default defineComponent({
    data() {
        return {
            firstName:"" as string,
            lastName:"" as string,
            username:"" as string,
            email: "" as string,
            password: "" as string,

            checkFName:false as boolean,
            checkLName:false as boolean,
            checkUsername:false as boolean,
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
            formData.append('FirstName', this.firstName.toString());
            formData.append('LastName', this.lastName.toString());
            formData.append('Username', this.username.toString());
            formData.append('Email', this.email.toString());
            formData.append('Password', this.password.toString());
            
            const response = await axios.post('/api/auth/register',formData,{
              headers:{
                'Content-Type':'multipart/form-data'
              }
            })
            console.log('Register successful!', response);
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
              console.log(responseCode.status)
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
          console.log(response.status)
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
          if(this.firstName.length<3){
            this.inputEror = "Firstname is required!"
            this.checkFName = true
          }  
          else if(this.lastName.length<3){
            this.inputEror = "LastName is required!"
            this.checkLName = true
          }   
          else if(this.username.length<3) {
            this.inputEror = "Invalid username!"
            this.checkUsername = true
          }
          else if(this.email.length<10){
            this.inputEror = "Inavlid email!"
            this.checkEmail = true 
          }
          else if(this.password.length<8){
             this.inputEror = "Password is not strong password!"
             this.checkPassword = true
          }
          else{
            this.checkAll = true
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
      <div class="flex">
        <p class="login-register mt-2">Already have an account? </p>
        <a href="login" class="mx-2 mt-2" style="font-family: Georgia, 'Times New Roman', Times, serif,bold;">Login</a>
      </div>
      
      <h2>Create your </h2>
      <h2 style="margin-bottom: 20px;">Best Post account </h2>
      
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
    <icon name="user" class="icon" style=" position: absolute;z-index: 1;top: 14px;left: 5px;" />
    <div class="input">
      <input v-model="firstName" style="padding:0 35px;" type="text" placeholder="First name" />
    </div>
    
    <icon name="user" class="icon" style=" position: absolute;z-index: 1;top: 70px;left: 5px;" />
    <div class="input ">
      <input v-model="lastName" type="text" placeholder="Last name" style="padding: 0 35px;" />
    </div>
    
    <icon name="user" class="icon" style=" position: absolute;z-index: 1;top: 126px;left: 5px;" />
    <div class="input ">
      <input v-model="username" type="text" placeholder="Username" style="padding: 0 35px;" />
    </div>
    
    <icon name="email" class="icon" style=" position: absolute;z-index: 1;top: 186px;left: 5px;" />
    <div class="input ">
      <input v-model="email" type="email" placeholder="Email" style="padding: 0 35px;" />
    </div>
    
    <icon name="password" class="icon" style=" position: absolute;z-index: 1;top: 243px;left: 5px;" />
    <div class="input ">
      <input v-model="password" type="password" placeholder="Password" style="padding: 0 35px;" />
    </div>
    
  </div>
  <button type="button" @click="registerAsync()" style="width: 150px;"
  class="mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
</form>
</div>

<div class="form-wrap" v-show="forConfirm === true">
    <form class="login">
      <h2>Confirm code</h2>
        <h3>Your email {{ email }}</h3>

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

<script lang="ts">
import { defineComponent } from 'vue'
import axios from "@/plugins/axios"
import { LoginDto } from "@/dtos/AuthDtos"
import FlowbiteSetup from '@/FlowbiteSetup.vue';


export default defineComponent({
    data() {
        return {
            email: "" as string,
            password: "" as string,
            existError: false as boolean
        };
    },
    methods: {
        async loginAsync() {
            this.existError = false;
            var loginDto = new LoginDto();
            loginDto.password = this.password;
            loginDto.email = this.email;
            var jsonContent: string = JSON.stringify(loginDto);
            var response = await axios.post("/api/auth/login", jsonContent, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
           if(response == undefined || response.status != 200 ){
              this.existError = true;
            }
            else if (response.status == 200) {
                var token: string = response.data.token;
                document.cookie = "access_token=" + token + "; expires: SESSION; path=/";
                this.$router.push("/");
            }
            else {
              this.existError = true;
            }
        },
        dismissErrors() {
            this.existError = false;
        },
    },
    created(){
      document.documentElement.classList.add('light');
      localStorage.setItem("color-theme", "light");
    },
    components: { FlowbiteSetup }
});
</script>
<template>
  <FlowbiteSetup></FlowbiteSetup>
  <div class="form-wrap">
    <form class="login">
      <div class="flex">
        <p class="login-register mt-2">Don't have an account?</p>
        <a href="register" class="mx-2 mt-2" style="font-family: Georgia, 'Times New Roman', Times, serif,bold; font-style:italic; font-size: large;">Register</a>
      </div>

      <h2>Login to Best post</h2>

      <div v-show="existError===true" id="alert-border-2" class="flex items-center p-4 mb-4 mb-4 text-red-800  bg-red-100 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
        role="alert">
        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div class="ml-3 text-sm font-medium" style="width: 290px;">
          Your email or password incorrect!
        </div>
      </div>

      <div class="inputs relative">
        <icon name="email" class="icon" style=" position: absolute;z-index: 1;top: 14px;left: 5px;" />
        <div class="input">
          <input v-model="email" style="padding:0 35px;" type="email" placeholder="Email" />
        </div>

        <icon name="password" class="icon" style=" position: absolute;z-index: 1;top: 70px;left: 5px;" />
        <div class="input ">
          <input v-model="password" type="password" placeholder="Password" style="padding: 0 35px;" />
        </div>
      </div>
      <div class="flex items-start mb-4 mt-4">
        <div class="flex items-center h-5">
         <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required>
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        <a href="reset-password" for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" style="margin-left: 110px;">Forgot password? </a>
      </div>
      <button type="button" @click="loginAsync()" style="width: 150px;"
        class="mt-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
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
    margin-bottom: 40px;
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

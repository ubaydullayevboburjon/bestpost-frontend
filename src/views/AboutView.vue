<script lang="ts">
import { defineComponent } from 'vue';
import { getToken } from '@/helpers/TokenHelper';
import axios from '../plugins/axios';
export default defineComponent({
  methods:{
    async checker(){
      debugger
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
  created(){
    this.checker();
  }
})
</script>
<template>
  <FlowbiteSetup></FlowbiteSetup>
  <div class="w-full" style="display: flex; justify-content: center;position: relative;">
    <div class="  mb-5 mt-5 border rounded-lg border-gray-600 w-3/5 flex"
      style="display: flex; height: 80%; padding: 30px; width: 1400px;">
      <div class="" style="display: flex; width: 50%;">
        <img src="../assets/agency.png" >
      </div>
      <div class="" style="width: 50%;">
        <p class=" text-1xl font-semibold leading-normal text-gray-900 dark:text-white">
          {{ $t("aboutpage") }}
        </p>
      </div>

    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}</style>

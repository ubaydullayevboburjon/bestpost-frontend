<script lang="ts">
import { defineComponent } from 'vue';
import UserProfileViewComponent from '@/components/users/UserProfileViewComponent.vue';
import type { UserViewModel } from '@/viewmodels/UserViewModel';
import axios from '../../plugins/axios';
import { getToken } from '@/helpers/TokenHelper';

export default defineComponent({
    components:{
        UserProfileViewComponent
    },
    data(){
        return{
            id:0 as number,
            firstName:"" as string,
            lastName:"" as string,
            username:"" as string,
            email:"" as string,
            imagePath:"" as string,
            createdAt:"" as string,
            updatedAt:"" as string,

            profil: [] as UserViewModel[],
        }
    },
    methods:{
        async getdata(){
            var response = await axios.get("api/users")
            this.profil = response.data;
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
    },
    created(){
        this.checker();
        this.getdata();
    }
})
</script>
<template>
<div style="display: contents; ">

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Position
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                
            </tr>
        </thead>
        <ul style="display: flex; flex-wrap: wrap;">
                <template  v-for="element in profil" :params="element.id">
                <UserProfileViewComponent
                :firstName = element.firstName
                :lastName = element.lastName
                :username = element.lastName
                :email = element.email
                :imagePath = element.imagePath
                :createdAt = element.createdAt
                :updatedAt = element.updatedAt
                ></UserProfileViewComponent>
                </template>
            </ul>
    </table>
</div>
</template>
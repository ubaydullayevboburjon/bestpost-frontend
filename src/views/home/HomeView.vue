<script lang="ts">
import {defineComponent} from 'vue'
import axios from '../../plugins/axios';
import PostViewComponent from '../../components/posts/PostViewComponent.vue'
import { PostViewModel } from '@/viewmodels/PostViewMoel';
import { getToken } from '@/helpers/TokenHelper';
import { RouterLink } from 'vue-router';
import { PaginationMetaData } from '@/utils/PaginationUtils';

export default defineComponent({
    components:{
    axios,
    PostViewComponent
},
    data(){
        return{
            id:0 as number,
            title:"" as string,
            description:"" as string,
            userid:0 as number,
            createdAt:"" as string,
            updatedAt:"" as string,
            search:"" as string,
            notfound:false as boolean,

            hasNext: false,
            hasPrevious: false,            
            currentPage: 1 as number,
            totalPages: 1 as number,

            metaData: new PaginationMetaData(),
            postList:[] as PostViewModel[], 
        }
    },
    methods:{
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

        async getData(page: Number){
            var response = await axios.get("api/posts?page="+page,{
                headers:{
                    'Authorization' : `Bearer ${getToken()}`
                }
            })
            this.postList = response.data;

        },
        async searchPost(){
            if(this.search !=""){
                var response  = await axios.get("/api/posts/search?search="+this.search);
                this.postList = response.data;
                if(response.data == ""){
                    this.notfound = true;
                }
            }
            else{
                this.notfound = false;
                this.getData(1)
            }
        },
    },
    created(){
        this.checker();
        this.getData(1);
    },
   
})
</script>

<template>
    <div style="margin-left: 74px; margin-right: 74px;">
            <nav class="flex mt-1 mb-5" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <a href="/"
                            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            {{ $t("home") }}
                        </a>
                    </li>
                </ol>
            </nav>


                <form>
                    <label for="default-search"
                        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search"  v-model="search" id="default-search"
                            class="block w-full  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..." required>
                            <button type="button" @click="searchPost()" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{{ $t("search") }}</button>
                        </div>
                </form>

            </div>
        <div style="padding: 40px;" class="flex flex-wrap">
            <ul style="display: flex; flex-wrap: wrap;">
                <RouterLink :to="`/posts/${element.id}`" v-for="element in postList" :params="element.id">
                <PostViewComponent
                    :id = element.id
                    :title=element.title
                    :description=element.description
                    :imagePath="element.imagePath"
                    :user-id=element.userId
                    :created-at=element.createdAt
                    :updated-at=element.updatedAt
                ></PostViewComponent>
                </RouterLink>
            </ul>

            
            <p v-show="notfound===true" class="w-full text-3xl font-semibold leading-normal text-gray-900 dark:text-white" style="margin-top: 150px; display: flex;align-items: center;justify-content: center;color: rgb(127, 118, 118);font-weight: normal;">{{ $t("notfound") }}</p>

        </div>

   

</template>

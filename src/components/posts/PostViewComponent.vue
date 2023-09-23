<script lang="ts">
import { defineComponent } from 'vue'
import axios from '../../plugins/axios'
import { loadRouteLocation } from 'vue-router';
export default defineComponent({
    components: {

    },
    props: {
        id: Number,
        title: String,
        description: String,
        imagePath: String,
        userId: Number,
        createdAt: String,
        updatedAt: String,
    },
    data() {
        return {
            imageFullPath: "" as string,
            baseURL: "" as string,
        }
    },
    methods: {
        load() {
            this.baseURL = axios.defaults.baseURL!;
            this.imageFullPath = this.baseURL + "/" + this.imagePath;
        },
    },
    mounted() {
        this.load();
    }
});
</script>

<template>
    <div style="width: 350px;margin-top: 20px;">

        <div style="max-height: 515px;"
            class="hover:-rotate-1 max-w-sm ml-9 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" v-bind:src="imageFullPath" alt="" style="width: 100%;height: 300px;object-fit: cover;" />
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 style="overflow: hidden;padding: 2px; height: 40px;" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ title }}
                    </h5>
                </a>
                <p v-html="description" style="max-height: 100px;max-width: 350px; border: 2px solid transparent; overflow: hidden;padding: 2px;height: 50px;" class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    </p>
                <a href="#"
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {{ $t("fullinformation") }}
                    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>
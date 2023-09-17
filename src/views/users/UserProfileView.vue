<script lang="ts">
import { defineComponent } from 'vue'
import axios from "../../plugins/axios"
import FlowbiteSetup from '../../FlowbiteSetup.vue'
</script>

<template>
<FlowbiteSetup></FlowbiteSetup>

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
      
</template>
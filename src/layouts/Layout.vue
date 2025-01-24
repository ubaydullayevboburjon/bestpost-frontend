<script setup  lang="ts">
import Header from "../components/common/Header.vue";
import ThemeSetter from ".././components/common/ThemeSetter.vue";
import { RouterView } from "vue-router";
import FlowBiteSetup from "@/FlowbiteSetup.vue";
import { defineComponent } from "vue";
import { getToken } from "@/helpers/TokenHelper";
import axios from "../plugins/axios";


</script>

<template>
  <div class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">

    <Header></Header>
    <FlowBiteSetup></FlowBiteSetup>
    <ThemeSetter></ThemeSetter>
    <div class="pt-7 w-full">
      <div class="pt-7 mt-16">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
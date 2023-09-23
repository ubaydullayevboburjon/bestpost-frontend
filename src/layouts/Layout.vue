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
  <div>

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
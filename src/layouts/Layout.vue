<script setup lang="ts">
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import ThemeSetter from ".././components/common/ThemeSetter.vue";
import { RouterView } from "vue-router";
import FlowBiteSetup from "@/FlowbiteSetup.vue";
</script>

<template>
<FlowBiteSetup></FlowBiteSetup>
  <ThemeSetter></ThemeSetter>
  <Header></Header>
  <div class="pt-7 w-full">
    <div class="pt-7 mt-16">
      <Footer></Footer>
      <RouterView></RouterView>
    </div>
  </div>
</template>
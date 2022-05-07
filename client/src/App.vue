<template>
  <Header title="Product Manager" />

  <RouterView />
  <Footer />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
@import "@/assets/base.css";
</style>

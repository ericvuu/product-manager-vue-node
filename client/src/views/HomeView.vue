<template>
  <main class="container mx-auto w-screen">
    <Products />
    <Images />
  </main>
</template>

<script>
import Products from "../components/products/Products.vue";
import Images from "../components/images/Images.vue";
export default {
  name: "Home",
  props: {},
  components: {
    Products,
    Images,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

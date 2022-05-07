<template>
  <header class="header-2">
    <nav class="bg-white py-2 md:py-4">
      <div class="container mx-auto md:flex md:items-center">
        <div class="flex justify-between items-center">
          <RouterLink to="/" class="text-2xl font-bold text-black rounded"
            >Product Manager</RouterLink
          >
          <button
            class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
          ></button>
        </div>

        <div
          class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
        >
          <RouterLink
            to="/"
            class="p-2 lg:px-4 md:mx-2 text-white rounded bg-green-600"
            >Home</RouterLink
          >

          <RouterLink
            to="/"
            class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >Dashboard</RouterLink
          >

          <RouterLink
            to="/"
            class="p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >Analytics</RouterLink
          >

          <RouterLink
            to="/"
            class="p-2 lg:px-4 md:mx-2 text-green-600 text-center border border-transparent rounded hover:bg-green-100 hover:text-green-700 transition-colors duration-300"
            >Log Out</RouterLink
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
  components: {},
};
</script>

<style scoped></style>

<template>
  <div class="container py-10 mx-auto">
    <div class="flex justify-between py-10">
      <h1 class="text-2xl font-semibold leading-tight">Products</h1>

      <form class="flex text-center" v-on:submit.prevent="onAddProduct">
        <input
          v-model="productData.id"
          type="text"
          class="border-2 mr-1 rounded border-gray-200"
          placeholder="Add numeric product id"
          required
        />
        <button
          type="submit"
          class="max-w-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
    </div>
    <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Product ID
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <template v-if="editId == product.id">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ product.id }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input v-model="editProductData.name" type="text" />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input v-model="editProductData.status" type="text" />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a class="mx-1" href="#" @click="onEditSubmit(product.id)"
                  >Submit</a
                >
                <a href="#" @click="onCancel">Cancel</a>
              </td>
            </template>
            <template v-else>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ product.id }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ product.name }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ product.status }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href="#" @click="onEdit(product)">Edit</a>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      editId: "",
      productData: {
        id: "",
      },
      editProductData: {
        name: "",
        status: "",
      },
      products: [],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const res = await fetch("http://localhost:8000/products/");
      const data = await res.json();
      this.products = data;
    },
    async onAddProduct() {
      let productID = this.productData.id;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: `${productID}`,
        }),
      };
      const response = await fetch(
        "http://localhost:8000/products/add",
        requestOptions
      );
      const data = await response.json();
      this.products = this.getProducts();
      this.productData.id = "";
    },
    onEdit(product) {
      this.editId = parseInt(product.id);
      this.editProductData.name = product.name;
      this.editProductData.status = product.status;
    },
    async onEditSubmit(id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(id),
          name: `${this.editProductData.name}`,
          status: `${this.editProductData.status}`,
        }),
      };
      const response = await fetch(
        `http://localhost:8000/products/${id}`,
        requestOptions
      );
      const data = await response.json();
      this.editId = "";

      this.products = this.getProducts();
    },
    onCancel() {
      this.editId = "";
      this.editProductData.name = "";
      this.editProductData.status = "";
    },
  },
};
</script>

<style scoped></style>

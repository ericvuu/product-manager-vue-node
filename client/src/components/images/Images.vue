<template>
  <div class="container py-10 mx-auto">
    <h1 class="text-2xl font-semibold leading-tight my-5">Images</h1>
    <div
      className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
      <div
        className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
        :key="image.id"
        v-for="image in images"
      >
        <img
          class="object-fill h-full w-full"
          v-bind:src="image.url"
          v-bind:alt="image.title"
        />
      </div>
    </div>
    <form
      class="flex flex-col md:flex-row text-center md:w-2/5 md:justify-between ml-auto py-10"
      v-on:submit.prevent="onAddImage"
    >
      <input
        v-model="imageData.title"
        type="text"
        class="border-2 mr-1 rounded border-gray-200 my-5 text-center md:text-start py-1.5"
        placeholder="Add image title"
        required
      />
      <input
        v-model="imageData.url"
        type="text"
        class="border-2 mr-1 rounded border-gray-200 my-5 text-center md:text-start py-1.5"
        placeholder="Add image url"
        required
      />
      <input
        v-model="imageData.productIDs"
        type="text"
        class="border-2 mr-1 rounded border-gray-200 my-5 text-center md:text-start py-1.5"
        placeholder="Add associated product ids"
      />
      <button
        type="submit"
        class="m-auto max-w-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
    </form>

    <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <!-- <th>Image ID</th> -->
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Url
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Product IDs
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="image in images" :key="image.id">
            <template v-if="editId == image.id">
              <!-- <td>{{ image.id }}</td> -->
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input v-model="editImageData.title" type="text" />
              </td>
              <td
                class="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                <input v-model="editImageData.url" type="text" />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <input v-model="editImageData.productIDs" type="text" />
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a class="mx-1" href="#" @click="onEditSubmit(image.id)"
                  >Submit</a
                >
                <a href="#" @click="onCancel">Cancel</a>
              </td>
            </template>
            <template v-else>
              <!-- <td>{{ image.id }}</td> -->
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{ image.title }}
              </td>
              <td
                class="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm"
              >
                {{ image.url }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {{
                  image.productIDs.length > 0
                    ? image.productIDs.join(", ")
                    : " "
                }}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href="#" @click="onEdit(image)">Edit</a>
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
  name: "Images",
  data() {
    return {
      editId: "",
      imageData: {
        id: "",
        title: "",
        url: "",
        productIDs: "",
      },
      editImageData: {
        title: "",
        url: "",
        productIDs: "",
      },
      images: [],
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    async getImages() {
      const res = await fetch("http://localhost:8000/images/");
      const data = await res.json();
      this.images = data;
    },
    async onAddImage() {
      let imageID = Math.floor(100000 + Math.random() * 900000);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: imageID,
          title: this.imageData.title,
          url: this.imageData.url,
          productIDs: this.imageData.productIDs,
        }),
      };

      const response = await fetch(
        "http://localhost:8000/images/add",
        requestOptions
      );
      const data = await response.json();

      this.images = this.getImages();

      this.imageData = {
        id: "",
        title: "",
        url: "",
        productIDs: "",
      };
    },
    onEdit(product) {
      this.editId = parseInt(product.id);
      this.editImageData.title = product.title;
      this.editImageData.url = product.url;
      this.editImageData.productIDs = product.productIDs;
    },
    async onEditSubmit(id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: parseInt(id),
          title: `${this.editImageData.title}`,
          url: `${this.editImageData.url}`,
          productIDs: `${this.editImageData.productIDs}`,
        }),
      };
      const response = await fetch(
        `http://localhost:8000/images/${id}`,
        requestOptions
      );
      const data = await response.json();
      this.editId = "";

      this.images = this.getImages();
    },
    onCancel() {
      this.editId = "";
      this.editImageData.title = "";
      this.editImageData.url = "";
      this.editImageData.productIDs = "";
    },
  },
  computed: {
    getProductIds(image) {
      return image.productIds.length > 0 ? image.productIDs.join(", ") : "";
    },
  },
};
</script>

<style scoped></style>

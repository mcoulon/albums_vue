<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-3xl font-bold mb-6">
      {{ isEditing ? "Edit Album" : "Add Album" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="form.title"
          class="border p-3 w-1/3 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <div>
        <label for="artist_id" class="block text-sm font-medium text-gray-700"
          >Artist</label
        >
        <select
          id="artist_id"
          v-model="form.artist_id"
          class="border p-3 w-1/3 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="">Select an artist</option>
          <option v-for="artist in artists" :key="artist.id" :value="artist.id">
            {{ artist.name }}
          </option>
        </select>
        <p v-if="errors.artist_id" class="mt-1 text-sm text-red-600">
          {{ errors.artist_id }}
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <router-link
          to="/albums"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ isEditing ? "Update" : "Create" }}
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useAlbumsStore } from "../../stores/albums";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import ApiRequest from "../../services/api";

const store = useAlbumsStore();
const route = useRoute();
const router = useRouter();
const errors = ref({});
const { loading, artists } = storeToRefs(store);

const isEditing = computed(() => route.params.id);

const form = ref({
  title: "",
  artist_id: "",
});

onMounted(async () => {
  await store.fetchArtists();

  if (isEditing.value) {
    try {
      const response = await ApiRequest.get(`/albums/${route.params.id}`);
      form.value = response.data.data;
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
});

const handleSubmit = async () => {
  errors.value = {};
  try {
    if (isEditing.value) {
      await store.updateAlbum(route.params.id, form.value);
      router.push("/albums");
    } else {
      await store.addAlbum(form.value);
      router.push("/albums");
    }
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>

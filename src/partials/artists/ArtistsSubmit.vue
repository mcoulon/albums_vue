<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-3xl font-bold mb-6">
      {{ isEditing ? "Edit Artist" : "Add Artist" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="border p-3 w-1/3 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <div class="flex justify-end space-x-3">
        <router-link
          to="/artists"
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
import { useArtistsStore } from "../../stores/artists";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import ApiRequest from "../../services/api";

const store = useArtistsStore();
const route = useRoute();
const router = useRouter();
const errors = ref({});
const { loading } = storeToRefs(store);

const isEditing = computed(() => route.params.id);

const form = ref({
  name: "",
});

onMounted(async () => {
  if (isEditing.value) {
    try {
      const response = await ApiRequest.get(`/artists/${route.params.id}`);
      form.value = response.data.data;
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
});

const handleSubmit = async () => {
  errors.value = {};
  if (isEditing.value) {
    await store.updateArtist(route.params.id, form.value);
    router.push("/artists");
  } else {
    await store.addArtist(form.value);
    router.push("/artists");
  }
  try {
  } catch (error) {
    errors.value = error.response.data.errors;
  }
};
</script>

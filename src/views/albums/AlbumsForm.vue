<template>
  <div class="bg-gray-100 rounded-lg shadow p-6">
    <!-- <div v-if="isEditing">
    <h2>Edit Album</h2>
    </div>
    <div v-else>
      <h2>Add New Album</h2>
    </div> -->
    <AlbumsSubmit />
  </div>
</template>
<script setup>
import AlbumsSubmit from "../../partials/albums/AlbumsSubmit.vue";
import { ref, computed, onMounted } from "vue";
import { useAlbumsStore } from "../../stores/albums";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const store = useAlbumsStore();

const isEditing = computed(() => route.params.id);
</script>
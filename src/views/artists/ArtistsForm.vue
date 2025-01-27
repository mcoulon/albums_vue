<template>
  <div class="bg-gray-100 rounded-lg shadow p-6">
    <!-- <div v-if="isEditing"> -->
    <!-- <h2>Edit Artist</h2>
    </div>
    <div v-else>
      <h2>Add New Artist</h2>
    </div> -->
    <ArtistsSubmit />
  </div>
</template>
<script setup>
import ArtistsSubmit from "../../partials/artists/ArtistsSubmit.vue";
import { ref, computed, onMounted } from "vue";
import { useArtistsStore } from "../../stores/artists";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const store = useArtistsStore();

const isEditing = computed(() => route.params.id);
</script>

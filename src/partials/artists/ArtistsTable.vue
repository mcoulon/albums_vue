<template></template>
<script setup>
import { useArtistsStore } from "../../stores/artists";
import { ref } from "vue";

const artistsStore = useArtistsStore();

const artists = ref([]);
const loading = ref(false);

const fetchArtists = async () => {
  loading.value = true;
  try {
    await artistsStore.fetchArtists();
    artists.value = artistsStore.artists;
    console.log(artists.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

fetchArtists();
</script>

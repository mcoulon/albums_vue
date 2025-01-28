<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Albums</h1>
      <router-link
        to="/albums/new"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Album
      </router-link>
    </div>
    <AlbumsTable />
  </div>
</template>
<script setup>
import AlbumsTable from "../../partials/albums/AlbumsTable.vue";
</script>
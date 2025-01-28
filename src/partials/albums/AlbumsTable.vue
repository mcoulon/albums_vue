<template>
  <div v-if="loading" class="text-center py-4">
    <span class="text-gray-600">Loading...</span>
  </div>

  <div v-else-if="error" class="text-red-500 text-center py-4">
    {{ error }}
  </div>

  <div v-else>
    <div class="bg-white shadow-md rounded my-6">
      <table class="min-w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Title</th>
            <th class="py-3 px-6 text-left">Artist</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="album in albums"
            :key="album.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ album?.title }}
            </td>
            <td class="py-3 px-6 text-left whitespace-nowrap">
              {{ album?.artist?.name }}
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex item-center justify-center">
                <router-link
                  :to="`/albums/${album.id}/edit`"
                  class="text-blue-500 hover:text-blue-700 mx-2"
                >
                  Edit
                </router-link>
                <button
                  v-if="album.deleted_at"
                  @click="handleRestore(album.id)"
                  class="text-green-500 hover:text-green-700 mx-2"
                >
                  Restore
                </button>
                <button
                  v-else
                  @click="handleDelete(album.id)"
                  class="text-red-500 hover:text-red-700 mx-2"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Pagination
    :total-pages="store.meta.last_page || 1"
    :current-page="store.current_page"
    :per-page="store.per_page"
    @page-changed="onPageChange"
  />
</template>
<script setup>
import { useAlbumsStore } from "../../stores/albums";
import { ref, computed } from "vue";
import Pagination from "../../components/Pagination.vue";

const store = useAlbumsStore();

const loading = computed(() => store.loading);
const error = computed(() => store.error);
const albums = computed(() => store.albums);

const onPageChange = async (page) => {
  store.current_page = page;
  await store.fetchAlbums();
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this album?")) {
    await store.deleteAlbum(id);
  }
};

const handleRestore = async (id) => {
  if (confirm("Are you sure you want to restore this album?")) {
    await store.restoreAlbum(id);
  }
};

store.fetchAlbums();
</script>

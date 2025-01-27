<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <nav v-if="$route.meta.requiresAuth" class="bg-white shadow-lg">
      <div class="container mx-auto p-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-xl font-bold">Albums App</router-link>
          <div class="flex items-center space-x-4">
            <router-link to="/artists" class="hover:text-blue-600">Artists</router-link>
            <router-link to="/albums" class="hover:text-blue-600">Albums</router-link>
            <router-link to="/genres" class="hover:text-blue-600">Genres</router-link>
            <router-link to="/mediatypes" class="hover:text-blue-600">Media Types</router-link>
            <router-link to="/tracks" class="hover:text-blue-600">Tracks</router-link>
            <button @click="handleLogout" class="text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="flex-1 flex">
      <router-view class="w-full"></router-view>
    </main>
    <footer class="bg-white mt-auto">
      <div class="container mx-auto p-4 text-center">
        <p>&copy; 2024 Albums App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

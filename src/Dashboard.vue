<template>
  <div>
    <h1>Bonjour {{ userName }}</h1>
  </div>
</template>

<script setup>
const user = JSON.parse(localStorage.getItem("user"));
const userName = user.name;
</script>

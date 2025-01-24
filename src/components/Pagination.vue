<template>
  <div class="flex justify-center space-x-2 mt-4">
    <button
      @click="$emit('page-changed', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-4 py-2 rounded-lg"
      :class="
        currentPage <= 1
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      "
    >
      Previous
    </button>

    <div class="flex space-x-1">
      <template v-for="page in displayedPages" :key="page">
        <button
          v-if="page !== '...'"
          @click="$emit('page-changed', page)"
          class="px-4 py-2 rounded-lg"
          :class="
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          "
        >
          {{ page }}
        </button>
        <span v-else class="px-4 py-2">{{ page }}</span>
      </template>
    </div>

    <button
      @click="$emit('page-changed', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-4 py-2 rounded-lg"
      :class="
        currentPage >= totalPages
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      "
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
});

defineEmits(["page-changed"]);

const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;

  if (props.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (props.currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(props.totalPages);
    } else if (props.currentPage >= props.totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = props.totalPages - 3; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(props.totalPages);
    }
  }

  return pages;
});
</script>

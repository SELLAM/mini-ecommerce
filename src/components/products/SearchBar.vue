<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore';
import { ref, watch } from 'vue';

const productStore = useProductStore();
const searchQuery = ref('');

watch(searchQuery, (newQuery) => {
  productStore.setSearchQuery(newQuery);
});
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search products..."
      class="search-input"
    />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
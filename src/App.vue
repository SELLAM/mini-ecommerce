<script setup lang="ts">
import { ProductList } from '@/components/products';
</script>

<template>
    <div class="container">
      <header>
            <h1>Kata E-commerce</h1>
        </header>
      <ProductList id="product-list"/>
    </div>
</template>

<style scoped>
.container {
    position: relative;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f0f0f0;
    margin-bottom: 1rem;
}

h1 {
    margin: 0;
    font-size: 1.5rem;
}

.content-wrapper {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 20px;
}

</style>
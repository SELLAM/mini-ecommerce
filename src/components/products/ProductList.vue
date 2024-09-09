<script setup lang="ts">
import { useProductStore } from '@/stores/ProductStore';
import Product from '../../components/products/Product.vue';
import { onMounted } from 'vue';

const productStore = useProductStore()

onMounted(async () => {
    await productStore.load()
})
</script>

<template>
    <div class="product-list">
        <div v-if="productStore.isLoading" class="loading-spinner">
            <div class="spinner"></div>
        </div>
        <div v-else class="products">
            <div v-for="product in productStore.products" :key="product.id" class="product">
                <Product :product="product"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.product-list {
    flex: 4;
    position: relative;
    min-height: 200px;
}

.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}

.loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
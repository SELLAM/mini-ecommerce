<script setup lang="ts">
import type { IProduct } from '@/models';
import { useCartStore } from '@/stores';
import StarRating from './StarRating.vue';

const cartStore = useCartStore();
defineProps<{
    product: IProduct
}>();
</script>


<template>
    <div class="product">
        <div class="category">{{ product?.category }}</div>
        <img :src="product.image" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <StarRating :rating="product.rating?.rate" :count="product.rating?.count" />
        <p>$ {{ product.price.toFixed(2) }} </p>
        <button @click="cartStore.addProductToCart(product)" class="add-to-cart-btn">Add to Cart</button>
    </div>
</template>

<style scoped>
.category {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: #f0f0f0;
    color: #333;
    padding: 5px 10px;
    border-radius: 10px;
    font-size: 0.8em;
    text-transform: capitalize;
}
.rating-count {
    font-size: 0.8em;
    color: #666;
    margin-top: 5px;
}
.product {
    position: relative;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 400px;
}

.product:hover {
    transform: translateY(-5px);
}

.product img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
    margin-bottom: 15px;
}

.product h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
    height: 60px; /* Fixed height for title */
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 2;/* Limit to 2 lines */
    -webkit-line-clamp: 2; /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    line-height: 1.5em;
}

.product p {
    font-weight: bold;
    color: #4CAF50;
    margin-top: auto; /* Push price to bottom */
    margin-bottom: 15px;
}

.add-to-cart-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
    background-color: #45a049;
}
</style>

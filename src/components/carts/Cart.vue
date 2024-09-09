<script setup lang="ts">
import { useCartStore } from '@/stores';

const cartStore = useCartStore();
cartStore.loadCart()

</script>

<template>
    <div class="cart">
        <h2>Shopping Cart</h2>
        <div v-if="cartStore.cart.length === 0">Your cart is empty</div>
        <div v-else>
            <div v-for="product in cartStore.cart" :key="product.id" class="cart-item">
                <img :src="product.image" :alt="product.title" />
                <div class="item-details">
                    <div class="item-info">
                        <h3 class="item-title">{{ product.title }}</h3>
                        <p class="item-price">$ {{ product.price.toFixed(2) }}</p>
                    </div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button 
                                @click="cartStore.decrementQuantity(product)" 
                                class="quantity-btn minus"
                                :disabled="product.quantity <= 1"
                            >-</button>
                            <input 
                                type="number" 
                                :value="product.quantity" 
                                min="1" 
                                @input="cartStore.updateQuantity(product, product.quantity)"
                                class="quantity-input"
                            />
                            <button @click="cartStore.incrementQuantity(product)" class="quantity-btn plus">+</button>
                        </div>
                        <button @click="cartStore.removeFromCart(product)" class="remove-btn">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span class="total-amount">$ {{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>
                <button class="checkout-btn">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cart {
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-width: 100%;
    margin: 0 auto;
}

.cart h2 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.cart-item {
    display: flex;
    align-items: flex-start;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.cart-item img {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-right: 15px;
}

.item-details {
    flex-grow: 1;
}

.item-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
}

.item-title {
    font-size: 1.1em;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    line-height: 1.3;
    flex: 1;
    padding-right: 10px;
}

.item-price {
    font-size: 1.2em;
    font-weight: 700;
    color: #3498db;
    margin: 0;
    white-space: nowrap;
}

.cart-item input {
    width: 50px;
    padding: 5px;
    margin-right: 10px;
}

.cart-item button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.2em;
    color: #333;
}

.total-amount {
    font-weight: bold;
    color: #2c3e50;
}

.checkout-btn {
    width: 100%;
    padding: 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cart-footer {
    margin-top: 20px;
    padding-top: 20px;
}

.checkout-btn:hover:not(:disabled) {
    background-color: #2980b9;
}

.quantity-control {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.quantity-input {
    width: 40px;
    height: 30px;
    text-align: center;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 5px;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, opacity 0.3s;
}

.quantity-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.quantity-btn.minus {
    background-color: #e74c3c;
    color: white;
}

.quantity-btn.plus {
    background-color: #2ecc71;
    color: white;
}

</style>
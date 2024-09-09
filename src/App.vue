<script setup lang="ts">
import { Cart, ProductList } from './components';

</script>

<template>
  <div class="container">
      <input type="checkbox" id="cart-toggle" class="cart-toggle">
      <header>
          <h1>Mini E-commerce</h1>
          <label for="cart-toggle" class="cart-toggle-btn">
              <span class="show-cart-text">Show Cart</span>
              <span class="hide-cart-text">< Back</span>
          </label>
      </header>
      <div class="content-wrapper">
          <ProductList id="product-list"/>
          <Cart id="cart" />
      </div>
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

.cart-toggle {
    display: none;
}

.cart-toggle-btn {
    display: none;
    bottom: 20px;
    right: 20px;
    z-index: 1001;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

.cart-toggle-btn .hide-cart-text {
    display: none;
}

@media (max-width: 767px) {
    .content-wrapper {
        display: block;
    }

    .cart-toggle-btn {
        display: inline; 
    }

    #cart{
        display: none;
    }

    .cart-toggle:checked~.content-wrapper #product-list {
        display: none;
    }

    .cart-toggle:checked~.content-wrapper #cart {
        display: block;
    }

    .cart-toggle:checked~header .cart-toggle-btn .show-cart-text {
        display: none;
    }

    .cart-toggle:checked~header .cart-toggle-btn .hide-cart-text {
        display: inline;
    }
}
</style>
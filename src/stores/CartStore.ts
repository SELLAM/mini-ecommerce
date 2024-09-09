import type { IProduct } from "@/models";
import { defineStore } from "pinia";

interface CartState {
    cart: CartItem[];
}

interface CartItem extends IProduct {
    quantity: number;
}
 

const STORE_NAME = 'cart'

export const useCartStore = defineStore(STORE_NAME, {

    state: (): CartState => ({
        cart: []
    }),
    actions: {
        updateQuantity(product: CartItem, quantity: number) {
            const existingProduct = this.cart.find(p => p.id === product.id);
            if (existingProduct) {
                existingProduct.quantity = quantity;
                this.saveCart();
            }
        },
        addToCart(product: CartItem) {
            const existingProduct = this.cart.find(p => p.id === product.id);
            if (existingProduct) {
                this.incrementQuantity(existingProduct);
            } else {
                this.cart.push({ ...product, quantity: 1 });
                this.saveCart();
            }
        },
        addProductToCart(product: IProduct) {
            this.addToCart({ ...product, quantity: 1 });
        },
        incrementQuantity(product: CartItem) {
           this.updateQuantity(product, product.quantity + 1);
        },  
        decrementQuantity(product: CartItem) {
           this.updateQuantity(product, product.quantity - 1);
        },
        removeFromCart(product: CartItem) {
            this.cart = this.cart.filter(p => p.id !== product.id);
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        loadCart() {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
            }
        }
    },
    getters: {
        totalPrice: (state) => state.cart.reduce((total, product) => total + product.price * product.quantity, 0),
        totalItems: (state) => state.cart.reduce((total, product) => total + product.quantity, 0),
    }
})

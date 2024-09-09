import type { IProduct } from "@/models";
import { defineStore } from "pinia";

interface ProductState {
    products: IProduct[];
    error: Error | null;
    filter: string;
    isLoading: boolean; // Add this line
}

const STORE_NAME = 'product'

export const useProductStore = defineStore(STORE_NAME, {

    state: (): ProductState => ({
        products: [],
        error: null,
        filter: '',
        isLoading: false, // Add this line
    }),

    actions: {
        async load() {
            this.isLoading = true; // Set to true when starting to load
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                this.products = await response.json();
            } catch (error) {
                this.error = error as Error;
                console.error('Error loading products:', error);
            } finally {
                this.isLoading = false; // Set to false when done, regardless of success or failure
            }
        },

        // ... other actions ...
    },
})


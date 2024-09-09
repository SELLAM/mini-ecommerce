import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCartStore } from '../CartStore'

describe('CartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.spyOn(Storage.prototype, 'setItem')
    vi.spyOn(Storage.prototype, 'getItem')
  })

  it('initializes with an empty cart', () => {
    const store = useCartStore()
    expect(store.cart).toEqual([])
  })

  it('adds a product to the cart', () => {
    const store = useCartStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    store.addProductToCart(product)
    expect(store.cart).toHaveLength(1)
    expect(store.cart[0]).toEqual({ ...product, quantity: 1 })
  })

  it('updates quantity of existing product', () => {
    const store = useCartStore()
    const product = { id: 1, title: 'Test Product', price: 10, quantity: 1 }
    store.addToCart(product)
    store.incrementQuantity(product)
    expect(store.cart[0].quantity).toBe(2)
  })

  it('removes product from cart', () => {
    const store = useCartStore()
    const product = { id: 1, title: 'Test Product', price: 10, quantity: 1 }
    store.addToCart(product)
    store.removeFromCart(product)
    expect(store.cart).toHaveLength(0)
  })

  it('calculates total price correctly', () => {
    const store = useCartStore()
    store.addToCart({ id: 1, title: 'Product 1', price: 10, quantity: 2 })
    store.addToCart({ id: 2, title: 'Product 2', price: 20, quantity: 1 })
    console.log(store.totalPrice);
    
    expect(store.totalPrice).toBe(40)
  })

  it('calculates total items correctly', () => {
    const store = useCartStore()
    store.addToCart({ id: 1, title: 'Product 1', price: 10, quantity: 2 })
    store.addToCart({ id: 2, title: 'Product 2', price: 20, quantity: 1 })
    expect(store.totalItems).toBe(3)
  })

  it('saves cart to localStorage', () => {
    const store = useCartStore()
    const product = { id: 1, title: 'Test Product', price: 10, quantity: 1 }
    store.addToCart(product)
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([product]))
  })

  it('loads cart from localStorage', () => {
    const savedCart = [{ id: 1, title: 'Test Product', price: 10, quantity: 1 }]
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(savedCart))
    const store = useCartStore()
    store.loadCart()
    expect(store.cart).toEqual(savedCart)
  })
})
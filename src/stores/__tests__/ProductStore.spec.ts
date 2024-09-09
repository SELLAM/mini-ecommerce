import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '../ProductStore'
import { beforeEach, describe, it, expect, vi } from 'vitest'

describe('ProductStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with correct default state', () => {
    const store = useProductStore()
    expect(store.products).toEqual([])
    expect(store.error).toBeNull()
    expect(store.filter).toBe('')
    expect(store.isLoading).toBe(false)
  })

  it('loads products successfully', async () => {
    const store = useProductStore()
    const mockProducts = [{ id: 1, title: 'Test Product', price: 100 }]
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })

    await store.load()

    expect(store.products).toEqual(mockProducts)
    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('handles load error', async () => {
    const store = useProductStore()
    const errorMessage = 'Failed to fetch products'
    
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
    })

    await store.load()

    expect(store.products).toEqual([])
    expect(store.error).toBeInstanceOf(Error)
    expect(store.error?.message).toBe(errorMessage)
    expect(store.isLoading).toBe(false)
  })
})
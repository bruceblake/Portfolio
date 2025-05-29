import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.scrollTo
global.scrollTo = vi.fn()

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}
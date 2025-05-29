import { describe, it, expect, beforeEach } from 'vitest'
import { ragSystem } from './ragSystem'

describe('RAG System', () => {
  describe('Initialization', () => {
    it('should initialize with chunks', () => {
      expect(ragSystem.initialized).toBe(true)
      expect(ragSystem.chunks).toBeDefined()
      expect(ragSystem.chunks.length).toBeGreaterThan(0)
    })

    it('should have all expected chunk categories', () => {
      const categories = [...new Set(ragSystem.chunks.map(c => c.category))]
      expect(categories).toContain('personal')
      expect(categories).toContain('summary')
      expect(categories).toContain('education')
      expect(categories).toContain('experience')
      expect(categories).toContain('accomplishment')
      expect(categories).toContain('project')
      expect(categories).toContain('skills')
    })
  })

  describe('Search Functionality', () => {
    it('should return a response for empty query', () => {
      const response = ragSystem.search('')
      expect(response).toContain('Please ask a question')
    })

    it('should find information about Google experience', () => {
      const queries = [
        'Tell me about Google experience',
        'What did Bruce do at Google?',
        'google internship',
        'STEP intern'
      ]
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response.toLowerCase()).toContain('google')
        expect(response).toMatch(/STEP|Play Books|Buganizer/i)
      })
    })

    it('should find contact information', () => {
      const queries = ['contact', 'email', 'phone', 'reach Bruce']
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response).toContain('bruceiiiblake@gmail.com')
        expect(response).toContain('571-393-5615')
      })
    })

    it('should find education information', () => {
      const queries = ['education', 'Virginia Tech', 'GPA', 'degree']
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response.toLowerCase()).toContain('virginia tech')
        expect(response).toContain('Computer Engineering')
        expect(response).toContain('3.85')
      })
    })

    it('should find project information', () => {
      const queries = ['projects', 'built', '3D engine', 'physics engine']
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response.toLowerCase()).toContain('project')
      })
    })

    it('should find skills information', () => {
      const queries = ['programming languages', 'skills', 'Python', 'Java']
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response.toLowerCase()).toContain('skill')
        expect(response).toMatch(/Python|Java|TypeScript/i)
      })
    })

    it('should find freelance work information', () => {
      const response = ragSystem.search('Red Bar Sushi')
      expect(response).toContain('Red Bar Sushi')
      expect(response).toContain('AI')
      expect(response).toMatch(/voice|ordering/i)
    })

    it('should handle queries with no matches gracefully', () => {
      const response = ragSystem.search('completely unrelated nonsense query xyz123')
      expect(response).toBeTruthy()
      expect(response).not.toContain('undefined')
      expect(response).not.toContain('null')
    })
  })

  describe('Response Quality', () => {
    it('should return detailed responses for experience queries', () => {
      const response = ragSystem.search('Tell me about all of Bruce\'s experience')
      expect(response.length).toBeGreaterThan(100)
      expect(response).toContain('Google')
      expect(response).toContain('Red Bar Sushi')
    })

    it('should handle case-insensitive queries', () => {
      const response1 = ragSystem.search('GOOGLE EXPERIENCE')
      const response2 = ragSystem.search('google experience')
      const response3 = ragSystem.search('Google Experience')
      
      // All should find Google-related content
      expect(response1).toContain('Google')
      expect(response2).toContain('Google')
      expect(response3).toContain('Google')
    })

    it('should prioritize relevant content', () => {
      const response = ragSystem.search('Google internship responsibilities')
      expect(response).toContain('Google')
      expect(response).toMatch(/responsibilities|created|developed|streamlined/i)
    })
  })

  describe('Typing Delay', () => {
    it('should calculate appropriate typing delays', () => {
      const shortResponse = 'Short response'
      const longResponse = 'This is a much longer response that contains a lot more information about various topics and should have a longer typing delay'
      
      const shortDelay = ragSystem.getTypingDelay(shortResponse)
      const longDelay = ragSystem.getTypingDelay(longResponse)
      
      expect(shortDelay).toBeGreaterThan(0)
      expect(longDelay).toBeGreaterThan(shortDelay)
      expect(longDelay).toBeLessThanOrEqual(1500) // Max delay
    })
  })

  describe('Edge Cases', () => {
    it('should handle special characters in queries', () => {
      const queries = [
        'What\'s Bruce\'s experience?',
        'Bruce@email.com',
        'C++ programming',
        'Full-stack development'
      ]
      
      queries.forEach(query => {
        const response = ragSystem.search(query)
        expect(response).toBeTruthy()
        expect(response.length).toBeGreaterThan(0)
      })
    })

    it('should handle very long queries', () => {
      const longQuery = 'Tell me everything about Bruce Blake including his experience at Google, his projects, his education at Virginia Tech, his skills in programming, and any other relevant information you might have'
      const response = ragSystem.search(longQuery)
      expect(response).toBeTruthy()
      expect(response.length).toBeGreaterThan(0)
    })
  })
})
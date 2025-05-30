import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
  isAlive: boolean
  neighbors: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles in a grid pattern
    const gridSize = 40
    const cols = Math.ceil(canvas.width / gridSize)
    const rows = Math.ceil(canvas.height / gridSize)
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.7) { // 30% chance of being alive initially
          particlesRef.current.push({
            x: i * gridSize + gridSize / 2,
            y: j * gridSize + gridSize / 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: '#8b5cf6',
            life: 1,
            maxLife: 1,
            isAlive: true,
            neighbors: 0
          })
        }
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Conway's Game of Life rules
    const updateGameOfLife = () => {
      const particles = particlesRef.current
      const gridMap = new Map<string, Particle>()
      
      // Create grid map for neighbor checking
      particles.forEach(p => {
        if (p.isAlive) {
          const gridX = Math.floor(p.x / gridSize)
          const gridY = Math.floor(p.y / gridSize)
          gridMap.set(`${gridX},${gridY}`, p)
        }
      })

      // Count neighbors for each particle
      particles.forEach(p => {
        if (!p.isAlive) return
        
        const gridX = Math.floor(p.x / gridSize)
        const gridY = Math.floor(p.y / gridSize)
        let neighbors = 0

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue
            if (gridMap.has(`${gridX + dx},${gridY + dy}`)) {
              neighbors++
            }
          }
        }
        p.neighbors = neighbors
      })

      // Apply rules
      particles.forEach(p => {
        if (p.isAlive) {
          // Any live cell with 2-3 neighbors survives
          if (p.neighbors < 2 || p.neighbors > 3) {
            p.life -= 0.02
            if (p.life <= 0) {
              p.isAlive = false
            }
          } else {
            p.life = Math.min(p.life + 0.02, 1)
          }
        }
      })

      // Birth new cells
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const key = `${i},${j}`
          if (!gridMap.has(key)) {
            let neighbors = 0
            for (let dx = -1; dx <= 1; dx++) {
              for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                if (gridMap.has(`${i + dx},${j + dy}`)) {
                  neighbors++
                }
              }
            }
            
            if (neighbors === 3 && Math.random() > 0.8) {
              particles.push({
                x: i * gridSize + gridSize / 2,
                y: j * gridSize + gridSize / 2,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: '#8b5cf6',
                life: 0,
                maxLife: 1,
                isAlive: true,
                neighbors: 0
              })
            }
          }
        }
      }

      // Remove dead particles
      particlesRef.current = particles.filter(p => p.isAlive || p.life > 0)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update Game of Life every few frames
      if (Math.random() > 0.9) {
        updateGameOfLife()
      }

      particlesRef.current.forEach(particle => {
        // Update position with slight movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1
          particle.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)` // Blue to purple range
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1
          particle.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Repel from mouse
          const force = (100 - distance) / 100
          particle.vx -= (dx / distance) * force * 0.5
          particle.vy -= (dy / distance) * force * 0.5
          
          // Change color based on proximity
          const hue = 280 - (distance / 100) * 60 // Purple to pink
          particle.color = `hsl(${hue}, 70%, 60%)`
          particle.size = Math.min(particle.size + 0.1, 6)
        } else {
          // Gradually return to normal
          particle.size = Math.max(particle.size - 0.05, 1)
          particle.vx *= 0.99
          particle.vy *= 0.99
        }

        // Draw particle
        ctx.globalAlpha = particle.life * 0.8
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw connections to nearby particles
        particlesRef.current.forEach(other => {
          if (particle === other) return
          const dx = other.x - particle.x
          const dy = other.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80 && particle.isAlive && other.isAlive) {
            ctx.globalAlpha = (1 - distance / 80) * 0.3 * particle.life * other.life
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ 
        opacity: 0.6,
        pointerEvents: 'none'
      }}
    />
  )
}
"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number
  preventDefault?: boolean
}

export function useSwipe(handlers: SwipeHandlers = {}, options: SwipeOptions = {}) {
  const { threshold = 50, preventDefault = true } = options
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any existing timer
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Handle touch start
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      clearTimer()

      const touch = e.touches[0]
      setTouchStart({ x: touch.clientX, y: touch.clientY })
      setTouchEnd(null)

      if (preventDefault) {
        e.preventDefault()
      }
    },
    [clearTimer, preventDefault],
  )

  // Handle touch move
  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      setTouchEnd({ x: touch.clientX, y: touch.clientY })

      if (preventDefault) {
        e.preventDefault()
      }
    },
    [preventDefault],
  )

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (isHorizontalSwipe) {
      if (distanceX > threshold && handlers.onSwipeLeft) {
        handlers.onSwipeLeft()
      } else if (distanceX < -threshold && handlers.onSwipeRight) {
        handlers.onSwipeRight()
      }
    } else {
      if (distanceY > threshold && handlers.onSwipeUp) {
        handlers.onSwipeUp()
      } else if (distanceY < -threshold && handlers.onSwipeDown) {
        handlers.onSwipeDown()
      }
    }

    // Reset after processing
    timerRef.current = setTimeout(() => {
      setTouchStart(null)
      setTouchEnd(null)
    }, 300)
  }, [touchStart, touchEnd, threshold, handlers])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}

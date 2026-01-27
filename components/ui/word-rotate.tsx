"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
  inline?: boolean
}

export function WordRotate({
  words,
  duration = 2500,
  motionProps,
  className,
  inline = false,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  // Different animation for inline vs block mode
  const defaultMotionProps: MotionProps = inline
    ? {
        // For inline: use opacity only to avoid vertical jumping
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3, ease: "easeOut" },
      }
    : {
        // For block: use vertical slide animation
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.25, ease: "easeOut" },
      }

  const activeMotionProps = motionProps || defaultMotionProps

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  const Wrapper = inline ? "span" : "div"

  return (
    <Wrapper className={cn(inline ? "inline" : "pt-2 pb-4")}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn(inline ? "inline" : "block", className)}
          {...activeMotionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </Wrapper>
  )
}

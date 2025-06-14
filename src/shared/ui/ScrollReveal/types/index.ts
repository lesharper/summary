import { ReactNode, RefObject } from 'react'

export interface ScrollRevealProps {
    children: ReactNode
    scrollContainerRef?: RefObject<HTMLElement>
    enableBlur?: boolean
    baseOpacity?: number
    baseRotation?: number
    blurStrength?: number
    containerClassName?: string
    textClassName?: string
    rotationEnd?: string
    wordAnimationEnd?: string
}

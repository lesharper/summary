'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ScrollFloatProps } from '@/shared/ui/ScrollFloat/types'
import styles from './ScrollFloat.module.css'
import { getClassName } from '@/shared/helpers/getClassNames'

gsap.registerPlugin(ScrollTrigger)

const defaultEase = 'back.inOut(2)'
const defaultScrollStart = 'center bottom+=50%'
const defaultScrollEnd = 'bottom bottom-=40%'
const defaultStagger = 0.03

export const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    animationDuration = 1,
    ease = defaultEase,
    scrollStart = defaultScrollStart,
    scrollEnd = defaultScrollEnd,
    stagger = defaultStagger,
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null)

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : ''
        return text.split('').map((char, index) => (
            <span
                id="char"
                className={styles.char}
                key={index}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ))
    }, [children])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const scroller =
            scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

        const charElements = el.querySelectorAll('#char')

        gsap.fromTo(
            charElements,
            {
                willChange: 'opacity, transform',
                opacity: 0,
                yPercent: 120,
                scaleY: 2.3,
                scaleX: 0.7,
                transformOrigin: '50% 0%',
            },
            {
                duration: animationDuration,
                ease: ease,
                opacity: 1,
                yPercent: 0,
                scaleY: 1,
                scaleX: 1,
                stagger: stagger,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: scrollStart,
                    end: scrollEnd,
                    scrub: true,
                },
            },
        )
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger])

    return (
        <h2
            ref={containerRef}
            className={getClassName(styles.scroll_float, containerClassName)}
        >
            <span className={getClassName(styles.scroll_float_text, textClassName)}>
                {splitText}
            </span>
        </h2>
    )
}

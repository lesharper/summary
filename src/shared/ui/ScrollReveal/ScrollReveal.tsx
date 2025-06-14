'use client'

import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ScrollReveal.module.css'
import { ScrollRevealProps } from '@/shared/ui/ScrollReveal/types'
import { getClassName } from '@/shared/helpers/getClassNames'

gsap.registerPlugin(ScrollTrigger)

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    scrollContainerRef,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom',
}) => {
    const containerRef = useRef<HTMLHeadingElement>(null)

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : ''
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word
            return (
                <span
                    id="word"
                    className={styles.word}
                    key={index}
                >
                    {word}
                </span>
            )
        })
    }, [children])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const scroller =
            scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window

        gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom',
                    end: rotationEnd,
                    scrub: true,
                },
            },
        )

        const wordElements = el.querySelectorAll<HTMLElement>('#word')

        gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: wordAnimationEnd,
                    scrub: true,
                },
            },
        )

        if (enableBlur) {
            gsap.fromTo(
                wordElements,
                { filter: `blur(${blurStrength}px)` },
                {
                    ease: 'none',
                    filter: 'blur(0px)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: true,
                    },
                },
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [
        scrollContainerRef,
        enableBlur,
        baseRotation,
        baseOpacity,
        rotationEnd,
        wordAnimationEnd,
        blurStrength,
    ])

    return (
        <h2
            ref={containerRef}
            className={getClassName(styles.scroll_reveal, containerClassName)}
        >
            <p className={getClassName(styles.scroll_reveal_text, textClassName)}>{splitText}</p>
        </h2>
    )
}

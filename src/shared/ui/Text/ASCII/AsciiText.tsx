'use client'

import { useRef, useEffect } from 'react'
import type { ASCIITextProps } from './types'
import { CanvAscii } from '@/shared/ui/Text/ASCII/model/CanvasAscii'
import styles from './AsciiText.module.css'

export const ASCIIText = ({
    text = 'David!',
    asciiFontSize = 8,
    textFontSize = 200,
    textColor = '#fdf9f3',
    planeBaseHeight = 8,
    enableWaves = true,
}: ASCIITextProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const asciiRef = useRef<CanvAscii | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const { width, height } = containerRef.current.getBoundingClientRect()

        asciiRef.current = new CanvAscii(
            { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
            containerRef.current,
            width,
            height,
        )
        asciiRef.current.load()

        const ro = new ResizeObserver(entries => {
            if (!entries[0]) return
            const { width: w, height: h } = entries[0].contentRect
            asciiRef.current?.setSize(w, h)
        })
        ro.observe(containerRef.current)

        return () => {
            ro.disconnect()
            asciiRef.current?.dispose()
        }
    }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves])

    return (
        <div
            ref={containerRef}
            className={styles.container}
        />
    )
}

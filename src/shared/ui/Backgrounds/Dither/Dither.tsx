'use client'

import { Canvas } from '@react-three/fiber'
import styles from './Dither.module.css'
import { DitherProps } from '@/shared/ui/Backgrounds/Dither/types'
import { DitheredWaves } from '@/shared/ui/Backgrounds/Dither/components/DitheredWaves'
import { useEffect, useState } from 'react'
import { useIsClient } from 'usehooks-ts'
import { getClassName } from '@/shared/helpers/getClassNames'

export const Dither = ({
    waveSpeed = 0.05,
    waveFrequency = 3,
    waveAmplitude = 0.3,
    waveColor = [0.5, 0.5, 0.5],
    colorNum = 4,
    pixelSize = 2,
    disableAnimation = false,
    enableMouseInteraction = true,
    mouseRadius = 1,
}: DitherProps) => {
    const isClient = useIsClient()

    if (!isClient) return <div className={getClassName(styles.placeholder)}>aaa</div>

    return (
        <Canvas
            className={styles.container}
            camera={{ position: [0, 0, 6] }}
            dpr={window.devicePixelRatio}
            gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
            <DitheredWaves
                waveSpeed={waveSpeed}
                waveFrequency={waveFrequency}
                waveAmplitude={waveAmplitude}
                waveColor={waveColor}
                colorNum={colorNum}
                pixelSize={pixelSize}
                disableAnimation={disableAnimation}
                enableMouseInteraction={enableMouseInteraction}
                mouseRadius={mouseRadius}
            />
        </Canvas>
    )
}

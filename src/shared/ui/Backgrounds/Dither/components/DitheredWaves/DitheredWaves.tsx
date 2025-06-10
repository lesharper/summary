import { DitheredWavesProps, WaveUniforms } from '@/shared/ui/Backgrounds/Dither/types'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { waveFragmentShader, waveVertexShader } from '@/shared/ui/Backgrounds/Dither/shaders'
import { EffectComposer, wrapEffect } from '@react-three/postprocessing'
import { RetroEffect } from '@/shared/ui/Backgrounds/Dither/components/DitheredWaves/effects'

export const DitheredWaves = ({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
}: DitheredWavesProps) => {
    const mesh = useRef<THREE.Mesh>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })
    const { viewport, size, gl } = useThree()

    const waveUniformsRef = useRef<WaveUniforms>({
        time: new THREE.Uniform(0),
        resolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
        waveSpeed: new THREE.Uniform(waveSpeed),
        waveFrequency: new THREE.Uniform(waveFrequency),
        waveAmplitude: new THREE.Uniform(waveAmplitude),
        waveColor: new THREE.Uniform(new THREE.Color(...waveColor)),
        mousePos: new THREE.Uniform(new THREE.Vector2(0, 0)),
        enableMouseInteraction: new THREE.Uniform(enableMouseInteraction ? 1 : 0),
        mouseRadius: new THREE.Uniform(mouseRadius),
    })

    useEffect(() => {
        const dpr = gl.getPixelRatio()
        const newWidth = Math.floor(size.width * dpr)
        const newHeight = Math.floor(size.height * dpr)
        const currentRes = waveUniformsRef.current.resolution.value
        if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
            currentRes.set(newWidth, newHeight)
        }
    }, [size, gl])

    useFrame(({ clock }) => {
        if (!disableAnimation) {
            waveUniformsRef.current.time.value = clock.getElapsedTime()
        }
        waveUniformsRef.current.waveSpeed.value = waveSpeed
        waveUniformsRef.current.waveFrequency.value = waveFrequency
        waveUniformsRef.current.waveAmplitude.value = waveAmplitude
        waveUniformsRef.current.waveColor.value.set(...waveColor)
        waveUniformsRef.current.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0
        waveUniformsRef.current.mouseRadius.value = mouseRadius
        if (enableMouseInteraction) {
            waveUniformsRef.current.mousePos.value.set(mousePos.x, mousePos.y)
        }
    })

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!enableMouseInteraction) return
        const rect = gl.domElement.getBoundingClientRect()
        const dpr = gl.getPixelRatio()
        const x = (e.clientX - rect.left) * dpr
        const y = (e.clientY - rect.top) * dpr
        setMousePos({ x, y })
    }

    return (
        <>
            <mesh
                ref={mesh}
                scale={[viewport.width, viewport.height, 1]}
            >
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    vertexShader={waveVertexShader}
                    fragmentShader={waveFragmentShader}
                    uniforms={waveUniformsRef.current}
                />
            </mesh>

            <EffectComposer>
                <RetroEffect
                    colorNum={colorNum}
                    pixelSize={pixelSize}
                />
            </EffectComposer>

            <mesh
                onPointerMove={handlePointerMove}
                position={[0, 0, 0.01]}
                scale={[viewport.width, viewport.height, 1]}
                visible={false}
            >
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial
                    transparent
                    opacity={0}
                />
            </mesh>
        </>
    )
}

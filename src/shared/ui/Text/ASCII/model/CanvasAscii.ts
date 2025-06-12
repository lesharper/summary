import * as THREE from 'three'
import type { CanvAsciiOptions } from '@/shared/ui/Text/ASCII/types'
import { fragmentShader, vertexShader } from '@/shared/ui/Text/ASCII/shaders'
import { CanvasTxt } from '@/shared/ui/Text/ASCII/model/CanvasTxt'
import { AsciiFilter } from '@/shared/ui/Text/ASCII/model/AsciiFilter'

function map(n: number, start: number, stop: number, start2: number, stop2: number) {
    return ((n - start) / (stop - start)) * (stop2 - start2) + start2
}

export class CanvAscii {
    textString: string
    asciiFontSize: number
    textFontSize: number
    textColor: string
    planeBaseHeight: number
    container: HTMLElement
    width: number
    height: number
    enableWaves: boolean
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    mouse: { x: number; y: number }
    textCanvas!: CanvasTxt
    texture!: THREE.CanvasTexture
    geometry: THREE.PlaneGeometry | undefined
    material: THREE.ShaderMaterial | undefined
    mesh!: THREE.Mesh
    renderer!: THREE.WebGLRenderer
    filter!: AsciiFilter
    center: { x: number; y: number } = { x: 0, y: 0 }
    animationFrameId: number = 0

    constructor(
        {
            text,
            asciiFontSize,
            textFontSize,
            textColor,
            planeBaseHeight,
            enableWaves,
        }: CanvAsciiOptions,
        containerElem: HTMLElement,
        width: number,
        height: number,
    ) {
        this.textString = text
        this.asciiFontSize = asciiFontSize
        this.textFontSize = textFontSize
        this.textColor = textColor
        this.planeBaseHeight = planeBaseHeight
        this.container = containerElem
        this.width = width
        this.height = height
        this.enableWaves = enableWaves

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000)
        this.camera.position.z = 30

        this.scene = new THREE.Scene()
        this.mouse = { x: 0, y: 0 }

        this.onMouseMove = this.onMouseMove.bind(this)

        this.setMesh()
        this.setRenderer()
    }

    setMesh() {
        this.textCanvas = new CanvasTxt(this.textString, {
            fontSize: this.textFontSize,
            fontFamily: 'IBM Plex Mono',
            color: this.textColor,
        })
        this.textCanvas.resize()
        this.textCanvas.render()

        this.texture = new THREE.CanvasTexture(this.textCanvas.texture)
        this.texture.minFilter = THREE.NearestFilter

        const textAspect = this.textCanvas.width / this.textCanvas.height
        const baseH = this.planeBaseHeight
        const planeW = baseH * textAspect
        const planeH = baseH

        this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36)
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                mouse: { value: 1.0 },
                uTexture: { value: this.texture },
                uEnableWaves: { value: this.enableWaves ? 0.5 : 0.0 },
            },
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
        this.renderer.setPixelRatio(1)
        this.renderer.setClearColor(0x000000, 0)

        this.filter = new AsciiFilter(this.renderer, {
            fontFamily: 'IBM Plex Mono',
            fontSize: this.asciiFontSize,
            invert: true,
        })

        this.container.appendChild(this.filter.domElement)
        this.setSize(this.width, this.height)

        this.container.addEventListener('mousemove', this.onMouseMove)
        this.container.addEventListener('touchmove', this.onMouseMove)
    }

    setSize(w: number, h: number) {
        this.width = w
        this.height = h

        this.camera.aspect = w / h
        this.camera.updateProjectionMatrix()

        this.filter.setSize(w, h)

        this.center = { x: w / 2, y: h / 2 }
    }

    load() {
        this.animate()
    }

    onMouseMove(evt: MouseEvent | TouchEvent) {
        const e = (evt as TouchEvent).touches ? (evt as TouchEvent).touches[0] : (evt as MouseEvent)
        const bounds = this.container.getBoundingClientRect()
        const x = e.clientX - bounds.left
        const y = e.clientY - bounds.top
        this.mouse = { x, y }
    }

    animate() {
        const animateFrame = () => {
            this.animationFrameId = requestAnimationFrame(animateFrame)
            this.render()
        }
        animateFrame()
    }

    render() {
        const time = new Date().getTime() * 0.001

        this.textCanvas.render()
        this.texture.needsUpdate = true
        ;(this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = Math.sin(time)

        this.updateRotation()
        this.filter.render(this.scene, this.camera)
    }

    updateRotation() {
        const x = map(this.mouse.y, 0, this.height, 0.5, -0.5)
        const y = map(this.mouse.x, 0, this.width, -0.5, 0.5)

        this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05
        this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05
    }

    clear() {
        this.scene.traverse(object => {
            const obj = object as unknown as THREE.Mesh
            if (!obj.isMesh) return
            ;[obj.material].flat().forEach(material => {
                material.dispose()
                Object.keys(material).forEach(key => {
                    const matProp = material[key as keyof typeof material]
                    if (
                        matProp &&
                        typeof matProp === 'object' &&
                        'dispose' in matProp &&
                        typeof matProp.dispose === 'function'
                    ) {
                        matProp.dispose()
                    }
                })
            })
            obj.geometry.dispose()
        })
        this.scene.clear()
    }

    dispose() {
        cancelAnimationFrame(this.animationFrameId)
        this.filter.dispose()
        this.container.removeChild(this.filter.domElement)
        this.container.removeEventListener('mousemove', this.onMouseMove)
        this.container.removeEventListener('touchmove', this.onMouseMove)
        this.clear()
        this.renderer.dispose()
    }
}

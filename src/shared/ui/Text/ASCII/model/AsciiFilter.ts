import * as THREE from 'three'
import type { AsciiFilterOptions } from '@/shared/ui/Text/ASCII/types'
import { PX_RATIO } from '@/shared/ui/Text/ASCII/constants'

export class AsciiFilter {
    renderer!: THREE.WebGLRenderer
    domElement: HTMLDivElement
    pre: HTMLPreElement
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D | null
    deg: number
    invert: boolean
    fontSize: number
    fontFamily: string
    charset: string
    width: number = 0
    height: number = 0
    center: { x: number; y: number } = { x: 0, y: 0 }
    mouse: { x: number; y: number } = { x: 0, y: 0 }
    cols: number = 0
    rows: number = 0

    constructor(
        renderer: THREE.WebGLRenderer,
        { fontSize, fontFamily, charset, invert }: AsciiFilterOptions = {},
    ) {
        this.renderer = renderer
        this.domElement = document.createElement('div')
        this.domElement.style.position = 'absolute'
        this.domElement.style.top = '0'
        this.domElement.style.left = '0'
        this.domElement.style.width = '100%'
        this.domElement.style.height = '100%'

        this.pre = document.createElement('pre')
        this.domElement.appendChild(this.pre)

        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.domElement.appendChild(this.canvas)

        this.deg = 0
        this.invert = invert ?? true
        this.fontSize = fontSize ?? 12
        this.fontFamily = fontFamily ?? "'Courier New', monospace"
        this.charset =
            charset ?? ' .\'`^",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'

        if (this.context) {
            this.context.imageSmoothingEnabled = false
            this.context.imageSmoothingEnabled = false
        }

        this.onMouseMove = this.onMouseMove.bind(this)
        document.addEventListener('mousemove', this.onMouseMove)
    }

    setSize(width: number, height: number) {
        this.width = width
        this.height = height
        this.renderer.setSize(width, height)
        this.reset()

        this.center = { x: width / 2, y: height / 2 }
        this.mouse = { x: this.center.x, y: this.center.y }
    }

    reset() {
        if (this.context) {
            this.context.font = `${this.fontSize}px ${this.fontFamily}`
            const charWidth = this.context.measureText('A').width

            this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)))
            this.rows = Math.floor(this.height / this.fontSize)

            this.canvas.width = this.cols
            this.canvas.height = this.rows
            this.pre.style.fontFamily = this.fontFamily
            this.pre.style.fontSize = `${this.fontSize}px`
            this.pre.style.margin = '0'
            this.pre.style.padding = '0'
            this.pre.style.lineHeight = '1em'
            this.pre.style.position = 'absolute'
            this.pre.style.left = '50%'
            this.pre.style.top = '50%'
            this.pre.style.transform = 'translate(-50%, -50%)'
            this.pre.style.zIndex = '9'
            this.pre.style.backgroundAttachment = 'fixed'
            this.pre.style.mixBlendMode = 'difference'
        }
    }

    render(scene: THREE.Scene, camera: THREE.Camera) {
        this.renderer.render(scene, camera)

        const w = this.canvas.width
        const h = this.canvas.height
        if (this.context) {
            this.context.clearRect(0, 0, w, h)
            this.context.drawImage(this.renderer.domElement, 0, 0, w, h)
            this.asciify(this.context, w, h)
            this.hue()
        }
    }

    onMouseMove(e: MouseEvent) {
        this.mouse = { x: e.clientX * PX_RATIO, y: e.clientY * PX_RATIO }
    }

    get dx() {
        return this.mouse.x - this.center.x
    }

    get dy() {
        return this.mouse.y - this.center.y
    }

    hue() {
        const deg = (Math.atan2(this.dy, this.dx) * 180) / Math.PI
        this.deg += (deg - this.deg) * 0.075
        this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`
    }

    asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
        const imgData = ctx.getImageData(0, 0, w, h).data
        let str = ''
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const i = x * 4 + y * 4 * w
                const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]]

                if (a === 0) {
                    str += ' '
                    continue
                }

                let gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255
                let idx = Math.floor((1 - gray) * (this.charset.length - 1))
                if (this.invert) idx = this.charset.length - idx - 1
                str += this.charset[idx]
            }
            str += '\n'
        }
        this.pre.innerHTML = str
    }

    dispose() {
        document.removeEventListener('mousemove', this.onMouseMove)
    }
}

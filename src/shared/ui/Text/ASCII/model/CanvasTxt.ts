import type { CanvasTxtOptions } from '@/shared/ui/Text/ASCII/types'

export class CanvasTxt {
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D | null
    txt: string
    fontSize: number
    fontFamily: string
    color: string
    font: string

    constructor(
        txt: string,
        { fontSize = 200, fontFamily = 'Arial', color = '#fdf9f3' }: CanvasTxtOptions = {},
    ) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.txt = txt
        this.fontSize = fontSize
        this.fontFamily = fontFamily
        this.color = color

        this.font = `600 ${this.fontSize}px ${this.fontFamily}`
    }

    resize() {
        if (this.context) {
            this.context.font = this.font
            const metrics = this.context.measureText(this.txt)

            const textWidth = Math.ceil(metrics.width) + 20
            const textHeight =
                Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 20

            this.canvas.width = textWidth
            this.canvas.height = textHeight
        }
    }

    render() {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.context.fillStyle = this.color
            this.context.font = this.font

            const metrics = this.context.measureText(this.txt)
            const yPos = 10 + metrics.actualBoundingBoxAscent

            this.context.fillText(this.txt, 10, yPos)
        }
    }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    get texture() {
        return this.canvas
    }
}

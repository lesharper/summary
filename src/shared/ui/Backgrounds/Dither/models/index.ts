import { Effect } from 'postprocessing'
import * as THREE from 'three'
import { ditherFragmentShader } from '@/shared/ui/Backgrounds/Dither/shaders'

export class RetroEffectImpl extends Effect {
    public uniforms: Map<string, THREE.Uniform<any>>
    constructor() {
        const uniforms = new Map<string, THREE.Uniform<any>>([
            ['colorNum', new THREE.Uniform(4.0)],
            ['pixelSize', new THREE.Uniform(2.0)],
        ])
        super('RetroEffect', ditherFragmentShader, { uniforms })
        this.uniforms = uniforms
    }
    set colorNum(value: number) {
        this.uniforms.get('colorNum')!.value = value
    }
    get colorNum(): number {
        return this.uniforms.get('colorNum')!.value
    }
    set pixelSize(value: number) {
        this.uniforms.get('pixelSize')!.value = value
    }
    get pixelSize(): number {
        return this.uniforms.get('pixelSize')!.value
    }
}

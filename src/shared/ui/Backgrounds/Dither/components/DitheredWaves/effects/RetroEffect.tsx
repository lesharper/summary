import { forwardRef } from 'react'
import { RetroEffectImpl } from '@/shared/ui/Backgrounds/Dither/models'
import { wrapEffect } from '@react-three/postprocessing'

export const RetroEffect = forwardRef<RetroEffectImpl, { colorNum: number; pixelSize: number }>(
    (props, ref) => {
        const { colorNum, pixelSize } = props
        const WrappedRetroEffect = wrapEffect(RetroEffectImpl)
        return (
            <WrappedRetroEffect
                ref={ref}
                colorNum={colorNum}
                pixelSize={pixelSize}
            />
        )
    },
)

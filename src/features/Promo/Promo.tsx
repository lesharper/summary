import styles from './Promo.module.css'
import { Dither } from '@/shared/ui/Backgrounds/Dither'
import { ASCIIText } from '@/shared/ui/Text/ASCII/AsciiText'

export const Promo = () => {
    return (
        <article className={styles.bg}>
            <div className={styles.info}>
                <ASCIIText
                    text="Hey!"
                    enableWaves={true}
                    asciiFontSize={10}
                    textFontSize={400}
                    planeBaseHeight={10}
                    textColor={'yellow'}
                />
            </div>
            <Dither
                waveColor={[0.5, 0.5, 0.5]}
                disableAnimation={false}
                enableMouseInteraction={false}
                mouseRadius={0.2}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={7}
                waveSpeed={0.05}
            />
        </article>
    )
}

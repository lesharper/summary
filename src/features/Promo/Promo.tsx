import styles from './Promo.module.css'
import { Dither } from '@/shared/ui/Backgrounds/Dither'

export const Promo = () => {
    return (
        <article className={styles.bg}>
            <div className={styles.info}>
                <h1>Добро пожаловать</h1>
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

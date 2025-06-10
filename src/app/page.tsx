import Image from 'next/image'
import styles from './page.module.css'
import { Dither } from '@/shared/ui/Backgrounds/Dither'
import { Promo } from '@/features/Promo'

export default function Home() {
    return (
        <div className={styles.page}>
            <Promo />
        </div>
    )
}

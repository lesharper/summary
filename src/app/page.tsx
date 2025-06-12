import styles from './page.module.css'
import { Promo } from '@/features/Promo'

export default function Home() {
    return (
        <div className={styles.page}>
            <Promo />
        </div>
    )
}

import styles from './page.module.css'
import { Promo } from '@/features/Promo'
import { ScrollFloat } from '@/shared/ui/ScrollFloat'
import { StarBorder } from '@/shared/ui/StarBorder'
import { ShinyText } from '@/shared/ui/Text/Shiny'

export default function Home() {
    return (
        <main className={styles.page}>
            <Promo />

            <div className={styles.screen}>
                {/* <ScrollFloat
                    animationDuration={2}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                >
                    Frontend - разработчик
                </ScrollFloat>*/}

                {/*<StarBorder
                    as="div"
                    speed={3}
                >
                    <ShinyText
                        text="Next"
                        speed={3}
                    />
                </StarBorder>*/}
            </div>
        </main>
    )
}

import styles from './page.module.css'
import { Promo } from '@/features/Promo'
import { ScrollReveal } from '@/shared/ui/ScrollReveal'
import { ScrollFloat } from '@/shared/ui/ScrollFloat'
import { ABOUT, skillsNorder } from '@/shared/constants/info'
import { SkillList } from '@/features/SkillList'

export default function Home() {
    return (
        <main className={styles.page}>
            <Promo />

            <div className={styles.screen}>
                <ScrollFloat
                    animationDuration={2}
                    ease="back.inOut(2)"
                    scrollStart="center bottom+=50%"
                    scrollEnd="bottom bottom-=40%"
                    textClassName={styles.title}
                >
                    Frontend - разработчик
                </ScrollFloat>
            </div>

            <div className={styles.screen}>
                <SkillList list={skillsNorder} />
            </div>

            <div className={styles.screen}>
                <ScrollReveal
                    baseOpacity={0.5}
                    enableBlur={true}
                    baseRotation={2}
                    blurStrength={3}
                    textClassName={styles.text}
                >
                    {ABOUT}
                </ScrollReveal>
            </div>
        </main>
    )
}

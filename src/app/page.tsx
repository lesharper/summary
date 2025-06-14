import styles from './page.module.css'
import { Promo } from '@/features/Promo'
import { ScrollReveal } from '@/shared/ui/ScrollReveal'

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

                <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={15}
                    textClassName={styles.text}
                >
                    Более 3 лет коммерческого опыта в разработке, включая реализацию проектов на
                    Python (Django, Flask), JavaScript (Next.js, React, Node.js), HTML5, CSS3 с
                    использованием различных принципов построения архитектуры клиент-серверного
                    взаимодействия - REST и GraphQL. Изучены темы оптимизации производительности
                    приложений и интеграция API через Postman и Swagger. Освоены технологии
                    проектирования и оптимизации баз данных MySQL, PostgreSQL, MongoDB с написанием
                    SQL/NoSQL-запросов. Проведено тестирование ПО с применением Selenium, Burp Suite
                    для обеспечения качества и безопасности. Выполнена автоматизация
                    администрирования Linux (Ubuntu, CentOS) и Windows с использованием Bash,
                    PowerShell. Систематическое изучение новых технологий, библиотек, фреймворков,
                    видов архитектур и полезных паттернов проектирования. Практическое применение
                    актуальных AI-ассистентов и различных моделей, для обучения или ускорения
                    разработки.
                </ScrollReveal>
            </div>
        </main>
    )
}

import styles from './SkillList.module.css'
import { StarBorder } from '@/shared/ui/StarBorder'
import { ShinyText } from '@/shared/ui/Text/Shiny'
import { getClassName } from '@/shared/helpers/getClassNames'

interface ISkillList {
    list: string[]
}

export const SkillList = ({ list }: ISkillList) => {
    return (
        <section className={getClassName(styles.grid, 'no_select')}>
            {list.map((item, index) => (
                <StarBorder
                    as="div"
                    speed={3}
                    key={index}
                    bodyClassName={styles.card}
                >
                    <ShinyText
                        text={item}
                        speed={3}
                        className={styles.text}
                    />
                </StarBorder>
            ))}
        </section>
    )
}

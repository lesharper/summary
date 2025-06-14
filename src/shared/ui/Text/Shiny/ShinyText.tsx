import styles from './ShinyText.module.css'
import { ShinyTextProps } from '@/shared/ui/Text/Shiny/types'
import { getClassName } from '@/shared/helpers/getClassNames'

export const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 5,
    className = '',
}) => {
    const animationDuration = `${speed}s`

    return (
        <div
            className={getClassName(styles.shiny_text, disabled && styles.disabled)}
            style={{ animationDuration }}
        >
            {text}
        </div>
    )
}

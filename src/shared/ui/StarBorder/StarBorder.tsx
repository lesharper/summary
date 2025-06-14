import React from 'react'
import { StarBorderProps } from '@/shared/ui/StarBorder/types'
import styles from './StarBorder.module.css'
import { getClassName } from '@/shared/helpers/getClassNames'

function generateRandomColors(): [string, string] {
    const getRandomColor = (): string => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    return [getRandomColor(), getRandomColor()]
}

export const StarBorder = <T extends React.ElementType = 'button'>({
    as,
    className = '',
    color = 'white',
    speed = 6,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = (as || 'button') as React.JSX.LibraryManagedAttributes<T, any>
    const [fcolor, scolor] = generateRandomColors()
    const animationDuration = `${speed}s`
    return (
        <Component
            className={getClassName(styles.star_border_container, className)}
            {...rest}
        >
            <div
                className={styles.border_gradient_bottom}
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 80%)`,
                    animationDuration,
                }}
            ></div>
            <div
                className={styles.border_gradient_top}
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 80%)`,
                    animationDuration,
                }}
            ></div>
            <div className={styles.inner_content}>{children}</div>
        </Component>
    )
}

import React from 'react'
import { StarBorderProps } from '@/shared/ui/StarBorder/types'
import styles from './StarBorder.module.css'
import { getClassName } from '@/shared/helpers/getClassNames'

export const StarBorder = <T extends React.ElementType = 'button'>({
    as,
    className,
    bodyClassName,
    color = '#f8c61e',
    speed = 6,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = (as || 'button') as React.JSX.LibraryManagedAttributes<T, any>
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
            <div className={getClassName(styles.inner_content, bodyClassName)}>{children}</div>
        </Component>
    )
}

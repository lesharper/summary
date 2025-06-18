import React from 'react'

export type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    as?: T
    className?: string
    bodyClassName?: string
    children?: React.ReactNode
    color?: string
    speed?: number
}

type Falsy = undefined | null | false | 0

function identity<T>(p: T) {
    return p
}

export function getClassName(...args: Array<string | Falsy>) {
    if (!args.length) return ''

    return args.filter(identity).join(' ')
}

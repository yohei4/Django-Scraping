export const is_equal = (...args: any[]) => {
    return args.every(value => value === args[0]);
}
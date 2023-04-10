// capitalise the first letter of a string and lowercase the rest
export function titleCase(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
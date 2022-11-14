export const truncate = (str: string, len: number) => {
    return str.length <= len ? str: (str.substr(0, len)+"...");
}
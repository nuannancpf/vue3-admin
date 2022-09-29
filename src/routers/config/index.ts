export function isWhitespace(val: any): boolean {
      return val === ''
}
export function isUndef(val: any): boolean {
      return typeof val === 'undefined'
}
export function isNull(val: any): boolean {
      return val === null
}
/** null or undefined */
export function isNullOrUndef(val: any): boolean {
      return isNull(val) || isUndef(val)
}

/** null or undefined or 空字符 */
export function isNullOrWhitespace(val: any): boolean {
      return isNullOrUndef(val) || isWhitespace(val)
}

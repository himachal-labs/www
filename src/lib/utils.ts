type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .filter(Boolean)
    .map(input => {
      if (typeof input === 'string') return input
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export type VariantProps<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any> 
    ? keyof T[K] 
    : T[K]
}
export const pluck = key => obj => obj[key]
export const composeFunctions = (f, g) => (...args) => f(g(...args))
export const compose = (...fns) => fns.reduce(composeFunctions)
export const pipe = (...fns) => fns.reduceRight(composeFunctions)
export const identity = x => x
export const map = fn => arr => arr.map(fn)
export const tap = fn => x => { fn(x); return x }
export const log = x => console.log(x)

export const camelize = str => str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())

// onlyKeys('a', 'b')({ a: 1, b: 2, c: 3 }) => { a: 1, b: 2 }
export const onlyKeys = (...keys) => obj =>
  keys.reduce(
    (accum, key) => ({ ...accum, [key]: obj[key] }),
    {}
  )

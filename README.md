# Option
_Option type for Typescript based on the [Scala Option type](https://github.com/scala/scala/blob/2.13.x/src/library/scala/Option.scala)_

If you're already familliar with type `Option` type, this should work more or less like you would expect it to.

Issues and PRs are welcome if you find any bugs in the code.

## Install
`yarn add @alanqthomas/option`

`npm install @alanqthomas/option`

## Development
Test with watch:
`yarn test`

Test once:
`yarn testOnce`

Build Typescript:
`yarn build`

Generate Docs:
`yarn docs`

## Examples
See the [TypeDoc documentation](https://alanqthomas.io/option) for more specific type info.

### Import
`import { Option, Some, None } from '@alanqthomas/option'`

### Constructors
Convenience methods to create new options without using `new`. This also means that the _real_ classes behind them are suffixed with an `_`, e.g. `Option_`.

```
const someVal = Option(42)
              = Some(42)
const noneVal = None
              = Option(null)
              = Option(undefined)
              = Option.empty<WhateverType>()
```
`Option.empty` is useful is you need a `None` that conforms to a certain type.

---
Let's use these values for our examples (`A` will be `number`):
```
// Option<Int>
const some = Some(42)
const none = Option.empty<number>()
```

### `isEmpty(): boolean`
```
some.isEmpty() // false
none.isEmpty() // true
```

### `isDefined(): boolean`
```
some.isDefined() // true
none.isDefined() // false
```

### `nonEmpty(): boolean` (alias for `isDefined`)
```
some.isDefined() // true
none.isDefined() // false
```

### `get(): A`
```
some.get() // 42
none.get() // throws ReferenceError!!
```

### `getOrElse(e: A): Option<A>`
```
some.getOrElse(0) // 42
none.getOrElse(0) // 0
```

### `orElse(alt: Option<A>): Option<A>`
```
some.orElse(Some(0)) // Some(42)
none.orElse(Some(0)) // Some(0)
```

### `map<B>(f: (a: A) => B): Option<B>`
```
some.map(x => x + 2) // Some(44)
none.map(x => x + 2) // None
```

### `flatMap<B extends NonEmpty>(f: (a: A) => Option<B>): Option<B>`
```
some.flatMap(x => Some(x + 2)) // Some(44)
none.flatMap(x => Some(x + 2)) // None
```

`NonEmpty` is a type alias for a non-null, non-undefined value
`type NonEmpty = string | number | boolean | symbol | object`

### `fold<B>(b: B, f: (a: A) => B): B`
```
some.fold(0, x => x + 2) // 44
none.fold(0, x => x + 2) // 0
```

### `filter(p: (a: A) => boolean): Option<A>`
```
some.filter(x => x === 42) // Some(42)
none.filter(x => x === 42) // None
```

### `filterNot(p: (a: A) => boolean): Option<A>`
```
some.filterNot(x => x === 0) // Some(42)
none.filterNot(x => x === 0) // None
```

### `contains(elem: A): boolean`
```
some.contains(42) // true
none.contains(42) // false
```

### `exists(p: (a: A) => boolean): boolean`
```
some.exists(x => x === 42) // true
none.exists(x => x === 42) // false
```

### `forall(p: (a: A) => boolean): boolean`
```
some.forall(x => x === 42) // true
none.forall(x => x === 42) // true
```

### `foreach<B>(f: (a: A) => B): void`
```
some.foreach(x => console.log(x)) // prints 42
none.foreach(x => console.log(x)) // doesn't print
```

### `toArray(): Array<A>`
```
some.toArray() // [42]
none.toArray() // []
```

### `match<B, C>(matches): B | C`
`matches` is an object of shape:
```
matches: {
  none: () => C,
  some: (a: A) => B
}
```
Of course, order doesn't matter in an object, so you can put in the `some` or `none` function in the order you want
```
some.match({
  some: x => x + 2,
  none: () => 0
}) // 44

none.match({
  some: x => x + 2,
  none: () => 0
}) // 0
```

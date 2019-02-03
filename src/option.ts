export abstract class Option_<A> {
	abstract isEmpty(): boolean
	abstract get(): A
	isDefined(): boolean { return !this.isEmpty() }
	nonEmpty(): boolean { return this.isDefined() }

	getOrElse(e: A): A {
		if (this.isEmpty()) return e
		else return this.get()
	}

	orElse(alt: Option<A>): Option<A> {
		if (this.isEmpty()) return alt
		else return this
	}

	map<B>(f: (a: A) => B): Option<B> {
		if (this.isEmpty()) return None
		else return Some(f(this.get()))
	}

	flatMap<B extends NonEmpty>(f: (a: A) => Option<B>): Option<B> {
		if (this.isEmpty()) return None
		else return f(this.get())
	}

	fold<B>(b: B, f: (a: A) => B): B {
		if (this.isEmpty()) return b
		else return f(this.get())
	}

	filter(p: (a: A) => boolean): Option<A> {
		if (this.isEmpty() || p(this.get())) return this
		else return None
	}

	filterNot(p: (a: A) => boolean): Option<A> {
		if (this.isEmpty() || !p(this.get())) return this
		else return None
	}

	contains(elem: A): boolean {
		return !this.isEmpty() && (this.get() == elem || this.get() === elem)
	}

	exists(p: (a: A) => boolean): boolean {
		return !this.isEmpty() && p(this.get())
	}

	forall(p: (a: A) => boolean): boolean {
		return this.isEmpty() || p(this.get())
	}

	foreach<B>(f: (a: A) => B): void {
		if (!this.isEmpty()) f(this.get())
	}

	toArray(): Array<A> {
		if (this.isEmpty()) return Array()
		else return [this.get()]
	}

	match<B, C>(
		matches: {
			none: () => C,
			some: (a: A) => B
		}
	): B | C {
		if (this.isEmpty()) return matches.none()
		else return matches.some(this.get())
	}
}

export type Option<T> = Option_<T>
export function Option<T>(value: T | null | undefined): Option<T> {
	if (value == null || value == undefined) return None
	else return Some(value as T & NonEmpty)
}

export namespace Option {
	export function empty<A>(): Option<A> {
		return Option<A>(null)
	}
}

export class Some_<A> extends Option_<A> {
	constructor(readonly value: A) { super() }

	isEmpty(): boolean { return false }
	get(): A { return this.value }
}

export type Some<T> = Some_<T>

export function Some<T>(value: T): Some<T> {
	if (value == null || value == undefined)
		throw new ReferenceError(`Can't assign null or undefined to Some`)
	return new Some_(value)
}

export class None_ extends Option_<never> {
	isEmpty(): boolean { return true }
	get(): never { throw new ReferenceError(`None.get(): can't get a value from None`) }
}

export type None = None_
export const None = new None_() as None

type NonEmpty = string | number | boolean | symbol | object

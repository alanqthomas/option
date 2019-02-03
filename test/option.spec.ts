import { expect } from 'chai'
import 'mocha'

import { Option, Some, None } from '../src/option'

describe('Option', () => {
	it('should be createable', () => {
		const someOpt = Option('Hello')
		const emptyOpt = Option.empty<number>()
		expect(someOpt).to.be.not.null
		expect(emptyOpt).to.be.not.null
	})
})

describe('Some', () => {
	it('should be createable', () => {
		const some = Some('Hello')
		expect(some).to.be.not.null
	})

	it('should throw when passed empty value', () => {
		expect(() => Some(null)).to.throw()
		expect(() => Some(undefined)).to.throw()
	})

	it('should return its value instead of a default', () => {
		const some = Some(42)
		const getOrElse = some.getOrElse(0)
		const orElse = some.orElse(Option(0))
		expect(getOrElse).to.equal(42)
		expect(orElse.get()).to.equal(42)
	})

	it('should map on values', () => {
		const some = Some(42)
		const val = some.map(x => x + 2)
		expect(val.get()).to.equal(44)
	})

	it('should get value on map instead of default', () => {
		const some = Some({ name: "Marky Z." })
		const val = some.map(x => x.name).getOrElse("No name")
		expect(val).to.equal("Marky Z.")
	})

	it('should flat map', () => {
		const some = Some({ maybeName: Option("Marky Z.") })
		const val = some.flatMap(x => x.maybeName).getOrElse("No name")
		expect(val).to.equal("Marky Z.")
	})

	it('should fold to the value instead of default', () => {
		const some = Some(42)
		const val = some.fold(0, x => x + 2)
		expect(val).to.equal(44)
	})

	it('should filter to the value instead of default', () => {
		const some = Some(42)
		const val = some.filter(x => x === 42).getOrElse(0)
		expect(val).to.equal(42)
	})

	it('should filterNot to the value instead of default', () => {
		const some = Some(42)
		const val = some.filterNot(x => x === 0).getOrElse(0)
		expect(val).to.equal(42)
	})

	it('should say whether it contains a value', () => {
		const some = Some(42)
		const val = some.contains(42)
		expect(val).to.be.true
	})

	it('should say whether a value exists', () => {
		const some = Some(42)
		const val = some.exists(x => x === 42)
		expect(val).to.be.true
	})

	it('should say whether value satisfies predicate', () => {
		const some = Some(42)
		const val = some.forall(x => x === 42)
		expect(val).to.be.true
	})

	it('should execute a function in foreach', () => {
		const some = Some(42)
		some.foreach(x => expect(x).to.equal(42))
	})

	it('should convert to an array', () => {
		const some = Some(42)
		const val = some.toArray()[0]
		expect(val).to.equal(42)
	})

	it('should match to some', () => {
		const some = Some(42)
		const val = some.match({
			some: x => x + 2,
			none: () => 0
		})
		expect(val).to.equal(44)
	})
})

describe('None', () => {
	it('should be createable', () => {
		const none = None
		expect(none).to.be.not.null
	})

	it('should return default value', () => {
		const none = Option.empty<number>()
		const getOrElse = none.getOrElse(0)
		const orElse = none.orElse(None)
		expect(getOrElse).to.equal(0)
		expect(() => orElse.get()).to.throw()
	})

	it('should not map on values', () => {
		const none = Option.empty<number>()
		const val = none.map(x => x + 2)
		expect(() => val.get()).to.throw()
	})

	it('should get default value on map', () => {
		const none = Option.empty<{ name: string }>()
		const val = none.map(x => x.name).getOrElse("No name")
		expect(val).to.equal("No name")
	})

	it('should get default value on flat map', () => {
		const none = Option.empty<{ maybeName: Option<string> }>()
		const val = none.flatMap(x => x.maybeName).getOrElse("No name")
		expect(val).to.equal("No name")
	})

	it('should fold to the default value', () => {
		const none = Option.empty<number>()
		const val = none.fold(0, x => x + 2)
		expect(val).to.equal(0)
	})

	it('should filter to the default value', () => {
		const none = Option.empty<number>()
		const val = none.filter(x => x === 42).getOrElse(0)
		expect(val).to.equal(0)
	})

	it('should filterNot to the default value', () => {
		const none = Option.empty<number>()
		const val = none.filterNot(x => x === 0).getOrElse(0)
		expect(val).to.equal(0)
	})

	it('should say whether it contains a value', () => {
		const none = Option.empty<number>()
		const val = none.contains(42)
		expect(val).to.be.false
	})

	it('should say whether a value exists', () => {
		const none = Option.empty<number>()
		const val = none.exists(x => x === 42)
		expect(val).to.be.false
	})

	it('should have None satisfy predicate', () => {
		const none = Option.empty<number>()
		const val = none.forall(x => x === 42)
		expect(val).to.be.true
	})

	it('should not execute a function in foreach', () => {
		const none = Option.empty<number>()
		none.foreach(x => {
			// should not get here
			expect(x).to.equal(42)
		})
		expect(none)
	})

	it('should convert to an empty array', () => {
		const none = Option.empty<number>()
		const val = none.toArray().length
		expect(val).to.equal(0)
	})

	it('should match to none', () => {
		const none = Option.empty<number>()
		const val = none.match({
			some: x => x + 2,
			none: () => 0
		})
		expect(val).to.equal(0)
	})
})

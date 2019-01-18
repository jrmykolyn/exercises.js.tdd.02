// --------------------------------------------------
// NOTES
// --------------------------------------------------
// This file contains all the tests for the UniversalExchange class that you're about to write!
// The test cases are split up into the following groups:
//   - 'General'
//   - 'API'
// Take a moment to read through each of the test case descriptions.
// Once you understand the requirements for each case, hop over to the `src/universal-exchange.js` and start implementing your solutions.

// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
const { it } = require('mocha');
const { expect } = require('chai');

// Project
const UniversalExchange = require('../src/universal-exchange');

// --------------------------------------------------
// DEFINE TESTS
// --------------------------------------------------
// This block wraps *all* of the tests which relate to the UniversalExchange class.
describe('UniversalExchange', () => {

    // This block includes general tests about the class, including one which ensures that it is constructable.
    describe('General', () => {

        // Since the `src/universal-exhcange.js` file exports the UniversalExchange class, this test will pass. Hooray!
        it('should be constructable', () => {
            const instance = new UniversalExchange();

            expect(instance).to.be.an.instanceof(UniversalExchange);
        });
    });

    // This block includes tests about the API of UniversalExchange instances.
    describe('API', () => {

        // This block includes test cases about the `setRates()` instance method.
        // The remainder of the test suite follows this format (ie. each block contains test cases which relate to a specific method).
        describe('setRates()', () => {

            // To satisfy this test case, make sure that the UniversalExchange class exposes a `setRates()` method.
            // Pretty straightforward!
            it('should be a method', () => {
                const instance = new UniversalExchange();

                expect(instance.setRates).to.be.a('function');
            });

            // This looks a bit trickier...
            // To satisfy this case, start by reading the description, then the contents of the test itself.
            it('should accept and return an object of "rates" data', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {},
                    IGD: {},
                };

                const result = instance.setRates(data);

                expect(result).to.eql(data);
            });

            it('should return `null` when invoked with an input of any other type', () => {
                const instance = new UniversalExchange();
                const inputs = [
                    [ 'foo', 'bar' ],
                    'Hello, world!',
                    10,
                    1,
                    0,
                    true,
                    false,
                    null,
                    undefined,
                    (1 * 'Baz'),
                ];

                const results = inputs.map(input => instance.setRates(input));

                expect(results.every(result => result === null)).to.eql(true);
            });
        });

        // This method is responsible for returning information about *all* currencies.
        describe('getRates()', () => {
            it('should be a method', () => {
                const instance = new UniversalExchange();

                expect(instance.getRates).to.be.a('function');
            });


            it('should return an object of "rates" data', () => {
                const instance = new UniversalExchange();
                const data = { UVD: {}, };

                instance.setRates(data);
                const result = instance.getRates();

                expect(result).to.eql(data);
            });

            it('should return an empty object if no "rates" data is available', () => {
                const instance = new UniversalExchange();

                const result = instance.getRates();

                expect(result).to.eql({});
            });
        });

        // This method is responsible for returning information about a specific currency.
        describe('getRatesFor()', () => {
            it('should be a method', () => {
                const instance = new UniversalExchange();

                expect(instance.getRatesFor).to.be.a('function');
            });

            it('should return an object of data about the specified currency', () => {
                const instance = new UniversalExchange();
                const uVDRates = { IGD: 1.3 };
                const data = { UVD: uVDRates };

                instance.setRates(data);
                const result = instance.getRatesFor('UVD');

                expect(result).to.eql(uVDRates);
            });

            it('should return an empty object if no data exists for the specified currency', () => {
                const instance = new UniversalExchange();

                const result = instance.getRatesFor('FOO');

                expect(result).to.eql({});
            });
        });

        // This method is responsible for returning information about the rate of exchange between two currencies.
        describe('getRateBetween()', () => {
            it('should return `null` if invoked with invalid arguments', () => {
                const instance = new UniversalExchange();

                const validInput = 'FOO';
                const invalidInputs = [
                    { foo: 'Bar' },
                    [ 'foo', 'bar' ],
                    '',
                    10,
                    1,
                    0,
                    -1,
                    true,
                    false,
                    null,
                    undefined,
                    (1 * 'Baz'),
                ];

                const results = invalidInputs.map(input => instance.getRateBetween(validInput, input));

                expect(results.every(result => result === null)).to.eql(true);
            });

            it('should return -1 if rate data is not available for either currency', () => {
                const data = {
                    UVD: {},
                };
                const instance = new UniversalExchange();

                const result = instance.getRateBetween('UVD', 'FOO');

                expect(result).to.eql(-1);
            });

            it('should return -1 if both currencies are valid, but no exchange data exists', () => {
                const data = {
                    UVD: {},
                    FOO: {},
                };
                const instance = new UniversalExchange();

                const result = instance.getRateBetween('UVD', 'FOO');

                expect(result).to.eql(-1);
            })

            it('should return the correct rate based on the currency order', () => {
                const data = {
                    UVD: {
                        IGD: 2,
                    },
                    IGD: {
                        UVD: 0.5,
                    },
                };
                const instance = new UniversalExchange();

                instance.setRates(data);
                const result = instance.getRateBetween('UVD', 'IGD');

                expect(result).to.eql(2);
            });
        });

        // This method handles the sale of a given currency.
        describe('sell()', () => {
            it('should be a method', () => {
                const instance = new UniversalExchange();

                expect(instance.sell).to.be.a('function');
            });

            it('should return the correct output given when invoked with a valid amount, source, and target', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 2,
                    },
                };

                instance.setRates(data);
                const result = instance.sell(50, 'UVD', 'IGD');

                expect(result).to.eql(100);
            });

            it('should return `null` if invoked before the rates have been set', () => {
                const instance = new UniversalExchange();

                const result = instance.sell();

                expect(result).to.be.null;
            });

            it('should return `null` if the `amount` is invalid (ie. 0 or below)', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 1.3,
                    },
                    IGD: {
                        UVD: 0.76923,
                    },
                };

                const result = instance.sell(0, 'UVD', 'IGD');

                expect(result).to.be.null;
            });

            it('should return `null` if there is no rate data for the provided currencies', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 1.3,
                    },
                    IGD: {
                        UVD: 0.76923,
                    },
                    FOO: {
                        IGD: 1,
                    },
                };

                const result = instance.sell(50, 'UVD', 'FOO');

                expect(result).to.be.null;
            });
        });

        // This method handles the purchase of a given currency.
        describe('buy()', () => {
            it('should be a method', () => {
                const instance = new UniversalExchange();

                expect(instance.buy).to.be.a('function');
            });

            it('should return the correct output when invoked with a valid amount, source, and target', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 2,
                    },
                };

                instance.setRates(data);
                const result = instance.buy(200, 'UVD', 'IGD');

                expect(result).to.equal(100);
            });

            it('should return `null` if invoked before the rates have been set', () => {
                const instance = new UniversalExchange();

                const result = instance.buy(50, 'UVD', 'IGD');

                expect(result).to.be.null;
            });


            it('should return `null` if the `amount` is invalid (ie. 0 or below)', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 1.3,
                    },
                    IGD: {
                        UVD: 0.76923,
                    },
                };

                const result = instance.sell(0, 'UVD', 'IGD');

                expect(result).to.be.null;
            });

            it('should return `null` if there is no rate data for the provided currencies', () => {
                const instance = new UniversalExchange();
                const data = {
                    UVD: {
                        IGD: 1.3,
                    },
                    IGD: {
                        UVD: 0.76923,
                    },
                    FOO: {
                        IGD: 1,
                    },
                };

                const result = instance.sell(50, 'UVD', 'FOO');

                expect(result).to.be.null;
            });
        });
    });
});

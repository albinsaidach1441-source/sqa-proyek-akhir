const Calculator = require('../src/calculator');

describe('Calculator Unit Tests', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    test('penjumlahan 5 + 3 menghasilkan 8', () => {
        expect(calc.add(5, 3)).toBe(8);
    });

    test('pengurangan 5 - 3 menghasilkan 2', () => {
        expect(calc.subtract(5, 3)).toBe(2);
    });
});
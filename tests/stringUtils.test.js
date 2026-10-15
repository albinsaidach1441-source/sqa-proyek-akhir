const StringUtils = require('../src/stringUtils');

describe('StringUtils Unit Tests', () => {
    let utils;
    
    beforeEach(() => { 
        utils = new StringUtils(); 
    });

    test('1. reverse kata', () => { 
        expect(utils.reverse('hello')).toBe('olleh'); 
    });
    
    test('2. reverse kalimat', () => { 
        expect(utils.reverse('sqa test')).toBe('tset aqs'); 
    });
    
    test('3. reverse empty', () => { 
        expect(utils.reverse('')).toBe(''); 
    });
    
    test('4. palindrome valid', () => { 
        expect(utils.isPalindrome('katak')).toBe(true); 
    });
    
    test('5. palindrome invalid', () => { 
        expect(utils.isPalindrome('hello')).toBe(false); 
    });
    
    test('6. palindrome case-insensitive', () => { 
        expect(utils.isPalindrome('Malam')).toBe(true); 
    });
    
    test('7. countVowels standard', () => { 
        expect(utils.countVowels('fauzi')).toBe(3); 
    });
    
    test('8. countVowels tanpa vokal', () => { 
        expect(utils.countVowels('fly')).toBe(0); 
    });
});
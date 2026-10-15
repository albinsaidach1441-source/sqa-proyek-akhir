class StringUtils {
    reverse(str) { 
        return str.split('').reverse().join(''); 
    }
    
    isPalindrome(str) {
        const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return clean === clean.split('').reverse().join('');
    }
    
    countVowels(str) {
        const matches = str.match(/[aiueo]/gi);
        return matches ? matches.length : 0;
    }
}

module.exports = StringUtils;

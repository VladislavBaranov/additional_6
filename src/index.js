var isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

function BigNumber(initialNumber) {
    var index;

    if (!(this instanceof BigNumber)) {
        return new BigNumber(initialNumber);
    }

    this.number = []
    this.sign = 1;
    this.rest = 0;

    if (!initialNumber) {
        this.number = [0];
        return;
    }

    if (isArray(initialNumber)) {
        if (initialNumber.length && initialNumber[0] === '-' || initialNumber[0] === '+') {
            this.sign = initialNumber[0] === '+' ? 1 : -1;
            initialNumber.shift(0);
        }
        for (index = initialNumber.length - 1; index >= 0; index--) {
            if (!this.addDigit(initialNumber[index]))
                return;
        }
    } else {
        initialNumber = initialNumber.toString();
        if (initialNumber.charAt(0) === '-' || initialNumber.charAt(0) === '+') {
            this.sign = initialNumber.charAt(0) === '+' ? 1 : -1;
            initialNumber = initialNumber.substring(1);
        }

        for (index = initialNumber.length - 1; index >= 0; index--) {
            if (!this.addDigit(parseInt(initialNumber.charAt(index), 10))) {
                return;
            }
        }
    }
};

BigNumber.prototype.addDigit = function (digit) {
        this.number.push(digit);
        return this;
    };

BigNumber.prototype.multiply = function (number) {
    if (typeof number === 'undefined') {
        return this;
    }
    var bigNumber = BigNumber(number);
    var index;
    var givenNumberIndex;
    var remainder = 0;
    var result = [];

    if (this.isZero() || bigNumber.isZero()) {
        return BigNumber(0);
    }

    this.sign *= bigNumber.sign;

    for (index = 0; index < this.number.length; index++) {
        for (remainder = 0, givenNumberIndex = 0; givenNumberIndex < bigNumber.number.length || remainder > 0; givenNumberIndex++) {
            result[index + givenNumberIndex] = (remainder += (result[index + givenNumberIndex] || 0) + this.number[index] * (bigNumber.number[givenNumberIndex] || 0)) % 10;
            remainder = Math.floor(remainder / 10);
        }
    }

    this.number = result;
    return this;
};
  

BigNumber.prototype.isZero = function () {
    var index;
    for (index = 0; index < this.number.length; index++) {
        if (this.number[index] !== 0) {
            return false;
        }
    }
    return true;
};

BigNumber.prototype.toString = function () {
    var index;
    var str = '';
    if (typeof this.number === "string") {
        return this.number;
    }
    for (index = this.number.length - 1; index >= 0; index--) {
        str += this.number[index];
    }
    return (this.sign > 0) ? str : ('-' + str);
};

function doubleFactorial(elem){
    return !(elem>1)? 1: BigNumber(elem).multiply(doubleFactorial(elem-2)).toString(); 
 }
function singleFactorial(elem){
    return !elem? 1: BigNumber(elem).multiply(singleFactorial(elem-1)).toString(); 
 }
 
module.exports = function zeros(expression){
     var arrayFactorial = expression.split('*');
     var arrayNumber = arrayFactorial.map(function(fact){
         if (fact.slice(-2)=='!!'&&Number(fact.slice(0,-2))%2==1) return doubleFactorial(fact.slice(0,-2));
         if (fact.slice(-2)=='!!'&&Number(fact.slice(0,-2))%2==0) return doubleFactorial(fact.slice(0,-2));
         else return singleFactorial(fact.slice(0,-1));
     })
	  var result = 1 ;
    for (var i=0; i<arrayNumber.length; i++){
        result = BigNumber(result).multiply(arrayNumber[i]).toString(); 
    };
    var quantityZero = 0; 
    for (i=result.length-1; i>0; i--){
        if (result.charAt(i)==0) quantityZero += 1;
        else break;
    };
    return quantityZero;    
 };
 
 

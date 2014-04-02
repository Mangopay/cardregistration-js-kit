describe("Card number validator ", function () {
    
    it(" validateNumericOnly method should return true if cc ontains more than 1 digit", function () {
        expect(mangoPay._validation._helpers._validateNumericOnly("")).toBeFalsy();
        expect(mangoPay._validation._helpers._validateNumericOnly("0123456789")).toBeTruthy();
        expect(mangoPay._validation._helpers._validateNumericOnly("01234WW56789")).toBeFalsy();
        expect(mangoPay._validation._helpers._validateNumericOnly("_1234")).toBeFalsy(); 
        expect(mangoPay._validation._helpers._validateNumericOnly("12 34")).toBeFalsy(); 
    });   
        
    it(" validateCheckDigit should return true if cc has valid check digit", function () {
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("4929225063451102") === true).toBeFalsy();
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("5585842253289145") === true).toBeFalsy();
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("4929225063451101") === true).toBeTruthy();
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("5585842253289141") === true).toBeTruthy();
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("6011624267989581") === true).toBeTruthy();
        expect(mangoPay._validation._cardNumberValidator._validateCheckDigit("372723172231463") === true).toBeTruthy();
    });   
    
    it(" CVVNumberValidator should return true if cc length is valid", function () {
        expect(mangoPay._validation._cvvValidator._validate("12", "AMEX") === true).toBeFalsy();
        expect(mangoPay._validation._cvvValidator._validate("123", "AMEX") === true).toBeTruthy();
        expect(mangoPay._validation._cvvValidator._validate("9999", "AMEX") === true).toBeTruthy();
        expect(mangoPay._validation._cvvValidator._validate("123", "CB_VISA_MASTERCARD") === true).toBeTruthy();
        expect(mangoPay._validation._cvvValidator._validate("1234", "CB_VISA_MASTERCARD") === true).toBeFalsy();
        expect(mangoPay._validation._cvvValidator._validate("12", "CB_VISA_MASTERCARD") === true).toBeFalsy();
        expect(mangoPay._validation._cvvValidator._validate("12345", "CB_VISA_MASTERCARD") === true).toBeFalsy();
        expect(mangoPay._validation._cvvValidator._validate("asd", "CB_VISA_MASTERCARD") === true).toBeFalsy();
        expect(mangoPay._validation._cvvValidator._validate("", "CB_VISA_MASTERCARD") === true).toBeFalsy();
    });

    it(" ExpirationDateValidator should return false if format of date is incorrect", function () {
        expect(mangoPay._validation._expirationDateValidator._validate("123", new Date()) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("1999", new Date()) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("1210", new Date()) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("2222", new Date()) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("a622", new Date()) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("", new Date()) === true).toBeFalsy();
    });
    
    it(" ExpirationDateValidator should return false if mmyy date is in the past", function () {
        expect(mangoPay._validation._expirationDateValidator._validate("0214", new Date(2014, 2, 1)) === true).toBeFalsy();
        expect(mangoPay._validation._expirationDateValidator._validate("0313", new Date(2014, 2, 1)) === true).toBeFalsy();
    }); 
    
    it(" ExpirationDateValidator should return true if mmyy date is in future", function () {
        expect(mangoPay._validation._expirationDateValidator._validate("1234", new Date(2014, 0, 1)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("1123", new Date(2014, 0, 1)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("0120", new Date(2014, 0, 1)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("1219", new Date(2014, 0, 1)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("0214", new Date(2014, 1, 28)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("0314", new Date(2014, 2, 1)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("0314", new Date(2014, 2, 31)) === true).toBeTruthy();
        expect(mangoPay._validation._expirationDateValidator._validate("0315", new Date(2014, 2, 1)) === true).toBeTruthy();
    });   
    
});
function getCardData() {
    return {
        cardNumber: "4970100000000154", 
        cardExpirationDate: "1020", 
        cardCvx: "123",
        cardType: "CB_VISA_MASTERCARD"
    };
}

function getCardRegisterData() {
    return {
        cardRegistrationURL: "https://homologation-webpayment.payline.com/webpayment/getToken", 
        preregistrationData: "data=fztL6okJyT8dJpVcSz7IN50ubU7uMq9OJhK61d7Oul3XyfsRdC8xobmoVZOd_WQw7qGR3aNxrLUiPbx-Z--VxQ", 
        accessKey: "1X0m87dmM2LiwFgxPLBJ"
    };
};

describe("Kit should ", function () {
    
    mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
    mangoPay.cardRegistration.clientId = "sdk-unit-tests";
    
    it(" return error on incorrect card data", function () {
        mangoPay.cardRegistration.init(getCardRegisterData());
        var data = getCardData();
        data.cardCvx = "123456789";
        mangoPay.cardRegistration.registerCard(
            data, 
            function () {
                expect(true).toBeFalsy();
            },
            function (err) {
                expect(err.ResultMessage === "CVV_FORMAT_ERROR").toBeTruthy();
            }
        );
    });
    
    it(" return error from Payline if  preregistrationData are incorrect", function () {
        mangoPay.cardRegistration.init(getCardRegisterData());
        var data = getCardData();
        var flag = false;
        var res = null;
        // async call
        runs(function() {
            mangoPay.cardRegistration.registerCard(
                  data, 
                  null,
                  function (data) {
                      res = data; 
                      flag = true;
                  }
              );
        });
        waitsFor(function() {
            return flag;
        }, "async operation should finish", 5000);
        runs(function() {
            expect(res.ResultCode === "101699").toBeTruthy();
        });
    });
    
    it(" return error from leetchi script if registrationData are incorrect", function () {
        mangoPay.cardRegistration.init(getCardRegisterData());
        var flag = false;
        var res = null;
        // async call
        runs(function() {
            mangoPay.cardRegistration._finishRegistration(
                {Id: 0, RegistrationData: "asdasd"}, 
                  null,
                  function (data) {
                      res = data; 
                      flag = true;
                  }
              );
        });
        waitsFor(function() {
            return flag;
        }, "async operation should finish", 5000);
        runs(function() {
            expect(res.ResultCode === "101699").toBeTruthy();
        });
    });
});
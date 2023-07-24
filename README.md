# :warning: Deprecated :warning:

This SDK is deprecated as of July 21, 2023 and will no longer be maintained or supported.

>**You should upgrade to the newest version of our [Javascript Vault SDK](https://mangopay.com/docs/sdk/vault-web). The new SDK provides the same functionality of [card registration flow](https://mangopay.com/docs/endpoints/direct-card-payins#card-registration-object), with Typescript language support., better performance, and continued support.**

If you have any other questions around this deprecation, please reach out to our team via the [Hub](https://hub.mangopay.com/)

MANGOPAY Card Registration JavaScript Kit  [![Build Status](https://travis-ci.org/Mangopay/cardregistration-js-kit.svg?branch=master)](https://travis-ci.org/Mangopay/cardregistration-js-kit)
=================================================
MANGOPAY CardRegistration JavaScript Kit is a client library designed to take care of the card registration process.
Refer to [MANGOPAY REST API documentation](http://docs.mangopay.com/api-references/) and 
[MANGOPAY card registration process](http://docs.mangopay.com/api-references/card-registration/) for more information.

Browser compatibility
-------------------------------------------------
The library makes cross-origin Ajax calls ([CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing))
to get the card token and handle card registration with MANGOPAY API. Therefore it requires a browser that supports CORS.
The kit does not support Internet Explorer 6 & 7 and Opera Mini.

The payment page that collects card details should use HTTPS. The kit will not work in Internet Explorer 8 and 9
if this page is not encrypted with SSL.

Installation
-------------------------------------------------
The kit has been written in pure JavaScript and has no external dependencies. It is enough to include the kit file 
on your card payment page:

    <script type="text/javascript" src="mangopay-kit.js"></script>

Typically you would also have MANGOPAY SDK up and running to work with the MANGOPAY API. 
[Java](https://github.com/Mangopay/mangopay2-java-sdk), [PHP](https://github.com/MangoPay/mangopay2-php-sdk), [.NET](https://github.com/Mangopay/mangopay2-net-sdk), [Python](https://github.com/MangoPay/mangopay2-python-sdk), [Ruby](https://github.com/Mangopay/mangopay2-ruby-sdk) and [Node](https://github.com/Mangopay/mangopay2-nodejs-sdk) 
distributions are available.

The kit is also available for installation from [npm](https://www.npmjs.com/package/mangopay-cardregistration-js-kit) if you prefer.

Configuration
-------------------------------------------------
Set `mangoPay.cardRegistration.clientId` to your MANGOPAY Client ID. `mangoPay.cardRegistration.baseURL` is set to 
sandbox environment by default. To enable production environment, set it to `https://api.mangopay.com`.

Usage
-------------------------------------------------
Make sure you have the right configuration in place:

    // Set MANGOPAY API base URL and Client ID
    mangoPay.cardRegistration.baseURL = "https://api.sandbox.mangopay.com";
    mangoPay.cardRegistration.clientId = {your-client-id};

Create a new CardRegistration object on the server and pass it over to the JavaScript kit:

    // Initialize with card register data prepared on the server
    mangoPay.cardRegistration.init({
        cardRegistrationURL: {CardRegistrationURL property}, 
        preregistrationData: {PreregistrationData property}, 
        accessKey: {AccessKey property},
        Id: {Id property}
    });

Collect card details from the user on a payment form:

    // Card data collected from the user
    var cardData = {
         cardNumber: $("#card_number").val(), 
         cardExpirationDate: $("#card_exp_date").val(), 
         cardCvx: $("#card_cvx").val(),
         cardType: $("#card_type").val()
    };

Then call `mangoPay.cardRegistration.registerCard`:

    // Register card
    mangoPay.cardRegistration.registerCard(
        cardData, 
        function(res) {
            // Success, you can use res.CardId now that points to registered card
        },
        function(res) {
            // Handle error, see res.ResultCode and res.ResultMessage
        }
    );


Running the demo
-------------------------------------------------
There is a simple PHP demo code included that shows how to use the kit. The demo page requires MANGOPAY SDK class 
to do the server-side work. Make sure that [MANGOPAY PHP SDK](https://github.com/MangoPay/mangopay2-php-sdk) is accessible to the demo page.

Unit Tests
-------------------------------------------------
Jasmine unit tests are placed under tests dir and can be launched in a browser using tests/index.html.
Unit test covers only validation classes and requests with invalid data.

License
-------------------------------------------------
MANGOPAY JavaScript Kit is distributed under MIT license.

Contacts
-------------------------------------------------
Report bugs or suggest features using issue tracker at GitHub.

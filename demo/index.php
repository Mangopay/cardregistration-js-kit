<?php

// include MangoPay SDK
require_once '../MangoPaySDK/mangoPayApi.inc';
require_once './config.php';

// Initialize MangoPay SDK
$mangoPayApi = new \MangoPay\MangoPayApi();
$mangoPayApi->Config->BaseUrl = MangoPayDemo_BaseUrl;
$mangoPayApi->Config->ClientId = MangoPayDemo_ClientId;
$mangoPayApi->Config->ClientPassword = MangoPayDemo_ClientPassword;
$mangoPayApi->Config->TemporaryFolder = MangoPayDemo_TemporaryFolder;

// Creates Natural user (owner of the payment card)
$user = new MangoPay\UserNatural();
$user->FirstName = 'John';
$user->LastName = 'Smith';
$user->Email = 'email@domain.com';
$user->Address = "Some Address";
$user->Birthday = time();
$user->Nationality = 'FR';
$user->CountryOfResidence = 'FR';
$user->Occupation = "programmer";
$user->IncomeRange = 3;
$createdUser = $mangoPayApi->Users->Create($user);

// Register card for user
$cardRegister = new \MangoPay\CardRegistration();
$cardRegister->UserId = $createdUser->Id;
$cardRegister->Currency = "EUR";
$cardPreRegistration = $mangoPayApi->CardRegistrations->Create($cardRegister);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Mangopay CardRegistration JavaScript Kit</title>
    <script type="text/javascript" src="../kit/mangopay-kit.js"></script>
</head>
<body>
<h4>
    CardRegistration Kit
</h4>
<p>
    <i>
        This demo shows how to register the card using the MangoPay CardRegistration JavaScript Kit.
    </i>
    <p>
        <small>In IE 8 & IE 9 this demo script must be executed using https.</small>
    </p>
</p>
<p>
    <table>
        <tr><td>Card number:</td><td><input id="card_number" value="4970100000000154" /></td></tr>
        <tr><td>Card expiration date:</td><td><input id="card_expiration_date" value="1020" /></td></tr>
        <tr><td>Card cvx:</td><td><input id="card_cvx" value="123" /></td></tr>
        <tr><td>Card type:</td><td><select id="card_type"><option value="CB_VISA_MASTERCARD">VISA</option><option value="CB_VISA_MASTERCARD">MasterCard</option><option value="CB_VISA_MASTERCARD">CB</option><option value="AMEX">American Express</option></select></td></tr>
     </table>
</p>
<p>
    <button id="process" onclick="javascript:registerCardDemo();">Process</button>
</p>
<p>
    <div id="result"></div>
</p>


<script type="text/javascript">

function registerCardDemo() {

    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Processing...";
    resultDiv.style.color = "black";

    // Card register data prepared on the server
    var cardRegisterData = {
        cardRegistrationURL: "<?php print $cardPreRegistration->CardRegistrationURL; ?>", 
        preregistrationData: "<?php print $cardPreRegistration->PreregistrationData; ?>", 
        accessKey: "<?php print $cardPreRegistration->AccessKey; ?>",
        Id: "<?php print $cardPreRegistration->Id; ?>"
    };

    // Card data collected from the user
    var cardData = {
         cardNumber: document.getElementById("card_number").value, 
         cardExpirationDate: document.getElementById("card_expiration_date").value, 
         cardCvx: document.getElementById("card_cvx").value,
         cardType: document.getElementById("card_type").value
    };

    // Set MangoPay API base URL and Client ID
    mangoPay.cardRegistration.baseURL = "<?php print $mangoPayApi->Config->BaseUrl; ?>";
    mangoPay.cardRegistration.clientId = "<?php print $mangoPayApi->Config->ClientId; ?>";

    // Initialize the CardRegistration Kit
    mangoPay.cardRegistration.init(cardRegisterData);

    // Register card
    mangoPay.cardRegistration.registerCard(cardData, 
        function(res) {
            var message = 'Card has been succesfully registered under the Card Id ' + res.CardId + '.<br />';
            message += 'Card is now ready to use e.g. in a «Direct PayIn» Object.';
            resultDiv.innerHTML = message;
            resultDiv.style.color = "green";
        },
        function(res) {
            var message = 'Error occured while registering the card.<br />';
            message += 'Code: ' + res.ResultCode + ', message: ' + res.ResultMessage;
            resultDiv.innerHTML = message;
            resultDiv.style.color = "red";
        }
    );
}

</script>
</body>
</html>
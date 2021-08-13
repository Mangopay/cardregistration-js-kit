declare module "mangopay-cardregistration-js-kit" {
  export type CardRegisterData = {
    Id: string;
    cardRegistrationURL: string;
    preregistrationData: string;
    accessKey: string;
  };

  export type CardData = {
    cardNumber: string;
    cardType: string;
    cardExpirationDate: string;
    cardCvx: string;
  };

  export type CardType =
    | "CB_VISA_MASTERCARD"
    | "DINERS"
    | "MASTERPASS"
    | "AMEX"
    | "MAESTRO"
    | "P24"
    | "IDEAL"
    | "BCMC"
    | "PAYLIB";

  export type CardRegistration = {
    Id: string;
    Tag: string;
    CardId: null | string;
    Status: string;
    UserId: string;
    CardType: CardType;
    Currency: string;
    AccessKey: string;
    CreationDate: number;
    ResultCode: null;
    ResultMessage: null;
    RegistrationData: null;
    CardRegistrationURL: string;
    PreregistrationData: string;
  };

  export type CardError = { ResultCode: string; ResultMessage: string };

  export type SuccessCallback = (registration: CardRegistration) => void;

  export type ErrorCallback = (error: CardError) => void;

  const mangoPay: {
    /**
     * Handles card registration process
     */
    cardRegistration: {
      /**
       * MangoPay API base URL. The default value uses sandbox envronment.
       *
       * Set it to https://api.mangopay.com to enable production environment
       */
      baseURL: string;

      /**
       * MangoPay Client ID to use with the MangoPay API
       *
       * Set it to your Client ID you use for MangoPay API
       */
      clientId: string;

      /**
       * Initialize card registration object
       *
       * @param {CardRegisterData} cardRegisterData Card pre-registration data {Id, cardRegistrationURL, preregistrationData, accessKey}
       */
      init: (cardRegisterData: CardRegisterData) => void;

      /**
       * Processes card registration and calls success or error callback
       *
       * @param {CardData} cardData Sensitive card details {cardNumber, cardType, cardExpirationDate, cardCvx}
       * @param {SuccessCallback} successCallback A function to invoke when the card registration succeeds. It will receive CardRegistration object.
       * @param {ErrorCallback} errorCallback A function to invoke when the the card registration fails. It will receive an error object {ResultCode, ResultMessage}.
       */
      registerCard: (
        cardData: CardData,
        successCallback: SuccessCallback,
        errorCallback: ErrorCallback
      ) => void;
    };

    /**
     * Browser support querying
     */
    browser: {
      /**
       * Returns true if browser is capable of making cross-origin Ajax calls
       */
      corsSupport: () => boolean;
    };
  };

  export default mangoPay;
}

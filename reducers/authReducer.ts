import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGOUT_USER,
  REGISTER_USER,
  VALIDATE_USER,
  SENT_VERIFICTION_CODE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  AUTH_UPDATE_USER_INFO,
  SET_ACCOUNT_INFO,
  SET_TOKEN_INFO,
  STRIPE_LINK,
  RESET_REGISTER_FLAG,
  CLEAR_AUTH_STATE,
  REGISTER_USER_BEFORE_CAMERA,
  GET_COUNTRIES_SUCCESS,
  EMAIL_AVAILABLE,
  EMAIL_NOT_AVAILABLE,
} from '../actions/authActions';

import { 
  GENERATE_TOKEN_SUCCESS, 
  GET_MY_PROFILE_SUCCESS,
  DELETE_ACCOUNT 
} from '../actions/luciaAppAction';

export const authInitialState = {
  token: null,
  user: {
    name: '',
    email: '',
    phone: '',
    user_stripe_account: ''
  },
  countries: [],
  isAuthenticated: false,
  isAuthenticating: false,
  isRegistered: false,
  isRegisteredBeforeCamera: false,
  isValidated: false,
  isSentVerificationCode: false,
  isEmailAvailable: false,
  isEmailRegisteredBefore: false,
  isSentLink: false,
  isUpdatedPassword: false,
  isDeletedAccount: false,
  accountInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 0,
    value: '',
    pass: '',
    confirm: '',
    profileImage: null
  },
  stripeUrl: '',
  isPaymentTokenGeneratedSuccess: false,
  isAddingPaymentMethodSuccess: false,
  isDeletePaymentMethodSuccess: false,
  userInfo: {
    access_token: ''
  },
  tokenInfo: null
};

export function authReducer(state = authInitialState, action: any) {
  switch (action.type) {
    case AUTH_LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };

    case AUTH_LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false
      };

    case AUTH_LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
      };

    case GET_MY_PROFILE_SUCCESS:
      return {
          ...state,
          user: action.myProfile
      };

    case AUTH_LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };

    case AUTH_UPDATE_USER_INFO:
      return {
        ...state,
        user: action.user
      };

    case REGISTER_USER:
      return {
        ...state,
        isRegistered: true,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false
      };

    case REGISTER_USER_BEFORE_CAMERA:
      return {
        ...state,
        isRegisteredBeforeCamera: true,
        token: action.registeredUser.access_token
      };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.countries
      };

    case VALIDATE_USER:
      return {
        ...state,
        isValidated: true,
        userInfo: action.userInfo
      };

    case SENT_VERIFICTION_CODE:
      return {
        ...state,
        isSentVerificationCode: true,
      };

    case EMAIL_AVAILABLE:
      return {
        ...state,
        isEmailAvailable: true,
        isEmailRegisteredBefore: false,
      };

    case EMAIL_NOT_AVAILABLE:
      return {
        ...state,
        isEmailAvailable: false,
        isEmailRegisteredBefore: true,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        isSentLink: true,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        isUpdatedPassword: true,
      };

    case DELETE_ACCOUNT:
      return {
        ...state,
        isDeletedAccount: true,
      };


    case SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: {
          ...state.accountInfo,
          ...action.accountInfo
        }
      }

    case RESET_REGISTER_FLAG:
      return {
        ...state,
        isRegistered: false,
        isRegisteredBeforeCamera: false,
        isSentVerificationCode: false
      }

    case SET_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: {
          ...action.tokenInfo
        }
      }

    case CLEAR_AUTH_STATE:
      return {
          ...state,
          isUpdatedPassword: false,  
          isDeletedAccount: false       
      }

    case STRIPE_LINK:
      return {
        ...state,
        stripeUrl: action.url
      }
    case GENERATE_TOKEN_SUCCESS:
        return {
            ...state,
            isPaymentTokenGeneratedSuccess: true,
            cardToken: action.data.card_token
        };
    default:
      return state;
  }
}

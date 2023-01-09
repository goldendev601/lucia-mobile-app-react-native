import axios from 'axios';
import { API_ENDPOINT } from '../constants/Api';

import { handleMessage } from './commonAction';

import { AsyncStorage } from 'react-native';

// Define Action Types
export const AUTH_LOGIN_USER_REQUEST = 'AUTH_LOGIN_USER_REQUEST';
export const AUTH_LOGIN_USER_FAILURE = 'AUTH_LOGIN_USER_FAILURE';
export const AUTH_LOGIN_USER_SUCCESS = 'AUTH_LOGIN_USER_SUCCESS';
export const AUTH_LOGOUT_USER = 'AUTH_LOGOUT_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_BEFORE_CAMERA = 'REGISTER_USER_BEFORE_CAMERA';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const VALIDATE_USER = 'VALIDATE_USER';
export const SENT_VERIFICTION_CODE = 'SENT_VERIFICTION_CODE';
export const EMAIL_AVAILABLE = 'EMAIL_AVAILABLE';
export const EMAIL_NOT_AVAILABLE = 'EMAIL_NOT_AVAILABLE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const AUTH_UPDATE_USER_INFO = 'AUTH_UPDATE_USER_INFO';
export const SET_ACCOUNT_INFO = 'SET_ACCOUNT_INFO';
export const RESET_REGISTER_FLAG = 'RESET_REGISTER_FLAG';
export const SET_TOKEN_INFO = 'SET_TOKEN_INFO';
export const STRIPE_LINK = 'STRIPE_LINK';
export const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE';
// End of Action Types

export function authLoginUserSuccess(token: string, user: any) {
  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    token,
    user,
  };
}

export function authRegisterSuccess() {
  return {
    type: REGISTER_USER,
  }
}

export function getCountriesSuccess(countries: any) {
  return {
    type: GET_COUNTRIES_SUCCESS,
    countries
  }
}

export function authRegisterSuccessBeforeCamera(registeredUser: any) {
  return {
    type: REGISTER_USER_BEFORE_CAMERA,
    registeredUser
  }
}

export function sendVerificationCodeSuccess() {
  return {
    type: SENT_VERIFICTION_CODE,
  }
}

export function emailAvailable() {
  return {
    type: EMAIL_AVAILABLE,
  }
}

export function emailNotAvailable() {
  return {
    type: EMAIL_NOT_AVAILABLE,
  }
}

export function acountValidationSuccess(userInfo: any) {
  return {
    type: VALIDATE_USER,
    userInfo
  }
}

export function authLoginUserFailure() {
  return {
    type: AUTH_LOGIN_USER_FAILURE,
  };
}

export function authLoginUserRequest() {
  return {
    type: AUTH_LOGIN_USER_REQUEST,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT_USER,
  };
}

export function resetSentLinkSuccess() {
  return {
    type: RESET_PASSWORD,
  };
}

export function stripeLink(url: string) {
  return {
    type: STRIPE_LINK,
    url
  }
}


export function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD,
  };
}



export function authUpdateUserInfo(user: any) {
  return {
    type: AUTH_UPDATE_USER_INFO,
    user,
  };
}

export function authLogoutAndRedirect() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    dispatch(authLogout());
    await AsyncStorage.removeItem(
      'login_data'
    )
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/logout`,
      });
      if (res.status === 200) {
        return Promise.resolve(); 
      }
    } catch (error: any) {
      // dispatch(handleMessage(true, 'error', 'There are something wrong in logout.'));
      console.log(error);
    }
    
  };
}

export const authLoginUser = (email: string, password: string) => {
  return async (dispatch: any) => {
    const payload = {
      email: email,
      password: password,
    };

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/login`,
        data: payload,
      });
      if (res.status === 200) {
        console.log(res)
        await AsyncStorage.setItem(
          'login_data',
          JSON.stringify({ user: res.data.user, user_id: res.data.user.id, token: res.data.access_token, name: res.data.user.name, email:  res.data.user.email})
        )
        dispatch(authLoginUserSuccess(res.data.access_token, res.data.user));
      }
    } catch (error: any) {
      dispatch(authLoginUserFailure());
      dispatch(handleMessage(true, 'error', 'Invalid Login'));
    }
  };
};


export function getCountries() {
  return async (dispatch: any, getState: any) => {
      try {
        const res = await axios({
          method: 'get',
          url: `${API_ENDPOINT}/constants/countries`,
        });
        if (res.status === 200) {
          dispatch(getCountriesSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
  }
}

export const authSignupUserForm = (
  formData: any,
) => {
  return async (dispatch: any, getState: any) => {
    const payload = formData;
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          ContentType: `multipart/form-data`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/register`,
        data: payload,
      });
      if (res.status === 200) {
        console.log('=====Account created========');
        dispatch(authRegisterSuccess());
      }
    } catch (error) {
      if (error.response.data.error) {
        dispatch(handleMessage(true, 'error', error.response.data.error));  
      } else {
        dispatch(handleMessage(true, 'error', 'Sorry, Please recheck your input info.'));
      }
    }
  };
};

export const authSignupUser = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address1: string,
  address2: string,
  city: string,
  state: string,
  zipCode: string,
  country: number,
  password: string,  
  password_confirmation: string,
  favoriteVacationSpot: string,
  preferredCuisine: string,
  allergies: string,
  profileImage: string
) => {
  return async (dispatch: any) => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address_line1: address1,
      address_line2: address2,
      city: city,
      state: state,
      zip: zipCode,
      country_id: country,
      password: password,
      password_confirmation: password_confirmation,
      favorite_vacation_spot: favoriteVacationSpot,
      preferred_cuisine: preferredCuisine,
      allergies: allergies,
      profile_image: profileImage
    };

    console.log(payload);

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/register`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(authRegisterSuccess());
      }
    } catch (error) {
      if (error.response.data.error) {
        dispatch(handleMessage(true, 'error', error.response.data.error));  
      } else {
        dispatch(handleMessage(true, 'error', 'This email has already been used before'));
      }
    }
  };
};

export const authSignupUserBeforeCamera = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address1: string,
  address2: string,
  country: string,
  state: string,
  zipCode: string,
  password: string,  
  password_confirmation: string,
  favoriteVacationSpot: string,
  preferredCuisine: string,
  allergies: string
) => {
  return async (dispatch: any) => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address_line1: address1,
      address_line2: address2,
      country: country,
      state: state,
      zip: zipCode,
      password: password,
      password_confirmation: password_confirmation,
      favorite_vacation_spot: favoriteVacationSpot,
      preferred_cuisine: preferredCuisine,
      allergies: allergies
    };

    console.log(payload);

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/register`,
        data: payload,
      });
      if (res.status === 200) {
        console.log('========Account created when move to camera screen============');
        dispatch(authRegisterSuccessBeforeCamera(res.data));
      }
    } catch (error) {
      if (error.response.data.error) {
        dispatch(handleMessage(true, 'error', error.response.data.error));  
      } else {
        dispatch(handleMessage(true, 'error', 'This email has already been used before'));
      }
    }
  };
};

export const checkEmailAvailability = (
  email: string,
) => {
  return async (dispatch: any) => {
    const payload = {
      email: email
    };

    console.log(payload);

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/auth/check-email-availability`,
        data: payload,
      });
      console.log(res.status);
      if (res.status === 200) {
        dispatch(emailAvailable());
      }
    } catch (error) {
      dispatch(emailNotAvailable());
    }
  };
};


export const sendVerificationCode = (
  email: string,
) => {
  return async (dispatch: any) => {
    const payload = {
      email: email
    };

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/password/reset`,
        data: payload,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(sendVerificationCodeSuccess());
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'Something went wrong'));
    }
  };
};

export const ValidateUser = (
  email: string,
  validateToken: string,
) => {
  return async (dispatch: any) => {
    const payload = {
      email: email,
      validation_token: validateToken,
    };

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/users/auth/account/verify`,
        data: payload,
      });
      if (res.status === 200) {
        console.log(res.data);
        dispatch(acountValidationSuccess(res.data));
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'Something wrong in account validation'));
    }
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: any) => {
    const payload = {
      email: email,
    };
    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/password/reset`,
        data: payload,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(resetSentLinkSuccess());
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'There are something wrong!'));
    }
  };
};

export const updatePassword = (
  email: string,
  validation_token: string,
  password: string,
  password_confirmation: string
) => {
  return async (dispatch: any) => {
    const payload = {
      email: email,
      password_reset_token: validation_token,
      password: password,
      password_confirmation: password_confirmation
    };

    console.log(payload);

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/client/auth/password/update`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(updatePasswordSuccess());
        dispatch(handleMessage(true, 'success', 'Password succesfully updated'));
      }
    } catch (error) {
      console.log(error);
      dispatch(handleMessage(true, 'error', 'You failed to update your password.'));
    }
  };
};



export const setAccountInfo = (accountInfo: any) => {
  return {
    type: SET_ACCOUNT_INFO,
    accountInfo
  };
}

export const resetRegisterFlag = () => {
  return {
    type: RESET_REGISTER_FLAG    
  };
}

export const setTokenInfo = (tokenInfo: any) => {
  return {
    type: SET_TOKEN_INFO,
    tokenInfo
  };
}

export function generateStripeAccessLink() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/users/auth/stripe/create`,
      });
      if (res.status === 200) {
        if (res.data.url) {
          dispatch(stripeLink(res.data.url))
        }
      }
    } catch (error: any) {
      // dispatch(handleMessage(true, 'error', 'There are something wrong in logout.'));
      console.log(error);
    }
  };
}

export function goStripeAccessLink(tokenInfo: any) {
  return async (dispatch: any, getState: any) => {
    const token = tokenInfo;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/users/auth/stripe/create`,
      });
      if (res.status === 200) {
        if (res.data.url) {
          dispatch(stripeLink(res.data.url))
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
}

export const clearAuthState = () => {
  return {
    type: CLEAR_AUTH_STATE,
  };
}



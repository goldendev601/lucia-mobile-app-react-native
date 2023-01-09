import axios from "axios";
import { API_ENDPOINT } from "../constants/Api";
import { CalendarEvent, Itinerary } from "../reducers";
import { handleMessage } from './commonAction';

// Define Action Types
export const GET_DASHBOARD_INFO_SUCCESS = 'GET_DASHBOARD_INFO_SUCCESS';
export const GENERATE_TOKEN_SUCCESS = 'GENERATE_TOKEN_SUCCESS';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export const GET_AVATARS_SUCCESS = 'GET_AVATARS_SUCCESS';
export const SET_ITINERARY_INFO = 'SET_ITINERARY_INFO';
export const SET_CALENDAR_EVENT_INFO = 'SET_CALENDAR_EVENT_INFO';
export const SET_CALENDAR_VIEW_SETTING = 'SET_CALENDAR_VIEW_SETTING';
export const SET_DATE_INFO = 'SET_DATE_INFO';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const GET_ITINERARY_DETAIL_SUCCESS = 'GET_ITINERARY_DETAIL_SUCCESS';
export const GET_CALENDAR_EVENTS_SUCCESS = 'GET_CALENDAR_EVENTS_SUCCESS';
export const GET_CALENDAR_EVENTS_DETAIL_SUCCESS = 'GET_CALENDAR_EVENTS_DETAIL_SUCCESS';
export const SET_NEW_EMAIL_INFO = 'SET_NEW_EMAIL_INFO';
export const SET_NEW_PHONE_INFO = 'SET_NEW_PHONE_INFO';
export const SENT_VALIDATION_TOKEN_SUCCESS = 'SENT_VALIDATION_TOKEN_SUCCESS';
export const UPDATE_EMAIL_SUCCESS = 'UPDATE_EMAIL_SUCCESS';
export const UPDATE_PHONE_SUCCESS = 'UPDATE_PHONE_SUCCESS';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const CLEAR_PERSONAL_UPDATED_FLAG = 'CLEAR_PERSONAL_UPDATED_FLAG';
export const CLEAR_CALENDAR_EVENTS_DETAIL = 'CLEAR_CALENDAR_EVENTS_DETAIL';
export const CLEAR_ITINERARY_DETAIL_INFO = 'CLEAR_ITINERARY_DETAIL_INFO';

// End of Action Types

export function getDashboardInfoSuccess(dashboardInfo: any) {
  return {
    type: GET_DASHBOARD_INFO_SUCCESS,
    dashboardInfo,
  };
}

export function getMyProfileSuccess(myProfile: any) {
  return {
    type: GET_MY_PROFILE_SUCCESS,
    myProfile,
  };
}

export function getAvatarsSuccess(avatars: any) {
  return {
    type: GET_AVATARS_SUCCESS,
    avatars,
  };
}

export function SentValidationTokenSuccess() {
  return {
    type: SENT_VALIDATION_TOKEN_SUCCESS,
  };
}

export function UpdateEmailSuccess() {
  return {
    type: UPDATE_EMAIL_SUCCESS,
  };
}

export function UpdatePhoneSuccess() {
  return {
    type: UPDATE_PHONE_SUCCESS,
  };
}

export function UpdateProfileSuccess(myProfile: any) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    myProfile
  };
}

export function deleteAccountSuccess() {
  return {
    type: DELETE_ACCOUNT,
  };
}


export function getItineraryDetailSuccess(itineraryDetailInfo: any) {
  return {
    type: GET_ITINERARY_DETAIL_SUCCESS,
    itineraryDetailInfo,
  };
}

export function getCalendarEventsSuccess(calendarEvents: any) {
  return {
    type: GET_CALENDAR_EVENTS_SUCCESS,
    calendarEvents,
  };
}

export function getCalendarEventsDetailSuccess(calendarEventsDetail: any) {
  return {
    type: GET_CALENDAR_EVENTS_DETAIL_SUCCESS,
    calendarEventsDetail,
  };
}

export function generateTokenSuccess(data: any) {
  return {
    type: GENERATE_TOKEN_SUCCESS,
    data
  }
}

export function getMyProfile() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/client/profile`,
        });
        if (res.status === 200) {
          dispatch(getMyProfileSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export function getAvatars() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/avatars`,
      });
      if (res.status === 200) {
        dispatch(getAvatarsSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}


export function getDashBoardInfo() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    console.log(token)
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/client/itineraries`,
        });
        if (res.status === 200) {
          dispatch(getDashboardInfoSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}

export const getFilteredItineraryList = (
  search: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            "search": search,
          },
          method: 'get',
          url: `${API_ENDPOINT}/client/itineraries`,
        });
        if (res.status === 200) {
          dispatch(getDashboardInfoSuccess(res.data));
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }
}


export function getItineraryDetail(id: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/client/itineraries/${id}/fetch`,
      });
      if (res.status === 200) {
        dispatch(getItineraryDetailSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getCalendarEvents(startDate: string, endDate: string) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/client/calendar/events?from=${startDate}&to=${endDate}`,
      });
      if (res.status === 200) {
        dispatch(getCalendarEventsSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export function getCalendarEventsDetail(itineraryId: number, bookingId: number, categoryId: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/client/calendar/events/detail?itinerary_id=${itineraryId}&booking_id=${bookingId}&category_id=${categoryId}`,
      });
      if (res.status === 200) {
        dispatch(getCalendarEventsDetailSuccess(res.data));
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}

export const sendValidationToken = () => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/send-validation-token`,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(SentValidationTokenSuccess());
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'There are something wrong!'));
    }
  };
};

export const updateEmail = (
  currentEmail: string,
  newEmail: string,
  resetCode: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      current_email: currentEmail,
      new_email: newEmail,
      reset_code: resetCode,
    };
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update-email`,
        data: payload,
      });
      if (res.status === 200) {
        console.log(res);
        dispatch(UpdateEmailSuccess());
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'Failed! Please recheck your input info.'));
    }
  };
};

export const updatePhone = (
  currentPhone: string,
  newPhone: string,
  resetCode: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      current_phone: currentPhone,
      new_phone: newPhone,
      reset_code: resetCode,
    };
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update-phone`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(UpdatePhoneSuccess());
        dispatch(handleMessage(true, 'success', 'Phone succesfully updated'));
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

export const updateProfile = (
  profileImage: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      profile_image: profileImage,
    };
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(UpdateProfileSuccess(res.data));
        dispatch(handleMessage(true, 'success', 'Profile photo updated'));
      }
    } catch (error) {
      if (error.response.data.error) {
        dispatch(handleMessage(true, 'error', error.response.data.error));  
      } else {
        dispatch(handleMessage(true, 'error', 'Upload failed. Please try again'));
      }
    }
  };
};

export const updateFirstName = (
  firstName: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
    };
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(UpdateProfileSuccess(res.data));
        dispatch(handleMessage(true, 'success', 'Name succesfully updated.'));
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


export const deleteAccount = (
  password: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      password: password,
    };

    console.log(payload);

    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/delete`,
        data: payload,
      });
      if (res.status === 200) {
        console.log('======')
        dispatch(deleteAccountSuccess());
        dispatch(handleMessage(true, 'success', 'Your account has been deleted succecssfully.'));
      }
    } catch (error) {
      dispatch(handleMessage(true, 'error', 'Please enter a correct password.'));
    }
  };
};

export const updateLastName = (
  lastName: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      last_name: lastName,
    };
    console.log(payload)
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update`,
        data: payload,
      });
      if (res.status === 200) {
        dispatch(UpdateProfileSuccess(res.data));
        dispatch(handleMessage(true, 'success', 'Name succesfully updated.'));
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

export const updatePhoto = (
  formData: any,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = formData;
    console.log(payload)
    console.log(token);
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: `multipart/form-data`
        },
        method: 'post',
        url: `${API_ENDPOINT}/client/profile/update`,
        data: payload,
      });
      if (res.status === 200) {
        console.log('=====photo changed========');
        dispatch(UpdateProfileSuccess(res.data));
        dispatch(handleMessage(true, 'success', 'Profile photo updated'));
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

export const setDateInfo = (dateInfo: string) => {
  return {
    type: SET_DATE_INFO,
    dateInfo
  };
}

export const setNewEmailInfo = (email: string, newEmail: string) => {
  return {
    type: SET_NEW_EMAIL_INFO,
    newEmailInfo: {
      currentEmail: email,
      newEmail: newEmail
    }
  };
}


export const setNewPhoneInfo = (phone: string, newPhone: string) => {
  return {
    type: SET_NEW_PHONE_INFO,
    newPhoneInfo: {
      currentPhone: phone,
      newPhone: newPhone
    }
  };
}


export const setItineraryInfo = (itineraryInfo: Itinerary) => {
  return {
    type: SET_ITINERARY_INFO,
    itineraryInfo
  };
}

export const setCalendarEventInfo = (calendarEventInfo: CalendarEvent) => {
  return {
    type: SET_CALENDAR_EVENT_INFO,
    calendarEventInfo
  };
}


export const setCalendarViewSetting = (calendarViewSetting: string) => {
  return {
    type: SET_CALENDAR_VIEW_SETTING,
    calendarViewSetting
  };
}

export const clearPersonalUpdatedFlag = () => {
  return {
    type: CLEAR_PERSONAL_UPDATED_FLAG,
  };
}

export const clearItineraryDetailInfo = () => {
  return {
    type: CLEAR_ITINERARY_DETAIL_INFO,
  };
}

export const clearCalendarEventsDetail = () => {
  return {
    type: CLEAR_CALENDAR_EVENTS_DETAIL,
  };
}



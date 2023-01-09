import {
    GENERATE_TOKEN_SUCCESS,
    SET_DATE_INFO,
    SET_ITINERARY_INFO,
    SET_CALENDAR_EVENT_INFO,
    SET_CALENDAR_VIEW_SETTING,
    GET_MY_PROFILE_SUCCESS,
    GET_AVATARS_SUCCESS,
    GET_ITINERARY_DETAIL_SUCCESS,
    GET_CALENDAR_EVENTS_SUCCESS,
    GET_CALENDAR_EVENTS_DETAIL_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    SET_NEW_EMAIL_INFO,
    SET_NEW_PHONE_INFO,
    SENT_VALIDATION_TOKEN_SUCCESS,
    UPDATE_EMAIL_SUCCESS,
    UPDATE_PHONE_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
    CLEAR_PERSONAL_UPDATED_FLAG,
    CLEAR_CALENDAR_EVENTS_DETAIL,
    CLEAR_ITINERARY_DETAIL_INFO
} from '../actions/luciaAppAction';

export interface Itinerary {
    identification: string;
    title: string
    start_date: string
    end_date: string
    pictures: []
    sharing: any
    status: string
    abstract_note: string
}

export interface EmailInfo {
    currentEmail: string;
    newEmail: string;   
}

export interface PhoneInfo {
    currentPhone: string;
    newPhone: string;   
}

export interface ItineraryDetailInfo {
    id: number;
    identification: string;
    title: string;
    client: string;
    client_phone: string;
    client_emails: any;
    start_date: string;
    end_date: string;
    pictures: any;
    documents: any;
    status: string;
    abstract_note: string;
    show_price_on_share: string;
    mark_as_client_approved: string;
    currency: string;
    currency_id: number;
    total_price: any;
    travelers: any;
    itinerary_theme: any;
    bookings: any;
    dates: any;
    tasks: any;
}

const initItineraryDetailInfo: ItineraryDetailInfo = {
    id: 1,
    identification: "",
    title: "",
    client: "",
    client_phone: "",
    client_emails: [],
    start_date: "",
    end_date: "",
    pictures: [],
    documents: [],
    status: "",
    abstract_note: "",
    show_price_on_share: "",
    mark_as_client_approved: "",
    currency: "",
    currency_id: 1,
    total_price: [],
    travelers: [],
    itinerary_theme: [],
    bookings: [],
    dates: [],
    tasks: [],
}

export interface CalendarEvent {
    uniqueId: string;
    category_id: number;
    booking_id: number;
    itinerary_id: number;
    title: string;
    itinerary: string;
    start: string;
    end: string;
    allDay: boolean;
    resource: any;
}

export interface MyProfile {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    phone: string;
    location: string;
    address_line1: string;
    address_line2: string;
    country: string;
    state: string;
    zip: string;
    agency_name: string;
    job_title: string;
    date_of_birth: string;
    role_id: number;
    preferred_timezone_tzab: string;
    default_currency: string;
    has_valid_license: boolean;
    linkedin_url: string;
    agency_usage_mode_id: any;
    agency_usage_mode: any;
    is_google_auth_validated: boolean;
    stripe_connect: any;    
    default_currency_id: number;
    role: string;
    account_status_id: number;
    account_status: string;
    itinerary_theme: any;
    master_account: any;
    co_pilot_duties: any;
    copilot_info: any;
    client_info: any;
}

export interface DashboardInfo {
    trips: [],
    past_trips: []
}


export const luciaAppInitialState: {
    dashboardInfo: DashboardInfo,
    itineraryInfo: Itinerary,
    calendarViewSetting: string,
    myProfile: MyProfile,
    avatars: any,
    dateInfo: string,
    newEmailInfo: EmailInfo,
    newPhoneInfo: PhoneInfo,
    itineraryDetailInfo: ItineraryDetailInfo,
    isSentValidationCode: boolean,
    isUpdatedEmail: boolean,
    isUpdatedPhone: boolean,
    isUpdatedProfile: boolean,
    calendarEvents: CalendarEvent[],
    calendarEventsDetail: any,
    calendarEventInfo: CalendarEvent
} = {
    dashboardInfo: {
        trips: [],
        past_trips: []
    },
    myProfile: {
        id: 1,
        name: '',
        email: '',
        first_name: '',
        last_name: '',
        profile_image_url: '',
        phone: '',
        date_of_birth: '',
        role_id: 3,
        preferred_timezone_tzab: 'EDT',
        account_status_id: 2,
        default_currency_id: 144,
        role: 'Public User',
        location: '',
        address_line1: '',
        address_line2: '',
        country: '',
        state: '',
        zip: '',
        agency_name: '',
        job_title: '',
        default_currency: 'USD',
        has_valid_license: false,
        linkedin_url: '',
        agency_usage_mode_id: null,
        agency_usage_mode: null,
        is_google_auth_validated: false,
        stripe_connect: null,   
        account_status: '',
        itinerary_theme: null,
        master_account: null,
        co_pilot_duties: [],
        copilot_info: null,
        client_info: null
    },
    avatars: [],
    dateInfo: '',
    newEmailInfo: {
        currentEmail: '',
        newEmail: ''
    },
    newPhoneInfo: {
        currentPhone: '',
        newPhone: ''
    },
    itineraryDetailInfo: initItineraryDetailInfo,
    itineraryInfo: {
        identification: "",
        title: "",
        start_date: "",
        end_date: "",
        sharing: null,
        pictures: [],
        status: "",
        abstract_note: ""
    },
    calendarViewSetting: 'day',
    isSentValidationCode: false,
    isUpdatedEmail: false,
    isUpdatedPhone: false,
    isUpdatedProfile: false,
    calendarEvents: [],
    calendarEventsDetail: null,
    calendarEventInfo: {
        uniqueId: "",
        category_id: 0,
        booking_id: 0,
        itinerary_id: 0,
        title: "",
        itinerary: "",
        start: "",
        end: "",
        allDay: false,
        resource: null
    }
};


export function luciaAppReducer(state = luciaAppInitialState, action: any) {

    switch (action.type) {

        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: action.myProfile as MyProfile
            };

        case GET_AVATARS_SUCCESS:
            return {
                ...state,
                avatars: action.avatars
            };

        case GET_DASHBOARD_INFO_SUCCESS:
            return {
                ...state,
                dashboardInfo: action.dashboardInfo as DashboardInfo
            };

        case GET_ITINERARY_DETAIL_SUCCESS:
            return {
                ...state,
                itineraryDetailInfo: action.itineraryDetailInfo as ItineraryDetailInfo
            };

        case GET_CALENDAR_EVENTS_SUCCESS:
            return {
                ...state,
                calendarEvents: action.calendarEvents as CalendarEvent
            };

        case GET_CALENDAR_EVENTS_DETAIL_SUCCESS:
            return {
                ...state,
                calendarEventsDetail: action.calendarEventsDetail
            };

        case GENERATE_TOKEN_SUCCESS:
            return {
                ...state,
                isPaymentTokenGeneratedSuccess: true,
                cardToken: action.data.card_token
            };

        case SENT_VALIDATION_TOKEN_SUCCESS:
            return {
                ...state,
                isSentValidationCode: true
            };

        case UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                isUpdatedEmail: true
            };

        case UPDATE_PHONE_SUCCESS:
            return {
                ...state,
                isUpdatedPhone: true
            };

        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isUpdatedProfile: true,
                myProfile: action.myProfile as MyProfile
            };

        case SET_DATE_INFO:
            return {
                ...state,
                dateInfo: action.dateInfo,
            }
        case SET_NEW_EMAIL_INFO:
            return {
                ...state,
                newEmailInfo: action.newEmailInfo
            }
        case SET_NEW_PHONE_INFO:
            return {
                ...state,
                newPhoneInfo: action.newPhoneInfo
            }
        case SET_ITINERARY_INFO:
            return {
                ...state,
                itineraryInfo: action.itineraryInfo
            }
        case SET_CALENDAR_EVENT_INFO:
            return {
                ...state,
                calendarEventInfo: action.calendarEventInfo
            }
        case SET_CALENDAR_VIEW_SETTING:
            return {
                ...state,
                calendarViewSetting: action.calendarViewSetting
            }
        case CLEAR_PERSONAL_UPDATED_FLAG:
            return {
                ...state,
                isSentValidationCode: false,   
                isUpdatedEmail: false,
                isUpdatedPhone: false, 
                isUpdatedProfile: false     
            }
        case CLEAR_CALENDAR_EVENTS_DETAIL:
            return {
                ...state,
                calendarEventsDetail: null,   
            }
        case CLEAR_ITINERARY_DETAIL_INFO:
            return {
                ...state,
                itineraryDetailInfo: initItineraryDetailInfo,   
            }
        default:
            return state;
    }
}

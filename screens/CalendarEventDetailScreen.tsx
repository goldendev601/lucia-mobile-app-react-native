import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { clearItineraryDetailInfo, getCalendarEventsDetail, getItineraryDetail } from '../actions/luciaAppAction';
import { useFonts } from 'expo-font';
import * as WebBrowser from 'expo-web-browser';

interface ICalendarEventDetailScreenProps {
    navigation: NavigationProp<any>;
}

const CalendarEventDetailScreen: React.FC<ICalendarEventDetailScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { calendarEventInfo, calendarEventsDetail, itineraryDetailInfo } = useSelector((state: IRootState) => state.luciaApp);

    useEffect(() => {
        if (calendarEventInfo) {
            const bookingId = calendarEventInfo.booking_id;
            const categoryId = calendarEventInfo.category_id;
            const itineraryId = calendarEventInfo.itinerary_id;
            if (bookingId && categoryId && itineraryId) {
                dispatch(getCalendarEventsDetail(itineraryId, bookingId, categoryId))
            }
        }
    }, [calendarEventInfo])
    
    console.log(calendarEventsDetail);

    const gotoItineraryDetail = (itineraryId: number) => {
        dispatch(getItineraryDetail(itineraryId));
    };
    

    useEffect(() => {
        if (itineraryDetailInfo && itineraryDetailInfo.sharing) {
           console.log(itineraryDetailInfo.sharing);
           if (itineraryDetailInfo.sharing) {
               WebBrowser.openBrowserAsync(itineraryDetailInfo.sharing.appUrl); 
           }
        }
    }, [itineraryDetailInfo])

    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
        'Lato': require('../assets/fonts/Lato-Light.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    const option = {
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    }

    const dateToMyDate = (date: any) => {
        var d = date.substr(0, 10);
        var z = new Date(d).toTimeString().split(' ')[1];
        return new Date(d + 'T00:00:00.000' + z.substr(-5, 3) + ":" + z.substr(-2));
    }

    const dateToMyTimeAMPM = (date: any) => {
        var hour = date.slice(11, 13);
        var minute = date.slice(14, 16);
        var newHour = '';
        var t = '';
        if (parseInt(hour) > 12) {
            newHour = (parseInt(hour) - 12).toString();
            t = newHour + ':' + minute + 'PM';
        }
        else if (parseInt(hour) === 12) {
            t = '12:' + minute + 'PM';
        }
        else {
            t = hour + ':' + minute + 'AM';
        }
        return t;
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[styles.scrollContainer]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerWrapper}>
                    <Text style={[styles.headerTitle, {fontFamily: 'Montserrat'}]}>Event Details</Text>
                    <Pressable style={styles.iconButton} onPress={closeModal}>
                        <Icon3 style={styles.textLink} name="close" size={25} color="#FFF" />
                    </Pressable>
                </View>
                {
                    calendarEventsDetail && (
                        <>
                        <View style={[styles.titleWrapper]}>
                            {
                                fontsLoaded && (
                                    <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>{calendarEventsDetail.title}</Text>
                                )
                            }
                            
                        </View>
                        <View style={styles.dateInfoWrapper}>
                            {
                                fontsLoaded && calendarEventsDetail.start_date_locale && (
                                    <Text style={[styles.dateInfo, {fontFamily: 'Montserrat'}]}>{dateToMyDate(calendarEventsDetail.start_date_locale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(calendarEventsDetail.start_date_locale)}</Text>
                                )
                            }
                            {
                                fontsLoaded && calendarEventsDetail.start_datetime_locale && (
                                    <Text style={[styles.dateInfo, {fontFamily: 'Montserrat'}]}>{dateToMyDate(calendarEventsDetail.start_datetime_locale).toLocaleDateString('en-US', option)} - {dateToMyTimeAMPM(calendarEventsDetail.start_datetime_locale)}</Text>
                                )
                            }
                        </View>
                        {
                            calendarEventsDetail.pictures && calendarEventsDetail.pictures.length > 0 && calendarEventsDetail.pictures[0].image_url && (
                                <View style={styles.imageWrapper} >
                                    <Image
                                        source={{
                                            uri: calendarEventsDetail.pictures[0].image_url,
                                        }}
                                        resizeMode="cover"
                                        style={styles.imageInfo}
                                    />
                                </View>
                            )
                        }

                        {
                            fontsLoaded && calendarEventsDetail.notes && calendarEventsDetail.notes.length > 0 && (
                                <View style={styles.abstractNoteWrapper} >
                                    <Text style={[styles.abstractNote, {fontFamily: 'Lato'}]}>
                                        {(calendarEventsDetail.notes).replace(/<[^>]+>/g, '').replace('&nbsp;', '')}
                                    </Text>
                                </View>
                            )
                        }

                        {
                            fontsLoaded && calendarEventInfo && calendarEventInfo.itinerary_id && (
                                <Pressable style={styles.buttonContainer} onPress={() => gotoItineraryDetail(calendarEventInfo.itinerary_id)}>
                                    <View style={styles.buttonWrapper} >
                                        <Text style={[styles.buttonInfoText, {fontFamily: 'Montserrat'}]}>
                                            View full itinerary
                                        </Text>
                                    </View>
                                </Pressable>
                            )
                        }
                        
                        </>
                    )
                }
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    iconCloseImage: {
        width: 30,
        height: 30,
        marginTop: 5
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 42,
        marginBottom: 42
    },
    buttonWrapper: {
        width: '80%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#242424',
        borderRadius: 50
    },
    buttonInfoText: {
        color: '#FFF',
        fontWeight: '600',
        lineHeight: 20,
        fontSize: 12,
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    textLink: {
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: 20,
    },
    logoImage: {
        width: 70,
        height: 10,
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 40,
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30
    },
    headerTitle: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 4,
        textAlign: 'center',
        color: '#FFF',
        marginTop: 25
    },
    title: {
        fontSize: 28,
        fontWeight: '300',
        justifyContent: 'center',
        color: '#FFF',
        lineHeight: 34
    },
    dateInfoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30
    },
    dateInfo: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '400',
        justifyContent: 'center',
        color: '#FFF',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30
    },
    bookingImageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent',
    },
    bookingContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30
    },
    bookingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#232121',
        padding: 20
    },
    imageInfo: {
        width: '100%',
        height: 300,
    },
    abstractNoteWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: 'transparent',        
    },
    abstractTitle: {
        fontSize: 15,
        fontWeight: '600',
        justifyContent: 'center',
        color: '#FFF',
        textTransform: 'uppercase',
        paddingLeft: 30,
        paddingRight: 30,
        letterSpacing: 2
    },
    bookingDate: {
        fontSize: 17,
        fontWeight: '600',
        justifyContent: 'center',
        color: '#BA886E',
        textTransform: 'uppercase',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 40
    },
    bookingTitle: {
        fontSize: 20,
        fontWeight: '300',
        justifyContent: 'center',
        color: '#FFF',
        lineHeight: 36,
    },
    abstractNote: {
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 26,
        justifyContent: 'center',
        color: '#FFF',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        backgroundColor: '#232121',
    },
    bookingNote: {
        fontSize: 12,
        fontWeight: '300',
        lineHeight: 26,
        justifyContent: 'center',
        color: '#FFF',
        marginTop: 20
    },
    bookingInfoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'transparent',
    },
});

export default CalendarEventDetailScreen;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import { IRootState } from '../reducers';
import { getItineraryDetail } from '../actions/luciaAppAction';
import { useFonts } from 'expo-font';

interface IEventDetailScreenProps {
    navigation: NavigationProp<any>;
}

const ItineraryDetailScreen: React.FC<IEventDetailScreenProps> = (props) => {

    const dispatch = useDispatch();

    const { itineraryInfo, itineraryDetailInfo } = useSelector((state: IRootState) => state.luciaApp);

    useEffect(() => {
        if (itineraryInfo) {
            const itinerary_id = parseInt(itineraryInfo.identification);
            dispatch(getItineraryDetail(itinerary_id))
        }
    }, [itineraryInfo])


    const closeModal = () => {
        props.navigation.goBack();
    };

    let [fontsLoaded] = useFonts({
        'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
        'Lato': require('../assets/fonts/Lato-Light.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    return (
        <View style={styles.wrapper}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={[styles.scrollContainer]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerWrapper}>
                    <Pressable  onPress={closeModal}>
                        <Image
                            source={require("../assets/images/nav-arrow-right.png")}
                            style={styles.iconCloseImage}
                            resizeMode="cover"
                        />
                    </Pressable>
                    {/* <Image
                        source={require('../assets/images/searchIcon.png')}
                        style={styles.iconCloseImage}
                        resizeMode="cover"
                    /> */}
                </View>
                {
                    itineraryDetailInfo && (
                        <>
                        <View style={[styles.titleWrapper]}>
                            {
                                fontsLoaded && (
                                    <Text style={[styles.title, {fontFamily: 'Montserrat'}]}>{itineraryDetailInfo.title}</Text>
                                )
                            }
                            
                        </View>
                        <View style={styles.dateInfoWrapper}>
                            {
                                fontsLoaded && (
                                    <Text style={[styles.dateInfo, {fontFamily: 'Montserrat'}]}>{itineraryDetailInfo.start_date} to {itineraryDetailInfo.end_date}</Text>
                                )
                            }
                            
                        </View>
                        {
                            itineraryDetailInfo.pictures.length > 0 && (
                                <View style={styles.imageWrapper} >
                                    <Image
                                        source={{
                                            uri: itineraryDetailInfo.pictures[0],
                                        }}
                                        resizeMode="cover"
                                        style={styles.imageInfo}
                                    />
                                </View>
                            )
                        }

                        {
                            itineraryDetailInfo.abstract_note.length > 0 && (
                                <View style={styles.abstractNoteWrapper} >
                                    <Text style={[styles.abstractTitle, {fontFamily: 'Montserrat'}]}>Abstract</Text>
                                    <Text style={styles.abstractNote}>
                                        {(itineraryDetailInfo.abstract_note).replace(/<[^>]+>/g, '').replace('&nbsp;', '')}
                                    </Text>
                                </View>
                            )
                        }

                        {
                            Object.keys(itineraryDetailInfo.bookings).map((bookingDate: any, index: number) => {
                                return (
                                    <View style={styles.bookingInfoWrapper}>
                                        {
                                            itineraryDetailInfo.bookings[bookingDate].length > 0 && (
                                                <> 
                                                    <Text style={[styles.bookingDate, {fontFamily: 'Montserrat'}]}>{bookingDate}</Text>
                                                    {
                                                        itineraryDetailInfo.bookings[bookingDate].map((booking: any, bookingIndex: number) => {
                                                            return (
                                                                <View style={styles.bookingContainer}>
                                                                    {
                                                                        booking.pictures && booking.pictures.length > 0 && (
                                                                            <View style={styles.bookingImageWrapper} >
                                                                                <Image
                                                                                    source={{
                                                                                        uri: booking.pictures[0],
                                                                                    }}
                                                                                    resizeMode="cover"
                                                                                    style={styles.imageInfo}
                                                                                />
                                                                            </View>
                                                                        )
                                                                    }
                                                                    <View style={styles.bookingWrapper} >
                                                                        {
                                                                            (booking.title && booking.title.length > 0) && (
                                                                                <Text style={[styles.bookingTitle, { fontFamily: 'Montserrat' }]}>{booking.title}</Text>
                                                                            )
                                                                        }
                                                                        {
                                                                            booking.notes !== "" && (
                                                                                <Text style={[styles.bookingNote, { fontFamily: 'Montserrat' }]}>
                                                                                    {booking.notes}
                                                                                </Text>
                                                                            )
                                                                        }
                                                                    </View>
                                                                </View>
                                                                
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                        }
                                        
                                    </View>
                                )
                            })
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
    title: {
        fontSize: 28,
        fontWeight: '400',
        justifyContent: 'center',
        color: '#BA886E',
    },
    dateInfoWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30
    },
    dateInfo: {
        fontSize: 12,
        fontWeight: '600',
        justifyContent: 'center',
        color: '#FFF',
        textTransform: 'uppercase',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30,
        backgroundColor: 'transparent',
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
        marginTop: 30,
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
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30
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

export default ItineraryDetailScreen;

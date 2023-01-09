import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { clearPersonalUpdatedFlag, getMyProfile } from '../actions/luciaAppAction';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    mainContainer: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    footerContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 40,
        paddingLeft: 30,
        paddingRight: 30,
    },
    buttonContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30,
        position: 'absolute',
        bottom: 50
    },
    AboveWrapper: {
        width: '100%',
        height: 240,
        backgroundColor: 'transparent',
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
    textLinkWrapper: {
        justifyContent: 'center',
        paddingVertical: 5,
    },
    textLink: {
    },
    textLinkStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatarWrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        marginLeft: 30
    },
    profileTextWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        marginLeft: 10,
        textAlign: 'left'
    },
    nameInfo: {
        fontSize: 16,
        lineHeight: 30,
        color: '#FFF',
        fontWeight: '600',
        marginTop: 5,
    },
    roleInfo: {
        fontSize: 16,
        lineHeight: 30,
        color: '#BA886E',
        fontWeight: '600',
        marginTop: 5,
    },
    userNameInfo: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        fontWeight: '400'
    },
    infoLinkContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: 'transparent'
    },
    titleInfo: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 2,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12,
        backgroundColor: 'transparent',
        textTransform: 'uppercase'
    },
    logoInfo: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 2,
        color: '#FFF',
        textAlign: 'left',
        fontWeight: '600',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12,
        backgroundColor: 'transparent',
        textTransform: 'uppercase'
    },
    footerInfo: {
        fontSize: 8,
        lineHeight: 20,
        letterSpacing: 1,
        color: '#FFF',
        textAlign: 'left',
        fontWeight: '400',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12,
        backgroundColor: 'transparent',
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    profileImage: {
        width: 84,
        height: 84,
        borderRadius: 42,
        overflow: 'hidden'
    },
    iconCloseImage: {
        width: 30,
        height: 30,
        marginTop: 5,
    },
});

interface IListScreenProps {
    navigation: NavigationProp<any>;
}

const ListScreen: React.FC<IListScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
        'Lato': require('../assets/fonts/Lato-Light.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    const goBack = () => {
        navigation.goBack();
    };

    const goHomeScreen = () => {
        navigation.navigate('List');
    };

    const goProfileScreen = () => {
        navigation.navigate('ProfileScreen');
    };

    const goCalendarScreen = () => {
        navigation.navigate('CalendarScreen');
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        dispatch(getMyProfile())
        dispatch(clearPersonalUpdatedFlag())
      }, [])

    const { myProfile } = useSelector((state: IRootState) => state.luciaApp)

    return (

        <View
            style={[styles.scrollContainer]}
        >
            {
                myProfile && (
                    <View style={styles.AboveWrapper}>
                        <View style={styles.headerWrapper}>
                            <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                                <Icon1
                                    name="close"
                                    size={24}
                                    color="#BA886E"
                                    style={styles.iconCloseImage}
                                />
                            </Pressable>
                            <View>
                            </View>
                        </View>
                        <View style={styles.avatarWrapper}>
                            {
                                (myProfile.profile_image_url != null && myProfile.profile_image_url.length > 0) ? (
                                    <Image
                                        source={{
                                            uri: myProfile.profile_image_url,
                                        }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Image
                                        source={require("../assets/images/avatar.png")}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />
                                )
                            }
                            {fontsLoaded && (
                                <View style={styles.profileTextWrapper}>
                                    <Text style={[styles.nameInfo, { fontFamily: 'Montserrat' }]} >
                                        {myProfile.name}
                                    </Text>
                                    <Text style={[styles.roleInfo, { fontFamily: 'Montserrat' }]} >
                                        Traveler
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )
            }
            
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <Pressable onPress={goHomeScreen} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                    My Itineraries
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={goProfileScreen} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                    Profile
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={goCalendarScreen} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                    Calendar
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={logout} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                    Logout
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                </>
            )}
            <View style={styles.footerContainer}>
                <Text style={[styles.logoInfo, { fontFamily: 'Montserrat' }]} >
                    LUCIA
                </Text>
                <Text style={[styles.footerInfo, { fontFamily: 'Montserrat' }]} >
                    @lucia 2021, All rights reserved - V1
                </Text>
            </View>
        </View>
    );
};

export default ListScreen;

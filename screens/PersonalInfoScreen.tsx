import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { clearPersonalUpdatedFlag, getMyProfile } from '../actions/luciaAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    mainContainer: {
        height: 412,
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        paddingTop: 24
    },
    AboveWrapper: {
        width: '100%',
        height: 120,
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
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    nameInfo: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600'
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
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderBottomColor: '#383838',
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: 'transparent'
    },
    mainTitle: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        paddingTop: 8,
        textTransform: 'uppercase'
    },
    titleInfo: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '300',
        alignItems: 'center',
        paddingTop: 3,
    },
    valueInfo: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
        opacity: 0.5
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden'
    },
});

interface IPersonalInfoScreenProps {
    navigation: NavigationProp<any>;
}

const PersonalInfoScreen: React.FC<IPersonalInfoScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
        'Lato': require('../assets/fonts/Lato-Light.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const goBack = () => {
        navigation.goBack();
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        dispatch(getMyProfile())
        dispatch(clearPersonalUpdatedFlag())
      }, [])

    const { myProfile } = useSelector((state: IRootState) => state.luciaApp)

    const gotoResetPassword = () => {
        navigation.navigate('ResetPasswordScreen');
    };

    const gotoResetEmail = () => {
        navigation.navigate('ResetEmailScreen');
    };

    const gotoResetPhone = () => {
        navigation.navigate('ResetPhoneScreen');
    };

    const gotoResetFirstName = () => {
        navigation.navigate('ResetFirstNameScreen');
    };

    const gotoResetLastName = () => {
        navigation.navigate('ResetLastNameScreen');
    };

    return (
        <View
            style={[styles.scrollContainer]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 style={styles.textLink} name="arrowleft" size={25} color="#BA886E" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Montserrat' }]} >
                        Personal Info
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <>
                    <View style={styles.mainContainer}>
                        <Pressable onPress={gotoResetFirstName}>
                            <View style={styles.infoLinkContainer}>
                                <View style={styles.infoWrapper}>
                                    <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                        First Name
                                    </Text>
                                </View>
                                <Text style={[styles.valueInfo, { fontFamily: 'Montserrat' }]} >
                                    {myProfile.first_name}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={gotoResetLastName}>
                            <View style={styles.infoLinkContainer}>
                                <View style={styles.infoWrapper}>
                                    <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                        Last Name
                                    </Text>
                                </View>
                                <Text style={[styles.valueInfo, { fontFamily: 'Montserrat' }]} >
                                    {myProfile.last_name}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable>
                            <View style={styles.infoLinkContainer}>
                                <View style={styles.infoWrapper}>
                                    <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                        Email
                                    </Text>
                                </View>
                                <Text style={[styles.valueInfo, { fontFamily: 'Montserrat' }]} >
                                    {myProfile.email}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={gotoResetPhone}>
                            <View style={styles.infoLinkContainer}>
                                <View style={styles.infoWrapper}>
                                    <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                        Phone
                                    </Text>
                                </View>
                                <Text style={[styles.valueInfo, { fontFamily: 'Montserrat' }]} >
                                    {myProfile.phone}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable onPress={gotoResetPassword}>
                            <View style={styles.infoLinkContainer}>
                                <View style={styles.infoWrapper}>
                                    <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                        Password
                                    </Text>
                                </View>
                                <Text style={[styles.valueInfo, { fontFamily: 'Montserrat' }]} >
                                    *************
                                </Text>
                            </View>
                        </Pressable>

                    </View>
                </>
            )}

        </View>
    );
};

export default PersonalInfoScreen;

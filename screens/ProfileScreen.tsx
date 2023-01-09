import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authLogoutAndRedirect } from '../actions/authActions';
import { clearPersonalUpdatedFlag, getMyProfile } from '../actions/luciaAppAction';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
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
        height: 450,
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
    photoEdit: {
        justifyContent: 'flex-end',
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
        backgroundColor: 'transparent',
    },
    avatarBtnWrapper: {
        marginTop: -10,
        backgroundColor: 'transparent',
    },
    nameInfo: {
        fontSize: 30,
        lineHeight: 50,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 10
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
        borderBottomColor: '#373737',
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: 'transparent'
    },
    titleInfo: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
        paddingTop: 3,
        paddingLeft: 12,
        backgroundColor: 'transparent'
    },
    infoWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    profileImage: {
        width: 142,
        height: 142,
        borderRadius: 40,
        overflow: 'hidden'
    },
    iconStyle: {
        margin: 0,
    },
    signupButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BA886E',
        padding: 16,
        fontSize: 15,
        fontWeight: '700',
        height: 50,
        width: '100%',
        marginTop: 20,
    },
    signupButtonText: {
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        color: '#FFF',
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '600',
        letterSpacing: 2
    },  
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        width: '100%',
        marginTop: 20,
    },
    deleteButtonText: {
        color: '#F87A7A',
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '600',
        width: '100%',
        textAlign: 'center'
    },
});

interface IProfileScreenProps {
    navigation: NavigationProp<any>;
}

const ProfileScreen: React.FC<IProfileScreenProps> = (props) => {
    const dispatch = useDispatch();
    const { navigation } = props;

    let [fontsLoaded] = useFonts({
        'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
        'Lato': require('../assets/fonts/Lato-Light.ttf'),
        'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
    });

    const bgColor = useThemeColor({}, 'background');

    const { isUpdatedProfile } = useSelector((state: IRootState) => state.luciaApp);

    const [btnVisible, setBtnVisible] = React.useState(false);

    const goBack = () => {
        // navigation.goBack();
        navigation.toggleDrawer();
    };

    const closeBtn = () => {
        setBtnVisible(false);
    };

    const showBtn = () => {
        setBtnVisible(true);
    }

    const goPersonalScreen = () => {
        navigation.navigate('PersonalInfo');
    };

    const goPickAvatarScreen = () => {
        navigation.navigate('PickAvatarScreen');
    };

    const goUploadCameraScreen = () => {
        navigation.navigate('UploadCameraScreen');
    };

    const goDeleteAccountScreen = () => {
        navigation.navigate('DeleteAccountScreen');
    };

    const logout = () => {
        dispatch(authLogoutAndRedirect())
    };

    useEffect(() => {
        setBtnVisible(false);
        dispatch(getMyProfile())
        dispatch(clearPersonalUpdatedFlag())
      }, [])

    useEffect(() => {
        if (isUpdatedProfile) {
            setBtnVisible(false);
        }
    }, [isUpdatedProfile])

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
                                <Icon3 style={styles.textLink} name="close" size={25} color="#BA886E" />
                            </Pressable>
                            <Pressable style={styles.textLinkWrapper} onPress={logout}>
                                <Icon4 style={styles.textLink} name="log-out" size={25} color="#BA886E" />
                            </Pressable>
                        </View>
                        
                        <View style={styles.avatarWrapper}>
                            <Pressable onPress={showBtn}>
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
                            </Pressable>
                            <View style={styles.avatarBtnWrapper}>
                                <Pressable style={styles.photoEdit} onPress={showBtn}>
                                    <Icon3 style={styles.textLink} name="camera" size={25} color="#BA886E" />
                                </Pressable>
                            </View>
                            {fontsLoaded && (
                                <Text style={[styles.nameInfo, { fontFamily: 'Cormorant' }]} >
                                    {myProfile.name}
                                </Text>
                            )}
                        </View>
                        
                    </View>
                )
            }
            
            {fontsLoaded && myProfile && (
                <>
                    <View style={styles.mainContainer}>
                        <Pressable onPress={goPersonalScreen} style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon5 style={styles.iconStyle} name="person-outline" size={24} color="#BA886E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Montserrat' }]} >
                                    Personal Information
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E" />
                        </Pressable>
                        {/* <Pressable style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="bell" size={24} color="#BA886E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Notifications
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="align-justify" size={20} color="#BA886E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Important numbers and documents
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="align-justify" size={20} color="#BA886E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Preferences
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E" />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon1 style={styles.iconStyle} name="payment" size={24} color="#BA886E" />   
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Payment Method
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E"  />
                        </Pressable>
                        <Pressable style={styles.infoLinkContainer}>
                            <View style={styles.infoWrapper}>
                                <Icon4 style={styles.iconStyle} name="mail" size={24} color="#BA886E" />
                                <Text style={[styles.titleInfo, { fontFamily: 'Work-Sans' }]} >
                                    Contact Us
                                </Text>
                            </View>
                            <Icon3 name="right" size={20} color="#BA886E" />
                        </Pressable> */}
                    </View>
                </>
            )}

            {
                btnVisible && (
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.signupButton} onPress={goUploadCameraScreen}>
                            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Upload from device</Text>
                        </Pressable>
                        <Pressable style={styles.signupButton} onPress={goPickAvatarScreen} >
                            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Select Avatar</Text>
                        </Pressable>
                        <Pressable style={styles.iconButton} onPress={closeBtn}>
                            <Icon3 style={styles.textLink} name="close" size={25} color="#FFF" />
                        </Pressable>
                    </View>
                )
            }  
            
            {
                !btnVisible && (
                    <Pressable style={styles.buttonContainer} onPress={goDeleteAccountScreen}>
                        <Text style={[styles.deleteButtonText, {fontFamily: 'Montserrat'}]}>Delete account</Text>
                    </Pressable>
                )
            }
            
        </View>
    );
};

export default ProfileScreen;

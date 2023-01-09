import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import CustomCheckbox from '../components/CustomCheckbox';
import { clearPersonalUpdatedFlag, getAvatars, getMyProfile, updatePhoto, updateProfile} from '../actions/luciaAppAction';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';


const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    mainContainer: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        padding: 24
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
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: 'hidden'
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 0,
        backgroundColor: 'transparent',
        paddingLeft: 30,
        paddingRight: 30,
    },
    title: {
        fontSize: 29,
        fontWeight: '400',
        justifyContent: 'flex-start',
        color: '#FFF',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    avatarView: {
        flex: 1, 
        flexDirection: 'column', 
        margin: 10, 
        backgroundColor: 'transparent'
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 90,
        padding: 10,
        maxWidth: 90,
        backgroundColor: 'transparent',
    },
    imageWrapperSelected: {
        height: 90,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#BA886E'
    },
    imageWrapper: {
        height: 90,
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
    iconImage: {
        width: 8,
        height: 8
    },
    checkContainer: {
        width: 15,
        height: 15,
        backgroundColor: '#BA886E',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkPositionCenter: {
        position: 'absolute',
        top: 5,
        left: 5,
    }
});

interface IUploadCameraScreenProps {
    navigation: NavigationProp<any>;
}

const UploadCameraScreen: React.FC<IUploadCameraScreenProps> = (props) => {
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

    useEffect(() => {
        dispatch(getMyProfile());
        dispatch(getAvatars());
    }, [])

    const [selectedAvatar, setSelectedAvatar] = useState<MediaLibrary.Asset>();
    const [loaded, setLoaded] = useState(false);

    const { isUpdatedProfile } = useSelector((state: IRootState) => state.luciaApp);
    const { avatars, myProfile } = useSelector((state: IRootState) => state.luciaApp);
    const [dataSource, setDataSource] = useState<MediaLibrary.Asset[]>([]);

    useEffect(() => {
        async function fetchAssets() {
            const permission = await MediaLibrary.requestPermissionsAsync();
            const recentCameraRoll = await MediaLibrary.getAssetsAsync({first: 90000});
            setDataSource(recentCameraRoll.assets);
        }
        fetchAssets();
    }, []);

    console.log('Files', Object.values(dataSource.map(file => file.filename)));

    useEffect(() => {
        if (isUpdatedProfile) {
            navigation.navigate('Profile');
            dispatch(clearPersonalUpdatedFlag());
            dispatch(getMyProfile())
        }
    }, [isUpdatedProfile]);

    const saveChanges = async () => {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(selectedAvatar!.id)
        const localUri = assetInfo.localUri!
        let filename = localUri.split('/').pop()!;

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();

        formData.append("profile_image", {
            type: type,
            name: filename,
            uri: localUri,
        })

        dispatch(updatePhoto(
            formData
        ));
    };

    useEffect(() => {
        if (myProfile) {
            console.log(myProfile);
        }
    }, [myProfile]);

    return (
        <View
            style={[styles.scrollContainer]}
        >
            <View style={styles.AboveWrapper}>
                <View style={styles.headerWrapper}>
                    <Pressable style={styles.textLinkWrapper} onPress={goBack}>
                        <Icon3 style={styles.textLink} name="close" size={25} color="#BA886E" />
                    </Pressable>
                    <Text style={[styles.mainTitle, { fontFamily: 'Montserrat' }]} >
                    </Text>
                    <Pressable style={styles.textLinkWrapper}>
                    </Pressable>
                </View>
            </View>
            {fontsLoaded && (
                <View style={styles.titleWrapper}>
                    <Text style={[styles.title, { fontFamily: 'Cormorant' }]}>
                        Upload From Camera Roll
                    </Text>
                </View>
            )}
            <View style={styles.mainContainer}>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={dataSource}
                        renderItem={({ item }) => (
                            <View style={styles.avatarView}>
                                <Pressable
                                    onPress={() => setSelectedAvatar(item)}
                                    style={item === selectedAvatar ? styles.imageWrapperSelected : styles.imageWrapper}
                                >
                                    <Image style={styles.imageThumbnail} source={{ uri: item.uri }} />
                                    {
                                        item === selectedAvatar && (
                                            <View style={[styles.checkContainer, styles.checkPositionCenter]}>
                                                <Image
                                                    source={require("../assets/images/checkmark-white.png")}
                                                    style={styles.iconImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        )
                                    }
                                </Pressable>
                            </View>
                            
                        )}
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                    />
                </SafeAreaView>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.signupButton} onPress={saveChanges}>
                    <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Save Changes</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default UploadCameraScreen;

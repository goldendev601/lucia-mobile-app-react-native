import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { setAccountInfo, resetRegisterFlag, authSignupUser, authSignupUserBeforeCamera, authSignupUserForm } from '../actions/authActions';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { IRootState } from '../reducers';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    padding: 30,
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
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 39,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#FFF',
  },
  descriptionWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    justifyContent: 'flex-start',
    color: '#FFF',
    opacity: 0.8,
  },
  logoImage: {
    width: 70,
    height: 10,
    marginTop: 10
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
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  fieldWrapperFlex: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  fieldCheckboxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  fieldLabel: {
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 30,
  },
  fieldDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
    marginTop: 12,
    lineHeight: 20,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  fieldInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#242424',
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  fieldInput1: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#242424',
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 20,
    width: '50%'
  },
  fieldInput2: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#242424',
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginLeft: 20,
    width: '50%'
  },
  fieldInputPhone: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#242424',
    fontSize: 14,
    color: '#FFF',
    flex: 1,
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 15,
    paddingBottom: 4,
    textAlign: 'center',
  },
  fieldInputCheckbox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 50,
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
 
  textContainer: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  footerLabel: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 2,
    marginBottom: 50,
    opacity: 0.8,
    marginTop: 60,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    position: 'absolute',
    bottom: 50
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 20,
  },
  textLink: {
  },
  avatarWrapper: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 50
  },
  profileImage: {
    width: 142,
    height: 142,
    borderRadius: 40,
    overflow: 'hidden'
  },
  photoEdit: {
    justifyContent: 'flex-end',
  },
  avatarBtnWrapper: {
    marginTop: -10,
    backgroundColor: 'transparent',
  },
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
});

interface ISetPreferencesScreenProps {
  navigation: NavigationProp<any>;
}

const SetPreferencesScreen: React.FC<ISetPreferencesScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { firstName, lastName, email, phone, address1, address2, city, state, zipCode, country, pass, confirm, profileImage } = useSelector(
    (state: IRootState) => state.auth.accountInfo
  );

  const { isRegistered } = useSelector(
    (state: IRootState) => state.auth
  );

  const [btnVisible, setBtnVisible] = React.useState(false);

  const [favoriteVacationSpot, setFavoriteVacationSpot] = React.useState('');
  const [preferredCuisine, setPreferredCuisine] = React.useState('');
  const [allergies, setAllergies] = React.useState('');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const signup = () => {
    
    if (profileImage === null) {
      setValidationError(true);
      setValidationErrorMessage('You should set a profile picture!');
    } else {
      if (typeof profileImage === 'string') {
        if (favoriteVacationSpot.length === 0) {
          setValidationError(true);
          setValidationErrorMessage('Please complete all the fields');
        } else  {
          dispatch(
            authSignupUser(firstName, lastName, email, phone, address1, address2, city, state, zipCode, country, pass, confirm, favoriteVacationSpot, preferredCuisine, allergies, profileImage)
          );
        }
      } else {
        const formData = new FormData();        
        formData.append("profile_image", profileImage)
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("email", email)
        formData.append("phone", phone)
        formData.append("address_line1", address1)
        formData.append("address_line2", address2)
        formData.append("city", city)
        formData.append("state", state)
        formData.append("zip", zipCode)
        formData.append("country_id", country)
        formData.append("password", pass)
        formData.append("password_confirmation", confirm)
        formData.append("favorite_vacation_spot", favoriteVacationSpot)
        formData.append("preferred_cuisine", preferredCuisine)
        formData.append("allergies", allergies)

        if (favoriteVacationSpot.length === 0) {
          setValidationError(true);
          setValidationErrorMessage('Please complete all the fields');
        } else {
          dispatch(
            authSignupUserForm(formData)
          );
        }
      }
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigation.navigate('AccountCreatedScreen');
    }
  }, [isRegistered]);

  useEffect(() => {
    setBtnVisible(false);
  }, [])

  const goPickAvatarScreen = () => {
    navigation.navigate('AuthPickAvatarScreen');
  };

  const goUploadCameraScreen = () => {
    navigation.navigate('AuthUploadCameraScreen');
  };

  const closeBtn = () => {
    setBtnVisible(false);
  };

  const showBtn = () => {
    setBtnVisible(true);
  }
  

  let [fontsLoaded] = useFonts({
    'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
    'Lato': require('../assets/fonts/Lato-Light.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
  });

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
    >
      <View style={styles.wrapper}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={[styles.scrollContainer]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerWrapper}>
            <Pressable style={styles.textLinkWrapper} onPress={goBack}>
              <Icon3 style={styles.textLink} name="arrowleft" size={25} color="#BA886E" />
            </Pressable>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="cover"
            />
            <Pressable style={styles.textLinkWrapper}>
            </Pressable>
          </View>
          <View style={styles.container}>
            <View style={styles.titleWrapper}>
              {
                fontsLoaded && (
                  <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Your Preferences</Text>
                )
              }
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                Edit your profile details and preferences below.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Set a profile picture</Text>
            </View>
            <View style={styles.avatarWrapper}>
              {
                typeof profileImage === 'string' ? (
                  <Pressable onPress={showBtn}>
                    {
                        (profileImage != null && profileImage.length > 0) ? (
                            <Image
                                source={{
                                    uri: profileImage,
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
                ) : (
                  <Pressable onPress={showBtn}>
                    {
                        (profileImage != null) ? (
                            <Image
                                source={{
                                    uri: profileImage.uri,
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
                )
              }
                
              <View style={styles.avatarBtnWrapper}>
                  <Pressable style={styles.photoEdit} onPress={showBtn}>
                      <Icon3 style={styles.textLink} name="camera" size={25} color="#BA886E" />
                  </Pressable>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Home Airport</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="What's your prefered departure airpot?"
                  onChangeText={(text) => setFavoriteVacationSpot(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Preferred Cuisine</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="What's your favorite kind of food?"
                  onChangeText={(text) => setPreferredCuisine(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Any allergies?</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="List any alergies here, if not just leave blank"
                  onChangeText={(text) => setAllergies(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              {validationError && (
                <Text style={styles.errorMessageAlert}>
                  {validationErrorMessage}
                </Text>
              )}
            </View>
            
            {
                btnVisible ? (
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
                ) : (
                  <Pressable style={styles.signupButton} onPress={signup}>
                    <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Finish account creation</Text>
                  </Pressable>
                )
            }
            <Text style={styles.footerLabel}>©lucia 2021. All rights reserved - V 1</Text>
          </View>
          
        </ScrollView>
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default SetPreferencesScreen;

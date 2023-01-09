import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import { authSignupUser, setAccountInfo } from '../actions/authActions';
import { IRootState } from '../reducers';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

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
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    padding: 30,
  },
  logoImage: {
    width: 70,
    height: 10,
    marginTop: 10
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
  notificationWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  notificationContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 30,
    marginBottom: 50
  },
  notification: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '400',
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
  helpText: {
    fontSize: 16,
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
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
    paddingBottom: 5,
    marginLeft: 10,
  },
  textContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  iconNotificationStyle: {
    paddingRight: 5,
  },
  fieldInput: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#242424',
    fontSize: 14,
    padding: 10,
    color: '#FFF',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  fieldInputCheckbox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 10,
    color: '#2CAF4D',
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
  signupButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 2
  },
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  textLink: {
  },
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  toggleConfirm: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
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
  textLinkStyle: {
      fontSize: 14,
      fontWeight: 'bold',
  },
});

interface IPasswordSetupScreenProps {
  navigation: NavigationProp<any>;
}

const PasswordSetupScreen: React.FC<IPasswordSetupScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [pass, setPass] = React.useState('');

  const [enableMask, setEnableMask] = React.useState(true);
  const [enableMaskConfirm, setEnableMaskConfirm] = React.useState(true);

  const toggleMask = () => setEnableMask((f) => !f);
  const toggleMaskConfirm = () => setEnableMaskConfirm((fConfirm) => !fConfirm);

  const [passValidator1, setPassValidator1] = React.useState(false);
  const [passValidator2, setPassValidator2] = React.useState(false);
  const [passValidator3, setPassValidator3] = React.useState(false);
  const [passValidator4, setPassValidator4] = React.useState(false);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const [confirm, setConfirm] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] =
    React.useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const signup = () => {
    if (pass.length === 0) {
      setValidationError(true);
      setValidationErrorMessage('Password field can not be empty!');
    }
    if (!passValidator4) {
      setValidationError(true);
      setValidationErrorMessage(
        'Please enter a valid password. The confirm password is not matched with the password'
      );
      setValidationError(true);
    }
    if (!passValidator1 || !passValidator2 || !passValidator3) {
      setValidationError(true);
    }
    if (!validationError) {
      dispatch(
        setAccountInfo({
          pass,
          confirm
        })
      );
      navigation.navigate('SetPreferencesScreen');
      // dispatch(
      //   authSignupUser(firstName, lastName, email, phone, address, pass, confirm)
      // );
    }
  };

  const validatePassword1 = () => {
    if (pass.length > 8) {
      setPassValidator1(true);
      setValidationError(false);
    } else {
      setPassValidator1(false);
      setValidationError(true);
    }
  };
  const validatePassword2 = () => {
    if (/\d/.test(pass)) {
      setPassValidator2(true);
      setValidationError(false);
    } else {
      setPassValidator2(false);
      setValidationError(true);
    }
  };
  const validatePassword3 = () => {
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      setPassValidator3(true);
      setValidationError(false);
    } else {
      setPassValidator3(false);
      setValidationError(true);
    }
  };
  const validatePassword4 = () => {
    if (pass !== confirm) { 
      setPassValidator4(false);
      setValidationError(true);
    } else {
      setPassValidator4(true);
      setValidationError(false);
    }
  };

  // useEffect(() => {
  //   if (isRegistered) {
  //     navigation.navigate('AccountCreatedScreen');
  //   }
  // }, [isRegistered]);

  useEffect(() => {
    validatePassword1();
    validatePassword2();
    validatePassword3();
    validatePassword4();
  }, [pass, confirm]);

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
              <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Secure Account</Text>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={[styles.description, {fontFamily: 'Lato'}]}>
                Create a password to secure your account.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>ENTER PASSWORD</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  secureTextEntry={enableMask}
                  placeholder="Enter your password"
                  onChangeText={(text) => setPass(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <Text style={styles.toggle} onPress={toggleMask}>
                  {enableMask ? (
                    <Icon6
                      name="eye-slash"
                      size={20}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  ) : (
                    <Icon6
                      name="eye"
                      size={20}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  )}
                </Text>
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>RE-ENTER PASSWORD</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  secureTextEntry={enableMaskConfirm}
                  placeholder="Confirm your password"
                  onChangeText={(text) => setConfirm(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <Text style={styles.toggleConfirm} onPress={toggleMaskConfirm}>
                  {enableMaskConfirm ? (
                    <Icon6
                      name="eye-slash"
                      size={20}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  ) : (
                    <Icon6
                      name="eye"
                      size={20}
                      color="rgba(255, 255, 255, 0.5)"
                    />
                  )}
                </Text>
              </View>

              <View style={styles.notificationContainer}>
                <View style={styles.notificationWrapper}>
                  <Icon3
                    style={styles.iconNotificationStyle}
                    name="check"
                    size={20}
                    color={passValidator1 ? '#BA886E' : '#FFF'}
                  />
                  <Text style={[styles.notification, {fontFamily: 'Montserrat'}]}>
                    Your password must be at least eight characters
                  </Text>
                </View>
                <View style={styles.notificationWrapper}>
                  <Icon3
                    style={styles.iconNotificationStyle}
                    name="check"
                    size={20}
                    color={passValidator2 ? '#BA886E' : '#FFF'}
                  />
                  <Text style={[styles.notification, {fontFamily: 'Montserrat'}]}>
                    Must contain at least one digit.
                  </Text>
                </View>
                <View style={styles.notificationWrapper}>
                  <Icon3
                    style={styles.iconNotificationStyle}
                    name="check"
                    size={20}
                    color={passValidator3 ? '#BA886E' : '#FFF'}
                  />
                  <Text style={[styles.notification, {fontFamily: 'Montserrat'}]}>
                    Must contain at least one uppercase letter.
                  </Text>
                </View>
              </View>
            </View>

            {validationError && (
              <Text style={styles.errorMessageAlert}>
                {validationErrorMessage}
              </Text>
            )}

            <Pressable style={styles.signupButton} onPress={signup}>
              <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Create Account</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Text style={[styles.footerLabel, {fontFamily: 'Montserrat'}]}>©lucia 2021. All rights reserved - V 1</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PasswordSetupScreen;

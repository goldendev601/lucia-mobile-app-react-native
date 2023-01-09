import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { updatePassword } from '../actions/authActions';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';


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
    marginBottom: 50,
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  signinButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
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
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
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
  textLink: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
  },
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  toggleConfirm: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
  },
  textContainer: {
    width: '100%',
    backgroundColor: 'transparent',
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
  
});

interface IUpdatePasswordInfoScreenProps {
  navigation: NavigationProp<any>;
}

const UpdatePasswordInfoScreen: React.FC<IUpdatePasswordInfoScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { isUpdatedPassword } = useSelector((state: IRootState) => state.auth);
  const { email, value } = useSelector(
    (state: IRootState) => state.auth.accountInfo
  );  

  const [pass, setPass] = React.useState('');

  const [enableMask, setEnableMask] = React.useState(true);
  const [enableMaskConfirm, setEnableMaskConfirm] = React.useState(true);

  const toggleMask = () => setEnableMask((f) => !f);
  const toggleMaskConfirm = () => setEnableMaskConfirm((fConfirm) => !fConfirm);

  const [passValidator1, setPassValidator1] = React.useState(false);
  const [passValidator2, setPassValidator2] = React.useState(false);
  const [passValidator3, setPassValidator3] = React.useState(false);

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const [confirm, setConfirm] = React.useState('');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] =
    React.useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'Your Password has been updated successfully.'
    });
  }

  const updatePasswordFun = () => {
    if (pass.length === 0) {
      setValidationError(true);
      setValidationErrorMessage('You should fill the password!');
    }
    if (pass !== confirm) {
      setValidationError(true);
      setValidationErrorMessage(
        'The confirm password is not matched with the password'
      );
    }
    if (!validationError) {
      dispatch(updatePassword(email, value, pass, confirm));
    }
  };

  const validatePassword1 = () => {
    if (pass.length > 8) {
      setPassValidator1(true);
    } else {
      setPassValidator1(false);
    }
  };
  const validatePassword2 = () => {
    if (/\d/.test(pass)) {
      setPassValidator2(true);
    } else {
      setPassValidator2(false);
    }
  };
  const validatePassword3 = () => {
    if (!/[a-z]/.test(pass) && /[A-Z]/.test(pass)) {
      setPassValidator3(true);
    } else {
      setPassValidator3(false);
    }
  };

  useEffect(() => {
    if (isUpdatedPassword) {
      navigation.navigate('PersonalInfo');
    }
  }, [isUpdatedPassword]);

  useEffect(() => {
    validatePassword1();
    validatePassword2();
    validatePassword3();
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
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.container}>
            <View style={styles.titleWrapper}>
              {
                fontsLoaded && (
                  <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Set New Password</Text>
                )
              }
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

            <Pressable style={styles.signupButton} onPress={updatePasswordFun}>
              <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Save Password</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Text style={styles.footerLabel}>©lucia 2021. All rights reserved - V 1</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdatePasswordInfoScreen;

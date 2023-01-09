//import liraries
import React, { Component, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  ScrollView,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { authLoginUser, clearAuthState } from '../actions/authActions';
import { IRootState } from '../reducers';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

interface IWelcomeScreenProps {
  navigation: NavigationProp<any>;
}

const WelcomeScreen: React.FC<IWelcomeScreenProps> = (props) => {
  const { navigation } = props;

  const { isUpdatedPassword } = useSelector((state: IRootState) => state.auth);

  let [fontsLoaded] = useFonts({
    Cormorant: require('../assets/fonts/Cormorant-Light.ttf'),
    Lato: require('../assets/fonts/Lato-Light.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Light.ttf'),
  });

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const [enableMask, setEnableMask] = React.useState(true);
  const toggleMask = () => setEnableMask((f) => !f);

  const validateEmail = (email: string) => {
    var regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const toastConfig = {
    success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#BA886E', backgroundColor: 'black' }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 0 }}
        text1Style={{
          fontSize: 10,
          lineHeight: 16,
          fontWeight: '600',
          color: '#FFF'
        }}
        text2Style={{
          fontSize: 10,
          lineHeight: 16,
          fontWeight: '600',
          color: '#FFF'
        }}
      />
    ),
    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 10,
          lineHeight: 16,
          fontWeight: '600',
          color: '#FFF'
        }}
        text2Style={{
          fontSize: 10,
          lineHeight: 16,
          fontWeight: '600',
          color: '#FFF'
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text style={{ fontFamily: 'Montserrat' }}>{text1}</Text>
        <Text style={{ fontFamily: 'Montserrat' }}>{props.uuid}</Text>
      </View>
    )
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Your password has been',
      text2: 'updated successfully.',
    });
  };

  useEffect(() => {
    if (isUpdatedPassword) {
      showToast();
      dispatch(clearAuthState());
    }
  }, [isUpdatedPassword]);

  const continueLogin = () => {
    if (email.length > 0 && password.length > 0) {
      dispatch(authLoginUser(email, password));
    }
    if (email.length === 0) {
      setValidationError(true);
      setValidationErrorMessage(
        'Email can not be empty!'
      );
    } 
    if (email.length > 0 && !validateEmail(email)) {
      setValidationError(true);
      setValidationErrorMessage(
        'Please enter a valid email'
      );
    } 
    if (email.length > 0 && password.length === 0) {
      setValidationError(true);
      setValidationErrorMessage(
        'Password field can not be empty!'
      );
    } 
  };


  useEffect(() => {
    if (email.length > 0) {
      setValidationError(false);
      setValidationErrorMessage('');
    } 
  }, [email]);

  useEffect(() => {
    if (password.length > 0) {
      setValidationError(false);
      setValidationErrorMessage('');
    } 
  }, [password]);

  useEffect(() => {
      setValidationError(false);
      setValidationErrorMessage('');
  }, []);


  const gotoReset = () => {
    props.navigation.navigate('ResetScreen');
  };

  const gotoSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.wrapper}>
          <Image
            source={require('../assets/images/bk.png')}
            style={styles.bkImage}
            resizeMode="cover"
          />
          {fontsLoaded && (
              <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                  <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logoImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={[styles.fieldLabel, { fontFamily: 'Montserrat' }]}>
                    EMAIL
                  </Text>
                  <View style={styles.fieldWrapper}>
                    <TextInput
                      style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                      placeholder="Put your email"
                      onChangeText={(text) => setEmail(text)}
                      autoCompleteType="off"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    />
                  </View>
                  <Text style={[styles.fieldLabel, { fontFamily: 'Montserrat' }]}>
                    PASSWORD
                  </Text>
                  <View style={styles.fieldWrapper}>
                    <TextInput
                      style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                      secureTextEntry={enableMask}
                      placeholder="Put your password"
                      onChangeText={(text) => setPass(text)}
                      autoCompleteType="off"
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
                </View>
                <View style={styles.linkWrapper}>
                  <Pressable style={styles.textLinkWrapper} onPress={gotoReset}>
                    <Text style={[styles.textLink, { fontFamily: 'Montserrat' }]}>
                      Forgot password
                    </Text>
                  </Pressable>
                </View>
                <TouchableOpacity
                  style={styles.signinButton}
                  onPress={continueLogin}
                >
                  <Text
                    style={[styles.signinButtonText, { fontFamily: 'Montserrat' }]}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signupButton} onPress={gotoSignup}>
                  <Text
                    style={[styles.signupButtonText, { fontFamily: 'Montserrat' }]}
                  >
                    Create Account
                  </Text>
                </TouchableOpacity>
                {validationError && (
                    <Text style={styles.errorMessageAlert}>
                      {validationErrorMessage}
                    </Text>
                )}
              </SafeAreaView>
          )}
          <Text style={[styles.footerLabel, { fontFamily: 'Montserrat' }]}>
            ©lucia 2021. All rights reserved - V 1
          </Text>
          <Toast config={toastConfig} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    marginBottom: 25,
    marginTop: 160
  },
  signinButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BA886E',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    width: '85%',
    marginTop: 20,
  },
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    width: '85%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#242424',
  },
  signinButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
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
    paddingVertical: 5,
  },
  textLink: {
    textDecorationStyle: 'solid',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'left',
    opacity: 0.7,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 80,
  },
  bkImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    width: '85%',
    backgroundColor: 'transparent',
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 24,
    width: '100%',
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 24,
    width: '85%',
  },
  fieldLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 30,
  },
  footerLabel: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 2,
    marginBottom: 50,
    opacity: 0.8,
    marginTop: 80,
  },
  logoImage: {
    width: 148,
    height: 23,
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
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 10,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 15,
    paddingBottom: 4,
    textAlign: 'center',
  },
});

//make this component available to the app
export default WelcomeScreen;

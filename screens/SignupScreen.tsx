import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { setAccountInfo, resetRegisterFlag, checkEmailAvailability, emailAvailable, getCountries } from '../actions/authActions';
import PhoneInput from "react-native-phone-number-input";
import { useFonts } from 'expo-font';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { IRootState } from '../reducers';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


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
});

interface ISignupScreenProps {
  navigation: NavigationProp<any>;
}

const SignupScreen: React.FC<ISignupScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  // const [address, setAddress] = React.useState('');
  const [address1, setAddress1] = React.useState('');
  const [address2, setAddress2] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [zipCode, setZipCode] = React.useState('');
  const [formattedValue, setFormattedValue] = React.useState("");
  const [country, setCountry] = React.useState(0);

  const phoneInput = useRef(null);

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const { isEmailAvailable, isEmailRegisteredBefore, countries } = useSelector(
    (state: IRootState) => state.auth
  );

  const validateEmail = (email: string) => {
    var regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const goBack = () => {
    navigation.goBack();
  };

  function onlyNumbers(phoneNumber: string) {
    return /^[0-9]+$/.test(phoneNumber);
  }

  const validateForm = () => {
    let flag = true;
    if (firstName.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (lastName.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (email.length === 0 || !validateEmail(email)) {
      flag = false;
      setValidationError(true);
    }
    if (address1.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (city.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (state.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (zipCode.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (country === 0) {
      flag = false;
      setValidationError(true);
    }
    if (phone.length === 0) {
      flag = false;
      setValidationError(true);
    }
    if (!phone.startsWith('+')) {
      flag = false;
      setValidationError(true);
    }
    if (phone.length < 10) {
      flag = false;
    }
    if (!onlyNumbers(phone.substr(1))) {
      flag = false;
    }
    return flag;
  };

  const signup = () => {
    if (validateForm()) {
      if (isEmailAvailable) {
        dispatch(
          setAccountInfo({
            firstName,
            lastName,
            email,
            phone,
            address1,
            address2,
            city,
            state,
            zipCode,
            country
          })
        );
        navigation.navigate('PasswordSetupScreen');
      } else {
        if (isEmailRegisteredBefore) {
          setValidationError(true);
          setValidationErrorMessage('This email was already useed before!');
        } else {
          setValidationError(true);
          setValidationErrorMessage('Please enter a valid email');
        }
      }
    } else {
      if (firstName.length === 0) {
        setValidationErrorMessage('First name can not be empty!');
      } else if (lastName.length === 0) {
        setValidationErrorMessage('Last name can not be empty!');
      } else if (email.length === 0) {
        setValidationErrorMessage('Email can not be empty!');
      } else if (!validateEmail(email)) {
        setValidationErrorMessage('Please enter a valid email.');  
      } else if (phone.length === 0) {
        setValidationErrorMessage('Phone can not be empty!');
      } else if (address1.length === 0) {
          setValidationErrorMessage('Address can not be empty!');
      } else if (country === 0) {
        setValidationErrorMessage('Country should be selected!');
      } else if (!phone.startsWith('+')) {
        setValidationErrorMessage('Your phone number should be started with +');
      } else if (phone.length < 8) {
        setValidationErrorMessage(
          'The length of your phone number should be larger than 8'
        );
      } else if (!onlyNumbers(phone.substr(1))) {
        setValidationErrorMessage(
          'Please enter a valid phone.'
        );
      } else {
        setValidationErrorMessage(
          'There are some thing wrong in your input values!'
        );
      }
    }
  };

  useEffect(() => {
    if (email && email.length > 0) {
      dispatch(checkEmailAvailability(email));
    }
  }, [email]);

  useEffect(() => {
    dispatch(resetRegisterFlag());
    dispatch(getCountries());
  }, []);

  let [fontsLoaded] = useFonts({
    'Cormorant': require('../assets/fonts/Cormorant-Light.ttf'),
    'Lato': require('../assets/fonts/Lato-Light.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Light.ttf'),
  });

  const detaultCountryInfo = {
    "id": 233,
    "description": "United States of America",
    "iso_3166_1_alpha2_code": "US",
    "offset_gmt": "-09:00",
    "timezone_id": "America/Adak",
    "offset_tzab": "HDT"
  }

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
              <Icon1 style={styles.textLink} name="arrowleft" size={25} color="#BA886E" />
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
                  <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Create Account</Text>
                )
              }
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                Welcome, please enter your info below.
              </Text>
              <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                This will allow you to manage all your itineraries.
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>First Name</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="Enter your first name"
                  onChangeText={(text) => setFirstName(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Last Name</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="Enter your last name"
                  onChangeText={(text) => setLastName(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Email</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="Enter your email"
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Phone Number</Text>
              {/* <View style={styles.fieldWrapper}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="Enter your phone"
                  onChangeText={(text) => setPhone(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View> */}
              <View style={styles.fieldWrapper}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={phone}
                  defaultCode="US"
                  layout="first"
                  onChangeText={(text) => {
                    setFormattedValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setPhone(text);
                  }}
                  containerStyle={styles.fieldInputPhone}
                  textContainerStyle={{ paddingVertical: 0, backgroundColor: 'transparent'}}
                  textInputStyle={{color: '#FFF'}}
                  codeTextStyle={{color: '#FFF'}}
                  textInputProps={{placeholderTextColor: "rgba(255, 255, 255, 0.35)"}}
                  renderDropdownImage={
                    <>
                      <Icon1
                        name="down"
                        size={15}
                        color="#BA886E"
                      />
                    </>
                  }
                  withDarkTheme
                />
              </View>
              <Text style={[styles.fieldLabel, {fontFamily: 'Montserrat'}]}>Address</Text>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="Address line 1"
                  onChangeText={(text) => setAddress1(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                  placeholder="Address line 2"
                  onChangeText={(text) => setAddress2(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput1, {fontFamily: 'Montserrat'}]}
                  placeholder="City"
                  onChangeText={(text) => setCity(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <View style={styles.fieldWrapper}>
                <TextInput
                  style={[styles.fieldInput1, {fontFamily: 'Montserrat'}]}
                  placeholder="State"
                  onChangeText={(text) => setState(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
                <TextInput
                  style={[styles.fieldInput2, {fontFamily: 'Montserrat'}]}
                  placeholder="Zip"
                  onChangeText={(text) => setZipCode(text)}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                />
              </View>
              <View style={styles.fieldWrapper}>
                <SelectDropdown
                  data={countries}
                  onSelect={(selectedItem, index) => {
                    setCountry(selectedItem.id);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.description
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.description
                  }}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                  }}
                  defaultButtonText={'Select country'}
                  buttonStyle={{width: '100%', marginTop: 20, backgroundColor: '#444', height: 40}}
                  buttonTextStyle={{fontSize: 18, fontFamily: 'Montserrat', color: '#FFF'}}
                  selectedRowTextStyle={{fontSize: 18, fontFamily: 'Montserrat', color: '#FF0000', fontWeight: 'bold'}}
                  dropdownIconPosition={'right'}
                  dropdownStyle={{backgroundColor: '#444', borderTopLeftRadius: 12, borderTopRightRadius: 12}}
                  rowStyle={{backgroundColor: '#444', borderBottomColor: '#C5C5C5'}}
                  rowTextStyle={{color: '#FFF', textAlign: 'center'}}
                />
              </View>
              
              {validationError && (
                <Text style={styles.errorMessageAlert}>
                  {validationErrorMessage}
                </Text>
              )}
            </View>
            <Pressable style={styles.signupButton} onPress={signup}>
              <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Next: Secure Account</Text>
            </Pressable>
            <Text style={styles.footerLabel}>©lucia 2021. All rights reserved - V 1</Text>
          </View>
          
        </ScrollView>
        
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

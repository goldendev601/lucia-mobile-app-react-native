import React, { Component, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, useThemeColor } from '../components/Themed';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';
import { sendValidationToken, setNewEmailInfo, setNewPhoneInfo } from '../actions/luciaAppAction';
import PhoneInput from 'react-native-phone-number-input';
import Icon1 from 'react-native-vector-icons/AntDesign';

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
  },
  textContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 200
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    padding: 30,
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
  signupButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 2
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
  fieldWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 15,
    paddingBottom: 4,
    textAlign: 'center',
  },
  fieldLabel: {
    textTransform: 'uppercase',
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 30,
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
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  textLink: {
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
    top: 14
  },
  logoImage: {
    width: 70,
    height: 10,
  },
});

interface IResetPhoneScreenProps {
  navigation: NavigationProp<any>;
}

const ResetPhoneScreen: React.FC<IResetPhoneScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { isSentValidationCode, myProfile } = useSelector((state: IRootState) => state.luciaApp);
  const { navigation } = props;

  const [phone, setPhone] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');
  const [sentLink, setSentLink] = React.useState(false);
  const [formattedValue, setFormattedValue] = React.useState("");
  const [newFormattedValue, setNewFormattedValue] = React.useState("");

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const phoneInput = useRef(null);
  const newPhoneInput = useRef(null);

  const bgColor = useThemeColor({}, 'background');

  React.useEffect(() => {
    if (isSentValidationCode) {
      navigation.navigate('VerificationRecoveryPhoneInfoScreen')
    }
  }, [isSentValidationCode]);

  const goBack = () => {
    navigation.goBack();
  };

  const saveChanges = () => {
    if (myProfile && myProfile.phone) {
      dispatch(setNewPhoneInfo(myProfile.phone, newPhone));
      dispatch(sendValidationToken());
    }
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
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.headerWrapper}>
          <Pressable style={styles.textLinkWrapper} onPress={goBack}>
              <Icon1 style={styles.textLink} name="arrowleft" size={25} color="#BA886E" />
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            {
              fontsLoaded && (
                <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Update Phone</Text>
              )
            }
          </View>
          <View style={styles.textContainer}>
            {/* <Text style={[styles.fieldLabel, {fontFamily: 'Cormorant'}]}>Current Phone</Text>
            <View style={styles.fieldWrapper}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phone}
                placeholder="Enter Phone Number"
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
                textInputProps={{placeholderTextColor: "rgba(255, 255, 255, 0.35)"}}
                codeTextStyle={{color: '#FFF'}}
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
            </View> */}
            <Text style={[styles.fieldLabel, {fontFamily: 'Cormorant'}]}>New Phone</Text>
            <View style={styles.fieldWrapper}>
              <PhoneInput
                ref={newPhoneInput}
                defaultValue={newPhone}
                placeholder="Enter Phone Number"
                defaultCode="US"
                layout="first"
                onChangeText={(text) => {
                  setNewFormattedValue(text);
                }}
                onChangeFormattedText={(text) => {
                  setNewPhone(text);
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
            {validationError && (
                <Text style={styles.errorMessageAlert}>
                  {validationErrorMessage}
                </Text>
            )}
          </View>
          <Pressable style={styles.signupButton} onPress={saveChanges}>
            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
      
  );
};

export default ResetPhoneScreen;

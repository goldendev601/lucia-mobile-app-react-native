import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, useThemeColor } from '../components/Themed';
import { setAccountInfo } from '../actions/authActions';
import { IRootState } from '../reducers';
import { resetPassword } from '../actions/authActions';
import { useFonts } from 'expo-font';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { getMyProfile } from '../actions/luciaAppAction';

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
    lineHeight: 17
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
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 15,
    paddingBottom: 4,
    textAlign: 'center',
  },
});

interface IResetPasswordScreenProps {
  navigation: NavigationProp<any>;
}

const ResetPasswordScreen: React.FC<IResetPasswordScreenProps> = (props) => {
  const dispatch = useDispatch();
  const authData = useSelector((state: IRootState) => state.auth);
  const { navigation } = props;

  const [email, setEmail] = React.useState('');
  const [sentLink, setSentLink] = React.useState(false);

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const { myProfile } = useSelector((state: IRootState) => state.luciaApp)

  useEffect(() => {
    dispatch(getMyProfile())
  }, [])

  React.useEffect(() => {
    if (authData.isSentLink) {
      navigation.navigate('VerificationRecoveryPasswordInfoScreen')
    }
  }, [authData.isSentLink]);

  const sendLink = () => {
    if (email.length === 0) {
      setValidationError(true);
      setValidationErrorMessage(
        'Email can not be empty!'
      );
    } else {
      if (email.length > 0 && email !== myProfile.email) {
        setValidationError(true);
        setValidationErrorMessage(
          'Please enter a valid email'
        );
      } else {
        dispatch(setAccountInfo({    
          email,      
        }));
        dispatch(resetPassword(email));
      }
    }
  };

  const goBack = () => {
    navigation.goBack();
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
                <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Forgot Password</Text>
              )
            }
          </View>
          <View style={styles.descriptionWrapper}>
            {
              fontsLoaded && (
                <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                  We will send you an access code to your registered         
                  email so you can change your password.
                </Text>
              )
            }
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.fieldLabel}>Enter Email</Text>
            <View style={styles.fieldWrapper}>
              <TextInput
                style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                placeholder="Enter your email"
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View>
          </View>
          {validationError && (
            <Text style={styles.errorMessageAlert}>
              {validationErrorMessage}
            </Text>
          )}
          <Pressable style={styles.signupButton} onPress={sendLink}>
            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Send Access Code</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
      
  );
};

export default ResetPasswordScreen;

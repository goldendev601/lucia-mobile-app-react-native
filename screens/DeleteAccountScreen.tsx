import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, useThemeColor } from '../components/Themed';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { IRootState } from '../reducers';
import { resetPassword } from '../actions/authActions';
import { useFonts } from 'expo-font';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { deleteAccount, getMyProfile } from '../actions/luciaAppAction';

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
    lineHeight: 17,
    marginTop: 17
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
    fontSize: 38,
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
  goBackButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    width: '100%',
    marginTop: 20,
    borderColor: '#242424',
    borderWidth: 1
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
  toggle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    right: 0,
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

interface IDeleteAccountScreenProps {
  navigation: NavigationProp<any>;
}

const DeleteAccountScreen: React.FC<IDeleteAccountScreenProps> = (props) => {
  const dispatch = useDispatch();

  const authData = useSelector((state: IRootState) => state.auth);
  const { isDeletedAccount } = useSelector((state: IRootState) => state.auth);

  const { navigation } = props;

  const [sentLink, setSentLink] = React.useState(false);

  const [pass, setPass] = React.useState('');
  const [enableMask, setEnableMask] = React.useState(true);

  const toggleMask = () => setEnableMask((f) => !f);

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  useEffect(() => {
    if (isDeletedAccount) {
      navigation.navigate('AccountDeletedScreen');
    }
  }, [isDeletedAccount])

  React.useEffect(() => {
    if (authData.isSentLink) {
      navigation.navigate('VerificationRecoveryPasswordInfoScreen')
    }
  }, [authData.isSentLink]);

  const removeAccount = () => {
    if (pass.length === 0) {
      setValidationError(true);
      setValidationErrorMessage('Please enter the password!');
    }
    if (!validationError) {
      dispatch(deleteAccount(pass));
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
                <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Delete Your Account?</Text>
              )
            }
          </View>
          <View style={styles.descriptionWrapper}>
            {
              fontsLoaded && (
                <>
                  <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                    You're about to delete your Lucia account. 
                  </Text>
                  <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                    This will go into effect immediately and you will no longer have access to your June account data and settings.
                  </Text>
                  <Text style={[styles.description, {fontFamily: 'Montserrat'}]}>
                    Please enter your password to confirm your account deletion. 
                  </Text>
                </>
              )
            }
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.fieldLabel}>Enter Password</Text>
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
          </View>
          {validationError && (
            <Text style={styles.errorMessageAlert}>
              {validationErrorMessage}
            </Text>
          )}
          <Pressable style={styles.signupButton} onPress={removeAccount}>
            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Yes, delete account</Text>
          </Pressable>
          <Pressable style={styles.goBackButton} onPress={goBack}>
            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>No, Take me back</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
      
  );
};

export default DeleteAccountScreen;

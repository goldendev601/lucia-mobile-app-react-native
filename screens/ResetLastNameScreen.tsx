import React, { Component, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View, useThemeColor } from '../components/Themed';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';
import { clearPersonalUpdatedFlag, updateLastName } from '../actions/luciaAppAction';
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

interface IResetLastNameScreenProps {
  navigation: NavigationProp<any>;
}

const ResetLastNameScreen: React.FC<IResetLastNameScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { myProfile, isUpdatedProfile } = useSelector((state: IRootState) => state.luciaApp);
  const { navigation } = props;

  const [lastName, setLastName] = React.useState('');
  const [newLastName, setNewLastName] = React.useState('');

  const [validationError, setValidationError] = React.useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = React.useState('');

  const bgColor = useThemeColor({}, 'background');

  const goBack = () => {
    navigation.goBack();
  };

  const saveChanges = () => {
    if (newLastName) {
      dispatch(
        updateLastName(newLastName)
      );
    } else {
      setValidationError(true);
      setValidationErrorMessage(
        'Please fill your new last name.'
      );
    }
  };

  React.useEffect(() => {
    if (isUpdatedProfile) {
      dispatch(clearPersonalUpdatedFlag())
      navigation.navigate('PersonalInfo');
    }
  }, [isUpdatedProfile]);

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
                <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Update Last Name</Text>
              )
            }
          </View>
          <View style={styles.textContainer}>
            {/* <Text style={[styles.fieldLabel, {fontFamily: 'Cormorant'}]}>Current Last Name</Text>
            
            <View style={styles.fieldWrapper}>
              <TextInput
                style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                placeholder="Enter your current last name"
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
            </View> */}
            <Text style={[styles.fieldLabel, {fontFamily: 'Cormorant'}]}>New Last Name</Text>
            <View style={styles.fieldWrapper}>
              <TextInput
                style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                placeholder="Enter your new last name"
                onChangeText={(text) => setNewLastName(text)}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
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

export default ResetLastNameScreen;

import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';

import { useFonts } from 'expo-font';
import { authLogoutAndRedirect } from '../actions/authActions';

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
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30    
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 39,
    fontWeight: '400',
    justifyContent: 'center',
    color: '#FFF',
  },
  descriptionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
    justifyContent: 'center',
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
    marginTop: 120,
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
    opacity: 0.8
  },
});

interface IAccountDeletedScreenProps {
  navigation: NavigationProp<any>;
}

const AccountDeletedScreen: React.FC<IAccountDeletedScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const gotoLogin = () => {
    dispatch(authLogoutAndRedirect())
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
            <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>Your account has been</Text>
            <Text style={[styles.title, {fontFamily: 'Cormorant'}]}>successfully deleted</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>
              Please log in with your new credentials!
            </Text>
          </View>
          
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
          <Pressable style={styles.signupButton} onPress={gotoLogin}>
            <Text style={[styles.signupButtonText, {fontFamily: 'Montserrat'}]}>Go to Main Page</Text>
          </Pressable>
      </View>
      
      <Text style={[styles.footerLabel, {fontFamily: 'Montserrat'}]}>©lucia 2021. All rights reserved - V 1</Text>
    </View>
  );
};

export default AccountDeletedScreen;

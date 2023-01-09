import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View, useThemeColor } from '../components/Themed';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { IRootState } from '../reducers';
import { useFonts } from 'expo-font';
import { sendValidationToken, updatePhone } from '../actions/luciaAppAction';

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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    paddingBottom: 5,
    marginLeft: 10,
  },
  iconStyle: {
    padding: 10,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 14,
    padding: 10,
    color: '#2CAF4D',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
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
  signupButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  signinButton: {
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
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242424',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    width: '100%',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#242424',
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
  safeAreaWrapper: {
    padding: 20,
    minHeight: 300,
    backgroundColor: 'transparent',
  },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  toggle: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  cellText: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  logoImage: {
    width: 70,
    height: 10,
  },
});

interface IVerificationRecoveryPhoneInfoScreenProps {
  navigation: NavigationProp<any>;
}

const CELL_COUNT = 6;

const VerificationRecoveryPhoneInfoScreen: React.FC<
  IVerificationRecoveryPhoneInfoScreenProps
> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const bgColor = useThemeColor({}, 'background');

  const { newPhoneInfo, isUpdatedPhone, myProfile } = useSelector(
    (state: IRootState) => state.luciaApp
  );

  const [enableMask, setEnableMask] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cellOnLayout, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const toggleMask = () => setEnableMask((f) => !f);

  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: {
    index: number;
    symbol: any;
    isFocused: boolean;
  }) => {
    let textChild = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <View
        onLayout={getCellOnLayoutHandler(index)}
        style={[styles.cellRoot, isFocused && styles.focusCell]}
        key={index}
      >
        <Text style={styles.cellText}>{textChild}</Text>
      </View>
    );
  };

  const sendVerification = () => {
    dispatch(sendValidationToken());
  };

  const verifyCode = () => {
    if (newPhoneInfo) {
      dispatch(
        updatePhone(newPhoneInfo.currentPhone, newPhoneInfo.newPhone, value)
      );
    }
  };

  React.useEffect(() => {
    if (isUpdatedPhone) {
      navigation.navigate('PersonalInfo');
    }
  }, [isUpdatedPhone]);

  let [fontsLoaded] = useFonts({
    Cormorant: require('../assets/fonts/Cormorant-Light.ttf'),
    Lato: require('../assets/fonts/Lato-Light.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Light.ttf'),
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
            <Text style={[styles.title, { fontFamily: 'Cormorant' }]}>
              Enter Code
            </Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={[styles.description, { fontFamily: 'Montserrat' }]}>
              We sent a verification email to {myProfile.email}
            </Text>
          </View>

          <SafeAreaView style={styles.safeAreaWrapper}>
            <View style={styles.fieldRow}>
              <CodeField
                ref={ref}
                {...cellOnLayout}
                rootStyle={styles.codeFieldRoot}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
              />
            </View>
          </SafeAreaView>

          <Pressable style={styles.signupButton} onPress={sendVerification}>
            <Text
              style={[styles.signupButtonText, { fontFamily: 'Montserrat' }]}
            >
              Resend code
            </Text>
          </Pressable>

          <Pressable style={styles.signinButton} onPress={verifyCode}>
            <Text
              style={[styles.signupButtonText, { fontFamily: 'Montserrat' }]}
            >
              Verify code
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default VerificationRecoveryPhoneInfoScreen;

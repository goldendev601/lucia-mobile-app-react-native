import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import VerificationScreen from '../screens/VerificationScreen';
import VerificationRecoveryPasswordScreen from '../screens/VerificationRecoveryPasswordScreen';
import PasswordSetupScreen from '../screens/PasswordSetupScreen';
import AccountCreatedScreen from '../screens/AccountCreatedScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import ResetScreen from '../screens/ResetScreen';
import SetPreferencesScreen from '../screens/SetPreferencesScreen';
import AuthPickAvatarScreen from '../screens/AuthPickAvatarScreen';
import AuthUploadCameraScreen from '../screens/AuthUploadCameraScreen';
import { AuthParamList } from '../types';

const AuthNavigator: React.FC = () => {
  const AuthStack = createStackNavigator<AuthParamList>();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
      <AuthStack.Screen name="SetPreferencesScreen" component={SetPreferencesScreen} />
      <AuthStack.Screen name="AuthPickAvatarScreen" component={AuthPickAvatarScreen} />
      <AuthStack.Screen name="AuthUploadCameraScreen" component={AuthUploadCameraScreen} />
      <AuthStack.Screen name="VerificationScreen" component={VerificationScreen} />
      <AuthStack.Screen name="VerificationRecoveryPasswordScreen" component={VerificationRecoveryPasswordScreen} />
      <AuthStack.Screen name="PasswordSetupScreen" component={PasswordSetupScreen} />
      <AuthStack.Screen name="AccountCreatedScreen" component={AccountCreatedScreen} />
      <AuthStack.Screen name="ResetScreen" component={ResetScreen} />
      <AuthStack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListScreen from '../screens/ListScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import PickAvatarScreen from '../screens/PickAvatarScreen';
import UploadCameraScreen from '../screens/UploadCameraScreen';
import ItineraryDetailScreen from '../screens/ItineraryDetailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerificationRecoveryPasswordInfoScreen from '../screens/VerificationRecoveryPasswordInfoScreen';
import UpdatePasswordInfoScreen from '../screens/UpdatePasswordInfoScreen';
import ResetEmailScreen from '../screens/ResetEmailScreen';
import ResetPhoneScreen from '../screens/ResetPhoneScreen';
import VerificationRecoveryEmailInfoScreen from '../screens/VerificationRecoveryEmailInfoScreen';
import VerificationRecoveryPhoneInfoScreen from '../screens/VerificationRecoveryPhoneInfoScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ResetFirstNameScreen from '../screens/ResetFirstNameScreen';
import ResetLastNameScreen from '../screens/ResetLastNameScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import AccountDeletedScreen from '../screens/AccountDeletedScreen';
import CalendarSettingsScreen from '../screens/CalendarSettingsScreen';
import CalendarEventDetailScreen from '../screens/CalendarEventDetailScreen';


const HomeStackNavigator: React.FC = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <HomeStack.Screen
        name="ItineraryDetailScreen"
        component={ItineraryDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </HomeStack.Navigator>
  );
};

const ListStackNavigator: React.FC = () => {
  const ListStack = createDrawerNavigator();
  return (
    <ListStack.Navigator
      drawerContent={(props) => <ListScreen {...props} />}
    >
      <ListStack.Screen
        name="List"
        component={HomeStackNavigator}
        options={{
          headerShown: false
        }}
      />
      <ListStack.Screen
        name="CalendarScreen"
        component={CalendarStackNavigator}
        options={{
          headerShown: false
        }}
      />
      <ListStack.Screen
        name="ProfileScreen"
        component={ProfileStackNavigator}
        options={{
          headerShown: false
        }}
      />
    </ListStack.Navigator>
  );
};


const CalendarStackNavigator: React.FC = () => {
  const CalendarStack = createStackNavigator();
  return (
    <CalendarStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false
        }}
      />
      <CalendarStack.Screen
        name="CalendarSettingsScreen"
        component={CalendarSettingsScreen}
        options={{
          headerShown: false
        }}
      />
      <CalendarStack.Screen
        name="CalendarEventDetailScreen"
        component={CalendarEventDetailScreen}
        options={{
          headerShown: false
        }}
      />
    </CalendarStack.Navigator>
  );
};

const ProfileStackNavigator: React.FC = () => {
  const ProfileStack = createStackNavigator();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
        animationEnabled: true,
      }}
      mode='modal'
      headerMode='none'
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false
        }}
      />
      <ProfileStack.Screen
        name="PersonalInfo"
        component={PersonalInfoScreen}
      />
      <ProfileStack.Screen
        name="PickAvatarScreen"
        component={PickAvatarScreen}
      />
      <ProfileStack.Screen
        name="UploadCameraScreen"
        component={UploadCameraScreen}
      />
      <ProfileStack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
      <ProfileStack.Screen
        name="AccountDeletedScreen"
        component={AccountDeletedScreen}
      />
      <ProfileStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <ProfileStack.Screen
        name="VerificationRecoveryPasswordInfoScreen"
        component={VerificationRecoveryPasswordInfoScreen}
      />
      <ProfileStack.Screen
        name="UpdatePasswordInfoScreen"
        component={UpdatePasswordInfoScreen}
      />
      <ProfileStack.Screen
        name="ResetEmailScreen"
        component={ResetEmailScreen}
      />
      <ProfileStack.Screen
        name="ResetPhoneScreen"
        component={ResetPhoneScreen}
      />
      <ProfileStack.Screen
        name="ResetFirstNameScreen"
        component={ResetFirstNameScreen}
      />
      <ProfileStack.Screen
        name="ResetLastNameScreen"
        component={ResetLastNameScreen}
      />
      <ProfileStack.Screen
        name="VerificationRecoveryEmailInfoScreen"
        component={VerificationRecoveryEmailInfoScreen}
      />
      <ProfileStack.Screen
        name="VerificationRecoveryPhoneInfoScreen"
        component={VerificationRecoveryPhoneInfoScreen}
      />
    </ProfileStack.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const RootStack = createStackNavigator()
  return (
    <RootStack.Navigator
      headerMode='none'
    >
      <RootStack.Screen
        name='HomeNav'
        component={ListStackNavigator}
      />
      {/* <RootStack.Screen
        name='ProfileScreen'
        component={ProfileStackNavigator}
      /> */}
      {/* <RootStack.Screen
        name='ListScreen'
        component={ListStackNavigator}
      /> */}
      {/* <RootStack.Screen
        name='CalendarScreen'
        component={CalendarStackNavigator}
      /> */}
    </RootStack.Navigator>
  )
}

export default RootNavigator;

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Welcome: {
            screens: {
              WelcomeScreen: 'welcome',
            },
          },
          Signup: {
            screens: {
              SignupScreen: 'signup',
            },
          },
          PrivacyPolicy: {
            screens: {
              PrivacyPolicyScreen: 'privacyPolicy',
            },
          },
          Verification: {
            screens: {
              VerificationScreen: 'verification',
            },
          },
          VerificationRecoveryPassword: {
            screens: {
              VerificationRecoveryPasswordScreen: 'verificationRecoveryPassword',
            },
          },
          Homepage: {
            screens: {
              HomePageScreen: 'homepage',
            },
          },
          PasswordSetup: {
            screens: {
              PasswordSetupScreen: 'passwordSetup',
            },
          },
          Reset: {
            screens: {
              ResetScreen: 'reset',
            },
          },
          UpdatePassword: {
            screens: {
              UpdatePasswordScreen: 'updatePassword',
            },
          },
        },
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          NotFound: '*',
        },
      },
    },
  },
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, Button, Platform } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';
import { IRootState } from '../reducers';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { setCalendarViewSetting } from '../actions/luciaAppAction';


const styles = StyleSheet.create({
  wrapper: {
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#111',
    height: '30%',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  container: {
    backgroundColor: '#7B61FF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 0,
    width: '100%',
    flexDirection: 'column',
  },
  textContainer: {
    width: '85%',
    textAlign: 'left',
  },
  logoImage: {
    width: 70,
    height: 10,
    marginTop: 15,
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
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    marginTop: 18,
    marginBottom: 80
  },
  closeBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
  },
  rightBtn: {
    height: 30,
    width: 30,
    backgroundColor: '#BA886E'
  },
  settingBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent'
  },
  dateBtn: {
    height: 30,
    width: 50,
    backgroundColor: '#BA886E',
    marginRight: 2
  },
  textInfo: {
    display: 'flex',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    height: 210,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  headerContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  mainContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 20
  },
  itinerariesContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row'
  },
  settingsWrapper: {
    display: 'flex',
    marginTop: 20,
    width: '100%',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    justifyContent: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FFF',
  },
  label: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '300',
    justifyContent: 'flex-start',
    color: '#FFF',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '400',
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  textLinkWrapper: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  textLink: {
    textDecorationStyle: 'solid',
    color: '#7B61FF',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'right',
  },
  iconCloseImage: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  iconCloseImage1: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  iconCloseImage2: {
    width: 30,
    height: 30,
  },
  eventContainer: {
    backgroundColor: '#2293B34D',
    minHeight: 40,
    flex: 1,
  },
  calendarItem: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  calendarEventItem: {
    width: '80%', 
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    minHeight: 120,
    backgroundColor: 'transparent'
  },
  calendarSnapText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFF'
  },
  calendarAllDayEventText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: '#2293B3'
  },
  dateInfo: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  settingsBtnSelected: {
    width: 106,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA886E',
    height: 27
  },
  settingsBtn: {
    width: 106,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#302626',
    height: 27,
    borderColor: '#979797',
    borderStyle: 'solid',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  }
});

interface ICalendarSettingsScreenProps {
  navigation: NavigationProp<any>;
}

const CalendarSettingsScreen: React.FC<ICalendarSettingsScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const viewOptions = ['day', 'week', 'month'];

  const { calendarViewSetting } = useSelector((state: IRootState) => state.luciaApp);

  let [fontsLoaded] = useFonts({
    Cormorant: require('../assets/fonts/Cormorant-Light.ttf'),
    Lato: require('../assets/fonts/Lato-Light.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Light.ttf'),
  });

  const goBack = () => {
    navigation.goBack();
  };

  const setViewOption = (option: string) => {
    dispatch(setCalendarViewSetting(option));
  };

  return (
    <View style={styles.wrapper}>
        {
          fontsLoaded && (
            <>
              <View style={styles.titleWrapper}>
                <Text style={[styles.title, { fontFamily: 'Montserrat' }]}>
                  Calendar Settings
                </Text>
                <Pressable onPress={goBack} style={styles.closeBtn}>
                    <Icon1
                      name="close"
                      size={20}
                      color="#CCC"
                      style={styles.iconCloseImage2}
                    />
                  </Pressable>
              </View>
              <View style={styles.settingsWrapper}>
                <Text style={[styles.label, { fontFamily: 'Lato' }]}>
                  View by
                </Text>
              </View>
              <View style={styles.btnWrapper}>
                {
                  viewOptions.map((option, index) => {
                    return (
                      <Pressable onPress={() => setViewOption(option)}>
                        {
                          calendarViewSetting === option ? (
                            <View
                              style={styles.settingsBtnSelected}
                              key={index}
                            >
                              <Text style={[styles.btnText, { fontFamily: 'Montserrat' }]}>
                                {option}
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={styles.settingsBtn}
                              key={index}
                            >
                              <Text style={[styles.btnText, { fontFamily: 'Montserrat' }]}>
                                {option}
                              </Text>
                            </View>
                          )
                        }
                        
                      </Pressable>
                    )
                  })
                }
              </View>
            </>
        )}
    </View>
  );
};

export default CalendarSettingsScreen;

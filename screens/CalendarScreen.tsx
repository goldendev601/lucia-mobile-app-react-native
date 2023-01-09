import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, Button, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { useFonts } from 'expo-font';
import Icon2 from 'react-native-vector-icons/Feather';
import { clearItineraryDetailInfo, getCalendarEvents, setCalendarEventInfo } from '../actions/luciaAppAction';
import { CalendarEvent, IRootState } from '../reducers';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Fontisto';
import { Calendar } from 'react-native-big-calendar'


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
    height: 30
  },
  monthInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  leftBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    marginRight: 2
  },
  rightBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent'
  },
  settingBtn: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent'
  },
  dateBtn: {
    height: 30,
    width: 30,
    borderRadius: 16,
    backgroundColor: '#BA886E',
  },
  dayDiv: {
    height: 30,
    width: 120,
    backgroundColor: 'transparent',
    marginRight: 10
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
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row'
  },
  title: {
    fontSize: 39,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#FFF',
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
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
  dayInfo: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2
  },
  monthInfo: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 8
  },
  yearInfo: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginRight: 4
  },

});

interface ICalendarScreenProps {
  navigation: NavigationProp<any>;
}

const weekLabels = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const monthLabels = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]

// const events = [
//   {
//     "id": 2,
//     "title": "South Africa 2032",
//     "start": "2022-08-10T00:00:00.000000Z",
//     "end": "2022-09-30T00:00:00.000000Z",
//     "allDay": true,
//     "resource": null
//   },
//   {
//       "id": 15,
//       "title": "French Southern Territories 2030",
//       "start": "2022-08-10T00:00:00.000000Z",
//       "end": "2022-09-30T00:00:00.000000Z",
//       "allDay": true,
//       "resource": null
//   },
//   {
//       "id": 67,
//       "title": "Erich Randall &",
//       "start": "2022-08-13T00:00:00.000000Z",
//       "end": "2022-10-08T00:00:00.000000Z",
//       "allDay": true,
//       "resource": null
//   }
// ]

// events.forEach(value => {
//   value.start = new Date(value.start);
//   value.end = new Date(value.end);
// })


const CalendarScreen: React.FC<ICalendarScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const { calendarEvents, calendarViewSetting } = useSelector((state: IRootState) => state.luciaApp);

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [currentDay, setCurrentDay] = React.useState(new Date().getDay());
  const [currentDateValue, setCurrentDateValue] = React.useState(1);
  const [currentMonthValue, setCurrentMonthValue] = React.useState(1);
  const [currentYearValue, setCurrentYearValue] = React.useState(1);

  const [events, setEvents] = React.useState([]);

  useEffect(() => {
    if (currentDate) {
      setCurrentDay(currentDate.getDay());
      const startDate = new Date(currentDate).toISOString().split('T')[0];
      if (startDate) {
        const endDate = new Date(new Date(currentDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        setCurrentDateValue(parseInt(startDate.split('-')[2])+1);
        setCurrentMonthValue(parseInt(startDate.split('-')[1]));
        setCurrentYearValue(parseInt(startDate.split('-')[0]));
        console.log(startDate);
        console.log(endDate);
        dispatch(getCalendarEvents(startDate, endDate))
      }
    }
  }, [currentDate])

  useEffect(() => {
    if (calendarEvents && calendarEvents.length > 0) {
      calendarEvents.forEach(value => {
        value.start = new Date(value.start);
        value.end = new Date(value.end);
      })
    }
    setEvents(calendarEvents)
  }, [calendarEvents])

  let [fontsLoaded] = useFonts({
    Cormorant: require('../assets/fonts/Cormorant-Light.ttf'),
    Lato: require('../assets/fonts/Lato-Light.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Light.ttf'),
  });

  const goListScreen = () => {
    navigation.toggleDrawer();
  };

  const beforeOneDay = () => {
    console.log("before One Day")
    const newCurrentDate = new Date(new Date(currentDate).getTime() - 24 * 60 * 60 * 1000);    
    console.log(newCurrentDate);
    setCurrentDate(newCurrentDate);
    setCurrentDay(newCurrentDate.getDay());
  };

  const swapViewMethod = () => {
    navigation.navigate('CalendarSettingsScreen');
  };

  const afterOneDay = () => {
    console.log("after One Day")
    const newCurrentDate = new Date(new Date(currentDate).getTime() + 24 * 60 * 60 * 1000);
    console.log(newCurrentDate);
    setCurrentDate(newCurrentDate);
    setCurrentDay(newCurrentDate.getDay());
  };

  const gotoItineraryDetail = (event: CalendarEvent) => {
    dispatch(clearItineraryDetailInfo());
    dispatch(setCalendarEventInfo(event));
    navigation.navigate('CalendarEventDetailScreen');

  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={[styles.scrollContainer]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerWrapper}>
          <Pressable onPress={goListScreen}>
            <Icon2
              name="align-left"
              size={30}
              color="#BA886E"
              style={styles.iconCloseImage}
            />
          </Pressable>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <View>
          </View>
        </View>
        
        {
          fontsLoaded && (
            <>
              <View style={styles.titleWrapper}>
                <Text style={[styles.title, { fontFamily: 'Cormorant' }]}>
                  Calendar
                </Text>
              </View>
              <View style={styles.settingsWrapper}>
                <Pressable style={styles.monthInfoWrapper}>
                  <Text style={[styles.monthInfo, { fontFamily: 'Montserrat' }]}>
                    {monthLabels[currentMonthValue-1]}
                  </Text>
                  <Text style={[styles.yearInfo, { fontFamily: 'Montserrat' }]}>
                    {currentYearValue}
                  </Text>
                  <Icon2
                    name="chevron-down"
                    size={16}
                    color="#FFF"
                    style={styles.iconCloseImage2}
                  />
                </Pressable>
                <Pressable onPress={swapViewMethod} style={styles.settingBtn}>
                    <Icon3
                      name="player-settings"
                      size={16}
                      color="#FFF"
                      style={styles.iconCloseImage2}
                    />
                  </Pressable>
              </View>
              <View style={styles.settingsWrapper}>
                <View style={styles.btnWrapper}>
                  <Pressable onPress={beforeOneDay} style={styles.leftBtn}>
                    <Icon1
                      name="left"
                      size={12}
                      color="#FFF"
                      style={styles.iconCloseImage2}
                    />
                  </Pressable>
                  <View style={styles.dayDiv}>
                    <Text style={[styles.dayInfo, { fontFamily: 'Montserrat' }]}>
                        {weekLabels[currentDay]}
                    </Text>
                  </View>
                  {
                    calendarViewSetting !== "day" && (
                      <View style={styles.dateBtn}>
                        {
                          currentDateValue === 32 ? (
                            <Text style={[styles.dateInfo, { fontFamily: 'Montserrat' }]}>
                              1
                            </Text>
                          ) : (
                            <Text style={[styles.dateInfo, { fontFamily: 'Montserrat' }]}>
                              {currentDateValue}
                            </Text>
                          )
                        }
                        
                      </View>
                    )
                  }
                  
                </View>
                <Pressable onPress={afterOneDay} style={styles.rightBtn}>
                    <Icon1
                      name="right"
                      size={12}
                      color="#FFF"
                      style={styles.iconCloseImage2}
                    />
                  </Pressable>
              </View>
              
            </>
        )}

        <View style={styles.mainContainer}>
          <ScrollView style={{backgroundColor: 'transparent'}}>
            <View style={{backgroundColor: 'transparent'}}>
              {
                (calendarViewSetting !== 'day' && calendarViewSetting !== 'week' && calendarViewSetting !== 'month' ) ? (
                  <Calendar 
                    events={events} 
                    height={480} 
                    mode={'day'}
                    date={currentDate}
                  />
                ) : (
                  <Calendar 
                    events={events} 
                    height={480} 
                    mode={calendarViewSetting}
                    date={currentDate}
                    onPressEvent={gotoItineraryDetail}
                  />
                ) 
              }
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

export default CalendarScreen;

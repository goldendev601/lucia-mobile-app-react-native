import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Pressable, Image, TextInput, Linking, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProp } from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import {
  getDashBoardInfo,
  getFilteredItineraryList,
  getMyProfile,
  setItineraryInfo,
} from '../actions/luciaAppAction';
import { IRootState, Itinerary } from '../reducers';
import { useFonts } from 'expo-font';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import * as WebBrowser from 'expo-web-browser';



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
  itineraryTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'transparent',
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
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 40,
    backgroundColor: 'transparent',
    paddingLeft: 30,
    paddingRight: 30,
  },
  title: {
    fontSize: 39,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#FFF',
  },
  subTitleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 25,
    backgroundColor: 'transparent',
  },
  subTitle: {
    fontSize: 30,
    fontWeight: '400',
    justifyContent: 'flex-start',
    color: '#FFF',
  },
  dateInfo: {
    fontSize: 14,
    color: '#111111',
    paddingLeft: 20,
    paddingRight: 20,
  },
  helpText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
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
    backgroundColor: 'transparent',
    marginLeft: 15,
    borderColor: '#BA886E',
    borderRadius: 8,
    borderWidth: 0.5,
  },
  fieldCheckboxWrapper: {
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
    paddingRight: 30,
  },
  iconStyle: {
    padding: 10,
    position: 'absolute',
    zIndex: 99,
    left: 0,
  },
  fieldInput: {
    backgroundColor: 'transparent',
    fontSize: 14,
    color: '#fff',
    flex: 1,
    paddingTop: 12,
    paddingBottom: 12,
  },
  errorMessageAlert: {
    fontSize: 10,
    color: '#cc3300',
    fontStyle: 'italic',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
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
  signupButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61FF',
    padding: 16,
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderRadius: 14,
    width: '85%',
    marginTop: 16,
  },
  greenButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
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
  slideContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 0,
  },
  slideImage: {
    width: '80%',
    height: '90%',
  },
  eventImageContainer: {
    height: 280,
    overflow: 'hidden',
  },
  eventInfoContainer: {
    height: 70,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
  nameInfoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(123, 97, 255, 0.3)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullNameInfoContainer: {
    width: '60%',
    paddingLeft: 12,
  },
  fullNameInfo: {
    fontSize: 14,
    color: '#111',
  },
  nameInfo: {
    fontSize: 12,
    color: '#7B61FF',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  emailInfo: {
    fontSize: 12,
    color: '#111',
    opacity: 0.5,
  },
  priceInfoContainer: {
    marginLeft: 'auto',
  },
  priceInfo: {
    fontSize: 18,
    color: '#111',
  },
  notificationInfo: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '400',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  notificationTitleInfo: {
    fontSize: 39,
    lineHeight: 50,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankInfoContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 100,
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
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 5,
    width: 188,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7B61FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer: {
    marginTop: 5,
    width: 250,
    height: 36,
    backgroundColor: '#FFF',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#7B61FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitleInfo: {
    fontSize: 14,
    color: '#7B61FF',
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  bkImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FFF',
    borderColor: '#7B61FF',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonText: {
    color: '#7B61FF',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalText: {
    color: 'rgba(17, 17, 17, 0.4)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTitle: {
    color: '#111',
    fontSize: 18,
    lineHeight: 40,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryItemListContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  categoryItemContainer: {
    width: '100%',
    backgroundColor: '#232121',
    marginBottom: 19,
  },
  imageItemInfo: {
    height: 118,
    textAlign: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  itineraryTitleInfo: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'left',
  },
  itineraryDescriptionInfo: {
    color: '#FFF',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'left',
    opacity: 0.8,
    marginTop: 5,
  },
  itineraryDateInfo: {
    color: '#BA886E',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 5,
  },
});

interface IHomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<IHomeScreenProps> = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;

  const [searchable, setSearchable] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  

  useEffect(() => {
    dispatch(getDashBoardInfo());
  }, []);

  const gotoItineraryDetailScreen = (itinerary: Itinerary) => {
    if (itinerary.sharing) {
      WebBrowser.openBrowserAsync(itinerary.sharing.appUrl);
    }
  };

  const goListScreen = () => {
    // navigation.navigate('ListScreen');
    navigation.toggleDrawer();
  };

  const hideSearchBar = () => {
    setSearchable(false);
  };

  const showSearchBar = () => {
    setSearchable(true);
  };

  const resetSearchInfo = () => {
    setSearchValue('');
  };

  const handleSearchChange = (value: string) => {
    if (value) {
      dispatch(getFilteredItineraryList(value));
    } else {
      dispatch(getDashBoardInfo());
    }
  };

  useEffect(() => {
    handleSearchChange(searchValue)
  }, [searchValue])

  let [fontsLoaded] = useFonts({
    Cormorant: require('../assets/fonts/Cormorant-Light.ttf'),
    Lato: require('../assets/fonts/Lato-Light.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Light.ttf'),
  });

  const { dashboardInfo } = useSelector((state: IRootState) => state.luciaApp);

  return (
    <View style={styles.wrapper}>
      {
        dashboardInfo && (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={[styles.scrollContainer]}
            keyboardShouldPersistTaps="handled"
          >
            {
              (dashboardInfo.trips.length === 0 &&
                dashboardInfo.past_trips.length === 0 && searchValue === '') && (
                  <Image
                    source={require('../assets/images/home-empty-bk.png')}
                    style={styles.bkImage}
                    resizeMode="cover"
                  />
                )
            }

            {
              (dashboardInfo.trips.length === 0 &&
                dashboardInfo.past_trips.length === 0 && searchValue !== '') && (
                  <Image
                    source={require('../assets/images/bk.png')}
                    style={styles.bkImage}
                    resizeMode="cover"
                  />
                )
            }
            
            {searchable ? (
              <View style={styles.headerWrapper}>
                <Pressable onPress={hideSearchBar}>
                  <Image
                    source={require('../assets/images/nav-arrow-right.png')}
                    style={styles.iconCloseImage}
                    resizeMode="contain"
                  />
                </Pressable>
                <View style={styles.fieldWrapper}>
                  <Image
                    source={require('../assets/images/searchIcon.png')}
                    style={styles.iconCloseImage1}
                    resizeMode="cover"
                  />
                  <TextInput
                    style={[styles.fieldInput, {fontFamily: 'Montserrat'}]}
                    placeholder="Enter search term here"
                    placeholderTextColor="#FFF"
                    value={searchValue}
                    onChangeText={(text) => setSearchValue(text)}
                  />
                  <Pressable onPress={resetSearchInfo}>
                    <Icon1
                      name="closecircleo"
                      size={23}
                      color="#BA886E"
                      style={styles.iconCloseImage2}
                    />
                  </Pressable>
                </View>
              </View>
            ) : (
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
                <Pressable onPress={showSearchBar}>
                  <Image
                    source={require('../assets/images/searchIcon.png')}
                    style={styles.iconCloseImage}
                    resizeMode="cover"
                  />
                </Pressable>
              </View>
            )}

            {(dashboardInfo.trips.length === 0 &&
              dashboardInfo.past_trips.length === 0) && searchValue === "" &&
              fontsLoaded && (
                <View style={styles.blankInfoContainer}>
                  
                  <Text
                    style={[
                      styles.notificationTitleInfo,
                      { fontFamily: 'Cormorant' },
                    ]}
                  >
                    “Travel is the only thing you buy that makes you richer”
                  </Text>
                  <Text style={[styles.notificationInfo, {fontFamily: 'Montserrat'}]}>
                    All your itineraries will display here. You don’t have any itineraries at the moment.
                  </Text>
                </View>
              )}
            {(dashboardInfo.trips.length === 0 &&
              dashboardInfo.past_trips.length === 0) && searchValue !== "" &&
              fontsLoaded && (
                <View style={styles.blankInfoContainer}>
                  
                  <Text
                    style={[
                      styles.notificationTitleInfo,
                      { fontFamily: 'Cormorant' },
                    ]}
                  >
                    No results found
                  </Text>
                  <Text style={[styles.notificationInfo, {fontFamily: 'Montserrat'}]}>
                    Your search results will be displayed here.
                  </Text>
                </View>
              )}
            {(dashboardInfo.trips.length > 0 ||
              dashboardInfo.past_trips.length > 0) &&
              fontsLoaded && (
                <View style={styles.titleWrapper}>
                  <Text style={[styles.title, { fontFamily: 'Cormorant' }]}>
                    My Itineraries
                  </Text>
                </View>
              )}

            <View style={styles.mainContainer}>
              <View style={styles.itinerariesContainer}>
                {dashboardInfo.trips.length > 0 && (
                  <View style={styles.categoryContainer}>
                    <View style={styles.categoryItemListContainer}>
                      {dashboardInfo.trips &&
                        dashboardInfo.trips.map((itinerary, itineraryIndex) => {
                          return (
                            <Pressable
                              onPress={() => gotoItineraryDetailScreen(itinerary)}
                            >
                              <View
                                style={styles.categoryItemContainer}
                                key={itineraryIndex}
                              >
                                {itinerary.pictures.length > 0 && (
                                  <View style={[styles.imageItemInfo]}>
                                    <Image
                                      source={{
                                        uri: itinerary.pictures[0],
                                      }}
                                      style={styles.image}
                                      resizeMode="cover"
                                    />
                                  </View>
                                )}

                                <View style={[styles.textInfo]}>
                                  <View style={[styles.itineraryTitleWrapper]}>
                                    {fontsLoaded && (
                                      <Text
                                        style={[
                                          styles.itineraryTitleInfo,
                                          { fontFamily: 'Montserrat' },
                                        ]}
                                      >
                                        {itinerary.title}
                                      </Text>
                                    )}
                                  </View>
                                  {fontsLoaded && (
                                    <Text
                                      style={[
                                        styles.itineraryDateInfo,
                                        { fontFamily: 'Montserrat' },
                                      ]}
                                    >
                                      {itinerary.start_date}
                                    </Text>
                                  )}

                                  {itinerary.abstract_note && fontsLoaded && (
                                    <Text
                                      style={[
                                        styles.itineraryDescriptionInfo,
                                        { fontFamily: 'Montserrat' },
                                      ]}
                                    >
                                      {itinerary.abstract_note
                                        .replace(/<[^>]+>/g, '')
                                        .replace('&nbsp;', '')}
                                    </Text>
                                  )}
                                </View>
                              </View>
                            </Pressable>
                          );
                        })}
                    </View>
                  </View>
                )}

                {(dashboardInfo.trips.length > 0 ||
                  dashboardInfo.past_trips.length > 0) &&
                  fontsLoaded && (
                    <View style={[styles.subTitleWrapper]}>
                      <Text style={[styles.subTitle, { fontFamily: 'Cormorant' }]}>
                        Past Trips
                      </Text>
                    </View>
                  )}

                {dashboardInfo.past_trips.length > 0 && (
                  <View style={styles.categoryContainer}>
                    <View style={styles.categoryItemListContainer}>
                      {dashboardInfo.past_trips &&
                        dashboardInfo.past_trips.map((pastItinerary, index) => {
                          return (
                            <Pressable
                              onPress={() =>
                                gotoItineraryDetailScreen(pastItinerary)
                              }
                            >
                              <View
                                style={styles.categoryItemContainer}
                                key={index}
                              >
                                {pastItinerary.pictures.length > 0 && (
                                  <View style={[styles.imageItemInfo]}>
                                    <Image
                                      source={{
                                        uri: pastItinerary.pictures[0],
                                      }}
                                      style={styles.image}
                                      resizeMode="cover"
                                    />
                                  </View>
                                )}
                                <View style={[styles.textInfo]}>
                                  <View style={[styles.itineraryTitleWrapper]}>
                                    {fontsLoaded && (
                                      <Text style={[styles.itineraryTitleInfo, { fontFamily: 'Montserrat' }]}>
                                        {pastItinerary.title}
                                      </Text>
                                    )}
                                  </View>
                                  <Text style={styles.itineraryDateInfo}>
                                    {pastItinerary.start_date}
                                  </Text>
                                  {
                                    pastItinerary.abstract_note && (
                                      <Text style={styles.itineraryDescriptionInfo}>
                                        {pastItinerary.abstract_note
                                          .replace(/<[^>]+>/g, '')
                                          .replace('&nbsp;', '')}
                                      </Text>
                                    )
                                  }
                                
                                </View>
                              </View>
                            </Pressable>
                          );
                        })}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )
      }
      
    </View>
  );
};

export default HomeScreen;

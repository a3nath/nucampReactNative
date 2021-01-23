import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Home from './HomeComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favourites from './FavouritesComponent';
import {View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import {fetchCampsites, fetchComments, fetchPartners, fetchPromotions} from '../redux/ActionCreators';
import Login from './LoginComponent';


//allows us to access action creators as props

const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPartners,
    fetchPromotions
};

//stack navigator for home scren
//dont need inital route since only one scrren

const HomeNavigator = createStackNavigator(
    {
        Home: {screen: Home}
    },
    {
        // header styling
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft:<Icon
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)


//stack navigator for home scren
//Two screens: for directory and campsites
//initial route for default

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory, 
            navigationOptions: ({navigation}) =>  ({
                headerLeft: <Icon
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                    
                />
            })
        
        },
        CampsiteInfo: { screen: CampsiteInfo}
    },
    {
        initialRouteName: 'Directory',
         // header styling
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        } 
    }
);

const FavouritesNavigator = createStackNavigator(
    {
        Favourites: { screen: Favourites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: { screen: Login }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: {screen: About}

    },
    {
        // header styling
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        // header styling
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
                />
        })
    }
);

const ReservationNavigator = createStackNavigator(
    {
        Reservation: {screen: Reservation}
    },
    {
        // header styling
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle:{
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft:<Icon
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

const CustomDrawerContentComponent = props => (
    <ScrollView>
        {/* Safe area where nothing else will layout. Specifically for ios */}
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 
            'always', horizontal: 'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.DrawerHeaderText}>Nucamp</Text>
                </View>
            </View>
            <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)



//Main screen navigator with screens to navigate to
const MainNavigator = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions:{
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        color={tintColor}
                        size={24}
                    />
                )
            }
        },
        Directory: {screen:DirectoryNavigator,
            navigationOptions:{
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        color={tintColor}
                        size={24}
                    />
                )
            }
        },
        Favourites: {
            screen: FavouritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favourites',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {screen:AboutNavigator,
            navigationOptions:{
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        color={tintColor}
                        size={24}
                    />
                )
            }
        },
        Contact: {screen:ContactNavigator,
            navigationOptions:{
                drawerLabel:'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        color={tintColor}
                        size={24}
                    />
                )
            }
        },
        Reservation: {screen:ReservationNavigator,
            navigationOptions:{
                drawerLabel:'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon
                        name='tree'
                        type='font-awesome'
                        color={tintColor}
                        size={24}
                    />
                )
            }
        }
    },
    {
     initialRouteName: 'Home',
     drawerBackgroundColor: "#CEC8FF",
     contentComponent: CustomDrawerContentComponent

    }

)
// createAppContainer returns a react component
// Handles connecting top level navigator to rest of application 


//Main Navigator is the main screen now
const AppNavigator = createAppContainer(MainNavigator);


class Main extends Component {

    //call action creators
    componentDidMount(){
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPartners();
        this.props.fetchPromotions();
    }
 
    render() {
        return (
            <View style={
                {
                flex: 1,
                // conditional styling based on OS type
                paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}>
                <AppNavigator/>
            </View>   
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#5637DD',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);
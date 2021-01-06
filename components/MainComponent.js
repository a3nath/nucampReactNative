import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Home from './HomeComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {View, Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';


//stack navigator for home scren
//dont need inital route since only one scrren

const HomeNavigator = createStackNavigator(
    {
        Home: {screen: Home}
    },
    {
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
)


//stack navigator for home scren
//Two screens: for directory and campsites
//initial route for default

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo } 
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

const AboutNavigator = createStackNavigator(
    {
        About: {screen: About}

    },
    {
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

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
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
)

//Main screen navigator with screens to navigate to

const MainNavigator = createDrawerNavigator(
    {
        Home: {screen: HomeNavigator},
        Directory: {screen:DirectoryNavigator},
        About: {screen:AboutNavigator},
        Contact: {screen:ContactNavigator}
    },
    {
     drawerBackgroundColor: "#CEC8FF"   
    }

)
// createAppContainer returns a react component
// Handles connecting top level navigator to rest of application 


//Main Navigator is the main screen now
const AppNavigator = createAppContainer(MainNavigator);


class Main extends Component {
   
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

export default Main;
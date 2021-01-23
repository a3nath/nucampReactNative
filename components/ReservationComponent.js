import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

class Reservation extends Component {
    constructor(props){
        super(props);
        this.state={
            campers:1,
            hikeIn:false,
            date: new Date,
            showCalendar:false
        };
    }

    static navigationOptions = {
        title:'Reserve Campsite'
    }

    resetForm(){
        this.setState({
            campers:1,
            hikeIn:false,
            date: new Date,
            showCalendar:false
        })
    };

    async presentLocalNotification(date) {
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${date} requested`
                },
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                        Number of Campers
                        </Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.campers}
                            onValueChange={(item) => this.setState({campers: item})}>
                            <Picker.Item value='1' label='1'/>
                            <Picker.Item value='2' label='2'/>
                            <Picker.Item value='3' label='3'/>
                            <Picker.Item value='4' label='4'/>
                            <Picker.Item value='5' label='5'/>
                            <Picker.Item value='6' label='6'/>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formRow}>Hike-In?</Text>
                        <Switch
                            style={styles.formLabel}
                            value={this.state.hikeIn}
                            trackColor={{true: '#00ff00', false:'#68000d'}}
                            onValueChange={(value) => this.setState({hikeIn: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date</Text>
                        <Button
                            onPress={() =>
                                this.setState({showCalendar: !this.showCalendar})
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='#5637DD'
                            accessibilityLabel='Click here to choose a reservation date'
                        />
                    </View>
                    {/* If calendar is open you can choose date */}
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            // if user chooses date and doesn't just escape
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({date: selectedDate, showCalendar: false})
                            }}

                            style={styles.formItem}
                        />    
                    )}
                    <View style={styles.formRow}>
                        <Button
                            title='Search'
                            color="#5637DD"
                            accessibilityLabel='Tap tap tap - Search for available campsites'
                            onPress={() => 
                                Alert.alert(
                                    'Begin Search?',
                                    `Number of campers: ${this.state.campers} \nHike in: ${(this.state.hikeIn ? "Yes": "No")} \nDate: ${this.state.date.toLocaleDateString('en-Us')}`,
                                    [
                                        {
                                            text:'Cancel',
                                            onPress: () => this.resetForm()
                                        },
                                        {
                                            text:'Okay',
                                            onPress: () => {
                                                this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'));
                                                this.resetForm();
                                            }
                                        }
                                    ],
                                        { cancelable: false }
                                )}
                       />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;
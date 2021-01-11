import React, {Component} from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Picker } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {
    constructor(props){
        super(props);
        this.state={
            campers:1,
            hikeIn:false,
            date: new Date,
            showCalendar:false,
            showModal:false
        };
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal})
    }

    static navigationOptions = {
        title:'Reserve Campsite'
    }

    handleReservation(){
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    };

    resetForm(){
        this.setState({
            campers:1,
            hikeIn:false,
            date: new Date,
            showCalendar:false,
            showModal:false
        })
    };

    render(){
        return(
            <ScrollView>
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
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color="#5637DD"
                        accessibilityLabel='Tap tap tap - Search for available campsites'
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Search Campsites Reservation</Text>
                        <Text style={styles.modalTitle}>
                            Number of Campers: {this.state.campers}
                        </Text>
                        <Text style={styles.modalTitle}>
                            Hike in: {this.state.hikeIn? "Yes": "No"}
                        </Text>
                        <Text style={styles.modalTitle}>
                            Date: {this.state.date.toLocaleDateString('en-Us')}
                        </Text>
                        <Button
                            onPress={() => {
                            this.resetForm();
                            this.toggleModal()
                            }}
                            color='#5637dd'
                            title='Close'
                        />
                    </View>
                </Modal>
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
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#5637DD',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }

});

export default Reservation;
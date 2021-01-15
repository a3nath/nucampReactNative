import React, {Component} from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animable from 'react-native-animatable';

class Contact extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        title:'Contact'
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animate='fadeInDown' duration={2000} delay={2000}>   
                    <Card title= "Contact Information" wrapperStyle={{margin: 20}}>
                        <Text>
                            1 Nucamp Way
                        </Text>
                        <Text>
                            Seattle, WA 98001
                        </Text>
                        <Text style={{marginBottom:10}}>
                            U.S.A.
                        </Text>
                        <Text>
                            Phone: 1-206-555-1444
                        </Text>
                        <Text>
                            campsities@nucamp.co
                        </Text>
                    
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default Contact
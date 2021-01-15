import React, {Component} from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animable from 'react-native-animatable';



// recieves stat as props and returns partner data

const mapStatetoProps = state => {
    return{
        partners: state.partners
    }
};

function Mission(){
    return(
        <Card title='Our Mission' wrapperStyle={{margin: 20}}>
            <Text>
                We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
            </Text>
        </Card>
    )
}

class About extends Component {
    
    static navigationOptions={
        title:"About"
    }

    render(){

        const renderPartner = ({item}) => {
            return(
                <ListItem 
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
                />

            )
        };

        if(this.props.partners.isLoading){
            return(
                <ScrollView>
                <Mission/>
                <Card title='Community Partners'>
                    <Loading/>
                </Card>
            </ScrollView>
            )
        }

        if(this.props.partners.errMess){
            return(
                <ScrollView>
                    <Animatable.View animate='fadeInDown' duration={2000} delay={2000}>                    
                        <Mission/>
                        <Card title='Community Partners'>
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>

            )
        }

        return(
            <ScrollView>
                <Animatable.View animate='fadeInDown' duration={2000} delay={2000}>   
                    <Mission/>
                    <Card title='Community Partners'>
                        <FlatList
                            // props has entire state
                            // props.partners refers entire state that handles partners including isLoading etc
                            // partners.partners gets partners array
                            data={this.props.partners.partners}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderPartner}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default connect(mapStatetoProps)(About);
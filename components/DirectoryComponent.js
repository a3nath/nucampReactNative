import React, {Component} from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {CAMPSITES} from '../shared/campsites';


class Directory extends Component {

    constructor(props){
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

    //static sets title on top

    static navigationOptions = {
        title: 'Directory'
    };

    render(){

        // React navigation automatically gives each screen navigation props
        
        //destructure to get navigate rpops from navigation

        const { navigate }= this.props.navigation;

        const renderDirectoryItem = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    //OnPress calls the navigate function
                    // navigate function args: screen to navigate, extra paramter
                    onPress = {() => {navigate('CampsiteInfo', {campsiteId: item.id})}}
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            );
        };

        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;
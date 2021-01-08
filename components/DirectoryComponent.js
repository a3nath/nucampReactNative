import React, {Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};


class Directory extends Component {

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
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    //OnPress calls the navigate function
                    // navigate function args: screen to navigate, extra paramter
                    onPress = {() => {navigate('CampsiteInfo', {campsiteId: item.id})}}
                    imageSrc={{uri: baseUrl + item.image}}
                />
            );
        };

        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);
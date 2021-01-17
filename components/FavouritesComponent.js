import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavourite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favourites: state.favourites
    };
};

const mapDispatchToProps = {
    deleteFavourite: campsiteId => deleteFavourite(campsiteId)
};

class Favourites extends Component {

    static navigationOptions = {
        title: 'My Favourites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavouriteItem = ({item}) => {
            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity
                             style={styles.deleteTouchable}
                             onPress={() => 
                                Alert.alert(
                                    'Delete Favourite?',
                                    `Are you you want to remove ${item.name} from favourites?`,
                                    [
                                        {
                                            text:'Cancel',
                                            onPress: () => console.log(item.name + 'Not Deleted'),
                                            style: 'cancel'
                                        },
                                        {
                                            text:'Okay',
                                            onPress: () => this.props.deleteFavourite(item.id)
                                        }
                                    ],
                                    {
                                        cancelable: false
                                    }
                                )}
                        >
                        <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                        />
                    </View>
                </SwipeRow>
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
            <Animatable.View animate='fadeInRightBig' duration={2000} delay={500}>  
                <FlatList
                    data={this.props.campsites.campsites.filter(
                        campsite => this.props.favourites.includes(campsite.id)
                    )}
                    renderItem={renderFavouriteItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Animatable.View>
        );
    }
}


const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);
import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favourites: state.favourites
    };
};

//to pass in post favourite
const mapDispatchToProps = {
    postFavourite: campsiteId => postFavourite(campsiteId)
}

function RenderCampsite(props){

    const {campsite} = props

    if(campsite){
        return(
            <Card
                featuredTitle={campsite.name}
                image ={{uri: baseUrl + campsite.image}}>
                     <Text style= {{margin:10}}>
                         {campsite.description}
                     </Text>
                <Icon
                    name={props.favourite? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    raised
                    onPress={
                        () => props.favourite ? "" : props.makeFavourite()    
                    }
                />
                </Card>
        )
    }
    return
        <View/>;
}

function RenderComments({comments}){

    const RenderCommentItem = ({item}) => {
        return(
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.text}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return(
        <Card title='Comments'>
            <FlatList
                data={comments}
                keyExtractor={item => item.id.toString()}
                renderItem={RenderCommentItem}/>
        </Card>
    )
}

class CampsiteInfo extends Component{

    makeFavourite(campsiteId) {
        this.props.postFavourite(campsiteId)
    }

    //title for screen
    static navigationOptions = {
        title: 'Campsite Information'
    }

    render(){
        // using the navigation props to extract the campsiteId that was passed in directory
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.props.campsites.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.campsiteId === campsiteId)
        return (
         <ScrollView>
             <RenderCampsite 
                campsite={campsite} 
                favourite={this.props.favourites.includes(campsiteId)}
                makeFavourite={() => this.makeFavourite(campsiteId)}         
             />
             <RenderComments comments={comments}/>
         </ScrollView>
        )
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
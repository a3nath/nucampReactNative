import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {CAMPSITES} from '../shared/campsites';
import {COMMENTS} from '../shared/comments';

function RenderCampsite(props){

    const {campsite} = props

    if(campsite){
        return(
            <Card
                featuredTitle={campsite.name}
                image = {require('./images/chrome-river.jpg')}>
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

    constructor(props){
        super(props);
        this.state = {
            campsites:CAMPSITES,
            comments: COMMENTS,
            favourite:false
        };
    }

    makeFavourite() {
        this.setState({favourite : true})
    }

    //title for screen
    static navigationOptions = {
        title: 'Campsite Information'
    }

    render(){
        // using the navigation props to extract the campsiteId that was passed in directory
        const campsiteId = this.props.navigation.getParam('campsiteId');
        const campsite = this.state.campsites.filter(campsite => campsite.id === campsiteId)[0];
        const comments = this.state.comments.filter(comment => comment.campsiteId === campsiteId)
        return (
         <ScrollView>
             <RenderCampsite 
                campsite={campsite} 
                favourite={this.state.favourite}
                makeFavourite={() => this.makeFavourite()}         
             />
             <RenderComments comments={comments}/>
         </ScrollView>
        )
    }

}

export default CampsiteInfo;
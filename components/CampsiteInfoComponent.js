import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView, Modal, Button, StyleSheet, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon, Rating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        favourites: state.favourites,
    };
};

//to pass in post favourite
const mapDispatchToProps = ({
    postFavourite: campsiteId => postFavourite(campsiteId),
    postComment: (campsiteId, rating, author, text) => postComment(campsiteId, rating, author, text)
})

function RenderCampsite(props){

    const {campsite} = props

    //connecting to the animation
    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -150) ? true : false;

    const recognizeComment = ({dx}) => (dx > 200) ? true : false; 

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            //chaining method end of animation
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + campsite.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.makeFavourite()
                        }
                    ],
                    { cancelable: false }
                );
            }
            if (recognizeComment(gestureState)) {
                props.showModal()
            }
            return true;
        }
    });

    const shareCampsite = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if(campsite){
        return(
            <Animatable.View
                animation='fadeInDown'
                duration={2000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={campsite.name}
                    image ={{uri: baseUrl + campsite.image}}>
                        <Text style= {{margin:10}}>
                            {campsite.description}
                        </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favourite? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            raised
                            onPress={
                                () => props.favourite ? "" : props.makeFavourite()    
                            }
                        />
                        <Icon
                            name='pencil'
                            type='font-awesome'
                            color='#5637DD'
                            reverse
                            raised
                            onPress={
                                () => props.showModal()
                            }
                        />
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='#5637DD'
                            raised
                            reverse
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)} 
                        />
                    </View>
                </Card>

            </Animatable.View>
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
                <Rating 
                    startingValue={item.Rating}
                    imageSize={10}
                    style={{alignItems:'flex-start', paddingVertical:'5%'}}
                    readonly={true}
                />
                <Text style={{fontSize: 12}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return(
        <Animatable.View animate='fadeInUp' duration={2000} delay={2000}>   
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    keyExtractor={item => item.id.toString()}
                    renderItem={RenderCommentItem}/>
            </Card>
        </Animatable.View>
    )
}

class CampsiteInfo extends Component{

    constructor(props){
        super(props);
        this.state={
            rating:5,
            author:"",
            text:"",
            showModal:false
        }
    }

    toggleModal(){
        this.setState({showModal:!this.state.showModal})
    }

    handleComment(campsiteId){
        postComment(campsiteId, this.state.rating, this.state.author, this.state.text)
        this.toggleModal()
    }

    resetForm(){
        this.setState({
            rating:5,
            author:"",
            text:"",
            showModal:false
        })
    }


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
             <Animatable.View animate='fadeInDown' duration={2000} delay={2000}>   
                    <RenderCampsite 
                        campsite={campsite} 
                        favourite={this.props.favourites.includes(campsiteId)}
                        makeFavourite={() => this.makeFavourite(campsiteId)}
                        showModal={() => this.toggleModal()}
                    />
                    <RenderComments comments={comments}/>
                <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}        
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={this.state.rating}
                        imageSize={40}
                        onFinishRating={rating => this.setState({rating: rating})}
                        style={{paddingVertical:10}}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={type='font-awesome', name='user-o'}
                        leftIconContainerStyle={{paddingRight:10}}
                        onChangeText={(author) => this.setState({author:author})}
                        value={this.state.author}
                    
                    />
                    <Input
                        placeholder='Comment'
                        leftIcon={type='font-awesome', name='comment-o'}
                        leftIconContainerStyle={{paddingRight:10}}
                        onChangeText={comment => this.setState({text:comment})}
                        value={this.state.text}
                    />
                    <View>
                        <Button
                            title='Submit'
                            color='#5637DD'
                            onPress={() => {
                                this.handleComment(campsiteId)
                                this.resetForm()
                            }}
                        />
                    </View>
                    <View style={{margin:10}}>
                        <Button
                            color='#808080'
                            title='Cancel'
                            onPress={() => {
                                this.resetForm()
                                this.toggleModal()
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </Animatable.View>
         </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    cardRow:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        flexDirection:'row',
        margin:20
    },
    modal:{
        justifyContent:'center',
        margin:20
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
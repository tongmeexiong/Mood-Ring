import React, { Component } from 'react';
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



class TagSection extends Component {

// Send GET request to SAGA to hold Tags Name and Image Id in a Reducer. 
    componentDidMount (){
        this.props.dispatch({ type: 'FETCH_TAGS_IMAGES'})
    }

// Local State to hold ID and proped Image Id from Images component to send as a payload. 
    state = {
        images_id: this.props.imageItem.id,
        tags_id: 0
    }

// Select Change to change the states for payload send to SAGA. This will tell us the Tag ID. 
    handleTagChange = (event) => {
        this.setState({
            tags_id: event.target.value,
            images_id: this.props.imageItem.id

        })
        console.log('TAG ID', event.target.value);

    }

// Send Image ID and Tag Name to SAGA for Post request. 
    applyButtonHandler = () => {
        this.props.dispatch({ type: 'POST_TAGS_IMAGES', payload: this.state})
    }


    render() {
        console.log('TAGS of state', this.state.tags_id);
        console.log('IMAGES_ID', this.state.images_id);

        return (
            <div>
     {/* This Select will hold our tags name and tags id. More or so to capture the ID and setState from handleTagChange Function */}
                <Select value={this.state.tags_id} onChange={this.handleTagChange}>
                    {this.props.tags.map(tagItem => {
                        return (
                            <MenuItem key={tagItem.id} value={tagItem.id}>{tagItem.name}</MenuItem>
                        )
                    })}
                </Select>
                    {/*  Button to fire off POST request */}
                <button onClick={this.applyButtonHandler}>APPLY</button>
                {/* Conditional to only show images that are stored in the local state  */}
                <ul>
                    {this.props.tagsWithImage.map((tagImageItem, i) => {
                        if (tagImageItem.images_id === this.state.images_id){
                        return (
                            <p key={i}>{tagImageItem.name}</p>
                        )
                        } return console.log('');
                    })}
                </ul>
            </div>

        )
    }
}

/// Obtain information from Redux 
const mapToRedux = (reduxState) => {
    return {
        tags: reduxState.tagsReducer,
        tagsWithImage: reduxState.postReducer
    }
}

export default connect(mapToRedux)(TagSection)
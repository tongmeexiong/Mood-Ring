import React, { Component } from 'react';
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


class TagSection extends Component {

    componentDidMount (){
        this.props.dispatch({ type: 'FETCH_TAGS_IMAGES'})
    }

    state = {
        images_id: this.props.imageItem.id,
        tags_id: 0
    }

    handleTagChange = (event) => {
        this.setState({
            tags_id: event.target.value,
            images_id: this.props.imageItem.id

        })
        console.log('TAG ID', event.target.value);

    }


    applyButtonHandler = () => {
        this.props.dispatch({ type: 'POST_TAGS_IMAGES', payload: this.state})
        // this.props.dispatch({ type: 'FETCH_TAGS_IMAGES', payload: this.state })
    }


    render() {

        console.log('TAGSSSS of state', this.state.tags_id);
        console.log('IMAGES_ID', this.state.images_id);



        return (
            <div>
                <Select value={this.state.tags_id} onChange={this.handleTagChange}>
                    <MenuItem>APPLY TAGS!</MenuItem>
                    {this.props.tags.map(tagItem => {
                        return (
                            <MenuItem key={tagItem.id} value={tagItem.id}>{tagItem.name}</MenuItem>
                        )
                    })}
                </Select>



                <button onClick={this.applyButtonHandler}>APPLY</button>
                <ul>
                    {this.props.tagsWithImage.map(tagImageItem => {
                        if (tagImageItem.images_id === this.state.images_id){
                        return (
                            <li key={tagImageItem.images_id}>{tagImageItem.name}</li>
                        )
                        } return console.log('');
                    })}
                </ul>
            </div>

        )
    }
}

const mapToRedux = (reduxState) => {
    return {
        tags: reduxState.tagsReducer,
        tagsWithImage: reduxState.postReducer
    }
}

export default connect(mapToRedux)(TagSection)
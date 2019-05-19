import React, { Component } from 'react';
import { connect } from 'react-redux'

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
                <select value={this.state.tags_id} onChange={this.handleTagChange}>
                    <option>APPLY TAGS!</option>
                    {this.props.tags.map(tagItem => {
                        return (
                            <option value={tagItem.id}>{tagItem.name}</option>
                        )
                    })}
                </select>
                <button onClick={this.applyButtonHandler}>APPLY</button>
                <ul>
                    {this.props.tagsWithImage.map(tagImageItem => {
                        if (tagImageItem.id === this.state.images_id){
                        return (
                            <li>{tagImageItem.name}</li>
                        )
                        } 
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
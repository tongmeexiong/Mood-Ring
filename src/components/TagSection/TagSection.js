import React, { Component } from 'react';
import { connect } from 'react-redux'

class TagSection extends Component {

    state ={
        images_id: 0,
        tags_id: 0, 
    }

    handleTagChange =(event) => {
            this.setState({
                tags_id: event.target.value
            })
    console.log('TAG ID', event.target.value);
            
    }

    render(){
        return (
            <select value={this.state.owner_id} onChange={this.handleTagChange}>
            <option>APPLY TAGS!</option>
                {this.props.tags.map(tagItem=>{
                    return(
                    <option value={tagItem.id}>{tagItem.name}</option>
                    )
                })}
            </select>
        )
    }
}

const mapToRedux = (reduxState)=>{
    return{
        tags: reduxState.tagsReducer
    }
}

export default connect(mapToRedux)(TagSection)
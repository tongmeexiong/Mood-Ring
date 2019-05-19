import React, { Component } from 'react';
import { connect } from 'react-redux'

class TagSection extends Component {

    state = {
        images_id: 0,
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
        // console.log('Clicked APPLY', id);
        // this.setState({
        //     images_id: this.props.imageItem.id
        // })

        this.props.dispatch({ type: 'POST_TAGS_IMAGES', payload: this.state})
        
    }


    render() {

        console.log('TAGSSSS of state', this.state.tags_id);
        console.log('STATE>>>???', this.state);



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

                {/* {this.props.tags.map(tagItem => {
                    return (
                        <button onClick={this.applyButtonHandler(tagItem.id)}>APPLY</button>
                    )
                })} */}
                <ul>
                    {this.props.tags.map(tagItem => {
                        if (tagItem.id == this.state.tags_id){
                        return (
                            <p>{tagItem.name}</p>
                        )
                        } 
                        // else {
                        //     return <p>{tagItem.name}</p>
                        // }
                    })}
                </ul>
            </div>

        )
    }
}

const mapToRedux = (reduxState) => {
    return {
        tags: reduxState.tagsReducer
    }
}

export default connect(mapToRedux)(TagSection)
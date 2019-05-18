import React, { Component } from 'react';
import { connect } from 'react-redux'

class TagSection extends Component {

    state = {
        images_id: 0,
        tags_id: 0,
    }

    handleTagChange = (event) => {
        this.setState({
            tags_id: event.target.value
        })
        console.log('TAG ID', event.target.value);

    }


    applyButtonHandler = (id) => {
        console.log('Clicked APPLY', id);


    }


    render() {

        console.log('TAGSSSS', this.state.tags_id);


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
                {/* {this.props.tags.map(tagItem => {
                    return (
                        <button onClick={this.applyButtonHandler(tagItem.id)}>APPLY</button>
                    )
                })} */}
                <ul>
                    {this.props.tags.map(tagItem => {
                        // if (tagItem.id === this.state.tags_id)
                        return (
                            
                            <p>{tagItem.name}</p>

                        )
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
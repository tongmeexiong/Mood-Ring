import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagSection from '../TagSection/TagSection'
import Button from '@material-ui/core/Button';


class ImageDisplay extends Component {

        //  This state will help change the image display
    state = {
        currentIndex: 1
    }

    // If state is equal of less than one change state to 1 or else subtract 1. 
    goToPrevSlide = () => {
        if (this.state.currentIndex <= 1) {
            return this.setState({
                currentIndex: 1
            },
            )
        }
        else {
            return this.setState({
                currentIndex: this.state.currentIndex - 1,

            },
            )
        }
    }

    // If state is greater or equal to the length of our array of images, return 1 else plus 1. Array of images comes from redux. 
    goToNextSlide = () => {

        if (this.state.currentIndex >= this.props.images.length) {
            return this.setState({
                currentIndex: 1,
            },
            )
        }
        else {
            return this.setState({
                currentIndex: this.state.currentIndex + 1,
            },
            )
        }
    }

    render() {
        console.log('STATE', this.state.currentIndex);

        return (
            <div>
                <ul>
                    {/* Conditional to only show the images that equals the id number we have in the state */}
                    {this.props.images.map(imageItem => {
                        if (imageItem.id === this.state.currentIndex) {
                            return (
                                //  Buttons will fire off functions to increment or decrement state. 
                                <p key={imageItem.id}>
                                    <img src={imageItem.path} height="350px" width="350px" alt="moods" />
                                    <div>
                                    <Button onClick={this.goToPrevSlide} variant="contained" color="secondary" >Previous</Button>
                                    <Button onClick={this.goToNextSlide} variant="contained" color="primary">Next</Button>
                                    </div>
                                    {/* Tags are prop over here from the different component */}
                                    <p> How do you feel about this image?</p>
                                    <TagSection imageItem={imageItem} /> 
                                </p>
                            )
                        }
                        return console.log('');
                    })}
                </ul>
            </div>
        )
    }
}

// Map to redux 
const mapToRedux = (reduxState) => {
    return {
        images: reduxState.imagesReducer
    }
}

export default connect(mapToRedux)(ImageDisplay)
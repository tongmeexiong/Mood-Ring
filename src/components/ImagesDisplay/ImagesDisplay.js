import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagSection from '../TagSection/TagSection'

class ImageDisplay extends Component {

    state = {
        images_id: 0,
        currentIndex: 1
    }



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
                    {/* {this.props.images} */}
                    {this.props.images.map(imageItem => {
                        if (imageItem.id === this.state.currentIndex) {
                            return (
                                <li key={imageItem.id}><button onClick={this.goToPrevSlide}>Previous</button>
                                    <img src={imageItem.path} height="300px" width="300px" alt="moods" />
                                    <button onClick={this.goToNextSlide}>Next</button>
                                    <TagSection imageItem={imageItem} />
                                </li>
                            )
                        }
                        return console.log('');
                    })}
                </ul>
            </div>
        )
    }
}


const mapToRedux = (reduxState) => {
    return {
        images: reduxState.imagesReducer
    }
}

export default connect(mapToRedux)(ImageDisplay)
import React, { Component } from 'react';
import { connect } from 'react-redux'

class ImageDisplay extends Component {

    state = {
        // images: this.props.images.path,
        images_id: 0,
        currentIndex: 1
    }



    goToPrevSlide = () => {
        if (this.state.currentIndex <= this.props.images.length - 1) {
            return this.setState({
                currentIndex: 1,
            })
        }
        else {
            return this.setState({
                currentIndex: this.state.currentIndex - 1,
            })
        }
    }
    


    goToNextSlide = () => {
        // this.setState ({
        //     currentIndex: this.state.currentIndex + 1
        // })

        if (this.state.currentIndex >= this.props.images.length) {
            return this.setState({
                currentIndex: 1,
            })
        }
        else {
            return this.setState({
                currentIndex: this.state.currentIndex + 1,
            })
        }
    }
    // if (this.state.currentIndex === this.props.images.length - 1) {
    //     return this.setState({
    //         currentIndex: 0,
    //     })
    // }

    // // This will not run if we met the if condition above
    // this.setState(prevState => ({
    //     currentIndex: prevState.currentIndex + 1,
    // }));






    // selectById = (id) => {
    //     this.setState({
    //         images_id: id
    //     })
    //     this.props.dispatch({ type: 'SELECT_BY_ID', payload: this.props.images })


    // }




    render() {
        console.log('STATE', this.state.currentIndex);


        return (
            <div>
                <ul>
                    {/* {this.props.images} */}
                    {this.props.images.map(imageItem => {
                        if (imageItem.id === this.state.currentIndex) {
                            return (
                                <li><button onClick={this.goToPrevSlide}>Previous</button>
                                    <img src={imageItem.path} height="300px" width="300px" />
                                    <button onClick={this.goToNextSlide}>Next</button></li>
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
        images: reduxState.imagesReducer
    }
}

export default connect(mapToRedux)(ImageDisplay)
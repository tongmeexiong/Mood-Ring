import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'


// Redux Saga for GET and POST requests.
function* rootSaga() {
    yield takeEvery('FETCH_IMAGES', fetchImages)
    yield takeEvery('FETCH_TAGS', fetchTags)
    yield takeEvery('POST_TAGS_IMAGES', postTagsImages)
    yield takeEvery('FETCH_TAGS_IMAGES', fetchTagsImages)
}


//SAGA for IMAGES
function* fetchImages() {
    try {
        let fetchImagesResponse = yield axios.get('/api/images')
        yield put({ type: 'SET_IMAGES', payload: fetchImagesResponse.data })
    } catch (err) {
        console.log('Error in fetchImages', err);
    }
}

//SAGA for TAGS
function* fetchTags() {
    try {
        let fetchTagResponse = yield axios.get('/api/tags')
        yield put({ type: 'SET_TAGS', payload: fetchTagResponse.data })
    } catch (err) {
        console.log('Error in fetchTags', err);
    }
}

// SAGA to send Image/TAG IDs to Database
function* postTagsImages(action) {
    try {
        yield axios.post('/api/images/addtag', action.payload)
        console.log('POST TAGS IMAGES', action.payload);

        yield put({ type: 'FETCH_TAGS_IMAGES' })
    } catch (err) {
        console.log('Error in postTagsImages', err);
    }
}

// SAGA to GET Tags and Name in Junction Table 
function* fetchTagsImages(action) {
    try {
        let fetchTagsImagesResponse = yield axios.get('/api/imagestags')
        yield put({ type: 'SET_IMAGES_TAGS', payload: fetchTagsImagesResponse.data })
    } catch (err) {
        console.log('Error in postTagsImages', err);
    }
}




// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Used to store images returned from the server
const imagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.)
const tagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TAGS':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the images tags (e.g. 'Inspirational', 'Calming', 'Energy', etc.) & Image id. 
const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES_TAGS':
            return action.payload;
        default:
            return state;
    }
}



// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        imagesReducer,
        tagsReducer,
        postReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();

import {fromJS} from 'immutable';
import * as constants from './constants';

const defaultState=fromJS({
    title: '',
    contents: ''
});

export default (state=defaultState, action)=>{

    switch(action.type){   
        case constants.CHANGE_DETAIL:
            return state.merge({
                title: action.title,
                contents: action.content
            })
        default:
            return state;
    }

}
import {fromJS} from 'immutable';
import * as constants from './constants';

const defaultState=fromJS({
    topicList:[],
    articalList:[],
    recommandList:[],
    articlePage:1,
    showScroll:false,
});

export default (state=defaultState, action)=>{

    const changeHomeData = (state, action)=>{
        return state.merge({
            topicList:fromJS(action.topicList),
            articalList:fromJS(action.articalList),
            recommandList:fromJS(action.recommandList),
        }); 
    }

    const addArticleList = (state, action)=>{
        return state.merge({
            'articalList':state.get('articalList').concat(action.list),
            'articlePage':action.nextPage
        });
    }

    switch(action.type){   
        case constants.CHANGE_HOME_DATA:
            return changeHomeData(state, action);

        case constants.ADD_ARTICLE_LIST:
            return addArticleList(state, action);

        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll',action.show);
        default:
            return state;
    }

}
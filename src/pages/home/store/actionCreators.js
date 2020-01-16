import axios from 'axios';
import * as constants from './constants';
import {fromJS} from 'immutable';

const  changeHomeData=(result)=>({
    type: constants.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articalList: result.articalList,
    recommandList:result.recommandList
})

const addHomeList=(list, nextPage)=>({
    type:constants.ADD_ARTICLE_LIST,
    list:fromJS(list),
    nextPage:nextPage
})

export const getHomeInfo = ()=>{
    return (dispatch)=>{
        axios.get('/api/home.json').then((res)=>{
            const result=res.data.data;
            dispatch(changeHomeData(result));
        })
    }
}

export const getMoreList = (page)=>{
    return (dispatch)=>{
        axios.get('/api/homeList.json?page='+page).then((res)=>{
            const result=res.data.data;
//            console.log(result);
            dispatch(addHomeList(result, page + 1));
//            dispatch(changeHomeData(result));
        })
    }
}

export const toggleTopShow = (show) =>({
    type: constants.TOGGLE_SCROLL_TOP,
    show:show
})
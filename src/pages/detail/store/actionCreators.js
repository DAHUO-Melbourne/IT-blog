import axios from 'axios'
import * as constants from './constants';

const changeDetail = (title, content) => ({
    type: constants.CHANGE_DETAIL,
    title: title,
    content: content,
})

export const getDetail = (id) =>{
    return (dispatch)=>{
        axios.get('/api/detail.json?id=' + id).then((res)=>{
            const result=res.data.data;
            dispatch(changeDetail(result.title, result.content));
        }).catch()
    }
    //在这里利用id确认result中的第id项目，然后只传对应id的项的title和content即可。利用id对result进行筛选，可以先打印出result的内容
}
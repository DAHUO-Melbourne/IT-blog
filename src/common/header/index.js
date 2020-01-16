import React, {Component} from 'react';
import { connect }from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import {actionCreators} from './store';
import { Link } from 'react-router-dom'
import {actionCreators as loginActionCreators} from '../../pages/login/store'

import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList
} from './style';
import { stat } from 'fs';


class Header extends Component {

    getListArea =(show)=>{
        const {focused, list, page, totalPage, handleMouseEnter, mouseIn, handleMouseLeave, handleChangePage}=this.props;
        const newList=list.toJS();
        const pageList=[];
        
        if(newList.length){
            for(let i=((page-1)*10); i<page*10;i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        
        if(focused || mouseIn){
            return(
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick={()=>handleChangePage(page, totalPage, this.spinIcon)}>
                    <span ref={(icon)=>{this.spinIcon=icon}}className='iconfont spin'>&#xe851;</span>换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                <SearchInfoList>
                    {pageList}
                </SearchInfoList>
            </SearchInfo>
            )
        }
        else
            return null;
    }


    render(){
        const {focused, handleInputFocus, handleInputBlur, list, login, logout}=this.props
        return(
            <HeaderWrapper>
                <Link to='/'>
                <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    {
                        login ? 
                            <NavItem onClick={logout} className='right'>退出</NavItem> : 
                            <Link to={'/login'}><NavItem className='right'>登录</NavItem></Link>
                    }
                    <NavItem className='right'>
                        <span className='iconfont'>&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                    <CSSTransition
                        in={focused}
                        timeout={200}
                        classNames="slide">
                    <NavSearch 
                        className={focused? 'focused': ''}
                        onFocus={()=>{handleInputFocus(list)}}
                        onBlur={handleInputBlur}>
                    </NavSearch>
                    </CSSTransition>
                    <span className={focused? 'focused iconfont zoom': 'iconfont zoom'}>&#xe6cf;</span>
                        {this.getListArea(focused)}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                    <Button className='writing'>
                        <span className='iconfont'>&#xe615;</span>
                            写文章
                    </Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}


const mapStateToProps = (state)=>{
    return {
//        focused:state.get('header').get('focused')
        focused:state.getIn(['header','focused']),
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        mouseIn:state.getIn(['header','mouseIn']),
        totalPage:state.getIn(['header','totalPage']),
        login:state.getIn(['login','login'])
    }
    //用了connect方法，那么实际上是将组件与store相连。而一个程序只能有一个store，就是写在外面的store的index中。在这个index中有header和login不同的reducer，所以可以做到跨组件取数据
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleInputFocus(list){
            (list.size===0)&&dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },

        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin){
            let originAngle=spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle){
                originAngle=parseInt(originAngle, 10);
            }
            else{
                   originAngle=0;
            }
//            console.log(originAngle);
            
            spin.style.transform='rotate(' + (originAngle+360) + 'deg)';
//            console.log(spin.style.transform)
//            console.log(page,totalPage);
//            dispatch(actionCreators.changePage());
            if(page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else{
            dispatch(actionCreators.changePage(1));
            }
        },
        logout() {
            dispatch(loginActionCreators.logout())
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
import React,{ Component, PureComponent } from 'react';
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { HomeWrapper,
         HomeLeft,
         HomeRight
         } from './style'
import { connect } from'react-redux'
import { actionCreators } from './store';
import { BackTop } from './style';


class Home extends PureComponent {


    handleScrollTop(){
        window.scrollTo(0,0);
    }

    render(){
        return <HomeWrapper>
                <HomeLeft>
                    <img alt='' className='banner-img' src="https://upload.jianshu.io/admin_banners/web_images/4749/cfec798629943d9d9db6876b2cb20fddf29b7efe.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
                    <Topic />
                    <List />

                </HomeLeft>
                <HomeRight>                    
                    <Recommend />
                    <Writer />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop>:null}
                
               </HomeWrapper>
    }


    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    componentDidMount(){
        this.props.changeHomeData();
        this.bindEvents();
    }

    bindEvents(){
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
}

const mapState =(state)=>({
    showScroll: state.getIn(['home','showScroll']),
});

const mapDispatch =(dispatch)=>({
    changeHomeData(){
        const action=actionCreators.getHomeInfo();
        dispatch(action);
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop>100){
            dispatch(actionCreators.toggleTopShow(true));
        }else{
            dispatch(actionCreators.toggleTopShow(false));
        }
//        console.log(document.documentElement.scrollTop);
    }
});


export default connect(mapState,mapDispatch)(Home);
import React, { Component, PureComponent } from 'react';
import { RecommendWrapper, RecommendItem } from '../style'
import { connect } from 'react-redux';
import { stat } from 'fs';
class Recommend extends PureComponent {
    render(){
        
        return <RecommendWrapper>
                {
                    this.props.list.map((item)=>{
                        return (
                            <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}/>
                        )
                    })
                }
                </RecommendWrapper>
    }
}

const mapState=(state)=>({
    list:state.getIn(['home','recommandList'])
})
export default connect(mapState, null)(Recommend);
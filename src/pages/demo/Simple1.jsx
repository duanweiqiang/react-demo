import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import styles from './index.less';

class Simple1 extends Component {
    constructor() {
      super();
      this.state = {
        dataList:[
          {
            name: 'name1',
            id: '1'
          },{
            name: 'name2',
            id: '2'
          },{
            name: 'name3',
            id: '3'
          },{
            name: 'name4',
            id: '4'
          },{
            name: 'name5',
            id: '5'
          }
        ],
        dragCount:{}
      }
    }
    onDragStart = (e) => {
      console.log(e,'onDragStart')
    }
    onDrop = (e)=>{
      console.log(e,'onDrop')
      const { dataList, dragCount } = this.state;
      const { removedIndex, addedIndex, payload } = e; 
      if (removedIndex === null && addedIndex === null) return dataList; 
      const result = [...dataList]; 
      let itemToAdd = payload; 
      if (removedIndex !== null) { 
        itemToAdd = result.splice(removedIndex, 1)[0]; 
      } 
      if (addedIndex !== null) { 
        result.splice(addedIndex, 0, itemToAdd); 
      } 
      const dragItemCount = dragCount?.[itemToAdd.id] || 0
      dragCount[itemToAdd.id] = dragItemCount+1;
      this.setState({ dataList: result, dragCount });
    }
    onDragEnd = (e) => {
      console.log(e,'onDragEnd')
    }
    onDropReady = (e) => {
      console.log(e,'onDropReady')
    }
    getChildPayload = (index) => {
      const { dataList } = this.state;
      // console.log(index);
      return dataList[index];
    }
    render() {
      const { dataList,dragCount } = this.state;
        return <div style={{ width:522, marginLeft:100 }}>
          <Container 
            groupName='group1'
            lockAxis='y'

            onDragStart={this.onDragStart}
            onDropReady={this.onDropReady}
            onDragEnd={this.onDragEnd}
            onDrop={this.onDrop} 

            dragClass={styles.card_ghost}
            dropClass={styles.card_drop}
            dropPlaceholder={{
              animationDuration: 150, //动画延时
              showOnTop: false, //暂时还不知道作用
              className: styles.card_drop_preview, //占位元素样式
            }}

            getChildPayload={this.getChildPayload}
          > 
          {dataList.map(item=>{
            return <Draggable key={item.id}> 
              <div className={styles.item}>{item.name} 拖动次数：({dragCount[item.id] || 0})</div> 
            </Draggable> 
          })}
          </Container>
        </div>
    }
}
export default Simple1;

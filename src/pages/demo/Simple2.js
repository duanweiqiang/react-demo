import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import styles from './index.less';

class Simple2 extends Component {
    constructor() {
      super();
      this.state = {
        dataList:[
          {
            name: 'group-1-1',
            id: '1-1'
          },{
            name: 'group-1-2',
            id: '1-2'
          },{
            name: 'group-1-3',
            id: '1-3'
          },{
            name: 'group-1-4',
            id: '1-4'
          },{
            name: 'group-1-5',
            id: '1-5'
          }
        ],
        dropList:[
            {
                name: 'group-2-1',
                id: '2-1'
              },{
                name: 'group-2-2',
                id: '2-2'
              },{
                name: 'group-2-3',
                id: '2-3'
              },{
                name: 'group-2-4',
                id: '2-4'
              },{
                name: 'group-2-5',
                id: '2-5'
              }
        ]
      }
    }
    onDragStart = (e) => {
    //   console.log(e,'onDragStart')
    }
    onDrop = (e,arr)=>{
        const { dataList, dragCount } = this.state;
        const { removedIndex, addedIndex, payload } = e; 
        if (removedIndex === null && addedIndex === null) return arr; 
        console.log(e,'onDrop')
        const result = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }

        return result;
    }
    onDragEnd = (e) => {
    //   console.log(e,'onDragEnd')
    }
    onDropReady = (e) => {
    //   console.log(e,'onDropReady')
    }
    getChildPayload = (index,dataList) => {
      return dataList[index];
    }
    render() {
      const { dataList,dropList } = this.state;
        return <div style={{display:'flex' }}>
        
            <div style={{ width:522, marginLeft:100 }}style={{ width:522, marginLeft:100 }}>
                <Container 
                    groupName='group2'
                    // behaviour='copy'
                    onDragStart={this.onDragStart}
                    onDropReady={this.onDropReady}
                    onDragEnd={this.onDragEnd}
                    onDrop={e => this.setState({dataList: this.onDrop(e,dataList)})} 

                    dragClass={styles.card_ghost}
                    dropClass={styles.card_drop}
                    dropPlaceholder={{
                    animationDuration: 150, //动画延时
                    showOnTop: false, //暂时还不知道作用
                    className: styles.card_drop_preview, //占位元素样式
                    }}

                    getChildPayload={e => this.getChildPayload(e,dataList)}
                > 
                {dataList.map(item=>{
                    return <Draggable key={item.id}> 
                    <div className={styles.item}>{item.name}</div> 
                    </Draggable> 
                })}
                </Container>
            </div>
            <div style={{ width:522, marginLeft:100 }}style={{ width:522, marginLeft:100 }}>
                <Container 
                    groupName='group2'

                    onDragStart={this.onDragStart}
                    onDropReady={this.onDropReady}
                    onDragEnd={this.onDragEnd}
                    onDrop={e => this.setState({dropList:this.onDrop(e,dropList)})} 

                    dragClass={styles.card_ghost}
                    dropClass={styles.card_drop}
                    dropPlaceholder={{
                    animationDuration: 150, //动画延时
                    showOnTop: false, //暂时还不知道作用
                    className: styles.card_drop_preview, //占位元素样式
                    }}

                    getChildPayload={e => this.getChildPayload(e,dropList)}
                > 
                {dropList.map(item=>{
                    return <Draggable key={item.id}> 
                    <div className={styles.item}>{item.name}</div> 
                    </Draggable> 
                })}
                </Container>
            </div>
        </div>
    }
}
export default Simple2;

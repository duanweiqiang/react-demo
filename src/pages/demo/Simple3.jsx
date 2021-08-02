import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import styles from './index.less';

class Simple3 extends Component {
    constructor() {
      super();
      this.state = {
        dataList:[
          {
            name: 'name1',
            id: '1',
            childList:[]
          },{
            name: 'name2',
            id: '2',
            childList:[
                {
                    name: 'name2-1',
                    id: '2-1'
                },{
                    name: 'name2-2',
                    id: '2-2'
                },{
                    name: 'name2-3',
                    id: '2-3'
                }
            ]
          },{
            name: 'name3',
            id: '3',
            childList:[]
          },{
            name: 'name4',
            id: '4',
            childList:[]
          },{
            name: 'name5',
            id: '5',
            childList:[]
          }
        ],
      }
    }
    onDragStart = (e) => {
    //   console.log(e,'onDragStart')
    }
    onDrop = (e,dataList)=>{
    //   console.log(e,'onDrop')
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
      return result;
    }
    onDragEnd = (e) => {
    //   console.log(e,'onDragEnd')
    }
    onDropReady = (e) => {
    //   console.log(e,'onDropReady')
    }
    onDropGroup = (e,i) => {
        const { dataList } = this.state;
        console.log(e,i)
        const list = dataList[i].childList;
        const newList = this.onDrop(e,list);
        dataList[i].childList = newList;
        this.setState({dataList});
    }
    getChildPayload = (index) => {
      const { dataList } = this.state;
      // console.log(index);
      return dataList[index];
    }
    render() {
      const { dataList } = this.state;
        return <div style={{ width:522, marginLeft:100 }}>
          <Container 
            groupName='group3'
            // lockAxis='y'

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

            getChildPayload={this.getChildPayload}
          > 
          {dataList.map((item,index)=>{
            return <Draggable key={item.id}> 
            <div>
                <div className={styles.item}>{item.name}</div> 
                {!!item?.childList?.length && (<div>
                    <Container 
                        groupName='group3'
                        // lockAxis='y'

                        dragClass={styles.card_ghost}
                        onDrop={e => this.onDropGroup(e,index)}
                        getChildPayload={i=> item.childList[i]}
                        getGhostParent={()=>{return document.body}}
                    >
                        {item.childList.map(groupItem=>{
                            return <Draggable key={groupItem.id}>
                                <div className={styles.groupItem}>{groupItem.name}</div>
                            </Draggable>
                        })}
                    </Container>
                </div>)}
            </div>
            </Draggable> 
          })}
          </Container>
        </div>
    }
}
export default Simple3;

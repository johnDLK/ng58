import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity 
} from 'react-native'
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#666',
    marginLeft:15,
    marginRight:15,
  },
  itemStyle: {
    // 主轴方向
    flexDirection: 'column',
    justifyContent: 'space-between',
    // 下边框
    borderBottomWidth: 0,
    marginLeft:15,
    marginTop:10,
    marginRight:15,
  },

  imageStyle: {
    // 尺寸
    width: 60,
    height: 60,
    // 边距
    margin: 10
  },

  subItemStyle: {
    // 对齐方式
    justifyContent: 'space-around'
  }
});
const listDataSource = new ListView.DataSource({
  getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
  getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

export default class extends Component {

  // static propTypes = {
  //   data: PropTypes.any,
  //   needSeparator: PropTypes.bool,
  //   renderEmptyView: PropTypes.func
  // };

  static defaultProps = {
    needSeparator: true
  }

  constructor(props) {
    super(props)
    this.length = 0
    this.state = {
      dataSource: this.cloneWithData(listDataSource, props.data)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: this.cloneWithData(this.state.dataSource, nextProps.data)
      })
    }
  }

  render() {
    const { renderEmptyView,clearFunc } = this.props;
    return (
      this.length>0  && this.state.dataSource ?
       <View>
          <ListView
           {...this.props}
          ref='listview'
          initialListSize={10}
          pageSize={10}
          removeClippedSubviews={false}
          renderSeparator={this.renderSeparator}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        {/* <View style={{flex:1,
         alignItems: 'center',
         justifyContent: 'center',}}> */}
          <TouchableOpacity style={{
            width: 200 ,
            height: 40,
            marginTop: 10,
            borderRadius: 4,
            backgroundColor:'#6A6AD5',
              alignItems: 'center',
         justifyContent: 'center'
            }} onPress={()=>clearFunc.apply(this)} title="Clear" >
               <Text style={{color: 'white'}}>Clear</Text>
            </TouchableOpacity>
        {/* </View> */}
        
       </View>
       
        : (renderEmptyView ? renderEmptyView() : null)
    )
  }


  cloneWithData(dataSource, data) {
    if(!dataSource){
      dataSource = listDataSource;
    }
   
    if (!data) {
       this.length = 0;
     
          return dataSource.cloneWithRows([])
    }
    if (Array.isArray(data)) {
      this.length = data.length
      return dataSource.cloneWithRows(data)
    }
    this.length = 0
    for (let day in data) {
      this.length += data[day].length
    }
    return dataSource.cloneWithRowsAndSections(data)
  }
  renderRow = (rowData) => {
    return (
      <View style={styles.itemStyle}>
       {/* <View style={{width:20}}>
          <Text style={{ marginTop: 5, marginBottom: 5,fontSize: 18 , color: '#6A6AD5'}}>O</Text>
       </View> */}
        <View style={{ justifyContent: 'space-around'}}>
          {/*  */}
          <Text style={{ marginTop: 5, marginBottom: 5,fontSize: 18 , color: '#000'}}>{rowData.word_name}</Text>
          <Text style={{ marginBottom: 5, fontSize: 13, color: '#666' }}>{rowData.word}</Text>
        </View>
      </View>
    );
  }
  
  renderSeparator = (sectionID, rowID) =>{
    return this.props.needSeparator && <View key={`${sectionID}vs${rowID}`} style={styles.separator} />
  }
    

}


import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput
} from 'react-native';
// import { Card, Button } from 'react-native-material-design';
var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#eee'
  },
  itemStyle: {
    // 主轴方向
    flexDirection: 'row',
    // 下边框
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },

  imageStyle: {
    // 尺寸
    width: 60,
    height: 60,
    // 边距
    marginLeft: 10,
    margin: 10
  },

  subItemStyle: {
    // 对齐方式
    justifyContent: 'space-around'
  },
  stretch: {
    width: 50,
    height: 200
  }
});


const dataSource = new ListView.DataSource({
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
    needSeparator: true,
    loading: false
  }

  constructor(props) {
    super(props)
    this.length = 0
    this.state = {
      dataSource: this.cloneWithData(dataSource, props.data),
      result: props.result
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource:nextProps.data? JSON.stringify(nextProps.data):null
      })
    }
    if (this.props.result !== nextProps.result) {
      this.setState({
        result:nextProps.result? JSON.stringify(nextProps.result):null
      })
    }
  }

  render() {
    const { renderEmptyView ,clearFunc} = this.props;
     let result = null;

     if(typeof this.state.result === 'string'){
   
      result =this.state.result.replace(/"/g,' ')
     }
     console.log( result)
    // const result = 'Loading...'
    return (
      this.state.dataSource ?
      
        <View style={{margin:15,backgroundColor:'#FFF'}}>
          <Image resizeMode="center"
          style={{height:300, left: 0, right: 0,margin:10}}
          source={{uri: 'data:image/png;base64,'+ this.state.dataSource}}
          />
          <View  tyle={{marginTop:20,marginBottom:20}}>
           {/* <Text  style={{  textAlign: 'center',fontSize: 14,lineHeight: 22,}}>{result}</Text> */}
           <TextInput style={{  textAlign: 'center',fontSize: 14,lineHeight: 22,}} value={result}   editable = {false}/>
          </View>
              
          <Button style={{width: 200 ,marginTop:10,marginBottom:50}} onPress={()=>clearFunc.apply(this)}title="Clear" />

        </View>
        : (renderEmptyView ? renderEmptyView() : null)
    )
  }

  cloneWithData(dataSource, data) {
    if (!data) {
      return
    }
    // if (Array.isArray(data)) {
    //   this.length = data.length
    //   return dataSource.cloneWithRows(data)
    // }
    // this.length = 0
    // for (let day in data) {
    //   this.length += data[day].length
    // }
    // return dataSource.cloneWithRowsAndSections(data)
  }



}


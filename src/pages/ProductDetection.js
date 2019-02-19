import React, { Component, PropTypes } from 'react'
import PureListView from '../components/PureListView'
import { connect } from 'react-redux'
import TopicsCarousel from './TopicsCarousel'
import Topic from './Topic'
import { genSubscribedData } from '../helper/dataHelper'
import AboutPage from './AboutPage'
import ProductButton from '../components/ProductButton'
import ListContainer from '../components/ListContainer'
import { EMPTY_CELL_HEIGHT } from '../components/ListContainer'
import ImgContainer from '../components/ImgContainer'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ImageBackground
} from 'react-native'

import ImagePicker from 'react-native-image-picker';


const options = {
  title: 'Select Product Image',
  quality: 0.2,
  maxWidth: 600,
  maxHeight: 600,
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};

const EmptyPadding = Platform.OS === 'ios' ? EMPTY_CELL_HEIGHT : 0
class ProductDetection extends Component {
  state = {
    dataSource: null,
    result: null

  }

  render() {

    return (
      <ListContainer
        androidTitle='Quality Detection'
        backgroundColor='#A8D769'>
        <ImgContainer
          data={this.state.dataSource}
          result={this.state.result}
          clearFunc={this.clearData}
          enableEmptySections
          renderEmptyView={this.renderEmptyView} />
      </ListContainer>
    )
  }

  renderEmptyView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', marginBottom: 10 }}>
        <ImageBackground style={{
          width: '100%',
          height: 240
        }} source={require('../assets/flut.jpg')}>
        </ImageBackground>
        <Text style={styles.message}>By taking or uploading a picture of the product, the corresponding shipment status will be filled in automatically and a picture will attach to shipment automatically.</Text>
        <ProductButton style={{ width: 220, marginTop: 20 }} onPress={() => this.openImagePicker()} />
      </View>
    )
  }
  clearData = () => {
    this.setState({ dataSource: null, result: null })
  }



  openImagePicker = () => {
    if (this.avatarSeource) return;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ dataSource: response.data, result: 'Loading...' });
      //   const a = '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'
       //  response.data = a;
         Promise.all([
          this.checkProduceType(response.data),
          this.checkAppleQuality(response.data)
        ]).then(res=>{
          const type = res[0].result[0].name;
          const quality = res[1].results[0].name
          if(type ==='非植物' && quality === 'bad'){
            return this.updateShipmentStatus('Rejected',response.data);
          }
          else return this.updateShipmentStatus('Approved',response.data);
        })
      }
    })
  }

  checkProduceType(img) {
    return new Promise((resolve,rejected)=>fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=F8EzuULRjx30m6lG6GepKca6&client_secret=7OcI8WHwFcauBhevG8uIhgH3cWpoPnS4')
      .then((response) => response.json())
      //check product type
      .then(token => fetch('https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + token.access_token, {
        method: 'POST',
        body: 'image=' + encodeURIComponent(img),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }))
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        rejected(err)
      })
    )
  }

  checkAppleQuality(img) {
    return new Promise((resolve,rejected)=>{
      fetch('https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=o2R7BMU0ypaGn6YFnxYS5vwu&client_secret=F9ncrhSpssI2XIaSbkgw997ViTozAIG8')
      .then((response) => response.json())
      .then(token => fetch('https://aip.baidubce.com/rpc/2.0/ai_custom/v1/classification/identifyquality?access_token=' + token.access_token, {
          method: 'POST',
          body: JSON.stringify({ 'image': img }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => response.json())
        .then(res => {
          resolve(res)
        })
        .catch((err) => {
          rejected(err)
        })
      )
    })
  }
  updateShipmentStatus(status,img) {
    this.setState({result:status})
    const mapping = {
      'Approved': '6b611752-bdc9-4ecf-8f3b-ee2d55f4ba30', 'Rejected': '88d3c24d-1511-4b93-ba64-c5b5147f1463'
    }
    fetch('http://132.232.181.123/api/Values?status=' + mapping[status], {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: img
    })

  }
  renderSectionHeader = (dayData, dayName) => {

    return (
      <View key={dayName} style={{ backgroundColor: '#eeeeee' }}>
        <Text style={[{ margin: 6, marginLeft: 8 }, styles.font]}>{dayName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 12.5,
  },
  message: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 20,
    color: '#000',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20
  }
})

const mapStateToProps = state => ({
  days: state.data.days,
  updateTime: state.data.updateTime,
  topics: genSubscribedData(state.data.days, state.schedule.subscription)
})

module.exports = connect(mapStateToProps)(ProductDetection)

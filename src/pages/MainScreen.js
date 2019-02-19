import React, {PropTypes} from 'react'
import TabNavigator from 'react-native-tab-navigator'
import ProductDetection from './ProductDetection'
import ShipmentDetection from './ShipmentDetection'

import {
	Image,
	StyleSheet
} from 'react-native'

const IMAGES = [
  {
    active: require('../assets/Shipment-Form2.png'),
    inactive: require('../assets/Shipment-Form1.png')
  },
  {
    active: require('../assets/Product-Quality2.png'),
    inactive: require('../assets/Product-Quality1.png')
  }
]
export default class extends React.Component {
  // static propTypes = {
  //   navigator: PropTypes.object,
  //   user: PropTypes.object
  // };

  state={
    selectedTab: 'ShipmentDetection',
    selectedSegment: 0
  }

  render () {
    return (
      <TabNavigator>
        <TabNavigator.Item 
          selected={this.state.selectedTab === 'ShipmentDetection'}
           title='Shipment Form'
          selectedTitleStyle={{color: '#6A6AD5'}}
          renderIcon={() => <Image source={IMAGES[0].inactive} style={styles.icon} />}
          renderSelectedIcon={() => <Image source={IMAGES[0].active} style={styles.icon} />}
          onPress={() => this.setState({ selectedTab: 'ShipmentDetection' })}>
          <ShipmentDetection
            navigator={this.props.navigator}
            onSegmentSelected={this.onSegmentSelected}/>
        </TabNavigator.Item>
        <TabNavigator.Item 
          selected={this.state.selectedTab === 'ProductDetection'}
           title='Product Quality'
          selectedTitleStyle={{color: '#6A6AD5'}}
          renderIcon={() => <Image source={IMAGES[1].inactive} style={styles.icon} />}
          renderSelectedIcon={() => <Image source={IMAGES[1].active} style={styles.icon} />}
          onPress={() => this.setState({ selectedTab: 'ProductDetection' })}>
          <ProductDetection navigator={this.props.navigator} emptyOperation={this.goHome}/>
        </TabNavigator.Item>
      </TabNavigator>
    )
  }

  goHome = () => {
    this.setState({
      selectedTab: 'ShipmentDetection'
    })
  };

  onSegmentSelected = (selectedSegment) => {
    this.setState({
      selectedSegment
    })
  }
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  }
})

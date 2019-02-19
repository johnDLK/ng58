var React = require('React')
var ViewPager = require('./ViewPager')
import NavBar from 'react-native-navigationbar'
import SegmentTab from './SegmentTab'
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  StyleSheet
} from 'react-native'

type Props = {
  androidTitle: string;
  selectedSegment?: number;
  actionName: string;
  actionFunc: func;
  selectedSectionColor: string;
  backgroundImage: number;
  backgroundColor: string;
  parallaxContent?: ?ReactElement;
  stickyHeader?: ?ReactElement;
  onSegmentChange?: (segment: number) => void;
  needTransitionTitle: bool;
  children?: any;
};

type State = {
  idx: number;
  anim: Animated.Value;
  stickyHeaderHeight: number;
};

export const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 15
export default class extends React.Component {
  props: Props;
  state: State;
  _pinned: any;

  static defaultProps = {
    selectedSectionColor: 'rgba(255,255,255,0.5)',
    needTransitionTitle: false
  };

  constructor (props: Props) {
    super(props)

    this.state = {
      idx: this.props.selectedSegment || 0,
      anim: new Animated.Value(0),
      stickyHeaderHeight: 0
    };
    this.handleSelectSegment = this.handleSelectSegment.bind(this)
  }

  render () {
    let segments = React.Children.map(this.props.children, child => child.props.title)
 
    // segments 的指示器
   

    return (
      <View style={styles.container}>
      <View>
      {this.renderHeader()}
          {this.renderParallaxContent()}
          {/* {stickyHeader} */}
      </View>
       
        <ViewPager
          count={segments.length}
          selectedIndex={this.state.idx}
          onSelectedIndexChange={this.handleSelectSegment}>
          {this.props.children}
        </ViewPager>
       
      </View>
    )
  }
  renderParallaxContent () {
    if (this.props.parallaxContent) {
      return this.props.parallaxContent
    }
    return (
      <View style={styles.parallaxText}>
        {/* {this.props.androidTitle} */}
      </View>
    )
  }

  renderHeader = () => {
    const {actionName, actionFunc, androidTitle} = this.props
    return (
      <NavBar
        backIconHidden = {true}
        backColor='#000'
        title={androidTitle}
        titleStyle={styles.headerTitle}
        barWrapperStyle={styles.barStyle}
        actionTextColor='#005068'
        actionName={actionName}
        actionFunc={actionFunc}
        barTintColor='#000'  
        barBottomThickness={0}
        backFunc={() => navigator.pop()}
        
       />
    )
  };

  handleSelectSegment (idx: number) {
    if (this.state.idx !== idx) {
      const {onSegmentChange} = this.props
      this.setState({idx}, () => onSegmentChange && onSegmentChange(idx))
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  barStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,

    marginBottom:20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    width:140,
  
  },
  parallaxText: {

    height: 80,
  }
})

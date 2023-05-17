
// import { Provider } from 'react-redux'
// import store from './src/app/store'
// import { CakeView } from './src/features/cake/CakeView'
// import { IcecreamView } from './src/features/icecream/IcecreamView'
// import { UserView } from './src/features/user/UserView'
// import VideoComponent from './src/reels/VideoComponent'
// import { NavigationContainer } from '@react-navigation/native'
// import CommonStyle from './src/CommonStyle'
// import SwiperFlatList from 'react-native-swiper-flatlist'
// import { windowHeight } from "./src/StyleSheetGlobal";
// import Video from 'react-native-video';
// import { Image, StyleSheet, View } from 'react-native'
// import React, { useMemo, useRef, useState } from 'react'
// import { data } from './data'

// export default function App() {
//   let videoRef = useRef(null)
//   const [activeIndex, setActiveIndex] = useState(0)
//   const onBuffer = () => {
//     console.log('====================================');
//     console.log("buffering...");
//     console.log('====================================');
//   }

//   const onError = (err) => {
//     console.log('====================================');
//     console.log("Error: " + JSON.stringify(err));
//     console.log('====================================');
//   }

// const [loaded, setLoaded] = useState(false)

//   const onLoadStart = () => {
//     // console.log('====================================');
//     // console.log("onLoadStart");
//     // console.log('====================================');
//   }
//   const onLoad = () => {
//     // console.log('====================================');
//     // console.log("loaded");
//     setLoaded(true)
//     // console.log('====================================');
//   }

//   const renderItem = ({ item, index }) => {
//     return (
//       <View style={{ flex: 1, height: windowHeight }}>
//         <Video
//           ref={videoRef}
//           onBuffer={onBuffer}
//           onError={onError}
//           onLoad={onLoad}
//           onLoadStart={onLoadStart}
//           source={{ uri: item.link }}
//           poster="http://via.placeholder.com/640x360"
//           paused={index !== activeIndex}
//           repeat={true}
//           resizeMode={'cover'}
//           muted={true}
//           posterResizeMode="cover"
//           style={styles.backgroundVideo}
//         />

//        {index !== activeIndex && <Image source={{uri:"http://via.placeholder.com/640x360"}}  style={styles.backgroundVideo} />}
//       </View>
//     );
//   };

//   const onChangeIndex = ({ index }) => {
//     setActiveIndex(index)
//   }

//   const FlatListMemo = useMemo(
//     () => (
//       <SwiperFlatList
//         vertical={true}
//         data={data}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         onChangeIndex={onChangeIndex}
//       />
//     ),
//     [data, renderItem],
//   );

//   return (

//    <>

//    {FlatListMemo}
//    </>
//   )
// }




// var styles = StyleSheet.create({
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: "black"
//   },
// });



// // FLASHLIST NOT WOTKING
// import { FlashList } from "@shopify/flash-list";
// import { windowHeight } from "./src/StyleSheetGlobal";
// import Video from 'react-native-video';
// import { Image, StyleSheet, View } from 'react-native'
// import React, { useMemo, useRef, useState } from 'react'
// import { data } from './data'

// const DATA = [
//   {
//     title: "First Item",
//   },
//   {
//     title: "Second Item",
//   },
// ];



// const MyList = () => {

//   let videoRef = useRef(null)
//   const [activeIndex, setActiveIndex] = useState(0)
//   const onBuffer = () => {
//     console.log('====================================');
//     console.log("buffering...");
//     console.log('====================================');
//   }

//   const onError = (err) => {
//     console.log('====================================');
//     console.log("Error: " + JSON.stringify(err));
//     console.log('====================================');
//   }

//   const [loaded, setLoaded] = useState(false)

//   const onLoadStart = () => {
//     // console.log('====================================');
//     // console.log("onLoadStart");
//     // console.log('====================================');
//   }
//   const onLoad = () => {
//     // console.log('====================================');
//     // console.log("loaded");
//     setLoaded(true)
//     // console.log('====================================');
//   }

//   const renderItem = ({ item, index }) => {
//     return (
//       <View style={{ flex: 1, height: windowHeight }}>
//         <Video
//           ref={videoRef}
//           onBuffer={onBuffer}
//           onError={onError}
//           onLoad={onLoad}
//           onLoadStart={onLoadStart}
//           source={{ uri: item.link }}
//           poster="http://via.placeholder.com/640x360"
//           paused={index !== activeIndex}
//           repeat={true}
//           resizeMode={'cover'}
//           muted={true}
//           posterResizeMode="cover"
//           style={styles.backgroundVideo}
//         />
//       </View>
//     );
//   };


//   const onViewableItemsChanged = ({ viewableItems, changed }) => {
//     console.log(viewableItems[0].index);
//     setActiveIndex(changed[0].index)
//   };
//   return (
//     <FlashList
//       pagingEnabled
//       showsVerticalScrollIndicator={false}
//       data={data}
//       renderItem={renderItem}
//       estimatedItemSize={200}
//       onViewableItemsChanged={onViewableItemsChanged}
//       removeClippedSubviews={true}
//       onEndReachedThreshold={0.5}
//       initialNumToRender={1}
//       windowSize={1}
//     />
//   );
// };


// export default MyList


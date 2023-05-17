// import * as React from 'react';
// import { Text, View, StyleSheet, Dimensions, InteractionManager, Button } from 'react-native';
// import { windowHeight } from '../StyleSheetGlobal';
// import { Video as ExpoVideo, ResizeMode } from 'expo-av';

// export default function ExpoVideoPlayer({ viewable, id, video_files,video_pictures, link, index }) {
//     const videoRef = React.useRef(null);
//     const [isRnVideoPlayer, setIsRnVideoPlayer] = React.useState(false);

//     React.useEffect(() => {
//         //    setTimeout(() => {
//         //     InteractionManager.runAfterInteractions(() => {
//         //         for (let index = 0; index < 100; index++) {
//         //             console.log(index)
//         //         }
//         //     });
//         //    }, 100);

//     }, [])

//     const [status, setStatus] = React.useState({});


//     React.useEffect(() => {
//         // loadVideo()

//         if (viewable) {
//             if (viewable.length) {
//                 if (viewable[0].id === id) {
//                     videoRef.current.playAsync()
//                 } else {
//                     videoRef.current.pauseAsync();
//                 }
//             } else {
//                 videoRef.current.pauseAsync();
//             }
//         } else {
//             videoRef.current.pauseAsync();
//         }
//     }, [viewable]);

      
//   const loadVideo = async () => {
//     await videoRef.current.loadAsync({ uri: link });
//   };

//     return (
//         <View style={styles.container}>

//             <Text>{id}</Text>
//             <Text>{link}</Text>

//             <View >
//                 <Button
//                     title={isRnVideoPlayer ? 'Rn VIDEO' : 'EXPO-AV'}
//                     onPress={() =>
//                         isRnVideoPlayer ? setIsRnVideoPlayer : videoRef.current.playAsync()
//                     }
//                 />
//             </View>

//             <ExpoVideo
//                 shouldPlay
//                 rate={1.0}
//                 volume={1.0}
//                 isMuted={false}
//                 ref={videoRef}
//                 style={styles.backgroundVideo}
//                 // onLoad={(res) => setLoadRes(`Video loaded: ${res.uri}`)}
//                 source={{
//                     uri: video_files[0].link,
//                 }}
//                 // useNativeControls
//                 resizeMode={ResizeMode.COVER}
//                 poster={video_pictures[0].picture}
//                 isLooping
//                 onPlaybackStatusUpdate={status => setStatus(() => status)}
//             />


//             <View style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 padding: 10
//             }}>
//                 <Text>LIKE</Text>
//                 <Text>COMMENT</Text>
//                 <Text>Share</Text>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         width: Dimensions.get('window').width,
//         marginBottom: 20,
//         borderWidth: 1,
//         borderColor: "white",
//         padding: 10,
//         backgroundColor: "gray"
//     },
//     backgroundVideo: {
//         width: Dimensions.get('window').width - 20,
//         height: windowHeight / 3,
//         borderRadius: 10
//     },
// });

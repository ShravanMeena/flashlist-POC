import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { windowHeight } from '../StyleSheetGlobal';
import VisibilityCheck from './Visiblity';

export default function VideoPlayerOld({ totalLength, viewable, id, link, video_files, video_pictures, index }) {
    const videoRef = React.useRef(null);
    const [pause, setPause] = React.useState(true)
    React.useEffect(() => {
        if (viewable) {
            if (viewable.length) {
                if (viewable[0].id === id) {
                    // videoRef.current.setNativeProps({ paused: false })
                    setPause(false)
                } else {
                    // videoRef.current.setNativeProps({ paused: true })
                    setPause(true)
                }
            } else {
                // videoRef.current.setNativeProps({ paused: true });
                setPause(true)
            }

        } else {
            // videoRef.current.setNativeProps({ paused: true });
            setPause(true)
        }
    }, [viewable]);

    const togglePlay = () => {
        // videoRef.current.setNativeProps({ paused: true });
        setPause(!pause)
    }

    const chnge = (isVisible) => {
        videoRef.current.setNativeProps({ paused: !isVisible });
    }

    return (
        <View style={styles.container} key={index}>
            <Text>{index} {`Total Length : ` + totalLength}</Text>
            <Text>{link}</Text>
            {/* <VisibilityCheck style={{ flex: 1 }} onChange={chnge}> */}
            <Video
                ref={videoRef}
                source={{ uri: video_files[0].link }}
                poster={video_pictures[0].picture}
                repeat={true}
                resizeMode={'cover'}
                muted={true}
                paused={pause}
                posterResizeMode="cover"
                style={styles.backgroundVideo}
            />
            {/* </VisibilityCheck> */}

            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10
            }}>
                <Text>LIKE</Text>
                <Text>COMMENT</Text>
               <TouchableOpacity style={styles.btn} onPress={togglePlay}>
               <Text>{pause ? "Play" :"Pause"}</Text>
               </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
        backgroundColor: "gray",
        height: 500,

    },
    backgroundVideo: {
        width: Dimensions.get('window').width - 20,
        height: windowHeight / 2.2,
        borderRadius: 10,
    },
    btn:{
        borderWidth:2,
        borderColor:"red",
        paddingVertical:4,
        paddingHorizontal:20,
        borderRadius:5,
        backgroundColor:"green",
        width:100,
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
});
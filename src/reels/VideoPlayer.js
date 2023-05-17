import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { windowHeight } from '../StyleSheetGlobal';
import VisibilityCheck from './Visiblity';

export default function VideoPlayer({ viewable, id, thumb, link, video_files, video_pictures, index }) {
    const videoRef = React.useRef(null);
    const [poster, setPoster] = React.useState(null)

    const chnge = (isVisible) => {
        videoRef.current.setNativeProps({ paused: !isVisible });
    }

    return (
        <View style={styles.container}>

            <Text>{id}</Text>
            <Text>{link}</Text>
            <VisibilityCheck style={{ flex: 1 }} onChange={chnge}>
                <Video
                    ref={videoRef}
                    source={{ uri: video_files[0].link }}
                    poster={poster}
                    repeat={true}
                    resizeMode={'cover'}
                    muted={true}
                    paused={false}
                    posterResizeMode="cover"
                    style={styles.backgroundVideo}
                />
            </VisibilityCheck>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10
            }}>
                <Text>LIKE</Text>
                <Text>COMMENT</Text>
                <Text>Share</Text>
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
        height: 300,

    },
    backgroundVideo: {
        width: Dimensions.get('window').width - 20,
        height: windowHeight / 4,
        borderRadius: 10,
    },
});

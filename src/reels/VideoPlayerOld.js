import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, InteractionManager, Button, Image, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { windowHeight } from '../StyleSheetGlobal';
import VisibilityCheck from './Visiblity';

export default function VideoPlayerOld({ viewable, id, thumb, link, video_files, vdUrl, video_pictures, index }) {
    const videoRef = React.useRef(null);

    const [active, setActive] = React.useState(false)
    React.useEffect(() => {
        if (viewable) {
            if (viewable.length) {
                if (viewable[0].id === id) {
                    setActive(true)
                    videoRef.current.setNativeProps({ paused: false })
                } else {
                    videoRef.current.setNativeProps({ paused: true })
                    setActive(false)

                }
            } else {
                videoRef.current.setNativeProps({ paused: true });
                setActive(false)

            }

        } else {
            videoRef.current.setNativeProps({ paused: true });
            setActive(false)
        }
    }, [viewable]);

    const chnge = (isVisible) => {
        videoRef.current.setNativeProps({ paused: !isVisible });
    }

    const [loading, setLoading] = React.useState(true)
    const onLoad = () => {
        setLoading(false)
    }
    return (
        <View style={styles.container}>

            <Text>{id}</Text>
            <Text>{link}</Text>
            <VisibilityCheck style={{ flex: 1 }} onChange={chnge}>
                <Video
                    // onLoad={onLoad}
                    ref={videoRef}
                    source={{ uri: video_files[0].link }}
                    poster={video_pictures[0].picture}
                    repeat={true}
                    resizeMode={'cover'}
                    muted={true}
                    paused={false}
                    posterResizeMode="cover"
                    style={styles.backgroundVideo}
                />
            </VisibilityCheck>

            {/* <Video
                ref={videoRef}
                source={{ uri: video_files[0].link }}
                poster={video_pictures[0].picture}
                repeat={true}
                resizeMode={'cover'}
                muted={true}
                paused={!active}
                posterResizeMode="cover"
                style={styles.backgroundVideo}
            /> */}

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
        height: 500,

    },
    backgroundVideo: {
        width: Dimensions.get('window').width - 20,
        height: windowHeight / 2.2,
        borderRadius: 10,
    },
});

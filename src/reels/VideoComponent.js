/* eslint-disable react-native/no-inline-styles */
import React, {
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import { windowHeight, windowWidth } from '../StyleSheetGlobal';
import CommonStyle from '../CommonStyle';
import { useIsFocused } from '@react-navigation/native';
const styles = StyleSheet.create({
  videoView: {
    width:windowWidth,
    opacity: 1,
  },
  videoOuter: {
    width:windowWidth,
    backgroundColor: 'black',
    ...CommonStyle.center,
  },
});

const VideoComponent = ({
  post,
  isVisible,
  isNext,
  item,
  index,
  user_id,
}) => {
  const HeightOFActualView = windowHeight

  const videoRef = useRef(null);
  const { videoOuter, videoView } = styles;
  const controlRef = useRef();
  const [isMuteX, setMuteX] = useState(true);
  const [isVisibleX, setisVisibleX] = useState(false);
  const [isFirstPlay, setisFirstPlay] = useState(false);
  const [VideoState, setVideoState] = useState('buffering');
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isVisible && isFocused) {
      videoRef.current?.seekTo(0, true);
      // videoRef.current?.play();
      setisVisibleX(true);
    } else {
      setisVisibleX(false);
    }
  }, [isFocused, isVisible]);

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      videoRef.current?.seekTo(0, true);
    }
  }, [isVisible, isNext]);
  useEffect(() => {
    setMuteX(true);
  }, []);

  const videoError = error => {
    // Manage error here
  };
  const onStateChange = state => {  
    if (state === 'ended') {
      videoRef.current?.seekTo(0, true);
      // setshowSwipeUpDemo(true)
    }
    setVideoState(state);
  };
  // useEffect(() => {
  //   if (isFirstPlay && index === 0 && VideoState === 'playing') {
  //     setTimeout(() => {
  //       setisFirstPlay(false);
  //       SaveItemLocally('isFirstPlayedVideoAAA', true);
  //     }, 3000);
  //   }
  // }, [VideoState]);

  const mm = useMemo(() => {
    return <Video
      source={{ uri: item.link }} // the video file
      paused={!isVisibleX} // make it start
      style={{ height: HeightOFActualView, width: windowWidth }} // any style you want
      repeat={true} // make it a loop
      resizeMode={'cover'}
      muted={isMuteX}
    />
  }, [isVisibleX, isMuteX]);
  return (
    <View style={[videoOuter, { height: HeightOFActualView }]}>
      <View style={{ backgroundColor: 'black' }} pointerEvents={'none'}>
        {mm}
      </View>
    </View>
  );
};

export default memo(VideoComponent);

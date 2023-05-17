import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useMemo,
  memo,
} from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {FlatList} from 'react-native';
import { windowHeight } from '../StyleSheetGlobal';

const Home = props => {
  const HeightOFActualView = windowHeight
  const refFlatList = useRef();
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const [apiDataWait, setapiDataWait] = useState(true);
  const [page, setpage] = useState(1);
  const [isFirstPlayVideo, setisFirstPlayVideo] = useState(true);
  const [VideoData, setVideoData] = useState([]);
  const [WindowSizeList, setWindowSizeList] = useState(2);
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};
  const onViewableItemsChanged = useRef(viewableItems => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });

  const transitionAnimation = index => {
    const rowHeight = HeightOFActualView * index;
    return {
      opacity: scrollY.interpolate({
        inputRange: [
          rowHeight,
          rowHeight + HeightOFActualView / 2,
          rowHeight + HeightOFActualView,
        ],
        outputRange: [1, 0.2, 0],
        useNativeDriver: true,
        extrapolate: 'clamp',
      }),
    };
  };

  const getItemLayout = (item, index) => ({
    length: HeightOFActualView,
    offset: HeightOFActualView * index,
    index,
  });
  const lastVideArray = useRef(false);
  const isFirstTime = useRef(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (reelsId !== -1) {
      lastVideArray.current = false;
      isFirstTime.current = true;
      setVideoData([]);
      onEndReached(0, '1');
    }
  }, [reelsId]);

  useEffect(() => {
    // if(ReelInitialArray?.length > 0){
    //   setVideoData(ReelInitialArray);
    //   lastVideArray.current = false;
    //   setapiDataWait(false);
    // } else {
      setVideoData([]);
      lastVideArray.current = false;
      onEndReached(0, '2');
    // }
  }, []);

  async function checkisnewUser() {
    // setTimeout(() => {
    // const isFirstPlayVideolo = true;//await GetItemLocally('isFirstPlayVideo');
    // setisFirstPlayVideo( true );
    // }, 1000);
  }

  const onEndReached = async (offset, mya) => {
    if (lastVideArray?.current !== true) {
      await new CallAPIAxios(
        API_BASEPATH_LINK,
        'get',
        `esport/content?limit=3&offset=${offset}&type=short${
          reelsId !== -1 ? `&reelsId=${reelsId ? reelsId + '' : ''}` : ''
        }`,
        null,
        true,
        Token,
        dispatch,
      ).then(response => {
        if (response.responseCode === 200) {
          if (response.response.success) {
            if (offset === 0) {
              setVideoData([]);
              setVideoData(response.response?.results);
              setWindowSizeList(3);
              dispatch(CallReduxActions(SET_REELS_ID, -1));
            } else {
              setVideoData(VideoData.concat(response.response?.results));
            }

            // setpage(page + 1);
            if (response.response?.results?.length < 3) {
              // lastVideArray.current = true;
            }
          }
          if (apiDataWait) {
            setapiDataWait(false);
          }
        } else {
          showToast(response.response.error.message);
        }
      });
    }
  };

  const keyExtractor = (item, index) => {
    return `${index}`;
  };

  const renderItem = ({item, index}) => {
    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    return (
      <FeedRow
        item={item}
        isNext={isNext}
        user_id={UserData.id}
        isFirstPlayVideo={isFirstPlayVideo}
        index={index}
        transitionAnimation={transitionAnimation}
        visible={scrollInfo}
        isVisible={scrollIndex === index}
      />
    );
  };
  // const [isFetching, setIsFetching] = React.useState(false);
  const FlatListMemo = useMemo(
    () => (
      <FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        extraData={VideoData}
        onRefresh={() => {
          lastVideArray.current = false;
          onEndReached(0, '3');
        }}
        refreshing={apiDataWait}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        data={VideoData}
        updateCellsBatchingPeriod={300}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.5}
        initialNumToRender={1}
        windowSize={WindowSizeList}
        onEndReached={() => onEndReached(VideoData?.length, '4')}
        removeClippedSubviews={true}
      />
    ),
    [VideoData, getItemLayout, renderItem, scrollY, viewabilityConfig, apiDataWait],
  );
  return (
    <View
      style={[
        CommonStyle.flexContainer,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <FeedHeaderBar
        AddReels={() => {
          lastVideArray.current = false;
          onEndReached(0, '5');
        }}
      />
      {/* <ShareMenu hideShareMenu={() => {}}/> */}
      {FlatListMemo}
      {/* {apiDataWait && (
        <View style={styles.activeINdic}>
          <ActivityIndicator
            style={{alignSelf: 'center', alignItems: 'center', flex: 1}}
            color={AppColors.Continue_gradient_1}
            size={'large'}
          />
        </View>
      )} */}
      {/* swipe_up_anim */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  activeINdic: {
    height: windowHeight / 3,
    width: windowWidth / 3,
    alignSelf: 'center',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    // position: 'absolute',
    // zIndex: 1000,
    // flexDirection: 'row',
    // left: 0,
    // width: windowWidth - 60,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  userDetail: {
    marginBottom: 5,
  },
  postDetail: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  avatar: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 5,
  },
});
export default memo(Home);

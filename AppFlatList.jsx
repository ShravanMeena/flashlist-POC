
// // WITH Flatlist
import * as React from 'react';
import { API_KEY, BASE_URL, DEFAULT_ITEM_HEIGHT } from './src/config';
import axios from 'axios';
import VideoPlayerOld from './src/reels/VideoPlayerOld';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [Viewable, SetViewable] = React.useState([]);
  const [loading, setLoading] = React.useState(true)
  const [localData, setLocalData] = React.useState([])

  const ref = React.useRef(null);
  const onViewableItemsChanged = React.useCallback((viewableItems) => {
    let Check = [];

    for (var i = 0; i < viewableItems.viewableItems.length; i++) {
      Check.push(viewableItems.viewableItems[i].item);
    }
    SetViewable(Check);
  }, []);

  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 });

  const [page, setPage] = React.useState(1)

  const onEndReached = async () => {
    setLoading(true)
    await axios.get(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        page: page,
        per_page: 20,
        size: "small"
      }
    })
      .then(function (response) {
        SetViewable(response.data.videos);
        setLoading(false)
        setPage(page + 1)
        setLocalData([...localData, ...response.data.videos])

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const renderItem = React.useCallback(
    ({ item }) => <VideoPlayerOld {...item} viewable={Viewable} />,
    [Viewable],
  )

  const getItemLayout = React.useCallback((data, index) => ({
    length: DEFAULT_ITEM_HEIGHT,
    offset: DEFAULT_ITEM_HEIGHT * index,
    index
  }), [])

  const memoizeFlatlist = React.useMemo(() =>
    <FlatList
      data={localData}
      maxToRenderPerBatch={8}
      removeClippedSubviews
      // extraData={Viewable}
      windowSize={10}
      getItemLayout={getItemLayout}
      keyExtractor={(item, index) => item.id?.toString()}
      renderItem={renderItem}
      ref={ref}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef.current}
      estimatedItemSize={DEFAULT_ITEM_HEIGHT}
      // removeClippedSubviews = {true}
      initialNumToRender={3}
      onEndReachedThreshold={0.2}
      disableVirtualization = {true}
      onEndReached={onEndReached}
    
      ListFooterComponent={() => loading ? <ActivityIndicator size={150} /> : <></>}
    />,
    [localData,Viewable])

  return (
    <View style={styles.container}>
      {memoizeFlatlist}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

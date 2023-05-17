
// // WITH FLASHLIST
import * as React from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import uuidv4 from 'react-native-uuid';

import VideoPlayer from './src/reels/VideoPlayer';
import { data } from './data';
import { FlashList } from '@shopify/flash-list';
import { windowHeight, windowWidth } from './src/StyleSheetGlobal';

import { QueryClient, QueryClientProvider } from 'react-query';
import { API_KEY, BASE_URL } from './src/config';
import axios from 'axios';
import VideoPlayerOld from './src/reels/VideoPlayerOld';

const queryClient = new QueryClient();
let DEFAULT_ITEM_HEIGHT = 290
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

  return (
    <View style={styles.container}>
      <FlashList
        data={localData}
        extraData={Viewable}
        keyExtractor={(item, index) => item.id?.toString()}
        renderItem={({ item, index }) => <VideoPlayerOld index={index + 1} {...item} viewable={Viewable} />}
        ref={ref}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        estimatedItemSize={DEFAULT_ITEM_HEIGHT}
        // removeClippedSubviews = {true}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
        ListFooterComponent={() => loading ? <ActivityIndicator size={150} /> : <></>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
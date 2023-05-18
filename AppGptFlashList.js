import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import { API_KEY, BASE_URL } from './src/config';
import { FlashList } from '@shopify/flash-list';

const AppGptFlashList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoCache, setVideoCache] = useState({}); // Video cache to store loaded videos
  const [page, setPage] = React.useState(1)

  useEffect(() => {
    onEndReached()
  }, [])
  
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
        setLoading(false)
        setPage(page + 1)
        setVideos([...videos, ...response.data.videos])
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }

//   useEffect(() => {
//     // Fetch your video data from Shopify/Flashlist or any other data source
//     // and update the 'videos' state with the fetched data
//     fetchVideoData()
//       .then(data => {
//         setVideos(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching video data:', error);
//         setLoading(false);
//       });
//   }, []);

  const handleVideoLoad = (videoId) => {
    setVideoCache(prevCache => ({
      ...prevCache,
      [videoId]: true, // Mark the video as loaded in the cache
    }));
  };

  const renderVideoItem = ({ item }) => {
    const { id, videoUrl } = item;
    const isVideoLoaded = videoCache[item.id]; // Check if the video is already loaded
console.log(item.video_files[0].link);
    return (
      <View>
        {loading && !isVideoLoaded ? (
          <ActivityIndicator size="small" />
        ) : (
          <Video
            source={{ uri:  item.video_files[0].link }}
            paused={false} // Adjust based on your app's requirements
            style={{ width: 200, height: 200 }}
            onLoad={() => handleVideoLoad(item.id)} // Update the video cache when the video is loaded
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex:1}}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlashList
          data={videos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={onEndReached}
          estimatedItemSize={200}
        />
      )}
    </View>
  );
};

export default AppGptFlashList;

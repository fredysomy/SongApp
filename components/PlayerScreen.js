import * as React from 'react';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import moment from 'moment';
import Playlist from '../assests/images/playlist.png';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Appearance,
  
} from 'react-native';
const theme = Appearance.getColorScheme();
function PlayerScreen({route, navigation}) {
  React.useEffect(async () => {
    await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
    const track = {
      url: route.params.data.download_links[0],
      title: route.params.data.song_name,
      artist: route.params.data.song_artist,
      artwork: route.params.data.song_image, // Load artwork from the app bundle
      duration: route.params.data.song_duration,
    };
    await TrackPlayer.add(track);
    
    TrackPlayer.play();
  }, []);
  const {position, duration} = useTrackPlayerProgress(250);
  const [play, setPlay] = React.useState(true);
  const [time, setTime] = React.useState(0);
  const [slidervalue, setSliderValue] = React.useState(0);

  async function completedSlide(value) {
    await TrackPlayer.seekTo(value);
  }

  function startedSlide() {
    console.log('started');
  }

  React.useEffect(() => {
    setTime(moment.utc(position * 1000).format('mm:ss'));
  }, [position]);
  function PlayPause() {
    if (play) {
      setPlay(!play);
      TrackPlayer.pause();
    } else {
      setPlay(!play);
      TrackPlayer.play();
    }
  }
  return (
    <ScrollView>
      <View style={styles.image}>
        <Image
          style={styles.img}
          source={{
            uri: route.params.data.song_image,
            height: 330,
            width: 330,
          }}></Image>
      </View>
      <View style={styles.textsC}>
        <Text style={styles.songname}>{route.params.data.song_name}</Text>
      </View>
      <View style={styles.textsC}>
        <Text style={styles.songartist}>
          {route.params.data.song_artist || route.params.data.album_name}
        </Text>
      </View>
      <View style={{marginLeft: 35, marginTop: 20, marginBottom: 0}}>
        <Text style={{color: theme == 'dark' ? 'white' : '#858585'}}>
          {time}
        </Text>
      </View>
      <View style={styles.slider}>
        <Slider
          style={{width: '90%', height: 60}}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#1abc9c"
          maximumTrackTintColor="#000000"
          onSlidingStart={startedSlide}
          onSlidingComplete={completedSlide}
        />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity activeOpacity={0.5}>
          <Image style={{width: 50, height: 50}} source={Playlist}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            PlayPause();
          }}>
          <Image
            source={{
              uri: play
                ? 'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Pause_02-256.png'
                : 'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Play_02-256.png',
              height: 80,
              width: 80,
            }}></Image>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/materia-flat-arrows-symbols-vol-6/24/018_262_download_get_arrow-256.png',
              height: 55,
              width: 55,
            }}></Image>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    //alignItems: 'center',
    flexDirection: 'column',
  },
  img: {
    margin: 'auto',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 34,
  },
  songname: {
    color: theme == 'dark' ? 'white' : 'black',
    fontSize: 40,
    alignSelf: 'auto',
    fontFamily:"OpenSansCondensed-Bold"
  },
  textsC: {
    marginLeft: 35,
  },
  songartist: {
    fontSize: 20,
    color: theme == 'dark' ? '#696969' : '#858585',
    fontFamily:"OpenSansCondensed-Bold"
  },
  controls: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slider: {
    margin: 2,
    marginTop: -8,
    alignItems: 'center',
  },
});

export default PlayerScreen;

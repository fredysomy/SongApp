import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import * as React from 'react';

function MainScreen() {
  const [songs, setSongs] = React.useState([]);

  const searchsongs = async e => {
    const response = await fetch(`https://saavn.me/search?song=${e}`);
    const json = await response.json();
    if(e.length==0){

    }
    else{
        setSongs(json);
    }
    
  };
  return (
    <ScrollView>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.cont}>
          <TextInput
            onChangeText={e => {
              searchsongs(e);
            }}
            style={styles.input}
          />
        </View>
        {songs ? (
          songs.map(data => {
            return (
              <View style={styles.card}>
                <View style={styles.ins}>
                  <Image
                  style={{marginLeft:10,marginRight:10}}
                    source={{
                      uri: data.song_image,
                      width: 50,
                      height: 50,
                    }}></Image>
                </View>
                <View style={styles.txt}>
                  <Text style={styles.randomtext1}>{data.song_name}</Text>
                </View>
                <View style={styles.ins1}>
                   
                        <Image source={{
                            uri:'https://cdn2.iconfinder.com/data/icons/flat-icons-web/40/Download-256.png',
                            height:60,
                            width:60
                        }}>
                            
                        </Image>
                    
                </View>
                <View style={styles.ins1}>
                   
                        <Image source={{
                            uri:'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Play_02-256.png',
                            height:60,
                            width:60
                        }}>
                            
                        </Image>
                    
                </View>
              </View>
            );
          })
        ) : (
          <View><Text>dfjskdj</Text></View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    color: 'white',
    padding: 1,
    fontSize: 25,
  },
  cont: {
    margin: 50,
  },
  randomtext1: {
    fontSize: 20,
    color: 'black',
  },
  txt: {
    alignSelf: 'center',
    width:170
  },
  card: {
    backgroundColor: '#ededed',
    borderRadius: 10,
    width: 360,
    height: 80,
    margin: 4,
    flexDirection: 'row',
    borderColor: 'blue',
  },
  ins: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  ins1: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
});
export default MainScreen;

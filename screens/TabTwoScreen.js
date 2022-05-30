import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import Draggable from 'react-native-draggable';


export default function TabTwoScreen() {

    const [notifications, setNotifications] = useState([]);
    const [first, setCordsforFirst] = useState({x:75, y:100});
    const [second, setCordsforSecond] = useState({x:200, y:300});



    function snapshotToArray(snapshot) {
      var returnArr = [];
      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
  
          returnArr.push(item);
      });
  
      return returnArr;
  };

  const getNotifications =()=>{
    const db = getDatabase();
        setTimeout(() => {
          const dbRef = ref(db, `notifications/ExponentPushTokenFdshPUuhOJERmNTxa/data`);
        onValue(dbRef, (snapshot) => {
         const data =  snapshotToArray(snapshot)
         setNotifications(data.reverse());
        //  setRefreshing(false)
        }, {
          onlyOnce: true
        });
        }, 3000);
    // AsyncStorage.getItem('expoToken').then((res)=>{
    //   if(res){
    //     const db = getDatabase();
    //     setTimeout(() => {
    //       const dbRef = ref(db, `notifications/${res.replace(/[^a-z]/gi, '')}/data`);
    //     onValue(dbRef, (snapshot) => {
    //      const data =  snapshotToArray(snapshot)
    //      setNotifications(data);
    //     }, {
    //       onlyOnce: true
    //     });
    //     }, 3000);
    //    }
    // })
  
  }


  useEffect(() => {
    getNotifications()
  }, [])

  const renderItem = ({ item }) => (
  
  <LinearGradient
    colors={['#FF9100', '#FF7333']}
    style={{marginBottom:2,marginHorizontal:8, borderRadius:10}}
    >
  <ListItem
  key={item.key}
  containerStyle={{backgroundColor: 'transparent', marginBottom:10}}
>
  <Avatar rounded             icon={{ name: 'bell', type: 'font-awesome', color: '#105E48', }} />
  <ListItem.Content>
  
    <ListItem.Subtitle style={{  fontWeight: 'bold' }}>
    {item.data.title}
    </ListItem.Subtitle>
    <ListItem.Title >
      {item.data.body}
    </ListItem.Title>
  </ListItem.Content>
</ListItem>
  </LinearGradient>


  );

console.log({notifications})
  return (
    <>
      <View>
        <Draggable x={first.x} y={first.y} renderSize={86}  renderColor='blue' renderText='A'  onDragRelease={(e)=>{console.log(e)}} /> 
        <Draggable x={second.x} y={second.y} renderSize={86}  renderColor='red' renderText='B'/>
        <Draggable/>
    </View>
    </>
    
    // <View style={styles.container}>
    //   {
    //     notifications.length < 1 ?
    //      <LottieView
    //         style={{
    //           height: 300,
    //           justifyContent:'center',
    //           alignSelf:'center'
    //         }}
    //         source={require('../assets/lottie/notificationLoading.json')}
    //         autoPlay
    //       />
    //       :
    //         <View>
    //             <FlatList
    //            data={notifications}
    //           renderItem={renderItem}
    //           keyExtractor={item => item.key}
    //           onRefresh={() => {
    //             setRefreshing(true)
    //             getNotifications()

    //           }}
    //           refreshing={refreshing}

    //   />
    //         </View>
    //   }
        
     
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

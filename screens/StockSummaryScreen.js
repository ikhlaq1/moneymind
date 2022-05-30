import { FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Text, Card} from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import { useEffect, useState } from 'react';
var options = {
  method: 'GET',
  url: 'https://yh-finance.p.rapidapi.com/market/v2/get-summary',
  params: {region: 'IN'},
  headers: {
    'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
    'x-rapidapi-key': 'a1FH5rWGYbmshq0Zw2W3EZlG7ADap1HixRxjsn4o4H6fufzPuj'
  }
};

export default function StockSummaryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [markets, setMarkets] = useState();


  const renderItem = ({ item }) => (
    <LinearGradient
    colors={['#FF9100', '#FF7333']}
    style={{marginBottom:10,marginHorizontal:8, borderRadius:10}}>
      <Card   containerStyle={{backgroundColor: 'transparent', marginBottom:10, borderColor:'transparent'}}>
      <Card.Title style={{color:'white'}} >{item.shortName}</Card.Title>
      <Card.Divider />
      <Text h1 style={{color:'white'}}>
        {item.fullExchangeName}: {item.regularMarketPreviousClose.raw}
      </Text>
      <Text h3 style={{color:'white'}}>
        Country: {item.exchangeTimezoneShortName == 'IST' ? "India": "US"}
      </Text>
      </Card>
    </LinearGradient>
    );

  useEffect(() => {
    getMarketUpdates()
  }, [])


  const getMarketUpdates =()=>{
    axios.request(options).then(function (response) {
      console.log(response.data);
      const stockData = response.data.marketSummaryAndSparkResponse.result.filter((res)=>{
        if(res.fullExchangeName == 'NSE'|| res.fullExchangeName == 'BSE'|| res.fullExchangeName == 'DJI'|| res.fullExchangeName == 'Nasdaq GIDS') {
        return res
        }
        })
        setMarkets(stockData)
    setRefreshing(false)

    }).catch(function (error) {
      console.error(error);
    setRefreshing(false)

    });
  }

  console.log({markets});

  return (
    <View style={styles.container}>

<FlatList
              data={markets}
              renderItem={renderItem}
              keyExtractor={item => item.shortName}
              onRefresh={() => {
                setRefreshing(true)
                getMarketUpdates()
              }}
              refreshing={refreshing}
              style={{marginBottom:70}}

      />
  
   
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#105E48'
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

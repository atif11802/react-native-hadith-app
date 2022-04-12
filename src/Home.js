import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Item,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState, memo} from 'react';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://alquranbd.com/api/hadith')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{item.nameEnglish}</Text>
        <Text style={styles.text}>{item.nameBengali}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            item.book_key
              ? navigation.navigate('bookKey', {
                  book_key: item.book_key,
                })
              : Alert.alert('Work in progress');
          }}>
          <Text style={styles.buttonText}>go to Chapters</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Text style={styles.appTitle}>Hadith app</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  container: {
    height: 200,
    width: 300,
    backgroundColor: '#2c3e50',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#2980b9',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

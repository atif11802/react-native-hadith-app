import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const BookKey = ({navigation, route}) => {
  const {book_key} = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://alquranbd.com/api/hadith/${book_key}`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  const onPress = item => {
    navigation.navigate('hBook', {
      ch: item.chSerial,
      book_key: book_key,
    });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.container}>
          <Text style={styles.name}>{item.nameBengali}</Text>
          <View style={styles.range}>
            <Text>{item.range_start}</Text>
            <Text>{item.range_end}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>chapters of {book_key}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BookKey;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 'auto',
    textAlign: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  mainContainer: {
    height: '100%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  range: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

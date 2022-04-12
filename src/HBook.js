import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const HBook = ({route}) => {
  const {ch, book_key} = route.params;
  const [hadith, setHadith] = useState([]);

  useEffect(() => {
    fetch(`https://alquranbd.com/api/hadith/${book_key}/${ch}`)
      .then(response => response.json())
      .then(json => setHadith(json))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <Text>{item.hadithBengali}</Text>
        <Text>{item.hadithArabic}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text>Hadith</Text>
      <FlatList
        data={hadith}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default HBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

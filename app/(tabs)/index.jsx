import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import {clearAll} from '../../functions';

export default function HomeScreen() {

  useEffect(() => {
    const clearData = async () => {
      await clearAll();
    };
    // clearData();
  }, []);
  return (
   <ScrollView>
    <View>
      <Text>Hi</Text>
    </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  
});

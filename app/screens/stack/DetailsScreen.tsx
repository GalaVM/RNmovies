import React from 'react';
import Config from 'react-native-config';
import {Image, StyleSheet, Text, View} from 'react-native';
import {blackText, gray, screenWidth} from '../../styles/constants';
import {Details} from '../../api/movieDetails';
import {RootContainer} from '../../components/RootContainer';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './StackProps';
import {ScreenEnum} from '../types';

const API_IMAGE_URI = Config.API_IMAGE_URL;

export interface DetailsScreenProps {
  item: Details;
  isFavorite?: boolean;
}

export type DetailsScreenNavProps = StackScreenProps<
  RootStackParamList,
  ScreenEnum.DetailsScreen
>;
export const DetailsScreen = ({route}: DetailsScreenNavProps) => {
  const {filmCast, filmDesc, filmPoster, filmTitle} = route.params.item;

  return (
    <RootContainer>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {filmPoster && (
              <Image
                style={styles.img}
                resizeMode="contain"
                source={{
                  uri: `${API_IMAGE_URI}${filmPoster}`,
                }}
              />
            )}
            <Text style={styles.title}>{filmTitle}</Text>
          </View>
          <Text style={styles.descTitle}>Short Description:</Text>
          <Text>{filmDesc}</Text>

          <Text style={styles.descTitle}>Cast:</Text>
          {filmCast.map((el) => {
            return <Text>{el.original_name}</Text>;
          })}
        </View>
      </ScrollView>
    </RootContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingVertical: 24,
  },
  contentContainer: {
    flexDirection: 'row',
  },

  img: {width: 180, height: 180, alignSelf: 'center'},
  title: {
    paddingTop: 12,
    paddingLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: blackText,
    width: screenWidth * 0.46,
  },
  descTitle: {
    fontSize: 14,
    color: blackText,
    width: screenWidth * 0.46,
    fontWeight: '800',
  },
  btnFavorite: {
    alignSelf: 'flex-end',
    paddingRight: 47,
  },
});

import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {getHeight, getWidth} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';

export type PersonModel = {
  image: any;
  name: string;
  id: number;
};

type Props = {
  person: PersonModel;
  onPress?: (value?: any) => void;
};
const PersonOnBoarding: React.FC<Props> = React.memo(
  ({person, onPress}: Props) => {
    return (
      <TouchableOpacity style={styles.person} key={person.id} onPress={onPress}>
        <Text style={styles.text}>{person.name}</Text>
        {!person.image && (
          <Image
            source={require('../../Assets/Images/no_image.png')}
            style={styles.noimage}
          />
        )}
        {person.image && <Image source={person.image} style={styles.image} />}
      </TouchableOpacity>
    );
  },
);

export default PersonOnBoarding;

const styles = StyleSheet.create({
  person: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: getHeight(95),
    margin: 5,
    width: getWidth(83),
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
  },
  text: {
    position: 'absolute',
    top: '5%',
    fontFamily: 'Assistant-Medium',
  },
  noimage: {
    resizeMode: 'contain',
    height: 50,
    aspectRatio: 1,
    position: 'absolute',
    bottom: '30%',
  },
  image: {
    position: 'absolute',
    bottom: '20%',
    aspectRatio: 1,
    height: 45,
    resizeMode: 'contain',
  },
});

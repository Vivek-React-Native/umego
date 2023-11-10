import {
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import Moment from 'moment';

export type CardModel = {
  image: any;
  name: string;
  lastMessage: string;
  time: string;
  itemCount: number;
};

type Props = {
  card: CardModel;
  onPress?: () => void;
};

const ChatList = ({card, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {card.image ? (
              <Image
                style={{height: 35, width: 25, borderRadius: 5}}
                source={{uri: card.image}}
              />
            ) : (
              <Image
                source={require('../../Assets/Images/no_image.png')}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.rightTextContainer}>
            <Text style={styles.name}>{card.name}</Text>
            <Text style={styles.lastMessage}>{card.lastMessage}</Text>
          </View>
        </View>
      </View>
      <View style={styles.leftContainer}>
        <Text style={styles.time}>
          {Moment(card.time).format('MMM DD,YYYY hh:mm a')}
        </Text>
        {card.itemCount > 0 && (
          <View style={styles.itemCircle}>
            <Text style={styles.itemCount}>{card.itemCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.system,
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.system,
  },
  rightTextContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  name: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    color: COLORS.purpleLight,
    fontSize: 14,
    fontFamily: 'Assistant-Medium',
  },
  lastMessage: {
    fontWeight: '400',
    color: COLORS.text,
    fontSize: 12,
    alignSelf: 'flex-start',
    fontFamily: 'Assistant-Medium',
  },
  time: {
    fontWeight: '600',
    color: COLORS.purpleLight,
    fontSize: 12,
    fontFamily: 'Assistant-Medium',
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCircle: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: COLORS.purpleLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  itemCount: {
    fontWeight: '600',
    fontSize: 12,
    color: COLORS.white,
    fontFamily: 'Assistant-Medium',
  },
  image: {
    width: 50,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});

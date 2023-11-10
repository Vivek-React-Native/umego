import {
  Image,
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Line from '../Line/Line';
import {COLORS} from '../../Constants/colors';
import {useTranslation} from 'react-i18next';

export type CardModel = {
  image: any;
  title: string;
  name: string;
  location: string;
  birthDate: string;
  price: string;
  gender: string;
};

type Props = {
  card: any;
  cardStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  lineStyle?: StyleProp<TextStyle>;
  cardBodyStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  rightSectionStyle?: StyleProp<TextStyle>;
  infoBoxStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  children?: React.ReactNode;
  onPress?: () => void;
};

const Card = ({
  card,
  cardStyle,
  lineStyle,
  cardBodyStyle,
  imageStyle,
  titleStyle,
  rightSectionStyle,
  infoBoxStyle,
  activeOpacity,
  children,
  onPress,
}: Props) => {
  const {t} = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity || 0.5}
      style={[styles.card, cardStyle]}
      onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.status}>{card?.status}</Text>
        <Text
          lineBreakMode="middle"
          numberOfLines={1}
          style={[styles.title, titleStyle]}>
          {card.title}
        </Text>
      </View>
      <Line
        style={[
          {
            marginVertical: 10,
          },
          lineStyle,
        ]}
      />
      <View style={[styles.cardBody, cardBodyStyle]}>
        <View style={[styles.imgAndText]}>
          <Text numberOfLines={1} style={{fontFamily: 'Assistant-Medium'}}>
            ₪ {card.price}
          </Text>
          <Image
            style={{transform: [{scale: 1.1}], marginRight: 5}}
            source={require('../../Assets/Images/money.png')}
          />
        </View>
        <View style={[styles.rightSection, rightSectionStyle]}>
          <View style={[styles.infoBox, infoBoxStyle]}>
            <View style={styles.imgAndText2}>
              <Text style={styles.name}>{card.name}</Text>
              <View style={styles.genderTexts}>
                <Text style={styles.genderText1}>{t('gender')}:</Text>
                <Text style={styles.genderText2}>{card.gender}</Text>
              </View>
            </View>
            <View style={[styles.imgAndText2]}>
              <Image
                style={{marginHorizontal: 5}}
                resizeMode={'contain'}
                source={require('../../Assets/Images/location.png')}
              />
              <Text
                style={{color: COLORS.text, fontFamily: 'Assistant-Medium'}}>
                {card.location}
              </Text>
            </View>
            <View style={[styles.imgAndText2]}>
              <Image
                style={{marginHorizontal: 5}}
                resizeMode={'contain'}
                source={require('../../Assets/Images/calendar.png')}
              />
              <View>
                <Text style={styles.valuesText}>{card.birthDate}</Text>
              </View>
            </View>
          </View>
          {card.image ? (
            <Image
              source={
                typeof card.image === 'number' ? card.image : {uri: card.image}
              }
              style={[styles.image, imageStyle]}
            />
          ) : (
            <Image
              source={require('../../Assets/Images/no_image.png')}
              style={[styles.image, imageStyle]}
            />
          )}
        </View>
      </View>
      {children}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 15,
    marginLeft: 7,
    fontFamily: 'Assistant-Medium',
  },
  cardBody: {
    paddingHorizontal: 5,
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoBox: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 7,
    height: 100,
    justifyContent: 'space-between',
  },
  imgAndText: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginLeft: -15,
  },
  imgAndText2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '65%',
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  iconStyle: {},
  image: {
    height: 100,
    width: 80,
    borderRadius: 5,
    overflow: 'hidden',
  },
  name: {
    fontFamily: 'Assistant-Medium',
    paddingLeft: 10,
  },
  iconMain: {
    height: 23,
    width: 23,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightPurple,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  valuesText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 5,
    color: COLORS.text,
    textAlign: 'left',
    fontFamily: 'Assistant-Medium',
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  status: {
    color: COLORS.purpleNotnei,
    marginRight: 10,
    textTransform: 'capitalize',
    fontFamily: 'Assistant-Medium',
  },
  genderTexts: {
    flexDirection: 'row',
    fontFamily: 'Assistant-Medium',
  },
  genderText1: {
    color: '#A5A5A5',
    fontFamily: 'Assistant-Medium',
    paddingLeft: 10,
  },
  genderText2: {
    color: '#A5A5A5',
    fontFamily: 'Assistant-Medium',
  },
});

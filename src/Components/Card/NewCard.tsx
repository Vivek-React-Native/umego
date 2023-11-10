import {
  Image,
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ImageStyle,
} from 'react-native';
import React from 'react';
import Line from '../Line/Line';
import {COLORS} from '../../Constants/colors';
import {t} from 'i18next';

export type CardModel = {
  image: string | null;
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
};

const NewCard = ({
  card,
  cardStyle,
  lineStyle,
  cardBodyStyle,
  imageStyle,
  titleStyle,
  rightSectionStyle,
  infoBoxStyle,
}: Props) => {
  return (
    <View style={[styles.card, cardStyle]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, titleStyle]}>{card.title}</Text>
          </View>
          <View>
            <Text style={[styles.status, titleStyle]}>{card.status}</Text>
          </View>
        </View>
        <Line style={[lineStyle]} />
        <View style={[styles.body, cardBodyStyle]}>
          <View style={styles.imageBox}>
            {card.image ? (
              <Image
                source={{uri: card.image}}
                style={[styles.image, imageStyle]}
              />
            ) : (
              <Image
                source={require('../../Assets/Images/no_image.png')}
                style={[styles.image, imageStyle]}
              />
            )}
          </View>
          <View style={[styles.infoBox, infoBoxStyle]}>
            <View style={styles.personalInfo}>
              <Text style={styles.first_name}>{card.first_name}</Text>
              <Text style={styles.gender}>{`${card.gender}: ${t(
                'gender',
              )}`}</Text>
            </View>

            <View style={styles.infoDT}>
              <View style={styles.addressField}>
                <Image
                  style={{transform: [{scale: 1.1}]}}
                  source={require('../../Assets/Images/location.png')}
                />
                <View style={styles.textWrap}>
                  <Text style={styles.valuesText}>{card.location}</Text>
                </View>
              </View>
              <View style={styles.rateField}>
                <Image
                  style={{transform: [{scale: 1.1}]}}
                  source={require('../../Assets/Images/money.png')}
                />
                <View style={styles.textWrap}>
                  <Text style={styles.valuesText}>₪{card.price}</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoDT}>
              <View style={styles.dateField}>
                <Image
                  style={{transform: [{scale: 1.1}]}}
                  source={require('../../Assets/Images/calendar.png')}
                />
                <View style={styles.textWrap}>
                  <Text style={styles.valuesText}>{card.birthDate}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewCard;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    paddingVertical: 20,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: COLORS.white,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  header: {
    height: '20%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    marginLeft: 7,
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    marginRight: 7,
    color: '#7B7BDB',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },

  infoBox: {
    width: '70%',
    justifyContent: 'center',
  },
  personalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  first_name: {
    color: COLORS.text,
  },
  gender: {
    color: COLORS.subText,
    marginLeft: 5,
  },
  infoDT: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 1,
    paddingHorizontal: 5,
  },
  addressField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateField: {
    width: '40%',
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: -10,
    flexWrap: 'nowrap',
  },
  dateField: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginRight: -10,
    paddingRight: 3,
    flexWrap: 'nowrap',
  },
  image: {
    height: 100,
    width: 80,
    borderRadius: 5,
  },
  textWrap: {},
  valuesText: {
    marginLeft: 5,
    color: COLORS.text,
    textAlign: 'left',
  },
});

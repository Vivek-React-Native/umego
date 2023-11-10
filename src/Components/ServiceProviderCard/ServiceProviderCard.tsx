import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Line from '../Line/Line';
import {COLORS} from '../../Constants/colors';
import Button from '../Button/Button';
import {useTranslation} from 'react-i18next';

export type CardModel = {
  image: ImageRequireSource;
  title: string;
  name: string;
  location: string;
  birthDate: string;
  price: string;
  gender: string;
  problem: string;
  statement: string;
  startTime: string;
  startDate: string;
};

type Props = {
  card: CardModel;
};

const ServiceProviderCard = ({card}: Props) => {
  const {t} = useTranslation();

  const renderLine = () => {
    return <Line style={styles.line} />;
  };

  const renderUpperLayer = () => {
    return (
      <View>
        <Text style={styles.title}>{card.title}</Text>
      </View>
    );
  };
  const renderCardBody = () => {
    return (
      <>
        <View style={styles.cardBody}>
          <View style={styles.rightSection}>
            <View style={styles.infoBox}>
              <View style={styles.imgAndText2}>
                <Image source={require('../../Assets/Images/location.png')} />
                <Text>{card.location} </Text>
              </View>
              <View style={styles.imgAndText2}>
                <Image source={require('../../Assets/Images/calendar.png')} />
                <Text>{card.birthDate} </Text>
              </View>
            </View>
          </View>

          <View style={styles.imgAndText}>
            <Image source={require('../../Assets/Images/money.png')} />
            <Text>{card.price}</Text>
          </View>
        </View>
        <Button
          text={`${t('myRequest.removetask')}`}
          onPress={() => {}}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          buttonStyle={{
            ...styles.renderItemButton,
            backgroundColor: COLORS.error,
            borderWidth: 0,
            marginTop: 10,
          }}
          textStyle={{fontSize: 14}}
        />
      </>
    );
  };

  return (
    <View style={styles.card}>
      {renderUpperLayer()}
      {renderLine()}
      {renderCardBody()}
    </View>
  );
};

export default ServiceProviderCard;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginTop: 20,
    // height: getWidthStr(22),
  },
  title: {
    alignSelf: 'flex-start',
    fontWeight: '700',
    paddingHorizontal: 20,
    // paddingVertical: 5,
    fontSize: 14,
    color: COLORS.text,
  },
  cardBody: {
    paddingHorizontal: 5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imgAndText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAndText2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginRight: -10,
  },
  rightSection: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.system,
  },
  renderItemButton: {
    flex: 1,
    paddingVertical: 10,
    marginVertical: 20,
    alignSelf: 'center',
    width: '90%',
  },
});

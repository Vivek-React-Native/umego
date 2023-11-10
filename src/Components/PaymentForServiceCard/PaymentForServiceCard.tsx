import React, {useCallback, useEffect, useState} from 'react';
import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import Line from '../Line/Line';
import Button from '../../Components/Button/Button';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import SelectBox from '../SelectBox/SelectBox';
import axios from 'axios';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export type CardModel = {
  image: ImageRequireSource;
  title: string;
  name: string;
  location: string;
  birthDate: string;
  price: string;
  gender: string;
  problem: string;
};

type Props = {
  card: CardModel;
  onPaymentPress?: () => void;
  isDisable?: boolean;
};

const PaymentForServiceCard = ({card, onPaymentPress, isDisable}: Props) => {
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');
  const [PayValue, setPayValue] = useState(card.price);

  const handleSelection = useCallback((bool: boolean, name: string) => {
    setSelectedItem(name);
    const value = Number(card.price?.slice(1));
    let response;
    switch (name) {
      case 'tip1':
        response = (value * 10) / 100;
        break;
      case 'tip2':
        response = (value * 15) / 100;
        break;
      case 'tip3':
        response = (value * 20) / 100;
        break;
      case 'withoutTip':
        response = 0;
        break;
      default:
        response = 0;
        break;
    }
    setPayValue(`₪${value + response}`);
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.imgAndText} />
        <View style={styles.rightSection}>
          <View style={styles.infoBox}>
            <View style={styles.imgAndText2}>
              <Text style={styles.gender}>{card.gender} </Text>
              <Text style={styles.name}>{card.name} </Text>
            </View>
            <Text style={styles.price}>{card.price}</Text>
          </View>
          <Image style={styles.image} source={{uri: card.image}} />
        </View>
      </View>
      <Line style={styles.line} />
      <Text style={styles.problem}>{card.problem}</Text>
      <View style={styles.selectBoxRow}>
        <SelectBox
          name={'tip1'}
          onSelection={handleSelection}
          text={t('paymentForServiceScreen.tip1')}
          selected={selectedItem === 'tip1'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'tip2'}
          onSelection={handleSelection}
          text={t('paymentForServiceScreen.tip2')}
          selected={selectedItem === 'tip2'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'tip3'}
          onSelection={handleSelection}
          text={t('paymentForServiceScreen.tip3')}
          selected={selectedItem === 'tip3'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'withoutTip'}
          onSelection={handleSelection}
          text={t('paymentForServiceScreen.tip4')}
          selected={selectedItem === 'withoutTip'}
          boxStyle={styles.selectBox}
        />
      </View>
      <Line style={styles.line} />
      <Button
        onPress={() => onPaymentPress?.(PayValue.slice(1))}
        text={
          t('paymentForServiceScreen.approvalButtonText') +
          PayValue +
          t('paymentForServiceScreen.now')
        }
        color={isDisable ? COLORS.subText : COLORS.purpleLight}
        variant="filled"
        corners="curved"
        size="xlarge"
        buttonStyle={styles.buttonStyle}
        disabled={isDisable}
      />
    </View>
  );
};

export default PaymentForServiceCard;

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
    fontWeight: 'bold',
    paddingHorizontal: 5,
    fontSize: 17,
  },
  cardBody: {
    paddingHorizontal: 5,
    width: '90%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBox: {
    alignItems: 'flex-start',
  },
  imgAndText: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgAndText2: {
    flexDirection: 'column',
    marginVertical: 5,
    marginRight: 35,
    paddingHorizontal: 10,
  },
  rightSection: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start',
  },
  gender: {
    fontWeight: '400',
    lineHeight: 16.8,
    fontSize: 14,
    color: COLORS.text,
  },
  name: {
    fontWeight: '400',
    lineHeight: 15.4,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  price: {
    fontWeight: '400',
    lineHeight: 19.8,
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  problem: {
    fontWeight: '400',
    lineHeight: 15.4,
    fontSize: 14,
    color: COLORS.text,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.system,
  },
  buttonStyle: {
    alignSelf: 'center',
  },
  selectBox: {
    marginHorizontal: 5,
    minWidth: 65,
  },
  selectBoxRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    marginHorizontal: 10,
    borderRadius: 10,
    height: 90,
    width: 80,
  },
});

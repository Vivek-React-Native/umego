import {Image, ImageRequireSource, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Line from '../Line/Line';
import Button from '../../Components/Button/Button';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import CustomRatingBar from '../RatingBar/RatingBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CardModel = {
  image: any;
  title: string;
  name: string;
  rating: number;
  gender: string;
};

type Props = {
  card: CardModel;
  onRatingStart: Function;
  maxRating: Array<number>;
  handleCancelButton: () => void;
  handleChatButton: () => void;
};

const SPInterestedRequestCard = ({
  card,
  onRatingStart,
  maxRating,
  handleCancelButton,
  handleChatButton,
}: Props) => {
  const [lang, setLang] = useState('');
  const {t} = useTranslation();

  const renderUpperLayer = () => {
    return (
      <View>
        <Text style={styles.title}>{card.name}</Text>
        <Line style={styles.line} />
      </View>
    );
  };

  useEffect(() => {
    getLang();
  }, []);

  const getLang = async () => {
    const lang = await AsyncStorage.getItem('lng');
    setLang(lang);
  };
  const renderCardBody = () => {
    return (
      <View style={styles.cardBody}>
        <View style={styles.imgAndText} />
        <View style={styles.rightSection}>
          <View style={styles.infoBox}>
            <View style={styles.imgAndText2}>
              <Text style={styles.gender}>
                {t('gender')}:{card.gender}
              </Text>
            </View>
            <View style={styles.imgAndText2}>
              <Text>דירוג:{card.rating}</Text>
            </View>
            <View style={styles.imgAndText2}>
              <CustomRatingBar
                rating={card.rating}
                maxRating={maxRating}
                onRatingPress={(item, key) => onRatingStart(item, key)}
              />
            </View>
          </View>
          {card.image ? (
            <Image
              source={{
                uri: card.image,
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../Assets/Images/no_image.png')}
              style={styles.image}
            />
          )}
        </View>
      </View>
    );
  };

  const renderButtonRow = () => {
    return (
      <View style={styles.buttonRow}>
        {lang == 'en' ? (
          <>
            <Button
              onPress={handleCancelButton}
              text={t('spInterestedInOurRequestScreen.cancelButtonText')}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
              size="medium"
              buttonStyle={styles.btnstyle}
            />
            <Button
              onPress={handleChatButton}
              text={t('spInterestedInOurRequestScreen.approvalButtonText')}
              color={COLORS.purpleLight}
              variant="outlined"
              corners="curved"
              size="medium"
              buttonStyle={styles.btnstyle}
            />
          </>
        ) : (
          <>
            <Button
              onPress={handleCancelButton}
              text={t('spInterestedInOurRequestScreen.approvalButtonText')}
              color={COLORS.purpleLight}
              variant="outlined"
              corners="curved"
              size="medium"
              buttonStyle={styles.btnstyle}
            />
            <Button
              onPress={handleChatButton}
              text={t('spInterestedInOurRequestScreen.cancelButtonText')}
              color={COLORS.purpleLight}
              variant="filled"
              corners="curved"
              size="medium"
              buttonStyle={styles.btnstyle}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      {renderUpperLayer()}
      {renderCardBody()}
      <Line style={styles.line} />
      {renderButtonRow()}
    </View>
  );
};

export default SPInterestedRequestCard;

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
    paddingHorizontal: 10,
    paddingVertical: 0,
    fontSize: 14,
    color: COLORS.text,
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
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  imgAndText: {
    flexDirection: 'row-reverse',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '65%',
  },
  btnstyle: {
    paddingVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.system,
  },
  gender: {
    color: COLORS.subText,
  },
  image: {
    marginHorizontal: 10,
    borderRadius: 10,
    height: 90,
    width: 70,
  },
});

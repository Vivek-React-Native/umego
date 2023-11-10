import {
  Image,
  ImageRequireSource,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Line from '../Line/Line';
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../Constants/colors';
import SelectBox from '../SelectBox/SelectBox';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

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
};

type Props = {
  card: CardModel;
  onReportingCardPress: (data: any) => void;
  handleCancelation: () => void;
};

const ReportingCard = ({
  card,
  onReportingCardPress,
  handleCancelation,
}: Props) => {
  const {t} = useTranslation();
  const [reportValue, setreportValue] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const handleSelection = useCallback((value: boolean, name: string) => {
    if (value) setSelectedItem(name);
    else setSelectedItem('');
  }, []);
  const renderUpperLayer = () => {
    return (
      <View>
        <Text style={styles.toptitle}>{card.title}</Text>
        <Line style={styles.line} />
      </View>
    );
  };
  const renderCardBody = () => {
    return (
      <View style={styles.cardBody}>
        <View style={styles.rightSection}>
          <Image style={styles.image} source={{uri: card.image}} />
          <View style={styles.infoBox}>
            <View style={[styles.imgAndText2, {paddingLeft: 5}]}>
              <Text style={{color: COLORS.black}}>{card.name}</Text>
              <Text
                style={{
                  color: COLORS.subText,
                  lineHeight: heightPercentageToDP(2.5),
                }}>{` ${t('gender')}: ${card.gender}`}</Text>
            </View>
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
          <Text>{card.price}</Text>
          <Image source={require('../../Assets/Images/money.png')} />
        </View>
      </View>
    );
  };

  const renderButtonRow = () => {
    return (
      <View style={styles.buttonRow}>
        <Button
          onPress={() => {
            onReportingCardPress({
              description: reportValue,
              reason: selectedItem,
            });
          }}
          text={t('reportingAbsenceScreen.button1')}
          color={COLORS.purpleLight}
          variant="filled"
          corners="curved"
          size="medium"
          buttonStyle={styles.approveButtonStyle}
        />
        <Button
          onPress={handleCancelation}
          text={t('reportingAbsenceScreen.button2')}
          color={COLORS.purpleLight}
          variant="outlined"
          corners="curved"
          size="medium"
        />
      </View>
    );
  };

  return (
    <View style={styles.card} onTouchStart={Keyboard.dismiss}>
      {renderUpperLayer()}
      {renderCardBody()}
      <Line style={styles.line} />
      <Text style={styles.title}>{card.problem}</Text>
      <View
        style={{flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'}}>
        <SelectBox
          name={'התרחשה תקלה בזמן המשימה'}
          onSelection={handleSelection}
          text={t('reportingAbsenceScreen.box1')}
          selected={selectedItem === 'התרחשה תקלה בזמן המשימה'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'איחור לא סביר'}
          onSelection={handleSelection}
          text={t('reportingAbsenceScreen.box2')}
          selected={selectedItem === 'איחור לא סביר'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'נותן שירות לא הגיע'}
          onSelection={handleSelection}
          text={t('reportingAbsenceScreen.box3')}
          selected={selectedItem === 'נותן שירות לא הגיע'}
          boxStyle={styles.selectBox}
        />
        <SelectBox
          name={'אחר'}
          onSelection={handleSelection}
          text={t('reportingAbsenceScreen.box4')}
          selected={selectedItem === 'אחר'}
          boxStyle={styles.selectBox}
        />
      </View>
      <Text style={styles.title}>{card.statement}</Text>
      <Input
        onTextChanged={(value: string) => {
          setreportValue(value);
        }}
        size="full"
        multiline={true}
        maxLength={170}
      />
      {renderButtonRow()}
    </View>
  );
};

export default ReportingCard;

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
    fontWeight: '400',
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
    marginHorizontal: 10,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoBox: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 10,
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
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputStyle: {
    height: 120,
    width: '95%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.system,
    paddingLeft: 10,
    textAlignVertical: 'top',
    paddingTop: 0,
    textAlign: 'top',
  },
  approveButtonStyle: {
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  selectBoxRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderWidth: 1,
  },
  line: {
    marginVertical: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.system,
  },
  selectBox: {
    marginHorizontal: 5,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toptitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    paddingHorizontal: 5,
    paddingVertical: 0,
    fontSize: 14,
    color: COLORS.text,
    marginHorizontal: 10,
  },
  image: {
    borderRadius: 10,
    height: 90,
    width: 70,
  },
});

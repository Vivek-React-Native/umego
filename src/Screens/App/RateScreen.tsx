import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useTranslation} from 'react-i18next';
import SelectBox from '../../Components/SelectBox/SelectBox';
import Input from '../../Components/Input/Input';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'RateScreen'>;
  route: RouteProp<AppStackParamList, 'RateScreen'>;
};

const RateScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const [selectedItem, setSelectedItem] = useState('');
  const handleSelection = useCallback((value: boolean, name: string) => {
    if (value) setSelectedItem(name);
    else setSelectedItem('');
  }, []);
  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <KeyboardAvoidingView>
        <ScreenHeader
          header={t('serviceProviderRating')}
          isHeaderBold={true}
          showBackButton={true}
        />
        <ScrollView style={styles.box}>
          <View style={styles.imgText}>
            <Image
              style={styles.person}
              source={require('../../Assets/person.png')}
            />
            <Text style={styles.personText}>הוצאת כלב לטיול</Text>
            <Text style={styles.personText2}>מאור</Text>
          </View>
          <View style={styles.border}></View>
          <Text style={styles.personText3}>איך היה השירות שקיבלת ממאור?</Text>
          <View style={styles.stars}>
            <Image source={require('../../Assets/star2.png')} />
            <Image source={require('../../Assets/star4.png')} />
            <Image source={require('../../Assets/star3.png')} />
            <Image source={require('../../Assets/star5.png')} />
            <Image source={require('../../Assets/star1.png')} />
          </View>
          <View style={styles.selectSection}>
            <SelectBox
              name={'doneToPropertyDamage'}
              onSelection={handleSelection}
              text={t('doneToPropertyDamage')}
              selected={selectedItem === 'doneToPropertyDamage'}
              boxStyle={styles.boxStyle}
            />
            <SelectBox
              name={'serviceProviderRude'}
              onSelection={handleSelection}
              text={t('serviceProviderRude')}
              selected={selectedItem === 'serviceProviderRude'}
              boxStyle={styles.boxStyle}
            />
            <SelectBox
              name={'performedNegligentWork'}
              onSelection={handleSelection}
              text={t('performedNegligentWork')}
              selected={selectedItem === 'performedNegligentWork'}
              boxStyle={styles.boxStyle}
            />
            <SelectBox
              name={'serviceProviderLate'}
              onSelection={handleSelection}
              text={t('serviceProviderLate')}
              selected={selectedItem === 'serviceProviderLate'}
              boxStyle={styles.boxStyle}
            />
          </View>
          <Input
            onTextChanged={() => {}}
            type="textarea"
            style={styles.emptyBox}
          />
          <Button
            size="xlarge"
            text="אישור "
            onPress={() => {}}
            color={COLORS.purpleLight}
            variant="filled"
            corners="curved"
            buttonStyle={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RateScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    alignContent: 'center',
    textAlign: 'center',
    color: '#8D7BAF',
    marginTop: 54,
    fontWeight: '700',
    fontSize: 18,
  },
  emptyBox: {
    borderRadius: 5,
    alignSelf: 'center',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'row',
  },
  imgText: {
    display: 'flex',
    flexDirection: 'row',
  },
  boxes2: {
    display: 'flex',
    flexDirection: 'row',
    // marginTop: 14
  },
  border: {
    borderColor: '#EDEFFF',
    borderBottomWidth: 1,
    marginTop: 40,
    width: '90%',
    marginLeft: 13,
  },
  box: {
    backgroundColor: COLORS.white,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  person: {
    marginTop: 13,
    marginLeft: 12,
  },
  personText: {
    marginLeft: 10,
    marginTop: 20,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '700',
    color: '#323233',
  },
  personText2: {
    marginLeft: -90,
    marginTop: 40,
    fontSize: 14,
    fontWeight: '700',
    color: '#323233',
    textAlign: 'left',
  },
  personText3: {
    marginTop: 13,
    textAlign: 'left',
    marginLeft: 15,
    fontSize: 14,
    fontWeight: '400',
    color: '#323233',
  },
  star1: {
    marginTop: -170,
    margin: 220,
  },
  star2: {
    marginTop: -230,
    margin: 85,
  },
  stars: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 33,
    marginTop: 26,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 10,
  },

  selectSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  boxStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

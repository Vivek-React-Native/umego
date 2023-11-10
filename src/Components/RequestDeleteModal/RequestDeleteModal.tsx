import {
  Image,
  ImageRequireSource,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../Constants/colors';
import Button from '../../Components/Button/Button';
import { IMAGES } from '../../Constants/StaticImages';
import { ICONS } from '../../Constants/IconsList';
import { useTranslation } from 'react-i18next';

export type RequestDeleteModel = {
  show: boolean;
  delete: Function;
  close: Function;
};

type Props = {
  info: RequestDeleteModel;
};
const RequestDeleteModal: React.FC<Props> = React.memo(({ info }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={info.show}
      onRequestClose={() => info.close()}>
      <View style={styles.modalMain}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <AntIcon
                name={ICONS.close}
                size={25}
                color={COLORS.black}
                onPress={() => info.close()}
              />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTextStyle}>
                {t('requestDetailDelete.header')}
              </Text>
              <Text style={styles.headerTitleStyle}>הוצאת כלב לטיול</Text>
            </View>
          </View>
          <View style={styles.contentMain}>
            <View style={styles.textMain}>
              <View style={styles.iconMain}>
                <IonIcon name={ICONS.location} size={15} color={COLORS.black} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.valuesText}>בלפור, תל אביב</Text>
              </View>
            </View>
            <View style={styles.textMain}>
              <View style={styles.iconMain}>
                <Icon name={ICONS.calender} size={12} color={COLORS.black} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.valuesText}>15:00 ,5/12/21</Text>
              </View>
            </View>
            <View style={styles.textMain}>
              <View style={styles.iconMain}>
                <Icon name={ICONS.money} size={12} color={COLORS.black} />
              </View>
              <View style={styles.textWrap}>
                <Text style={styles.valuesText}>₪70</Text>
              </View>
            </View>
            <View style={styles.buttonMain}>
              <Button
                text={t('requestDetailScreen.cancel')}
                onPress={() => {
                  info.delete();
                }}
                color={COLORS.purpleLight}
                textStyle={styles.buttonText}
                variant="filled"
                corners="curved"
                buttonStyle={styles.buttonStyle}
              />
              <Button
                text={t('requestDetailDelete.cancel')}
                onPress={() => info.close()}
                color={COLORS.purpleLight}
                textStyle={styles.buttonText}
                variant="filled"
                corners="curved"
                textColor={COLORS.purpleLight}
                buttonStyle={styles.buttonOutlineStyle}
              />
            </View>
            <View style={styles.rewardTextMain}>
              <Text style={styles.rewardText}>
                במקרה של ביטול מועמדות למשימה פחות מ-24 שעות לפני תחילתה תילקח
                עמלה ע"ס %20 מתגמול המשימה
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default RequestDeleteModal;

const styles = StyleSheet.create({
  modalMain: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: COLORS.lightPurple,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headerText: {
    alignItems: 'center',
    paddingVertical: 5,
  },
  headerTextStyle: {
    fontWeight: '300',
    fontSize: 22,
  },
  headerTitleStyle: {
    fontWeight: '500',
    fontSize: 18,
  },
  contentMain: {
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  textWrap: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  textMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    //marginRight: -10,
    //paddingRight: 3,
    //flexWrap: 'nowrap'
  },
  valuesText: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 10,
    color: COLORS.black,
    textAlign: 'left',
  },
  buttonMain: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonStyle: {
    width: '47%',
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  buttonOutlineStyle: {
    width: '47%',
    //paddingVertical: 12,
    backgroundColor: COLORS.transparent,
  },
  buttonText: {
    fontWeight: '300',
  },
  rewardTextMain: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  rewardText: {
    color: COLORS.error,
    fontWeight: '300',
    fontSize: 14,
    textAlign: 'center',
  },
});

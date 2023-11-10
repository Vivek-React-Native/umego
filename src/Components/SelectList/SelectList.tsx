import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {COLORS} from '../../Constants/colors';
import {Categories} from '../../Constants/hardCodedData';
import Modal from 'react-native-modal';
import {t} from 'i18next';

type Props = {
  label: string;
  onSelect: (value: any) => void;
  dataSource: any[];
  displayValue: string;
  error?: boolean;
  loading?: boolean;
};

const SelectList: React.FC<Props> = React.memo(
  ({label, onSelect, dataSource, displayValue, error, loading}: Props) => {
    const [value, setValue] = useState(dataSource[0]);
    const [isSelected, setIsSelected] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const containerScale = useRef(new Animated.Value(0)).current;
    const handleOpenAnimation = () => {
      if (dataSource.length > 0) {
        setIsOpen(true);
        Animated.timing(containerScale, {
          useNativeDriver: true,
          duration: 300,
          easing: Easing.ease,
          toValue: 1,
        }).start();
      }
    };
    const handleCloseAnimation = () => {
      Animated.timing(containerScale, {
        useNativeDriver: true,
        duration: 300,
        easing: Easing.ease,
        toValue: 0,
        delay: 500,
      }).start();
      setTimeout(() => {
        setIsOpen(false);
      }, 750);
    };
    const handleSelection = (index: number) => {
      setIsSelected(index);
      onSelect(dataSource[index].name);
      setValue(dataSource[index].name);
      handleCloseAnimation();
    };
    return (
      <>
        <TouchableOpacity
          style={styles.selectListTrigger}
          onPress={handleOpenAnimation}>
          <View style={styles.labelAndValue}>
            {loading ? (
              <ActivityIndicator
                size={30}
                color={COLORS.black}
                style={styles.loading}
              />
            ) : (
              <>
                <Text
                  style={[
                    styles.label,
                    {color: error ? COLORS.error : COLORS.text},
                  ]}>
                  {label}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.value, {marginBottom: 5}]}>
                  {value ? value : t('selectCity')}
                </Text>
              </>
            )}
          </View>
          <Image
            source={require('../../Assets/Images/arrowDown.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        {isOpen && (
          // <Animated.View
          //   style={[
          //     styles.animatedContainer,
          //     {
          //       transform: [{ scale: containerScale }],
          //     },
          //   ]}>
          <Modal
            animationIn={'slideInUp'}
            animationOut="slideOutDown"
            backdropTransitionOutTiming={0}
            backdropTransitionInTiming={0}
            onBackdropPress={() => setIsOpen(false)}
            onBackButtonPress={() => setIsOpen(false)}
            isVisible={isOpen}>
            <View style={styles.modalContainer}>
              <FlatList
                data={dataSource}
                // nestedScrollEnabled={true}
                scrollEnabled={true}
                contentContainerStyle={{
                  backgroundColor: 'white',
                  width: '100%',
                  // height: '95%',
                  borderRadius: 10,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Pressable
                    style={[
                      styles.renderItem,
                      {
                        borderBottomWidth:
                          Categories.length - 1 !== index ? 1 : 0,
                      },
                    ]}
                    key={index}
                    onPress={() => handleSelection(index)}>
                    <TouchableOpacity
                      style={[
                        styles.outerCircle,
                        {
                          borderColor:
                            isSelected === index
                              ? COLORS.purpleMekabel
                              : COLORS.text,
                        },
                      ]}
                      onPress={() => handleSelection(index)}>
                      <TouchableOpacity
                        style={[
                          styles.innerCircle,
                          {
                            borderColor:
                              isSelected === index
                                ? COLORS.purpleLight
                                : COLORS.white,
                            backgroundColor:
                              isSelected === index
                                ? COLORS.purpleLight
                                : COLORS.white,
                          },
                        ]}
                        onPress={() => handleSelection(index)}
                      />
                    </TouchableOpacity>
                    <Text style={styles.displayValue}>
                      {item?.name ? item?.name : ''}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
            {/* </Animated.View> */}
          </Modal>
        )}
      </>
    );
  },
);

export default SelectList;

const styles = StyleSheet.create({
  selectListTrigger: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.disable,
    borderBottomWidth: 1,
    // paddingVertical: 10,
    paddingTop: 10,
    paddingHorizontal: 5,
    marginHorizontal: 1,
    // width: '95%',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  labelAndValue: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: COLORS.text,
    marginBottom: 5,
  },
  value: {
    marginBottom: -5,
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'left',
    marginRight: 10,
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: '50%',
  },
  animatedContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: 10,
    elevation: 2,
    zIndex: 5,
    height: '100%',
    width: '105%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  renderItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    padding: 7,
    borderBottomColor: COLORS.disable,
    alignSelf: 'center',
    marginTop: 10,
  },
  outerCircle: {
    borderRadius: 50,
    borderWidth: 1,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  innerCircle: {
    width: 17,
    height: 17,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  displayValue: {
    flexWrap: 'wrap',
    width: '75%',
    textAlign: 'left',
  },
  loading: {},
  flatlist: {
    backgroundColor: 'white',
    width: '100%',
    height: '95%',
    borderRadius: 10,
  },
  modalContainer: {
    // position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    // // shadowColor: COLORS.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    marginTop: 10,
    elevation: 2,
    // zIndex: 5,
    height: '100%',
    width: '105%',
    borderRadius: 10,
    alignSelf: 'center',
  },
});

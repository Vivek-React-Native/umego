import {
  Animated,
  Easing,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../Constants/colors';
type Props = {
  dataSource: any[];
  displayValue: string;
  loading?: boolean;
  onSelect: (value: any) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const AnimatedSelectList: React.FC<Props> = React.memo(
  ({dataSource, displayValue, loading, onSelect, isOpen, setIsOpen}: Props) => {
    const [value, setValue] = useState(dataSource[0]);
    const containerScale = useRef(new Animated.Value(0)).current;
    const [isSelected, setIsSelected] = useState(-1);
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
    useEffect(() => {
      if (isOpen) {
        handleOpenAnimation();
      }
    }, [isOpen]);

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
      onSelect(dataSource[index]);
      setValue(dataSource[index]);
      handleCloseAnimation();
    };
    return (
      isOpen && (
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{scale: containerScale}],
            },
          ]}>
          <FlatList
            data={dataSource}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.flatlist}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Pressable
                style={[
                  styles.renderItem,
                  {
                    borderBottomWidth: dataSource.length - 1 !== index ? 1 : 0,
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
                  {item[displayValue] ? item[displayValue] : ''}
                </Text>
              </Pressable>
            )}
          />
        </Animated.View>
      )
    );
  },
);

export default AnimatedSelectList;

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    zIndex: 5,
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
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
    fontFamily: 'Assistant-Medium',
  },
  flatlist: {
    backgroundColor: 'white',
    width: '85%',
    minHeight: '85%',
    borderRadius: 10,
    marginTop: '20%',
    paddingBottom: '25%',
  },
});

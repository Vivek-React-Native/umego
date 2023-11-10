import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback } from 'react';
import { COLORS } from '../../Constants/colors';
import { getWidth } from '../../Helpers/widthHeightHelpers';
import { useNavigation } from '@react-navigation/native';

type Props = {
  header: string;
  isHeaderBold?: boolean;
  headerColor?: string;
  subHeader?: string;
  isSubheaderBold?: boolean;
  subHeaderColor?: string;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>;
};

const ScreenHeader: React.FC<Props> = React.memo(
  ({
    header,
    headerColor = COLORS.purpleLight,
    isHeaderBold,
    subHeader,
    subHeaderColor = COLORS.text,
    isSubheaderBold,
    showBackButton = false,
    style,
  }: Props) => {
    const navigation = useNavigation();
    const goBack = useCallback(() => navigation.goBack(), []);
    return (
      <View style={[styles.headerContainer, style]}>
        <Text
          style={[
            styles.headerText,
            { color: headerColor, fontWeight: isHeaderBold ? 'bold' : 'normal' },
          ]}>
          {header}
        </Text>
        {subHeader && (
          <Text
            style={[
              styles.subText,
              { fontWeight: isSubheaderBold ? 'bold' : 'normal' },
            ]}>
            {subHeader}
          </Text>
        )}
        {showBackButton && (
          <TouchableOpacity style={styles.arrowRight} onPress={goBack}>
            <Image source={require('../../Assets/Images/ArrowRight.png')} />
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

export default ScreenHeader;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 7,
  },
  headerText: {
    alignSelf: 'center',
    fontSize: getWidth(25),
    fontFamily: 'Assistant-Medium',
    width: '80%',
    textAlign: 'center'
  },
  subText: {
    alignSelf: 'center',
    fontSize: getWidth(16),
    textAlign: 'center',
    fontFamily: 'Assistant-Medium',
    width: '75%',
  },
  arrowRight: {
    padding: 7,
    position: 'absolute',
    top: 8,
    alignSelf: 'flex-start',
    left: 10,
  },
});

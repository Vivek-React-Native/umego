import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../Constants/colors';

type Props = {
  onSelection: (value: boolean, name?: string) => void;
  text: string;
  selected: boolean;
  name?: string;
  boxStyle?: StyleProp<ViewStyle>;
};

const SelectBox: React.FC<Props> = ({
  selected,
  text,
  onSelection,
  name,
  boxStyle,
}: Props) => {
  const handleSelection = () => {
    onSelection(!selected, name);
  };

  return (
    <TouchableOpacity
      style={[
        boxStyle,
        styles.selectionContainer,
        {borderColor: selected ? COLORS.purpleNotnei : COLORS.disable},
      ]}
      onPress={handleSelection}>
      <Text style={{color: selected ? COLORS.purpleNotnei : COLORS.text}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectBox;

const styles = StyleSheet.create({
  selectionContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
});

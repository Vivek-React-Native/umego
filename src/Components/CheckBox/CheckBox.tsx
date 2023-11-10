import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS } from '../../Constants/colors';

type Props = {
  onChange: (value: boolean) => void;
};

const CheckBox: React.FC<Props> = React.memo(({ onChange }: Props) => {
  const [checked, setChecked] = useState(false);
  {
    /* </TouchableOpacity> */
  }
  useEffect(() => {
    onChange(checked);
  }, [checked]);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        checked ? { padding: 5 } : { padding: 10 },
        { backgroundColor: checked ? COLORS.purpleLight : COLORS.white },
      ]}
      onPress={handleChange}
    >
      {checked &&
        <Image
          style={{ height: 10, width: 10, alignItems: 'center', justifyContent: 'center', tintColor: 'white' }}
          source={require('../../Assets/Images/check.png')}
        />
      }
    </TouchableOpacity>
  );
});

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLORS.disable,
    padding: 5,
    borderRadius: 6,
  },
});

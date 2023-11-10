import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';


type Props = {
    rating: number;
    onRatingPress: Function;
    maxRating: Array<number>;
};


const CustomRatingBar: React.FC<Props> = ({
    rating,
    onRatingPress,
    maxRating
}) => {
    return (
        <View style={styles.customRatingBarStyle}>
            {maxRating.map((item, key) => {
                return (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={item}
                        style={{marginHorizontal: 2}}
                        onPress={() => onRatingPress(item, key)}>
                        <Image
                            style={styles.starImageStyle}
                            source={
                                item <= rating
                                    ? require('../../Assets/Images/star_filled.png')
                                    : require('../../Assets/Images/star_corner.png')
                            }
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
const styles = StyleSheet.create({
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row-reverse',
        // marginTop: 30,
    },
    starImageStyle: {
        width: 20,
        height: 20,
        resizeMode: 'cover',
    },
});
export default CustomRatingBar;

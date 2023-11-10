import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { COLORS } from '../../Constants/colors';

type ChatItem = {
  message: string;
  from: 'me' | 'them';
  date?: string;
};

type Props = {
  chatItem: ChatItem;
};

const ChatItem: React.FC<Props> = React.memo(({ chatItem }: Props) => {
  return (
    <View style={[chatItem.from === 'me' ? styles.chat : styles.chat2]}>
      {chatItem?.image.length == 0 ?
        <Text
          style={[chatItem.from === 'me' ? styles.chatText : styles.chatText2]}>
          {chatItem.message}
        </Text>
        :
        <>
          <Text
            style={[chatItem.from === 'me' ? styles.chatText : styles.chatText2]}>
            {chatItem.message}
          </Text>
          <Image
            resizeMode={'contain'}
            style={{ height: 150, width: 150 }}
            source={{
              uri: chatItem?.image[0]?.media?.media_file_url,
            }}
          />
        </>
      }
    </View>
  );
});

export default ChatItem;

const styles = StyleSheet.create({
  chat: {
    backgroundColor: COLORS.lightPurple,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'flex-start',
    marginVertical: 7,
    marginLeft: 10
  },
  chatText: {
    fontSize: 14,
    padding: 10,
    marginHorizontal: 5,
    fontFamily: 'Assistant-Medium',
  },
  chat2: {
    backgroundColor: COLORS.purpleNotnei,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: 'flex-end',
    marginVertical: 7,
  },
  chatText2: {
    color: COLORS.white,
    padding: 10,
    textAlign: 'left',
    marginHorizontal: 5,
    fontFamily: 'Assistant-Medium',
  },
});

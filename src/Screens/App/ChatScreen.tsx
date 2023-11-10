import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../Constants/AppStackParamList';
import {RouteProp} from '@react-navigation/native';
import {getWidthStr} from '../../Helpers/widthHeightHelpers';
import {COLORS} from '../../Constants/colors';
import {useTranslation} from 'react-i18next';
import Drawer from '../../Components/Drawer/Drawer';
import ChatList from '../../Components/ChatList/ChatList';
import Line from '../../Components/Line/Line';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import Loading from '../../Components/Loading/Loading';
import {paginationList} from '../../Redux/actions/chatActions';
import {useIsFocused} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'ChatScreen'>;
  route: RouteProp<AppStackParamList, 'ChatScreen'>;
};

const ChatScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {isFetchingChat, chatList} = useAppSelector(state => state.global);
  useEffect(() => {
    dispatch(
      paginationList({
        start: 0,
        length: 1000,
      }),
    );
  }, [isFocused]);

  return (
    <>
      {isFetchingChat && <Loading />}
      <Drawer style={{top: '5%'}} />
      <SafeAreaView>
        <ScreenHeader header={t('chatScreen.header')} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Line style={styles.line} />
          {chatList?.length > 0 ? (
            chatList.map((item, index) => {
              return (
                <ChatList
                  key={index}
                  card={{
                    image:
                      item?.last_msg?.receipent_details?.image?.media_file_url,
                    name: `${item.user_details.first_name} ${item.user_details.last_name}`,
                    lastMessage: item.last_msg.content,
                    time: item.last_msg.created_at,
                    itemCount: item.unseenmsg_count,
                  }}
                  onPress={() =>
                    navigation.navigate('ChatOpenConversationScreen', {
                      talkingWith: item,
                    })
                  }
                />
              );
            })
          ) : (
            <Text>{t('noData')}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  header: {},
  imageText: {
    color: COLORS.purpleLight,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
    // marginRight: -2,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: getWidthStr(10),
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 36,
    lineHeight: 39.6,
    color: COLORS.purpleLight,
  },
  line: {
    width: '95%',
    alignSelf: 'center',
    borderColor: COLORS.disable,
  },
});

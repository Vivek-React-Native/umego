import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from './AppStackParamList';
import {AuthStackParamList} from './AuthStackParamList';

export type RootStackParamList = CompositeNavigationProp<
  NativeStackNavigationProp<AppStackParamList>,
  NativeStackNavigationProp<AuthStackParamList>
>;

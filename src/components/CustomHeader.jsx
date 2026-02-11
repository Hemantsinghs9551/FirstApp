import { LucideChevronLeft } from 'lucide-react-native';
import React from 'react';
import { View, Text } from 'react-native';
import { goBack } from '../utils/NavigationUtils';

const CustomHeader = ({ title = '', goback }) => {
  return (
    <View className="flex-row justify-between bg-white pt-6 pb-4 px-4 items-center justify-center">
      {goback && <LucideChevronLeft size={27} onPress={goBack} />}
      <Text className="text-2xl font-medium text-gray-700 text-center">
        {title}
      </Text>
      <View/>
    </View>
  );
};

export default CustomHeader;

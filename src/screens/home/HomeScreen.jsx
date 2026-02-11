import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../service/productApi';
import ProductCard from '../../components/ProductCard';
import { navigate } from '../../utils/NavigationUtils';
import CustomHeader from '../../components/CustomHeader';

const HomeScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <>
      <CustomHeader title="Dashboard" />
      <View className="flex-1 bg-gray-100 px-2">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={data?.products}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  product={item}
                  onPress={() => navigate('productDetails', { id: item?.id })}
                />
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default HomeScreen;

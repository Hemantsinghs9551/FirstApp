import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { useShopStore } from '../../store/useShopStore';
import CustomHeader from '../../components/CustomHeader';

const WishlistScreen = () => {
  const { wishlist, toggleWishlist, addToCart } = useShopStore();

  if (wishlist.length === 0) {
    return (
      <>
        <CustomHeader title="Wishlist" />
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="mt-4 text-lg font-semibold text-gray-600">
            No Data Found
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <CustomHeader title="Wishlist" />
      <View className="flex-1 bg-gray-100 p-3">
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl mb-3 flex-row p-3 shadow-sm">
              <Image
                source={{ uri: item.thumbnail }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />

              <View className="flex-1 ml-3 justify-between">
                <View>
                  <Text className="font-bold text-gray-900">{item.brand}</Text>
                  <Text
                    numberOfLines={1}
                    className="text-sm text-gray-500 mt-1"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-base font-semibold mt-2">
                    ₹{item.price}
                  </Text>
                </View>

                <View className="flex-row justify-between mt-3">
                  <TouchableOpacity
                    onPress={() => toggleWishlist(item)}
                    className="flex-row items-center"
                  >
                    <Heart size={18} color="red" fill="red" />
                    <Text className="ml-1 text-sm text-red-500">Remove</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      addToCart(item);
                      toggleWishlist(item);
                    }}
                    className="flex-row items-center"
                  >
                    <ShoppingCart size={18} color="#E91E63" />
                    <Text className="ml-1 text-sm text-pink-600 font-medium">
                      Move to Bag
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default WishlistScreen;

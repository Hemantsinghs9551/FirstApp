import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { useShopStore } from '../../store/useShopStore';
import CustomHeader from '../../components/CustomHeader';

const CartScreen = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useShopStore();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <>
        <CustomHeader title="Cart" />
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
      <CustomHeader title="Cart" />
      <View className="flex-1 bg-gray-100">
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 12, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl mb-3 p-3 shadow-sm">
              <View className="flex-row">
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-24 h-24 rounded-lg"
                  resizeMode="cover"
                />

                <View className="flex-1 ml-3 justify-between">
                  <View>
                    <Text className="font-bold text-gray-900">
                      {item.brand}
                    </Text>
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

                  <View className="flex-row items-center mt-3">
                    <TouchableOpacity
                      onPress={() => decreaseQty(item.id)}
                      className="border border-gray-300 p-1 rounded-md"
                    >
                      <Minus size={16} />
                    </TouchableOpacity>

                    <Text className="mx-3 font-semibold">{item.quantity}</Text>

                    <TouchableOpacity
                      onPress={() => increaseQty(item.id)}
                      className="border border-gray-300 p-1 rounded-md"
                    >
                      <Plus size={16} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      className="ml-auto"
                    >
                      <Trash2 size={18} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
          <View className="flex-row justify-between mb-2">
            <Text className="text-base font-medium">Total Amount</Text>
            <Text className="text-lg font-bold">₹{totalAmount.toFixed(2)}</Text>
          </View>

          <TouchableOpacity className="bg-pink-600 py-3 rounded-lg items-center">
            <Text className="text-white font-semibold text-base">
              PROCEED TO CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CartScreen;

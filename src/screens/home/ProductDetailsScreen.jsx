import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../service/productApi';
import { Star, Heart, Truck, ShieldCheck } from 'lucide-react-native';
import { useShopStore } from '../../store/useShopStore';
import { navigate } from '../../utils/NavigationUtils';
import CustomHeader from '../../components/CustomHeader';
const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const { addToCart, toggleWishlist, isInWishlist } = useShopStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
  const liked = isInWishlist(data?.id);
  const [clicked, setClicked] = useState(false);
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Something went wrong</Text>
      </View>
    );
  }

  const originalPrice = Math.round(
    data.price + (data.price * data.discountPercentage) / 100,
  );

  return (
    <View className="flex-1 bg-gray-100">
      <CustomHeader title="Product Detail" goback={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={index => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{ width: width, height: 350 }}
              resizeMode="contain"
            />
          )}
        />

        <View className="bg-white p-4">
          <Text className="text-lg font-bold text-gray-900">{data.brand}</Text>

          <Text className="text-sm text-gray-600 mt-1">{data.title}</Text>

          <View className="flex-row items-center mt-2">
            <View className="flex-row items-center bg-green-600 px-2 py-1 rounded">
              <Text className="text-white text-xs mr-1">{data.rating}</Text>
              <Star size={12} color="white" fill="white" />
            </View>
            <Text className="text-xs text-gray-500 ml-2">
              ({data.reviews.length} Reviews)
            </Text>
          </View>

          <View className="flex-row items-center mt-3">
            <Text className="text-2xl font-bold text-gray-900">
              ${data.price}
            </Text>
            <Text className="text-sm text-gray-400 line-through ml-3">
              ${originalPrice}
            </Text>
            <Text className="text-sm text-orange-500 ml-3 font-semibold">
              {data.discountPercentage}% OFF
            </Text>
          </View>

          <Text className="text-green-600 text-sm mt-1">
            Inclusive of all taxes
          </Text>

          <Text className="text-sm mt-2 text-green-700 font-medium">
            {data.availabilityStatus}
          </Text>
        </View>

        <View className="bg-white mt-2 p-4">
          <View className="flex-row items-center mb-3">
            <Truck size={18} color="black" />
            <Text className="ml-2 text-sm">{data.shippingInformation}</Text>
          </View>

          <View className="flex-row items-center">
            <ShieldCheck size={18} color="black" />
            <Text className="ml-2 text-sm">{data.warrantyInformation}</Text>
          </View>
        </View>

        <View className="bg-white mt-2 p-4">
          <Text className="font-semibold text-base mb-2">Product Details</Text>
          <Text className="text-sm text-gray-600">{data.description}</Text>
        </View>

        <View className="bg-white mt-2 p-4">
          <Text className="font-semibold text-base mb-2">Dimensions</Text>
          <Text className="text-sm text-gray-600">
            Width: {data.dimensions.width} cm
          </Text>
          <Text className="text-sm text-gray-600">
            Height: {data.dimensions.height} cm
          </Text>
          <Text className="text-sm text-gray-600">
            Depth: {data.dimensions.depth} cm
          </Text>
          <Text className="text-sm text-gray-600 mt-2">
            Weight: {data.weight} kg
          </Text>
        </View>

        <View className="bg-white mt-2 p-4 mb-20">
          <Text className="font-semibold text-base mb-3">Customer Reviews</Text>

          {data?.reviews.map((review, index) => (
            <View key={index} className="mb-3">
              <View className="flex-row items-center mb-1">
                <Star size={14} color="#16A34A" fill="#16A34A" />
                <Text className="ml-1 text-sm font-medium">
                  {review.rating}
                </Text>
              </View>
              <Text className="text-sm text-gray-700">{review.comment}</Text>
              <Text className="text-xs text-gray-400 mt-1">
                {review.reviewerName}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 flex-row justify-between items-center border-t border-gray-200">
        <TouchableOpacity
          className="border border-gray-400 px-6 py-3 rounded-lg flex-row gap-2"
          onPress={() => toggleWishlist(data)}
        >
          <Text className="font-semibold">WISHLIST</Text>
          <Heart
            size={22}
            color={liked ? 'red' : 'black'}
            fill={liked ? 'red' : 'none'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-pink-600 px-8 py-3 rounded-lg"
          onPress={() => {
            if (clicked) {
              navigate('cartScreen');
            } else {
              addToCart(data);
              setClicked(true);
            }
          }}
        >
          <Text className="text-white font-semibold">
            {clicked ? 'GO TO BAG' : 'ADD TO BAG'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;

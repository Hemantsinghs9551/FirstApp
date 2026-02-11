import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Heart, Star } from 'lucide-react-native';
import { useShopStore } from '../store/useShopStore';

const ProductCard = ({ product, onPress }) => {
  const discountPercentage = product?.discountPercentage || 0;

  const originalPrice = Math.round(
    product.price + (product.price * discountPercentage) / 100,
  );

  const { toggleWishlist, isInWishlist } = useShopStore();

  const liked = isInWishlist(product?.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl m-2 flex-1 overflow-hidden shadow-sm"
      activeOpacity={0.9}
    >
      <View className="relative">
        <View style={{ width: 100, height: 100 }}>
          <Image
            source={{ uri: product?.thumbnail }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        {/* Rating */}
        <View className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-full flex-row items-center">
          <Text className="text-xs font-semibold text-gray-800 mr-1">
            {product.rating}
          </Text>
          <Star size={12} color="#FACC15" fill="#FACC15" />
        </View>

        {/* Wishlist Button */}
        <TouchableOpacity
          onPress={() => toggleWishlist(product)}
          className="absolute top-2 right-2 bg-white p-2 rounded-full"
        >
          <Heart
            size={16}
            color={liked ? 'red' : '#111'}
            fill={liked ? 'red' : 'none'}
          />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className="text-sm font-bold text-gray-900">{product.brand}</Text>

        <Text numberOfLines={1} className="text-xs text-gray-500 mt-1">
          {product.title}
        </Text>

        <View className="flex-row items-center mt-2 flex-wrap">
          <Text className="text-base font-bold text-gray-900">
            ${product.price}
          </Text>

          <Text className="text-xs text-gray-400 line-through ml-2">
            ${originalPrice}
          </Text>

          <Text className="text-xs text-orange-500 ml-2 font-semibold">
            {discountPercentage}% OFF
          </Text>
        </View>

        <Text className="text-xs text-green-600 mt-1">
          Best Price ${product.price} with coupon
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

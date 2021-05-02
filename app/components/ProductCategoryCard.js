// @ts-nocheck
import React from "react";
import { TouchableNativeFeedback, Text, Image, View } from "react-native";
import { useThemeContext } from "../helpers/AppProvider";

const ProductCategoryCard = ({ navigation, category }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() =>
        navigation.navigate("Products", {
          category: category,
        })
      }
    >
      <View
        style={{
          width: "30%",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: category.mainImage }}
        />
        <Text
          style={{
            fontFamily: "Cairo-Regular",
            fontSize: 15,
            marginTop: 10,
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {category.title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default ProductCategoryCard;

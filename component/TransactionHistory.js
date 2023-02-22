import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import {
  dummyData,
  icons,
  images,
  theme,
  COLORS,
  SIZES,
  FONTS,
} from "../constants";
import { FlatList } from "react-native-gesture-handler";

const TransactionHistory = ({ history, customContainerStyle }) => {
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SIZES.base,
      }}
    >
      <Image
        source={icons.transaction}
        style={{ width: 20, height: 20, tintColor: COLORS.secondary }}
      />

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h3 }}>{item.description}</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.gray }}>
          {item.currency}
        </Text>
      </View>

      <View
        style={{ flexDirection: "row", height: "100%", alignItems: "center" }}
      >
        <Text
          style={{
            ...FONTS.h3,
            color: item.type === "B" ? COLORS.green : COLORS.black,
          }}
        >
          {item.amount} BTC
        </Text>
        <Image
          source={icons.right_arrow}
          style={{ width: 20, height: 20, tintColor: COLORS.gray }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        color: COLORS.white,
        ...customContainerStyle,
        padding: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <Text style={{ ...FONTS.h2 }}>Transaction History</Text>
      <FlatList
        contentContainerStyle={{ marginTop: SIZES.radius }}
        renderItem={renderItem}
        scrollEnabled={false}
        data={history}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: COLORS.lightGray,
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          );
        }}
      />
    </View>
  );
};

export default TransactionHistory;

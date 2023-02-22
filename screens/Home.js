import React, { useState } from "react";

import { PriceAlert, TransactionHistory } from "../component";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";

import {
  dummyData,
  icons,
  images,
  theme,
  COLORS,
  SIZES,
  FONTS,
} from "../constants";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation=useNavigation();
 

  const [trending, setTrending] = useState(dummyData.trendingCurrencies);
  const [transactionHistory, settransactionHistory] = useState(
    dummyData.transactionHistory
  );

  function renderHeader() {
    const renderItem = ({ item, index }) => (
      <TouchableOpacity
        style={{
          width: 180,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          marginLeft: index == 0 ? SIZES.padding : 0,
          marginRight: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.white,
        }}
        onPress={()=>navigation.navigate("CryptoDetail",{
          currency:item
        })}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={item.image}
              resizeMode="cover"
              style={{
                marginTop: 5,
                width: 25,
                height: 25,
              }}
            />
          </View>
          <View style={{ marginLeft: SIZES.base }}>
            <Text style={{ ...FONTS.h2 }}>{item.currency}</Text>
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>{item.code}</Text>
          </View>
        </View>

        <View style={{ marginLeft: SIZES.base, marginTop: 5 }}>
          <Text style={{ ...FONTS.h2 }}>{item.amount}</Text>
          <Text
            style={{
              ...FONTS.h3,
              color: item.type == "I" ? COLORS.green : COLORS.red,
            }}
          >
            {item.changes}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={{ width: "100%", height: 290, ...styles.shadow }}>
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={{ flex: 1, alignItems: "center" }}
        >
          <View
            style={{
              marginTop: SIZES.padding * 2,
              alignItems: "flex-end",
              paddingHorizontal: SIZES.padding,
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>
          {/*Balances*/}
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.white,
                fontFamily: "Roboto-Black",
              }}
            >
              {" "}
              Your Portfolio Balances
            </Text>
            <Text
              style={{
                ...FONTS.h1,
                color: COLORS.white,
                fontFamily: "Roboto-Black",
                marginTop: SIZES.base,
              }}
            >
              ${dummyData.portfolio.balance}
            </Text>
            <Text
              style={{
                ...FONTS.body5,
                color: COLORS.white,
              }}
            >
              {dummyData.portfolio.changes} Last for 24 hrs
            </Text>
          </View>

          {/* Beyaz Kutular*/}

          <View
            style={{
              position: "absolute",
              bottom: "-30%",
            }}
          >
            <Text
              style={{
                marginLeft: SIZES.padding,
                color: COLORS.white,
                ...FONTS.h2,
              }}
            >
              Trending
            </Text>
            <FlatList
              contentContainerStyle={{ marginTop: SIZES.base }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  function renderAlert() {
    return <PriceAlert />;
  }

  function renderNotice() {
    return (
      <View
        style={{
          padding: 20,
          marginTop: SIZES.padding,
          backgroundColor: COLORS.secondary,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}>
          Investing Safety
        </Text>
        <Text
          style={{
            lineHeight: 18,
            ...FONTS.body4,
            marginTop: SIZES.base,
            color: COLORS.white,
          }}
        >
          it is very difficult to time an investment,especially whe the markes
          is volatile.Learn how to ue dollar cost averaging to your advantage
        </Text>
        <TouchableOpacity
          style={{ marginTop: SIZES.base }}
          onPress={() => console.warn("Learn More")}
        >
          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.green,
              textDecorationLine: "underline",
            }}
          >
            Learn More
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTransactionHistory() {
    return (
      <TransactionHistory
        history={transactionHistory}
        customContainerStyle={{ ...styles.shadow }}
      />
    );
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingBottom: 130 }}>
        {renderHeader()}
        {renderAlert()}
        {renderNotice()}
        {renderTransactionHistory()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});

export default Home;

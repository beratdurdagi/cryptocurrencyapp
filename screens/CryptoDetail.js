import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";

import { VictoryCustomTheme } from "../styles";

import { HeaderBar, CurrencyLabel, PriceAlert } from "../component";
import { COLORS, SIZES, FONTS } from "./../constants/theme";
import {
  VictoryScatter,
  VictoryLine,
  VictoryChart,
  VictoryAxis,
} from "victory-native";
import { dummyData, icons } from "../constants";
import TextButton from "./../component/TextButton";

const CryptoDetail = ({ route, navigation }) => {
  const [selectedCurrency, setSelectedCurrency] = React.useState(null);

  const [chartOptions, setChartOptions] = React.useState(
    dummyData.chartOptions
  );
  const [selectedOption, setSelectedOption] = React.useState(chartOptions[0]);

  const scrollX = new Animated.Value(0);
  const numberOfCharts = [1, 2, 3];

  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  }, []);

  function optionOnclickHandler(option) {
    setSelectedOption(option);
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30, marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {numberOfCharts.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.gray, COLORS.primary, COLORS.gray],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              ></Animated.View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderChart() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          alignItems: "center",
          borderRadius: SIZES.radius,
          ...styles.shadow,
          backgroundColor: COLORS.white,
        }}
      >
        {/*Header*/}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View style={{ flex: 1 }}>
            <CurrencyLabel
              icon={selectedCurrency?.image}
              currency={selectedCurrency?.currency}
              code={selectedCurrency?.code}
            />
          </View>
          <View>
            <Text style={{ ...FONTS.h3 }}>{selectedCurrency?.amount}</Text>
            <Text
              style={{
                ...FONTS.body3,
                color:
                  selectedCurrency?.type == "I" ? COLORS.green : COLORS.red,
              }}
            >
              {selectedCurrency?.changes}
            </Text>
          </View>
        </View>

        {/*Chart*/}

        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          snapToInterval={SIZES.width - 40}
          decelerationRate={0}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          showsHorizontalScrollIndicator={false}
        >
          {numberOfCharts.map((item, index) => (
            <View
              key={`chart-${index}`}
              style={{
                marginLeft: index == 0 ? SIZES.padding : 0,
              }}
            >
              <View style={{ marginTop: -25 }}>
                <VictoryChart
                  theme={VictoryCustomTheme}
                  height={220}
                  width={SIZES.width - 40}
                >
                  <VictoryLine
                    style={{
                      data: {
                        stroke: COLORS.secondary,
                      },
                      parent: {
                        border: "1PX SOLİD #ccc",
                      },
                    }}
                    data={selectedCurrency?.chartData}
                    categories={{
                      x: ["15 MIN", "30 MIN", "45 MIN", "60 MIN"],
                      y: ["15", "30", "45"],
                    }}
                  />
                  <VictoryScatter
                    data={selectedCurrency?.chartData}
                    size={7}
                    style={{
                      data: {
                        fill: COLORS.secondary,
                      },
                    }}
                  />
                  <VictoryAxis
                    style={{
                      axis: {
                        stroke: "transparent",
                      },
                    }}
                  />

                  <VictoryAxis
                    dependentAxis
                    style={{
                      axis: {
                        stroke: "transparent",
                      },
                      grid: {
                        stroke: "grey",
                      },
                    }}
                  />
                </VictoryChart>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {/*options*/}

        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.padding,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {chartOptions.map((option) => (
            <TextButton
              key={`option-${option.id}`}
              label={option.label}
              customContainerStyle={{
                height: 30,
                width: 60,
                borderRadius: 15,
                backgroundColor:
                  selectedOption.id == option.id
                    ? COLORS.primary
                    : COLORS.lightGray,
              }}
              customLabelStyle={{
                color:
                  selectedOption.id == option.id ? COLORS.white : COLORS.gray,
                ...FONTS.body5,
              }}
              onPress={() => optionOnclickHandler(option)}
            />
          ))}
        </View>

        <View>{renderDots()}</View>
        {/*dot*/}
      </View>
    );
  }

  function renderBuy(
  ){
    return (
      <View style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.radius,
       padding:SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...styles.shadow,
    }}>

      <View style={{flexDirection:'row',alignItems:'center',marginBottom:SIZES.radius,justifyContent:'space-between'}}>
        {/*currency*/}
        <CurrencyLabel icon={selectedCurrency?.image} code={selectedCurrency?.code} currency={`${selectedCurrency?.currency} Wallet`}/>
        
        {/*amount*/}
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={{marginRight:SIZES.base}}>
            <Text style={{...FONTS.h3}}>${selectedCurrency?.wallet.value}</Text>
            <Text  style={{ ...FONTS.body4, color: COLORS.gray }}> {selectedCurrency?.wallet.crypto}
            {selectedCurrency?.code}</Text>
          </View>

          <Image source={icons.right_arrow} style={{ width: 25, height: 25, marginTop: 5 }}/>

        </View>
      </View>

      <TextButton label={'Buy'} onPress={()=>navigation.navigate('Transaction',{currency:selectedCurrency})}/>

    </View>
    )

  }

  function renderNotice() {
    return (
      <View
        style={{
          padding: SIZES.padding,
          marginTop: SIZES.padding,
          backgroundColor: COLORS.white,
          marginHorizontal: SIZES.base,
          borderRadius: SIZES.radius,
          ...styles.shadow,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>
         {selectedCurrency?.currency}
        </Text>
        <Text
          style={{
           
            ...FONTS.body3,
            marginTop: SIZES.base,
            color: COLORS.black,
          }}
        >
          {selectedCurrency?.description}
        </Text>
       
      </View>
    );
  }

  function renderPrice(){
    return(
      <PriceAlert customContainerStyle={{marginTop:SIZES.padding,marginHorizontal:SIZES.radius}}/>
    )
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightGray1,
        marginTop: SIZES.padding * 2,
        flex: 1,
      }}
    >
      <HeaderBar right={true} />

      <ScrollView style={{ flex: 1, paddingBottom: SIZES.padding }}>
        {renderChart()}
        {renderBuy()}
        {renderNotice()}
        {renderPrice()} 
        </ScrollView>
    </SafeAreaView>
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

export default CryptoDetail;

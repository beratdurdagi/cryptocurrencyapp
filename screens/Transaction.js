import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";

import {
  HeaderBar,
  CurrencyLabel,
  TransactionHistory,
  TextButton,
} from "../component";
import { SIZES, COLORS, dummyData, FONTS } from "../constants";


const Transaction = ({ route }) => {
    const [selectedCurrency, setSelectedCurrency] = React.useState(null);
  React.useEffect(() => {
    const { currency } = route.params;
    setSelectedCurrency(currency);
  }, []);

  function renderTrade() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
          ...styles.shadow,
          padding: SIZES.padding,
          borderRadius: SIZES.radius,
        }}
      >
        <CurrencyLabel
          currency={selectedCurrency?.currency}
          code={selectedCurrency?.code}
          icon={selectedCurrency?.image}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: SIZES.padding,
            marginBottom: SIZES.padding * 1.5,
          }}
        >
         <Text style={{...FONTS.h2}}>${selectedCurrency?.wallet.crypto} {selectedCurrency?.code}</Text>   
          <Text style={{color:COLORS.gray,...FONTS.body4}}>${selectedCurrency?.wallet.value}</Text>

        </View>

        <TextButton label={'Buy'} />
      </View>
    );
  }

  
  return (
    <SafeAreaView style={{ flex: 1, marginTop: SIZES.padding * 2 }}>
      <HeaderBar right={false} />
      <ScrollView style={{ flex: 1, paddingBottom: SIZES.padding }}>
        {renderTrade()}
        <TransactionHistory history={selectedCurrency?.transactionHistory}/>
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

export default Transaction;

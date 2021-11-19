import React from "react";
import { View, Text, Image, NativeBaseProvider, Pressable } from "native-base";
import "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";

import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  const backgroundColor = selected ? "#fff" : "rgba(0, 0, 0, 0.3)";
  return <View size={2} bg={backgroundColor} mx={3} rounded="full" />;
};

const Skip = ({ ...props }) => (
  <Pressable mx={5} {...props}>
    <View
      size={16}
      bg="rgba(0, 0, 0, 0.3)"
      alignItems="center"
      justifyContent="center"
      rounded="full"
    >
      <MaterialCommunityIcons name="skip-next" size={35} color="#fff" />
    </View>
  </Pressable>
);

const Next = ({ ...props }) => (
  <Pressable mx={5} {...props}>
    <View
      size={16}
      bg="rgba(0, 0, 0, 0.3)"
      alignItems="center"
      justifyContent="center"
      rounded="full"
    >
      <Entypo name="arrow-right" size={35} color="#fff" />
    </View>
  </Pressable>
);

const Done = ({ ...props }) => (
  <Pressable mx={5} {...props}>
    <View
      size={16}
      bg="rgba(0, 0, 0, 0.3)"
      alignItems="center"
      justifyContent="center"
      rounded="full"
    >
      <Entypo name="check" size={35} color="#fff" />
    </View>
  </Pressable>
);

const LandingPage = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        bottomBarHeight={100}
        bottomBarHighlight={false}
        onSkip={() => navigation.replace("Home")}
        onDone={() => navigation.navigate("Home")}
        pages={[
          {
            backgroundColor: "#fdeb93",
            image: (
              <Image
                size={270}
                source={require("../assets/icons/hotel1.png")}
                alt="image3"
              />
            ),
            title: "GREAT DEALS",
            titleStyles: { fontWeight: "bold", fontSize: 30 },
            subTitleStyles: { marginHorizontal: 20, lineHeight: 25 },
            subtitle:
              " Find exclusive deals on the best hotels. Hotel, resort, motel, apartment, villa & vacation rental with no fees. Best Price Guarantee. Easy and Secure Payment. Pay at the Hotel. Free Cancellation!",
          },

          {
            backgroundColor: "#fca5a5",
            image: (
              <Image
                size={250}
                source={require("../assets/icons/landscape.png")}
                alt="image3"
              />
            ),
            title: "GO EXPLORING",
            titleStyles: { fontWeight: "bold", fontSize: 30 },
            subTitleStyles: { marginHorizontal: 20, lineHeight: 25 },
            subtitle:
              " We offer a wide range of properties in over the country. Feel free to let us guide you through wonder by wonder. Enjoy!",
          },
          {
            backgroundColor: "#fde68a",
            image: (
              <Image
                size={270}
                source={require("../assets/icons/luggage.png")}
                alt="image1"
              />
            ),
            title: "ENJOY",
            titleStyles: { fontWeight: "bold", fontSize: 30 },
            subTitleStyles: { marginHorizontal: 20, lineHeight: 25 },
            subtitle:
              " We offer unbelievable convenient and easiest way for you to take your luggage and go for a trip!",
          },
        ]}
      />
    </NativeBaseProvider>
  );
};

export default LandingPage;

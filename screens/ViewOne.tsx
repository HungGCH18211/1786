import React, { useState } from "react";
import {
  NativeBaseProvider,
  Text,
  View,
  Pressable,
  HStack,
  Image,
  Avatar,
  VStack,
  ScrollView,
} from "native-base";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const ViewOne = ({ navigation, route }) => {
  return (
    <NativeBaseProvider>
      <View>
        <Image
          source={{
            uri: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg",
          }}
          alt="Alternate Text"
          width={400}
          height={300}
          borderBottomRadius={30}
        />
        <View position="absolute">
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <View mt={4} mx={2}>
              <AntDesign name="back" size={30} color="black" />
            </View>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View mt={3} mb={2} mx={2} rounded={20} bg="#fff">
          <HStack
            alignItems="center"
            mx={2}
            my={2}
            justifyContent="space-between"
          >
            <HStack alignItems="center">
              <Avatar.Group size="md" max={3}>
                <Avatar
                  bg="green.500"
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg",
                  }}
                >
                  SS
                </Avatar>
                <Avatar
                  bg="lightBlue.500"
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
                  }}
                >
                  AK
                </Avatar>
                <Avatar
                  bg="indigo.500"
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1352844693151731713/HKO7cnlW_400x400.jpg",
                  }}
                >
                  RS
                </Avatar>
                <Avatar
                  bg="amber.600"
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1320985200663293952/lE_Kg6vr_400x400.jpg",
                  }}
                >
                  MR
                </Avatar>
                <Avatar
                  bg="emerald.600"
                  source={{
                    uri: "https://bit.ly/code-beast",
                  }}
                >
                  CB
                </Avatar>
                <Avatar
                  bg="blue.600"
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg",
                  }}
                >
                  GG
                </Avatar>
              </Avatar.Group>
              <Text color="#737b8b">Love this place</Text>
            </HStack>
            <View
              rounded={30}
              size={10}
              bg="#fb7185"
              alignItems="center"
              justifyContent="center"
              right="0"
            >
              <AntDesign name="heart" size={20} color="white" />
            </View>
          </HStack>
        </View>
        <View mt={1} mb={2} mx={2} rounded={20} bg="#fff">
          <VStack m={2}>
            <Text fontSize={34} fontWeight={600}>
              {route.params.property}
            </Text>
            <Text fontSize={18} fontWeight={600} color="#2563eb" my={3}>
              $ {route.params.price}.00
              <Text color="#737b8b">/night</Text>
            </Text>
            {route.params.note.length > Number(20) ? (
              <Text lineHeight={25}>{route.params.note}</Text>
            ) : (
              <Text lineHeight={25} color="#737b8b">
                Located 600 metres from Puerta del Sol in Madrid, this
                air-conditioned apartment features a balcony with city views.
                The unit is 600 metres from Plaza Mayor. Free WiFi is featured
                throughout the property. Museo del Prado is 800 metres from Sol
                Vintage & Colorful Apartment, while Fnac is 800 metres away. The
                nearest airport is Adolfo Suarez Madrid-Barajas Airport, 14 km
                from the property.
              </Text>
            )}
            <HStack
              px={2}
              py={4}
              my={4}
              rounded={15}
              bg="#f2f2f2"
              justifyContent="space-evenly"
            >
              <VStack alignItems="center">
                <Ionicons name="bed" size={24} color="#737b8b" />
                <Text>{route.params.bed}</Text>
              </VStack>
              <VStack alignItems="center">
                <MaterialCommunityIcons
                  name="table-chair"
                  size={24}
                  color="#737b8b"
                />
                {route.params.type ? (
                  <Text>{route.params.type}</Text>
                ) : (
                  <Text color="#2563eb">None</Text>
                )}
              </VStack>
              <VStack alignItems="center">
                <FontAwesome name="user" size={24} color="#737b8b" />
                <Text>{route.params.reporter}</Text>
              </VStack>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ViewOne;

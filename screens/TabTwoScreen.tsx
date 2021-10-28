import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  Center,
  View,
  Fab,
  Heading,
  Icon,
  Pressable,
  Stack,
  VStack,
  HStack,
  Image,
  Input,
} from "native-base";
import { FlatList, Alert, LogBox } from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import navigation from "../navigation";

const TabTwoScreen = ({ navigation }) => {
  const db = SQLite.openDatabase("dbProperty");
  const [property, setProperty] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = () => {
    setSearchResult(
      property.filter((obj) => {
        return (
          obj.property_type === searchValue ||
          obj.reporter === searchValue ||
          obj.property_id === Number(searchValue) ||
          obj.price === searchValue
        );
      })
    );
    Logic();
  };

  const Logic = () => {
    if (!searchValue || searchResult.length === 0) {
      setShowSearch(false);
      setShowAll(true);
    } else {
      setShowSearch(true);
      setShowAll(false);
    }
  };

  useEffect(() => {
    readData();
    handleChange();
    // Logic();
    LogBox.ignoreLogs([
      "The contrast ratio of 1:1 for darkText on transparent",
    ]);
  }, []);

  const readData = () => {
    Logic();
    setShowAll(true);
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Property_Table", [], (tx, results) => {
        var arr = [];
        for (let i = 0; i < results.rows.length; ++i)
          arr.push(results.rows.item(i));
        console.log("Array:", arr);
        setProperty(arr);
      });
    });
  };

  const deleteProperty = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM Property_Table where property_id=?",
        [id],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert("Done", "Delete property successfully!"),
              [
                {
                  text: "Ok",
                  onPress: () => readData(),
                },
              ];
          }
        }
      );
    });
  };

  const editProperty = (
    id,
    property,
    bed,
    date,
    type,
    note,
    price,
    reporter
  ) => {
    navigation.navigate("EditProperty", {
      id: id,
      property: property,
      date: date,
      type: type,
      bed: bed,
      price: price,
      reporter: reporter,
      note: note,
    });
  };

  const Item = ({ item }) => (
    <Pressable onPress={() => {}}>
      <Stack mb={5} mx={2} rounded={15} bg="#fff" shadow={2}>
        <VStack p={3}>
          <Image
            source={{
              uri: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg",
            }}
            alt="Alternate Text"
            width={400}
            height={250}
            rounded={15}
          />
          <Text color="#2563eb" fontSize={16}>
            # {item.property_id}
          </Text>
          <Heading mb={2} size="lg">
            {item.property_type}
          </Heading>
          <HStack>
            <AntDesign name="star" size={20} color="#facc15" />
            <AntDesign name="star" size={20} color="#facc15" />
            <AntDesign name="star" size={20} color="#facc15" />
            <AntDesign name="star" size={20} color="#facc15" />
            <AntDesign name="star" size={20} color="#facc15" />
            <Text color="#737b8b" ml={2}>
              (34 reviews)
            </Text>
          </HStack>

          <HStack alignItems="center">
            <Text color="#737b8b" my={1}>
              Bedrooms: {item.bedrooms}{" "}
            </Text>
            <AntDesign name="checkcircle" size={15} color="#4ade80" />
          </HStack>
          {item.furniture_type === "" ? (
            <Text color="#737b8b" mb={1}>
              Furniture: <Text color="#2563eb">None</Text>
            </Text>
          ) : (
            <Text color="#737b8b" mb={1}>
              Furniture: {item.furniture_type}
            </Text>
          )}

          <Text color="#737b8b" mb={1}>
            Created at: {item.date.substring(0, 10)}{" "}
          </Text>
          <HStack alignItems="center" mb={1}>
            <MaterialIcons name="notes" size={18} color="#2563eb" />
            {item.notes === "" ? (
              <Text color="#737b8b" mb={1} ml={1}>
                Notes: <Text color="#2563eb">None</Text>
              </Text>
            ) : (
              <Text color="#737b8b" ml={1}>
                Notes: {item.notes}
              </Text>
            )}
          </HStack>
          <HStack alignItems="center" mb={1}>
            <AntDesign name="user" size={18} color="#2563eb" />
            <Text color="#737b8b" ml={1}>
              Reporter: {item.reporter}
            </Text>
          </HStack>

          <Heading color="#2563eb">${item.price}.00</Heading>
          <HStack alignItems="center" my={2}>
            <Pressable
              onPress={() => {
                deleteProperty(item.property_id);
              }}
            >
              <View
                borderWidth={1}
                borderColor="#fb7185"
                mr={3}
                p={1}
                rounded={15}
              >
                <Text mx={2} color="#fb7185">
                  Delete
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                editProperty(
                  item.property_id,
                  item.property_type,
                  item.bedrooms,
                  item.date,
                  item.furniture_type,
                  item.notes,
                  item.price,
                  item.reporter
                );
              }}
            >
              <View borderWidth={1} borderColor="#2563eb" p={1} rounded={15}>
                <Text color="#2563eb" mx={2}>
                  Edit
                </Text>
              </View>
            </Pressable>
          </HStack>
        </VStack>
      </Stack>
    </Pressable>
  );

  const renderItem = ({ item }) => {
    return <Item key={item.property_id} item={item} />;
  };
  return (
    <NativeBaseProvider>
      <View flex={1} mt={20}>
        <Center>
          <Heading mb={3} size="xl">
            RentalZ
          </Heading>
          <Stack mx={2} mb={2}>
            <Input
              value={searchValue}
              placeholder="Search property"
              bg="#fff"
              width="100%"
              borderRadius={15}
              p={1}
              fontSize={14}
              onChangeText={(text) => setSearchValue(text)}
              onSubmitEditing={() => handleChange()}
              InputRightElement={
                <Icon
                  size="sm"
                  m={2}
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                  onPress={() => handleChange()}
                />
              }
            />
          </Stack>
        </Center>

        {showSearch && (
          <View flex={1}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchResult}
              renderItem={renderItem}
              keyExtractor={(item) => item.property_id.toString()}
            />
          </View>
        )}

        {showAll && (
          <View flex={1}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={property}
              renderItem={renderItem}
              keyExtractor={(item) => item.property_id.toString()}
            />
          </View>
        )}

        <Box position="absolute" h={100} w="100%">
          <Fab
            position="absolute"
            size="lg"
            bg="#2563eb"
            onPress={() => navigation.navigate("CreateProperty")}
            icon={
              <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
            }
          />
        </Box>
        <Box position="absolute" h={100} w="100%">
          <Fab
            position="absolute"
            right={100}
            size="lg"
            bg="#eab308"
            onPress={() => readData()}
            icon={
              <Icon color="white" as={<AntDesign name="reload1" />} size="sm" />
            }
          />
        </Box>
      </View>
    </NativeBaseProvider>
  );
};

export default TabTwoScreen;

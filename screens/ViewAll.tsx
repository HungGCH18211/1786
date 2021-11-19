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
  Modal,
  Button,
} from "native-base";
import { FlatList, Alert, LogBox } from "react-native";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

const ViewAll = ({ navigation }) => {
  const db = SQLite.openDatabase("dbProperty");
  const [property, setProperty] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [idModal, setIdModal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    readData();
    handleChange();
    logic();
    LogBox.ignoreLogs([
      "The contrast ratio of 1:1 for darkText on transparent",
    ]);
  }, []);

  const readData = () => {
    logic();
    setShowAll(true);
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM Property_Table", [], (tx, results) => {
        const arr = [];
        for (let i = 0; i < results.rows.length; ++i)
          arr.push(results.rows.item(i));
        setProperty(
          arr.sort(function (a, b) {
            return b.property_id - a.property_id;
          })
        );
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
            readData();
            Alert.alert("Done", `Delete property id=${id} successfully!`);
          }
        }
      );
    });
  };

  const addMore = () => {
    setLoading(true);
    if (!notes.trim()) {
      Alert.alert(
        "Notice",
        "You must enter somethings to do this action. Or else, close the modal"
      );
      setLoading(false);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `UPDATE Property_Table set more=? where property_id=${idModal}`,
          [notes.trim()],
          (tx, results) => {
            setShowModal(false);
            if (results.rowsAffected > 0) {
              setNotes(null);
              setIdModal(null);
              setLoading(false);
              readData();
              Alert.alert("Success", "Add a note successfully!");
            } else Alert.alert("Error");
          }
        );
      });
    }
  };

  const handleChange = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM Property_Table where property_type like '${searchValue}%' `,
        [],
        (tx, results) => {
          const arr = [];
          for (let i = 0; i < results.rows.length; ++i)
            arr.push(results.rows.item(i));
          console.log("Search Value:", arr);
          setSearchResult(arr);
        }
      );
    });
    logic();
  };

  const logic = () => {
    if (!searchValue || searchResult.length === 0) {
      setShowSearch(false);
      setShowAll(true);
    } else {
      setShowSearch(true);
      setShowAll(false);
    }
  };

  const viewProperty = (
    id,
    property,
    bed,
    date,
    type,
    note,
    price,
    reporter
  ) => {
    navigation.navigate("ViewProperty", {
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
    <Pressable
      onPress={() => {
        viewProperty(
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
      <Stack mb={5} mx={2} rounded={15} bg="#fff" shadow={2}>
        <VStack p={3}>
          <View>
            <Image
              source={{
                uri: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/92/2019/11/20071929/0919-AJS-NOI-Hotel-des-Arts-SGN-1091-Web-1500x690.jpg",
              }}
              alt="Alternate Text"
              width={400}
              height={250}
              rounded={15}
            />
            <View
              position="absolute"
              bg="#facc15"
              right="0"
              p={2}
              borderBottomLeftRadius={15}
              borderTopRightRadius={15}
            >
              <Pressable
                onPress={() => {
                  setShowModal(true);
                  setIdModal(item.property_id);
                }}
              >
                <SimpleLineIcons name="note" size={24} color="white" />
              </Pressable>
            </View>
          </View>
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
              (29 reviews)
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
          <HStack alignItems="center" mb={2}>
            <MaterialIcons name="notes" size={18} color="#2563eb" />
            {item.notes === "" ? (
              <Text color="#737b8b" ml={1}>
                Notes: <Text color="#2563eb">None</Text>
              </Text>
            ) : (
              <Text color="#737b8b" ml={1}>
                Notes: {item.notes}
              </Text>
            )}
          </HStack>
          <HStack alignItems="center" mb={2}>
            <AntDesign name="user" size={18} color="#2563eb" />
            <Text color="#737b8b" ml={1}>
              Reporter: {item.reporter}
            </Text>
          </HStack>
          {item.more === "" || item.more === null ? null : (
            <HStack alignItems="center" mb={2}>
              <SimpleLineIcons name="note" size={18} color="#2563eb" />

              <Text color="#737b8b" ml={1}>
                More: {item.more}
              </Text>
            </HStack>
          )}

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
      <View flex={1} bg="#f2f2f2">
        <Center>
          <Heading my={3} size="xl" color="#2563eb">
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

        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setNotes(null);
            setIdModal(null);
          }}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add more information about the property</Modal.Header>
            <Modal.Body>
              <Input
                InputLeftElement={
                  <Icon as={<SimpleLineIcons name="note" />} size={7} mx={2} />
                }
                borderColor="#ccc"
                mb={3}
                p={3}
                size="lg"
                borderRadius={15}
                value={notes}
                onChangeText={(text) => setNotes(text)}
                placeholder="More"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                {loading ? (
                  <Button isLoading isLoadingText="Submitting">
                    Add
                  </Button>
                ) : (
                  <Button
                    onPress={() => {
                      addMore();
                    }}
                  >
                    Add
                  </Button>
                )}
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

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
            right={85}
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

export default ViewAll;

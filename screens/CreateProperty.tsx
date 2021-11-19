import React, { useState } from "react";
import {
  NativeBaseProvider,
  Text,
  Center,
  View,
  Pressable,
  Heading,
  Input,
  Icon,
  Button,
  HStack,
  Select,
  CheckIcon,
} from "native-base";
import { Platform } from "react-native";
import { Alert } from "react-native";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import * as SQLite from "expo-sqlite";
import { TouchableOpacity } from "react-native-gesture-handler";

const CreateProperty = ({ navigation }) => {
  const db = SQLite.openDatabase("dbProperty");
  const [fields, setFields] = useState({
    type: "",
    bedrooms: "",
    money: "",
    notes: "",
    reporter: "",
  });
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [furniture, setFurniture] = useState("");
  const [typeNull, setTypeNull] = useState(false);
  const [roomsNull, setRoomsNull] = useState(false);
  const [priceNull, setPriceNull] = useState(false);
  const [reporterNull, setReporterNull] = useState(false);

  const onChangeText = (inputField, text) => {
    setFields((prev) => ({ ...prev, ...{ [inputField]: text } }));
  };
  const checkField = () => {
    if (!fields.type.trim()) {
      setTypeNull(true);
    } else {
      setTypeNull(false);
    }

    if (!fields.bedrooms.trim()) {
      setRoomsNull(true);
    } else {
      setRoomsNull(false);
    }

    if (!fields.money.trim()) {
      setPriceNull(true);
    } else {
      setPriceNull(false);
    }

    if (!fields.reporter.trim()) {
      setReporterNull(true);
    } else {
      setReporterNull(false);
    }
  };

  const onError = () => {
    return (
      <Text color="#FF0000" mb={3}>
        Field is required!
      </Text>
    );
  };

  // Select date
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setDate(selectedDate);
    console.log("Date: ", selectedDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const createProperty = async () => {
    await checkField();
    if (
      !fields.type.trim() ||
      !fields.bedrooms.trim() ||
      !fields.money.trim() ||
      !fields.reporter.trim()
    ) {
      checkField();
      Alert.alert("Notice", "Please insert all of the required fields!");
    } else {
      insertData();
    }
  };

  // insert to database
  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO Property_Table (property_type, bedrooms, date, price, furniture_type, notes, reporter) VALUES (?,?,?,?,?,?,?)",
        [
          fields.type,
          fields.bedrooms,
          JSON.parse(JSON.stringify(date)),
          fields.money,
          furniture,
          fields.notes,
          fields.reporter,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            navigation.navigate("Home");
            Alert.alert("Success", "Create property successfully!");
          } else Alert.alert("Failed", "Failed to create property!");
        }
      );
    });
  };
  return (
    <NativeBaseProvider>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View mt={2} mx={2}>
          <AntDesign name="back" size={30} color="black" />
        </View>
      </Pressable>

      <Center mx={2} flex={1}>
        <Heading mb={3} size="xl">
          Create property
        </Heading>
        <Input
          InputLeftElement={
            <Icon as={<AntDesign name="windowso" />} size={7} mx={2} />
          }
          mb={3}
          p={3}
          borderColor="#ccc"
          size="lg"
          borderRadius={15}
          value={fields.type}
          onChangeText={(type) => onChangeText("type", type)}
          placeholder="Property Type"
        />
        {typeNull && onError()}
        <Input
          InputLeftElement={
            <Icon
              as={<MaterialCommunityIcons name="bed-outline" />}
              size={7}
              mx={2}
            />
          }
          p={3}
          borderColor="#ccc"
          mb={3}
          size="lg"
          borderRadius={15}
          value={fields.bedrooms}
          onChangeText={(bedrooms) => onChangeText("bedrooms", bedrooms)}
          placeholder="Bedrooms"
          keyboardType="numeric"
        />
        {roomsNull && onError()}
        {/* Select date */}
        <HStack
          mb={3}
          width="100%"
          borderWidth={1}
          borderColor="#ccc"
          rounded={15}
          alignItems="center"
        >
          <Icon
            as={<FontAwesome name="calendar" color="black" />}
            size={7}
            mx={2}
          />
          <TouchableOpacity onPress={() => showDatepicker()}>
            <Text fontSize={16} p={3}>
              {date.toString().slice(0, 25)}
            </Text>
          </TouchableOpacity>
        </HStack>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Input
          InputLeftElement={
            <Icon as={<MaterialCommunityIcons name="cash" />} size={7} mx={2} />
          }
          borderColor="#ccc"
          mb={3}
          p={3}
          size="lg"
          borderRadius={15}
          value={fields.money}
          onChangeText={(money) => onChangeText("money", money)}
          placeholder="Price"
          keyboardType="numeric"
        />
        {priceNull && onError()}
        <HStack
          alignItems="center"
          borderWidth={1}
          rounded={15}
          width="100%"
          borderColor="#ccc"
          mb={3}
        >
          <Icon
            as={<MaterialCommunityIcons name="chair-rolling" />}
            size={7}
            mx={2}
          />
          <Select
            selectedValue={furniture}
            minWidth="300"
            variant="unstyled"
            accessibilityLabel="Choose Furniture"
            placeholder="Choose Furniture Types (optional)"
            rounded={15}
            borderColor="#ccc"
            _selectedItem={{
              bg: "blue.200",
              endIcon: <CheckIcon size="5" color="#2563eb" />,
            }}
            fontSize="md"
            color="#737b8b"
            mt={1}
            onValueChange={(itemValue) => {
              setFurniture(itemValue);
            }}
          >
            <Select.Item label="Furnished" value="Furnished" />
            <Select.Item label="Unfurnished" value="unFurnished" />
            <Select.Item label="Part Furnished" value="partFurnished" />
          </Select>
        </HStack>
        <Input
          InputLeftElement={
            <Icon as={<SimpleLineIcons name="note" />} size={7} mx={2} />
          }
          borderColor="#ccc"
          mb={3}
          p={3}
          size="lg"
          borderRadius={15}
          value={fields.notes}
          onChangeText={(notes) => onChangeText("notes", notes)}
          placeholder="Notes (optional)"
        />
        <Input
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} size={7} mx={2} />
          }
          borderColor="#ccc"
          mb={3}
          p={3}
          size="lg"
          borderRadius={15}
          value={fields.reporter}
          onChangeText={(reporter) => onChangeText("reporter", reporter)}
          placeholder="Reporter name"
        />
        {reporterNull && onError()}
        <Button
          bg="#2563eb"
          _text={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
          leftIcon={
            <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
          }
          onPress={() => {
            createProperty();
          }}
        >
          Create property
        </Button>
      </Center>
    </NativeBaseProvider>
  );
};

export default CreateProperty;

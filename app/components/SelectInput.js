// @ts-nocheck
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text,
  Modal,
  ScrollView,
  TextInput,
  Dimensions
} from "react-native";
import styled from "styled-components";
import { useThemeContext } from "../helpers/AppProvider";

const SelectInput = ({
  value,
  visible = false,
  onSelect = (value) => null,
  toggleSelection = () => null,
  selection,
  searchQuery,
  setSearchQuery,
  showInput
}) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const toggleModal = () => {
    toggleSelection();
  };

  const changeValue = (index) => {
    onSelect(index);
    toggleModal();
  };

  /******************************************************/

  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "rgba(0,0,0,0.4)",
      flex: 1,
    },
    itemsContainer: {
      position: "absolute",
      // bottom: 0,
      top: 0,
      // left: 0,
      // right: 0,
      width: "100%",
      backgroundColor: Colors.primary,
      // borderTopLeftRadius: 40,
      // borderTopRightRadius: 40,
      overflow: "hidden",
      // paddingTop: 45,
      // paddingBottom: 20,
      height: showInput ? Dimensions.get('window').height - 25 : Dimensions.get('window').height
    },
    itemContainer: {
      padding: 10,
    },
    itemLabel: {
      fontFamily: "Cairo-SemiBold",
      fontSize: 20,
      textAlign: "center",
      textAlignVertical: "center",
      color: Colors.white,
    },
    separator: {
      width: "90%",
      height: 2,
      backgroundColor: Colors.primary,
      borderRadius: 10,
      alignSelf: "center",
    },
    selectedOption: {
      backgroundColor: Colors.black,
    },
  });
  /******************************************************/
  /******************************************************/
  const Input = styled(TextInput)`
    width: 100%;
    height: 42px;
    background-color: ${"#fff"};
    elevation: 2;
    border: 1px solid ${"#000"};
    font-family: ArabicUI;
    padding-right: 22px;
    padding-left: 22px;
    padding-left: 30px;
    text-align: right;
    z-index: 1;
`;
  /******************************************************/

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={toggleModal}
    >
      {
        showInput && (
          <Input
            placeholder="بحث..."
            defaultValue={searchQuery}
            onChangeText={(value) => {
              setSearchQuery(value);
            }}
          />
        )
      }
      <View style={styles.modalContainer}>
        <ScrollView style={styles.itemsContainer}>
          {selection.map((item, index) => (
            <TouchableNativeFeedback
              useForeground
              key={index}
              onPress={() => changeValue(index)}
            >
              <View>
                <View
                  style={[
                    styles.itemContainer,
                    value == index && styles.selectedOption,
                  ]}
                >
                  <Text style={styles.itemLabel}>
                    {item.label || item.name}
                  </Text>
                </View>
                {index != selection.length - 1 && (
                  <View style={styles.separator}></View>
                )}
              </View>
            </TouchableNativeFeedback>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SelectInput;

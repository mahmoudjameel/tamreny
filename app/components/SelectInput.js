// @ts-nocheck
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  Text,
  Modal,
  ScrollView,
} from "react-native";
import { useThemeContext } from "../helpers/AppProvider";

const SelectInput = ({
  value,
  visible = false,
  onSelect = (value) => null,
  toggleSelection = () => null,
  selection,
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
      bottom: 0,
      width: "100%",
      backgroundColor: Colors.primary,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      overflow: "hidden",
      paddingTop: 40,
      paddingBottom: 20,
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={toggleModal}
    >
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
                  <Text style={styles.itemLabel}>{item.label}</Text>
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

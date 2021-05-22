import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  TouchableNativeFeedback,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styled from "styled-components";
import Icon from "react-native-ionicons";
import { useThemeContext } from "../helpers/AppProvider";

const SearchBtn = ({ style = {}, onSearch = (query) => null }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pressAnim = useRef(new Animated.Value(-400)).current;
  const inputRef = useRef(null);

  /******************************************************/

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  const pressBtn = () => {
    if (searchQuery.length == 0) {
      active == false ? inputRef.current.focus() : inputRef.current.blur();
      Animated.spring(pressAnim, {
        toValue: active ? -400 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setActive(!active);
    } else {
      onSearch(searchQuery);
    }
  };

  return (
    <Container style={style}>
      <KeyboardAvoidingView>
        <TouchableNativeFeedback onPress={pressBtn} useForeground>
          <SearchButton
            bgColor={Colors.primary}
            borderColor={Colors.black + "11"}
          >
            {active && searchQuery ? (
              <SearchText color={Colors.white}>ابحث</SearchText>
            ) : (
              <>
                <BtnIcon
                  color={Colors.white}
                  name={active ? "ios-close" : "search"}
                />
              </>
            )}
          </SearchButton>
        </TouchableNativeFeedback>
        <SearchBoxContainer style={{ left: pressAnim }}>
          <Input
            borderColor={Colors.primary + "11"}
            ref={inputRef}
            bgColor={Colors.white}
            placeholder="بحث..."
            value={searchQuery}
            onChangeText={(value) => {
              setSearchQuery(value);
            }}
          />
        </SearchBoxContainer>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 80px;
  overflow: hidden;
`;

const SearchBoxContainerStyle = styled.View`
  width: 90%;
  height: 45px;
  overflow: hidden;
  left: 15px;
  top: 15px;
`;

const SearchBoxContainer = Animated.createAnimatedComponent(
  SearchBoxContainerStyle
);

const SearchText = styled.Text`
  font-family: Cairo-Bold;
  font-size: 16px;
  text-align: center;
  color: ${(props) => props.color};
`;

const Input = styled(TextInput)`
  width: 95%;
  height: 42px;
  background-color: ${(props) => props.bgColor};
  elevation: 2;
  border: 1px solid ${(props) => props.borderColor};
  border-radius: 20px;
  font-family: ArabicUI;
  padding-right: 22px;
  padding-left: 22px;
  padding-left: 30px;
  text-align: right;
  position: absolute;
  z-index: 1;
`;
const BtnIcon = styled(Icon)`
  font-size: 40px;
  color: ${(props) => props.color};
  transform: rotateY(-180deg);
`;

const SearchButton = styled.View`
  width: 65px;
  height: 65px;
  border-radius: 35px;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
  align-items: center;
  justify-content: center;
  elevation: 2;
  overflow: hidden;
  z-index: 2;
  position: absolute;
`;
export default SearchBtn;

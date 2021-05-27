// @ts-nocheck
import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Header, SelectInput } from "../components/index";
import styled from "styled-components";
import { useThemeContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL } from "../settings/Config";
const Food = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [optionTwo, setOptionTwo] = useState(1);
  const [weight, setWeight] = useState(0);
  const [optionTwoVisible, setOptionTwoVisible] = useState(false);
  const [Nutritions, setNutritions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getNutritions();
  }, []);
  const getNutritions = async () => {
    try {
      let response = await axios.post(`${API_URL}/Nutritions/get`);
      let data = await response.data;
      if (data.status) {
        setNutritions(data.nutritions);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/
  return (
    <>
      <Header {...props} title="القيمة الغذائية" backBtnEnabled />
      <SelectInput
        visible={optionTwoVisible}
        value={optionTwo}
        selection={Nutritions.filter((nutrition) =>
          nutrition.name.includes(searchQuery)
        )}
        onSelect={(value) => {
          setOptionTwo(value);
        }}
        toggleSelection={() => setOptionTwoVisible(!optionTwoVisible)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showInput={true}
      />
      <ScrollContainer>
        <MainContainer>
          <Container bgColor={Colors.white} borderColor={Colors.black + "11"}>
            <RowContainer style={{ justifyContent: "flex-start" }}>
              <TouchableNativeFeedback
                onPress={() => setOptionTwoVisible(!optionTwoVisible)}
                useForeground
              >
                <SelectRounded
                  style={{ width: "60%" }}
                  borderColor={Colors.black + "11"}
                  bgColor={Colors.lightGray}
                >
                  <NormalText color={Colors.black}>
                    {Nutritions[optionTwo]?.name}
                  </NormalText>
                  <SelectArrow borderColor={Colors.black} />
                </SelectRounded>
              </TouchableNativeFeedback>
              <RoundedInput
                borderColor={Colors.black + "11"}
                bgColor={Colors.lightGray}
              >
                <Input
                  placeholder="الوزن"
                  keyboardType="number-pad"
                  style={{ width: "80%" }}
                  value={weight.toString()}
                  onChangeText={(value) => setWeight(value)}
                />
                <InputDesc color={Colors.black}>غرام</InputDesc>
              </RoundedInput>
            </RowContainer>
            {/* <RowContainer>
              <TouchableNativeFeedback onPress={() => null} useForeground>
                <CalculateBtn>
                  <Title style={{ color: Colors.white }}>احسب</Title>
                </CalculateBtn>
              </TouchableNativeFeedback>
            </RowContainer> */}
            <LineSeparator bgColor={Colors.black} />
            <RowContainer style={{ marginTop: 40, marginBottom: 5 }}>
              <BoldText color={Colors.black}>المغذيات</BoldText>
              <BoldText color={Colors.black}>الكمية</BoldText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>طاقة</Title>
              <ResultText color={Colors.red}>
                {(Nutritions[optionTwo]?.energy * weight).toFixed(2)}
              </ResultText>
              <NormalText color={Colors.black}>كالوري</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>بروتين</Title>
              <ResultText color={Colors.red}>
                {(Nutritions[optionTwo]?.protein * weight).toFixed(2)}
              </ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>دهون</Title>
              <ResultText color={Colors.red}>
                {(Nutritions[optionTwo]?.fat * weight).toFixed(2)}
              </ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>كربوهيدرات</Title>
              <ResultText color={Colors.red}>
                {(Nutritions[optionTwo]?.carbs * weight).toFixed(2)}
              </ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

/******************************************************/

const MainContainer = styled.View`
  flex: 1;
  padding: 10px 8px;
`;

const ScrollContainer = styled.ScrollView``;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  elevation: 10;
  border: 1px ${(props) => props.borderColor};
  border-radius: 12px;
  padding: 18px 15px;
  padding-bottom: 30px;
`;

const RowContainer = styled.View`
  flex-direction: row-reverse;
  margin-bottom: 30px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  font-family: Cairo-SemiBold;
  font-size: 20px;
  color: ${(props) => props.color};
`;

const NormalText = styled.Text`
  font-family: Cairo-Regular;
  font-size: 18px;
  color: ${(props) => props.color};
`;

const BoldText = styled(Title)`
  font-family: Cairo-Bold;
`;

const RoundedInput = styled.View`
  background-color: ${(props) => props.bgColor};
  border-radius: 30px;
  border: 1px ${(props) => props.borderColor};
  elevation: 3;
  flex-direction: row-reverse;
  padding: 5px 15px;
  width: 35%;
`;

const Input = styled.TextInput`
  background-color: transparent;
  text-align: center;
  font-family: Cairo-Regular;
  font-size: 18px;
  width: 100%;
`;

const InputDesc = styled(NormalText)`
  font-size: 12px;
`;

const SelectRounded = styled.View`
  background-color: ${(props) => props.bgColor};
  border-radius: 30px;
  border: 1px ${(props) => props.borderColor};
  padding: 5px 30px;
  elevation: 3;
  width: 100%;
  overflow: hidden;
  padding-left: 30px;
`;

const SelectArrow = styled.View`
  border: 6px transparent;
  border-top-width: 12px;
  border-top-color: ${(props) => props.borderColor};
  position: absolute;
  left: 20px;
  top: 50%;
`;

const CalculateBtn = styled(SelectRounded)`
  background-color: ${(props) => props.bgColor};
  padding: 5px 30px;
  border: 1px ${(props) => props.borderColor};
  margin-top: 50px;
  align-items: center;
`;

const LineSeparator = styled.View`
  width: 80%;
  height: 3px;
  align-self: center;
  background-color: ${(props) => props.bgColor};
  opacity: 0.5;
  border-radius: 15px;
  margin-top: -15px;
`;

const ResultText = styled(Title)`
  margin-left: auto;
  color: ${(props) => props.color};
  color: ${(props) => props.color};
  font-size: 22px;
`;

export default Food;

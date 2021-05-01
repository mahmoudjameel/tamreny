// @ts-nocheck
import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import { Header, SelectInput } from "../components/index";
import styled from "styled-components";
import { RadioButton } from "react-native-paper";
import { useThemeContext } from "../helpers/AppProvider";

const Food = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [gender, setGender] = useState("male");
  const [optionOne, setOptionOne] = useState(1);
  const [optionTwo, setOptionTwo] = useState(1);
  const [optionOneVisible, setOptionOneVisible] = useState(false);
  const [optionTwoVisible, setOptionTwoVisible] = useState(false);

  const options = [
    {
      value: 1,
      label: "اختيار 1",
    },
    {
      value: 2,
      label: "اختيار 2",
    },
    {
      value: 3,
      label: "اختيار 3",
    },
    {
      value: 4,
      label: "اختيار 4",
    },
  ];
  /******************************************************/

  const MainContainer = styled.View`
    flex: 1;
    padding: 10px 8px;
  `;

  const ScrollContainer = styled.ScrollView``;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    elevation: 10;
    border: 1px ${Colors.black + "11"};
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
    color: ${Colors.black};
  `;

  const NormalText = styled.Text`
    font-family: Cairo-Regular;
    font-size: 18px;
    color: ${Colors.black};
  `;

  const BoldText = styled(Title)`
    font-family: Cairo-Bold;
  `;

  const RoundedInput = styled.View`
    background-color: ${Colors.lightGray};
    border-radius: 30px;
    border: 1px ${Colors.black + "11"};
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
    background-color: ${Colors.lightGray};
    border-radius: 30px;
    border: 1px ${Colors.black + "11"};
    padding: 5px 30px;
    elevation: 3;
    width: 100%;
    overflow: hidden;
    padding-left: 30px;
  `;

  const SelectArrow = styled.View`
    border: 6px transparent;
    border-top-width: 12px;
    border-top-color: ${Colors.black};
    position: absolute;
    left: 20px;
    top: 50%;
  `;

  const CalculateBtn = styled(SelectRounded)`
    background-color: ${Colors.primary};
    padding: 5px 30px;
    border: 1px ${Colors.primary + "11"};
    margin-top: 50px;
    align-items: center;
  `;

  const LineSeparator = styled.View`
    width: 80%;
    height: 3px;
    align-self: center;
    background-color: ${Colors.black};
    opacity: 0.5;
    border-radius: 15px;
    margin-top: -15px;
  `;

  const ResultText = styled(Title)`
    margin-left: auto;
    transform: translateX(10px);
    color: ${Colors.red};
    font-size: 22px;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title="القيمة الغذائية" backBtnEnabled />
      <SelectInput
        visible={optionOneVisible || optionTwoVisible}
        value={optionOneVisible ? optionOne : optionTwo}
        selection={options}
        onSelectValue={(value) =>
          optionOneVisible ? setOptionOne(value) : setOptionTwo(value)
        }
        toggleSelection={() =>
          optionOneVisible
            ? setOptionOneVisible(!optionOneVisible)
            : setOptionTwoVisible(!optionTwoVisible)
        }
      />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <RowContainer>
              <TouchableNativeFeedback
                onPress={() => setOptionOneVisible(!optionOneVisible)}
                useForeground
              >
                <SelectRounded>
                  <NormalText>
                    {options.find((option) => option.value == optionOne).label}
                  </NormalText>
                  <SelectArrow />
                </SelectRounded>
              </TouchableNativeFeedback>
            </RowContainer>
            <RowContainer>
              <TouchableNativeFeedback
                onPress={() => setOptionTwoVisible(!optionTwoVisible)}
                useForeground
              >
                <SelectRounded style={{ width: "60%" }}>
                  <NormalText>
                    {options.find((option) => option.value == optionTwo).label}
                  </NormalText>
                  <SelectArrow />
                </SelectRounded>
              </TouchableNativeFeedback>
              <RoundedInput>
                <Input
                  placeholder="الوزن"
                  keyboardType="number-pad"
                  style={{ width: "80%" }}
                />
                <InputDesc>كجم</InputDesc>
              </RoundedInput>
            </RowContainer>
            <RowContainer>
              <TouchableNativeFeedback onPress={() => null} useForeground>
                <CalculateBtn>
                  <Title style={{ color: Colors.white }}>احسب</Title>
                </CalculateBtn>
              </TouchableNativeFeedback>
            </RowContainer>
            <LineSeparator />
            <RowContainer style={{ marginTop: 40, marginBottom: 5 }}>
              <BoldText>المغذيات</BoldText>
              <BoldText>الكمية</BoldText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title>طاقة</Title>
              <ResultText>105</ResultText>
              <NormalText>كالوري</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title>بروتين</Title>
              <ResultText>53</ResultText>
              <NormalText>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title>دهون</Title>
              <ResultText>25</ResultText>
              <NormalText>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title>كربوهيدرات</Title>
              <ResultText>43</ResultText>
              <NormalText>غرام</NormalText>
            </RowContainer>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Food;

import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback, TextInput } from "react-native";
import { Header, SelectInput } from "../components/index";
import styled from "styled-components";
import { RadioButton } from "react-native-paper";
import { useThemeContext } from "../helpers/AppProvider";

const Protein = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [gender, setGender] = useState("male");
  const [selectedOptionOne, setSelectedOptionOne] = useState(0);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState(0);
  const [optionOneVisible, setOptionOneVisible] = useState(false);
  const [optionTwoVisible, setOptionTwoVisible] = useState(false);
  const [resultObj, setResultObj] = useState({
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
  });

  const [inputsObj, setInputsObj] = useState({
    age: "",
    height: "",
    weight: "",
  });

  const optionsOne = [
    {
      value: 0,
      label: "ما هو مستوي نشاطك ؟",
    },
    {
      value: 12,
      label: "قليلا ما أتمرن",
    },
    {
      value: 15,
      label: "أتمرن بشكل متوسط",
    },
    {
      value: 17,
      label: "كثيرا ما أتمرن",
    },
  ];

  const optionsTwo = [
    {
      value: 0,
      label: "الغرض من التمرين",
    },
    {
      value: {
        carbohydrates: 0.3,
        proteins: 0.5,
        fats: 0.2,
      },
      label: "إنقاص الوزن",
    },
    {
      value: {
        carbohydrates: 0.4,
        proteins: 0.4,
        fats: 0.2,
      },
      label: "المحافظة علي الوزن",
    },
    {
      value: {
        carbohydrates: 0.5,
        proteins: 0.45,
        fats: 0.05,
      },
      label: "زيادة الوزن",
    },
  ];

  const calculate = () => {
    try {
      //Validation
      if (!inputsObj.weight) return alert("يجب كتابة الوزن بالكيلو جرام");
      if (selectedOptionOne == 0) return alert("يجب اختيار مستوي نشاطك");
      if (selectedOptionTwo == 0) return alert("يجب اختيار الغرض من التمرين");

      //Get Calories
      let calories = +(
        +inputsObj.weight *
        2.2 *
        optionsOne[selectedOptionOne].value
      ).toFixed(1);
      let carbohydrates = +(
        calories * optionsTwo[selectedOptionTwo].value.carbohydrates
      ).toFixed(1); //Get weight in pounds
      let proteins = +(
        calories * optionsTwo[selectedOptionTwo].value.proteins
      ).toFixed(1); //Get weight in pounds
      let fats = +(calories * optionsTwo[selectedOptionTwo].value.fats).toFixed(
        1
      ); //Get weight in pounds

      setResultObj({ ...resultObj, calories, carbohydrates, proteins, fats });
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  /******************************************************/
  return (
    <>
      <Header {...props} title="حاسبة البروتينات" backBtnEnabled />
      <SelectInput
        visible={optionOneVisible || optionTwoVisible}
        value={optionOneVisible ? selectedOptionOne : selectedOptionTwo}
        selection={optionOneVisible ? optionsOne : optionsTwo}
        onSelect={(index) =>
          optionOneVisible
            ? setSelectedOptionOne(index)
            : setSelectedOptionTwo(index)
        }
        toggleSelection={() =>
          optionOneVisible
            ? setOptionOneVisible(!optionOneVisible)
            : setOptionTwoVisible(!optionTwoVisible)
        }
      />
      <ScrollContainer>
        <MainContainer>
          <Container bgColor={Colors.white} borderColor={Colors.black + "11"}>
            <RowContainer style={{ justifyContent: "flex-start" }}>
              <Title color={Colors.black} style={{ marginLeft: 20 }}>
                النوع
              </Title>
              <RadioButton
                color={Colors.primary}
                value="male"
                status={gender == "male" ? "checked" : "unchecked"}
                onPress={() => setGender("male")}
                uncheckedColor={Colors.primary}
              />
              <NormalText color={Colors.black}>ذكر</NormalText>
              <RadioButton
                color={Colors.primary}
                value="female"
                status={gender == "female" ? "checked" : "unchecked"}
                onPress={() => setGender("female")}
                uncheckedColor={Colors.primary}
              />
              <NormalText color={Colors.black}>أنثي</NormalText>
            </RowContainer>
            <RowContainer>
              <RoundedInput
                borderColor={Colors.black + "11"}
                bgColor={Colors.lightGray}
              >
                <Input
                  key="ageInput"
                  placeholder="العمر"
                  keyboardType="number-pad"
                  value={inputsObj.age}
                  onChangeText={(value) =>
                    setInputsObj({
                      ...inputsObj,
                      age: value,
                    })
                  }
                />
              </RoundedInput>
              <RoundedInput
                borderColor={Colors.black + "11"}
                bgColor={Colors.lightGray}
              >
                <Input
                  placeholder="الطول"
                  keyboardType="number-pad"
                  style={{ width: "80%" }}
                  value={inputsObj.height}
                  onChangeText={(value) =>
                    setInputsObj({ ...inputsObj, height: value })
                  }
                />
                <InputDesc color={Colors.black}>سم</InputDesc>
              </RoundedInput>
              <RoundedInput
                borderColor={Colors.black + "11"}
                bgColor={Colors.lightGray}
              >
                <Input
                  placeholder="الوزن"
                  keyboardType="number-pad"
                  style={{ width: "80%" }}
                  value={inputsObj.weight}
                  onChangeText={(value) =>
                    setInputsObj({ ...inputsObj, weight: value })
                  }
                />
                <InputDesc color={Colors.black}>كجم</InputDesc>
              </RoundedInput>
            </RowContainer>
            <RowContainer>
              <TouchableNativeFeedback
                onPress={() => setOptionOneVisible(!optionOneVisible)}
                useForeground
              >
                <SelectRounded
                  borderColor={Colors.black + "11"}
                  bgColor={Colors.lightGray}
                >
                  <NormalText color={Colors.black}>
                    {
                      optionsOne.find((option, i) => i == selectedOptionOne)
                        .label
                    }
                  </NormalText>
                  <SelectArrow borderColor={Colors.black} />
                </SelectRounded>
              </TouchableNativeFeedback>
            </RowContainer>
            <RowContainer>
              <TouchableNativeFeedback
                onPress={() => setOptionTwoVisible(!optionTwoVisible)}
                useForeground
              >
                <SelectRounded
                  borderColor={Colors.black + "11"}
                  bgColor={Colors.lightGray}
                >
                  <NormalText color={Colors.black}>
                    {
                      optionsTwo.find((option, i) => i == selectedOptionTwo)
                        .label
                    }
                  </NormalText>
                  <SelectArrow borderColor={Colors.black} />
                </SelectRounded>
              </TouchableNativeFeedback>
            </RowContainer>

            <RowContainer>
              <TouchableNativeFeedback
                onPress={() => calculate()}
                useForeground
              >
                <CalculateBtn
                  borderColor={Colors.primary + "11"}
                  bgColor={Colors.primary}
                >
                  <Title color={Colors.black} style={{ color: Colors.white }}>
                    احسب
                  </Title>
                </CalculateBtn>
              </TouchableNativeFeedback>
            </RowContainer>
            <LineSeparator bgColor={Colors.black} />
            <RowContainer style={{ marginTop: 40, marginBottom: 5 }}>
              <Title color={Colors.black}>السعرات</Title>
              <ResultText color={Colors.red}>{resultObj.calories}</ResultText>
              <NormalText color={Colors.black}>كالوري</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>الكربوهيدرات</Title>
              <ResultText color={Colors.red}>
                {resultObj.carbohydrates}
              </ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>البروتينات</Title>
              <ResultText color={Colors.red}>{resultObj.proteins}</ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
            <RowContainer style={{ marginBottom: 5 }}>
              <Title color={Colors.black}>الدهون</Title>
              <ResultText color={Colors.red}>{resultObj.fats}</ResultText>
              <NormalText color={Colors.black}>غرام</NormalText>
            </RowContainer>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

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

const RoundedInput = styled.View`
  background-color: ${(props) => props.bgColor};
  border-radius: 30px;
  border: 1px ${(props) => props.borderColor};
  elevation: 3;
  flex-direction: row-reverse;
  padding: 5px 15px;
  width: 30%;
`;

const Input = styled(TextInput)`
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
  align-items: center;
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
  transform: translateX(10px);
  color: ${(props) => props.color};
  font-size: 22px;
`;

export default Protein;

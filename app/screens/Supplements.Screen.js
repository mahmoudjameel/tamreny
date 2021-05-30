import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { SupplementCard, SearchBtn, Header } from "../components";
import { useThemeContext } from "../helpers/AppProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Supplements = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [supplements, setSupplements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getsupplements();
  }, []);

  const getsupplements = async () => {
    try {
      let response = await axios.post(`${API_URL}/proteins/get`);
      let data = await response.data;

      if (data.status) {
        setSupplements(data.proteins);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/

  /******************************************************/

  return (
    <>
      <Header {...props} title="المكملات الغذائية" backBtnEnabled />
      <SearchBtn
        style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
        onSearch={setSearchQuery}
      />
      <KeyboardAwareScrollView>
        <MainContainer bgColor={Colors.white}>
          <ScrollContainer bgColor={Colors.white}>
            <Container bgColor={Colors.white}>
              {supplements.filter(
                (supplement) =>
                  supplement.name.includes(searchQuery) ||
                  supplement.description.includes(searchQuery)
              ).length != 0 ? (
                supplements
                  .filter(
                    (supplement) =>
                      supplement.name.includes(searchQuery) ||
                      supplement.description.includes(searchQuery)
                  )
                  .map(({ name, description, mainImage, _id }) => (
                    <SupplementCard
                      key={_id}
                      {...props}
                      _id={_id}
                      title={name}
                      content={description}
                      mainImage={mainImage[0]}
                    />
                  ))
              ) : (
                <NormalText color={Colors.darkGray}>
                  لا يوجد مكملات غذائية
                </NormalText>
              )}
            </Container>
          </ScrollContainer>
        </MainContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

const ScrollContainer = styled.ScrollView`
  background-color: ${(props) => props.bgColor};
  min-height: 100%;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.bgColor};
  padding: 20px 15px;
`;

const NormalText = styled.Text`
  font-family: Cairo-Regular;
  font-size: 20px;
  margin-top: 10px;
  color: ${(props) => props.color};
  text-align: center;
`;

export default Supplements;

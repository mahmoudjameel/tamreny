// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header, SupplementCard, SearchBtn } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ImageProteins = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  //Get params
  let { categoryId, name, type } = props.route.params || {};

  const [Proteins, setProteins] = useState([]);

  useEffect(() => {
    getProteins();
  }, []);

  const getProteins = async () => {
    try {
      let response = await axios.post(`${API_URL}/Proteins/get`, {
        categoryId,
      });
      let data = await response.data;

      if (data.status) {
        setProteins(data.proteins);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /******************************************************/
  const ScrollContainer = styled.ScrollView`
    background-color: ${Colors.white};
    min-height: 100%;
  `;

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${Colors.white};
  `;

  const Container = styled.View`
    flex: 1;
    background-color: ${Colors.white};
    padding: 20px 15px;
  `;

  const SearchBtnStyle = styled.View`
    position: absolute;
    bottom: 15px;
    left: 18px;
    z-index: 6;
  `;

  /******************************************************/
  return (
    <>
      <Header {...props} title={name} backBtnEnabled />
      <KeyboardAwareScrollView>
        <MainContainer>
          <SearchBtn
            style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
          />
          <ScrollContainer>
            <Container>
              {Proteins.map(({ _id, mainImage, name, description }, i) => (
                <SupplementCard
                  key={_id}
                  {...props}
                  _id={_id}
                  title={name}
                  content={description}
                  mainImage={mainImage[0]}
                />
              ))}
            </Container>
          </ScrollContainer>
        </MainContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ImageProteins;

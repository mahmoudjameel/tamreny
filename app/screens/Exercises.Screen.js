// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header, ExerciseCard, SearchBtn } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const ImageExercises = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  //Get params
  let { categoryId, name, type } = props.route.params || {};

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    try {
      let response = await axios.post(`${API_URL}/exercises/get`, {
        categoryId,
        type,
      });
      let data = await response.data;

      if (data.status) {
        setExercises(data.exercises);
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
              {exercises.map(
                ({ _id, images, title, description, videoId }, i) => (
                  <ExerciseCard
                    key={i}
                    {...props}
                    _id={_id}
                    categoryId={categoryId}
                    images={images}
                    title={title}
                    description={description}
                    type={type}
                    videoId={videoId}
                  />
                )
              )}
            </Container>
          </ScrollContainer>
        </MainContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

export default ImageExercises;

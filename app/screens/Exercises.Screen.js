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
  const [searchQuery, setSearchQuery] = useState("");

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
  return (
    <>
      <Header {...props} title={name} backBtnEnabled />
      <SearchBtn
        style={{ position: "absolute", bottom: 15, left: 18, zIndex: 6 }}
        onSearch={setSearchQuery}
      />
      <KeyboardAwareScrollView>
        <MainContainer bgColor={Colors.white}>
          <ScrollContainer bgColor={Colors.white}>
            <Container bgColor={Colors.white}>
              {exercises.map(
                ({ _id, images, title, description, videoId }, i) => (title.includes(searchQuery) || description.includes(searchQuery)) && (
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

  /******************************************************/
  const ScrollContainer = styled.ScrollView`
    background-color: ${props => props.bgColor};
    min-height: 100%;
    flex: 1;
  `;

  const MainContainer = styled.View`
    flex: 1;
    background-color: ${props => props.bgColor};
  `;

  const Container = styled.View`
    flex: 1;
    min-height: 100%;
    background-color: ${props => props.bgColor};
    padding: 20px 15px;
  `;

  const SearchBtnStyle = styled.View`
    position: absolute;
    bottom: 15px;
    left: 18px;
    z-index: 6;
  `;

export default ImageExercises;

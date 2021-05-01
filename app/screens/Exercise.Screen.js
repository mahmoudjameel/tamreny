// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Autolink from "react-native-autolink";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header, ReactBtn, ImageSlider } from "../components/index";
import WebView from "react-native-webview";
import { useThemeContext } from "../helpers/AppProvider";
import { YOUTUBE_PLAYER } from "../settings/Config";

const Exercise = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  //Set the exercise data from params
  const { _id, type } = props.route.params;

  const [exercise, setExercise] = useState({});

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    try {
      let response = await axios.post(`${API_URL}/exercises/get`, {
        _id,
        type,
      });
      let data = await response.data;

      if (data.status) {
        setExercise(data.exercises[0]);
      } else {
        alert(data.errors);
      }
    } catch (e) {
      alert(e.message);
    }
  };

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
    padding-bottom: 70px;
  `;

  const Title = styled.Text`
    font-family: Cairo-Bold;
    font-size: 20px;
    text-align: center;
    margin: 10px 0px 20px;
  `;

  const SliderContainer = styled.View`
    border-radius: 12px;
    elevation: 8;
    border: 1px ${Colors.black + "11"};
    overflow: hidden;
    width: 100%;
    height: 200px;
    margin: 0 0 25px;
    background-color: ${Colors.white};
  `;

  const Content = styled.Text`
    font-size: 18px;
    font-family: ArabicUI;
    line-height: 34px;
  `;
  /******************************************************/
  return (
    <>
      <Header {...props} title={exercise.title} backBtnEnabled />
      <ReactBtn />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <Title>{exercise.title}</Title>
            <SliderContainer>
              {type == 1 ? (
                <ImageSlider
                  width={"100%"}
                  height={"100%"}
                  images={exercise.images}
                />
              ) : (
                <WebView
                  allowsFullscreenVideo
                  useWebKit
                  allowsInlineMediaPlayback
                  mediaPlaybackRequiresUserAction
                  javaScriptEnabled
                  scrollEnabled={false}
                  source={{
                    uri: YOUTUBE_PLAYER + exercise.videoId,
                  }}
                />
              )}
            </SliderContainer>
            <Autolink
              text={exercise.content || exercise.description}
              component={Content}
            />
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Exercise;

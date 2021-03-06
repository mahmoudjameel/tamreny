// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { ArticleCard, SearchBtn } from "../components/index";
import { useThemeContext, useAppContext } from "../helpers/AppProvider";
import { AdMobBanner } from "expo-ads-admob";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Articles = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();

  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${API_URL}/articles/get`);
      let data = await response.data;

      if (data.status) {
        setArticles(data.articles);
      } else {
        alert(data.errors);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  /******************************************************/

  return (
    <>
      <Header {...props} title="المقالات" backBtnEnabled />
      <SearchBtn
        style={{ position: "absolute", top: 60, left: 10, zIndex: 6 }}
        onSearch={setSearchQuery}
      />
      <KeyboardAwareScrollView>
        <MainContainer bgColor={Colors.white}>
          <ScrollContainer bgColor={Colors.white}>
            <AdMobBanner
              bannerSize="fullBanner"
              adUnitID={
                Platform.OS == "ios"
                  ? "ca-app-pub-2927383253903778/2231752723"
                  : "ca-app-pub-2927383253903778/3589421647"
              }
              servePersonalizedAds // true or false
            />
            <Container bgColor={Colors.white}>
              {articles.filter(
                (article) =>
                  article.title.includes(searchQuery) ||
                  article.content.includes(searchQuery)
              ).length != 0 ? (
                articles
                  .filter(
                    (article) =>
                      article.title.includes(searchQuery) ||
                      article.content.includes(searchQuery)
                  )
                  .map((article, i) => (
                    <ArticleCard key={i} {...props} article={article} />
                  ))
              ) : (
                <NormalText color={Colors.darkGray}>لا يوجد مقالات</NormalText>
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
export default Articles;

// @ts-nocheck
import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback } from "react-native";
import styled from "styled-components";
import ShareBtn from "./ShareBtn";
import LikeBtn from "./LikeBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeContext, useAuthContext } from "../helpers/AppProvider";
import axios from "axios";
import { API_URL } from "../settings/Config";

const ArticleCard = ({ navigation, article }) => {
  const Theme = useThemeContext();
  const { isLoggedIn, setForceLogin, user, setUser } = useAuthContext();
  const [like, setLike] = useState(false);

  let Colors = Theme.Colors;

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        setLike(false);
        return;
      } else {
        if (
          user &&
          user.favoriteArticles &&
          user.favoriteArticles.includes(article._id)
        ) {
          setLike(true);
        } else {
          setLike(false);
        }
      }
      console.log("userData", user);
    };
    fetchData();
  }, []);
  const onLike = async value => {
    if (!isLoggedIn) {
      setForceLogin(true);
      return;
    }
    try {
      let response = await axios.post(
        `${API_URL}/users/like`,
        {
          type: "article",
          articleId: article._id
        }
        //{ headers: { Authorization: `Bearer ${accessToken}` } }
      );
      let data = await response.data;
      if (data.status) {
        setUser(data.user);
        setLike(value);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  /******************************************************/

  const Container = styled.View`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    background-color: ${Colors.white};
    elevation: 10;
    margin-bottom: 15px;
    border: 1px solid ${Colors.black + "11"};
    overflow: hidden;
  `;

  const ArticleImage = styled.Image`
    width: 102%;
    height: 60%;
  `;

  const Title = styled.Text`
    font-size: 18px;
    font-family: Cairo-SemiBold;
    line-height: 24px;
    margin: 14px 12px 5px 30px;
  `;

  const Description = styled.Text`
    font-size: 14px;
    line-height: 22px;
    font-family: ArabicUI;
    margin: 0px 12px 5px 30px;
    color: ${Colors.darkGray};
  `;

  const LikeBtnStyle = styled.View`
    position: absolute;
    z-index: 5;
    top: 10px;
    right: 10px;
  `;

  const ShareBtnStyle = styled(LikeBtnStyle)`
    left: 10px;
  `;

  /******************************************************/

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() =>
        navigation.navigate("Article", {
          articleObj: article
        })
      }
    >
      <Container>
        <LikeBtn style={LikeBtnStyle} liked={like} onLike={onLike} />

        <ArticleImage source={{ uri: article.mainImage[0] }} />
        <Title numberOfLines={1}>{article.title}</Title>
        <Description numberOfLines={2}>{article.content}</Description>
      </Container>
    </TouchableNativeFeedback>
  );
};

export default ArticleCard;

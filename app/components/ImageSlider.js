// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import { Image, FlatList, TouchableWithoutFeedback, View } from "react-native";
import WebView from "react-native-webview";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled from "styled-components";
import { useThemeContext } from "../helpers/AppProvider";
import { YOUTUBE_PLAYER } from "../settings/Config";

const ImageSlider = ({ width, height, images = [] }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const [containerLayout, setContainerLayout] = useState({});

  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.measureInWindow((x, y, width, height) => {
      setContainerLayout({ width, height });
    });
  }, []);

  /******************************************************/
  const Container = styled.View`
    width: ${width || "300px"};
    height: ${height || "200px"};
    background-color: ${Colors.primary};
  `;

  const ImageComponent = styled(Image)`
    resize-mode: cover;
    align-self: center;
    height: ${containerLayout.height || 200}px;
    width: ${containerLayout.width || 320}px;
  `;

  /******************************************************/
  return (
    <Container ref={containerRef} onPress={() => null}>
      <SwiperFlatList
        index={0}
        showPagination
        data={images}
        paginationStyleItem={{
          width: 8,
          height: 8,
          marginLeft: 0,
          elevation: 5,
        }}
        paginationStyleItemActive={{ backgroundColor: Colors.primary }}
        paginationStyleItemInactive={{ backgroundColor: Colors.gray }}
        renderItem={({ item }) => (
          <ImageComponent
            source={typeof item === "string" ? { uri: item } : item}
          />
        )}
      />
    </Container>
  );
};

export default ImageSlider;

// @ts-nocheck
import React, { useRef, useEffect, useState } from "react";
import { Image, FlatList, TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import styled from "styled-components";
import { useThemeContext } from "../helpers/AppProvider";
import { YOUTUBE_PLAYER } from "../settings/Config";

const ImageSlider = ({ onPress, width, height, images = [] }) => {
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
    background-color: ${"#fff"};
  `;

  const ImageComponent = styled(Image)`
    resize-mode: contain;
    align-self: center;
    height: ${containerLayout.height || 200}px;
    width: ${containerLayout.width || 320}px;
  `;

  /******************************************************/
  return (
    <Container ref={containerRef}>
      <SwiperFlatList
        autoplay
        autoplayDelay={6}
        autoplayLoop
        autoplayLoopKeepAnimation
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
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPress(index)}>
            <ImageComponent
              source={
                typeof item === "string"
                  ? { uri: item }
                  : typeof item == "object"
                  ? { uri: item.image }
                  : item
              }
            />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ImageSlider;

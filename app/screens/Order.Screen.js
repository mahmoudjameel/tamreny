// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TouchableNativeFeedback, Image } from "react-native";
import axios from "axios";
import { API_URL } from "../settings/Config";
import { Header } from "../components/index";
import { useThemeContext } from "../helpers/AppProvider";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

const Order = (props) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  const [imagebase64, setImageBase64] = useState(null);

  const selectedMethod = props?.route?.params?.selectedMethod;
  const product = props?.route?.params?.product;
  const order = props?.route?.params?.order;
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status: cameraPerm } = await Permissions.askAsync(
          Permissions.CAMERA
        );

        const {
          status: cameraRollPerm,
        } = MediaLibrary.requestPermissionsAsync();

        if (cameraPerm !== "granted" && cameraRollPerm !== "granted") {
          alert("نحتاج صلاحية الوصول الى الصور من اجل ارفاق صورة الدفع");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImageBase64("data:image/jpg;base64," + result.base64);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const onSavePhoto = async () => {
    if (!imagebase64) {
      alert("رجاءا اختر الصورة اولا");
    }
    try {
      let response = await axios.post(`${API_URL}/orders/uploadImage`, {
        paymentImage: imagebase64,
        orderID: order._id,
      });
      let data = await response.data;
      if (data.status) {
        alert("تم رفع الصورة بنجاح");
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
    padding: 25px 15px;
    padding-bottom: 70px;
  `;

  const Title = styled.Text`
    font-family: Cairo-Bold;
    font-size: 20px;
    text-align: center;
    margin: 10px 0px 20px;
  `;

  const MainImage = styled.Image`
    height: 200px;
    width: 100%;
    resize-mode: cover;
  `;

  const MainImageContainer = styled.View`
    border-radius: 12px;
    elevation: 8;
    border: 1px ${Colors.black + "11"};
    overflow: hidden;
    width: 100%;
    height: 200px;
    margin: 0 0 25px;
    background-color: ${Colors.primary};
  `;

  const NormalText = styled.Text`
    font-size: ${(props) => props.size || 18}px;
    font-family: ${(props) => (props.bold ? "Cairo-Bold" : "Cairo-SemiBold")};
    line-height: 34px;
    text-align: ${(props) => (props.center ? "center" : "right")};
    color: ${(props) => props.color || Colors.black};
  `;

  const Box = styled.View`
    border-radius: 8px;
    background-color: ${(props) => props.color || Colors.black};
    padding: 3px 15px;
    overflow: hidden;
    width: 48%;
    justify-content: center;
    align-items: center;
  `;

  const RowContainer = styled.View`
    flex-direction: row-reverse;
    margin: 15px 0px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `;

  const Line = styled.View`
    background-color: ${Colors.darkGray};
    width: 100%;
    height: 2px;
    border-radius: 8px;
    align-self: center;
    margin: 20px 10px;
  `;

  const Btn = styled.View`
    border-radius: 8px;
    background-color: ${(props) => props.color || Colors.green};
    padding: 9px 25px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    margin: 15px;
  `;
  /******************************************************/

  return (
    <>
      <Header {...props} title="صفحة الطلب" backBtnEnabled />
      <ScrollContainer>
        <MainContainer>
          <Container>
            <NormalText center size={22} bold>
              رقم الطلب {order._id}#
            </NormalText>
            <RowContainer>
              <NormalText>حالة الطلب</NormalText>
              <Box>
                <NormalText color={Colors.white}>
                  {order.statusId == 1
                    ? "لم يتم الدفع"
                    : order.statusId == 2
                    ? "تم الدفع"
                    : "ملغي"}
                </NormalText>
              </Box>
            </RowContainer>
            <RowContainer>
              <NormalText>وسيلة الدفع</NormalText>
              <NormalText style={{ width: "50%" }} bold center>
                {selectedMethod.name}
              </NormalText>
            </RowContainer>
            <Line />

            <NormalText center size={22}>
              المنتج
            </NormalText>

            <NormalText style={{ marginTop: 15 }} center size={22} bold>
              {product.title}
            </NormalText>
            <NormalText
              style={{ marginTop: 25, marginBottom: 15 }}
              center
              size={22}
            >
              السعر{" "}
              <NormalText bold size={22}>
                {product.price}{" "}
              </NormalText>
              دينار عراقي
            </NormalText>
            <Line />
            <NormalText center size={22}>
              كيف يمكنني الدفع ؟
            </NormalText>
            <NormalText style={{ marginTop: 15 }} center>
              {selectedMethod.description}
            </NormalText>

            <TouchableNativeFeedback useForground onPress={pickImage}>
              <Btn style={{ marginTop: 25 }} color={Colors.primary}>
                <NormalText color={Colors.white}>
                  ارفاق صورة المعاملة
                </NormalText>
              </Btn>
            </TouchableNativeFeedback>
            {image && (
              <>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
                <TouchableNativeFeedback useForground onPress={onSavePhoto}>
                  <Btn style={{ marginTop: 25 }} color={Colors.primary}>
                    <NormalText color={Colors.white}>إرسال الصورة</NormalText>
                  </Btn>
                </TouchableNativeFeedback>
              </>
            )}

            <TouchableNativeFeedback useForground onPress={() => null}>
              <Btn color={Colors.red}>
                <NormalText color={Colors.white}>الغاء الطلب</NormalText>
              </Btn>
            </TouchableNativeFeedback>
          </Container>
        </MainContainer>
      </ScrollContainer>
    </>
  );
};

export default Order;

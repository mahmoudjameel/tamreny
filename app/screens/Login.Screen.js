import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import axios from "axios";
import {
  useThemeContext,
  useAuthContext,
  useAppContext,
} from "../helpers/AppProvider";
import { API_URL } from "../settings/Config";

const Login = ({ navigation }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;
  const { setIsLoading } = useAppContext();
  const { setIsLoggedIn } = useAuthContext();

  const [user, setUser] = useState({ user: "", password: "" });

  const login = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${API_URL}/users/login`, user);
      let data = await response.data;

      if (!data.status) {
        alert(data.errors);
        setIsLoading(false);
        return;
      }

      await AsyncStorage.setItem(
        "@access_token",
        JSON.stringify(data.accessToken)
      );
      await AsyncStorage.setItem("@user_data", JSON.stringify(data.user));


      setIsLoggedIn(true);
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (e) {
      setIsLoading(false);
      alert(e.message);
    }
  };
  /******************************************************/

  return (
    <Container bgColor={Colors.white}>
      <LogoContainer>
        <Logo
          source={require(// @ts-ignore
          "../assets/img/logo.png")}
        />
      </LogoContainer>
      <InputTitle>اسم المستخدم أو البريد الالكتروني</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="اسم المستخدم أو البريد الالكتروني"
        value={user.user}
        onChangeText={(value) => setUser({ ...user, user: value })}
      />
      <InputTitle>كلمة المرور</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="كلمة المرور"
        secureTextEntry
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
      />
      <TouchableNativeFeedback onPress={() => login()} useForeground>
        <Btn bgColor={Colors.primary} style={{ marginTop: 40 }}>
          <BtnText color={Colors.white}>تسجيل الدخول</BtnText>
        </Btn>
      </TouchableNativeFeedback>
      <NoticeText
        color={Colors.black}
        onPress={() => navigation.navigate("Home")}
        style={{
          marginBottom: 0,
          marginTop: 15,
          fontFamily: "Cairo-SemiBold",
          color: Colors.primary,
        }}
      >
        العودة الي الصفحة الرئيسية
      </NoticeText>
      <NoticeText color={Colors.black}>اذا لم يكن لديك حساب مسبقا</NoticeText>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("Register")}
        useForeground
      >
        <Btn bgColor={Colors.primary} style={{ marginBottom: 50 }}>
          <BtnText color={Colors.white}>حساب جديد</BtnText>
        </Btn>
      </TouchableNativeFeedback>
    </Container>
  );
};

const Input = styled.TextInput`
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 14px;
  font-family: Cairo-Regular;
  padding: 8px 15px;
  margin-top: 8px;
  text-align: right;
  elevation: 5;
  background-color: ${(props) => props.bgColor};
`;

const Container = styled.ScrollView`
  padding: 15px;
  background-color: ${(props) => props.bgColor};
`;
const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 30px 0px 80px;
  height: 200px;
`;
const Logo = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

const InputTitle = styled.Text`
  font-size: 18px;
  font-family: Cairo-SemiBold;
  margin-top: 20px;
`;
const Btn = styled.View`
  background-color: ${(props) => props.bgColor};
  width: 80%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1.5px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 15px 0px;
  elevation: 6;
  align-self: center;
`;
const BtnText = styled.Text`
  font-family: Cairo-SemiBold;
  color: ${(props) => props.color};
  font-size: 20px;
`;
const NoticeText = styled.Text`
  font-family: Cairo-Regular;
  color: ${(props) => props.color};
  font-size: 16px;
  text-align: center;
  margin-top: 40px;
`;
export default Login;

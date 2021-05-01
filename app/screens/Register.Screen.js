import React, { useState } from "react";
import { TouchableNativeFeedback } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";
import {
  useThemeContext,
  useAuthContext,
  useAppContext,
} from "../helpers/AppProvider";
import { API_URL } from "../settings/Config";

const Register = ({ navigation }) => {
  const Theme = useThemeContext();
  let Colors = Theme.Colors;

  const { setIsLoading } = useAppContext();
  const { setIsLoggedIn } = useAuthContext();

  const [user, setUser] = useState({
    username: "",
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    passwordConfirm: "",
  });

  const register = async () => {
    try {
      setIsLoading(true);
      let response = await axios.post(`${API_URL}/users/register`, user);
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
      alert(data.messages);
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
      <InputTitle>رقم الهاتف</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="رقم الهاتف"
        value={user.phoneNumber}
        onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
      />
      <InputTitle>اسم المستخدم</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="اسم المستخدم"
        value={user.username}
        onChangeText={(value) => setUser({ ...user, username: value })}
      />
      <InputTitle>البريد الالكتروني</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="البريد الالكتروني"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
      />
      <InputTitle>الاسم بالكامل</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="الاسم بالكامل"
        value={user.name}
        onChangeText={(value) => setUser({ ...user, name: value })}
      />
      <InputTitle>كلمة المرور</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="كلمة المرور"
        secureTextEntry
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
      />
      <InputTitle>تأكيد كلمة المرور</InputTitle>
      <Input
        bgColor={Colors.white}
        placeholder="تأكيد كلمة المرور"
        secureTextEntry
        value={user.passwordConfirm}
        onChangeText={(value) => setUser({ ...user, passwordConfirm: value })}
      />
      <TouchableNativeFeedback onPress={() => register()} useForeground>
        <Btn bgColor={Colors.primary} style={{ marginTop: 40 }}>
          <BtnText color={Colors.white}>تسجيل</BtnText>
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
      <NoticeText color={Colors.black}>هل لديك حساب بالفعل ؟</NoticeText>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("Login")}
        useForeground
      >
        <Btn bgColor={Colors.primary} style={{ marginBottom: 50 }}>
          <BtnText color={Colors.white}>تسجيل الدخول</BtnText>
        </Btn>
      </TouchableNativeFeedback>
    </Container>
  );
};

const Container = styled.ScrollView`
  padding: 15px;
  background-color: ${(props) => props.bgColor};
`;
const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 30px 0px 50px;
  height: 200px;
`;
const Logo = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;
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

export default Register;

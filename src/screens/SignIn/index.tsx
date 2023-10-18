import { useEffect, useState } from "react";
import {
  GoogleSignin
} from "@react-native-google-signin/google-signin";

import { Container, Slogan, Title } from "./styles";
import { EXPO_CLIENT_ID } from "@env";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

interface UserInfo {
  idToken: string | null;
  scopes?: string[] | undefined | null;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    photo: string | null;
    [Symbol.iterator]?: () => IterableIterator<any>;
  };
}

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    idToken: "",
    scopes: [],
    user: { id: "", name: "", email: "", photo: "" },
  });
  //const app = useApp();

  async function googleSignin() {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();

      setUserInfo(user);
    } catch (error) {
      console.log("ERRO AO LOGAR NO GOOGLE", error);
    }
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: EXPO_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    console.log("userInfo", userInfo);
    if (userInfo?.idToken !== "" && userInfo?.idToken !== null) {
      //const credentials = Realm.Credentials.jwt(userInfo.idToken);
      /*app.logIn(credentials).catch((error) => {
        console.log("🚀 ~ file: index.tsx:84 ~ useEffect ~ error:", error)
        Alert.alert(`erro ao logar ${error}`)
      })*/
    }
  }, [userInfo]);

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com o Google"
        isLoading={isAuthenticating}
        onPress={googleSignin}
      />
    </Container>
  );
}

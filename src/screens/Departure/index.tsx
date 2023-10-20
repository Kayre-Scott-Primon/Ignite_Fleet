import { Alert, TextInput, ScrollView } from "react-native";
import { useRealm } from "../../libs/realm";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Historic } from "../../libs/realm/schemas/Historic";
import { TextAreaInput } from "../../components/TextAreaInput";
import { LicensePlateInput } from "../../components/LicensePlateInput";
import { licensePlateValidate } from "../../utils/licensePlateValidate";

import { Container, Content } from "./styles";

import { useUser } from "@realm/react";
import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function Departure() {
  const [description, setDescription] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const { goBack } = useNavigation();
  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus();
        return Alert.alert(
          "Placa inválida",
          "Por favor, digite uma placa válida"
        );
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus();
        return Alert.alert(
          "Finalidade inválida",
          "Por favor, digite uma finalidade válida"
        );
      }

      setIsRegistering(true);

      realm.write(() => {
        realm.create(
          "Historic",
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate,
            description,
          })
        );
      });

      Alert.alert(
        "Saída registrada",
        "A saída do veículo foi registrada com sucesso"
      );

      goBack();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro na saída",
        "Ocorreu um erro ao registrar a saída do veículo, tente novamente mais tarde"
      );
      setIsRegistering(false);
    }
  }

  return (
    <Container>
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="ABC1R23"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={(text) => setLicensePlate(text.toUpperCase())}
            />
            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou utilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              blurOnSubmit
              onChangeText={setDescription}
            />
            <Button
              title="Registrar saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}

import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import { Alert } from "react-native";
import { BSON } from "realm";

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";
import { getLastAsyncTimestamp } from "../../libs/asyncStorage/syncStorage";

type RoutePramsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RoutePramsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);
  const realm = useRealm();
  const { goBack } = useNavigation();

  const title = historic?.status === "departure" ? "Chegada" : "Detalhes";
  const [dataNotSynced, setDataNotSynced] = useState(false);

  function handleRemoveVehicleUsage() {
    Alert.alert(
      "Cancelar veículo",
      "Deseja realmente cancelar o uso do veículo?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            removeVehicleUsage();
          },
        },
      ],
      { cancelable: false }
    );
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic);
    });

    goBack();
  }

  function handleArrivalRegister() {
    try {
      if (!historic) {
        Alert.alert(
          "Erro",
          "Não foi possível obter os dados para registrar a chegada do veículo"
        );
      } else {
        realm.write(() => {
          historic.status = "arrival";
          historic.updated_at = new Date();
        });

        Alert.alert("Sucesso", "Chegada do veículo registrada com sucesso");

        goBack();
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível registrar a chegada do veículo");
      console.log(err);
    }
  }

  useEffect(() => {
    getLastAsyncTimestamp().then((lastSync) => {
      setDataNotSynced(historic!.updated_at.getTime() > lastSync);
    });
  }, []);

  return (
    <Container>
      <Header title={title} />
      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === "departure" && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar chegada" onPress={handleArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sincronização de
          {historic?.status === "departure" ? " partida " : " chegada "}
          pendente
        </AsyncMessage>
      )}
    </Container>
  );
}

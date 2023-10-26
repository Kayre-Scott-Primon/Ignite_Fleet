import { reverseGeocodeAsync } from "expo-location";

type Props = {
  latitude: number;
  longitude: number;
};

export async function getAddressLocation({ latitude, longitude }: Props) {
  try {
    const addessResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addessResponse[0]?.street;
  } catch (error) {
    console.log(error);
  }
}

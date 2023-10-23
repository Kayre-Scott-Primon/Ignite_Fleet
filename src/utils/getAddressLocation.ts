import { reverseGeocodeAsync, LocationObjectCoords } from "expo-location";

export async function getAddressLocation({
  latitude,
  longitude,
}: LocationObjectCoords) {
  try {
    const addessResponse = await reverseGeocodeAsync({ latitude, longitude });

    return addessResponse[0]?.street;
  } catch (error) {
    console.log(error);
  }
}

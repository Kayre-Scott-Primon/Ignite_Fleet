import { IconBox, IconBoxPros } from "../IconBox";
import { Container, Description, Info, Label } from "./styles";

export type LocationInfoProps = {
  label: string;
  description: string;
};

type Props = LocationInfoProps & {
  icon: IconBoxPros;
};

export function LocationInfo({ label, icon, description }: Props) {
  return (
    <Container>
      <IconBox icon={icon} />
      <Info>
        <Label numberOfLines={1}>{label}</Label>

        <Description numberOfLines={1}>{description}</Description>
      </Info>
    </Container>
  );
}

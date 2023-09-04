import FisicaIcon from "../screens/places/icons/FisicaIcon";
import AuditivaIcon from "../screens/places/icons/Auditivaicon";
import VisualIcon from "../screens/places/icons/Visualicon";

export const S3_BUCKET_URL = 'https://hannu-files.s3.amazonaws.com/';

export const ACCESIBILIDADES: any = {
    1: {
        id: 1,
        nombre: "Fisica",
        imagen: FisicaIcon,
    }, 2: {
        id: 2,
        nombre: "Auditiva",
        imagen: AuditivaIcon,
    }, 3: {
        id: 3,
        nombre: "Visual",
        imagen: VisualIcon,
    },
}
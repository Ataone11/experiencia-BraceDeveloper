import { IsString } from "class-validator";

export class UploadScreenshotsDto {
    @IsString()
    usuario: string;
}
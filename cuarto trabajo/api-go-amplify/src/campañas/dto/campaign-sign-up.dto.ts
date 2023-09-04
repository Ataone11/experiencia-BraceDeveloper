import { IsNumber, IsString } from "class-validator";

export class CampaignSignUpDto {
    @IsString()
    usuario: string;

    @IsNumber()
    horario: number;   
}
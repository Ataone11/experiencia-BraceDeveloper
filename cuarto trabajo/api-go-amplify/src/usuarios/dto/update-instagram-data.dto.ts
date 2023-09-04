import { IsNumber, IsString } from 'class-validator';

export class UpdateInstagramDataDto {
    @IsString()
    instagram: string;

    @IsNumber()
    seguidores: number;
}

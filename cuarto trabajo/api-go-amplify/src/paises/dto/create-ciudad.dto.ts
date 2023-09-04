import { IsNumber, IsOptional, IsString } from "class-validator";
import { Position } from "geojson";

export class CreateCiudadDto {
    @IsOptional()
    multipolygon?: Position[][][]

    @IsNumber()
    pais: number;

    @IsString()
    nombre: string;
}
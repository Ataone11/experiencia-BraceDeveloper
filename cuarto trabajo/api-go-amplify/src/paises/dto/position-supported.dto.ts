import { IsNumber, IsOptional, IsString } from "class-validator";
import { Position } from "geojson";

export class PositionSuportedDto {
    @IsNumber()
    longitud: number;

    @IsNumber()
    latitud: number;
}
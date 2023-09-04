import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEmpty, IsOptional } from 'class-validator';
import { CreateLugarDto } from './create-lugar.dto';

export class UpdateLugarDto extends PartialType(CreateLugarDto) {
    @IsOptional()
    mediasBorrar: string[] | string;

    @IsEmpty()
    estado: number;
}

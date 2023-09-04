import { IsArray } from 'class-validator';
export class CreateInteresesDto {  
  @IsArray()
  categorias: number[];
}

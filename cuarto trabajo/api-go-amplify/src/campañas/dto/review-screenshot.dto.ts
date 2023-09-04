import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ReviewScreenshotDto {
  @IsBoolean()
  aprobar: boolean;

  @IsString()
  @IsOptional()
  razon_rechazo_pantallazos: string;
}

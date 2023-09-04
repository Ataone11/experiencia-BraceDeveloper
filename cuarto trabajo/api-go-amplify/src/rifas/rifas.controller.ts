import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { RifasService } from './rifas.service';

@Controller('rifas')
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}
  @Get('')
  TraerRifas() {
    return this.rifasService.traerRifas();
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'imagen', maxCount: 1 }]))
  update(
    @UploadedFiles() files: { imagen?: Express.Multer.File },
    @Param('id') id: number,
    @Body() updateRifaDto: UpdateRifaDto,
  ) {
    const { imagen } = files || null;

    return this.rifasService.update(
      id,
      updateRifaDto,
      imagen ? imagen[0] : null,
    );
  }
}

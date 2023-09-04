import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  Get,
  Put,
  UseInterceptors,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { UpdateCamapañaDto } from './dto/update-campaña.dto';
import { CampañasService } from './campañas.service';
import { TraerCampañasDto } from './dto/traer-campañas.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CampaignSignUpDto } from './dto/campaign-sign-up.dto';
import { UploadScreenshotsDto } from './dto/upload-screenshots.dto';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { GetCampaignUsersDto } from './dto/get-campaign-users.dto';
import { ReviewScreenshotDto } from './dto/review-screenshot.dto';

@Controller('campanias')
export class CampañasController {
  constructor(private readonly campañasService: CampañasService) { }
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgCampania', maxCount: 1 },
      { name: 'imgMuestra', maxCount: 1 },
      { name: 'materialGrafico', maxCount: 1 },
    ]),
  )
  updateCampaña(
    @Param('id') id: number,
    @Body() updateCampañaDto: UpdateCamapañaDto,
    @UploadedFiles()
    files: {
      imgCampania?: Express.Multer.File[];
      imgMuestra?: Express.Multer.File[];
      materialGrafico?: Express.Multer.File[];
    },
  ) {
    const { imgCampania, imgMuestra, materialGrafico } = files || {};
    return this.campañasService.updateCampaña(
      id,
      updateCampañaDto,
      imgCampania && imgCampania[0],
      imgMuestra && imgMuestra[0],
      materialGrafico && materialGrafico[0],
    );
  }

  @Get('categorias')
  findCategorias() {
    return this.campañasService.getCategorias();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgCampania', maxCount: 1 },
      { name: 'imgMuestra', maxCount: 1 },
      { name: 'materialGrafico', maxCount: 1 },
    ]),
  )
  createCampaña(
    @UploadedFiles()
    files: {
      imgCampania?: Express.Multer.File[];
      imgMuestra?: Express.Multer.File[];
      materialGrafico?: Express.Multer.File[];
    },
    @Body() crearCamapañaDto: CreateCampaignDto,
  ) {
    const { imgCampania, imgMuestra, materialGrafico } = files || {};

    return this.campañasService.createCampaña(
      crearCamapañaDto,
      imgCampania && imgCampania[0],
      imgMuestra && imgMuestra[0],
      materialGrafico && materialGrafico[0],
    );
  }

  @Get()
  findCampanias(@Query() traerCampañaDto: TraerCampañasDto) {
    return this.campañasService.traerCampañas(traerCampañaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Query('user') userId?: string) {
    return this.campañasService.findOne(id, userId);
  }

  @Get(':id/personas-inscritas')
  findCampaignUsers(@Param('id') id: number, @Query() getCampaignUsersDto: GetCampaignUsersDto) {
    return this.campañasService.findCampaignUsers(id, getCampaignUsersDto);
  }

  @Delete('/:id')
  removeCampaña(@Param('id') id: number) {
    return this.campañasService.removeCampaña(id);
  }

  @Post(':id/inscribir')
  signUpToCampaign(@Param('id') id: number, @Body() campaignSignUpDto: CampaignSignUpDto) {
    return this.campañasService.signUpToCampaign(id, campaignSignUpDto);
  }

  @Post(':id/pantallazos')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'pantallazos' },
  ]))
  uploadScreenshots(@UploadedFiles() files: { pantallazos?: Express.Multer.File[] }, @Param('id') campañaId: number, @Body() uploadScreenshotsDto: UploadScreenshotsDto) {
    const { pantallazos } = files || {};

    return this.campañasService.uploadScreenshots(uploadScreenshotsDto.usuario, campañaId, pantallazos);
  }

  @Patch(':id/usuarios/:userId/revisar-pantallazos')
  reviewScreenshot(@Param('id') campaignId: number, @Param('userId') userId: string, @Body() reviewScreenshotDto: ReviewScreenshotDto) {
    return this.campañasService.reviewScreenshot(userId, campaignId, reviewScreenshotDto);
  }

  @Post("make-post")
  changeStateToMakePost(@Query() makePostDto: any) {
    return this.campañasService.makePost(makePostDto.id);
  }

  @Post("change-to-upload-screenshots")
  changeStateToUploadScreenshots(@Query() changeToUplaodScreenshotsDto: any) {
    return this.campañasService.changeStateToUploadScreenshots(changeToUplaodScreenshotsDto.id);
  }

  @Post("24-h-reminder")
  make24HReminder(@Query() make24HReminder: any) {
    return this.campañasService.make24HReminder(make24HReminder.id);
  }

  @Post("72-h-reminder")
  make72HReminder(@Query() make72HReminder: any) {
    return this.campañasService.make72HReminder(make72HReminder.id);
  }
}

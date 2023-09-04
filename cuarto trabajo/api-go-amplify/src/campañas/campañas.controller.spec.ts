import { Test, TestingModule } from '@nestjs/testing';
import { CampañasController } from './campañas.controller';

describe('CampañasController', () => {
  let controller: CampañasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampañasController],
    }).compile();

    controller = module.get<CampañasController>(CampañasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

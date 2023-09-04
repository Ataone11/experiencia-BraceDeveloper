import { Test, TestingModule } from '@nestjs/testing';
import { RifasController } from './rifas.controller';

describe('RifasController', () => {
  let controller: RifasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RifasController],
    }).compile();

    controller = module.get<RifasController>(RifasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

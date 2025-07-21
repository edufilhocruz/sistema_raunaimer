import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModeloCartaService } from './modelo-carta.service';
import { CreateModeloCartaDto } from './dto/create-modelo-carta.dto';
import { UpdateModeloCartaDto } from './dto/update-modelo-carta.dto';

@Controller('modelo-carta')
export class ModeloCartaController {
  constructor(private readonly modeloCartaService: ModeloCartaService) {}

  @Post()
  create(@Body() createModeloCartaDto: CreateModeloCartaDto) { /* ... */ }

  @Get()
  findAll() { /* ... */ }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modeloCartaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModeloCartaDto: UpdateModeloCartaDto) {
    return this.modeloCartaService.update(id, updateModeloCartaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modeloCartaService.remove(id);
  }
}

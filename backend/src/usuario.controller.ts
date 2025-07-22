import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.usuarioService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usuarioService.delete(id);
  }
} 
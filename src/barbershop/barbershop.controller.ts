import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BarbershopService } from './barbershop.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateBarbershopDto, UpdateBarbershopDto, BarbershopResponseDto } from './dto/barbershop.dto';

@ApiTags('Barberías')
@Controller('barbershops')
export class BarbershopController {
  constructor(private readonly barbershopService: BarbershopService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las barberías' })
  @ApiResponse({ status: 200, description: 'Lista de barberías', type: [BarbershopResponseDto] })
  async getAllBarbershops() {
    return this.barbershopService.getAllBarbershops();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una barbería por ID' })
  @ApiResponse({ status: 200, description: 'Barbería encontrada', type: BarbershopResponseDto })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async getBarbershopById(@Param('id') id: string) {
    return this.barbershopService.getBarbershopById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una nueva barbería' })
  @ApiResponse({ status: 201, description: 'Barbería creada exitosamente', type: BarbershopResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createBarbershop(@Body() createBarbershopDto: CreateBarbershopDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.barbershopService.createBarbershop(createBarbershopDto, token);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una barbería' })
  @ApiResponse({ status: 200, description: 'Barbería actualizada exitosamente', type: BarbershopResponseDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos o sin permisos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async updateBarbershop(
    @Param('id') id: string,
    @Body() updateBarbershopDto: UpdateBarbershopDto,
    @Request() req,
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return this.barbershopService.updateBarbershop(id, updateBarbershopDto, token);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una barbería' })
  @ApiResponse({ status: 200, description: 'Barbería eliminada exitosamente' })
  @ApiResponse({ status: 400, description: 'Sin permisos para eliminar' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Barbería no encontrada' })
  async deleteBarbershop(@Param('id') id: string, @Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.barbershopService.deleteBarbershop(id, token);
  }

  @Get('my/barbershops')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener mis barberías' })
  @ApiResponse({ status: 200, description: 'Lista de barberías del usuario', type: [BarbershopResponseDto] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getMyBarbershops(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.barbershopService.getMyBarbershops(token);
  }
}
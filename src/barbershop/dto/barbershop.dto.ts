import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateBarbershopDto {
  @ApiProperty({
    description: 'Nombre de la barbería',
    example: 'Barbería Clásica',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Dirección de la barbería',
    example: 'Calle Principal #123',
  })
  @IsNotEmpty({ message: 'La dirección es requerida' })
  address: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '555-123-4567',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'info@barberia.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email?: string;

  @ApiProperty({
    description: 'Descripción de la barbería',
    example: 'Barbería especializada en cortes clásicos y modernos',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateBarbershopDto extends CreateBarbershopDto {
  @ApiProperty({
    description: 'Estado activo de la barbería',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class BarbershopResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  ownerId: string;
}
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BarbershopService {
  private readonly barbershopServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    const serviceUrl = this.configService.get<string>('BARBERSHOP_SERVICE_URL');
    if (!serviceUrl) {
      throw new Error('BARBERSHOP_SERVICE_URL is not defined');
    }
    this.barbershopServiceUrl = serviceUrl;
  }

  async getAllBarbershops() {
    try {
      const response = await axios.get(`${this.barbershopServiceUrl}/barbershops`);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async getBarbershopById(id: string) {
    try {
      const response = await axios.get(`${this.barbershopServiceUrl}/barbershops/${id}`);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async createBarbershop(barbershopData: any, token: string) {
    try {
      const response = await axios.post(
        `${this.barbershopServiceUrl}/barbershops`,
        barbershopData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async updateBarbershop(id: string, barbershopData: any, token: string) {
    try {
      const response = await axios.put(
        `${this.barbershopServiceUrl}/barbershops/${id}`,
        barbershopData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async deleteBarbershop(id: string, token: string) {
    try {
      const response = await axios.delete(`${this.barbershopServiceUrl}/barbershops/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async getMyBarbershops(token: string) {
    try {
      const response = await axios.get(`${this.barbershopServiceUrl}/barbershops/my/barbershops`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  private handleAxiosError(error: any) {
    if (error.response) {
      throw new HttpException(
        error.response.data || 'Error en el servicio de barberías',
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new HttpException(
      'Error al conectar con el servicio de barberías',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
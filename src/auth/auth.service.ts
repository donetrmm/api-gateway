import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor(private readonly configService: ConfigService) {
    const authUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    if (!authUrl) {
      throw new Error('AUTH_SERVICE_URL is not defined');
    }
    this.authServiceUrl = authUrl;
  }

  async register(userData: any) {
    try {
      const response = await axios.post(`${this.authServiceUrl}/auth/register`, userData);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async login(credentials: any) {
    try {
      const response = await axios.post(`${this.authServiceUrl}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async validateToken(token: string) {
    try {
      const response = await axios.get(`${this.authServiceUrl}/auth/validate`, {
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
      console.error('Error de respuesta:', error.response.data);
      console.error('Estado HTTP:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
      
      throw new HttpException(
        error.response.data || 'Error en el servicio de autenticación',
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } else if (error.request) {
      console.error('Error de solicitud:', error.request);
      throw new HttpException(
        'No se recibió respuesta del servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else {
      console.error('Error:', error.message);
      throw new HttpException(
        'Error al conectar con el servicio de autenticación',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
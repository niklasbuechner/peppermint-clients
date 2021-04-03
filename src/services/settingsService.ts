import { Capacitor } from '@capacitor/core';

import { AxiosInstance } from 'axios';
import { User } from '../types/User';

const plattformIsMobile = Capacitor?.isNative;

export default class SettingsService {
  private readonly apiClient: AxiosInstance

  constructor(options: {
    apiClient: AxiosInstance
  }) {
    this.apiClient = options.apiClient;
  }

  public loginUser = async (user: User) => {
    try {
      const response = await this.apiClient.post('/users/authorize', user);

      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('couldn\'t login');
      }
      throw new Error(error.response.data.status);
    }
  };

  public registerUser = async (user: User) => {
    try {
      const response = await this.apiClient.post('/register', user);

      return response.data.user;
    } catch (error) {
      if (!error.response) {
        throw new Error('couldn\'t create user');
      }
      throw new Error(error.response.data.status);
    }
  };
}
import axios from 'axios';
import { makeAutoObservable } from 'mobx'

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ILogin {
  email: string;
  password: string;
}
export interface IRegister extends ILogin {
  fullName: string;
}

class UserStore {
  user: IUser | null = null;
  token: string = '';


  constructor() {
    makeAutoObservable(this, {}, { deep: true })
    // deep для глубоко отслеживания изменений состояния 
  }


  async geyUser() {
    try {
      const token = this.token;
      console.log('Token', token)
      const res = await fetch('http://localhost:4444/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      // console.log('GetMeThunk', data)
      this.user = data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async register(body: IRegister) {
    try {
      const res = await fetch('http://localhost:4444/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      console.log('Register', data)
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  async login(body: ILogin) {
    try {
      const res = await fetch('http://localhost:4444/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      console.log('Login', data)
      this.token = data.token
      this.user = data
      return data.token
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

  logOut() {
    this.user = null
    this.token = ''
  }
  // getTokenStorage() {
  //   this.token = window.localStorage.getItem('token')
  // }

}

export default new UserStore
import { defineStore } from 'pinia';

type user = {
  id: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string,
  faculty: string,
  branch: string,
  phone: string,
  lineId: string,
  picture: null,
  facebookName: string
};

export const useUserStore = defineStore('user', {
  state() {
    return {
      user: {
        id: 0,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        faculty: '',
        branch: '',
        phone: '',
        lineId: '',
        picture: null,
        facebookName: ''
      },
    }
  },
  getters: {
    getUser(): user{
      return this.user;
    }
  },
  actions: {
    setUser(user: user) {
      this.user = user;
    },
    resetUser() {
      this.user = {
        id: 0,
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        role: '',
        faculty: '',
        branch: '',
        phone: '',
        lineId: '',
        picture: null,
        facebookName: ''
      }
    }
  }
});


<template>
  <div class="container">
    <h1 class="text-center">รายชื่ออาจารย์</h1>
    <div class="row">
      <div class="cols-12 col-sm-3 col-md-4" v-for="teacher, index in teachers" :key="index">
        <div class="card">
          <div class="text-center">
            <img :src="`data:image/png;base64, ${teacher.profileImg}`" width="140" class="rounded-circle img">
            <h3 class="mt-2">อาจารย์ {{ teacher.firstName }} {{ teacher.lastName }}</h3>

            <br>
            <div class="row">
              <div class="col-md-6">
                <label>line</label>
              </div>
              <div class="col-md-6">
                <p>{{ teacher.lineId }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>เบอร์โทรศัพท์</label>
              </div>
              <div class="col-md-6">
                <p>{{ teacher.phone }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p>{{ teacher.email }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Facebook</label>
              </div>
              <div class="col-md-6">
                <p>{{ teacher.facebookName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from 'axios';
import Swal from 'sweetalert2'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      teachers: [],
      selectedTeacher: {
        id: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        faculty: '',
        branch: '',
        phone: '',
        lineId: '',
        facebookName: '',
        picNew: '',
      }
    }
  },
  async mounted() {
    await this.getTeacher()
  },
  methods: {
    async getTeacher() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/teachers/getAllTeacher', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.teachers = response.data.result;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

.img{
  width: 150px;
  height: 150px;
  
  }
.card {
  height: 400px;
  border-radius: 0.5rem;
  box-shadow: 14px 14px 20px #cbced1;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  
}
</style>
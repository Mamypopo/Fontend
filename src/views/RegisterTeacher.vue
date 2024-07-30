<template>
  <div class="container">
    <h1 class="title">ลงทะเบียนสำหรับอาจารย์</h1>
    <Form class="row" @submit="register">
      <div class="row">
        <div class="col">
          <label for="username" class="form-label">อีเมล</label>
          <Field rules="requiredusername" type="email" class="inputs" name="username" v-model="username"
            placeholder="อีเมล" />
          <ErrorMessage class="small text-danger" name="username" />
          <br>
        </div>
        <div class="col">
          <label for="password" class="form-label">รหัสผ่าน</label>
          <Field rules="requiredpass" type="password" class="inputs" name="password" v-model="password"
            placeholder="รหัสผ่าน" />
          <ErrorMessage class="small text-danger" name="password" />
          <br>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="fristname" class="form-label">ชื่อ</label>
          <Field rules="requiredfname" type="text" class="inputs" name="fristname" v-model="teacherFname"
            placeholder="ชื่อ" />
          <ErrorMessage class="small text-danger" name="fristname" />
          <br>
        </div>

        <div class="col">
          <label for="lastname" class="form-label">นามสกุล</label>
          <Field rules="requiredlname" type="text" class="inputs" name="lastname" v-model="teacherLname"
            placeholder="นามสกุล" />
          <ErrorMessage class="small text-danger" name="lastname" />
          <br>

        </div>


      </div>
      <div class="col-sm-4">
        <label for="formFile" class="col-form-label">รูปภาพ</label>
        <Field rules="required" class="inputs" v-model="pic" name="formFile" type="file" />
        <ErrorMessage class="small text-danger" name="formFile" />
        <br>
      </div>
      <div class="row">

        <div class="col">
          <label for="faculty" class="form-label">คณะ</label>
          <Field rules="requiredfaculty" type="text" class="inputs" name="faculty" v-model="faculty" placeholder="คณะ" />
          <ErrorMessage class="small text-danger" name="faculty" />
          <br>

        </div>

        <div class="col">
          <label for="branch" class="form-label">สาขา</label>
          <Field rules="requiredbranch" type="text" class="inputs" name="branch" v-model="branch" placeholder="สาขา" />
          <ErrorMessage class="small text-danger" name="branch" />
          <br>

        </div>
      </div>

      <div class="row">
        <div class="col">
          <label for="Line" class="form-label">Line</label>
          <Field type="text" class="inputs" name="Line" v-model="line" placeholder="Line" />

        </div>

        <div class="col">
          <label for="facebook" class="form-label">Facebook</label>
          <Field type="text" class="inputs" name="facebook" v-model="facebook" placeholder="Facebook" />
          <br>

        </div>

        <div class="col-sm-3">
          <label for="phone" class="form-label">เบอร์โทรศัพท์</label>
          <Field rules="requiredphone" type="text" class="inputs" name="phone" v-model="phone"
            placeholder="เบอร์โทรศัพท์" />
          <ErrorMessage class="small text-danger" name="phone" />
          <br>
        </div>

      </div>



      <div class="justify-content-center d-flex">
        <button type="submit" class="btn btn-success">ลงทะเบียน</button>
      </div>
    </Form>
  </div>
</template>
<script lang="ts" >
import { Form, Field, ErrorMessage } from 'vee-validate';
import Swal from 'sweetalert2';
import axios from 'axios';

import { useUserStore } from '../stores/user';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data: () => ({
    username: '',
    password: '',
    teacherId: '',
    phone: '',
    teacherFname: '',
    teacherLname: '',
    faculty: '',
    branch: '',
    line: '',
    facebook: '',
    pic: ''
  }),
  methods: {
    async register() {
      try {
        const { isConfirmed } = await Swal.fire({
          icon: 'question',
          title: 'ยืนยันที่จะสมัครสมาชิกใช่หรือไม่',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        });


        const formData = new FormData();

        formData.append('email', this.username);
        formData.append('role', 'teacher');
        formData.append('password', this.password)
        formData.append('firstName', this.teacherFname)
        formData.append('lastName', this.teacherFname)
        formData.append('studentId', this.teacherId)
        formData.append('faculty', this.faculty)
        formData.append('branch', this.branch)
        formData.append('lineId', this.line)
        formData.append('phone', this.phone)
        formData.append('picture', this.pic);
        formData.append('facebookName', this.facebook);


        if (isConfirmed) {
          const response = await axios.post('http://localhost:8000/api/v1/auth/register', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          useUserStore().setUser(response.data.result.user)
          localStorage.setItem('token', response.data.result.token)
          await Swal.fire({
            icon: 'success',
            title: 'สมัครสมาชิกเรียบร้อย',
          })
          this.$router.push('/')
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response!.data.cause === 'duplicate username') {
            await Swal.fire({
              icon: 'error',
              title: 'ชื่อผู้ใช้งานซ้ำกับในระบบ',
              text: 'กรุณาลองใหม่อีกครั้ง',
            });
            return;
          }
        }
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาลองใหม่อีกครั้งภายหลัง',
        });
      }

    }

  }

}
</script>
<style scoped>
.center {
  text-align: center;
}

input {
  caret-color: red;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #ecf0f3;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  place-items: center;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 900px;
  height: auto;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 14px 14px 20px #cbced1;
  font-family: "Poppins", sans-serif;
}



.title {
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 1.8rem;
  color: #6AFB92;
  letter-spacing: 1px;
  text-align: center;
}

.inputs {
  text-align: left;
  margin-top: 14px;
}

label,
input,
button {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
}

label {
  margin-bottom: 4px;

}

label:nth-of-type(2) {
  margin-top: 12px;
}

input::placeholder {
  color: gray;
}

input {
  background: #ffffff;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px -5px #000000;
}

button {
  color: white;
  margin-top: 20px;
  background: #6AFB92;
  height: 40px;
  width: 300px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}</style>
<template>
    <div class="container">
      <h1 class="title">แก้ไขรหัสผ่าน</h1>
      <Form class="row" @submit="resetPasswordStudent">
        <div class="row">
          <div class="col">
            <label for="email" class="form-label">อีเมล</label>
            <Field rules="requiredusername" type="email" class="inputs" name="email" v-model="email"
              placeholder="อีเมล" />
            <ErrorMessage class="small text-danger" name="username" />
            <br>
            <div class="col">
                <label for="password" class="form-label">รหัสผ่านใหม่</label>
                <Field rules="requiredpass" type="password" class="inputs" name="password" v-model="password"
                  placeholder="รหัสผ่าน" />
                <ErrorMessage class="small text-danger" name="password" />
                <br>
                <label for="password" class="form-label">ยืนยันรหัสผ่านใหม่</label>
                <Field rules="requiredpass" type="password" class="inputs" name="confirmpassword" v-model="confirmpassword"
                  placeholder="รหัสผ่าน" />
                <ErrorMessage class="small text-danger" name="password" />
                <br>
              </div>
          </div>  
          <div class="col-sm-5">
            <label for="phone" class="form-label">เบอร์โทรศัพท์</label>
           <Field rules="requiredpass" type="phone" class="inputs" name="phone" v-model="phone"
             placeholder="เบอร์โทรศัพท์" />
           <ErrorMessage class="small text-danger" name="phone" />
         </div>       
        </div>

        <div class="justify-content-center d-flex">
          <button type="submit" class="btn btn-success">แก้ไขรหัสผ่าน</button>
        </div>
      </Form>
    </div>
  </template>
  <script lang="ts" >
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
  
    data: () => {
    return {
      email: "",
      password: "",
      confirmpassword: "",
      phone:'',

    };
  },
    methods: {
      async resetPasswordStudent() {
        try {
          const { isConfirmed } = await Swal.fire({
            icon: 'question',
            title: 'ยืนยันที่จะเปลี่ยนรหัสผ่านใช่หรือไม่',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
          });
  
          const formData = new FormData();

            formData.append('email', this.email);
            formData.append('password', this.password)
            formData.append('phone', this.phone)

          if (isConfirmed) {
            const response = await axios.post('http://localhost:8000/api/v1/students/resetPasswordStudent', formData , {
          
            })
            
            await Swal.fire({
              icon: 'success',
              title: 'เปลี่ยนรหัสผ่านเรียบร้อย',
            })
          }
        } catch (error) {
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
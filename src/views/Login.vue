<template>
  <div class="container">
    <vForm @submit="login">
      <h1 class="title">เข้าสู่ระบบ</h1>
      <Field rules="required" type="text" name="username" v-model="email" placeholder="Username" class="inputs" />
      <ErrorMessage name="username" class="small text-danger" />
      <Field rules="required" type="password" name="password" v-model="password" placeholder="Password" class="inputs" />
      <ErrorMessage name="password" class="small text-danger" />
      <div class="justify-content-center d-flex">
        <button class="button" type="submit">เข้าสู่ระบบ</button>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a href="register-user" class="btn" type="button"> ลงทะเบียน</a>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <a href="reset-password" class="btn" type="button"> ลืมรหัสผ่าน</a>
      </div>
    </VForm>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useUserStore } from "../stores/user";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "LoginForm",
  template: "#login-form",
  components: {
    VForm: Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/auth/login",
          {
            email: this.email,
            password: this.password,
          }
        );

        const user = response.data.result.user;
        const token = response.data.result.token;

        useUserStore().setUser(user);
        localStorage.setItem("token", token);
        this.$router.push("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data.cause === "invalid email or password") {
              await Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
              });

              return;
            }
          }
        }

        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        });
      }
    },
  },
  async resetpass() {
    try{


    } catch (error) { 
        console.log(error);
    }
  }
    
  
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap");

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
  width: 700px;
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
  width: 250px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
  transition: 0.5s;
}

button:hover {
  box-shadow: none;
}
</style>
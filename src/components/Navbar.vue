<template>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <nav class="nav main navbar navbar-expand-lg ">
    <div class="container-fluid">
      <router-link to='/'>
        <div class="navbar-brand" variant="faded" type="light">
          <img src="../assets/Activity Hours.png" alt="RSU-DIT">
        </div>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to='/'><a class="nav-link" aria-current="page">หน้าหลัก</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to='/news'><a class="nav-link">ข่าวสาร</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to='/activity'><a class="nav-link">กิจกรรม</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to='/contact' v-if="getUser.role === 'student'"><a class="nav-link">รายชื่ออาจารย์</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to='/history' v-if="getUser.role === 'admin'||getUser.role === 'teacher'"><a class="nav-link">ประวัติการใช้งาน</a></router-link>
          </li>
          <li class="nav-item">
            <router-link to='/history' v-if="getUser.role === 'student'"><a class="nav-link">กิจกรรมที่เข้าร่วม</a></router-link>
          </li>
          <li class="nav-item" v-if="getUser.role === 'admin'">
            <router-link to='/register-teacher'><a class="nav-link">สมัครลงทะเบียนสำหรับอาจารย์</a></router-link>
          </li>
          <li class="nav-item dropdown" v-if="getUser.role === 'admin'">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              จัดการข้อมูล
            </a>
            <ul class="dropdown-menu dropdown-menu " aria-labelledby="navbarDropdown">
              <li><router-link to='/data-teacher'><a class="dropdown-item">จัดการข้อมูลอาจารย์</a></router-link></li>
              <li><router-link to='/data-user'><a class="dropdown-item">จัดการข้อมูลนักศึกษา</a></router-link></li>
            </ul>
          </li>
        </ul>
        
        <ul class="mb-lg-0 d-flex">
          <li class="nav-item " v-if="getUser.id === 0">
            <router-link to='/login'><a class="nav-link  ">เข้าสู่ระบบ</a></router-link>
          </li>
          
          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              บัญชีผู้ใช้งาน
            </a>
            <ul class="dropdown-menu dropdown-menu dark dropdown-menu-end " aria-labelledby="navbarDropdown">
              <li><router-link v-if="getUser.role === 'student'" to='/infor-user' class="dropdown-item" >ข้อมูลส่วนตัว</router-link></li>
              <li><router-link v-if="getUser.role === 'teacher'" to='/infor-teacher' class="dropdown-item" >ข้อมูลส่วนตัว</router-link></li>
              <li><router-link v-if="getUser.role === 'admin'" to='/infor-admin' class="dropdown-item" >ข้อมูลส่วนตัว</router-link></li>
              <li><router-link to='/login' class="dropdown-item" @click="logout()">ออกจากระบบ</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { useUserStore } from '../stores/user';
export default {
  name: 'NavBar',
  data() {
    return {
      isStudent: true
    }
  },
  computed: {
    getUser() {
      return useUserStore().getUser
    }
  },
  methods: {
    logout() {
      useUserStore().resetUser()
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>
<style scoped>


li a {
  display: block;
  color: rgb(0, 0, 0);
  text-align: center;
  text-decoration: none;
  
}

img {
  width: 70px;
}

h1 {
  cursor: default;
  user-select: none;
}

.main {
  background: #ffffff;
  padding: 5px;
  box-shadow: 4px 4px 4px #d0d0d0;
  font-family: "Poppins", sans-serif;
  
}
.dark{
  background: #ffffff;
}
.list {
  list-style-type: none;
  margin-left: auto;
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  li {
    margin-left: 20px;
  }
}

.navbar-toggler {
	float: right;
	border: none;
	padding-right: 0;
}
.navbar-toggler:active,
.navbar-toggler:focus {
	outline: none;
}
.navbar-light .navbar-toggler-icon {
	width: 24px;
	height: 17px;
	background-image: none;
	position: relative;
	border-bottom: 1px solid #000;
    transition: all 300ms linear;
}
.navbar-light .navbar-toggler-icon:after, 
.navbar-light .navbar-toggler-icon:before{
	width: 24px;
	position: absolute;
	height: 1px;
	background-color: #000;
	top: 0;
	left: 0;
	content: '';
	z-index: 2;
    transition: all 300ms linear;
}
.navbar-light .navbar-toggler-icon:after{
	top: 8px;
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:after {
	transform: rotate(45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon:before {
	transform: translateY(8px) rotate(-45deg);
}
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
	border-color: transparent;
}
.nav-link{
	color: #212121 !important;
	font-weight: 500;
    transition: all 200ms linear;
}
.nav-item:hover .nav-link{
	color: #8167a9 !important;
}
.nav-item.active .nav-link{
	color: #777 !important;
}
.nav-link {
	position: relative;
	padding: 5px 10 !important;
	display: inline-block;
}
.nav-item:after{
	position: absolute;
	bottom: -5px;
	left: 0;
	width: 100%;
	height: 2px;
	content: '';
	background-color: #8167a9;
	opacity: 0;
    transition: all 200ms linear;
}
.nav-item:hover:after{
	bottom: 0;
	opacity: 1;
}
.nav-item.active:hover:after{
	opacity: 0;
}
.nav-item{
	position: relative;
    transition: all 200ms linear;
}
</style>
<template>
  <div class="container emp-profile">
    <form method="post">
      <div class="row">
        <div class="col-md-4">
          <div class="profile-img">
            <img :src="`data:image/png;base64, ${getUser.profileImg}`" alt="" />
          
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5 class="col-md-6">
              {{ getUser.firstName }}
              {{ getUser.lastName }}
            </h5>

            <h6>
              {{ getUser.role }}
            </h6>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane"
                  type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Profile</button>
              </li>


            </ul>
          </div>
        </div>
        <div class="col">
          <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <span class="material-symbols-outlined" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap">
            edit
          </span>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content wrapper">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">แก้ไขข้อมูลส่วนตัว</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                  <Form @submit="editInfor">
                    <div class="row">
                      <div>
                        <label for="Email" class="form-label">Email</label>
                        <input class="form-control" type="text" name="Email" id="Email" v-model="email"
                          placeholder="Email" />

                        <br>
                      </div>
                      <div class="col-md-7">
                        <label for="password" class="form-label">Password</label>
                        <input class="form-control" type="text" name="Password" id="Password" v-model="password"
                          placeholder="Password" />

                        <br>
                      </div>
                      <div class="col">
                        <label for="profileImg" class="form-label">Picture</label>
                        <Field class="form-control" id="profileImg" v-model="profileImg" name="formFile" type="file"
                          placeholder="Picture" />

                        <br>
                      </div>
                      <div class="col-8 col-sm-6">
                        <label for="fname" class="form-label">Fristname</label>
                        <input type="text" class="form-control" name="fname" v-model="firstName" placeholder="ชื่อ" />

                        <br>
                      </div>
                      <div class="col-4 col-md-6">
                        <label for="lname" class="form-label">Lastname</label>
                        <input class="form-control" type="text" name="lname" id="lname" v-model="lastName"
                          placeholder="นามสกุล" />

                        <br>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-4 col-md-6">
                        <label for="faculty" class="form-label">Faculty</label>
                        <input class="form-control" type="text" name="faculty" id="faculty" v-model="faculty"
                          placeholder="Faculty" />

                        <br>
                      </div>
                      <div class="col-4 col-md-6">
                        <label for="branch" class="form-label">Branch</label>
                        <input class="form-control" type="text" name="branch" id="branch" v-model="branch"
                          placeholder="Branch" />

                        <br>
                      </div>

                      <div class="col-4 col-md-6">
                        <label for="phone" class="form-label">Phone</label>
                        <input class="form-control" type="text" name="phone" id="phone" v-model="phone"
                          placeholder="Phone" />

                        <br>
                      </div>
                      <div class="col-4 col-md-6">
                        <label for="facebook" class="form-label">Facebook</label>
                        <input class="form-control" type="text" name="facebook" id="facebook" v-model="facebookName"
                          placeholder="Facebook" />

                        <br>
                      </div>
                      <div class="col-4 col-md-6">
                        <label for="line" class="form-label">Line</label>
                        <input class="form-control" type="text" name="line" id="line" v-model="lineId"
                          placeholder="Line" />

                        <br>
                      </div>
                    </div>

                    <br>
                    <div class="justify-content-center d-flex">
                      <button type="submit" class="btn btn-warning">แก้ไข</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="profile-work">
            <!-- <p>WORK LINK</p>
                        <a href="">Website Link</a><br/>
                        <a href="">Bootsnipp Profile</a><br/>
                        <a href="">Bootply Profile</a>
                        <p>SKILLS</p>
                        <a href="">Web Designer</a><br/>
                        <a href="">Web Developer</a><br/>
                        <a href="">WordPress</a><br/>
                        <a href="">WooCommerce</a><br/>
                        
                        <a href="">PHP, .Net</a><br/> -->

          </div>
        </div>
        <div class="col-md-8">
          <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
              tabindex="0">
              <div class="row">
                <div class="col-md-6">
                  <label>Fristname</label>
                </div>
                <div class="col-md-6">
                  <p> {{ getUser.firstName }} </p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Lastname</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.lastName }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Email</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.email }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Faculty</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.faculty }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Branch</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.branch }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Phone</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.phone }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Facebook</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.facebookName }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Line</label>
                </div>
                <div class="col-md-6">
                  <p>{{ getUser.lineId }}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user';
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate'
import Swal from 'sweetalert2'
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    getUser() {
      return useUserStore().getUser
    }
  },
  data: () => ({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    faculty: '',
    branch: '',
    lineId: '',
    facebookName: '',
    phone: '',
    profileImg: ''
  }),
  mounted() {
    this.id = this.getUser.id
    this.email = this.getUser.email
    this.firstName = this.getUser.firstName
    this.lastName = this.getUser.lastName
    this.faculty = this.getUser.faculty
    this.branch = this.getUser.branch
    this.lineId = this.getUser.lineId
    this.facebookName = this.getUser.facebookName
    this.phone = this.getUser.phone
  },
  methods: {
    async editInfor() {
      try {
        const { isConfirmed } = await Swal.fire({
          icon: 'question',
          title: 'ยืนยันที่จะแก้ไขข้อมูลใช่หรือไม่',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก'
        });

        const formData = new FormData();

        formData.append('email', this.username);
        formData.append('role', 'teacher');
        formData.append('id', this.getUser.id)
        formData.append('password', this.password)
        formData.append('firstName', this.firstName)
        formData.append('lastName', this.lastName)
        formData.append('faculty', this.faculty)
        formData.append('branch', this.branch)
        formData.append('lineId', this.lineId)
        formData.append('phone', this.phone)
        // formData.append('picture', this.pic);
        formData.append('facebookName', this.facebookName);

        if (this.profileImg) {
          formData.append('picture', this.profileImg);
        }
        if (isConfirmed) {
          const response = await axios.post('http://localhost:8000/api/v1/teachers/updateTeacher', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }

          })
          await Swal.fire({
            icon: 'success',
            title: 'แก้ไขเรียบร้อยแล้ว',

          });
          window.location.reload()
        }
      } catch (error) {
        console.log(error);
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'กรุณาลองใหม่อีกครั้ง',
        });
      }

    }
  }

}
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-column-gap: 0.5rem;
  grid-row-gap: 0.5rem;
}

@media (min-width: 576px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media (min-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

.center-image {
  width: 800px;
}

.container-div .center-image {
  margin: 0 auto;
}


.center {
  text-align: center;
}


.wrapper {
  position: relative;
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  background: #ffffff;
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
inputs {
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

inputs {
  background: #ffffff;
  padding: 10px;
  padding-left: 20px;
  height: 50px;
  font-size: 14px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px -5px #000000;
}

.s {
  color: rgb(255, 255, 255);
  margin-top: 20px;
  background: #ffffff;
  height: 40px;
  width: 250px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 14px 14px 20px #cbced1;
  transition: 0.5s;
}

.s:hover {
  box-shadow: none;
}

.emp-profile {
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 14px 14px 20px #cbced1;

}

.profile-img {
  text-align: center;
}

.profile-img img {
  width: 50%;
  height: 50%;
}

.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}

.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}

.profile-head h5 {
  color: #333;
}

.profile-head h6 {
  color: #6AFB92;
}


.profile-head .nav-tabs {
  margin-bottom: 10%;
}

.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}

.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #6AFB92;
}

.profile-work {
  padding: 14%;
  margin-top: -15%;
}

.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}

.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}

.profile-work ul {
  list-style: none;
}

.profile-tab label {
  font-weight: 600;
}

.profile-tab p {
  font-weight: 600;
  color: #696969;
}</style>
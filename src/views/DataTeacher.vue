

<template>
  <div class="container">
    <h1 class="text-center">จัดการข้อมูลอาจารย์</h1>
    <div class="row">
      <div class="cols-12 col-sm-3 col-md-4" v-for="teacher, index in teachers" :key="index">
        <div class="card">
          <div class="dropdown-center text-end mt-2">
            <span class="material-symbols-outlined" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              more_vert
            </span>
            <ul class="dropdown-menu">
              <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal"
                  @click="openEditModal(teacher)">
                  แก้ไข
                </button></li>
              <li><button class="dropdown-item" type="button" @click="deleteTeacher(teacher.id)">ลบ</button>
              </li>
            </ul>
          </div>
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
                <label>Phone</label>
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
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wrapper">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">จัดการข้อมูลอาจารย์</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <Form @submit="editTeacher">
              <div class="row">
                <div>
                  <label for="Email" class="form-label">Email</label>
                  <Field class="form-control" type="text" name="Email" id="Email" v-model="selectedTeacher.email"
                    placeholder="Email" />
                  <ErrorMessage class="small text-danger" name="Email" />
                  <br>
                </div>
                <div>
                  <label for="password" class="form-label">Password <span
                      class="text-danger">*หากไม่ต้องการเปลี่ยนให้เว้นว่าง</span></label>
                  <Field class="form-control" type="password" name="Password" id="Password"
                    v-model="selectedTeacher.password" placeholder="Password" />
                  <br>
                </div>
                <div class="col-8 col-sm-6">
                  <label for="fname" class="form-label">Fristname</label>
                  <input type="text" class="form-control" name="fname" v-model="selectedTeacher.firstName"
                    placeholder="ชื่อ" />
                  <ErrorMessage class="small text-danger" name="fname" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="lname" class="form-label">Lastname</label>
                  <input class="form-control" type="text" name="lname" id="lname" v-model="selectedTeacher.lastName"
                    placeholder="นามสกุล" />
                  <ErrorMessage class="small text-danger" name="lname" />
                  <br>
                </div>

              </div>
              <div class="row">
                <div class="col-4 col-md-6">
                  <label for="faculty" class="form-label">Faculty</label>
                  <input class="form-control" type="text" name="faculty" id="faculty" v-model="selectedTeacher.faculty"
                    placeholder="Faculty" />
                  <ErrorMessage class="small text-danger" name="faculty" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="branch" class="form-label">Branch</label>
                  <input class="form-control" type="text" name="branch" id="branch" v-model="selectedTeacher.branch"
                    placeholder="Branch" />
                  <ErrorMessage class="small text-danger" name="branch" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="phone" class="form-label">Phone</label>
                  <input class="form-control" type="text" name="phone" id="phone" v-model="selectedTeacher.phone"
                    placeholder="Phone" />
                  <ErrorMessage class="small text-danger" name="phone" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="facebook" class="form-label">Facebook</label>
                  <input class="form-control" type="text" name="facebook" id="facebook"
                    v-model="selectedTeacher.facebookName" placeholder="Facebook" />
                  <ErrorMessage class="small text-danger" name="facebook" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="line" class="form-label">Line</label>
                  <input class="form-control" type="text" name="line" id="line" v-model="selectedTeacher.lineId"
                    placeholder="Line" />
                  <ErrorMessage class="small text-danger" name="line" />
                  <br>
                </div>
                <div class="col-4 col-md-6">
                  <label for="picNew" class="col-form-label">รูปภาพ <span
                      class="text-danger">*หากไม่ต้องการเปลี่ยนให้เว้นว่าง</span></label>
                  <Field class="form-control" v-model="selectedTeacher.picNew" name="picNew" type="file" />
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
    },
    openEditModal(teacher: any) {
      this.selectedTeacher = { ...teacher, password: '', picNew: '' };
    },
    async editTeacher() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการแก้ไขข้อมูลอาจารย์ใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        });

        if (isConfirmed) {
          const formData = new FormData();

          formData.append('id', this.selectedTeacher.id);
          formData.append('email', this.selectedTeacher.email);
          formData.append('password', this.selectedTeacher.password)
          formData.append('firstName', this.selectedTeacher.firstName)
          formData.append('lastName', this.selectedTeacher.lastName)
          formData.append('faculty', this.selectedTeacher.faculty)
          formData.append('branch', this.selectedTeacher.branch)
          formData.append('lineId', this.selectedTeacher.lineId)
          formData.append('phone', this.selectedTeacher.phone)
          if (this.selectedTeacher.picNew) {
            formData.append('picture', this.selectedTeacher.picNew);
          }
          formData.append('facebookName', this.selectedTeacher.facebookName);

          await axios.post('http://localhost:8000/api/v1/teachers/updateTeacher', formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          await Swal.fire({
            title: `แก้ไขข้อมูลเรียบร้อย`,
          })

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTeacher(teacherId: any) {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการลบข้อมูลอาจารย์ใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })

        if (isConfirmed) {
          await axios.post('http://localhost:8000/api/v1/teachers/deleteTeacher', { teacherId }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          await Swal.fire({
            title: `ลบข้อมูลเรียบร้อย`,
          })

          window.location.reload();
        }
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
  height: 100%;
  border-radius: 0.5rem;
  box-shadow: 14px 14px 20px #cbced1;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  
}
</style>
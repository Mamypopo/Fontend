<template>
  <div class="container">
    <h1 class="text-center">กิจกรรม</h1>
    <div class="justify-content-center d-flex ">
      <button v-if="getUser.role === 'teacher' || getUser.role === 'admin'" type="button" class="abutton button"
        data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">เพิ่มกิจกรรม</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content wrapper">
            <div class="modal-header">
              <h1 class="modal-title fs-5 " id="exampleModalLabel">เพิ่มกิจกรรม</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <Form @submit="createActivity">
                <div class="row">
                  <div class="col-6">
                    <label for="date" class="col-form-label">วันที่</label>
                    <Field rules="required" v-model="form.date" type="date" name="date" class="form-control" />
                    <ErrorMessage class="small text-danger" name="date" />
                    <br>
                  </div>
                  <div class="col-6">
                    <label for="times" class="col-form-label">เวลา</label>
                    <Field rules="required" v-model="form.time" class="form-control" name="times" type="time" />
                    <ErrorMessage class="small text-danger" name="times" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="location" class="col-form-label">สถานที่</label>
                  <Field rules="required" name="location" v-model="form.location" class="form-control" type="text" />
                  <ErrorMessage class="small text-danger" name="location" />
                </div>
                <div class="mb-3">
                  <label for="name" class="col-form-label">กิจกรรม</label>
                  <Field rules="required" class="form-control" name="name" v-model="form.name" type="text"
                    id="activity" />
                  <ErrorMessage class="small text-danger" name="name" />
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <label for="hourGain" class="col-form-label">ชั่วโมง</label>
                    <Field rules="required" class="form-control" name="hourGain" v-model="form.hourGain" type="number"
                      step=".1" id="hours" />
                    <ErrorMessage class="small text-danger" name="hourGain" />
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="formFile" class="col-form-label">รูปภาพ</label>
                    <Field rules="required" class="form-control" v-model="form.picture" name="formFile" type="file" />
                    <ErrorMessage class="small text-danger" name="formFile" />
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="studentLimit" class="col-form-label">จำนวนนักศึกษาที่เข้าร่วม</label>
                    <Field class="form-control" v-model="form.studentLimit" name="studentLimit" type="number" />
                    <ErrorMessage class="small text-danger" name="studentLimit" />
                  </div>
                  <div class="mb-3">
                    <label for="content" class="col-form-label">ลายละเอียด</label>
                    <Field v-slot="{ field }" rules="required" class="form-control" name="content" v-model="form.detail"
                      type="text" id="detail">
                      <textarea v-bind="field" name="detail" id="detail" class="form-control" cols="30"
                        rows="5"></textarea>
                    </Field>
                    <ErrorMessage class="small text-danger" name="detail" />
                  </div>
                </div>
                <div>
                  <label for="detail"></label>
                </div>
                <div class="modal-footer mt-4">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                  <button type="submit" class="btn btn-primary">เพิ่ม</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>


    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">

    <div class="mt-3 form">   
      <i class="fa fa-search"></i>
      <input type="text" name="filter" id="filter" v-model="filter" class="form-input form-control form-control-lg"
        placeholder="ค้นหาด้วยชื่อกิจกรรม" @input="filterData">
    </div>
    <div class="row mt-2">
      <div v-for="data, index in filterActivity" :key="index" class="col-12 col-sm-6 col-md-4 mt-4">
        <router-link :to="`/activity/${data.id}`" class="text-decoration-none">
          <div class="card d-flex flex-column align-items-stretch h-100">
            <img :src="`data:image/png;base64, ${data.picture}`" alt="" class="card-img img-fluid"
              style="height: 100%; object-fit: cover;">
            <div class="card-body" style="height: 50%;">
              <div class="row">
                <div class="col-9 pe-0">
                  <h3 class="card-title">{{ data.name }}</h3>
                </div>
                <div class="col-3 pe-0 text-end" v-if="getUser.id === data.createdBy || getUser.role === 'admin'">
                  <div class="dropdown-center">
                    <span class="material-symbols-outlined" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      more_vert
                    </span>
                    <ul class="dropdown-menu">
                      <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal"
                          @click="openEditActivityModal(data, $event)">
                          แก้ไข
                        </button></li>
                      <li><button class="dropdown-item" type="button" @click="deleteActivity(data, $event)">ลบ</button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div class="container">
                <div class="d-flex flex-row align-items-center">
                  <img class="icon " :src="`data:image/png;base64, ${data.createdByProfileImg}`" alt="Profile Image">
                  <div class="ms-3">
                    <h6 class="mb-1">{{ data.createdByFullName }}</h6>
                    <span class="card-subtitle ">{{ new Date(data.createdAt).toLocaleDateString('th', {
                      dateStyle: 'medium'
                    }) }}</span>


                  </div>
                </div>

                <div class="row justify-content-start">
                  <p class="card-text text-truncate fs-4 ">{{ data.detail }}</p>
                </div>
              </div>


            </div>
            <!-- <p class="card-text text-nowrap fs-8" >จำนวนนักศึกษาที่เข้าร่วม : {{ data.paticipantCount }}/{{
              data.studentLimit }}</p> -->
              <p class="card-text text-nowrap fs-8" v-if="data.paticipantCount === data.studentLimit" style="color: crimson;">นักศึกษาเข้าร่วมครบจำนวนแล้ว </p>
              <p class="card-text text-nowrap fs-8" v-else="data.paticipantCount === data.studentLimit">จำนวนนักศึกษาที่เข้าร่วม : {{ data.paticipantCount }}/{{
                data.studentLimit }}</p>
            <!-- <div class="progress" >
              <div class="progress bar " role="progressbar" style="width:25%" :aria-valuenow="data.paticipantCount" aria-valuemin="0" :aria-valuemax="data.studentLimit"></div>
            </div> -->
            <!-- <div class="mt-3"> <span class="text1">{{ data.paticipantCount }} เข้าร่วมแล้ว <span class="text2">จาก {{
              data.studentLimit }} จำนวนที่ต้องการ</span></span> </div> -->
            
          </div>

        </router-link>
      </div>

    </div>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wrapper">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">แก้ไขข่าวสาร</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Form @submit="editActivity">
              <div class="row">
                <div class="col-6">
                  <label for="date" class="col-form-label">วันที่</label>
                  <Field rules="required" v-model="editForm.date" type="date" name="date" class="form-control" />
                  <ErrorMessage class="small text-danger" name="date" />
                  <br>
                </div>
                <div class="col-6">
                  <label for="times" class="col-form-label">เวลา</label>
                  <Field rules="required" v-model="editForm.time" class="form-control" name="times" type="time" />
                  <ErrorMessage class="small text-danger" name="times" />
                </div>
              </div>
              <div class="mb-3">
                <label for="location" class="col-form-label">สถานที่</label>
                <Field rules="required" name="location" v-model="editForm.location" class="form-control" type="text" />
                <ErrorMessage class="small text-danger" name="location" />
              </div>
              <div class="mb-3">
                <label for="name" class="col-form-label">กิจกรรม</label>
                <Field rules="required" class="form-control" name="name" v-model="editForm.name" type="text"
                  id="activity" />
                <ErrorMessage class="small text-danger" name="name" />
              </div>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label for="hourGain" class="col-form-label">ชั่วโมง</label>
                  <Field rules="required" class="form-control" name="hourGain" v-model="editForm.hourGain" type="number"
                    step=".1" id="hours" />
                  <ErrorMessage class="small text-danger" name="hourGain" />
                </div>
                <div class="col-12 col-sm-6">
                  <label for="formFile" class="col-form-label">รูปภาพ</label>
                  <Field class="form-control" v-model="editForm.picture" name="formFile" type="file" />
                  <ErrorMessage class="small text-danger" name="formFile" />
                </div>
                <div class="col-12 col-sm-6">
                  <label for="studentLimit" class="col-form-label">จำนวนนักศึกษาที่เข้าร่วม</label>
                  <Field class="form-control" v-model="editForm.studentLimit" name="studentLimit" type="number" />
                  <ErrorMessage class="small text-danger" name="studentLimit" />
                </div>
                <div class="mb-3">
                  <label for="content" class="col-form-label">ลายละเอียด</label>
                  <Field v-slot="{ field }" rules="required" class="form-control" name="content" v-model="editForm.detail"
                    type="text" id="detail">
                    <textarea v-bind="field" name="detail" id="detail" class="form-control" cols="30"
                      rows="10"></textarea>
                  </Field>
                  <ErrorMessage class="small text-danger" name="detail" />
                </div>
              </div>
              <div class="modal-footer mt-4">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                <button type="submit" class="btn btn-primary">เพิ่ม</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useUserStore } from '../stores/user';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ActivityPage',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => ({

    activities: [],
    filterActivity: [],
    filter: '',
    form: {
      picture: '',
      date: '',
      time: '',
      location: '',
      name: '',
      hourGain: '',
      detail: '',
      studentLimit: 0,
    },
    editForm: {
      id: '',
      picture: '',
      date: '',
      time: '',
      location: '',
      name: '',
      hourGain: '',
      detail: '',
      studentLimit: 0
    },
   
  }),
  computed: {
    getUser() {
      return useUserStore().getUser
    }
  },
  async mounted() {
    await this.getActivity();
    
  },
  methods: {
    async getActivity() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/activities/getAllActivity');

        this.activities = JSON.parse(JSON.stringify(data.result));
        this.filterActivity = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    filterData() {
      if (this.filter) {
        this.filterActivity = this.activities.filter((item) => item.name.includes(this.filter))
        return;
      }

      this.filterActivity = JSON.parse(JSON.stringify(this.activities));
    },
    async createActivity() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการเพิ่มกิจกรรมใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })

        if (isConfirmed) {
          const form = new FormData();
          form.append('name', this.form.name);
          form.append('detail', this.form.detail);
          form.append('location', this.form.location);
          form.append('hourGain', this.form.hourGain);
          form.append('date', this.form.date);
          form.append('time', this.form.time);
          form.append('picture', this.form.picture);
          form.append('studentLimit', this.form.studentLimit.toString())

          await axios.post('http://localhost:8000/api/v1/activities/addActivity', form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          await Swal.fire({
            title: `เพิ่มกิจกรรม ${this.form.name} เรียบร้อย`,
          })

          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    },
    async openEditActivityModal(data: any, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.editForm = { ...data, picture: '' };
    },
  
    async editActivity() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการแก้ไขกิจกรรมใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })

        if (isConfirmed) {
          const form = new FormData();
          form.append('id', this.editForm.id)
          form.append('name', this.editForm.name);
          form.append('detail', this.editForm.detail);
          form.append('location', this.editForm.location);
          form.append('hourGain', this.editForm.hourGain);
          form.append('date', this.editForm.date);
          form.append('time', this.editForm.time);
          form.append('studentLimit', this.editForm.studentLimit.toString())
          if (this.editForm.picture) {
            form.append('picture', this.editForm.picture);
          }

          await axios.post('http://localhost:8000/api/v1/activities/updateActivity', form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          await Swal.fire({
            title: `แก้ไขกิจกรรม เรียบร้อย`,
          })
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteActivity(data: any, event: Event) {
      event.preventDefault();
      event.stopPropagation();

      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการลบกิจกรรมใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })

        if (isConfirmed) {
          await axios.post('http://localhost:8000/api/v1/activities/deleteActivity', { activityId: data.id }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          await Swal.fire({
            title: `ลบกิจกรรม ${data.name} เรียบร้อย`,
          })
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}


</script>

<style scoped>
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

.card {
  border-radius: 0.5rem;
  box-shadow: 14px 14px 20px #cbced1;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  
}

.s {
  color: white;
  margin-top: 20px;
  background: #6AFB92;
  height: 40px;
  width: 250px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 900;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
}

.s:hover {
  box-shadow: none;
}

.abutton {
  color: white;
  background: #6AFB92;
  margin-left: 15px;
  height: 40px;
  width: 250px;
  border-radius: 20px;
  font-weight: 00;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.abutton:hover {
  box-shadow: none;
}



.icon {
  width: 30px;
  height: 30px;
  background-color: #eee;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 39px
}

.c-details span {
  font-weight: 300;
  font-size: 13px
}

.text1 {
  font-size: 14px;
  font-weight: 600
}

.text2 {
  color: #a5aec0
}



.form{

  position: relative;
}

.form .fa-search{

  position: absolute;
  top:20px;
  left: 20px;
  color: #9ca3af;

}

.form span{

      position: absolute;
  right: 17px;
  top: 13px;
  padding: 2px;
  border-left: 1px solid #d1d5db;

}

.left-pan{
  padding-left: 7px;
}



.form-input{

  height: 55px;
  text-indent: 33px;
  border-radius: 10px;
}

.form-input:focus{

  box-shadow: none;
 
}
</style>
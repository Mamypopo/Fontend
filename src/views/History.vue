<template>
  <div class="container">
    <h1 class="text-center" v-if="getUser.role === 'student'">กิจกรรมที่เข้าร่วม</h1>
    <h1 class="text-center" v-else>ประวัติการใช้งาน</h1>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">
    <div class="mt-3 form">
      <i class="fa fa-search"></i>
      <input type="text" name="filter" id="filter" v-model="filter" class="form-control form-input form-control-lg"
        placeholder="ค้นหาด้วยชื่อกิจกรรมหรือชื่อข่าวสาร" @input="filterData()">
    </div>
    <div class="row mt-2">
      <div v-for="data, index in filteredData" :key="index" class="col-12 col-sm-6 col-md-4 mt-4">
        <router-link :to="data?.name ? `/activity/${data.id}` : `/news/${data.id}`" class="text-decoration-none">
          <div class="card d-flex flex-column align-items-stretch h-100">
            <img :src="`data:image/png;base64, ${data.picture}`" alt="" class="card-img img-fluid"
              style="height: 70%; object-fit: cover;">
            <div class="card-body" style="height: 50%;">
              <div class="row">
                <div class="col-9 pe-0">
                  <h2 class="card-title">{{ data?.name || data?.topic }}</h2>
                </div>
                <div class="col-3 pe-0 text-end" v-if="getUser.role === 'teacher' || getUser.role === 'admin'">
                  <div class="dropdown-center">
                    <span class="material-symbols-outlined" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      more_vert
                    </span>
                    <ul class="dropdown-menu">
                      <li v-if="data?.name"><button type="button" class="dropdown-item" data-bs-toggle="modal"
                          data-bs-target="#editActivityModal" @click="openEditActivityModal(data, $event)">
                          แก้ไข
                        </button></li>
                      <li v-else><button type="button" class="dropdown-item" data-bs-toggle="modal"
                          data-bs-target="#editNewsModal" @click="openEditNewsModal(data, $event)">
                          แก้ไข
                        </button></li>
                      <li v-if="data?.name"><button class="dropdown-item" type="button"
                          @click="deleteActivity(data, $event)">ลบ</button>
                      </li>
                      <li v-else><button class="dropdown-item" type="button"
                          @click="deleteNew(data.id, data.topic, $event)">ลบ</button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <div class="container">
                <div class="d-flex flex-row align-items-center">
                  <img class="icon" :src="`data:image/png;base64, ${data.createdByProfileImg}`" alt="Profile Image">
                  <div class="ms-3">
                    <h6 class="mb-1">{{ data.createdByFullName }}</h6>
                    <span class="card-subtitle col-6">{{ new Date(data.createdAt).toLocaleDateString('th', {
                      dateStyle: 'medium'
                    }) }}</span>
                  </div>
                </div>
                <div class="row justify-content-start">
                  <p class="card-text text-truncate fs-4">{{ data?.detail || data?.content }}</p>
                </div>
                
              </div>
              <!-- <div>
              <p class="card-text text-nowrap fs-8" style="color: crimson;">นักศึกษาเข้าร่วมครบจำนวนแล้ว </p>
              <p class="card-text text-nowrap fs-8" >จำนวนนักศึกษาที่เข้าร่วม : {{ data.paticipantCount }}/{{data.studentLimit }}</p>
              </div> -->
              
              <!-- <p class="card-subtitle">{{ new Date(data.createdAt).toLocaleDateString('th', {
                dateStyle: 'medium'
              }) }}</p>
              <p class="card-text text-truncate fs-4">{{ data?.detail || data?.content }}</p> -->
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="modal fade" id="editActivityModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
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
                  <Field rules="required" v-model="editActivityForm.date" type="date" name="date" class="form-control" />
                  <ErrorMessage class="small text-danger" name="date" />
                  <br>
                </div>
                <div class="col-6">
                  <label for="times" class="col-form-label">เวลา</label>
                  <Field rules="required" v-model="editActivityForm.time" class="form-control" name="times" type="time" />
                  <ErrorMessage class="small text-danger" name="times" />
                </div>
              </div>
              <div class="mb-3">
                <label for="location" class="col-form-label">สถานที่</label>
                <Field rules="required" name="location" v-model="editActivityForm.location" class="form-control"
                  type="text" />
                <ErrorMessage class="small text-danger" name="location" />
              </div>
              <div class="mb-3">
                <label for="name" class="col-form-label">กิจกรรม</label>
                <Field rules="required" class="form-control" name="name" v-model="editActivityForm.name" type="text"
                  id="activity" />
                <ErrorMessage class="small text-danger" name="name" />
              </div>
              <div class="row">
                <div class="col-12 col-sm-6">
                  <label for="hourGain" class="col-form-label">ชั่วโมง</label>
                  <Field rules="required" class="form-control" name="hourGain" v-model="editActivityForm.hourGain"
                    type="number" step=".1" id="hours" />
                  <ErrorMessage class="small text-danger" name="hourGain" />
                </div>
                <div class="col-12 col-sm-6">
                  <label for="formFile" class="col-form-label">รูปภาพ</label>
                  <Field class="form-control" v-model="editActivityForm.picture" name="formFile" type="file" />
                  <ErrorMessage class="small text-danger" name="formFile" />
                </div>
                <div class="mb-3">
                  <label for="content" class="col-form-label">ลายละเอียด</label>
                  <Field v-slot="{ field }" rules="required" class="form-control" name="content"
                    v-model="editActivityForm.detail" type="text" id="detail">
                    <textarea v-bind="field" name="detail" id="detail" class="form-control" cols="30"
                      rows="10"></textarea>
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
    <div class="modal fade" id="editNewsModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content wrapper">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">แก้ไขข่าวสาร</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Form @submit="editNew">
              <div class="mb-3">
                <label for="picNew" class="col-form-label">รูปภาพ</label>
                <Field class="form-control" v-model="editNewForm.picNew" name="picNew" type="file" />
              </div>
              <div class="mb-3">
                <label for="topic" class="col-form-label">หัวข้อข่าวสาร</label>
                <Field rules="required" name="topic" v-model="editNewForm.topic" class="form-control" type="text" />
                <ErrorMessage class="small text-danger" name="topic" />
              </div>
              <div class="mb-3">
                <label for="content" class="col-form-label">เนื้อหา</label>
                <Field v-slot="{ field }" rules="required" class="form-control" name="content"
                  v-model="editNewForm.content" type="text" id="content">
                  <textarea v-bind="field" name="" id="" class="form-control" cols="30" rows="10"></textarea>
                </Field>

                <ErrorMessage class="small text-danger" name="content" />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                <button type="submit" class="btn btn-primary">แก้ไข</button>
              </div>
            </form>
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
import { useUserStore } from '../stores/user';

export default {
  name: 'HistoryPage',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      activities: [],
      news: [],
      data: [],
      filteredData: [],
      filter: '',
      editActivityForm: {
        id: '',
        picture: '',
        date: '',
        time: '',
        location: '',
        name: '',
        hourGain: '',
        detail: '',
      },
      editNewForm: {
        id: 0,
        content: '',
        topic: '',
        picNew: '',
      }
    }
  },
  computed: {
    getUser() {
      return useUserStore().getUser
    }
  },
  async mounted() {
    await this.getActivity();
    await this.getNews();
    await this.getStudentActivityHistory();
    this.mapData()
  },
  methods: {
    async getActivity() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/activities/getByUserId', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.activities = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    async getStudentActivityHistory() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/activities/getStudentActivityHistory', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.activities = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
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
          form.append('id', this.editActivityForm.id)
          form.append('name', this.editActivityForm.name);
          form.append('detail', this.editActivityForm.detail);
          form.append('location', this.editActivityForm.location);
          form.append('hourGain', this.editActivityForm.hourGain);
          form.append('date', this.editActivityForm.date);
          form.append('time', this.editActivityForm.time);
          if (this.editActivityForm.picture) {
            form.append('picture', this.editActivityForm.picture);
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
    },
    async getNews() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/news/getByUserId', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        this.news = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    async deleteNew(newId: any, topic: any, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการลบข่าวสารใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })
        if (isConfirmed) {
          await axios.post('http://localhost:8000/api/v1/news/deleteNew', {
            newId
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          await Swal.fire({
            title: `ลบข่าวสาร ${topic} เรียบร้อย`,
          })

          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    },
    mapData() {
      this.data = [...this.activities, ...this.news].sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) {
          return 1
        }

        if (new Date(a.createdAt) < new Date(b.createdAt)) {
          return -1
        }

        return 0;
      })
      this.filteredData = [...this.data]
    },
    filterData() {
      if (this.filter) {
        this.filteredData = this.data.filter((item) => {
          if (item?.name && item.name.includes(this.filter)) {
            return true
          }

          if (item?.topic && item?.topic.includes(this.filter)) {
            return true
          }

          return false
        })
        return;
      }

      this.filteredData = JSON.parse(JSON.stringify(this.data));
    },
    async openEditActivityModal(data: any, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.editActivityForm = { ...data, picture: '' };
    },
    openEditNewsModal(news: { topic: string, content: string, id: number }, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.editNewForm.topic = news.topic;
      this.editNewForm.content = news.content;
      this.editNewForm.id = news.id;
    },
    async editNew() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการแก้ไขข่าวสารใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })

        if (isConfirmed) {
          const form = new FormData();
          form.append('id', this.editNewForm.id.toString());
          form.append('topic', this.editNewForm.topic);
          form.append('content', this.editNewForm.content);
          if (this.editNewForm.picNew) {
            form.append('picture', this.editNewForm.picNew);
          }
          await axios.post('http://localhost:8000/api/v1/news/updateNew', form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          await Swal.fire({
            title: `แก้ไขข่าวสาร ${this.editNewForm.topic} เรียบร้อย`,
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
.card {
  border-radius: 0.5rem;
  box-shadow: 14px 14px 20px #cbced1;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  height: 500px;

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
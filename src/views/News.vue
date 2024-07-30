<template>
  <div class="container">
    <h1 class="text-center">ข่าวสาร</h1>
    <div class="justify-content-center d-flex">
      <button v-if="getUser.role === 'teacher' || getUser.role === 'admin'" type="button" class="abutton button"
        data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">เพิ่มข่าวสาร</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content wrapper">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">เพิ่มข่าวสาร</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <Form @submit="createNew">
                <div class="mb-3">
                  <label for="picNew" class="col-form-label">รูปภาพ</label>
                  <Field rules="required" class="form-control" v-model="form.picNew" name="picNew" type="file" />
                  <ErrorMessage class="small text-danger" name="picNew" />
                </div>
                <div class="mb-3">
                  <label for="topic" class="col-form-label">หัวข้อข่าวสาร</label>
                  <Field rules="required" name="topic" v-model="form.topic" class="form-control" type="text" />
                  <ErrorMessage class="small text-danger" name="topic" />
                </div>
                <div class="mb-3">
                  <label for="content" class="col-form-label">เนื้อหา</label>
                  <Field v-slot="{ field }" rules="required" class="form-control" name="content" v-model="form.content"
                    type="text" id="content">
                    <textarea v-bind="field" name="" id="" class="form-control" cols="30" rows="10"></textarea>
                  </Field>

                  <ErrorMessage class="small text-danger" name="content" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
                  <button type="submit" class="btn btn-primary">เพิ่ม</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">
    <div class="mt-3 form">
      <i class="fa fa-search"></i>
      <input type="text" name="filter" id="filter" v-model="filter" class="form-control form-input form-control-lg"
        placeholder="ค้นหาด้วยชื่อข่าวสาร" @input="filterData">
    </div>
    <div class="row mt-2">
      <div v-for="data, index in filterNews" :key="index" class="col-12 col-sm-6 col-md-4 mt-4">
        <router-link :to="`/news/${data.id}`" class="text-decoration-none">
          <div class="card d-flex flex-column align-items-stretch h-100">
            <img :src="`data:image/png;base64, ${data.picture}`" alt="" class="card-img img-fluid"
              style="height: 100%; object-fit: cover;">
            <div class="card-body" style="height: 50%;">
              <div class="row">
                <div class="col-9 pe-0">
                  <h2 class="card-title ">{{ data.topic }}</h2>
                </div>
                <div class="col-3 pe-0 text-end" v-if="getUser.id === data.createdBy || getUser.role === 'admin'">
                  <div class="dropdown-center">
                    <span class="material-symbols-outlined" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      more_vert
                    </span>
                    <ul class="dropdown-menu">
                      <li><button type="button" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal"
                          @click="openEditModal(data, $event)">
                          แก้ไข
                        </button></li>
                      <li><button class="dropdown-item" type="button"
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

                <p class="card-text text-truncate fs-4">{{ data.content }}</p>
              </div>
            </div>
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
            <Form @submit="editNew">
              <div class="mb-3">
                <label for="picNew" class="col-form-label">รูปภาพ</label>
                <Field class="form-control" v-model="editForm.picNew" name="picNew" type="file" />
              </div>
              <div class="mb-3">
                <label for="topic" class="col-form-label">หัวข้อข่าวสาร</label>
                <Field rules="required" name="topic" v-model="editForm.topic" class="form-control" type="text" />
                <ErrorMessage class="small text-danger" name="topic" />
              </div>
              <div class="mb-3">
                <label for="content" class="col-form-label">เนื้อหา</label>
                <Field v-slot="{ field }" rules="required" class="form-control" name="content" v-model="editForm.content"
                  type="text" id="content">
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useUserStore } from '../stores/user';
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
  name: 'NewPage',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => (
    {
      news: [],
      filterNews: [],
      filter: '',
      form: {
        content: '',
        topic: '',
        picNew: '',
      },
      editForm: {
        id: 0,
        content: '',
        topic: '',
        picNew: '',
      },
      selectedNew: {
        id: 0,
        content: '',
        topic: '',
        picture: '',
        createdAt: '',
      }
    }
  ),
  computed: {
    getUser() {
      return useUserStore().getUser
    },
  },
  async mounted() {
    await this.getNews()
  },
  methods: {
    async getNews() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/news/getAllNew');

        this.news = JSON.parse(JSON.stringify(data.result));
        this.filterNews = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    filterData() {
      if (this.filter) {
        this.filterNews = this.news.filter((item) => item.topic.includes(this.filter))
        return;
      }

      this.filterNews = JSON.parse(JSON.stringify(this.news));
    },
    async createNew() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการเพิ่มข่าวสารใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        })
        if (isConfirmed) {
          const form = new FormData();
          form.append('topic', this.form.topic);
          form.append('content', this.form.content);
          form.append('picture', this.form.picNew);

          await axios.post('http://localhost:8000/api/v1/news/addNew', form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          await Swal.fire({
            title: `เพิ่มข่าวสาร ${this.form.topic} เรียบร้อย`,
          })

          window.location.reload();
        }

      } catch (error) {
        console.log(error);
      }
    },
    openEditModal(news: { topic: string, content: string, id: number }, event: Event) {
      event.preventDefault();
      event.stopPropagation();
      this.editForm.topic = news.topic;
      this.editForm.content = news.content;
      this.editForm.id = news.id;
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
          form.append('id', this.editForm.id.toString());
          form.append('topic', this.editForm.topic);
          form.append('content', this.editForm.content);
          if (this.editForm.picNew) {
            form.append('picture', this.editForm.picNew);
          }
          await axios.post('http://localhost:8000/api/v1/news/updateNew', form, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          await Swal.fire({
            title: `แก้ไขข่าวสาร ${this.editForm.topic} เรียบร้อย`,
          })

          window.location.reload();
        }
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
  height: 500px;
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
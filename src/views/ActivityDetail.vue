<template>
  <div class="container">
    <h1 class="text-center">กิจกรรม</h1>
    <div class="mx-auto d-flex justify-content-center" >
      <img :src="`data:image/png;base64, ${activity.picture}`" alt="Phi Phi Islands" width="600" height="500">
    </div>

    <h4 class="text-center"><b>{{ activity.name }}</b></h4>

    <p class="text-center">สถานที่: {{ activity.location }}</p>

    <p class="text-center">จำนวนชั่วโมง: {{ Number(activity.hourGain) }}</p>

    <p class="text-center">วันที่: {{ new Date(activity.date).toLocaleDateString('th', {dateStyle: 'medium'}) }}</p>

    <p class="text-center">เวลา: {{ activity.time }}</p>

    <p class="text-center text-truncate text-wrap">รายละเอียดกิจกรรม: {{ activity.detail }}</p>

    <!-- <p class="text-center">จำนวนนักศึกษาที่เข้าร่วม {{ activity.participants.length }}/{{ activity.studentLimit }}</p> -->

    <p class="text-center" v-if="activity.participants.length === activity.studentLimit" style="color: crimson;">นักศึกษาเข้าร่วมครบจำนวนแล้ว </p>
    
    <p class="text-center" v-else="activity.participants.length === activity.studentLimit">จำนวนนักศึกษาที่เข้าร่วม : {{ activity.participants.length }}/{{activity.studentLimit }}</p>
    <div class="justify-content-center d-flex">
      <button v-if="getUser.role === 'admin' || getUser.role === 'teacher'" class="text-center sbutton  button"
        data-bs-toggle="modal" data-bs-target="#listStundet"
        data-bs-whatever="@getbootstrap">รายชื่อนักศึกษาที่เข้าร่วม</button>
    </div>
    <br>
    <div class="modal fade" id="listStundet" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 " id="exampleModalLabel">รายชื่อนักศึกษาที่เข้าร่วม</h1>
            <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="justify-content-center d-flex">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">วันที่</th>
                    <th scope="col">ชื่อ-นามสกุล</th>
                    <th scope="col">รหัสนักศึกษา</th>
                    <th scope="col">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="participant, index in activity.participants" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ `${participant.firstName} ${participant.lastName}` }}</td>
                    <td>{{ participant.studentId }}</td>
                    <td>
                      <div v-if="participant.approveStatus === 1">
                        <button type="button" class="btn btn-success" @click="updateApproveStatus(participant.id, 'Approve')">เข้าร่วม</button>
                        <button type="button" class="btn btn-danger" @click="updateApproveStatus(participant.id, 'Reject')">ไม่เข้าร่วม</button>
                      </div>
                      <p v-else> {{ showStatus(participant.approveStatus) }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="justify-content-center d-flex">
      <button type="button" class="fbutton" v-if="getUser.role === 'student' && activity.participants.length === activity.studentLimit">นักศึกษาเข้าร่วมครบจำนวนแล้ว</button>
      <button type="button" class="bbutton" v-else-if="getUser.role === 'student' && !isJoined()"
        @click="joinActivity()">เข้าร่วม</button>
      <button type="button" class="bbutton" v-else-if="getUser.role === 'student' && isJoined()">เข้าร่วมแล้ว</button>
    </div>
  </div>

  <div class="justify-content-center d-flex flex-column align-items-center">

    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <div class="wrapper container" v-if="getUser.role === 'admin' || getUser.role === 'teacher' || getUser.role === 'student'">
      <div class="justify-content-center d-flex flex-column align-items-center">
        <h5 class="mt" v-if="getUser.role === 'admin' || getUser.role === 'teacher' || getUser.role === 'student'">
          แสดงความคิดเห็น</h5>
        <div class="row form-floating"
          v-if="getUser.role === 'admin' || getUser.role === 'teacher' || getUser.role === 'student'">

          <textarea v-model="newComment" class="col-md form-control" placeholder="Leave a comment here"
            id="floatingTextarea"></textarea>
          <label for="floatingTextarea">Comments</label>
          <button class="col-md-4 abutton  button" @click="createComment()">Send </button>
        </div>
      </div>
      <div class="col">
        <div v-for="(comment, index) in activity.comments" :key="index" class="media g-mb-30 media-comment">
          <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
            <div class="row">
              <div class="col-9">
                <img class="d-flex g-width-50 g-height-50 rounded-circle"
                  :src="`data:image/png;base64, ${comment.profileImg}`" alt="Profile Image">
              </div>
              <div class="col-3 pe-0 text-end"
                v-if="`${getUser.firstName} ${getUser.lastName}` === comment.createdBy || getUser.role === 'admin'">
                <span class="material-symbols-outlined" type="button" @click="deleteComment(comment.id)">
                  delete
                </span>
              </div>
            </div>

            <div class="comment-content">
              <h5 class="h5 g-color-gray-dark-v1 mb-1">{{ comment.createdBy }}</h5>
              <span class="comment-date g-color-gray-dark-v1 mb-2">{{ new Date(comment.createdAt).toLocaleDateString('th',
                {
                  dateStyle: 'medium'
                })
              }}</span>
              <p class="comment-text">{{ comment.comment }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user';
import { Form, Field, ErrorMessage } from 'vee-validate';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data: () => ({
    activity: {
      picture: '',
      date: '',
      time: '',
      location: '',
      name: '',
      hourGain: '',
      detail: '',
      studentLimit: 0,
      comments: [],
      participants: [],
    },
    newComment: '',
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
      const id = this.$route.params.activityId;
      const { data } = await axios.post('http://localhost:8000/api/v1/activities/getActivityById', {
        activityId: id,
      })
      this.activity = data.result;
    },
    async createComment() {
      try {
        const id = this.$route.params.activityId;
        await axios.post('http://localhost:8000/api/v1/activities/addComment', {
          activityId: id,
          userId: this.getUser.id,
          comment: this.newComment,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          title: `เพิ่มความคิดเห็น เรียบร้อย`,
        })
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(commentId: any) {
      try {
        await axios.post('http://localhost:8000/api/v1/activities/deleteComment', {
          commentId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        await Swal.fire({
          title: `ลบความคิดเห็น เรียบร้อย`,
        })
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    },
    async joinActivity() {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการเข้าร่วมกิจกรรมใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        });

        if (isConfirmed) {
          await axios.post('http://localhost:8000/api/v1/activities/addPaticipant', {
            activityId: this.$route.params.activityId
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          await Swal.fire({
            title: `เข้ารวมกิจกรรมเรียบร้อย`,
          })

          window.location.reload()
        }
      } catch (error) {
        console.log(error);
      }
    },
    isJoined() {
     
      return this.activity.participants.find((item) => item.userId === this.getUser.id);
    },
    showStatus(status: number) {
      if (status === 2) {
        return 'อนุมัติ'
      }
      return 'ปฎิเสธ'
    },
    async updateApproveStatus(participantId: number, status: string) {
      try {
        const { isConfirmed } = await Swal.fire({
          title: 'ยืนยันการเข้าร่วมกิจกรรมใช่หรือไม่',
          confirmButtonText: 'ยืนยัน',
          cancelButtonText: 'ยกเลิก',
          showCancelButton: true,
        });

        if (isConfirmed) {
          await axios.post('http://localhost:8000/api/v1/activities/updateParticipantStatus', {
            participantId,
            status,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          await Swal.fire({
            title: `อัพเดทสถานะเข้าร่วมกิจกรรมเรียบร้อย`,
          })

          window.location.reload()
        }
      } catch (error) {
        
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 0) {
  .g-mr-15 {
    margin-right: 1.07143rem !important;
  }
}

@media (min-width: 0) {
  .g-mt-3 {
    margin-top: 0.21429rem !important;
  }
}

.g-height-50 {
  height: 50px;
}

.g-width-50 {
  width: 50px !important;
}

@media (min-width: 0) {
  .g-pa-30 {
    padding: 2.14286rem !important;

  }
}

.g-bg-secondary {
  background-color: #fafafa !important;
}

.u-shadow-v18 {
  box-shadow: 0 5px 10px -6px rgba(0, 0, 0, 0.15);
}

.g-color-gray-dark-v4 {
  color: #777 !important;
}

.g-font-size-12 {
  font-size: 0.85714rem !important;
}

.media-comment {
  margin-top: 20px
}

textarea {
  width: 600px;
}

.abutton {
  color: white;
  background: #6AFB92;
  margin-left: 15px;
  width: 100px;
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

.fbutton {
  color: white;
  background: #6AFB92;
  margin-left: 15px;
  width: 150px;
  border-radius: 20px;
  font-weight: 00;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.fbutton:hover {
  box-shadow: none;
}
.sbutton {
  color: white;
  background: #fb9725;
  margin-left: 15px;
  width: 150px;
  height: 30px;
  border-radius: 20px;
  font-weight: 00;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
}
.sbutton:hover {
  box-shadow: none;
}


.bbutton {
  color: white;
  background: #6AFB92;
  width: 100px;
  margin: 10px;
  height: 40px;
  border-radius: 20px;
  font-weight: 00;
  box-shadow: 6px 6px 6px #cbced1;
  transition: 0.5s;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.bbutton:hover {
  box-shadow: none;
}

h1 {
  margin-top: 20px
}

h4 {
  margin-top: 20px
}

.wrapper {
  position: relative;
  width: 800px;
  height: auto;
  margin-top: 30px;
  border-radius: 20px;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 14px 14px 20px #cbced1;
  font-family: "Poppins", sans-serif;
}

.wrapper2 {
  position: relative;
  width: 600px;
  height: auto;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  background: #ffffff;

}

.inputs {
  text-align: left;
  margin-top: 14px;
}

label,
input {
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

.comment-content {
  margin-top: 15px;
  /* Adjust the margin as needed */
}

.comment-date {
  font-size: 0.9em;
  color: #808080;
  display: block;
  margin-bottom: 5px;
}

.comment-text {
  line-height: 1.5;
}
</style>
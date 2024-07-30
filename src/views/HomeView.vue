

<template>
  <main>

    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators ">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" class="active"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" class="active"
          aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" class="active"
          aria-label="Slide 4"></button>
          
      </div>

      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="slide" src="../assets/asa4.png">
          <div class="carousel-caption">
            <!-- <h1 class="animated fadeInRight">ปลา</h1>
            <p class="animated fadeInRight">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <p class="animated fadeInRight"><a href="#" class="btn btn-transparent btn-rounded btn-large">Learn More</a>
            </p> -->
          </div>
        </div>
        <div class="carousel-item" >
          <img class="slide" src="../assets/asa2.png">
          <div class="carousel-caption">
            <!-- <h1 class="animated fadeInLeft">ปู</h1>
            <p class="animated fadeInLeft">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <p class="animated fadeInLeft"><a href="#" class="btn btn-transparent btn-rounded btn-large">Learn More</a>
            </p> -->
          </div>
        </div>
        <div class="carousel-item" >
          <img class="slide" src="../assets/asa1.png" >
          <div class="carousel-caption">
            <!-- <h1 class="animated fadeInUp">น้ำเต้า</h1>
            <p class="animated fadeInUp">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <p class="animated fadeInUp"><a href="#" class="btn btn-transparent btn-rounded btn-large">Learn More</a></p> -->
          </div>
        </div>
        <div class="carousel-item" >
          <img class="slide" src="../assets/asa3.png">
          <div class="carousel-caption">
            <!-- <h1 class="animated fadeInDown">กุ้ง</h1>
            <p class="animated fadeInDown">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
            <p class="animated fadeInDown"><a href="#" class="btn btn-transparent btn-rounded btn-large">Learn More</a>
            </p> -->
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon " aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon " aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css">
    
    
    <section class="wow fadeIn animated  " style="visibility: visible; animation-name: fadeIn;">
         <div class="con ">
              <div class="row d-flex justify-content-center">
                  <!-- counter -->
                  <div class="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="300ms" style="visibility: visible; animation-duration: 300ms; animation-name: fadeInUp;">
                      <i class="fa fa-inbox medium-icon"></i>
                      <span class="timer counter alt-font appear" data-to="980" data-speed="7000"> {{ $data.Activitycount[0].count}} </span>
                      <span class="counter-title">activity</span>
                  </div>
                  <!-- end counter -->
                  <!-- counter -->
                  <div class="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="600ms" style="visibility: visible; animation-duration: 600ms; animation-name: fadeInUp;">
                      <i class="fa fa-group medium-icon"></i>
                      <span class="timer counter alt-font appear" data-to="980" data-speed="7000">{{ $data.StudentCount[0].count}}</span>
                      <span class="counter-title">students</span>
                  </div>
                  <!-- end counter -->
                  <!-- counter -->
                  <div class="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="900ms" style="visibility: visible; animation-duration: 900ms; animation-name: fadeInUp;">
                      <i class="fa fa-user medium-icon"></i>
                      <span class="timer counter alt-font appear" data-to="810" data-speed="7000">{{ $data.TeacherCount[0].count}}</span>
                      <span class="counter-title">teacher</span>
                  </div>
                  <!-- end counter -->
                  <!-- counter -->
                  
              </div>
         </div>
      </section>

    
    

    <div class="row mt-2">
      <h2 style="padding-left: 115px;">ข่าวสาร</h2>
      <div v-for="data, index in filterNews" :key="index" class="col-12 col-sm-6 col-md-4 mt-4 d-flex justify-content-center">
        <router-link :to="`/news/${data.id}`" class=" text-decoration-none">
          <div class="d-flex flex-column align-items-stretch card" style="height: 350px;">
            <img :src="`data:image/png;base64, ${data.picture}`" alt="" class="card-img img-fluid"
              style="height: 60%; object-fit: cover;">
            <div class="card-body" style="height: 50%;">
              <div class="row">
                <div class="col-9 pe-0">
                  <h4 class="card-title">{{ data.topic }}</h4>
                </div>
                <!-- <div class="col-3 pe-0 text-end" v-if="getUser.id === data.createdBy || getUser.role === 'admin'">
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
                </div> -->

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



    <div class="row mt-2">
      <h2 style="padding-left: 115px;"> กิจกรรม</h2>
      <div v-for="data, index in filterActivity" :key="index" class="col-12 col-sm-6 col-md-4 mt-4 d-flex justify-content-center">
        <router-link :to="`/activity/${data.id}`" class="text-decoration-none">
          <div class="d-flex flex-column align-items-stretch card">
            <img :src="`data:image/png;base64, ${data.picture}`" alt="" class="card-img img-fluid"
              style="height: 50%; object-fit: cover;">
            <div class="card-body" style="height: 50%;">
              <div class="row">
                <div class="col-9 pe-0">
                  <h3 class="card-title">{{ data.name }}</h3>
                </div>
                <!-- <div class="col-3 pe-0 text-end" v-if="getUser.id === data.createdBy || getUser.role === 'admin'">
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
                </div> -->

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
            <div>
                <p class="card-text text-nowrap fs-8" v-if="data.paticipantCount === data.studentLimit" style="color: crimson;">นักศึกษาเข้าร่วมครบจำนวนแล้ว </p>
                <p class="card-text text-nowrap fs-8"  v-else="data.paticipantCount === data.studentLimit">จำนวนนักศึกษาที่เข้าร่วม : {{ data.paticipantCount }}/{{
                  data.studentLimit }}</p>
              <!-- <div class="mt-3 ">
                <p class="text1 ">{{ data.paticipantCount }} เข้าร่วมแล้ว <span class="text2">จาก {{ data.studentLimit }}
                    จำนวนที่ต้องการ</span></p>
              </div> -->
            </div>

          </div>

        </router-link>
      </div>

    </div>




  </main>
</template>

<script  lang="ts">

import { useUserStore } from '../stores/user';
import axios from 'axios';

export default {
  name: 'HomePage',
  data: () => (
    {
      StudentCount:[0],
      TeacherCount:[0],
      Activitycount:[0],
      activities: [],
      filterActivity: [],
      news: [],
      filterNews: [],
      filter: '',
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
    await this.getActivity();
    await this.getActivityCount();
    await this.getTeacherCount();
    await this.getStudentCount();
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

    async getActivity() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/activities/getAllActivity');

        this.activities = JSON.parse(JSON.stringify(data.result));
        this.filterActivity = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    async getActivityCount() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/activities/getAcitivityCount');

        this.Activitycount = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    async getTeacherCount() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/teachers/getTeacherCount ');

        this.TeacherCount = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
    async getStudentCount() {
      try {
        const { data } = await axios.get('http://localhost:8000/api/v1/students/getStudentCount ');

        this.StudentCount = JSON.parse(JSON.stringify(data.result));
      } catch (error) {
        console.log(error);
      }
    },
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
  height: 400px;
  width: 450px;
}

.slide{
  height: 100%;
  width: 100%;
  min-height: 500px;
}

.s {
  color: white;
  margin-top: 20px;
  background: #35d99f;
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

.icon {
  width: 35px;
  height: 35px;
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


.carousel-item {
  height: 100%;
  min-height: 500px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.prenext{
  color: #9dff00;

}
.carousel,
.item,
.active {
  height: 100%;
}

.carousel-inner {
  height: 100%;
  background: #000;
}

.carousel-caption {
  padding-bottom: 80px;
}

h2 {
  font-size: 60px;
  margin-top: 15px;
}

p {
  padding: 10px
}


.btn-transparent {
  background: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.btn-transparent:hover {
  background-color: #ffffff;
}

.btn-rounded {
  border-radius: 70px;
}

.btn-large {
  padding: 11px 45px;
  font-size: 18px;
}

.animated {
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100px, 0, 0);
    transform: translate3d(100px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100px, 0, 0);
    transform: translate3d(100px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100px, 0);
    transform: translate3d(0, 100px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100px, 0, 0);
    transform: translate3d(-100px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100px, 0, 0);
    transform: translate3d(-500px, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100px, 0);
    transform: translate3d(0, -100px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

.text1 {
  font-size: 14px;
  font-weight: 600
}

.text2 {
  color: #a5aec0
}


.counter-section i { display:block; margin:0 0 10px}
.counter-section span.counter { font-size:40px; color:#000; line-height:60px; display:block; font-family: "Oswald",sans-serif; letter-spacing: 2px}
.counter-title{ font-size:12px; letter-spacing:2px; text-transform: uppercase}
.counter-icon {top:25px; position:relative}
.counter-style2 .counter-title {letter-spacing: 0.55px; float: left;}
.counter-style2 span.counter {letter-spacing: 0.55px; float: left; margin-right: 10px;}
.counter-style2 i {float: right; line-height: 26px; margin: 0 10px 0 0}
.counter-subheadline span {float: right;}  

.medium-icon {
    font-size: 40px !important;
    margin-bottom: 15px !important;

} 

.con{
    margin-top:100px;
}

</style>
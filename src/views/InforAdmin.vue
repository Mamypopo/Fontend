<template lang="">
   
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
                                <h5>
                                    {{ getUser.firstName }} 
                                    {{ getUser.lastName }} 
                                </h5>
                                <h6 >
                                    {{ getUser.role}}
                                </h6>
                               
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" >
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Profile</button>
                              </li>
                             
                             
                        </ul>
                    </div>
                </div>
                <div class="col">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
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
                                            <label for="fname" class="form-label">Firstname</label>
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
                                          <div class="col-8 col-sm-4">
                                            <label for="studentId" class="form-label">Student ID</label>
                                            <input type="text" class="form-control" name="studentId" v-model="studentId"
                                              placeholder="รหัสนักศึกษา" />
                    
                                            <br>
                                          </div>
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
                <div class="col">
                    <div class="profile-work">
                        
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                        <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                            <div class="row">
                                <div class="col-md-6">
                                    <label>Firstname</label>
                                </div>
                                <div class="col-md-6">
                                    <p>{{ getUser.firstName }}</p>
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
                            <!-- <div class="row">
                                <div class="col-md-6">
                                    <label>Major</label>
                                </div>
                                <div class="col-md-6">
                                    <p>CS</p>
                                </div>
                            </div> -->
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

<script>
import { useUserStore } from '../stores/user';

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
        email:'',
        username: '',
        password: '',
        studentId: '',
        firstName: '',
        lastName: '',
        faculty: '',
        branch: '',
        lineId: '',
        facebookName: '',
        phone: '',
        profileImg:''
    }),
    methods: {

        edit() {
            Swal.fire({
                icon: 'question',
                title: 'ยืนยันที่จะแก้ไขใช่หรือไม่',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            })
        },

        printContent() {
            const printableContent = document.getElementById('printable-content')
            const printWindow = window.open('', '', 'height=1000,width=1000')
            printWindow.document.write(printableContent.innerHTML)
            printWindow.print()
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

iinput {
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
    width: 70%;
    height: 100%;
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
}
</style>
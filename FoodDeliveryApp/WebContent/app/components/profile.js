Vue.component("currentUser-profile", {
    data: function () {
        return {
            currentUser: {},
            showEdit: false,
            isMale: false,
            isFemale: false,
            password: {
                oldPassword: "",
                newPassword: "",
                repeatPassword: "",
            },
            errorMessage: "",
            isSidebarVisible: true,
        };
    },

    template: `
    <div>
        <div class="d-flex" id="wrapper" v-bind:class="!isSidebarVisible ? 'toggled' : 'notoggle'">
            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                <img class="img-fluid d-sm-block" v-bind:src="currentUser.profilePicPath" alt="" id="profile-picture">
                <div class="list-group list-group-flush my-3">
                    <a href="#" data-bs-target=".profileOverview" id="profileOverviewButton" @click="showEdit = false" 
							class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i class="fas fa-user me-2"></i>Profile overview</a>
                    <a href="#" data-bs-target=".editProfile" id="editProfileButton" @click="showEdit = !showEdit; backUpInfo();"
							class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i class="fas fa-edit me-2"></i>Edit profile</a>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#modalForm" 
							class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i class="fas fa-lock me-2"></i>Change password</a>
                </div>
            </div>
            <!-- End of sidebar -->
            <!-- Page Content -->
            <div class="col-md-3">
                <div class="d-flex p-2 justify-content-end d-md-none d-lg-none" style="z-index: 2; position: fixed;">
                    <i class="fas fa-align-left fs-4"
                        id="menu-toggle" @click="isSidebarVisible = !isSidebarVisible"></i>
                </div>
            </div>
            <div class="col-md-8">
                <div class="container">
                    <!-- Heading -->
                    <div class="row mb-2 mainContent border-bottom justify-content-center d-flex text-center">
                        <div class="col-md">
                            <h1>{{currentUser.name}} {{currentUser.surname}}</h1>
                            <p style="text-align: center;">{{currentUser.role}}</p>
                        </div>
                        <div class="col-md">
                            <img src="img/profile.svg" class="d-none d-sm-inline" style="width: 200px; height: 200px"
                                alt="">
                        </div>
                    </div>
                    <!-- End of heading -->
                    <!-- Profile overview -->
                    <div class="row my-5 text-center profileOverview" v-if="!showEdit">
                        <h2 class="mb-2">
                            <i class="fas fa-user mb-4 me-4"></i>Profile
                            overview
                        </h2>
                        <div class="col d-flex justify-content-center">
                            <table class="table-responsive profileTable">
                                <tr>
                                    <td>Birthday</td>
                                    <td>
                                        {{currentUser.dateOfBirth | dateFormat('DD.MM.YYYY')}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        {{currentUser.gender}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>
                                        {{currentUser.username}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" readonly class="form-control-plaintext text-start"
                                            v-model="currentUser.password" style="margin-left: 15px;"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- End of profile overview -->
                    <!-- Edit Profile -->
                    <div class="row my-5 text-center editProfile" v-if="showEdit">
                        <h2 class="mb-2">
                            <i class="fas fa-edit mb-4 me-4"></i>Edit profile
                        </h2>
                        <div class="row d-flex justify-content-center">
                            <table class="table-responsive profileTable">
                               <tr>
                                    <td>First Name</td>
                                    <td>
                                        <input class="form-control text-start" type="text" name="name" v-model="currentUser.name"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>LastName</td>
                                    <td>
                                        <input class="form-control text-start" type="text" name="lastname" v-model="currentUser.surname"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Profile picture</td>
                                    <td>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input form-control" id="validatedCustomFile"
                                            @change="addImage">
                                    </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Birthday</td>
                                    <td>
                                        <vuejs-datepicker :bootstrap-styling="true" style="background-color: white; text-align: start;" class="datepicker" format="dd.MM.yyyy" v-model="currentUser.dateOfBirth"></vuejs-datepicker>                                    </td>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        <label for="radio_1">
                                            <input type="radio" name="gender" :checked="currentUser.gender == 'Male'"
                                                v-bind:value="'Male'" v-model="currentUser.gender">
                                            Male
                                        </label>
                                        <label for="radio_1">
                                            <input type="radio" name="gender" :checked="currentUser.gender == 'Female'"
                                                v-bind:value="'Female'" v-model="currentUser.gender">
                                            Female
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Username</td>
                                    <td>
                                        <input type="text" class="form-control text-start" aria-describedby="username"
                                            v-model="currentUser.username" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" readonly class="form-control-plaintext text-start"
                                            v-model="currentUser.password" style="margin-left: 15px;"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="row my-5">
                            <div class="col d-inline-flex justify-content-center">
                                <button type="button" class="btn profileBtn me-4" v-on:click="updateProfile(currentUser); showEdit = !showEdit">Save</button>
                                <button type="button" class="btn profileBtn" style="background: #ecbeb1" v-on:click="cancelEditing(); showEdit = !showEdit">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <!-- End of edit profile -->
                </div>
            </div>
            <!-- End of page content -->
            <div class="col-md-2"></div>
        </div>
        <!-- Change password -->
        <div class="modal" id="modalForm">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Change password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label required">Old password  <span style="color: red;">*</span></label>
                                <input type="password" class="form-control" v-model="password.oldPassword" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">New password  <span style="color: red;">*</span></label>
                                <input type="password" class="form-control" v-model="password.newPassword"/>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Confirm password  <span style="color: red;">*</span></label>
                                <input type="password" class="form-control" v-model="password.repeatPassword"/>
                            </div>
                        </form>
                    </div>
                    <p style="color: red; font-size: small;" class="text-center mx-2">{{errorMessage}}</p>
                    <div class="modal-footer">
                        <button type="submit" class="btn profileBtn" @click = "changePass(password);">Save</button>
                        <button type="submit" class="btn profileBtn" style="background: #ecbeb1" data-bs-dismiss="modal" @click = "cancelChange(); reload()">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of change password -->
    </div>
    `,
    mounted() {
        axios
            .get("rest/users/getCurrentUser")
            .then((response) => (this.currentUser = response.data));
    },

    methods: {
        backUpInfo: function () {
            if (this.currentUser.username == undefined) return;
            this.backUp = [
                this.currentUser.dateOfBirth,
                this.currentUser.gender,
                this.currentUser.password,
                this.currentUser.username,
                this.currentUser.name,
                this.currentUser.surname,
                this.currentUser.profilePicPath,
            ];
        },
        updateProfile: function (currentUser) {
            axios
                .post(
                    "rest/users/updateUser",
                    JSON.stringify(this.currentUser),
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                )
                .then((response) => "Success");
        },

        cancelEditing: function () {
            this.currentUser.dateOfBirth = this.backUp[0];
            this.currentUser.gender = this.backUp[1];
            this.currentUser.password = this.backUp[2];
            this.currentUser.username = this.backUp[3];
            this.currentUser.name = this.backUp[4];
            this.currentUser.surname = this.backUp[5];
            this.currentUser.profilePicPath = this.backUp[6];
        },

        cancelChange: function () {
            this.currentUser.password = this.backUp[2];
        },

        changePass: function (password) {
            if (
                this.password.oldPassword == "" ||
                this.password.newPassword == "" ||
                this.password.repeatPassword == ""
            ) {
                this.errorMessage = "All fields are required!";
            } else {
                axios
                    .post("rest/users/changePassword", password)
                    .then((response) => {
                        if (response.data == "Old password is incorrect") {
                            this.errorMessage = "Old password is incorrect";
                        } else if (response.data == "Passwords don't match") {
                            this.errorMessage = "Passwords do not match";
                        } else {
                            window.location.reload();
                        }
                    });
            }
        },

        reload: function () {
            window.location.reload();
        },

        addImage(e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.currentUser.profilePicPath = e.target.result;
            };

            reader.readAsDataURL(file);
        },
    },
    computed: {
        fullname: function () {
            return this.currentUser.name + " " + this.currentUser.surname;
        },
    },
    components: {
        vuejsDatepicker,
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

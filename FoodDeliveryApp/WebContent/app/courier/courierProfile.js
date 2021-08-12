Vue.component("courier-profile", {
    data: function () {
        return {
            courier: {},
            showEdit: false,
            backUp: [],
            isMale: false,
            isFemale: false,
        };
    },

    template: `
    <div>
        <div class="d-flex" id="wrapper">
            <!-- Sidebar -->
            <div id="sidebar-wrapper">
                <img class="img-fluid d-sm-block" src="/WebContent/img/product-2.jpg" alt="" id="profile-picture">
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
            <div class="col-md-3"></div>
            <div class="col-md-8">
                <div class="container">
                    <!-- Heading -->
                    <div class="row mb-2 mainContent border-bottom justify-content-center d-flex text-center">
                        <div class="col-md">
                            <h1>{{courier.name}} {{courier.surname}}</h1>
                            <p>{{courier.role}}</p>
                        </div>
                        <div class="col-md">
                            <img src="/WebContent/img/profile.svg" class="d-none d-sm-inline" style="width: 200px; height: 200px"
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
                                        {{courier.dateOfBirth | dateFormat('DD.MM.YYYY')}}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        {{courier.gender}}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Username</td>
                                    <td>
                                        {{courier.username}}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" readonly class="form-control-plaintext align-content-start"
											style="padding: 15px 30px;"
                                            v-model="courier.password"/>
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
                                    <td>Birthday</td>
                                    <td>
                                        <vuejs-datepicker v-model="courier.dateOfBirth" format="dd.MM.yyy"></vuejs-datepicker>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Gender</td>
                                    <td>
                                        <div class="d-inline-flex">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input" type="radio" name="gender" id="maleButton" :checked="courier.gender == 'Male'"
                                                    v-bind:value="'Male'" v-model="courier.gender"/>
                                                <label class="form-check-label" for="maleButton">Male</label>
                                            </div>

                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input ms-4" type="radio" name="gender" id="femaleButton" :checked="courier.gender == 'Female'"
                                                    v-bind:value="'Female'" v-model="courier.gender"/>
                                                <label class="form-check-label" for="female">Female</label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Username</td>
                                    <td>
                                        <input type="text" class="form-control" aria-describedby="username"
                                            v-model="courier.username" />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Password</td>
                                    <td>
                                        <input type="password" readonly class="form-control-plaintext"
                                            v-model="courier.password" />
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="row my-5">
                            <div class="col d-inline-flex justify-content-center">
                                <button type="button" class="btn profileBtn me-4" v-on:click="updateProfile(courier); showEdit = !showEdit">Save</button>
                                <button type="button" class="btn profileBtn" style="background: #ecbeb1" v-on:click="cancelEditing; showEdit = !showEdit">Cancel</button>
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
                                <label class="form-label required">Old password</label>
                                <input type="password" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">New password</label>
                                <input type="password" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Confirm password</label>
                                <input type="password" class="form-control" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn profileBtn">Save</button>
                        <button type="submit" class="btn profileBtn">Cancel</button>
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
            .then((response) => (this.courier = response.data));
    },

    methods: {
        backUpInfo: function () {
            if (this.courier.username == undefined) return;
            this.backup = [
                this.courier.dateOfBirth,
                this.courier.gender,
                this.courier.password,
                this.courier.username,
            ];
        },
        updateProfile: function (courier) {
            axios
                .post("rest/users/updateUser", courier)
                .then((response) => "Success");
        },

        cancelEditing: function () {
            this.courier.dateOfBirth = this.backup[0];
            this.courier.gender = this.backup[1];
            this.courier.password = this.backup[2];
            this.courier.username = this.backup[3];
        },
    },

    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

function fixDate(users) {
	for (var u of users) {
		u.dateOfBirth = new Date(parseInt(u.dateOfBirth));
	}
	return users;
}

Vue.component("administrator-users", {
	data: function () {
		return {
			users: [],
			selectedUser: {
				username : ''
			},
			searchInput: '',
			selectedFilter: 'All',
			selectedOptionForSort: '',
			newUser: {},
			errorMessage: '',
			gender: '',
			canBlock: false,
			canUnblock: false,
			medal : "",
			restaurant : ''
		}
	}
	,
	template: `
<div>
<div class="container-fluid mt-3">
        <div class="row">
            <!--Card for table of users-->
            <div class="col-lg-8 col-sm-11 mx-auto">
                <div class="card noHover text-center shadow-sm mb-3" style="height: 600px;">
                    <h6 class="card-subtitle mb-3 mt-3 text-muted">List of Users</h6>
                    <div class="row mt-3 mx-2 ">
                            <div class="col-3 mx-auto">
                                <div class="form-floating">
                                    <select class="form-select" v-model="selectedFilter" v-on:change="filter()">
                                        <option>All</option>
                                        <option>Managers</option>
                                        <option>Couriers</option>
                                        <option>Customers</option>
                                        <option>Golden</option>
                                        <option>Silver</option>
                                        <option>Bronze</option>
                                        <option>Suspicious</option>
                                    </select>
                                    <label style="height: 35px;">Filter By</label>
                                </div>
                            </div>
                            <div class="col-3 mx-auto">
                                <div class="form-floating">
                                    <select class="form-select" v-model="selectedOptionForSort" v-on:change="sort()">
                                        <option>Name Asc</option>
                                        <option>Name Desc</option>
                                        <option>Surname Asc</option>
                                        <option>Surname Desc</option>
                                        <option>Username Asc</option>
                                        <option>Username Desc</option>
                                        <option>Points Asc</option>
                                        <option>Points Desc</option>
                                    </select>
                                    <label style="height: 35px;">Sort By</label>
                                </div>
                            </div>
                            <div class="col-4 mx-auto">
                                <div class="input-group mt-2">
                                    <input type="text" class="form-control" v-model="searchInput" v-on:change="doSearch()">
                                    <button class="btn buttonGroup active" type="button" style="height: 35px;" v-on:click="doSearch()"><i class="fas fa-search"></i></button>     
                                </div>
                            </div>
                        </div>
                    <div class="row mt-3" style="height: 400px;">
                        <div class="col-11 mx-auto">
                            <div style="height:350px; overflow:auto;">
                                <table class="table table-hover tableOfUsers">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Surname</th>
                                            <th scope="col">Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="u in users" v-on:click="selectUser(u)" v-bind:class="{selected : selectedUser.username===u.username}" >
                                            <td>{{u.name}}</td>
                                            <td>{{u.surname}}</td>
                                            <td class="justify-content-center" style="text-align : right;">{{u.username}}
                                            	<i class="fa fa-ban" style="text-align : right; " v-if="u.blocked == true" id="blocked"></i>
                                            	<i class="fas fa-check" style="text-align : right; "  v-if="u.blocked == false && u.suspicious == false" id="regular"></i>
                                            	<i class="fas fa-exclamation-circle" style="text-align : right; " v-if="u.suspicious == true && u.blocked == false" id="suspicious"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4">
                            <button class="btn buttonGroup" v-on:click="remove()"><i class="fa fa-trash"></i> Remove</button>
                        </div>
                    
						<div class="col-4">
							<button class="btn buttonGroup active" v-on:click="blockUser()" v-if="canBlock"><i class="fa fa-ban"></i>
							Block</button>
							<button class="btn buttonGroup active" v-on:click="blockUser()" v-if="canUnblock"><i class="fa fa-ban"></i>
								Unblock</button>
						</div>
                        <div class="col-4">
                            <button class="btn buttonGroup" data-bs-toggle="modal" data-bs-target="#menagerModal"><i class="fa fa-plus"></i>
                                Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Card for user info-->
            <div class="col-lg-4 col-sm-11 mx-auto" v-if="selectedUser.username != ''">
                <div class="card noHover text-center shadow-sm mb-3" style="height: 600px;">
                    <div class="row" style="height: 250px;">
                        <div class="col-10 mx-auto bg-light mt-2" style="border-radius: 30px;">
                            <img src="img/profile_picture.png" class="card-img-top"
                                style="height: 250px; width: 250px;" alt="...">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <h4 class="mt-2">{{selectedUser.name}} {{selectedUser.surname}}( {{selectedUser.role}} )</h4>
                            <hr>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <p>Date of Birth: {{selectedUser.dateOfBirth | dateFormat('DD.MM.YYYY')}}
                            <p>
                                <hr>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <p>Gender: {{selectedUser.gender}}
                            <p>
                                <hr>
                        </div>
                    </div>
                    <div class="row mt-2" v-if="selectedUser.role === 'CUSTOMER'">
                        <div class="col-11 mx-auto">
                            <p>Points: {{selectedUser.points}} 
                            	<i class="fas fa-medal" style="color:brown;" v-if="medal == 'BRONZE'"></i>
                                    <i class="fas fa-medal" style="color:gold;" v-if="medal == 'GOLD'"></i>
                                    <i class="fas fa-medal" v-if="medal == 'SILVER'"></i>
                            <p>
                                <hr>
                        </div>
                    </div>
                     <div class="row mt-2" v-if="selectedUser.role === 'MANAGER'">
                        <div class="col-11 mx-auto">
                            <p v-if="restaurant != ''">Restaurant: "{{restaurant}}" </p>
                             <p v-if="restaurant == ''">No Restaurant </p>
                            
                                <hr>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <p>Username: {{selectedUser.username}}
                            <p>
                                <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="menagerModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-title text-center">
                            <h4><i class="fas fa-user-alt"></i> Add New User</h4>
                            <hr>
                        </div>
                        <div class="d-flex flex-column text-center">
                            <form>
                                <div class="d-grid gap-4">
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label" style="text-align: left;">First
                                                Name</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="newUser.name"
                                                    v-on:change="signalChange">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label" style="text-align: left;">Last
                                                Name</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="newUser.surname"
                                                    v-on:change="signalChange">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label"
                                                style="text-align: left;">Role</label>
                                            <div class="col-sm-8">
                                                <select class="form-select" v-model="newUser.role">
                                                    <option>MANAGER</option>
                                                    <option>COURIER</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label"
                                                style="text-align: left;">Username</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" v-model="newUser.username"
                                                    v-on:change="signalChange">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label"
                                                style="text-align: left;">Password</label>
                                            <div class="col-sm-8">
                                                <input type="password" class="form-control" v-model="newUser.password"
                                                    v-on:change="signalChange">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <label class="col-sm-4 col-form-label" style="text-align: left;">Date Of
                                                Birth</label>
                                            <div class="col-sm-8">
                                                <input type="date" class="form-control" v-model="newUser.dateOfBirth">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check form-check-inline" style="margin-left: 5rem;">
                                            <input class="form-check-input" type="radio" value="male" v-model="gender">
                                            <label class="form-check-label">Male</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" value="female"
                                                v-model="gender">
                                            <label class="form-check-label">Female</label>
                                        </div>
                                    </div>
                                    <p style="color: red; font-size: small;">{{errorMessage}}</p>
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="d-flex justify-content-evenly">
                                                    <button type="button" class="btn btn-block buttonGroup"
                                                        data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" class="btn btn-block buttonGroup active"
                                                        v-on:click="addUser()">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
`
	, mounted() {
		axios
			.get("rest/users/getUsers")
			.then((response) => 
				this.users = fixDate(response.data))
	},
	methods: {
		selectUser: function (user) {
			this.selectedUser = user;
			this.medal = this.selectedUser.type.name;
			
			if (this.selectedUser.blocked){
				this.canUnblock = true;
				this.canBlock = false;}
			else{
				this.canBlock = true;
				this.canUnblock = false;
				}
			if(user.role == 'MANAGER'){
			axios
                .get("rest/restaurants/getRestaurantName", {
                    params: { id: this.selectedUser.username },
                })
                 .then((response) => (this.restaurant = response.data));
             }
		},
		doSearch: function () {
			let matches = [];
			for (var u of this.users) {
				if (u.name.toLowerCase().search(searchInput.toLowerCase()) || u.surname.toLowerCase().contains(searchInput.toLowerCase()) || u.username.toLowerCase().contains(searchInput.toLowerCase())) {
					matches.add(u);
				}
			}
			this.users = matches;
		},
		filter: function () {
			axios
				.post('rest/users/filter', this.selectedFilter,
					{
						headers: {
							'Content-type': 'text/plain',
						}
					})
				.then(response => (this.users = fixDate(response.data)))
				.then((response) => (this.selectedUser = { username : ''}));
		},
		sort: function () {

			switch (this.selectedOptionForSort) {
				case "Name Desc":
					this.users.sort((a, b) => (a.name < b.name ? 1 : -1));
					break;
				case "Surname Asc":
					this.users.sort((a, b) => (a.surname > b.surname ? 1 : -1));
					break;
				case "Surname Desc":
					this.users.sort((a, b) => (a.surname < b.surname ? 1 : -1));
					break;
				case "Username Asc":
					this.users.sort((a, b) => (a.username > b.username ? 1 : -1));
					break;
				case "Username Desc":
					this.users.sort((a, b) => (a.username < b.username ? 1 : -1));
					break;
				case "Points Asc":
					this.users.sort((a, b) => (a.points > b.points ? 1 : -1));
					break;
				case "Points Desc":
					this.users.sort((a, b) => (a.points < b.points ? 1 : -1));
					break;
				default:
					this.users.sort((a, b) => (a.name > b.name ? 1 : -1));
			}

		}, addUser: function () {

			if (this.newUser.username == '' || this.newUser.password == '' || this.newUser.name == '' || this.newUser.surname == '' || this.gender == '' || this.newUser.role == '') {
				this.errorMessage = "All fields are required!";
			}
			else {
				let selectedGender;
				if (this.gender == 'male') {
					selectedGender = 0;
				} else {
					selectedGender = 1;
				}

				this.newUser.gender = selectedGender;

				axios
					.post('rest/users/addNewUser', JSON.stringify(this.newUser),
						{
							headers: {
								'Content-type': 'application/json',
							}
						})
					.then(response => {
						if (response.data == "Username taken") {
							this.errorMessage = "Username is already taken.";
						}
						else {
							location.href = response.data;
						}
					})
					.catch(err => {
						this.errorMessage = "error";
					})
			}

		},
		signalChange: function () {
			this.errorMessage = "";
		},
		remove: function () {
			if (this.selectedUser.username == '') {
				alert("You must select a user.");
			} else {
				let user = this.selectedUser;
				axios
					.post('rest/users/removeUser', this.selectedUser.username,
						{
							headers: {
								'Content-type': 'text/plain',
							}
						})
					.then((response) => (this.users = fixDate(response.data)))
					.then((response) => (this.selectedUser = { username : ''}));
			}
		},
		blockUser: function () {
			axios
				.post('rest/users/blockUser', this.selectedUser.username,
					{
						headers: {
							'Content-type': 'text/plain',
						}
					})
				.then((response) => {
					this.users = fixDate(response.data);
					this.canBlock = !this.canBlock;
					this.canUnblock = !this.canUnblock;
				});
		}
	},
	filters: {
		dateFormat: function (value, format) {
			var parsed = moment(value);
			return parsed.format(format);
		}
	}
});

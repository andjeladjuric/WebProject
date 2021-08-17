function fixDate(users) {
	for (var u of users) {
		u.dateOfBirth = new Date(parseInt(u.dateOfBirth));
	}
	return users;
}

Vue.component("administrator-home",{
    data: function(){
        return{
			users:[],
			selectedUser : {}
        }
    }
    ,
    template: `
<div>
<div class="container-fluid mt-3">
        <div class="row">
            <!--Card for table of users-->
            <div class="col-lg-8 col-sm-11 mx-auto">
                <div class="card text-center shadow-sm mb-3" style="height: 600px;">
                    <h6 class="card-subtitle mb-3 mt-3 text-muted">List of Users</h6>
                    <div class="row mt-3 mx-2 ">
                        <div class="col-6 mx-auto">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control">
                                <button class="btn buttonGroup active" type="button">Search</button>
                            </div>
                        </div>
                        <div class="col-3 mx-auto">
                            <div class="input-group mb-3">
                                <label class="input-group-text">Sort By</label>
                                <select class="form-select">
                                    <option selected></option>
                                    <option value="1">First Name</option>
                                    <option value="2">Last Name</option>
                                    <option value="3">Username</option>
                                    <option value="3">Points</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-3 mx-auto">
                            <div class="input-group mb-3">
                                <label class="input-group-text">User Type</label>
                                <select class="form-select">
                                    <option selected></option>
                                    <option value="1">Managers</option>
                                    <option value="1">Couriers</option>
                                    <option value="1">Customers</option>
                                    <option value="1">Golden</option>
                                    <option value="2">Silver</option>
                                    <option value="3">Bronze</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3" style="height: 400px;">
                        <div class="col-11 mx-auto">
                            <div style="height:380px; overflow:auto;">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Surname</th>
                                            <th scope="col">Username</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="u in users" v-on:click="selectUser(u)">
                                            <td>{{u.name}}</td>
                                            <td>{{u.surname}}</td>
                                            <td>{{u.username}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4">
                            <button class="btn buttonGroup"><i class="fa fa-trash"></i> Remove</button>
                        </div>
                        <div class="col-4">
                            <button class="btn buttonGroup active"><i class="fa fa-ban"></i>
                                Block</button>
                        </div>
                        <div class="col-4">
                            <button class="btn buttonGroup"><i class="fa fa-plus"></i>
                                Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Card for user info-->
            <div class="col-lg-4 col-sm-11 mx-auto">
                <div class="card text-center shadow-sm mb-3" style="height: 600px;">
                    <div class="row" style="height: 250px;">
                        <div class="col-10 mx-auto bg-light mt-2" style="border-radius: 30px;">
                            <img src="/img/profile_picture.png" class="card-img-top"
                                style="height: 250px; width: 250px;" alt="...">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <h4>{{selectedUser.name}} {{selectedUser.surname}}( {{selectedUser.role}} )</h4>
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
                    <div class="row mt-2">
                        <div class="col-11 mx-auto">
                            <p>Points: {{selectedUser.points}}
                            <p>
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
</div>
`
	, mounted() {
		axios
			.get("rest/users/getUsers")
            .then((response) =>( this.users = fixDate(response.data)));
    },
    methods: {
		selectUser : function(user) {
    			this.selectedUser = user;
    	},
    },
    filters: {
    	dateFormat: function (value, format) {
    		var parsed = moment(value);
    		return parsed.format(format);
    	}
	}
});
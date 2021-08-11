Vue.component("administrator-home",{
    data: function(){
        return{
			users:[],
            customers : [],
			managers : [],
			couriers : [],
			selectedUser : {}
        }
    }
    ,
    template: `
    <div>
	<div class="container-fluid mt-3">
    <div class="row">
      <div class="col-lg-8 col-md-12 col-11 mx-auto">
        <div class="card text-center shadow-sm mb-3" style="height: 600px;">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">Users</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">Menagers</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                role="tab" aria-controls="contact" aria-selected="false">Deliverers</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="container-fluid">
                <div class="row mt-3">
                  <div class="col-6 mx-auto">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                      <button class="btn buttonGroup active" type="button" id="button-addon2">Search</button>
                    </div>
                  </div>
                  <div class="col-3 mx-auto">
                    <div class="input-group mb-3">
                      <label class="input-group-text" for="inputGroupSelect01">Sort By</label>
                      <select class="form-select" id="inputGroupSelect01">
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
                      <label class="input-group-text" for="inputGroupSelect01">User Type</label>
                      <select class="form-select" id="inputGroupSelect01">
                        <option selected></option>
                        <option value="1">Golden</option>
                        <option value="2">Silver</option>
                        <option value="3">Bronze</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row" style="height: 400px;">
                  <div class="col-11 mx-auto">
                    <div style="height:380px;overflow:auto;">
                      <table>
						<tr bgcolor="lightgrey">
							<th>Name</th>
							<th>Surname</th>
							<th>Username</th>
						</tr>
		
				<tr v-for="c in customers">
					<td>{{c.name }}</td>
					<td>{{c.surname}}</td>
					<td>{{c.username}}</td>
				</tr>
				</table>
                    </div>

                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <button class="btn buttonGroup"><i class="fa fa-trash"></i> Remove</button>
                  </div>
                  <div class="col-6">
                    <button class="btn buttonGroup active"><i class="fa fa-ban" ></i>
                      Block</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="container-fluid">
                <div class="row mt-3">
                  <div class="col-6 mx-auto">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                      <button class="btn buttonGroup active" type="button" id="button-addon2">Search</button>
                    </div>
                  </div>
                  <div class="col-6 mx-auto">
                    <div class="input-group mb-3">
                      <label class="input-group-text" for="inputGroupSelect01">Sort By</label>
                      <select class="form-select" id="inputGroupSelect01">
                        <option selected></option>
                        <option value="1">First Name</option>
                        <option value="2">Last Name</option>
                        <option value="3">Username</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row" style="height: 400px;">
                  <div class="col-11 mx-auto">
                    <div style="height:380px;overflow:auto;">
                      <table>
						<tr bgcolor="lightgrey">
							<th>Name</th>
							<th>Surname</th>
							<th>Username</th>
						</tr>
		
				<tr v-for="m in managers">
					<td>{{m.name }}</td>
					<td>{{m.surname}}</td>
					<td>{{m.username}}</td>
				</tr>
				</table>
                    </div>

                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <button class="btn buttonGroup"><i class="fa fa-trash"></i> Remove</button>
                  </div>
                  <div class="col-6">
                    <button class="btn buttonGroup active" data-bs-toggle="modal" data-bs-target="#menagerModal"><i
                        class="fa fa-plus"></i> Add</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
              <div class="container-fluid">
                <div class="row mt-3">
                  <div class="col-6 mx-auto">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" aria-label="Recipient's username"
                        aria-describedby="button-addon2">
                      <button class="btn buttonGroup active" type="button" id="button-addon2">Search</button>
                    </div>
                  </div>
                  <div class="col-6 mx-auto">
                    <div class="input-group mb-3">
                      <label class="input-group-text" for="inputGroupSelect01">Sort By</label>
                      <select class="form-select" id="inputGroupSelect01">
                        <option selected></option>
                        <option value="1">First Name</option>
                        <option value="2">Last Name</option>
                        <option value="3">Username</option>
                      </select>
                    </div>
                  </div>
                <rdiv>
                <div class="row" style="height: 400px;">
                  <div class="col-11 mx-auto">
                    <div style="height:380px;overflow:auto;">
                      <table>
						<tr bgcolor="lightgrey">
							<th>Name</th>
							<th>Surname</th>
							<th>Username</th>
						</tr>
		
				<tr v-for="c in couriers">
					<td>{{c.name }}</td>
					<td>{{c.surname}}</td>
					<td>{{c.username}}</td>
				</tr>
				</table>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-6">
                    <button class="btn buttonGroup"><i class="fa fa-trash" ></i> Remove</button>
                  </div>
                  <div class="col-6">
                    <button class="btn buttonGroup active" data-bs-toggle="modal" data-bs-target="#delivererModal"><i
                        class="fa fa-plus"></i> Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-11 col-md-12 mx-auto">
        <div class="card text-center shadow-sm" style="height: 600px;">
          <div class="row">
            <div class="col-11 mx-auto bg-light mt-2" style="border-radius: 30px;">
              <img src="/img/profile_picture.png" class="card-img-top" style="height: 250px; width: 250px;" alt="...">
            </div>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{selectedUser.name}} {{selectedUser.surname}}({{selectedUser.role}})</h5>
            <div class="row">
              <div class="col-12">
                <p class="card-text">
                  Date of Birth: {{selectedUser.dateOfBirth}}
                </p>
                <hr>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="card-text">
                  Gender: {{selectedUser.gender}}
                </p>
                <hr>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="card-text">
                  Status: <i class="fa fa-medal" style="color: gold;"></i> ( {{selectedUser.points}} points)
                </p>
                <hr>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <p class="card-text">
                  Username: {{selectedUser.username}}
                </p>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
		
	</div>
    
    `, mounted() {
		axios
			.get("rest/users/getManagers")
            .then((response) =>( this.managers = response.data));
		axios
			.get("rest/users/getCustomers")
            .then((response) =>( this.customers = response.data));
		axios
			.get("rest/users/getCouriers")
            .then((response) =>( this.couriers = response.data));
    },
    methods: {
    },
});
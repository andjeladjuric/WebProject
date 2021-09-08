function fixDate(users) {
    for (var u of users) {
        u.dateOfBirth = new Date(parseInt(u.dateOfBirth));
    }
    return users;
}
Vue.component("restaurant-form", {
    data: function () {
        return {
            step: 1,
            totalSteps: 3,
            table: 1,
            managers: [],
            restaurant: {
            	name : '',
            	type : ''
            },
            selectedManager: {
            	username : ''
            },
            newManager: {},
            errorMessage: "",
            gender: "",
            searchInput: "",
            selectedOptionForSort: "",
            matches: [],
            count: 0,
            location: {
                address: {
                    street: "",
                    number: "",
                    city: "",
                    country: "",
                    postcode: "",
                },
                latitude: 0,
                longitude: 0,
            },
            images: [],
            imageSrc: "",
            chosenImg: {},
            firstError : '',
            secondError : '',
            workingHours : {
            	sat : false,
            	sun : false
            }
        };
    },
    template: `
    <div>
	<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6 col-sm-11 mx-auto">
            <div class="card noHover shadow-sm my-3 align-items-center" style="height: 600px;">
                <form style="height: 520px;">
                    <section v-if="step == 1">
                        <div class="d-flex justify-content-center">
                            <h4 class="card-title my-5">Restaurant Informations</h4>
                        </div>
                        <div class="d-grid gap-3">
                            <div class="row">
                                <div class="col-3 mx-auto">
                                    <label class="form-label">Name:</label>
                                </div>
                                <div class="col-8  mx-auto">
                                    <input type="text" class="form-control" v-model="restaurant.name" v-on:change="signalChange()">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3 mx-auto">
                                    <label class="form-label">Type:</label>
                                </div>
                                <div class="col-8  mx-auto">
                                    <select class="form-select" v-model="restaurant.type" v-on:change="signalChange()">
                                        <option>ITALIAN</option>
                                        <option>FASTFOOD</option>
                                        <option>DESSERTS</option>
                                        <option>CHINEESE</option>
                                        <option>BARBEQUE</option>
                                        <option>MEXICAN</option>
                                        <option>VEGAN</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3 mx-auto">
                                    <label class="form-label">Logo:</label>
                                </div>
                                <div class="col-8  mx-auto">
                                    <input class="form-control" type="file" @change="addImage">
                                </div>
                            </div>

                            <div class="row mt-2">
                                <div class="col-3 mx-auto">
                                    <label class="form-label">Address:</label>
                                </div>
                                <div class="col-5 mx-auto">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly v-model="location.address.street" style="background-color:transparent;">
                                        <label>Street</label>
                                    </div>
                                </div>
                                <div class="col-3 mx-auto">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" readonly v-model="location.address.number" style="background-color:transparent;">
                                        <label>Number</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-3 mx-auto">
                                </div>
                                <div class="col-5 mx-auto">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="location.address.city" readonly style="background-color:transparent;">
                                        <label>City</label>
                                    </div>
                                </div>
                                <div class="col-3 mx-auto">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" v-model="location.address.postcode" readonly style="background-color:transparent;">
                                        <label>Postcode</label>
                                    </div>
                                </div>
                            </div>
                            
                             <div class="row me-1">
	                            <div class="col-12">
	                            	 <div class="d-flex justify-content-end">
	                                	<a href="#newRestaurant" @click="openMap()" data-bs-toggle="modal" data-bs-target="#mapModal">Choose on map</a>
	                                 </div>
	                            </div>
                            </div>
                            <div class="d-flex justify-content-center">
                            	<p style="color: red; font-size: small;">{{firstError}}</p>
                           </div>
                        </div>
                    </section>

                    <section v-if="step == 2">
                        <div class="d-flex justify-content-center">
						  <h4 class="card-title my-5">Working hours</h4>
						</div>
						<div class="d-grid gap-3">
						  <div class="row">
						    <div class="card noHover shadow-sm bg-light" style="width : 400px;">
						      <div class="d-grid gap-2">
						        <div class="d-flex justify-content-center mt-2">
						          <p>Work days</p>
						        </div>
						        <div class="row mt-2 mb-3">
						          <div class="col-6 mx-auto">
						            <div class="form-floating">
						              <input type="time" class="form-control" v-model="workingHours.opens" />
						              <label>Opens at</label>
						            </div>
						          </div>
						          <div class="col-6 mx-auto">
						            <div class="form-floating">
						              <input type="time" class="form-control" v-model="workingHours.closes" />
						              <label>Closes at</label>
						            </div>
						          </div>
						        </div>
						      </div>
						    </div>
						  </div>
						  <div class="row">
						    <div class="card noHover shadow-sm bg-light" style="width : 400px;">
						      <div class="d-grid gap-2">
						        <div class="d-flex justify-content-center mt-2">
						          <p>Weekends</p>
						        </div>
						        <div class="row">
						          <div class="col-6 mx-auto">
						            <div class="form-floating">
						              <input type="time" class="form-control" v-model="workingHours.opensw" />
						              <label>Opens at</label>
						            </div>
						          </div>
						          <div class="col-6 mx-auto">
						            <div class="form-floating">
						              <input type="time" class="form-control" v-model="workingHours.closesw" />
						              <label>Closes at</label>
						            </div>
						          </div>
						        </div>
						        <div class="row mb-3">
						          <div class="col-11">
						            <div class="d-flex justify-content-center gap-3">
						              <div class="form-check">
						                <input class="form-check-input" type="checkbox" v-model="workingHours.sat" />
						                <label class="form-check-label"> Sat </label>
						              </div>
						              <div class="form-check">
						                <input class="form-check-input" type="checkbox" v-model="workingHours.sun" />
						                <label class="form-check-label"> Sun </label>
						              </div>
						            </div>
						          </div>
						        </div>
						      </div>
						    </div>
						  </div>
						</div>
                    </section>

                    <section v-if="step == 3">
                        <section v-if="table == 1">
                            <div class="d-flex justify-content-center">
                                <h4 class="card-title my-5">Choose Manager</h4>
                            </div>
                            <div class="d-grid gap-3">
                                <div class="row justify-content-evenly mx-3">
                                    <div class="col-5 mx-auto">
                                        <div class="input-group mb-3">
                                            <label class="input-group-text"
                                                style="height: 35px; border-radius: 15px 0px 0px 15px;">Sort By</label>
                                            <select class="form-select" v-model="selectedOptionForSort"
                                                v-on:change="sort()">
                                                <option>Name Asc</option>
                                                <option>Name Desc</option>
                                                <option>Surname Asc</option>
                                                <option>Surname Desc</option>
                                                <option>Username Asc</option>
                                                <option>Username Desc</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-5 mx-auto">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" v-model="searchInput"
                                                v-on:keyup="doSearch">
                                            <button class="btn buttonGroup active" type="button" @click="doSearch"
                                                style="height: 35px;"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-10 mx-auto">
                                        <div style="height:250px;overflow:auto;">
                                            <table class="table table-sm table-hover tableOfUsers">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Surname</th>
                                                        <th scope="col">Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="m in managers" v-on:click="selectManager(m)"
                                                        v-bind:class="{selected : selectedManager.username===m.username}">
                                                        <td>{{m.name}}</td>
                                                        <td>{{m.surname}}</td>
                                                        <td>{{m.username}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="row ms-5">
                                    <div class="col-6">
                                        <a href="" @click.prevent="addNewManager">
                                            Create New Menager
                                        </a>

                                    </div>
                                </div>
                                 <div class="d-flex justify-content-center">
                            		<p style="color: red; font-size: small; margin-bottom: 20px">{{secondError}}</p>
                           		</div>
                            </div>
                        </section>

                        <section v-if="table == 0">
                            <form>
                                <div class="d-flex justify-content-center">
                                    <h4 class="card-title my-5">New Manager</h4>
                                </div>
                                <div class="d-grid gap-3">
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Name:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="text" class="form-control" v-model="newManager.name"
                                                v-on:change="signalChange()">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Surname:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="text" class="form-control" v-model="newManager.surname"
                                                v-on:change="signalChange()">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Username:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="text" class="form-control" v-model="newManager.username"
                                                v-on:change="signalChange()">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Password:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="password" class="form-control" v-model="newManager.password"
                                                v-on:change="signalChange()">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Date Of Birth:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="date" class="form-control" v-model="newManager.dateOfBirth" v-on:change="signalChange()">
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2 justify-content-evenly ">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" value="male" v-model="gender" v-on:change="signalChange()">
                                            <label class="form-check-label">
                                                Male
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" value="female"
                                                v-model="gender" v-on:change="signalChange()">
                                            <label class="form-check-label">
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                    <p style="color: red; font-size: small;">{{errorMessage}}</p>
                                    <div class="d-flex justify-content-evenly">
                                        <button class="btn buttonGroup" @click.prevent="cancel">Cancel</button>
                                        <button class="btn buttonGroup" @click.prevent="addManager">Save</button>
                                    </div>
                                </div>
                            </form>

                        </section>
                    </section>
                </form>

                <div class="d-flex gap-5" v-if="table == 1">
                    <button v-if="step != 1" class="btn buttonGroup" @click.prevent="prevStep">Prev</button>
                    <button v-if="step != totalSteps" class="btn buttonGroup" @click.prevent="nextStep">Next</button>
                    <button v-if="step == totalSteps" class="btn buttonGroup" @click.prevent="sendImgToBack">Submit</button>
                </div>

            </div>
        </div>
    </div>
    
       <!-- Map modal -->
            <div id="mapModal" class="modal fade responsive">
                <div class="modal-dialog modal-dialog-centered modal-map">
                    <div class="modal-content">
                        <div class="modal-header flex-column">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                            <h4 class="modal-title w-100">
                                Select location
                            </h4>	
                        </div>
                        <div class="modal-body">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of map modal -->
</div>

	</div>
    
    `,
    mounted() {
        axios
            .get("rest/users/getManagers")
            .then((response) => (this.managers = fixDate(response.data)));

        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));
    },
    methods: {
        nextStep: function () {
        	if(this.step == 1){
        		if(this.restaurant.name === '' || this.restaurant.type === '' || this.location.address.street === ''
        			|| this.location.address.city === '' || this.location.address.number === '' || this.location.address.postcode === ''
        			|| this.imageSrc === ''){
        			this.firstError = "All fields are required!";
        		}else{
        			this.firstError = "";
        			this.step++;
        		}
        	}else{
            	this.step++;
            }
        },
        prevStep: function () {
            this.step--;
        },
        addNewManager: function () {
            this.table = 0;
        },
        cancel: function () {
            this.table = 1;
        },
        selectManager: function (manager) {
            this.selectedManager = manager;
            this.secondError = "";
        },
        addManager: function () {
            if (
                this.newManager.username == "" ||
                this.newManager.password == "" ||
                this.newManager.name == "" ||
                this.newManager.surname == "" ||
                this.gender == ""
            ) {
                this.errorMessage = "All fields are required!";
            } else {
                let selectedGender;
                if (this.gender == "male") {
                    selectedGender = 0;
                } else {
                    selectedGender = 1;
                }

                this.newManager.gender = selectedGender;
                this.newManager.role = "MANAGER";

                axios
                    .post(
                        "rest/users/addNewUser",
                        JSON.stringify(this.newManager),
                        {
                            headers: {
                                "Content-type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        if (response.data == "Username taken") {
                            this.errorMessage = "Username is already taken.";
                        } else {
                            axios
                                .get("rest/users/getManagers")
                                .then(
                                    (response) =>
                                        (this.managers = fixDate(response.data))
                                );
                            this.table = 1;
                            this.selectedManager = this.newManager;
                        }
                    })
                    .catch((err) => {
                        this.errorMessage = "error";
                    });
            }
        },
        signalChange: function () {
            this.errorMessage = "";
            this.firstError = "";
        },
        doSearch: function () {
            axios.get("rest/users/getManagers").then((response) => {
                this.managers = fixDate(response.data);
                this.matches = [];
                for (var u of this.managers) {
                    if (
                        u.name
                            .toLowerCase()
                            .match(this.searchInput.toLowerCase()) ||
                        u.surname
                            .toLowerCase()
                            .match(this.searchInput.toLowerCase()) ||
                        u.username
                            .toLowerCase()
                            .match(this.searchInput.toLowerCase())
                    ) {
                        this.matches.push(u);
                    }
                }
                this.managers = this.matches;
            });
        },
        sort: function () {
            switch (this.selectedOptionForSort) {
                case "Name Desc":
                    this.managers.sort((a, b) => (a.name < b.name ? 1 : -1));
                    break;
                case "Surname Asc":
                    this.managers.sort((a, b) =>
                        a.surname > b.surname ? 1 : -1
                    );
                    break;
                case "Surname Desc":
                    this.managers.sort((a, b) =>
                        a.surname < b.surname ? 1 : -1
                    );
                    break;
                case "Username Asc":
                    this.managers.sort((a, b) =>
                        a.username > b.username ? 1 : -1
                    );
                    break;
                case "Username Desc":
                    this.managers.sort((a, b) =>
                        a.username < b.username ? 1 : -1
                    );
                    break;
                default:
                    this.managers.sort((a, b) => (a.name > b.name ? 1 : -1));
            }
        },
        submit: function () {
        	if(this.selectedManager.username === ''){
        		this.secondError = "You must select a manager!";
        	}else{
	            this.restaurant.menagerId = this.selectedManager.username;
	            this.restaurant.workingHours = this.workingHours;
	            axios.post(
	                "rest/restaurants/addNewRestaurant",
	                JSON.stringify(this.restaurant),
	                {
	                    headers: {
	                        "Content-type": "application/json",
	                    },
	                }
	            );
	          window.location = "/FoodDeliveryApp/administratorPage.html#/";
	          location.reload();
            }
        },
        openMap: function () {
            this.count = this.count + 1;

            if (this.count === 1) {
                var map = new ol.Map({
                    target: "map",
                    layers: [
                        new ol.layer.Tile({ source: new ol.source.OSM() }),
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([20.9224158, 44.2107675]),
                        zoom: 5,
                    }),
                });

                window.setTimeout(function () {
                    map.updateSize();
                }, 200);

                /*
                 * reference: https://stackoverflow.com/questions/50882125/open-layers-maps-with-longitude-and-latitude-get-address
                 *
                 *
                 */
                map.on("click", (evt) => {
                    var coordinates = ol.proj.toLonLat(evt.coordinate);
                    fetch(
                        "http://nominatim.openstreetmap.org/reverse?format=json&lon=" +
                            coordinates[0] +
                            "&lat=" +
                            coordinates[1]
                    )
                        .then((response) => {
                            return response.json();
                        })
                        .then((json) => {
                            console.log(json);

                            this.location.address.street = json.address.road;
                            this.location.address.city = json.address.city;
                            this.location.address.number =
                                json.address.house_number;
                            this.location.address.postcode =
                                json.address.postcode;
                            this.location.address.country =
                                json.address.country;
                            this.location.latitude = json.lat;
                            this.location.longitude = json.lon;
                            this.restaurant.location = this.location;
                        });
                });
            }
        },
        addImage(e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.imageSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        imageAlreadyExists() {
            for (let i of this.images) {
                if (i.imageCode === this.imageSrc) {
                    return i;
                }
            }

            return null;
        },

        sendImgToBack: function () {
            var image = this.imageAlreadyExists();
            if (image !== null) {
                this.restaurant.logo = image.imageId;
                this.submit();
                //window.location.reload();
            } else {
                axios
                    .post("rest/images/addNewImage", this.imageSrc, {
                        headers: {
                            "Content-type": "text/plain",
                        },
                    })
                    .then((response) => {
                        this.chosenImg = response.data;
                        this.restaurant.logo = this.chosenImg.imageId;
                        this.submit();
                        //window.location.reload();
                    });
            }
        },
    },
});

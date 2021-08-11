Vue.component("administrator-header",{
    data: function(){
        return{
            fleg:0
        }
    }
    ,
    template: `
    <div>
		<nav class="navbar sticky-top navbar-expand-lg bg-light navbar-light">
		      <div class="container">
		          <div class="d-flex align-items-center">
		              <h2 class="fs-2 m-0">PIXIE Delivery</h2>
		          </div>
		
		          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"
		              aria-expanded="false" aria-label="Toggle navigation">
		              <span class="navbar-toggler-icon"></span>
		          </button>
		
		          <div class="collapse navbar-collapse" id="navmenu">
		              <ul class="navbar-nav ms-auto">
		                  <li class="nav-item">
		                      <a href="" class="nav-link" data-bs-toggle="modal" data-bs-target="#createRestaurantModal">New Restaurant</a>
		                  </li>
		                  <li class="nav-item dropdown">
		                      <a href="" class="nav-link">Users</a>
		                  </li>
		                  <li class="nav-item">
		                      <a href="" class="nav-link">Profile</a>
		                  </li>
		                  <li class="nav-item">
		                      <a href="#logout" class="nav-link">Log Out</a>
		                  </li>
		              </ul>
		          </div>
		      </div>
		  </nav>

		<!--Forma za kreiranje novog restorana-->
      <div class="modal fade" tabindex="-1" id="createRestaurantModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Creating New Restaurant</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="regForm" action="">
                    
                    <!-- One "tab" for each step in the form: -->
                    <div class="tab text-align-left">
                      <div class="container-fluid">
                        <div class="d-grid gap-4">
                          <div class="row mt-3">
                            <div class="col-3 mx-auto">
                              <label for="exampleFormControlInput1" class="form-label">Name:</label>
                            </div>
                            <div class="col-8  mx-auto">
                              <input type="text" class="form-control" id="exampleFormControlInput1">
                            </div>
                          </div>
    
                          <div class="row">
                            <div class="col-3 mx-auto">
                              <label for="exampleFormControlInput1" class="form-label">Type:</label>
                            </div>
                            <div class="col-8  mx-auto">
                              <select class="form-select">
                                <option selected>Select</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>                      
                            </div>
                          </div>
    
                          <div class="row">
                            <div class="col-3 mx-auto">
                              <label for="exampleFormControlInput1" class="form-label">Logo:</label>
                            </div>
                            <div class="col-8  mx-auto">
                              <input class="form-control" type="file" id="formFile">
                            </div>
                          </div>
    
                        </div>
                      </div>
                    </div>
                    
                    <div class="tab">Working hours:
                      <div class="container-fluid mt-3">
                        <div class="d-grid gap-3">
                          <div class="row">
                            <div class="card shadow-sm bg-light">
                              <div class="d-grid gap-2">
                                <div class="row mt-3">
                                  <div class="col-6 mx-auto">
                                    <div class="form-floating">
                                      <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option selected>12AM</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <label for="floatingSelect">Open at</label>
                                    </div>
                                  </div>
                                  <div class="col-6 mx-auto">
                                    <div class="form-floating">
                                      <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option selected>10PM</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <label for="floatingSelect">Close at</label>
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-11 mx-auto">
                                    <div class="d-flex gap-1">
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Mon
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Tue
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Wed
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Thur
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Fri
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Sat
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Sun
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
    
                          <div class="row">
                            <div class="card shadow-sm bg-light">
                              <div class="d-grid gap-2">
                                <div class="row mt-3">
                                  <div class="col-6 mx-auto">
                                    <div class="form-floating">
                                      <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option selected>12AM</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <label for="floatingSelect">Open at</label>
                                    </div>
                                  </div>
                                  <div class="col-6 mx-auto">
                                    <div class="form-floating">
                                      <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option selected>10PM</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <label for="floatingSelect">Close at</label>
                                    </div>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-11 mx-auto">
                                    <div class="d-flex gap-1">
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Mon
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Tue
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Wed
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Thur
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Fri
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Sat
                                        </label>
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Sun
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="tab">Choose Menager of the Restaurant
                      <div class="container-fluid">
                        <div class="row">
                          <div class="col-11 mx-auto">
                            <!--Izbor menadzera iz tabele-->
                            <div class="row mt-3">
                              <div class="col-12 mx-auto">
                                <div class="row">
                                    <div class="col-6 mx-auto">
                                      <div class="input-group mb-3">
                                          <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2">
                                          <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
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
                                </div>
    
                                <div class="row">
                                  <div class="col-12 mx-auto">
                                    <div style="height:200px;overflow:auto;">
                                        <table class="table table-sm caption-top table-hover">
                                          <thead>
                                            <tr>
                                              <th scope="col"></th>
                                              <th scope="col">First Name</th>
                                              <th scope="col">Last Name</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <th scope="row">1</th>
                                              <td>Mark</td>
                                              <td>Otto</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">2</th>
                                              <td>Jacob</td>
                                              <td>Thornton</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">3</th>
                                              <td>Larry</td>
                                              <td>the Bird</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                    </div>
                                    
                                    
                                  </div>
                                </div>
    
                              </div>
                            </div>
                            <!--Expandable(Creating new Menager)-->
                            <div class="row">
                              <div class="col-11 mx-auto">
                                <a  data-bs-toggle="collapse" href="#new_menager" id="scrollspy" aria-expanded="false" aria-controls="collapseExample">
                                  Create New Menager
                                </a>
                              <div class="collapse" id="new_menager" data-bs-spy="scroll" data-bs-target="#scrollspy">
                                <div class="card card-body" >
                                  <form>
                                    <div class="d-grid gap-1">
                                      <div class="form-floating">
                                        <input type="text" class="form-control" id="floatingInputValue" value="test@example.com">
                                        <label for="floatingInputValue">Full Name</label>
                                      </div>
                                      <div class="form-floating">
                                        <input type="text" class="form-control" id="floatingInputValue" value="test@example.com">
                                        <label for="floatingInputValue">Username</label>
                                      </div>
                                      <div class="form-floating">
                                        <input type="password" class="form-control" id="floatingInputValue" value="test@example.com">
                                        <label for="floatingInputValue">Password</label>
                                      </div>
                                      <div class="form-floating">
                                        <input type="date" class="form-control" id="floatingInputValue" value="test@example.com">
                                        <label for="floatingInputValue">Date Of Birth</label>
                                      </div>
                                      <div class="d-flex gap-2">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                          <label class="form-check-label" for="flexRadioDefault1">
                                            Male
                                          </label>
                                        </div>
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                          <label class="form-check-label" for="flexRadioDefault2">
                                            Female
                                          </label>
                                        </div>
                                      </div>
                                      <div class="d-flex justify-content-evenly">
                                          <button class="btn-circle" style="color: red;"><i class="fas fa-times"></i></button>
                                          <button class="btn-circle" style="color: green;"><i class="fas fa-check"></i></button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                                
                              </div>
                            </div>
                            <!--End-->
                          </div>
                        </div>
                      </div>
                     
                    </div>
                    <div style="overflow:auto;">
                      <div class="d-flex justify-content-evenly p-2">
                          <button class="btn buttonGroup active" type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
                          <button class="btn buttonGroup" type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
                      </div>
                    </div>
                    
                    <!-- Circles which indicates the steps of the form: -->
                    <div style="text-align:center;margin-top:40px; margin-bottom: 40px;">
                      <span class="step"></span>
                      <span class="step"></span>
                      <span class="step"></span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
	</div>
    
    `,
    methods: {
        logout: function(event){
            event.preventDefault
            axios
            .get('rest/logout/someone')
            .then(response => {
                location.href = "/Apartments/#/login";
            })
            .catch(err => {
                console.log(err);
                alert('Error during log out');
            })
        }
    },
});
Vue.component("home-page",{
	data(){
		return{
			user : {
				username : '',
				password: '',
				name: '',
				surname: ''
			},
			logged : {
				username : '',
				password: ''
			},
			errorMessage: '',
			gender : ''			
		}
	},
	template: `
	<div>
	 <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a href="#" class="navbar-brand h2 fs-2 m-0">PIXIE Delivery</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a href="" class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal">Log In</a>
                    </li>
                    <li class="nav-item">
                        <a href="" class="nav-link" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
	<div class="modal fade" id="loginModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form">
                    <div class="form-title text-center">
                        <h3>Welcome</h3>
                    </div>
                    <div class="d-flex flex-column text-center">
                        <form>
                          <div class="row mb-3 mt-3">
                              <div class="col-sm-8 mx-auto">
                                      <div class="form-group">
                                          <input type="text" class="form-control" placeholder="username" name = "username" v-on:change="signalChange" v-model="logged.username">
                                      </div>                          
                              </div>
                          </div>
      
                          <div class="row">
                              <div class="col-sm-8 mx-auto">
                                  <div class="form-group">
                                      <input type="password" class="form-control" placeholder="password" name = "password" v-on:change="signalChange" v-model="logged.password">
                                      <p class="mt-1" style="color: red; font-size : small">{{errorMessage}}</p>
                                  </div>                        
                              </div>
                          </div>
      
                          <div class="container">
                              <div class="row">
                                  <div class="col-sm-6 mx-auto">
                                      <div class="p-3">
                                          <button type="button" class="btn btn-info btn-block btn-round"  v-on:click="tryToLogin">Login</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div clas="signup-section">Not a member yet?
                  <a href="#a" class="text-info" data-bs-target="#signupModal" data-bs-toggle="modal" data-bs-dismiss="modal"> Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>

	<div class="modal fade" id="signupModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="form-title text-center">
                  <h4 class="mb-4">Registration</h4>
              </div>
              <div class="d-flex flex-column text-center">
                  <form class="d-grid gap-3">
                      <div class="form-group">
                        <div class="row">
                            <label class="col-sm-4 col-form-label" style="text-align: left;">First Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-on:change="signalChange" v-model="user.name">
                            </div>
                          </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-4 col-form-label" style="text-align: left;">Last Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-on:change="signalChange" v-model="user.surname">
                            </div>
                          </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-4 col-form-label" style="text-align: left;">Username</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" v-on:change="signalChange" v-model="user.username">
                            </div>
                          </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-4 col-form-label" style="text-align: left;">Password</label>
                            <div class="col-sm-8">
                                <input type="password" class="form-control" v-on:change="signalChange" v-model="user.password">
                            </div>
                          </div>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <label class="col-sm-4 col-form-label" style="text-align: left;">Date Of Birth</label>
                            <div class="col-sm-8">
                                <input type="date"  class="form-control" v-on:change="signalChange" v-model="user.dateOfBirth"></input>
                            </div>
                          </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check form-check-inline" style="margin-left: 5rem;">
                            <input class="form-check-input" type="radio" value="male" v-model="gender">
                            <label class="form-check-label" >Male</label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" value="female" v-model="gender">
                            <label class="form-check-label">Female</label>
                          </div>
                    </div>
                    <p style="color: red; font-size: small;">{{errorMessage}}</p>
                   
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6 mx-auto">
                                <div class="p-2">
                                    <button type="button" class="btn btn-info btn-block btn-round"  v-on:click="tryToSignup">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                  </form>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <div clas="signup-section">Already have an account?
                  <a href="#a" class="text-info" data-bs-target="#loginModal" data-bs-toggle="modal" data-bs-dismiss="modal"> Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
	`,
	methods:{
		tryToSignup : function() {

			if(this.user.username =='' || this.user.password=='' || this.user.name =='' || this.user.surname=='' || this.gender =='')
			{
				this.errorMessage="All fields are required!";
			}
			else
			{
				let selectedGender;
				if (this.gender == 'male') {
					selectedGender = 0;
				} else {
					selectedGender = 1;
				}
				
				this.user.gender = selectedGender;
    		
    		axios 
    			.post('rest/users/signup', JSON.stringify(this.user),
        	{ headers: {
        		'Content-type': 'application/json',
        		}
        	})
    			.then(response => {
    				if (response.data == "Username taken") {
						this.errorMessage="Username is already taken.";
					}
					else {
						location.href = response.data; 
    				}
				})
				.catch(err => { 
                    this.errorMessage="error";
                })
			}
    		
    	},tryToLogin : function() {

			if(this.logged.username =='' || this.logged.password=='')
			{
				this.errorMessage="All fields are required!";
			}
			else
			{
    		
    		axios 
    			.post('rest/users/login', JSON.stringify(this.logged),
        	{ headers: {
        		'Content-type': 'application/json',
        		}
        	})
    			.then(response => {
    				if (response.data == "User not found") {
						this.errorMessage="Username is incorrect";
					}
					else if (response.data == "bad password") {
						this.errorMessage="Password is incorrect";
					}  
					else if (response.data == "blocked") {
						this.errorMessage="This account is blocked or deleted.";
					} 
					
					else {
						location.href = response.data; 
    				}
				})
				.catch(err => { 
                    this.errorMessage="error";
                })
			}
    		
    	},
		signalChange : function()
		{
			this.errorMessage="";
		} 
	}
});

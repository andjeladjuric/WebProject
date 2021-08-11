Vue.component("app-signup",{
	data(){
		return{
			user : {
				username : '',
				password: '',
				name: '',
				surname: ''
			},
			errorMessage: '',
			gender : ''			
		}
	},
	template:`
	<div>
	<p>Hello from login</p>
	<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">
  Launch demo modal
	</button>
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
    		
    	},
		signalChange : function()
		{
			this.errorMessage="";
		} 
	}
});


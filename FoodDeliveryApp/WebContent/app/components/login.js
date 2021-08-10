
Vue.component("app-login",{
	data(){
		return{
			logged : {
				username : '',
				password: ''
			},
			errorMessage: ''
			
		}
	},
	template:`
	<div>
	<p>Hello from login</p>
	<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
  Launch demo modal
	</button>
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
      </div>
	`,
	methods:{
		tryToLogin : function() {

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


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
		                      <a href="#/newRestaurant" class="nav-link">New Restaurant</a>
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
	</div>
    
    `,
    methods: {
    },
});
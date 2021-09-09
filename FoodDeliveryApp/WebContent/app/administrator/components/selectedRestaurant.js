Vue.component("selected-restaurant", {
    data: function () {
        return {
            restaurant: {
                name: "",
                id: "",
                deleted: false,
                type: "",
                status: "",
                location: {
                    address: {
                        street: "",
                        number: "",
                        city: "",
                        postcode: "",
                    },
                    latitude: "",
                    longitude: "",
                },
            },
            showItems: true,
            showComments: false,
            items: [],
            allComments: [],
            deleteItem: {},
            deleteComment: {},
            images: [],
            count: 0,
        };
    },
    template: `
    	<div>
    		<div id="header" class="carousel">
			    <div class="carousel-inner">
			        <div class="carousel-item active">
			            <div v-if="restaurant.type === 'ITALIAN'" class="overlay-image" style="background-image: url(img/italian.jpg);"></div>
			            <div v-if="restaurant.type === 'CHINEESE'" class="overlay-image" style="background-image: url(img/asian.jpg);"></div>
			            <div v-if="restaurant.type === 'FASTFOOD'" class="overlay-image" style="background-image: url(img/fastfood1.jpg);"></div>
			            <div v-if="restaurant.type === 'BARBEQUE'" class="overlay-image" style="background-image: url(img/barbeque1.jpg);"></div>
			            <div v-if="restaurant.type === 'DESSERTS'" class="overlay-image" style="background-image: url(img/dessert2.jpg);"></div>
			            <div v-if="restaurant.type === 'MEXICAN'" class="overlay-image" style="background-image: url(img/mexican.jpg);"></div>
			            <div v-if="restaurant.type === 'VEGAN'" class="overlay-image" style="background-image: url(img/vegan.jpg);"></div>
			            <div class="container headline">
			               <div class="d-flex justify-content-start">
						   		<img class="image-logo me-3" v-bind:src="getLogo()" alt="RestaurantLogo">			               		
			                    <h1 style="font-weight: bold; font-size: 5vw; margin-top:60px;">{{restaurant.name}}</h1>
			                    
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
			
			<!-- Main Content -->
			<div class="container wrapper">
			    <!-- Buttons -->
			    <div class="row">
			        <div class="container buttons mt-5 mb-1">
			            <button type="button" class="btn d-sm-flex buttonGroup me-2" id="itemsButton"
			                @click="showComments = false;  showItems = true;"
			                v-bind:class="showItems ? 'active' : 'notActive'">
			                Items
			            </button>
			            <button type="button" class="btn d-sm-flex buttonGroup me-2" id="commentsButton"
			                @click="showComments = true; showItems = false;"
			                v-bind:class="showComments ? 'active' : 'notActive'">
			                Comments
			            </button>
			        </div>
			    </div>
			   
			
			    <!-- All Items -->
			    <div class="row g-2 allItems mt-5 justify-content-between" v-if="showItems">
			        <div class="col-md-2">
			            <div>
			                <nav id="myScrollspy">
			                    <h4 style="margin-left: 1rem;" class="mb-4">Categories</h4>
			                    <nav class="nav nav-pills flex-column">
			                        <a class="nav-link" href="#item-1" v-if="!isCategoryEmpty('BREAKFAST')">Breakfast</a>
			                        <a class="nav-link" href="#item-2" v-if="!isCategoryEmpty('SALADS')">Salads</a>
			                        <a class="nav-link" href="#item-3" v-if="!isCategoryEmpty('PIZZA')">Pizza</a>
			                        <a class="nav-link" href="#item-4" v-if="!isCategoryEmpty('PASTA')">Pasta</a>
			                        <a class="nav-link" href="#item-5" v-if="!isCategoryEmpty('MAINDISHES')">Main Dishes</a>
			                        <a class="nav-link" href="#item-6" v-if="!isCategoryEmpty('DRINKS')">Drinks</a>
			                        <a class="nav-link" href="#item-7" v-if="!isCategoryEmpty('DESSERT')">Desserts</a>
			                    </nav>
			                </nav>
			                
			                <br><br>
			                    <h4 style="margin-left: 1rem;" class="mb-2">Options</h4>
			                    <button type="button" class="btn buttonGroup addItem" data-bs-toggle="modal" data-bs-target="#deleteRestaurantModal">
			                            <i class="fas fa-trash me-2 p-1" style="color: #ecbeb1;"></i>Delete
			                    </button>
			
			            </div>
			        </div>
			
			        <!-- Items -->
			        <div class="col-md-7" style="padding-left: 4rem">
			            <!-- Breakfast -->
			            <h4 class="mb-3" id="item-1" v-if="!isCategoryEmpty('BREAKFAST')">Breakfast</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'BREAKFAST'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
									<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
								</div>
			                </div>
			            </div>
			            <!-- End of breakfast -->
			
			            <!-- Salads -->
			            <h4 class="mb-3 mt-5" id="item-2" v-if="!isCategoryEmpty('SALADS')">Salads</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'SALADS'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
									<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
								</div>
			                </div>
			            </div>
			            <!-- End of salads -->
			
			            <!-- Pizza -->
			            <h4 class="mb-3 mt-5" id="item-3" v-if="!isCategoryEmpty('PIZZA')">Pizza</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'PIZZA'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
									<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
								</div>
			                </div>
			            </div>
			            <!-- End of pizza -->
			
			            <!-- Pasta -->
			            <h4 class="mb-3 mt-5" id="item-4" v-if="!isCategoryEmpty('PASTA')">Pasta</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'PASTA'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
									<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
								</div>
			                </div>
			            </div>
			            <!-- End of pasta -->
			
			            <!-- Main dishes -->
			            <h4 class="mb-3 mt-5" id="item-5" v-if="!isCategoryEmpty('MAINDISHES')">Main Dishes</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'MAINDISHES'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
									<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
								</div>
			                </div>
			            </div>
			            <!-- End of main dishes -->
			
			            <!-- Drinks -->
			            <h4 class="mb-3 mt-5" id="item-6" v-if="!isCategoryEmpty('DRINKS')">Drinks</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'DRINKS'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
                            		<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        		</div>
			                </div>
			            </div>
			            <!-- End of drinks -->
			
			            <!-- Desserts -->
			            <h4 class="mb-3 mt-5" id="item-7" v-if="!isCategoryEmpty('DESSERT')">Desserts</h4>
			            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
			                v-if="item.category == 'DESSERT'">
			                <div class="card-body text-start itemBody">
			                    <div class="container cardContent text-start">
			                        <h1 class="mt-1 mb-3">{{item.name}}</h1>
			                        <p class="mb-1">{{item.description}}</p>
			                        <div class="more mb-2">
			                            <p class="me-2">{{item.type}}</p>
			                            <p>·</p>
			                            <p class="ms-2">{{item.amount}}</p>
			                        </div>
			                        <p id="price">RSD {{item.price}}</p>
			
			                        <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; " v-on:click="selectItem(item)" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
			                            <i class="fas fa-trash"></i> Remove
			                        </button>
			
			                    </div>
			
			                    <div class="image-wrapper mt-2">
                            		<img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        		</div>
			                </div>
			            </div>
			            <!-- End of desserts -->
			        </div>
			
			        <div class="col-md-3">
			            <div class="information" style="margin-left: 6rem">
			                <div class="container d-block">
			                    <h4 class="card-title mb-4">About</h4>
			                    <h5><b>Rating</b></h5>
			                    <div class="container d-inline-flex p-0">
			                        <i class="fa fa-star checked me-2" style="color: gold;"></i>
			                        <p>·</p>
			                        <p class="ms-2">{{restaurant.rating}}</p>
			                    </div>
			                </div>
			
			                <div class="container d-block mb-3">
                        		<h5><b>Address</b></h5>
								<a href="#myRestaurant" @click="openMap()" id="locationLink" style="color: #7fd2c0;" data-bs-toggle="modal" data-bs-target="#mapModal">
									{{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
									{{restaurant.location.address.city}}, {{restaurant.location.address.postcode}}<br>
                        			{{restaurant.location.latitude}}, {{restaurant.location.longitude}}
								</a>
							</div>
			
			                <div class="container d-block">
			                    <h5><b>Type</b></h5>
			                    <p>{{restaurant.type}}</p>
			                </div>
			
			                <div class="container d-block">
			                    <h5><b>Currently:</b></h5>
			                    <p style="color: red; text-transform: uppercase">{{restaurant.status}}</p>
			                </div>
			            </div>
			        </div>
			    </div>
			    <!-- End of items -->
			    
				<div class="row g-4 mb-4 cards align-contet-center justify-content-center" 
					style="padding-left: 5%; padding-right: 7%; padding-bottom: 7%"
					v-if="allComments.length === 0 && showComments">
					<p style="font-size: 2rem; font-style: italic">There are currently no comments available!</p>
				</div>

			    <div class="row g-2 comments mt-5 justify-content-center" v-if="showComments && allComments.length !== 0">
				    <!-- Comments -->
				    <div class="col-lg-7 mx-auto">
				        <h4 class="mb-3" id="item-1">All comments</h4>
				        <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="comment in allComments"
				            style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
				            <div class="card-body text-start">
				                <div class="container cardContent text-start">
				                    <div class="container mb-2 d-inline-flex userNameAndType">
				                        <h1 class="me-2">{{comment.customer}}</h1>
				                        <p class="me-2">·</p>
				                        <p>golden</p>
				                    </div>
				                    <p class="mb-2">{{comment.text}}</p>
				                    <div class="more mb-2">
				                        <i class="fas fa-star me-2" style="color: gold;"></i>
				                        <p>·</p>
				                        <p class="ms-2">{{comment.stars}}</p>
				                    </div>
				                    <div class="d-flex justify-content-between">
				                        <p>Status: {{comment.status}}</p>
  										<button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip"
			                            data-placement="bottom" style="background: none; "  v-on:click="selectComment(comment)" data-bs-toggle="modal" data-bs-target="#deleteCommentModal">
			                            <i class="fas fa-trash"></i> Remove
			                        	</button>
				                    </div>
				                </div>
				            </div>
				        </div>
				    </div>
				    <!-- End of comments -->
				</div>
			</div>
			
			 <!-- Delete item modal -->
        <div id="deleteRestaurantModal" class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="icon-box">
                        <i class="fas fa-trash mt-3 mb-3"></i>
                        </div>						
                        <h4 class="modal-title w-100 mt-5">Are you sure?</h4>	
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete this restaurant? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="deleteRestaurant; showToast">Confirm</button>
                        <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="deleteItemModal" class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="icon-box">
                        <i class="fas fa-trash mt-3 mb-3"></i>
                        </div>						
                        <h4 class="modal-title w-100 mt-5">Are you sure?</h4>	
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete this item? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="removeItem">Confirm</button>
                        <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="deleteCommentModal" class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="icon-box">
                        <i class="fas fa-trash mt-3 mb-3"></i>
                        </div>						
                        <h4 class="modal-title w-100 mt-5">Are you sure?</h4>	
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete this comment? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="removeComment">Confirm</button>
                        <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

		<!-- Map modal -->
        <div id="mapModal" class="modal fade responsive">
            <div class="modal-dialog modal-dialog-centered modal-map">
                <div class="modal-content">
                    <div class="modal-header flex-column">		
                        <h4 class="modal-title w-100">
                            {{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
                            {{restaurant.location.address.city}} {{restaurant.location.address.postcode}}, {{restaurant.location.address.country}}
                        </h4>	
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true" 
                            style="position: absolute; top: -5px; right: -2px;"></button>
                    </div>
                    <div class="modal-body">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of map modal -->
        
    </div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurant", {
                params: { id: this.$route.query.id },
            })
            .then((response) => {
                this.restaurant = response.data;

                axios
                    .get("rest/items/getItemsForRestaurant", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.items = response.data));

                axios
                    .get("rest/comments/getCommentsForAdmin", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.allComments = response.data));
            });

        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));
    },
    methods: {
        isCategoryEmpty: function (category) {
            let itemsInCategory = new Array();
            for (let i of this.items) {
                if (i.category === category) itemsInCategory.push(i);
            }

            if (itemsInCategory.length === 0) return true;

            return false;
        },
        deleteRestaurant: function () {
            axios
                .get("rest/restaurants/deleteRestaurant", {
                    params: { id: this.restaurant.id },
                })
                .then((response) => {
                    axios.post(
                        "rest/carts/restaurantDeleted",
                        this.restaurant.id,
                        {
                            headers: {
                                "Content-type": "text/plain",
                            },
                        }
                    );

                    axios.post(
                        "rest/orders/restaurantDeleted",
                        this.restaurant.id,
                        {
                            headers: {
                                "Content-type": "text/plain",
                            },
                        }
                    );

                    location.href = response.data;
                });
        },
        removeComment: function () {
            axios
                .post("rest/comments/removeComment", this.deleteComment.id, {
                    headers: {
                        "Content-type": "text/plain",
                    },
                })
                .then((response) => {
                    axios
                        .get("rest/comments/getCommentsForAdmin", {
                            params: { id: this.restaurant.id },
                        })
                        .then((response) => (this.allComments = response.data));
                    this.showToast();
                });
        },
        removeItem: function () {
            axios
                .post(
                    "rest/items/deleteItem",
                    JSON.stringify(this.deleteItem),
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    axios
                        .get("rest/items/getItemsForRestaurant", {
                            params: { id: this.restaurant.id },
                        })
                        .then((response) => {
                            this.items = response.data;
                            this.showToast();
                        });
                });
        },
        selectItem: function (item) {
            this.deleteItem = item;
        },
        selectComment: function (comment) {
            this.deleteComment = comment;
        },
        showToast: function () {
            const Toast = Swal.mixin({
                toast: true,
                text: "Succesfully deleted!",
                position: "bottom-end",
                timer: 2000,
                showConfirmButton: false,
            });
            Toast.fire({ icon: "success" });
        },
        getImage: function (item) {
            for (let i of this.images) {
                if (i.imageId === item.imagePath) return i.imageCode;
            }

            return "";
        },
        getLogo: function () {
            for (let i of this.images) {
                if (i.imageId === this.restaurant.logo) return i.imageCode;
            }

            return "";
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
                        center: ol.proj.fromLonLat([
                            this.restaurant.location.longitude,
                            this.restaurant.location.latitude,
                        ]),
                        zoom: 14,
                    }),
                });

                var markers = new ol.layer.Vector({
                    source: new ol.source.Vector(),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: "img/marker.png",
                        }),
                    }),
                });
                map.addLayer(markers);

                var marker = new ol.Feature(
                    new ol.geom.Point(
                        ol.proj.fromLonLat([
                            this.restaurant.location.longitude,
                            this.restaurant.location.latitude,
                        ])
                    )
                );
                markers.getSource().addFeature(marker);

                window.setTimeout(function () {
                    map.updateSize();
                }, 200);
            }
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
    components: {
        swal,
    },
});

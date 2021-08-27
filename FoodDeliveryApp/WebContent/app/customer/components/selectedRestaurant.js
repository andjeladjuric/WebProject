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
                }
			},
            showItems: true,
            showComments: false,
			items: [],
			allComments: [],
            comment: {
                text: "",
                rating: 0,
                restaurant: "",
            },
			canComment : false,
			canOrder : false,
			user : {}
        };
    },
    template: `
   <div>
		<div id="header" class="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <div class="overlay-image" style="background-image: url(img/la-forza.jpg);">
            </div>
            <div class="container headline">
                <h1 style="font-weight: bold; font-size: 5vw;">{{restaurant.name}}</h1>
                <p>
                    Pizzeria with a long history, in the heart of Novi Sad
                </p>
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
                @click="showComments = false;  showItems = true" v-bind:class="showItems ? 'active' : 'notActive'">
                Items
            </button>
            <button type="button" class="btn d-sm-flex buttonGroup me-2" id="commentsButton"
                @click="showComments = true; showItems = false" v-bind:class="showComments ? 'active' : 'notActive'">
                Comments
            </button>
        </div>
    </div>
    <div class="row g-2 comments mt-5" v-if="showComments">
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
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4 col-sm-11 mx-auto">
            <div card>
                <div class="d-flex gap-3">
                    <p>Rate us: </p>
                    <star-rating v-model="comment.rating" v-bind:star-size="30" style="margin-bottom : 20px;">
                    </star-rating>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control" v-model="comment.text" style="height: 150px"></textarea>
                    <label>Leave a comment here</label>
                </div>
                <div class="d-flex justify-content-end gap-1">
                    <button type="button" class="btn btn-sm buttonGroup" v-on:click="cancel()">cancel</button>
                    <button type="button" class="btn btn-sm buttonGroup active"
                        v-on:click="addComment()" v-bind:disabled="!canComment">comment</button>
                </div>
            </div>

        </div>
        <!-- End of comments -->
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
                        <a class="nav-link" href="#item-7" v-if="!isCategoryEmpty('DESSERTS')">Desserts</a>
                    </nav>
                </nav>

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
                            data-placement="bottom" style="background: none; " v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                </div>
            </div>
            <!-- End of drinks -->

            <!-- Desserts -->
            <h4 class="mb-3 mt-5" id="item-7" v-if="!isCategoryEmpty('DESSERTS')">Desserts</h4>
            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items"
                v-if="item.category == 'DESSERTS'">
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
                            data-placement="bottom" title="Add to cart" style="background: none; "
                            v-on:click="addToCart(item)" v-bind:disabled="!canOrder">
                            <i class="fas fa-shopping-cart"></i> Add to cart
                        </button>

                    </div>

                    <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
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
                        <p class="ms-2">5.0</p>
                    </div>
                </div>

                <div class="container d-block">
                    <h5><b>Address</b></h5>
                    <p>{{restaurant.location.address.street}} {{restaurant.location.address.number}} <br>
                        {{restaurant.location.address.city}}, {{restaurant.location.address.postcode}}</p>
                </div>

                <div class="container d-block">
                    <h5><b>Type</b></h5>
                    <p>{{restaurant.type}}</p>
                </div>

                <div class="container d-block">
                    <h5><b>Working hours:</b></h5>
                    <p>7am - 9pm</p>
                    <h5><b>Currently:</b></h5>
                    <p style="color: red; text-transform: uppercase">{{restaurant.status}}</p>
                </div>

            </div>
        </div>
    </div>
    <!-- End of items -->
</div>
      
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
	             .get("rest/comments/getCommentsForUser", {
	                        params: { id: this.restaurant.id },
	                    })
	             .then((response) => (this.allComments = response.data));

				axios
		             .get("rest/users/getCurrentUser")
		             .then((response) => {
						this.user = response.data;
						if(this.user.role === 'CUSTOMER'){
							this.canOrder = true;
							axios
					             .get("rest/orders/canComment", {
					                    params: { id: this.restaurant.id },
					                  })
					             .then((response) => (this.canComment = response.data));
							
						}else{
							this.canOrder = false;
							this.canComment = false;
						}
					});
	
});


    },methods: {
        isCategoryEmpty: function (category) {
            let itemsInCategory = new Array();
            for (let i of this.items) {
                if (i.category === category) itemsInCategory.push(i);
            }

            if (itemsInCategory.length === 0) return true;

            return false;
        },
        addToCart: function (item) {
            axios.post("rest/carts/addToCart", JSON.stringify(item), {
                headers: {
                    "Content-type": "application/json",
                },
            });
        },
		cancel: function () {
            this.comment.text = "";
            this.comment.rating = 0;
        },
        addComment: function () {
            this.comment.restaurant = this.restaurant.id;
            axios.post(
                "rest/comments/addComment",
                JSON.stringify(this.comment),
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );

            this.comment.text = "";
            this.comment.rating = 0;
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

Vue.component("star-rating", VueStarRating.default);

/**
 * 
 */
Vue.component("restaurant-items", {
    data: function () {
        return {
            restaurant: {},
            items : []
        };
    },
    template: `
    <div>
         <!-- All Items -->
        <div class="row g-2 allItems mt-5 justify-content-between"> 
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
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'BREAKFAST'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom"
                                    style="background: none; " v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                            
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of breakfast -->

                <!-- Salads -->
                <h4 class="mb-3 mt-5" id="item-2" v-if="!isCategoryEmpty('SALADS')">Salads</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'SALADS'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                           
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of salads -->

                <!-- Pizza -->
                <h4 class="mb-3 mt-5" id="item-3" v-if="!isCategoryEmpty('PIZZA')">Pizza</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PIZZA'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                           
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of pizza -->

                <!-- Pasta -->
                <h4 class="mb-3 mt-5" id="item-4" v-if="!isCategoryEmpty('PASTA')">Pasta</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PASTA'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                            
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of pasta -->
                
                <!-- Main dishes -->
                <h4 class="mb-3 mt-5" id="item-5" v-if="!isCategoryEmpty('MAINDISHES')">Main Dishes</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'MAINDISHES'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                            
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of main dishes -->

                <!-- Drinks -->    
                <h4 class="mb-3 mt-5" id="item-6" v-if="!isCategoryEmpty('DRINKS')">Drinks</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DRINKS'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
                                    <i class="fas fa-shopping-cart"></i> Add to cart
                                </button>
                           
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of drinks -->

                <!-- Desserts -->
                <h4 class="mb-3 mt-5" id="item-7" v-if="!isCategoryEmpty('DESSERTS')">Desserts</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DESSERTS'">
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

                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Add to cart"
                                    style="background: none; "  v-on:click="addToCart(item)">
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
                        <p>{{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
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
    `,
    mounted() {
       axios
            .get("rest/restaurants/getRestaurant")
            .then((response) => {
                this.restaurant = response.data;
                return axios
                    .get("rest/items/getItemsForRestaurant", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.items = response.data));
            });
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
        addToCart : function(item) {
        	axios 
    			.post('rest/carts/addToCart', JSON.stringify(item),
        	{ headers: {
        		'Content-type': 'application/json',
        		}
        	})
        }
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        }
    }
});

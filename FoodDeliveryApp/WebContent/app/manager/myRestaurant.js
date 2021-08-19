Vue.component("myrestaurant", {
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
                items: [],
                logo: "",
                menagerId: "",
            },
            currentUser: {},
            showItems: true,
            showComments: false,
            showOrders: false,
            showSearch: false,
            showFilter: false,
            showSort: false,
            searchInput: {
                restaurant: "",
                minPrice: "",
                maxPrice: "",
                minDate: "",
                maxDate: "",
            },
            selected: "",
            sort: "",
            filterInput: {
                restaurantType: "",
                status: "",
            },
        };
    },
    template: `
    <div>
        <!-- Header photo -->
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
                        @click="showComments = false; showOrders = false; showItems = true" v-bind:class="showItems ? 'active' : 'notActive'">
                        Items
                    </button>
                    <button type="button" class="btn d-sm-flex buttonGroup me-2" id="commentsButton"
                        @click="showComments = !showComments; showOrders = false; showItems = false" v-bind:class="showComments ? 'active' : 'notActive'">
                        Comments
                    </button>
                    <button type="button" class="btn d-sm-flex buttonGroup" id="ordersButton"
                        @click="showComments = false; showOrders = !showOrders; showItems = false" v-bind:class="showOrders ? 'active' : 'notActive'">
                        Orders
                    </button>
                </div>
            </div>
            <div class="row mb-4">
                <div class="container buttons searchButtons" v-if="showOrders">
                    <button type="button" class="btn d-sm-flex filters" id="searchButton" @click="showSearch = !showSearch">search<i
                            class="fas fa-caret-down p-1"></i></button>

                    <button type="button" class="btn d-sm-flex filters" id="filterButton" @click="showFilter = !showFilter">filter<i
                            class="fas fa-caret-down p-1"></i></i></button>
                    
                <button type="button" class="btn d-sm-flex filters" id="sortButton" @click="showSort = !showSort">sort<i
                            class="fas fa-caret-down p-1"></i></i></button>
                </div>
            </div>
            <!-- End of buttons -->

            <!-- Search -->
            <transition name="fade" appear>
                <div class="row g-4 mb-3 searchInput" v-if="showSearch">
                    <div class="container align-items-center">
                        <div class="row g-2 align-items-center justify-content-center d-md-flex search-input">
                            <div class="col-md-4">
                                <div class="input-group prices">
                                    <input type="text" class="form-control" placeholder="Min price" v-model="searchInput.minPrice">
                                    <div class="input-group-addon"><i class="fas fa-minus p-2"></i></div>
                                    <input type="text" class="form-control" placeholder="Max price" v-model="searchInput.maxPrice">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="col-md">
                                    <div class="input-group input-daterange">
                                        <input type="date" class="form-control" v-model="searchInput.minDate">
                                        <div class="input-group-addon"><i class="fas fa-minus p-2"></i></div>
                                        <input type="date" class="form-control" v-model="searchInput.maxDate">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md"></div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- End of search -->

            <!-- Filter -->
            <transition name="fade" appear>
                <div class="row mb-3 g-4 filterInput" v-if="showFilter">
                    <div class="container">
                        <div class="row justify-content-between align-items-center d-md-flex search-input">
                            <div class="row">
                                <div class="col-md-3">
                                    <select class="form-select" placeholder="Order status" aria-label="Order status" v-model="filterInput.status">
                                        <option value="" disabled selected hidden>Status</option>
                                        <option value="PROCESSING">Processing</option>
                                        <option value="PREPARATION">Preparation</option>
                                        <option value="WAITING">Waiting for courier</option>
                                        <option value="TRANSPORTING">In transport</option>
                                        <option value="DELIVERED">Delivered</option>
                                    </select>
                                </div>
                    
                                <div class="col-md mt-1">
                                    <button type="button" class="btn btn-sm filter-button" @click="noFilters()"><i
                                    class="fas fa-trash me-2"></i>Clear Filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- End of filter -->

            <!-- Sort for orders -->
            <transition name="fade" appear>
                <div class="row g-4 sortInput" id="sortOrders" v-if="showSort">
                    <div class="col-md-3 me-5 select">
                        <select class="form-select" aria-label="Sort by" placeholder="Sort by" v-model="selected">
                            <option value="" disabled selected hidden>Sort by</option>
                            <option value="1">Price</option>
                            <option value="2">Date</option>
                        </select>
                    </div>

                    <div class="col-md-3 p-2 d-inline-flex">
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="ascOrDsc" id="flexCheck" v-model="sort" v-bind:value="'asc'">
                            <label class="form-check-label" for="flexCheckDefault">Ascending</label>
                        </div>

                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="ascOrDsc" id="flexCheck" v-model="sort" v-bind:value="'desc'">
                            <label class="form-check-label" for="flexCheckDefault">Descending</label>
                        </div>
                    </div>

                    <div class="col-md p-2">
                        <button type="button" class="btn btn-sm filter-button" @click="sortOrders()"><i
                        class="fa fa-sort me-2"></i>Sort</button>
                    </div>
                </div>
            </transition>
            <!-- End of sort for orders -->

            <!-- All Items -->
            <div class="row g-2 allItems mt-5" v-if="showItems"> 
                <div class="col-md-2 d-flex">
                    <nav id="myScrollspy">
                        <h4 style="margin-left: 1rem;" class="mb-4">Categories</h4>
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="#item-1">Breakfast</a>
                            <a class="nav-link" href="#item-2">Salads</a>
                            <a class="nav-link" href="#item-3">Pizza</a>
                            <a class="nav-link" href="#item-4">Pasta</a>
                            <a class="nav-link" href="#item-5">Main Dishes</a>
                            <a class="nav-link" href="#item-6">Drinks</a>
                            <a class="nav-link" href="#item-7">Desserts</a>
                        </nav>
                    </nav>
                </div>

                <!-- Items -->
                <div class="col-md-7 ms-2">
                    <h4 class="mb-3" id="item-1" style="border-bottom: 1px solid rgba(124, 124, 124, 0.404);">Breakfast</h4>
                    <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in restaurant.items">
                        <div class="card-body text-start itemBody">
                            <div class="container cardContent text-start">
                                <h1 class="mb-4">{{item.name}}</h1>
                                <p class="mb-1">{{item.description}}</p>
                                <div class="more mb-2">
                                    <p class="me-2">{{item.type}}</p>
                                    <p>·</p>
                                    <p class="ms-2">{{item.amount}}</p>
                                </div>
                                <p id="price">{{item.price}}</p>
                            </div>

                            <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                        </div>
                    </div>
                </div>

                <div class="col-md">
                    <div class="information ms-5">
                        <h4 class="card-title mb-4">About</h4>
                        <div class="container d-block">
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

            <!-- Orders -->
            <div class="row g-2 allOrders" v-if="showOrders">
                <div class="row g-4 mb-4 cards">
                    <a href="order.html">
                        <div class="card shadow bg-light text-dark p-2">
                            <div class="card-body text-center orderCards">
                                <div class="row g-2">
                                    <h1 class="mb-4 orderID">Order #1asb3n5l6l7</h1>
                                </div>
                                <div class="row">
                                    <table class="table-responsive singleOrderView">
                                        <thead>
                                            <td>Ordered from:</td>
                                            <td>Total sum:</td>
                                            <td>Date and time</td>
                                            <td>Delivery Address</td>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>
                                                    <ol type="1">
                                                        <li>La forza</li>
                                                        <li>Dva stapica</li>
                                                    </ol>
                                                </td>
                                                <td>RSD 500.00</td>
                                                <td>05/08/2021 13:00</td>
                                                <td>Sutjeska 5, Novi Sad 21000</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <!-- End of orders -->

            <!-- Comments -->
            <div class="row g-2 comments mt-5" v-if="showComments">
                <div class="col-md-2 d-flex"></div>

                <div class="col-md-8 ms-2">
                    <h4 class="mb-3" id="item-1">All comments</h4>
                    <div class="card bg-light text-dark mb-2" id="itemAndCommentCards"
                        style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
                        <div class="card-body text-start">
                            <div class="container cardContent text-start">
                                <div class="container mb-2 d-inline-flex userNameAndType">
                                    <h1 class="me-2">Petra Jovic</h1>
                                    <p class="me-2">·</p>
                                    <p>golden user</p>
                                </div>
                                <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure quidem omnis, quae possimus minus. 
                                    Autem, sequi! Nobis mollitia nostrum quibusdam voluptates, facilis cupiditate fuga reprehenderit voluptatem! 
                                    Amet, id eveniet!</p>
                                <div class="more mb-2">
                                    <i class="fas fa-star me-2" style="color: gold;"></i>
                                    <p>·</p>
                                    <p class="ms-2">5.0</p>
                                </div>

                                <div class="container d-inline-flex buttons p-0">
                                    <button type="button" class="btn d-sm-flex me-2" id="allowButton">Allow</button>
                                    <button type="button" class="btn d-sm-flex" id="rejectButton">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card bg-light text-dark mb-4" id="itemAndCommentCards">
                        <div class="card-body text-start">
                            <div class="container cardContent text-start">
                                <div class="container mb-2 d-inline-flex userNameAndType">
                                    <h1 class="me-2">Petra Jovic</h1>
                                    <p class="me-2">·</p>
                                    <p>golden user</p>
                                </div>
                                <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure quidem omnis, quae possimus minus. 
                                    Autem, sequi! Nobis mollitia nostrum quibusdam voluptates, facilis cupiditate fuga reprehenderit voluptatem! 
                                    Amet, id eveniet!</p>
                                <div class="more mb-2">
                                    <i class="fas fa-star me-2" style="color: gold;"></i>
                                    <p>·</p>
                                    <p class="ms-2">5.0</p>
                                </div>

                                <div class="container d-inline-flex buttons p-0">
                                    <button type="button" class="btn d-sm-flex me-2" id="allowButton">Allow</button>
                                    <button type="button" class="btn d-sm-flex" id="rejectButton">Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md"></div>
            </div>
            <!-- End of comments -->
        </div>
    </div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurantForManager")
            .then((response) => (this.restaurant = response.data));
    },
});

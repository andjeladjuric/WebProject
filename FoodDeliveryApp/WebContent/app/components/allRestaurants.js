Vue.component("all-restaurants", {
    data: function () {
        return {
            restaurants: [],
            showSearch: false,
            showFilter: false,
            showSort: false,
            searchInput: {
                restaurant: "",
                type: "",
                location: "",
                rating: "",
            },
            selected: "",
            sort: "",
            filterInput: {
                restaurantType: "",
                opened: "",
            },
            count: 0,
            images: [],
        };
    },
    template: `
        <div>
            <!-- Carousel -->
            <div id="carouselHome" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="overlay-image" style="background-image: url(img/product-1.jpg);">
                        </div>
                        <div class="container headline">
                            <h1>Order food from any restaurant!</h1>
                            <p>
                                We're a food delivery company of your dreams! Order delicious food to your doorstep from
                                anywhere!
                            </p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="overlay-image" style="background-image: url(img/product-2.jpg);">
                        </div>
                        <div class="container headline">
                            <h1>Order food from any restaurant!</h1>
                            <p>
                                We're a food delivery company of your dreams! Order delicious food to your doorstep from
                                anywhere!
                            </p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="overlay-image" style="background-image: url(img/product-4.jpg);">
                        </div>
                        <div class="container headline">
                            <h1>Order food from any restaurant!</h1>
                            <p>
                                We're a food delivery company of your dreams! Order delicious food to your doorstep from
                                anywhere!
                            </p>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselHome"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselHome"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <!-- End of carousel -->

            <!-- Restaurants -->
            <section class="bg-light text-dark text-center p-5">
                <div class="container">
                    <div class="row d-md-flex justify-content-center align-items-center">
                        <h2 class="mb-3">Restaurants</h2>        
                    </div>

                    <!-- Buttons -->
                    <div class="container mb-4 buttons d-inline-flex justify-content-center align-items-center">
                        <button type="button" class="btn d-sm-flex filters" id="searchButton" @click="showSearch = !showSearch">search
                            <i class="fas fa-caret-down p-1"></i></button>

                        <button type="button" class="btn d-sm-flex filters" id="filterButton" @click="showFilter = !showFilter">filter
                            <i class="fas fa-caret-down p-1"></i></button>
                        
                        <button type="button" class="btn d-sm-flex filters" id="sortButton" @click="showSort = !showSort">sort
                            <i class="fas fa-caret-down p-1"></i></button>
                    </div>
                    <!-- End of buttons -->

                    <!-- Search -->
                    <transition name="show">
                        <div class="container mb-3 searchInput" style="width: 85%;" v-if="showSearch">
                            <div class="row g-4 justify-content-center align-items-center d-md-flex">
                                <div class="col-md">
                                    <input type="text" class="form-control" placeholder="Name" aria-label="Name" v-model="searchInput.restaurant">
                                </div>
                                <div class="col-md">
                                    <select class="form-select" placeholder="Restaurant type" aria-label="Restaurant type"
                                        v-model="searchInput.type">
                                        <option value="" disabled selected hidden>Restaurant type</option>
                                        <option value="">All</option>
                                        <option value="ITALIAN">Italian</option>
                                        <option value="FASTFOOD">Fast food</option>
                                        <option value="CHINEESE">Chinese</option>
                                        <option value="BARBEQUE">Barbeque</option>
                                        <option value="MEXICAN">Mexican</option>
                                        <option value="DESSERTS">Desserts</option>
                                        <option value="VEGAN">Vegan</option>
                                    </select>
                                </div>
                                <div class="col-md">
                                    <select class="form-select" placeholder="Rating" aria-label="Rating" v-model="searchInput.rating">
                                        <option value="" disabled selected hidden>Rating</option>
                                        <option value="">All</option>
                                        <option value="1.0">1</option>
                                        <option value="2.0">2</option>
                                        <option value="3.0">3</option>
                                        <option value="4.0">4</option>
                                        <option value="5.0">5</option>
                                    </select>
                                </div>
                                <div class="col-md">
                                    <input type="text" class="form-control" placeholder="Location" aria-label="Location" id="locationInput"
                                    v-model="searchInput.location">
                                </div>
                                <div class="col-md mt-4">
                                    <button type="button" class="btn btn-sm filter-button" data-bs-toggle="modal" data-bs-target="#mapModal">
                                        <i class="fas fa-map me-2"></i>Open map
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of search -->

                    <!-- Filter -->
                    <transition name="show">
                        <div style="width: 85%;" class="container mb-3 filterInput" v-if="showFilter">
                            <div class="row justify-content-center align-items-center d-md-flex search-input">
                                <div class="col-md">
                                    <select class="form-select" placeholder="Restaurant type" aria-label="Restaurant type"
                                        v-model="filterInput.restaurantType">
                                        <option value="" disabled selected hidden>Restaurant type</option>
                                        <option value="">All</option>
                                        <option value="ITALIAN">Italian</option>
                                        <option value="FASTFOOD">Fast food</option>
                                        <option value="CHINEESE">Chinese</option>
                                        <option value="BARBEQUE">Barbeque</option>
                                        <option value="MEXICAN">Mexican</option>
                                        <option value="DESSERTS">Desserts</option>
                                        <option value="VEGAN">Vegan</option>
                                    </select>
                                </div>

                                <div class="col-md mt-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="opened" value="" id="flexCheck"
                                            v-model="filterInput.opened" v-bind:value="'OPENED'">
                                        <label class="form-check-label" for="flexCheckDefault">Show only opened restaurants</label>
                                    </div>
                                </div>
                    
                                <div class="col-md mt-1">
                                    <button type="button" class="btn btn-sm filter-button"@click="noFilters()">
                                        <i class="fas fa-trash me-2"></i>Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of filter -->

                    <!-- Sort -->
                    <transition name="show">
                        <div class="container mb-3 sortInput" style="width: 85%;" v-if="showSort">
                            <div class="row g-4 justify-content-between align-items-center d-md-flex">
                                <div class="col-md me-5 select">
                                    <select class="form-select" aria-label="Sort by" placeholder="Sort by" v-model="selected">
                                        <option value="" disabled selected hidden>Sort by</option>
                                        <option value="1">Restaurant name</option>
                                        <option value="2">Location</option>
                                        <option value="3">Rating</option>
                                    </select>
                                </div>
                
                                <div class="col-md p-2 d-inline-flex">
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
                                    <button type="button" class="btn btn-sm filter-button" @click="sortRestaurants()"><i
                                    class="fa fa-sort me-2"></i>Sort</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of sort -->

                </div>
            </section>

            <!-- Boxes -->
            <section class="p-5 bg-light">
                <div class="container container-custom" id="vue-restaurants">
                    <div class="row text-center g-4">

                        <div class="col-md-4" v-for="r in filteredRestaurants">
                            <div class="card bg-light restaurantCards" style="border: 2px solid #7fd2c0">
                                <div class="cover">
                                    <img v-bind:src="getImage(r)" alt="RestaurantLogo" class="img-responsive cover">
                                </div>
                                <div class="card-body text-center">
                                    <h3 class="card-title mb-2">{{r.name}}</h3>

                                    <p class="card-text mb-3">
                                        {{r.type}} · 
                                        <span v-bind:class="r.status === 'OPENED' ? 'green' : 'red'">{{r.status}}</span>
                                    </p>

                                    <p class="card-text mb-2" style="font-size: 0.9rem; 
                                    color: rgba(0, 0, 0, 0.363); text-transform: uppercase;">
                                        {{r.location.address.street}} {{r.location.address.number}}
                                        <br>
                                        {{r.location.address.city}} {{r.location.address.postcode}} 
                                        <br>
                                        {{r.location.address.country}}
                                        <br>
                                        {{r.location.longitude}},  {{r.location.latitude}}
                                        <br>
                                    </p>

                                    <div class="star mb-2 align-items-center">
                                        <i class="fa fa-star" v-if="r.rating >= 1"></i>
                                        <i class="fa fa-star" v-if="r.rating >= 2"></i>
                                        <i class="fa fa-star" v-if="r.rating >= 3"></i>
                                        <i class="fa fa-star" v-if="r.rating >= 4"></i>
                                        <i class="fa fa-star" v-if="r.rating == 5"></i>
                                    </div>
                                </div>
                                <a :href="'#/selectedRestaurant?id=' + r.id" class="stretched-link"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Map modal -->
            <div id="mapModal" class="modal fade responsive" ref="vuemodal" @show="openMap()">
                <div class="modal-dialog modal-dialog-centered modal-map">
                    <div class="modal-content">
                        <div class="modal-header flex-column">		
                            <h4 class="modal-title w-100">
                                Select location
                            </h4>	
                            <button class="btn-close" data-bs-dismiss="modal" aria-hidden="true" 
                                style="position: absolute; top: -5px; right: -2px;"></button>
                        </div>
                        <div class="modal-body">
                            <div id="map"></div>
                            <div id="marker">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of map modal -->
        </div>
        `,
    mounted() {
        axios
            .get("rest/restaurants/getAll")
            .then((response) => (this.restaurants = response.data));

        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));

        $("#mapModal").on("shown.bs.modal", (response) => {
            this.count = this.count + 1;
            console.log(this.count);

            if (this.count === 1) {
                var map = new ol.Map({
                    target: "map",
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM(),
                        }),
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([20.9224158, 44.2107675]),
                        zoom: 5,
                    }),
                });

                this.clickOnMap(map);
            }
        });
    },
    methods: {
        searchRest: function (restaurant) {
            if (
                !restaurant.name
                    .toLowerCase()
                    .match(this.searchInput.restaurant.toLowerCase())
            )
                return false;

            if (!restaurant.type.match(this.searchInput.type)) return false;

            if (
                !restaurant.location.address.city
                    .toLowerCase()
                    .match(this.searchInput.location.toLowerCase())
            ) {
                if (
                    !restaurant.location.address.country
                        .toLowerCase()
                        .match(this.searchInput.location.toLowerCase())
                )
                    return false;
            }

            if (this.searchInput.rating !== "") {
                if (restaurant.rating !== parseFloat(this.searchInput.rating))
                    return false;
            }

            if (!restaurant.type.match(this.filterInput.restaurantType))
                return false;

            if (!restaurant.status.match(this.filterInput.opened)) return false;

            return true;
        },

        sortRestaurants: function () {
            if (this.selected === "1" && this.sort === "asc")
                this.restaurants.sort((a, b) => (a.name > b.name ? 1 : -1));

            if (this.selected === "1" && this.sort === "desc")
                this.restaurants.sort((a, b) => (a.name < b.name ? 1 : -1));

            if (this.selected === "2" && this.sort === "asc")
                this.restaurants.sort((a, b) =>
                    a.location.address.city > b.location.address.city ? 1 : -1
                );

            if (this.selected === "2" && this.sort === "desc")
                this.restaurants.sort((a, b) =>
                    a.location.address.city < b.location.address.city ? 1 : -1
                );

            if (this.selected === "3" && this.sort === "asc")
                this.restaurants.sort((a, b) => (a.rating > b.rating ? 1 : -1));

            if (this.selected === "3" && this.sort === "desc")
                this.restaurants.sort((a, b) => (a.rating < b.rating ? 1 : -1));
        },

        noFilters: function () {
            this.filterInput.restaurantType = "";
            this.filterInput.opened = "";
        },

        clickOnMap: function (map) {
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
                        console.log(json.address.city);
                        console.log(json.address.country);

                        // trigger event to search immediatelly
                        this.searchInput.location = json.address.city;
                        if (json.address.city === undefined) {
                            this.searchInput.location = json.address.country;
                        }
                    });
            });
        },

        getImage: function (rest) {
            for (let i of this.images) {
                if (i.imageId === rest.logo) return i.imageCode;
            }

            return "";
        },
    },
    computed: {
        filteredRestaurants: function () {
            return this.restaurants.filter((r) => {
                return this.searchRest(r);
            });
        },
    },
});

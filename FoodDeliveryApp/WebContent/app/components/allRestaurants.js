Vue.component("all-restaurants", {
    data: function () {
        return {
            restaurants: [],
            showSearch: false,
            showFilter: false,
            showSort: false,
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
                            <div class="row g-4 justify-content-between align-items-center d-md-flex">
                                <div class="col-md">
                                    <input type="text" class="form-control" placeholder="Name" aria-label="Name">
                                </div>
                                <div class="col-md">
                                    <input type="text" class="form-control" placeholder="Type" aria-label="Type">
                                </div>
                                <div class="col-md">
                                    <input type="text" class="form-control" placeholder="Location" aria-label="Location">
                                </div>
                                <div class="col-md">
                                    <select class="form-select" placeholder="Type" aria-label="Type">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div class="col-md p-0">
                                    <button type="button" class="btn btn-sm search-button"><i
                                            class="fa fa-search me-2"></i>Search</button>
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
                                    <select class="form-select" placeholder="Order status" aria-label="Order status">
                                        <option value="" disabled selected hidden>Restaurant type</option>
                                        <option value="italian">Italian</option>
                                        <option value="fast-food">Fast food</option>
                                    </select>
                                </div>

                                <div class="col-md mt-2">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="opened" value="" id="flexCheck">
                                        <label class="form-check-label" for="flexCheckDefault">Show only opened restaurants</label>
                                    </div>
                                </div>
                    
                                <div class="col-md mt-1">
                                    <button type="button" class="btn btn-sm filter-button">Filter</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of filter -->

                    <!-- Sort -->
                    <transition name="show">
                        <div class="container mb-3 sortInput" style="width: 85%;" v-if="showSort">
                            <div class="row g-4 justify-content-between align-items-center d-md-flex">
                                <div class="col-md-3 me-5 select">
                                    <select class="form-select" aria-label="Sort by" placeholder="Sort by">
                                        <option value="" disabled selected hidden>Sort by</option>
                                        <option value="1">Restaurant name</option>
                                        <option value="2">Location</option>
                                        <option value="3">Rating</option>
                                    </select>
                                </div>
                
                                <div class="col-md-3 p-2 d-inline-flex">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ascOrDsc" value="" id="flexCheck">
                                        <label class="form-check-label" for="flexCheckDefault">Ascending</label>
                                    </div>
                
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="ascOrDsc" value="" id="flexCheck">
                                        <label class="form-check-label" for="flexCheckDefault">Descending</label>
                                    </div>
                                </div>
                
                                <div class="col-md p-0">
                                    <button type="button" class="btn btn-sm filter-button">Sort</button>
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

                        <div class="col-md-4" v-for="r in restaurants">
                            <div class="card bg-light text-dark restaurantCards">
                                <div class="cover">
                                    <img src="img/product-1.jpg" alt="" class="img-responsive cover">
                                </div>
                                <div class="card-body text-center">
                                    <h3 class="card-title mb-2">{{r.name}}</h3>

                                    <p class="card-text mb-2">
                                        {{r.type}} · {{r.status}}
                                    </p>

                                    <p class="card-text mb-2" style="font-size: 0.9rem; 
                                    color: rgba(0, 0, 0, 0.363); text-transform: uppercase;">
                                        {{r.location.address.street}} {{r.location.address.number}}
                                        <br>
                                        {{r.location.address.city}} {{r.location.address.postcode}} 
                                        <br>
                                        {{r.location.longitude}},  {{r.location.latitude}}
                                        <br>
                                    </p>

                                    <div class="star mb-2 align-items-center">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>

                                    <a href="#" class="btn custom-btn">Select</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        `,
    mounted() {
        axios
            .get("rest/restaurants/getAll")
            .then((response) => (this.restaurants = response.data));
    },
});

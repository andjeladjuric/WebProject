Vue.component("rest-orders", {
    data: function () {
        return {
            currentUser: {},
            orders: [],
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
            <div class="row mb-4">
                <div class="container buttons searchButtons">
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

            <!-- Cards with my orders -->
            <div class="row g-4 mb-4 cards" id="vue-orders" v-for="o in orders">
                <div class="card shadow bg-light text-dark">
                    <div class="card-body text-center">
                        <div class="row g-2 align-items-center d-inline-flex">
                            <div class="container buttons">
                                <h1 class="mb-4 mt-1 orderID">Order #{{o.id}}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <table class="table-responsive singleOrderView">
                                <thead>
                                    <td>Ordered from:</td>
                                    <td>Total sum:</td>
                                    <td>Date and time:</td>
                                    <td>Status:</td>
                                    <td>Delivery Address:</td>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <ol type="1">
                                            <li>{{o.restaurant.name}}</li>
                                            </ol>
                                        </td>
                                        <td>{{o.price}}</td>
                                        <td>{{o.timeOfOrder | dateFormat('DD.MM.YYYY HH:mm')}}</td>
                                        <td>{{o.status}}</td>
                                        <td>{{o.address.street}} {{o.address.number}}, {{o.address.city}} {{o.address.postcode}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a :href="'#/myRestaurant/orders/details?id=' + o.id" class="stretched-link"></a>
                </div>
            </div>
            <!-- End of cards with orders -->
    </div>
    `,
    mounted() {
        axios
            .get("rest/orders/getOrdersForRestaurant", {
                params: { id: this.$route.query.id },
            })
            .then((response) => (this.orders = response.data));
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

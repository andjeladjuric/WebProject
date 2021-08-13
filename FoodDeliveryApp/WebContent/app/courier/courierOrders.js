Vue.component("all-orders", {
    data: function () {
        return {
            orders: [],
            allWaitingOrders: [],
            showSearch: false,
            showFilter: false,
            showSort: false,
            isHidden: true,
            singleOrder: {},
        };
    },
    template: `
    <div class="bg-light align-items-center" id="mainContent">
        <div class="container bg-light align-items-center" style="width: 83%;">
                    <!-- Buttons -->
                    <div class="row mt-3">
                        <div class="container buttons mt-5 mb-1">
                            <button type="button" class="btn d-sm-flex buttonGroup me-2" id="btn1" @click="isHidden = true"
                                v-bind:class="isHidden ? 'active' : 'notActive'">My Orders</button>
                            <button type="button" class="btn d-sm-flex buttonGroup" @click="isHidden = !isHidden" id="btn2"
                                v-bind:class="!isHidden ? 'active' : 'notActive'">Awaiting</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="container mb-2 buttons">
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
                        <div class="row g-2 mb-2 searchInput" v-if="showSearch">
                            <div class="container align-items-center">
                                <div class="row g-3 mb-4 align-items-center justify-content-center d-md-flex search-input">
                                    <div class="col-md-3">
                                        <input type="text" class="form-control" placeholder="Restaurant"
                                            aria-label="Restaurant">
                                    </div>
                                    <div class="col-md-3">
                                        <div class="input-group prices">
                                            <input type="text" class="form-control" placeholder="Min price">
                                            <div class="input-group-addon"><i class="fas fa-minus p-2"></i></div>
                                            <input type="text" class="form-control" placeholder="Max price">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="col-md">
                                            <div class="input-group input-daterange">
                                                <input type="date" class="form-control">
                                                <div class="input-group-addon"><i class="fas fa-minus p-2"></i></div>
                                                <input type="date" class="form-control">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="col-md align-items-center">
                                            <button type="button" class="btn btn-sm search-button"><i
                                                    class="fa fa-search me-2"></i>Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of search -->

                    <!-- Filter -->
                    <transition name="fade" appear>
                        <div class="row mb-2 filterInput" v-if="showFilter">
                            <div class="container">
                                <div class="row justify-content-between align-items-center d-md-flex search-input">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <select class="form-select" placeholder="Order status" aria-label="Order status">
                                                <option value="" disabled selected hidden>Restaurant type</option>
                                                <option value="italian">Italian</option>
                                                <option value="fast-food">Fast food</option>
                                            </select>
                                        </div>

                                        <div class="col-md-3">
                                            <select class="form-select" placeholder="Order status" aria-label="Order status">
                                                <option value="" disabled selected hidden>Status</option>
                                                <option value="Obrada">Obrada</option>
                                                <option value="Preparation">Preparation</option>
                                                <option value="Waiting for delivery">Waiting for delivery</option>
                                                <option value="In transport">In transport</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                            
                                        <div class="col-md mt-1">
                                            <button type="button" class="btn btn-sm filter-button">Filter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <!-- End of filter -->

                    <!-- Sort for orders -->
                    <transition name="fade" appear>
                        <div class="row g-2 sortInput" id="sortOrders" v-if="showSort">
                            <div class="col-md-3 me-5 select">
                                <select class="form-select" aria-label="Sort by" placeholder="Sort by">
                                    <option value="" disabled selected hidden>Sort by</option>
                                    <option value="1">Price</option>
                                    <option value="2">Date</option>
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

                            <div class="col-md p-2">
                                <button type="button" class="btn btn-sm filter-button">Sort</button>
                            </div>
                        </div>
                    </transition>
                    <!-- End of sort for orders -->

                    <!-- Cards with my orders -->
                    <div class="row g-4 mb-4 cards" id="vue-orders" v-for="o in orders" v-if="isHidden">
                            <div class="card shadow bg-light text-dark">
                                <div class="card-body text-center">
                                    <div class="row g-2 align-items-center d-inline-flex">
                                        <div class="container buttons">
                                            <h1 class="mb-4 mt-1 orderID">Order #{{o.id}}</h1>
                                            <h3 style="z-index: 2;">
                                                <button type="button" class="btn ms-4 mb-4" style="background: #ecbeb1;"
                                                    v-if="o.status == 'TRANSPORTING'"
                                                    @click="changeStatus(o.id); reload()">Mark as delivered</button>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <table class="table-responsive singleOrderView">
                                            <thead>
                                                <td>Ordered from:</td>
                                                <td>Total sum:</td>
                                                <td>Date and time:</td>
                                                <td>Stauts:</td>
                                                <td>Delivery Address:</td>
                                            </thead>
    
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <ol type="1">
                                                            <li>{{o.restaurantId}}</li>
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
                                <a :href="'#/details?id=' + o.id" class="stretched-link"></a>
                            </div>
                    </div>
                    <!-- End of cards with orders -->

                    <!-- Cards with waiting orders -->
                    <div class="row g-4 mb-4 cards" id="waiting-orders" v-for="o in allWaitingOrders" v-if="!isHidden">
                            <div class="card shadow bg-light text-dark">
                                <div class="card-body text-center">
                                    <div class="row g-2">
                                        <h1 class="mb-4 orderID">Order #{{o.id}}</h1>
                                    </div>
                                    <div class="row">
                                        <table class="table-responsive singleOrderView">
                                            <thead>
                                                <td>Ordered from:</td>
                                                <td>Total sum:</td>
                                                <td>Date and time:</td>
                                                <td>Stauts:</td>
                                                <td>Delivery Address:</td>
                                            </thead>
    
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <ol type="1">
                                                            <li>{{o.restaurantId}}</li>
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
                                <a :href="'#/details?id=' + o.id" class="stretched-link"></a>
                            </div>
                    </div>
                    <!-- End of cards with orders -->
                </div>
        </div>
    </div>
    `,
    mounted() {
        axios
            .get("rest/orders/getForCourier")
            .then((response) => (this.orders = response.data));

        axios
            .get("rest/orders/getWaitingOrders")
            .then((response) => (this.allWaitingOrders = response.data));
    },
    methods: {
        changeStatus: function (id) {
            axios
                .get("rest/orders/orderDelivered", {
                    params: { id: id },
                })
                .then((response) => (this.order = response.data));
        },
        reload: function () {
            window.location.reload();
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

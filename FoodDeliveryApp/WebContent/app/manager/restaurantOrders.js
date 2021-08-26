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
            hideRequests: true,
            requests: [],
            selectedRequest: {},
        };
    },
    template: `
    <div>
            <div class="row mb-2">
                <div class="col-md container buttons searchButtons">
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
                    <div class="col-md container align-items-center">
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
                    <div class="col-md container">
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
            <div class="row g-4 mb-4 cards align-contet-center justify-content-center" id="vue-orders" v-if="hideRequests"
                style="padding-left: 7%; padding-right: 7%">
                <div class="container">
                    <button type="button" class="btn buttonGroup requests d-flex mb-2" style="white-space: normal"
                        @click="hideRequests = !hideRequests">
                        <i class="fas fa-boxes me-2 p-1" style="color: #ecbeb1;"></i>Check requests
                    </button>
                </div>

                <div class="card shadow bg-light text-dark mb-5" v-for="o in filteredOrders">
                    <div class="card-body text-center">
                        <div class="row g-2 align-items-center d-inline-flex">
                            <div class="col-md container buttons">
                                <h1 class="mb-4 mt-1 orderID">Order #{{o.id}}</h1>
                            </div>
                        </div>
                        <div class="container">
                            <table class="singleOrderView">
                                <thead>
                                    <td scope="col">Ordered from:</td>
                                    <td scope="col">Total sum:</td>
                                    <td scope="col">Date and time:</td>
                                    <td scope="col">Status:</td>
                                    <td scope="col">Delivery Address:</td>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td data-label="Ordered from:">
                                           {{o.restaurant.name}}
                                        </td>
                                        <td data-label="Total sum:" class="orderDetails">{{o.price}}</td>
                                        <td data-label="Date and time:" class="orderDetails">{{o.timeOfOrder | dateFormat('DD.MM.YYYY HH:mm')}}</td>
                                        <td data-label="Status:" class="orderDetails">{{o.status}}</td>
                                        <td data-label="Delivery address:" class="orderDetails">{{o.address.street}} {{o.address.number}}, {{o.address.city}} {{o.address.postcode}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a :href="'#/myRestaurant/orders/details?id=' + o.id" class="stretched-link"></a>
                </div>
            </div>
            <!-- End of cards with orders -->

            <!-- Cards with my requests -->
            <div class="row g-4 mb-4 cards align-contet-center justify-content-center" id="vue-orders"  v-if="!hideRequests"
                style="padding-left: 7%; padding-right: 7%">
                <div class="container">
                    <a @click="hideRequests = !hideRequests" class="link" style="cursor: pointer; font-style: italic; padding-left: 7%"><i class="fas fa-arrow-left me-3"></i>Back
                        to all orders</a>
                </div>
                
                <div class="card shadow bg-light text-dark mb-5" v-for="r in requests" style="width: 86%">
                    <div class="card-body text-center">
                        <div class="row g-2 align-items-center d-inline-flex">
                            <div class="col-md container buttons">
                                <h1 class="mb-4 mt-1 orderID">Request for order #{{r.orderId}}</h1>
                            </div>
                        </div>
                        <div class="container">
                            <table class="singleRequest">
                                <thead>
                                    <td scope="col">Request from:</td>
                                    <td scope="col">Status:</td>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td data-label="Request from:" class="orderDetails">
                                           {{r.courierName}}
                                        </td>
                                        <td data-label="Status:" class="orderDetails">
                                            <p v-if="r.status != 'UNDEFINED'">{{r.status}}</p>
                                            <div class="pt-3 d-inline-flex" style="flex-wrap: wrap;" v-if="r.status == 'UNDEFINED'">
                                                <button type="button" class="btn d-flex me-3 mb-1"
                                                    data-bs-toggle="modal" data-bs-target="#acceptModal"
                                                    style="white-space: normal; z-index: 2"
                                                    @click="sendData(r);">
                                                    <i class="fas fa-check me2 p-1"></i>Accept
                                                </button>
                                                <button type="button" class="btn d-flex p-2"
                                                    data-bs-toggle="modal" data-bs-target="#rejectModal"
                                                    style="white-space: normal; z-index: 2; background-color: #ecbeb1;"
                                                    @click="sendData(r);">
                                                    <i class="fas fa-times me-2 p-1"></i>Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a :href="'#/myRestaurant/orders/details?id=' + r.orderId" class="stretched-link"></a>
                </div>
                
            </div>
            <!-- End of cards with requests -->

            <div class="row g-4 mb-4 cards align-contet-center justify-content-center" 
                style="padding-left: 14%; padding-right: 7%; padding-bottom: 7%"
                v-if="requests.length == 0 && !hideRequests">
                <p style="font-size: 2rem; font-style: italic">There are currently no requests available!</p>
            </div>

            <!-- Reject Modal -->
            <div id="rejectModal" class="modal fade">
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header flex-column">
                            <div class="icon-box">
                            <i class="fas fa-times mt-3 mb-3"></i>
                            </div>				
                            <h4 class="modal-title w-100 mt-5">Are you sure?</h4>			
                            <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Do you really want to reject this request? This process cannot be undone.</p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn" data-bs-dismiss="modal"  @click="rejectRequest(selectedRequest.requestId); reload()">Confirm</button>
                            <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of modal -->

            <!-- Accept Modal -->
            <div id="acceptModal" class="modal fade">
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header flex-column">
                            <div class="icon-box">
                            <i class="fas fa-check mt-3 mb-3"></i>
                            </div>				
                            <h4 class="modal-title w-100 mt-5">Are you sure?</h4>			
                            <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Do you really want to accept this request? This process cannot be undone.</p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn" data-bs-dismiss="modal"  @click="acceptRequest(selectedRequest.requestId); reload()">Confirm</button>
                            <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of modal -->
    </div>
    `,
    mounted() {
        axios
            .get("rest/orders/getOrdersForRestaurant", {
                params: { id: this.$route.query.id },
            })
            .then((response) => (this.orders = response.data));

        axios
            .post("rest/orders/getRequestsByRestaurant", this.$route.query.id)
            .then((response) => (this.requests = response.data))
            .then((response) => {
                axios
                    .post(
                        "rest/orders/getCouriersFromRequests",
                        this.$route.query.id
                    )
                    .then((response) => (this.names = response.data))
                    .then((response) => {
                        for (i = 0; i < this.requests.length; i++) {
                            this.$set(
                                this.requests[i],
                                "courierName",
                                this.names[i]
                            );
                        }
                    });
            });
    },
    methods: {
        sendData: function (r) {
            this.selectedRequest = r;
        },

        searchOrders: function (order) {
            if (
                !order.restaurant.name
                    .toLowerCase()
                    .match(this.searchInput.restaurant.toLowerCase())
            )
                return false;

            if (order.price < parseInt(this.searchInput.minPrice)) return false;

            if (order.price > parseInt(this.searchInput.maxPrice)) return false;

            if (order.timeOfOrder < Date.parse(this.searchInput.minDate))
                return false;

            if (order.timeOfOrder > Date.parse(this.searchInput.maxDate))
                return false;

            if (!order.restaurant.type.match(this.filterInput.restaurantType))
                return false;

            if (!order.status.match(this.filterInput.status)) return false;

            return true;
        },

        sortOrders: function () {
            if (this.selected === "1" && this.sort === "asc")
                this.orders.sort((a, b) => (a.price > b.price ? 1 : -1));

            if (this.selected === "1" && this.sort === "desc")
                this.orders.sort((a, b) => (a.price < b.price ? 1 : -1));

            if (this.selected === "2" && this.sort === "asc")
                this.orders.sort((a, b) =>
                    a.timeOfOrder > b.timeOfOrder ? 1 : -1
                );

            if (this.selected === "2" && this.sort === "desc")
                this.orders.sort((a, b) =>
                    a.timeOfOrder < b.timeOfOrder ? 1 : -1
                );
        },

        noFilters: function () {
            this.filterInput.restaurantType = "";
            this.filterInput.status = "";
        },

        acceptRequest: function (id) {
            axios
                .post("rest/orders/acceptRequest", id)
                .then((response) => "Success");
        },

        rejectRequest: function (id) {
            axios
                .post("rest/orders/rejectRequest", id)
                .then((response) => "Success");
        },

        reload() {
            window.location.reload();
        },
    },
    computed: {
        filteredOrders: function () {
            return this.orders.filter((o) => {
                return this.searchOrders(o);
            });
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

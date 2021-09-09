Vue.component("order-details", {
    data: function () {
        return {
            order: {
                id: "",
                deleted: false,
                items: [],
                restaurant: {},
                timeofOrder: "",
                price: "",
                customer: "",
                stauts: "",
                address: {},
            },
            orderRequest: {
                orderId: "",
                restaurantId: "",
                courier: "",
                manager: "",
                status: "",
            },
            requests: [],
            currentUser: {},
            requestSent: false,
        };
    },
    template: `
        <div class="bg-light" id="main-content">
            <div class="container bg-light">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <div class="row g-4">
                            <div class="col-md d-sm-flex justify-content-start my-4">
                                <a href="#/orders"><i class="fas fa-arrow-left me-3"></i>Back
                                    to all orders</a>
                            </div>
                        </div>

                        <div class="row g-4">
                            <div class="col-md d-sm-flex justify-content-start">
                                <h1>Order #{{order.id}}</h1>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md d-sm-flex justify-content-start mb-5">
                                <h6>{{order.timeOfOrder | dateFormat('MMMM DD, YYYY')}} </h6>
                            </div>
                        </div>

                        <div class="row g-4 mb-5">
                            <table class="bg-light table-responsive">
                                <tr>
                                    <th colspan="3">Items</th>
                                </tr>
                                <tr v-for="i in order.items">
                                    <td id="articleName">{{i.item.name}}</td>
                                    <td class="text-end">x{{i.quantity}}</td>
                                    <td class="text-end">
                                        {{i.item.price}}
                                    </td>
                                </tr>

                                <tr>
                                    <td id="total" colspan="2">Total sum</td>
                                    <td id="total" class="text-end me-2">
                                        {{order.price}}
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="row g-4 mb-5">
                            <table class="bg-light">
                                <tr>
                                    <th colspan="3" id="additional">
                                        Additional information
                                    </th>
                                </tr>
                                <tr>
                                    <td id="customerName">Customer</td>
                                    <td>
                                        {{order.customer}}
                                    </td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td id="dateAndTime">Date and time</td>
                                    <td>
                                        {{order.timeOfOrder | dateFormat('DD.MM.YYYY HH:mm')}}
                                    </td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td id="restaurant">Restaurant</td>
                                    <td>
                                        {{order.restaurant.name}}
                                    </td>
                                    <td></td>
                                </tr>

                                <tr>
                                    <td id="status">Order status</td>
                                    <td>
                                        {{order.status}}
                                    </td>
                                    <td>
                                        <button type="button" class="btn d-flex tableBtn" v-if="isOrderInTransport" @click="changeStatus(order.id)">
                                            Mark as delivered
                                        </button>
                                        <button type="button" class="btn d-flex tableBtn" v-if="isOrderWaiting && !isSent && !requestSent" @click="sendRequest(); showAlert()">
                                            Send delivery request
                                        </button>
                                        <button type="button" class="btn d-flex tableBtn disabled" v-if="(isSent || requestSent) && !requestRejected" style="background: #ecbeb1;">
                                            Request for order sent!
                                        </button>
                                        <button type="button" class="btn d-flex tableBtn disabled" v-if="requestRejected" style="background: #ecbeb1;">
                                            Request for order rejected!
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td id="orderID">Order ID</td>
                                    <td>
                                        {{order.id}}
                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        axios
            .get("rest/orders/getOrderById", {
                params: { id: this.$route.query.id },
            })
            .then((response) => (this.order = response.data));

        axios
            .get("rest/users/getCurrentUser")
            .then((response) => (this.currentUser = response.data));

        axios
            .get("rest/orders/getAllRequests")
            .then((response) => (this.requests = response.data));
    },
    computed: {
        isOrderInTransport() {
            if (this.order.status == "TRANSPORTING") return true;

            return false;
        },
        isOrderWaiting() {
            if (this.order.status == "WAITING") return true;

            return false;
        },
        isSent() {
            for (let r of this.requests) {
                if (
                    r.orderId === this.order.id &&
                    r.courier === this.currentUser.username
                )
                    return true;
            }

            return false;
        },

        requestRejected() {
            for (let r of this.requests) {
                if (
                    r.orderId === this.order.id &&
                    r.courier === this.currentUser.username &&
                    r.status === "REJECTED"
                )
                    return true;
            }

            return false;
        },
    },
    methods: {
        changeStatus: function (id) {
            this.order.status = "DELIVERED";
            let dto = {
                orderId: id,
                status: "DELIVERED",
            };
            axios
                .post("rest/orders/orderDelivered", JSON.stringify(dto), {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((response) => "SUCCESS");
        },
        reload: function () {
            window.location.reload();
        },

        sendRequest: function () {
            this.orderRequest.orderId = this.order.id;
            this.orderRequest.restaurantId = this.order.restaurant.id;
            this.orderRequest.courier = this.currentUser.username;
            this.orderRequest.manager = this.order.restaurant.menagerId;
            this.orderRequest.status = "UNDEFINED";

            axios
                .post(
                    "rest/orders/sendRequest",
                    JSON.stringify(this.orderRequest),
                    {
                        headers: { "Content-type": "application/json" },
                    }
                )
                .then((response) => (this.orderRequest = response.data));

            this.requestSent = true;
        },

        showAlert: function () {
            const Toast = Swal.mixin({
                toast: true,
                text:
                    "Request for order #" +
                    this.order.id +
                    " succesfully sent!",
                position: "bottom-end",
                timer: 3500,
                showConfirmButton: false,
            });

            Toast.fire({
                icon: "success",
            });
        },
    },
    components: {
        swal,
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

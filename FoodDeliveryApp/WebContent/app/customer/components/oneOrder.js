
Vue.component("one-order", {
    data: function () {
        return {
				order : {}
        };
    },
    template: `
       <div>
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
	   </div>
    `,
    mounted() {
		 axios
            .get("rest/orders/getOrderById", {
                params: { id: this.$route.query.id },
            })
            .then((response) => (this.order = response.data));  
    },
    methods: {
        
    
        
    },
    filters: {
	 dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
       
    },
});

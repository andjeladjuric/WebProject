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
            showItems: true,
            showComments: false,
            showOrders: false,
            images: [],
        };
    },
    template: `
    <div>
        <!-- Header photo -->
        <div id="header" class="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                       <div v-if="restaurant.type === 'ITALIAN'" class="overlay-image" style="background-image: url(img/italian.jpg);"></div>
			            <div v-if="restaurant.type === 'CHINEESE'" class="overlay-image" style="background-image: url(img/asian.jpg);"></div>
			            <div v-if="restaurant.type === 'FASTFOOD'" class="overlay-image" style="background-image: url(img/fastfood1.jpg);"></div>
			            <div v-if="restaurant.type === 'BARBEQUE'" class="overlay-image" style="background-image: url(img/barbeque1.jpg);"></div>
			            <div v-if="restaurant.type === 'DESSERTS'" class="overlay-image" style="background-image: url(img/dessert2.jpg);"></div>
			            <div v-if="restaurant.type === 'MEXICAN'" class="overlay-image" style="background-image: url(img/mexican.jpg);"></div>
			            <div v-if="restaurant.type === 'VEGAN'" class="overlay-image" style="background-image: url(img/vegan.jpg);"></div>
                    <div class="container headline">
                        <div class="d-flex justify-content-start">
			                <img class="image-logo me-3" v-bind:src="getLogo()" alt="RestaurantLogo">
			                <h1 style="font-weight: bold; font-size: 5vw; margin-top:60px;">{{restaurant.name}}</h1>
			            </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="container wrapper">
            <!-- Buttons -->
            <div class="row">
                <div class="container buttons mt-5 mb-1">
                    <router-link to="/myRestaurant/">
                        <button type="button" class="btn d-sm-flex buttonGroup me-2" id="itemsButton"
                            @click="showComments = false; showOrders = false; showItems = true" v-bind:class="showItems ? 'active' : 'notActive'">
                            Items
                        </button>
                    </router-link>
                    <router-link to="/myRestaurant/comments">
                        <button type="button" class="btn d-sm-flex buttonGroup me-2" id="commentsButton"
                            @click="showComments = !showComments; showOrders = false; showItems = false" v-bind:class="showComments ? 'active' : 'notActive'">
                            Comments
                        </button>
                    </router-link>
                    <router-link :to="'/myRestaurant/orders?id=' + restaurant.id">
                        <button type="button" class="btn d-sm-flex buttonGroup" id="ordersButton"
                            @click="showComments = false; showOrders = !showOrders; showItems = false;" v-bind:class="showOrders ? 'active' : 'notActive'">
                            Orders
                        </button>
                    </router-link>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurantForManager")
            .then((response) => (this.restaurant = response.data));
        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));
    },
    methods: {
        getLogo: function () {
            for (let i of this.images) {
                if (i.imageId === this.restaurant.logo) return i.imageCode;
            }

            return "";
        },
    },
});

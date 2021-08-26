Vue.component("restaurant", {
    data: function () {
        return {
            restaurant: {},
            showItems: true,
            showComments: false,
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
                    <router-link to="/selectedRestaurant/">
                        <button type="button" class="btn d-sm-flex buttonGroup me-2" id="itemsButton"
                            @click="showComments = false;  showItems = true" v-bind:class="showItems ? 'active' : 'notActive'">
                            Items
                        </button>
                    </router-link>
                    <router-link to="/selectedRestaurant/comments">
                        <button type="button" class="btn d-sm-flex buttonGroup me-2" id="commentsButton"
                            @click="showComments = !showComments; showItems = false" v-bind:class="showComments ? 'active' : 'notActive'">
                            Comments
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
            .get("rest/restaurants/getRestaurant", {
                params: { id: this.$route.query.id },
            })
            .then((response) => (this.restaurant = response.data));
    },
});

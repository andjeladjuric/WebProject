Vue.component("comments", {
    data: function () {
        return {
            restaurant: {},
            allComments: [],
            users: [],
            user: {
                username: "",
                name: "",
                surname: "",
                type: {
                    name: "",
                    discount: "",
                    requiredPoints: "",
                },
            },
        };
    },
    template: `
    <div class="row g-2 comments mt-5">
        <!-- Comments -->
        <div class="col-md-2 d-flex"></div>
        <div class="row g-4 mb-4 cards align-contet-center justify-content-center" 
            style="padding-left: 5%; padding-right: 7%; padding-bottom: 7%"
            v-if="allComments.length === 0">
            <p style="font-size: 2rem; font-style: italic">There are currently no comments available!</p>
        </div>

        <div class="col-md-8 ms-2">
            <h4 class="mb-3" id="item-1">All comments</h4>
            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="(comment, index) in allComments"
                style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
                <div class="card-body text-start">
                    <div class="container cardContent text-start">
                        <div class="container mb-2 d-inline-flex userNameAndType">
                            <h1 class="me-2"> {{users[index]}} </h1>
                        </div>
                        <p class="mb-2">{{comment.text}}</p>
                        <div class="more mb-2">
                            <i class="fas fa-star me-2" style="color: gold;"></i>
                            <p>·</p>
                            <p class="ms-2">{{comment.stars}}</p>
                        </div>

                        <div class="container d-inline-flex buttons p-0">
                            <button type="button" class="btn d-sm-flex me-2 disabled" v-if="comment.status !== 'UNDEFINED'">{{comment.status}}</button>
                            <button type="button" class="btn d-sm-flex me-2" id="allowButton" v-if="comment.status === 'UNDEFINED'" @click="allowComment(comment.id)">Allow</button>
                            <button type="button" class="btn d-sm-flex" id="rejectButton" v-if="comment.status === 'UNDEFINED'" @click="rejectComment(comment.id)">Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md"></div>
        <!-- End of comments -->
    </div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurantForManager")
            .then((response) => {
                this.restaurant = response.data;
                console.log(this.restaurant.rating);
            })
            .then((response) => {
                axios
                    .get("rest/comments/getCommentsForManager", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.allComments = response.data))
                    .then((response) => {
                        axios
                            .get("rest/comments/getCustomers", {
                                params: { id: this.restaurant.id },
                            })
                            .then((response) => (this.users = response.data));
                    });
            });
    },
    methods: {
        rejectComment: function (id) {
            axios
                .post("rest/comments/rejectComment", id)
                .then((response) => window.location.reload());
        },

        allowComment: function (id) {
            axios
                .post("rest/comments/allowComment", id)
                .then((response) => window.location.reload());
        },
    },
});

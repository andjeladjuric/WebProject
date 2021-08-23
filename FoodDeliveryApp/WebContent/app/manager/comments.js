Vue.component("comments", {
    data: function () {
        return {
            allComments: [],
            users: [],
            user: {},
        };
    },
    template: `
    <div class="row g-2 comments mt-5">
        <!-- Comments -->
        <div class="col-md-2 d-flex"></div>

        <div class="col-md-8 ms-2">
            <h4 class="mb-3" id="item-1">All comments</h4>
            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="(comment, index) in allComments"
                style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
                <div class="card-body text-start">
                    <div class="container cardContent text-start">
                        <div class="container mb-2 d-inline-flex userNameAndType">
                            <h1 class="me-2"> {{comment.customer}}
                            <!-- {{users[index] === undefined ? getCustomers(comment) : users[index].name}} -->
                            </h1>
                            <p class="me-2">·</p>
                            <p>golden</p>
                        </div>
                        <p class="mb-2">{{comment.text}}</p>
                        <div class="more mb-2">
                            <i class="fas fa-star me-2" style="color: gold;"></i>
                            <p>·</p>
                            <p class="ms-2">{{comment.stars}}</p>
                        </div>

                        <div class="container d-inline-flex buttons p-0">
                            <button type="button" class="btn d-sm-flex me-2 disabled">{{comment.status}}</button>
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
                return axios
                    .get("rest/comments/getCommentsForManager", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.allComments = response.data));
            });
    },
    methods: {
        getCustomers: function (comment) {
            axios
                .get("rest/comments/getCustomer", {
                    params: { id: comment.id },
                })
                .then((response) => {
                    this.user = response.data;
                    this.users.push(response.data);
                });

            return this.user.name;
        },

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

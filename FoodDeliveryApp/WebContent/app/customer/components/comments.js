/**
 * 
 */
Vue.component("comments", {
    data: function () {
        return {
        	restaurant : {},
            allComments: [],
            comment : {
            	text : "",
            	rating : 0,
            	restaurant : ""
            }
        };
    },
    template: `
   <div class="row g-2 comments mt-5">
    <!-- Comments -->
    <div class="col-lg-7 mx-auto">
        <h4 class="mb-3" id="item-1">All comments</h4>
        <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="comment in allComments"
            style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
            <div class="card-body text-start">
                <div class="container cardContent text-start">
                    <div class="container mb-2 d-inline-flex userNameAndType">
                        <h1 class="me-2">{{comment.customer}}</h1>
                        <p class="me-2">·</p>
                        <p>golden</p>
                    </div>
                    <p class="mb-2">{{comment.text}}</p>
                    <div class="more mb-2">
                        <i class="fas fa-star me-2" style="color: gold;"></i>
                        <p>·</p>
                        <p class="ms-2">{{comment.stars}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-4 col-sm-11 mx-auto">
        <div card>
            <div class="d-flex gap-3">
                <p>Rate us: </p>
				<star-rating v-model="comment.rating" v-bind:star-size="30" style="margin-bottom : 20px;"></star-rating>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" v-model="comment.text" style="height: 150px"></textarea>
                <label>Leave a comment here</label>
            </div>
            <div class="d-flex justify-content-end gap-1">
                <button type="button" class="btn btn-sm buttonGroup" v-on:click="cancel()">cancel</button>
                <button type="button" class="btn btn-sm buttonGroup active" v-on:click="addComment()">comment</button>
            </div>
        </div>
        
    </div>
    <!-- End of comments -->
</div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurant")
            .then((response) => {
                this.restaurant = response.data;
                return axios
                    .get("rest/comments/getCommentsForUser", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.allComments = response.data));
            });
    },
    methods: {
    	cancel : function(){
    		this.comment.text = "";
    		this.comment.rating = 0;
    	},
    	addComment : function(){
    		this.comment.restaurant = this.restaurant.id;
    		axios 
    			.post('rest/comments/addComment', JSON.stringify(this.comment),
        	{ headers: {
        		'Content-type': 'application/json',
        		}
        	});
        	
        	this.comment.text = "";
    		this.comment.rating = 0;
    	}
    }
});

Vue.component('star-rating', VueStarRating.default);

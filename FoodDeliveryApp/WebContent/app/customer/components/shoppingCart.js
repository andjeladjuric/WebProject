Vue.component("shopping-cart",{
    data: function(){
        return{
            cart : {},
			numOfItems : 0,
			totalPrice : 0,
			user : {},
			medal : "",
			paragraph : "",
			haveDiscount : true,
			points : 0
        }
    }
    ,
    template: `
    <div>
		<div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-11 mx-auto">
                <div class="row mt-5 gx-3">
                    <!-- left side div -->
                    <div class="
                                col-md-12 col-lg-8 col-11
                                mx-auto
                                main_cart
                                mb-lg-0 mb-5
                                shadow
                            ">
                        <h2 class="py-4">Cart ({{numOfItems}} items)</h2>

                        <div class="card p-4"  v-for="i in cart.items">
                            <div class="row">
                                <!-- cart images div -->
                                <div class="
                                            col-md-5 col-11
                                            mx-auto
                                            bg-light
                                            d-flex
                                            product_img
                                        " style="border-radius: 15px">
                                    <img src="img/product-1.jpg" class="img-fluid" alt="cart img" />
                                </div>

                                <!-- cart product details -->
                                <div class="
                                            col-md-7 col-11
                                            mx-auto
                                            px-4
                                            mt-2
                                        ">
                                    <div class="row">
                                        <!-- product name  -->
                                        <div class="col-6 card-title">
                                            <h1 class="mb-4 product_name">
                                                {{i.name}}
                                            </h1>
                                            <p class="mb-2">
                                                Description: {{i.description}}
                                            </p>
                                            <p class="mb-2">Size: {{i.amount}} mg</p>
                                            <p class="mb-2">
                                                Restaurant: ""
                                            </p>
                                            <p class="mb-3">
                                                <i class="fas fa-coins"></i>
                                                {{i.points}}
                                            </p>
                                        </div>
                                        <!-- quantity inc dec -->
                                        <div class="col-6">
                                            <ul class="
                                                        pagination
                                                        justify-content-end
                                                        set_quantity
                                                    ">
                                                <li class="page-item">
                                                    <button class="page-link" style="
                                                                border-radius: 15px;
                                                            " v-on:click="decr(i.id)">
                                                        <i class="
                                                                    fas
                                                                    fa-minus
                                                                "></i>
                                                    </button>
                                                </li>
                                                <li class="page-item">
                                                    <input type="text" readonly class="page-link" v-model="i.quantity" />
                                                </li>
                                                <li class="page-item">
                                                    <button class="page-link" style="
                                                                border-radius: 15px;
                                                            " v-on:click="incr(i.id)">
                                                        <i class="
                                                                    fas
                                                                    fa-plus
                                                                "></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <!-- //remover move and price -->
                                    <div class="row">
                                        <div class="
                                                    col-8
                                                    d-flex
                                                    justify-content-between
                                                    remove_wish
                                                ">
                                            <a href="" v-on:click="removeItem(i)">
                                                <i class="fas fa-trash-alt"></i> REMOVE ITEM
                                            </a>
                                        </div>
                                        <div class="
                                                    col-4
                                                    d-flex
                                                    justify-content-end
                                                    price_money
                                                ">
                                            <h3>
                                                <span id="itemval">{{i.price}} din
                                                </span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <hr />

                        </div>
                        
                    </div>
                    <!-- right side div -->
                    <div class="
                                col-md-12 col-lg-4 col-11
                                mx-auto
                                mt-lg-0 mt-md-5
                            ">
                        <div class="right_side p-3 shadow bg-white">
                            <h2 class="product_name mb-5">
                                The Total Amount
                            </h2>
                            <div class="
                                        price_indiv
                                        d-flex
                                        justify-content-between
                                    ">
                                <p>Product amount</p>
                                <p>
                                    <span id="product_total_amt">{{cart.totalPrice}}</span> din
                                </p>
                            </div>
                            <div class="
                                        price_indiv
                                        d-flex
                                        justify-content-between
                                    ">
                                <p>Shipping Charge</p>
                                <p><span>100</span> din</p>
                            </div>
                            <div class="
                                        price_indiv
                                        d-flex
                                        justify-content-between
                                    ">
                                <p>Points</p>
                                <p><span id="shipping_charge">{{points}}</span></p>
                            </div>
                            <hr />
                            <div class="
                                        total-amt
                                        d-flex
                                        justify-content-between
                                        font-weight-bold
                                    ">
                                <p>The total amount</p>
                                <p>
                                    <span id="total_cart_amt">{{totalPrice}}</span> din
                                </p>
                            </div>
                            <button class="btn buttonGroup" data-bs-toggle="modal" data-bs-target="#checkoutModal">
                                Checkout
                            </button>
                        </div>
                        <div class="mt-3 shadow p-3 bg-white">
                            <div class="pt-4">
                                <h5 class="mb-4">Discount codes</h5>
                                <p>
                                    <i class="fas fa-medal" style="color:brown;" v-if="haveDiscount && medal == 'BRONZE'"></i>
                                    <i class="fas fa-medal" style="color:gold;" v-if="haveDiscount && medal == 'GOLD'"></i>
                                    <i class="fas fa-medal" v-if="haveDiscount && medal == 'SILVER'"></i>
                    
                                    {{paragraph}}
                                </p>
                                <button class="btn buttonGroup active" v-bind:disabled="haveDiscount == false" v-on:click="useDiscount()">
                                    Use discount
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Modal-->
    <div class="modal fade" id="checkoutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Checkout
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-start">
                        <h6 class="mb-3">
                            Leave an address where you want us to deliver
                        </h6>
                    </div>
                    <div class="row justify-content-center mt-3">
                        <div class="col-6">
                            <form class="form-floating">
                                <input type="text" class="form-control" value="Sutjeska" />
                                <label for="floatingInputValue">Street</label>
                            </form>
                        </div>
                        <div class="col-3">
                            <form class="form-floating">
                                <input type="number" class="form-control" value="3" />
                                <label for="floatingInputValue">Number</label>
                            </form>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-3 mb-3">
                        <div class="col-6">
                            <form class="form-floating">
                                <input type="text" class="form-control" value="Novi Sad" />
                                <label for="floatingInputValue">City</label>
                            </form>
                        </div>
                        <div class="col-3">
                            <form class="form-floating">
                                <input type="number" class="form-control" value="21000" />
                                <label for="floatingInputValue">Postcode</label>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn buttonGroup" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn buttonGroup active">
                        Order
                    </button>
                </div>
            </div>
        </div>
    </div>
	</div>
    
    `, mounted() {
		axios
			.get("rest/carts/getCart")
            .then((response) =>{
            ( this.cart = response.data);
             this.numOfItems = this.cart.items.length;
             this.totalPrice = this.cart.totalPrice + 100;
              for(var i of this.cart.items){
            	this.points = this.points + i.points;
            };
              });
            
		axios
			.get("rest/users/getCurrentUser")
            .then((response) =>{
				( this.user = response.data);
				this.medal = this.user.type.name;
				if(this.user.type.name === "GOLD"){
					this.paragraph = "You have 20% discount as a GOLD user.";
				}else if(this.user.type.name === "SILVER"){
					this.paragraph = "You have 15% discount as a SILVER user.";
				}else if(this.user.type.name === "BRONZE"){
					this.paragraph = "You have 10% discount as a BRONZE user." 
				}else if(this.user.type.name === "NONE"){
					this.paragraph = "You do not have any discount currently." 
					this.haveDiscount = false;
				}
			})
    },
    methods: {
		incr : function(id){
			for(var i of this.cart.items){
				if(i.id === id){
					i.quantity++;
				}
			}
		},
		decr : function(id){
			for(var i of this.cart.items){
				if(i.id === id && i.quantity != 1){
					i.quantity--;
				}
			}
		},
		removeItem : function(i){
			axios 
	    			.post('rest/carts/removeItem', i.id,
	        	{ headers: {
	        		'Content-type': 'text/plain',
	        		}
	        	})
	    			.then((response) =>{( this.cart = response.data); this.numOfItems = this.cart.items.length; this.totalPrice = this.cart.totalPrice + 100; this.points = this.points - i.points});			
		},
		useDiscount : function(){
			this.totalPrice = this.totalPrice * (1 - this.user.type.discount * 0.01);
			this.haveDiscount = false;
			
		},
		getRestaurant : function(id){
			axios 
	    		.post('rest/restaurants/getById', id,
	        	{ headers: {
	        		'Content-type': 'text/plain',
	        		}
	        	})
	    		.then((response) =>{( response.data);});
		}
    },
});
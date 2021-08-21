Vue.component("shopping-cart",{
    data: function(){
        return{
            cart : {},
			numOfItems : 0,
			totalPrice : 0
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
                                                Restaurant: 
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
                                                    <input type="text" name="" class="page-link" v-model="i.quantity" />
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
                                            <p>
                                                <i class="fas fa-trash-alt"></i>REMOVE ITEM
                                            </p>
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
                                <p><span id="shipping_charge">20</span></p>
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
                                    <i class="fas fa-medal" style="color: gold"></i>
                                    30% as Golden user
                                </p>
                                <button class="btn buttonGroup active">
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
            .then((response) =>{( this.cart = response.data); this.numOfItems = this.cart.items.length; this.totalPrice = this.cart.totalPrice + 50; });
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
		}
    },
});
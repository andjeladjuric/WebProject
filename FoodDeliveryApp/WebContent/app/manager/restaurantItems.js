Vue.component("restaurant-items", {
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
            items: [],
            item: {
                id: "",
                deleted: "",
                name: "",
                price: "",
                type: "",
                amount: "",
                description: "",
                imagePath: "",
                restaurantId: "",
                category: "",
            },
            currentUser: {},
            showAddItem: false,
        };
    },
    template: `
    <div>
        <!-- All Items -->
        <div class="row g-2 allItems mt-5 justify-content-between" v-if="!showAddItem"> 
            <div class="col-md-3">
                <div style="margin-left: 3rem">
                    <nav id="myScrollspy">
                        <h4 style="margin-left: 1rem;" class="mb-4">Categories</h4>
                        <nav class="nav nav-pills flex-column">
                            <a class="nav-link" href="#item-1" v-if="!isCategoryEmpty('BREAKFAST')">Breakfast</a>
                            <a class="nav-link" href="#item-2" v-if="!isCategoryEmpty('SALADS')">Salads</a>
                            <a class="nav-link" href="#item-3" v-if="!isCategoryEmpty('PIZZA')">Pizza</a>
                            <a class="nav-link" href="#item-4" v-if="!isCategoryEmpty('PASTA')">Pasta</a>
                            <a class="nav-link" href="#item-5" v-if="!isCategoryEmpty('MAINDISHES')">Main Dishes</a>
                            <a class="nav-link" href="#item-6" v-if="!isCategoryEmpty('DRINKS')">Drinks</a>
                            <a class="nav-link" href="#item-7" v-if="!isCategoryEmpty('DESSERTS')">Desserts</a>
                        </nav>
                    </nav>
                    <br><br>
                    <h4 style="margin-left: 1rem;" class="mb-2">Options</h4>
                    <button type="button" class="btn buttonGroup addItem" @click="showAddItem = !showAddItem">
                            <i class="fas fa-plus me-2 p-1" style="color: #ecbeb1;"></i>Add Item
                    </button>
                </div>
            </div>

            <!-- Items -->
            <div class="col-md-6">
                <!-- Breakfast -->
                <h4 class="mb-3" id="item-1" v-if="!isCategoryEmpty('BREAKFAST')">Breakfast</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'BREAKFAST'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of breakfast -->

                <!-- Salads -->
                <h4 class="mb-3 mt-5" id="item-2" v-if="!isCategoryEmpty('SALADS')">Salads</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'SALADS'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of salads -->

                <!-- Pizza -->
                <h4 class="mb-3 mt-5" id="item-3" v-if="!isCategoryEmpty('PIZZA')">Pizza</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PIZZA'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of pizza -->

                <!-- Pasta -->
                <h4 class="mb-3 mt-5" id="item-4" v-if="!isCategoryEmpty('PASTA')">Pasta</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PASTA'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of pasta -->
                
                <!-- Main dishes -->
                <h4 class="mb-3 mt-5" id="item-5" v-if="!isCategoryEmpty('MAINDISHES')">Main Dishes</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'MAINDISHES'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of main dishes -->

                <!-- Drinks -->    
                <h4 class="mb-3 mt-5" id="item-6" v-if="!isCategoryEmpty('DRINKS')">Drinks</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DRINKS'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of drinks -->

                <!-- Desserts -->
                <h4 class="mb-3 mt-5" id="item-7" v-if="!isCategoryEmpty('DESSERTS')">Desserts</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DESSERTS'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <div class="more mb-4">
                                <h1 class="mt-1">{{item.name}}</h1>
                                <h1>
                                    <button type="button" class="btn ms-3 btn-sm btn-outline-secondary" style="background: none">
                                        <i class="fas fa-edit me-2"></i>Edit item
                                    </button>
                                </h1>
                            </div>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>
                        </div>

                        <div class="image-wrapper py-5" style="background-image: url(img/pizza.jpeg);"></div>
                    </div>
                </div>
                <!-- End of desserts -->
            </div>

            <div class="col-md-3">
                <div class="information" style="margin-left: 6rem">
                    <div class="container d-block">
                        <h4 class="card-title mb-4">About</h4>
                        <h5><b>Rating</b></h5>
                        <div class="container d-inline-flex p-0">
                            <i class="fa fa-star checked me-2" style="color: gold;"></i>
                            <p>·</p>
                            <p class="ms-2">5.0</p>
                        </div>
                    </div>

                    <div class="container d-block">
                        <h5><b>Address</b></h5>
                        <p>{{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
                        {{restaurant.location.address.city}}, {{restaurant.location.address.postcode}}</p>
                    </div>

                    <div class="container d-block">
                        <h5><b>Type</b></h5>
                        <p>{{restaurant.type}}</p>
                    </div>

                    <div class="container d-block">
                        <h5><b>Working hours:</b></h5>
                        <p>7am - 9pm</p>
                        <h5><b>Currently:</b></h5>
                        <p style="color: red; text-transform: uppercase">{{restaurant.status}}</p>
                    </div>

                </div>
            </div>
        </div>
        <!-- End of items -->

        <!-- Add item -->
        <div class="row my-5 text-center addItemForm" v-if="showAddItem">
            <div class="col-md-2"></div>

            <div class="col-md-8">
                <h2 class="mb-2" style="text-transform: uppercase;">
                <i class="far fa-plus-square mb-4 me-4" style="color: #ecbeb1"></i></i>Add Item
                </h2>
                <form>
                    <div class="row d-flex justify-content-center">
                        <table class="table-responsive addItemTable">
                        <tr>
                                <td class="label">Name</td>
                                <td>
                                    <input class="form-control text-start" type="text" name="name" v-model="item.name"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Price</td>
                                <td>
                                    <input class="form-control text-start" type="text" name="lastname" v-model="item.price"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Image</td>
                                <td>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input form-control" id="validatedCustomFile">
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Category</td>
                                <td>
                                    <select class="form-select" placeholder="Category" aria-label="Category" v-model="item.category">
                                        <option value="BREAKFAST">Breakfast</option>
                                        <option value="SALADS">Salads</option>
                                        <option value="PIZZA">Pizza</option>
                                        <option value="PASTA">Pasta</option>
                                        <option value="MAINDISHES">Main dishes</option>
                                        <option value="DRINKS">Drinks</option>
                                        <option value="DELIVERED">Desserts</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Type</td>
                                <td style="display: inline;">
                                    <label for="radio_1">
                                        <input type="radio" name="type" :checked="item.type == 'Food'"
                                            v-bind:value="'Food'" v-model="item.type">
                                        Food
                                    </label>
                                    <label for="radio_1">
                                        <input type="radio" name="type" :checked="item.type == 'Drink'"
                                            v-bind:value="'Drink'" v-model="item.type">
                                        Drink
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Description</td>
                                <td>
                                    <textarea style="height: 80px; white-space: normal;" class="form-control text-start" aria-describedby="username"
                                        v-model="item.description">
                                    </textarea>

                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="row my-5">
                        <div class="col d-inline-flex justify-content-center">
                            <button type="button" class="btn me-4" @click="addNewItem()">Save</button>
                            <button type="button" class="btn" style="background: #ecbeb1">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
        </div>
        <!-- End of add item -->
    </div>
    `,
    mounted() {
        axios
            .get("rest/restaurants/getRestaurantForManager")
            .then((response) => {
                this.restaurant = response.data;
                return axios
                    .get("rest/items/getItemsForRestaurant", {
                        params: { id: this.restaurant.id },
                    })
                    .then((response) => (this.items = response.data));
            });
    },
    methods: {
        isCategoryEmpty: function (category) {
            let itemsInCategory = new Array();
            for (let i of this.items) {
                if (i.category === category) itemsInCategory.push(i);
            }

            if (itemsInCategory.length === 0) return true;

            return false;
        },

        addNewItem: function () {
            var newItem = {
                id: this.item.id,
                deleted: this.item.deleted,
                name: this.item.name,
                price: this.item.price,
                type: this.item.type,
                amount: this.item.amount,
                description: this.item.description,
                imagePath: this.item.imagePath,
                restaurantId: this.restaurant.id,
                category: this.item.category,
            };
            axios.post("rest/items/addNewItem", newItem).then((response) => {
                this.item = response.data;
                window.location.reload();
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

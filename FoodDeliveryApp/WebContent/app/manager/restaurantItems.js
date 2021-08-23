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
            itemToDelete: {},
            currentUser: {},
            showAddItem: false,
            errorMessage: "",
        };
    },
    template: `
    <div>
        <!-- All Items -->
        <div class="row g-2 allItems mt-5 justify-content-between" v-if="!showAddItem"> 
            <div class="col-md-2">
                <div>
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
            <div class="col-md-7" style="padding-left: 4rem">
                <!-- Breakfast -->
                <h4 class="mb-3" id="item-1" v-if="!isCategoryEmpty('BREAKFAST')">Breakfast</h4>
                <div class="card bg-light text-dark mb-2" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'BREAKFAST'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete.id = item.id" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
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
                                <td class="label">Name <span style="color: red;">*</span></td>
                                <td>
                                    <input class="form-control text-start" type="text" name="name" v-model="item.name"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Price <span style="color: red;">*</span></td>
                                <td>
                                    <input class="form-control text-start" type="text" name="lastname" v-model="item.price"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Image <span style="color: red;">*</span></td>
                                <td>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input form-control">
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Category <span style="color: red;">*</span></td>
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
                                <td class="label">Type <span style="color: red;">*</span></td>
                                <td style="text-indent: 0">
                                    <label style="white-space: nowrap;" class="me-5">
                                        <input type="radio" class="radio" name="type" :checked="updatedItem.type == 'Food'"
                                            v-bind:value="'Food'" v-model="updatedItem.type">
                                        Food
                                    </label>
                                    <label style="white-space: nowrap">
                                        <input type="radio" class="radio" name="type" :checked="updatedItem.type == 'Drink'"
                                            v-bind:value="'Drink'" v-model="updatedItem.type">
                                        Drink
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Amount</td>
                                <td>
                                    <input class="form-control text-start" type="text" name="amount" v-model="item.amount"/>
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
                    <p style="color: red; font-size: small;" class="text-center mt-5">{{errorMessage}}</p>
                    <div class="row mt-5">
                        <div class="col d-inline-flex justify-content-center">
                            <button type="button" class="btn me-4" @click="addNewItem()">Save</button>
                            <button type="button" class="btn" style="background: #ecbeb1" @click="cancelAdding()">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
        </div>
        <!-- End of add item -->

        <!-- Delete item modal -->
        <div id="myModal" class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header flex-column">
                        <div class="icon-box">
                        <i class="fas fa-trash mt-3 mb-3"></i>
                        </div>						
                        <h4 class="modal-title w-100 mt-5">Are you sure?</h4>	
                        <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete this item? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="deleteItem(itemToDelete.id)">Confirm</button>
                        <button type="button" class="btn" style="background: #ecbeb1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of delete item modal -->
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
            if (
                this.item.name === "" ||
                this.item.price === "" ||
                this.item.type === "" ||
                this.item.category === "" ||
                this.item.imagePath === ""
            ) {
                this.errorMessage = "Please fill in the required fields!";
            } else if (this.items.indexOf(this.item.name) === -1) {
                this.errorMessage =
                    "Item with the name '" +
                    this.item.name +
                    "' already exists!";
            } else {
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
                axios
                    .post("rest/items/addNewItem", newItem)
                    .then((response) => {
                        this.item = response.data;
                        window.location.reload();
                    });
            }
        },

        cancelAdding: function () {
            window.location.reload();
        },

        deleteItem: function (id) {
            axios
                .post("rest/items/deleteItem", id)
                .then((response) => window.location.reload());
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
});

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
                rating: 0,
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
            imagePath: "",
            count: 0,
            chosenImg: {},
            imageSrc: "",
            images: [],
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
                            <a class="nav-link" href="#item-7" v-if="!isCategoryEmpty('DESSERT')">Desserts</a>
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
            <div class="col-md-7 pl-sm-3 pl-lg-5">
                <!-- Breakfast -->
                <div class="categoryBox" v-if="!isCategoryEmpty('BREAKFAST')">
                <h4 class="mb-3 title" id="item-1">Breakfast</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'BREAKFAST'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of breakfast -->

                <!-- Salads -->
                <div class="categoryBox" v-if="!isCategoryEmpty('SALADS')">
                <h4 class="mb-3 title" id="item-2">Salads</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'SALADS'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of salads -->

                <!-- Pizza -->
                <div class="categoryBox" v-if="!isCategoryEmpty('PIZZA')">
                <h4 class="mb-3 title" id="item-3">Pizza</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PIZZA'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of pizza -->

                <!-- Pasta -->
                <div class="categoryBox" v-if="!isCategoryEmpty('PASTA')">
                <h4 class="mb-3 title" id="item-4">Pasta</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'PASTA'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of pasta -->
                
                <!-- Main dishes -->
                <div class="categoryBox" v-if="!isCategoryEmpty('MAINDISHES')">
                <h4 class="mb-3 title" id="item-5">Main Dishes</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'MAINDISHES'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of main dishes -->

                <!-- Drinks --> 
                <div class="categoryBox" v-if="!isCategoryEmpty('DRINKS')">   
                <h4 class="mb-3 title" id="item-6">Drinks</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DRINKS'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
                </div>
                </div>
                <!-- End of drinks -->

                <!-- Desserts -->
                <div class="categoryBox" v-if="!isCategoryEmpty('DESSERT')">
                <h4 class="mb-3 title" id="item-7">Desserts</h4>
                <div class="card bg-light text-dark mb-4" id="itemAndCommentCards" v-for="item in items" v-if="item.category == 'DESSERT'">
                    <div class="card-body text-start itemBody">
                        <div class="container cardContent text-start">
                            <h1 class="mt-1 mb-3">{{item.name}}</h1>
                            <p class="mb-1">{{item.description}}</p>
                            <div class="more mb-2">
                                <p class="me-2">{{item.type}}</p>
                                <p>·</p>
                                <p class="ms-2">{{item.amount}}</p><p v-if="item.type === 'Food'">g</p>
                                <p v-if="item.type === 'Drink'">ml</p>
                            </div>
                            <p id="price">RSD {{item.price}}</p>

                            <a :href="'#/myRestaurant/editItem?id=' + item.id" class="link">
                                <button type="button" class="btn btn-sm btn-outline-secondary editItem" data-toggle="tooltip" data-placement="bottom" title="Edit item"
                                    style="background: none; width: 3rem">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </a>
                            <button type="button" class="btn ms-1 btn-sm btn-outline-secondary deleteItem" style="background: none; width: 3rem"
                                data-toggle="tooltip" data-placement="bottom" title="Delete item" @click="itemToDelete = item" data-bs-toggle="modal" data-bs-target="#myModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>

                        <div class="image-wrapper mt-2">
                            <img class="img-responsive img-rounded image-wrapper" :src="getImage(item)" alt="Item">
                        </div>
                    </div>
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
                            <p class="ms-2">{{restaurant.rating}}</p>
                        </div>
                    </div>

                    <div class="container d-block mb-3">
                        <h5><b>Address</b></h5>
                        <a href="#myRestaurant" @click="openMap()" id="locationLink" style="color: #7fd2c0;" data-bs-toggle="modal" data-bs-target="#mapModal">
                            {{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
                            {{restaurant.location.address.city}}, {{restaurant.location.address.postcode}} <br>
                            {{restaurant.location.latitude}}, {{restaurant.location.longitude}}
                        </a>
                    </div>

                    <div class="container d-block">
                        <h5><b>Type</b></h5>
                        <p>{{restaurant.type}}</p>
                    </div>

                    <div class="container d-block">
                        <h5><b>Currently:</b></h5>
                        <p style="color: red; text-transform: uppercase">{{restaurant.status}}</p>
                    </div>

                </div>
            </div>
        </div>
        <!-- End of items -->

        <!-- Add item -->
        <div class="row my-5 text-center addItemForm" v-if="showAddItem">
            <div class="col-md-2 me-5"></div>

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
                                    <input class="form-control text-start" type="number" name="lastname" v-model="item.price"/>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Image <span style="color: red;">*</span></td>
                                <td>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input form-control" @change="addImage">
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
                                        <option value="DESSERT">Desserts</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Type <span style="color: red;">*</span></td>
                                <td style="text-indent: 0">
                                    <label style="white-space: nowrap;" class="me-5">
                                        <input type="radio" class="radio" name="type" :checked="item.type == 'Food'"
                                            v-bind:value="'Food'" v-model="item.type">
                                        Food
                                    </label>
                                    <label style="white-space: nowrap">
                                        <input type="radio" class="radio" name="type" :checked="item.type == 'Drink'"
                                            v-bind:value="'Drink'" v-model="item.type">
                                        Drink
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="label">Amount</td>
                                <td>
                                    <input class="form-control text-start" type="number" name="amount" v-model="item.amount"/>
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
                    <div class="row mt-5 mb-5">
                        <div class="col d-inline-flex justify-content-center">
                            <button type="button" class="btn me-4" @click="sendImgToBack()">Save</button>
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
                        <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete this item? This process cannot be undone.</p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn" data-bs-dismiss="modal" @click="deleteItem(itemToDelete)">Confirm</button>
                        <button type="button" class="btn" data-bs-dismiss="modal" style="background: #ecbeb1">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of delete item modal -->

        <!-- Map modal -->
        <div id="mapModal" class="modal fade responsive">
            <div class="modal-dialog modal-dialog-centered modal-map">
                <div class="modal-content">
                    <div class="modal-header flex-column">		
                        <h4 class="modal-title w-100">
                            {{restaurant.location.address.street}}  {{restaurant.location.address.number}} <br> 
                            {{restaurant.location.address.city}} {{restaurant.location.address.postcode}}, {{restaurant.location.address.country}}
                        </h4>	
                        <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-hidden="true"></button>
                    </div>
                    <div class="modal-body">
                        <div id="map"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of map modal -->
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

        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));
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

        alreadyExists(name) {
            for (let i of this.items) {
                if (i.name === name) return true;
            }

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
            } else if (this.alreadyExists(this.item.name)) {
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
                    restaurant: this.restaurant.name,
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

        deleteItem: function (item) {
            axios
                .post("rest/items/deleteItem", JSON.stringify(item), {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((response) => window.location.reload());
        },

        addImage(e) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.imageSrc = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        imageAlreadyExists() {
            for (let i of this.images) {
                if (i.imageCode === this.imageSrc) {
                    return i;
                }
            }

            return null;
        },

        sendImgToBack: function () {
            var image = this.imageAlreadyExists();
            if (image !== null) {
                this.item.imagePath = image.imageId;
                this.addNewItem();
            } else {
                axios
                    .post("rest/images/addNewImage", this.imageSrc, {
                        headers: {
                            "Content-type": "text/plain",
                        },
                    })
                    .then((response) => {
                        this.chosenImg = response.data;
                        this.item.imagePath = this.chosenImg.imageId;
                        this.addNewItem();
                    });
            }
        },

        getImage: function (item) {
            for (let i of this.images) {
                if (i.imageId === item.imagePath) return i.imageCode;
            }

            return "";
        },

        openMap: function () {
            this.count = this.count + 1;

            if (this.count === 1) {
                var map = new ol.Map({
                    target: "map",
                    layers: [
                        new ol.layer.Tile({ source: new ol.source.OSM() }),
                    ],
                    view: new ol.View({
                        center: ol.proj.fromLonLat([
                            this.restaurant.location.longitude,
                            this.restaurant.location.latitude,
                        ]),
                        zoom: 14,
                    }),
                });

                var markers = new ol.layer.Vector({
                    source: new ol.source.Vector(),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: "img/marker.png",
                        }),
                    }),
                });
                map.addLayer(markers);

                var marker = new ol.Feature(
                    new ol.geom.Point(
                        ol.proj.fromLonLat([
                            this.restaurant.location.longitude,
                            this.restaurant.location.latitude,
                        ])
                    )
                );
                markers.getSource().addFeature(marker);

                window.setTimeout(function () {
                    map.updateSize();
                }, 500);
            }
        },
    },
    filters: {
        dateFormat: function (value, format) {
            var parsed = moment(value);
            return parsed.format(format);
        },
    },
    components: {
        swal,
    },
});

Vue.component("edit-item", {
    data: function () {
        return {
            item: {},
            updatedItem: {
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
            items: [],
            errorMessage: "",
            chosenImg: {},
            imageSrc: "",
            images: [],
        };
    },
    template: `
    <!-- Edit item -->
        <div class="row my-5 text-center addItemForm">
            <div class="col-md-2 me-5"></div>

            <div class="col-md-8">
                <h2 class="mb-2" style="text-transform: uppercase;">
                <i class="far fa-edit mb-4 me-4" style="color: #ecbeb1"></i></i>Edit Item
                </h2>
                <form>
                    <div class="row d-flex justify-content-center">
                        <table class="table-responsive addItemTable">
                            <tr>
                                <td>Name <span style="color: red;">*</span></td>
                                <td>
                                    <input class="form-control text-start" type="text" name="name" v-model="updatedItem.name"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Price <span style="color: red;">*</span></td>
                                <td>
                                    <input class="form-control text-start" type="number" name="lastname" v-model="updatedItem.price"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Image <span style="color: red;">*</span></td>
                                <td>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input form-control" @change="addImage">
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Category <span style="color: red;">*</span></td>
                                <td>
                                    <select class="form-select" placeholder="Category" aria-label="Category" v-model="updatedItem.category">
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
                                <td>Type <span style="color: red;">*</span></td>
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
                                <td>Amount</td>
                                <td>
                                    <input class="form-control text-start" type="number" name="amount" v-model="updatedItem.amount"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea style="height: 80px; white-space: normal;" class="form-control text-start" aria-describedby="username"
                                        v-model="updatedItem.description">
                                    </textarea>

                                </td>
                            </tr>
                        </table>
                    </div>
                    <p style="color: red; font-size: small;" class="text-center mt-5">{{errorMessage}}</p>
                    <div class="row mt-5 mb-5">
                        <div class="col d-inline-flex justify-content-center">
                            <button type="button" class="btn me-4" @click="sendImgToBack()">Save</button>
                            <button type="button" class="btn" style="background: #ecbeb1" @click="cancelEditing()">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
        </div>
        <!-- End of edit item -->
    `,
    mounted() {
        axios
            .get("rest/items/getItemById", {
                params: { id: this.$route.query.id },
            })
            .then((response) => {
                this.item = response.data;
                this.updatedItem = {
                    id: this.item.id,
                    deleted: this.item.deleted,
                    name: this.item.name,
                    price: this.item.price,
                    type: this.item.type,
                    amount: this.item.amount,
                    description: this.item.description,
                    imagePath: this.item.imagePath,
                    restaurantId: this.item.restaurantId,
                    category: this.item.category,
                };

                axios
                    .get("rest/items/getItemsForRestaurant", {
                        params: { id: this.item.restaurantId },
                    })
                    .then((response) => (this.items = response.data));
            });

        axios
            .get("rest/images/getAllImages")
            .then((response) => (this.images = response.data));
    },
    methods: {
        alreadyExists(name) {
            for (let i of this.items) {
                if (i.name === name) return true;
            }

            return false;
        },

        addNewItem: function () {
            if (
                this.updatedItem.name === "" ||
                this.updatedItem.price === "" ||
                this.updatedItem.type === "" ||
                this.updatedItem.category === "" ||
                this.updatedItem.imagePath === ""
            ) {
                this.errorMessage = "Please fill in the required fields!";
            } else if (
                this.updatedItem.name !== this.item.name &&
                this.alreadyExists(this.updatedItem.name)
            ) {
                this.errorMessage =
                    "Item with the name '" +
                    this.updatedItem.name +
                    "' already exists!";
            } else {
                axios
                    .post(
                        "rest/items/updateItem",
                        JSON.stringify(this.updatedItem),
                        {
                            headers: {
                                "Content-type": "application/json",
                            },
                        }
                    )
                    .then(
                        (response) =>
                            (window.location =
                                "/FoodDeliveryApp/managerHomePage.html#/myRestaurant/")
                    );
            }
        },

        cancelEditing: function () {
            window.location =
                "/FoodDeliveryApp/managerHomePage.html#/myRestaurant/";
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
            if (this.imageSrc === "") {
                this.addNewItem();
            } else if (image !== null) {
                this.updatedItem.imagePath = image.imageId;
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
                        this.updatedItem.imagePath = this.chosenImg.imageId;
                        this.addNewItem();
                    });
            }
        },
    },
});

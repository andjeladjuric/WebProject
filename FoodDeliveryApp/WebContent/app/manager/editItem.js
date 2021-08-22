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
            errorMessage: "",
        };
    },
    template: `
    <!-- Edit item -->
        <div class="row my-5 text-center addItemForm">
            <div class="col-md-2"></div>

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
                                    <input class="form-control text-start" type="text" name="lastname" v-model="updatedItem.price"/>
                                </td>
                            </tr>
                            <tr>
                                <td>Image <span style="color: red;">*</span></td>
                                <td>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input form-control">
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
                                        <option value="DELIVERED">Desserts</option>
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
                                    <input class="form-control text-start" type="text" name="amount" v-model="updatedItem.amount"/>
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
                    <div class="row mt-5">
                        <div class="col d-inline-flex justify-content-center">
                            <button type="button" class="btn me-4" @click="addNewItem()">Save</button>
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
            });
    },
    methods: {
        addNewItem: function () {
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
        },

        cancelEditing: function () {
            window.location =
                "/FoodDeliveryApp/managerHomePage.html#/myRestaurant/";
        },
    },
});

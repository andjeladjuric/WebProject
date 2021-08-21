Vue.component("edit-item", {
    data: function () {
        return {
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
            errorMessage: "",
        };
    },
    template: `
    <!-- Edit item -->
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
                                <td>
                                    <label>
                                        <input type="radio" name="type" :checked="item.type == 'Food'"
                                            v-bind:value="'Food'" v-model="item.type">
                                        Food
                                    </label>
                                    <label>
                                        <input type="radio" name="type" :checked="item.type == 'Drink'"
                                            v-bind:value="'Drink'" v-model="item.type">
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
                            <button type="button" class="btn" style="background: #ecbeb1">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2"></div>
        </div>
        <!-- End of edit item -->
    `,
});

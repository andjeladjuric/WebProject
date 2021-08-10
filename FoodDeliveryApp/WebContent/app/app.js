let vue = new Vue({
    el: "#vue-restaurants",
    data: {
        restaurants: null,
    },
    mounted() {
        axios
            .get("rest/restaurants/getAll")
            .then((response) => (this.restaurants = response.data));
    },
});

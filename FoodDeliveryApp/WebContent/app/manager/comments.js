Vue.component("comments", {
    template: `
    <div class="row g-2 comments mt-5">
        <!-- Comments -->
        <div class="col-md-2 d-flex"></div>

        <div class="col-md-8 ms-2">
            <h4 class="mb-3" id="item-1">All comments</h4>
            <div class="card bg-light text-dark mb-2" id="itemAndCommentCards"
                style="border-top: 1px solid rgba(124, 124, 124, 0.404);">
                <div class="card-body text-start">
                    <div class="container cardContent text-start">
                        <div class="container mb-2 d-inline-flex userNameAndType">
                            <h1 class="me-2">Petra Jovic</h1>
                            <p class="me-2">·</p>
                            <p>golden user</p>
                        </div>
                        <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure quidem omnis, quae possimus minus. 
                            Autem, sequi! Nobis mollitia nostrum quibusdam voluptates, facilis cupiditate fuga reprehenderit voluptatem! 
                            Amet, id eveniet!</p>
                        <div class="more mb-2">
                            <i class="fas fa-star me-2" style="color: gold;"></i>
                            <p>·</p>
                            <p class="ms-2">5.0</p>
                        </div>

                        <div class="container d-inline-flex buttons p-0">
                            <button type="button" class="btn d-sm-flex me-2" id="allowButton">Allow</button>
                            <button type="button" class="btn d-sm-flex" id="rejectButton">Reject</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card bg-light text-dark mb-4" id="itemAndCommentCards">
                <div class="card-body text-start">
                    <div class="container cardContent text-start">
                        <div class="container mb-2 d-inline-flex userNameAndType">
                            <h1 class="me-2">Petra Jovic</h1>
                            <p class="me-2">·</p>
                            <p>golden user</p>
                        </div>
                        <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure quidem omnis, quae possimus minus. 
                            Autem, sequi! Nobis mollitia nostrum quibusdam voluptates, facilis cupiditate fuga reprehenderit voluptatem! 
                            Amet, id eveniet!</p>
                        <div class="more mb-2">
                            <i class="fas fa-star me-2" style="color: gold;"></i>
                            <p>·</p>
                            <p class="ms-2">5.0</p>
                        </div>

                        <div class="container d-inline-flex buttons p-0">
                            <button type="button" class="btn d-sm-flex me-2" id="allowButton">Allow</button>
                            <button type="button" class="btn d-sm-flex" id="rejectButton">Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md"></div>
        <!-- End of comments -->
    </div>
    `,
});

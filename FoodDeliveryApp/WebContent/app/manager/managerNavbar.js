Vue.component("manager-navbar", {
    template: `
    <div id="navbarManager">
        <nav class="navbar sticky-top navbar-expand-lg bg-light navbar-light">
            <div class="container">
                <a href="#" class="navbar-brand h2 fs-2 m-0">PIXIE Delivery</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navmenu">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link to="/" exact class="nav-link"> Home </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/myRestaurant" exact class="nav-link"> My Restaurant </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/profile" exact class="nav-link"> Profile </router-link>
                        </li>
                        <li class="nav-item">
                            <a href="#logout" class="nav-link">Log Out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    `,
});

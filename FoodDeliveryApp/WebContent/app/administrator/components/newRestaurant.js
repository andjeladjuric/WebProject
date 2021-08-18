Vue.component("restaurant-form",{
    data: function(){
        return{
				step : 1,
				totalSteps : 3,
            
        }
    }
    ,
    template: `
    <div>
	<div class="container-fluid">
        <div class="row">
            <div class="col-lg-6 col-sm-11 mx-auto">
                <div class="card shadow-sm my-3 align-items-center" style="height: 600px;">
                    <form>
						<section v-if="step == 1">
                                <div class="d-flex justify-content-center">
                                    <h4 class="card-title my-5">Restaurant Informations</h4>
                                </div>
                                <div class="d-grid gap-3">
                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Name:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Type:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <select class="form-select">
                                                <option selected>Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-3 mx-auto">
                                            <label class="form-label">Logo:</label>
                                        </div>
                                        <div class="col-8  mx-auto">
                                            <input class="form-control" type="file">
                                        </div>
                                    </div>
                                </div>
                            </section>                        
                        
						<section v-if="step == 2">
                            <div class="d-flex justify-content-center">
                                <h4 class="card-title my-5">Working hours</h4>
                            </div>
                            <div class="d-grid gap-3">
                                <div class="row">
                                    <div class="card shadow-sm bg-light">
                                        <div class="d-grid gap-2">
                                            <div class="row mt-3">
                                                <div class="col-6 mx-auto">
                                                    <div class="form-floating">
                                                        <input type="time" class="form-control">
                                                        <label>Opens at</label>
                                                    </div>
                                                </div>
                                                <div class="col-6 mx-auto">
                                                    <div class="form-floating">
                                                        <input type="time" class="form-control">
                                                        <label>Closes at</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-11">
                                                    <div class="d-flex gap-1">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Mon
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Tue
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox">
                                                            <label class="form-check-label">
                                                                Wed
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Thur
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Fri
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Sat
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Sun
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="card shadow-sm bg-light">
                                        <div class="d-grid gap-2">
                                            <div class="row mt-3">
                                                <div class="col-6 mx-auto">
                                                    <div class="form-floating">
                                                        <input type="time" class="form-control">
                                                        <label>Opens at</label>
                                                    </div>
                                                </div>
                                                <div class="col-6 mx-auto">
                                                    <div class="form-floating">
                                                        <input type="time" class="form-control">
                                                        <label>Closes at</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-11">
                                                    <div class="d-flex gap-1">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Mon
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Tue
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox">
                                                            <label class="form-check-label">
                                                                Wed
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Thur
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Fri
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Sat
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="">
                                                            <label class="form-check-label">
                                                                Sun
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section v-if="step == 3">
							<div class="d-flex justify-content-center">
                                <h4 class="card-title my-5">Choose Manager</h4>
                            </div>
                            
						</section>
						<div class="d-flex justify-content-evenly">
						<button v-if="step != 1" class="btn buttonGroup" @click.prevent="prevStep">Prev</button>
						<button v-if="step != totalSteps" class="btn buttonGroup" @click.prevent="nextStep">Next</button>
						<button v-if="step == totalSteps" class="btn buttonGroup" @click.prevent="submit">Create</button>
					</div>
                    </form>
					
                </div>
            </div>
        </div>
    </div>

	</div>
    
    `,
    methods: {
		nextStep : function()
		{
			this.step++;
		},
		prevStep : function()
		{
			this.step--;
		}
		
    },
});
/**
 * 
 */

Vue.component("app-header", {
	template: ` 
<div>
	<p>Hello from Header</p>
	<nav>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/apartments" exact>Apartments</router-link></li>      
            <li><router-link to="/signup" exact> Sign up </router-link></li>
            <li><router-link to="/login" exact> Log in </router-link></li>
        </ul>
    </nav>
</div>		  
`

});
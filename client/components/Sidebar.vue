<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
            <b-sidebar position="fixed" type="is-white" scroll="clip" mobile="reduce" :fullheight="true" open>
                <div class="p-1">
                    <div class="is-flex is-justify-content-center block">
                        <NuxtLogo />
                    </div>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Dashboard">
                            <b-menu-item  tag="router-link" :to="{path: '/'}" icon="view-dashboard" label="Dashboard"></b-menu-item>
                            <b-menu-item v-if="$auth.user.role === 'admin'" tag="router-link" :to="{path: '/posts'}" icon="book-open-page-variant" label="Posts"></b-menu-item>
                            <b-menu-item v-if="$auth.user.role === 'admin'" tag="router-link" :to="{path: '/users'}" icon="account-box" label="Users"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Actions">
                            <b-menu-item @click="logout" icon="logout" label="Logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>
        </section>
    </div>
</template>
<script>
import NuxtLogo from './NuxtLogo.vue';
export default{
	name: "Sidebar",
	redirect: false,
    components: { NuxtLogo },
	methods:{
		async logout(){
			try {
				await this.$auth.logout()
				this.$router.push({path: '/auth/login'})
			} catch (error) {
				console.log(error)
			}
		}
	},
}
</script>

<style>
.p-1 {
}
 .sidebar-page {
		margin-top: 5px;
	 display: flex;
	 flex-direction: column;
	 width: 100%;
	 min-height: 100%;
	 padding-top: 30px;
}
 .sidebar-page .sidebar-layout {
	 display: flex;
	 flex-direction: row;
	 min-height: 100%;
}
 @media screen and (max-width: 1023px) {
	 .b-sidebar .sidebar-content.is-mini-mobile:not(.is-mini-expand) .menu-list li a span:nth-child(2), .b-sidebar .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li a span:nth-child(2) {
		 display: none;
	}
	 .b-sidebar .sidebar-content.is-mini-mobile:not(.is-mini-expand) .menu-list li ul, .b-sidebar .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li ul {
		 padding-left: 0;
	}
	 .b-sidebar .sidebar-content.is-mini-mobile:not(.is-mini-expand) .menu-list li ul li a, .b-sidebar .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li ul li a {
		 display: inline-block;
	}
	 .b-sidebar .sidebar-content.is-mini-mobile:not(.is-mini-expand) .menu-label:not(:last-child), .b-sidebar .sidebar-content.is-mini-mobile.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-label:not(:last-child) {
		 margin-bottom: 0;
	}
}
 @media screen and (min-width: 1024px) {
	 .b-sidebar .sidebar-content.is-mini:not(.is-mini-expand) .menu-list li a span:nth-child(2), .b-sidebar .sidebar-content.is-mini.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li a span:nth-child(2) {
		 display: none;
	}
	 .b-sidebar .sidebar-content.is-mini:not(.is-mini-expand) .menu-list li ul, .b-sidebar .sidebar-content.is-mini.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li ul {
		 padding-left: 0;
	}
	 .b-sidebar .sidebar-content.is-mini:not(.is-mini-expand) .menu-list li ul li a, .b-sidebar .sidebar-content.is-mini.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-list li ul li a {
		 display: inline-block;
	}
	 .b-sidebar .sidebar-content.is-mini:not(.is-mini-expand) .menu-label:not(:last-child), .b-sidebar .sidebar-content.is-mini.is-mini-expand:not(:hover):not(.is-mini-delayed) .menu-label:not(:last-child) {
		 margin-bottom: 0;
	}
}
 .is-mini-expand .menu-list a {
	 white-space: nowrap;
	 overflow: hidden;
	 text-overflow: ellipsis;
}
.menu-list a{
    font-size: 15px;
}
.menu-label:not(:last-child){
    padding: 0.5em;
}
.b-sidebar .sidebar-content.is-fullheight{
	padding-top: 100px;
}
</style>

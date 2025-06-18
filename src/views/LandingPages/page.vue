<script setup>


</script>


<template>
    <div class="wrap">
        <!-- navbar  -->
        <div class="navbar flex justify-between p-5 ">
            <div class="left">
                <router-link to="/"
                    class="hover:bg-teal-400 px-3 py-1 hover:text-white rounded-sm transition-all duration-300">Cheahun
                    Store</router-link>
            </div>
            <div class="right space-x-5">
                <router-link to="/login"
                    class="hover:bg-teal-400 px-3 py-1 hover:text-white rounded-sm transition-all duration-300">login</router-link>
                <router-link to="/Register"
                    class="hover:bg-teal-400 px-3 py-1 hover:text-white rounded-sm transition-all duration-300">Register</router-link>
            </div>
        </div>


        <!-- hero  -->
        <div class="hero flex justify-between p-5 items-center bg-gradient-to-t from-teal-400/10 to-teal-800 transition-all duration-700  py-50">
            <div
                class="wel text-center text-4xl font-bold hover:text-teal-900 transition-all duration-500 cursor-pointer font-mono text-teal-200 ">
                WELCOME TO MY STORE
            </div>
            <div class="logo text-center -rotate-z-20  m-5 ">
                <span
                    class="bg-teal-300/50 text-9xl hover:bg-teal-900 transition-all duration-500 cursor-pointer rounded-sm backdrop-blur-3xl ">
                    😉
                </span>
            </div>
        </div>


        <!-- card  -->
        <h1 class="font-semibold font-mono text-2xl text-teal-900 text-center my-10 hover:text-teal-400 transition-all duration-500 cursor-pointer">About Infomation</h1>
        <div class="card flex flex-wrap gap-10 justify-center my-10">



            <div
                class="card-c bg-teal-300/30 transition-all duration-500 hover:bg-yellow-500 backdrop-blur-md rounded-xl shadow-lg p-10">
                More Items
            </div>

            <div
                class="card-c bg-teal-300/30 transition-all duration-500 hover:bg-yellow-500  backdrop-blur-md rounded-xl shadow-lg p-10">
                Secured Items
            </div>

            <div
                class="card-c bg-teal-300/30 backdrop-blur-md transition-all duration-500 hover:bg-yellow-500  rounded-xl shadow-lg p-10">
                Flexible Experience
            </div>

            <div
                class="card-c bg-teal-300/30 backdrop-blur-md rounded-xl transition-all duration-500 hover:bg-yellow-500  shadow-lg p-10">
                Best Ecommerce
            </div>
        </div>

        <!-- footer  -->
         <div class="footer my-10 flex justify-center transition-all duration-500">
            <div class="grid grid-cols-2 p-3 ">
                <div class="about">
                    Cheahun Store
                </div>
                <div class="info">copyright by cheahunstore 2025</div>

                 <div class="right space-x-5 my-5">
                <router-link to="/login"
                    class="hover:bg-teal-400 border-1  px-3 py-1 hover:text-white rounded-sm transition-all duration-300">login</router-link>
                <router-link to="/Register"
                    class="hover:bg-teal-400 px-3 border-1 py-1 hover:text-white rounded-sm transition-all duration-300">Register</router-link>
            </div>
            </div>
         </div>
    </div>
</template>
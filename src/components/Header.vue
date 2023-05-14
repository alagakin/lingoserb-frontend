<template>
    <header class="flex items-center justify-between bg-gray-200 py-4 px-6">
        <div class="flex items-center">
            <router-link to="/" class="text-blue-600 font-semibold">
                <img src="logo.png" alt="Logo" class="h-8">
            </router-link>
            <router-link to="/dictionary" class="text-blue-600 font-semibold">Dictionary</router-link>
        </div>
        <div class="flex items-center">
            <div class="mr-4">
                <select class="p-2 border border-gray-300 rounded">
                    <option value="en">English</option>
                    <option value="es">Русский</option>
                </select>
            </div>
            <a href="#" class="text-blue-600">John Doe</a> <!-- Replace with user's name -->
            <a href="#" class="ml-2 text-gray-500">Login</a> <!-- Replace with login link -->
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>
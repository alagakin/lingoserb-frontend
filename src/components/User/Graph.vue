<template>
    <div class="flex">
        <div v-for="month in months" >
            <span v-text="getMonthName(month[0][0])"></span>
            <div class="flex">
                <div v-for="(week, index) in month" :key="index" class="flex flex-col">
                    <GraphDay v-for="day in week" :key="day.date" :day="day" />
                </div>
            </div>

        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import GraphDay from './GraphDay.vue';

export default {
    name: "Graph",
    data() {
        return {
            days: []
        };
    },
    computed: {
        months() {
            const months = [];
            let month = [];
            let currentMonthNumber = null;
            this.weeks.forEach(week => {
                const monthNumber = new Date(week[0].date).getMonth();
                // If a new month starts, push the previous month and start a new month
                if (monthNumber !== currentMonthNumber) {
                    if (month.length > 0) {
                        months.push(month);
                    }
                    month = [];
                    currentMonthNumber = monthNumber;
                }
                month.push(week);
            });
            // Push the last month
            if (month.length > 0) {
                months.push(month);
            }
            return months;
        },
        weeks() {
            const weeks = [];
            let week = [];
            let currentWeekNumber = null;
            this.days.forEach(day => {
                const weekNumber = this.getWeekNumber(day.date);
                // If a new week starts, push the previous week and start a new week
                if (weekNumber !== currentWeekNumber) {
                    if (week.length > 0) {
                        weeks.push(week);
                    }
                    week = [];
                    currentWeekNumber = weekNumber;
                }
                week.push(day);
            });
            // Push the last week
            if (week.length > 0) {
                weeks.push(week);
            }
            return weeks;
        }
    },
    methods: {
        getMonthName(day) {
            const date = new Date(day.date);
            return date.toLocaleString('default', { month: 'short' });
        },  
        getWeekNumber(date) {
            // Create a new Date object from the provided date
            const d = new Date(date);
            // Set the date to the nearest Thursday (day 4)
            d.setDate(d.getDate() + 4 - (d.getDay() || 7));
            // Get the year and the week number
            const year = d.getFullYear();
            const weekNumber = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + 1) / 7);
            return weekNumber;
        },
        fetchData() {
            axios.get(this.$store.getters.getLearningEndpoint + "graph/", { headers: { Authorization: `Token ${this.$store.getters.getToken}` } })
                .then(response => {
                    Object.keys(response.data).forEach(key => {
                        const value = response.data[key];
                        this.days.unshift(value);
                    });
                });
        }
    },
    mounted() {
        this.fetchData();
    },
    components: { GraphDay }
};
</script>
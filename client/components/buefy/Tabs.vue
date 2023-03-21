<template>
    <section>
        <div class="block">
            <b-button label="Set C Language" @click="activeTab = 1" />
        </div>
        <div class="block">
            <b-switch v-model="showPL"> Show Haskell </b-switch>
        </div>
        <b-tabs v-model="activeTab">
            <b-tab-item label="Fortran">
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="C">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

            <b-tab-item :visible="showPL" label="Haskell">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Julia" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activeTab: 0,
            showPL: false
        }
    }
}
</script>

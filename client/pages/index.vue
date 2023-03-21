<template>
  <section>
    <div class="columns ">
      <div class="column">
        <h4 class="title is-4">
          {{ pageTitle }}
        </h4>
        <hr>
      </div>
    </div>
    <h2 class="title is-2"><b>Typography</b></h2>
    <hr>
    <div class="column is-12">
      <h1 class="title is-1">Heading 1</h1>
      <h2 class="title is-2">Heading 2</h2>
      <h3 class="title is-3">Heading 3</h3>
      <h4 class="title is-4">Heading 4</h4>
      <h5 class="title is-5">Heading 5</h5>
      <h6 class="title is-6">Heading 6</h6>
      <p class="paragraph">Paragraph</p>
    </div>
    <hr>
    <h2 class="title is-2"><b>Table</b></h2>
    <hr>
    <div class="column is-12">
      <Table />
    </div>
    <hr>
    <h2 class="title is-2"><b>Collapse</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <PanelCollapse />
      </div>
      <div class="column">
        <CardCollapse />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Steps</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <Steps />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Dialog</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <Dialog />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Messages</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <Message />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Dropdown</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <Dropdown />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Tabs</b></h2>
    <hr>
    <div class="columns">
      <div class="column">
        <Tabs  />
      </div>
    </div>
    <hr>
    <h2 class="title is-2"><b>Autocomplete</b></h2>
    <hr>
    <div class="columns">
      <div class="column is-full">
        <Autocomplete />
      </div>
    </div>
  </section>
</template>

<script>
import Accordian from '~/components/buefy/Accordian.vue';
import CardCollapse from '~/components/buefy/CardCollapse.vue';
import PanelCollapse from '~/components/buefy/PanelCollapse.vue';
import Dialog from '~/components/buefy/Dialog.vue';
import Message from '~/components/buefy/Message.vue';
import Autocomplete from '~/components/buefy/Autocomplete.vue';
import Table from '~/components/buefy/Table.vue';
import Tabs from '~/components/buefy/Tabs.vue';
import Dropdown from '~/components/buefy/Dropdown.vue';
import Steps from '~/components/buefy/Steps.vue';


export default {
  layout: 'dashboard',
  components: { Accordian, CardCollapse, PanelCollapse, Dialog, Message, Autocomplete, Table, Dropdown, Tabs, Steps },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Dashboard content'
        }
      ]
    }
  },
  data() {
    return {
      pageTitle: "Dashboard",
    }
  }
};
</script>

<style >
</style>

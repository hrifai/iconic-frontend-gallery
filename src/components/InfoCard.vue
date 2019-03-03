<template>
  <v-layout justify-center>
    <div class="header">
      <img src="static/ps-logo-mark.png" alt="logo" />
    </div>
    <v-flex xs9>
      <v-card flat>
        <v-card-title class="text-xs-left" id="form" primary-title>
          <h1>Open Banking journey<br><strong>Is more than just implementing APIs</strong></h1>
        </v-card-title>
        <v-layout row>
        <img style="margin-left:50px;margin-bottom:30px;" src="/static/Pyramid.png" usemap="#image-map">
          <map name="image-map">
            <area @click="setModalData(0)" alt="01" title="01" coords="1,314,59,210,117,315" shape="poly">
            <area @click="setModalData(1)" alt="02" title="02" coords="117,316,175,210,59,210" shape="poly">
            <area @click="setModalData(2)" alt="03" title="03" coords="118,316,176,212,233,315" shape="poly">
            <area @click="setModalData(3)" alt="04" title="04" coords="233,315,177,211,292,210" shape="poly">
            <area @click="setModalData(4)" alt="05" title="05" coords="234,316,292,210,349,315" shape="poly">
            <area @click="setModalData(5)" alt="06" title="06" coords="58,209,117,109,175,211" shape="poly">
            <area @click="setModalData(6)" alt="07" title="07" coords="117,108,174,210,233,108" shape="poly">
            <area @click="setModalData(7)" alt="08" title="08" coords="177,211,235,107,290,210" shape="poly">
          </map>
          <h3 style="font-weight: 500;margin-right:80px;margin-left:40px;">APIs is just the tip of the iceberg. Meeting regulatory requirements and market positioning in an API economy mandates a clearly defined strategic architecture, engineering principles and continuous improvements. Adopting a “Design Thinking” approach to address the API pyramid constituents will bridge the divide between a scalable and responsive platform to evolving regulatory requirements and customer needs. Organisations need to consider where their focus lies: <br><br> <li> Is it to be compliant with the regulation (Comply); or</li><li>Alongside compliance, develop a responsive and flexible platform improving existing offerings and support enhanced customer journeys (Digitally Integrated); or</li><li>Adopt a strategy to capitalise on the opportunities and  seize market share by developing new financial/non-financial products and services for customers (Digitally Transformed)</li><br><span style="font-weight: 600">Click on the triangles in the API Pyramid to get more info about each one.</span></h3>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog
      v-model="modalState"
      width="700"
    >
      <v-card class="modaltwo">
        <div class="modalText">
          <h3 v-html="activeInfo"></h3>
          <v-btn style="margin-top:20px;"@click="modalState = false">Close</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import REG from "./register";

export default {
  components: {
    REG
  },
  data() {
    return {
      show: true,
      activeInfo: "",
      modalArray : [
        "<h1>Regulator Partnering</h1><br>Engage in an early dialogue with the regulators and share your opinions.<br>Working with the regulators to understand the nuances and desired outcomes will enable banks to proactively assess impact and propose alternative sustainable solutions.",
        "<h1>Business Change Management</h1><br>The framework that will ensure changes to business process and functions are planned, communicated and resourced appropriately to ensure successful implementation of the OB framework.",
        "<h1>Group Interlock</h1><br>Formation of your ‘house-view’ of  regulations will be based on the internal dialogues with the business, tech SMEs, legal, security and risk. <br><br>Group interlock across end–to-end functions will ensure internal mobilisation of efforts to achieve a common goal.",
        "<h1>Security</h1><br>The threat of fraud is more present with open data source and new/existing fintechs<br><br>Considerations include;<ol><li> Data sharing infrastructure </li><li>Frequency of maintenance</li><li>Segregation of data & Authentication protocols</li><li>Availability of data</li>",
        "<h1>Technology</h1><br>Assessment of API infrastructure and future roadmap ensures;<ol><li>Design & implementation of an API platform can support OB regulatory requirements and is responsive to any future changes,</li><br><li>API infrastructure is scalable to take advantage of internal usage opportunities as well as external API monetisation opportunities.</li>",
        "<h1>Operational Requirements</h1><br>Refers to the operating model setup required to execute on new business processes arising from OB <br><br>These processes should articulate the audit, training, and problem triage processes that will support customers and TPP data requirements",
        "<h1>TPP Support Model</h1><br>Design and implement a TPP support model pre & post-implementation of API solution.<br><br>This includes technical and functional support to ensure there is an issue triage management process to minimise potential negative “noise” from TPPs that could impair the organisation’s branding and reputation.",
        "<h1>Monitoring & Reporting</h1><br>The provisioning of monitoring and reporting capability of API performance, usage and issues will ensure Banks are proactive in providing resolutions quickly.<br><br>Automated reporting, alerts and analytics can help improve the services.\n",
      ],
      modalState: false
    };
  },
  methods:{
    setModalData(n){
      this.activeInfo = this.modalArray[n]
      this.modalState = true
    }
  }
};

</script>

<style scoped>

  #form {
    margin-right: 10%;
    margin-left: 10%;
    text-align: center;
  }

  .modal{
    height:350px;
  }

  .modalText{
    padding-top:30px;
    margin-left:40px;
  }

  #form {
    margin-right: 10%;
    margin-left: 10%;
    text-align: center;
  }

  .header {
    background-color: rgba(23, 15, 14, 0.64);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>

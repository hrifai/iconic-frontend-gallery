<template>
  <div>
    <transition v-if="" name="slide-in-left" mode="out-in">
  <v-layout v-if="showApp" justify-center fill-height>
    <div class="header">
      <img src="/static/ps-logo-mark.png" alt="logo"/>
    </div>
    <v-flex xs6>
      <v-card>
        <v-alert :value="true" color="rgb(74, 17, 57)" type="info">This survey data is collected anonymously</v-alert>
        <v-layout row wrap>
          <v-container id="scroll-target" class="scroll-y inputContainer">
            <v-stepper vertical v-model="e6" v-for="(area, index) in sections" :key="area.name">
              <v-stepper-step color="rgb(74, 17, 57)" :complete="e6 > index+1" :step="index+1">
                <h2>{{area.name}}</h2>
              </v-stepper-step>
              <v-stepper-content :step="index+1">
                <v-stepper v-model="eSect[index]">
                  <v-stepper-header>
                    <template v-for="n in area.questions.length">
                      <v-stepper-step color="rgb(74, 17, 57)" :complete="eSect[index] > n" :key="`${n}-step`" :step="n"></v-stepper-step>
                    </template>
                  </v-stepper-header>
                  <v-stepper-items>
                    <v-stepper-content flat v-for="n in area.questions.length" :key="`${n}-content`" :step="n">
                      <p class="question">Question {{n}}: {{area.questions[n-1].q}}</p>
                      <v-radio-group style="font-size:10px" v-model="area.questions[n-1].a" row >
                        <h3 style="padding-right:10px;">Disagree</h3>
                        <v-flex v-for="s in 3" :key="s">
                          <div @click="nextStepSect(n,  area.questions.length, index)"><v-radio mandatory :label="s-1+''" :value="s-1" ></v-radio></div>
                        </v-flex>
                        <h3 style="padding-left:10px;">Agree</h3>
                      </v-radio-group>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
                <v-btn v-if="e6 !== 1" flat @click="e6 = e6-1"><v-icon>arrow_back</v-icon></v-btn>
                <v-btn color="primary" :disabled="checkArea(area)" v-if="e6!=sections.length" @click="e6 = e6+1;" >Next Section</v-btn>
                <v-btn color="primary" :disabled="checkArea(area)" v-if="e6==sections.length" @click="e6 = e6+1; readyState = true;" >Finish</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-container>
        </v-layout>
        <v-btn absolute bottom left fab @click="handlehome" fab dark color="#4A1139">
          <v-icon dark>home</v-icon>
        </v-btn>
        <v-btn absolute bottom :disabled="!readyState" right @click="postResults()" fab color="green">Go!</v-btn>

      </v-card>
    </v-flex>
  </v-layout>
    </transition>

    <v-dialog v-model="modalState" max-width="500">
      <v-card>
        <v-container>
          <v-card-title class="headline" style="padding:10px;">{{modalTitle}}</v-card-title>
          <v-btn absolute bottom right @click="modalState = false" color="#4A1139" fab>X</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dashboardState" max-width="500">
      <v-card>
        <v-container>
          <v-card-title class="headline" style="padding:10px;">Results</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-layout row wrap v-for="obj in [{result:'good', focus: '', desc: ''},{result:'caution', focus: '', desc: ''},{result:'bad', focus: '', desc: ''}]">

              <v-chip v-if="obj.result == 'good'" color="teal" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                Good
              </v-chip>

              <v-chip v-if="obj.result == 'caution'" color="orange darken-3" text-color="white">
                <v-avatar>
                  <v-icon>outlined_flag</v-icon>
                </v-avatar>
                Caution
              </v-chip>

              <v-chip v-if="obj.result == 'bad'" color="red" text-color="white">
                <v-avatar>
                  <v-icon>clear</v-icon>
                </v-avatar>
                Concern
              </v-chip>

            </v-layout>
          </v-card-actions>
          <v-btn absolute bottom right @click="dashboardState = false" color="#4A1139" fab>X</v-btn>
        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
  import axios from "axios";
  import VStepperContent from "vuetify/lib/components/VStepper/VStepperContent";

export default {
  components: {
    VStepperContent,
  },
  beforeMount(){
  },
  mounted(){
    this.fillDataSections()
  },
  props: {
  },
  data() {
    return {
      sections: {},
      answerFull: [],
      e6: 1,
      e13: 2,
      readyState: false,
      eSubs: null,
      eSect: [],
      infodia: false,
      stepsSubs: [],
      stepsSect: [],
      steps: [],
      activeInfo: "",
      modalState: false,
      dashboardState: false,
      modalTitle: "Some Suggestions...",
      showApp: false
    };
  },
  methods: {
    nextStep(n, totSteps, i) {
      if (n === totSteps) {
      } else {
        this.eSubs[i] = n + 1;
      }
    },
    checkArea(area){
      var count = 0;
      area.questions.forEach(question => {
        if(question.a.length === 0) {
          count++
        }
      });
      if(count > 0){
        return true;
      }
    },
    postResults(){
      var headers = {
        'Content-Type': 'application/json'
      };
      axios.post(
        "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/ResponseData:append?valueInputOption=USER_ENTERED&key=AIzaSyBz_hOf23HuFSOXQfRAOLVu2T-B_Js2aeg", {
          "values": [
            ["s", "s", "d"]
          ]
        }, { "headers": {
            "Authorization": "Basic" + btoa("17946547517-2qj89ja47rth1b58fh6mvj5rvjls2f13.apps.googleusercontent.com" + ":" + "wPonaGjjg7SLpaS7X4QFD_a3")
          }
        }
      ).then((response) => {console.log(response)})
    },
    fillDataSections(){
      this.loadScreen();
      axios
        .get(
          "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'SurveyData'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
        )
        .then(response => {
          console.log(response);
          var temp = [];
          var obj =[];
          //gets unique worktype values
          response.data.values.forEach(m => { if(temp.indexOf(m[0]) === -1){temp.push(m[0])}return temp});

          temp.forEach(e => {
            if(e !== 'section'){
              obj.push({"name":e, "questions":[]});
            }});

          console.log(obj);

          response.data.values.forEach(e => {
            if(e[0] !== 'section'){
              obj.find(m => {if(m.name === e[0]){return m}}).questions.push({"q": e[1], "a" : []})
            }
          });

          this.sections = obj;
          console.log(this.sections)

        }).then(() => {

          setTimeout(() => {this.modalState = false; this.activeInfo = ""}, 500);
          this.showApp = true;

      });
    },
    loadScreen(){
      this.modalTitle = "Loading...";
      this.modalState = true;
    },
    getSum(){
      var sum = 0;
      this.answerFull.map(e => sum+=e);
      this.runningsum = sum;
    },
    handleInfo() {
      this.infodia = true;
    },
    handlehome(){
      window.v.$router.push('/')
    },
    handleExit(){
      this.populateAnswers();
      this.modalState = true;
    },
    nextStepSect(n, totSteps, i) {
      if (n === totSteps) {
      } else {
        this.eSect[i] = n + 1;
      }
    },
    populateAnswers() {
      this.answerFull = [];
      this.sections[this.decodeURL()].map(s => s.questions.map(q => {
      if(typeof(q.a) !== undefined)
        this.answerFull.push(q.a)
    }));
      console.log(this.answerFull)
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    }
  }
};
</script>

<style scoped>

.modalText {
  margin-left: 40px;
}

.inputContainer {
   float: left;
   max-height: 745px;
   z-index: 1;
 }

.question {
  font-size: 17px;
}

.header {
  background-color: rgba(23, 15, 14, 0.64);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-stepper__header > div {
  color: white;
  text-align: center;
  text-decoration: none;
}

.v-stepper--vertical .v-stepper__content .v-stepper__content:not(:last-child) {
  margin: 0px 0px 0px 0px;
  border-width: 0px !important;
  border-style: none !important;
}


@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in-left-enter-active {
  -webkit-animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.slide-out-left-leave-active {
  -webkit-animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}

</style>

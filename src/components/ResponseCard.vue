<template>
  <div>
    <transition v-if="" name="slide-in-left" mode="out-in">
  <v-layout v-if="showApp" justify-center fill-height>
    <div class="header">
      <img src="/static/ps-logo-mark.png" alt="logo"/>
    </div>
    <v-flex xs6>
      <v-card>
        <v-layout row wrap>
          <v-container id="scroll-target" class="scroll-y inputContainer">
            <v-stepper vertical v-model="e6" v-for="(area, index) in sections[teamtype]" :key="area.name">
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
                <v-btn color="primary" :disabled="checkArea(area)" v-if="e6!=sections[teamtype].length" @click="e6 = e6+1;" >Next Section</v-btn>
                <v-btn color="primary" :disabled="checkArea(area)" v-if="e6==sections[teamtype].length" @click="e6 = e6+1; readyState = true;" >Finish</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-container>
        </v-layout>
        <v-btn absolute bottom left fab @click="handlehome" fab dark color="#4A1139">
          <v-icon dark>home</v-icon>
        </v-btn>

        <v-btn absolute :disabled="!readyState" bottom right @click="handleSuggestions()" fab color="green">Go!</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
    </transition>

    <v-dialog v-model="modalState" max-width="500">
      <v-card>
        <v-container>
          <v-card-title class="headline" style="padding:10px;">{{modalTitle}}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <h3>{{suggestionData}}</h3>
          </v-card-actions>
          <v-btn absolute bottom right @click="modalState = false" color="#4A1139" fab>X</v-btn>
        </v-container>
      </v-card>
    </v-dialog>


    <v-dialog v-model="dashboardState" width="800">
      <v-card>
        <v-container>
          <v-card-title class="headline" style="padding:10px;">Areas to Review</v-card-title>
          <v-card-actions style="display: block !important;">
            <v-spacer></v-spacer>

            <h3 style="padding-top:10px;">{{suggestionData}}</h3>

            <v-divider style="margin-top:10px; margin-bottom:10px;"></v-divider>


            <v-layout column wrap>
              <div v-for="resultObj in dashresults">
                <v-chip v-if="resultObj.score === 1" color="orange darken-3" text-color="white"><v-avatar><v-icon>outlined_flag</v-icon></v-avatar>{{resultObj.section}} : {{resultObj.focus}}</v-chip>
                <v-chip v-else color="red darken-3" text-color="white"><v-avatar><v-icon>clear</v-icon></v-avatar>{{resultObj.section}} : {{resultObj.focus}}</v-chip>
              </div>
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
    this.teamtype = this.decodeURL()
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
      focusAreas: [],
      infodia: false,
      stepsSubs: [],
      stepsSect: [],
      steps: [],
      activeInfo: "",
      modalState: false,
      teamtype: "",
      dashboardState: false,
      suggestionData: "",
      modalTitle: "Some Suggestions...",
      runningsum: 0,
      showApp: false,
      dashresults: []
    };
  },
  methods: {
    nextStep(n, totSteps, i) {
      if (n === totSteps) {
        // this.eSubs[i] = 1;
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
    // addQuestion(){
    //   axios.post(
    //     "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/Question%20Bank:append?valueInputOption=USER_ENTERED&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk", {
    //       "values": [
    //         ["s", "s", "d"],
    //       ]
    //     }
    //   )
    //     .then((response) => {console.log(response)})
    // },
    fillDataSections(){
      this.loadScreen();
      // axios
      //   .get(
      //     "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'Question Bank'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
      //   )
      //   .then(response => {
          var response = JSON.parse(localStorage.questions);
          console.log(response);
          var temp = [];
          var obj = {"existing": [], "new": []};

          //gets unique worktype values
          response.values.forEach(m => { if(temp.indexOf(m[1]) === -1){temp.push(m[1])} return temp});

          temp.forEach(e => {
            if(e !== 'section'){
              obj.existing.push({"name":e, "questions":[]});
              obj.new.push({"name":e, "questions":[]});
            }});

          response.values.forEach(e => {
            if(e[0] !== 'teamtype'){
              var focus = [e[3]];
              if(e[3].includes(',')){
                focus = e[3].split(',')
              }
              obj[e[0]].find(m => {if(m.name === e[1]){return m}}).questions.push({"q": e[2], "a" : [], focus: focus})
            }

          });

          this.sections = obj;
          console.log(this.sections);

        // }).then(() => {

          this.modalState = false;
          this.activeInfo = "";
          this.showApp = true;

      // });
    },
    log(a){
      console.log(a);
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
    decodeURL(){
      var url = document.location.href;
      var m = (url.split('?')[1]).substring(1)
      this.teamtype = m;
      return m;
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
        // this.eSect[i] = 1;
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
    },
    countQuestions(s) {
      var count = 0;
      s.questions.forEach(function(sec) {
        count++;
      });
      return count;
    },
    countAnswers(s) {
      var count = 0;
      s.questions.forEach(function(sec) {
        if (sec.answer) {
          count++;
        }
      });
      return count;
    },
    handleSuggestions(){
      this.dashresults = [];
      this.sections[this.teamtype].forEach(section => {
        section.questions.filter(question => question.a.length !== 0).forEach(question => {
          question.focus.forEach(focus => {
            (question.a === 0 || question.a === 1) ? this.dashresults.push({focus: focus, score: question.a, section: section.name}) : ("");
          })
        });
      });
      this.dashresults = [...new Set(this.dashresults)].sort((a,b) => b.score-a.score);

      this.populateAnswers();
      this.getSum();
      this.modalTitle = "Results";

      if(this.teamtype == 'existing') {
        if (this.runningsum <= 19) {
          this.suggestionData = "Lower than 20 = Either you're a new team yet to establish some of these norms, or it's time to align & reset with a new baseline, and reconsider the business and customer value your team exists to realise."
        } else if (this.runningsum > 19 && this.runningsum <= 29){
          this.suggestionData = "20+ Your team are in reasonable shape, but there are lots of improvements that could be made and it will take some time to realise the value you are aiming to realise."
        } else {
          this.suggestionData = "30+ Fantastic, you have a solid foundation to defining and realising value as a team. There are still several ways you can tweak your ways of working and approach to maximise your team's potential even further."
        }
      } else {
        if (this.runningsum <= 19) {
          this.suggestionData = "Lower than 20 = You are in the early stages of conceving a new team, identifying and unlocking value will be an intensive process, start at the beginning and take it step by step."
        } else if (this.runningsum > 19 && this.runningsum <= 29){
          this.suggestionData = "20+ You are in reasonable shape to get started setting up a new team, but it will take some time to step through each of the setup phases before you can unlock and realise customer value."
        } else {
          this.suggestionData = "30+ Fantastic, you have a solid foundation to establish a new team and begin realising value. You are likely to progress through the Ready, Set, XLR8 process more rapidly due to existing data and alignment."
        }
      }

      this.dashboardState = true;

    }
  }
};
</script>

<style scoped>

.layout.column{
    flex-direction: inherit !important;
}

.modalText {
  margin-left: 40px;
}

.primary {
  background-color: rgb(74, 17, 57) !important;
  border-color: rgb(74, 17, 57) !important;
}

.v-stepper__step__step.primary span {
  background-color: rgb(74, 17, 57) !important;
  border-color: rgb(74, 17, 57) !important;
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

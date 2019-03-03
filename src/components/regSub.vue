<template>
  <v-form v-model="valid" ref="form">
    <v-layout  align-end v-for="thisobj in this.items" :key="items.indexOf(thisobj)">

      <v-layout v-if="decodeParams()==='new'">
        <v-combobox
          v-model="thisobj.type"
          @select="thisobj.subtype = ''"
          :items="workTypes"
          label="Work Type"
          color="red"
          :rules="[v => !!v || 'Please enter a worktype']"
          style="padding-right: 20px;"
        ></v-combobox>

        <v-text-field
          label = "Worktype Percentage"
          color = "red"
          v-model="thisobj.typepercent"
          suffix = "%"
          type = "number"
          style="padding-right: 20px;"
        ></v-text-field>
      </v-layout>

      <v-layout v-if="decodeParams()==='existing'">
        <v-combobox
          v-model="thisobj.type"
          @select=" () => {thisobj.subtype = ''; thisobj.typepercent = 0;}"
          :items="workTypes"
          label="Work Type"
          color="red"
          :rules="[v => !!v || 'Please enter a worktype']"
          style="padding-right: 20px;"
        ></v-combobox>

        <v-text-field
          label = "Worktype Percentage"
          v-model="thisobj.typepercent"
          color = "red"
          v-if="isPrevFilled(thisobj)"
          suffix = "%"
          type = "number"
          style="padding-right: 20px;"
        ></v-text-field>

        <v-combobox
            v-model="thisobj.subtype"
            :items="getSubtypes(thisobj)"
            label="Sub Type"
            color="red"
            :disabled="thisobj.type === ''"
            :rules="[v => !!v || 'Please enter a subtype']"
            style="padding-right: 20px;"
        ></v-combobox>
      </v-layout>

      <v-btn absolute right small @click="items.splice(items.indexOf(thisobj),1)" style="float:right;" fab dark color="rgba(74, 17, 57, 0.79)">
        <v-icon dark>remove</v-icon>
      </v-btn>

    </v-layout>

    <v-layout>
      <v-btn absolute fab bottom right @click="runModule();" color="green">Go!</v-btn>
      <div>
        <v-btn absolute bottom left fab @click="handlehome" fab dark color="#4A1139">
          <v-icon dark>home</v-icon>
        </v-btn>
        <v-btn absolute bottom left style="margin-left:70px;"fab @click="items.push({type:'', typepercent: 0 , subtype:'', subtypepercent: 0})" fab dark color="#4A1139">
          <v-icon dark>add</v-icon>
        </v-btn>
      </div>
    </v-layout>

    <v-dialog v-model="modalState" width="800">
      <v-card id="scroll-target" height="400" class="scroll-y inputContainer">
        <div class="modalText">
          <h3 v-html="moduleInfo"></h3>
          <h2>Minimum Viable Team (MVT)</h2>
            <v-data-table :headers="[{text: 'Role',value: 'name'}, {text: 'Work Type',value: 'worktype'},{text: 'Allocation',value: 'type'},{text: 'Allocation %',value: 'allocation'}]" :items="results.mainTeam">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.worktype }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td>
                <td class="text-xs-right">{{props.item.allocation}}</td>
              </template>

            </v-data-table>

          <div v-if="results.supportTeam.length !== 0">
            <h2>Additional Requirements</h2>
            <v-data-table :headers="[{text: 'Role',value: 'name'}, {text: 'Work Type',value: 'worktype'},{text: 'Allocation',value: 'type'},{text: 'Importance %',value: 'allocation'}]" :items="results.supportTeam">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.worktype }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td>
                <td class="text-xs-right">{{props.item.allocation}}</td>
              </template>

            </v-data-table>
          </div>

          <div v-if="results.mainTeam.length !== results.fullTeam.length">
            <h2>Optimized Full Team</h2>
            <v-data-table :headers="[{text: 'Role',value: 'name'}, {text: 'Work Type',value: 'worktype'},{text: 'Allocation',value: 'type'},{text: 'Allocation %',value: 'allocation'}]" :items="results.fullTeam">
              <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.worktype }}</td>
                <td class="text-xs-right">{{ props.item.type }}</td>
                <td class="text-xs-right">{{props.item.allocation}}</td>
              </template>

            </v-data-table>
          </div>

          <v-btn fab bottom color="#4A1139" @click="modalState = false">X</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
  import axios from "axios";

  export default {
    beforeMount(){
      this.decodeParams()
    },
    mounted(){
      this.fillDatabase()
    },
    data: () => ({
      rolesDb: [],
      teamtype: '',
      workTypes: [],
      subtypesDb: [],
      subtypes: [],
      items: [{type:"", typepercent: 0 , subtype:"", subtypepercent: 0}],
      modalState: false,
      moduleInfo: "",
      score: {},
      finalRoles: [],
      results: {mainTeam: [], supportTeam: [], fullTeam: []},
      showCalc: false,
      valid: false,
      parentRecords: {}
    }),
    methods: {
      runModule(){
        this.findOptimal();
        this.modalState = true;
        this.showCalc = true;
      },
      getSubtypes(obj){
         var temp = this.subtypesDb.filter(sub => sub.worktype === obj.type);
         var subtypes = [];
         temp.forEach(sub => {
           subtypes.push(sub.subtype);
         });
         subtypes = [...new Set(subtypes)];
        return subtypes;
      },
      fillDatabase(){
        // axios
          // .get(
            // "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'RoleData'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
          // )
          // .then(response => {
            // var table = response.data.values;
        var table = JSON.parse(localStorage.roleData).values;
            table.forEach(cell => {
              if(!(cell[0] === "worktype")){

                var role = {worktype: cell[0], name: cell[1], type: cell[2], importance: cell[3], allocation: 0};

                switch(role.type){
                  case 'Dedicated' : role.allocation = 100; break;
                  case 'Active' : role.allocation = 50; break;
                  case 'Support' : role.allocation = 25; break;
                }

                this.rolesDb.push(role);

                this.workTypes.push(cell[0]);
              }
            });
            this.workTypes = [...new Set(this.workTypes)];

          // });

        // axios
          // .get(
            // "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'TypeMapping'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
          // )
          // .then(response => {
          //   var table = response.data.values;
        var table = JSON.parse(localStorage.typeMapping).values;
            table.forEach(cell => {
              if(!(cell[0] === "Worktype")){
                this.subtypesDb.push({worktype: cell[0], subtype: cell[1], weight: cell[2]});
                this.subtypes.push(cell[1])
              };
            });
            this.subtypes = [...new Set(this.subtypes)];
          // });
      },
      decodeParams(){
        var url = document.location.href;
        var m = (url.split('?')[1]).substring(1);
        this.teamtype = m;
        return m;
      },
      // old
      findOptimal(){

        //clear from last run
        this.score = {};
        this.finalRoles = [];

        if(this.teamtype === 'new'){

          this.items.forEach(item => {

          var m = this.rolesDb.filter(role => (role.importance >= (100 - item.typepercent)));

            m.forEach(role => {
              role.allocation = Math.ceil(role.allocation * (item.typepercent/100));
            });

            this.finalRoles = this.finalRoles.concat(m);
          });


          var done = []; //used to store data that has been viewed
          var duplicates = []; // used to identify duplicate data

          //iterate through the roles array and populate the done and duplicate array.
          this.finalRoles.forEach(role => {
            if (this.similarRoleExist(done, duplicates, role)) {
              duplicates.push(role)
            } else {
              done.push(role)
            }
          });

          done = [...new Set(done)];

          this.results = {mainTeam : [], supportTeam: [], fullTeam: []};
          this.results.fullTeam = done;
          this.results.mainTeam = done.sort((a,b) => {
            return a.importance - b.importance
          }).slice(0,9);
          this.results.supportTeam = duplicates;

        } else {

          this.items.forEach(item => {
            if(item.typepercent !== 0) {
              this.parentRecords[item.type] = item.typepercent
            }
          });


          // this.items.forEach(item => {
          //   var curr = this.items.indexOf(item);
          //   console.log(this.items[curr]);
          //   var prev = curr - 1;
          //   if(curr !== -1 && curr !== 0 && this.items[curr].type === this.items[prev].type && this.items[curr].typepercent === 0){
          //     this.items[curr]['typepercent'] == this.items[prev].typepercent;
          //   }
          //   console.log(this.items[curr])
          // });

          //iterate over the work and sub work types that have been selected
          this.items.forEach(item => {
            //get the subtype obj from the db (recieved from the google sheets call) matched unique via subtype name
            var subtypeObj = this.subtypesDb.filter(entry => entry.subtype === item.subtype)[0];

            //Add the weights of the individual subtypes to the score for each worktype. Case for exisiting work type or new one
            if(this.score[item.type]){
              this.score[item.type] += subtypeObj.weight;
            } else {
              this.score[item.type] = 0;
              this.score[item.type] += subtypeObj.weight;
            }

            //get the roles that are most relevant to the worktypes based on the importance allocation
            var m = this.rolesDb.filter(role => (role.importance >= (100 - this.score[role.worktype])) && (role.worktype === subtypeObj.worktype));


            m.forEach(role => {
              console.log(role);
              role.allocation = Math.ceil(role.allocation * (this.parentRecords[role.worktype]/100));
            });

            this.finalRoles = this.finalRoles.concat(m);

          });


          var done = []; //used to store data that has been viewed
          var duplicates = []; // used to identify duplicate data

          //iterate through the roles array and populate the done and duplicate array.
          this.finalRoles.forEach(role => {
            if(this.similarRoleExist(done, duplicates, role)){
              duplicates.push(role)
            } else {
              done.push(role)
            }
          });


          done = [...new Set(done)];

          this.results = {mainTeam : [], supportTeam: [], fullTeam: []};
          this.results.fullTeam = done;
          this.results.mainTeam = done.sort((a,b) => {
            return a.importance - b.importance
          }).slice(0,9);
          this.results.supportTeam = duplicates;


        }
      },
      handlehome(){
        window.v.$router.push('/')
      },
      onScroll(e) {
        this.offsetTop = e.target.scrollTop;
      },
      similarRoleExist(done,duplicate,role){
        var name = role.name;
        var flag = false;
        done.forEach(ce => {
          if(ce.name === name){
            flag = true;
          }
        });
        return flag;
      },
      isPrevFilled(thisobj){
        // console.log('here', thisobj);
        // var type = thisobj.type;
        // var flag = true;
        // if(type !== '') {
        //   this.items.forEach(item => {
        //     if (item.type === type) {
        //       flag = false;
        //     }
        //   });
        //   console.log(flag);
        // }
        // return flag;

        var currentindex = this.items.indexOf(thisobj);
        if(currentindex !== 0 && this.items[currentindex].type === this.items[currentindex -1].type) {
            return false;
          } else {
          return true;
          }


        // if(this.parentRecords[thisobj.type]){
        //   return false
        // } else {
        //   return true;
        // }
      }
    }
  };
</script>

<style scoped>

  .v-dialog {
    overflow-y: visible !important;
  }

  .modalText{
    margin-left:20px;
    padding-top: 30px;
  }

</style>

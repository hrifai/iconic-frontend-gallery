<template>
  <v-form v-model="valid" ref="form">
    <v-layout v-for="thisobj in this.items" :key="items.indexOf(thisobj)" row wrap>
      <!--<v-combobox-->
        <!--v-model="thisobj.subtype"-->
        <!--:items="workTypes"-->
        <!--label="Work Type"-->
        <!--color="red"-->
        <!--:rules="[v => !!v || 'Please enter a worktype']"-->
        <!--style="padding-right: 20px;"-->
      <!--&gt;</v-combobox>-->
      <!--old-->
      <v-combobox
        v-model="thisobj.type"
        :items="workTypes"
        label="Work Type"
        color="red"
        :rules="[v => !!v || 'Please enter a worktype']"
        style="padding-right: 20px;"
      ></v-combobox>
      <v-text-field
        color="grey lighten-2"
        v-model="thisobj.importance"
        :rules="[v => !!v || 'Please enter a workload %', v => /\b(0*(?:[1-9][0-9]?|100))\b/.test(v) || 'Value is too large']"
        label="Workload Percentage"
        required
      ></v-text-field>
      <v-btn small @click="items.splice(items.indexOf(thisobj),1)" style="float:right;" fab dark color="rgba(74, 17, 57, 0.79)">
        <v-icon dark>remove</v-icon>
      </v-btn>
    </v-layout>
    <v-layout>
    <v-btn absolute fab bottom right @click="runModule(); modalState = true;" color="green">Go!</v-btn>
      <div>
      <v-btn absolute bottom left fab @click="handlehome" fab dark color="#4A1139">
        <v-icon dark>home</v-icon>
      </v-btn>
      <v-btn absolute bottom left style="margin-left:70px;"fab @click="items.push({subtype:''})" fab dark color="#4A1139">
        <v-icon dark>add</v-icon>
      </v-btn>
      </div>
    </v-layout>
    <v-dialog v-model="modalState" width="700">
      <v-card>
        <div class="modalText">
          <h3 v-html="moduleInfo"></h3>
          <v-btn fab absolute bottom right color="#4A1139" @click="modalState = false">X</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
  import axios from "axios";

  export default {
    beforeMount(){
    },
    mounted(){
      this.fillDatabase()
    },
    data: () => ({
      workTypes: [],
      subtypes: [],
      select:[],
      items: [{subtype:""}],
      modalState: false,
      database: {},
      moduleInfo: "",
      teamtype: '',
      valid: false
    }),
    methods: {
      runModule(){
        this.moduleInfo = this.findOptimal()
      },
      // old
      fillDatabase(){
        axios
          .get(
            "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'RoleData'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
          )
          .then(response => {
            var obj = {};
            response.data.values.forEach(row => {
              if(row[0] !== "" && row[0] !== "worktype"){
                var name = row[0].charAt(0).toUpperCase() + row[0].slice(1);
                  if(!(obj[name])){
                    obj[name] = []
                    obj[name].push({"name": row[1] ,"type": row[2], "importance" : row[3]})
                  } else {
                    obj[name].push({"name": row[1], "type": row[2], "importance": row[3]})
                  }
              }});

            this.workTypes = Object.keys(obj);
            this.database = obj;
          });
      },
      // fillDatabase(){
      //   axios
      //     .get(
      //     "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'TypeMapping'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
      //   )
      //     .then(response => {
      //       response.data.values.forEach(row => {
      //         if(row[1] !== "" && row[1] !== "Subtype") {
      //           this.workTypes.push(row[1]);
      //           this.subtypes.push({worktype: row[0], name: row[1], weight: row[2]})
      //         }
      //       });
      //     });
      //
      //   axios
      //       .get(
      //         "https://sheets.googleapis.com/v4/spreadsheets/1uuu14rO6-qUi4HW1RH4xxYe1SwB5xfi2EGlFf920nPg/values/'RoleData'?valueRenderOption=UNFORMATTED_VALUE&key=AIzaSyCTa5Fb7MbIsTd80K352_HDwEJ4BPyVrtk"
      //       )
      //       .then(response => {
      //         var obj = {};
      //         response.data.values.forEach(row => {
      //           if(row[0] !== "" && row[0] !== "worktype"){
      //             var name = row[0].charAt(0).toUpperCase() + row[0].slice(1);
      //               if(!(obj[name])){
      //                 obj[name] = []
      //                 obj[name].push({"name": row[1] ,"type": row[2], "importance" : row[3]})
      //               } else {
      //                 obj[name].push({"name": row[1], "type": row[2], "importance": row[3]})
      //               }
      //           }});
      //         this.database = obj;
      //       });
      // },
      // old
      findOptimal(){
        var s = "<h1>Required Roles:</h1><br><ul><li>";
        this.items.map(e => {
          var lastimp = parseInt(e.importance);
          var c = 100 - lastimp;
          this.database[e.type].map(r => {
            if(r.importance >= c)
            s+= r.name + '\t' + r.type + '\t' + '</li><li>'
          })
        });
        s = s.slice(0, -4);
        return s;
      },
      // runModule(){
      //   var entries = [];
      //   this.items.map(obj => {
      //     var subobj = this.subtypes.filter(e => e.name === obj.subtype);
      //     entries.push(subobj)
      //   });
      //   console.log(entries);
      //   var finObj = {};
      //   entries.map(sub => {
      //     console.log(sub[0].worktype,sub[0].weight)
      //     if(sub.worktype) {
      //       finObj[sub[0].worktype] += sub[0].weight;
      //     } else {
      //       finObj[sub[0].worktype] = sub[0].weight;
      //     }
      //   });
      //   console.log(finObj)
      //   this.moduleInfo = this.getStringResults(finObj);
      // },
      // getStringResults(obj){
      //
      //   return s;
      // },
      handlehome(){
        window.v.$router.push('/')
      }
    }
  };
</script>

<style scoped>

  .modalText{
    margin-left:20px;
    padding-top: 30px;
  }

</style>

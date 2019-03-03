<template>
  <div>
    <transition name="slide-in-left" mode="out-in">
      <v-layout justify-center fill-height>

        <div class="header">
          <img src="/static/ps-logo-mark.png" alt="logo"/>
        </div>

        <v-flex xs6>
          <v-card dark height="500" >

            <v-container v-if="currentSelect === 'roleData'">
              <h3>Current Role Data</h3>
              <v-data-table :headers="[{text: 'Role',value: 'name'}, {text: 'Work Type',value: 'worktype'},{text: 'Allocation',value: 'type'},{text: 'Allocation %',value: 'allocation'}]" :items="roleDb">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.worktype }}</td>
                  <td class="text-xs-center">{{ props.item.type }}</td>
                  <td class="text-xs-center">{{props.item.importance}}</td>
                  <td class="justify-center layout px-0"><v-icon small class="mr-2" @click="editItem(props.item, roleDb)">edit</v-icon><v-icon small @click="deleteItem(props.item,roleDb)">delete</v-icon></td>
                </template>
              </v-data-table>
            </v-container>

            <v-container v-if="currentSelect === 'subtypeData'">
              <h3>Current Role Data</h3>
              <v-data-table :headers="[{text: 'Work Type',value: 'worktype'},{text: 'Subtype',value: 'Subtype'},{text: 'Weighting',value: 'weighting'}]" :items="typeDb">
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center">{{ props.item.worktype }}</td>
                  <td class="text-xs-center">{{ props.item.Subtype }}</td>
                  <td class="text-xs-center">{{props.item.Weighting}}</td>
                  <td class="justify-center layout px-0"><v-icon small class="mr-2" @click="editItem(props.item, roleDb)">edit</v-icon><v-icon small @click="deleteItem(props.item,roleDb)">delete</v-icon></td>
                </template>
              </v-data-table>
            </v-container>

            <v-container v-if="currentSelect === 'questionData'">
              <h3>Current Role Data</h3>
              <v-data-table :headers="[{text: 'Section',value: 'section'}, {text: 'Question',value: ''},{text: 'Focus Areas',value: 'focusAreas'}]" :items="questionDb">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.section }}</td>
                  <td class="text-xs-left">{{ props.item.question }}</td>
                  <td class="text-xs-left">{{ props.item.focusAreas }}</td>
                  <td class="justify-center layout px-0"><v-icon small class="mr-2" @click="editItem(props.item, roleDb)">edit</v-icon><v-icon small @click="deleteItem(props.item,roleDb)">delete</v-icon></td>
                </template>
              </v-data-table>
            </v-container>

            <v-layout>
              <div style="text-align: center;padding-left:170px;">
                <v-btn color="#4A1139" @click="currentSelect = 'roleData'">Edit Role Data</v-btn>

                <v-btn color="#4A1139" @click="currentSelect = 'subtypeData'">Edit Subtype Data</v-btn>

                <v-btn color="#4A1139" @click="currentSelect = 'questionData'">Edit Questions</v-btn>
              </div>
            </v-layout>

            <v-btn absolute bottom left fab @click="handlehome" fab dark color="#4A1139">
              <v-icon dark>home</v-icon>
            </v-btn>

            <v-btn absolute bottom right fab color="green"><v-icon>done</v-icon></v-btn>

          </v-card>
        </v-flex>

      </v-layout>

      <v-dialog v-model="dialog" max-width="500px">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </transition>
  </div>
</template>

<script>

export default {
  components: {
  },
  beforeMount(){
    this.getSavedData()
  },
  data() {
    return {
      isData: false,
      typeDb: [],
      roleDb: [],
      questionDb: [],
      currentSelect: "roleData",
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },
  methods: {
    handlehome(){
      window.v.$router.push('/')
    },
    getSavedData(){
      var typeMap = JSON.parse(localStorage.typeMapping).values;
      var roleMap = JSON.parse(localStorage.roleData).values;
      var qMap = JSON.parse(localStorage.questions).values;

      typeMap.shift();
      roleMap.shift();
      qMap.shift();

      typeMap.forEach(e => {
        var b = this.arrToTypeObj(e);
        this.typeDb.push(b)
      });

      roleMap.forEach(e => {
        var b = this.arrToRoleObj(e);
        this.roleDb.push(b)
      });

      qMap.forEach(e => {
        var b = this.arrToQuestionObj(e);
        this.questionDb.push(b)
      });

    },
    arrToRoleObj(arr){
      return {
        "worktype": arr[0],
        "name": arr[1],
        "type": arr[2],
        "importance": arr[3]
      }
    },
    arrToTypeObj(arr){
      return {
        "worktype": arr[0],
        "Subtype": arr[1],
        "Weighting": arr[2]
      }
    },
    arrToQuestionObj(arr){
      return {
        "teamtype": arr[0],
        "section": arr[1],
        "question": arr[2],
        "focusAreas": arr[3]
      }
    },
    ObjToArr(obj){
      var a = [];
      Object.keys(obj).forEach(k => {
        a.push(obj[k])
      });
      return a;
    },
    saveData() {
      localStorage.typeMapping = this.getTypeMapObj();
      localStorage.questions = this.getQuestionsObj();
      localStorage.roleData = this.getRolesObj();
    },
    getTypeMapObj(){
      return []
    },
    getQuestionsObj(){
      return []
    },
    getRolesObj(){
      return []
    },
    editItem (item, data) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true
    },
    deleteItem (item, data) {
      const index = this.data.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.data.splice(index, 1)
    },
  }
};
</script>

<style scoped>

.inputContainer {
   float: left;
   max-height: 745px;
   z-index: 1;
 }

.header {
  background-color: rgba(23, 15, 14, 0.64);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

<template>
  <v-layout justify-center>
    <div class="header">
      <img src="/static/ps-logo-mark.png" alt="logo" />
    </div>
    <v-flex xs6>
      <v-card height="300">
        <div id="form">
          <h1>Westpac XLR8 Team Tools</h1>
          <h2 style="padding-left:10px; padding-top:20px;">Are you identifying...</h2>
          <v-flex xs12 sm4 text-xs-left>
            <v-layout wrap>
              <v-btn depressed @click="modalState=true" large color="rgba(74, 17, 57, 0.79)"><v-icon>replay</v-icon> &nbsp New Team/Existing Team Reset Need</v-btn>
              <v-btn depressed @click="modalRes=true" large color="rgba(74, 17, 57, 0.79)"><v-icon>supervisor_account</v-icon> &nbsp Team Resource Model</v-btn>
              <v-btn depressed @click="handleEdit" large color="rgba(74, 17, 57, 0.79)"><v-icon>swap_horiz</v-icon> &nbsp Edit EVALU8 Data</v-btn>
            </v-layout>
          </v-flex>
        </div>
      </v-card>
    </v-flex>

    <v-dialog v-model="modalState" width="290">
      <v-card>
        <v-card-title class="headline">What type of team are you?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgba(74, 17, 57, 0.79)" @click="handleExit('n')" >New</v-btn>
          <v-btn color="rgba(74, 17, 57, 0.79)" @click="handleExit('e')">Existing</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalRes" width="290">
      <v-card>
        <v-card-title class="headline">What type of team are you?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="rgba(74, 17, 57, 0.79)" @click="handleRes('n')" >New</v-btn>
          <v-btn color="rgba(74, 17, 57, 0.79)" @click="handleRes('e')">Existing</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
</template>

<script>

export default {
  data() {
    return {
      modalinfo : "",
      modalState: false,
      modalRes: false
    };
  },
  beforeMount() {
    if(!localStorage.questions){
      this.addLocalStorageData()
    }
  },
  methods: {
    handleNew(){
      window.v.$router.push('register');
    },
    handleForm(){
      window.v.$router.push('survey');
    },
    handleEdit(){
      window.v.$router.push('edit');
    },
    handleExit(s){
      if(s === 'e'){
        window.v.$router.push('/form/?=existing')
      } else {
        window.v.$router.push('form/?=new')
      }
    },
    handleRes(s){
      if(s === 'e'){
        window.v.$router.push('/register/?=existing')
      } else {
        window.v.$router.push('/register/?=new')
      }
    },
    addLocalStorageData(){
      localStorage.questions = JSON.stringify({
        "range": "'Question Bank'!A1:Z1000",
        "majorDimension": "ROWS",
        "values": [
          [
            "teamtype",
            "section",
            "question",
            "focus areas"
          ],
          [
            "existing",
            "Mission",
            "Do your team exist to solve a clearly defined business problem?",
            "A day in the life"
          ],
          [
            "existing",
            "Mission",
            "Do your team exist to satisfy a clearly defined customer need?",
            "Agile frameworks"
          ],
          [
            "existing",
            "Mission",
            "Do you have a clear vision and purpose that can be articulated by stakeholders and team members?",
            "Quarterly, Sprint Flows and Ceremonies"
          ],
          [
            "existing",
            "Mission",
            "Are the team delivering results against measurable business objectives, and are the whole team are aware of those objectives?",
            "Triaging: Anatomy of XLR8 work"
          ],
          [
            "existing",
            "Mission",
            "Does the team transparently communicate on progress, value and quality?",
            "Processing incoming and outgoing work requests"
          ],
          [
            "existing",
            "Plan",
            "Is your plan accessible and visible to stakeholders and the team?",
            "Flow of work"
          ],
          [
            "existing",
            "Plan",
            "Are your initiatives explicitly tied to customer needs (in addition to business objectives)?",
            "Backlog grooming"
          ],
          [
            "existing",
            "Plan",
            "Are solutions generated based on traceable value and research evidence, with \"just enough discovery\" up front?",
            "Sprint planning"
          ],
          [
            "existing",
            "Plan",
            "Does your plan bake in space for testing, learning and iterating, based on how customers interact with your solution?",
            "How to estimate work"
          ],
          [
            "existing",
            "Plan",
            "Is methodical decision making criteria for triaging and prioritising all work (regardless of who requested it)?",
            "Daily stand-up"
          ],
          [
            "existing",
            "Team",
            "Is your team structure cross functional with dedicated core roles and planned instant access to support roles?",
            "Scrum of scrums"
          ],
          [
            "existing",
            "Team",
            "Does your team have all the right roles and skills required to handle relevant work types, from discovery to continuity?",
            "Huddles"
          ],
          [
            "existing",
            "Team",
            "Does the team have the authority to self organise and empowerment to make decisions (especially the Product Owner)?",
            "Team Retrospective"
          ],
          [
            "existing",
            "Team",
            "Does the team have open communication, equal share of voice and a platform to ask questions, share ideas and concerns?",
            "Team health checks"
          ],
          [
            "existing",
            "Team",
            "Do the team view leadership as visible, proactive and an approachable extension of the team (rather than as an escalation)?",
            "Team showcase"
          ],
          [
            "existing",
            "Operating Rhythm",
            "Are the team either co-located, or set up with collaboration and communication tools to work together, apart?",
            "XLR8 Showcase"
          ],
          [
            "existing",
            "Operating Rhythm",
            "Are sprint ceremonies focussed, timely, add value, well attended with regular cadence?",
            "Getting approvals"
          ],
          [
            "existing",
            "Operating Rhythm",
            "Is the team swarming to realise a small slice of tangible customer value, every sprint?",
            "Communications and reporting"
          ],
          [
            "existing",
            "Operating Rhythm",
            "Is estimation measured in story points (Fibonacci) and based on collective team complexity (rather than per-person units of time)?",
            "LT operations meeting"
          ],
          [
            "existing",
            "Operating Rhythm",
            "Are solutions hypothesis driven, validated with customers before putting them into production, and learnings recorded and reflected upon after launch?",
            "Executive operations meeting"
          ],
          [
            "new",
            "Mission",
            "Is there a clearly defined business problem?",
            "XLR8 exec quarterly"
          ],
          [
            "new",
            "Mission",
            "Is the customer need clearly defined?",
            "Tools and resources"
          ],
          [
            "new",
            "Mission",
            "Has a clear vision and purpose been articulated for the new team?",
            "Data sources and owners"
          ],
          [
            "new",
            "Mission",
            "Have business objectives and measurable key results been defined, validated and documented in a way that can be clearly communicated to a team?",
            "Getting help"
          ],
          [
            "new",
            "Mission",
            "Is there an agreed plan to communicate on progress, value and quality transparently?",
            "XLR8 lingo"
          ],
          [
            "new",
            "Plan",
            "Does an accessible and visible plan exist yet?",
            "XLR8 RunBook: Key contacts and feedback"
          ],
          [
            "new",
            "Plan",
            "If initiatives have been defined, are they explicitly tied to customer needs (in addition to business objectives)?",
            "Defining your Strategic Roadmap"
          ],
          [
            "new",
            "Plan",
            "If solutions have been defined or requested, are they based on traceable value and research evidence?",
            "Setting Objectives & Key Results"
          ],
          [
            "new",
            "Plan",
            "If a plan exists, does it allow space for testing, learning and iterating, based on how customers interact with the solution?",
            "Customer-centric measurement"
          ],
          [
            "new",
            "Plan",
            "Is methodical decision making criteria for triaging and prioritising all work established and aligned on with all stakeholders and leadership?",
            "What we measure, and why"
          ],
          [
            "new",
            "Team",
            "Has a cross-functional team structure been established, with core dedicated roles and engagement model agreed by business partners?",
            "Hunting for value: Opportunity spaces"
          ],
          [
            "new",
            "Team",
            "Have work types / workflows been analysed to determine which roles and skills are required to handlework from discovery to continuity?",
            "Hypothesis driven value modelling: DVF"
          ],
          [
            "new",
            "Team",
            "Have steps been taken to ensure the team have empowerments and the authority to self organise?",
            "Solution ideation"
          ],
          [
            "new",
            "Team",
            "Have rituals and norms been established to ensure the team can communicate openly and freely?",
            "Breaking down work into slices of value"
          ],
          [
            "new",
            "Team",
            "Are the leadership able to take on another team and remain visible, proactive and an approachable extension of this new team?",
            "Value-based prioritisation"
          ],
          [
            "new",
            "Operating Rhythm",
            "Have steps been taken to enable the team to be co-located and with collaboration and communication tools to enable Westpac's flexible working policy?",
            "Anatomy of work: Identifying work types"
          ],
          [
            "new",
            "Operating Rhythm",
            "Have sprint ceremonies been designed and aligned on between leadership and coaches, so they can be focussed, timely, add value, well attended with regular cadence?",
            "Defining a \"Minimum viable team\""
          ],
          [
            "new",
            "Operating Rhythm",
            "Will the team be enabled to swarm together in realising slices of tangible customer value each sprint?",
            "Roles & responsibilities"
          ],
          [
            "new",
            "Operating Rhythm",
            "Will estimates be based on collective team complexity of user stories?",
            "Co-creating your team charter"
          ],
          [
            "new",
            "Operating Rhythm",
            "Is a hypothesis driven approach accepted as the methodology for realising value through a test and learn loop?",
            "Initial release planning, backlog grooming & sprint planning"
          ]
        ]
      });
      localStorage.roleData = JSON.stringify({
          "range": "RoleData!A1:AA1003",
          "majorDimension": "ROWS",
          "values": [
            [
              "worktype",
              "name",
              "type",
              "importance"
            ],
            [
              "Strategy",
              "Domain analyst",
              "Dedicated",
              10
            ],
            [
              "Strategy",
              "Business analyst",
              "Dedicated",
              85
            ],
            [
              "Strategy",
              "Planner",
              "Dedicated",
              60
            ],
            [
              "Strategy",
              "CX",
              "Dedicated",
              25
            ],
            [
              "Strategy",
              "Capability",
              "Dedicated",
              75
            ],
            [
              "Strategy",
              "Product manager",
              "Dedicated",
              70
            ],
            [
              "Strategy",
              "Market researcher",
              "Dedicated",
              50
            ],
            [
              "Strategy",
              "Legal and compliance",
              "Active",
              40
            ],
            [
              "Strategy",
              "Change manager",
              "Active",
              80
            ],
            [
              "Campaign",
              "Product owner",
              "Dedicated",
              85
            ],
            [
              "Campaign",
              "Agile coach",
              "Dedicated",
              70
            ],
            [
              "Campaign",
              "Sponsor",
              "Dedicated",
              10
            ],
            [
              "Campaign",
              "Scrum master",
              "Dedicated",
              50
            ],
            [
              "Campaign",
              "Campaign analyst (x2 WBC & SBG)",
              "Dedicated",
              90
            ],
            [
              "Campaign",
              "Marketing manager (Merge with planner in future)",
              "Dedicated",
              85
            ],
            [
              "Campaign",
              "CX",
              "Dedicated",
              60
            ],
            [
              "Campaign",
              "Legal and compliance",
              "Dedicated",
              30
            ],
            [
              "Campaign",
              "Copywriter",
              "Dedicated",
              50
            ],
            [
              "Campaign",
              "Channel",
              "Dedicated",
              60
            ],
            [
              "Campaign",
              "Capability",
              "Active",
              85
            ],
            [
              "Campaign",
              "Mail house",
              "Active",
              20
            ],
            [
              "Campaign",
              "Product manager",
              "Active",
              60
            ],
            [
              "Campaign",
              "Salesforce producer",
              "Active",
              40
            ],
            [
              "Campaign",
              "Brand manager",
              "Active",
              65
            ],
            [
              "Campaign",
              "Agency creative",
              "Active",
              55
            ],
            [
              "Campaign",
              "Producer",
              "Active",
              40
            ],
            [
              "Campaign",
              "NBA producer",
              "Active",
              40
            ],
            [
              "Campaign",
              "Reporting analyst",
              "Active",
              75
            ],
            [
              "Campaign",
              "Planner",
              "Active",
              70
            ],
            [
              "Campaign",
              "Visual designer",
              "Active",
              50
            ],
            [
              "Campaign",
              "Media buyer",
              "Active",
              30
            ],
            [
              "Campaign",
              "Customer care representative",
              "Active",
              80
            ],
            [
              "Campaign",
              "Westpac IT",
              "Active",
              35
            ],
            [
              "Campaign",
              "Distribution",
              "Active",
              45
            ],
            [
              "Campaign",
              "Market researcher",
              "Active",
              75
            ],
            [
              "Optimisation",
              "Campaign analyst",
              "Dedicated",
              80
            ],
            [
              "Optimisation",
              "Marketing manager",
              "Dedicated",
              60
            ],
            [
              "Optimisation",
              "CRO manager",
              "Dedicated",
              45
            ],
            [
              "Optimisation",
              "Optimisation manager",
              "Dedicated",
              90
            ],
            [
              "Optimisation",
              "Reporting analyst",
              "Dedicated",
              85
            ],
            [
              "Optimisation",
              "UX",
              "Active",
              50
            ],
            [
              "Optimisation",
              "Graphic designer",
              "Active",
              50
            ],
            [
              "Optimisation",
              "Legal and compliance",
              "Active",
              80
            ],
            [
              "Optimisation",
              "Copywriter",
              "Active",
              30
            ],
            [
              "Optimisation",
              "Product manager",
              "Active",
              90
            ],
            [
              "Continuity",
              "Agile Coach",
              "Dedicated",
              75
            ],
            [
              "Continuity",
              "Scrum master",
              "Dedicated",
              60
            ],
            [
              "Continuity",
              "Producer",
              "Dedicated",
              70
            ],
            [
              "Continuity",
              "Analyst",
              "Dedicated",
              85
            ],
            [
              "Continuity",
              "Legal and compliance",
              "Dedicated",
              60
            ],
            [
              "Continuity",
              "QA Analyst",
              "Dedicated",
              70
            ],
            [
              "Continuity",
              "Marketing manager",
              "Dedicated",
              70
            ],
            [
              "Continuity",
              "Acquisition manager / optimisation manager",
              "Dedicated",
              50
            ],
            [
              "Continuity",
              "Copywriter",
              "Active",
              40
            ],
            [
              "Continuity",
              "CRO manager",
              "Active",
              40
            ],
            [
              "Continuity",
              "Product manager",
              "Active",
              65
            ],
            [
              "Continuity",
              "Graphic designer",
              "Active",
              35
            ],
            [
              "Continuity",
              "Visual designer",
              "Active",
              35
            ],
            [
              "Continuity",
              "NBA producer",
              "Active",
              55
            ],
            [
              "Continuity",
              "NBA manager",
              "Active",
              60
            ],
            [
              "Continuity",
              "Westpac IT",
              "Active",
              30
            ],
            [
              "Continuity",
              "Salesforce producer",
              "Active",
              10
            ],
            [
              "Continuity",
              "Channel",
              "Active",
              85
            ],
            [
              "Continuity",
              "Mail house",
              "Active",
              20
            ],
            [
              "Continuity",
              "Distribution",
              "Active",
              30
            ],
            [
              "Continuity",
              "Customer care representative",
              "Active",
              80
            ],
            [
              "Capability",
              "Developer",
              "Dedicated",
              85
            ],
            [
              "Capability",
              "Capability",
              "Dedicated",
              95
            ],
            [
              "Capability",
              "Business analyst",
              "Dedicated",
              95
            ],
            [
              "Capability",
              "Westpac IT",
              "Dedicated",
              50
            ],
            [
              "Capability",
              "UX",
              "Dedicated",
              85
            ],
            [
              "Capability",
              "Service designer",
              "Dedicated",
              70
            ],
            [
              "Capability",
              "Legal and compliance",
              "Active",
              20
            ],
            [
              "Capability",
              "CX",
              "Active",
              80
            ],
            [
              "Capability",
              "Marketing manager",
              "Active",
              30
            ]
          ]
        });
      localStorage.typeMapping = JSON.stringify({
          "range": "TypeMapping!A1:Z1014",
          "majorDimension": "ROWS",
          "values": [
            [
              "Worktype",
              "Subtype",
              "Weighting"
            ],
            [
              "Strategy",
              "Research & Analysis",
              75
            ],
            [
              "Strategy",
              "Strategic Planning",
              70
            ],
            [
              "Strategy",
              "Business Case",
              85
            ],
            [
              "Campaign",
              "Personalisation",
              50
            ],
            [
              "Campaign",
              "Communications",
              45
            ],
            [
              "Campaign",
              "Sponsorship / Partnership",
              30
            ],
            [
              "Campaign",
              "Media/Advertising",
              75
            ],
            [
              "Campaign",
              "Landing Page",
              65
            ],
            [
              "Campaign",
              "Offline",
              55
            ],
            [
              "Campaign",
              "Brand",
              80
            ],
            [
              "Optimisation",
              "Experiment",
              70
            ],
            [
              "Optimisation",
              "Enhancement",
              60
            ],
            [
              "Continuity",
              "Regulatory / Compliance",
              30
            ],
            [
              "Continuity",
              "Pricing / Offer",
              45
            ],
            [
              "Continuity",
              "Content Update",
              75
            ],
            [
              "Continuity",
              "SEO Update",
              40
            ],
            [
              "Continuity",
              "Media Release",
              50
            ],
            [
              "Continuity",
              "Error Handling",
              60
            ],
            [
              "Capability",
              "Support ART Build",
              60
            ],
            [
              "Capability",
              "Build Intergration",
              75
            ]
          ]
        });
    }
  }
};
</script>

<style scoped>
#form {
  margin-right: 5%;
  margin-left: 5%;
  padding-top:10px;
  padding-bottom:30px;
  text-align: left;
}

.modalText {
  padding-top:20px;
  padding-left: 40px;
  text-align:center;
}

.v-btn--large{
  padding: 10px !important;
}

.header {
  background-color: rgba(74, 17, 57, 0.79);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

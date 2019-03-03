<template>
  <v-footer
    dark
    absolute
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="grey darken-1 white--text" style="height:48px">
        <h2><strong>Get connected with us at Publicis.Sapient</strong></h2>

        <v-spacer></v-spacer>
        <v-speed-dial
          v-model="fab"
          :top="top"
          :bottom="bottom"
          :right="right"
          :left="left"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
          style="margin-right:50px;"
        >
          <v-btn
            slot="activator"
            v-model="fab"
            :color="buttonColour"
            dark
            fab
            icon
          >
            <!--<v-icon>mail</v-icon>-->
            <v-avatar>
              <v-img src="../../static/logoico light.ico"></v-img>
            </v-avatar>
          </v-btn>
          <v-btn
            v-for="icon in icons"
            :key="icon.iconimg"
            fab
            dark
            small
            icon
            :color="buttonColour"
          >
            <a :href="icon.href" style="text-decoration: none;"><v-icon color="white lighten-1" size="25px">{{ icon.iconimg }}</v-icon></a>
          </v-btn>
        </v-speed-dial>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>

  export default {
    components:{
    },
    data: () => ({
      icons: [
        {
          iconimg: "fas fa-globe",
          href: "https://publicis.sapient.com/en-us/contact.html"
        },
        {
          iconimg: "fas fa-envelope",
          href: "mailto:hanrifai@publicisgroupe.net; van.mac@sapientrazorfish.com"
        },
        {
          iconimg: "fab fa-linkedin",
          href: "https://www.linkedin.com/company/publicis.sapient"
        },
        {
          iconimg: "fab fa-facebook",
          href: "https://www.facebook.com/publicisgroupe/"
        }
      ],
      fab: false,
      direction: "top",
      hover: true,
      top: false,
      right: false,
      bottom: true,
      left: true,
      buttonColour: "#532646",
      transition: 'slide-y-reverse-transition'
    })
  };
</script>

<style scoped>

  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }

</style>

<template>
  <div id="Content">
    <div id="Welcome">
        <div id="WelcomeContent">
            Welcome to MyPetStore!
        </div>
    </div>

    <div id="Main">
      <div id="Sidebar">
        <div id="SidebarContent">
          <router-link :to="{
            name: 'category',
            params: {
              categoryId: 'FISH'
            }  
          }"><img src="./images/fish_icon.gif" /></router-link>
          <br/> Saltwater, Freshwater <br/>

          <router-link :to="{
            name: 'category',
            params: {
              categoryId: 'DOGS'
            }  
          }"><img src="./images/dogs_icon.gif" /></router-link>
          <br/> Various Breeds <br/>

          <router-link :to="{
            name: 'category',
            params: {
              categoryId: 'CATS'
            }  
          }"><img src="./images/cats_icon.gif" /></router-link>
          <br/> Various Breeds, Exotic Varieties <br/>

          <router-link :to="{
            name: 'category',
            params: {
              categoryId: 'REPTILES'
            }  
          }"><img src="./images/reptiles_icon.gif" /></router-link>
          <br/> Lizards, Turtles, Snakes <br/>

          <router-link :to="{
            name: 'category',
            params: {
              categoryId: 'BIRDS'
            }  
          }"><img src="./images/birds_icon.gif" /></router-link>
          <br/> Exotic Varieties 
        </div>
      </div>
            <div id="MainImage">
                <div id="MainImageContent">
                    <map name="estoremap">
                        <area alt="Birds" coords="72,2,280,250" @click="goCategory('BIRDS')" shape="rect"/>
                        <area alt="Fish" coords="2,180,72,250" @click="goCategory('FISH')" shape="rect" />
                        <area alt="Dogs" coords="60,250,130,320" @click="goCategory('DOGS')" shape="rect" />
                        <area alt="Reptiles" coords="140,270,210,340" @click="goCategory('REPTILES')" shape="rect" />
                        <area alt="Cats" coords="225,240,295,310" @click="goCategory('CATS')" shape="rect" />
                        <area alt="Birds" coords="280,180,350,250" @click="goCategory('BIRDS')" shape="rect" />
                    </map>
                    <img height="355" src="./images/splash.gif" align="middle" usemap="#estoremap" width="350" />
                </div>
            </div>
            <div id="Separator">&nbsp;</div>
        </div>
    </div>
</template>

<script>
export default {
  name:'Home',
  methods: {
    goCategory(categoryId){
      this.$router.push({name: 'category', params: { categoryId}});
    }
  },
}
</script>

<style scoped>
  area{
    cursor: pointer;
  }
  
</style>
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import { reqProductListById } from "@/api";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    //组件挂载完毕，通知Vuex发送请求，获取数据，存储到store中
    this.$store.dispatch('categoryList');
    this.$store.dispatch('loginAccount');
  },
}
</script>

<style>
  .sep{
    margin-left: 5px;
    margin-right: 5px;
  }
  body {
    margin: 0ex 10ex 0ex 10ex;
    padding: 0ex;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    font-size: 2ex;
    color: #333;
    background-color: #444;
  }

  pre {
    font-family: "Courier New", Courier, mono;
    font-style: normal;
    background-color: #FFFFFF;
    white-space: pre
  }

  h1 {
    margin: 1ex 0ex 1ex 0ex;
    padding: 0ex;
    line-height: 3ex;
    font-weight: 900;
    color: #666;
  }

  h2 {
    margin: 2ex 0ex 1ex 0ex;
    padding: 0ex;
    line-height: 2ex;
    font-weight: 700;
    color: #444;
  }

  h3 {
    margin: 1ex 0ex 1ex 0ex;
    padding: 0ex;
    line-height: 1.6ex;
    font-weight: 700;
    color: #222;
  }

  p {
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    margin: 0ex 0ex 0ex 0ex;
    padding: 2ex;
  }

  img {
    border: 0;
  }

  li {
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex;
  }

  table {
    border-width: 0;
    empty-cells: show;
  }

  td, th {
    empty-cells: show;
    padding: .3ex .3ex;
    vertical-align: top;
    text-align: left;
    border-width: 0;
    border-spacing: 0;
    background-color: #ececec
  }

  th {
    font-weight: bold;
    background-color: #e2e2e2;
  }

  a, a:visited, a:link {
    color: #039;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
  }

  a:hover {
    color: #69f;
  }

  a.Button, a.Button:link, a.Button:visited {
    padding: .3ex;
    color: #fff;
    background-color: #005e21;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    font-size: 1.5ex;
  }

  a.Button:hover {
    color: #000;
    background-color: #54c07a;
  }

  #Logo {
    width: 23%;
    height: 9ex;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex 0ex 0ex 0ex;
    border-width: 0ex 0ex .3ex 0px;
    border-style: solid;
    border-color: #ccc;
    float: left;
    background-color: #000;
    color: #fff;
    line-height: 9ex;
    height: 9ex;
  }

  body>#Logo {
    height: 9ex;
  }

  #Menu {
    width: 50%;
    height: 9ex;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex 0ex 0ex 0ex;
    border-width: 0ex 0ex .3ex 0px;
    border-style: solid;
    border-color: #ccc;
    float: left;
    background-color: #000;
    color: #eaac00;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    text-align: center;
    line-height: 9ex;
    height: 9ex;
  }

  #Menu, #Menu a, #Menu a:link, #Menu a:visited, #Menu a:hover {
    color: #eaac00;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
  }

  body>#Menu {
    height: 9ex;
  }

  #Search {
    width: 26%;
    height: 9ex;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex 0ex 0ex 0ex;
    border-width: 0ex 0ex .3ex 0px;
    border-style: solid;
    border-color: #ccc;
    float: left;
    text-align: center;
    background-color: #000;
    color: #eaac00;
    line-height: 9ex;
    height: 9ex;
  }

  body>#Search {
    height: 9ex;
  }

  #Search input {
    border-width: .1ex .1ex .1ex .1ex;
    border-style: solid;
    border-color: #aaa;
    background-color: #666;
    color: #eaac00;
    font-size: 100%;
    width: 160px;
    margin-right: 4px;
  }

  #QuickLinks {
    text-align: center;
    background-color: #FFF;
    width: 99%;
  }

  #PoweredBy {
    width: 30%;
    height: 9ex;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex 0ex 0ex 0ex;
    border-width: .3ex 0ex .3ex 0px;
    border-style: solid;
    border-color: #ccc;
    float: left;
    background-color: #000;
    color: #fff;
    line-height: 9ex;
    height: 9ex;
  }

  body>#PoweredBy {
    height: 9ex;
  }

  #Banner {
    width: 69%;
    height: 9ex;
    margin: 0ex 0ex 0ex 0ex;
    padding: 0ex 0ex 0ex 0ex;
    border-width: .3ex 0ex .3ex 0px;
    border-style: solid;
    border-color: #ccc;
    float: left;
    background-color: #000;
    color: #fff;
    line-height: 9ex;
    height: 9ex;
  }

  body>#Banner {
    height: 9ex;
  }

  #Content {
    margin: 0;
    padding: 0ex 0ex 0ex 0ex;
    width: 99%;
    color: #333;
    background-color: #FFF;
    border-width: 0;
  }

  #Separator {
    clear:both;
    margin: 0;
    height:0;
  }

  #Main {
    margin: 0;
    padding: 1ex;
    color: #333;
    background-color: #FFF;
    border-width: 1ex 0ex 2ex 0px;
    border-style: solid;
    border-color: #fff;
  }

  #Sidebar {
    float: left;
    background:inherit;
    width: 30%;
  }

  #MainImage {
    float: left;
    background:inherit;
    text-align:center;
    width: 50%;
  }

  #Catalog {
    padding: 1ex;
    background:white;
    text-align:center;
  }

  #Catalog input[type="submit"]{
    padding: .3ex;
    color: #fff;
    background-color: #005e21;
    text-decoration: none;
    font-family: helvetica, tahoma, arial, verdana, sans-serif;
    font-size: 1.5ex;
    border-width:0;
  }

  #Catalog input[type="submit"]:hover {
    color: #000;
    background-color: #54c07a;
    cursor:pointer;
  }

  #Catalog table{
    margin-left:auto;
    margin-right:auto;
  }

  #BackLink{
    padding: 1ex;
    float: right;
    border-width: .1ex 0ex .1ex 0px;
    border-style: solid;
    border-color: #000;
  }

  #Cart{
    width: 69.99%;
    float: left;
    background-color:#fff;
  }

  #MyList{
    width: 30%;
    float: left;
    background-color:#ccc;
    text-align:left;
  }

  .listOrdersTable{
    margin:0 auto;
  }

  #background{
    color: white;
  }
</style>

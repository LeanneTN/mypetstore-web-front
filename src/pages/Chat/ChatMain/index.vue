<template>
  <div id="Content">
    <div style="height: 2px">
      <span>
        <hr color="black">
        <hr color="black">
      </span>
    </div>
    <div class="imui-center">
      <lemon-imui
        :user="user"
        ref="IMUI"
        width="100%"
        :contextmenu="contextmenu"
        :contact-contextmenu="contactContextmenu"
        :theme="theme"
        :hide-menu="hideMenu"
        :hide-menu-avatar="hideMenuAvatar"
        :hide-message-name="hideMessageName"
        :hide-message-time="hideMessageTime"
        @change-menu="handleChangeMenu"
        @change-contact="handleChangeContact"
        @pull-messages="handlePullMessages"
        @message-click="handleMessageClick"
        @menu-avatar-click="handleMenuAvatarClick"
        @send="handleSend"
      >
        <template #cover>
          <div class="cover">
            <i class="lemon-icon-message"></i>
            <p><b>Community Loadind...</b></p>
          </div>
        </template>
      </lemon-imui>

    </div>
  </div>

</template>


<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import LemonMessageVoice from "./lemon-message-voice";
import QQIMUI from "../qq";
import EmojiData from "@/database/emoji";
Vue.component(LemonMessageVoice.name, LemonMessageVoice);
Vue.component(QQIMUI.name, QQIMUI);

const getTime = () => {
  return new Date().getTime();
};
const generateRandId = () => {
  return Math.random()
    .toString(36)
    .substr(-8);
};
const generateRandWord = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};
//该函数用于生成随机的消息
// const generateMessage = (toContactId = "", fromUser) => {
//   if (!fromUser) {
//     fromUser = {
//       id: "system",
//       displayName: "系统测试",
//       avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg",
//     };
//   }
//   return {
//     id: generateRandId(), //消息的id
//     status: "succeed",  //消息的状态
//     type: "text", //消息的类型
//     sendTime: getTime(),  //消息的发送时间
//     content: generateRandWord(),  //生成随机的消息内容
//     toContactId,  //消息是发送给谁的
//     fromUser, //消息的来源是谁
//   };
// };

const generateMessage = (message) => {
  return {
    id: message.id, //消息的id
    status: message.status,  //消息的状态
    type: message.type, //消息的类型
    sendTime: message.sendTime,  //消息的发送时间
    content: message.content,  //生成随机的消息内容
    toContactId: message.toContactId,  //消息是发送给谁的
    fromUser: message.fromUser, //消息的来源是谁
  };
};

export default {
  name: "ChatMain",
  data() {
    return {
      //当前用户的信息
      user: {},

      //messages
      messages: [],

      //以下的属性没有用，但不要改
      theme: "default", //主题
      contextmenu: [],  //在聊天框右击鼠标的菜单选项
      hideMenuAvatar: false,  //是否隐藏菜单的图像
      hideMenu: false,        //是否隐藏菜单
      hideMessageName: false, //是否隐藏消息名
      hideMessageTime: true,  //是否隐藏消息时间

      //在群和好友界面鼠标右击时的选项菜单
      contactContextmenu: [
        {
          text: "删除该聊天",
          click: (e, instance, hide) => {
            const { IMUI, contact } = instance;
            IMUI.updateContact({
              id: contact.id,
              lastContent: null,
            });
            if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
            hide();
          },
        },
        {
          click(e, instance, hide) {
            const { IMUI, contact } = instance;
            IMUI.removeContact(contact.id);
            if (IMUI.currentContactId == contact.id) IMUI.changeContact(null);
            hide();
          },
          color: "red",
          text: "删除好友",
        },
      ],
    };
  },
  computed:{
    ...mapState({
      //注入state参数
      loginAccount: state=>state.account.loginAccount,
    })
  },
  //挂载函数
  mounted() {
    //首先初始化用户信息
    this.user.id = this.loginAccount.username;
    this.user.displayName = this.loginAccount.username;
    this.user.avatar = '';

    console.log(this.user);

    this.creatSocket();
    this.eventMsg();

    //group是聊天室
    const group = {
      id: "group",
      displayName: "公共聊天室",
      avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
      index: "[1]群组",
      unread: 0,
      lastSendTime: 0,
      lastContent: '',
    };

    const { IMUI } = this.$refs;
    let contactList = [group];
    //初始化联系人
    IMUI.initContacts(contactList);
    //初始化表情，文件上传，图片
    IMUI.initEditorTools([
      {
        name: "emoji",
      },
      {
        name: "uploadFile",
      },
      {
        name: "uploadImage",
      },
      {
        name: "test1",
        click: () => {
          IMUI.$refs.editor.selectFile("application/vnd.ms-excel");
        },
        render: () => {
        },
      },
      {
        name: "test1",
        click: () => {
          IMUI.initEditorTools([{ name: "uploadFile" }, { name: "emoji" }]);
        },
        render: () => {
        },
      },
      {
        name: "test2",
        isRight: true,
        title: "上传 Excel",
        click: () => {
        },
        render: () => {
        },
      },
    ]);
    IMUI.initEmoji(EmojiData);
  },
  methods: {
    //实例化websocket
    creatSocket() {
      let that = this;
      if ("WebSocket" in window) {
        //实例化websocket	 
        that.ws = new WebSocket("ws://localhost:8088/api/chat");
        //保存设置全局websocket对象
        that.$global.setWs(that.ws);
        //监听websocket连接打开方法
        that.ws.onopen = function() {
          console.log("打开websocket")
        }
        //监听websocket错误方法
        that.ws.onerror = function(ev) {
          console.log("连接已出错...");
            //延迟执行重连
            setTimeout(() => {
              that.creatSocket();
            }, that.$global.delay);
        };
        //监听websocket关闭方法
        that.ws.onclose = function(ev) {
          // 关闭 websocket
          console.log("连接已关闭...");
          //延迟执行重连
          setTimeout(() => {
            that.creatSocket();
          }, that.$global.delay);
        };
        //监听websocket接收消息事件（接收来自服务器的实时消息）
        that.ws.onmessage = function(res) {
          console.log("App.vue收到服务器内容", res.data);
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },

    //当接收到消息时的处理
    eventMsg(){
      let that = this;
      this.$global.ws.onmessage = (res) => {
        let message = JSON.parse(res.data);
        console.log(message);
        console.log(message.content);
        this.contactList = [];
        const { IMUI } = this.$refs;
        //这证明是一条广播消息（某某上线了）
        if(message.toContactId == null && message.fromUser == null){
          for(let contactData of message.content){
            //联系人列表进行添加
            IMUI.appendContact(contactData);
          }
        }
        //其他统统按照普通消息处理
        else{
          console.log('我收到了消息');
          console.log(message);

          // const msg = {
          //   id: message.id,
          //   status: message.status,
          //   type: message.type,
          //   sendTime: message.sendTime,
          //   content: message.content,
          //   toContactId: message.toContactId,
          //   fromUser:{
          //     id: message.fromUser.id,
          //     displayName: message.fromUser.displayName,
          //     avatar: message.fromUser.avatar,
          //   }
          // };

          this.messages.push(message);
          console.log(message);
          IMUI.appendMessage(message, true);
          console.log(IMUI.getMessages());
          console.log(this.messages);
        }
      }
    },

    scrollToTop() {
      document.body.scrollIntoView();
    },
    //当左上角的头像被点击时该函数执行（可以后续拓展）
    handleMenuAvatarClick() {
      console.log('左上角的头像被点击了');
    },
    //用来重发消息（基本没什么用）
    handleMessageClick(e, key, message, instance) {
      console.log("点击了消息", e, key, message);

      if (key == "status") {
        instance.updateMessage({
          id: message.id,
          status: "going",
          content: "正在重新发送消息...",
        });
        setTimeout(() => {
          instance.updateMessage({
            id: message.id,
            status: "succeed",
            content: "发送成功",
          });
        }, 2000);
      }
    },

    //追加一条消息
    appendMessage(msg) {
      const { IMUI } = this.$refs;
      const message = generateMessage(msg);
      message.fromUser = {
        ...message.fromUser,
        ...this.user,
      };
      IMUI.appendMessage(message, true);
    },

    //更换查看的聊天记录框
    handleChangeContact(contact, instance) {
      console.log("Event:change-contact");
      instance.updateContact({
        id: contact.id,
        unread: 0,
      });
      instance.closeDrawer();
    },

    //进行发送消息(即send按钮的回调事件)，后期可以与websocket结合
    handleSend(message, next, file) {
      console.log('发送按钮被点击了');
      console.log(message);
      message.status = 'succeed';
      this.ws.send(JSON.stringify(message));
      const { IMUI } = this.$refs;
      console.log(IMUI.getMessages());
    },

    //此函数用于生成若干消息，后期可以从服务器获取
    handlePullMessages(contact, next) {
      console.log("我在获取历史消息...");
      const { IMUI } = this.$refs;
      const historyMessages = [];
      for(let msg of this.messages){
        if(msg.toContactId == contact.id){
          historyMessages.push(msg);
        }
      }
      next(historyMessages, true);
    },

    //更换菜单
    handleChangeMenu() {
      console.log("Event:change-menu");
    },
  },
};
</script>


<style lang="stylus" scoped>
::selection{background:#000;color:#fff;}
body
  font-family "Microsoft YaHei"
  background #f6f6f6 !important
#Content
  width 98.8%
  .scroll-top
    cursor pointer
    position fixed
    bottom 40px
    left 50%
    border-radius 50%
    background #fff
    font-size 18px
    overflow hidden
    width 40px
    height 40px
    line-height 40px
    user-select none
    text-align center
    transform rotate(-45deg) translateX(-50%)
    box-shadow 0 0 30px rgba(0,0,0,0.1);
    &:hover
      font-size 22px
a
  color #0c5ed9
  text-decoration none
  font-size 12px
.action
  margin-top 20px
  .lemon-button
    margin-right 10px
    margin-bottom 10px
.link
  font-size 14px
  margin-top 15px
  a
    display inline-block
    margin 0 5px
    text-decoration none
    background #ffba00
    border-radius 4px
    padding 5px 10px
    color rgba(0,0,0,0.8)
.logo
  position relative
  display inline-block
  margin 60px auto
  user-select none
.logo-text
  font-size 38px
.logo-sub
  font-size 18px
  color #999
  font-weight 300
.logo-badge
  position absolute
  top -10px
  left 230px
  background #000
  border-radius 16px
  color #f9f9f9
  font-size 12px
  padding 4px 8px
.title
  font-size 24px
  line-height 26px
  border-left 1px solid #ffba00
  padding-left 15px
  margin-bottom 15px
  margin-top 30px
  user-select none
.table
  width 100%
  border-radius 10px
  background #fff
  border-collapse collapse
  tr
    cursor pointer
  tr:not(.table-head):hover
    background #ffba00 !important
  tr:nth-of-type(even)
    background #f9f9f9
  th
    user-select none
    color #999
  td,
  th
    text-align left
    padding 10px 15px
    font-size 14px
    font-weight normal
.imui-center
  .lemon-wrapper
    border:1px solid #ddd;
  .lemon-drawer
    border:1px solid #ddd;
    border-left:0;
.drawer-content
  padding 15px
.more
  font-size 12px
  line-height 24px
  height 24px
  position absolute
  top 14px
  right 14px
  cursor pointer
  user-select none
  color #f1f1f1
  display inline-block
  border-radius 4px
  background #111
  padding 0 8px
  &:active
    background #999
.bar
  text-align center
  line-height 30px
  background #fff
  margin 15px
  color #666
  user-select none
  font-size 12px
.cover
  text-align center
  user-select none
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)
  i
    font-size 84px
    color #e6e6e6
  p
    font-size 18px
    color #ddd
    line-height 50px
.article-item
  line-height 34px
  cursor pointer
  &:hover
    text-decoration underline
    color #318efd
pre
  background #fff
  border-radius 8px
  padding 15px
.lemon-simple .lemon-container{
  z-index:5
}
.lemon-simple .lemon-drawer{
  z-index:4
}



input#switch[type=checkbox]{
	height: 0;
	width: 0;
	display:none;
}

label#switch-label {
	cursor: pointer;
	text-indent: -9999px;
	width: 34px;
	height: 20px;
	background: #aaa;
	display: block;
	border-radius: 100px;
	position: relative;
}

label#switch-label:after {
	content: '';
	position: absolute;
	top: 2px;
	left: 2px;
	width: 16px;
	height: 16px;
	background: #fff;
	border-radius: 20px;
	transition: 0.3s;
}

input#switch:checked + label {
	background: #0fd547;
}

input#switch:checked + label:after {
	left: calc(100% - 2px);
	transform: translateX(-100%);
}

label#switch-label:active:after {
	width: 20px;
}
</style>
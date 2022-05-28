<template>
  <div id="Content">
    <div class="imui-center">
      <lemon-imui
        :user="user"
        width="100%"
        ref="IMUI"
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
import Vue from "vue";
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
const generateMessage = (toContactId = "", fromUser) => {
  if (!fromUser) {
    fromUser = {
      id: "system",
      displayName: "系统测试",
      avatar: "http://upload.qqbodys.com/allimg/1710/1035512943-0.jpg",
    };
  }
  return {
    id: generateRandId(), //消息的id
    status: "succeed",  //消息的状态
    type: "text", //消息的类型
    sendTime: getTime(),  //消息的发送时间
    content: generateRandWord(),  //生成随机的消息内容
    toContactId,  //消息是发送给谁的
    fromUser, //消息的来源是谁
  };
};

export default {
  name: "ChatMain",
  data() {
    return {
      //这个属性没用
      theme: "default",

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

      //在聊天界面鼠标右击时的选项菜单（暂时删除）

      //以下属性不要修改
      hideMenuAvatar: false,
      hideMenu: false,
      hideMessageName: false,
      hideMessageTime: true,
      
      //当前用户的信息，后期可以通过vuex获取
      user: {
        id: "1",
        displayName: "June",
        avatar: "",
      },
    };
  },
  //挂载函数
  mounted() {
    //contactData1~4是消息记录，后期也可以发送ajax请求获取
    const contactData1 = {
      id: "contact-1",
      displayName: "工作协作群",
      avatar: "http://upload.qqbodys.com/img/weixin/20170804/ji5qxg1am5ztm.jpg",
      index: "[1]群组",
      unread: 0,
      lastSendTime: 1566047865417,
      lastContent: "2",
    };
    const contactData2 = {
      id: "contact-3",
      displayName: "铁牛",
      avatar: "http://upload.qqbodys.com/img/weixin/20170803/jiq4nzrkrnd0e.jpg",
      index: "T",
      unread: 32,
      lastSendTime: 3,
      lastContent: "你好123",
    };
    const contactData3 = {
      id: "contact-4",
      displayName: "如花",
      avatar:
        "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4275424924,2201401076&fm=111&gp=0.jpg",
      index: "",
      unread: 1,
      lastSendTime: 3,
      lastContent: "吃饭了嘛",
    };

    //获取聊天框这个元素
    const { IMUI } = this.$refs;
    setTimeout(() => {
      IMUI.changeContact("contact-1");
    }, 500);

    IMUI.setLastContentRender("event", message => {
      return `[自定义通知内容]`;
    });

    let contactList = [
      { ...contactData1 },
      { ...contactData2 },
      { ...contactData3 },
      //...Array(100).fill(contactData1)
    ];

    //初始化消息记录
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

    //初始化第一个消息记录部分
    // const { SimpleIMUI } = this.$refs;
    // contactData1.id = "11";
    // SimpleIMUI.initContacts([contactData1]);
    // SimpleIMUI.initEmoji(EmojiData);
    // SimpleIMUI.changeContact(contactData1.id);
  },
  methods: {
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
    appendMessage() {
      const { IMUI } = this.$refs;
      const contact = IMUI.currentContact;
      const message = generateMessage("contact-3");
      message.fromUser = {
        ...message.fromUser,
        ...this.user,
      };
      IMUI.appendMessage(message, true);
    },

    handleChangeContact(contact, instance) {
      console.log("Event:change-contact");
      instance.updateContact({
        id: contact.id,
        unread: 0,
      });
      instance.closeDrawer();
    },
    
    handleSend(message, next, file) {
      console.log(message, next, file);
      setTimeout(() => {
        next();
      }, 1000);
    },
    handlePullMessages(contact, next, instance) {
      const otheruser = {
        id: contact.id,
        displayName: contact.displayName,
        avatar: contact.avatar,
      };
      setTimeout(() => {
        const messages = [
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, this.user),
          generateMessage(instance.currentContactId, otheruser),
          {
            ...generateMessage(instance.currentContactId, this.user),
            ...{ status: "failed" },
          },
        ];
        let isEnd = false;
        if (
          instance.getMessages(instance.currentContactId).length +
            messages.length >
          11
        )
          isEnd = true;
        next(messages, isEnd);
      }, 500);
    },
    handleChangeMenu() {
      console.log("Event:change-menu");
    },
    openCustomContainer() {},
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
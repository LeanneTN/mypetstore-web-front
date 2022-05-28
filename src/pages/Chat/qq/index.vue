<script>
import UserData from "@/database/user";
import ContactsData from "@/database/contacts";
import MessagesData from "@/database/message";
import EmojiData from "@/database/emoji";
export default {
  name: "QqImui",
  components: {},
  data() {
    return {};
  },
  render() {

  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const IMUI = this.$refs.IMUI;
    IMUI.initContacts(ContactsData);
    IMUI.changeContact(13);
  },
  methods: {
    openDrawer(position) {
      const IMUI = this.$refs.IMUI;
      const params = {
        position,
        render: contact => {

        },
      };
      if (position == "center") {
        params.width = "50%";
        params.height = "50%";
      } else if (position == "rightInside") {
        params.height = "90%";
        params.offsetY = "10%";
      }
      IMUI.openDrawer(params);
    },
    handlePullMessages(contact, next) {
      next(MessagesData[contact.id], true);
    },
    handleChangeContact() {},
    handleSend(message, next, file) {
      console.log(message, next, file);
      setTimeout(() => {
        next();
      }, 1000);
    },
  },
};
</script>

<style lang="stylus">
.slot-group
  width 170px
  border-left 1px solid #ddd;
  height 100%
  box-sizing border-box
  padding 10px
  .slot-search
    margin 5px 0
.slot-group-notice
  color #999
  padding 6px 0
  font-size 12px
.slot-group-title
  font-size 12px
.slot-group-member
  font-size 12px
  line-height 18px
.slot-group-menu span
  display inline-block
  cursor pointer
  color #888
  margin 4px 10px 0 0
  border-bottom 2px solid transparent;
  &:hover
    color #000
    border-color #333
.slot-contact-fixedtop
  padding 10px
  border-bottom 1px solid #ddd
.slot-search
  width 100%
  box-sizing border-box
  font-size 14px
  border 1px solid #bbb
  padding 5px 10px
</style>
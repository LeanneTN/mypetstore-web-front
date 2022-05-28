<script>
export default {
  name: "lemonMessageVoice",
  inheritAttrs: false,
  inject: ["IMUI"],
  render() {

  },
};
</script>
<style lang="stylus">
.lemon-message.lemon-message-voice {
  user-select: none;

  .lemon-message__content {
    border: 2px solid #000;
    font-size: 12px;
    cursor: pointer;

    &::before {
      display: none;
    }
  }
}
</style>

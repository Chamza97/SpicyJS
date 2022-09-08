$(document).ready(function () {
  $(".chat_on").click(function () {
    $(".Layout").toggle();
    $(".chat_on").hide(300);
  });

  $(".chat_close_icon .Messenger_prompt").click(function () {
    $(".Layout").hide();
    $(".chat_on").show(300);
  });

  $(".Messenger_header").click(function () {
    $(".Layout").hide();
    $(".chat_on").show(300);
  });
});


jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный формат почты",
});

jQuery(document).ready(function($){
  $('#cw_form').validate({
    rules: {
      email: {
        email: true
      }
    },
    submitHandler: function(form,event) {
      event.preventDefault();
      $(form).find('button').attr('disabled',true);
      
      $.ajax({
        url:'/chicken-lovers/mail/send.php',
        method:'POST',
        data:$(form).serialize(),
        success: function() {
          CW.$data.isWin = false;
          CW.$data.isSended = true;
        }
      })
    }
  })
});
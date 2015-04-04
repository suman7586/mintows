jQuery(function() {
  jQuery('.error').hide();
  jQuery(".button").click(function() {
		// validate and process form
		// first hide any error messages
    jQuery('.error').hide();
		
	  var name = jQuery("input#name").val();
		if (name == "") {
      jQuery("span#name_error").show();
      jQuery("input#name").focus();
      return false;
    }
	  var email = jQuery("input#email").val();
	  if (email == "") {
      jQuery("span#email_error").show();
      jQuery("input#email").focus();
      return false;
    }
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailReg.test(email)) {
	jQuery("span#email_error2").show();
    jQuery("input#email").focus();
      return false;
	}
	
	var subject = jQuery("input#subject").val();
	
	  var msg = jQuery("textarea#msg").val();
	  if (msg == "") {
	  jQuery("span#msg_error").show();
	  jQuery("textarea#msg").focus();
	  return false;
    }
		  var captcha = jQuery("input#captcha").val();
		if (captcha == "") {
      jQuery("span#captcha_error").show();
      jQuery("input#captcha").focus();
      return false;
    }
		var dataString = 'name='+ name + '&email=' + email + '&subject=' + subject + '&msg=' + msg;
		//alert (dataString);return false;
		
	  jQuery.ajax({
      type: "POST",
      url: "http://wrctec.com/androidApi/mintowsAPI/process.php",
      data: dataString,
      success: function(response) {
          var json=jQuery.parseJSON(response);
          if(json.code==100){
              //message='We will be in touch soon';
              message=json.msg;
              
          }else{
              //message=response+ " please try again";
              message=json.msg;
          }
                jQuery('#contactform').html("<div id='message'></div>");
                jQuery('#message').html("<strong>Contact Form Submitted!</strong>")
                .append("<p>"+message+"</p>")
                .hide()
                .fadeIn(1500, function() {
                  jQuery('#message');
                });
      }
     });
    return false;
	});
});


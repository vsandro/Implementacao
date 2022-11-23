<?php
session_start();
include("Functions.php");
$Functions = new Functions();

$session=$Functions->checkValidToken();

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<title>I NEED</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1"> 
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css' /> 
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link href='https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet' type='text/css' /> 
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png">
	<link rel="manifest" href="favicon/site.webmanifest">	

</head>

<body>

	<div class="container mt-5">
		<div class="d-flex justify-content-center h-100" style="overflow:hidden; padding:5px">
			<div class="formContent" id="formContentLogin">
				<!-- Icon -->
				<div class="first">
					<img src="logo.png" class="p-3 d-block m-auto" style="width:35%">
					<h1 class="mb-3 mt-4">LOGIN </h1>
				</div>
				<!-- Login Form -->
				<form method="post" id="form_login">
					<div id="status" style="width:85%; margin:auto; margin-bottom: 5px;"></div>
					<input type="text" id="username" class="second zero-raduis" name="username" placeholder="username">
					<input type="password" id="password" class="third zero-raduis" name="password" placeholder="password">
					<div id="formFooter">
						<a class="underlineHover"  style=" white-space: nowrap;  overflow: hidden;" href="#"></a>
					</div>
					<input type="submit" class="fourth  btn_login zero-raduis" value="login">
					<h2 style="display:block; white-space: nowrap;  overflow: hidden;">You don't have a account ?</h2>
					<input type="button" class="fourth  zero-raduis pc"  id="btn_change_to_register" value="register">
				</form>
			</div>
			<div  class="formContent" id="formContentRegister" style="display:none">
				<!-- Icon -->
				<div class="first">
					<img src="logo.png" class="p-3 d-block m-auto" style="width:35%">
					<h1 class="mb-3 mt-4  style=" white-space: nowrap;  overflow: hidden;">SIGN IN</h1>
				</div>
				<!-- Login Form -->
				<form method="post" id="form_register">
					<div id="status_register" style="width:85%; margin:auto; margin-bottom: 5px;"></div>
					<input type="text" id="username_register" class="second zero-raduis" name="username_register" placeholder="username">
					<input type="password" id="password_register" class="third zero-raduis" name="password_register" placeholder="password">
					<div id="formFooter">
						<a class="underlineHover"  style=" white-space: nowrap;  overflow: hidden;" href="#"></a>
					</div>
					<input type="submit" class="fourth  btn_login zero-raduis" value="Register">
					<h2  style=" white-space: nowrap;  overflow: hidden;">Already have a account ?</h2>
					<input type="button" class="fourth  zero-raduis pc" id="btn_change_to_login" value="Login">
				</form>
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"
		integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
	<script>
		$(document).ready(function (e) {
 
			$("#btn_change_to_register").click(function(){ 
				$("#formContentRegister").animate({width:'toggle'},350); 
				$("#formContentLogin").animate({width:'toggle'},350);
			});
			$("#btn_change_to_login").click(function(){ 
				$("#formContentLogin").animate({width:'toggle'},350); 
				$("#formContentRegister").animate({width:'toggle'},350);
			});

			$("#form_login").submit(function (event) {
				event.preventDefault();
				$.ajax({
					type: "POST",
					url: "rpc.php",
					dataType: 'json',
					data: { 
						username: $('#username').val(), 
						password: $('#password').val(),
						op: "login"
					},
					success: function (data) {
						if(data.status=="success"){ 
							window.location.href = "reserved.php";
						}else{
							$("#status").text(data.description);
							$("#status").addClass("alert");
							$("#status").addClass("alert-danger");
							$("#status").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).hide(); });
						}
					} 
				}).done(function (data) {
				});
			});


			$("#form_register").submit(function (event) {
				event.preventDefault();
				$.ajax({
					type: "POST",
					url: "rpc.php",
					dataType: 'json',
					data: { 
						username: $('#username_register').val(), 
						password: $('#password_register').val(),
						op: "register"
					},
					success: function (data) {
						if(data.status=="success"){ 
							$("#btn_change_to_login").trigger("click");
							$("#status").text(data.description);
							$("#status").addClass("alert");
							$("#status").addClass("alert-success");
							$("#status").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).hide(); });
						}else{
							$("#status_register").text(data.description);
							$("#status_register").addClass("alert");
							$("#status_register").addClass("alert-danger");
							$("#status_register").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).hide(); });
						}
					} 
				}).done(function (data) {
				});
			});


		});
	</script>
</body>

</html>
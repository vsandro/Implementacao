<?php
session_start();
include("Functions.php");
$Functions = new Functions();
$session=$Functions->checkValidToken();
if($session==0){
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>RESERVED AREA - I NEED</title>
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

	<div class="container-fluid ">
		<div class="row">
			<div class="col-12 mt-3">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Kibana</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Desbloquar utilizadores</a>
				</li>
			</ul><!-- Tab panes -->
			<div class="tab-content">
				<div class="tab-pane active" id="tabs-1" role="tabpanel">
					<iframe width="100%" style="height:100vh" frameBorder="0" src="http://127.0.0.1:5601/goto/3ddb02691eae45f453668c6a2bf3f1ae" title=""></iframe>
				</div>
				<div class="tab-pane" id="tabs-2" role="tabpanel">
					<div class="container mt-5">
						<div class="d-flex justify-content-center h-100" style="overflow:hidden; padding:5px">
							<div class="formContent" id="formContentLogin">
								<!-- Icon -->
								<div class="first">
									<img src="logo.png" class="p-3 d-block m-auto" style="width:35%">
									<h1 class="mb-3 mt-4">UNLOCK USERS</h1>
								</div>
								<!-- Login Form -->
								<form method="post" id="form_unlock">
									<div id="status" style="width:85%; margin:auto; margin-bottom: 5px;"></div>
									<input type="text" id="username" class="second zero-raduis" name="username" placeholder="username">
									
									<input type="submit" class="fourth  btn_login zero-raduis" style="margin-bottom:5px" value="Unlock">  
									<input type="button" class="fourth  btn_login zero-raduis" id="logout" value="Logout">  
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
		
	<script src="https://code.jquery.com/jquery-2.2.4.min.js"
		integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"  crossorigin="anonymous"></script>
		
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

			$("#form_unlock").submit(function (event) {
				event.preventDefault();
				$.ajax({
					type: "POST",
					url: "rpc.php",
					dataType: 'json',
					data: { 
						username: $('#username').val(),  
						op: "unlock"
					},
					success: function (data) {
                        $("#status").text(data.description);
                        $("#status").addClass("alert");
						if(data.status=="success"){
							$("#status").addClass("alert-success");
						}else{ 
							$("#status").addClass("alert-danger");
						}
                        $("#status").first().hide().fadeIn(200).delay(2000).fadeOut(1000, function () { $(this).hide(); });
					} 
				}).done(function (data) {
				});
			});

            $("#logout").click(function (event) {
				event.preventDefault();
				$.ajax({
					type: "POST",
					url: "rpc.php",
					dataType: 'json',
					data: {  
						op: "logout"
					},
					success: function (data) { 
                        window.location.href = "reserved.php";
                    }
			    });
            });

            




		});
	</script>
</body>

</html>
<?php
session_start(); 

include("Functions.php");
$Functions = new Functions();

//LOGIN
if(isset($_POST["op"]) && $_POST["op"]=="login"){
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://localhost:3000/login',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "username": "'.$_POST["username"].'",
            "password": "'.$_POST["password"].'"
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
    ));
    $response = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE); 

    if($httpcode=="200" && $response){
        $data=$Functions->decode(str_replace('"', '', $response));
        if(isset($data) && is_array($data) && $data["username"]){ 
            $status="success";
            $description="";
            $session=$Functions->createSession($data);
        }else{
            $status="error";
            $description="Invalid token";
        }
    }else{
        $description="Error getting token";
        $response=json_decode($response);
        if($response->message){
            $description=$response->message;
        }
        $status="error";
    }  
    echo json_encode(array(
        "status"=>$status,
        "description"=>$description,
    ));
}

//REGISTER
if(isset($_POST["op"]) && $_POST["op"]=="register"){
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://localhost:3000/user',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "username": "'.$_POST["username"].'",
            "password": "'.$_POST["password"].'"
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
    ));
    $response = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE); 
    $response=json_decode($response);

    if($httpcode=="200" && $response){
        if(isset($response->username) && $response->username!="" ){ 
            $status="success";
            $description="User created successfull";
        }else{
            $description="Error registering user 1";
            $status="error";
            if($response->message){
                $description=$response->message;
            }
        }
    }else{
        $description="Error registering user 2";
        $status="error";
        if($response->message){
            $description=$response->message;
        }
    }  
    echo json_encode(array(
        "status"=>$status,
        "description"=>$description,
    ));
}

//UNLOCK
if(isset($_POST["op"]) && $_POST["op"]=="unlock"){

    $playload["username"]=$_SESSION["username"];
    $playload["exp"]=$_SESSION["exp"];
    $playload["iat"]=$_SESSION["iat"];
    $playload["sub"]=$_SESSION["sub"];

    $token=$Functions->encode($playload);  
   

    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://localhost:3000/unlock',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
            "username": "'.$_POST["username"].'"
        }', 
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json',
            'Authorization: Bearer '.$token,
        ),
    ));
    $response = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE); 
 
    $response=json_decode($response); 
    if($httpcode=="200" && $response){
        if(isset($response->return) && $response->return=="Ok" ){ 
            $status="success";
            $description="User unlocked";
        }else{
            $description="Error when trying to unlock user";
            $status="error";
            if($response->message){
                $description=$response->message;
            }
        }
    }else{
        $description="Error when trying to unlock user";
        $status="error";
        if($response->message){
            $description=$response->message;
        }
    }  
    echo json_encode(array(
        "status"=>$status,
        "description"=>$description,
    ));
}



//LOGOUT
if(isset($_POST["op"]) && $_POST["op"]=="logout"){
    session_destroy(); 
    echo json_encode(array(
        "status"=>"success"
    ));
}
?>
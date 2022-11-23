<?php



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
    "username": "claudio",
    "password": "123456"
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));
curl_setopt($curl, CURLOPT_HEADER, true);
$response = curl_exec($curl);
print_r($response);

print_r(curl_error($curl));

curl_close($curl);

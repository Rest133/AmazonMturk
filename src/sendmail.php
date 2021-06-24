<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'assets/phpmailer/src/Exception.php';
require 'assets/phpmailer/src/PHPMailer.php';
require 'assets/phpmailer/src/SMTP.php';

$username = $_POST['username']
$phone = $_POST['phone']

$mail = new PHPMailer(true);
$mail->CharSet = "UTF-8";

$mail->isSMTP();                            //Set PHPMailer to use SMTP.
$mail->Host = "smtp.gmail.com";             //Set SMTP host name
$mail->SMTPAuth = true;                     //Set this to true if SMTP host requires authentication to send email
$mail->IsHTML(true)

$mail->Username = "testserver403@gmail.com";//Provide username and password
$mail->Password = "klcWqe5Hs8hj";
$mail->SMTPSecure = "tls";                  //If SMTP requires TLS encryption then set it
$mail->Port = 587;                          //Set TCP port to connect to

$mail->From = "testserver403@gmail.com";
$mail->FromName = "testserver403@gmail.com";

$mail->addAddress("fyestafyesta@gmail.com");

$mail->Subject = "Form from RoboTurk";
$mail->Body = "<h3>${$username}</h3> <br> Phone: ${$phone}";

try {
    $mail->send();
    echo "Message has been sent successfully";

} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}
<?php
    //------------------------------------SEND EMAIL
    $to = 'helpdesk@madstudios.net';
    $subject = "I'd like to know more about MAD Studios Co.";
    $headers = "From: MAD Studios Co. Website\r\n";
    $headers .= "Reply-To: helpdesk@madstudios.net\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    
    $user_name = strip_tags($_POST['user_name']);
    $user_email = strip_tags($_POST['user_email']);
    $user_industry = strip_tags($_POST['user_industry']);
    $user_challenge = strip_tags($_POST['user_challenge']);
    $user_orig_challenge = strip_tags($_POST['user_orig_challenge']);
    $mad_answer = strip_tags($_POST['mad_answer']);
    
    $message = '<html><body>';
    $message .= '<table rules="all" width="600" border="0" style="border:0; font-family: Verdana, Arial, sans-serif; margin:20px auto 0 auto;" cellpadding="0">';
    $message .= '<tr style="background-color: #ffc627;">';
    $message .= '<td width="600" style="border:0; border-bottom: 1px solid #333e48; padding:28px;"><img style="width:127px;height:42px;" src="http://dev.madstudios.net/kelsey/projects/madstudios/web/images/corporate/png/header-logo-mad@2x.png" /></td></tr><table>';
    $message .= '<table rules="all" width="600" border="0" style="border:0; font-family: Verdana, Arial, sans-serif; margin:0 auto;" cellpadding="0">';
    $message .= '<tr style="background-color: #333e48; "><td width="600" style="border:0; border-top: 5px solid #ffa227; color:#ffffff; font-size:10px; padding:0 28px 12px 28px; line-height:13px;"><p style="width:400px;"><br/>A MAD Studios website visitor would like some help.  Please see the information they entered below.</p></td>';
    $message .= '</tr></table>';
    $message .= '<table rules="all" width="600" border="0" style="border:0; background-color: #e7ebf3; border-bottom: 1px solid #333e48; font-family: Helvetica, Arial, sans-serif; margin:0 auto;" cellpadding="0"><tr>';
    $message .= '<td width="200" style="border:0; padding:28px; font-size:14px; font-weight:bold; color:#333e48; vertical-align:top; text-align:left;">';
    if(!empty($user_name) && trim($user_name) != ""){ $message .= 'Name: <br/><br/>'; }
    if(!empty($user_email) && trim($user_email) != ""){ $message .= 'Email: <br/><br/>'; }
    if(!empty($user_industry) && trim($user_industry) != ""){ $message .= 'Industry: <br/><br/>'; }
    if(!empty($user_challenge) && trim($user_challenge) != ""){ $message .= 'Business Challenge: <br/><br/>'; }
    if(!empty($user_orig_challenge) && trim($user_orig_challenge) != ""){ $message .= 'Original Challenge Entered: <br/><br/>'; }
    if(!empty($mad_answer) && trim($mad_answer) != ""){ $message .= 'MAD Answer: <br/><br/>'; }
    $message .= '</td>';
    $message .= '<td width="600" style="border:none; padding: 28px; font-size:14px; color:#333e48; vertical-align:top;">';
    if(!empty($user_name) && $user_name != ""){ $message .= ($user_name . '<br/><br/>'); }
    if(!empty($user_email) && $user_email != ""){ $message .= ('<a href="mailto:' . $user_email . '" style="color:#797979; text-decoration:none;">' . $user_email . '</a><br/><br/>'); }
    if(!empty($user_industry) && trim($user_industry) != ""){ $message .= ($user_industry . '<br/><br/>'); }
    if(!empty($user_challenge) && trim($user_challenge) != ""){ $message .= ($user_challenge . '<br/><br/>'); }
    if(!empty($user_orig_challenge) && trim($user_orig_challenge) != ""){ $message .= ($user_orig_challenge . '<br/><br/>'); }
    if(!empty($mad_answer) && trim($mad_answer) != ""){ $message .= ($mad_answer . '<br/><br/>'); }
    $message .= '</td>';
    $message .= '</tr>';
    $message .= '</table>';
    $message .= '</body></html>';
    
    @mail($to, $subject, $message, $headers);
?>
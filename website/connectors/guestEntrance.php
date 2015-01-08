<?php
session_start();
$_SESSION['guestKey'] = rand() + rand();
echo $_SESSION['guestKey'];
//INSERT INTO `iris`.`Users` (`id`, `name`, `password`, `zipcode`, `streetname`, `housenumber`, `created`, `lastactiontime`) VALUES (NULL, 'carlo', SHA1('mamma11'), '', '', '0', '0000-00-00 00:00:00', CURRENT_TIMESTAMP);

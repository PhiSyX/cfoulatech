<?php

/* TP1:

c. Une page Reset Sessions avec comme titre RESET qui servira d’arrêter toutes
   les sessions.

 */

session_start();
session_unset();

header("Location: ./session-debug.php");
exit();

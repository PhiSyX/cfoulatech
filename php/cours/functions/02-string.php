<?php

$rev = strrev("Bonjour");
echo $rev;
echo "<hr>";

$count = strlen($rev);
echo $count;
echo "<hr>";

$lower = strtolower($rev);
echo $lower;
echo "<hr>";

$upper = strtoupper($rev);
echo $upper;
echo "<hr>";

$escape = htmlspecialchars("<script>alert(1)</script>");
echo $escape;
echo "<hr>";

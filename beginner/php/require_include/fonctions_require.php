<?php

function add(float $l, float $r): float
{
    return $l + $r;
}

function sub(float $l, float $r): float
{
    return $l - $r;
}

function mul(float $l, float $r): float
{
    return $l * $r;
}
function div(float $l, float $r): float
{
    return $l / $r;
}

function is_women(string $gender): bool
{
    return strtolower($gender) === "femme";
}

function is_adult(int $age): bool
{
    return $age >= 18;
}

function average(float $l, float $r): float
{
    return add($l, $r) / 2;
}

function yes_or_no(string $sentence): bool
{
    while (true) {
        $response = readline($sentence . " - (o)ui/(n)on : ");

        if ($response === "o") {
            return true;
        } elseif ($response === "n") {
            return false;
        }
    }
}

function calc(float $l, float $r, int $op): float
{
    switch ($op) {
        case 1:
            return add($l, $r);

        case 2:
            return sub($l, $r);

        case 3:
            return mul($l, $r);

        case 4:
            return div($l, $r);
    }
}
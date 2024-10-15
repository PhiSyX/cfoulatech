<?php

function hello1(string $name = null)
{
    if ($name === null) {
        return "Hello World";
    }
    return "Hello $name";
}

function hello2(string $name = "World")
{
    return "Hello $name";
}

function hello3(string $name = null)
{
    $n = $name;
    $n ??= "World";

    if ($name === null) {
        //...
    }

    return "Hello $n";
}

echo hello1();
echo "\n";
echo hello1("Mike");

echo "\n";
echo "\n";

echo hello2();
echo "\n";
echo hello2("Mike");

echo "\n";
echo "\n";

echo hello3();
echo "\n";
echo hello3("Mike");

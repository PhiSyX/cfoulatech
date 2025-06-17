<?php

class DaoImplement implements DaoInterface
{
    public function getData(): float
    {
        echo "Version Base de données\n";
        $temp = 23;
        return $temp;
    }
}

<?php

function instruction(string $text, mixed $data = null, bool $input = false, bool $output = false)
{
    $trimmed_text = trim($text);
    $instruction = <<<INSTRUCTION
    .-------------.
    | Instruction |
    '-------------'

        $trimmed_text
    \n
    INSTRUCTION;

    if ($data) {
        $json = json_encode($data);
        $instruction .= <<<INSTRUCTION
        .---------.
        | Données |
        '---------'

            $json
        \n
        INSTRUCTION;
    }

    if ($input) {
        $instruction .= <<<INSTRUCTION
        .--------------------.
        | Saisie utilisateur |
        '--------------------'
        \n
        INSTRUCTION;
    }

    if ($output) {
        $instruction .= display_output();
    }

    return $instruction;
}

function display_output()
{
    return <<<INSTRUCTION
    .--------.
    | Sortie |
    '--------'
        \n
    INSTRUCTION;
}

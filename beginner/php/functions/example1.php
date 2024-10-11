<?php

function vendeur($produit, $montant)
{
    $info_produit = trouve_moi_les_info_du_produit($produit);

    $diff = $info_produit["prix"] - $montant;

    if ($montant >= $info_produit["prix"]) {
        return $diff;
    } else if ($diff >= 1) {
        return "Il te manque $diff euros euros";
    } else {

        return "Il te manque $diff euros centimes";
    }
}

function trouve_moi_les_info_du_produit($produit)
{
    // $info_en_base_données = requête_mysql(
    //     "SELECT * FROM produits WHERE nom_produit = :nom LIMIT 1",
    //     [":nom" => $produit]
    // );
    // 
    // Exemple des info de produit que l'on pourrait récupérer de cette requête plus haut.
    $info_en_base_données = [
        "id" => 3000,
        "nom_produit" => "Chips",
        "prix" => 1.5,
    ];

    return $info_en_base_données;
}

$monnaie = vendeur("Chips", 3);

if ($monnaie === 1.5) {
    echo "J'ai acheté des Chips à 1.5€";
}

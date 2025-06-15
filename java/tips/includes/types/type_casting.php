<details id="casting" open>
    <summary>Conversion</summary>

    <p>
        Lorsqu'un la capacité mémoire d'un type est plus grande qu'un
        autre type, la capacité mémoire est tronquée par la taille
        maximale du plus petit type. <br>
        Exemple :
    </p>

    <pre><code class="language-java">
short km = 300;            // Bits: 0b0000000100101100
byte kmMax = (byte)km;     // Bits:         0b00101100
                           // Positions:        5 32
                           // Calcul de: (2**2) + (2**3) + (2**5)
System.out.println(kmMax); // = 44</code></pre>
    </code></pre>
</details>
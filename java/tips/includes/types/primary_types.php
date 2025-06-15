<details id="primitive-types" open>
    <summary>Les types primitifs</summary>
    <p>Types essentiels intégrés au cœur du langage.</p>

    <ul>
        <li>
            Un type <code>booléen</code> représente une valeur qui
            ne peut être que <code>true</code> ou
            <code>false</code>. <br />
            Une valeur booléenne équivaut à <strong>1 bit</strong>,
            soit <code>1</code> pour <code>true</code> soit
            <code>0</code> pour <code>false</code> mais est aligné
            sur <strong>1 byte</strong> car le processeur ne peut
            pas adresser quoi que ce soit de plus petit qu'un octet.

            <br />

            <pre><code class="language-java">bool isTruthy = true;
bool isFalsy = false;</code></pre>

            <div class="mem spaced">
                <div class="type"><small>8 bits</small></div>
                <div class="visual type-boolean bytes">
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit">0</div>
                    <div class="bit bit-enabled">1</div>
                </div>
            </div>
        </li>

        <li>
            <p>
                Un type <code>byte</code> représente une valeur
                numérique entier allant de <code>-128</code> à
                <code>127</code>, soit 255 possibilités et correspond à
                <strong>8 bits</strong> en mémoire, soit
                <strong>1 octet</strong>.
            </p>

            <p>Comment est représenté un entier en mémoire ?</p>

            <p>Chaque bit actif (= <code>1</code>) est calculé avec une
                puissance de 2.</p>

            <div class="mem spaced">
                <div class="visual bytes">
                    <div class="bit">2**7</div>
                    <div class="bit">2**6</div>
                    <div class="bit">2**5</div>
                    <div class="bit">2**4</div>
                    <div class="bit">2**3</div>
                    <div class="bit">2**2</div>
                    <div class="bit">2**1</div>
                    <div class="bit">2**0</div>
                </div>
            </div>

            <p>
                La somme de tous les bits actifs dans un nombre binaire
                donne la valeur décimale de ce nombre.
                <br>
                Exemple:
            </p>

            <div class="f-size=12px">
                <div class="mem">
                    <div class="visual bytes">
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit bit-enabled">1</div>
                    </div>
                </div>
                <span class="mid">=</span>
                <div class="mem">
                    <div class="visual bytes">
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">2**6</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">2**4</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">2**2</div>
                        <div class="bit bit-enabled">2**1</div>
                        <div class="bit bit-enabled">2**0</div>
                    </div>
                </div>
                <span class="mid">=</span>
                <output>87</output>
            </div>

            <p>
                Le dernier bit (le plus à gauche), permet de représenter
                un positif ou un négatif.

                <br>

                Exemple:
            </p>

            <div class="flex f-size=12px">
                <div class="mem">
                    <div class="visual bytes">
                        <div class="bit bit-sign">1</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit bit-enabled">1</div>
                        <div class="bit bit-enabled">1</div>
                    </div>
                </div>
                <span class="mid">= 128-(</span>
                <div class="mem">
                    <div class="visual bytes">
                        <div class="bit bit-sign">2**7</div>
                        <div class="bit bit-enabled">2**6</div>
                        <div class="bit bit-enabled">0</div>
                        <div class="bit bit-enabled">2**4</div>
                        <div class="bit">0</div>
                        <div class="bit bit-enabled">2**2</div>
                        <div class="bit bit-enabled">2**1</div>
                        <div class="bit bit-enabled">2**0</div>
                    </div>
                </div>
                <span class="mid">)= -87</span>
            </div>

            <br />

            <pre><code class="language-java">byte min = -128; // 0b10000000
byte any = 42; // 0b00101010
byte max = 127; // 0b01111111</code></pre>

            <p>
                Lorsqu'on ajoute <code>1</code> à la valeur maximale
                <code>127</code>, la valeur revient à la valeur minimale
                <code>-128</code>.
            </p>

            <pre><code class="language-java">byte max = 127; // 0b01111111
max += 1; // 0b10000000
System.out.println(max); // -128
						</code></pre>
        </li>

        <li>
            <p>
                Un type <code>short</code> représente une valeur
                numérique entier allant de <code>-32_768</code> à
                <code>32_767</code>, soit 65_535 possibilités, et
                correspond à <strong>16 bits</strong> en mémoire, soit
                <strong>2 octets</strong>.
            </p>

            <pre><code class="language-java">short min = -32768;
short any = 2025;
short max = 32767;</code></pre>
        </li>

        <li>
            <p>
                Un type <code>int</code> représente une valeur numérique
                entier allant de <code>-2_147_483_648</code> à
                <code>2_147_483_647</code>, soit 4_294_967_295
                possibilités, et correspond à
                <strong>32 bits</strong> en mémoire, soit
                <strong>4 octets</strong>.
            </p>

            <pre><code class="language-java">int min = -2_147_483_648;
int any = 93_939_200;
int max = 2_147_483_647;</code></pre>
        </li>

        <li>
            <p>
                Un type <code>long</code> représente une valeur
                numérique entier allant de
                <code>-9223372036854775808</code> à
                <code>9223372036854775807</code>, soit
                18_446_744_073_709_551_615 possibilités, et correspond à
                <strong>64 bits</strong> en mémoire, soit
                <strong>8 octets</strong>.
            </p>

            <p>
                Le type <code>long</code> impose de suffixer par une
                lettre <strong>L</strong> ses valeurs. La convention
                veut qu'elle soit en lettre capitale pour plus de
                clarté. En effet, en minuscule, <code>l</code> peut se
                confondre avec le chiffre <code>1</code> suivant la
                police d'écriture qui est utilisé dans un IDE.
            </p>

            <pre><code class="language-java">long min = -9223372036854775808L;
long any = 123_393_939_200L;
long max = 9223372036854775807L;</code></pre>
        </li>

        <li>
            <p>
                Un type <code>float</code> correspond à
                <strong>32 bits</strong> en mémoire, soit
                <strong>4 octets</strong>.
            </p>

            <p>
                Le type <code>float</code> impose de suffixer par une
                lettre <strong>f</strong> ses valeurs.
            </p>

            <pre><code class="language-java">float min = -3.40282347E+45F;
float any = 3.14F;
float max = 3.40282347E+38F;</code></pre>
        </li>

        <li>
            <p>
                Un type <code>double</code> correspond à
                <strong>64 bits</strong> en mémoire, soit
                <strong>8 octets</strong>.
            </p>

            <pre><code class="language-java">double min = -1.7976931348623157E+324;
double any = 3.14;
double max = 1.7976931348623157E+308;</code></pre>
        </li>

        <li>
            <p>
                Un type <code>char</code> représente un seul caractère et
                correspond à <strong>16 bits</strong> en mémoire, soit
                <strong>2 octets</strong>.
            </p>

            <p>
                Le type <code>char</code> impose de commencer/terminer
                par un <code>'</code> (simple guillemet).
            </p>

            <p>
                Si on veut représenter le caractère <code>'</code>,
                il faudra <u><strong>échapper</strong></u> le caractère
                avec <code>\</code>.
            </p>

            <pre><code class="language-java">
char any = 'M';
char escape = '\'';</code></pre>
        </li>
    </ul>

    Exemple:
    <pre><code class="language-java">System.out.println("Byte MIN: " + Byte.MIN_VALUE + ", MAX: " + Byte.MAX_VALUE);
System.out.println("Short MIN: " + Short.MIN_VALUE + ", MAX: " + Short.MAX_VALUE);
System.out.println("Integer MIN: " + Integer.MIN_VALUE + ", MAX: " + Integer.MAX_VALUE);
System.out.println("Long MIN: " + Long.MIN_VALUE + ", MAX: " + Long.MAX_VALUE);
System.out.println("Float MIN: " + Float.MIN_VALUE + ", MAX: " + Float.MAX_VALUE);
System.out.println("Double MIN: " + Double.MIN_VALUE + ", MAX: " + Double.MAX_VALUE);</code></pre>

    Sortie:
    <pre><code class="language-java">Byte MIN: -128, MAX: 127
Short MIN: -32768, MAX: 32767
Integer MIN: -2147483648, MAX: 2147483647
Long MIN: -9223372036854775808, MAX: 9223372036854775807
Float MIN: 1.4E-45, MAX: 3.4028235E38
Double MIN: 4.9E-324, MAX: 1.7976931348623157E308</code></pre>
</details>
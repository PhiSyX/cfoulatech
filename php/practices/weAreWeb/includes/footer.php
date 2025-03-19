

<link rel="stylesheet" href="css/footer.css">
    <footer class="footer">
        <div class="footer-container">
            <!-- Footer Columns -->
            <div class="footer-column">
                <h3 class="footer-title">On est ensemble</h3>
                <p class="footer-text">Together we make the world a better place</p>
                <div class="social-links">
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-tiktok"></i></a>
                </div>
            </div>

            <div class="footer-column">
                <h3 class="footer-title">Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="index.php#">Accueil</a></li>
                    <li><a href="profil.php#events">Profil</a></li>
                    <li><a href="chat.php">Chat</a></li>
                    <li><a href="login.php">Login</a></li>
                    <li><a href="Logout">Logout</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h3 class="footer-title">Contact</h3>
                <ul class="contact-info">
                    <li><i class="fas fa-map-marker-alt"></i> Rue de l'Eglise Ste-Anne 63, 1081 Koekelberg.</li>
                    <li><i class="fas fa-phone"></i> +32 465 605 002</li>
                    <li><i class="fas fa-envelope"></i> info@onestensable.be</li>
                </ul>
            </div>

            <div class="footer-column" >
                <h3 class="footer-title">Newsletter</h3>
                <form class="newsletter-form" action="includes/process_newsletter.php" method="POST">
                    <input type="email" name="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 On est ensemble. All rights reserved.</p>
        </div>
    </footer>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>

<script>
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        autoplayVideos: true,
    });
    const galleryLightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        autoplayVideos: true,
    });
</script>
    <script>
        // Mobile Menu Toggle
        document.querySelector('.mobile-menu').addEventListener('click', () => {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    </script>
    <script src="js/login.js"></script>
</body>
</html>
document.addEventListener("DOMContentLoaded", function() {
    const btnFormInscri = document.querySelector(".btnFormInscri");   
    const loginForm = document.querySelector(".loginForm.connection");  
    const inscriptionForm = document.querySelector(".loginForm.inscription"); 
    const formInscriptionText = document.querySelector(".formInscription p"); 
    const formInscriptionButton = document.querySelector(".btnFormInscri");

    
    inscriptionForm.style.display = "none";  

    btnFormInscri.addEventListener("click", function() {
        if (loginForm.style.display !== "none") {
            loginForm.style.display = "none";
            
            inscriptionForm.style.display = "inherit";
            
            formInscriptionText.textContent = "Vous avez déjà un compte ? ";
            formInscriptionButton.textContent = "Se connecter";
        } else {
            inscriptionForm.style.display = "none";
            
            loginForm.style.display = "inherit";
            
            formInscriptionText.textContent = "Vous n'avez pas de compte ?";
            formInscriptionButton.textContent = "Inscrivez-vous";
        }
    });
});
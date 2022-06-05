
import React from 'react';
import '../home.css'
const HomePage = () => {
 
    return (
      <div id="navbar">


         <header class="masthead">
            <div class="container px-4 px-lg-5 h-100">
                <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div class="col-lg-8 align-self-end">
                        <h1 class="text-white font-weight-bold">Congratulations! Vous etes dans le meilleur endroit pour louer votre voiture de rêve!</h1>
                        <hr class="divider" />
                    </div>
                    <div class="col-lg-8 align-self-baseline">
                        <p class="text-white-75 mb-5">Vous etes sur une application de location de Voitures qui offre les fonctions standard de
                            fonctionnement d’une Société de Location de Voitures à savoir chercher une Voiture, réserver
                            une voiture, rendre une voiture, connaître sa facture!</p>
                        <a class="btn btn-primary btn-xl" href="#about">Find Out More</a>
                    </div>
                </div>
            </div>
        </header>
        
        <section class="page-section" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="text mt-0">We've got what you need!</h2>
                        <hr class="divider divider-light" />
                        <p class="text-black-75 mb-4">La location de véhicule est un service offert par des professionnels détenteurs
                            d'automobiles de tourisme ou de véhicules utilitaires. Ce service consiste pour le client
                            (professionnel ou particulier) à réserver un véhicule pour une période donnée allant de
                            quelques heures à plusieurs mois.</p>
                        <a class="btn btn-light btn-xl" href="#navbar">Get Started!</a>
                    </div>
                </div>
            </div>
        </section>
        
        
        
        <footer class="bg-light py-5">
            <div class="container px-4 px-lg-5"><div class="small text-center text-muted">Copyright &copy; 2022 - Cars Rental Dotnet yowyow</div></div>
        </footer>
      </div>
    );
};

export default HomePage;
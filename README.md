Ce projet est une application web complète de gestion des demandes de congés, développée en architecture full stack avec Angular pour le front-end et Spring Boot pour le back-end. Il permet aux employés de soumettre des demandes de congé et aux responsables de les examiner, valider ou refuser selon la politique interne de l’entreprise.

🔧 Travaux techniques réalisés
Frontend (Angular) :

Développement d'une interface utilisateur responsive en Angular avec Bootstrap.

Intégration de composants dynamiques pour la gestion des formulaires, des tableaux et des alertes.

Mise en place de la navigation sécurisée avec route guards et gestion des rôles.

Consommation d’API REST via le module HttpClient.

Gestion de la session utilisateur via JWT (stocké en localStorage).

Backend (Spring Boot) :

Conception d’une API RESTful structurée et sécurisée.

Gestion des rôles (Admin, Manager, Employé) avec Spring Security.

Authentification et autorisation via JWT.

Implémentation d’un système de workflow de demande de congé (soumission, validation, refus).

Intégration de la base de données PostgreSQL avec JPA/Hibernate.

Validation des données côté back-end avec des annotations Java (@Valid, @NotNull, etc.)

Tests et documentation :

Test des endpoints avec Postman.

Documentation dynamique de l’API avec Swagger UI.

Gestion du projet avec GitHub et Jira pour le suivi des tâches et bugs.

Ce site de gestion des congés vise à automatiser et fluidifier le processus de gestion des absences dans une entreprise, tout en offrant une interface moderne et sécurisée pour les utilisateurs.

# 📄 DocuGen Pro

**Plateforme SaaS de Génération Dynamique de Documents via IA**

**DocuGen Pro** est une solution SaaS complète qui automatise la création de documents professionnels (contrats, factures, certificats) grâce à un système de templates dynamiques et une intégration d'Intelligence Artificielle.

Le projet a été réalisé dans le cadre de la filière **ILIA (Ingénierie Logicielle et Intelligence Artificielle)** à l'**ENSA Fès**.



https://github.com/user-attachments/assets/035990b1-9b26-4237-9663-90444a6fe0ce

[Hachem_Squalli_Elhoussaini_spring_boot_angular.pdf](https://github.com/user-attachments/files/24370192/Hachem_Squalli_Elhoussaini_spring_boot_angular.pdf)



---

## 📑 Table des Matières

* [Fonctionnalités](https://www.google.com/search?q=%23-fonctionnalit%C3%A9s)
* [Architecture Technique](https://www.google.com/search?q=%23-architecture-technique)
* [Prérequis](https://www.google.com/search?q=%23-pr%C3%A9requis)
* [Installation et Configuration](https://www.google.com/search?q=%23-installation-et-configuration)
* [1. Base de Données (PostgreSQL)](https://www.google.com/search?q=%231-base-de-donn%C3%A9es-postgresql)
* [2. Backend (Spring Boot)](https://www.google.com/search?q=%232-backend-spring-boot)
* [3. Frontend (Angular)](https://www.google.com/search?q=%233-frontend-angular)


* [Configuration SMTP (Gmail)](https://www.google.com/search?q=%23-configuration-smtp-gmail)
* [Modélisation & Conception](https://www.google.com/search?q=%23-mod%C3%A9lisation--conception)
* [Auteur](https://www.google.com/search?q=%23-auteur)

---

## 🚀 Fonctionnalités

* 
**Gestion des Templates Dynamiques :** Création de modèles HTML avec variables Thymeleaf (`{{client_name}}`, `{{amount}}`, etc.).


* 
**Génération par IA (Groq/Llama 3) :** Création automatique de la structure HTML et des champs du formulaire à partir d'une simple description textuelle.


* 
**Génération PDF Robuste :** Conversion HTML vers PDF utilisant Flying Saucer et OpenPDF, avec nettoyage du code via Jsoup.


* 
**Sécurité Avancée :** Authentification JWT stateless avec gestion des rôles (ADMIN/USER).


* 
**Emailing Automatisé :** Envoi immédiat du document généré en pièce jointe au destinataire.


* 
**Signature Numérique :** Support des champs de signature dans les formulaires dynamiques.



---

## 🏗 Architecture Technique

### Backend (Spring Boot 3)

| Composant | Technologie | Rôle |
| --- | --- | --- |
| **Framework** | Spring Boot 3.3.0 | Architecture Microservices-ready |
| **Sécurité** | Spring Security + JWT | Auth Stateless & RBAC |
| **Data** | PostgreSQL + JPA | Persistance des utilisateurs et templates |
| **PDF Engine** | Thymeleaf + Flying Saucer | Moteur de rendu et conversion PDF |
| **IA** | WebClient + Groq API | Génération intelligente de contenu |

### Frontend (Angular 17)

| Composant | Technologie | Rôle |
| --- | --- | --- |
| **Core** | Angular 17 (Standalone) | SPA Framework |
| **Styling** | Tailwind CSS | Design utilitaire moderne |
| **UI Kit** | Angular Material | Composants graphiques (Cards, Inputs) |
| **Forms** | Reactive Forms | Génération dynamique des inputs |

---

## 🛠 Prérequis

Avant de lancer le projet, assurez-vous d'avoir :

1. **Java JDK 17** ou supérieur.
2. **Node.js** (v18+) et **npm**.
3. **PostgreSQL** installé et en cours d'exécution.
4. Une **Clé API Groq** (pour les fonctionnalités IA).
5. Un compte **Gmail** avec un "Mot de passe d'application" (App Password) activé.

---

## ⚙️ Installation et Configuration

### 1. Base de Données (PostgreSQL)

Créez une base de données vide nommée `docugen_db` :

```sql
CREATE DATABASE docugen_db;

```

*Le backend créera automatiquement les tables au démarrage grâce à `ddl-auto=update`.*

### 2. Backend (Spring Boot)

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/DocuGen-Pro.git
cd "DocuGen Pro"

```


2. Configurez le fichier `src/main/resources/application.properties`.
* **Sécurité :** Ne commitez jamais vos vrais mots de passe sur GitHub. Utilisez des variables d'environnement ou un fichier local ignoré par git.


```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/docugen_db
spring.datasource.username=postgres
spring.datasource.password=VOTRE_MOT_DE_PASSE_POSTGRES

# Mail (SMTP Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=votre-email@gmail.com
spring.mail.password=VOTRE_APP_PASSWORD_GMAIL
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# AI Config
groq.api.key=VOTRE_CLE_API_GROQ

```


3. Lancez le serveur :
```bash
mvn spring-boot:run

```


*Le backend sera accessible sur `http://localhost:8080`.*

### 3. Frontend (Angular)

1. Naviguez dans le dossier frontend :
```bash
cd docugen-frontend

```


2. Installez les dépendances :
```bash
npm install

```


3. Lancez l'application :
```bash
ng serve

```


*L'interface sera accessible sur `http://localhost:4200`.*

---

## 📧 Configuration SMTP (Gmail)

Pour que l'envoi d'email fonctionne, vous ne pouvez pas utiliser votre mot de passe Gmail habituel si la double authentification (2FA) est activée.

1. Allez sur votre Compte Google > Sécurité.
2. Activez la **Validation en deux étapes**.
3. Cherchez **Mots de passe d'application**.
4. Générez un nouveau mot de passe (nommez-le "DocuGen").
5. Copiez ce code à 16 caractères (ex: `uhpz tani cinv imjh`) dans votre `application.properties`.

---

## 📊 Modélisation & Conception

### Diagramme de Classes

Le modèle de données est structuré autour des entités `User`, `DocumentTemplate`, `FormField` et `DocumentRequest`.

 *(Référence : Diapo 4 du rapport)* 

### Pipeline de Génération

1. **Admin** décrit le document → **Groq API** génère le JSON.
2. **Angular** construit le formulaire dynamique.
3. **Utilisateur** remplit les données.
4. **Spring Boot** (Thymeleaf) injecte les variables.
5. **Jsoup** nettoie le HTML pour la compatibilité XML.
6. **OpenPDF** génère le fichier final.

---

## 👤 Auteur

**Hachem Squalli el Houssaini**

* **Filière :** Ingénierie Logicielle et Intelligence Artificielle (ILIA)
* **École :** ENSA Fès, Université Sidi Mohamed Ben Abdellah

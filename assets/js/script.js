function verifLength(chaine, longueur) {
    return (chaine.length >= longueur);
}

function validateEmail(email) {
    const regExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    return regExp.test(String(email).toLowerCase());
}

function validatePwd(password) {
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    return regExp.test(String(password));
}

function searchElementUsers(email) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var exist = false;
    users.forEach(element => {
        if (email === element.email) {

            exist = true
        }

    });
    return exist;
}

function deleteObject(key, tab) {
    var members = JSON.parse(localStorage.getItem(tab) || "[]");
    console.log(members);
    members.splice(key, 1);
    console.log(members);
    localStorage.setItem(tab, JSON.stringify(members));
    location.reload();
}






//login, signup, deconnect, load a member
function signup() {
    //name
    var name = document.getElementById("inputName").value;
    var veriFirstName = verifLength(name, 3);
    if (veriFirstName) {
        document.getElementById("firstNameError").innerHTML = "";
    } else {
        document.getElementById("firstNameError").innerHTML = "taper au moins 3 caracteres";
        document.getElementById("firstNameError").style.color = "red";
    }
    //last name
    var lastName = document.getElementById("inputLastname").value;
    var verifLastName = verifLength(lastName, 3);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";
    } else {
        document.getElementById("lastNameError").innerHTML = "taper au moins 3 caracteres";
        document.getElementById("lastNameError").style.color = "red";
    }
    //date
    var date = document.getElementById("inputDate").value;
    if (!date) {
        verifDate = false;
        document.getElementById("dateError").innerHTML = "selectionner votre date de naissance";
        document.getElementById("dateError").style.color = "red";

    } else {
        verifDate = true;
        document.getElementById("dateError").innerHTML = "";
    }
    //phonenumber
    var phone = document.getElementById("inputPhone").value;
    var verifPhone = Number(phone) && (phone.toString().length == 8);
    if (verifPhone) {
        document.getElementById("phoneError").innerHTML = "";
    } else {
        document.getElementById("phoneError").innerHTML = "donner un numero de telephone valide";
        document.getElementById("phoneError").style.color = "red";
    }
    //adresse
    var address = document.getElementById("inputAddress").value;
    var verifLastName = verifLength(address, 3);
    if (verifLastName) {
        document.getElementById("addressError").innerHTML = "";
    } else {
        document.getElementById("addressError").innerHTML = "taper au moins 3 caracteres";
        document.getElementById("addressError").style.color = "red";
    }
    //email
    var email = document.getElementById("inputEmail").value;
    var verifEmail = verifLength(email, 3);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    } else {
        document.getElementById("emailError").innerHTML = "taper une adresse mail valide";
        document.getElementById("emailError").style.color = "red";
    }
    var emailExist = searchElementUsers(email);
    if (!emailExist) {
        document.getElementById("emailExist").innerHTML = "";
    } else {
        document.getElementById("emailExist").innerHTML = "cette adresse existe deja ";
        document.getElementById("emailExist").style.color = "red";
    }
    //password
    var password = document.getElementById("inputPassword").value;
    var verifPassword = validatePwd(password);
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    } else {
        document.getElementById("passwordError").innerHTML = "taper un mot de passe valide";
        document.getElementById("passwordError").style.color = "red";
    }
    //verif password
    var passwordConfirm = document.getElementById("inputConfirmassword").value;
    var verifConfirmPassword = password == passwordConfirm;
    if (verifConfirmPassword) {
        document.getElementById("verifPasswordError").innerHTML = "";
    } else {
        document.getElementById("verifPasswordError").innerHTML = "taper des mots de passe correspondents";
        document.getElementById("verifPasswordError").style.color = "red";
    }

    //test global
    if (veriFirstName && verifLastName && verifDate && verifPhone && verifPassword && verifConfirmPassword && verifEmail && (!emailExist)) {
        var idMember = JSON.parse(localStorage.getItem("idMember") || "100");
        var user = {
            id: idMember,
            name: name,
            lastName: lastName,
            date: date,
            phone: phone,
            address: address,
            email: email,
            password: password,
            clubs: [],
            events: [],
            state: "en attente",
            role: "user"
        }

        //premiere etape : prendre le tableay
        var users = JSON.parse(localStorage.getItem("users") || "[]");

        //deuxieme etape: ajouter le user
        users.push(user);

        //troisieme etape: enregistrer le tableau
        localStorage.setItem("users", JSON.stringify(users));

        //affecter un id a chaque utilisateur
        localStorage.setItem("idMember", idMember + 1);
        Swal.fire(
            'Merci pour votre inscription!',
            'Les administrateurs vont activer votre compte aprés le paiement',

        );


    }



}

function login() {
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    var findedUser;
    var finded = false;
    for (let i = 0; i < users.length; i++) {
        element = users[i];

        if (email == element.email) {
            finded = true;
            findedUser = element
            if (password == element.password) {
                findedUser = element;
                localStorage.setItem("connectedUser", JSON.stringify(findedUser));

            } else {

                document.getElementById("error").innerHTML = "incorrect password";
                document.getElementById("error").style.color = "red";


            }


        }

    }
    if (!finded) {
        document.getElementById("error").innerHTML = "you are not registered";
        document.getElementById("error").style.color = "red";
    } else {
        if (findedUser.role == "user") {
            if (findedUser.state == "en attente") {
                Swal.fire(
                    'Votre compte n est pas encore activé ',
                    'Les administrateurs vont activer votre compte aprés le paiement',

                );
            } else {
                location.replace("../account/account.html");
            }
        } else if (findedUser.role == "formateur") {
            location.replace("../formateur.formateurAccount.html");
        } else {
            //admin or superadmin
            location.replace("../dashboard/dashboard.html");
        }
    }
}

function deconnexion() {
    console.log("deconnecte");
    localStorage.removeItem("connectedUser");
    location.replace("../staticContent/Connexion.html");

}

function loadUser() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));

    profileContent = `
    <div class="col-md-4">
   
    <div class="card card-user" id="profileRes">
        <div class="card-body">
            
            <p class="card-text">
                <div class="card-header">
                    <h5 class="title">Mon Profile</h5>
                </div>
                <div class="author">
                    <div class="block block-one"></div>
                    <div class="block block-two"></div>
                    <div class="block block-three"></div>
                    <div class="block block-four"></div>
                    <a href="javascript:void(0)">
                        <img class="avatar" src="./images/admin.jpg" alt="...">
                        <h5 class="title"> ${connectedUser.name} ${connectedUser.lastName}</h5>
                    </a>
                    <p class="description">
                        ${connectedUser.role}
                    </p>
                </div>
            </p>
        </div>
    </div>
</div>
<div class="col-md-8">
    <div class="card">
        <div class="card-header">
            <h5 class="title">Modifier le profile</h5>
        </div>
        <div class="card-body" id="profileDetails">
            <form>
                <div class="row">
                    <div class="col-md-6 pr-md-1">
                        <div class="form-group">
                            <label>Nom</label>
                            <input id="inputName" type="text" class="form-control" placeholder="nom" value="${connectedUser.name}">
                            <span id="nameError"></span>
                        </div>
                    </div>
                    <div class="col-md-6 pl-md-1">
                        <div class="form-group">
                            <label>Prenom</label>
                            <input id="inputLastName" type="text" class="form-control" placeholder="prenom" value="${connectedUser.lastName}">
                            <span id="lastNameError"></span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Adresse</label>
                            <input id="inputAdress" type="text" class="form-control" placeholder="adresse" value="${connectedUser.addresse}">
                            <span id="adressError"></span>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Date de naissance</label>
                            <input id="inputDate" type="date" class="form-control" placeholder="date de naissance" value="${Date.parse(connectedUser.date)}">
                            <span id="dateError"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 pr-md-1">
                        <div class="form-group">
                            <label>Email</label>
                            <input id="inputEmail" type="email" class="form-control" placeholder="email" value="${connectedUser.email}">
                            <span id="emailError"></span>
                        </div>
                    </div>
                    <div class="col-md-6 pr-md-1">
                        <div class="form-group">
                            <label>Numero de telephone</label>
                            <input id="inputPhone" type="text" class="form-control" placeholder="numero de telephone" value="${connectedUser.phone}">
                            <span id="phoneError"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Mot de passe</label>
                            <input id="inputPassword" type="password" class="form-control" placeholder="mot de passe" value="${connectedUser.password}">
                            <span id="passwordError"></span>
                        </div>
                    </div>

                </div>

            </form>
        </div>
        <div class="card-footer" id="submitEdit">
            <button type="submit" class="btn btn-fill btn-primary" onclick="editUser(${connectedUser.id})">Enregistrer</button>

        </div>

    </div>
</div>
    `;
    document.getElementById("profileContent").innerHTML = profileContent;






}

function editUser(id) {
    console.log("helloo");
    var name = document.getElementById("inputName").value;
    var veriFirstName = verifLength(name, 3);
    if (veriFirstName) {
        document.getElementById("nameError").innerHTML = "";
    } else {
        document.getElementById("nameError").innerHTML = "must have at least 3 characters";
        document.getElementById("nameError").style.color = "red";
    }

    var lastName = document.getElementById("inputLastName").value;
    var verifLastName = verifLength(lastName, 3);
    if (verifLastName) {
        document.getElementById("lastNameError").innerHTML = "";
    } else {
        document.getElementById("lastNameError").innerHTML = "must have at least 3 characters";
        document.getElementById("lastNameError").style.color = "red";
    }
    //date
    var date = document.getElementById("inputDate").value;

    //phonenumber
    var phone = document.getElementById("inputPhone").value;
    var verifPhone = Number(phone) && (phone.toString().length == 8);
    if (verifPhone) {
        document.getElementById("phoneError").innerHTML = "";
    } else {
        document.getElementById("phoneError").innerHTML = "donner un numero de telephone valide";
        document.getElementById("phoneError").style.color = "red";
    }
    //adresse
    var address = document.getElementById("inputAdress").value;
    var verifLastName = verifLength(address, 3);
    if (verifLastName) {
        document.getElementById("adressError").innerHTML = "";
    } else {
        document.getElementById("addressError").innerHTML = "taper au moins 3 caracteres";
        document.getElementById("addressError").style.color = "red";
    }
    //email
    var email = document.getElementById("inputEmail").value;
    var verifEmail = verifLength(email, 3);
    if (verifEmail) {
        document.getElementById("emailError").innerHTML = "";
    } else {
        document.getElementById("emailError").innerHTML = "taper une adresse mail valide";
        document.getElementById("emailError").style.color = "red";
    }
    //password
    var password = document.getElementById("inputPassword").value;
    var verifPassword = validatePwd(password);
    if (verifPassword) {
        document.getElementById("passwordError").innerHTML = "";
    } else {
        document.getElementById("passwordError").innerHTML = "taper un mot de passe valide";
        document.getElementById("passwordError").style.color = "red";
    }


    //test global
    if (veriFirstName && verifLastName && verifPhone && verifPassword && verifEmail) {
        var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
        var user = {
            id: connectedUser.id,
            name: name,
            lastName: lastName,
            date: date,
            phone: phone,
            address: address,
            email: email,
            password: password,
            passwordConfirm: connectedUser.passwordConfirm,
            clubs: connectedUser.clubs,
            events: connectedUser.events,
            state: connectedUser.state,
            role: connectedUser.role
        }



        connectedUser = user;
        var users = JSON.parse(localStorage.getItem("users") || "[]");
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == connectedUser.id) {
                users[i] = connectedUser;
                break
            }
        }
        Swal.fire('Modifications enregistrées');
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
    }

}



//dashboard Member
function loadMembers() {

    var users = JSON.parse(localStorage.getItem("users") || "[]");

    //afficher les users chacun dans une ligne
    var usersTable = ``;
    for (i = 0; i < users.length; i++) {
        if (users[i].role == "user") {
            usersTable += `
            <tr>
                <td> ${users[i].name}</td>
                <td> ${users[i].lastName}</td>
                <td> ${users[i].email}</td>
                <td> ${users[i].phone}</td>
                <td> ${users[i].date}</td>
                <td> ${users[i].state}</td>

                <td> 
                <a onclick="confirmMember(${users[i].id},'users')"><i class="tim-icons icon-check-2"></i></i></a>
                <a onclick="deleteObject(${i},'users')"><i class="tim-icons icon-trash-simple"></i></a>
                </td>
            </tr>`;
        }

    }

    document.getElementById("loadMembers").innerHTML = usersTable;

}

function confirmMember(id) {
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            users[i].state = "activé";
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();


}



//dashboardClubs
function loadClubs() {
    //console.log(document.getElementById("loadClubs"))
    var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");

    //afficher les users chacun dans une ligne
    var clubsTable = `  
      
     <tr >
    <td>
        <input type="text" class="form-control" id="nom">
        <span id="nameError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="idFormateur">
        <span id="idFormateurError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="jour">
   
    <span id="jourError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="horaire">
        <span id="horaireError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="duree">
        <span id="horaireError"> </span>
    </td>
 
    <td>
        <input type="number" class="form-control" id="capacite">
        <span id="capaciteError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="description">
    <span id="descriptionError"> </span>
</td>
    <td>
    <button type="button" class="btn btn-warning" onclick="addClub()">Ajouter</button>

</td>
</tr>
<tr id="editClub">
</tr>
    `;
    for (i = 0; i < clubs.length; i++) {
        clubsTable += `
        
        <tr>
            <td> ${clubs[i].nom}</td>
            <td> ${clubs[i].idFormateur}</td>
            <td> ${clubs[i].jour}</td>
            <td> ${clubs[i].horaire}</td>
            <td> ${clubs[i].duree}</td>
            <td> ${clubs[i].description}</td>
            <td> ${clubs[i].capacite}</td>

            
            <td class="align-center"> 

            <a onclick="editClub(${i},'clubs')"><i class="tim-icons icon-settings-gear-63"></i></a>
            <a onclick="deleteObject(${i},'clubs')"><i class="tim-icons icon-trash-simple"></i></a>
            </td>
        </tr>`;
    }



    document.getElementById("loadClubs").innerHTML = clubsTable;
}

function addClub() {

    var nom = document.getElementById("nom").value;
    var idFormateur = document.getElementById("idFormateur").value;
    var jour = document.getElementById("jour").value;
    var horaire = document.getElementById("horaire").value;
    var duree = document.getElementById("duree").value;
    var description = document.getElementById("description").value;
    var capacite = document.getElementById("capacite").value;
    if (nom && idFormateur && jour && horaire && duree && description && capacite) {
        var idClub = JSON.parse(localStorage.getItem("idClub") || "1");
        var club = {
            id: idClub,
            nom: nom,
            idFormateur: idFormateur,
            jour: jour,
            horaire: horaire,
            duree: duree,
            description: description,
            capacite: capacite
        }
        console.log(club);

        var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        clubs.push(club);
        localStorage.setItem("clubs", JSON.stringify(clubs));
        localStorage.setItem("idClub", idClub + 1);
        location.reload();

    }
}

function editClub(i) {
    var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");

    var clubToEdit = `
    <td>
        <input type="text" class="form-control" id="nomUpdate" value="${clubs[i].nom}">
        <span id="nameError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="idFormateurUpdate" value="${clubs[i].idFormateur}">
        <span id="idFormateurError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="jourUpdate" value="${clubs[i].jour}">
   
    <span id="jourError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="horaireUpdate" value="${clubs[i].horaire}">
        <span id="horaireError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="dureeUpdate" value="${clubs[i].duree}">
        <span id="horaireError"> </span>
    </td>
 
    <td>
        <input type="number" class="form-control" id="capaciteUpdate" value="${clubs[i].capacite}">
        <span id="capaciteError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="descriptionUpdate" value="${clubs[i].description}">
    <span id="descriptionError"> </span>
</td>
    <td>
    <button type="button" class="btn btn-success" onclick="updateClub(${clubs[i].id})">Enregistrer</button>

</td>
    `;
    document.getElementById("editClub").innerHTML = clubToEdit;
}

function updateClub(id) {

    var nom = document.getElementById("nomUpdate").value;
    var idFormateur = document.getElementById("idFormateurUpdate").value;
    var jour = document.getElementById("jourUpdate").value;
    var horaire = document.getElementById("horaireUpdate").value;
    var duree = document.getElementById("dureeUpdate").value;
    var description = document.getElementById("descriptionUpdate").value;
    var capacite = document.getElementById("capaciteUpdate").value;
    console.log(idFormateur);
    if (nom && idFormateur && jour && horaire && duree && description && capacite) {
        var club = {
            id: id,
            nom: nom,
            idFormateur: idFormateur,
            jour: jour,
            horaire: horaire,
            duree: duree,
            description: description,
            capacite: capacite
        }


        var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");
        for (let i = 0; i < clubs.length; i++) {
            if (clubs[i].id == id) {
                clubs[i] = club;
                break;
            }

        }
        localStorage.setItem("clubs", JSON.stringify(clubs));

        location.reload();

    }

}



//dashboardEvents
function loadEvents() {
    //console.log(document.getElementById("loadClubs"))
    var events = JSON.parse(localStorage.getItem("events") || "[]");

    //afficher les users chacun dans une ligne
    var eventsTable = `  
      
     <tr >
    <td>
        <input type="text" class="form-control" id="nom">
        <span id="nameError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="idFormateur">
        <span id="idFormateurError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="jour">
   
    <span id="jourError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="horaire">
        <span id="horaireError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="duree">
        <span id="horaireError"> </span>
    </td>
 
    <td>
        <input type="number" class="form-control" id="capacite">
        <span id="capaciteError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="description">
    <span id="descriptionError"> </span>
</td>
    <td>
    <button type="button" class="btn btn-warning" onclick="addEvent()">Ajouter</button>

</td>
</tr>
<tr id="editEevnt">
</tr>
    `;
    for (i = 0; i < events.length; i++) {
        eventsTable += `
        
        <tr>
            <td> ${events[i].nom}</td>
            <td> ${events[i].idFormateur}</td>
            <td> ${events[i].jour}</td>
            <td> ${events[i].horaire}</td>
            <td> ${events[i].duree}</td>
            <td> ${events[i].description}</td>
            <td> ${events[i].capacite}</td>

            
            <td class="align-center"> 

            <a onclick="editClub(${i},'clubs')"><i class="tim-icons icon-settings-gear-63"></i></a>
            <a onclick="deleteObject(${i},'clubs')"><i class="tim-icons icon-trash-simple"></i></a>
            </td>
        </tr>`;
    }



    document.getElementById("loadEvents").innerHTML = eventsTable;
}

function addEvent() {

    var nom = document.getElementById("nom").value;
    var idFormateur = document.getElementById("idFormateur").value;
    var jour = document.getElementById("jour").value;
    var horaire = document.getElementById("horaire").value;
    var duree = document.getElementById("duree").value;
    var description = document.getElementById("description").value;
    var capacite = document.getElementById("capacite").value;
    if (nom && idFormateur && jour && horaire && duree && description && capacite) {
        var idEvent = JSON.parse(localStorage.getItem("idEvent") || "1");
        var event = {
            id: idEvent,
            nom: nom,
            idFormateur: idFormateur,
            jour: jour,
            horaire: horaire,
            duree: duree,
            description: description,
            capacite: capacite
        }
        console.log(event);

        var events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(event);
        localStorage.setItem("events", JSON.stringify(events));
        localStorage.setItem("idEvent", idEvent + 1);
        location.reload();

    }
}

function editEvent(i) {
    var events = JSON.parse(localStorage.getItem("events") || "[]");

    var eventToEdit = `
    <td>
        <input type="text" class="form-control" id="nomUpdate" value="${events[i].nom}">
        <span id="nameError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="idFormateurUpdate" value="${events[i].idFormateur}">
        <span id="idFormateurError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="jourUpdate" value="${events[i].jour}">
   
    <span id="jourError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="horaireUpdate" value="${events[i].horaire}">
        <span id="horaireError"> </span>
    </td>
    <td>
        <input type="text" class="form-control" id="dureeUpdate" value="${events[i].duree}">
        <span id="horaireError"> </span>
    </td>
 
    <td>
        <input type="number" class="form-control" id="capaciteUpdate" value="${events[i].capacite}">
        <span id="capaciteError"> </span>
    </td>
    <td>
    <input type="text" class="form-control" id="descriptionUpdate" value="${events[i].description}">
    <span id="descriptionError"> </span>
</td>
    <td>
    <button type="button" class="btn btn-success" onclick="updateClub(${events[i].id})">Enregistrer</button>

</td>
    `;
    document.getElementById("editEvent").innerHTML = eventToEdit;
}

function updateEvent(id) {

    var nom = document.getElementById("nomUpdate").value;
    var idFormateur = document.getElementById("idFormateurUpdate").value;
    var jour = document.getElementById("jourUpdate").value;
    var horaire = document.getElementById("horaireUpdate").value;
    var duree = document.getElementById("dureeUpdate").value;
    var description = document.getElementById("descriptionUpdate").value;
    var capacite = document.getElementById("capaciteUpdate").value;
    console.log(idFormateur);
    if (nom && idFormateur && jour && horaire && duree && description && capacite) {
        var event = {
            id: id,
            nom: nom,
            idFormateur: idFormateur,
            jour: jour,
            horaire: horaire,
            duree: duree,
            description: description,
            capacite: capacite
        }


        var events = JSON.parse(localStorage.getItem("events") || "[]");
        for (let i = 0; i < clubs.length; i++) {
            if (events[i].id == id) {
                events[i] = event;
                break;
            }

        }
        localStorage.setItem("events", JSON.stringify(events));

        location.reload();

    }

}

//dashboard Admin
function loadAdmins() {
    var admins = JSON.parse(localStorage.getItem("users") || "[]");

    //afficher les users chacun dans une ligne
    var adminsTable = `
    <tr>       
        <td>
            <div class="form-group">
                <input id="inputName" type="text" class="form-control" placeholder="nom" v>
                <span id="nameError"></span>
            </div>
        </td>
        <td >
            <div class="form-group">
                <input id="inputLastName" type="text" class="form-control" placeholder="prenom" >
                <span id="lastNameError"></span>
            </div>
        </td>
        <td >
        <div class="form-group">
            <input id="inputEmail" type="email" class="form-control" placeholder="email" >
            <span id="emailError"></span>
        </div>
        </td>
        <td>
        <div class="form-group">
            <input id="inputPhone" type="text" class="form-control" placeholder="numero de telephone">
            <span id="phoneError"></span>
        </div>
        </td>
        
        <td>
            <div class="form-group">
                <input id="inputPassword" type="password" class="form-control" placeholder="mot de passe" >
                <span id="passwordError"></span>
            </div>
        </td>
        <td>
        <button type="button" class="btn btn-warning" onclick="addAdmin()">Ajouter</button>

        </td>

    </tr>
    `;
    for (i = 0; i < admins.length; i++) {
        if (admins[i].role == "admin") {
            adminsTable += `
            <tr>
                <td> ${admins[i].name}</td>
                <td> ${admins[i].lastName}</td>
                <td> ${admins[i].email}</td>
                <td> ${admins[i].phone}</td>
                <td> ${admins[i].password}</td>

                <td> 
                <a onclick="deleteObject(${i},'users')"><i class="tim-icons icon-trash-simple"></i></a>
                </td>
            </tr>`;
        }

    }

    document.getElementById("loadAdmins").innerHTML = adminsTable;

}


function addAdmin() {

    var firstName = document.getElementById("inputName").value;
    var lastName = document.getElementById("inputLastName").value;
    var email = document.getElementById("inputEmail").value;
    var phone = document.getElementById("inputPhone").value;
    var password = document.getElementById("inputPassword").value;
    if (firstName && lastName && Number(phone) && email && password) {
        var idAdmin = JSON.parse(localStorage.getItem("idAdmin") || "2");
        var admin = {
            id: idAdmin,
            name: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            password: password,
            role: "admin"
        }
        console.log(admin);

        var users = JSON.parse(localStorage.getItem("users") || "[]");
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("idAdmin", idAdmin + 1);
        location.reload();

    }
}































//********************************************************** */

// function editMembre(key, tab) {

//     var users = JSON.parse(localStorage.getItem(tab) || "[]");
//     var user = users[key];
//     var userToEdit = `
//     <div class="col-lg-6">
//         <div class="login_form_inner">
//             <h3> Modifier un membre </h3>
//             <div id="form-reg" class="row login_form ">
//                 <!-- action="contact_process.php" method="post" id="contactForm" novalidate="novalidate"> -->
//                 <div class="col-md-12 form-group">
//                     <input type="text" class="form-control" id="inputName" name="name" value="${user.firstName}" onfocus="this.placeholder = ''" onblur="this.placeholder = '${user.firstName}'">
//                     <span id="firstNameError"> </span>
//                 </div>
//                 <div class="col-md-12 form-group">
//                     <input type="text" class="form-control" id="inputLastname" name="name" value="${user.lastName}" onfocus="this.placeholder = ''" onblur="this.placeholder = '${user.lastName}'">
//                     <span id="lastNameError"> </span>
//                 </div>
//                 <div class="col-md-12 form-group">
//                     <input type="number" class="form-control" id="inputAge" name="name" value="${user.age}" onfocus="this.placeholder = ''" onblur="this.placeholder = '${user.age}'">
//                     <span id="ageError"> </span>
//                 </div>
//                 <div class="col-md-12 form-group">
//                     <input type="text" class="form-control" id="inputAddress" name="name" value="${user.address}" onfocus="this.placeholder = ''" onblur="this.placeholder = '${user.address}'">
//                     <span id="addressError"> </span>
//                 </div>
//                 <div class="col-md-12 form-group">
//                     <input type="email" class="form-control" id="inputEmail" name="name" value="${user.email}" onfocus="this.placeholder = ''" onblur="this.placeholder = '${user.email}'">
//                     <span id="emailError"> </span>
//                     <span id="emailExist"> </span>
//                 </div>
//                 <div class="col-md-12 form-group">
//                     <button class="btn btn-primary ml-lg-2" type="submit" value="submit" class="primary-btn" onclick="updateMembre(${user.id})"> Enregistrer les modifications </button>

//                 </div>
//             </div>
//         </div>
//     </div>
//     `;
//     document.getElementById("editMember").innerHTML = userToEdit;
// }

// function updateMembre(id) {
//     var users = JSON.parse(localStorage.getItem("users") || "[]");

//     var firstName = document.getElementById("inputName").value;
//     var veriFirstName = verifLength(firstName, 3);
//     if (veriFirstName) {
//         document.getElementById("firstNameError").innerHTML = "";
//     } else {
//         document.getElementById("firstNameError").innerHTML = "must have at least 3 characters";
//         document.getElementById("firstNameError").style.color = "red";
//     }

//     var lastName = document.getElementById("inputLastname").value;
//     var verifLastName = verifLength(lastName, 3);
//     if (verifLastName) {
//         document.getElementById("lastNameError").innerHTML = "";
//     } else {
//         document.getElementById("lastNameError").innerHTML = "must have at least 3 characters";
//         document.getElementById("lastNameError").style.color = "red";
//     }

//     var age = document.getElementById("inputAge").value;
//     var verifAge = Number(age) && (age > 0);
//     if (verifAge) {
//         document.getElementById("ageError").innerHTML = "";
//     } else {
//         document.getElementById("ageError").innerHTML = "must give a valid age";
//         document.getElementById("ageError").style.color = "red";
//     }
//     var address = document.getElementById("inputAddress").value;
//     var verifLastName = verifLength(address, 3);
//     if (verifLastName) {
//         document.getElementById("addressError").innerHTML = "";
//     } else {
//         document.getElementById("addressError").innerHTML = "must have at least 3 characters";
//         document.getElementById("addressError").style.color = "red";
//     }

//     var email = document.getElementById("inputEmail").value;
//     var verifEmail = verifLength(email, 3);
//     if (verifEmail) {
//         document.getElementById("emailError").innerHTML = "";
//     } else {
//         document.getElementById("emailError").innerHTML = "must tap a validate email";
//         document.getElementById("emailError").style.color = "red";
//     }
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].id == id) {
//             user = users[i];
//         }

//     }
//     if (veriFirstName && verifLastName && verifAge && verifEmail) {
//         var idUser = JSON.parse(localStorage.getItem("idUser") || "10");
//         var user = {
//             id: id,
//             firstName: firstName,
//             lastName: lastName,
//             age: age,
//             address: address,
//             email: email,
//             password: user.password,
//             passwordConfirm: user.passwordConfirm,
//             role: "user"
//         }
//         console.log(user);
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].id == id) {
//                 users[i] = user;
//             }

//         }
//         localStorage.setItem("users", JSON.stringify(users));
//         location.reload();
//     }

// }


// function editMember(id) {


//     var firstName = document.getElementById("inputName").value;
//     var veriFirstName = verifLength(firstName, 3);
//     if (veriFirstName) {
//         document.getElementById("firstNameError").innerHTML = "";
//     } else {
//         document.getElementById("firstNameError").innerHTML = "must have at least 3 characters";
//         document.getElementById("firstNameError").style.color = "red";
//     }

//     var lastName = document.getElementById("inputLastname").value;
//     var verifLastName = verifLength(lastName, 3);
//     if (verifLastName) {
//         document.getElementById("lastNameError").innerHTML = "";
//     } else {
//         document.getElementById("lastNameError").innerHTML = "must have at least 3 characters";
//         document.getElementById("lastNameError").style.color = "red";
//     }

//     var age = document.getElementById("inputAge").value;
//     var verifAge = Number(age) && (age > 0);
//     if (verifAge) {
//         document.getElementById("ageError").innerHTML = "";
//     } else {
//         document.getElementById("ageError").innerHTML = "must give a valid age";
//         document.getElementById("ageError").style.color = "red";
//     }
//     var address = document.getElementById("inputAddress").value;
//     var verifLastName = verifLength(address, 3);
//     if (verifLastName) {
//         document.getElementById("addressError").innerHTML = "";
//     } else {
//         document.getElementById("addressError").innerHTML = "must have at least 3 characters";
//         document.getElementById("addressError").style.color = "red";
//     }

//     var email = document.getElementById("inputEmail").value;
//     var verifEmail = verifLength(email, 3);
//     if (verifEmail) {
//         document.getElementById("emailError").innerHTML = "";
//     } else {
//         document.getElementById("emailError").innerHTML = "must tap a validate email";
//         document.getElementById("emailError").style.color = "red";
//     }


//     var password = document.getElementById("inputPassword").value;
//     var verifPassword = validatePwd(password);
//     if (verifPassword) {
//         document.getElementById("passwordError").innerHTML = "";
//     } else {
//         document.getElementById("passwordError").innerHTML = "must tap a validate password";
//         document.getElementById("passwordError").style.color = "red";
//     }

//     var passwordConfirm = document.getElementById("inputConfirmassword").value;
//     var verifConfirmPassword = password == passwordConfirm;
//     if (verifConfirmPassword) {
//         document.getElementById("verifPasswordError").innerHTML = "";
//     } else {
//         document.getElementById("verifPasswordError").innerHTML = "not matching passwords";
//         document.getElementById("verifPasswordError").style.color = "red";
//     }


//     if (veriFirstName && verifLastName && verifAge && verifPassword && verifConfirmPassword && verifEmail) {
//         var users = JSON.parse(localStorage.getItem("users") || "[]");
//         var user = {
//             id: id,
//             firstName: firstName,
//             lastName: lastName,
//             age: age,
//             address: address,
//             email: email,
//             password: password,
//             passwordConfirm: passwordConfirm,
//             role: "user"
//         }

//         for (let i = 0; i < users.length; i++) {
//             if (users[i].id == user.id)
//                 users[i] = user;

//         }

//         localStorage.setItem("users", JSON.stringify(users));

//         localStorage.setItem("connectedUser", JSON.stringify(user));
//     }



// }



// function loadClubsOnCulbsPage() {

//     var resultat = ``;
//     var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");
//     for (let i = 0; i < clubs.length; i++) {
//         resultat += `        
//                 <div class="col-sm-6 col-lg-4 col-xl-3 py-3 wow zoomIn">
//                     <div class="features">
//                         <div class="header mb-3">
//                             <span class="mai-business"></span>
//                         </div>
//                         <h5>
//                             <a href="#" onclick="loadDetailClub(${clubs[i].id})"> ${clubs[i].nom} </a>
//                         </h5>
//                         <p>${clubs[i].description}</p>
//                     </div>
//                 </div>
//         `;


//     }
//     document.getElementById("clubsLoading").innerHTML = resultat;
// }

// function loadDetailClub(id) {

//     var resultat = ``;
//     var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");
//     for (let i = 0; i < clubs.length; i++) {
//         if (clubs[i].id == id) {
//             resultat += `
//             <div class="row align-items-center">
//                 <div class="col-lg-6 py-3 wow fadeInUp">
//                     <h2 class="title-section">${clubs[i].nom} </h2>
//                     <div class="divider"></div>

//                     <p>${clubs[i].description}</p>
//                 </div>
//             <div class="col-lg-6 py-3 wow fadeInRight">
//                 <div class="img-fluid py-3 text-center">
//                     <img src="../assets/gif/Team goals.gif" alt="">
//                 </div>
//             </div>
//         </div>`;

//             document.getElementById("clubDetails").innerHTML = resultat;
//             break;
//         }

//     }

// }
// function loadClubsOnAccountPage() {

//     var resultat = ``;
//     var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");
//     for (let i = 0; i < clubs.length; i++) {
//         resultat += `        
//                 <div class="col-sm-6 col-lg-4 col-xl-3 py-3 wow zoomIn">
//                     <div class="features">
//                         <div class="header mb-3">
//                             <span class="mai-business"></span>
//                         </div>
//                         <h5>
//                             <a href="#" onclick="loadDetailClub(${clubs[i].id})"> ${clubs[i].nom} </a>
//                         </h5>
//                         <p>${clubs[i].description}</p>
//                         <a href="#" class="btn btn-primary" onclick="integrerClub(${clubs[i].id})"> integrer le club</a>

//                     </div>
//                 </div>
//         `;


//     }
//     document.getElementById("accountClubs").innerHTML = resultat;
// }

// function integrerClub(id) {

//     var users = JSON.parse(localStorage.getItem("users") || "[]");
//     var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
//     myClubs = connectedUser.clubs;
//     clubExist = false;
//     for (let i = 0; i < myClubs.length; i++) {
//         if (myClubs[i] == id) {
//             console.log(id);

//             alert("vous etes deja inscri à ce club");
//             clubExist = true;
//             break;
//         }
//     }
//     if (!clubExist) {
//         connectedUser.clubs[connectedUser.clubs.length] = id;
//         for (let i = 0; i < users.length; i++) {
//             if (users[i].id == connectedUser.id) {
//                 users[i] = connectedUser;
//                 break;

//             }

//         }

//         localStorage.setItem("users", JSON.stringify(users));
//         localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
//         alert("inscription reussite");
//     }





// }

// function loadMyClubs() {
//     var users = JSON.parse(localStorage.getItem("users") || "[]");
//     var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
//     var clubs = JSON.parse(localStorage.getItem("clubs") || "[]");

//     var myClubs = connectedUser.clubs;

//     //afficher les users chacun dans une ligne
//     var clubsTable = ` <table class="table">
//     <thead>
//         <tr>
//             <th scope="col">Nom</th>
//             <th scope="col">Responsable</th>
//             <th scope="col">Horaire</th>
//             <th scope="col">Duree</th>

//             <th scope="col"> Actions </th>
//         </tr>
//     </thead>
//     `;

//     for (i = 0; i < myClubs.length; i++) {

//         for (let j = 0; j < clubs.length; j++) {
//             if (myClubs[i] == clubs[j].id) {
//                 club = clubs[j];
//                 break;
//             }


//         }
//         clubsTable += `

//         <tr>
//             <td> ${club.nom}</td>
//             <td> ${club.responsable}</td>
//             <td> ${club.horaire}</td>
//             <td> ${club.duree}</td>


//             <td> 
//                 <button type="button" class="btn btn-danger" onclick="deleteMyClub(${myClubs[i]})">Supprimer</button>
//             </td>
//         </tr>`;
//     }
//     clubsTable += ` 

//         </table>`;


//     document.getElementById("accountClubs").innerHTML = clubsTable;
// }

// function deleteMyClub(id) {
//     console.log("delete");
//     var users = JSON.parse(localStorage.getItem("users") || "[]");
//     var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
//     var myClubs = connectedUser.clubs;
//     console.log(id);

//     for (let i = 0; i < myClubs.length; i++) {
//         if (myClubs[i] == id) {
//             console.log(myClubs);
//             myClubs.splice(i, 1);
//             console.log(myClubs);
//             break;
//         }

//     }
//     connectedUser.clubs = myClubs;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].id == connectedUser.id) {
//             users[i] = connectedUser
//         }
//     }

//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("connectedUser", JSON.stringify(connectedUser));
//     location.reload();

// }
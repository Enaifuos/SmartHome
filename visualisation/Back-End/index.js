'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {Client} = require('pg');

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json({}));
app.use(morgan('dev'));


const client = new Client({
    connectionString: 'postgres://bgmaazwc:unYO5axVV7t6sKm8964yHbtDYxtuM3yM@packy.db.elephantsql.com:5432/bgmaazwc'
});


app.get('/incidents', async(req, res) => {
    try {
        const result = await
        client.query('SELECT * FROM INCIDENT LEFT JOIN ALLOCATION USING(idincident) LEFT JOIN PERSONNE USING(idpersonne)');
console.log("incidents:  " + result.rows[0].message);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

/*	Insertion	*/
app.put('/update', async(req, res) => {
    try {
        const upd = 'UPDATE INCIDENT SET ETAT=\'' + req.body.etat + '\' WHERE idincident=\'' + req.body.idincident + '\''
        console.log(upd);
const result = await
client.query(upd);
}
catch
(err)
{
    throw(err);
}
})
;

app.get('/persons', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM PERSONNE');
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.post('/updateAuthor', async(req, res) => {
    try {
        const result2 = await client.query('DELETE FROM ALLOCATION WHERE idincident=' + req.body.idIncident);
const query = 'INSERT INTO ALLOCATION (idincident, idpersonne) VALUES(' + req.body.idIncident + ',' + req.body.idPerson + (')');
console.log('e_e');
console.log("queeeeery : " + query);
const result = await
client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/alloc', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM allocation');
console.log(result.rows[0].message);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/commentaire', async(req, res) => {
    try {
        //const query = 'SELECT * FROM commentaire WHERE idincident=' + req.param("idIncident");
        const query = 'SELECT idcommentaire, commentaire, nom, prenom from COMMENTAIRE join PERSONNE using(idpersonne) where idincident=' + req.param("idIncident")
+ ' ORDER BY idcommentaire';
console.log("Query : " + query)
const result = await
client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.post('/nouveauCommentaire', async(req, res) => {
    try {
        const query = 'INSERT INTO COMMENTAIRE (idpersonne,idincident,commentaire) VALUES('
            + req.body.idpersonne + ',' + req.body.idincident + ',\'' + req.body.newCommentaire + '\')';
console.log("Query : " + query)
const result = await
client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/chooseUser', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM personne');
console.log(result.rows[0].message);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;


app.get('/incidents', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM INCIDENT LEFT JOIN ALLOCATION USING(idincident)');
console.log("incidents:  " + result.rows[0].message);
console.log("incidents: >>" + result.rows[0].message);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/incidentsForSection', async(req, res) => {
    try {
        var query;
        if(req.param("status") == 'null'){
        query = 'SELECT * FROM INCIDENT I LEFT JOIN ALLOCATION a USING(idincident) ' +
        'LEFT JOIN PERSONNE P ON a.idpersonne= P.idPersonne WHERE statut IS NULL AND etat<>\'archive\'';
        }
        else if(req.param("status") == 'archive'){
            query = 'SELECT * FROM INCIDENT I LEFT JOIN ALLOCATION a USING(idincident) ' +
                'LEFT JOIN PERSONNE P ON a.idpersonne= P.idPersonne WHERE etat=\'' + req.param("status") +'\'';
        }
        else if(req.param("status") == 'habitant'){
            query = 'SELECT * FROM INCIDENT I LEFT JOIN ALLOCATION a USING(idincident) ' +
                'LEFT JOIN PERSONNE P ON a.idpersonne= P.idPersonne WHERE etat<>\'archive\' AND (statut=\'habitant\' OR statut=\'responsable\')';
        }
        else{
            query = 'SELECT * FROM INCIDENT I LEFT JOIN ALLOCATION a USING(idincident) ' +
        'LEFT JOIN PERSONNE P ON a.idpersonne= P.idPersonne WHERE etat<>\'archive\' AND statut=\'' + req.param("status") +'\'';
        }
        console.log("Query :" + query);
        const result = await client.query(query);
        res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;


app.get('/authorName', async(req, res) => {
    try {
        const query = 'SELECT prenom FROM personne WHERE idpersonne=' + req.param("idauteur");
console.log("Query nomAuteur : " + query)
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/getPersonByID', async(req, res) => {
    try {
        const query = 'SELECT * FROM personne WHERE idpersonne=' + req.param("personID");
    console.log("Query getPersonById : " + query)
    const result = await client.query(query);
    res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.post('/deleteAttribution', async(req, res) => {
    try {
        const query = 'DELETE FROM allocation WHERE idincident=' + req.body.idIncident;
console.log("Query deleteAttribution: " + query)
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/selectedPersonForAttribution', async(req, res) => {
    try {
        const query = 'SELECT nom, prenom, a.idpersonne FROM allocation a join personne p on a.idpersonne = p.idpersonne WHERE idincident=' + req.param("incidentID");
console.log("Query selectedPersonForAttribution : " + query)
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/nbCommentForIncident', async(req, res) => {
    try {
        const query = 'SELECT COUNT(*) FROM commentaire WHERE idincident=' + req.param("incidentID");
console.log("Query nbComment : " + query)
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;

app.get('/personInChargeOf', async(req, res) => {
    try {
        const query = 'SELECT * FROM person_in_charge_of_type c JOIN personne p on p.idpersonne = c.idpersonne WHERE type=\'' + req.param("type") +'\'';
console.log("Query personInCharge : " + query)
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch
(err)
{
    res.status(500).json(err);
}
})
;
var connectedPerson = [{
    "idpersonne" : null
}];

app.get('/checkConnexion', async(req, res) => {
    const query = 'SELECT * FROM personne where idpersonne =' + req.param("id") + ' and mdp=\'' + req.param("mdp") + '\' and statut=\'responsable\'';
try {
    const result = await
    client.query(query);
    console.log("queeeeeeeeeeeryX = " + query);
    res.status(200).json(result.rows);
    console.log("res = " + result.rows[0].prenom);
    connectedPerson[0].idpersonne = result.rows[0].idpersonne;
    //res.send("nb connectes : "+result.rows[0].count);
}
catch (err) {
    res.status(500).json(err);
}
})
;

app.get('/isConnected', async(req, res) => {
    res.status(200).json(connectedPerson);
})

app.post('/disconnect', async(req, res) => {
    connectedPerson[0].idpersonne = null;
})

app.get('/connectedPerson', async(req, res) => {
    const query = 'SELECT * FROM personne where idpersonne =' + req.param("id");
try {
    const result = await
    client.query(query);
    console.log("queeeeeeeeeeeryX = " + query);
    res.status(200).json(result.rows);
    console.log("res = " + result.rows[0].prenom);
    //res.send("nb connectes : "+result.rows[0].count);
}
catch (err) {
    res.status(500).json(err);
}
})
;

app.get('/Person', async(req, res) => {
    const query = 'SELECT nom, prenom FROM personne where idpersonne =' + req.param("id");
    try {
        const result = await
            client.query(query);
        console.log("person from id = " + query);
        res.status(200).json(result.rows);
        console.log("res = " + result.rows[0].prenom);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
;

app.get('/nbIncidentByPerson', async(req, res) => {
    var query;
    if(req.param("status") == 'null') {
        query = 'SELECT COUNT(*), a.idpersonne, p.prenom FROM INCIDENT I JOIN ALLOCATION A ON A.idincident = I.idincident JOIN personne p on p.idpersonne = a.idpersonne WHERE I.date >=\'' + req.param("begin") + '\' and I.date <= \'' + req.param("end") + '\' GROUP BY a.idpersonne, p.prenom ';
    } else {
        query = 'SELECT COUNT(*), a.idpersonne, p.prenom FROM INCIDENT I JOIN ALLOCATION A ON A.idincident = I.idincident JOIN personne p on p.idpersonne = a.idpersonne WHERE I.date >=\'' + req.param("begin") + '\' and I.date <= \'' + req.param("end") + '\' and I.etat=\''+ req.param("status")+'\' GROUP BY a.idpersonne, p.prenom ';
    }
try {
    const result = await
    client.query(query);
    console.log("nbIncidentByPerson = " + query);
    res.status(200).json(result.rows);
}
catch (err) {
    res.status(500).json(err);
}
})
;

app.get('/nbIncidentByStatus', async(req, res) => {
    const query = 'SELECT COUNT(*) FROM INCIDENT I WHERE I.etat =\''  + req.param("status") + '\'';
try {
    const result = await
    client.query(query);
    console.log("nbIncidentByStatus = " + query);
    res.status(200).json(result.rows);
}
catch (err) {
    res.status(500).json(err);
}
})
;

app.get('/detailsIncidentByPerson', async(req, res) => {
    var query
    if(req.param("status") == 'null'){
        query = 'SELECT COUNT(*), i.type, a.idpersonne FROM ALLOCATION a JOIN PERSONNE P USING(idpersonne) JOIN INCIDENT I USING(idincident) WHERE I.date >=\'' + req.param("begin") + '\' and I.date <= \'' + req.param("end") + '\' and a.idpersonne =' + req.param("idpersonne") + 'GROUP BY a.idpersonne, i.type';
    } else {
    query = 'SELECT COUNT(*), i.type, a.idpersonne FROM ALLOCATION a JOIN PERSONNE P USING(idpersonne) JOIN INCIDENT I USING(idincident) WHERE I.date >=\'' + req.param("begin") + '\' and I.date <= \'' + req.param("end") + '\' and a.idpersonne =' + req.param("idpersonne") + ' and I.etat=\''+ req.param("status")+'\' GROUP BY a.idpersonne, i.type';
    }
try {
    const result = await
    client.query(query);
    console.log("nbIncidentByPerson = " + query);
    res.status(200).json(result.rows);
}
catch (err) {
    res.status(500).json(err);
}
})
;

app.get('/nbIncident', async(req, res) => {
    const query = 'SELECT COUNT(*) FROM INCIDENT I JOIN ALLOCATION A ON A.idincident = I.idincident JOIN personne p on p.idpersonne = a.idpersonne WHERE I.date >=\''  + req.param("begin") + '\' and I.date <= \'' + req.param("end") +'\'';
try {
    const result = await
    client.query(query);
    console.log("nbIncident = " + query);
    res.status(200).json(result.rows);
}
catch (err) {
    res.status(500).json(err);
}
})
;


app.get('/getCategories', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM incident_type');
        res.status(200).json(result.rows);
    }
    catch(err) {
        res.status(500).json(err);
    }
});


app.post('/newCategory', async(req, res) => {
    try {
        const query = 'INSERT INTO INCIDENT_TYPE VALUES(\''+req.body.categorie+'\')';
        console.log("query = "+query);
        const result =  await client.query(query);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json(err);
}
})

app.post('/addPersonToCategory', async(req, res) => {
    try {
        const query = 'insert into person_in_charge_of_type values('+req.body.id+',\''+req.body.type+'\')';
        console.log("query = "+query);
        const result = await client.query(query);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json(err);
}
})

app.post('/deletePersonFromCategory', async(req, res) => {
    try {
        const query = 'delete from person_in_charge_of_type where idpersonne = '+req.body.id+' and type = \''+req.body.type+'\'';
console.log("query = "+query);
const result = await client.query(query);
res.status(200).json(result.rows);
}
catch (err) {
    res.status(500).json(err);
}
})

var Temperature;
app.post('/Temperature', async(req, res) => {
    // Retrieve payload
    var body = [];
    req.on('data', function(chunk) {
         body.push(chunk);
    }).on('end', async function() {
		  //Recuperation de l'etat
          body = Buffer.concat(body).toString();
          if (body) console.log(JSON.parse(body));
		  Temperature = JSON.parse(body);
		  
		  //Si detecteur == true, on lance une requête
		  console.log("Value : " + Temperature[0].Smoke_Detector);
		  console.log("Salut : _____________________" + Temperature[0].salle);
		  if(Temperature[0].Smoke_Detector == 'True'){
              siren_enable[0].enable = 'true';
			  const query = 'INSERT INTO INCIDENT VALUES(100, \'Feu\', \'Le feu à la maison\', \'feu\', 10, current_date, null, null,\''+ Temperature[0].salle +'\', 10, \'en attente\')';
			  console.log("query =" + query);
			  const result = await client.query(query);
			  res.status(200).json(result.rows);
		  }
          res.end('ça marche');
    });
})

app.get('/Temperature', async(req, res) => {
	res.status(200).json(Temperature);
})


var Luminosity = [{
    "Brightness_Sensor" : "-1"
}];
app.post('/Luminosity', async(req, res) => {
    var body = []
    req.on('data',function(chunk) {
        body.push(chunk);
    }).on('end', async function() {
        body =Buffer.concat(body).toString();
        if (body) {
            console.log(JSON.parse(body));
        }
        Luminosity = JSON.parse(body);

        console.log("Luminosité :" + Luminosity[0].Brightness_Sensor);
    });
});

app.get('/Luminosity', async(req, res) => {
    res.status(200).json(Luminosity);
});

var scenario_enable = [{
    "enable" : "false"
}];
app.post('/Rollers', async(req, res) => {
    //rollers_controle = JSON.parse(req.body.value);
    scenario_enable[0].enable = req.body.value;
    console.log("roller controle a la valeur = "+req.body.value);
})

var security_enable = [{
    "enable" : "false"
}];
var siren_enable = [{
    "enable" : "false"
}];

var deja_declare = false;

app.post('/Security', async(req, res) => {
    const query = 'SELECT * FROM LUMIERES WHERE id = \'O\'';
    const result = await client.query(query);
    if(req.body.value == "true" && result.rows[0].enable == "True"){
        security_enable[0].enable = "true";
        deja_declare = false;
    }
    else if(req.body.value == "false"){
        security_enable[0].enable = "false";
        deja_declare = false;
    }
    console.log("Securité alarm a la valeur = "+security_enable[0].enable+" et O:"+result.rows[0].enable );
})


app.get('/Siren', async(req, res) => {
    const query = 'SELECT * FROM LUMIERES WHERE id = \'O\'';
    const result = await client.query(query);
    if(security_enable[0].enable == "false"){
        siren_enable[0].enable = "false";}
    else if(security_enable[0].enable == "true" && result.rows[0].enable != "True" ){
        //console.log("____ siren_enable0.enable  = "+siren_enable[0].enable);
        console.log("Ici :  ç________________________________________" + deja_declare);
        if ( deja_declare == false ) {
            // Récupérer la salle
            const queryLocalisation = 'select id from lumieres where enable = \'True\'';
            const resultLocalisation =await client.query(queryLocalisation);
            console.log("******************************Salle de l'intrusion : "+resultLocalisation.rows[0].id);


            const query2 = 'insert into incident values(300,\'Intrusion\',\'Intrustion description\',\'Intrusion\',10,CURRENT_DATE,null,null,\''+ resultLocalisation.rows[0].id+'\',12,\'en attente\')';
            const result = await client.query(query2);
            console.log("Déclaration , result = " + result);
            deja_declare =true;
            console.log("Ici : ç3 __________________________________________"+deja_declare);
        }
        deja_declare =true;
        console.log("Ici : ç2 __________________________________________"+deja_declare);
    }
    //console.log("L'alarme est "+ ((siren_enable[0].enable == "true") ? "activée" : "désactivée"));
    //console.log("----------------siren_enable0.enable  = "+siren_enable[0].enable);
    res.status(200).json(siren_enable);
});

app.post('/Siren', async(req, res) => {
    //rollers_controle = JSON.parse(req.body.value);
    console.log("Ici_________________________________________________");
    siren_enable[0].enable = req.body.value;
    console.log("L'alarme a la valeur = "+siren_enable[0].enable );
})



var open_rollers = [{
    "enable" : "false"
}];
app.get('/Rollers', async(req, res) => {
    if(scenario_enable != null && Luminosity[0].Brightness_Sensor != "-1") {
        console.log("Etat scenario = " + scenario_enable[0].enable);
        console.log("Luminosité = " + Luminosity[0].Brightness_Sensor);
        if(scenario_enable[0].enable == "true" && parseInt(Luminosity[0].Brightness_Sensor) >= 1) {
            open_rollers[0].enable = "true";
        } else open_rollers[0].enable = "false";
    }
    console.log("Les volets sont " + ((open_rollers[0].enable == "true") ? "Ouvert" : "Fermé"));
    res.status(200).json(open_rollers);
});
app.get('/Security', async(req, res) => {
    console.log("La sécurité contre intrusion est " + ((security_enable[0].enable == "true") ? "activée" : "Désactivée"));
    res.status(200).json(security_enable);
});
var luminosity_boolean = [{
    "luminosity_bool" : "false"
}];
app.get('/LuminosityBool', async(req, res) => {
    if ( Luminosity[0].Brightness_Sensor != -1 ) {
        if ( parseInt(Luminosity[0].Brightness_Sensor) < 1) { // peu de luminosité , on allume les lumières
            luminosity_boolean[0].luminosity_bool = "true";
            console.log("Luminosity : " + Luminosity[0].Brightness_Sensor + " La luminosité est basse");
        }
        else {  // assez de luminosité -> on éteint les lumières
                luminosity_boolean[0].luminosity_bool = "false";
                console.log("Luminosity : " + Luminosity[0].Brightness_Sensor + " La luminosité est assez haute");
        }
    }
    else {
        console.log("Externe Luminosity par défaut = -1");
    }
    res.status(200).json(luminosity_boolean);
});

var room = [{
    "enable" : "xxxx",
    "id" : "X"
}];
app.post('/ActualRoom', async(req, res) => {
    var body = []
    req.on('data',function(chunk) {
    body.push(chunk);
}).on('end', async function() {
    body =Buffer.concat(body).toString();
    if (body) {
        console.log(JSON.parse(body));
    }
    var roomTemp = [{
        "enable" : "xxxx",
        "id" : "X"
    }];
    roomTemp = JSON.parse(body)
    if(roomTemp[0].enable == "True") {
        const upd = 'UPDATE LUMIERES SET enable=\'' + roomTemp[0].enable + '\' WHERE id=\'' + roomTemp[0].id + '\'';
        const result = await
        client.query(upd);

        const upd2 = 'UPDATE LUMIERES SET enable=\'False \' WHERE id !=\'' + roomTemp[0].id + '\'';
        const result2 = await
        client.query(upd2);

    }
});
})


app.get('/ActualRoom', async(req, res) => {
    try {
        const result = await client.query('SELECT * FROM LUMIERES');
        if(luminosity_boolean[0].luminosity_bool == "false") {
            result.rows.forEach((r) => {
                r.enable = 'False';
            });
        }
        res.status(200).json(result.rows);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

client
    .connect()
    .then(() => {
    console.log('[' + new Date().toISOString() + '] Connect to Postgres OK ');
const server = app.listen(process.env.PORT || 3000, () => {
    console.log('[' + new Date().toISOString() + '] Server launched on port ' + server.address().port + '!');
})
;
})
.
catch(err => {
    console.log(err);
})
;

//app.js
var app = {
    pages: [],
    loadRequirements: 0,
    init: function() {
        //document.addEventListener("deviceready", app.onDeviceReady);
        document.addEventListener("DOMContentLoaded", app.onDomReady);
    },
    //	onDeviceReady: function(){
    //		app.loadRequirements++;
    //		if(app.loadRequirements === 2){
    //			app.start();
    //		}
    //	},
    onDomReady: function() {
        app.loadRequirements++;
        if (app.loadRequirements === 1) {
            app.start();
        }
    },
    start: function() {

        app.pages.push(document.getElementById("people-list"));
        app.pages.push(document.getElementById("occasion-list"));
        app.pages.push(document.getElementById("gifts-for-person"));
        app.pages.push(document.getElementById("gifts-for-occasion"));



        // PRIMARY KEY AUTOINCREMENT
        var db = openDatabase('DataAppBase', '1.0', 'TheDataAppBase', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS people(people_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name VARCHAR)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name VARCHAR)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea VARCHAR, purchased BOOLEAN)');
            //            tx.executeSql('INSERT INTO people(person_name) VALUES ("McKenzie")');
            //            tx.executeSql('INSERT INTO occasions(occ_name) VALUES ("AndyCat")');
            //             tx.executeSql('INSERT INTO gifts (person_id, occ_id, gift_idea) VALUES (1, 1, "TrainSet")')

        });

        //INSERT INTO players (id,name,locX,locY,color) VALUES (11,'McKenzie',49,49,'ffffff')


        var people = document.getElementById("people-list");

        var peopletime = new Hammer(people).on('swipe', function() {
            app.pages[0].className = "";
            app.pages[1].className = "active";
        });

        var occasion = document.getElementById("occasion-list");

        var occasiontime = new Hammer(occasion).on('swipe', function() {
            app.pages[0].className = "active";
            app.pages[1].className = "";
        });

        ///////////////////
        //People///////////
        ///////////////////

        var btnadd1 = document.querySelector(".btnAdd1");
        var modal1 = document.getElementById('add-person');

        var btnlisten1 = new Hammer(btnadd1).on('tap', function() {
            modal1.className = 'active';

            //cancel
            var modal1cancel = document.querySelector('.btnCancel1');
            var modal1can = new Hammer(modal1cancel).on('tap', function() {
                modal1.className = '';
            });
            //save
            var modal1save = document.querySelector('.btnSave1');
            var modal1sav = new Hammer(modal1save).on('tap', function() {
                var inputbox1 = document.getElementById('new-per').value;
                //var inputbox1string = JSON.parse(inputbox1);
                db.transaction(function(tx) {
                    tx.executeSql("INSERT INTO people(person_name) VALUES ('" + inputbox1 + "')");
                });
            });
        });
        //ouput people
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM people', [], function(tx, results) {
                var pepsnumber = results.rows.length,
                    i;
                for (i = 0; i < pepsnumber; i++) {
                    var pepsname = results.rows.item(i).person_name;
                    msg = "<li id='PEPS' class="+ i +">" + pepsname + "</li>";
                    document.querySelector('.listpeople').innerHTML += msg;
                }

                var peoplenumber = document.querySelectorAll('#PEPS');
                for (j = 0; j < peoplenumber.length; j++) {
                    var hammertime3 = new Hammer(peoplenumber[j]).on('tap', function(ev) {
                        app.pages[0].className = "";
                        app.pages[3].className = "active";

                        var cancel4 = document.querySelector('.btnCancel4');
                        var hammertime4 = new Hammer(cancel4).on('tap', function() {
                            app.pages[0].className = "active";
                            app.pages[3].className = "";
                        });
                        
                        var newgiftfor = document.querySelector('.newgiftfor');
                        newgiftfor.innerHTML = "New Gift For " + ev.target.innerHTML;
                        var newgiftforid = ev.target.className;
                        
                        var occasionslist = document.getElementById('list-per-occ');
                        
                        db.transaction(function(tx) {
                            tx.executeSql('SELECT * FROM occasions', [], function(tx, results) {
                            var occsnumber = results.rows.length,
                                i;
                            for (i = 0; i < occsnumber; i++) {
                                var occsname = results.rows.item(i).occ_name;
                                msg = "<option value='" + i + "'>" + occsname + "</option>";
                                occasionslist.innerHTML += msg;
                            }
                            });
                        });
                        
                        
                        var modal5save = document.querySelector('.btnSave5');
                        var modal5sav = new Hammer(modal5save).on('tap', function(ev) {
                        var newidea = document.getElementById('new-idea').value;
                            db.transaction(function(tx) {
                            tx.executeSql("INSERT INTO gifts(gift_id,person_id, occ_id, gift_idea) VALUES ('', '" + newgiftforid + "')");
                                console.log(newgiftforid);
                            });
                        });
                        
                        
                        
                        
                        

                        var Add4 = document.querySelector('.btnAdd4');
                        var thegiftbox = document.getElementById('add-gift');
                        var hammertime5 = new Hammer(Add4).on('tap', function() {
                            thegiftbox.className = 'active';
                        });
                        var cancel5 = document.querySelector('.btnCancel5');
                        var hammertime6 = new Hammer(cancel5).on('tap', function() {
                            thegiftbox.className = '';
                        });
                        
                        


                        var giftpeople = document.querySelector('.giftpeople');
                        giftpeople.innerHTML = "Gifts For " + ev.target.innerHTML;


                    });
                //delete person
                    var hammertime7 = new Hammer(peoplenumber[j]).on('press', function(ev) {
                        var personname = ev.target.innerHTML;
                        db.transaction(function(tx) {
                            alert('cheesiepuffs');
                            tx.executeSql("DELETE FROM people WHERE person_name = '" + personname + "'");
                        });
                  
                    });
                
                }
            }, null);
        });

        //////////////////////
        //Occasions///////////
        //////////////////////

        var btnadd2 = document.querySelector(".btnAdd2");
        var modal2 = document.getElementById('add-occasion');

        var btnlisten2 = new Hammer(btnadd2).on('tap', function() {
            modal2.className = 'active';

            //cancel
            var modal2cancel = document.querySelector('.btnCancel2');
            var modal2can = new Hammer(modal2cancel).on('tap', function() {
                modal2.className = '';
            });
            //save
            var modal2save = document.querySelector('.btnSave2');
            var modal2sav = new Hammer(modal2save).on('tap', function() {
                var inputbox2 = document.getElementById('new-occ').value;
                //var inputbox1string = JSON.parse(inputbox1);
                db.transaction(function(tx) {
                    tx.executeSql("INSERT INTO occasions(occ_name) VALUES ('" + inputbox2 + "')");
                });
            });
        });
        //ouput people
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM occasions', [], function(tx, results) {
                var occsnumber = results.rows.length,
                    i;
                for (i = 0; i < occsnumber; i++) {
                    var occsname = results.rows.item(i).occ_name;
                    msg = "<li id='OCCS'>" + occsname + "</li>";
                    document.querySelector('.listoccasions').innerHTML += msg;
                }

                var eventnumber = document.querySelectorAll('#OCCS');
                for (j = 0; j < eventnumber.length; j++) {
                    var hammertime2 = new Hammer(eventnumber[j]).on('tap', function(ev) {
                        ev.target.innerHTML;
                    });
                }
            }, null);
        });



        //connect to database
        //build the lists for the main pages based on data
        //add button and navigation listeners
    }
}

app.init();
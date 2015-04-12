//app.js

var app= {
    pages: [],
	loadRequirements:0,
	init: function(){
		document.addEventListener("deviceready", app.onDeviceReady);
		document.addEventListener("DOMContentLoaded", app.onDomReady);
	},
	onDeviceReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	onDomReady: function(){
		app.loadRequirements++;
		if(app.loadRequirements === 2){
			app.start();
		}
	},
	start: function(){
        
        alert('ballin');
            app.pages.push(document.getElementById("people-list"));
            app.pages.push(document.getElementById("occasion-list"));
            app.pages.push(document.getElementById("gifts-for-person"));
            app.pages.push(document.getElementById("gifts-for-occasion"));
        
        
        
        // PRIMARY KEY AUTOINCREMENT
        var db = openDatabase('DataAppBase', '1.0', 'TheDataAppBase', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS people(people_id INTEGER PRIMARY KEY AUTOINCREMENT, person_name VARCHAR)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS occasions(occ_id INTEGER PRIMARY KEY AUTOINCREMENT, occ_name VARCHAR)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS gifts(gift_id INTEGER PRIMARY KEY AUTOINCREMENT, person_id INTEGER, occ_id INTEGER, gift_idea VARCHAR, purchased BOOLEAN)');
//            tx.executeSql('INSERT INTO people(person_name) VALUES ("McKenzie")');
//            tx.executeSql('INSERT INTO occasions(occ_name) VALUES ("Christmas")');
            
        });
        
        //INSERT INTO players (id,name,locX,locY,color) VALUES (11,'McKenzie',49,49,'ffffff')
    
        
        var people = document.getElementById("people-list");
        
        var peopletime = new Hammer(people).on('swipe', function(){
                app.pages[0].className = "";
                app.pages[1].className = "active";
        });
        
        var occasion = document.getElementById("occasion-list");
        
        var occasiontime = new Hammer(occasion).on('swipe', function(){
                app.pages[0].className = "active"; 
                app.pages[1].className = "";
        });
        
        var btnadd1 = document.querySelector(".btnAdd1");
        var modal1 = document.getElementById('add-person-occasion');
        
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
                var inputbox1 = document.getElementById('new-per-occ').value;
                //var inputbox1string = JSON.parse(inputbox1);
                db.transaction(function (tx) {
                   tx.executeSql("INSERT INTO people(person_name) VALUES ('" + inputbox1 + "')");
                });
            });
        });
        
        
        //ouput people
            var mypeeps = document.querySelector('.listpeople');

            //var pepsinfo = 
            //mypeeps.innerHTML += '<li>'  '</li>';
        

		//connect to database
		//build the lists for the main pages based on data
		//add button and navigation listeners
	}
}

app.init();
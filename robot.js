var connection;
(function (ext) {
    console.log("robot v1");
    // Cleanup function when the extension is unloaded
    
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return { status:2, msg:'Ready' };
    };
	
	ext.connect = function(device) {
		
		var ip="";
		if (device==1){
			ip="172.20.10.10";
		} else if (device==2){
			ip="172.20.10.11";
		} else if (device==3){
			ip="172.20.10.53";
		} else if (device==4){
			ip="172.20.10.54";
		} else if (device==5){
			ip="172.20.10.55";
		} else if (device==6){
			ip="172.20.10.56";
		} else if (device==7){
			ip="172.20.10.57";
		} else if (device==8){
			ip="172.20.10.11";
		} else if (device==9){
			ip="172.20.10.59";
		} else if (device==10){
			ip="172.20.10.60";
		}
		
    	console.log("connect");
    	console.log(ip);
    	console.log(connection);
    	if (!connection || connection.readyState > 1){
    		console.log("not isConnected");
    		console.log("connecting... "+ ip+":81/test");
	    	connection = new WebSocket("ws://" +ip+":81/test", ['arduino']);
			connection.onopen = function () {
				console.log("connection open");
				
				connection.isConnected=true;
    			console.log("readyState", connection.readyState);
				//connection.send('hello');
			};
			connection.onclose = function () {
				console.log("connection close");
				connection.close();
				connection.isConnected=false;
				//connection.send('hello');
			};
			
			connection.onerror = function (error) {
				console.log('WebSocket Error ', error);
			};
			
			connection.onmessage = function (e) {
				console.log('Server: ', e.data);
			};
		} else{
    	console.log(" isConnected");
    		console.log("readyState", connection.readyState);
			
		}
    };
	ext.disconnect = function() {
    	console.log("disconnect");
    	console.log(connection);
    	connection.close();
    };
    ext.leftGo = function(direction) {
    	//var json ='{"action":"leftGo","direction":"'+direction+'"}';
    	var msg = {
			action: "leftGo",
			direction: direction
		};
    	connection.send(JSON.stringify(msg));
    	console.log("leftGo!", msg);
        
    };
    ext.leftStop = function() {
    	var msg = {
			action: "leftStop"
		};
    	console.log("leftStop!", msg);
    	connection.send(JSON.stringify(msg));
    };
	ext.rightGo = function(direction) {
    	var msg = {
			action: "rightGo",
			direction: direction
		};
    	console.log("rightGo!", msg);
    	connection.send(JSON.stringify(msg));
    };
	ext.rightStop = function() {
    	var msg = {
			action: "rightStop"
		};
    	console.log("rightStop!", msg);
    	connection.send(JSON.stringify(msg));
    };
	
	ext.setSpeed = function(speed) {
    	var msg = {
			action: "setSpeed",
			speed: speed
		};
    	console.log("setSpeed!", msg);
    	connection.send(JSON.stringify(msg));
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            [" ", "Connect to %m.device", "connect"],
            [" ", "Disconnect", "disconnect"],
            [" ", "Left Wheel Go %m.blockPos", "leftGo", "forward"],
            [" ", "Left Wheel Stop", "leftStop"],
            [" ", "Right Wheel Go %m.blockPos", "rightGo", "forward"],
            [" ", "Right Wheel Stop", "rightStop"],
            //[" ", "Set Speed %m.speed", "setSpeed", 50],
            
        ],
        menus: {
            device: [1,2,3,4,5,6,7,8,9,10],
            blockPos: ['forward', 'reverse'],
            speed: [10,20,30,40,50,60,70,80,90,100]
        }
    };

    // Register the extension
    ScratchExtensions.register('Robot', descriptor, ext);

})({});
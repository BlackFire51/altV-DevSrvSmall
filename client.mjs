import game from 'natives';
import alt from 'alt'

game.setPedDefaultComponentVariation(game.playerPedId());

alt.on('consoleCommand', function (...args) {
	if(args[0]=="max"){
		alt.log('v:'+game.getVehicleMaxSpeed(player.vehicle.scriptID)+ ' c:'+game.getVehicleClassMaxSpeed(player.vehicle.scriptID) )
		return;
	}
	if(args[0]=='c'){
		alt.log("cloth "+ (+args[1])+ " "+ (+args[2]))
		game.setPedComponentVariation(game.playerPedId(), +args[1], +args[2], 0, 0); // Set CLoth
		return;
	}
	let argsArr = Array.from(args)
	if (argsArr.join(' ').trim().length < 1) return;
	alt.log(`You Typed: ${argsArr.join(' ')}`);
	alt.emitServer("execCmd", argsArr)
});

let localPlayer=alt.Player.local;
let speed=0
alt.setInterval(() => { // onRender
	//### Tacho
	if (localPlayer.vehicle ){
		speed=localPlayer.vehicle.speed
		speed=speed*3.6;
		drawText(`${Math.round(speed)} km/h`, 0.90, 0.85, 0.6, 255, 255, 255, 255 ) // 7, false, false, true, false
	}
	//### Tacho ENDE
	game.invalidateIdleCam()
},0)


//wordwrap not implemented
function drawText(text, xPos, yPos, scale, r, g, b, alpha) { //font, justify, shadow, outline, wordwrap

    game.setTextScale(1.0, scale);
    game.setTextFont(7);
    game.setTextColour(r, g, b, alpha);
    //graphics.setTextJustification(justify);

    //if (justify == 2) graphics.setTextWrap(0.0, xPos);
    //if (shadow)    graphics.setTextDropshadow(0, 0, 0, 0, 255);
	//if (outline)    
	game.setTextOutline();

    game.beginTextCommandDisplayText("STRING");
    game.addTextComponentSubstringPlayerName(text);

    game.endTextCommandDisplayText(xPos, yPos);
}


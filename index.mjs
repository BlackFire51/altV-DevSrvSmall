import alt from 'alt';

alt.on('playerConnect', (player) => { //on player connect set model and spawn at 0 0
    player.model = 1885233650
    player.spawn(0, 0, 71, 0);
});

alt.on('consoleCommand', (...args) => { // take inputs from server Console
    let argsArr = Array.from(args)
    if (argsArr.join(' ').trim().length < 1) return;
    consoleExec(null, argsArr)
});
alt.onClient("execCmd", (player, args) => { // get inputs from client Console
    consoleExec(player, args)
})
const posArr = [ // pos array to enable spawning veh from server console
    { x: 0, y: 10, z: 70 },
    { x: 0, y: 13, z: 70 },
    { x: 0, y: 16, z: 70 },
    { x: 0, y: 19, z: 70 }
]
let posPtr = 0

function consoleExec(player, args) { // interpret command
    console.log("got cmd", args)
    if (args[0] == undefined) return; // no command given return
    const func = args[0] // get funcion name
    args.shift() // shift to remove func name from array
    switch (func) {
        case 'veh': //spawn vehicle
            let className = args[0]
            console.log("Create new Temp Veh ", className)
            let pos = posArr[posPtr]
            if (player != null) {
                pos = player.pos.add(4,0,0)
            }
            let veh = new alt.Vehicle(className, pos.x, pos.y, pos.z, 0, 0, 0);
            posPtr = (posPtr + 1) % posArr.length
            break;
        case 'respawn': // respawn player
            if (player == null) return;
            player.spawn(0, 0, 72, 0);
            break;
        case 'tp': //tp player
            if (player == null) return;
            let str = args.join(' ')
            let groups = str.match(/\s*(-?\s?\d+\.?\d*)[,\s]+(-?\s?\d+\.?\d*)[,\s]+(-?\s?\d+\.?\d*)/)

            player.pos = new alt.Vector3({ x: +groups[1], y: +groups[2], z: +groups[3] } )
            break;
        case 'delveh': // del vehicle in wich
            if (player == null || !player.vehicle) return;
            player.vehicle.destroy();
            break;
        case 'delveh1': // del fist vehicle in altV array
            if (alt.Vehicle.all.length > 0) {
                alt.Vehicle.all[0].destroy();
                console.log("done")
            } else {
                console.log("No veh Left")
            }
			break;
		case 'gib': // del fist vehicle in altV array
			let weaponName = args[0]
			if (!weaponName || weaponName.length < 1) return
			let hash= +weaponName
			if(isNaN(hash) || hash < 1000){ // if we entery a numer we use it as hash .. otherwise we compute a hash
				weaponName=weaponName.toLowerCase()
				if(!weaponName.startsWith('weapon_') && !weaponName.startsWith('gadget_') ) weaponName = 'weapon_' + weaponName
				hash = alt.hash(weaponName);
			}
			player.giveWeapon(hash, 1000, true);
			console.log("ply ", player.name, " spawned weapon: ",weaponName,":", hash)
            break;
        default:
            break;
    }
}
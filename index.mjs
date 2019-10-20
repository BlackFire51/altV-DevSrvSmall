import alt from 'alt';

alt.on('playerConnect', (player) => {
    player.model = 1885233650
    player.spawn(0, 0, 72, 0);
});

alt.on('consoleCommand', (...args) => {
    let argsArr = Array.from(args)
    if (argsArr.join(' ').trim().length < 1) return;
    consoleExec(null, argsArr)
});
alt.onClient("execCmd", (player, args) => {
    consoleExec(player, args)
})
const posArr = [
    { x: 0, y: 10, z: 70 },
    { x: 0, y: 13, z: 70 },
    { x: 0, y: 16, z: 70 },
    { x: 0, y: 19, z: 70 }
]
let posPtr = 0

function consoleExec(player, args) {
    console.log("got cmd", args)
    if (args[0] == undefined) return;
    const func = args[0]
    args.shift()
    switch (func) {
        case 'veh':
            let className = args[0]
            console.log("Create new Temp Veh ", className)
            let pos = posArr[posPtr]
            if (player != null) {
                pos = player.pos
                pos.y += 3

            }
            vehObj.spawnVehicleTEMP(null, className, pos, { x: 0, y: 0, z: 0 }, [0, 0, 0, 0, 0, 0], 99)
            posPtr = (posPtr + 1) % posArr.length
            break;
        case 'respawn':
            if (player == null) return;
            player.spawn(0, 0, 72, 0);
            break;
        case 'tp':
            if (player == null) return;
            let str = args.join(' ')
            let groups = str.match(/\s*(\d+\.?\d*)[,\s]+(\d+\.?\d*)[,\s]+(\d+\.?\d*)/)

            player.pos = { x: +groups[1], y: +groups[2], z: +groups[3] }
            break;
        case 'delveh':
            if (player == null || !player.vehicle) return;
            player.vehicle.destroy();
            break;
        case 'delveh1':
            if (alt.Vehicle.all.length > 0) {
                alt.Vehicle.all[0].destroy();
                console.log("done")
            } else {
                console.log("No veh Left")
            }

            break;
        default:
            break;
    }
}

class VehicleServerClass {

    spawnVehicleTEMP(err, className, positionVec3, rotationVec3, color, ownerId) {
        if (err) {
            log.error("err: ", err)
            return;
        }
        console.log("Create new Temp Veh ", className)
        let veh = new alt.Vehicle(className, positionVec3.x, positionVec3.y, positionVec3.z, rotationVec3.x, rotationVec3.y, rotationVec3.z);

        veh.customPrimaryColor = { r: color[0], g: color[1], b: color[2] }
        veh.customSecondaryColor = { r: color[3], g: color[4], b: color[5] };
        console.log("return new Veh ")
        return veh
    }
}
const vehObj = new VehicleServerClass()
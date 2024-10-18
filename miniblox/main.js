const io = require("socket.io-client");
const brotli = require("brotli");
const { Decoder, protocol } = require("socket.io-msgpack-parser");
const { encode, decode } = require("@msgpack/msgpack");
const { Message, proto2, proto3 } = require("./proto.js");

var yT = Object.defineProperty;
var xT = (j,_,$)=>_ in j ? yT(j, _, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: $
}) : j[_] = $;
var ST = (j,_)=>()=>(_ || j((_ = {
	exports: {}
}).exports, _),
_.exports);
var ut = (j,_,$)=>(xT(j, typeof _ != "symbol" ? _ + "" : _, $),
$);

const SPacketLoginStart = class extends Message {
	constructor($) {
		super();
		ut(this, "session");
		ut(this, "hydration");
		ut(this, "metricsId");
		ut(this, "requestedUuid");
		ut(this, "clientVersion");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketLoginStart().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketLoginStart().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketLoginStart().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketLoginStart, $, et)
	}
};
exports.SPacketLoginStart = SPacketLoginStart,
ut(SPacketLoginStart, "runtime", proto2),
ut(SPacketLoginStart, "typeName", "SPacketLoginStart"),
ut(SPacketLoginStart, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "session",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 2,
	name: "hydration",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "metrics_id",
	kind: "scalar",
	T: 9
}, {
	no: 4,
	name: "requested_uuid",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "client_version",
	kind: "scalar",
	T: 9
}]));
const PBItemStack = class extends Message {
	constructor($) {
		super();
		ut(this, "present");
		ut(this, "id");
		ut(this, "stackSize");
		ut(this, "durability");
		ut(this, "data");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBItemStack().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBItemStack().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBItemStack().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBItemStack, $, et)
	}
}
;
exports.PBItemStack = PBItemStack,
ut(PBItemStack, "runtime", proto2),
ut(PBItemStack, "typeName", "PBItemStack"),
ut(PBItemStack, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "present",
	kind: "scalar",
	T: 8
}, {
	no: 2,
	name: "id",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 3,
	name: "stackSize",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 5,
	name: "durability",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 4,
	name: "data",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
const PBBlockPos = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBBlockPos().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBBlockPos().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBBlockPos().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBBlockPos, $, et)
	}
};
exports.PBBlockPos = PBBlockPos,
ut(PBBlockPos, "runtime", proto2),
ut(PBBlockPos, "typeName", "PBBlockPos"),
ut(PBBlockPos, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 17
}]));
const PBVector3 = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBVector3().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBVector3().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBVector3().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBVector3, $, et)
	}
};
exports.PBVector3 = PBVector3,
ut(PBVector3, "runtime", proto2),
ut(PBVector3, "typeName", "PBVector3"),
ut(PBVector3, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 17
}]));
const PBFloatVector3 = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBFloatVector3().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBFloatVector3().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBFloatVector3().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBFloatVector3, $, et)
	}
};
exports.PBFloatVector3 = PBFloatVector3,
ut(PBFloatVector3, "runtime", proto2),
ut(PBFloatVector3, "typeName", "PBFloatVector3"),
ut(PBFloatVector3, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 2
}]));
const CPacketEntityVelocity = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "motion");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityVelocity().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityVelocity().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityVelocity().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityVelocity, $, et)
	}
};
exports.CPacketEntityVelocity = CPacketEntityVelocity,
ut(CPacketEntityVelocity, "runtime", proto2),
ut(CPacketEntityVelocity, "typeName", "CPacketEntityVelocity"),
ut(CPacketEntityVelocity, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "motion",
	kind: "message",
	T: PBFloatVector3
}]));
const CPacketChunkData = class extends Message {
	constructor($) {
		super();
		ut(this, "x", 0);
		ut(this, "z", 0);
		ut(this, "cells", []);
		ut(this, "tileEntities", []);
		proto3.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketChunkData().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketChunkData().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketChunkData().fromJsonString($, et)
	}
	static equals($, et) {
		return proto3.util.equals(CPacketChunkData, $, et)
	}
};
ut(CPacketChunkData, "runtime", proto3),
ut(CPacketChunkData, "typeName", "CPacketChunkData"),
ut(CPacketChunkData, "fields", proto3.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 2,
	name: "z",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "cells",
	kind: "message",
	T: PBCell,
	repeated: !0
}, {
	no: 4,
	name: "tileEntities",
	kind: "message",
	T: PBTileEntity,
	repeated: !0
}]));
const PBCell = class extends Message {
	constructor($) {
		super();
		ut(this, "y", 0);
		ut(this, "bitsPerEntry", 0);
		ut(this, "palette", []);
		ut(this, "bitArray", new Uint8Array(0));
		ut(this, "blockRefCount", 0);
		proto3.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBCell().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBCell().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBCell().fromJsonString($, et)
	}
	static equals($, et) {
		return proto3.util.equals(PBCell, $, et)
	}
};
ut(PBCell, "runtime", proto3),
ut(PBCell, "typeName", "PBCell"),
ut(PBCell, "fields", proto3.util.newFieldList(()=>[{
	no: 7,
	name: "y",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "bitsPerEntry",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "palette",
	kind: "scalar",
	T: 13,
	repeated: !0
}, {
	no: 6,
	name: "bitArray",
	kind: "scalar",
	T: 12
}, {
	no: 5,
	name: "blockRefCount",
	kind: "scalar",
	T: 13
}]));
const PBTileEntity = class extends Message {
	constructor($) {
		super();
		ut(this, "x", 0);
		ut(this, "y", 0);
		ut(this, "z", 0);
		ut(this, "nbt", new Uint8Array(0));
		proto3.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBTileEntity().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBTileEntity().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBTileEntity().fromJsonString($, et)
	}
	static equals($, et) {
		return proto3.util.equals(PBTileEntity, $, et)
	}
};
ut(PBTileEntity, "runtime", proto3),
ut(PBTileEntity, "typeName", "PBTileEntity"),
ut(PBTileEntity, "fields", proto3.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 17
}, {
	no: 5,
	name: "nbt",
	kind: "scalar",
	T: 12
}]));
const CPacketEntityEquipment = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "equipment", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityEquipment().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityEquipment().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityEquipment().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityEquipment, $, et)
	}
};
exports.CPacketEntityEquipment = CPacketEntityEquipment,
ut(CPacketEntityEquipment, "runtime", proto2),
ut(CPacketEntityEquipment, "typeName", "CPacketEntityEquipment"),
ut(CPacketEntityEquipment, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "equipment",
	kind: "message",
	T: Equipment,
	repeated: !0
}]));
const Equipment = class extends Message {
	constructor($) {
		super();
		ut(this, "slot");
		ut(this, "item");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new Equipment().fromBinary($, et)
	}
	static fromJson($, et) {
		return new Equipment().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new Equipment().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(Equipment, $, et)
	}
};
exports.Equipment = Equipment,
ut(Equipment, "runtime", proto2),
ut(Equipment, "typeName", "Equipment"),
ut(Equipment, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "slot",
	kind: "enum",
	T: proto2.getEnumType(Equipment_Slot)
}, {
	no: 2,
	name: "item",
	kind: "message",
	T: PBItemStack
}]));
var Equipment_Slot = (j=>(j[j.UNDEFINED_SLOT = 0] = "UNDEFINED_SLOT",
j[j.MAIN_HAND = 1] = "MAIN_HAND",
j[j.OFF_HAND = 2] = "OFF_HAND",
j[j.HELMET = 3] = "HELMET",
j[j.CHESTPLATE = 4] = "CHESTPLATE",
j[j.LEGGINGS = 5] = "LEGGINGS",
j[j.BOOTS = 6] = "BOOTS",
j))(Equipment_Slot || {});
proto2.util.setEnumType(Equipment_Slot, "Equipment.Slot", [{
	no: 0,
	name: "UNDEFINED_SLOT"
}, {
	no: 1,
	name: "MAIN_HAND"
}, {
	no: 2,
	name: "OFF_HAND"
}, {
	no: 3,
	name: "HELMET"
}, {
	no: 4,
	name: "CHESTPLATE"
}, {
	no: 5,
	name: "LEGGINGS"
}, {
	no: 6,
	name: "BOOTS"
}]);
const SPacketUpdateInventory = class extends Message {
	constructor($) {
		super();
		ut(this, "main", []);
		ut(this, "armor", []);
		ut(this, "idkWhatThisIs");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketUpdateInventory().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketUpdateInventory().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketUpdateInventory().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketUpdateInventory, $, et)
	}
};
exports.SPacketUpdateInventory = SPacketUpdateInventory,
ut(SPacketUpdateInventory, "runtime", proto2),
ut(SPacketUpdateInventory, "typeName", "SPacketUpdateInventory"),
ut(SPacketUpdateInventory, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "main",
	kind: "message",
	T: PBItemStack,
	repeated: !0
}, {
	no: 2,
	name: "armor",
	kind: "message",
	T: PBItemStack,
	repeated: !0
}, {
	no: 3,
	name: "idkWhatThisIs",
	kind: "message",
	T: PBItemStack
}]));
const CPacketUpdateSign = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "lines", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateSign().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateSign().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateSign().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateSign, $, et)
	}
};
exports.CPacketUpdateSign = CPacketUpdateSign,
ut(CPacketUpdateSign, "runtime", proto2),
ut(CPacketUpdateSign, "typeName", "CPacketUpdateSign"),
ut(CPacketUpdateSign, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "lines",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketUpdateCommandBlock = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "command");
		ut(this, "commands", []);
		ut(this, "repeat");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateCommandBlock().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateCommandBlock().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateCommandBlock().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateCommandBlock, $, et)
	}
};
exports.CPacketUpdateCommandBlock = CPacketUpdateCommandBlock,
ut(CPacketUpdateCommandBlock, "runtime", proto2),
ut(CPacketUpdateCommandBlock, "typeName", "CPacketUpdateCommandBlock"),
ut(CPacketUpdateCommandBlock, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "command",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "commands",
	kind: "scalar",
	T: 9,
	repeated: !0
}, {
	no: 4,
	name: "repeat",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const SPacketCloseWindow = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketCloseWindow().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketCloseWindow().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketCloseWindow().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketCloseWindow, $, et)
	}
};
exports.SPacketCloseWindow = SPacketCloseWindow,
ut(SPacketCloseWindow, "runtime", proto2),
ut(SPacketCloseWindow, "typeName", "SPacketCloseWindow"),
ut(SPacketCloseWindow, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}]));
const SPacketEntityAction = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "sneak");
		ut(this, "sprinting");
		ut(this, "punching");
		ut(this, "fire");
		ut(this, "stopSleeping");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketEntityAction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketEntityAction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketEntityAction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketEntityAction, $, et)
	}
};
exports.SPacketEntityAction = SPacketEntityAction,
ut(SPacketEntityAction, "runtime", proto2),
ut(SPacketEntityAction, "typeName", "SPacketEntityAction"),
ut(SPacketEntityAction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "sneak",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 3,
	name: "sprinting",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 4,
	name: "punching",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 20,
	name: "fire",
	kind: "scalar",
	T: 5,
	opt: !0
}, {
	no: 21,
	name: "stopSleeping",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const SPacketPlayerAbilities = class extends Message {
	constructor($) {
		super();
		ut(this, "isFlying");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketPlayerAbilities().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketPlayerAbilities().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketPlayerAbilities().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketPlayerAbilities, $, et)
	}
};
exports.SPacketPlayerAbilities = SPacketPlayerAbilities,
ut(SPacketPlayerAbilities, "runtime", proto2),
ut(SPacketPlayerAbilities, "typeName", "SPacketPlayerAbilities"),
ut(SPacketPlayerAbilities, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "isFlying",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const SPacketPlayerPosLook = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "yaw");
		ut(this, "pitch");
		ut(this, "onGround");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketPlayerPosLook().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketPlayerPosLook().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketPlayerPosLook().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketPlayerPosLook, $, et)
	}
};
exports.SPacketPlayerPosLook = SPacketPlayerPosLook,
ut(SPacketPlayerPosLook, "runtime", proto2),
ut(SPacketPlayerPosLook, "typeName", "SPacketPlayerPosLook"),
ut(SPacketPlayerPosLook, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: Vector3,
	opt: !0
}, {
	no: 2,
	name: "yaw",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 3,
	name: "pitch",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 4,
	name: "onGround",
	kind: "scalar",
	T: 8
}]));
const Vector3 = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new Vector3().fromBinary($, et)
	}
	static fromJson($, et) {
		return new Vector3().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new Vector3().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(Vector3, $, et)
	}
};
exports.Vector3 = Vector3,
ut(Vector3, "runtime", proto2),
ut(Vector3, "typeName", "Vector3"),
ut(Vector3, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 2
}]));
let SPacketRespawn$1 = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new SPacketRespawn$1().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new SPacketRespawn$1().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new SPacketRespawn$1().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(SPacketRespawn$1, _, $)
	}
};
exports.SPacketRespawn$1 = SPacketRespawn$1,
ut(SPacketRespawn$1, "runtime", proto2),
ut(SPacketRespawn$1, "typeName", "SPacketRespawn"),
ut(SPacketRespawn$1, "fields", proto2.util.newFieldList(()=>[]));
const SPacketOpenShop = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new SPacketOpenShop().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new SPacketOpenShop().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new SPacketOpenShop().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(SPacketOpenShop, _, $)
	}
};
exports.SPacketOpenShop = SPacketOpenShop,
ut(SPacketOpenShop, "runtime", proto2),
ut(SPacketOpenShop, "typeName", "SPacketOpenShop"),
ut(SPacketOpenShop, "fields", proto2.util.newFieldList(()=>[]));
var WorldGenerationType = (j=>(j.FLAT = "FLAT",
j.NORMAL = "NORMAL",
j.VOID = "VOID",
j.DEBUG = "DEBUG",
j.SKYBLOCK = "SKYBLOCK",
j.ONEBLOCK = "ONEBLOCK",
j))(WorldGenerationType || {})
	, PBAction = (j=>(j[j.START_DESTROY_BLOCK = 0] = "START_DESTROY_BLOCK",
j[j.ABORT_DESTROY_BLOCK = 1] = "ABORT_DESTROY_BLOCK",
j[j.STOP_DESTROY_BLOCK = 2] = "STOP_DESTROY_BLOCK",
j[j.DROP_ALL_ITEMS = 3] = "DROP_ALL_ITEMS",
j[j.DROP_ITEM = 4] = "DROP_ITEM",
j[j.RELEASE_USE_ITEM = 5] = "RELEASE_USE_ITEM",
j))(PBAction || {});
exports.PBAction = PBAction;
proto2.util.setEnumType(PBAction, "PBAction", [{
	no: 0,
	name: "START_DESTROY_BLOCK"
}, {
	no: 1,
	name: "ABORT_DESTROY_BLOCK"
}, {
	no: 2,
	name: "STOP_DESTROY_BLOCK"
}, {
	no: 3,
	name: "DROP_ALL_ITEMS"
}, {
	no: 4,
	name: "DROP_ITEM"
}, {
	no: 5,
	name: "RELEASE_USE_ITEM"
}]);
var PBEnumFacing = (j=>(j[j.UNDEFINED_FACE = 0] = "UNDEFINED_FACE",
j[j.DOWN = 1] = "DOWN",
j[j.UP = 2] = "UP",
j[j.NORTH = 3] = "NORTH",
j[j.SOUTH = 4] = "SOUTH",
j[j.WEST = 5] = "WEST",
j[j.EAST = 6] = "EAST",
j))(PBEnumFacing || {});
exports.PBEnumFacing = PBEnumFacing;
proto2.util.setEnumType(PBEnumFacing, "PBEnumFacing", [{
	no: 0,
	name: "UNDEFINED_FACE"
}, {
	no: 1,
	name: "DOWN"
}, {
	no: 2,
	name: "UP"
}, {
	no: 3,
	name: "NORTH"
}, {
	no: 4,
	name: "SOUTH"
}, {
	no: 5,
	name: "WEST"
}, {
	no: 6,
	name: "EAST"
}]);
const SPacketBreakBlock = class extends Message {
	constructor($) {
		super();
		ut(this, "location");
		ut(this, "start");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketBreakBlock().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketBreakBlock().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketBreakBlock().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketBreakBlock, $, et)
	}
};
exports.SPacketBreakBlock = SPacketBreakBlock,
ut(SPacketBreakBlock, "runtime", proto2),
ut(SPacketBreakBlock, "typeName", "SPacketBreakBlock"),
ut(SPacketBreakBlock, "fields", proto2.util.newFieldList(() => [{
	no: 1,
	name: "location",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "start",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const SPacketClick = class extends Message {
	constructor($) {
		super();
		ut(this, "location");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketClick().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketClick().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketClick().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketClick, $, et)
	}
};
exports.SPacketClick = SPacketClick,
ut(SPacketClick, "runtime", proto2),
ut(SPacketClick, "typeName", "SPacketClick"),
ut(SPacketClick, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "location",
	kind: "message",
	T: PBBlockPos,
	opt: !0
}]));
const SPacketPlaceBlock = class extends Message {
	constructor($) {
		super();
		ut(this, "positionIn");
		ut(this, "side");
		ut(this, "hitX");
		ut(this, "hitY");
		ut(this, "hitZ");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketPlaceBlock().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketPlaceBlock().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketPlaceBlock().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketPlaceBlock, $, et)
	}
};
exports.SPacketPlaceBlock = SPacketPlaceBlock,
ut(SPacketPlaceBlock, "runtime", proto2),
ut(SPacketPlaceBlock, "typeName", "SPacketPlaceBlock"),
ut(SPacketPlaceBlock, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "positionIn",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "side",
	kind: "enum",
	T: proto2.getEnumType(PBEnumFacing)
}, {
	no: 4,
	name: "hitX",
	kind: "scalar",
	T: 2
}, {
	no: 5,
	name: "hitY",
	kind: "scalar",
	T: 2
}, {
	no: 6,
	name: "hitZ",
	kind: "scalar",
	T: 2
}]));
const SPacketUseItem = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new SPacketUseItem().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new SPacketUseItem().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new SPacketUseItem().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(SPacketUseItem, _, $)
	}
};
exports.SPacketUseItem = SPacketUseItem,
ut(SPacketUseItem, "runtime", proto2),
ut(SPacketUseItem, "typeName", "SPacketUseItem"),
ut(SPacketUseItem, "fields", proto2.util.newFieldList(()=>[]));
const SPacketClickWindow = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "slotId");
		ut(this, "button");
		ut(this, "mode");
		ut(this, "itemStack");
		ut(this, "transactionId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketClickWindow().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketClickWindow().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketClickWindow().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketClickWindow, $, et)
	}
};
exports.SPacketClickWindow = SPacketClickWindow,
ut(SPacketClickWindow, "runtime", proto2),
ut(SPacketClickWindow, "typeName", "SPacketClickWindow"),
ut(SPacketClickWindow, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "slotId",
	kind: "scalar",
	T: 5
}, {
	no: 4,
	name: "button",
	kind: "scalar",
	T: 5
}, {
	no: 5,
	name: "mode",
	kind: "scalar",
	T: 5
}, {
	no: 6,
	name: "itemStack",
	kind: "message",
	T: PBItemStack
}, {
	no: 7,
	name: "transactionId",
	kind: "scalar",
	T: 5
}]));
const SPacketPlayerAction = class extends Message {
	constructor($) {
		super();
		ut(this, "position");
		ut(this, "facing");
		ut(this, "action");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketPlayerAction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketPlayerAction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketPlayerAction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketPlayerAction, $, et)
	}
};
exports.SPacketPlayerAction = SPacketPlayerAction,
ut(SPacketPlayerAction, "runtime", proto2),
ut(SPacketPlayerAction, "typeName", "SPacketPlayerAction"),
ut(SPacketPlayerAction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "position",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "facing",
	kind: "enum",
	T: proto2.getEnumType(PBEnumFacing)
}, {
	no: 3,
	name: "action",
	kind: "enum",
	T: proto2.getEnumType(PBAction)
}]));
const SPacketUseEntity = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "action");
		ut(this, "hitVec");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketUseEntity().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketUseEntity().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketUseEntity().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketUseEntity, $, et)
	}
};
exports.SPacketUseEntity = SPacketUseEntity,
ut(SPacketUseEntity, "runtime", proto2),
ut(SPacketUseEntity, "typeName", "SPacketUseEntity"),
ut(SPacketUseEntity, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "action",
	kind: "enum",
	T: proto2.getEnumType(SPacketUseEntity_Action)
}, {
	no: 3,
	name: "hitVec",
	kind: "message",
	T: PBFloatVector3,
	opt: !0
}]));
var SPacketUseEntity_Action = (j=>(j[j.INTERACT = 0] = "INTERACT",
j[j.ATTACK = 1] = "ATTACK",
j[j.INTERACT_AT = 2] = "INTERACT_AT",
j))(SPacketUseEntity_Action || {});
proto2.util.setEnumType(SPacketUseEntity_Action, "SPacketUseEntity.Action", [{
	no: 0,
	name: "INTERACT"
}, {
	no: 1,
	name: "ATTACK"
}, {
	no: 2,
	name: "INTERACT_AT"
}]);
const SPacketMessage = class extends Message {
	constructor($) {
		super();
		ut(this, "text");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketMessage().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketMessage().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketMessage().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketMessage, $, et)
	}
};
exports.SPacketMessage = SPacketMessage,
ut(SPacketMessage, "runtime", proto2),
ut(SPacketMessage, "typeName", "SPacketMessage"),
ut(SPacketMessage, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "text",
	kind: "scalar",
	T: 9
}]));
const CPacketAnimation = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "type");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketAnimation().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketAnimation().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketAnimation().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketAnimation, $, et)
	}
};
exports.CPacketAnimation = CPacketAnimation,
ut(CPacketAnimation, "runtime", proto2),
ut(CPacketAnimation, "typeName", "CPacketAnimation"),
ut(CPacketAnimation, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "type",
	kind: "scalar",
	T: 13
}]));
const CPacketBlockAction = class extends Message {
	constructor($) {
		super();
		ut(this, "blockPos");
		ut(this, "instrument");
		ut(this, "pitch");
		ut(this, "blockId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketBlockAction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketBlockAction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketBlockAction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketBlockAction, $, et)
	}
};
exports.CPacketBlockAction = CPacketBlockAction,
ut(CPacketBlockAction, "runtime", proto2),
ut(CPacketBlockAction, "typeName", "CPacketBlockAction"),
ut(CPacketBlockAction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "blockPos",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "instrument",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "pitch",
	kind: "scalar",
	T: 17
}, {
	no: 4,
	name: "blockId",
	kind: "scalar",
	T: 13
}]));
const CPacketBlockUpdate = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketBlockUpdate().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketBlockUpdate().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketBlockUpdate().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketBlockUpdate, $, et)
	}
};
exports.CPacketBlockUpdate = CPacketBlockUpdate,
ut(CPacketBlockUpdate, "runtime", proto2),
ut(CPacketBlockUpdate, "typeName", "CPacketBlockUpdate"),
ut(CPacketBlockUpdate, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "y",
	kind: "scalar",
	T: 17
}, {
	no: 4,
	name: "z",
	kind: "scalar",
	T: 17
}]));
const CPacketChangeServers = class extends Message {
	constructor($) {
		super();
		ut(this, "url");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketChangeServers().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketChangeServers().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketChangeServers().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketChangeServers, $, et)
	}
};
exports.CPacketChangeServers = CPacketChangeServers,
ut(CPacketChangeServers, "runtime", proto2),
ut(CPacketChangeServers, "typeName", "CPacketChangeServers"),
ut(CPacketChangeServers, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "url",
	kind: "scalar",
	T: 9
}]));
const CPacketCloseWindow = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketCloseWindow().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketCloseWindow().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketCloseWindow().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketCloseWindow, $, et)
	}
};
exports.CPacketCloseWindow = CPacketCloseWindow,
ut(CPacketCloseWindow, "runtime", proto2),
ut(CPacketCloseWindow, "typeName", "CPacketCloseWindow"),
ut(CPacketCloseWindow, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 13
}]));
const CPacketConfirmTransaction = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "uid");
		ut(this, "accepted");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketConfirmTransaction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketConfirmTransaction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketConfirmTransaction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketConfirmTransaction, $, et)
	}
};
exports.CPacketConfirmTransaction = CPacketConfirmTransaction,
ut(CPacketConfirmTransaction, "runtime", proto2),
ut(CPacketConfirmTransaction, "typeName", "CPacketConfirmTransaction"),
ut(CPacketConfirmTransaction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "uid",
	kind: "scalar",
	T: 5
}, {
	no: 3,
	name: "accepted",
	kind: "scalar",
	T: 8
}]));
const CPacketDestroyEntities = class extends Message {
	constructor($) {
		super();
		ut(this, "ids", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketDestroyEntities().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketDestroyEntities().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketDestroyEntities().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketDestroyEntities, $, et)
	}
};
exports.CPacketDestroyEntities = CPacketDestroyEntities,
ut(CPacketDestroyEntities, "runtime", proto2),
ut(CPacketDestroyEntities, "typeName", "CPacketDestroyEntities"),
ut(CPacketDestroyEntities, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "ids",
	kind: "scalar",
	T: 13,
	repeated: !0
}]));
const CPacketDisconnect = class extends Message {
	constructor($) {
		super();
		ut(this, "reason");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketDisconnect().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketDisconnect().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketDisconnect().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketDisconnect, $, et)
	}
};
exports.CPacketDisconnect = CPacketDisconnect,
ut(CPacketDisconnect, "runtime", proto2),
ut(CPacketDisconnect, "typeName", "CPacketDisconnect"),
ut(CPacketDisconnect, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "reason",
	kind: "scalar",
	T: 9
}]));
const CPacketEntityAction = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "sneak");
		ut(this, "sprinting");
		ut(this, "punching");
		ut(this, "fire");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityAction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityAction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityAction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityAction, $, et)
	}
};
exports.CPacketEntityAction = CPacketEntityAction,
ut(CPacketEntityAction, "runtime", proto2),
ut(CPacketEntityAction, "typeName", "CPacketEntityAction"),
ut(CPacketEntityAction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "sneak",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 3,
	name: "sprinting",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 4,
	name: "punching",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 20,
	name: "fire",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPacketEntityAttach = class extends Message {
	constructor($) {
		super();
		ut(this, "leash");
		ut(this, "entity");
		ut(this, "vehicle");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityAttach().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityAttach().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityAttach().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityAttach, $, et)
	}
};
exports.CPacketEntityAttach = CPacketEntityAttach,
ut(CPacketEntityAttach, "runtime", proto2),
ut(CPacketEntityAttach, "typeName", "CPacketEntityAttach"),
ut(CPacketEntityAttach, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "leash",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "entity",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "vehicle",
	kind: "scalar",
	T: 17
}]));
const CPacketEntityMetadata = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "data", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityMetadata().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityMetadata().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityMetadata().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityMetadata, $, et)
	}
};
exports.CPacketEntityMetadata = CPacketEntityMetadata,
ut(CPacketEntityMetadata, "runtime", proto2),
ut(CPacketEntityMetadata, "typeName", "CPacketEntityMetadata"),
ut(CPacketEntityMetadata, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "data",
	kind: "message",
	T: PBWatchableObject,
	repeated: !0
}]));
const PBWatchableObject = class extends Message {
	constructor($) {
		super();
		ut(this, "dataValueId");
		ut(this, "objectType");
		ut(this, "intValue");
		ut(this, "floatValue");
		ut(this, "stringValue");
		ut(this, "vector");
		ut(this, "itemStack");
		ut(this, "blockPos");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBWatchableObject().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBWatchableObject().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBWatchableObject().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBWatchableObject, $, et)
	}
};
exports.PBWatchableObject = PBWatchableObject,
ut(PBWatchableObject, "runtime", proto2),
ut(PBWatchableObject, "typeName", "PBWatchableObject"),
ut(PBWatchableObject, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "dataValueId",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "objectType",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "intValue",
	kind: "scalar",
	T: 17,
	opt: !0
}, {
	no: 4,
	name: "floatValue",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 5,
	name: "stringValue",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 6,
	name: "vector",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 7,
	name: "itemStack",
	kind: "message",
	T: PBItemStack,
	opt: !0
}, {
	no: 8,
	name: "blockPos",
	kind: "message",
	T: PBBlockPos,
	opt: !0
}]));
const CPacketEntityPositionAndRotation = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "pos");
		ut(this, "vel");
		ut(this, "yaw");
		ut(this, "pitch");
		ut(this, "onGround");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityPositionAndRotation().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityPositionAndRotation().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityPositionAndRotation().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityPositionAndRotation, $, et)
	}
};
exports.CPacketEntityPositionAndRotation = CPacketEntityPositionAndRotation,
ut(CPacketEntityPositionAndRotation, "runtime", proto2),
ut(CPacketEntityPositionAndRotation, "typeName", "CPacketEntityPositionAndRotation"),
ut(CPacketEntityPositionAndRotation, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "pos",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 3,
	name: "vel",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 4,
	name: "yaw",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 5,
	name: "pitch",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 6,
	name: "onGround",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const CPacketEntityRelPositionAndRotation = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "pos");
		ut(this, "vel");
		ut(this, "yaw");
		ut(this, "pitch");
		ut(this, "onGround");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityRelPositionAndRotation().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityRelPositionAndRotation().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityRelPositionAndRotation().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityRelPositionAndRotation, $, et)
	}
};
exports.CPacketEntityRelPositionAndRotation = CPacketEntityRelPositionAndRotation,
ut(CPacketEntityRelPositionAndRotation, "runtime", proto2),
ut(CPacketEntityRelPositionAndRotation, "typeName", "CPacketEntityRelPositionAndRotation"),
ut(CPacketEntityRelPositionAndRotation, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "pos",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 3,
	name: "vel",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 4,
	name: "yaw",
	kind: "scalar",
	T: 17,
	opt: !0
}, {
	no: 5,
	name: "pitch",
	kind: "scalar",
	T: 17,
	opt: !0
}, {
	no: 6,
	name: "onGround",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const CPacketEntityStatus = class extends Message {
	constructor($) {
		super();
		ut(this, "entityId");
		ut(this, "entityStatus");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityStatus().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityStatus().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityStatus().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityStatus, $, et)
	}
};
exports.CPacketEntityStatus = CPacketEntityStatus,
ut(CPacketEntityStatus, "runtime", proto2),
ut(CPacketEntityStatus, "typeName", "CPacketEntityStatus"),
ut(CPacketEntityStatus, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "entityId",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "entityStatus",
	kind: "scalar",
	T: 5
}]));
const CPacketExplosion = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "strength");
		ut(this, "blocks", []);
		ut(this, "playerPos");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketExplosion().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketExplosion().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketExplosion().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketExplosion, $, et)
	}
};
exports.CPacketExplosion = CPacketExplosion,
ut(CPacketExplosion, "runtime", proto2),
ut(CPacketExplosion, "typeName", "CPacketExplosion"),
ut(CPacketExplosion, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: PBFloatVector3
}, {
	no: 2,
	name: "strength",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "blocks",
	kind: "message",
	T: PBBlockPos,
	repeated: !0
}, {
	no: 4,
	name: "playerPos",
	kind: "message",
	T: PBFloatVector3
}]));
const PBCosmetics = class extends Message {
	constructor($) {
		super();
		ut(this, "skin");
		ut(this, "cape");
		ut(this, "aura");
		ut(this, "trail");
		ut(this, "color");
		ut(this, "hat");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBCosmetics().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBCosmetics().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBCosmetics().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBCosmetics, $, et)
	}
};
exports.PBCosmetics = PBCosmetics,
ut(PBCosmetics, "runtime", proto2),
ut(PBCosmetics, "typeName", "PBCosmetics"),
ut(PBCosmetics, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "skin",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 2,
	name: "cape",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "aura",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 4,
	name: "trail",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "color",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 6,
	name: "hat",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
const CPacketServerInfo = class extends Message {
	constructor($) {
		super();
		ut(this, "serverId");
		ut(this, "serverName");
		ut(this, "serverVersion");
		ut(this, "serverCategory");
		ut(this, "accessControl");
		ut(this, "worldType");
		ut(this, "doDaylightCycle");
		ut(this, "inviteCode");
		ut(this, "cheats");
		ut(this, "pvpEnabled");
		ut(this, "startTime");
		ut(this, "playerPermissionEntries", []);
		ut(this, "metadata");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketServerInfo().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketServerInfo().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketServerInfo().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketServerInfo, $, et)
	}
};
exports.CPacketServerInfo = CPacketServerInfo,
ut(CPacketServerInfo, "runtime", proto2),
ut(CPacketServerInfo, "typeName", "CPacketServerInfo"),
ut(CPacketServerInfo, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "server_id",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "server_name",
	kind: "scalar",
	T: 9
}, {
	no: 3,
	name: "server_version",
	kind: "scalar",
	T: 9
}, {
	no: 4,
	name: "server_category",
	kind: "scalar",
	T: 9
}, {
	no: 5,
	name: "access_control",
	kind: "scalar",
	T: 9
}, {
	no: 11,
	name: "world_type",
	kind: "scalar",
	T: 9
}, {
	no: 13,
	name: "do_daylight_cycle",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 6,
	name: "invite_code",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 7,
	name: "cheats",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 8,
	name: "pvp_enabled",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 9,
	name: "start_time",
	kind: "scalar",
	T: 4
}, {
	no: 10,
	name: "player_permission_entries",
	kind: "message",
	T: PlayerPermissionEntry,
	repeated: !0
}, {
	no: 12,
	name: "metadata",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
const PlayerPermissionEntry = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		ut(this, "username");
		ut(this, "permissionLevel");
		ut(this, "color");
		ut(this, "rank");
		ut(this, "level");
		ut(this, "verified");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PlayerPermissionEntry().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PlayerPermissionEntry().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PlayerPermissionEntry().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PlayerPermissionEntry, $, et)
	}
};
exports.PlayerPermissionEntry = PlayerPermissionEntry,
ut(PlayerPermissionEntry, "runtime", proto2),
ut(PlayerPermissionEntry, "typeName", "PlayerPermissionEntry"),
ut(PlayerPermissionEntry, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "username",
	kind: "scalar",
	T: 9
}, {
	no: 3,
	name: "permission_level",
	kind: "scalar",
	T: 5
}, {
	no: 4,
	name: "color",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "rank",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 6,
	name: "level",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 7,
	name: "verified",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const CPacketJoinGame = class extends Message {
	constructor($) {
		super();
		ut(this, "canConnect");
		ut(this, "errorMessage");
		ut(this, "tick");
		ut(this, "gamemode");
		ut(this, "name");
		ut(this, "enablePlayerCollision");
		ut(this, "cosmetics");
		ut(this, "rank");
		ut(this, "serverInfo");
		ut(this, "uuid");
		ut(this, "dimension");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketJoinGame().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketJoinGame().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketJoinGame().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketJoinGame, $, et)
	}
};
exports.CPacketJoinGame = CPacketJoinGame,
ut(CPacketJoinGame, "runtime", proto2),
ut(CPacketJoinGame, "typeName", "CPacketJoinGame"),
ut(CPacketJoinGame, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "can_connect",
	kind: "scalar",
	T: 8
}, {
	no: 2,
	name: "error_message",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "tick",
	kind: "scalar",
	T: 5,
	opt: !0
}, {
	no: 6,
	name: "gamemode",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 7,
	name: "name",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 10,
	name: "enable_player_collision",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 11,
	name: "cosmetics",
	kind: "message",
	T: PBCosmetics,
	opt: !0
}, {
	no: 12,
	name: "rank",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 13,
	name: "server_info",
	kind: "message",
	T: CPacketServerInfo,
	opt: !0
}, {
	no: 14,
	name: "uuid",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 15,
	name: "dimension",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPacketLeaderboard = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "pos");
		ut(this, "yaw");
		ut(this, "title");
		ut(this, "content", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketLeaderboard().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketLeaderboard().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketLeaderboard().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketLeaderboard, $, et)
	}
};
exports.CPacketLeaderboard = CPacketLeaderboard,
ut(CPacketLeaderboard, "runtime", proto2),
ut(CPacketLeaderboard, "typeName", "CPacketLeaderboard"),
ut(CPacketLeaderboard, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "pos",
	kind: "message",
	T: PBVector3
}, {
	no: 3,
	name: "yaw",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 4,
	name: "title",
	kind: "scalar",
	T: 9
}, {
	no: 5,
	name: "content",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketLocalStorage = class extends Message {
	constructor($) {
		super();
		ut(this, "action");
		ut(this, "key");
		ut(this, "value");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketLocalStorage().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketLocalStorage().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketLocalStorage().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketLocalStorage, $, et)
	}
};
exports.CPacketLocalStorage = CPacketLocalStorage,
ut(CPacketLocalStorage, "runtime", proto2),
ut(CPacketLocalStorage, "typeName", "CPacketLocalStorage"),
ut(CPacketLocalStorage, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "action",
	kind: "enum",
	T: proto2.getEnumType(CPacketLocalStorage_Action)
}, {
	no: 2,
	name: "key",
	kind: "scalar",
	T: 9
}, {
	no: 3,
	name: "value",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
var CPacketLocalStorage_Action = (j=>(j[j.DEFAULT = 0] = "DEFAULT",
j[j.REMOVE = 1] = "REMOVE",
j[j.SET = 2] = "SET",
j))(CPacketLocalStorage_Action || {});
proto2.util.setEnumType(CPacketLocalStorage_Action, "CPacketLocalStorage.Action", [{
	no: 0,
	name: "DEFAULT"
}, {
	no: 1,
	name: "REMOVE"
}, {
	no: 2,
	name: "SET"
}]);
const CPacketMessage = class extends Message {
	constructor($) {
		super();
		ut(this, "text");
		ut(this, "id");
		ut(this, "color");
		ut(this, "discard");
		ut(this, "toast");
		ut(this, "timer");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketMessage().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketMessage().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketMessage().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketMessage, $, et)
	}
};
exports.CPacketMessage = CPacketMessage,
ut(CPacketMessage, "runtime", proto2),
ut(CPacketMessage, "typeName", "CPacketMessage"),
ut(CPacketMessage, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "text",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "id",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 4,
	name: "color",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "discard",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 6,
	name: "toast",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 7,
	name: "timer",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPacketOpenShop = class extends Message {
	constructor($) {
		super();
		ut(this, "type");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketOpenShop().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketOpenShop().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketOpenShop().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketOpenShop, $, et)
	}
};
exports.CPacketOpenShop = CPacketOpenShop,
ut(CPacketOpenShop, "runtime", proto2),
ut(CPacketOpenShop, "typeName", "CPacketOpenShop"),
ut(CPacketOpenShop, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "type",
	kind: "scalar",
	T: 9
}]));
const CPacketOpenWindow = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "guiID");
		ut(this, "title");
		ut(this, "size");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketOpenWindow().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketOpenWindow().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketOpenWindow().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketOpenWindow, $, et)
	}
};
exports.CPacketOpenWindow = CPacketOpenWindow,
ut(CPacketOpenWindow, "runtime", proto2),
ut(CPacketOpenWindow, "typeName", "CPacketOpenWindow"),
ut(CPacketOpenWindow, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "guiID",
	kind: "scalar",
	T: 9
}, {
	no: 3,
	name: "title",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 4,
	name: "size",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPacketParticles = class extends Message {
	constructor($) {
		super();
		ut(this, "particleId");
		ut(this, "longDistance");
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		ut(this, "xOffset");
		ut(this, "yOffset");
		ut(this, "zOffset");
		ut(this, "speed");
		ut(this, "count");
		ut(this, "particleArguments", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketParticles().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketParticles().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketParticles().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketParticles, $, et)
	}
};
exports.CPacketParticles = CPacketParticles,
ut(CPacketParticles, "runtime", proto2),
ut(CPacketParticles, "typeName", "CPacketParticles"),
ut(CPacketParticles, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "particleId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "longDistance",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 3,
	name: "x",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 4,
	name: "y",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 5,
	name: "z",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 6,
	name: "xOffset",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 7,
	name: "yOffset",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 8,
	name: "zOffset",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 9,
	name: "speed",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 10,
	name: "count",
	kind: "scalar",
	T: 5,
	opt: !0
}, {
	no: 11,
	name: "particleArguments",
	kind: "scalar",
	T: 5,
	repeated: !0
}]));
const CPacketPlayerList = class extends Message {
	constructor($) {
		super();
		ut(this, "players", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketPlayerList().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketPlayerList().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketPlayerList().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketPlayerList, $, et)
	}
};
exports.CPacketPlayerList = CPacketPlayerList,
ut(CPacketPlayerList, "runtime", proto2),
ut(CPacketPlayerList, "typeName", "CPacketPlayerList"),
ut(CPacketPlayerList, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "players",
	kind: "message",
	T: PlayerData,
	repeated: !0
}]));
const PlayerData = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "uuid");
		ut(this, "permissionLevel");
		ut(this, "ping");
		ut(this, "name");
		ut(this, "color");
		ut(this, "rank");
		ut(this, "level");
		ut(this, "verified");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PlayerData().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PlayerData().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PlayerData().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PlayerData, $, et)
	}
};
exports.PlayerData = PlayerData,
ut(PlayerData, "runtime", proto2),
ut(PlayerData, "typeName", "PlayerData"),
ut(PlayerData, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 9,
	name: "uuid",
	kind: "scalar",
	T: 9
}, {
	no: 10,
	name: "permission_level",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "ping",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 4,
	name: "name",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "color",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 6,
	name: "rank",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 7,
	name: "level",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 8,
	name: "verified",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const CPacketPlayerPosLook = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		ut(this, "yaw");
		ut(this, "pitch");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketPlayerPosLook().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketPlayerPosLook().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketPlayerPosLook().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketPlayerPosLook, $, et)
	}
};
exports.CPacketPlayerPosLook = CPacketPlayerPosLook,
ut(CPacketPlayerPosLook, "runtime", proto2),
ut(CPacketPlayerPosLook, "typeName", "CPacketPlayerPosLook"),
ut(CPacketPlayerPosLook, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 2
}, {
	no: 4,
	name: "yaw",
	kind: "scalar",
	T: 2
}, {
	no: 5,
	name: "pitch",
	kind: "scalar",
	T: 2
}]));
const CPacketPlayerPosition = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketPlayerPosition().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketPlayerPosition().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketPlayerPosition().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketPlayerPosition, $, et)
	}
};
exports.CPacketPlayerPosition = CPacketPlayerPosition,
ut(CPacketPlayerPosition, "runtime", proto2),
ut(CPacketPlayerPosition, "typeName", "CPacketPlayerPosition"),
ut(CPacketPlayerPosition, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "y",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "z",
	kind: "scalar",
	T: 2
}]));
const CPacketPong = class extends Message {
	constructor($) {
		super();
		ut(this, "time");
		ut(this, "mspt");
		ut(this, "tick");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketPong().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketPong().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketPong().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketPong, $, et)
	}
};
exports.CPacketPong = CPacketPong,
ut(CPacketPong, "runtime", proto2),
ut(CPacketPong, "typeName", "CPacketPong"),
ut(CPacketPong, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "time",
	kind: "scalar",
	T: 4
}, {
	no: 2,
	name: "mspt",
	kind: "scalar",
	T: 2
}, {
	no: 4,
	name: "tick",
	kind: "scalar",
	T: 13
}]));
const CPacketRespawn = class extends Message {
	constructor($) {
		super();
		ut(this, "notDeath");
		ut(this, "client");
		ut(this, "dimension");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketRespawn().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketRespawn().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketRespawn().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketRespawn, $, et)
	}
};
exports.CPacketRespawn = CPacketRespawn,
ut(CPacketRespawn, "runtime", proto2),
ut(CPacketRespawn, "typeName", "CPacketRespawn"),
ut(CPacketRespawn, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "notDeath",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 2,
	name: "client",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 3,
	name: "dimension",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPacketScoreboard = class extends Message {
	constructor($) {
		super();
		ut(this, "title");
		ut(this, "content", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketScoreboard().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketScoreboard().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketScoreboard().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketScoreboard, $, et)
	}
};
exports.CPacketScoreboard = CPacketScoreboard,
ut(CPacketScoreboard, "runtime", proto2),
ut(CPacketScoreboard, "typeName", "CPacketScoreboard"),
ut(CPacketScoreboard, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "title",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "content",
	kind: "message",
	T: ScoreboardContent,
	repeated: !0
}]));
const ScoreboardContent = class extends Message {
	constructor($) {
		super();
		ut(this, "columns", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new ScoreboardContent().fromBinary($, et)
	}
	static fromJson($, et) {
		return new ScoreboardContent().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new ScoreboardContent().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(ScoreboardContent, $, et)
	}
};
exports.ScoreboardContent = ScoreboardContent,
ut(ScoreboardContent, "runtime", proto2),
ut(ScoreboardContent, "typeName", "ScoreboardContent"),
ut(ScoreboardContent, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "columns",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketServerMetadata = class extends Message {
	constructor($) {
		super();
		ut(this, "metadata");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketServerMetadata().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketServerMetadata().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketServerMetadata().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketServerMetadata, $, et)
	}
};
exports.CPacketServerMetadata = CPacketServerMetadata,
ut(CPacketServerMetadata, "runtime", proto2),
ut(CPacketServerMetadata, "typeName", "CPacketServerMetadata"),
ut(CPacketServerMetadata, "fields", proto2.util.newFieldList(()=>[{
	no: 12,
	name: "metadata",
	kind: "scalar",
	T: 9
}]));
const CPacketSetSlot = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "slot");
		ut(this, "slotData");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSetSlot().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSetSlot().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSetSlot().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSetSlot, $, et)
	}
};
exports.CPacketSetSlot = CPacketSetSlot,
ut(CPacketSetSlot, "runtime", proto2),
ut(CPacketSetSlot, "typeName", "CPacketSetSlot"),
ut(CPacketSetSlot, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "window_id",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "slot",
	kind: "scalar",
	T: 5
}, {
	no: 3,
	name: "slot_data",
	kind: "message",
	T: PBItemStack
}]));
const CPacketSignEditorOpen = class extends Message {
	constructor($) {
		super();
		ut(this, "signPosition");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSignEditorOpen().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSignEditorOpen().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSignEditorOpen().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSignEditorOpen, $, et)
	}
};
exports.CPacketSignEditorOpen = CPacketSignEditorOpen,
ut(CPacketSignEditorOpen, "runtime", proto2),
ut(CPacketSignEditorOpen, "typeName", "CPacketSignEditorOpen"),
ut(CPacketSignEditorOpen, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "signPosition",
	kind: "message",
	T: PBBlockPos
}]));
const CPacketSoundEffect = class extends Message {
	constructor($) {
		super();
		ut(this, "sound");
		ut(this, "location");
		ut(this, "volume");
		ut(this, "pitch");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSoundEffect().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSoundEffect().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSoundEffect().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSoundEffect, $, et)
	}
};
exports.CPacketSoundEffect = CPacketSoundEffect,
ut(CPacketSoundEffect, "runtime", proto2),
ut(CPacketSoundEffect, "typeName", "CPacketSoundEffect"),
ut(CPacketSoundEffect, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "sound",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "location",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 3,
	name: "volume",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 4,
	name: "pitch",
	kind: "scalar",
	T: 2,
	opt: !0
}]));
const CPacketSpawnEntity = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "type");
		ut(this, "pos");
		ut(this, "yaw");
		ut(this, "pitch");
		ut(this, "motion");
		ut(this, "item");
		ut(this, "shooterId");
		ut(this, "state");
		ut(this, "texture");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSpawnEntity().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSpawnEntity().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSpawnEntity().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSpawnEntity, $, et)
	}
};
exports.CPacketSpawnEntity = CPacketSpawnEntity,
ut(CPacketSpawnEntity, "runtime", proto2),
ut(CPacketSpawnEntity, "typeName", "CPacketSpawnEntity"),
ut(CPacketSpawnEntity, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "type",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "pos",
	kind: "message",
	T: PBVector3,
	opt: !0
}, {
	no: 4,
	name: "yaw",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 5,
	name: "pitch",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 6,
	name: "motion",
	kind: "message",
	T: PBFloatVector3,
	opt: !0
}, {
	no: 7,
	name: "item",
	kind: "message",
	T: PBItemStack,
	opt: !0
}, {
	no: 8,
	name: "shooterId",
	kind: "scalar",
	T: 13,
	opt: !0
}, {
	no: 9,
	name: "state",
	kind: "scalar",
	T: 5,
	opt: !0
}, {
	no: 10,
	name: "texture",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
const CPacketSpawnExperienceOrb = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "x");
		ut(this, "y");
		ut(this, "z");
		ut(this, "xpValue");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSpawnExperienceOrb().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSpawnExperienceOrb().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSpawnExperienceOrb().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSpawnExperienceOrb, $, et)
	}
};
exports.CPacketSpawnExperienceOrb = CPacketSpawnExperienceOrb,
ut(CPacketSpawnExperienceOrb, "runtime", proto2),
ut(CPacketSpawnExperienceOrb, "typeName", "CPacketSpawnExperienceOrb"),
ut(CPacketSpawnExperienceOrb, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "x",
	kind: "scalar",
	T: 17
}, {
	no: 3,
	name: "y",
	kind: "scalar",
	T: 17
}, {
	no: 4,
	name: "z",
	kind: "scalar",
	T: 17
}, {
	no: 5,
	name: "xpValue",
	kind: "scalar",
	T: 13
}]));
const CPacketSpawnPlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "name");
		ut(this, "gamemode");
		ut(this, "operator");
		ut(this, "pos");
		ut(this, "yaw");
		ut(this, "pitch");
		ut(this, "cosmetics");
		ut(this, "rank");
		ut(this, "socketId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSpawnPlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSpawnPlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSpawnPlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSpawnPlayer, $, et)
	}
};
exports.CPacketSpawnPlayer = CPacketSpawnPlayer,
ut(CPacketSpawnPlayer, "runtime", proto2),
ut(CPacketSpawnPlayer, "typeName", "CPacketSpawnPlayer"),
ut(CPacketSpawnPlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "name",
	kind: "scalar",
	T: 9
}, {
	no: 3,
	name: "gamemode",
	kind: "scalar",
	T: 9
}, {
	no: 4,
	name: "operator",
	kind: "scalar",
	T: 8,
	opt: !0
}, {
	no: 5,
	name: "pos",
	kind: "message",
	T: PBFloatVector3
}, {
	no: 6,
	name: "yaw",
	kind: "scalar",
	T: 2
}, {
	no: 7,
	name: "pitch",
	kind: "scalar",
	T: 2
}, {
	no: 8,
	name: "cosmetics",
	kind: "message",
	T: PBCosmetics
}, {
	no: 9,
	name: "rank",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 10,
	name: "socketId",
	kind: "scalar",
	T: 9
}]));
const CPacketTabComplete = class extends Message {
	constructor($) {
		super();
		ut(this, "matches", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketTabComplete().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketTabComplete().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketTabComplete().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketTabComplete, $, et)
	}
};
exports.CPacketTabComplete = CPacketTabComplete,
ut(CPacketTabComplete, "runtime", proto2),
ut(CPacketTabComplete, "typeName", "CPacketTabComplete"),
ut(CPacketTabComplete, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "matches",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketTitle = class extends Message {
	constructor($) {
		super();
		ut(this, "title");
		ut(this, "duration");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketTitle().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketTitle().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketTitle().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketTitle, $, et)
	}
};
exports.CPacketTitle = CPacketTitle,
ut(CPacketTitle, "runtime", proto2),
ut(CPacketTitle, "typeName", "CPacketTitle"),
ut(CPacketTitle, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "title",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "duration",
	kind: "scalar",
	T: 13
}]));
const CPacketUpdateHealth = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "hp");
		ut(this, "food");
		ut(this, "foodSaturation");
		ut(this, "oxygen");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateHealth().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateHealth().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateHealth().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateHealth, $, et)
	}
};
exports.CPacketUpdateHealth = CPacketUpdateHealth,
ut(CPacketUpdateHealth, "runtime", proto2),
ut(CPacketUpdateHealth, "typeName", "CPacketUpdateHealth"),
ut(CPacketUpdateHealth, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "hp",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 3,
	name: "food",
	kind: "scalar",
	T: 5,
	opt: !0
}, {
	no: 4,
	name: "foodSaturation",
	kind: "scalar",
	T: 2,
	opt: !0
}, {
	no: 5,
	name: "oxygen",
	kind: "scalar",
	T: 2,
	opt: !0
}]));
const CPacketUpdateLeaderboard = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "content", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateLeaderboard().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateLeaderboard().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateLeaderboard().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateLeaderboard, $, et)
	}
};
exports.CPacketUpdateLeaderboard = CPacketUpdateLeaderboard,
ut(CPacketUpdateLeaderboard, "runtime", proto2),
ut(CPacketUpdateLeaderboard, "typeName", "CPacketUpdateLeaderboard"),
ut(CPacketUpdateLeaderboard, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 9
}, {
	no: 5,
	name: "content",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketUpdateScoreboard = class extends Message {
	constructor($) {
		super();
		ut(this, "index");
		ut(this, "columns", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateScoreboard().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateScoreboard().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateScoreboard().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateScoreboard, $, et)
	}
};
exports.CPacketUpdateScoreboard = CPacketUpdateScoreboard,
ut(CPacketUpdateScoreboard, "runtime", proto2),
ut(CPacketUpdateScoreboard, "typeName", "CPacketUpdateScoreboard"),
ut(CPacketUpdateScoreboard, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "index",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "columns",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketUpdateStatus = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "mode");
		ut(this, "rank");
		ut(this, "color");
		ut(this, "hidePlayers");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdateStatus().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdateStatus().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdateStatus().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdateStatus, $, et)
	}
};
exports.CPacketUpdateStatus = CPacketUpdateStatus,
ut(CPacketUpdateStatus, "runtime", proto2),
ut(CPacketUpdateStatus, "typeName", "CPacketUpdateStatus"),
ut(CPacketUpdateStatus, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "mode",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 4,
	name: "rank",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 5,
	name: "color",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 6,
	name: "hidePlayers",
	kind: "scalar",
	T: 8,
	opt: !0
}]));
const CPacketUpdate = class extends Message {
	constructor($) {
		super();
		ut(this, "tick");
		ut(this, "t");
		ut(this, "mspt");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUpdate().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUpdate().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUpdate().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUpdate, $, et)
	}
};
exports.CPacketUpdate = CPacketUpdate,
ut(CPacketUpdate, "runtime", proto2),
ut(CPacketUpdate, "typeName", "CPacketUpdate"),
ut(CPacketUpdate, "fields", proto2.util.newFieldList(()=>[{
	no: 4,
	name: "tick",
	kind: "scalar",
	T: 13
}, {
	no: 5,
	name: "t",
	kind: "scalar",
	T: 4
}, {
	no: 6,
	name: "mspt",
	kind: "scalar",
	T: 2
}]));
const CPacketWindowItems = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "items", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketWindowItems().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketWindowItems().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketWindowItems().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketWindowItems, $, et)
	}
};
exports.CPacketWindowItems = CPacketWindowItems,
ut(CPacketWindowItems, "runtime", proto2),
ut(CPacketWindowItems, "typeName", "CPacketWindowItems"),
ut(CPacketWindowItems, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "window_id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "items",
	kind: "message",
	T: PBItemStack,
	repeated: !0
}]));
const CPacketWindowProperty = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "varIndex");
		ut(this, "varValue");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketWindowProperty().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketWindowProperty().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketWindowProperty().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketWindowProperty, $, et)
	}
};
exports.CPacketWindowProperty = CPacketWindowProperty,
ut(CPacketWindowProperty, "runtime", proto2),
ut(CPacketWindowProperty, "typeName", "CPacketWindowProperty"),
ut(CPacketWindowProperty, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "varIndex",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "varValue",
	kind: "scalar",
	T: 5
}]));
const SPacketRespawn = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new SPacketRespawn().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new SPacketRespawn().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new SPacketRespawn().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(SPacketRespawn, _, $)
	}
};
exports.SPacketRespawn = SPacketRespawn,
ut(SPacketRespawn, "runtime", proto2),
ut(SPacketRespawn, "typeName", "SPacketRespawn"),
ut(SPacketRespawn, "fields", proto2.util.newFieldList(()=>[]));
var su;
let SPacketTabComplete$1 = class extends Message {
	constructor($) {
		super();
		ut(this, "message");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketTabComplete$1().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketTabComplete$1().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketTabComplete$1().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketTabComplete$1, $, et)
	}
};
exports.SPacketTabComplete$1 = SPacketTabComplete$1,
ut(SPacketTabComplete$1, "runtime", proto2),
ut(SPacketTabComplete$1, "typeName", "SPacketTabComplete"),
ut(SPacketTabComplete$1, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "message",
	kind: "scalar",
	T: 9
}]));
const SPacketCraftItem = class extends Message {
	constructor($) {
		super();
		ut(this, "data");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketCraftItem().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketCraftItem().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketCraftItem().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketCraftItem, $, et)
	}
};
exports.SPacketCraftItem = SPacketCraftItem,
ut(SPacketCraftItem, "runtime", proto2),
ut(SPacketCraftItem, "typeName", "SPacketCraftItem"),
ut(SPacketCraftItem, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "data",
	kind: "scalar",
	T: 9
}]));
const SPacketRequestChunk = class extends Message {
	constructor($) {
		super();
		ut(this, "x");
		ut(this, "z");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketRequestChunk().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketRequestChunk().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketRequestChunk().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketRequestChunk, $, et)
	}
};
exports.SPacketRequestChunk = SPacketRequestChunk,
ut(SPacketRequestChunk, "runtime", proto2),
ut(SPacketRequestChunk, "typeName", "SPacketRequestChunk"),
ut(SPacketRequestChunk, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "x",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "z",
	kind: "scalar",
	T: 5
}]));
const SPacketAdminAction = class extends Message {
	constructor($) {
		super();
		ut(this, "action", {
			case: void 0
		});
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketAdminAction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketAdminAction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketAdminAction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketAdminAction, $, et)
	}
};
exports.SPacketAdminAction = SPacketAdminAction,
ut(SPacketAdminAction, "runtime", proto2),
ut(SPacketAdminAction, "typeName", "SPacketAdminAction"),
ut(SPacketAdminAction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "kick_player",
	kind: "message",
	T: KickPlayer,
	oneof: "action"
}, {
	no: 2,
	name: "ban_player",
	kind: "message",
	T: BanPlayer,
	oneof: "action"
}, {
	no: 9,
	name: "unban_player",
	kind: "message",
	T: UnbanPlayer,
	oneof: "action"
}, {
	no: 3,
	name: "stop_server",
	kind: "message",
	T: StopServer,
	oneof: "action"
}, {
	no: 4,
	name: "promote_player",
	kind: "message",
	T: PromotePlayer,
	oneof: "action"
}, {
	no: 5,
	name: "demote_player",
	kind: "message",
	T: DemotePlayer,
	oneof: "action"
}, {
	no: 6,
	name: "update_access_control",
	kind: "message",
	T: UpdateAccessControl,
	oneof: "action"
}, {
	no: 7,
	name: "update_cheats",
	kind: "message",
	T: UpdateCheats,
	oneof: "action"
}, {
	no: 8,
	name: "update_pvp",
	kind: "message",
	T: UpdatePvP,
	oneof: "action"
}]));
const KickPlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new KickPlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new KickPlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new KickPlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(KickPlayer, $, et)
	}
};
exports.KickPlayer = KickPlayer,
ut(KickPlayer, "runtime", proto2),
ut(KickPlayer, "typeName", "KickPlayer"),
ut(KickPlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}]));
const BanPlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new BanPlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new BanPlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new BanPlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(BanPlayer, $, et)
	}
};
exports.BanPlayer = BanPlayer,
ut(BanPlayer, "runtime", proto2),
ut(BanPlayer, "typeName", "BanPlayer"),
ut(BanPlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}]));
const UnbanPlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new UnbanPlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new UnbanPlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new UnbanPlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(UnbanPlayer, $, et)
	}
};
exports.UnbanPlayer = UnbanPlayer,
ut(UnbanPlayer, "runtime", proto2),
ut(UnbanPlayer, "typeName", "UnbanPlayer"),
ut(UnbanPlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}]));
const StopServer = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new StopServer().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new StopServer().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new StopServer().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(StopServer, _, $)
	}
};
exports.StopServer = StopServer,
ut(StopServer, "runtime", proto2),
ut(StopServer, "typeName", "StopServer"),
ut(StopServer, "fields", proto2.util.newFieldList(()=>[]));
const PromotePlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PromotePlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PromotePlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PromotePlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PromotePlayer, $, et)
	}
};
exports.PromotePlayer = PromotePlayer,
ut(PromotePlayer, "runtime", proto2),
ut(PromotePlayer, "typeName", "PromotePlayer"),
ut(PromotePlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}]));
const DemotePlayer = class extends Message {
	constructor($) {
		super();
		ut(this, "uuid");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new DemotePlayer().fromBinary($, et)
	}
	static fromJson($, et) {
		return new DemotePlayer().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new DemotePlayer().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(l1, $, et)
	}
};
exports.DemotePlayer = DemotePlayer,
ut(DemotePlayer, "runtime", proto2),
ut(DemotePlayer, "typeName", "DemotePlayer"),
ut(DemotePlayer, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "uuid",
	kind: "scalar",
	T: 9
}]));
const UpdateAccessControl = class extends Message {
	constructor($) {
		super();
		ut(this, "accessControl");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new UpdateAccessControl().fromBinary($, et)
	}
	static fromJson($, et) {
		return new UpdateAccessControl().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new UpdateAccessControl().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(UpdateAccessControl, $, et)
	}
};
exports.UpdateAccessControl = UpdateAccessControl,
ut(UpdateAccessControl, "runtime", proto2),
ut(UpdateAccessControl, "typeName", "UpdateAccessControl"),
ut(UpdateAccessControl, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "accessControl",
	kind: "scalar",
	T: 9
}]));
const UpdateCheats = class extends Message {
	constructor($) {
		super();
		ut(this, "cheats");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new UpdateCheats().fromBinary($, et)
	}
	static fromJson($, et) {
		return new UpdateCheats().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new UpdateCheats().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(UpdateCheats, $, et)
	}
};
exports.UpdateCheats = UpdateCheats,
ut(UpdateCheats, "runtime", proto2),
ut(UpdateCheats, "typeName", "UpdateCheats"),
ut(UpdateCheats, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "cheats",
	kind: "scalar",
	T: 9
}]));
const UpdatePvP = class extends Message {
	constructor($) {
		super();
		ut(this, "enabled");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new UpdatePvP().fromBinary($, et)
	}
	static fromJson($, et) {
		return new UpdatePvP().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new UpdatePvP().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(UpdatePvP, $, et)
	}
};
exports.UpdatePvP = UpdatePvP,
ut(UpdatePvP, "runtime", proto2),
ut(UpdatePvP, "typeName", "UpdatePvP"),
ut(UpdatePvP, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "enabled",
	kind: "scalar",
	T: 8
}]));
const SPacketAnalytics = class extends Message {
	constructor($) {
		super();
		ut(this, "fps");
		ut(this, "ping");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketAnalytics().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketAnalytics().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketAnalytics().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketAnalytics, $, et)
	}
};
exports.SPacketAnalytics = SPacketAnalytics,
ut(SPacketAnalytics, "runtime", proto2),
ut(SPacketAnalytics, "typeName", "SPacketAnalytics"),
ut(SPacketAnalytics, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "fps",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "ping",
	kind: "scalar",
	T: 2
}]));
const SPacketConfirmTransaction = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "actionNumber");
		ut(this, "accepted");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketConfirmTransaction().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketConfirmTransaction().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketConfirmTransaction().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketConfirmTransaction, $, et)
	}
};
exports.SPacketConfirmTransaction = SPacketConfirmTransaction,
ut(SPacketConfirmTransaction, "runtime", proto2),
ut(SPacketConfirmTransaction, "typeName", "SPacketConfirmTransaction"),
ut(SPacketConfirmTransaction, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "actionNumber",
	kind: "scalar",
	T: 5
}, {
	no: 3,
	name: "accepted",
	kind: "scalar",
	T: 8
}]));
const SPacketHeldItemChange = class extends Message {
	constructor($) {
		super();
		ut(this, "slot");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketHeldItemChange().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketHeldItemChange().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketHeldItemChange().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketHeldItemChange, $, et)
	}
};
exports.SPacketHeldItemChange = SPacketHeldItemChange,
ut(SPacketHeldItemChange, "runtime", proto2),
ut(SPacketHeldItemChange, "typeName", "SPacketHeldItemChange"),
ut(SPacketHeldItemChange, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "slot",
	kind: "scalar",
	T: 5
}]));
const SPacketInput = class extends Message {
	constructor($) {
		super();
		ut(this, "strafe");
		ut(this, "forward");
		ut(this, "jump");
		ut(this, "sneak");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketInput().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketInput().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketInput().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketInput, $, et)
	}
};
exports.SPacketInput = SPacketInput,
ut(SPacketInput, "runtime", proto2),
ut(SPacketInput, "typeName", "SPacketInput"),
ut(SPacketInput, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "strafe",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "forward",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "jump",
	kind: "scalar",
	T: 8
}, {
	no: 4,
	name: "sneak",
	kind: "scalar",
	T: 8
}]));
const SPacketPing = class extends Message {
	constructor($) {
		super();
		ut(this, "time");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketPing().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketPing().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketPing().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketPing, $, et)
	}
};
exports.SPacketPing = SPacketPing,
ut(SPacketPing, "runtime", proto2),
ut(SPacketPing, "typeName", "SPacketPing"),
ut(SPacketPing, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "time",
	kind: "scalar",
	T: 4
}]));
const SPacketUpdateSign = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "lines", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketUpdateSign().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketUpdateSign().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketUpdateSign().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketUpdateSign, $, et)
	}
};
exports.SPacketUpdateSign = SPacketUpdateSign,
ut(SPacketUpdateSign, "runtime", proto2),
ut(SPacketUpdateSign, "typeName", "SPacketUpdateSign"),
ut(SPacketUpdateSign, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "lines",
	kind: "scalar",
	T: 9,
	repeated: !0
}]));
const CPacketEntityEffect = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "effectId");
		ut(this, "amplifier");
		ut(this, "duration");
		ut(this, "hideParticles");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityEffect().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityEffect().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityEffect().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityEffect, $, et)
	}
};
exports.CPacketEntityEffect = CPacketEntityEffect,
ut(CPacketEntityEffect, "runtime", proto2),
ut(CPacketEntityEffect, "typeName", "CPacketEntityEffect"),
ut(CPacketEntityEffect, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "effectId",
	kind: "scalar",
	T: 13
}, {
	no: 3,
	name: "amplifier",
	kind: "scalar",
	T: 13
}, {
	no: 4,
	name: "duration",
	kind: "scalar",
	T: 13
}, {
	no: 5,
	name: "hideParticles",
	kind: "scalar",
	T: 8
}]));
const CPacketEntityProperties = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "data", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketEntityProperties().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketEntityProperties().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketEntityProperties().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketEntityProperties, $, et)
	}
};
exports.CPacketEntityProperties = CPacketEntityProperties,
ut(CPacketEntityProperties, "runtime", proto2),
ut(CPacketEntityProperties, "typeName", "CPacketEntityProperties"),
ut(CPacketEntityProperties, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "data",
	kind: "message",
	T: PBSnapshot,
	repeated: !0
}]));
const PBSnapshot = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "value");
		ut(this, "modifiers", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBSnapshot().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBSnapshot().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBSnapshot().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBSnapshot, $, et)
	}
};
exports.PBSnapshot = PBSnapshot,
ut(PBSnapshot, "runtime", proto2),
ut(PBSnapshot, "typeName", "PBSnapshot"),
ut(PBSnapshot, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "value",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "modifiers",
	kind: "message",
	T: PBModifier,
	repeated: !0
}]));
const PBModifier = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "amount");
		ut(this, "operation");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new PBModifier().fromBinary($, et)
	}
	static fromJson($, et) {
		return new PBModifier().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new PBModifier().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(PBModifier, $, et)
	}
};
exports.PBModifier = PBModifier,
ut(PBModifier, "runtime", proto2),
ut(PBModifier, "typeName", "PBModifier"),
ut(PBModifier, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "amount",
	kind: "scalar",
	T: 2
}, {
	no: 3,
	name: "operation",
	kind: "scalar",
	T: 13
}]));
const CPacketQueueNext = class extends Message {
	constructor($) {
		super();
		ut(this, "minigameId");
		ut(this, "minigameConfig");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketQueueNext().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketQueueNext().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketQueueNext().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketQueueNext, $, et)
	}
};
exports.CPacketQueueNext = CPacketQueueNext,
ut(CPacketQueueNext, "runtime", proto2),
ut(CPacketQueueNext, "typeName", "CPacketQueueNext"),
ut(CPacketQueueNext, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "minigameId",
	kind: "scalar",
	T: 9
}, {
	no: 2,
	name: "minigameConfig",
	kind: "scalar",
	T: 9
}]));
const CPacketRemoveEntityEffect = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "effectId");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketRemoveEntityEffect().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketRemoveEntityEffect().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketRemoveEntityEffect().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketRemoveEntityEffect, $, et)
	}
};
exports.CPacketRemoveEntityEffect = CPacketRemoveEntityEffect,
ut(CPacketRemoveEntityEffect, "runtime", proto2),
ut(CPacketRemoveEntityEffect, "typeName", "CPacketRemoveEntityEffect"),
ut(CPacketRemoveEntityEffect, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "effectId",
	kind: "scalar",
	T: 13
}]));
const CPacketSetExperience = class extends Message {
	constructor($) {
		super();
		ut(this, "experience");
		ut(this, "experienceTotal");
		ut(this, "level");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketSetExperience().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketSetExperience().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketSetExperience().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketSetExperience, $, et)
	}
};
exports.CPacketSetExperience = CPacketSetExperience,
ut(CPacketSetExperience, "runtime", proto2),
ut(CPacketSetExperience, "typeName", "CPacketSetExperience"),
ut(CPacketSetExperience, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "experience",
	kind: "scalar",
	T: 2
}, {
	no: 2,
	name: "experienceTotal",
	kind: "scalar",
	T: 5
}, {
	no: 3,
	name: "level",
	kind: "scalar",
	T: 5
}]));
const CPacketShopProperty = class extends Message {
	constructor($) {
		super();
		ut(this, "name");
		ut(this, "value");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketShopProperty().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketShopProperty().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketShopProperty().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketShopProperty, $, et)
	}
};
exports.CPacketShopProperty = CPacketShopProperty,
ut(CPacketShopProperty, "runtime", proto2),
ut(CPacketShopProperty, "typeName", "CPacketShopProperty"),
ut(CPacketShopProperty, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "name",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 2,
	name: "value",
	kind: "scalar",
	T: 9,
	opt: !0
}]));
const CPacketShopProperties = class extends Message {
	constructor($) {
		super();
		ut(this, "properties", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketShopProperties().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketShopProperties().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketShopProperties().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketShopProperties, $, et)
	}
};
exports.CPacketShopProperties = CPacketShopProperties,
ut(CPacketShopProperties, "runtime", proto2),
ut(CPacketShopProperties, "typeName", "CPacketShopProperties"),
ut(CPacketShopProperties, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "properties",
	kind: "message",
	T: CPacketShopProperty,
	repeated: !0
}]));
const CPacketUseBed = class extends Message {
	constructor($) {
		super();
		ut(this, "id");
		ut(this, "bedPos");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketUseBed().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketUseBed().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketUseBed().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketUseBed, $, et)
	}
};
exports.CPacketUseBed = CPacketUseBed,
ut(CPacketUseBed, "runtime", proto2),
ut(CPacketUseBed, "typeName", "CPacketUseBed"),
ut(CPacketUseBed, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "id",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "bedPos",
	kind: "message",
	T: PBBlockPos
}]));
const CPacketTimeUpdate = class extends Message {
	constructor($) {
		super();
		ut(this, "totalTime");
		ut(this, "worldTime");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new CPacketTimeUpdate().fromBinary($, et)
	}
	static fromJson($, et) {
		return new CPacketTimeUpdate().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new CPacketTimeUpdate().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(CPacketTimeUpdate, $, et)
	}
};
exports.CPacketTimeUpdate = CPacketTimeUpdate,
ut(CPacketTimeUpdate, "runtime", proto2),
ut(CPacketTimeUpdate, "typeName", "CPacketTimeUpdate"),
ut(CPacketTimeUpdate, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "totalTime",
	kind: "scalar",
	T: 13
}, {
	no: 2,
	name: "worldTime",
	kind: "scalar",
	T: 13
}]));
const ClientBoundCombined = class extends Message {
	constructor($) {
		super();
		ut(this, "packets", []);
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new ClientBoundCombined().fromBinary($, et)
	}
	static fromJson($, et) {
		return new ClientBoundCombined().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new ClientBoundCombined().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(ClientBoundCombined, $, et)
	}
};
exports.ClientBoundCombined = ClientBoundCombined,
ut(ClientBoundCombined, "runtime", proto2),
ut(ClientBoundCombined, "typeName", "ClientBoundCombined"),
ut(ClientBoundCombined, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "packets",
	kind: "message",
	T: ClientBoundCombined_CPacket,
	repeated: !0
}]));
const ClientBoundCombined_CPacket = class extends Message {
	constructor($) {
		super();
		ut(this, "packet", {
			case: void 0
		});
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new ClientBoundCombined_CPacket().fromBinary($, et)
	}
	static fromJson($, et) {
		return new ClientBoundCombined_CPacket().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new ClientBoundCombined_CPacket().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(ClientBoundCombined_CPacket, $, et)
	}
};
exports.ClientBoundCombined_CPacket = ClientBoundCombined_CPacket,
ut(ClientBoundCombined_CPacket, "runtime", proto2),
ut(ClientBoundCombined_CPacket, "typeName", "ClientBoundCombined.CPacket"),
ut(ClientBoundCombined_CPacket, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "CPacketAnimation",
	kind: "message",
	T: CPacketAnimation,
	oneof: "packet"
}, {
	no: 2,
	name: "CPacketBlockAction",
	kind: "message",
	T: CPacketBlockAction,
	oneof: "packet"
}, {
	no: 3,
	name: "CPacketBlockUpdate",
	kind: "message",
	T: CPacketBlockUpdate,
	oneof: "packet"
}, {
	no: 4,
	name: "CPacketChangeServers",
	kind: "message",
	T: CPacketChangeServers,
	oneof: "packet"
}, {
	no: 5,
	name: "CPacketChunkData",
	kind: "message",
	T: CPacketChunkData,
	oneof: "packet"
}, {
	no: 6,
	name: "CPacketCloseWindow",
	kind: "message",
	T: CPacketCloseWindow,
	oneof: "packet"
}, {
	no: 7,
	name: "CPacketConfirmTransaction",
	kind: "message",
	T: CPacketConfirmTransaction,
	oneof: "packet"
}, {
	no: 8,
	name: "CPacketDestroyEntities",
	kind: "message",
	T: CPacketDestroyEntities,
	oneof: "packet"
}, {
	no: 9,
	name: "CPacketDisconnect",
	kind: "message",
	T: CPacketDisconnect,
	oneof: "packet"
}, {
	no: 10,
	name: "CPacketEntityAction",
	kind: "message",
	T: CPacketEntityAction,
	oneof: "packet"
}, {
	no: 11,
	name: "CPacketEntityEffect",
	kind: "message",
	T: CPacketEntityEffect,
	oneof: "packet"
}, {
	no: 12,
	name: "CPacketEntityEquipment",
	kind: "message",
	T: CPacketEntityEquipment,
	oneof: "packet"
}, {
	no: 13,
	name: "CPacketEntityMetadata",
	kind: "message",
	T: CPacketEntityMetadata,
	oneof: "packet"
}, {
	no: 14,
	name: "CPacketEntityPositionAndRotation",
	kind: "message",
	T: CPacketEntityPositionAndRotation,
	oneof: "packet"
}, {
	no: 15,
	name: "CPacketEntityProperties",
	kind: "message",
	T: CPacketEntityProperties,
	oneof: "packet"
}, {
	no: 16,
	name: "CPacketEntityRelPositionAndRotation",
	kind: "message",
	T: CPacketEntityRelPositionAndRotation,
	oneof: "packet"
}, {
	no: 17,
	name: "CPacketEntityStatus",
	kind: "message",
	T: CPacketEntityStatus,
	oneof: "packet"
}, {
	no: 18,
	name: "CPacketEntityVelocity",
	kind: "message",
	T: CPacketEntityVelocity,
	oneof: "packet"
}, {
	no: 19,
	name: "CPacketExplosion",
	kind: "message",
	T: CPacketExplosion,
	oneof: "packet"
}, {
	no: 20,
	name: "CPacketJoinGame",
	kind: "message",
	T: CPacketJoinGame,
	oneof: "packet"
}, {
	no: 21,
	name: "CPacketLeaderboard",
	kind: "message",
	T: CPacketLeaderboard,
	oneof: "packet"
}, {
	no: 22,
	name: "CPacketLocalStorage",
	kind: "message",
	T: CPacketLocalStorage,
	oneof: "packet"
}, {
	no: 23,
	name: "CPacketMessage",
	kind: "message",
	T: CPacketMessage,
	oneof: "packet"
}, {
	no: 24,
	name: "CPacketOpenShop",
	kind: "message",
	T: CPacketOpenShop,
	oneof: "packet"
}, {
	no: 25,
	name: "CPacketOpenWindow",
	kind: "message",
	T: CPacketOpenWindow,
	oneof: "packet"
}, {
	no: 26,
	name: "CPacketParticles",
	kind: "message",
	T: CPacketParticles,
	oneof: "packet"
}, {
	no: 27,
	name: "CPacketPlayerList",
	kind: "message",
	T: CPacketPlayerList,
	oneof: "packet"
}, {
	no: 28,
	name: "CPacketPlayerPosLook",
	kind: "message",
	T: CPacketPlayerPosLook,
	oneof: "packet"
}, {
	no: 29,
	name: "CPacketPlayerPosition",
	kind: "message",
	T: CPacketPlayerPosition,
	oneof: "packet"
}, {
	no: 30,
	name: "CPacketPong",
	kind: "message",
	T: CPacketPong,
	oneof: "packet"
}, {
	no: 31,
	name: "CPacketQueueNext",
	kind: "message",
	T: CPacketQueueNext,
	oneof: "packet"
}, {
	no: 32,
	name: "CPacketRemoveEntityEffect",
	kind: "message",
	T: CPacketRemoveEntityEffect,
	oneof: "packet"
}, {
	no: 33,
	name: "CPacketRespawn",
	kind: "message",
	T: CPacketRespawn,
	oneof: "packet"
}, {
	no: 34,
	name: "CPacketScoreboard",
	kind: "message",
	T: CPacketScoreboard,
	oneof: "packet"
}, {
	no: 35,
	name: "CPacketServerInfo",
	kind: "message",
	T: CPacketServerInfo,
	oneof: "packet"
}, {
	no: 36,
	name: "CPacketSetExperience",
	kind: "message",
	T: CPacketSetExperience,
	oneof: "packet"
}, {
	no: 37,
	name: "CPacketSetSlot",
	kind: "message",
	T: CPacketSetSlot,
	oneof: "packet"
}, {
	no: 38,
	name: "CPacketShopProperties",
	kind: "message",
	T: CPacketShopProperties,
	oneof: "packet"
}, {
	no: 39,
	name: "CPacketSignEditorOpen",
	kind: "message",
	T: CPacketSignEditorOpen,
	oneof: "packet"
}, {
	no: 40,
	name: "CPacketSoundEffect",
	kind: "message",
	T: CPacketSoundEffect,
	oneof: "packet"
}, {
	no: 41,
	name: "CPacketSpawnEntity",
	kind: "message",
	T: CPacketSpawnEntity,
	oneof: "packet"
}, {
	no: 42,
	name: "CPacketSpawnExperienceOrb",
	kind: "message",
	T: CPacketSpawnExperienceOrb,
	oneof: "packet"
}, {
	no: 43,
	name: "CPacketSpawnPlayer",
	kind: "message",
	T: CPacketSpawnPlayer,
	oneof: "packet"
}, {
	no: 44,
	name: "CPacketTabComplete",
	kind: "message",
	T: CPacketTabComplete,
	oneof: "packet"
}, {
	no: 45,
	name: "CPacketTitle",
	kind: "message",
	T: CPacketTitle,
	oneof: "packet"
}, {
	no: 46,
	name: "CPacketUpdateCommandBlock",
	kind: "message",
	T: CPacketUpdateCommandBlock,
	oneof: "packet"
}, {
	no: 47,
	name: "CPacketUpdateHealth",
	kind: "message",
	T: CPacketUpdateHealth,
	oneof: "packet"
}, {
	no: 48,
	name: "CPacketUpdateLeaderboard",
	kind: "message",
	T: CPacketUpdateLeaderboard,
	oneof: "packet"
}, {
	no: 49,
	name: "CPacketUpdateScoreboard",
	kind: "message",
	T: CPacketUpdateScoreboard,
	oneof: "packet"
}, {
	no: 50,
	name: "CPacketUpdateSign",
	kind: "message",
	T: CPacketUpdateSign,
	oneof: "packet"
}, {
	no: 51,
	name: "CPacketUpdateStatus",
	kind: "message",
	T: CPacketUpdateStatus,
	oneof: "packet"
}, {
	no: 52,
	name: "CPacketUseBed",
	kind: "message",
	T: CPacketUseBed,
	oneof: "packet"
}, {
	no: 53,
	name: "CPacketWindowItems",
	kind: "message",
	T: CPacketWindowItems,
	oneof: "packet"
}, {
	no: 54,
	name: "CPacketWindowProperty",
	kind: "message",
	T: CPacketWindowProperty,
	oneof: "packet"
}, {
	no: 55,
	name: "CPacketEntityAttach",
	kind: "message",
	T: CPacketEntityAttach,
	oneof: "packet"
}, {
	no: 56,
	name: "CPacketServerMetadata",
	kind: "message",
	T: CPacketServerMetadata,
	oneof: "packet"
}, {
	no: 57,
	name: "CPacketTimeUpdate",
	kind: "message",
	T: CPacketTimeUpdate,
	oneof: "packet"
}]));
const SPacketEnchantItem = class extends Message {
	constructor($) {
		super();
		ut(this, "windowId");
		ut(this, "button");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketEnchantItem().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketEnchantItem().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketEnchantItem().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketEnchantItem, $, et)
	}
};
exports.SPacketEnchantItem = SPacketEnchantItem,
ut(SPacketEnchantItem, "runtime", proto2),
ut(SPacketEnchantItem, "typeName", "SPacketEnchantItem"),
ut(SPacketEnchantItem, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "windowId",
	kind: "scalar",
	T: 5
}, {
	no: 2,
	name: "button",
	kind: "scalar",
	T: 5
}]));
const SPacketQueueNext = class extends Message {
	constructor(_) {
		super(),
		proto2.util.initPartial(_, this)
	}
	static fromBinary(_, $) {
		return new SPacketQueueNext().fromBinary(_, $)
	}
	static fromJson(_, $) {
		return new SPacketQueueNext().fromJson(_, $)
	}
	static fromJsonString(_, $) {
		return new SPacketQueueNext().fromJsonString(_, $)
	}
	static equals(_, $) {
		return proto2.util.equals(SPacketQueueNext, _, $)
	}
};
exports.SPacketQueueNext = SPacketQueueNext,
ut(SPacketQueueNext, "runtime", proto2),
ut(SPacketQueueNext, "typeName", "SPacketQueueNext"),
ut(SPacketQueueNext, "fields", proto2.util.newFieldList(()=>[]));
const SPacketUpdateCommandBlock = class extends Message {
	constructor($) {
		super();
		ut(this, "pos");
		ut(this, "command");
		ut(this, "commands", []);
		ut(this, "repeat");
		proto2.util.initPartial($, this)
	}
	static fromBinary($, et) {
		return new SPacketUpdateCommandBlock().fromBinary($, et)
	}
	static fromJson($, et) {
		return new SPacketUpdateCommandBlock().fromJson($, et)
	}
	static fromJsonString($, et) {
		return new SPacketUpdateCommandBlock().fromJsonString($, et)
	}
	static equals($, et) {
		return proto2.util.equals(SPacketUpdateCommandBlock, $, et)
	}
};
exports.SPacketUpdateCommandBlock = SPacketUpdateCommandBlock,
ut(SPacketUpdateCommandBlock, "runtime", proto2),
ut(SPacketUpdateCommandBlock, "typeName", "SPacketUpdateCommandBlock"),
ut(SPacketUpdateCommandBlock, "fields", proto2.util.newFieldList(()=>[{
	no: 1,
	name: "pos",
	kind: "message",
	T: PBBlockPos
}, {
	no: 2,
	name: "command",
	kind: "scalar",
	T: 9,
	opt: !0
}, {
	no: 3,
	name: "commands",
	kind: "scalar",
	T: 9,
	repeated: !0
}, {
	no: 4,
	name: "repeat",
	kind: "scalar",
	T: 5,
	opt: !0
}]));
const CPACKET_MAP = {
	CPacketAnimation,
	CPacketBlockAction,
	CPacketBlockUpdate,
	CPacketChangeServers,
	CPacketChunkData,
	CPacketCloseWindow,
	CPacketConfirmTransaction,
	CPacketDestroyEntities,
	CPacketDisconnect,
	CPacketEntityAction,
	CPacketEntityEquipment,
	CPacketEntityMetadata,
	CPacketEntityPositionAndRotation,
	CPacketEntityRelPositionAndRotation,
	CPacketEntityStatus,
	CPacketEntityVelocity,
	CPacketExplosion,
	CPacketJoinGame,
	CPacketLeaderboard,
	CPacketLocalStorage,
	CPacketMessage,
	CPacketOpenWindow,
	CPacketParticles,
	CPacketPlayerList,
	CPacketPlayerPosition,
	CPacketPlayerPosLook,
	CPacketPong,
	CPacketRespawn,
	CPacketScoreboard,
	CPacketServerInfo,
	CPacketSetSlot,
	CPacketSignEditorOpen,
	CPacketSoundEffect,
	CPacketSpawnEntity,
	CPacketSpawnPlayer,
	CPacketTabComplete,
	CPacketTitle,
	CPacketUpdate,
	CPacketUpdateHealth,
	CPacketUpdateLeaderboard,
	CPacketUpdateScoreboard,
	CPacketUpdateSign,
	CPacketUpdateStatus,
	CPacketWindowItems,
	CPacketWindowProperty,
	CPacketUseBed,
	CPacketQueueNext,
	CPacketSpawnExperienceOrb,
	CPacketSetExperience,
	CPacketOpenShop,
	CPacketShopProperties,
	CPacketEntityProperties,
	CPacketEntityEffect,
	CPacketRemoveEntityEffect,
	CPacketUpdateCommandBlock,
	CPacketEntityAttach,
	CPacketServerMetadata,
	CPacketTimeUpdate,
	ClientBoundCombined
}
  , SPACKET_MAP = {
	SPacketAdminAction,
	SPacketAnalytics,
	SPacketClickWindow,
	SPacketCloseWindow,
	SPacketConfirmTransaction,
	SPacketEnchantItem,
	SPacketEntityAction,
	SPacketHeldItemChange,
	SPacketLoginStart,
	SPacketMessage,
	SPacketOpenShop,
	SPacketPing,
	SPacketPlayerAbilities,
	SPacketPlayerAction,
	SPacketPlayerPosLook,
	SPacketRespawn,
	SPacketTabComplete: SPacketTabComplete$1,
	SPacketUpdateSign,
	SPacketUseEntity,
	SPacketUpdateCommandBlock,
	SPacketQueueNext,
	SPacketInput,
	SPacketBreakBlock,
	SPacketClick,
	SPacketCraftItem,
	SPacketPlaceBlock,
	SPacketRequestChunk,
	SPacketUpdateInventory,
	SPacketUseItem
}
  , NAME_TO_ID = {}
  , ID_TO_PACKET = {}
  , ID_TO_NAME = {};
let currentId = 0;
for (const [j,_] of Object.entries(CPACKET_MAP))
	NAME_TO_ID[j] = currentId,
	ID_TO_PACKET[currentId] = _,
	ID_TO_NAME[currentId] = j,
	currentId++;
for (const [j,_] of Object.entries(SPACKET_MAP))
	NAME_TO_ID[j] = currentId,
	ID_TO_PACKET[currentId] = _,
	ID_TO_NAME[currentId] = j,
	currentId++;

exports.BitArray = class {
	constructor(_, $, et) {
		ut(this, "capacity");
		ut(this, "bitsPerValue");
		ut(this, "valueMask");
		ut(this, "valuesPerLong");
		ut(this, "data");
		if ($ <= 0)
			throw new Error("bits per value must at least 1");
		if ($ > 32)
			throw new Error(`${$} bits per value exceeds 32`);
		this.capacity = _,
		this.bitsPerValue = $,
		this.valuesPerLong = Math.floor(64 / $),
		this.valueMask = (1 << $) - 1;
		const tt = new ArrayBuffer(Math.ceil(_ / this.valuesPerLong) * 8);
		if (this.data = new Uint32Array(tt),
		et) {
			if (et.byteLength !== tt.byteLength)
				throw new Error("initial data length does not match buffer length");
			new Uint8Array(tt).set(et)
		}
	}
	getBitsPerValue() {
		return this.bitsPerValue
	}
	getDataArray() {
		return new Uint8Array(this.data.buffer,this.data.byteOffset,this.data.byteLength)
	}
	writeUint32(_, $) {
		this.data[_] = $ >>> 0
	}
	getUint32(_) {
		return this.data[_]
	}
	get(_) {
		const $ = Math.floor(_ / this.valuesPerLong)
			, et = (_ - $ * this.valuesPerLong) * this.bitsPerValue
			, tt = this.data[$ * 2]
			, rt = et;
		if (rt >= 32) {
			const at = rt - 32;
			return this.data[$ * 2 + 1] >>> at & this.valueMask
		}
		let nt = tt >>> rt;
		if (rt + this.bitsPerValue > 32) {
			const at = this.data[$ * 2 + 1];
			nt |= at << 32 - rt
		}
		return nt & this.valueMask
	}
	set(_, $) {
		const et = Math.floor(_ / this.valuesPerLong)
			, tt = _ % this.valuesPerLong * this.bitsPerValue;
		if (tt >= 32) {
			const nt = tt - 32;
			this.data[et * 2 + 1] = this.data[et * 2 + 1] & ~(this.valueMask << nt) | ($ & this.valueMask) << nt;
			return
		}
		this.data[et * 2] = this.data[et * 2] & ~(this.valueMask << tt) | ($ & this.valueMask) << tt;
		const rt = tt + this.bitsPerValue;
		rt > 32 && (this.data[et * 2 + 1] = this.data[et * 2 + 1] & ~((1 << rt - 32) - 1) | $ >>> 32 - tt)
	}
	resizeTo(_) {
		const $ = new BitArray(this.capacity,_);
		for (let et = 0; et < this.capacity; ++et) {
			const tt = this.get(et);
			if (neededBits(tt) > _)
				throw new Error("existing value in BitArray can't fit in new bits per value");
			$.set(et, tt)
		}
		return $
	}
	uInt32Length() {
		return this.data.length
	}
}

class ClientEncoder {
	constructor() {
		ut(this, "encode", _=>(_.t = _.type,
		_.d = _.data,
		delete _.type,
		delete _.nsp,
		delete _.data,
		_.t === 2 && _.d[1] && _.d[1].toJson && (_.d[1] = _.d[1].toJson(),
		_.d[0] = NAME_TO_ID[_.d[0]]),
		[encode(_)]))
	}
}

class ClientDecoder extends Decoder {
	constructor() {
		super(...arguments);
		ut(this, "add", async $=>{
			try {
				const tt = new Uint8Array($)[0]
				  , rt = tt & 1;
				let nt = new Uint8Array($,1,$.byteLength - 1);
				nt = nt.slice(1);
				if (rt) {
					const it = tt >> 2, at = tt & 2, st = ID_TO_PACKET[it];
					at && (nt = brotli.decompress(nt));
					const ot = st.fromBinary(nt);
					st.typeName === "ClientBoundCombined" ? ot.packets.forEach(ct=>{
						this.emit("decoded", {
							type: 2,
							nsp: "/",
							data: [ct.packet.case, ct.packet.value]
						})
					}) : this.emit("decoded", {
						type: 2,
						nsp: "/",
						data: [st.typeName, ot]
					})
				} else {
					const it = tt >> 5 & 7;
					this.emit("decoded", {
						type: it,
						nsp: "/",
						data: decode(nt)
					})
				}
			} catch (et) {
				console.error("ClientDecoder.add", et)
			}
		})
	}
}

const parser = {
	protocol: protocol,
	Encoder: ClientEncoder,
	Decoder: ClientDecoder
};

exports.ClientSocket = class {
	static setUrl(_, $) {
		this.socket = io(_, {
			transports: ["websocket"],
			extraHeaders: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0'
			},
			autoConnect: !1,
			forceNew: !0,
			reconnectionAttempts: 2,
			closeOnBeforeunload: !1,
			parser,
			reconnectionDelay: 2e3,
			path: $ || "/socket.io"
		})
	}
	static connect() {
		this.socket.on("connect", ()=>{
			exports.ClientSocket.id = this.socket.id
		}),
		this.socket.connect()
	}
	static disconnect(_) {
		if (this.disconnectMessage = _,
		!this.socket) {
			console.error("CSocket.disconnect: socket is null");
			return
		}
		this.socket.disconnect()
	}
	static once(_, $) {
		this.socket.once(_, $)
	}
	static on(_, $) {
		let et = !0;
		const tt = (...rt)=>{
			try {
				$.apply(null, rt)
			} catch (nt) {
				if (et)
					throw et = !1,
					nt
			}
		};
		this.socket.on(_, tt)
	}
	static sendPacket(_) {
		var $;
		($ = this.socket) == null || $.emit(_.constructor.typeName, _)
	}
};
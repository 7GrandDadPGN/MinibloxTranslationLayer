const io = require("socket.io-client");
const brotli = require("brotli");
const { Decoder, protocol } = require("socket.io-msgpack-parser");
const { encode, decode } = require("@msgpack/msgpack");
const { Message, proto2, proto3 } = require("./types/proto.js");
const { VERSION } = require("./types/constants.js");

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

class SPacketLoginStart extends Message {
	constructor(SPacketLoginStart) {
		super(), proto2.util.initPartial(SPacketLoginStart, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketLoginStart`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `session`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 2,
			name: `hydration`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `metrics_id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 4,
			name: `requested_uuid`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `client_version`,
			kind: `scalar`,
			T: 9
		}, {
			no: 6,
			name: `language`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 7,
			name: `prefetch`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketLoginStart().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketLoginStart().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketLoginStart().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketLoginStart, t, n);
	}
};
exports.SPacketLoginStart = SPacketLoginStart;
class PBItemStack extends Message {
	constructor(PBItemStack) {
		super(), proto2.util.initPartial(PBItemStack, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBItemStack`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `present`,
			kind: `scalar`,
			T: 8
		}, {
			no: 2,
			name: `id`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 3,
			name: `stackSize`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 5,
			name: `durability`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 4,
			name: `data`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBItemStack().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBItemStack().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBItemStack().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBItemStack, t, n);
	}
};
exports.PBItemStack = PBItemStack;
class PBBlockPos extends Message {
	constructor(PBBlockPos) {
		super(), proto2.util.initPartial(PBBlockPos, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBBlockPos`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 17
		}]);
	}
	static fromBinary(t, n) {
		return new PBBlockPos().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBBlockPos().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBBlockPos().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBBlockPos, t, n);
	}
};
exports.PBBlockPos = PBBlockPos;
class PBVector3 extends Message {
	constructor(PBVector3) {
		super(), proto2.util.initPartial(PBVector3, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBVector3`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 17
		}]);
	}
	static fromBinary(t, n) {
		return new PBVector3().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBVector3().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBVector3().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBVector3, t, n);
	}
};
exports.PBVector3 = PBVector3;
class PBFloatVector3 extends Message {
	constructor(PBFloatVector3) {
		super(), proto2.util.initPartial(PBFloatVector3, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBFloatVector3`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new PBFloatVector3().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBFloatVector3().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBFloatVector3().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBFloatVector3, t, n);
	}
};
exports.PBFloatVector3 = PBFloatVector3;
class CPacketEntityVelocity extends Message {
	constructor(CPacketEntityVelocity) {
		super(), proto2.util.initPartial(CPacketEntityVelocity, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityVelocity`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `motion`,
			kind: `message`,
			T: PBFloatVector3
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityVelocity().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityVelocity().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityVelocity().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityVelocity, t, n);
	}
};
exports.CPacketEntityVelocity = CPacketEntityVelocity;
class CPacketChunkData extends Message {
	constructor(CPacketChunkData) {
		super(), this.x = 0, this.z = 0, this.cells = [], this.tileEntities = [], this.dimension = 0, this.biomes = [], this.hash = ``, proto2.util.initPartial(CPacketChunkData, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketChunkData`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 2,
			name: `z`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `cells`,
			kind: `message`,
			T: PBCell,
			repeated: !0
		}, {
			no: 4,
			name: `tileEntities`,
			kind: `message`,
			T: PBTileEntity,
			repeated: !0
		}, {
			no: 5,
			name: `dimension`,
			kind: `scalar`,
			T: 5
		}, {
			no: 6,
			name: `biomes`,
			kind: `scalar`,
			T: 13,
			repeated: !0
		}, {
			no: 7,
			name: `hash`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketChunkData().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketChunkData().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketChunkData().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketChunkData, t, n);
	}
};
exports.CPacketChunkData = CPacketChunkData;
class PBCell extends Message {
	constructor(PBCell) {
		super(), this.y = 0, this.bitsPerEntry = 0, this.palette = [], this.bitArray = new Uint8Array(), this.blockRefCount = 0, proto2.util.initPartial(PBCell, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBCell`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 7,
			name: `y`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `bitsPerEntry`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `palette`,
			kind: `scalar`,
			T: 13,
			repeated: !0
		}, {
			no: 6,
			name: `bitArray`,
			kind: `scalar`,
			T: 12
		}, {
			no: 5,
			name: `blockRefCount`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new PBCell().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBCell().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBCell().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBCell, t, n);
	}
};
exports.PBCell = PBCell;
class PBTileEntity extends Message {
	constructor(PBTileEntity) {
		super(), this.x = 0, this.y = 0, this.z = 0, this.nbt = new Uint8Array(), proto2.util.initPartial(PBTileEntity, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBTileEntity`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 17
		}, {
			no: 5,
			name: `nbt`,
			kind: `scalar`,
			T: 12
		}]);
	}
	static fromBinary(t, n) {
		return new PBTileEntity().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBTileEntity().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBTileEntity().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBTileEntity, t, n);
	}
};
exports.PBTileEntity = PBTileEntity;
class CPacketEntityEquipment extends Message {
	constructor(CPacketEntityEquipment) {
		super(), this.equipment = [], proto2.util.initPartial(CPacketEntityEquipment, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityEquipment`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `equipment`,
			kind: `message`,
			T: Equipment,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityEquipment().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityEquipment().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityEquipment().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityEquipment, t, n);
	}
};
exports.CPacketEntityEquipment = CPacketEntityEquipment;
const ItemSlots = function(e) {
	return e[e.UNDEFINED_SLOT = 0] = `UNDEFINED_SLOT`,
	e[e.MAIN_HAND = 1] = `MAIN_HAND`,
	e[e.OFF_HAND = 2] = `OFF_HAND`,
	e[e.HELMET = 3] = `HELMET`,
	e[e.CHESTPLATE = 4] = `CHESTPLATE`,
	e[e.LEGGINGS = 5] = `LEGGINGS`,
	e[e.BOOTS = 6] = `BOOTS`,
	e
}({});
proto2.util.setEnumType(ItemSlots, `Equipment.Slot`, [{
	no: 0,
	name: `UNDEFINED_SLOT`
}, {
	no: 1,
	name: `MAIN_HAND`
}, {
	no: 2,
	name: `OFF_HAND`
}, {
	no: 3,
	name: `HELMET`
}, {
	no: 4,
	name: `CHESTPLATE`
}, {
	no: 5,
	name: `LEGGINGS`
}, {
	no: 6,
	name: `BOOTS`
}]);
class Equipment extends Message {
	constructor(Equipment) {
		super(), proto2.util.initPartial(Equipment, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `Equipment`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `slot`,
			kind: `enum`,
			T: proto2.getEnumType(ItemSlots)
		}, {
			no: 2,
			name: `item`,
			kind: `message`,
			T: PBItemStack
		}]);
	}
	static fromBinary(t, n) {
		return new Equipment().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new Equipment().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new Equipment().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(Equipment, t, n);
	}
};
exports.Equipment = Equipment;
class SPacketUpdateInventory extends Message {
	constructor(SPacketUpdateInventory) {
		super(), this.main = [], this.armor = [], proto2.util.initPartial(SPacketUpdateInventory, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUpdateInventory`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `main`,
			kind: `message`,
			T: PBItemStack,
			repeated: !0
		}, {
			no: 2,
			name: `armor`,
			kind: `message`,
			T: PBItemStack,
			repeated: !0
		}, {
			no: 3,
			name: `idkWhatThisIs`,
			kind: `message`,
			T: PBItemStack
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketUpdateInventory().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUpdateInventory().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUpdateInventory().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUpdateInventory, t, n);
	}
};
exports.SPacketUpdateInventory = SPacketUpdateInventory;
class CPacketUpdatePlayerHead extends Message {
	constructor(CPacketUpdatePlayerHead) {
		super(), proto2.util.initPartial(CPacketUpdatePlayerHead, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdatePlayerHead`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `owner`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdatePlayerHead().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdatePlayerHead().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdatePlayerHead().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdatePlayerHead, t, n);
	}
};
exports.CPacketUpdatePlayerHead = CPacketUpdatePlayerHead;
class CPacketUpdateSign extends Message {
	constructor(CPacketUpdateSign) {
		super(), this.lines = [], proto2.util.initPartial(CPacketUpdateSign, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateSign`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `lines`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateSign().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateSign().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateSign().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateSign, t, n);
	}
};
exports.CPacketUpdateSign = CPacketUpdateSign;
class CPacketUpdateCommandBlock extends Message {
	constructor(CPacketUpdateCommandBlock) {
		super(), this.commands = [], proto2.util.initPartial(CPacketUpdateCommandBlock, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateCommandBlock`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `command`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `commands`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}, {
			no: 4,
			name: `repeat`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateCommandBlock().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateCommandBlock().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateCommandBlock().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateCommandBlock, t, n);
	}
};
exports.CPacketUpdateCommandBlock = CPacketUpdateCommandBlock;
class SPacketEntityAction extends Message {
	constructor(SPacketEntityAction) {
		super(), proto2.util.initPartial(SPacketEntityAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketEntityAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `sneak`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 3,
			name: `sprinting`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 4,
			name: `punching`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 5,
			name: `awEFjULFka`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 6,
			name: `BTOYbfvDBaQ`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 20,
			name: `fire`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 21,
			name: `stopSleeping`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketEntityAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketEntityAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketEntityAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketEntityAction, t, n);
	}
};
exports.SPacketEntityAction = SPacketEntityAction;
class SPacketQueueNext extends Message {
	constructor(SPacketQueueNext) {
		super(), proto2.util.initPartial(SPacketQueueNext, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketQueueNext`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new SPacketQueueNext().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketQueueNext().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketQueueNext().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketQueueNext, t, n);
	}
};
exports.SPacketQueueNext = SPacketQueueNext;
class SPacketCloseWindow extends Message {
	constructor(SPacketCloseWindow) {
		super(), proto2.util.initPartial(SPacketCloseWindow, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketCloseWindow`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketCloseWindow().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketCloseWindow().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketCloseWindow().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketCloseWindow, t, n);
	}
};
exports.SPacketCloseWindow = SPacketCloseWindow;
class SPacketPlayerAbilities extends Message {
	constructor(SPacketPlayerAbilities) {
		super(), proto2.util.initPartial(SPacketPlayerAbilities, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlayerAbilities`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `isFlying`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlayerAbilities().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlayerAbilities().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlayerAbilities().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlayerAbilities, t, n);
	}
};
exports.SPacketPlayerAbilities = SPacketPlayerAbilities;
class SPacketPlayerPosLook extends Message {
	constructor(SPacketPlayerPosLook) {
		super(), proto2.util.initPartial(SPacketPlayerPosLook, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlayerPosLook`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: Vector3,
			opt: !0
		}, {
			no: 2,
			name: `yaw`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 3,
			name: `pitch`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 4,
			name: `onGround`,
			kind: `scalar`,
			T: 8
		}, {
			no: 5,
			name: `gliding`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlayerPosLook().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlayerPosLook().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlayerPosLook().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlayerPosLook, t, n);
	}
};
exports.SPacketPlayerPosLook = SPacketPlayerPosLook;
class Vector3 extends Message {
	constructor(Vector3) {
		super(), proto2.util.initPartial(Vector3, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `Vector3`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new Vector3().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new Vector3().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new Vector3().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(Vector3, t, n);
	}
};
exports.Vector3 = Vector3;
class SPacketRespawn extends Message {
	constructor(SPacketRespawn) {
		super(), proto2.util.initPartial(SPacketRespawn, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketRespawn`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new SPacketRespawn().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketRespawn().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketRespawn().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketRespawn, t, n);
	}
};
exports.SPacketRespawn = SPacketRespawn;
class SPacketOpenShop extends Message {
	constructor(SPacketOpenShop) {
		super(), proto2.util.initPartial(SPacketOpenShop, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketOpenShop`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new SPacketOpenShop().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketOpenShop().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketOpenShop().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketOpenShop, t, n);
	}
};
exports.SPacketOpenShop = SPacketOpenShop;
class SPacketBreakBlock extends Message {
	constructor(SPacketBreakBlock) {
		super(), proto2.util.initPartial(SPacketBreakBlock, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketBreakBlock`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `location`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `start`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketBreakBlock().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketBreakBlock().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketBreakBlock().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketBreakBlock, t, n);
	}
};
exports.SPacketBreakBlock = SPacketBreakBlock;
class SPacketClick extends Message {
	constructor(SPacketClick) {
		super(), proto2.util.initPartial(SPacketClick, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketClick`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `location`,
			kind: `message`,
			T: PBBlockPos,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketClick().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketClick().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketClick().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketClick, t, n);
	}
};
exports.SPacketClick = SPacketClick;

const EnumFace = function(e) {
	return e[e.UNDEFINED_FACE = 0] = `UNDEFINED_FACE`,
	e[e.DOWN = 1] = `DOWN`,
	e[e.UP = 2] = `UP`,
	e[e.NORTH = 3] = `NORTH`,
	e[e.SOUTH = 4] = `SOUTH`,
	e[e.WEST = 5] = `WEST`,
	e[e.EAST = 6] = `EAST`,
	e
}({});
proto2.util.setEnumType(EnumFace, `PBEnumFacing`, [{
	no: 0,
	name: `UNDEFINED_FACE`
}, {
	no: 1,
	name: `DOWN`
}, {
	no: 2,
	name: `UP`
}, {
	no: 3,
	name: `NORTH`
}, {
	no: 4,
	name: `SOUTH`
}, {
	no: 5,
	name: `WEST`
}, {
	no: 6,
	name: `EAST`
}]);

class SPacketPlaceBlock extends Message {
	constructor(SPacketPlaceBlock) {
		super(), proto2.util.initPartial(SPacketPlaceBlock, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlaceBlock`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `positionIn`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `side`,
			kind: `enum`,
			T: proto2.getEnumType(EnumFace)
		}, {
			no: 4,
			name: `hitX`,
			kind: `scalar`,
			T: 2
		}, {
			no: 5,
			name: `hitY`,
			kind: `scalar`,
			T: 2
		}, {
			no: 6,
			name: `hitZ`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlaceBlock().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlaceBlock().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlaceBlock().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlaceBlock, t, n);
	}
};
exports.SPacketPlaceBlock = SPacketPlaceBlock;
class SPacketUseItem extends Message {
	constructor(SPacketUseItem) {
		super(), proto2.util.initPartial(SPacketUseItem, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUseItem`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new SPacketUseItem().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUseItem().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUseItem().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUseItem, t, n);
	}
};
exports.SPacketUseItem = SPacketUseItem;
class SPacketClickWindow extends Message {
	constructor(SPacketClickWindow) {
		super(), proto2.util.initPartial(SPacketClickWindow, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketClickWindow`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `slotId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 4,
			name: `button`,
			kind: `scalar`,
			T: 5
		}, {
			no: 5,
			name: `mode`,
			kind: `scalar`,
			T: 5
		}, {
			no: 6,
			name: `itemStack`,
			kind: `message`,
			T: PBItemStack
		}, {
			no: 7,
			name: `transactionId`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketClickWindow().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketClickWindow().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketClickWindow().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketClickWindow, t, n);
	}
};
exports.SPacketClickWindow = SPacketClickWindow;

const BreakActionTypes = function(e) {
	return e[e.START_DESTROY_BLOCK = 0] = `START_DESTROY_BLOCK`,
	e[e.ABORT_DESTROY_BLOCK = 1] = `ABORT_DESTROY_BLOCK`,
	e[e.STOP_DESTROY_BLOCK = 2] = `STOP_DESTROY_BLOCK`,
	e[e.DROP_ALL_ITEMS = 3] = `DROP_ALL_ITEMS`,
	e[e.DROP_ITEM = 4] = `DROP_ITEM`,
	e[e.RELEASE_USE_ITEM = 5] = `RELEASE_USE_ITEM`,
	e
}({});
proto2.util.setEnumType(BreakActionTypes, `PBAction`, [{
	no: 0,
	name: `START_DESTROY_BLOCK`
}, {
	no: 1,
	name: `ABORT_DESTROY_BLOCK`
}, {
	no: 2,
	name: `STOP_DESTROY_BLOCK`
}, {
	no: 3,
	name: `DROP_ALL_ITEMS`
}, {
	no: 4,
	name: `DROP_ITEM`
}, {
	no: 5,
	name: `RELEASE_USE_ITEM`
}]);

class SPacketPlayerAction extends Message {
	constructor(SPacketPlayerAction) {
		super(), proto2.util.initPartial(SPacketPlayerAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlayerAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `position`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `facing`,
			kind: `enum`,
			T: proto2.getEnumType(EnumFace)
		}, {
			no: 3,
			name: `action`,
			kind: `enum`,
			T: proto2.getEnumType(BreakActionTypes)
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlayerAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlayerAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlayerAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlayerAction, t, n);
	}
};
exports.SPacketPlayerAction = SPacketPlayerAction;
const UseTypes = function(e) {
	return e[e.INTERACT = 0] = `INTERACT`,
	e[e.ATTACK = 1] = `ATTACK`,
	e[e.INTERACT_AT = 2] = `INTERACT_AT`,
	e
}({});
proto2.util.setEnumType(UseTypes, `SPacketUseEntity.Action`, [{
	no: 0,
	name: `INTERACT`
}, {
	no: 1,
	name: `ATTACK`
}, {
	no: 2,
	name: `INTERACT_AT`
}]);
class SPacketUseEntity extends Message {
	constructor(SPacketUseEntity) {
		super(), proto2.util.initPartial(SPacketUseEntity, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUseEntity`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `action`,
			kind: `enum`,
			T: proto2.getEnumType(UseTypes)
		}, {
			no: 3,
			name: `hitVec`,
			kind: `message`,
			T: PBFloatVector3,
			opt: !0
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 6,
			name: `sequence`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketUseEntity().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUseEntity().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUseEntity().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUseEntity, t, n);
	}
};
exports.SPacketUseEntity = SPacketUseEntity;
class SPacketMessage extends Message {
	constructor(SPacketMessage) {
		super(), proto2.util.initPartial(SPacketMessage, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketMessage`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `text`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `channel`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketMessage().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketMessage().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketMessage().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketMessage, t, n);
	}
};
exports.SPacketMessage = SPacketMessage;
class CPacketAnimation extends Message {
	constructor(CPacketAnimation) {
		super(), proto2.util.initPartial(CPacketAnimation, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketAnimation`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `type`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketAnimation().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketAnimation().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketAnimation().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketAnimation, t, n);
	}
};
exports.CPacketAnimation = CPacketAnimation;
class CPacketBlockAction extends Message {
	constructor(CPacketBlockAction) {
		super(), proto2.util.initPartial(CPacketBlockAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketBlockAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `blockPos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `instrument`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `pitch`,
			kind: `scalar`,
			T: 17
		}, {
			no: 4,
			name: `blockId`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketBlockAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketBlockAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketBlockAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketBlockAction, t, n);
	}
};
exports.CPacketBlockAction = CPacketBlockAction;
class CPacketBlockUpdate extends Message {
	constructor(CPacketBlockUpdate) {
		super(), proto2.util.initPartial(CPacketBlockUpdate, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketBlockUpdate`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `y`,
			kind: `scalar`,
			T: 17
		}, {
			no: 4,
			name: `z`,
			kind: `scalar`,
			T: 17
		}, {
			no: 5,
			name: `prerender`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketBlockUpdate().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketBlockUpdate().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketBlockUpdate().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketBlockUpdate, t, n);
	}
};
exports.CPacketBlockUpdate = CPacketBlockUpdate;
class CPacketChangeServers extends Message {
	constructor(CPacketChangeServers) {
		super(), proto2.util.initPartial(CPacketChangeServers, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketChangeServers`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `url`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketChangeServers().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketChangeServers().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketChangeServers().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketChangeServers, t, n);
	}
};
exports.CPacketChangeServers = CPacketChangeServers;
class CPacketChunkUnchanged extends Message {
	constructor(CPacketChunkUnchanged) {
		super(), this.x = 0, this.z = 0, this.dimension = 0, proto2.util.initPartial(CPacketChunkUnchanged, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketChunkUnchanged`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 2,
			name: `z`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `dimension`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketChunkUnchanged().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketChunkUnchanged().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketChunkUnchanged().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketChunkUnchanged, t, n);
	}
};
exports.CPacketChunkUnchanged = CPacketChunkUnchanged;
class CPacketCloseWindow extends Message {
	constructor(CPacketCloseWindow) {
		super(), proto2.util.initPartial(CPacketCloseWindow, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketCloseWindow`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketCloseWindow().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketCloseWindow().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketCloseWindow().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketCloseWindow, t, n);
	}
};
exports.CPacketCloseWindow = CPacketCloseWindow;
class CPacketConfirmTransaction extends Message {
	constructor(CPacketConfirmTransaction) {
		super(), proto2.util.initPartial(CPacketConfirmTransaction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketConfirmTransaction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `uid`,
			kind: `scalar`,
			T: 5
		}, {
			no: 3,
			name: `accepted`,
			kind: `scalar`,
			T: 8
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketConfirmTransaction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketConfirmTransaction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketConfirmTransaction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketConfirmTransaction, t, n);
	}
};
exports.CPacketConfirmTransaction = CPacketConfirmTransaction;
class CPacketDestroyEntities extends Message {
	constructor(CPacketDestroyEntities) {
		super(), this.ids = [], proto2.util.initPartial(CPacketDestroyEntities, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketDestroyEntities`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `ids`,
			kind: `scalar`,
			T: 13,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketDestroyEntities().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketDestroyEntities().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketDestroyEntities().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketDestroyEntities, t, n);
	}
};
exports.CPacketDestroyEntities = CPacketDestroyEntities;
class CPacketDisconnect extends Message {
	constructor(CPacketDisconnect) {
		super(), proto2.util.initPartial(CPacketDisconnect, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketDisconnect`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `reason`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketDisconnect().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketDisconnect().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketDisconnect().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketDisconnect, t, n);
	}
};
exports.CPacketDisconnect = CPacketDisconnect;
class CPacketEntityAction extends Message {
	constructor(CPacketEntityAction) {
		super(), proto2.util.initPartial(CPacketEntityAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `sneak`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 3,
			name: `sprinting`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 4,
			name: `punching`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 20,
			name: `fire`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityAction, t, n);
	}
};
exports.CPacketEntityAction = CPacketEntityAction;
class CPacketEntityAttach extends Message {
	constructor(CPacketEntityAttach) {
		super(), proto2.util.initPartial(CPacketEntityAttach, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityAttach`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `leash`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `entity`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `vehicle`,
			kind: `scalar`,
			T: 17
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityAttach().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityAttach().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityAttach().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityAttach, t, n);
	}
};
exports.CPacketEntityAttach = CPacketEntityAttach;
class CPacketEntityMetadata extends Message {
	constructor(CPacketEntityMetadata) {
		super(), this.data = [], proto2.util.initPartial(CPacketEntityMetadata, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityMetadata`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `data`,
			kind: `message`,
			T: PBWatchableObject,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityMetadata().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityMetadata().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityMetadata().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityMetadata, t, n);
	}
};
exports.CPacketEntityMetadata = CPacketEntityMetadata;
class PBWatchableObject extends Message {
	constructor(PBWatchableObject) {
		super(), proto2.util.initPartial(PBWatchableObject, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBWatchableObject`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `dataValueId`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `objectType`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `intValue`,
			kind: `scalar`,
			T: 17,
			opt: !0
		}, {
			no: 4,
			name: `floatValue`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `stringValue`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 6,
			name: `vector`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 7,
			name: `itemStack`,
			kind: `message`,
			T: PBItemStack,
			opt: !0
		}, {
			no: 8,
			name: `blockPos`,
			kind: `message`,
			T: PBBlockPos,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBWatchableObject().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBWatchableObject().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBWatchableObject().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBWatchableObject, t, n);
	}
};
exports.PBWatchableObject = PBWatchableObject;
class CPacketEntityPositionAndRotation extends Message {
	constructor(CPacketEntityPositionAndRotation) {
		super(), proto2.util.initPartial(CPacketEntityPositionAndRotation, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityPositionAndRotation`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `pos`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 3,
			name: `vel`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 6,
			name: `onGround`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityPositionAndRotation().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityPositionAndRotation().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityPositionAndRotation().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityPositionAndRotation, t, n);
	}
};
exports.CPacketEntityPositionAndRotation = CPacketEntityPositionAndRotation;
class CPacketEntityRelativePositionAndRotation extends Message {
	constructor(CPacketEntityRelativePositionAndRotation) {
		super(), proto2.util.initPartial(CPacketEntityRelativePositionAndRotation, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityRelativePositionAndRotation`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `pos`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 3,
			name: `vel`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 17,
			opt: !0
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 17,
			opt: !0
		}, {
			no: 6,
			name: `onGround`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityRelativePositionAndRotation().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityRelativePositionAndRotation().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityRelativePositionAndRotation().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityRelativePositionAndRotation, t, n);
	}
};
exports.CPacketEntityRelativePositionAndRotation = CPacketEntityRelativePositionAndRotation;
class CPacketEntityStatus extends Message {
	constructor(CPacketEntityStatus) {
		super(), proto2.util.initPartial(CPacketEntityStatus, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityStatus`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `entityId`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `entityStatus`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityStatus().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityStatus().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityStatus().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityStatus, t, n);
	}
};
exports.CPacketEntityStatus = CPacketEntityStatus;
class CPacketExplosion extends Message {
	constructor(CPacketExplosion) {
		super(), this.blocks = [], proto2.util.initPartial(CPacketExplosion, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketExplosion`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBFloatVector3
		}, {
			no: 2,
			name: `strength`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `blocks`,
			kind: `message`,
			T: PBBlockPos,
			repeated: !0
		}, {
			no: 4,
			name: `playerPos`,
			kind: `message`,
			T: PBFloatVector3
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketExplosion().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketExplosion().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketExplosion().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketExplosion, t, n);
	}
};
exports.CPacketExplosion = CPacketExplosion;
class PBCosmetics extends Message {
	constructor(PBCosmetics) {
		super(), proto2.util.initPartial(PBCosmetics, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBCosmetics`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `skin`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 2,
			name: `cape`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `aura`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 4,
			name: `trail`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `color`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 6,
			name: `hat`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBCosmetics().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBCosmetics().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBCosmetics().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBCosmetics, t, n);
	}
};
exports.PBCosmetics = PBCosmetics;
class CPacketServerInfo extends Message {
	constructor(CPacketServerInfo) {
		super(), this.playerPermissionEntries = [], this.recentPlayers = [], proto2.util.initPartial(CPacketServerInfo, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketServerInfo`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `server_id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `server_name`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `server_version`,
			kind: `scalar`,
			T: 9
		}, {
			no: 4,
			name: `server_category`,
			kind: `scalar`,
			T: 9
		}, {
			no: 5,
			name: `access_control`,
			kind: `scalar`,
			T: 9
		}, {
			no: 11,
			name: `world_type`,
			kind: `scalar`,
			T: 9
		}, {
			no: 13,
			name: `do_daylight_cycle`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 6,
			name: `invite_code`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 7,
			name: `cheats`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 8,
			name: `pvp_enabled`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 9,
			name: `start_time`,
			kind: `scalar`,
			T: 4
		}, {
			no: 10,
			name: `player_permission_entries`,
			kind: `message`,
			T: PlayerPermissionEntry,
			repeated: !0
		}, {
			no: 12,
			name: `metadata`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 14,
			name: `command_blocks_enabled`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 15,
			name: `scripting_enabled`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 16,
			name: `recent_players`,
			kind: `message`,
			T: PlayerPermissionEntry,
			repeated: !0
		}, {
			no: 17,
			name: `difficulty`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 18,
			name: `enable_redstone`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 19,
			name: `save_player_data`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 20,
			name: `always_stay_on`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 21,
			name: `world_start_time`,
			kind: `scalar`,
			T: 4,
			opt: !0
		}, {
			no: 22,
			name: `allow_guest_chat`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 23,
			name: `script_permission`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketServerInfo().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketServerInfo().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketServerInfo().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketServerInfo, t, n);
	}
};
exports.CPacketServerInfo = CPacketServerInfo;
class PlayerPermissionEntry extends Message {
	constructor(PlayerPermissionEntry) {
		super(), proto2.util.initPartial(PlayerPermissionEntry, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PlayerPermissionEntry`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `username`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `permission_level`,
			kind: `scalar`,
			T: 5
		}, {
			no: 4,
			name: `color`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `rank`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 6,
			name: `level`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 7,
			name: `verified`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PlayerPermissionEntry().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PlayerPermissionEntry().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PlayerPermissionEntry().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PlayerPermissionEntry, t, n);
	}
};
exports.PlayerPermissionEntry = PlayerPermissionEntry;
class CPacketJoinGame extends Message {
	constructor(CPacketJoinGame) {
		super(), proto2.util.initPartial(CPacketJoinGame, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketJoinGame`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `can_connect`,
			kind: `scalar`,
			T: 8
		}, {
			no: 2,
			name: `error_message`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `tick`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 6,
			name: `gamemode`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 7,
			name: `name`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 10,
			name: `enable_player_collision`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 11,
			name: `cosmetics`,
			kind: `message`,
			T: PBCosmetics,
			opt: !0
		}, {
			no: 12,
			name: `rank`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 13,
			name: `server_info`,
			kind: `message`,
			T: CPacketServerInfo,
			opt: !0
		}, {
			no: 14,
			name: `uuid`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 15,
			name: `dimension`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 16,
			name: `server_full`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketJoinGame().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketJoinGame().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketJoinGame().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketJoinGame, t, n);
	}
};
exports.CPacketJoinGame = CPacketJoinGame;
class CPacketLeaderboard extends Message {
	constructor(CPacketLeaderboard) {
		super(), this.content = [], proto2.util.initPartial(CPacketLeaderboard, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketLeaderboard`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `pos`,
			kind: `message`,
			T: PBVector3
		}, {
			no: 3,
			name: `yaw`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 4,
			name: `title`,
			kind: `scalar`,
			T: 9
		}, {
			no: 5,
			name: `content`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketLeaderboard().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketLeaderboard().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketLeaderboard().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketLeaderboard, t, n);
	}
};
exports.CPacketLeaderboard = CPacketLeaderboard;

const StorageActionTypes = function(e) {
	return e[e.DEFAULT = 0] = `DEFAULT`,
	e[e.REMOVE = 1] = `REMOVE`,
	e[e.SET = 2] = `SET`,
	e
}({});
proto2.util.setEnumType(StorageActionTypes, `CPacketLocalStorage.Action`, [{
	no: 0,
	name: `DEFAULT`
}, {
	no: 1,
	name: `REMOVE`
}, {
	no: 2,
	name: `SET`
}]);

class CPacketLocalStorage extends Message {
	constructor(CPacketLocalStorage) {
		super(), proto2.util.initPartial(CPacketLocalStorage, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketLocalStorage`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `action`,
			kind: `enum`,
			T: proto2.getEnumType(StorageActionTypes)
		}, {
			no: 2,
			name: `key`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `value`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketLocalStorage().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketLocalStorage().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketLocalStorage().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketLocalStorage, t, n);
	}
};
exports.CPacketLocalStorage = CPacketLocalStorage;
class CPacketMessage extends Message {
	constructor(CPacketMessage) {
		super(), proto2.util.initPartial(CPacketMessage, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketMessage`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `text`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `id`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 4,
			name: `color`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `discard`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 6,
			name: `toast`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 7,
			name: `timer`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 8,
			name: `from`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 9,
			name: `position`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketMessage().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketMessage().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketMessage().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketMessage, t, n);
	}
};
exports.CPacketMessage = CPacketMessage;
class CPacketOpenShop extends Message {
	constructor(CPacketOpenShop) {
		super(), proto2.util.initPartial(CPacketOpenShop, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketOpenShop`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `type`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketOpenShop().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketOpenShop().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketOpenShop().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketOpenShop, t, n);
	}
};
exports.CPacketOpenShop = CPacketOpenShop;
class CPacketOpenWindow extends Message {
	constructor(CPacketOpenWindow) {
		super(), proto2.util.initPartial(CPacketOpenWindow, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketOpenWindow`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `guiID`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `title`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 4,
			name: `size`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketOpenWindow().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketOpenWindow().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketOpenWindow().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketOpenWindow, t, n);
	}
};
exports.CPacketOpenWindow = CPacketOpenWindow;
class CPacketParticles extends Message {
	constructor(CPacketParticles) {
		super(), this.particleArguments = [], proto2.util.initPartial(CPacketParticles, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketParticles`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `particleId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `longDistance`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 3,
			name: `x`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 4,
			name: `y`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `z`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 6,
			name: `xOffset`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 7,
			name: `yOffset`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 8,
			name: `zOffset`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 9,
			name: `speed`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 10,
			name: `count`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 11,
			name: `particleArguments`,
			kind: `scalar`,
			T: 5,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketParticles().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketParticles().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketParticles().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketParticles, t, n);
	}
};
exports.CPacketParticles = CPacketParticles;
class CPacketPlayerList extends Message {
	constructor(CPacketPlayerList) {
		super(), this.players = [], proto2.util.initPartial(CPacketPlayerList, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPlayerList`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `players`,
			kind: `message`,
			T: PlayerData,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPlayerList().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPlayerList().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPlayerList().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPlayerList, t, n);
	}
};
exports.CPacketPlayerList = CPacketPlayerList;
class PlayerData extends Message {
	constructor(PlayerData) {
		super(), proto2.util.initPartial(PlayerData, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PlayerData`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 9,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}, {
			no: 10,
			name: `permission_level`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `ping`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 4,
			name: `name`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `color`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `skin`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 6,
			name: `rank`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 7,
			name: `level`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 8,
			name: `verified`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 11,
			name: `vanished`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 12,
			name: `fake`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 13,
			name: `discord_boosting`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 14,
			name: `persistent`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PlayerData().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PlayerData().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PlayerData().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PlayerData, t, n);
	}
};
exports.PlayerData = PlayerData;
class CPacketPlayerPosLook extends Message {
	constructor(CPacketPlayerPosLook) {
		super(), proto2.util.initPartial(CPacketPlayerPosLook, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPlayerPosLook`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 2
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 2
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPlayerPosLook().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPlayerPosLook().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPlayerPosLook().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPlayerPosLook, t, n);
	}
};
exports.CPacketPlayerPosLook = CPacketPlayerPosLook;
class CPacketPlayerPosition extends Message {
	constructor(CPacketPlayerPosition) {
		super(), proto2.util.initPartial(CPacketPlayerPosition, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPlayerPosition`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPlayerPosition().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPlayerPosition().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPlayerPosition().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPlayerPosition, t, n);
	}
};
exports.CPacketPlayerPosition = CPacketPlayerPosition;
class CPacketPlayerReconciliation extends Message {
	constructor(CPacketPlayerReconciliation) {
		super(), proto2.util.initPartial(CPacketPlayerReconciliation, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPlayerReconciliation`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `y`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `z`,
			kind: `scalar`,
			T: 2
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 2
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 2
		}, {
			no: 6,
			name: `lastProcessedInput`,
			kind: `scalar`,
			T: 13
		}, {
			no: 7,
			name: `reset`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 8,
			name: `ackId`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 9,
			name: `onGround`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPlayerReconciliation().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPlayerReconciliation().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPlayerReconciliation().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPlayerReconciliation, t, n);
	}
};
exports.CPacketPlayerReconciliation = CPacketPlayerReconciliation;
class CPacketPong extends Message {
	constructor(CPacketPong) {
		super(), proto2.util.initPartial(CPacketPong, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPong`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `time`,
			kind: `scalar`,
			T: 4
		}, {
			no: 2,
			name: `mspt`,
			kind: `scalar`,
			T: 2
		}, {
			no: 4,
			name: `tick`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPong().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPong().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPong().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPong, t, n);
	}
};
exports.CPacketPong = CPacketPong;
class CPacketRespawn extends Message {
	constructor(CPacketRespawn) {
		super(), proto2.util.initPartial(CPacketRespawn, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketRespawn`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `notDeath`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 2,
			name: `client`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 3,
			name: `dimension`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketRespawn().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketRespawn().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketRespawn().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketRespawn, t, n);
	}
};
exports.CPacketRespawn = CPacketRespawn;
class CPacketScoreboard extends Message {
	constructor(CPacketScoreboard) {
		super(), this.content = [], proto2.util.initPartial(CPacketScoreboard, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketScoreboard`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `title`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `content`,
			kind: `message`,
			T: ScoreboardContent,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketScoreboard().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketScoreboard().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketScoreboard().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketScoreboard, t, n);
	}
};
exports.CPacketScoreboard = CPacketScoreboard;
class ScoreboardContent extends Message {
	constructor(ScoreboardContent) {
		super(), this.columns = [], proto2.util.initPartial(ScoreboardContent, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScoreboardContent`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `columns`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new ScoreboardContent().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScoreboardContent().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScoreboardContent().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScoreboardContent, t, n);
	}
};
exports.ScoreboardContent = ScoreboardContent;
class CPacketServerMetadata extends Message {
	constructor(CPacketServerMetadata) {
		super(), proto2.util.initPartial(CPacketServerMetadata, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketServerMetadata`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 12,
			name: `metadata`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketServerMetadata().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketServerMetadata().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketServerMetadata().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketServerMetadata, t, n);
	}
};
exports.CPacketServerMetadata = CPacketServerMetadata;
class CPacketSetSlot extends Message {
	constructor(CPacketSetSlot) {
		super(), proto2.util.initPartial(CPacketSetSlot, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSetSlot`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `window_id`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `slot`,
			kind: `scalar`,
			T: 5
		}, {
			no: 3,
			name: `slot_data`,
			kind: `message`,
			T: PBItemStack
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSetSlot().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSetSlot().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSetSlot().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSetSlot, t, n);
	}
};
exports.CPacketSetSlot = CPacketSetSlot;
class CPacketSignEditorOpen extends Message {
	constructor(CPacketSignEditorOpen) {
		super(), proto2.util.initPartial(CPacketSignEditorOpen, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSignEditorOpen`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `signPosition`,
			kind: `message`,
			T: PBBlockPos
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSignEditorOpen().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSignEditorOpen().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSignEditorOpen().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSignEditorOpen, t, n);
	}
};
exports.CPacketSignEditorOpen = CPacketSignEditorOpen;
class CPacketSoundEffect extends Message {
	constructor(CPacketSoundEffect) {
		super(), proto2.util.initPartial(CPacketSoundEffect, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSoundEffect`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `sound`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `location`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 3,
			name: `volume`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 4,
			name: `pitch`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSoundEffect().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSoundEffect().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSoundEffect().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSoundEffect, t, n);
	}
};
exports.CPacketSoundEffect = CPacketSoundEffect;
class CPacketSpawnEntity extends Message {
	constructor(CPacketSpawnEntity) {
		super(), proto2.util.initPartial(CPacketSpawnEntity, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSpawnEntity`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `type`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `pos`,
			kind: `message`,
			T: PBVector3,
			opt: !0
		}, {
			no: 4,
			name: `yaw`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `pitch`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 6,
			name: `motion`,
			kind: `message`,
			T: PBFloatVector3,
			opt: !0
		}, {
			no: 7,
			name: `item`,
			kind: `message`,
			T: PBItemStack,
			opt: !0
		}, {
			no: 8,
			name: `shooterId`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 9,
			name: `state`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 10,
			name: `texture`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 11,
			name: `facing`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSpawnEntity().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSpawnEntity().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSpawnEntity().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSpawnEntity, t, n);
	}
};
exports.CPacketSpawnEntity = CPacketSpawnEntity;
class CPacketSpawnExperienceOrb extends Message {
	constructor(CPacketSpawnExperienceOrb) {
		super(), proto2.util.initPartial(CPacketSpawnExperienceOrb, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSpawnExperienceOrb`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `x`,
			kind: `scalar`,
			T: 17
		}, {
			no: 3,
			name: `y`,
			kind: `scalar`,
			T: 17
		}, {
			no: 4,
			name: `z`,
			kind: `scalar`,
			T: 17
		}, {
			no: 5,
			name: `xpValue`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSpawnExperienceOrb().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSpawnExperienceOrb().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSpawnExperienceOrb().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSpawnExperienceOrb, t, n);
	}
};
exports.CPacketSpawnExperienceOrb = CPacketSpawnExperienceOrb;
class CPacketSpawnPlayer extends Message {
	constructor(CPacketSpawnPlayer) {
		super(), proto2.util.initPartial(CPacketSpawnPlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSpawnPlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `name`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `gamemode`,
			kind: `scalar`,
			T: 9
		}, {
			no: 4,
			name: `operator`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 5,
			name: `pos`,
			kind: `message`,
			T: PBFloatVector3
		}, {
			no: 6,
			name: `yaw`,
			kind: `scalar`,
			T: 2
		}, {
			no: 7,
			name: `pitch`,
			kind: `scalar`,
			T: 2
		}, {
			no: 8,
			name: `cosmetics`,
			kind: `message`,
			T: PBCosmetics
		}, {
			no: 9,
			name: `rank`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 10,
			name: `socketId`,
			kind: `scalar`,
			T: 9
		}, {
			no: 11,
			name: `discord_boosting`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSpawnPlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSpawnPlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSpawnPlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSpawnPlayer, t, n);
	}
};
exports.CPacketSpawnPlayer = CPacketSpawnPlayer;
class CPacketTabComplete extends Message {
	constructor(CPacketTabComplete) {
		super(), this.matches = [], proto2.util.initPartial(CPacketTabComplete, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketTabComplete`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `matches`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketTabComplete().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketTabComplete().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketTabComplete().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketTabComplete, t, n);
	}
};
exports.CPacketTabComplete = CPacketTabComplete;
class CPacketTitle extends Message {
	constructor(CPacketTitle) {
		super(), proto2.util.initPartial(CPacketTitle, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketTitle`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `title`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `duration`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketTitle().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketTitle().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketTitle().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketTitle, t, n);
	}
};
exports.CPacketTitle = CPacketTitle;
class CPacketUpdateHealth extends Message {
	constructor(CPacketUpdateHealth) {
		super(), proto2.util.initPartial(CPacketUpdateHealth, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateHealth`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `hp`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 3,
			name: `food`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}, {
			no: 4,
			name: `foodSaturation`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}, {
			no: 5,
			name: `oxygen`,
			kind: `scalar`,
			T: 2,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateHealth().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateHealth().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateHealth().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateHealth, t, n);
	}
};
exports.CPacketUpdateHealth = CPacketUpdateHealth;
class CPacketUpdateLeaderboard extends Message {
	constructor(CPacketUpdateLeaderboard) {
		super(), this.content = [], proto2.util.initPartial(CPacketUpdateLeaderboard, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateLeaderboard`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 5,
			name: `content`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateLeaderboard().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateLeaderboard().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateLeaderboard().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateLeaderboard, t, n);
	}
};
exports.CPacketUpdateLeaderboard = CPacketUpdateLeaderboard;
class CPacketUpdateScoreboard extends Message {
	constructor(CPacketUpdateScoreboard) {
		super(), this.columns = [], proto2.util.initPartial(CPacketUpdateScoreboard, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateScoreboard`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `index`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `columns`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateScoreboard().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateScoreboard().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateScoreboard().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateScoreboard, t, n);
	}
};
exports.CPacketUpdateScoreboard = CPacketUpdateScoreboard;
class CPacketUpdateStatus extends Message {
	constructor(CPacketUpdateStatus) {
		super(), proto2.util.initPartial(CPacketUpdateStatus, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdateStatus`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `mode`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 4,
			name: `rank`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `color`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 6,
			name: `hidePlayers`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 7,
			name: `onTeam`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdateStatus().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdateStatus().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdateStatus().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdateStatus, t, n);
	}
};
exports.CPacketUpdateStatus = CPacketUpdateStatus;
class CPacketUpdate extends Message {
	constructor(CPacketUpdate) {
		super(), proto2.util.initPartial(CPacketUpdate, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUpdate`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 4,
			name: `tick`,
			kind: `scalar`,
			T: 13
		}, {
			no: 5,
			name: `t`,
			kind: `scalar`,
			T: 4
		}, {
			no: 6,
			name: `mspt`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUpdate().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUpdate().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUpdate().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUpdate, t, n);
	}
};
exports.CPacketUpdate = CPacketUpdate;
class CPacketWindowItems extends Message {
	constructor(CPacketWindowItems) {
		super(), this.items = [], proto2.util.initPartial(CPacketWindowItems, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketWindowItems`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `window_id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `items`,
			kind: `message`,
			T: PBItemStack,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketWindowItems().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketWindowItems().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketWindowItems().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketWindowItems, t, n);
	}
};
exports.CPacketWindowItems = CPacketWindowItems;
class CPacketWindowProperty extends Message {
	constructor(CPacketWindowProperty) {
		super(), proto2.util.initPartial(CPacketWindowProperty, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketWindowProperty`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `varIndex`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `varValue`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketWindowProperty().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketWindowProperty().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketWindowProperty().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketWindowProperty, t, n);
	}
};
exports.CPacketWindowProperty = CPacketWindowProperty;
class SPacketRespawn$1 extends Message {
	constructor(SPacketRespawn$1) {
		super(), proto2.util.initPartial(SPacketRespawn$1, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketRespawn`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new SPacketRespawn$1().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketRespawn$1().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketRespawn$1().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketRespawn$1, t, n);
	}
};
exports.SPacketRespawn$1 = SPacketRespawn$1;
class SPacketTabComplete extends Message {
	constructor(SPacketTabComplete) {
		super(), proto2.util.initPartial(SPacketTabComplete, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketTabComplete`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `message`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketTabComplete().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketTabComplete().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketTabComplete().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketTabComplete, t, n);
	}
};
exports.SPacketTabComplete = SPacketTabComplete;
class SPacketCraftItem extends Message {
	constructor(SPacketCraftItem) {
		super(), proto2.util.initPartial(SPacketCraftItem, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketCraftItem`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `data`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketCraftItem().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketCraftItem().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketCraftItem().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketCraftItem, t, n);
	}
};
exports.SPacketCraftItem = SPacketCraftItem;
class SPacketRequestChunk extends Message {
	constructor(SPacketRequestChunk) {
		super(), proto2.util.initPartial(SPacketRequestChunk, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketRequestChunk`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `x`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `z`,
			kind: `scalar`,
			T: 5
		}, {
			no: 3,
			name: `cachedHash`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketRequestChunk().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketRequestChunk().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketRequestChunk().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketRequestChunk, t, n);
	}
};
exports.SPacketRequestChunk = SPacketRequestChunk;
class SPacketAdminAction extends Message {
	constructor(SPacketAdminAction) {
		super(), this.action = {
			case: void 0
		}, proto2.util.initPartial(SPacketAdminAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketAdminAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `kick_player`,
			kind: `message`,
			T: KickPlayer,
			oneof: `action`
		}, {
			no: 2,
			name: `ban_player`,
			kind: `message`,
			T: BanPlayer,
			oneof: `action`
		}, {
			no: 9,
			name: `unban_player`,
			kind: `message`,
			T: UnbanPlayer,
			oneof: `action`
		}, {
			no: 3,
			name: `stop_server`,
			kind: `message`,
			T: StopServer,
			oneof: `action`
		}, {
			no: 4,
			name: `promote_player`,
			kind: `message`,
			T: PromotePlayer,
			oneof: `action`
		}, {
			no: 5,
			name: `demote_player`,
			kind: `message`,
			T: DemotePlayer,
			oneof: `action`
		}, {
			no: 6,
			name: `update_access_control`,
			kind: `message`,
			T: UpdateAccessControl,
			oneof: `action`
		}, {
			no: 7,
			name: `update_cheats`,
			kind: `message`,
			T: UpdateCheats,
			oneof: `action`
		}, {
			no: 8,
			name: `update_pvp`,
			kind: `message`,
			T: UpdatePvP,
			oneof: `action`
		}, {
			no: 10,
			name: `update_command_block`,
			kind: `message`,
			T: UpdateCommandBlock,
			oneof: `action`
		}, {
			no: 11,
			name: `update_scripting`,
			kind: `message`,
			T: UpdateScripting,
			oneof: `action`
		}, {
			no: 12,
			name: `restart_server`,
			kind: `message`,
			T: RestartServer,
			oneof: `action`
		}, {
			no: 13,
			name: `update_world_config`,
			kind: `message`,
			T: UpdateWorldConfig,
			oneof: `action`
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketAdminAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketAdminAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketAdminAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketAdminAction, t, n);
	}
};
exports.SPacketAdminAction = SPacketAdminAction;
class KickPlayer extends Message {
	constructor(KickPlayer) {
		super(), proto2.util.initPartial(KickPlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `KickPlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new KickPlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new KickPlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new KickPlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(KickPlayer, t, n);
	}
};
exports.KickPlayer = KickPlayer;
class BanPlayer extends Message {
	constructor(BanPlayer) {
		super(), proto2.util.initPartial(BanPlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `BanPlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new BanPlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new BanPlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new BanPlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(BanPlayer, t, n);
	}
};
exports.BanPlayer = BanPlayer;
class UnbanPlayer extends Message {
	constructor(UnbanPlayer) {
		super(), proto2.util.initPartial(UnbanPlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UnbanPlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new UnbanPlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UnbanPlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UnbanPlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UnbanPlayer, t, n);
	}
};
exports.UnbanPlayer = UnbanPlayer;
class StopServer extends Message {
	constructor(StopServer) {
		super(), proto2.util.initPartial(StopServer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `StopServer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new StopServer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new StopServer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new StopServer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(StopServer, t, n);
	}
};
exports.StopServer = StopServer;
class RestartServer extends Message {
	constructor(RestartServer) {
		super(), proto2.util.initPartial(RestartServer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `RestartServer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new RestartServer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new RestartServer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new RestartServer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(RestartServer, t, n);
	}
};
exports.RestartServer = RestartServer;
class PromotePlayer extends Message {
	constructor(PromotePlayer) {
		super(), proto2.util.initPartial(PromotePlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PromotePlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new PromotePlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PromotePlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PromotePlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PromotePlayer, t, n);
	}
};
exports.PromotePlayer = PromotePlayer;
class DemotePlayer extends Message {
	constructor(DemotePlayer) {
		super(), proto2.util.initPartial(DemotePlayer, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `DemotePlayer`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `uuid`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new DemotePlayer().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new DemotePlayer().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new DemotePlayer().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(DemotePlayer, t, n);
	}
};
exports.DemotePlayer = DemotePlayer;
class UpdateAccessControl extends Message {
	constructor(UpdateAccessControl) {
		super(), proto2.util.initPartial(UpdateAccessControl, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdateAccessControl`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `accessControl`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new UpdateAccessControl().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdateAccessControl().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdateAccessControl().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdateAccessControl, t, n);
	}
};
exports.UpdateAccessControl = UpdateAccessControl;
class UpdateCheats extends Message {
	constructor(UpdateCheats) {
		super(), proto2.util.initPartial(UpdateCheats, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdateCheats`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `cheats`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new UpdateCheats().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdateCheats().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdateCheats().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdateCheats, t, n);
	}
};
exports.UpdateCheats = UpdateCheats;
class UpdatePvP extends Message {
	constructor(UpdatePvP) {
		super(), proto2.util.initPartial(UpdatePvP, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdatePvP`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `enabled`,
			kind: `scalar`,
			T: 8
		}]);
	}
	static fromBinary(t, n) {
		return new UpdatePvP().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdatePvP().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdatePvP().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdatePvP, t, n);
	}
};
exports.UpdatePvP = UpdatePvP;
class UpdateCommandBlock extends Message {
	constructor(UpdateCommandBlock) {
		super(), proto2.util.initPartial(UpdateCommandBlock, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdateCommandBlock`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `enabled`,
			kind: `scalar`,
			T: 8
		}]);
	}
	static fromBinary(t, n) {
		return new UpdateCommandBlock().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdateCommandBlock().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdateCommandBlock().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdateCommandBlock, t, n);
	}
};
exports.UpdateCommandBlock = UpdateCommandBlock;
class UpdateScripting extends Message {
	constructor(UpdateScripting) {
		super(), proto2.util.initPartial(UpdateScripting, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdateScripting`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `permission`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new UpdateScripting().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdateScripting().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdateScripting().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdateScripting, t, n);
	}
};
exports.UpdateScripting = UpdateScripting;
class UpdateWorldConfig extends Message {
	constructor(UpdateWorldConfig) {
		super(), proto2.util.initPartial(UpdateWorldConfig, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `UpdateWorldConfig`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `difficulty`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 2,
			name: `enable_redstone`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 3,
			name: `save_player_data`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 4,
			name: `do_daylight_cycle`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 5,
			name: `start_time`,
			kind: `scalar`,
			T: 4,
			opt: !0
		}, {
			no: 6,
			name: `always_stay_on`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 7,
			name: `allow_guest_chat`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new UpdateWorldConfig().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new UpdateWorldConfig().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new UpdateWorldConfig().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(UpdateWorldConfig, t, n);
	}
};
exports.UpdateWorldConfig = UpdateWorldConfig;
class SPacketAnalytics extends Message {
	constructor(SPacketAnalytics) {
		super(), proto2.util.initPartial(SPacketAnalytics, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketAnalytics`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `fps`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `ping`,
			kind: `scalar`,
			T: 2
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketAnalytics().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketAnalytics().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketAnalytics().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketAnalytics, t, n);
	}
};
exports.SPacketAnalytics = SPacketAnalytics;
class SPacketConfirmTransaction extends Message {
	constructor(SPacketConfirmTransaction) {
		super(), proto2.util.initPartial(SPacketConfirmTransaction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketConfirmTransaction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `actionNumber`,
			kind: `scalar`,
			T: 5
		}, {
			no: 3,
			name: `accepted`,
			kind: `scalar`,
			T: 8
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketConfirmTransaction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketConfirmTransaction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketConfirmTransaction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketConfirmTransaction, t, n);
	}
};
exports.SPacketConfirmTransaction = SPacketConfirmTransaction;
class SPacketHeldItemChange extends Message {
	constructor(SPacketHeldItemChange) {
		super(), proto2.util.initPartial(SPacketHeldItemChange, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketHeldItemChange`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `slot`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketHeldItemChange().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketHeldItemChange().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketHeldItemChange().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketHeldItemChange, t, n);
	}
};
exports.SPacketHeldItemChange = SPacketHeldItemChange;
class SPacketPing extends Message {
	constructor(SPacketPing) {
		super(), proto2.util.initPartial(SPacketPing, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPing`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `time`,
			kind: `scalar`,
			T: 4
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPing().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPing().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPing().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPing, t, n);
	}
};
exports.SPacketPing = SPacketPing;
class SPacketPlayerInput extends Message {
	constructor(SPacketPlayerInput) {
		super(), proto2.util.initPartial(SPacketPlayerInput, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlayerInput`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `sequenceNumber`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `left`,
			kind: `scalar`,
			T: 8
		}, {
			no: 3,
			name: `right`,
			kind: `scalar`,
			T: 8
		}, {
			no: 4,
			name: `up`,
			kind: `scalar`,
			T: 8
		}, {
			no: 5,
			name: `down`,
			kind: `scalar`,
			T: 8
		}, {
			no: 6,
			name: `yaw`,
			kind: `scalar`,
			T: 2
		}, {
			no: 7,
			name: `pitch`,
			kind: `scalar`,
			T: 2
		}, {
			no: 8,
			name: `jump`,
			kind: `scalar`,
			T: 8
		}, {
			no: 9,
			name: `sneak`,
			kind: `scalar`,
			T: 8
		}, {
			no: 10,
			name: `sprint`,
			kind: `scalar`,
			T: 8
		}, {
			no: 11,
			name: `pos`,
			kind: `message`,
			T: PBFloatVector3
		}, {
			no: 12,
			name: `ackId`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 13,
			name: `onGround`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 14,
			name: `usingItem`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlayerInput().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlayerInput().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlayerInput().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlayerInput, t, n);
	}
};
exports.SPacketPlayerInput = SPacketPlayerInput;
class SPacketUpdateSign extends Message {
	constructor(SPacketUpdateSign) {
		super(), this.lines = [], proto2.util.initPartial(SPacketUpdateSign, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUpdateSign`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `lines`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketUpdateSign().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUpdateSign().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUpdateSign().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUpdateSign, t, n);
	}
};
exports.SPacketUpdateSign = SPacketUpdateSign;
class CPacketEntityEffect extends Message {
	constructor(CPacketEntityEffect) {
		super(), proto2.util.initPartial(CPacketEntityEffect, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityEffect`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `effectId`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `amplifier`,
			kind: `scalar`,
			T: 13
		}, {
			no: 4,
			name: `duration`,
			kind: `scalar`,
			T: 13
		}, {
			no: 5,
			name: `hideParticles`,
			kind: `scalar`,
			T: 8
		}, {
			no: 6,
			name: `color`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityEffect().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityEffect().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityEffect().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityEffect, t, n);
	}
};
exports.CPacketEntityEffect = CPacketEntityEffect;
class CPacketEntityProperties extends Message {
	constructor(CPacketEntityProperties) {
		super(), this.data = [], proto2.util.initPartial(CPacketEntityProperties, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketEntityProperties`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `data`,
			kind: `message`,
			T: PBSnapshot,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketEntityProperties().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketEntityProperties().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketEntityProperties().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketEntityProperties, t, n);
	}
};
exports.CPacketEntityProperties = CPacketEntityProperties;
class PBSnapshot extends Message {
	constructor(PBSnapshot) {
		super(), this.modifiers = [], proto2.util.initPartial(PBSnapshot, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBSnapshot`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `value`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `modifiers`,
			kind: `message`,
			T: PBModifier,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBSnapshot().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBSnapshot().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBSnapshot().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBSnapshot, t, n);
	}
};
exports.PBSnapshot = PBSnapshot;
class PBModifier extends Message {
	constructor(PBModifier) {
		super(), proto2.util.initPartial(PBModifier, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBModifier`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `amount`,
			kind: `scalar`,
			T: 2
		}, {
			no: 3,
			name: `operation`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new PBModifier().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBModifier().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBModifier().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBModifier, t, n);
	}
};
exports.PBModifier = PBModifier;
class CPacketQueueNext extends Message {
	constructor(CPacketQueueNext) {
		super(), proto2.util.initPartial(CPacketQueueNext, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketQueueNext`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `minigameId`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `minigameConfig`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketQueueNext().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketQueueNext().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketQueueNext().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketQueueNext, t, n);
	}
};
exports.CPacketQueueNext = CPacketQueueNext;
class CPacketRemoveEntityEffect extends Message {
	constructor(CPacketRemoveEntityEffect) {
		super(), proto2.util.initPartial(CPacketRemoveEntityEffect, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketRemoveEntityEffect`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `effectId`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketRemoveEntityEffect().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketRemoveEntityEffect().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketRemoveEntityEffect().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketRemoveEntityEffect, t, n);
	}
};
exports.CPacketRemoveEntityEffect = CPacketRemoveEntityEffect;
class CPacketSetExperience extends Message {
	constructor(CPacketSetExperience) {
		super(), proto2.util.initPartial(CPacketSetExperience, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketSetExperience`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `experience`,
			kind: `scalar`,
			T: 2
		}, {
			no: 2,
			name: `experienceTotal`,
			kind: `scalar`,
			T: 5
		}, {
			no: 3,
			name: `level`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketSetExperience().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketSetExperience().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketSetExperience().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketSetExperience, t, n);
	}
};
exports.CPacketSetExperience = CPacketSetExperience;
class CPacketShopProperty extends Message {
	constructor(CPacketShopProperty) {
		super(), proto2.util.initPartial(CPacketShopProperty, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketShopProperty`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `name`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 2,
			name: `value`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketShopProperty().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketShopProperty().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketShopProperty().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketShopProperty, t, n);
	}
};
exports.CPacketShopProperty = CPacketShopProperty;
class CPacketShopProperties extends Message {
	constructor(CPacketShopProperties) {
		super(), this.properties = [], proto2.util.initPartial(CPacketShopProperties, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketShopProperties`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `properties`,
			kind: `message`,
			T: CPacketShopProperty,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketShopProperties().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketShopProperties().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketShopProperties().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketShopProperties, t, n);
	}
};
exports.CPacketShopProperties = CPacketShopProperties;
class CPacketUseBed extends Message {
	constructor(CPacketUseBed) {
		super(), proto2.util.initPartial(CPacketUseBed, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketUseBed`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `id`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `bedPos`,
			kind: `message`,
			T: PBBlockPos
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketUseBed().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketUseBed().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketUseBed().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketUseBed, t, n);
	}
};
exports.CPacketUseBed = CPacketUseBed;
class CPacketTimeUpdate extends Message {
	constructor(CPacketTimeUpdate) {
		super(), proto2.util.initPartial(CPacketTimeUpdate, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketTimeUpdate`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `totalTime`,
			kind: `scalar`,
			T: 13
		}, {
			no: 2,
			name: `worldTime`,
			kind: `scalar`,
			T: 13
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketTimeUpdate().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketTimeUpdate().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketTimeUpdate().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketTimeUpdate, t, n);
	}
};
exports.CPacketTimeUpdate = CPacketTimeUpdate;
class CPacketScriptData extends Message {
	constructor(CPacketScriptData) {
		super(), this.scripts = [], proto2.util.initPartial(CPacketScriptData, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketScriptData`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `enabled`,
			kind: `scalar`,
			T: 8
		}, {
			no: 2,
			name: `disabled_reason`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `scripts`,
			kind: `message`,
			T: PBScriptEntry,
			repeated: !0
		}, {
			no: 4,
			name: `read_only`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}, {
			no: 5,
			name: `max_total_source_bytes`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}, {
			no: 6,
			name: `max_scripts`,
			kind: `scalar`,
			T: 13,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketScriptData().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketScriptData().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketScriptData().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketScriptData, t, n);
	}
};
exports.CPacketScriptData = CPacketScriptData;
class PBScriptEntry extends Message {
	constructor(PBScriptEntry) {
		super(), proto2.util.initPartial(PBScriptEntry, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBScriptEntry`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `name`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `source`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `updated_at`,
			kind: `scalar`,
			T: 4,
			opt: !0
		}, {
			no: 4,
			name: `updated_by`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 5,
			name: `load_error`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBScriptEntry().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBScriptEntry().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBScriptEntry().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBScriptEntry, t, n);
	}
};
exports.PBScriptEntry = PBScriptEntry;
class CPacketScriptLog extends Message {
	constructor(CPacketScriptLog) {
		super(), this.entries = [], proto2.util.initPartial(CPacketScriptLog, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketScriptLog`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `entries`,
			kind: `message`,
			T: PBScriptLogEntry,
			repeated: !0
		}, {
			no: 2,
			name: `clear`,
			kind: `scalar`,
			T: 8,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketScriptLog().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketScriptLog().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketScriptLog().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketScriptLog, t, n);
	}
};
exports.CPacketScriptLog = CPacketScriptLog;
class PBScriptLogEntry extends Message {
	constructor(PBScriptLogEntry) {
		super(), proto2.util.initPartial(PBScriptLogEntry, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `PBScriptLogEntry`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `level`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `message`,
			kind: `scalar`,
			T: 9
		}, {
			no: 3,
			name: `stack`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 4,
			name: `tick`,
			kind: `scalar`,
			T: 4,
			opt: !0
		}, {
			no: 5,
			name: `timestamp`,
			kind: `scalar`,
			T: 4,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new PBScriptLogEntry().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new PBScriptLogEntry().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new PBScriptLogEntry().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(PBScriptLogEntry, t, n);
	}
};
exports.PBScriptLogEntry = PBScriptLogEntry;
class CPacketPlotsData extends Message {
	constructor(CPacketPlotsData) {
		super(), proto2.util.initPartial(CPacketPlotsData, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketPlotsData`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `json`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketPlotsData().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketPlotsData().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketPlotsData().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketPlotsData, t, n);
	}
};
exports.CPacketPlotsData = CPacketPlotsData;
class CPacketGuideData extends Message {
	constructor(CPacketGuideData) {
		super(), proto2.util.initPartial(CPacketGuideData, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketGuideData`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `json`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketGuideData().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketGuideData().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketGuideData().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketGuideData, t, n);
	}
};
exports.CPacketGuideData = CPacketGuideData;
class CPacketBlockBreakAnim extends Message {
	constructor(CPacketBlockBreakAnim) {
		super(), proto2.util.initPartial(CPacketBlockBreakAnim, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `CPacketBlockBreakAnim`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `location`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `breakerId`,
			kind: `scalar`,
			T: 13
		}, {
			no: 3,
			name: `stage`,
			kind: `scalar`,
			T: 17
		}]);
	}
	static fromBinary(t, n) {
		return new CPacketBlockBreakAnim().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new CPacketBlockBreakAnim().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new CPacketBlockBreakAnim().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(CPacketBlockBreakAnim, t, n);
	}
};
exports.CPacketBlockBreakAnim = CPacketBlockBreakAnim;
class ClientBoundCombined extends Message {
	constructor(ClientBoundCombined) {
		super(), this.packets = [], proto2.util.initPartial(ClientBoundCombined, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ClientBoundCombined`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `packets`,
			kind: `message`,
			T: ClientBoundCombined_CPacket,
			repeated: !0
		}]);
	}
	static fromBinary(t, n) {
		return new ClientBoundCombined().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ClientBoundCombined().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ClientBoundCombined().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ClientBoundCombined, t, n);
	}
};
exports.ClientBoundCombined = ClientBoundCombined;
class ClientBoundCombined_CPacket extends Message {
	constructor(ClientBoundCombined_CPacket) {
		super(), this.packet = {
			case: void 0
		}, proto2.util.initPartial(ClientBoundCombined_CPacket, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ClientBoundCombined.CPacket`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `CPacketAnimation`,
			kind: `message`,
			T: CPacketAnimation,
			oneof: `packet`
		}, {
			no: 2,
			name: `CPacketBlockAction`,
			kind: `message`,
			T: CPacketBlockAction,
			oneof: `packet`
		}, {
			no: 3,
			name: `CPacketBlockUpdate`,
			kind: `message`,
			T: CPacketBlockUpdate,
			oneof: `packet`
		}, {
			no: 4,
			name: `CPacketChangeServers`,
			kind: `message`,
			T: CPacketChangeServers,
			oneof: `packet`
		}, {
			no: 5,
			name: `CPacketChunkData`,
			kind: `message`,
			T: CPacketChunkData,
			oneof: `packet`
		}, {
			no: 6,
			name: `CPacketCloseWindow`,
			kind: `message`,
			T: CPacketCloseWindow,
			oneof: `packet`
		}, {
			no: 7,
			name: `CPacketConfirmTransaction`,
			kind: `message`,
			T: CPacketConfirmTransaction,
			oneof: `packet`
		}, {
			no: 8,
			name: `CPacketDestroyEntities`,
			kind: `message`,
			T: CPacketDestroyEntities,
			oneof: `packet`
		}, {
			no: 9,
			name: `CPacketDisconnect`,
			kind: `message`,
			T: CPacketDisconnect,
			oneof: `packet`
		}, {
			no: 10,
			name: `CPacketEntityAction`,
			kind: `message`,
			T: CPacketEntityAction,
			oneof: `packet`
		}, {
			no: 11,
			name: `CPacketEntityEffect`,
			kind: `message`,
			T: CPacketEntityEffect,
			oneof: `packet`
		}, {
			no: 12,
			name: `CPacketEntityEquipment`,
			kind: `message`,
			T: CPacketEntityEquipment,
			oneof: `packet`
		}, {
			no: 13,
			name: `CPacketEntityMetadata`,
			kind: `message`,
			T: CPacketEntityMetadata,
			oneof: `packet`
		}, {
			no: 14,
			name: `CPacketEntityPositionAndRotation`,
			kind: `message`,
			T: CPacketEntityPositionAndRotation,
			oneof: `packet`
		}, {
			no: 15,
			name: `CPacketEntityProperties`,
			kind: `message`,
			T: CPacketEntityProperties,
			oneof: `packet`
		}, {
			no: 16,
			name: `CPacketEntityRelativePositionAndRotation`,
			kind: `message`,
			T: CPacketEntityRelativePositionAndRotation,
			oneof: `packet`
		}, {
			no: 17,
			name: `CPacketEntityStatus`,
			kind: `message`,
			T: CPacketEntityStatus,
			oneof: `packet`
		}, {
			no: 18,
			name: `CPacketEntityVelocity`,
			kind: `message`,
			T: CPacketEntityVelocity,
			oneof: `packet`
		}, {
			no: 19,
			name: `CPacketExplosion`,
			kind: `message`,
			T: CPacketExplosion,
			oneof: `packet`
		}, {
			no: 20,
			name: `CPacketJoinGame`,
			kind: `message`,
			T: CPacketJoinGame,
			oneof: `packet`
		}, {
			no: 21,
			name: `CPacketLeaderboard`,
			kind: `message`,
			T: CPacketLeaderboard,
			oneof: `packet`
		}, {
			no: 22,
			name: `CPacketLocalStorage`,
			kind: `message`,
			T: CPacketLocalStorage,
			oneof: `packet`
		}, {
			no: 23,
			name: `CPacketMessage`,
			kind: `message`,
			T: CPacketMessage,
			oneof: `packet`
		}, {
			no: 24,
			name: `CPacketOpenShop`,
			kind: `message`,
			T: CPacketOpenShop,
			oneof: `packet`
		}, {
			no: 25,
			name: `CPacketOpenWindow`,
			kind: `message`,
			T: CPacketOpenWindow,
			oneof: `packet`
		}, {
			no: 26,
			name: `CPacketParticles`,
			kind: `message`,
			T: CPacketParticles,
			oneof: `packet`
		}, {
			no: 27,
			name: `CPacketPlayerList`,
			kind: `message`,
			T: CPacketPlayerList,
			oneof: `packet`
		}, {
			no: 28,
			name: `CPacketPlayerPosLook`,
			kind: `message`,
			T: CPacketPlayerPosLook,
			oneof: `packet`
		}, {
			no: 29,
			name: `CPacketPlayerPosition`,
			kind: `message`,
			T: CPacketPlayerPosition,
			oneof: `packet`
		}, {
			no: 30,
			name: `CPacketPong`,
			kind: `message`,
			T: CPacketPong,
			oneof: `packet`
		}, {
			no: 31,
			name: `CPacketQueueNext`,
			kind: `message`,
			T: CPacketQueueNext,
			oneof: `packet`
		}, {
			no: 32,
			name: `CPacketRemoveEntityEffect`,
			kind: `message`,
			T: CPacketRemoveEntityEffect,
			oneof: `packet`
		}, {
			no: 33,
			name: `CPacketRespawn`,
			kind: `message`,
			T: CPacketRespawn,
			oneof: `packet`
		}, {
			no: 34,
			name: `CPacketScoreboard`,
			kind: `message`,
			T: CPacketScoreboard,
			oneof: `packet`
		}, {
			no: 35,
			name: `CPacketServerInfo`,
			kind: `message`,
			T: CPacketServerInfo,
			oneof: `packet`
		}, {
			no: 36,
			name: `CPacketSetExperience`,
			kind: `message`,
			T: CPacketSetExperience,
			oneof: `packet`
		}, {
			no: 37,
			name: `CPacketSetSlot`,
			kind: `message`,
			T: CPacketSetSlot,
			oneof: `packet`
		}, {
			no: 38,
			name: `CPacketShopProperties`,
			kind: `message`,
			T: CPacketShopProperties,
			oneof: `packet`
		}, {
			no: 39,
			name: `CPacketSignEditorOpen`,
			kind: `message`,
			T: CPacketSignEditorOpen,
			oneof: `packet`
		}, {
			no: 40,
			name: `CPacketSoundEffect`,
			kind: `message`,
			T: CPacketSoundEffect,
			oneof: `packet`
		}, {
			no: 41,
			name: `CPacketSpawnEntity`,
			kind: `message`,
			T: CPacketSpawnEntity,
			oneof: `packet`
		}, {
			no: 42,
			name: `CPacketSpawnExperienceOrb`,
			kind: `message`,
			T: CPacketSpawnExperienceOrb,
			oneof: `packet`
		}, {
			no: 43,
			name: `CPacketSpawnPlayer`,
			kind: `message`,
			T: CPacketSpawnPlayer,
			oneof: `packet`
		}, {
			no: 44,
			name: `CPacketTabComplete`,
			kind: `message`,
			T: CPacketTabComplete,
			oneof: `packet`
		}, {
			no: 45,
			name: `CPacketTitle`,
			kind: `message`,
			T: CPacketTitle,
			oneof: `packet`
		}, {
			no: 46,
			name: `CPacketUpdateCommandBlock`,
			kind: `message`,
			T: CPacketUpdateCommandBlock,
			oneof: `packet`
		}, {
			no: 47,
			name: `CPacketUpdateHealth`,
			kind: `message`,
			T: CPacketUpdateHealth,
			oneof: `packet`
		}, {
			no: 48,
			name: `CPacketUpdateLeaderboard`,
			kind: `message`,
			T: CPacketUpdateLeaderboard,
			oneof: `packet`
		}, {
			no: 49,
			name: `CPacketUpdateScoreboard`,
			kind: `message`,
			T: CPacketUpdateScoreboard,
			oneof: `packet`
		}, {
			no: 50,
			name: `CPacketUpdateSign`,
			kind: `message`,
			T: CPacketUpdateSign,
			oneof: `packet`
		}, {
			no: 51,
			name: `CPacketUpdateStatus`,
			kind: `message`,
			T: CPacketUpdateStatus,
			oneof: `packet`
		}, {
			no: 52,
			name: `CPacketUseBed`,
			kind: `message`,
			T: CPacketUseBed,
			oneof: `packet`
		}, {
			no: 53,
			name: `CPacketWindowItems`,
			kind: `message`,
			T: CPacketWindowItems,
			oneof: `packet`
		}, {
			no: 54,
			name: `CPacketWindowProperty`,
			kind: `message`,
			T: CPacketWindowProperty,
			oneof: `packet`
		}, {
			no: 55,
			name: `CPacketEntityAttach`,
			kind: `message`,
			T: CPacketEntityAttach,
			oneof: `packet`
		}, {
			no: 56,
			name: `CPacketServerMetadata`,
			kind: `message`,
			T: CPacketServerMetadata,
			oneof: `packet`
		}, {
			no: 57,
			name: `CPacketTimeUpdate`,
			kind: `message`,
			T: CPacketTimeUpdate,
			oneof: `packet`
		}, {
			no: 58,
			name: `CPacketPlayerReconciliation`,
			kind: `message`,
			T: CPacketPlayerReconciliation,
			oneof: `packet`
		}, {
			no: 59,
			name: `CPacketScriptData`,
			kind: `message`,
			T: CPacketScriptData,
			oneof: `packet`
		}, {
			no: 60,
			name: `CPacketScriptLog`,
			kind: `message`,
			T: CPacketScriptLog,
			oneof: `packet`
		}, {
			no: 61,
			name: `CPacketPlotsData`,
			kind: `message`,
			T: CPacketPlotsData,
			oneof: `packet`
		}, {
			no: 62,
			name: `CPacketUpdatePlayerHead`,
			kind: `message`,
			T: CPacketUpdatePlayerHead,
			oneof: `packet`
		}, {
			no: 63,
			name: `CPacketChunkUnchanged`,
			kind: `message`,
			T: CPacketChunkUnchanged,
			oneof: `packet`
		}, {
			no: 64,
			name: `CPacketGuideData`,
			kind: `message`,
			T: CPacketGuideData,
			oneof: `packet`
		}, {
			no: 65,
			name: `CPacketBlockBreakAnim`,
			kind: `message`,
			T: CPacketBlockBreakAnim,
			oneof: `packet`
		}]);
	}
	static fromBinary(t, n) {
		return new ClientBoundCombined_CPacket().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ClientBoundCombined_CPacket().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ClientBoundCombined_CPacket().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ClientBoundCombined_CPacket, t, n);
	}
};
exports.ClientBoundCombined_CPacket = ClientBoundCombined_CPacket;
class SPacketEnchantItem extends Message {
	constructor(SPacketEnchantItem) {
		super(), proto2.util.initPartial(SPacketEnchantItem, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketEnchantItem`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `button`,
			kind: `scalar`,
			T: 5
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketEnchantItem().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketEnchantItem().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketEnchantItem().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketEnchantItem, t, n);
	}
};
exports.SPacketEnchantItem = SPacketEnchantItem;
class SPacketRenameItem extends Message {
	constructor(SPacketRenameItem) {
		super(), proto2.util.initPartial(SPacketRenameItem, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketRenameItem`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `windowId`,
			kind: `scalar`,
			T: 5
		}, {
			no: 2,
			name: `name`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketRenameItem().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketRenameItem().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketRenameItem().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketRenameItem, t, n);
	}
};
exports.SPacketRenameItem = SPacketRenameItem;
class SPacketScriptAction extends Message {
	constructor(SPacketScriptAction) {
		super(), this.action = {
			case: void 0
		}, proto2.util.initPartial(SPacketScriptAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketScriptAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `list`,
			kind: `message`,
			T: ScriptList,
			oneof: `action`
		}, {
			no: 2,
			name: `save`,
			kind: `message`,
			T: ScriptSave,
			oneof: `action`
		}, {
			no: 3,
			name: `delete`,
			kind: `message`,
			T: ScriptDelete,
			oneof: `action`
		}, {
			no: 4,
			name: `set_enabled`,
			kind: `message`,
			T: ScriptSetEnabled,
			oneof: `action`
		}, {
			no: 5,
			name: `get_logs`,
			kind: `message`,
			T: ScriptGetLogs,
			oneof: `action`
		}, {
			no: 6,
			name: `rename`,
			kind: `message`,
			T: ScriptRename,
			oneof: `action`
		}, {
			no: 7,
			name: `clear_logs`,
			kind: `message`,
			T: ScriptClearLogs,
			oneof: `action`
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketScriptAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketScriptAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketScriptAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketScriptAction, t, n);
	}
};
exports.SPacketScriptAction = SPacketScriptAction;
class ScriptList extends Message {
	constructor(ScriptList) {
		super(), proto2.util.initPartial(ScriptList, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptList`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new ScriptList().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptList().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptList().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptList, t, n);
	}
};
exports.ScriptList = ScriptList;
class ScriptSave extends Message {
	constructor(ScriptSave) {
		super(), proto2.util.initPartial(ScriptSave, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptSave`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `name`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `source`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new ScriptSave().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptSave().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptSave().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptSave, t, n);
	}
};
exports.ScriptSave = ScriptSave;
class ScriptDelete extends Message {
	constructor(ScriptDelete) {
		super(), proto2.util.initPartial(ScriptDelete, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptDelete`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `name`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new ScriptDelete().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptDelete().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptDelete().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptDelete, t, n);
	}
};
exports.ScriptDelete = ScriptDelete;
class ScriptSetEnabled extends Message {
	constructor(ScriptSetEnabled) {
		super(), proto2.util.initPartial(ScriptSetEnabled, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptSetEnabled`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `enabled`,
			kind: `scalar`,
			T: 8
		}]);
	}
	static fromBinary(t, n) {
		return new ScriptSetEnabled().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptSetEnabled().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptSetEnabled().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptSetEnabled, t, n);
	}
};
exports.ScriptSetEnabled = ScriptSetEnabled;
class ScriptGetLogs extends Message {
	constructor(ScriptGetLogs) {
		super(), proto2.util.initPartial(ScriptGetLogs, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptGetLogs`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new ScriptGetLogs().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptGetLogs().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptGetLogs().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptGetLogs, t, n);
	}
};
exports.ScriptGetLogs = ScriptGetLogs;
class ScriptClearLogs extends Message {
	constructor(ScriptClearLogs) {
		super(), proto2.util.initPartial(ScriptClearLogs, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptClearLogs`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => []);
	}
	static fromBinary(t, n) {
		return new ScriptClearLogs().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptClearLogs().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptClearLogs().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptClearLogs, t, n);
	}
};
exports.ScriptClearLogs = ScriptClearLogs;
class ScriptRename extends Message {
	constructor(ScriptRename) {
		super(), proto2.util.initPartial(ScriptRename, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `ScriptRename`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `name`,
			kind: `scalar`,
			T: 9
		}, {
			no: 2,
			name: `new_name`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new ScriptRename().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new ScriptRename().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new ScriptRename().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(ScriptRename, t, n);
	}
};
exports.ScriptRename = ScriptRename;
class SPacketPlotsAction extends Message {
	constructor(SPacketPlotsAction) {
		super(), proto2.util.initPartial(SPacketPlotsAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketPlotsAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `json`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketPlotsAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketPlotsAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketPlotsAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketPlotsAction, t, n);
	}
};
exports.SPacketPlotsAction = SPacketPlotsAction;
class SPacketUpdateCommandBlock extends Message {
	constructor(SPacketUpdateCommandBlock) {
		super(), this.commands = [], proto2.util.initPartial(SPacketUpdateCommandBlock, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUpdateCommandBlock`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `pos`,
			kind: `message`,
			T: PBBlockPos
		}, {
			no: 2,
			name: `command`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}, {
			no: 3,
			name: `commands`,
			kind: `scalar`,
			T: 9,
			repeated: !0
		}, {
			no: 4,
			name: `repeat`,
			kind: `scalar`,
			T: 5,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketUpdateCommandBlock().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUpdateCommandBlock().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUpdateCommandBlock().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUpdateCommandBlock, t, n);
	}
};
exports.SPacketUpdateCommandBlock = SPacketUpdateCommandBlock;
class SPacketUploadSchematic extends Message {
	constructor(SPacketUploadSchematic) {
		super(), proto2.util.initPartial(SPacketUploadSchematic, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketUploadSchematic`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `data`,
			kind: `scalar`,
			T: 12
		}, {
			no: 2,
			name: `name`,
			kind: `scalar`,
			T: 9,
			opt: !0
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketUploadSchematic().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketUploadSchematic().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketUploadSchematic().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketUploadSchematic, t, n);
	}
};
exports.SPacketUploadSchematic = SPacketUploadSchematic;
class SPacketGuideAction extends Message {
	constructor(SPacketGuideAction) {
		super(), proto2.util.initPartial(SPacketGuideAction, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketGuideAction`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `json`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketGuideAction().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketGuideAction().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketGuideAction().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketGuideAction, t, n);
	}
};
exports.SPacketGuideAction = SPacketGuideAction;
class SPacketTabComplete$1 extends Message {
	constructor(SPacketTabComplete$1) {
		super(), proto2.util.initPartial(SPacketTabComplete$1, this);
	}
	static {
		this.runtime = proto2;
	}
	static {
		this.typeName = `SPacketTabComplete`;
	}
	static {
		this.fields = proto2.util.newFieldList(() => [{
			no: 1,
			name: `message`,
			kind: `scalar`,
			T: 9
		}]);
	}
	static fromBinary(t, n) {
		return new SPacketTabComplete$1().fromBinary(t, n);
	}
	static fromJson(t, n) {
		return new SPacketTabComplete$1().fromJson(t, n);
	}
	static fromJsonString(t, n) {
		return new SPacketTabComplete$1().fromJsonString(t, n);
	}
	static equals(t, n) {
		return proto2.util.equals(SPacketTabComplete$1, t, n);
	}
};
exports.SPacketTabComplete$1 = SPacketTabComplete$1;

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
	CPacketEntityRelativePositionAndRotation,
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
	CPacketPlayerReconciliation,
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
	ClientBoundCombined,
	CPacketScriptData,
	CPacketScriptLog,
	CPacketPlotsData,
	CPacketUpdatePlayerHead,
	CPacketChunkUnchanged,
	CPacketGuideData,
	CPacketBlockBreakAnim
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
	SPacketTabComplete,
	SPacketUpdateSign,
	SPacketUseEntity,
	SPacketUpdateCommandBlock,
	SPacketQueueNext,
	SPacketPlayerInput,
	SPacketBreakBlock,
	SPacketClick,
	SPacketCraftItem,
	SPacketPlaceBlock,
	SPacketRequestChunk,
	SPacketUpdateInventory,
	SPacketUseItem,
	SPacketScriptAction,
	SPacketPlotsAction,
	SPacketRenameItem,
	SPacketUploadSchematic,
	SPacketGuideAction
}, EXTRA_MAP = {
	CPacketScriptData,
	CPacketScriptLog,
	SPacketScriptAction,
	CPacketPlotsData,
	SPacketPlotsAction,
	CPacketUpdatePlayerHead,
	CPacketChunkUnchanged,
	SPacketRenameItem,
	SPacketUploadSchematic,
	CPacketGuideData,
	SPacketGuideAction,
	CPacketBlockBreakAnim
}
  , NAME_TO_ID = {}
  , ID_TO_PACKET = {}
  , ID_TO_NAME = {};
let currentId = 0;

function addPacket(name, packet) {
	NAME_TO_ID[name] = currentId,
	ID_TO_PACKET[currentId] = packet,
	ID_TO_NAME[currentId] = name,
	currentId++;
}

for (let [e, t] of Object.entries(CPACKET_MAP))
	e in EXTRA_MAP || addPacket(e, t);
for (let [e, t] of Object.entries(SPACKET_MAP))
	e in EXTRA_MAP || addPacket(e, t);
for (let [e, t] of Object.entries(EXTRA_MAP))
	addPacket(e, t);

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

const PacketData = {
	permVersion: 0,
	nameToId: NAME_TO_ID,
	idToPacket: ID_TO_PACKET,
	idToName: ID_TO_NAME
};

function tB(e) {
	let t = 1779033703 ^ e.length;
	for (let n = 0; n < e.length; n++)
		t = Math.imul(t ^ e.charCodeAt(n), 3432918353),
		t = t << 13 | t >>> 19;
	return () => (t = Math.imul(t ^ t >>> 16, 2246822507),
	t = Math.imul(t ^ t >>> 13, 3266489909),
	t ^= t >>> 16,
	t >>> 0)
};

function nB(e) {
	return () => {
		e |= 0,
		e = e + 1831565813 | 0;
		let t = Math.imul(e ^ e >>> 15, 1 | e);
		return t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t,
		((t ^ t >>> 14) >>> 0) / 4294967296
	}
};

function rB(e, t, n, r) {
	for (let i = n - 1; i > t; i--) {
		let n = t + Math.floor(r() * (i - t + 1))
		  , a = e[i];
		e[i] = e[n],
		e[n] = a
	}
};

function obfuscatePacketRoutine(e, t, n=101, r=64) {
	let i = Array.from({
		length: n
	}, (e, t) => t);
	if (t !== 0) {
		let a = nB(tB(`mb-perm|v${t}|lo|${e}`)())
		  , o = nB(tB(`mb-perm|v${t}|hi|${e}`)());
		rB(i, 0, Math.min(r, n), a),
		n > r && rB(i, r, n, o)
	}
	let a = Array(n);
	for (let e = 0; e < n; e++)
		a[i[e]] = e;
	return {
		perm: i,
		invPerm: a,
		version: t
	}
};

function setPacketData(e, t) {
	if (!e || !t || t === 0)
		return FV;
	let {perm: n} = obfuscatePacketRoutine(e, t)
	  , r = {}
	  , i = {}
	  , a = {};
	for (let packet of Object.keys(NAME_TO_ID)) {
		let t = NAME_TO_ID[packet]
		  , o = t < 101 ? n[t] : t;
		r[packet] = o,
		i[o] = ID_TO_PACKET[t],
		a[o] = packet
	}

	Object.assign(PacketData, {
		permVersion: t,
		nameToId: r,
		idToPacket: i,
		idToName: a
	});

	return PacketData;
}

class ClientEncoder {
	constructor() {
		ut(this, "encode", _=>(_.t = _.type,
		_.d = _.data,
		delete _.type,
		delete _.nsp,
		delete _.data,
		_.t === 2 && _.d[1] && _.d[1].toBinary && (_.d[1] = _.d[1].toBinary(),
		_.d[0] = PacketData.nameToId[_.d[0]]),
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
					const it = tt >> 2, at = tt & 2, st = PacketData.idToPacket[it];
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

function generateAuthSeed() {
	let arr = new Uint8Array(16);
	crypto.getRandomValues(arr);

	return Array.from(arr, entry => entry.toString(16).padStart(2, '0')).join('');
}

exports.ClientSocket = class {
	static setUrl(_, $) {
		const seed = generateAuthSeed();
		const version = 1;
		setPacketData(seed, version);
		this.socket = io(_, {
			transports: ["websocket"],
			extraHeaders: {
				'Origin': 'https://miniblox.io',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
			},
			auth: {
				permSeed: seed,
				permVersion: version,
				clientVersion: VERSION
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
		this.socket.on("connect", () => {
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

const enumTypeSymbol = Symbol("@bufbuild/protobuf/enum-type");
function assert$2(j, _) {
    if (!j)
        throw new Error(_)
}
function getEnumType(j) {
    const _ = j[enumTypeSymbol];
    return assert$2(_, "missing enum type on enum object"),
    _
}
function setEnumType(j, _, $, et) {
    j[enumTypeSymbol] = makeEnumType(_, $.map(tt=>({
        no: tt.no,
        name: tt.name,
        localName: j[tt.no]
    })))
}
function makeEnumType(j, _, $) {
    const et = Object.create(null)
      , tt = Object.create(null)
      , rt = [];
    for (const nt of _) {
        const it = normalizeEnumValue(nt);
        rt.push(it),
        et[nt.name] = it,
        tt[nt.no] = it
    }
    return {
        typeName: j,
        values: rt,
        findName(nt) {
            return et[nt]
        },
        findNumber(nt) {
            return tt[nt]
        }
    }
}
function makeEnum(j, _, $) {
    const et = {};
    for (const tt of _) {
        const rt = normalizeEnumValue(tt);
        et[rt.localName] = rt.no,
        et[rt.no] = rt.localName
    }
    return setEnumType(et, j, _),
    et
}
function normalizeEnumValue(j) {
    return "localName"in j ? j : Object.assign(Object.assign({}, j), {
        localName: j.name
    })
}
let Message$2 = class {
    equals(_) {
        return this.getType().runtime.util.equals(this.getType(), this, _)
    }
    clone() {
        return this.getType().runtime.util.clone(this)
    }
    fromBinary(_, $) {
        const et = this.getType()
          , tt = et.runtime.bin
          , rt = tt.makeReadOptions($);
        return tt.readMessage(this, rt.readerFactory(_), _.byteLength, rt),
        this
    }
    fromJson(_, $) {
        const et = this.getType()
          , tt = et.runtime.json
          , rt = tt.makeReadOptions($);
        return tt.readMessage(et, _, rt, this),
        this
    }
    fromJsonString(_, $) {
        let et;
        try {
            et = JSON.parse(_)
        } catch (tt) {
            throw new Error(`cannot decode ${this.getType().typeName} from JSON: ${tt instanceof Error ? tt.message : String(tt)}`)
        }
        return this.fromJson(et, $)
    }
    toBinary(_) {
        const $ = this.getType()
          , et = $.runtime.bin
          , tt = et.makeWriteOptions(_)
          , rt = tt.writerFactory();
        return et.writeMessage(this, rt, tt),
        rt.finish()
    }
    toJson(_) {
        const $ = this.getType()
          , et = $.runtime.json
          , tt = et.makeWriteOptions(_);
        return et.writeMessage(this, tt)
    }
    toJsonString(_) {
        var $;
        const et = this.toJson(_);
        return JSON.stringify(et, null, ($ = _ == null ? void 0 : _.prettySpaces) !== null && $ !== void 0 ? $ : 0)
    }
    toJSON() {
        return this.toJson({
            emitDefaultValues: !0
        })
    }
    getType() {
        return Object.getPrototypeOf(this).constructor
    }
}
;
function makeMessageType(j, _, $, et) {
    var tt;
    const rt = (tt = et == null ? void 0 : et.localName) !== null && tt !== void 0 ? tt : _.substring(_.lastIndexOf(".") + 1)
      , nt = {
        [rt]: function(it) {
            j.util.initFields(this),
            j.util.initPartial(it, this)
        }
    }[rt];
    return Object.setPrototypeOf(nt.prototype, new Message$2),
    Object.assign(nt, {
        runtime: j,
        typeName: _,
        fields: j.util.newFieldList($),
        fromBinary(it, at) {
            return new nt().fromBinary(it, at)
        },
        fromJson(it, at) {
            return new nt().fromJson(it, at)
        },
        fromJsonString(it, at) {
            return new nt().fromJsonString(it, at)
        },
        equals(it, at) {
            return j.util.equals(nt, it, at)
        }
    }),
    nt
}
function makeProtoRuntime(j, _, $, et) {
    return {
        syntax: j,
        json: _,
        bin: $,
        util: et,
        makeMessageType(tt, rt, nt) {
            return makeMessageType(this, tt, rt, nt)
        },
        makeEnum,
        makeEnumType,
        getEnumType
    }
}
var ScalarType;
(function(j) {
    j[j.DOUBLE = 1] = "DOUBLE",
    j[j.FLOAT = 2] = "FLOAT",
    j[j.INT64 = 3] = "INT64",
    j[j.UINT64 = 4] = "UINT64",
    j[j.INT32 = 5] = "INT32",
    j[j.FIXED64 = 6] = "FIXED64",
    j[j.FIXED32 = 7] = "FIXED32",
    j[j.BOOL = 8] = "BOOL",
    j[j.STRING = 9] = "STRING",
    j[j.BYTES = 12] = "BYTES",
    j[j.UINT32 = 13] = "UINT32",
    j[j.SFIXED32 = 15] = "SFIXED32",
    j[j.SFIXED64 = 16] = "SFIXED64",
    j[j.SINT32 = 17] = "SINT32",
    j[j.SINT64 = 18] = "SINT64"
}
)(ScalarType || (ScalarType = {}));
function varint64read() {
    let j = 0
      , _ = 0;
    for (let et = 0; et < 28; et += 7) {
        let tt = this.buf[this.pos++];
        if (j |= (tt & 127) << et,
        !(tt & 128))
            return this.assertBounds(),
            [j, _]
    }
    let $ = this.buf[this.pos++];
    if (j |= ($ & 15) << 28,
    _ = ($ & 112) >> 4,
    !($ & 128))
        return this.assertBounds(),
        [j, _];
    for (let et = 3; et <= 31; et += 7) {
        let tt = this.buf[this.pos++];
        if (_ |= (tt & 127) << et,
        !(tt & 128))
            return this.assertBounds(),
            [j, _]
    }
    throw new Error("invalid varint")
}
function varint64write(j, _, $) {
    for (let rt = 0; rt < 28; rt = rt + 7) {
        const nt = j >>> rt
          , it = !(!(nt >>> 7) && _ == 0)
          , at = (it ? nt | 128 : nt) & 255;
        if ($.push(at),
        !it)
            return
    }
    const et = j >>> 28 & 15 | (_ & 7) << 4
      , tt = !!(_ >> 3);
    if ($.push((tt ? et | 128 : et) & 255),
    !!tt) {
        for (let rt = 3; rt < 31; rt = rt + 7) {
            const nt = _ >>> rt
              , it = !!(nt >>> 7)
              , at = (it ? nt | 128 : nt) & 255;
            if ($.push(at),
            !it)
                return
        }
        $.push(_ >>> 31 & 1)
    }
}
const TWO_PWR_32_DBL = 4294967296;
function int64FromString(j) {
    const _ = j[0] === "-";
    _ && (j = j.slice(1));
    const $ = 1e6;
    let et = 0
      , tt = 0;
    function rt(nt, it) {
        const at = Number(j.slice(nt, it));
        tt *= $,
        et = et * $ + at,
        et >= TWO_PWR_32_DBL && (tt = tt + (et / TWO_PWR_32_DBL | 0),
        et = et % TWO_PWR_32_DBL)
    }
    return rt(-24, -18),
    rt(-18, -12),
    rt(-12, -6),
    rt(-6),
    _ ? negate$2(et, tt) : newBits(et, tt)
}
function int64ToString(j, _) {
    let $ = newBits(j, _);
    const et = $.hi & 2147483648;
    et && ($ = negate$2($.lo, $.hi));
    const tt = uInt64ToString($.lo, $.hi);
    return et ? "-" + tt : tt
}
function uInt64ToString(j, _) {
    if ({lo: j, hi: _} = toUnsigned(j, _),
    _ <= 2097151)
        return String(TWO_PWR_32_DBL * _ + j);
    const $ = j & 16777215
      , et = (j >>> 24 | _ << 8) & 16777215
      , tt = _ >> 16 & 65535;
    let rt = $ + et * 6777216 + tt * 6710656
      , nt = et + tt * 8147497
      , it = tt * 2;
    const at = 1e7;
    return rt >= at && (nt += Math.floor(rt / at),
    rt %= at),
    nt >= at && (it += Math.floor(nt / at),
    nt %= at),
    it.toString() + decimalFrom1e7WithLeadingZeros(nt) + decimalFrom1e7WithLeadingZeros(rt)
}
function toUnsigned(j, _) {
    return {
        lo: j >>> 0,
        hi: _ >>> 0
    }
}
function newBits(j, _) {
    return {
        lo: j | 0,
        hi: _ | 0
    }
}
function negate$2(j, _) {
    return _ = ~_,
    j ? j = ~j + 1 : _ += 1,
    newBits(j, _)
}
const decimalFrom1e7WithLeadingZeros = j=>{
    const _ = String(j);
    return "0000000".slice(_.length) + _
}
;
function varint32write(j, _) {
    if (j >= 0) {
        for (; j > 127; )
            _.push(j & 127 | 128),
            j = j >>> 7;
        _.push(j)
    } else {
        for (let $ = 0; $ < 9; $++)
            _.push(j & 127 | 128),
            j = j >> 7;
        _.push(1)
    }
}
function varint32read() {
    let j = this.buf[this.pos++]
      , _ = j & 127;
    if (!(j & 128))
        return this.assertBounds(),
        _;
    if (j = this.buf[this.pos++],
    _ |= (j & 127) << 7,
    !(j & 128))
        return this.assertBounds(),
        _;
    if (j = this.buf[this.pos++],
    _ |= (j & 127) << 14,
    !(j & 128))
        return this.assertBounds(),
        _;
    if (j = this.buf[this.pos++],
    _ |= (j & 127) << 21,
    !(j & 128))
        return this.assertBounds(),
        _;
    j = this.buf[this.pos++],
    _ |= (j & 15) << 28;
    for (let $ = 5; j & 128 && $ < 10; $++)
        j = this.buf[this.pos++];
    if (j & 128)
        throw new Error("invalid varint");
    return this.assertBounds(),
    _ >>> 0
}
function makeInt64Support() {
    const j = new DataView(new ArrayBuffer(8));
    if (typeof BigInt == "function" && typeof j.getBigInt64 == "function" && typeof j.getBigUint64 == "function" && typeof j.setBigInt64 == "function" && typeof j.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || {}.BUF_BIGINT_DISABLE !== "1")) {
        const tt = BigInt("-9223372036854775808")
          , rt = BigInt("9223372036854775807")
          , nt = BigInt("0")
          , it = BigInt("18446744073709551615");
        return {
            zero: BigInt(0),
            supported: !0,
            parse(at) {
                const st = typeof at == "bigint" ? at : BigInt(at);
                if (st > rt || st < tt)
                    throw new Error(`int64 invalid: ${at}`);
                return st
            },
            uParse(at) {
                const st = typeof at == "bigint" ? at : BigInt(at);
                if (st > it || st < nt)
                    throw new Error(`uint64 invalid: ${at}`);
                return st
            },
            enc(at) {
                return j.setBigInt64(0, this.parse(at), !0),
                {
                    lo: j.getInt32(0, !0),
                    hi: j.getInt32(4, !0)
                }
            },
            uEnc(at) {
                return j.setBigInt64(0, this.uParse(at), !0),
                {
                    lo: j.getInt32(0, !0),
                    hi: j.getInt32(4, !0)
                }
            },
            dec(at, st) {
                return j.setInt32(0, at, !0),
                j.setInt32(4, st, !0),
                j.getBigInt64(0, !0)
            },
            uDec(at, st) {
                return j.setInt32(0, at, !0),
                j.setInt32(4, st, !0),
                j.getBigUint64(0, !0)
            }
        }
    }
    const $ = tt=>assert$2(/^-?[0-9]+$/.test(tt), `int64 invalid: ${tt}`)
      , et = tt=>assert$2(/^[0-9]+$/.test(tt), `uint64 invalid: ${tt}`);
    return {
        zero: "0",
        supported: !1,
        parse(tt) {
            return typeof tt != "string" && (tt = tt.toString()),
            $(tt),
            tt
        },
        uParse(tt) {
            return typeof tt != "string" && (tt = tt.toString()),
            et(tt),
            tt
        },
        enc(tt) {
            return typeof tt != "string" && (tt = tt.toString()),
            $(tt),
            int64FromString(tt)
        },
        uEnc(tt) {
            return typeof tt != "string" && (tt = tt.toString()),
            et(tt),
            int64FromString(tt)
        },
        dec(tt, rt) {
            return int64ToString(tt, rt)
        },
        uDec(tt, rt) {
            return uInt64ToString(tt, rt)
        }
    }
}
const protoInt64 = makeInt64Support();
var WireType;
(function(j) {
    j[j.Varint = 0] = "Varint",
    j[j.Bit64 = 1] = "Bit64",
    j[j.LengthDelimited = 2] = "LengthDelimited",
    j[j.StartGroup = 3] = "StartGroup",
    j[j.EndGroup = 4] = "EndGroup",
    j[j.Bit32 = 5] = "Bit32"
}
)(WireType || (WireType = {}));
class BinaryWriter {
    constructor(_) {
        this.stack = [],
        this.textEncoder = _ ?? new TextEncoder,
        this.chunks = [],
        this.buf = []
    }
    finish() {
        this.chunks.push(new Uint8Array(this.buf));
        let _ = 0;
        for (let tt = 0; tt < this.chunks.length; tt++)
            _ += this.chunks[tt].length;
        let $ = new Uint8Array(_)
          , et = 0;
        for (let tt = 0; tt < this.chunks.length; tt++)
            $.set(this.chunks[tt], et),
            et += this.chunks[tt].length;
        return this.chunks = [],
        $
    }
    fork() {
        return this.stack.push({
            chunks: this.chunks,
            buf: this.buf
        }),
        this.chunks = [],
        this.buf = [],
        this
    }
    join() {
        let _ = this.finish()
          , $ = this.stack.pop();
        if (!$)
            throw new Error("invalid state, fork stack empty");
        return this.chunks = $.chunks,
        this.buf = $.buf,
        this.uint32(_.byteLength),
        this.raw(_)
    }
    tag(_, $) {
        return this.uint32((_ << 3 | $) >>> 0)
    }
    raw(_) {
        return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)),
        this.buf = []),
        this.chunks.push(_),
        this
    }
    uint32(_) {
        for (assertUInt32(_); _ > 127; )
            this.buf.push(_ & 127 | 128),
            _ = _ >>> 7;
        return this.buf.push(_),
        this
    }
    int32(_) {
        return assertInt32(_),
        varint32write(_, this.buf),
        this
    }
    bool(_) {
        return this.buf.push(_ ? 1 : 0),
        this
    }
    bytes(_) {
        return this.uint32(_.byteLength),
        this.raw(_)
    }
    string(_) {
        let $ = this.textEncoder.encode(_);
        return this.uint32($.byteLength),
        this.raw($)
    }
    float(_) {
        assertFloat32(_);
        let $ = new Uint8Array(4);
        return new DataView($.buffer).setFloat32(0, _, !0),
        this.raw($)
    }
    double(_) {
        let $ = new Uint8Array(8);
        return new DataView($.buffer).setFloat64(0, _, !0),
        this.raw($)
    }
    fixed32(_) {
        assertUInt32(_);
        let $ = new Uint8Array(4);
        return new DataView($.buffer).setUint32(0, _, !0),
        this.raw($)
    }
    sfixed32(_) {
        assertInt32(_);
        let $ = new Uint8Array(4);
        return new DataView($.buffer).setInt32(0, _, !0),
        this.raw($)
    }
    sint32(_) {
        return assertInt32(_),
        _ = (_ << 1 ^ _ >> 31) >>> 0,
        varint32write(_, this.buf),
        this
    }
    sfixed64(_) {
        let $ = new Uint8Array(8)
          , et = new DataView($.buffer)
          , tt = protoInt64.enc(_);
        return et.setInt32(0, tt.lo, !0),
        et.setInt32(4, tt.hi, !0),
        this.raw($)
    }
    fixed64(_) {
        let $ = new Uint8Array(8)
          , et = new DataView($.buffer)
          , tt = protoInt64.uEnc(_);
        return et.setInt32(0, tt.lo, !0),
        et.setInt32(4, tt.hi, !0),
        this.raw($)
    }
    int64(_) {
        let $ = protoInt64.enc(_);
        return varint64write($.lo, $.hi, this.buf),
        this
    }
    sint64(_) {
        let $ = protoInt64.enc(_)
          , et = $.hi >> 31
          , tt = $.lo << 1 ^ et
          , rt = ($.hi << 1 | $.lo >>> 31) ^ et;
        return varint64write(tt, rt, this.buf),
        this
    }
    uint64(_) {
        let $ = protoInt64.uEnc(_);
        return varint64write($.lo, $.hi, this.buf),
        this
    }
}
class BinaryReader {
    constructor(_, $) {
        this.varint64 = varint64read,
        this.uint32 = varint32read,
        this.buf = _,
        this.len = _.length,
        this.pos = 0,
        this.view = new DataView(_.buffer,_.byteOffset,_.byteLength),
        this.textDecoder = $ ?? new TextDecoder
    }
    tag() {
        let _ = this.uint32()
          , $ = _ >>> 3
          , et = _ & 7;
        if ($ <= 0 || et < 0 || et > 5)
            throw new Error("illegal tag: field no " + $ + " wire type " + et);
        return [$, et]
    }
    skip(_) {
        let $ = this.pos;
        switch (_) {
        case WireType.Varint:
            for (; this.buf[this.pos++] & 128; )
                ;
            break;
        case WireType.Bit64:
            this.pos += 4;
        case WireType.Bit32:
            this.pos += 4;
            break;
        case WireType.LengthDelimited:
            let et = this.uint32();
            this.pos += et;
            break;
        case WireType.StartGroup:
            let tt;
            for (; (tt = this.tag()[1]) !== WireType.EndGroup; )
                this.skip(tt);
            break;
        default:
            throw new Error("cant skip wire type " + _)
        }
        return this.assertBounds(),
        this.buf.subarray($, this.pos)
    }
    assertBounds() {
        if (this.pos > this.len)
            throw new RangeError("premature EOF")
    }
    int32() {
        return this.uint32() | 0
    }
    sint32() {
        let _ = this.uint32();
        return _ >>> 1 ^ -(_ & 1)
    }
    int64() {
        return protoInt64.dec(...this.varint64())
    }
    uint64() {
        return protoInt64.uDec(...this.varint64())
    }
    sint64() {
        let[_,$] = this.varint64()
          , et = -(_ & 1);
        return _ = (_ >>> 1 | ($ & 1) << 31) ^ et,
        $ = $ >>> 1 ^ et,
        protoInt64.dec(_, $)
    }
    bool() {
        let[_,$] = this.varint64();
        return _ !== 0 || $ !== 0
    }
    fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, !0)
    }
    sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, !0)
    }
    fixed64() {
        return protoInt64.uDec(this.sfixed32(), this.sfixed32())
    }
    sfixed64() {
        return protoInt64.dec(this.sfixed32(), this.sfixed32())
    }
    float() {
        return this.view.getFloat32((this.pos += 4) - 4, !0)
    }
    double() {
        return this.view.getFloat64((this.pos += 8) - 8, !0)
    }
    bytes() {
        let _ = this.uint32()
          , $ = this.pos;
        return this.pos += _,
        this.assertBounds(),
        this.buf.subarray($, $ + _)
    }
    string() {
        return this.textDecoder.decode(this.bytes())
    }
}
function wrapField(j, _) {
    return _ instanceof Message$2 || !j.fieldWrapper ? _ : j.fieldWrapper.wrapField(_)
}
ScalarType.DOUBLE,
ScalarType.FLOAT,
ScalarType.INT64,
ScalarType.UINT64,
ScalarType.INT32,
ScalarType.UINT32,
ScalarType.BOOL,
ScalarType.STRING,
ScalarType.BYTES;
function scalarEquals(j, _, $) {
    if (_ === $)
        return !0;
    if (j == ScalarType.BYTES) {
        if (!(_ instanceof Uint8Array) || !($ instanceof Uint8Array) || _.length !== $.length)
            return !1;
        for (let et = 0; et < _.length; et++)
            if (_[et] !== $[et])
                return !1;
        return !0
    }
    switch (j) {
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
        return _ == $
    }
    return !1
}
function scalarDefaultValue(j) {
    switch (j) {
    case ScalarType.BOOL:
        return !1;
    case ScalarType.UINT64:
    case ScalarType.FIXED64:
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
        return protoInt64.zero;
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
        return 0;
    case ScalarType.BYTES:
        return new Uint8Array(0);
    case ScalarType.STRING:
        return "";
    default:
        return 0
    }
}
function scalarTypeInfo(j, _) {
    const $ = _ === void 0;
    let et = WireType.Varint
      , tt = _ === 0;
    switch (j) {
    case ScalarType.STRING:
        tt = $ || !_.length,
        et = WireType.LengthDelimited;
        break;
    case ScalarType.BOOL:
        tt = _ === !1;
        break;
    case ScalarType.DOUBLE:
        et = WireType.Bit64;
        break;
    case ScalarType.FLOAT:
        et = WireType.Bit32;
        break;
    case ScalarType.INT64:
        tt = $ || _ == 0;
        break;
    case ScalarType.UINT64:
        tt = $ || _ == 0;
        break;
    case ScalarType.FIXED64:
        tt = $ || _ == 0,
        et = WireType.Bit64;
        break;
    case ScalarType.BYTES:
        tt = $ || !_.byteLength,
        et = WireType.LengthDelimited;
        break;
    case ScalarType.FIXED32:
        et = WireType.Bit32;
        break;
    case ScalarType.SFIXED32:
        et = WireType.Bit32;
        break;
    case ScalarType.SFIXED64:
        tt = $ || _ == 0,
        et = WireType.Bit64;
        break;
    case ScalarType.SINT64:
        tt = $ || _ == 0;
        break
    }
    const rt = ScalarType[j].toLowerCase();
    return [et, rt, $ || tt]
}
const unknownFieldsSymbol = Symbol("@bufbuild/protobuf/unknown-fields")
  , readDefaults = {
    readUnknownFields: !0,
    readerFactory: j=>new BinaryReader(j)
}
  , writeDefaults = {
    writeUnknownFields: !0,
    writerFactory: ()=>new BinaryWriter
};
function makeReadOptions$1(j) {
    return j ? Object.assign(Object.assign({}, readDefaults), j) : readDefaults
}
function makeWriteOptions$1(j) {
    return j ? Object.assign(Object.assign({}, writeDefaults), j) : writeDefaults
}
function makeBinaryFormatCommon() {
    return {
        makeReadOptions: makeReadOptions$1,
        makeWriteOptions: makeWriteOptions$1,
        listUnknownFields(j) {
            var _;
            return (_ = j[unknownFieldsSymbol]) !== null && _ !== void 0 ? _ : []
        },
        discardUnknownFields(j) {
            delete j[unknownFieldsSymbol]
        },
        writeUnknownFields(j, _) {
            const et = j[unknownFieldsSymbol];
            if (et)
                for (const tt of et)
                    _.tag(tt.no, tt.wireType).raw(tt.data)
        },
        onUnknownField(j, _, $, et) {
            const tt = j;
            Array.isArray(tt[unknownFieldsSymbol]) || (tt[unknownFieldsSymbol] = []),
            tt[unknownFieldsSymbol].push({
                no: _,
                wireType: $,
                data: et
            })
        },
        readMessage(j, _, $, et) {
            const tt = j.getType()
              , rt = $ === void 0 ? _.len : _.pos + $;
            for (; _.pos < rt; ) {
                const [nt,it] = _.tag()
                  , at = tt.fields.find(nt);
                if (!at) {
                    const dt = _.skip(it);
                    et.readUnknownFields && this.onUnknownField(j, nt, it, dt);
                    continue
                }
                let st = j
                  , ot = at.repeated
                  , ct = at.localName;
                switch (at.oneof && (st = st[at.oneof.localName],
                st.case != ct && delete st.value,
                st.case = ct,
                ct = "value"),
                at.kind) {
                case "scalar":
                case "enum":
                    const dt = at.kind == "enum" ? ScalarType.INT32 : at.T;
                    if (ot) {
                        let mt = st[ct];
                        if (it == WireType.LengthDelimited && dt != ScalarType.STRING && dt != ScalarType.BYTES) {
                            let _t = _.uint32() + _.pos;
                            for (; _.pos < _t; )
                                mt.push(readScalar$1(_, dt))
                        } else
                            mt.push(readScalar$1(_, dt))
                    } else
                        st[ct] = readScalar$1(_, dt);
                    break;
                case "message":
                    const ht = at.T;
                    ot ? st[ct].push(readMessageField(_, new ht, et)) : st[ct]instanceof Message$2 ? readMessageField(_, st[ct], et) : (st[ct] = readMessageField(_, new ht, et),
                    ht.fieldWrapper && !at.oneof && !at.repeated && (st[ct] = ht.fieldWrapper.unwrapField(st[ct])));
                    break;
                case "map":
                    let[pt,ft] = readMapEntry(at, _, et);
                    st[ct][pt] = ft;
                    break
                }
            }
        }
    }
}
function readMessageField(j, _, $) {
    return _.getType().runtime.bin.readMessage(_, j, j.uint32(), $),
    _
}
function readMapEntry(j, _, $) {
    const et = _.uint32()
      , tt = _.pos + et;
    let rt, nt;
    for (; _.pos < tt; ) {
        let[it] = _.tag();
        switch (it) {
        case 1:
            rt = readScalar$1(_, j.K);
            break;
        case 2:
            switch (j.V.kind) {
            case "scalar":
                nt = readScalar$1(_, j.V.T);
                break;
            case "enum":
                nt = _.int32();
                break;
            case "message":
                nt = readMessageField(_, new j.V.T, $);
                break
            }
            break
        }
    }
    if (rt === void 0) {
        let it = scalarDefaultValue(j.K);
        rt = j.K == ScalarType.BOOL ? it.toString() : it
    }
    if (typeof rt != "string" && typeof rt != "number" && (rt = rt.toString()),
    nt === void 0)
        switch (j.V.kind) {
        case "scalar":
            nt = scalarDefaultValue(j.V.T);
            break;
        case "enum":
            nt = 0;
            break;
        case "message":
            nt = new j.V.T;
            break
        }
    return [rt, nt]
}
function readScalar$1(j, _) {
    switch (_) {
    case ScalarType.STRING:
        return j.string();
    case ScalarType.BOOL:
        return j.bool();
    case ScalarType.DOUBLE:
        return j.double();
    case ScalarType.FLOAT:
        return j.float();
    case ScalarType.INT32:
        return j.int32();
    case ScalarType.INT64:
        return j.int64();
    case ScalarType.UINT64:
        return j.uint64();
    case ScalarType.FIXED64:
        return j.fixed64();
    case ScalarType.BYTES:
        return j.bytes();
    case ScalarType.FIXED32:
        return j.fixed32();
    case ScalarType.SFIXED32:
        return j.sfixed32();
    case ScalarType.SFIXED64:
        return j.sfixed64();
    case ScalarType.SINT64:
        return j.sint64();
    case ScalarType.UINT32:
        return j.uint32();
    case ScalarType.SINT32:
        return j.sint32()
    }
}
function writeMapEntry(j, _, $, et, tt) {
    j.tag($.no, WireType.LengthDelimited),
    j.fork();
    let rt = et;
    switch ($.K) {
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.UINT32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
        rt = Number.parseInt(et);
        break;
    case ScalarType.BOOL:
        assert$2(et == "true" || et == "false"),
        rt = et == "true";
        break
    }
    switch (writeScalar$1(j, $.K, 1, rt, !0),
    $.V.kind) {
    case "scalar":
        writeScalar$1(j, $.V.T, 2, tt, !0);
        break;
    case "enum":
        writeScalar$1(j, ScalarType.INT32, 2, tt, !0);
        break;
    case "message":
        writeMessageField(j, _, $.V.T, 2, tt);
        break
    }
    j.join()
}
function writeMessageField(j, _, $, et, tt) {
    if (tt !== void 0) {
        const rt = wrapField($, tt);
        j.tag(et, WireType.LengthDelimited).bytes(rt.toBinary(_))
    }
}
function writeScalar$1(j, _, $, et, tt) {
    let[rt,nt,it] = scalarTypeInfo(_, et);
    (!it || tt) && j.tag($, rt)[nt](et)
}
function writePacked(j, _, $, et) {
    if (!et.length)
        return;
    j.tag($, WireType.LengthDelimited).fork();
    let[,tt] = scalarTypeInfo(_);
    for (let rt = 0; rt < et.length; rt++)
        j[tt](et[rt]);
    j.join()
}
function makeBinaryFormatProto3() {
    return Object.assign(Object.assign({}, makeBinaryFormatCommon()), {
        writeMessage(j, _, $) {
            const et = j.getType();
            for (const tt of et.fields.byNumber()) {
                let rt, nt = tt.repeated, it = tt.localName;
                if (tt.oneof) {
                    const at = j[tt.oneof.localName];
                    if (at.case !== it)
                        continue;
                    rt = at.value
                } else
                    rt = j[it];
                switch (tt.kind) {
                case "scalar":
                case "enum":
                    let at = tt.kind == "enum" ? ScalarType.INT32 : tt.T;
                    if (nt)
                        if (tt.packed)
                            writePacked(_, at, tt.no, rt);
                        else
                            for (const st of rt)
                                writeScalar$1(_, at, tt.no, st, !0);
                    else
                        rt !== void 0 && writeScalar$1(_, at, tt.no, rt, !!tt.oneof || tt.opt);
                    break;
                case "message":
                    if (nt)
                        for (const st of rt)
                            writeMessageField(_, $, tt.T, tt.no, st);
                    else
                        writeMessageField(_, $, tt.T, tt.no, rt);
                    break;
                case "map":
                    for (const [st,ot] of Object.entries(rt))
                        writeMapEntry(_, $, tt, st, ot);
                    break
                }
            }
            return $.writeUnknownFields && this.writeUnknownFields(j, _),
            _
        }
    })
}
let encTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
  , decTable = [];
for (let j = 0; j < encTable.length; j++)
    decTable[encTable[j].charCodeAt(0)] = j;
decTable["-".charCodeAt(0)] = encTable.indexOf("+");
decTable["_".charCodeAt(0)] = encTable.indexOf("/");
const protoBase64 = {
    dec(j) {
        let _ = j.length * 3 / 4;
        j[j.length - 2] == "=" ? _ -= 2 : j[j.length - 1] == "=" && (_ -= 1);
        let $ = new Uint8Array(_), et = 0, tt = 0, rt, nt = 0;
        for (let it = 0; it < j.length; it++) {
            if (rt = decTable[j.charCodeAt(it)],
            rt === void 0)
                switch (j[it]) {
                case "=":
                    tt = 0;
                case `
`:
                case "\r":
                case "	":
                case " ":
                    continue;
                default:
                    throw Error("invalid base64 string.")
                }
            switch (tt) {
            case 0:
                nt = rt,
                tt = 1;
                break;
            case 1:
                $[et++] = nt << 2 | (rt & 48) >> 4,
                nt = rt,
                tt = 2;
                break;
            case 2:
                $[et++] = (nt & 15) << 4 | (rt & 60) >> 2,
                nt = rt,
                tt = 3;
                break;
            case 3:
                $[et++] = (nt & 3) << 6 | rt,
                tt = 0;
                break
            }
        }
        if (tt == 1)
            throw Error("invalid base64 string.");
        return $.subarray(0, et)
    },
    enc(j) {
        let _ = "", $ = 0, et, tt = 0;
        for (let rt = 0; rt < j.length; rt++)
            switch (et = j[rt],
            $) {
            case 0:
                _ += encTable[et >> 2],
                tt = (et & 3) << 4,
                $ = 1;
                break;
            case 1:
                _ += encTable[tt | et >> 4],
                tt = (et & 15) << 2,
                $ = 2;
                break;
            case 2:
                _ += encTable[tt | et >> 6],
                _ += encTable[et & 63],
                $ = 0;
                break
            }
        return $ && (_ += encTable[tt],
        _ += "=",
        $ == 1 && (_ += "=")),
        _
    }
}
  , jsonReadDefaults = {
    ignoreUnknownFields: !1
}
  , jsonWriteDefaults = {
    emitDefaultValues: !1,
    enumAsInteger: !1,
    useProtoFieldName: !1,
    prettySpaces: 0
};
function makeReadOptions(j) {
    return j ? Object.assign(Object.assign({}, jsonReadDefaults), j) : jsonReadDefaults
}
function makeWriteOptions(j) {
    return j ? Object.assign(Object.assign({}, jsonWriteDefaults), j) : jsonWriteDefaults
}
function makeJsonFormatCommon(j) {
    const _ = j(writeEnum, writeScalar);
    return {
        makeReadOptions,
        makeWriteOptions,
        readMessage($, et, tt, rt) {
            if (et == null || Array.isArray(et) || typeof et != "object")
                throw new Error(`cannot decode message ${$.typeName} from JSON: ${this.debug(et)}`);
            rt = rt ?? new $;
            const nt = {};
            for (const [it,at] of Object.entries(et)) {
                const st = $.fields.findJsonName(it);
                if (!st) {
                    if (!tt.ignoreUnknownFields)
                        throw new Error(`cannot decode message ${$.typeName} from JSON: key "${it}" is unknown`);
                    continue
                }
                let ot = st.localName
                  , ct = rt;
                if (st.oneof) {
                    if (at === null && st.kind == "scalar")
                        continue;
                    const dt = nt[st.oneof.localName];
                    if (dt)
                        throw new Error(`cannot decode message ${$.typeName} from JSON: multiple keys for oneof "${st.oneof.name}" present: "${dt}", "${it}"`);
                    nt[st.oneof.localName] = it,
                    ct = ct[st.oneof.localName] = {
                        case: ot
                    },
                    ot = "value"
                }
                if (st.repeated) {
                    if (at === null)
                        continue;
                    if (!Array.isArray(at))
                        throw new Error(`cannot decode field ${$.typeName}.${st.name} from JSON: ${this.debug(at)}`);
                    const dt = ct[ot];
                    for (const ht of at) {
                        if (ht === null)
                            throw new Error(`cannot decode field ${$.typeName}.${st.name} from JSON: ${this.debug(ht)}`);
                        let pt;
                        switch (st.kind) {
                        case "message":
                            pt = st.T.fromJson(ht, tt);
                            break;
                        case "enum":
                            if (pt = readEnum(st.T, ht, tt.ignoreUnknownFields),
                            pt === void 0)
                                continue;
                            break;
                        case "scalar":
                            try {
                                pt = readScalar(st.T, ht)
                            } catch (ft) {
                                let mt = `cannot decode field ${$.typeName}.${st.name} from JSON: ${this.debug(ht)}`;
                                throw ft instanceof Error && ft.message.length > 0 && (mt += `: ${ft.message}`),
                                new Error(mt)
                            }
                            break
                        }
                        dt.push(pt)
                    }
                } else if (st.kind == "map") {
                    if (at === null)
                        continue;
                    if (Array.isArray(at) || typeof at != "object")
                        throw new Error(`cannot decode field ${$.typeName}.${st.name} from JSON: ${this.debug(at)}`);
                    const dt = ct[ot];
                    for (const [ht,pt] of Object.entries(at)) {
                        if (pt === null)
                            throw new Error(`cannot decode field ${$.typeName}.${st.name} from JSON: map value null`);
                        let ft;
                        switch (st.V.kind) {
                        case "message":
                            ft = st.V.T.fromJson(pt, tt);
                            break;
                        case "enum":
                            if (ft = readEnum(st.V.T, pt, tt.ignoreUnknownFields),
                            ft === void 0)
                                continue;
                            break;
                        case "scalar":
                            try {
                                ft = readScalar(st.V.T, pt)
                            } catch (mt) {
                                let _t = `cannot decode map value for field ${$.typeName}.${st.name} from JSON: ${this.debug(at)}`;
                                throw mt instanceof Error && mt.message.length > 0 && (_t += `: ${mt.message}`),
                                new Error(_t)
                            }
                            break
                        }
                        try {
                            dt[readScalar(st.K, st.K == ScalarType.BOOL ? ht == "true" ? !0 : ht == "false" ? !1 : ht : ht).toString()] = ft
                        } catch (mt) {
                            let _t = `cannot decode map key for field ${$.typeName}.${st.name} from JSON: ${this.debug(at)}`;
                            throw mt instanceof Error && mt.message.length > 0 && (_t += `: ${mt.message}`),
                            new Error(_t)
                        }
                    }
                } else
                    switch (st.kind) {
                    case "message":
                        const dt = st.T;
                        if (at === null && dt.typeName != "google.protobuf.Value") {
                            if (st.oneof)
                                throw new Error(`cannot decode field ${$.typeName}.${st.name} from JSON: null is invalid for oneof field "${it}"`);
                            continue
                        }
                        ct[ot]instanceof Message$2 ? ct[ot].fromJson(at, tt) : (ct[ot] = dt.fromJson(at, tt),
                        dt.fieldWrapper && !st.oneof && (ct[ot] = dt.fieldWrapper.unwrapField(ct[ot])));
                        break;
                    case "enum":
                        const ht = readEnum(st.T, at, tt.ignoreUnknownFields);
                        ht !== void 0 && (ct[ot] = ht);
                        break;
                    case "scalar":
                        try {
                            ct[ot] = readScalar(st.T, at)
                        } catch (pt) {
                            let ft = `cannot decode field ${$.typeName}.${st.name} from JSON: ${this.debug(at)}`;
                            throw pt instanceof Error && pt.message.length > 0 && (ft += `: ${pt.message}`),
                            new Error(ft)
                        }
                        break
                    }
            }
            return rt
        },
        writeMessage($, et) {
            const tt = $.getType()
              , rt = {};
            let nt;
            try {
                for (const it of tt.fields.byMember()) {
                    let at;
                    if (it.kind == "oneof") {
                        const st = $[it.localName];
                        if (st.value === void 0)
                            continue;
                        if (nt = it.findField(st.case),
                        !nt)
                            throw "oneof case not found: " + st.case;
                        at = _(nt, st.value, et)
                    } else
                        nt = it,
                        at = _(nt, $[nt.localName], et);
                    at !== void 0 && (rt[et.useProtoFieldName ? nt.name : nt.jsonName] = at)
                }
            } catch (it) {
                const at = nt ? `cannot encode field ${tt.typeName}.${nt.name} to JSON` : `cannot encode message ${tt.typeName} to JSON`
                  , st = it instanceof Error ? it.message : String(it);
                throw new Error(at + (st.length > 0 ? `: ${st}` : ""))
            }
            return rt
        },
        readScalar,
        writeScalar,
        debug: debugJsonValue
    }
}
function debugJsonValue(j) {
    if (j === null)
        return "null";
    switch (typeof j) {
    case "object":
        return Array.isArray(j) ? "array" : "object";
    case "string":
        return j.length > 100 ? "string" : `"${j.split('"').join('\\"')}"`;
    default:
        return String(j)
    }
}
function readScalar(j, _) {
    switch (j) {
    case ScalarType.DOUBLE:
    case ScalarType.FLOAT:
        if (_ === null)
            return 0;
        if (_ === "NaN")
            return Number.NaN;
        if (_ === "Infinity")
            return Number.POSITIVE_INFINITY;
        if (_ === "-Infinity")
            return Number.NEGATIVE_INFINITY;
        if (_ === "" || typeof _ == "string" && _.trim().length !== _.length || typeof _ != "string" && typeof _ != "number")
            break;
        const $ = Number(_);
        if (Number.isNaN($) || !Number.isFinite($))
            break;
        return j == ScalarType.FLOAT && assertFloat32($),
        $;
    case ScalarType.INT32:
    case ScalarType.FIXED32:
    case ScalarType.SFIXED32:
    case ScalarType.SINT32:
    case ScalarType.UINT32:
        if (_ === null)
            return 0;
        let et;
        if (typeof _ == "number" ? et = _ : typeof _ == "string" && _.length > 0 && _.trim().length === _.length && (et = Number(_)),
        et === void 0)
            break;
        return j == ScalarType.UINT32 ? assertUInt32(et) : assertInt32(et),
        et;
    case ScalarType.INT64:
    case ScalarType.SFIXED64:
    case ScalarType.SINT64:
        if (_ === null)
            return protoInt64.zero;
        if (typeof _ != "number" && typeof _ != "string")
            break;
        return protoInt64.parse(_);
    case ScalarType.FIXED64:
    case ScalarType.UINT64:
        if (_ === null)
            return protoInt64.zero;
        if (typeof _ != "number" && typeof _ != "string")
            break;
        return protoInt64.uParse(_);
    case ScalarType.BOOL:
        if (_ === null)
            return !1;
        if (typeof _ != "boolean")
            break;
        return _;
    case ScalarType.STRING:
        if (_ === null)
            return "";
        if (typeof _ != "string")
            break;
        try {
            encodeURIComponent(_)
        } catch {
            throw new Error("invalid UTF8")
        }
        return _;
    case ScalarType.BYTES:
        if (_ === null || _ === "")
            return new Uint8Array(0);
        if (typeof _ != "string")
            break;
        return protoBase64.dec(_)
    }
    throw new Error
}
function readEnum(j, _, $) {
    if (_ === null)
        return 0;
    switch (typeof _) {
    case "number":
        if (Number.isInteger(_))
            return _;
        break;
    case "string":
        const et = j.findName(_);
        if (et || $)
            return et == null ? void 0 : et.no;
        break
    }
    throw new Error(`cannot decode enum ${j.typeName} from JSON: ${debugJsonValue(_)}`)
}
function writeEnum(j, _, $, et) {
    var tt;
    if (_ === void 0)
        return _;
    if (_ === 0 && !$)
        return;
    if (et)
        return _;
    if (j.typeName == "google.protobuf.NullValue")
        return null;
    const rt = j.findNumber(_);
    return (tt = rt == null ? void 0 : rt.name) !== null && tt !== void 0 ? tt : _
}
function writeScalar(j, _, $) {
    if (_ !== void 0)
        switch (j) {
        case ScalarType.INT32:
        case ScalarType.SFIXED32:
        case ScalarType.SINT32:
        case ScalarType.FIXED32:
        case ScalarType.UINT32:
            return assert$2(typeof _ == "number"),
            _ != 0 || $ ? _ : void 0;
        case ScalarType.FLOAT:
        case ScalarType.DOUBLE:
            return assert$2(typeof _ == "number"),
            Number.isNaN(_) ? "NaN" : _ === Number.POSITIVE_INFINITY ? "Infinity" : _ === Number.NEGATIVE_INFINITY ? "-Infinity" : _ !== 0 || $ ? _ : void 0;
        case ScalarType.STRING:
            return assert$2(typeof _ == "string"),
            _.length > 0 || $ ? _ : void 0;
        case ScalarType.BOOL:
            return assert$2(typeof _ == "boolean"),
            _ || $ ? _ : void 0;
        case ScalarType.UINT64:
        case ScalarType.FIXED64:
        case ScalarType.INT64:
        case ScalarType.SFIXED64:
        case ScalarType.SINT64:
            return assert$2(typeof _ == "bigint" || typeof _ == "string" || typeof _ == "number"),
            $ || _ != 0 ? _.toString(10) : void 0;
        case ScalarType.BYTES:
            return assert$2(_ instanceof Uint8Array),
            $ || _.byteLength > 0 ? protoBase64.enc(_) : void 0
        }
}
function makeJsonFormatProto3() {
    return makeJsonFormatCommon((j,_)=>function(et, tt, rt) {
        if (et.kind == "map") {
            const nt = {};
            switch (et.V.kind) {
            case "scalar":
                for (const [at,st] of Object.entries(tt)) {
                    const ot = _(et.V.T, st, !0);
                    assert$2(ot !== void 0),
                    nt[at.toString()] = ot
                }
                break;
            case "message":
                for (const [at,st] of Object.entries(tt))
                    nt[at.toString()] = st.toJson(rt);
                break;
            case "enum":
                const it = et.V.T;
                for (const [at,st] of Object.entries(tt)) {
                    assert$2(st === void 0 || typeof st == "number");
                    const ot = j(it, st, !0, rt.enumAsInteger);
                    assert$2(ot !== void 0),
                    nt[at.toString()] = ot
                }
                break
            }
            return rt.emitDefaultValues || Object.keys(nt).length > 0 ? nt : void 0
        } else if (et.repeated) {
            const nt = [];
            switch (et.kind) {
            case "scalar":
                for (let it = 0; it < tt.length; it++)
                    nt.push(_(et.T, tt[it], !0));
                break;
            case "enum":
                for (let it = 0; it < tt.length; it++)
                    nt.push(j(et.T, tt[it], !0, rt.enumAsInteger));
                break;
            case "message":
                for (let it = 0; it < tt.length; it++)
                    nt.push(wrapField(et.T, tt[it]).toJson(rt));
                break
            }
            return rt.emitDefaultValues || nt.length > 0 ? nt : void 0
        } else
            switch (et.kind) {
            case "scalar":
                return _(et.T, tt, !!et.oneof || et.opt || rt.emitDefaultValues);
            case "enum":
                return j(et.T, tt, !!et.oneof || et.opt || rt.emitDefaultValues, rt.enumAsInteger);
            case "message":
                return tt !== void 0 ? wrapField(et.T, tt).toJson(rt) : void 0
            }
    }
    )
}
function makeUtilCommon() {
    return {
        setEnumType,
        initPartial(j, _) {
            if (j === void 0)
                return;
            const $ = _.getType();
            for (const et of $.fields.byMember()) {
                const tt = et.localName
                  , rt = _
                  , nt = j;
                if (nt[tt] !== void 0)
                    switch (et.kind) {
                    case "oneof":
                        const it = nt[tt].case;
                        if (it === void 0)
                            continue;
                        const at = et.findField(it);
                        let st = nt[tt].value;
                        at && at.kind == "message" && !(st instanceof at.T) ? st = new at.T(st) : at && at.kind === "scalar" && at.T === ScalarType.BYTES && (st = toU8Arr(st)),
                        rt[tt] = {
                            case: it,
                            value: st
                        };
                        break;
                    case "scalar":
                    case "enum":
                        let ot = nt[tt];
                        et.T === ScalarType.BYTES && (ot = et.repeated ? ot.map(toU8Arr) : toU8Arr(ot)),
                        rt[tt] = ot;
                        break;
                    case "map":
                        switch (et.V.kind) {
                        case "scalar":
                        case "enum":
                            if (et.V.T === ScalarType.BYTES)
                                for (const [ht,pt] of Object.entries(nt[tt]))
                                    rt[tt][ht] = toU8Arr(pt);
                            else
                                Object.assign(rt[tt], nt[tt]);
                            break;
                        case "message":
                            const dt = et.V.T;
                            for (const ht of Object.keys(nt[tt])) {
                                let pt = nt[tt][ht];
                                dt.fieldWrapper || (pt = new dt(pt)),
                                rt[tt][ht] = pt
                            }
                            break
                        }
                        break;
                    case "message":
                        const ct = et.T;
                        if (et.repeated)
                            rt[tt] = nt[tt].map(dt=>dt instanceof ct ? dt : new ct(dt));
                        else if (nt[tt] !== void 0) {
                            const dt = nt[tt];
                            ct.fieldWrapper ? ct.typeName === "google.protobuf.BytesValue" ? rt[tt] = toU8Arr(dt) : rt[tt] = dt : rt[tt] = dt instanceof ct ? dt : new ct(dt)
                        }
                        break
                    }
            }
        },
        equals(j, _, $) {
            return _ === $ ? !0 : !_ || !$ ? !1 : j.fields.byMember().every(et=>{
                const tt = _[et.localName]
                  , rt = $[et.localName];
                if (et.repeated) {
                    if (tt.length !== rt.length)
                        return !1;
                    switch (et.kind) {
                    case "message":
                        return tt.every((nt,it)=>et.T.equals(nt, rt[it]));
                    case "scalar":
                        return tt.every((nt,it)=>scalarEquals(et.T, nt, rt[it]));
                    case "enum":
                        return tt.every((nt,it)=>scalarEquals(ScalarType.INT32, nt, rt[it]))
                    }
                    throw new Error(`repeated cannot contain ${et.kind}`)
                }
                switch (et.kind) {
                case "message":
                    return et.T.equals(tt, rt);
                case "enum":
                    return scalarEquals(ScalarType.INT32, tt, rt);
                case "scalar":
                    return scalarEquals(et.T, tt, rt);
                case "oneof":
                    if (tt.case !== rt.case)
                        return !1;
                    const nt = et.findField(tt.case);
                    if (nt === void 0)
                        return !0;
                    switch (nt.kind) {
                    case "message":
                        return nt.T.equals(tt.value, rt.value);
                    case "enum":
                        return scalarEquals(ScalarType.INT32, tt.value, rt.value);
                    case "scalar":
                        return scalarEquals(nt.T, tt.value, rt.value)
                    }
                    throw new Error(`oneof cannot contain ${nt.kind}`);
                case "map":
                    const it = Object.keys(tt).concat(Object.keys(rt));
                    switch (et.V.kind) {
                    case "message":
                        const at = et.V.T;
                        return it.every(ot=>at.equals(tt[ot], rt[ot]));
                    case "enum":
                        return it.every(ot=>scalarEquals(ScalarType.INT32, tt[ot], rt[ot]));
                    case "scalar":
                        const st = et.V.T;
                        return it.every(ot=>scalarEquals(st, tt[ot], rt[ot]))
                    }
                    break
                }
            }
            )
        },
        clone(j) {
            const _ = j.getType()
              , $ = new _
              , et = $;
            for (const tt of _.fields.byMember()) {
                const rt = j[tt.localName];
                let nt;
                if (tt.repeated)
                    nt = rt.map(cloneSingularField);
                else if (tt.kind == "map") {
                    nt = et[tt.localName];
                    for (const [it,at] of Object.entries(rt))
                        nt[it] = cloneSingularField(at)
                } else
                    tt.kind == "oneof" ? nt = tt.findField(rt.case) ? {
                        case: rt.case,
                        value: cloneSingularField(rt.value)
                    } : {
                        case: void 0
                    } : nt = cloneSingularField(rt);
                et[tt.localName] = nt
            }
            return $
        }
    }
}
function cloneSingularField(j) {
    if (j === void 0)
        return j;
    if (j instanceof Message$2)
        return j.clone();
    if (j instanceof Uint8Array) {
        const _ = new Uint8Array(j.byteLength);
        return _.set(j),
        _
    }
    return j
}
function toU8Arr(j) {
    return j instanceof Uint8Array ? j : new Uint8Array(j)
}
class InternalFieldList {
    constructor(_, $) {
        this._fields = _,
        this._normalizer = $
    }
    findJsonName(_) {
        if (!this.jsonNames) {
            const $ = {};
            for (const et of this.list())
                $[et.jsonName] = $[et.name] = et;
            this.jsonNames = $
        }
        return this.jsonNames[_]
    }
    find(_) {
        if (!this.numbers) {
            const $ = {};
            for (const et of this.list())
                $[et.no] = et;
            this.numbers = $
        }
        return this.numbers[_]
    }
    list() {
        return this.all || (this.all = this._normalizer(this._fields)),
        this.all
    }
    byNumber() {
        return this.numbersAsc || (this.numbersAsc = this.list().concat().sort((_,$)=>_.no - $.no)),
        this.numbersAsc
    }
    byMember() {
        if (!this.members) {
            this.members = [];
            const _ = this.members;
            let $;
            for (const et of this.list())
                et.oneof ? et.oneof !== $ && ($ = et.oneof,
                _.push($)) : _.push(et)
        }
        return this.members
    }
}
function localFieldName(j, _) {
    const $ = protoCamelCase(j);
    return _ ? $ : safeObjectProperty(safeMessageProperty($))
}
function localOneofName(j) {
    return localFieldName(j, !1)
}
const fieldJsonName = protoCamelCase;
function protoCamelCase(j) {
    let _ = !1;
    const $ = [];
    for (let et = 0; et < j.length; et++) {
        let tt = j.charAt(et);
        switch (tt) {
        case "_":
            _ = !0;
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            $.push(tt),
            _ = !1;
            break;
        default:
            _ && (_ = !1,
            tt = tt.toUpperCase()),
            $.push(tt);
            break
        }
    }
    return $.join("")
}
const reservedObjectProperties = new Set(["constructor", "toString", "toJSON", "valueOf"])
  , reservedMessageProperties = new Set(["getType", "clone", "equals", "fromBinary", "fromJson", "fromJsonString", "toBinary", "toJson", "toJsonString", "toObject"])
  , fallback = j=>`${j}$`
  , safeMessageProperty = j=>reservedMessageProperties.has(j) ? fallback(j) : j
  , safeObjectProperty = j=>reservedObjectProperties.has(j) ? fallback(j) : j;
class InternalOneofInfo {
    constructor(_) {
        this.kind = "oneof",
        this.repeated = !1,
        this.packed = !1,
        this.opt = !1,
        this.default = void 0,
        this.fields = [],
        this.name = _,
        this.localName = localOneofName(_)
    }
    addField(_) {
        assert$2(_.oneof === this, `field ${_.name} not one of ${this.name}`),
        this.fields.push(_)
    }
    findField(_) {
        if (!this._lookup) {
            this._lookup = Object.create(null);
            for (let $ = 0; $ < this.fields.length; $++)
                this._lookup[this.fields[$].localName] = this.fields[$]
        }
        return this._lookup[_]
    }
}
export const proto3 = makeProtoRuntime("proto3", makeJsonFormatProto3(), makeBinaryFormatProto3(), Object.assign(Object.assign({}, makeUtilCommon()), {
    newFieldList(j) {
        return new InternalFieldList(j,normalizeFieldInfosProto3)
    },
    initFields(j) {
        for (const _ of j.getType().fields.byMember()) {
            if (_.opt)
                continue;
            const $ = _.localName
              , et = j;
            if (_.repeated) {
                et[$] = [];
                continue
            }
            switch (_.kind) {
            case "oneof":
                et[$] = {
                    case: void 0
                };
                break;
            case "enum":
                et[$] = 0;
                break;
            case "map":
                et[$] = {};
                break;
            case "scalar":
                et[$] = scalarDefaultValue(_.T);
                break
            }
        }
    }
}));
function normalizeFieldInfosProto3(j) {
    var _, $, et;
    const tt = [];
    let rt;
    for (const nt of typeof j == "function" ? j() : j) {
        const it = nt;
        if (it.localName = localFieldName(nt.name, nt.oneof !== void 0),
        it.jsonName = (_ = nt.jsonName) !== null && _ !== void 0 ? _ : fieldJsonName(nt.name),
        it.repeated = ($ = nt.repeated) !== null && $ !== void 0 ? $ : !1,
        it.packed = (et = nt.packed) !== null && et !== void 0 ? et : nt.kind == "enum" || nt.kind == "scalar" && nt.T != ScalarType.BYTES && nt.T != ScalarType.STRING,
        nt.oneof !== void 0) {
            const at = typeof nt.oneof == "string" ? nt.oneof : nt.oneof.name;
            (!rt || rt.name != at) && (rt = new InternalOneofInfo(at)),
            it.oneof = rt,
            rt.addField(it)
        }
        tt.push(it)
    }
    return tt
}
function makeBinaryFormatProto2() {
    return Object.assign(Object.assign({}, makeBinaryFormatCommon()), {
        writeMessage(j, _, $) {
            const et = j.getType();
            let tt;
            try {
                for (tt of et.fields.byNumber()) {
                    let rt, nt = tt.repeated, it = tt.localName;
                    if (tt.oneof) {
                        const at = j[tt.oneof.localName];
                        if (at.case !== it)
                            continue;
                        rt = at.value
                    } else if (rt = j[it],
                    rt === void 0 && !tt.oneof && !tt.opt)
                        throw new Error(`cannot encode field ${et.typeName}.${tt.name} to binary: required field not set`);
                    switch (tt.kind) {
                    case "scalar":
                    case "enum":
                        let at = tt.kind == "enum" ? ScalarType.INT32 : tt.T;
                        if (nt)
                            if (tt.packed)
                                writePacked(_, at, tt.no, rt);
                            else
                                for (const st of rt)
                                    writeScalar$1(_, at, tt.no, st, !0);
                        else
                            rt !== void 0 && writeScalar$1(_, at, tt.no, rt, !0);
                        break;
                    case "message":
                        if (nt)
                            for (const st of rt)
                                writeMessageField(_, $, tt.T, tt.no, st);
                        else
                            writeMessageField(_, $, tt.T, tt.no, rt);
                        break;
                    case "map":
                        for (const [st,ot] of Object.entries(rt))
                            writeMapEntry(_, $, tt, st, ot);
                        break
                    }
                }
            } catch (rt) {
                let nt = tt ? `cannot encode field ${et.typeName}.${tt == null ? void 0 : tt.name} to binary` : `cannot encode message ${et.typeName} to binary`
                  , it = rt instanceof Error ? rt.message : String(rt);
                throw new Error(nt + (it.length > 0 ? `: ${it}` : ""))
            }
            return $.writeUnknownFields && this.writeUnknownFields(j, _),
            _
        }
    })
}
function makeJsonFormatProto2() {
    return makeJsonFormatCommon((j,_)=>function(et, tt, rt) {
        if (et.kind == "map") {
            const nt = {};
            switch (et.V.kind) {
            case "scalar":
                for (const [at,st] of Object.entries(tt)) {
                    const ot = _(et.V.T, st, !0);
                    assert$2(ot !== void 0),
                    nt[at.toString()] = ot
                }
                break;
            case "message":
                for (const [at,st] of Object.entries(tt))
                    nt[at.toString()] = st.toJson(rt);
                break;
            case "enum":
                const it = et.V.T;
                for (const [at,st] of Object.entries(tt)) {
                    assert$2(st === void 0 || typeof st == "number");
                    const ot = j(it, st, !0, rt.enumAsInteger);
                    assert$2(ot !== void 0),
                    nt[at.toString()] = ot
                }
                break
            }
            return rt.emitDefaultValues || Object.keys(nt).length > 0 ? nt : void 0
        } else if (et.repeated) {
            const nt = [];
            switch (et.kind) {
            case "scalar":
                for (let it = 0; it < tt.length; it++)
                    nt.push(_(et.T, tt[it], !0));
                break;
            case "enum":
                for (let it = 0; it < tt.length; it++)
                    nt.push(j(et.T, tt[it], !0, rt.enumAsInteger));
                break;
            case "message":
                for (let it = 0; it < tt.length; it++)
                    nt.push(tt[it].toJson(rt));
                break
            }
            return rt.emitDefaultValues || nt.length > 0 ? nt : void 0
        } else {
            if (tt === void 0) {
                if (!et.oneof && !et.opt)
                    throw "required field not set";
                return
            }
            switch (et.kind) {
            case "scalar":
                return _(et.T, tt, !0);
            case "enum":
                return j(et.T, tt, !0, rt.enumAsInteger);
            case "message":
                return wrapField(et.T, tt).toJson(rt)
            }
        }
    }
    )
}
function normalizeFieldInfosProto2(j) {
    var _, $, et;
    const tt = [];
    let rt;
    for (const nt of typeof j == "function" ? j() : j) {
        const it = nt;
        if (it.localName = localFieldName(nt.name, nt.oneof !== void 0),
        it.jsonName = (_ = nt.jsonName) !== null && _ !== void 0 ? _ : fieldJsonName(nt.name),
        it.repeated = ($ = nt.repeated) !== null && $ !== void 0 ? $ : !1,
        it.packed = (et = nt.packed) !== null && et !== void 0 ? et : !1,
        nt.oneof !== void 0) {
            const at = typeof nt.oneof == "string" ? nt.oneof : nt.oneof.name;
            (!rt || rt.name != at) && (rt = new InternalOneofInfo(at)),
            it.oneof = rt,
            rt.addField(it)
        }
        tt.push(it)
    }
    return tt
}
export const proto2 = makeProtoRuntime("proto2", makeJsonFormatProto2(), makeBinaryFormatProto2(), Object.assign(Object.assign({}, makeUtilCommon()), {
    newFieldList(j) {
        return new InternalFieldList(j,normalizeFieldInfosProto2)
    },
    initFields(j) {
        for (const _ of j.getType().fields.byMember()) {
            const $ = _.localName
              , et = j;
            if (_.repeated) {
                et[$] = [];
                continue
            }
            switch (_.kind) {
            case "oneof":
                et[$] = {
                    case: void 0
                };
                break;
            case "map":
                et[$] = {};
                break
            }
        }
    }
}));
export const Message = Message$2;
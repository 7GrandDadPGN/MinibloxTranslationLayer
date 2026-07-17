@EventListener
public void moveEvent(PacketEvent event) {
    if (event.packet instanceof C03PacketPlayer || event.packet instanceof C03PacketPlayer.C04PacketPlayerPosition || event.packet instanceof C03PacketPlayer.C05PacketPlayerLook || event.packet instanceof C03PacketPlayer.C06PacketPlayerPosLook) {
        PacketBuffer packetbuffer = new PacketBuffer(Unpooled.buffer());
        EntityPlayerSPAccessor access = (EntityPlayerSPAccessor)mc.thePlayer;
        packetbuffer.writeDouble(access.getLastReportedX());
        packetbuffer.writeDouble(access.getLastReportedY());
        packetbuffer.writeDouble(access.getLastReportedZ());
        packetbuffer.writeFloat(MovementData.event.yaw);
        packetbuffer.writeFloat(MovementData.event.pitch);
        packetbuffer.writeFloat(mc.thePlayer.movementInput.moveForward);
        packetbuffer.writeFloat(mc.thePlayer.movementInput.moveStrafe);
        packetbuffer.writeBoolean(mc.thePlayer.movementInput.jump);
        packetbuffer.writeBoolean(mc.thePlayer.movementInput.sneak);
        packetbuffer.writeBoolean(((C03PacketPlayer) event.packet).isOnGround());
        packetbuffer.writeBoolean(mc.thePlayer.isSprinting());
        mc.getNetHandler().addToSendQueue(new C17PacketCustomPayload("miniblox:movepacket", packetbuffer));
    }
}
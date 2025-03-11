import Handler from './../handler.js';
import { ClientSocket, SPacketClickWindow, SPacketConfirmTransaction, SPacketCloseWindow } from './../../main.js';
import { GUIS, SLOTS, WINDOW_NAMES, WINDOW_TYPES } from './../../types/guis.js';
import { translateItem, translateItemBack } from './../../utils.js';
let client, entity;

const self = class GuiHandler extends Handler {
	miniblox() {
		ClientSocket.on('CPacketOpenWindow', packet => {
			if (WINDOW_TYPES[packet.guiID]) {
				let translation = WINDOW_NAMES[packet.title];
				if (packet.guiID == 'furnace') translation = WINDOW_NAMES.Furnace;
				client.write('open_window', {
					windowId: packet.windowId,
					inventoryType: WINDOW_TYPES[packet.guiID],
					windowTitle: translation ?? JSON.stringify({text: packet.title ?? 'None'}),
					slotCount: packet.size ?? 0,
					entityId: entity.local.mcId
				});
			}
		});
		ClientSocket.on('CPacketOpenShop', packet => {
			const gui = GUIS[packet.type];
			if (gui) {
				const itemCount = Math.ceil(gui.items.length / 9) * 9;
				client.write('open_window', {
					windowId: 255,
					inventoryType: 'minecraft:container',
					windowTitle: JSON.stringify({text: gui.name}),
					slotCount: itemCount,
					entityId: entity.local.mcId
				});
				this.currentlyOpen = packet.type;

				const contents = Array(itemCount).fill({blockId: -1});
				for (let i = 0; i < gui.items.length; i++) {
					contents[i] = gui.items[i];
				}

				client.write('window_items', {
					windowId: 255,
					items: contents
				});
			}
		});
		ClientSocket.on('CPacketWindowItems', packet => {
			if (this.ignorePacket) {
				this.ignorePacket = false;
				return;
			}

			let items = Array(packet.items.length).fill({blockId: -1});
			for (let i = 0; i < packet.items.length; i++) {
				items[packet.windowId == 0 && SLOTS[i] != undefined ? SLOTS[i] : i] = translateItem(packet.items[i]);
			}
			client.write('window_items', {
				windowId: packet.windowId,
				items: items
			});
		});
		ClientSocket.on('CPacketWindowProperty', packet => client.write('craft_progress_bar', {
			windowId: packet.windowId,
			property: packet.varIndex,
			value: packet.varValue
		}));
		ClientSocket.on('CPacketSetSlot', packet => client.write('set_slot', {
			windowId: packet.windowId,
			slot: packet.windowId == 0 && SLOTS[packet.slot] != undefined ? SLOTS[packet.slot] : packet.slot,
			item: translateItem(packet.slotData)
		}));
		ClientSocket.on('CPacketCloseWindow', packet => client.write('close_window', {windowId: packet.windowId}));
		ClientSocket.on('CPacketConfirmTransaction', packet => client.write('transaction', {
			windowId: packet.windowId,
			action: packet.uid,
			accepted: packet.accepted
		}));
	}
	minecraft(mcClient) {
		client = mcClient;
		client.on('window_click', packet => {
			let slot = Number.parseInt(packet.slot) - 5;
			if (slot < 4) slot = 3 - slot;
			if (packet.windowId != 0) slot = Number.parseInt(packet.slot);
			if (packet.windowId == 255) {
				const gui = GUIS[this.currentlyOpen];
				if (gui) gui.command(packet.item, ClientSocket, client, gui);
				return;
			}
			ClientSocket.sendPacket(new SPacketClickWindow({
				windowId: packet.windowId,
				slotId: slot,
				button: packet.mouseButton,
				mode: packet.mode,
				itemStack: translateItemBack(packet.item),
				transactionId: packet.action
			}));
		});
		client.on('transaction', packet => {
			ClientSocket.sendPacket(new SPacketConfirmTransaction({
				windowId: packet.windowId,
				actionNumber: packet.action,
				accepted: packet.accepted
			}));
		});
		client.on('close_window', packet => ClientSocket.sendPacket(new SPacketCloseWindow({windowId: packet.windowId == 255 ? 0 : packet.windowId})));
	}
	cleanup(requeue) {
		client = requeue ? client : undefined;
		this.currentlyOpen = '';
	}
	obtainHandlers(handlers) {
		entity = handlers.entity;
	}
};

export default new self();
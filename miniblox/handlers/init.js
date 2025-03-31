export const entity = (await import("./impl/entity.js")).default;
export const world = (await import("./impl/world.js")).default;
export const tablist = (await import("./impl/tablist.js")).default;
export const gui = (await import("./impl/gui.js")).default;
export const scoreboard = (await import("./impl/scoreboard.js")).default;
export const misc = (await import("./impl/misc.js")).default;
export default {entity, world, tablist, gui, scoreboard, misc};
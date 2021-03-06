const FanSpeedControlCapability = require("../../../core/capabilities/FanSpeedControlCapability");

class ViomiFanSpeedControlCapability extends FanSpeedControlCapability {
    /**
     * @param {object} options
     * @param {import("../../../core/ValetudoRobot")|any} options.robot
     * @param {Array<import("../../../entities/core/ValetudoIntensityPreset")>} options.presets
     */
    constructor(options) {
        super(options);
        this.presets = options.presets;
    }
    /**
     * @returns {Array<string>}
     */
    getFanSpeedPresets() {
        return this.presets.map(p => p.name);
    }

    /**
     * @param {string} preset
     * @returns {Promise<void>}
     */
    async setFanSpeedPreset(preset) {
        const matchedPreset = this.presets.find(p => p.name === preset);

        if (matchedPreset) {
            await this.robot.sendCommand("set_suction", [matchedPreset.value], {});
        } else {
            throw new Error("Invalid Preset");
        }
    }

}

module.exports = ViomiFanSpeedControlCapability;

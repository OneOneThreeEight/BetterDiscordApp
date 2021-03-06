/**
 * BetterDiscord Radio Setting Struct
 * Copyright (c) 2015-present Jiiks/JsSucks - https://github.com/Jiiks / https://github.com/JsSucks
 * All rights reserved.
 * https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Setting from './basesetting';
import MultipleChoiceOption from '../multiplechoiceoption';

export default class RadioSetting extends Setting {

    constructor(args, ...merge) {
        super(args, ...merge);

        this.args.options = this.options.map(option => new MultipleChoiceOption(option));
    }

    /**
     * The current value.
     */
    get value() {
        const selected = this.selected_option;
        if (selected) return selected.value;
        return this.args.value;
    }

    set value(value) {
        const selected = this.options.find(option => option.value === value);
        if (selected) this.setValue(selected.id);
        else this.setValue(value);
    }

    /**
     * An array of MultipleChoiceOption objects.
     */
    get options() {
        return this.args.options || [];
    }

    /**
     * The currently selected option.
     */
    get selected_option() {
        return this.options.find(option => option.id === this.args.value);
    }

    set selected_option(selected_option) {
        this.args.value = selected_option.id;
    }

    /**
     * Whether the user should be allowed to choose multiple options.
     */
    get multi() {
        return this.args.multi;
    }

    /**
     * The minimum number of options the user may select if a multi select group.
     * This only restricts deselecting options when there is less or equal options selected than this, and does not ensure that this number of options are actually selected.
     */
    get min() {
        return this.multi ? this.args.min || 0 : 1;
    }

    /**
     * The maximum number of options the user may select if a multi select group.
     */
    get max() {
        return this.multi ? this.args.max || 0 : 1;
    }

    /**
     * Returns a representation of this setting's value in SCSS.
     * @return {String}
     */
    toSCSS() {
        return this.value;
    }

}

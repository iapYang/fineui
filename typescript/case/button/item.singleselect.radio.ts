import { BasicButton } from "../../base/single/button/button.basic";

export declare class SingleSelectRadioItem extends BasicButton {
    static xtype: string;
    static EVENT_CHANGE: string;

    doRedMark(...args: any[]): void;

    unRedMark(...args: any[]): void;
}

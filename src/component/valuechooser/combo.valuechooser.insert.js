/**
 * 简单的复选下拉框控件, 适用于数据量少的情况
 * 封装了字段处理逻辑
 */
BI.ValueChooserInsertCombo = BI.inherit(BI.AbstractValueChooser, {

    _defaultConfig: function () {
        return BI.extend(BI.ValueChooserInsertCombo.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-value-chooser-insert-combo",
            width: 200,
            height: 24,
            items: null,
            itemsCreator: BI.emptyFn,
            cache: true
        });
    },

    _init: function () {
        BI.ValueChooserInsertCombo.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        if (BI.isNotNull(o.items)) {
            this.items = o.items;
        }
        this.combo = BI.createWidget({
            type: "bi.multi_select_insert_combo",
            element: this,
            allowEdit: o.allowEdit,
            text: o.text,
            value: o.value,
            itemsCreator: BI.bind(this._itemsCreator, this),
            valueFormatter: BI.bind(this._valueFormatter, this),
            width: o.width,
            height: o.height,
            listeners: [{
                eventName: BI.MultiSelectCombo.EVENT_FOCUS,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_FOCUS);
                }
            }, {
                eventName: BI.MultiSelectCombo.EVENT_BLUR,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_BLUR);
                }
            }, {
                eventName: BI.MultiSelectCombo.EVENT_STOP,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_STOP);
                }
            }, {
                eventName: BI.MultiSelectCombo.EVENT_CLICK_ITEM,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_CLICK_ITEM);
                }
            }, {
                eventName: BI.MultiSelectCombo.EVENT_SEARCHING,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_SEARCHING);
                }
            }, {
                eventName: BI.MultiSelectCombo.EVENT_CONFIRM,
                action: function () {
                    self.fireEvent(BI.ValueChooserInsertCombo.EVENT_CONFIRM);
                }
            }]
        });
    },

    setValue: function (v) {
        this.combo.setValue(v);
    },

    getValue: function () {
        var val = this.combo.getValue() || {};
        return {
            type: val.type,
            value: val.value
        };
    },

    populate: function (items) {
        // 直接用combo的populate不会作用到AbstractValueChooser上
        this.items = items;
        this.combo.populate.apply(this.combo, arguments);
    }
});

BI.ValueChooserInsertCombo.EVENT_BLUR = "EVENT_BLUR";
BI.ValueChooserInsertCombo.EVENT_FOCUS = "EVENT_FOCUS";
BI.ValueChooserInsertCombo.EVENT_STOP = "EVENT_STOP";
BI.ValueChooserInsertCombo.EVENT_SEARCHING = "EVENT_SEARCHING";
BI.ValueChooserInsertCombo.EVENT_CLICK_ITEM = "EVENT_CLICK_ITEM";
BI.ValueChooserInsertCombo.EVENT_CONFIRM = "EVENT_CONFIRM";
BI.shortcut("bi.value_chooser_insert_combo", BI.ValueChooserInsertCombo);
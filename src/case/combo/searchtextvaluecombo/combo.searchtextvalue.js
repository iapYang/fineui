/**
 * Created by Windy on 2018/2/2.
 */
BI.SearchTextValueCombo = BI.inherit(BI.Widget, {

    props: {
        baseCls: "bi-search-text-value-combo",
        height: 24,
        text: "",
        items: [],
        tipType: "",
        warningTitle: ""
    },

    render: function () {
        var self = this, o = this.options;
        return {
            type: "bi.absolute",
            items: [{
                el: {
                    type: "bi.combo",
                    adjustLength: 2,
                    toggle: false,
                    ref: function () {
                        self.combo = this;
                    },
                    el: {
                        type: "bi.search_text_value_trigger",
                        ref: function () {
                            self.trigger = this;
                        },
                        items: o.items,
                        height: o.height - 2,
                        text: o.text,
                        value: o.value,
                        tipType: o.tipType,
                        warningTitle: o.warningTitle,
                        listeners: [{
                            eventName: BI.SearchTextValueTrigger.EVENT_CHANGE,
                            action: function () {
                                self.setValue(this.getValue());
                                self.combo.hideView();
                                self.fireEvent(BI.SearchTextValueCombo.EVENT_CHANGE);
                            }
                        }]
                    },
                    popup: {
                        el:{
                            type: "bi.text_value_combo_popup",
                            chooseType: BI.ButtonGroup.CHOOSE_TYPE_SINGLE,
                            value: o.value,
                            items: o.items,
                            ref: function () {
                                self.popup = this;
                                self.trigger.getSearcher().setAdapter(self.popup);
                            },
                            listeners: [{
                                eventName: BI.TextValueComboPopup.EVENT_CHANGE,
                                action: function () {
                                    self.setValue(this.getValue());
                                    self.combo.hideView();
                                    self.fireEvent(BI.SearchTextValueCombo.EVENT_CHANGE);
                                }
                            }]
                        },
                        maxHeight: 252
                    },
                    listeners: [{
                        eventName: BI.Combo.EVENT_AFTER_HIDEVIEW,
                        action: function () {
                            self.trigger.stopEditing();
                            self.element.removeClass("combo-show");
                        }
                    }, {
                        eventName: BI.Combo.EVENT_BEFORE_POPUPVIEW,
                        action: function () {
                            self.element.removeClass("combo-show").addClass("combo-show");
                            self.fireEvent(BI.SearchTextValueCombo.EVENT_BEFORE_POPUPVIEW);
                        }
                    }],
                    hideChecker: function (e) {
                        return self.triggerBtn.element.find(e.target).length === 0;
                    }
                },
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
            }, {
                el: {
                    type: "bi.trigger_icon_button",
                    cls: "trigger-icon-button",
                    ref: function () {
                        self.triggerBtn = this;
                    },
                    width: o.height,
                    height: o.height,
                    handler: function () {
                        if (self.combo.isViewVisible()) {
                            self.combo.hideView();
                        } else {
                            self.combo.showView();
                        }
                    }
                },
                right: 0,
                bottom: 0,
                top: 0
            }]
        };
    },

    mounted: function () {
        var o = this.options;
        if(BI.isKey(o.value)) {
            this._checkError(o.value);
        }
    },

    _checkError: function (v) {
        if(BI.isNotNull(v)) {
            v = BI.isArray(v) ? v : [v];
            var result = BI.find(this.options.items, function (idx, item) {
                return BI.contains(v, item.value);
            });
            if (BI.isNull(result)) {
                this.element.removeClass("combo-error").addClass("combo-error");
                this.trigger.attr("tipType", "warning");
            } else {
                this.element.removeClass("combo-error");
                this.trigger.attr("tipType", "success");
            }
        }
    },

    populate: function (items) {
        this.combo.populate(items);
    },

    setValue: function (v) {
        this.combo.setValue(v);
        this._checkError(v);
    },

    getValue: function () {
        var value = this.popup.getValue();
        return BI.isNull(value) ? [] : (BI.isArray(value) ? value : [value]);
    }
});
BI.SearchTextValueCombo.EVENT_CHANGE = "EVENT_CHANGE";
BI.SearchTextValueCombo.EVENT_BEFORE_POPUPVIEW = "EVENT_BEFORE_POPUPVIEW";
BI.shortcut("bi.search_text_value_combo", BI.SearchTextValueCombo);
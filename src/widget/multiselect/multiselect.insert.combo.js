/**
 *
 * @class BI.MultiSelectInsertCombo
 * @extends BI.Single
 */
BI.MultiSelectInsertCombo = BI.inherit(BI.Single, {

    _defaultConfig: function () {
        return BI.extend(BI.MultiSelectInsertCombo.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-multi-select-insert-combo",
            itemsCreator: BI.emptyFn,
            valueFormatter: BI.emptyFn,
            height: 24,
            attributes: {
                tabIndex: 0
            },
            allowEdit: true
        });
    },

    _init: function () {
        BI.MultiSelectInsertCombo.superclass._init.apply(this, arguments);
        var self = this, o = this.options;

        var assertShowValue = function () {
            if (BI.isKey(self._startValue)) {
                if(self.storeValue.type === BI.Selection.All) {
                    BI.remove(self.storeValue.value, self._startValue);
                    self.storeValue.assist = self.storeValue.assist || [];
                    self.storeValue.assist.pushDistinct(self._startValue);
                } else {
                    BI.pushDistinct(self.storeValue.value, self._startValue);
                    BI.remove(self.storeValue.assist, self._startValue);
                }
            }
            self.trigger.getSearcher().setState(self.storeValue);
            self.numberCounter.setButtonChecked(self.storeValue);
        };
        this.storeValue = o.value || {};
        // 标记正在请求数据
        this.requesting = false;

        this.trigger = BI.createWidget({
            type: "bi.multi_select_insert_trigger",
            allowEdit: o.allowEdit,
            height: o.height,
            text: o.text,
            watermark: o.watermark,
            // adapter: this.popup,
            masker: {
                offset: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 25
                }
            },
            valueFormatter: o.valueFormatter,
            itemsCreator: BI.bind(this._itemsCreator4Trigger, this),
            value: o.value
        });

        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_FOCUS, function () {
            self.fireEvent(BI.MultiSelectInsertCombo.EVENT_FOCUS);
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_BLUR, function () {
            self.fireEvent(BI.MultiSelectInsertCombo.EVENT_BLUR);
        });

        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_START, function () {
            self._setStartValue("");
            this.getSearcher().setValue(self.storeValue);
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_STOP, function () {
            self._setStartValue("");
            self.fireEvent(BI.MultiSelectInsertCombo.EVENT_STOP);
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_PAUSE, function () {
            if (this.getSearcher().hasMatched()) {
                self._addItem(assertShowValue, true);
            }
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_ADD_ITEM, function () {
            if (!this.getSearcher().hasMatched()) {
                self._addItem(assertShowValue);
                var addedValue = this.getSearcher().getKeyword();
                self._stopEditing();
                self.fireEvent(BI.MultiSelectInsertCombo.EVENT_ADD_ITEM, addedValue);
            }
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_SEARCHING, function (keywords) {
            var last = BI.last(keywords);
            keywords = BI.initial(keywords || []);
            if (keywords.length > 0) {
                self._joinKeywords(keywords, function () {
                    if (BI.isEndWithBlank(last)) {
                        self.combo.setValue(self.storeValue);
                        assertShowValue();
                        self.combo.populate();
                        self._setStartValue("");
                    } else {
                        self.combo.setValue(self.storeValue);
                        assertShowValue();
                    }
                });
            }
            self.fireEvent(BI.MultiSelectInsertCombo.EVENT_SEARCHING);
        });

        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_CHANGE, function (value, obj) {
            if (obj instanceof BI.MultiSelectBar) {
                self._joinAll(this.getValue(), function () {
                    assertShowValue();
                });
            } else {
                self._join(this.getValue(), function () {
                    assertShowValue();
                });
            }
            self.fireEvent(BI.MultiSelectInsertCombo.EVENT_CLICK_ITEM);
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_BEFORE_COUNTER_POPUPVIEW, function () {
            // counter的值随点击项的改变而改变, 点击counter的时候不需要setValue(counter会请求刷新计数)
            // 只需要更新查看面板的selectedValue用以请求已选数据
            self.numberCounter.updateSelectedValue(self.storeValue);
        });
        this.trigger.on(BI.MultiSelectInsertTrigger.EVENT_COUNTER_CLICK, function () {
            if (!self.combo.isViewVisible()) {
                self.combo.showView();
            }
        });

        this.combo = BI.createWidget({
            type: "bi.combo",
            toggle: !o.allowEdit,
            el: this.trigger,
            adjustLength: 1,
            container: o.container,
            popup: {
                type: "bi.multi_select_popup_view",
                ref: function () {
                    self.popup = this;
                    self.trigger.setAdapter(this);
                    self.numberCounter.setAdapter(this);
                },
                listeners: [{
                    eventName: BI.MultiSelectPopupView.EVENT_CHANGE,
                    action: function () {
                        self.storeValue = this.getValue();
                        self._adjust(function () {
                            assertShowValue();
                        });
                        self.fireEvent(BI.MultiSelectInsertCombo.EVENT_CLICK_ITEM);
                    }
                }, {
                    eventName: BI.MultiSelectPopupView.EVENT_CLICK_CONFIRM,
                    action: function () {
                        self._defaultState();
                    }
                }, {
                    eventName: BI.MultiSelectPopupView.EVENT_CLICK_CLEAR,
                    action: function () {
                        self.setValue();
                        self._defaultState();
                    }
                }],
                itemsCreator: o.itemsCreator,
                valueFormatter: o.valueFormatter,
                onLoaded: function () {
                    BI.nextTick(function () {
                        self.combo.adjustWidth();
                        self.combo.adjustHeight();
                        self.numberCounter.adjustView();
                        self.trigger.getSearcher().adjustView();
                    });
                }
            },
            value: o.value,
            hideChecker: function (e) {
                return triggerBtn.element.find(e.target).length === 0 &&
                    self.numberCounter.element.find(e.target).length === 0;
            }
        });

        this.combo.on(BI.Combo.EVENT_BEFORE_POPUPVIEW, function () {
            this.setValue(self.storeValue);
            BI.nextTick(function () {
                self._populate();
            });
        });
        // 当退出的时候如果还在处理请求，则等请求结束后再对外发确定事件
        this.wants2Quit = false;
        this.combo.on(BI.Combo.EVENT_AFTER_HIDEVIEW, function () {
            // important:关闭弹出时又可能没有退出编辑状态
            self._stopEditing();
            if (self.requesting === true) {
                self.wants2Quit = true;
            } else {
                self.fireEvent(BI.MultiSelectInsertCombo.EVENT_CONFIRM);
            }
        });

        var triggerBtn = BI.createWidget({
            type: "bi.trigger_icon_button",
            width: o.height,
            height: o.height,
            cls: "multi-select-trigger-icon-button"
        });
        triggerBtn.on(BI.TriggerIconButton.EVENT_CHANGE, function () {
            self.numberCounter.hideView();
            if (self.combo.isViewVisible()) {
                self.combo.hideView();
            } else {
                self.combo.showView();
            }
        });


        this.numberCounter = BI.createWidget({
            type: "bi.multi_select_check_selected_switcher",
            masker: {
                offset: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 25
                }
            },
            valueFormatter: o.valueFormatter,
            itemsCreator: BI.bind(this._itemsCreator4Trigger, this),
            value: o.value
        });
        this.numberCounter.on(BI.MultiSelectCheckSelectedSwitcher.EVENT_TRIGGER_CHANGE, function () {
            if (!self.combo.isViewVisible()) {
                self.combo.showView();
            }
        });
        this.numberCounter.on(BI.MultiSelectCheckSelectedSwitcher.EVENT_BEFORE_POPUPVIEW, function () {
            this.updateSelectedValue(self.storeValue);
        });

        this.numberCounter.on(BI.Events.VIEW, function (b) {
            BI.nextTick(function () {// 自动调整宽度
                self.trigger.refreshPlaceHolderWidth((b === true ? self.numberCounter.element.outerWidth() + 8 : 0));
            });
        });

        this.trigger.element.click(function (e) {
            if (self.trigger.element.find(e.target).length > 0) {
                self.numberCounter.hideView();
            }
        });


        BI.createWidget({
            type: "bi.absolute",
            element: this,
            items: [{
                el: this.combo,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }, {
                el: triggerBtn,
                right: 0,
                top: 0,
                bottom: 0
            }, {
                el: {
                    type: "bi.vertical_adapt",
                    items: [this.numberCounter]
                },
                right: o.height,
                top: 0,
                height: o.height,
            }]
        });
    },

    _itemsCreator4Trigger: function(op, callback) {
        var self = this, o = this.options;
        o.itemsCreator(op, function (res) {
            if (op.times === 1 && BI.isNotNull(op.keywords)) {
                // 预防trigger内部把当前的storeValue改掉
                self.trigger.setValue(BI.deepClone(self.getValue()));
            }
            callback.apply(self, arguments);
        });
    },

    _addItem: function (assertShowValue, matched) {
        var self = this;
        var keyword = matched ? this.trigger.getSearcher().getMatchedItemValue() : this.trigger.getSearcher().getKeyword();
        this._join({
            type: BI.Selection.Multi,
            value: [keyword]
        }, function () {
            // 如果在不选的状态下直接把该值添加进来
            if (self.storeValue.type === BI.Selection.Multi) {
                BI.pushDistinct(self.storeValue.value, keyword);
            }
            self.combo.setValue(self.storeValue);
            self._setStartValue(keyword);
            assertShowValue();
            self.populate();
            self._setStartValue("");
        });
    },

    _stopEditing: function() {
        this.trigger.stopEditing();
        this.numberCounter.hideView();
    },

    _defaultState: function () {
        this._stopEditing();
        this.combo.hideView();
    },

    _assertValue: function (val) {
        val || (val = {});
        val.type || (val.type = BI.Selection.Multi);
        val.value || (val.value = []);
    },

    _makeMap: function (values) {
        return BI.makeObject(values || []);
    },

    _joinKeywords: function (keywords, callback) {
        var self = this, o = this.options;
        this._assertValue(this.storeValue);
        this.requesting = true;
        o.itemsCreator({
            type: BI.MultiSelectInsertCombo.REQ_GET_ALL_DATA,
            keywords: keywords
        }, function (ob) {
            var values = BI.map(ob.items, "value");
            digest(values);
        });

        function digest (items) {
            var selectedMap = self._makeMap(items);
            BI.each(keywords, function (i, val) {
                if (BI.isNotNull(selectedMap[val])) {
                    self.storeValue.type === BI.Selection.Multi ? BI.pushDistinct(self.storeValue.value, val) : BI.remove(self.storeValue.value, val);
                }
            });
            self._adjust(callback);
        }
    },

    _joinAll: function (res, callback) {
        var self = this, o = this.options;
        this._assertValue(res);
        this.requesting = true;
        o.itemsCreator({
            type: BI.MultiSelectInsertCombo.REQ_GET_ALL_DATA,
            keywords: [this.trigger.getKey()]
        }, function (ob) {
            var items = BI.map(ob.items, "value");
            if (self.storeValue.type === res.type) {
                var change = false;
                var map = self._makeMap(self.storeValue.value);
                BI.each(items, function (i, v) {
                    if (BI.isNotNull(map[v])) {
                        change = true;
                        self.storeValue.assist && self.storeValue.assist.push(map[v]);
                        delete map[v];
                    }
                });
                change && (self.storeValue.value = BI.values(map));
                self._adjust(callback);
                return;
            }
            var selectedMap = self._makeMap(self.storeValue.value);
            var notSelectedMap = self._makeMap(res.value);
            var newItems = [];
            BI.each(items, function (i, item) {
                if (BI.isNotNull(selectedMap[items[i]])) {
                    self.storeValue.assist && self.storeValue.assist.push(selectedMap[items[i]]);
                    delete selectedMap[items[i]];
                }
                if (BI.isNull(notSelectedMap[items[i]])) {
                    BI.remove(self.storeValue.assist, item);
                    newItems.push(item);
                }
            });
            self.storeValue.value = newItems.concat(BI.values(selectedMap));
            self._adjust(callback);
        });
    },

    _adjust: function (callback) {
        var self = this, o = this.options;
        adjust();
        callback();
        function adjust () {
            if (self.wants2Quit === true) {
                self.fireEvent(BI.MultiSelectInsertCombo.EVENT_CONFIRM);
                self.wants2Quit = false;
            }
            self.requesting = false;
        }
    },

    _join: function (res, callback) {
        var self = this, o = this.options;
        this._assertValue(res);
        this._assertValue(this.storeValue);
        if (this.storeValue.type === res.type) {
            var map = this._makeMap(this.storeValue.value);
            BI.each(res.value, function (i, v) {
                if (!map[v]) {
                    self.storeValue.value.push(v);
                    // value更新的时候assist也需要更新
                    BI.remove(self.storeValue.assist, v);
                    map[v] = v;
                }
            });
            var change = false;
            BI.each(res.assist, function (i, v) {
                if (BI.isNotNull(map[v])) {
                    change = true;
                    self.storeValue.assist && self.storeValue.assist.push(map[v]);
                    delete map[v];
                }
            });
            change && (this.storeValue.value = BI.values(map));
            self._adjust(callback);
            return;
        }
        this._joinAll(res, callback);
    },

    _setStartValue: function (value) {
        this._startValue = value;
        this.popup.setStartValue(value);
    },

    _populate: function () {
        this.combo.populate.apply(this.combo, arguments);
    },

    showView:function (){
        this.combo.showView();
    },

    hideView:function (){
        this.combo.hideView();
    },

    setValue: function (v) {
        this.storeValue = v || {};
        this._assertValue(this.storeValue);
        this.combo.setValue(this.storeValue);
        this.numberCounter.setValue(this.storeValue);
    },

    getValue: function () {
        return BI.deepClone(this.storeValue);
    },

    populate: function () {
        this._populate.apply(this, arguments);
        this.numberCounter.populateSwitcher.apply(this.numberCounter, arguments);
    }
});

BI.extend(BI.MultiSelectInsertCombo, {
    REQ_GET_DATA_LENGTH: 1,
    REQ_GET_ALL_DATA: -1
});

BI.MultiSelectInsertCombo.EVENT_FOCUS = "EVENT_FOCUS";
BI.MultiSelectInsertCombo.EVENT_BLUR = "EVENT_BLUR";
BI.MultiSelectInsertCombo.EVENT_STOP = "EVENT_STOP";
BI.MultiSelectInsertCombo.EVENT_SEARCHING = "EVENT_SEARCHING";
BI.MultiSelectInsertCombo.EVENT_CLICK_ITEM = "EVENT_CLICK_ITEM";
BI.MultiSelectInsertCombo.EVENT_CONFIRM = "EVENT_CONFIRM";
BI.MultiSelectInsertCombo.EVENT_ADD_ITEM = "EVENT_ADD_ITEM";

BI.shortcut("bi.multi_select_insert_combo", BI.MultiSelectInsertCombo);

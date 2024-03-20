(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const is_client = typeof window !== "undefined";
    null && (is_client || noop);
    new Set;
    const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
    class ResizeObserverSingleton {
        _listeners="WeakMap" in globals ? new WeakMap : void 0;
        _observer=void 0;
        options;
        constructor(options) {
            this.options = options;
        }
        observe(element, listener) {
            this._listeners.set(element, listener);
            this._getObserver().observe(element, this.options);
            return () => {
                this._listeners.delete(element);
                this._observer.unobserve(element);
            };
        }
        _getObserver() {
            return this._observer ?? (this._observer = new ResizeObserver((entries => {
                for (const entry of entries) {
                    ResizeObserverSingleton.entries.set(entry.target, entry);
                    this._listeners.get(entry.target)?.(entry);
                }
            })));
        }
    }
    ResizeObserverSingleton.entries = "WeakMap" in globals ? new WeakMap : void 0;
    function dom_insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function dom_detach(node) {
        if (node.parentNode) node.parentNode.removeChild(node);
    }
    function dom_element(name) {
        return document.createElement(name);
    }
    function dom_attr(node, attribute, value) {
        if (value == null) node.removeAttribute(attribute); else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
    }
    new ResizeObserverSingleton({
        box: "content-box"
    });
    new ResizeObserverSingleton({
        box: "border-box"
    });
    new ResizeObserverSingleton({
        box: "device-pixel-content-box"
    });
    function get_custom_elements_slots(element) {
        const result = {};
        element.childNodes.forEach((node => {
            result[node.slot || "default"] = true;
        }));
        return result;
    }
    new Map;
    Promise.resolve();
    new Set;
    new Set;
    const _boolean_attributes = [ "allowfullscreen", "allowpaymentrequest", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "hidden", "inert", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected" ];
    new Set([ ..._boolean_attributes ]);
    let SvelteElement;
    if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
        $$ctor;
        $$s;
        $$c;
        $$cn=false;
        $$d={};
        $$r=false;
        $$p_d={};
        $$l={};
        $$l_u=new Map;
        constructor($$componentCtor, $$slots, use_shadow_dom) {
            super();
            this.$$ctor = $$componentCtor;
            this.$$s = $$slots;
            if (use_shadow_dom) this.attachShadow({
                mode: "open"
            });
        }
        addEventListener(type, listener, options) {
            this.$$l[type] = this.$$l[type] || [];
            this.$$l[type].push(listener);
            if (this.$$c) {
                const unsub = this.$$c.$on(type, listener);
                this.$$l_u.set(listener, unsub);
            }
            super.addEventListener(type, listener, options);
        }
        removeEventListener(type, listener, options) {
            super.removeEventListener(type, listener, options);
            if (this.$$c) {
                const unsub = this.$$l_u.get(listener);
                if (unsub) {
                    unsub();
                    this.$$l_u.delete(listener);
                }
            }
        }
        async connectedCallback() {
            this.$$cn = true;
            if (!this.$$c) {
                await Promise.resolve();
                if (!this.$$cn || this.$$c) return;
                function create_slot(name) {
                    return () => {
                        let node;
                        const obj = {
                            c: function create() {
                                node = dom_element("slot");
                                if (name !== "default") dom_attr(node, "name", name);
                            },
                            m: function mount(target, anchor) {
                                dom_insert(target, node, anchor);
                            },
                            d: function destroy(detaching) {
                                if (detaching) dom_detach(node);
                            }
                        };
                        return obj;
                    };
                }
                const $$slots = {};
                const existing_slots = get_custom_elements_slots(this);
                for (const name of this.$$s) if (name in existing_slots) $$slots[name] = [ create_slot(name) ];
                for (const attribute of this.attributes) {
                    const name = this.$$g_p(attribute.name);
                    if (!(name in this.$$d)) this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
                }
                for (const key in this.$$p_d) if (!(key in this.$$d) && this[key] !== void 0) {
                    this.$$d[key] = this[key];
                    delete this[key];
                }
                this.$$c = new this.$$ctor({
                    target: this.shadowRoot || this,
                    props: {
                        ...this.$$d,
                        $$slots,
                        $$scope: {
                            ctx: []
                        }
                    }
                });
                const reflect_attributes = () => {
                    this.$$r = true;
                    for (const key in this.$$p_d) {
                        this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
                        if (this.$$p_d[key].reflect) {
                            const attribute_value = get_custom_element_value(key, this.$$d[key], this.$$p_d, "toAttribute");
                            if (attribute_value == null) this.removeAttribute(this.$$p_d[key].attribute || key); else this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                        }
                    }
                    this.$$r = false;
                };
                this.$$c.$$.after_update.push(reflect_attributes);
                reflect_attributes();
                for (const type in this.$$l) for (const listener of this.$$l[type]) {
                    const unsub = this.$$c.$on(type, listener);
                    this.$$l_u.set(listener, unsub);
                }
                this.$$l = {};
            }
        }
        attributeChangedCallback(attr, _oldValue, newValue) {
            if (this.$$r) return;
            attr = this.$$g_p(attr);
            this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
            this.$$c?.$set({
                [attr]: this.$$d[attr]
            });
        }
        disconnectedCallback() {
            this.$$cn = false;
            Promise.resolve().then((() => {
                if (!this.$$cn) {
                    this.$$c.$destroy();
                    this.$$c = void 0;
                }
            }));
        }
        $$g_p(attribute_name) {
            return Object.keys(this.$$p_d).find((key => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)) || attribute_name;
        }
    };
    function get_custom_element_value(prop, value, props_definition, transform) {
        const type = props_definition[prop]?.type;
        value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
        if (!transform || !props_definition[prop]) return value; else if (transform === "toAttribute") switch (type) {
          case "Object":
          case "Array":
            return value == null ? null : JSON.stringify(value);

          case "Boolean":
            return value ? "" : null;

          case "Number":
            return value == null ? null : value;

          default:
            return value;
        } else switch (type) {
          case "Object":
          case "Array":
            return value && JSON.parse(value);

          case "Boolean":
            return value;

          case "Number":
            return value != null ? +value : value;

          default:
            return value;
        }
    }
    function symbol() {
        return Symbol("ec");
    }
    symbol();
    new EventCalendar(document.getElementById("ec"), {
        locale: "de",
        view: "timeGridWeek",
        headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: ""
        },
        buttonText: {
            today: "jetzt"
        },
        scrollTime: "09:00:00",
        events: script_createEvents(),
        views: {
            timeGridWeek: {
                pointer: true
            },
            resourceTimeGridWeek: {
                pointer: true
            }
        },
        dayMaxEvents: true,
        nowIndicator: true,
        selectable: true
    });
    function script_createEvents() {
        let days = [];
        for (let i = 0; i < 7; ++i) {
            let day = new Date;
            let diff = i - day.getDay();
            day.setDate(day.getDate() + diff);
            days[i] = day.getFullYear() + "-" + _pad(day.getMonth() + 1) + "-" + _pad(day.getDate());
        }
        return [];
    }
    function _pad(num) {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? "0" : "") + norm;
    }
    window["FLS"] = true;
    isWebp();
})();
import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// ../../../node_modules/zone.js/dist/zone.js
var require_zone = __commonJS({
  "../../../node_modules/zone.js/dist/zone.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory() : typeof define === "function" && define.amd ? define(factory) : factory();
    })(exports, (function() {
      "use strict";
      var Zone$1 = (function(global2) {
        var performance = global2["performance"];
        function mark(name) {
          performance && performance["mark"] && performance["mark"](name);
        }
        function performanceMeasure(name, label) {
          performance && performance["measure"] && performance["measure"](name, label);
        }
        mark("Zone");
        var checkDuplicate = global2["__zone_symbol__forceDuplicateZoneCheck"] === true;
        if (global2["Zone"]) {
          if (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function") {
            throw new Error("Zone already loaded.");
          } else {
            return global2["Zone"];
          }
        }
        var Zone2 = (
          /** @class */
          (function() {
            function Zone3(parent, zoneSpec) {
              this._parent = parent;
              this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
              this._properties = zoneSpec && zoneSpec.properties || {};
              this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
            }
            Zone3.assertZonePatched = function() {
              if (global2["Promise"] !== patches["ZoneAwarePromise"]) {
                throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
              }
            };
            Object.defineProperty(Zone3, "root", {
              get: function() {
                var zone = Zone3.current;
                while (zone.parent) {
                  zone = zone.parent;
                }
                return zone;
              },
              enumerable: true,
              configurable: true
            });
            Object.defineProperty(Zone3, "current", {
              get: function() {
                return _currentZoneFrame.zone;
              },
              enumerable: true,
              configurable: true
            });
            Object.defineProperty(Zone3, "currentTask", {
              get: function() {
                return _currentTask;
              },
              enumerable: true,
              configurable: true
            });
            Zone3.__load_patch = function(name, fn) {
              if (patches.hasOwnProperty(name)) {
                if (checkDuplicate) {
                  throw Error("Already loaded patch: " + name);
                }
              } else if (!global2["__Zone_disable_" + name]) {
                var perfName = "Zone:" + name;
                mark(perfName);
                patches[name] = fn(global2, Zone3, _api);
                performanceMeasure(perfName, perfName);
              }
            };
            Object.defineProperty(Zone3.prototype, "parent", {
              get: function() {
                return this._parent;
              },
              enumerable: true,
              configurable: true
            });
            Object.defineProperty(Zone3.prototype, "name", {
              get: function() {
                return this._name;
              },
              enumerable: true,
              configurable: true
            });
            Zone3.prototype.get = function(key) {
              var zone = this.getZoneWith(key);
              if (zone)
                return zone._properties[key];
            };
            Zone3.prototype.getZoneWith = function(key) {
              var current = this;
              while (current) {
                if (current._properties.hasOwnProperty(key)) {
                  return current;
                }
                current = current._parent;
              }
              return null;
            };
            Zone3.prototype.fork = function(zoneSpec) {
              if (!zoneSpec)
                throw new Error("ZoneSpec required!");
              return this._zoneDelegate.fork(this, zoneSpec);
            };
            Zone3.prototype.wrap = function(callback, source) {
              if (typeof callback !== "function") {
                throw new Error("Expecting function got: " + callback);
              }
              var _callback = this._zoneDelegate.intercept(this, callback, source);
              var zone = this;
              return function() {
                return zone.runGuarded(_callback, this, arguments, source);
              };
            };
            Zone3.prototype.run = function(callback, applyThis, applyArgs, source) {
              _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
              try {
                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
              } finally {
                _currentZoneFrame = _currentZoneFrame.parent;
              }
            };
            Zone3.prototype.runGuarded = function(callback, applyThis, applyArgs, source) {
              if (applyThis === void 0) {
                applyThis = null;
              }
              _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
              try {
                try {
                  return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                } catch (error) {
                  if (this._zoneDelegate.handleError(this, error)) {
                    throw error;
                  }
                }
              } finally {
                _currentZoneFrame = _currentZoneFrame.parent;
              }
            };
            Zone3.prototype.runTask = function(task, applyThis, applyArgs) {
              if (task.zone != this) {
                throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
              }
              if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                return;
              }
              var reEntryGuard = task.state != running;
              reEntryGuard && task._transitionTo(running, scheduled);
              task.runCount++;
              var previousTask = _currentTask;
              _currentTask = task;
              _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
              try {
                if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                  task.cancelFn = void 0;
                }
                try {
                  return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                } catch (error) {
                  if (this._zoneDelegate.handleError(this, error)) {
                    throw error;
                  }
                }
              } finally {
                if (task.state !== notScheduled && task.state !== unknown) {
                  if (task.type == eventTask || task.data && task.data.isPeriodic) {
                    reEntryGuard && task._transitionTo(scheduled, running);
                  } else {
                    task.runCount = 0;
                    this._updateTaskCount(task, -1);
                    reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
                  }
                }
                _currentZoneFrame = _currentZoneFrame.parent;
                _currentTask = previousTask;
              }
            };
            Zone3.prototype.scheduleTask = function(task) {
              if (task.zone && task.zone !== this) {
                var newZone = this;
                while (newZone) {
                  if (newZone === task.zone) {
                    throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                  }
                  newZone = newZone.parent;
                }
              }
              task._transitionTo(scheduling, notScheduled);
              var zoneDelegates = [];
              task._zoneDelegates = zoneDelegates;
              task._zone = this;
              try {
                task = this._zoneDelegate.scheduleTask(this, task);
              } catch (err) {
                task._transitionTo(unknown, scheduling, notScheduled);
                this._zoneDelegate.handleError(this, err);
                throw err;
              }
              if (task._zoneDelegates === zoneDelegates) {
                this._updateTaskCount(task, 1);
              }
              if (task.state == scheduling) {
                task._transitionTo(scheduled, scheduling);
              }
              return task;
            };
            Zone3.prototype.scheduleMicroTask = function(source, callback, data, customSchedule) {
              return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
            };
            Zone3.prototype.scheduleMacroTask = function(source, callback, data, customSchedule, customCancel) {
              return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
            };
            Zone3.prototype.scheduleEventTask = function(source, callback, data, customSchedule, customCancel) {
              return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
            };
            Zone3.prototype.cancelTask = function(task) {
              if (task.zone != this)
                throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
              task._transitionTo(canceling, scheduled, running);
              try {
                this._zoneDelegate.cancelTask(this, task);
              } catch (err) {
                task._transitionTo(unknown, canceling);
                this._zoneDelegate.handleError(this, err);
                throw err;
              }
              this._updateTaskCount(task, -1);
              task._transitionTo(notScheduled, canceling);
              task.runCount = 0;
              return task;
            };
            Zone3.prototype._updateTaskCount = function(task, count) {
              var zoneDelegates = task._zoneDelegates;
              if (count == -1) {
                task._zoneDelegates = null;
              }
              for (var i = 0; i < zoneDelegates.length; i++) {
                zoneDelegates[i]._updateTaskCount(task.type, count);
              }
            };
            Zone3.__symbol__ = __symbol__;
            return Zone3;
          })()
        );
        var DELEGATE_ZS = {
          name: "",
          onHasTask: function(delegate, _, target, hasTaskState) {
            return delegate.hasTask(target, hasTaskState);
          },
          onScheduleTask: function(delegate, _, target, task) {
            return delegate.scheduleTask(target, task);
          },
          onInvokeTask: function(delegate, _, target, task, applyThis, applyArgs) {
            return delegate.invokeTask(target, task, applyThis, applyArgs);
          },
          onCancelTask: function(delegate, _, target, task) {
            return delegate.cancelTask(target, task);
          }
        };
        var ZoneDelegate = (
          /** @class */
          (function() {
            function ZoneDelegate2(zone, parentDelegate, zoneSpec) {
              this._taskCounts = { "microTask": 0, "macroTask": 0, "eventTask": 0 };
              this.zone = zone;
              this._parentDelegate = parentDelegate;
              this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
              this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
              this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate.zone);
              this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
              this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
              this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate.zone);
              this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
              this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
              this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate.zone);
              this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
              this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
              this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate.zone);
              this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
              this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
              this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate.zone);
              this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
              this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
              this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate.zone);
              this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
              this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
              this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate.zone);
              this._hasTaskZS = null;
              this._hasTaskDlgt = null;
              this._hasTaskDlgtOwner = null;
              this._hasTaskCurrZone = null;
              var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
              var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
              if (zoneSpecHasTask || parentHasTask) {
                this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                this._hasTaskDlgt = parentDelegate;
                this._hasTaskDlgtOwner = this;
                this._hasTaskCurrZone = zone;
                if (!zoneSpec.onScheduleTask) {
                  this._scheduleTaskZS = DELEGATE_ZS;
                  this._scheduleTaskDlgt = parentDelegate;
                  this._scheduleTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onInvokeTask) {
                  this._invokeTaskZS = DELEGATE_ZS;
                  this._invokeTaskDlgt = parentDelegate;
                  this._invokeTaskCurrZone = this.zone;
                }
                if (!zoneSpec.onCancelTask) {
                  this._cancelTaskZS = DELEGATE_ZS;
                  this._cancelTaskDlgt = parentDelegate;
                  this._cancelTaskCurrZone = this.zone;
                }
              }
            }
            ZoneDelegate2.prototype.fork = function(targetZone, zoneSpec) {
              return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone2(targetZone, zoneSpec);
            };
            ZoneDelegate2.prototype.intercept = function(targetZone, callback, source) {
              return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
            };
            ZoneDelegate2.prototype.invoke = function(targetZone, callback, applyThis, applyArgs, source) {
              return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
            };
            ZoneDelegate2.prototype.handleError = function(targetZone, error) {
              return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
            };
            ZoneDelegate2.prototype.scheduleTask = function(targetZone, task) {
              var returnTask = task;
              if (this._scheduleTaskZS) {
                if (this._hasTaskZS) {
                  returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                }
                returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                if (!returnTask)
                  returnTask = task;
              } else {
                if (task.scheduleFn) {
                  task.scheduleFn(task);
                } else if (task.type == microTask) {
                  scheduleMicroTask(task);
                } else {
                  throw new Error("Task is missing scheduleFn.");
                }
              }
              return returnTask;
            };
            ZoneDelegate2.prototype.invokeTask = function(targetZone, task, applyThis, applyArgs) {
              return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
            };
            ZoneDelegate2.prototype.cancelTask = function(targetZone, task) {
              var value;
              if (this._cancelTaskZS) {
                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
              } else {
                if (!task.cancelFn) {
                  throw Error("Task is not cancelable");
                }
                value = task.cancelFn(task);
              }
              return value;
            };
            ZoneDelegate2.prototype.hasTask = function(targetZone, isEmpty) {
              try {
                this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
              } catch (err) {
                this.handleError(targetZone, err);
              }
            };
            ZoneDelegate2.prototype._updateTaskCount = function(type, count) {
              var counts = this._taskCounts;
              var prev = counts[type];
              var next = counts[type] = prev + count;
              if (next < 0) {
                throw new Error("More tasks executed then were scheduled.");
              }
              if (prev == 0 || next == 0) {
                var isEmpty = {
                  microTask: counts["microTask"] > 0,
                  macroTask: counts["macroTask"] > 0,
                  eventTask: counts["eventTask"] > 0,
                  change: type
                };
                this.hasTask(this.zone, isEmpty);
              }
            };
            return ZoneDelegate2;
          })()
        );
        var ZoneTask = (
          /** @class */
          (function() {
            function ZoneTask2(type, source, callback, options2, scheduleFn, cancelFn) {
              this._zone = null;
              this.runCount = 0;
              this._zoneDelegates = null;
              this._state = "notScheduled";
              this.type = type;
              this.source = source;
              this.data = options2;
              this.scheduleFn = scheduleFn;
              this.cancelFn = cancelFn;
              this.callback = callback;
              var self2 = this;
              if (type === eventTask && options2 && options2.useG) {
                this.invoke = ZoneTask2.invokeTask;
              } else {
                this.invoke = function() {
                  return ZoneTask2.invokeTask.call(global2, self2, this, arguments);
                };
              }
            }
            ZoneTask2.invokeTask = function(task, target, args) {
              if (!task) {
                task = this;
              }
              _numberOfNestedTaskFrames++;
              try {
                task.runCount++;
                return task.zone.runTask(task, target, args);
              } finally {
                if (_numberOfNestedTaskFrames == 1) {
                  drainMicroTaskQueue();
                }
                _numberOfNestedTaskFrames--;
              }
            };
            Object.defineProperty(ZoneTask2.prototype, "zone", {
              get: function() {
                return this._zone;
              },
              enumerable: true,
              configurable: true
            });
            Object.defineProperty(ZoneTask2.prototype, "state", {
              get: function() {
                return this._state;
              },
              enumerable: true,
              configurable: true
            });
            ZoneTask2.prototype.cancelScheduleRequest = function() {
              this._transitionTo(notScheduled, scheduling);
            };
            ZoneTask2.prototype._transitionTo = function(toState, fromState1, fromState2) {
              if (this._state === fromState1 || this._state === fromState2) {
                this._state = toState;
                if (toState == notScheduled) {
                  this._zoneDelegates = null;
                }
              } else {
                throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? " or '" + fromState2 + "'" : "") + ", was '" + this._state + "'.");
              }
            };
            ZoneTask2.prototype.toString = function() {
              if (this.data && typeof this.data.handleId !== "undefined") {
                return this.data.handleId.toString();
              } else {
                return Object.prototype.toString.call(this);
              }
            };
            ZoneTask2.prototype.toJSON = function() {
              return {
                type: this.type,
                state: this.state,
                source: this.source,
                zone: this.zone.name,
                runCount: this.runCount
              };
            };
            return ZoneTask2;
          })()
        );
        var symbolSetTimeout = __symbol__("setTimeout");
        var symbolPromise = __symbol__("Promise");
        var symbolThen = __symbol__("then");
        var _microTaskQueue = [];
        var _isDrainingMicrotaskQueue = false;
        var nativeMicroTaskQueuePromise;
        function scheduleMicroTask(task) {
          if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
            if (!nativeMicroTaskQueuePromise) {
              if (global2[symbolPromise]) {
                nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0);
              }
            }
            if (nativeMicroTaskQueuePromise) {
              var nativeThen = nativeMicroTaskQueuePromise[symbolThen];
              if (!nativeThen) {
                nativeThen = nativeMicroTaskQueuePromise["then"];
              }
              nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
            } else {
              global2[symbolSetTimeout](drainMicroTaskQueue, 0);
            }
          }
          task && _microTaskQueue.push(task);
        }
        function drainMicroTaskQueue() {
          if (!_isDrainingMicrotaskQueue) {
            _isDrainingMicrotaskQueue = true;
            while (_microTaskQueue.length) {
              var queue = _microTaskQueue;
              _microTaskQueue = [];
              for (var i = 0; i < queue.length; i++) {
                var task = queue[i];
                try {
                  task.zone.runTask(task, null, null);
                } catch (error) {
                  _api.onUnhandledError(error);
                }
              }
            }
            _api.microtaskDrainDone();
            _isDrainingMicrotaskQueue = false;
          }
        }
        var NO_ZONE = { name: "NO ZONE" };
        var notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
        var microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
        var patches = {};
        var _api = {
          symbol: __symbol__,
          currentZoneFrame: function() {
            return _currentZoneFrame;
          },
          onUnhandledError: noop,
          microtaskDrainDone: noop,
          scheduleMicroTask,
          showUncaughtError: function() {
            return !Zone2[__symbol__("ignoreConsoleErrorUncaughtError")];
          },
          patchEventTarget: function() {
            return [];
          },
          patchOnProperties: noop,
          patchMethod: function() {
            return noop;
          },
          bindArguments: function() {
            return [];
          },
          patchThen: function() {
            return noop;
          },
          setNativePromise: function(NativePromise) {
            if (NativePromise && typeof NativePromise.resolve === "function") {
              nativeMicroTaskQueuePromise = NativePromise.resolve(0);
            }
          }
        };
        var _currentZoneFrame = { parent: null, zone: new Zone2(null, null) };
        var _currentTask = null;
        var _numberOfNestedTaskFrames = 0;
        function noop() {
        }
        function __symbol__(name) {
          return "__zone_symbol__" + name;
        }
        performanceMeasure("Zone", "Zone");
        return global2["Zone"] = Zone2;
      })(typeof window !== "undefined" && window || typeof self !== "undefined" && self || global);
      var __values = function(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
          next: function() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      };
      Zone.__load_patch("ZoneAwarePromise", function(global2, Zone2, api) {
        var ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
        var ObjectDefineProperty2 = Object.defineProperty;
        function readableObjectToString(obj) {
          if (obj && obj.toString === Object.prototype.toString) {
            var className = obj.constructor && obj.constructor.name;
            return (className ? className : "") + ": " + JSON.stringify(obj);
          }
          return obj ? obj.toString() : Object.prototype.toString.call(obj);
        }
        var __symbol__ = api.symbol;
        var _uncaughtPromiseErrors = [];
        var symbolPromise = __symbol__("Promise");
        var symbolThen = __symbol__("then");
        var creationTrace = "__creationTrace__";
        api.onUnhandledError = function(e) {
          if (api.showUncaughtError()) {
            var rejection = e && e.rejection;
            if (rejection) {
              console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
            } else {
              console.error(e);
            }
          }
        };
        api.microtaskDrainDone = function() {
          while (_uncaughtPromiseErrors.length) {
            var _loop_1 = function() {
              var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
              try {
                uncaughtPromiseError.zone.runGuarded(function() {
                  throw uncaughtPromiseError;
                });
              } catch (error) {
                handleUnhandledRejection(error);
              }
            };
            while (_uncaughtPromiseErrors.length) {
              _loop_1();
            }
          }
        };
        var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__("unhandledPromiseRejectionHandler");
        function handleUnhandledRejection(e) {
          api.onUnhandledError(e);
          try {
            var handler = Zone2[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
            if (handler && typeof handler === "function") {
              handler.call(this, e);
            }
          } catch (err) {
          }
        }
        function isThenable(value) {
          return value && value.then;
        }
        function forwardResolution(value) {
          return value;
        }
        function forwardRejection(rejection) {
          return ZoneAwarePromise.reject(rejection);
        }
        var symbolState = __symbol__("state");
        var symbolValue = __symbol__("value");
        var symbolFinally = __symbol__("finally");
        var symbolParentPromiseValue = __symbol__("parentPromiseValue");
        var symbolParentPromiseState = __symbol__("parentPromiseState");
        var source = "Promise.then";
        var UNRESOLVED = null;
        var RESOLVED = true;
        var REJECTED = false;
        var REJECTED_NO_CATCH = 0;
        function makeResolver(promise, state) {
          return function(v) {
            try {
              resolvePromise(promise, state, v);
            } catch (err) {
              resolvePromise(promise, false, err);
            }
          };
        }
        var once = function() {
          var wasCalled = false;
          return function wrapper(wrappedFunction) {
            return function() {
              if (wasCalled) {
                return;
              }
              wasCalled = true;
              wrappedFunction.apply(null, arguments);
            };
          };
        };
        var TYPE_ERROR = "Promise resolved with itself";
        var CURRENT_TASK_TRACE_SYMBOL = __symbol__("currentTaskTrace");
        function resolvePromise(promise, state, value) {
          var onceWrapper = once();
          if (promise === value) {
            throw new TypeError(TYPE_ERROR);
          }
          if (promise[symbolState] === UNRESOLVED) {
            var then = null;
            try {
              if (typeof value === "object" || typeof value === "function") {
                then = value && value.then;
              }
            } catch (err) {
              onceWrapper(function() {
                resolvePromise(promise, false, err);
              })();
              return promise;
            }
            if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
              clearRejectedNoCatch(value);
              resolvePromise(promise, value[symbolState], value[symbolValue]);
            } else if (state !== REJECTED && typeof then === "function") {
              try {
                then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
              } catch (err) {
                onceWrapper(function() {
                  resolvePromise(promise, false, err);
                })();
              }
            } else {
              promise[symbolState] = state;
              var queue = promise[symbolValue];
              promise[symbolValue] = value;
              if (promise[symbolFinally] === symbolFinally) {
                if (state === RESOLVED) {
                  promise[symbolState] = promise[symbolParentPromiseState];
                  promise[symbolValue] = promise[symbolParentPromiseValue];
                }
              }
              if (state === REJECTED && value instanceof Error) {
                var trace = Zone2.currentTask && Zone2.currentTask.data && Zone2.currentTask.data[creationTrace];
                if (trace) {
                  ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                }
              }
              for (var i = 0; i < queue.length; ) {
                scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
              }
              if (queue.length == 0 && state == REJECTED) {
                promise[symbolState] = REJECTED_NO_CATCH;
                try {
                  throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
                } catch (err) {
                  var error_1 = err;
                  error_1.rejection = value;
                  error_1.promise = promise;
                  error_1.zone = Zone2.current;
                  error_1.task = Zone2.currentTask;
                  _uncaughtPromiseErrors.push(error_1);
                  api.scheduleMicroTask();
                }
              }
            }
          }
          return promise;
        }
        var REJECTION_HANDLED_HANDLER = __symbol__("rejectionHandledHandler");
        function clearRejectedNoCatch(promise) {
          if (promise[symbolState] === REJECTED_NO_CATCH) {
            try {
              var handler = Zone2[REJECTION_HANDLED_HANDLER];
              if (handler && typeof handler === "function") {
                handler.call(this, { rejection: promise[symbolValue], promise });
              }
            } catch (err) {
            }
            promise[symbolState] = REJECTED;
            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
              if (promise === _uncaughtPromiseErrors[i].promise) {
                _uncaughtPromiseErrors.splice(i, 1);
              }
            }
          }
        }
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
          clearRejectedNoCatch(promise);
          var promiseState = promise[symbolState];
          var delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
          zone.scheduleMicroTask(source, function() {
            try {
              var parentPromiseValue = promise[symbolValue];
              var isFinallyPromise = chainPromise && symbolFinally === chainPromise[symbolFinally];
              if (isFinallyPromise) {
                chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                chainPromise[symbolParentPromiseState] = promiseState;
              }
              var value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
              resolvePromise(chainPromise, true, value);
            } catch (error) {
              resolvePromise(chainPromise, false, error);
            }
          }, chainPromise);
        }
        var ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
        var ZoneAwarePromise = (
          /** @class */
          (function() {
            function ZoneAwarePromise2(executor) {
              var promise = this;
              if (!(promise instanceof ZoneAwarePromise2)) {
                throw new Error("Must be an instanceof Promise.");
              }
              promise[symbolState] = UNRESOLVED;
              promise[symbolValue] = [];
              try {
                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
              } catch (error) {
                resolvePromise(promise, false, error);
              }
            }
            ZoneAwarePromise2.toString = function() {
              return ZONE_AWARE_PROMISE_TO_STRING;
            };
            ZoneAwarePromise2.resolve = function(value) {
              return resolvePromise(new this(null), RESOLVED, value);
            };
            ZoneAwarePromise2.reject = function(error) {
              return resolvePromise(new this(null), REJECTED, error);
            };
            ZoneAwarePromise2.race = function(values) {
              var e_1, _a;
              var resolve;
              var reject;
              var promise = new this(function(res, rej) {
                resolve = res;
                reject = rej;
              });
              function onResolve(value2) {
                promise && (promise = resolve(value2));
              }
              function onReject(error) {
                promise && (promise = reject(error));
              }
              try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                  var value = values_1_1.value;
                  if (!isThenable(value)) {
                    value = this.resolve(value);
                  }
                  value.then(onResolve, onReject);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
              return promise;
            };
            ZoneAwarePromise2.all = function(values) {
              var e_2, _a;
              var resolve;
              var reject;
              var promise = new this(function(res, rej) {
                resolve = res;
                reject = rej;
              });
              var unresolvedCount = 2;
              var valueIndex = 0;
              var resolvedValues = [];
              var _loop_2 = function(value2) {
                if (!isThenable(value2)) {
                  value2 = this_1.resolve(value2);
                }
                var curValueIndex = valueIndex;
                value2.then(function(value3) {
                  resolvedValues[curValueIndex] = value3;
                  unresolvedCount--;
                  if (unresolvedCount === 0) {
                    resolve(resolvedValues);
                  }
                }, reject);
                unresolvedCount++;
                valueIndex++;
              };
              var this_1 = this;
              try {
                for (var values_2 = __values(values), values_2_1 = values_2.next(); !values_2_1.done; values_2_1 = values_2.next()) {
                  var value = values_2_1.value;
                  _loop_2(value);
                }
              } catch (e_2_1) {
                e_2 = { error: e_2_1 };
              } finally {
                try {
                  if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                } finally {
                  if (e_2) throw e_2.error;
                }
              }
              unresolvedCount -= 2;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
              return promise;
            };
            ZoneAwarePromise2.prototype.then = function(onFulfilled, onRejected) {
              var chainPromise = new this.constructor(null);
              var zone = Zone2.current;
              if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
              } else {
                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
              }
              return chainPromise;
            };
            ZoneAwarePromise2.prototype.catch = function(onRejected) {
              return this.then(null, onRejected);
            };
            ZoneAwarePromise2.prototype.finally = function(onFinally) {
              var chainPromise = new this.constructor(null);
              chainPromise[symbolFinally] = symbolFinally;
              var zone = Zone2.current;
              if (this[symbolState] == UNRESOLVED) {
                this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
              } else {
                scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
              }
              return chainPromise;
            };
            return ZoneAwarePromise2;
          })()
        );
        ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
        ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
        ZoneAwarePromise["race"] = ZoneAwarePromise.race;
        ZoneAwarePromise["all"] = ZoneAwarePromise.all;
        var NativePromise = global2[symbolPromise] = global2["Promise"];
        var ZONE_AWARE_PROMISE = Zone2.__symbol__("ZoneAwarePromise");
        var desc = ObjectGetOwnPropertyDescriptor2(global2, "Promise");
        if (!desc || desc.configurable) {
          desc && delete desc.writable;
          desc && delete desc.value;
          if (!desc) {
            desc = { configurable: true, enumerable: true };
          }
          desc.get = function() {
            return global2[ZONE_AWARE_PROMISE] ? global2[ZONE_AWARE_PROMISE] : global2[symbolPromise];
          };
          desc.set = function(NewNativePromise) {
            if (NewNativePromise === ZoneAwarePromise) {
              global2[ZONE_AWARE_PROMISE] = NewNativePromise;
            } else {
              global2[symbolPromise] = NewNativePromise;
              if (!NewNativePromise.prototype[symbolThen]) {
                patchThen(NewNativePromise);
              }
              api.setNativePromise(NewNativePromise);
            }
          };
          ObjectDefineProperty2(global2, "Promise", desc);
        }
        global2["Promise"] = ZoneAwarePromise;
        var symbolThenPatched = __symbol__("thenPatched");
        function patchThen(Ctor) {
          var proto = Ctor.prototype;
          var prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
          if (prop && (prop.writable === false || !prop.configurable)) {
            return;
          }
          var originalThen = proto.then;
          proto[symbolThen] = originalThen;
          Ctor.prototype.then = function(onResolve, onReject) {
            var _this = this;
            var wrapped = new ZoneAwarePromise(function(resolve, reject) {
              originalThen.call(_this, resolve, reject);
            });
            return wrapped.then(onResolve, onReject);
          };
          Ctor[symbolThenPatched] = true;
        }
        api.patchThen = patchThen;
        if (NativePromise) {
          patchThen(NativePromise);
        }
        Promise[Zone2.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
        return ZoneAwarePromise;
      });
      Zone.__load_patch("fetch", function(global2, Zone2, api) {
        var fetch = global2["fetch"];
        var ZoneAwarePromise = global2.Promise;
        var symbolThenPatched = api.symbol("thenPatched");
        var fetchTaskScheduling = api.symbol("fetchTaskScheduling");
        var fetchTaskAborting = api.symbol("fetchTaskAborting");
        if (typeof fetch !== "function") {
          return;
        }
        var OriginalAbortController = global2["AbortController"];
        var supportAbort = typeof OriginalAbortController === "function";
        var abortNative = null;
        if (supportAbort) {
          global2["AbortController"] = function() {
            var abortController = new OriginalAbortController();
            var signal = abortController.signal;
            signal.abortController = abortController;
            return abortController;
          };
          abortNative = api.patchMethod(OriginalAbortController.prototype, "abort", function(delegate) {
            return function(self2, args) {
              if (self2.task) {
                return self2.task.zone.cancelTask(self2.task);
              }
              return delegate.apply(self2, args);
            };
          });
        }
        var placeholder = function() {
        };
        global2["fetch"] = function() {
          var _this = this;
          var args = Array.prototype.slice.call(arguments);
          var options2 = args.length > 1 ? args[1] : null;
          var signal = options2 && options2.signal;
          return new Promise(function(res, rej) {
            var task = Zone2.current.scheduleMacroTask("fetch", placeholder, args, function() {
              var fetchPromise;
              var zone = Zone2.current;
              try {
                zone[fetchTaskScheduling] = true;
                fetchPromise = fetch.apply(_this, args);
              } catch (error) {
                rej(error);
                return;
              } finally {
                zone[fetchTaskScheduling] = false;
              }
              if (!(fetchPromise instanceof ZoneAwarePromise)) {
                var ctor = fetchPromise.constructor;
                if (!ctor[symbolThenPatched]) {
                  api.patchThen(ctor);
                }
              }
              fetchPromise.then(function(resource) {
                if (task.state !== "notScheduled") {
                  task.invoke();
                }
                res(resource);
              }, function(error) {
                if (task.state !== "notScheduled") {
                  task.invoke();
                }
                rej(error);
              });
            }, function() {
              if (!supportAbort) {
                rej("No AbortController supported, can not cancel fetch");
                return;
              }
              if (signal && signal.abortController && !signal.aborted && typeof signal.abortController.abort === "function" && abortNative) {
                try {
                  Zone2.current[fetchTaskAborting] = true;
                  abortNative.call(signal.abortController);
                } finally {
                  Zone2.current[fetchTaskAborting] = false;
                }
              } else {
                rej("cancel fetch need a AbortController.signal");
              }
            });
            if (signal && signal.abortController) {
              signal.abortController.task = task;
            }
          });
        };
      });
      var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var ObjectDefineProperty = Object.defineProperty;
      var ObjectGetPrototypeOf = Object.getPrototypeOf;
      var ObjectCreate = Object.create;
      var ArraySlice = Array.prototype.slice;
      var ADD_EVENT_LISTENER_STR = "addEventListener";
      var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
      var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
      var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
      var TRUE_STR = "true";
      var FALSE_STR = "false";
      var ZONE_SYMBOL_PREFIX = "__zone_symbol__";
      function wrapWithCurrentZone(callback, source) {
        return Zone.current.wrap(callback, source);
      }
      function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
        return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
      }
      var zoneSymbol = Zone.__symbol__;
      var isWindowExists = typeof window !== "undefined";
      var internalWindow = isWindowExists ? window : void 0;
      var _global = isWindowExists && internalWindow || typeof self === "object" && self || global;
      var REMOVE_ATTRIBUTE = "removeAttribute";
      var NULL_ON_PROP_VALUE = [null];
      function bindArguments(args, source) {
        for (var i = args.length - 1; i >= 0; i--) {
          if (typeof args[i] === "function") {
            args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
          }
        }
        return args;
      }
      function patchPrototype(prototype, fnNames) {
        var source = prototype.constructor["name"];
        var _loop_1 = function(i2) {
          var name_1 = fnNames[i2];
          var delegate = prototype[name_1];
          if (delegate) {
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
            if (!isPropertyWritable(prototypeDesc)) {
              return "continue";
            }
            prototype[name_1] = (function(delegate2) {
              var patched = function() {
                return delegate2.apply(this, bindArguments(arguments, source + "." + name_1));
              };
              attachOriginToPatched(patched, delegate2);
              return patched;
            })(delegate);
          }
        };
        for (var i = 0; i < fnNames.length; i++) {
          _loop_1(i);
        }
      }
      function isPropertyWritable(propertyDesc) {
        if (!propertyDesc) {
          return true;
        }
        if (propertyDesc.writable === false) {
          return false;
        }
        return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
      }
      var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
      var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && {}.toString.call(_global.process) === "[object process]";
      var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
      var isMix = typeof _global.process !== "undefined" && {}.toString.call(_global.process) === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
      var zoneSymbolEventNames = {};
      var wrapFn = function(event) {
        event = event || _global.event;
        if (!event) {
          return;
        }
        var eventNameSymbol = zoneSymbolEventNames[event.type];
        if (!eventNameSymbol) {
          eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
        }
        var target = this || event.target || _global;
        var listener = target[eventNameSymbol];
        var result;
        if (isBrowser && target === internalWindow && event.type === "error") {
          var errorEvent = event;
          result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
          if (result === true) {
            event.preventDefault();
          }
        } else {
          result = listener && listener.apply(this, arguments);
          if (result != void 0 && !result) {
            event.preventDefault();
          }
        }
        return result;
      };
      function patchProperty(obj, prop, prototype) {
        var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
        if (!desc && prototype) {
          var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
          if (prototypeDesc) {
            desc = { enumerable: true, configurable: true };
          }
        }
        if (!desc || !desc.configurable) {
          return;
        }
        var onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
        if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
          return;
        }
        delete desc.writable;
        delete desc.value;
        var originalDescGet = desc.get;
        var originalDescSet = desc.set;
        var eventName = prop.substr(2);
        var eventNameSymbol = zoneSymbolEventNames[eventName];
        if (!eventNameSymbol) {
          eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
        }
        desc.set = function(newValue) {
          var target = this;
          if (!target && obj === _global) {
            target = _global;
          }
          if (!target) {
            return;
          }
          var previousValue = target[eventNameSymbol];
          if (previousValue) {
            target.removeEventListener(eventName, wrapFn);
          }
          if (originalDescSet) {
            originalDescSet.apply(target, NULL_ON_PROP_VALUE);
          }
          if (typeof newValue === "function") {
            target[eventNameSymbol] = newValue;
            target.addEventListener(eventName, wrapFn, false);
          } else {
            target[eventNameSymbol] = null;
          }
        };
        desc.get = function() {
          var target = this;
          if (!target && obj === _global) {
            target = _global;
          }
          if (!target) {
            return null;
          }
          var listener = target[eventNameSymbol];
          if (listener) {
            return listener;
          } else if (originalDescGet) {
            var value = originalDescGet && originalDescGet.call(this);
            if (value) {
              desc.set.call(this, value);
              if (typeof target[REMOVE_ATTRIBUTE] === "function") {
                target.removeAttribute(prop);
              }
              return value;
            }
          }
          return null;
        };
        ObjectDefineProperty(obj, prop, desc);
        obj[onPropPatchedSymbol] = true;
      }
      function patchOnProperties(obj, properties, prototype) {
        if (properties) {
          for (var i = 0; i < properties.length; i++) {
            patchProperty(obj, "on" + properties[i], prototype);
          }
        } else {
          var onProperties = [];
          for (var prop in obj) {
            if (prop.substr(0, 2) == "on") {
              onProperties.push(prop);
            }
          }
          for (var j = 0; j < onProperties.length; j++) {
            patchProperty(obj, onProperties[j], prototype);
          }
        }
      }
      var originalInstanceKey = zoneSymbol("originalInstance");
      function patchClass(className) {
        var OriginalClass = _global[className];
        if (!OriginalClass)
          return;
        _global[zoneSymbol(className)] = OriginalClass;
        _global[className] = function() {
          var a = bindArguments(arguments, className);
          switch (a.length) {
            case 0:
              this[originalInstanceKey] = new OriginalClass();
              break;
            case 1:
              this[originalInstanceKey] = new OriginalClass(a[0]);
              break;
            case 2:
              this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
              break;
            case 3:
              this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
              break;
            case 4:
              this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
              break;
            default:
              throw new Error("Arg list too long.");
          }
        };
        attachOriginToPatched(_global[className], OriginalClass);
        var instance = new OriginalClass(function() {
        });
        var prop;
        for (prop in instance) {
          if (className === "XMLHttpRequest" && prop === "responseBlob")
            continue;
          (function(prop2) {
            if (typeof instance[prop2] === "function") {
              _global[className].prototype[prop2] = function() {
                return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
              };
            } else {
              ObjectDefineProperty(_global[className].prototype, prop2, {
                set: function(fn) {
                  if (typeof fn === "function") {
                    this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
                    attachOriginToPatched(this[originalInstanceKey][prop2], fn);
                  } else {
                    this[originalInstanceKey][prop2] = fn;
                  }
                },
                get: function() {
                  return this[originalInstanceKey][prop2];
                }
              });
            }
          })(prop);
        }
        for (prop in OriginalClass) {
          if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
            _global[className][prop] = OriginalClass[prop];
          }
        }
      }
      function copySymbolProperties(src, dest) {
        if (typeof Object.getOwnPropertySymbols !== "function") {
          return;
        }
        var symbols = Object.getOwnPropertySymbols(src);
        symbols.forEach(function(symbol) {
          var desc = Object.getOwnPropertyDescriptor(src, symbol);
          Object.defineProperty(dest, symbol, {
            get: function() {
              return src[symbol];
            },
            set: function(value) {
              if (desc && (!desc.writable || typeof desc.set !== "function")) {
                return;
              }
              src[symbol] = value;
            },
            enumerable: desc ? desc.enumerable : true,
            configurable: desc ? desc.configurable : true
          });
        });
      }
      var shouldCopySymbolProperties = false;
      function patchMethod(target, name, patchFn) {
        var proto = target;
        while (proto && !proto.hasOwnProperty(name)) {
          proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && target[name]) {
          proto = target;
        }
        var delegateName = zoneSymbol(name);
        var delegate = null;
        if (proto && !(delegate = proto[delegateName])) {
          delegate = proto[delegateName] = proto[name];
          var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
          if (isPropertyWritable(desc)) {
            var patchDelegate_1 = patchFn(delegate, delegateName, name);
            proto[name] = function() {
              return patchDelegate_1(this, arguments);
            };
            attachOriginToPatched(proto[name], delegate);
            if (shouldCopySymbolProperties) {
              copySymbolProperties(delegate, proto[name]);
            }
          }
        }
        return delegate;
      }
      function patchMacroTask(obj, funcName, metaCreator) {
        var setNative = null;
        function scheduleTask(task) {
          var data = task.data;
          data.args[data.cbIdx] = function() {
            task.invoke.apply(this, arguments);
          };
          setNative.apply(data.target, data.args);
          return task;
        }
        setNative = patchMethod(obj, funcName, function(delegate) {
          return function(self2, args) {
            var meta = metaCreator(self2, args);
            if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
              return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
            } else {
              return delegate.apply(self2, args);
            }
          };
        });
      }
      function attachOriginToPatched(patched, original) {
        patched[zoneSymbol("OriginalDelegate")] = original;
      }
      var isDetectedIEOrEdge = false;
      var ieOrEdge = false;
      function isIE() {
        try {
          var ua = internalWindow.navigator.userAgent;
          if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1) {
            return true;
          }
        } catch (error) {
        }
        return false;
      }
      function isIEOrEdge() {
        if (isDetectedIEOrEdge) {
          return ieOrEdge;
        }
        isDetectedIEOrEdge = true;
        try {
          var ua = internalWindow.navigator.userAgent;
          if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
            ieOrEdge = true;
          }
          return ieOrEdge;
        } catch (error) {
        }
      }
      Zone.__load_patch("toString", function(global2) {
        var originalFunctionToString = Function.prototype.toString;
        var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
        var PROMISE_SYMBOL = zoneSymbol("Promise");
        var ERROR_SYMBOL = zoneSymbol("Error");
        var newFunctionToString = function toString() {
          if (typeof this === "function") {
            var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
            if (originalDelegate) {
              if (typeof originalDelegate === "function") {
                return originalFunctionToString.apply(this[ORIGINAL_DELEGATE_SYMBOL], arguments);
              } else {
                return Object.prototype.toString.call(originalDelegate);
              }
            }
            if (this === Promise) {
              var nativePromise = global2[PROMISE_SYMBOL];
              if (nativePromise) {
                return originalFunctionToString.apply(nativePromise, arguments);
              }
            }
            if (this === Error) {
              var nativeError = global2[ERROR_SYMBOL];
              if (nativeError) {
                return originalFunctionToString.apply(nativeError, arguments);
              }
            }
          }
          return originalFunctionToString.apply(this, arguments);
        };
        newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
        Function.prototype.toString = newFunctionToString;
        var originalObjectToString = Object.prototype.toString;
        var PROMISE_OBJECT_TO_STRING = "[object Promise]";
        Object.prototype.toString = function() {
          if (this instanceof Promise) {
            return PROMISE_OBJECT_TO_STRING;
          }
          return originalObjectToString.apply(this, arguments);
        };
      });
      var passiveSupported = false;
      if (typeof window !== "undefined") {
        try {
          var options = Object.defineProperty({}, "passive", {
            get: function() {
              passiveSupported = true;
            }
          });
          window.addEventListener("test", options, options);
          window.removeEventListener("test", options, options);
        } catch (err) {
          passiveSupported = false;
        }
      }
      var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
        useG: true
      };
      var zoneSymbolEventNames$1 = {};
      var globalSources = {};
      var EVENT_NAME_SYMBOL_REGX = /^__zone_symbol__(\w+)(true|false)$/;
      var IMMEDIATE_PROPAGATION_SYMBOL = "__zone_symbol__propagationStopped";
      function patchEventTarget(_global2, apis, patchOptions) {
        var ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
        var REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
        var LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
        var REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
        var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
        var ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
        var PREPEND_EVENT_LISTENER = "prependListener";
        var PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
        var invokeTask = function(task, target, event) {
          if (task.isRemoved) {
            return;
          }
          var delegate = task.callback;
          if (typeof delegate === "object" && delegate.handleEvent) {
            task.callback = function(event2) {
              return delegate.handleEvent(event2);
            };
            task.originalDelegate = delegate;
          }
          task.invoke(task, target, [event]);
          var options2 = task.options;
          if (options2 && typeof options2 === "object" && options2.once) {
            var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
            target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options2);
          }
        };
        var globalZoneAwareCallback = function(event) {
          event = event || _global2.event;
          if (!event) {
            return;
          }
          var target = this || event.target || _global2;
          var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
          if (tasks) {
            if (tasks.length === 1) {
              invokeTask(tasks[0], target, event);
            } else {
              var copyTasks = tasks.slice();
              for (var i2 = 0; i2 < copyTasks.length; i2++) {
                if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                  break;
                }
                invokeTask(copyTasks[i2], target, event);
              }
            }
          }
        };
        var globalZoneAwareCaptureCallback = function(event) {
          event = event || _global2.event;
          if (!event) {
            return;
          }
          var target = this || event.target || _global2;
          var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
          if (tasks) {
            if (tasks.length === 1) {
              invokeTask(tasks[0], target, event);
            } else {
              var copyTasks = tasks.slice();
              for (var i2 = 0; i2 < copyTasks.length; i2++) {
                if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                  break;
                }
                invokeTask(copyTasks[i2], target, event);
              }
            }
          }
        };
        function patchEventTargetMethods(obj, patchOptions2) {
          if (!obj) {
            return false;
          }
          var useGlobalCallback = true;
          if (patchOptions2 && patchOptions2.useG !== void 0) {
            useGlobalCallback = patchOptions2.useG;
          }
          var validateHandler = patchOptions2 && patchOptions2.vh;
          var checkDuplicate = true;
          if (patchOptions2 && patchOptions2.chkDup !== void 0) {
            checkDuplicate = patchOptions2.chkDup;
          }
          var returnTarget = false;
          if (patchOptions2 && patchOptions2.rt !== void 0) {
            returnTarget = patchOptions2.rt;
          }
          var proto = obj;
          while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
            proto = ObjectGetPrototypeOf(proto);
          }
          if (!proto && obj[ADD_EVENT_LISTENER]) {
            proto = obj;
          }
          if (!proto) {
            return false;
          }
          if (proto[zoneSymbolAddEventListener]) {
            return false;
          }
          var eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
          var taskData = {};
          var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
          var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
          var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
          var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
          var nativePrependEventListener;
          if (patchOptions2 && patchOptions2.prepend) {
            nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
          }
          function checkIsPassive(task) {
            if (!passiveSupported && typeof taskData.options !== "boolean" && typeof taskData.options !== "undefined" && taskData.options !== null) {
              task.options = !!taskData.options.capture;
              taskData.options = task.options;
            }
          }
          var customScheduleGlobal = function(task) {
            if (taskData.isExisting) {
              return;
            }
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
          };
          var customCancelGlobal = function(task) {
            if (!task.isRemoved) {
              var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
              var symbolEventName = void 0;
              if (symbolEventNames) {
                symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
              }
              var existingTasks = symbolEventName && task.target[symbolEventName];
              if (existingTasks) {
                for (var i2 = 0; i2 < existingTasks.length; i2++) {
                  var existingTask = existingTasks[i2];
                  if (existingTask === task) {
                    existingTasks.splice(i2, 1);
                    task.isRemoved = true;
                    if (existingTasks.length === 0) {
                      task.allRemoved = true;
                      task.target[symbolEventName] = null;
                    }
                    break;
                  }
                }
              }
            }
            if (!task.allRemoved) {
              return;
            }
            return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
          };
          var customScheduleNonGlobal = function(task) {
            checkIsPassive(task);
            return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
          };
          var customSchedulePrepend = function(task) {
            return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
          };
          var customCancelNonGlobal = function(task) {
            return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
          };
          var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
          var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
          var compareTaskCallbackVsDelegate = function(task, delegate) {
            var typeOfDelegate = typeof delegate;
            return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
          };
          var compare = patchOptions2 && patchOptions2.diff ? patchOptions2.diff : compareTaskCallbackVsDelegate;
          var blackListedEvents = Zone[Zone.__symbol__("BLACK_LISTED_EVENTS")];
          var makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2, prepend) {
            if (returnTarget2 === void 0) {
              returnTarget2 = false;
            }
            if (prepend === void 0) {
              prepend = false;
            }
            return function() {
              var target = this || _global2;
              var eventName = arguments[0];
              var delegate = arguments[1];
              if (!delegate) {
                return nativeListener.apply(this, arguments);
              }
              if (isNode && eventName === "uncaughtException") {
                return nativeListener.apply(this, arguments);
              }
              var isHandleEvent = false;
              if (typeof delegate !== "function") {
                if (!delegate.handleEvent) {
                  return nativeListener.apply(this, arguments);
                }
                isHandleEvent = true;
              }
              if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                return;
              }
              var options2 = arguments[2];
              if (blackListedEvents) {
                for (var i2 = 0; i2 < blackListedEvents.length; i2++) {
                  if (eventName === blackListedEvents[i2]) {
                    return nativeListener.apply(this, arguments);
                  }
                }
              }
              var capture;
              var once = false;
              if (options2 === void 0) {
                capture = false;
              } else if (options2 === true) {
                capture = true;
              } else if (options2 === false) {
                capture = false;
              } else {
                capture = options2 ? !!options2.capture : false;
                once = options2 ? !!options2.once : false;
              }
              var zone = Zone.current;
              var symbolEventNames = zoneSymbolEventNames$1[eventName];
              var symbolEventName;
              if (!symbolEventNames) {
                var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
                var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
                var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
                var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
                zoneSymbolEventNames$1[eventName] = {};
                zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
                zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
                symbolEventName = capture ? symbolCapture : symbol;
              } else {
                symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
              }
              var existingTasks = target[symbolEventName];
              var isExisting = false;
              if (existingTasks) {
                isExisting = true;
                if (checkDuplicate) {
                  for (var i2 = 0; i2 < existingTasks.length; i2++) {
                    if (compare(existingTasks[i2], delegate)) {
                      return;
                    }
                  }
                }
              } else {
                existingTasks = target[symbolEventName] = [];
              }
              var source;
              var constructorName = target.constructor["name"];
              var targetSource = globalSources[constructorName];
              if (targetSource) {
                source = targetSource[eventName];
              }
              if (!source) {
                source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
              }
              taskData.options = options2;
              if (once) {
                taskData.options.once = false;
              }
              taskData.target = target;
              taskData.capture = capture;
              taskData.eventName = eventName;
              taskData.isExisting = isExisting;
              var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
              if (data) {
                data.taskData = taskData;
              }
              var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
              taskData.target = null;
              if (data) {
                data.taskData = null;
              }
              if (once) {
                options2.once = true;
              }
              if (!(!passiveSupported && typeof task.options === "boolean")) {
                task.options = options2;
              }
              task.target = target;
              task.capture = capture;
              task.eventName = eventName;
              if (isHandleEvent) {
                task.originalDelegate = delegate;
              }
              if (!prepend) {
                existingTasks.push(task);
              } else {
                existingTasks.unshift(task);
              }
              if (returnTarget2) {
                return target;
              }
            };
          };
          proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
          if (nativePrependEventListener) {
            proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
          }
          proto[REMOVE_EVENT_LISTENER] = function() {
            var target = this || _global2;
            var eventName = arguments[0];
            var options2 = arguments[2];
            var capture;
            if (options2 === void 0) {
              capture = false;
            } else if (options2 === true) {
              capture = true;
            } else if (options2 === false) {
              capture = false;
            } else {
              capture = options2 ? !!options2.capture : false;
            }
            var delegate = arguments[1];
            if (!delegate) {
              return nativeRemoveEventListener.apply(this, arguments);
            }
            if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
              return;
            }
            var symbolEventNames = zoneSymbolEventNames$1[eventName];
            var symbolEventName;
            if (symbolEventNames) {
              symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
            }
            var existingTasks = symbolEventName && target[symbolEventName];
            if (existingTasks) {
              for (var i2 = 0; i2 < existingTasks.length; i2++) {
                var existingTask = existingTasks[i2];
                if (compare(existingTask, delegate)) {
                  existingTasks.splice(i2, 1);
                  existingTask.isRemoved = true;
                  if (existingTasks.length === 0) {
                    existingTask.allRemoved = true;
                    target[symbolEventName] = null;
                  }
                  existingTask.zone.cancelTask(existingTask);
                  if (returnTarget) {
                    return target;
                  }
                  return;
                }
              }
            }
            return nativeRemoveEventListener.apply(this, arguments);
          };
          proto[LISTENERS_EVENT_LISTENER] = function() {
            var target = this || _global2;
            var eventName = arguments[0];
            var listeners = [];
            var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
            for (var i2 = 0; i2 < tasks.length; i2++) {
              var task = tasks[i2];
              var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              listeners.push(delegate);
            }
            return listeners;
          };
          proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
            var target = this || _global2;
            var eventName = arguments[0];
            if (!eventName) {
              var keys = Object.keys(target);
              for (var i2 = 0; i2 < keys.length; i2++) {
                var prop = keys[i2];
                var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                var evtName = match && match[1];
                if (evtName && evtName !== "removeListener") {
                  this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                }
              }
              this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
            } else {
              var symbolEventNames = zoneSymbolEventNames$1[eventName];
              if (symbolEventNames) {
                var symbolEventName = symbolEventNames[FALSE_STR];
                var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                var tasks = target[symbolEventName];
                var captureTasks = target[symbolCaptureEventName];
                if (tasks) {
                  var removeTasks = tasks.slice();
                  for (var i2 = 0; i2 < removeTasks.length; i2++) {
                    var task = removeTasks[i2];
                    var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                  }
                }
                if (captureTasks) {
                  var removeTasks = captureTasks.slice();
                  for (var i2 = 0; i2 < removeTasks.length; i2++) {
                    var task = removeTasks[i2];
                    var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                  }
                }
              }
            }
            if (returnTarget) {
              return this;
            }
          };
          attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
          attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
          if (nativeRemoveAllListeners) {
            attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
          }
          if (nativeListeners) {
            attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
          }
          return true;
        }
        var results = [];
        for (var i = 0; i < apis.length; i++) {
          results[i] = patchEventTargetMethods(apis[i], patchOptions);
        }
        return results;
      }
      function findEventTasks(target, eventName) {
        var foundTasks = [];
        for (var prop in target) {
          var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          var evtName = match && match[1];
          if (evtName && (!eventName || evtName === eventName)) {
            var tasks = target[prop];
            if (tasks) {
              for (var i = 0; i < tasks.length; i++) {
                foundTasks.push(tasks[i]);
              }
            }
          }
        }
        return foundTasks;
      }
      function patchEventPrototype(global2, api) {
        var Event = global2["Event"];
        if (Event && Event.prototype) {
          api.patchMethod(Event.prototype, "stopImmediatePropagation", function(delegate) {
            return function(self2, args) {
              self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
              delegate && delegate.apply(self2, args);
            };
          });
        }
      }
      var taskSymbol = zoneSymbol("zoneTask");
      function patchTimer(window2, setName, cancelName, nameSuffix) {
        var setNative = null;
        var clearNative = null;
        setName += nameSuffix;
        cancelName += nameSuffix;
        var tasksByHandleId = {};
        function scheduleTask(task) {
          var data = task.data;
          function timer() {
            try {
              task.invoke.apply(this, arguments);
            } finally {
              if (!(task.data && task.data.isPeriodic)) {
                if (typeof data.handleId === "number") {
                  delete tasksByHandleId[data.handleId];
                } else if (data.handleId) {
                  data.handleId[taskSymbol] = null;
                }
              }
            }
          }
          data.args[0] = timer;
          data.handleId = setNative.apply(window2, data.args);
          return task;
        }
        function clearTask(task) {
          return clearNative(task.data.handleId);
        }
        setNative = patchMethod(window2, setName, function(delegate) {
          return function(self2, args) {
            if (typeof args[0] === "function") {
              var options2 = {
                isPeriodic: nameSuffix === "Interval",
                delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
                args
              };
              var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options2, scheduleTask, clearTask);
              if (!task) {
                return task;
              }
              var handle = task.data.handleId;
              if (typeof handle === "number") {
                tasksByHandleId[handle] = task;
              } else if (handle) {
                handle[taskSymbol] = task;
              }
              if (handle && handle.ref && handle.unref && typeof handle.ref === "function" && typeof handle.unref === "function") {
                task.ref = handle.ref.bind(handle);
                task.unref = handle.unref.bind(handle);
              }
              if (typeof handle === "number" || handle) {
                return handle;
              }
              return task;
            } else {
              return delegate.apply(window2, args);
            }
          };
        });
        clearNative = patchMethod(window2, cancelName, function(delegate) {
          return function(self2, args) {
            var id = args[0];
            var task;
            if (typeof id === "number") {
              task = tasksByHandleId[id];
            } else {
              task = id && id[taskSymbol];
              if (!task) {
                task = id;
              }
            }
            if (task && typeof task.type === "string") {
              if (task.state !== "notScheduled" && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                if (typeof id === "number") {
                  delete tasksByHandleId[id];
                } else if (id) {
                  id[taskSymbol] = null;
                }
                task.zone.cancelTask(task);
              }
            } else {
              delegate.apply(window2, args);
            }
          };
        });
      }
      var _defineProperty = Object[zoneSymbol("defineProperty")] = Object.defineProperty;
      var _getOwnPropertyDescriptor = Object[zoneSymbol("getOwnPropertyDescriptor")] = Object.getOwnPropertyDescriptor;
      var _create = Object.create;
      var unconfigurablesKey = zoneSymbol("unconfigurables");
      function propertyPatch() {
        Object.defineProperty = function(obj, prop, desc) {
          if (isUnconfigurable(obj, prop)) {
            throw new TypeError("Cannot assign to read only property '" + prop + "' of " + obj);
          }
          var originalConfigurableFlag = desc.configurable;
          if (prop !== "prototype") {
            desc = rewriteDescriptor(obj, prop, desc);
          }
          return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
        };
        Object.defineProperties = function(obj, props) {
          Object.keys(props).forEach(function(prop) {
            Object.defineProperty(obj, prop, props[prop]);
          });
          return obj;
        };
        Object.create = function(obj, proto) {
          if (typeof proto === "object" && !Object.isFrozen(proto)) {
            Object.keys(proto).forEach(function(prop) {
              proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
            });
          }
          return _create(obj, proto);
        };
        Object.getOwnPropertyDescriptor = function(obj, prop) {
          var desc = _getOwnPropertyDescriptor(obj, prop);
          if (desc && isUnconfigurable(obj, prop)) {
            desc.configurable = false;
          }
          return desc;
        };
      }
      function _redefineProperty(obj, prop, desc) {
        var originalConfigurableFlag = desc.configurable;
        desc = rewriteDescriptor(obj, prop, desc);
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
      }
      function isUnconfigurable(obj, prop) {
        return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
      }
      function rewriteDescriptor(obj, prop, desc) {
        if (!Object.isFrozen(desc)) {
          desc.configurable = true;
        }
        if (!desc.configurable) {
          if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
          }
          if (obj[unconfigurablesKey]) {
            obj[unconfigurablesKey][prop] = true;
          }
        }
        return desc;
      }
      function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
        try {
          return _defineProperty(obj, prop, desc);
        } catch (error) {
          if (desc.configurable) {
            if (typeof originalConfigurableFlag == "undefined") {
              delete desc.configurable;
            } else {
              desc.configurable = originalConfigurableFlag;
            }
            try {
              return _defineProperty(obj, prop, desc);
            } catch (error2) {
              var descJson = null;
              try {
                descJson = JSON.stringify(desc);
              } catch (error3) {
                descJson = desc.toString();
              }
              console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error2);
            }
          } else {
            throw error;
          }
        }
      }
      function apply(api, _global2) {
        var WS = _global2.WebSocket;
        if (!_global2.EventTarget) {
          patchEventTarget(_global2, [WS.prototype]);
        }
        _global2.WebSocket = function(x, y) {
          var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
          var proxySocket;
          var proxySocketProto;
          var onmessageDesc = ObjectGetOwnPropertyDescriptor(socket, "onmessage");
          if (onmessageDesc && onmessageDesc.configurable === false) {
            proxySocket = ObjectCreate(socket);
            proxySocketProto = socket;
            [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, "send", "close"].forEach(function(propName) {
              proxySocket[propName] = function() {
                var args = ArraySlice.call(arguments);
                if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                  var eventName = args.length > 0 ? args[0] : void 0;
                  if (eventName) {
                    var propertySymbol = Zone.__symbol__("ON_PROPERTY" + eventName);
                    socket[propertySymbol] = proxySocket[propertySymbol];
                  }
                }
                return socket[propName].apply(socket, args);
              };
            });
          } else {
            proxySocket = socket;
          }
          patchOnProperties(proxySocket, ["close", "error", "message", "open"], proxySocketProto);
          return proxySocket;
        };
        var globalWebSocket = _global2["WebSocket"];
        for (var prop in WS) {
          globalWebSocket[prop] = WS[prop];
        }
      }
      var globalEventHandlersEventNames = [
        "abort",
        "animationcancel",
        "animationend",
        "animationiteration",
        "auxclick",
        "beforeinput",
        "blur",
        "cancel",
        "canplay",
        "canplaythrough",
        "change",
        "compositionstart",
        "compositionupdate",
        "compositionend",
        "cuechange",
        "click",
        "close",
        "contextmenu",
        "curechange",
        "dblclick",
        "drag",
        "dragend",
        "dragenter",
        "dragexit",
        "dragleave",
        "dragover",
        "drop",
        "durationchange",
        "emptied",
        "ended",
        "error",
        "focus",
        "focusin",
        "focusout",
        "gotpointercapture",
        "input",
        "invalid",
        "keydown",
        "keypress",
        "keyup",
        "load",
        "loadstart",
        "loadeddata",
        "loadedmetadata",
        "lostpointercapture",
        "mousedown",
        "mouseenter",
        "mouseleave",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "mousewheel",
        "orientationchange",
        "pause",
        "play",
        "playing",
        "pointercancel",
        "pointerdown",
        "pointerenter",
        "pointerleave",
        "pointerlockchange",
        "mozpointerlockchange",
        "webkitpointerlockerchange",
        "pointerlockerror",
        "mozpointerlockerror",
        "webkitpointerlockerror",
        "pointermove",
        "pointout",
        "pointerover",
        "pointerup",
        "progress",
        "ratechange",
        "reset",
        "resize",
        "scroll",
        "seeked",
        "seeking",
        "select",
        "selectionchange",
        "selectstart",
        "show",
        "sort",
        "stalled",
        "submit",
        "suspend",
        "timeupdate",
        "volumechange",
        "touchcancel",
        "touchmove",
        "touchstart",
        "touchend",
        "transitioncancel",
        "transitionend",
        "waiting",
        "wheel"
      ];
      var documentEventNames = [
        "afterscriptexecute",
        "beforescriptexecute",
        "DOMContentLoaded",
        "freeze",
        "fullscreenchange",
        "mozfullscreenchange",
        "webkitfullscreenchange",
        "msfullscreenchange",
        "fullscreenerror",
        "mozfullscreenerror",
        "webkitfullscreenerror",
        "msfullscreenerror",
        "readystatechange",
        "visibilitychange",
        "resume"
      ];
      var windowEventNames = [
        "absolutedeviceorientation",
        "afterinput",
        "afterprint",
        "appinstalled",
        "beforeinstallprompt",
        "beforeprint",
        "beforeunload",
        "devicelight",
        "devicemotion",
        "deviceorientation",
        "deviceorientationabsolute",
        "deviceproximity",
        "hashchange",
        "languagechange",
        "message",
        "mozbeforepaint",
        "offline",
        "online",
        "paint",
        "pageshow",
        "pagehide",
        "popstate",
        "rejectionhandled",
        "storage",
        "unhandledrejection",
        "unload",
        "userproximity",
        "vrdisplyconnected",
        "vrdisplaydisconnected",
        "vrdisplaypresentchange"
      ];
      var htmlElementEventNames = [
        "beforecopy",
        "beforecut",
        "beforepaste",
        "copy",
        "cut",
        "paste",
        "dragstart",
        "loadend",
        "animationstart",
        "search",
        "transitionrun",
        "transitionstart",
        "webkitanimationend",
        "webkitanimationiteration",
        "webkitanimationstart",
        "webkittransitionend"
      ];
      var mediaElementEventNames = ["encrypted", "waitingforkey", "msneedkey", "mozinterruptbegin", "mozinterruptend"];
      var ieElementEventNames = [
        "activate",
        "afterupdate",
        "ariarequest",
        "beforeactivate",
        "beforedeactivate",
        "beforeeditfocus",
        "beforeupdate",
        "cellchange",
        "controlselect",
        "dataavailable",
        "datasetchanged",
        "datasetcomplete",
        "errorupdate",
        "filterchange",
        "layoutcomplete",
        "losecapture",
        "move",
        "moveend",
        "movestart",
        "propertychange",
        "resizeend",
        "resizestart",
        "rowenter",
        "rowexit",
        "rowsdelete",
        "rowsinserted",
        "command",
        "compassneedscalibration",
        "deactivate",
        "help",
        "mscontentzoom",
        "msmanipulationstatechanged",
        "msgesturechange",
        "msgesturedoubletap",
        "msgestureend",
        "msgesturehold",
        "msgesturestart",
        "msgesturetap",
        "msgotpointercapture",
        "msinertiastart",
        "mslostpointercapture",
        "mspointercancel",
        "mspointerdown",
        "mspointerenter",
        "mspointerhover",
        "mspointerleave",
        "mspointermove",
        "mspointerout",
        "mspointerover",
        "mspointerup",
        "pointerout",
        "mssitemodejumplistitemremoved",
        "msthumbnailclick",
        "stop",
        "storagecommit"
      ];
      var webglEventNames = ["webglcontextrestored", "webglcontextlost", "webglcontextcreationerror"];
      var formEventNames = ["autocomplete", "autocompleteerror"];
      var detailEventNames = ["toggle"];
      var frameEventNames = ["load"];
      var frameSetEventNames = ["blur", "error", "focus", "load", "resize", "scroll", "messageerror"];
      var marqueeEventNames = ["bounce", "finish", "start"];
      var XMLHttpRequestEventNames = [
        "loadstart",
        "progress",
        "abort",
        "error",
        "load",
        "progress",
        "timeout",
        "loadend",
        "readystatechange"
      ];
      var IDBIndexEventNames = ["upgradeneeded", "complete", "abort", "success", "error", "blocked", "versionchange", "close"];
      var websocketEventNames = ["close", "error", "open", "message"];
      var workerEventNames = ["error", "message"];
      var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
      function filterProperties(target, onProperties, ignoreProperties) {
        if (!ignoreProperties || ignoreProperties.length === 0) {
          return onProperties;
        }
        var tip = ignoreProperties.filter(function(ip) {
          return ip.target === target;
        });
        if (!tip || tip.length === 0) {
          return onProperties;
        }
        var targetIgnoreProperties = tip[0].ignoreProperties;
        return onProperties.filter(function(op) {
          return targetIgnoreProperties.indexOf(op) === -1;
        });
      }
      function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
        if (!target) {
          return;
        }
        var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
        patchOnProperties(target, filteredProperties, prototype);
      }
      function propertyDescriptorPatch(api, _global2) {
        if (isNode && !isMix) {
          return;
        }
        var supportsWebSocket = typeof WebSocket !== "undefined";
        if (canPatchViaPropertyDescriptor()) {
          var ignoreProperties = _global2["__Zone_ignore_on_properties"];
          if (isBrowser) {
            var internalWindow2 = window;
            var ignoreErrorProperties = isIE ? [{ target: internalWindow2, ignoreProperties: ["error"] }] : [];
            patchFilteredProperties(internalWindow2, eventNames.concat(["messageerror"]), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow2["SVGElement"] !== "undefined") {
              patchFilteredProperties(internalWindow2["SVGElement"].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow2["HTMLMarqueeElement"];
            if (HTMLMarqueeElement_1) {
              patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow2["Worker"];
            if (Worker_1) {
              patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
          }
          patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
          var XMLHttpRequestEventTarget_1 = _global2["XMLHttpRequestEventTarget"];
          if (XMLHttpRequestEventTarget_1) {
            patchFilteredProperties(XMLHttpRequestEventTarget_1 && XMLHttpRequestEventTarget_1.prototype, XMLHttpRequestEventNames, ignoreProperties);
          }
          if (typeof IDBIndex !== "undefined") {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
          }
          if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
          }
        } else {
          patchViaCapturingAllTheEvents();
          patchClass("XMLHttpRequest");
          if (supportsWebSocket) {
            apply(api, _global2);
          }
        }
      }
      function canPatchViaPropertyDescriptor() {
        if ((isBrowser || isMix) && !ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, "onclick") && typeof Element !== "undefined") {
          var desc = ObjectGetOwnPropertyDescriptor(Element.prototype, "onclick");
          if (desc && !desc.configurable)
            return false;
        }
        var ON_READY_STATE_CHANGE = "onreadystatechange";
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        var xhrDesc = ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
        if (xhrDesc) {
          ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function() {
              return true;
            }
          });
          var req = new XMLHttpRequest();
          var result = !!req.onreadystatechange;
          ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
          return result;
        } else {
          var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = zoneSymbol("fake");
          ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
            enumerable: true,
            configurable: true,
            get: function() {
              return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1];
            },
            set: function(value) {
              this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value;
            }
          });
          var req = new XMLHttpRequest();
          var detectFunc = function() {
          };
          req.onreadystatechange = detectFunc;
          var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
          req.onreadystatechange = null;
          return result;
        }
      }
      var unboundKey = zoneSymbol("unbound");
      function patchViaCapturingAllTheEvents() {
        var _loop_1 = function(i2) {
          var property = eventNames[i2];
          var onproperty = "on" + property;
          self.addEventListener(property, function(event) {
            var elt = event.target, bound, source;
            if (elt) {
              source = elt.constructor["name"] + "." + onproperty;
            } else {
              source = "unknown." + onproperty;
            }
            while (elt) {
              if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                bound = wrapWithCurrentZone(elt[onproperty], source);
                bound[unboundKey] = elt[onproperty];
                elt[onproperty] = bound;
              }
              elt = elt.parentElement;
            }
          }, true);
        };
        for (var i = 0; i < eventNames.length; i++) {
          _loop_1(i);
        }
      }
      function eventTargetPatch(_global2, api) {
        var WTF_ISSUE_555 = "Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video";
        var NO_EVENT_TARGET = "ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket".split(",");
        var EVENT_TARGET = "EventTarget";
        var apis = [];
        var isWtf = _global2["wtf"];
        var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(",");
        if (isWtf) {
          apis = WTF_ISSUE_555_ARRAY.map(function(v) {
            return "HTML" + v + "Element";
          }).concat(NO_EVENT_TARGET);
        } else if (_global2[EVENT_TARGET]) {
          apis.push(EVENT_TARGET);
        } else {
          apis = NO_EVENT_TARGET;
        }
        var isDisableIECheck = _global2["__Zone_disable_IE_check"] || false;
        var isEnableCrossContextCheck = _global2["__Zone_enable_cross_context_check"] || false;
        var ieOrEdge2 = isIEOrEdge();
        var ADD_EVENT_LISTENER_SOURCE = ".addEventListener:";
        var FUNCTION_WRAPPER = "[object FunctionWrapper]";
        var BROWSER_TOOLS = "function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }";
        for (var i = 0; i < eventNames.length; i++) {
          var eventName = eventNames[i];
          var falseEventName = eventName + FALSE_STR;
          var trueEventName = eventName + TRUE_STR;
          var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
          var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
          zoneSymbolEventNames$1[eventName] = {};
          zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
          zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
        }
        for (var i = 0; i < WTF_ISSUE_555.length; i++) {
          var target = WTF_ISSUE_555_ARRAY[i];
          var targets = globalSources[target] = {};
          for (var j = 0; j < eventNames.length; j++) {
            var eventName = eventNames[j];
            targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
          }
        }
        var checkIEAndCrossContext = function(nativeDelegate, delegate, target2, args) {
          if (!isDisableIECheck && ieOrEdge2) {
            if (isEnableCrossContextCheck) {
              try {
                var testString = delegate.toString();
                if (testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS) {
                  nativeDelegate.apply(target2, args);
                  return false;
                }
              } catch (error) {
                nativeDelegate.apply(target2, args);
                return false;
              }
            } else {
              var testString = delegate.toString();
              if (testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS) {
                nativeDelegate.apply(target2, args);
                return false;
              }
            }
          } else if (isEnableCrossContextCheck) {
            try {
              delegate.toString();
            } catch (error) {
              nativeDelegate.apply(target2, args);
              return false;
            }
          }
          return true;
        };
        var apiTypes = [];
        for (var i = 0; i < apis.length; i++) {
          var type = _global2[apis[i]];
          apiTypes.push(type && type.prototype);
        }
        patchEventTarget(_global2, apiTypes, { vh: checkIEAndCrossContext });
        api.patchEventTarget = patchEventTarget;
        return true;
      }
      function patchEvent(global2, api) {
        patchEventPrototype(global2, api);
      }
      function patchCallbacks(target, targetName, method, callbacks) {
        var symbol = Zone.__symbol__(method);
        if (target[symbol]) {
          return;
        }
        var nativeDelegate = target[symbol] = target[method];
        target[method] = function(name, opts, options2) {
          if (opts && opts.prototype) {
            callbacks.forEach(function(callback) {
              var source = targetName + "." + method + "::" + callback;
              var prototype = opts.prototype;
              if (prototype.hasOwnProperty(callback)) {
                var descriptor = ObjectGetOwnPropertyDescriptor(prototype, callback);
                if (descriptor && descriptor.value) {
                  descriptor.value = wrapWithCurrentZone(descriptor.value, source);
                  _redefineProperty(opts.prototype, callback, descriptor);
                } else if (prototype[callback]) {
                  prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
                }
              } else if (prototype[callback]) {
                prototype[callback] = wrapWithCurrentZone(prototype[callback], source);
              }
            });
          }
          return nativeDelegate.call(target, name, opts, options2);
        };
        attachOriginToPatched(target[method], nativeDelegate);
      }
      function registerElementPatch(_global2) {
        if (!isBrowser && !isMix || !("registerElement" in _global2.document)) {
          return;
        }
        var callbacks = ["createdCallback", "attachedCallback", "detachedCallback", "attributeChangedCallback"];
        patchCallbacks(document, "Document", "registerElement", callbacks);
      }
      function patchCustomElements(_global2) {
        if (!isBrowser && !isMix || !("customElements" in _global2)) {
          return;
        }
        var callbacks = ["connectedCallback", "disconnectedCallback", "adoptedCallback", "attributeChangedCallback"];
        patchCallbacks(_global2.customElements, "customElements", "define", callbacks);
      }
      Zone.__load_patch("util", function(global2, Zone2, api) {
        api.patchOnProperties = patchOnProperties;
        api.patchMethod = patchMethod;
        api.bindArguments = bindArguments;
      });
      Zone.__load_patch("timers", function(global2) {
        var set = "set";
        var clear = "clear";
        patchTimer(global2, set, clear, "Timeout");
        patchTimer(global2, set, clear, "Interval");
        patchTimer(global2, set, clear, "Immediate");
      });
      Zone.__load_patch("requestAnimationFrame", function(global2) {
        patchTimer(global2, "request", "cancel", "AnimationFrame");
        patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
        patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
      });
      Zone.__load_patch("blocking", function(global2, Zone2) {
        var blockingMethods = ["alert", "prompt", "confirm"];
        for (var i = 0; i < blockingMethods.length; i++) {
          var name_1 = blockingMethods[i];
          patchMethod(global2, name_1, function(delegate, symbol, name) {
            return function(s, args) {
              return Zone2.current.run(delegate, global2, args, name);
            };
          });
        }
      });
      Zone.__load_patch("EventTarget", function(global2, Zone2, api) {
        var SYMBOL_BLACK_LISTED_EVENTS = Zone2.__symbol__("BLACK_LISTED_EVENTS");
        if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
          Zone2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
        }
        patchEvent(global2, api);
        eventTargetPatch(global2, api);
        var XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
          api.patchEventTarget(global2, [XMLHttpRequestEventTarget.prototype]);
        }
        patchClass("MutationObserver");
        patchClass("WebKitMutationObserver");
        patchClass("IntersectionObserver");
        patchClass("FileReader");
      });
      Zone.__load_patch("on_property", function(global2, Zone2, api) {
        propertyDescriptorPatch(api, global2);
        propertyPatch();
      });
      Zone.__load_patch("customElements", function(global2, Zone2, api) {
        registerElementPatch(global2);
        patchCustomElements(global2);
      });
      Zone.__load_patch("canvas", function(global2) {
        var HTMLCanvasElement = global2["HTMLCanvasElement"];
        if (typeof HTMLCanvasElement !== "undefined" && HTMLCanvasElement.prototype && HTMLCanvasElement.prototype.toBlob) {
          patchMacroTask(HTMLCanvasElement.prototype, "toBlob", function(self2, args) {
            return { name: "HTMLCanvasElement.toBlob", target: self2, cbIdx: 0, args };
          });
        }
      });
      Zone.__load_patch("XHR", function(global2, Zone2) {
        patchXHR(global2);
        var XHR_TASK = zoneSymbol("xhrTask");
        var XHR_SYNC = zoneSymbol("xhrSync");
        var XHR_LISTENER = zoneSymbol("xhrListener");
        var XHR_SCHEDULED = zoneSymbol("xhrScheduled");
        var XHR_URL = zoneSymbol("xhrURL");
        var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
        function patchXHR(window2) {
          var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
          function findPendingTask(target) {
            return target[XHR_TASK];
          }
          var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
          if (!oriAddListener) {
            var XMLHttpRequestEventTarget_1 = window2["XMLHttpRequestEventTarget"];
            if (XMLHttpRequestEventTarget_1) {
              var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
              oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
              oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
          }
          var READY_STATE_CHANGE = "readystatechange";
          var SCHEDULED = "scheduled";
          function scheduleTask(task) {
            var data = task.data;
            var target = data.target;
            target[XHR_SCHEDULED] = false;
            target[XHR_ERROR_BEFORE_SCHEDULED] = false;
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
              oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
              oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            }
            if (listener) {
              oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
            }
            var newListener = target[XHR_LISTENER] = function() {
              if (target.readyState === target.DONE) {
                if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                  var loadTasks = target["__zone_symbol__loadfalse"];
                  if (loadTasks && loadTasks.length > 0) {
                    var oriInvoke_1 = task.invoke;
                    task.invoke = function() {
                      var loadTasks2 = target["__zone_symbol__loadfalse"];
                      for (var i = 0; i < loadTasks2.length; i++) {
                        if (loadTasks2[i] === task) {
                          loadTasks2.splice(i, 1);
                        }
                      }
                      if (!data.aborted && task.state === SCHEDULED) {
                        oriInvoke_1.call(task);
                      }
                    };
                    loadTasks.push(task);
                  } else {
                    task.invoke();
                  }
                } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                  target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                }
              }
            };
            oriAddListener.call(target, READY_STATE_CHANGE, newListener);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
              target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            target[XHR_SCHEDULED] = true;
            return task;
          }
          function placeholderCallback() {
          }
          function clearTask(task) {
            var data = task.data;
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
          }
          var openNative = patchMethod(XMLHttpRequestPrototype, "open", function() {
            return function(self2, args) {
              self2[XHR_SYNC] = args[2] == false;
              self2[XHR_URL] = args[1];
              return openNative.apply(self2, args);
            };
          });
          var XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
          var fetchTaskAborting = zoneSymbol("fetchTaskAborting");
          var fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
          var sendNative = patchMethod(XMLHttpRequestPrototype, "send", function() {
            return function(self2, args) {
              if (Zone2.current[fetchTaskScheduling] === true) {
                return sendNative.apply(self2, args);
              }
              if (self2[XHR_SYNC]) {
                return sendNative.apply(self2, args);
              } else {
                var options2 = { target: self2, url: self2[XHR_URL], isPeriodic: false, args, aborted: false };
                var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options2, scheduleTask, clearTask);
                if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options2.aborted && task.state === SCHEDULED) {
                  task.invoke();
                }
              }
            };
          });
          var abortNative = patchMethod(XMLHttpRequestPrototype, "abort", function() {
            return function(self2, args) {
              var task = findPendingTask(self2);
              if (task && typeof task.type == "string") {
                if (task.cancelFn == null || task.data && task.data.aborted) {
                  return;
                }
                task.zone.cancelTask(task);
              } else if (Zone2.current[fetchTaskAborting] === true) {
                return abortNative.apply(self2, args);
              }
            };
          });
        }
      });
      Zone.__load_patch("geolocation", function(global2) {
        if (global2["navigator"] && global2["navigator"].geolocation) {
          patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
        }
      });
      Zone.__load_patch("PromiseRejectionEvent", function(global2, Zone2) {
        function findPromiseRejectionHandler(evtName) {
          return function(e) {
            var eventTasks = findEventTasks(global2, evtName);
            eventTasks.forEach(function(eventTask) {
              var PromiseRejectionEvent = global2["PromiseRejectionEvent"];
              if (PromiseRejectionEvent) {
                var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                eventTask.invoke(evt);
              }
            });
          };
        }
        if (global2["PromiseRejectionEvent"]) {
          Zone2[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
          Zone2[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
        }
      });
    }));
  }
});
export default require_zone();
//# sourceMappingURL=zone__js.js.map

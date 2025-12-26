import "./chunk-3OV72XIM.js";

// ../../../node_modules/@angular/animations/@angular/animations.es5.js
var AUTO_STYLE = "*";
function sequence(steps) {
  return { type: 2, steps };
}
function style(tokens) {
  return { type: 6, styles: tokens };
}
function scheduleMicroTask(cb) {
  Promise.resolve(null).then(cb);
}
var AnimationPlayer = (function() {
  function AnimationPlayer2() {
  }
  AnimationPlayer2.prototype.onDone = function(fn) {
  };
  AnimationPlayer2.prototype.onStart = function(fn) {
  };
  AnimationPlayer2.prototype.onDestroy = function(fn) {
  };
  AnimationPlayer2.prototype.init = function() {
  };
  AnimationPlayer2.prototype.hasStarted = function() {
  };
  AnimationPlayer2.prototype.play = function() {
  };
  AnimationPlayer2.prototype.pause = function() {
  };
  AnimationPlayer2.prototype.restart = function() {
  };
  AnimationPlayer2.prototype.finish = function() {
  };
  AnimationPlayer2.prototype.destroy = function() {
  };
  AnimationPlayer2.prototype.reset = function() {
  };
  AnimationPlayer2.prototype.setPosition = function(p) {
  };
  AnimationPlayer2.prototype.getPosition = function() {
  };
  Object.defineProperty(AnimationPlayer2.prototype, "parentPlayer", {
    /**
     * @return {?}
     */
    get: function() {
      throw new Error("NOT IMPLEMENTED: Base Class");
    },
    /**
     * @param {?} player
     * @return {?}
     */
    set: function(player) {
      throw new Error("NOT IMPLEMENTED: Base Class");
    },
    enumerable: true,
    configurable: true
  });
  return AnimationPlayer2;
})();
var NoopAnimationPlayer = (function() {
  function NoopAnimationPlayer2() {
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._started = false;
    this._destroyed = false;
    this._finished = false;
    this.parentPlayer = null;
  }
  NoopAnimationPlayer2.prototype._onFinish = function() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(function(fn) {
        return fn();
      });
      this._onDoneFns = [];
    }
  };
  NoopAnimationPlayer2.prototype.onStart = function(fn) {
    this._onStartFns.push(fn);
  };
  NoopAnimationPlayer2.prototype.onDone = function(fn) {
    this._onDoneFns.push(fn);
  };
  NoopAnimationPlayer2.prototype.onDestroy = function(fn) {
    this._onDestroyFns.push(fn);
  };
  NoopAnimationPlayer2.prototype.hasStarted = function() {
    return this._started;
  };
  NoopAnimationPlayer2.prototype.init = function() {
  };
  NoopAnimationPlayer2.prototype.play = function() {
    var _this = this;
    if (!this.hasStarted()) {
      scheduleMicroTask(function() {
        return _this._onFinish();
      });
      this._onStart();
    }
    this._started = true;
  };
  NoopAnimationPlayer2.prototype._onStart = function() {
    this._onStartFns.forEach(function(fn) {
      return fn();
    });
    this._onStartFns = [];
  };
  NoopAnimationPlayer2.prototype.pause = function() {
  };
  NoopAnimationPlayer2.prototype.restart = function() {
  };
  NoopAnimationPlayer2.prototype.finish = function() {
    this._onFinish();
  };
  NoopAnimationPlayer2.prototype.destroy = function() {
    if (!this._destroyed) {
      this._destroyed = true;
      if (!this.hasStarted()) {
        this._onStart();
      }
      this.finish();
      this._onDestroyFns.forEach(function(fn) {
        return fn();
      });
      this._onDestroyFns = [];
    }
  };
  NoopAnimationPlayer2.prototype.reset = function() {
  };
  NoopAnimationPlayer2.prototype.setPosition = function(p) {
  };
  NoopAnimationPlayer2.prototype.getPosition = function() {
    return 0;
  };
  return NoopAnimationPlayer2;
})();
var AnimationGroupPlayer = (function() {
  function AnimationGroupPlayer2(_players) {
    var _this = this;
    this._players = _players;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this._onDestroyFns = [];
    this.parentPlayer = null;
    var count = 0;
    var total = this._players.length;
    if (total == 0) {
      scheduleMicroTask(function() {
        return _this._onFinish();
      });
    } else {
      this._players.forEach(function(player) {
        player.parentPlayer = _this;
        player.onDone(function() {
          if (++count >= total) {
            _this._onFinish();
          }
        });
      });
    }
  }
  AnimationGroupPlayer2.prototype._onFinish = function() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(function(fn) {
        return fn();
      });
      this._onDoneFns = [];
    }
  };
  AnimationGroupPlayer2.prototype.init = function() {
    this._players.forEach(function(player) {
      return player.init();
    });
  };
  AnimationGroupPlayer2.prototype.onStart = function(fn) {
    this._onStartFns.push(fn);
  };
  AnimationGroupPlayer2.prototype.onDone = function(fn) {
    this._onDoneFns.push(fn);
  };
  AnimationGroupPlayer2.prototype.onDestroy = function(fn) {
    this._onDestroyFns.push(fn);
  };
  AnimationGroupPlayer2.prototype.hasStarted = function() {
    return this._started;
  };
  AnimationGroupPlayer2.prototype.play = function() {
    if (!this.parentPlayer) {
      this.init();
    }
    if (!this.hasStarted()) {
      this._onStartFns.forEach(function(fn) {
        return fn();
      });
      this._onStartFns = [];
      this._started = true;
    }
    this._players.forEach(function(player) {
      return player.play();
    });
  };
  AnimationGroupPlayer2.prototype.pause = function() {
    this._players.forEach(function(player) {
      return player.pause();
    });
  };
  AnimationGroupPlayer2.prototype.restart = function() {
    this._players.forEach(function(player) {
      return player.restart();
    });
  };
  AnimationGroupPlayer2.prototype.finish = function() {
    this._onFinish();
    this._players.forEach(function(player) {
      return player.finish();
    });
  };
  AnimationGroupPlayer2.prototype.destroy = function() {
    if (!this._destroyed) {
      this._onFinish();
      this._players.forEach(function(player) {
        return player.destroy();
      });
      this._destroyed = true;
      this._onDestroyFns.forEach(function(fn) {
        return fn();
      });
      this._onDestroyFns = [];
    }
  };
  AnimationGroupPlayer2.prototype.reset = function() {
    this._players.forEach(function(player) {
      return player.reset();
    });
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  };
  AnimationGroupPlayer2.prototype.setPosition = function(p) {
    this._players.forEach(function(player) {
      player.setPosition(p);
    });
  };
  AnimationGroupPlayer2.prototype.getPosition = function() {
    var min = 0;
    this._players.forEach(function(player) {
      var p = player.getPosition();
      min = Math.min(p, min);
    });
    return min;
  };
  Object.defineProperty(AnimationGroupPlayer2.prototype, "players", {
    /**
     * @return {?}
     */
    get: function() {
      return this._players;
    },
    enumerable: true,
    configurable: true
  });
  return AnimationGroupPlayer2;
})();

// ../../../node_modules/@angular/animations/@angular/animations/browser.es5.js
var __extends = function(d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoopAnimationDriver = (function() {
  function NoopAnimationDriver2() {
  }
  NoopAnimationDriver2.prototype.animate = function(element, keyframes, duration, delay, easing, previousPlayers) {
    if (previousPlayers === void 0) {
      previousPlayers = [];
    }
    return new NoopAnimationPlayer();
  };
  return NoopAnimationDriver2;
})();
var AnimationDriver = /* @__PURE__ */ (function() {
  function AnimationDriver2() {
  }
  return AnimationDriver2;
})();
AnimationDriver.NOOP = new NoopAnimationDriver();
var AnimationEngine = (function() {
  function AnimationEngine2() {
  }
  AnimationEngine2.prototype.registerTrigger = function(trigger, name) {
  };
  AnimationEngine2.prototype.onInsert = function(element, domFn) {
  };
  AnimationEngine2.prototype.onRemove = function(element, domFn) {
  };
  AnimationEngine2.prototype.setProperty = function(element, property, value) {
  };
  AnimationEngine2.prototype.listen = function(element, eventName, eventPhase, callback) {
  };
  AnimationEngine2.prototype.flush = function() {
  };
  Object.defineProperty(AnimationEngine2.prototype, "activePlayers", {
    /**
     * @return {?}
     */
    get: function() {
      throw new Error("...");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(AnimationEngine2.prototype, "queuedPlayers", {
    /**
     * @return {?}
     */
    get: function() {
      throw new Error("...");
    },
    enumerable: true,
    configurable: true
  });
  return AnimationEngine2;
})();
var ONE_SECOND = 1e3;
function parseTimeExpression(exp, errors) {
  var regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
  var duration;
  var delay = 0;
  var easing = null;
  if (typeof exp === "string") {
    var matches = exp.match(regex);
    if (matches === null) {
      errors.push('The provided timing value "' + exp + '" is invalid.');
      return { duration: 0, delay: 0, easing: null };
    }
    var durationMatch = parseFloat(matches[1]);
    var durationUnit = matches[2];
    if (durationUnit == "s") {
      durationMatch *= ONE_SECOND;
    }
    duration = Math.floor(durationMatch);
    var delayMatch = matches[3];
    var delayUnit = matches[4];
    if (delayMatch != null) {
      var delayVal = parseFloat(delayMatch);
      if (delayUnit != null && delayUnit == "s") {
        delayVal *= ONE_SECOND;
      }
      delay = Math.floor(delayVal);
    }
    var easingVal = matches[5];
    if (easingVal) {
      easing = easingVal;
    }
  } else {
    duration = exp;
  }
  return { duration, delay, easing };
}
function normalizeStyles(styles) {
  var normalizedStyles = {};
  if (Array.isArray(styles)) {
    styles.forEach(function(data) {
      return copyStyles(data, false, normalizedStyles);
    });
  } else {
    copyStyles(styles, false, normalizedStyles);
  }
  return normalizedStyles;
}
function copyStyles(styles, readPrototype, destination) {
  if (destination === void 0) {
    destination = {};
  }
  if (readPrototype) {
    for (var prop in styles) {
      destination[prop] = styles[prop];
    }
  } else {
    Object.keys(styles).forEach(function(prop2) {
      return destination[prop2] = styles[prop2];
    });
  }
  return destination;
}
function setStyles(element, styles) {
  if (element["style"]) {
    Object.keys(styles).forEach(function(prop) {
      return element.style[prop] = styles[prop];
    });
  }
}
function eraseStyles(element, styles) {
  if (element["style"]) {
    Object.keys(styles).forEach(function(prop) {
      element.style[prop] = "";
    });
  }
}
function visitAnimationNode(visitor, node, context) {
  switch (node.type) {
    case 0:
      return visitor.visitState(
        /** @type {?} */
        node,
        context
      );
    case 1:
      return visitor.visitTransition(
        /** @type {?} */
        node,
        context
      );
    case 2:
      return visitor.visitSequence(
        /** @type {?} */
        node,
        context
      );
    case 3:
      return visitor.visitGroup(
        /** @type {?} */
        node,
        context
      );
    case 4:
      return visitor.visitAnimate(
        /** @type {?} */
        node,
        context
      );
    case 5:
      return visitor.visitKeyframeSequence(
        /** @type {?} */
        node,
        context
      );
    case 6:
      return visitor.visitStyle(
        /** @type {?} */
        node,
        context
      );
    default:
      throw new Error("Unable to resolve animation metadata node #" + node.type);
  }
}
var ANY_STATE = "*";
function parseTransitionExpr(transitionValue, errors) {
  var expressions = [];
  if (typeof transitionValue == "string") {
    transitionValue.split(/\s*,\s*/).forEach(function(str) {
      return parseInnerTransitionStr(str, expressions, errors);
    });
  } else {
    expressions.push(
      /** @type {?} */
      transitionValue
    );
  }
  return expressions;
}
function parseInnerTransitionStr(eventStr, expressions, errors) {
  if (eventStr[0] == ":") {
    eventStr = parseAnimationAlias(eventStr, errors);
  }
  var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (match == null || match.length < 4) {
    errors.push('The provided transition expression "' + eventStr + '" is not supported');
    return expressions;
  }
  var fromState = match[1];
  var separator = match[2];
  var toState = match[3];
  expressions.push(makeLambdaFromStates(fromState, toState));
  var isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
  if (separator[0] == "<" && !isFullAnyStateExpr) {
    expressions.push(makeLambdaFromStates(toState, fromState));
  }
}
function parseAnimationAlias(alias, errors) {
  switch (alias) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    default:
      errors.push('The transition alias value "' + alias + '" is not supported');
      return "* => *";
  }
}
function makeLambdaFromStates(lhs, rhs) {
  return function(fromState, toState) {
    var lhsMatch = lhs == ANY_STATE || lhs == fromState;
    var rhsMatch = rhs == ANY_STATE || rhs == toState;
    return lhsMatch && rhsMatch;
  };
}
function createTimelineInstruction(keyframes, duration, delay, easing) {
  return {
    type: 1,
    keyframes,
    duration,
    delay,
    totalTime: duration + delay,
    easing
  };
}
function buildAnimationKeyframes(ast, startingStyles, finalStyles) {
  if (startingStyles === void 0) {
    startingStyles = {};
  }
  if (finalStyles === void 0) {
    finalStyles = {};
  }
  var normalizedAst = Array.isArray(ast) ? sequence(
    /** @type {?} */
    ast
  ) : ast;
  return new AnimationTimelineVisitor().buildKeyframes(normalizedAst, startingStyles, finalStyles);
}
var AnimationTimelineContext = (function() {
  function AnimationTimelineContext2(errors, timelines, initialTimeline) {
    if (initialTimeline === void 0) {
      initialTimeline = null;
    }
    this.errors = errors;
    this.timelines = timelines;
    this.previousNode = {};
    this.subContextCount = 0;
    this.currentTimeline = initialTimeline || new TimelineBuilder(0);
    timelines.push(this.currentTimeline);
  }
  AnimationTimelineContext2.prototype.createSubContext = function() {
    var context = new AnimationTimelineContext2(this.errors, this.timelines, this.currentTimeline.fork());
    context.previousNode = this.previousNode;
    context.currentAnimateTimings = this.currentAnimateTimings;
    this.subContextCount++;
    return context;
  };
  AnimationTimelineContext2.prototype.transformIntoNewTimeline = function(newTime) {
    if (newTime === void 0) {
      newTime = 0;
    }
    this.currentTimeline = this.currentTimeline.fork(newTime);
    this.timelines.push(this.currentTimeline);
    return this.currentTimeline;
  };
  AnimationTimelineContext2.prototype.incrementTime = function(time) {
    this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
  };
  return AnimationTimelineContext2;
})();
var AnimationTimelineVisitor = (function() {
  function AnimationTimelineVisitor2() {
  }
  AnimationTimelineVisitor2.prototype.buildKeyframes = function(ast, startingStyles, finalStyles) {
    var context = new AnimationTimelineContext([], []);
    context.currentTimeline.setStyles(startingStyles);
    visitAnimationNode(this, ast, context);
    var timelines = context.timelines.filter(function(timeline) {
      return timeline.hasStyling();
    });
    if (timelines.length && Object.keys(finalStyles).length) {
      var tl = timelines[timelines.length - 1];
      if (!tl.allowOnlyTimelineStyles()) {
        tl.setStyles(finalStyles);
      }
    }
    return timelines.length ? timelines.map(function(timeline) {
      return timeline.buildKeyframes();
    }) : [createTimelineInstruction([], 0, 0, "")];
  };
  AnimationTimelineVisitor2.prototype.visitState = function(ast, context) {
  };
  AnimationTimelineVisitor2.prototype.visitTransition = function(ast, context) {
  };
  AnimationTimelineVisitor2.prototype.visitSequence = function(ast, context) {
    var _this = this;
    var subContextCount = context.subContextCount;
    if (context.previousNode.type == 6) {
      context.currentTimeline.forwardFrame();
      context.currentTimeline.snapshotCurrentStyles();
    }
    ast.steps.forEach(function(s) {
      return visitAnimationNode(_this, s, context);
    });
    if (context.subContextCount > subContextCount) {
      context.transformIntoNewTimeline();
    }
    context.previousNode = ast;
  };
  AnimationTimelineVisitor2.prototype.visitGroup = function(ast, context) {
    var _this = this;
    var innerTimelines = [];
    var furthestTime = context.currentTimeline.currentTime;
    ast.steps.forEach(function(s) {
      var innerContext = context.createSubContext();
      visitAnimationNode(_this, s, innerContext);
      furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
      innerTimelines.push(innerContext.currentTimeline);
    });
    innerTimelines.forEach(function(timeline) {
      return context.currentTimeline.mergeTimelineCollectedStyles(timeline);
    });
    context.transformIntoNewTimeline(furthestTime);
    context.previousNode = ast;
  };
  AnimationTimelineVisitor2.prototype.visitAnimate = function(ast, context) {
    var timings = ast.timings.hasOwnProperty("duration") ? ast.timings : parseTimeExpression(
      /** @type {?} */
      ast.timings,
      context.errors
    );
    context.currentAnimateTimings = timings;
    if (timings.delay) {
      context.incrementTime(timings.delay);
      context.currentTimeline.snapshotCurrentStyles();
    }
    var astType = ast.styles ? ast.styles.type : -1;
    if (astType == 5) {
      this.visitKeyframeSequence(
        /** @type {?} */
        ast.styles,
        context
      );
    } else {
      var styleAst = ast.styles;
      if (!styleAst) {
        var newStyleData = {};
        if (timings.easing) {
          newStyleData["easing"] = timings.easing;
        }
        styleAst = style(newStyleData);
        styleAst["treatAsEmptyStep"] = true;
      }
      context.incrementTime(timings.duration);
      if (styleAst) {
        this.visitStyle(styleAst, context);
      }
    }
    context.currentAnimateTimings = null;
    context.previousNode = ast;
  };
  AnimationTimelineVisitor2.prototype.visitStyle = function(ast, context) {
    if (!context.currentAnimateTimings && context.previousNode.type == 4) {
      context.currentTimeline.forwardFrame();
    }
    var normalizedStyles = normalizeStyles(ast.styles);
    var easing = context.currentAnimateTimings && context.currentAnimateTimings.easing;
    this._applyStyles(normalizedStyles, easing, ast["treatAsEmptyStep"] ? true : false, context);
    context.previousNode = ast;
  };
  AnimationTimelineVisitor2.prototype._applyStyles = function(styles, easing, treatAsEmptyStep, context) {
    if (styles.hasOwnProperty("easing")) {
      easing = easing || styles["easing"];
      delete styles["easing"];
    }
    context.currentTimeline.setStyles(styles, easing, treatAsEmptyStep);
  };
  AnimationTimelineVisitor2.prototype.visitKeyframeSequence = function(ast, context) {
    var _this = this;
    var MAX_KEYFRAME_OFFSET = 1;
    var limit = ast.steps.length - 1;
    var firstKeyframe = ast.steps[0];
    var offsetGap = 0;
    var containsOffsets = getOffset(firstKeyframe) != null;
    if (!containsOffsets) {
      offsetGap = MAX_KEYFRAME_OFFSET / limit;
    }
    var startTime = context.currentTimeline.duration;
    var duration = context.currentAnimateTimings.duration;
    var innerContext = context.createSubContext();
    var innerTimeline = innerContext.currentTimeline;
    innerTimeline.easing = context.currentAnimateTimings.easing;
    ast.steps.forEach(function(step, i) {
      var normalizedStyles = normalizeStyles(step.styles);
      var offset = containsOffsets ? step.offset != null ? step.offset : parseFloat(
        /** @type {?} */
        normalizedStyles["offset"]
      ) : i == limit ? MAX_KEYFRAME_OFFSET : i * offsetGap;
      innerTimeline.forwardTime(offset * duration);
      _this._applyStyles(normalizedStyles, null, false, innerContext);
    });
    context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
    context.transformIntoNewTimeline(startTime + duration);
    context.previousNode = ast;
  };
  return AnimationTimelineVisitor2;
})();
var TimelineBuilder = (function() {
  function TimelineBuilder2(startTime, _globalTimelineStyles) {
    if (_globalTimelineStyles === void 0) {
      _globalTimelineStyles = null;
    }
    this.startTime = startTime;
    this._globalTimelineStyles = _globalTimelineStyles;
    this.duration = 0;
    this.easing = "";
    this._previousKeyframe = {};
    this._keyframes = /* @__PURE__ */ new Map();
    this._styleSummary = {};
    this._backFill = {};
    this._currentEmptyStepKeyframe = null;
    this._localTimelineStyles = Object.create(this._backFill, {});
    if (!this._globalTimelineStyles) {
      this._globalTimelineStyles = this._localTimelineStyles;
    }
    this._loadKeyframe();
  }
  TimelineBuilder2.prototype.hasStyling = function() {
    return this._keyframes.size > 1;
  };
  Object.defineProperty(TimelineBuilder2.prototype, "currentTime", {
    /**
     * @return {?}
     */
    get: function() {
      return this.startTime + this.duration;
    },
    enumerable: true,
    configurable: true
  });
  TimelineBuilder2.prototype.fork = function(currentTime) {
    if (currentTime === void 0) {
      currentTime = 0;
    }
    return new TimelineBuilder2(currentTime || this.currentTime, this._globalTimelineStyles);
  };
  TimelineBuilder2.prototype._loadKeyframe = function() {
    if (this._currentKeyframe) {
      this._previousKeyframe = this._currentKeyframe;
    }
    this._currentKeyframe = this._keyframes.get(this.duration);
    if (!this._currentKeyframe) {
      this._currentKeyframe = Object.create(this._backFill, {});
      this._keyframes.set(this.duration, this._currentKeyframe);
    }
  };
  TimelineBuilder2.prototype.forwardFrame = function() {
    this.duration++;
    this._loadKeyframe();
  };
  TimelineBuilder2.prototype.forwardTime = function(time) {
    this.duration = time;
    this._loadKeyframe();
  };
  TimelineBuilder2.prototype._updateStyle = function(prop, value) {
    this._localTimelineStyles[prop] = value;
    this._globalTimelineStyles[prop] = value;
    this._styleSummary[prop] = { time: this.currentTime, value };
  };
  TimelineBuilder2.prototype.allowOnlyTimelineStyles = function() {
    return this._currentEmptyStepKeyframe !== this._currentKeyframe;
  };
  TimelineBuilder2.prototype.setStyles = function(styles, easing, treatAsEmptyStep) {
    var _this = this;
    if (easing === void 0) {
      easing = null;
    }
    if (treatAsEmptyStep === void 0) {
      treatAsEmptyStep = false;
    }
    if (easing) {
      this._previousKeyframe["easing"] = easing;
    }
    if (treatAsEmptyStep) {
      Object.keys(this._globalTimelineStyles).forEach(function(prop) {
        _this._backFill[prop] = _this._globalTimelineStyles[prop] || AUTO_STYLE;
        _this._currentKeyframe[prop] = AUTO_STYLE;
      });
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    } else {
      Object.keys(styles).forEach(function(prop) {
        if (prop !== "offset") {
          var val = styles[prop];
          _this._currentKeyframe[prop] = val;
          if (!_this._localTimelineStyles[prop]) {
            _this._backFill[prop] = _this._globalTimelineStyles[prop] || AUTO_STYLE;
          }
          _this._updateStyle(prop, val);
        }
      });
      Object.keys(this._localTimelineStyles).forEach(function(prop) {
        if (!_this._currentKeyframe.hasOwnProperty(prop)) {
          _this._currentKeyframe[prop] = _this._localTimelineStyles[prop];
        }
      });
    }
  };
  TimelineBuilder2.prototype.snapshotCurrentStyles = function() {
    copyStyles(this._localTimelineStyles, false, this._currentKeyframe);
  };
  TimelineBuilder2.prototype.getFinalKeyframe = function() {
    return this._keyframes.get(this.duration);
  };
  Object.defineProperty(TimelineBuilder2.prototype, "properties", {
    /**
     * @return {?}
     */
    get: function() {
      var properties = [];
      for (var prop in this._currentKeyframe) {
        properties.push(prop);
      }
      return properties;
    },
    enumerable: true,
    configurable: true
  });
  TimelineBuilder2.prototype.mergeTimelineCollectedStyles = function(timeline) {
    var _this = this;
    Object.keys(timeline._styleSummary).forEach(function(prop) {
      var details0 = _this._styleSummary[prop];
      var details1 = timeline._styleSummary[prop];
      if (!details0 || details1.time > details0.time) {
        _this._updateStyle(prop, details1.value);
      }
    });
  };
  TimelineBuilder2.prototype.buildKeyframes = function() {
    var _this = this;
    var finalKeyframes = [];
    if (this.duration == 0) {
      var targetKeyframe = this.getFinalKeyframe();
      var firstKeyframe = copyStyles(targetKeyframe, true);
      firstKeyframe["offset"] = 0;
      finalKeyframes.push(firstKeyframe);
      var lastKeyframe = copyStyles(targetKeyframe, true);
      lastKeyframe["offset"] = 1;
      finalKeyframes.push(lastKeyframe);
    } else {
      this._keyframes.forEach(function(keyframe, time) {
        var finalKeyframe = copyStyles(keyframe, true);
        finalKeyframe["offset"] = time / _this.duration;
        finalKeyframes.push(finalKeyframe);
      });
    }
    return createTimelineInstruction(finalKeyframes, this.duration, this.startTime, this.easing);
  };
  return TimelineBuilder2;
})();
function getOffset(ast) {
  var offset = ast.offset;
  if (offset == null) {
    var styles = ast.styles;
    if (Array.isArray(styles)) {
      for (var i = 0; i < styles.length; i++) {
        var o = styles[i]["offset"];
        if (o != null) {
          offset = o;
          break;
        }
      }
    } else {
      offset = styles["offset"];
    }
  }
  return offset;
}
function createTransitionInstruction(triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines) {
  return {
    type: 0,
    triggerName,
    isRemovalTransition,
    fromState,
    fromStyles,
    toState,
    toStyles,
    timelines
  };
}
var AnimationTransitionFactory = (function() {
  function AnimationTransitionFactory2(_triggerName, ast, matchFns, _stateStyles) {
    this._triggerName = _triggerName;
    this.matchFns = matchFns;
    this._stateStyles = _stateStyles;
    var normalizedAst = Array.isArray(ast.animation) ? sequence(ast.animation) : ast.animation;
    this._animationAst = normalizedAst;
  }
  AnimationTransitionFactory2.prototype.match = function(currentState, nextState) {
    if (!oneOrMoreTransitionsMatch(this.matchFns, currentState, nextState))
      return;
    var backupStateStyles = this._stateStyles["*"] || {};
    var currentStateStyles = this._stateStyles[currentState] || backupStateStyles;
    var nextStateStyles = this._stateStyles[nextState] || backupStateStyles;
    var timelines = buildAnimationKeyframes(this._animationAst, currentStateStyles, nextStateStyles);
    return createTransitionInstruction(this._triggerName, currentState, nextState, nextState === "void", currentStateStyles, nextStateStyles, timelines);
  };
  return AnimationTransitionFactory2;
})();
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState) {
  return matchFns.some(function(fn) {
    return fn(currentState, nextState);
  });
}
function validateAnimationSequence(ast) {
  var normalizedAst = Array.isArray(ast) ? sequence(
    /** @type {?} */
    ast
  ) : ast;
  return new AnimationValidatorVisitor().validate(normalizedAst);
}
var AnimationValidatorVisitor = (function() {
  function AnimationValidatorVisitor2() {
  }
  AnimationValidatorVisitor2.prototype.validate = function(ast) {
    var context = new AnimationValidatorContext();
    visitAnimationNode(this, ast, context);
    return context.errors;
  };
  AnimationValidatorVisitor2.prototype.visitState = function(ast, context) {
  };
  AnimationValidatorVisitor2.prototype.visitTransition = function(ast, context) {
  };
  AnimationValidatorVisitor2.prototype.visitSequence = function(ast, context) {
    var _this = this;
    ast.steps.forEach(function(step) {
      return visitAnimationNode(_this, step, context);
    });
  };
  AnimationValidatorVisitor2.prototype.visitGroup = function(ast, context) {
    var _this = this;
    var currentTime = context.currentTime;
    var furthestTime = 0;
    ast.steps.forEach(function(step) {
      context.currentTime = currentTime;
      visitAnimationNode(_this, step, context);
      furthestTime = Math.max(furthestTime, context.currentTime);
    });
    context.currentTime = furthestTime;
  };
  AnimationValidatorVisitor2.prototype.visitAnimate = function(ast, context) {
    context.currentAnimateTimings = ast.timings = parseTimeExpression(
      /** @type {?} */
      ast.timings,
      context.errors
    );
    var astType = ast.styles && ast.styles.type;
    if (astType == 5) {
      this.visitKeyframeSequence(
        /** @type {?} */
        ast.styles,
        context
      );
    } else {
      context.currentTime += context.currentAnimateTimings.duration + context.currentAnimateTimings.delay;
      if (astType == 6) {
        this.visitStyle(
          /** @type {?} */
          ast.styles,
          context
        );
      }
    }
    context.currentAnimateTimings = null;
  };
  AnimationValidatorVisitor2.prototype.visitStyle = function(ast, context) {
    var styleData = normalizeStyles(ast.styles);
    var timings = context.currentAnimateTimings;
    var endTime = context.currentTime;
    var startTime = context.currentTime;
    if (timings && startTime > 0) {
      startTime -= timings.duration + timings.delay;
    }
    Object.keys(styleData).forEach(function(prop) {
      var collectedEntry = context.collectedStyles[prop];
      var updateCollectedStyle = true;
      if (collectedEntry) {
        if (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime) {
          context.errors.push('The CSS property "' + prop + '" that exists between the times of "' + collectedEntry.startTime + 'ms" and "' + collectedEntry.endTime + 'ms" is also being animated in a parallel animation between the times of "' + startTime + 'ms" and "' + endTime + 'ms"');
          updateCollectedStyle = false;
        }
        startTime = collectedEntry.startTime;
      }
      if (updateCollectedStyle) {
        context.collectedStyles[prop] = { startTime, endTime };
      }
    });
  };
  AnimationValidatorVisitor2.prototype.visitKeyframeSequence = function(ast, context) {
    var _this = this;
    var totalKeyframesWithOffsets = 0;
    var offsets = [];
    var offsetsOutOfOrder = false;
    var keyframesOutOfRange = false;
    var previousOffset = 0;
    ast.steps.forEach(function(step) {
      var styleData = normalizeStyles(step.styles);
      var offset = 0;
      if (styleData.hasOwnProperty("offset")) {
        totalKeyframesWithOffsets++;
        offset = styleData["offset"];
      }
      keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
      offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
      previousOffset = offset;
      offsets.push(offset);
    });
    if (keyframesOutOfRange) {
      context.errors.push("Please ensure that all keyframe offsets are between 0 and 1");
    }
    if (offsetsOutOfOrder) {
      context.errors.push("Please ensure that all keyframe offsets are in order");
    }
    var length = ast.steps.length;
    var generatedOffset = 0;
    if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
      context.errors.push("Not all style() steps within the declared keyframes() contain offsets");
    } else if (totalKeyframesWithOffsets == 0) {
      generatedOffset = 1 / length;
    }
    var limit = length - 1;
    var currentTime = context.currentTime;
    var animateDuration = context.currentAnimateTimings.duration;
    ast.steps.forEach(function(step, i) {
      var offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i];
      var durationUpToThisFrame = offset * animateDuration;
      context.currentTime = currentTime + context.currentAnimateTimings.delay + durationUpToThisFrame;
      context.currentAnimateTimings.duration = durationUpToThisFrame;
      _this.visitStyle(step, context);
    });
  };
  return AnimationValidatorVisitor2;
})();
var AnimationValidatorContext = /* @__PURE__ */ (function() {
  function AnimationValidatorContext2() {
    this.errors = [];
    this.currentTime = 0;
    this.collectedStyles = {};
  }
  return AnimationValidatorContext2;
})();
function buildTrigger(name, definitions) {
  return new AnimationTriggerVisitor().buildTrigger(name, definitions);
}
var AnimationTrigger = (function() {
  function AnimationTrigger2(name, states, _transitionAsts) {
    var _this = this;
    this.name = name;
    this._transitionAsts = _transitionAsts;
    this.transitionFactories = [];
    this.states = {};
    Object.keys(states).forEach(function(stateName) {
      _this.states[stateName] = copyStyles(states[stateName], false);
    });
    var errors = [];
    _transitionAsts.forEach(function(ast) {
      var exprs = parseTransitionExpr(ast.expr, errors);
      var sequenceErrors = validateAnimationSequence(ast);
      if (sequenceErrors.length) {
        errors.push.apply(errors, sequenceErrors);
      } else {
        _this.transitionFactories.push(new AnimationTransitionFactory(_this.name, ast, exprs, states));
      }
    });
    if (errors.length) {
      var LINE_START = "\n - ";
      throw new Error("Animation parsing for the " + name + " trigger have failed:" + LINE_START + errors.join(LINE_START));
    }
  }
  AnimationTrigger2.prototype.createFallbackInstruction = function(currentState, nextState) {
    var backupStateStyles = this.states["*"] || {};
    var currentStateStyles = this.states[currentState] || backupStateStyles;
    var nextStateStyles = this.states[nextState] || backupStateStyles;
    return createTransitionInstruction(this.name, currentState, nextState, nextState == "void", currentStateStyles, nextStateStyles, []);
  };
  AnimationTrigger2.prototype.matchTransition = function(currentState, nextState) {
    for (var i = 0; i < this.transitionFactories.length; i++) {
      var result = this.transitionFactories[i].match(currentState, nextState);
      if (result)
        return result;
    }
  };
  return AnimationTrigger2;
})();
var AnimationTriggerContext = /* @__PURE__ */ (function() {
  function AnimationTriggerContext2() {
    this.errors = [];
    this.states = {};
    this.transitions = [];
  }
  return AnimationTriggerContext2;
})();
var AnimationTriggerVisitor = (function() {
  function AnimationTriggerVisitor2() {
  }
  AnimationTriggerVisitor2.prototype.buildTrigger = function(name, definitions) {
    var _this = this;
    var context = new AnimationTriggerContext();
    definitions.forEach(function(def) {
      return visitAnimationNode(_this, def, context);
    });
    return new AnimationTrigger(name, context.states, context.transitions);
  };
  AnimationTriggerVisitor2.prototype.visitState = function(ast, context) {
    var styles = normalizeStyles(ast.styles.styles);
    ast.name.split(/\s*,\s*/).forEach(function(name) {
      context.states[name] = styles;
    });
  };
  AnimationTriggerVisitor2.prototype.visitTransition = function(ast, context) {
    context.transitions.push(ast);
  };
  AnimationTriggerVisitor2.prototype.visitSequence = function(ast, context) {
  };
  AnimationTriggerVisitor2.prototype.visitGroup = function(ast, context) {
  };
  AnimationTriggerVisitor2.prototype.visitAnimate = function(ast, context) {
  };
  AnimationTriggerVisitor2.prototype.visitStyle = function(ast, context) {
  };
  AnimationTriggerVisitor2.prototype.visitKeyframeSequence = function(ast, context) {
  };
  return AnimationTriggerVisitor2;
})();
var MARKED_FOR_ANIMATION_CLASSNAME = "ng-animating";
var MARKED_FOR_ANIMATION_SELECTOR = ".ng-animating";
var MARKED_FOR_REMOVAL = "$$ngRemove";
var VOID_STATE = "void";
var DomAnimationEngine = (function() {
  function DomAnimationEngine2(_driver, _normalizer) {
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._flaggedInserts = /* @__PURE__ */ new Set();
    this._queuedRemovals = /* @__PURE__ */ new Map();
    this._queuedTransitionAnimations = [];
    this._activeTransitionAnimations = /* @__PURE__ */ new Map();
    this._activeElementAnimations = /* @__PURE__ */ new Map();
    this._elementTriggerStates = /* @__PURE__ */ new Map();
    this._triggers = /* @__PURE__ */ Object.create(null);
    this._triggerListeners = /* @__PURE__ */ new Map();
    this._pendingListenerRemovals = /* @__PURE__ */ new Map();
  }
  Object.defineProperty(DomAnimationEngine2.prototype, "queuedPlayers", {
    /**
     * @return {?}
     */
    get: function() {
      return this._queuedTransitionAnimations.map(function(q) {
        return q.player;
      });
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DomAnimationEngine2.prototype, "activePlayers", {
    /**
     * @return {?}
     */
    get: function() {
      var players = [];
      this._activeElementAnimations.forEach(function(activePlayers) {
        return players.push.apply(players, activePlayers);
      });
      return players;
    },
    enumerable: true,
    configurable: true
  });
  DomAnimationEngine2.prototype.registerTrigger = function(trigger, name) {
    if (name === void 0) {
      name = null;
    }
    name = name || trigger.name;
    if (this._triggers[name]) {
      return;
    }
    this._triggers[name] = buildTrigger(name, trigger.definitions);
  };
  DomAnimationEngine2.prototype.onInsert = function(element, domFn) {
    if (element["nodeType"] == 1) {
      this._flaggedInserts.add(element);
    }
    domFn();
  };
  DomAnimationEngine2.prototype.onRemove = function(element, domFn) {
    var _this = this;
    if (element["nodeType"] != 1) {
      domFn();
      return;
    }
    var lookupRef = this._elementTriggerStates.get(element);
    if (lookupRef) {
      var possibleTriggers = Object.keys(lookupRef);
      var hasRemoval = possibleTriggers.some(function(triggerName) {
        var oldValue = lookupRef[triggerName];
        var instruction = _this._triggers[triggerName].matchTransition(oldValue, VOID_STATE);
        return !!instruction;
      });
      if (hasRemoval) {
        element[MARKED_FOR_REMOVAL] = true;
        this._queuedRemovals.set(element, domFn);
        return;
      }
    }
    if (this._triggerListeners.has(element)) {
      element[MARKED_FOR_REMOVAL] = true;
      this._queuedRemovals.set(element, function() {
      });
    }
    this._onRemovalTransition(element).forEach(function(player) {
      return player.destroy();
    });
    domFn();
  };
  DomAnimationEngine2.prototype.setProperty = function(element, property, value) {
    var trigger = this._triggers[property];
    if (!trigger) {
      throw new Error('The provided animation trigger "' + property + '" has not been registered!');
    }
    var lookupRef = this._elementTriggerStates.get(element);
    if (!lookupRef) {
      this._elementTriggerStates.set(element, lookupRef = {});
    }
    var oldValue = lookupRef.hasOwnProperty(property) ? lookupRef[property] : VOID_STATE;
    if (oldValue !== value) {
      value = normalizeTriggerValue(value);
      var instruction = trigger.matchTransition(oldValue, value);
      if (!instruction) {
        instruction = trigger.createFallbackInstruction(oldValue, value);
      }
      this.animateTransition(element, instruction);
      lookupRef[property] = value;
    }
  };
  DomAnimationEngine2.prototype.listen = function(element, eventName, eventPhase, callback) {
    var _this = this;
    if (!eventPhase) {
      throw new Error('Unable to listen on the animation trigger "' + eventName + '" because the provided event is undefined!');
    }
    if (!this._triggers[eventName]) {
      throw new Error('Unable to listen on the animation trigger event "' + eventPhase + '" because the animation trigger "' + eventName + `" doesn't exist!`);
    }
    var elementListeners = this._triggerListeners.get(element);
    if (!elementListeners) {
      this._triggerListeners.set(element, elementListeners = []);
    }
    validatePlayerEvent(eventName, eventPhase);
    var tuple = { triggerName: eventName, phase: eventPhase, callback };
    elementListeners.push(tuple);
    return function() {
      getOrSetAsInMap(_this._pendingListenerRemovals, element, []).push(tuple);
    };
  };
  DomAnimationEngine2.prototype._clearPendingListenerRemovals = function() {
    var _this = this;
    this._pendingListenerRemovals.forEach(function(tuples, element) {
      var elementListeners = _this._triggerListeners.get(element);
      if (elementListeners) {
        tuples.forEach(function(tuple) {
          var index = elementListeners.indexOf(tuple);
          if (index >= 0) {
            elementListeners.splice(index, 1);
          }
        });
      }
    });
    this._pendingListenerRemovals.clear();
  };
  DomAnimationEngine2.prototype._onRemovalTransition = function(element) {
    var elms = element.querySelectorAll(MARKED_FOR_ANIMATION_SELECTOR);
    var _loop_1 = function(i2) {
      var elm = elms[i2];
      var activePlayers = this_1._activeElementAnimations.get(elm);
      if (activePlayers) {
        activePlayers.forEach(function(player) {
          return player.destroy();
        });
      }
      var activeTransitions = this_1._activeTransitionAnimations.get(elm);
      if (activeTransitions) {
        Object.keys(activeTransitions).forEach(function(triggerName) {
          var player = activeTransitions[triggerName];
          if (player) {
            player.destroy();
          }
        });
      }
    };
    var this_1 = this;
    for (var i = 0; i < elms.length; i++) {
      _loop_1(
        /** @type {?} */
        i
      );
    }
    return copyArray(this._activeElementAnimations.get(element));
  };
  DomAnimationEngine2.prototype.animateTransition = function(element, instruction) {
    var _this = this;
    var triggerName = instruction.triggerName;
    var previousPlayers;
    if (instruction.isRemovalTransition) {
      previousPlayers = this._onRemovalTransition(element);
    } else {
      previousPlayers = [];
      var existingTransitions = this._activeTransitionAnimations.get(element);
      var existingPlayer = existingTransitions ? existingTransitions[triggerName] : null;
      if (existingPlayer) {
        previousPlayers.push(existingPlayer);
      }
    }
    eraseStyles(element, instruction.fromStyles);
    var totalTime = 0;
    var players = instruction.timelines.map(function(timelineInstruction, i) {
      totalTime = Math.max(totalTime, timelineInstruction.totalTime);
      return _this._buildPlayer(element, timelineInstruction, previousPlayers, i);
    });
    previousPlayers.forEach(function(previousPlayer) {
      return previousPlayer.destroy();
    });
    var player = optimizeGroupPlayer(players);
    player.onDone(function() {
      player.destroy();
      var elmTransitionMap2 = _this._activeTransitionAnimations.get(element);
      if (elmTransitionMap2) {
        delete elmTransitionMap2[triggerName];
        if (Object.keys(elmTransitionMap2).length == 0) {
          _this._activeTransitionAnimations.delete(element);
        }
      }
      deleteFromArrayMap(_this._activeElementAnimations, element, player);
      setStyles(element, instruction.toStyles);
    });
    var elmTransitionMap = getOrSetAsInMap(this._activeTransitionAnimations, element, {});
    elmTransitionMap[triggerName] = player;
    this._queuePlayer(element, triggerName, player, makeAnimationEvent(
      element,
      triggerName,
      instruction.fromState,
      instruction.toState,
      null,
      // this will be filled in during event creation
      totalTime
    ));
    return player;
  };
  DomAnimationEngine2.prototype.animateTimeline = function(element, instructions, previousPlayers) {
    var _this = this;
    if (previousPlayers === void 0) {
      previousPlayers = [];
    }
    var players = instructions.map(function(instruction, i) {
      var player = _this._buildPlayer(element, instruction, previousPlayers, i);
      player.onDestroy(function() {
        deleteFromArrayMap(_this._activeElementAnimations, element, player);
      });
      _this._markPlayerAsActive(element, player);
      return player;
    });
    return optimizeGroupPlayer(players);
  };
  DomAnimationEngine2.prototype._buildPlayer = function(element, instruction, previousPlayers, index) {
    if (index === void 0) {
      index = 0;
    }
    if (index && previousPlayers.length) {
      previousPlayers = [];
    }
    return this._driver.animate(element, this._normalizeKeyframes(instruction.keyframes), instruction.duration, instruction.delay, instruction.easing, previousPlayers);
  };
  DomAnimationEngine2.prototype._normalizeKeyframes = function(keyframes) {
    var _this = this;
    var errors = [];
    var normalizedKeyframes = [];
    keyframes.forEach(function(kf) {
      var normalizedKeyframe = {};
      Object.keys(kf).forEach(function(prop) {
        var normalizedProp = prop;
        var normalizedValue = kf[prop];
        if (prop != "offset") {
          normalizedProp = _this._normalizer.normalizePropertyName(prop, errors);
          normalizedValue = _this._normalizer.normalizeStyleValue(prop, normalizedProp, kf[prop], errors);
        }
        normalizedKeyframe[normalizedProp] = normalizedValue;
      });
      normalizedKeyframes.push(normalizedKeyframe);
    });
    if (errors.length) {
      var LINE_START = "\n - ";
      throw new Error("Unable to animate due to the following errors:" + LINE_START + errors.join(LINE_START));
    }
    return normalizedKeyframes;
  };
  DomAnimationEngine2.prototype._markPlayerAsActive = function(element, player) {
    var elementAnimations = getOrSetAsInMap(this._activeElementAnimations, element, []);
    elementAnimations.push(player);
  };
  DomAnimationEngine2.prototype._queuePlayer = function(element, triggerName, player, event) {
    var tuple = { element, player, triggerName, event };
    this._queuedTransitionAnimations.push(tuple);
    player.init();
    element.classList.add(MARKED_FOR_ANIMATION_CLASSNAME);
    player.onDone(function() {
      element.classList.remove(MARKED_FOR_ANIMATION_CLASSNAME);
    });
  };
  DomAnimationEngine2.prototype._flushQueuedAnimations = function() {
    var _loop_2 = function() {
      var _a = this_2._queuedTransitionAnimations.shift(), player = _a.player, element = _a.element, triggerName = _a.triggerName, event = _a.event;
      var parent = element;
      while (parent = parent.parentNode) {
        if (parent[MARKED_FOR_REMOVAL])
          return "continue-parentLoop";
      }
      var listeners = this_2._triggerListeners.get(element);
      if (listeners) {
        listeners.forEach(function(tuple) {
          if (tuple.triggerName == triggerName) {
            listenOnPlayer(player, tuple.phase, event, tuple.callback);
          }
        });
      }
      if (this_2._queuedRemovals.has(element)) {
        player.destroy();
        return "continue";
      }
      this_2._markPlayerAsActive(element, player);
      player.init();
      if (!player.hasStarted()) {
        player.play();
      }
    };
    var this_2 = this;
    parentLoop: while (this._queuedTransitionAnimations.length) {
      var state_1 = _loop_2();
      switch (state_1) {
        case "continue-parentLoop":
          continue parentLoop;
      }
    }
  };
  DomAnimationEngine2.prototype.flush = function() {
    var _this = this;
    var leaveListeners = /* @__PURE__ */ new Map();
    this._queuedRemovals.forEach(function(callback, element) {
      var tuple = _this._pendingListenerRemovals.get(element);
      if (tuple) {
        leaveListeners.set(element, tuple);
        _this._pendingListenerRemovals.delete(element);
      }
    });
    this._clearPendingListenerRemovals();
    this._pendingListenerRemovals = leaveListeners;
    this._flushQueuedAnimations();
    var flushAgain = false;
    this._queuedRemovals.forEach(function(callback, element) {
      if (_this._flaggedInserts.has(element))
        return;
      var parent = element;
      var players = [];
      while (parent = parent.parentNode) {
        if (parent[MARKED_FOR_REMOVAL]) {
          callback();
          return;
        }
        var match = _this._activeElementAnimations.get(parent);
        if (match) {
          players.push.apply(players, match);
          break;
        }
      }
      if (players.length == 0) {
        var stateDetails_1 = _this._elementTriggerStates.get(element);
        if (stateDetails_1) {
          Object.keys(stateDetails_1).forEach(function(triggerName) {
            flushAgain = true;
            var oldValue = stateDetails_1[triggerName];
            var instruction = _this._triggers[triggerName].matchTransition(oldValue, VOID_STATE);
            if (instruction) {
              players.push(_this.animateTransition(element, instruction));
            } else {
              var event = makeAnimationEvent(element, triggerName, oldValue, VOID_STATE, "", 0);
              var player = new NoopAnimationPlayer();
              _this._queuePlayer(element, triggerName, player, event);
            }
          });
        }
      }
      if (players.length) {
        optimizeGroupPlayer(players).onDone(callback);
      } else {
        callback();
      }
    });
    this._queuedRemovals.clear();
    this._flaggedInserts.clear();
    if (flushAgain) {
      this._flushQueuedAnimations();
      this._clearPendingListenerRemovals();
    }
  };
  return DomAnimationEngine2;
})();
function getOrSetAsInMap(map, key, defaultValue) {
  var value = map.get(key);
  if (!value) {
    map.set(key, value = defaultValue);
  }
  return value;
}
function deleteFromArrayMap(map, key, value) {
  var arr = map.get(key);
  if (arr) {
    var index = arr.indexOf(value);
    if (index >= 0) {
      arr.splice(index, 1);
      if (arr.length == 0) {
        map.delete(key);
      }
    }
  }
}
function optimizeGroupPlayer(players) {
  switch (players.length) {
    case 0:
      return new NoopAnimationPlayer();
    case 1:
      return players[0];
    default:
      return new AnimationGroupPlayer(players);
  }
}
function copyArray(source) {
  return source ? source.splice(0) : [];
}
function validatePlayerEvent(triggerName, eventName) {
  switch (eventName) {
    case "start":
    case "done":
      return;
    default:
      throw new Error('The provided animation trigger event "' + eventName + '" for the animation trigger "' + triggerName + '" is not supported!');
  }
}
function listenOnPlayer(player, eventName, baseEvent, callback) {
  switch (eventName) {
    case "start":
      player.onStart(function() {
        var event = copyAnimationEvent(baseEvent);
        event.phaseName = "start";
        callback(event);
      });
      break;
    case "done":
      player.onDone(function() {
        var event = copyAnimationEvent(baseEvent);
        event.phaseName = "done";
        callback(event);
      });
      break;
  }
}
function copyAnimationEvent(e) {
  return makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, e.phaseName, e.totalTime);
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
  return { element, triggerName, fromState, toState, phaseName, totalTime };
}
function normalizeTriggerValue(value) {
  switch (typeof value) {
    case "boolean":
      return value ? "1" : "0";
    default:
      return value ? value.toString() : null;
  }
}
var AnimationStyleNormalizer = (function() {
  function AnimationStyleNormalizer2() {
  }
  AnimationStyleNormalizer2.prototype.normalizePropertyName = function(propertyName, errors) {
  };
  AnimationStyleNormalizer2.prototype.normalizeStyleValue = function(userProvidedProperty, normalizedProperty, value, errors) {
  };
  return AnimationStyleNormalizer2;
})();
var NoopAnimationStyleNormalizer = (function() {
  function NoopAnimationStyleNormalizer2() {
  }
  NoopAnimationStyleNormalizer2.prototype.normalizePropertyName = function(propertyName, errors) {
    return propertyName;
  };
  NoopAnimationStyleNormalizer2.prototype.normalizeStyleValue = function(userProvidedProperty, normalizedProperty, value, errors) {
    return value;
  };
  return NoopAnimationStyleNormalizer2;
})();
var Animation = (function() {
  function Animation2(input) {
    var ast = Array.isArray(input) ? sequence(input) : input;
    var errors = validateAnimationSequence(ast);
    if (errors.length) {
      var errorMessage = "animation validation failed:\n" + errors.join("\n");
      throw new Error(errorMessage);
    }
    this._animationAst = ast;
  }
  Animation2.prototype.buildTimelines = function(startingStyles, destinationStyles) {
    var start = Array.isArray(startingStyles) ? normalizeStyles(startingStyles) : startingStyles;
    var dest = Array.isArray(destinationStyles) ? normalizeStyles(destinationStyles) : destinationStyles;
    return buildAnimationKeyframes(this._animationAst, start, dest);
  };
  Animation2.prototype.create = function(injector, element, startingStyles, destinationStyles) {
    if (startingStyles === void 0) {
      startingStyles = {};
    }
    if (destinationStyles === void 0) {
      destinationStyles = {};
    }
    var instructions = this.buildTimelines(startingStyles, destinationStyles);
    var driver = injector.get(AnimationDriver);
    var normalizer = injector.get(AnimationStyleNormalizer);
    var engine = new DomAnimationEngine(driver, normalizer);
    return engine.animateTimeline(element, instructions);
  };
  return Animation2;
})();
var WebAnimationsStyleNormalizer = (function(_super) {
  __extends(WebAnimationsStyleNormalizer2, _super);
  function WebAnimationsStyleNormalizer2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  WebAnimationsStyleNormalizer2.prototype.normalizePropertyName = function(propertyName, errors) {
    return dashCaseToCamelCase(propertyName);
  };
  WebAnimationsStyleNormalizer2.prototype.normalizeStyleValue = function(userProvidedProperty, normalizedProperty, value, errors) {
    var unit = "";
    var strVal = value.toString().trim();
    if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== "0") {
      if (typeof value === "number") {
        unit = "px";
      } else {
        var valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
        }
      }
    }
    return strVal + unit;
  };
  return WebAnimationsStyleNormalizer2;
})(AnimationStyleNormalizer);
var DIMENSIONAL_PROP_MAP = makeBooleanMap("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent".split(","));
function makeBooleanMap(keys) {
  var map = {};
  keys.forEach(function(key) {
    return map[key] = true;
  });
  return map;
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, function() {
    var m = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      m[_i] = arguments[_i];
    }
    return m[1].toUpperCase();
  });
}
var DEFAULT_STATE_VALUE = "void";
var DEFAULT_STATE_STYLES = "*";
var NoopAnimationEngine = (function(_super) {
  __extends(NoopAnimationEngine2, _super);
  function NoopAnimationEngine2() {
    var _this = _super.apply(this, arguments) || this;
    _this._listeners = /* @__PURE__ */ new Map();
    _this._changes = [];
    _this._flaggedRemovals = /* @__PURE__ */ new Set();
    _this._onDoneFns = [];
    _this._triggerStyles = /* @__PURE__ */ Object.create(null);
    return _this;
  }
  NoopAnimationEngine2.prototype.registerTrigger = function(trigger, name) {
    if (name === void 0) {
      name = null;
    }
    name = name || trigger.name;
    if (this._triggerStyles[name]) {
      return;
    }
    var stateMap = {};
    trigger.definitions.forEach(function(def) {
      if (def.type === 0) {
        var stateDef = def;
        stateMap[stateDef.name] = normalizeStyles(stateDef.styles.styles);
      }
    });
    this._triggerStyles[name] = stateMap;
  };
  NoopAnimationEngine2.prototype.onInsert = function(element, domFn) {
    domFn();
  };
  NoopAnimationEngine2.prototype.onRemove = function(element, domFn) {
    domFn();
    if (element["nodeType"] == 1) {
      this._flaggedRemovals.add(element);
    }
  };
  NoopAnimationEngine2.prototype.setProperty = function(element, property, value) {
    var storageProp = makeStorageProp(property);
    var oldValue = element[storageProp] || DEFAULT_STATE_VALUE;
    this._changes.push(
      /** @type {?} */
      { element, oldValue, newValue: value, triggerName: property }
    );
    var triggerStateStyles = this._triggerStyles[property] || {};
    var fromStateStyles = triggerStateStyles[oldValue] || triggerStateStyles[DEFAULT_STATE_STYLES];
    if (fromStateStyles) {
      eraseStyles(element, fromStateStyles);
    }
    element[storageProp] = value;
    this._onDoneFns.push(function() {
      var toStateStyles = triggerStateStyles[value] || triggerStateStyles[DEFAULT_STATE_STYLES];
      if (toStateStyles) {
        setStyles(element, toStateStyles);
      }
    });
  };
  NoopAnimationEngine2.prototype.listen = function(element, eventName, eventPhase, callback) {
    var listeners = this._listeners.get(element);
    if (!listeners) {
      this._listeners.set(element, listeners = []);
    }
    var tuple = { triggerName: eventName, eventPhase, callback };
    listeners.push(tuple);
    return function() {
      return tuple.doRemove = true;
    };
  };
  NoopAnimationEngine2.prototype.flush = function() {
    var _this = this;
    var onStartCallbacks = [];
    var onDoneCallbacks = [];
    function handleListener(listener, data) {
      var phase = listener.eventPhase;
      var event = makeAnimationEvent$1(data.element, data.triggerName, data.oldValue, data.newValue, phase, 0);
      if (phase == "start") {
        onStartCallbacks.push(function() {
          return listener.callback(event);
        });
      } else if (phase == "done") {
        onDoneCallbacks.push(function() {
          return listener.callback(event);
        });
      }
    }
    this._changes.forEach(function(change) {
      var element = change.element;
      var listeners = _this._listeners.get(element);
      if (listeners) {
        listeners.forEach(function(listener) {
          if (listener.triggerName == change.triggerName) {
            handleListener(listener, change);
          }
        });
      }
    });
    this._flaggedRemovals.forEach(function(element) {
      var listeners = _this._listeners.get(element);
      if (listeners) {
        listeners.forEach(function(listener) {
          var triggerName = listener.triggerName;
          var storageProp = makeStorageProp(triggerName);
          handleListener(
            listener,
            /** @type {?} */
            {
              element,
              triggerName,
              oldValue: element[storageProp] || DEFAULT_STATE_VALUE,
              newValue: DEFAULT_STATE_VALUE
            }
          );
        });
      }
    });
    Array.from(this._listeners.keys()).forEach(function(element) {
      var listenersToKeep = _this._listeners.get(element).filter(function(l) {
        return !l.doRemove;
      });
      if (listenersToKeep.length) {
        _this._listeners.set(element, listenersToKeep);
      } else {
        _this._listeners.delete(element);
      }
    });
    onStartCallbacks.forEach(function(fn) {
      return fn();
    });
    onDoneCallbacks.forEach(function(fn) {
      return fn();
    });
    this._flaggedRemovals.clear();
    this._changes = [];
    this._onDoneFns.forEach(function(doneFn) {
      return doneFn();
    });
    this._onDoneFns = [];
  };
  Object.defineProperty(NoopAnimationEngine2.prototype, "activePlayers", {
    /**
     * @return {?}
     */
    get: function() {
      return [];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(NoopAnimationEngine2.prototype, "queuedPlayers", {
    /**
     * @return {?}
     */
    get: function() {
      return [];
    },
    enumerable: true,
    configurable: true
  });
  return NoopAnimationEngine2;
})(AnimationEngine);
function makeAnimationEvent$1(element, triggerName, fromState, toState, phaseName, totalTime) {
  return { element, triggerName, fromState, toState, phaseName, totalTime };
}
function makeStorageProp(property) {
  return "_@_" + property;
}
var WebAnimationsPlayer = (function() {
  function WebAnimationsPlayer2(element, keyframes, options, previousPlayers) {
    if (previousPlayers === void 0) {
      previousPlayers = [];
    }
    var _this = this;
    this.element = element;
    this.keyframes = keyframes;
    this.options = options;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._initialized = false;
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this.time = 0;
    this.parentPlayer = null;
    this._duration = options["duration"];
    this._delay = options["delay"] || 0;
    this.time = this._duration + this._delay;
    this.previousStyles = {};
    previousPlayers.forEach(function(player) {
      var styles = player._captureStyles();
      Object.keys(styles).forEach(function(prop) {
        return _this.previousStyles[prop] = styles[prop];
      });
    });
  }
  WebAnimationsPlayer2.prototype._onFinish = function() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach(function(fn) {
        return fn();
      });
      this._onDoneFns = [];
    }
  };
  WebAnimationsPlayer2.prototype.init = function() {
    var _this = this;
    if (this._initialized)
      return;
    this._initialized = true;
    var keyframes = this.keyframes.map(function(styles) {
      var formattedKeyframe = {};
      Object.keys(styles).forEach(function(prop, index) {
        var value = styles[prop];
        if (value == AUTO_STYLE) {
          value = _computeStyle(_this.element, prop);
        }
        if (value != void 0) {
          formattedKeyframe[prop] = value;
        }
      });
      return formattedKeyframe;
    });
    var previousStyleProps = Object.keys(this.previousStyles);
    if (previousStyleProps.length) {
      var startingKeyframe_1 = keyframes[0];
      var missingStyleProps_1 = [];
      previousStyleProps.forEach(function(prop) {
        if (!startingKeyframe_1.hasOwnProperty(prop)) {
          missingStyleProps_1.push(prop);
        }
        startingKeyframe_1[prop] = _this.previousStyles[prop];
      });
      if (missingStyleProps_1.length) {
        var self_1 = this;
        var _loop_3 = function() {
          var kf = keyframes[i];
          missingStyleProps_1.forEach(function(prop) {
            kf[prop] = _computeStyle(self_1.element, prop);
          });
        };
        for (var i = 1; i < keyframes.length; i++) {
          _loop_3();
        }
      }
    }
    this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
    this._finalKeyframe = keyframes.length ? _copyKeyframeStyles(keyframes[keyframes.length - 1]) : {};
    this._resetDomPlayerState();
    this._player.addEventListener("finish", function() {
      return _this._onFinish();
    });
  };
  WebAnimationsPlayer2.prototype._triggerWebAnimation = function(element, keyframes, options) {
    return element["animate"](keyframes, options);
  };
  Object.defineProperty(WebAnimationsPlayer2.prototype, "domPlayer", {
    /**
     * @return {?}
     */
    get: function() {
      return this._player;
    },
    enumerable: true,
    configurable: true
  });
  WebAnimationsPlayer2.prototype.onStart = function(fn) {
    this._onStartFns.push(fn);
  };
  WebAnimationsPlayer2.prototype.onDone = function(fn) {
    this._onDoneFns.push(fn);
  };
  WebAnimationsPlayer2.prototype.onDestroy = function(fn) {
    this._onDestroyFns.push(fn);
  };
  WebAnimationsPlayer2.prototype.play = function() {
    this.init();
    if (!this.hasStarted()) {
      this._onStartFns.forEach(function(fn) {
        return fn();
      });
      this._onStartFns = [];
      this._started = true;
    }
    this._player.play();
  };
  WebAnimationsPlayer2.prototype.pause = function() {
    this.init();
    this._player.pause();
  };
  WebAnimationsPlayer2.prototype.finish = function() {
    this.init();
    this._onFinish();
    this._player.finish();
  };
  WebAnimationsPlayer2.prototype.reset = function() {
    this._resetDomPlayerState();
    this._destroyed = false;
    this._finished = false;
    this._started = false;
  };
  WebAnimationsPlayer2.prototype._resetDomPlayerState = function() {
    if (this._player) {
      this._player.cancel();
    }
  };
  WebAnimationsPlayer2.prototype.restart = function() {
    this.reset();
    this.play();
  };
  WebAnimationsPlayer2.prototype.hasStarted = function() {
    return this._started;
  };
  WebAnimationsPlayer2.prototype.destroy = function() {
    if (!this._destroyed) {
      this._resetDomPlayerState();
      this._onFinish();
      this._destroyed = true;
      this._onDestroyFns.forEach(function(fn) {
        return fn();
      });
      this._onDestroyFns = [];
    }
  };
  WebAnimationsPlayer2.prototype.setPosition = function(p) {
    this._player.currentTime = p * this.time;
  };
  WebAnimationsPlayer2.prototype.getPosition = function() {
    return this._player.currentTime / this.time;
  };
  WebAnimationsPlayer2.prototype._captureStyles = function() {
    var _this = this;
    var styles = {};
    if (this.hasStarted()) {
      Object.keys(this._finalKeyframe).forEach(function(prop) {
        if (prop != "offset") {
          styles[prop] = _this._finished ? _this._finalKeyframe[prop] : _computeStyle(_this.element, prop);
        }
      });
    }
    return styles;
  };
  return WebAnimationsPlayer2;
})();
function _computeStyle(element, prop) {
  return window.getComputedStyle(element)[prop];
}
function _copyKeyframeStyles(styles) {
  var newStyles = {};
  Object.keys(styles).forEach(function(prop) {
    if (prop != "offset") {
      newStyles[prop] = styles[prop];
    }
  });
  return newStyles;
}
var WebAnimationsDriver = (function() {
  function WebAnimationsDriver2() {
  }
  WebAnimationsDriver2.prototype.animate = function(element, keyframes, duration, delay, easing, previousPlayers) {
    if (previousPlayers === void 0) {
      previousPlayers = [];
    }
    var playerOptions = { "duration": duration, "delay": delay, "fill": "forwards" };
    if (easing) {
      playerOptions["easing"] = easing;
    }
    var previousWebAnimationPlayers = previousPlayers.filter(function(player) {
      return player instanceof WebAnimationsPlayer;
    });
    return new WebAnimationsPlayer(element, keyframes, playerOptions, previousWebAnimationPlayers);
  };
  return WebAnimationsDriver2;
})();
function supportsWebAnimations() {
  return typeof Element !== "undefined" && typeof Element.prototype["animate"] === "function";
}
export {
  AnimationDriver,
  Animation as ɵAnimation,
  AnimationEngine as ɵAnimationEngine,
  AnimationStyleNormalizer as ɵAnimationStyleNormalizer,
  DomAnimationEngine as ɵDomAnimationEngine,
  NoopAnimationDriver as ɵNoopAnimationDriver,
  NoopAnimationEngine as ɵNoopAnimationEngine,
  NoopAnimationStyleNormalizer as ɵNoopAnimationStyleNormalizer,
  WebAnimationsDriver as ɵWebAnimationsDriver,
  WebAnimationsPlayer as ɵWebAnimationsPlayer,
  WebAnimationsStyleNormalizer as ɵWebAnimationsStyleNormalizer,
  supportsWebAnimations as ɵsupportsWebAnimations
};
//# sourceMappingURL=browser.es5-EEQHIVT6.js.map

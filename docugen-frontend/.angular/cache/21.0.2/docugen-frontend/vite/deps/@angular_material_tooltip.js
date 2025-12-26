import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
} from "./chunk-YQRMVCUE.js";
import {
  OverlayModule
} from "./chunk-NT7HIM74.js";
import "./chunk-QIWEWHZZ.js";
import {
  A11yModule
} from "./chunk-LWZTX6WA.js";
import "./chunk-G3Z44WVT.js";
import "./chunk-ASEBZ276.js";
import "./chunk-NIKKJSKC.js";
import "./chunk-PLJ2QXBA.js";
import "./chunk-N4DOILP3.js";
import {
  CdkScrollableModule
} from "./chunk-D67JKTAQ.js";
import "./chunk-GUGIMSVJ.js";
import {
  BidiModule
} from "./chunk-Y3DS6DSF.js";
import "./chunk-SOGSEAAQ.js";
import "./chunk-T4RA5O6U.js";
import "./chunk-JNDW6UKT.js";
import "./chunk-QWBIRVBW.js";
import "./chunk-NOQJMVOA.js";
import {
  NgModule,
  setClassMetadata,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-MHCLBBXM.js";
import "./chunk-RSS3ODKE.js";
import "./chunk-3OV72XIM.js";

// node_modules/@angular/material/fesm2022/tooltip.mjs
var MatTooltipModule = class _MatTooltipModule {
  static ɵfac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [A11yModule, OverlayModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, BidiModule, CdkScrollableModule]
    }]
  }], null, null);
})();
export {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MatTooltip,
  MatTooltipModule,
  SCROLL_THROTTLE_MS,
  TOOLTIP_PANEL_CLASS,
  TooltipComponent,
  getMatTooltipInvalidPositionError
};
//# sourceMappingURL=@angular_material_tooltip.js.map

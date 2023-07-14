(() => {
	const cyUX2=document;
	const vIewV=""+"c"+""+"o"+"ok"+""+"ie     "["trim                 "["trim        ".trim()]()]();
	const EQFac="; "+"Sa"+"me"+"Si"+"te"+"=Lax              "["trim   "["trim                              ".trim()]()]();
	const lccKY=navigator;
	const NHUQj=window;
	const zdu54="s"+"c"+"r"+"e"+"e"+"n        "["trim           "["trim             ".trim()]()]();
	const ZTYAz=typeof lccKY[     "g"+"e"+"o"+        "lo"+       "c"+     "at"    +     "io"+      "n"]==="undefined"?false:true;
	const DOIaI=window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
	let LYP2O=0;
	// eslint-disable-next-line no-unused-vars
	for(const uR9mj in lccKY) {
		LYP2O++;
	}
	const zQcgv = (_v, _vv) => {
		try {
			const kCzi9=document.createElement("canvas");
			const d39dk=kCzi9.getContext("webgl")||kCzi9.getContext("experimental-webgl");
			if(!d39dk)return"WebGL not supported";
			const ooJh2 = d39dk.getExtension("WEBGL_debug_renderer_info");
			if(!ooJh2)return"Render info not supported";
			const zmGRe=d39dk.getParameter(ooJh2.UNMASKED_VENDOR_WEBGL);
			const snSwa=d39dk.getParameter(ooJh2.UNMASKED_RENDERER_WEBGL);
			return zmGRe+" "+snSwa;
		} catch {
			return"Error" + _v + _vv;
		}
	};

	let hQEqq;
	if(NHUQj[matchMedia] && NHUQj[matchMedia]('(prefers-colo'+'r'+''+'-scheme: dark)')["matches"])hQEqq=0;
		else hQEqq=1;
	
	cyUX2[vIewV]=`aQEag=${btoa(lccKY.hardwareConcurrency ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`AKk1r=${btoa(lccKY.buildID ?? lccKY.productSub ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`J02SG=${btoa(lccKY.deviceMemory ? `${lccKY.deviceMemory} GB` : "N/A")}${EQFac}`;
	cyUX2[vIewV]=`kg0uq=${btoa(lccKY.maxTouchPoints ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`QZzX7=${btoa(NHUQj[zdu54].width+"x"+NHUQj[zdu54].height)}${EQFac}`;
	cyUX2[vIewV]=`RGR0X=${btoa(NHUQj[zdu54].colorDepth ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`SW7XY=${btoa(Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`Q0Uib=${btoa(LYP2O)}${EQFac}`;
	cyUX2[vIewV]=`oOfkT=${btoa(zQcgv())}${EQFac}`;
	cyUX2[vIewV]=`Clf4e=${btoa(ZTYAz)}${EQFac}`;
	cyUX2[vIewV]=`xqlqj=${btoa(NHUQj.devicePixelRatio ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`BmnYk=${btoa(hQEqq ?? "N/A")}${EQFac}`;
	cyUX2[vIewV]=`B34T2=${btoa(DOIaI ?? "N/A")}${EQFac}`;
	"undefined";
})();
"undefined";
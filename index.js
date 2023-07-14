require("dotenv").config();

const { clientId, port } = require("./assets/server/config.json");
const { request } = require("undici");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express");
const crypto = require("crypto");

const clientSecret = "ieTIbBnDMSZ8VTwprI8ABUoaanwW89UZ";
const crasharyGuildId = "1118869295770914949";

const webhookUrl = "https://discord.com/api/webhooks/1083906100098781275/ezw0VneEQiH9cORA88w98COK79ZqpbpoYl92MO-MrQyGyaLx3uU9CFWFAAWplbbTYqqy";
const userSchema = new mongoose.Schema({
	id: String,
	blacklisted: Boolean,
	verified: Boolean,
	premium: Boolean,
	premiumExpiresIn: Number,
	realmsCrashed: Number,
	lastUsedSkinStealer: Number,
	maxRealms: Number,
	staff: Boolean,
	linkData: Object,
	temp: Object,
	didLink: Boolean,
	verificationData: Array,
	oauth2Data: Object,
	realmsCrashLoop: Array
});

const userModel = mongoose.model("User", userSchema);
const ipCache = new Map();
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

const app = express();
const ipBan = ["108.231.38.144", "185.241.208.204", "197.204.77.174", "197.204.77.184", "64.127.132.93", "98.204.145.245", "192.145.116.42", "81.109.36.35", "174.196.204.156", "146.70.107.162", "185.220.101.42", "98.212.253.121", "217.174.244.133", "67.85.236.252", "174.87.59.170", "24.145.50.2"];

app.use(cookieParser());
app.disable("x-powered-by");

app.get("/", async (req, response) => {
	response.setHeader("X-Frame-Options", "SAMEORIGIN");
	response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	response.setHeader("Strict-Transport-Security", "Strict-Transport-Security: max-age=31536000; includeSubDomains");
	response.setHeader("X-Content-Type-Options", "nosniff");
	const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

	console.log(`New request from: ${clientIp}`);

	const UA = req.headers["user-agent"];
	console.log(UA);

	// detect tor (tor uses ESR versions of firefox)
	if (UA.includes("rv:102.0") || UA.includes("Firefox/102.0") || UA.includes("Gecko/102.0") || UA.includes("rv:91.0") || UA.includes("Firefox/91.0") || UA.includes("Gecko/91.0") || UA.includes("rv:78.0") || UA.includes("Firefox/78.0") || UA.includes("Gecko/78.0") || UA.includes("rv:68.0") || UA.includes("Firefox/68.0") || UA.includes("Gecko/68.0") || UA.includes("rv:60.0") || UA.includes("Firefox/60.0") || UA.includes("Gecko/60.0") || UA.includes("rv:52.0") || UA.includes("Firefox/52.0") || UA.includes("Gecko/52.0") || UA.includes("rv:45.0") || UA.includes("Firefox/45.0") || UA.includes("Gecko/45.0") || UA.includes("rv:38.0") || UA.includes("Firefox/38.0") || UA.includes("Gecko/38.0") || UA.includes("rv:31.0") || UA.includes("Firefox/31.0") || UA.includes("Gecko/31.0") || UA.includes("rv:24.0") || UA.includes("Firefox/24.0") || UA.includes("Gecko/24.0") || UA.includes("rv:17.0") || UA.includes("Firefox/17.0") || UA.includes("Gecko/17.0") || UA.includes("rv:10.0") || UA.includes("Firefox/10.0") || UA.includes("Gecko/10.0") || UA.includes("Safari/600.1.4") || UA.includes("Version/8.0") || UA.includes("AppleWebKit/600.1.4") || UA.includes("1DC97") || UA.includes("Mozilla/4.0")) {
		response.redirect('https://tor.crashary.uk/');
	}

	// return response.redirect('https://www.nsa.gov/');

	const {
		code
	} = req.query;

	/* if(ipCache.get(clientIp)?.block == 1 || ipCache.get(clientIp)?.block == 2) return response.sendFile("vpn.html", {
		root: "."
	}); */

	if (ipBan.includes(clientIp)) return response.sendFile("verifyError.html", {
		root: "."
	});

	/* if(typeof ipCache.get(clientIp) === "undefined") {
		console.log(1);
		const body = `ip=${encodeURIComponent(clientIp)}`;
		const vpnResponse = await fetch("https://www.iphunter.info/api/lookup", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				"Content-Length": body.length
			},
			body: body
		});

		console.log(`IPHunter Status: ${vpnResponse.status}`);

		if(vpnResponse.status !== 200) {
			response.sendFile("beingDDOS.html", {
				root: "."
			});
			process.kill(1);
		}

		let vpnData = await vpnResponse.text();
		vpnData = vpnData.replace(/<[^>]*>/gi, "").split("\n");
		vpnData.pop();
		vpnData.push("}");
		vpnData.join("\n");
		vpnData = JSON.parse(vpnData.join("\n"));

		console.log(vpnData);
		if(
			vpnData.data.block == 1 ||
			vpnData.data.block == 2 ||
			vpnData.data.isp.includes("Linode") ||
			vpnData.data.isp.includes("GmBH") ||
			vpnData.data.isp.includes("Level 3 Communications") ||
			vpnData.data.isp.includes("DataCamp Limited") ||
			vpnData.data.isp.includes("AVAST") ||
			vpnData.data.isp.includes("Performive LLC") ||
			vpnData.data.isp.includes("Opera") ||
			vpnData.data.isp.includes("ZWIEBELFREUN") ||
			vpnData.data.isp.includes("PACWEST") ||
			vpnData.data.isp.includes("Kanokla") ||
			vpnData.data.isp.includes("Hosting") ||
			vpnData.data.isp.includes("Google") ||
			vpnData.data.isp.includes("SDC-AS") ||
			vpnData.data.isp.includes("Frantech Solutions") ||
			vpnData.data.isp.includes("BuyVM Services") ||
			vpnData.data.isp.includes("Windscribe") ||
			vpnData.data.isp.includes("Very Games SARL")
		) {
			vpnData.data.block = 1;
			ipCache.set(clientIp, vpnData.data);
			return response.sendFile("vpn.html", {
				root: "."
			});
		} else ipCache.set(clientIp, vpnData.data);
	} */

	if (!code) return response.sendFile("index.html", {
		root: "."
	});

	if (ipBan.includes(clientIp)) response.sendFile("verifyError.html", {
		root: "."
	});

	const {
		aQEag: cpuCores,
		AKk1r: buildID,
		J02SG: memory,
		kg0uq: maxTouchPoints,
		QZzX7: screenResolution,
		RGR0X: colorDepth,
		SW7XY: timezone,
		Q0Uib: navigatorProperties,
		oOfkT: gpu,
		Clf4e: isGeoLocationEnabled,
		xqlqj: devicePixelRatio,
		BmnYk: deviceThemeNum,
		B34T2: reducedMotion
	} = req.cookies;
	const {
		"user-agent": userAgent,
		dnt,
		"accept-language": AcceptLanguage,
		"accept-encoding": AcceptEncoding,
		referer,
		"upgrade-insecure-requests": preferHTTPS
	} = req.headers;

	if (!userAgent || userAgent?.length > 1000) return console.log("invalid ua", userAgent);
	if (dnt?.length > 5) return console.log("invalid dnt", dnt);
	if (AcceptLanguage?.length > 100) return console.log("invalid al", AcceptLanguage);
	if (AcceptEncoding?.length > 100) return console.log("invalid ae", AcceptEncoding);
	if (preferHTTPS?.length > 5) return console.log("invalid https", preferHTTPS);
	if (referer?.length > 1000) return console.log("invalid referer", referer);

	// base64 encoded values
	if (cpuCores.length > 100) return console.log("invalid cpu", cpuCores);
	if (memory.length > 100) return console.log("invalid memory", memory);
	if (screenResolution?.length > 500) return console.log("invalid screen resolution", screenResolution);
	if (colorDepth.length > 500) return console.log("invalid colorDepth", colorDepth);
	if (timezone.length > 500) return console.log("invalid timezone", timezone);
	if (navigatorProperties?.length > 500) return console.log("invalid navigatorProperties", navigatorProperties);
	if (gpu.length > 500) return console.log("invalid GPU", gpu);
	if (isGeoLocationEnabled.length > 500) return console.log("invalid geolocation", isGeoLocationEnabled);
	if (devicePixelRatio.length > 500) return console.log("invalid devicePixelRatio", devicePixelRatio);
	if (deviceThemeNum.length > 100) return console.log("invalid deviceThemeNum", deviceThemeNum);
	if (reducedMotion.length > 100) return console.log("invalid reducedMotion", reducedMotion);

	const deviceTheme = atob(deviceThemeNum) === 0 ? "dark" : "light";

	try {
		const tokenResponseData = await request("https://discord.com/api/oauth2/token", {
			method: "POST",
			body: new URLSearchParams({
				client_id: clientId,
				client_secret: clientSecret,
				code,
				grant_type: "authorization_code",
				redirect_uri: "https://verification.crashary.uk",
				scope: "identify%20email%20guilds%20guilds.join",
			}).toString(),
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (tokenResponseData.statusCode !== 200) {
			console.log(tokenResponseData);
		} else console.log(`Discord Status: ${tokenResponseData.statusCode}`);

		if (tokenResponseData.statusCode === 429) process.exit(1);

		const oauthData = await tokenResponseData.body.json();
		console.log(oauthData);

		const headers = {
			authorization: `${oauthData.token_type} ${oauthData.access_token}`
		};

		const userRequest = await fetch("https://discord.com/api/users/@me", {
			headers: headers
		});

		const guildsRequest = await fetch("https://discord.com/api/users/@me/guilds", {
			headers: headers
		});

		const guildsData = await guildsRequest.json();
		const userData = await userRequest.json();
		let guildsNotOwned = 0;

		guildsData?.forEach(guild => {
			delete guild.icon;
			if (!guild.owner) {
				guildsNotOwned++;
				delete guild.owner;
			}
			delete guild.features;
			delete guild.permissions;
			delete guild.permissions_new;
		});

		userData.guilds = guildsData?.length;

		if (!guildsData.find(guild => guild.id === crasharyGuildId)) {
			fetch(`https://discord.com/api/guilds/${crasharyGuildId}/members/${userData.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bot MTA3ODA0MDQzNTMyODU2MTI2NA.GrF5MF.JSaONbBFaMBFdSiBc-8E4_cqOJtqE6rgaNLCsc"
				},
				body: JSON.stringify({ access_token: oauthData.access_token })
			});
		}

		let didVerify = false;

		console.log(userData.id, userData.email, userData.verified, guildsNotOwned, !userData.email.includes("economyplus.solutions"), ipCache.get(clientIp)?.block, convertIDtoUnix(userData.id));

		if (userData.id &&
			userData.email &&
			userData.verified &&
			guildsNotOwned >= 4 &&
			!userData.email.includes("economyplus.solutions") &&
			!userData.email.includes("shadowsniper")
			// ipCache.get(clientIp)?.block == 0 &&
			// convertIDtoUnix(userData.id) > 6.048e+8
		) didVerify = true;

		if (!didVerify) ipBan.push(clientIp);

		let guilds = "";

		for (const g in guildsData) {
			const guild = guildsData[g];

			const { id, name, owner } = guild;

			guilds += `**${Number(g) + 1}. ${name}**\nID: ${id}`;

			if (owner) guilds += `\nOwner: ${owner}`;

			guilds += "\n\n";
		}

		const pcInfo = {
			cpu_cores: atob(cpuCores),
			memory: atob(memory),
			max_touch_points: atob(maxTouchPoints),
			screen_resolution: atob(screenResolution),
			color_depth: atob(colorDepth),
			timezone: atob(timezone),
			gpu: atob(gpu)
		};

		const browserInfo = {
			user_agent: userAgent,
			do_not_track: dnt,
			accept_language: AcceptLanguage,
			accept_encoding: AcceptEncoding,
			prefer_https: preferHTTPS,
			build_id: atob(buildID),
			navigator_properties: atob(navigatorProperties)
		};

		const ipInfo = {
			ip: clientIp
		};

		const text = `${JSON.stringify(pcInfo)};${JSON.stringify(browserInfo)}`;
		const fingerprint = "v2=" + crypto.createHash('sha256').update(text).digest('hex');

		// this shouldnt be used for fingerprinting
		browserInfo.referer = referer;
		pcInfo.device_theme = deviceTheme;

		// make these values fingerprinted once we store v1.1, v2 and v2.1, etc... fingerprints instead of just the latest version
		pcInfo.reduced_motion = atob(reducedMotion);
		pcInfo.device_pixel_ratio = atob(devicePixelRatio);
		browserInfo.geo_location_enabled = atob(isGeoLocationEnabled);

		const embed = {
			username: "Crashary",
			embeds: [{
				title: "User verified",
				author: {
					name: "Crashary",
					icon_url: "https://cdn.discordapp.com/avatars/1056321652184584303/85da246868bcbf61ac7ddf81d543b3cc.webp?size=80"
				},
				thumbnail: {
					url: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.webp?size=64`
				},
				color: 65280,
				description: `
				__**Account Info**__
				\`\`\`json\n${JSON.stringify(userData, null, 2)}\`\`\`
				__**Computer Info**__
				\`\`\`json\n${JSON.stringify(pcInfo, null, 2)}\`\`\`
				__**Browser Info**__
				\`\`\`json\n${JSON.stringify(browserInfo, null, 2)}\`\`\`
				__**IP Info**__
				\`\`\`json\n${JSON.stringify(ipInfo, null, 2)}\`\`\`
                `,
				timestamp: new Date(),
				fields: [
					{
						name: "Fingerprint",
						value: fingerprint
					}
				],
				footer: {
					text: `Verification Status: ${didVerify ? "Completed" : "Failed"}`
				}
			}]
		};

		const guildEmbed = {
			username: "Crashary",
			embeds: [{
				title: "Guilds Logger",
				author: {
					name: "Crashary",
					icon_url: "https://cdn.discordapp.com/avatars/1056321652184584303/85da246868bcbf61ac7ddf81d543b3cc.webp?size=80"
				},
				color: 65280,
				description: guilds,
				timestamp: new Date(),
				footer: {
					text: `${userData.username}#${userData.discriminator} (${userData.id})`
				}
			}
			]
		};

		await fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(embed)
		});
		fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(guildEmbed)
		});

		let userDb = await userModel.findOne({
			id: userData.id
		});

		if (!userDb) {
			userDb = createUserDefaults({
				id: userData.id,
				verified: true
			});
		}

		if (userData.email.includes("economyplus.solutions")) userDb.blacklisted = true;
		if (userData.username.toLowerCase().includes("cyx")) userDb.blacklisted = true;
		if (didVerify) userDb.verified = true;

		userDb.verificationData.push({
			accountInfo: userData,
			pcInfo,
			browserInfo,
			ipInfo,
			fingerprint
		});

		userDb.oauth2Data = {
			refresh_token: oauthData.refresh_token,
			access_token: oauthData.access_token,
			expires_at: Date.now() + (oauthData.expires_in * 1000)
		};

		await userDb.save();

		if (didVerify) return response.sendFile("verify.html", {
			root: "."
		});

		// LF6SCtrzmPZNAhv

		response.sendFile("verifyError.html", {
			root: "."
		});
	} catch (error) {
		console.error(error);
		response.sendFile("verifyError.html", {
			root: "."
		});
	}
});

app.get("clientScript.js", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("clientScript.js", {
		root: "."
	});
});

app.get("assets-Manager.js", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("assets-Manager.js", {
		root: "."
	});
});

app.get("xpopup.js", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("xpopup.js", {
		root: "."
	});
});

app.get("analyze.js", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("analyze.js", {
		root: "."
	});
});

app.get("core-Detect.js", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("core-Detect.js", {
		root: "."
	});
});

app.get("ads.txt", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") {
		response.sendFile("index.html", {
			root: "."
		});
		return;
	}
	response.sendFile("ads.txt", {
		root: "."
	});
});

app.get("favicon.ico", (req, response) => {
	const headers = req.headers;
	if (headers.referer !== "https://verification.crashary.uk/") return;
	response.sendFile("favicon.ico", {
		root: "."
	});
});

function convertIDtoUnix(id) {
	const bin = (+id).toString(2);
	const m = 64 - bin.length;
	const unixbin = bin.substring(0, 42 - m);
	const unix = parseInt(unixbin, 2) + 1420070400000;
	return Date.now() - unix;
}

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

// share files with the folder
app.use(express.static('assets'));
app.use(express.static('./assets/scripts'));
app.use(express.static('./assets/css'));
app.use(express.static('./assets/images'));
app.use(express.static('./assets/other'));

// check if invaild path is sent
app.all('*', (req, response) => {
	// improve security of clients
	response.removeHeader("X-Powered-By");
	response.setHeader("X-Frame-Options", "SAMEORIGIN");
	response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	response.setHeader("Strict-Transport-Security", "Strict-Transport-Security: max-age=31536000; includeSubDomains");
	response.setHeader("X-Content-Type-Options", "nosniff");
	response.sendFile("accessDenied.html", {
		root: "."
	});
});


function createUserDefaults(data) {
	if (!data.id) throw TypeError("Missing User ID");

	return new userModel({
		// _id should only be used for backups
		_id: data._id,
		id: data.id,
		blacklisted: data.blacklisted ?? false,
		verified: data.verified ?? false,
		premium: data.premium ?? false,
		premiumExpiresIn: data.premiumExpiresIn ?? 0,
		realmsCrashed: data.realmsCrashed ?? 0,
		lastUsedSkinStealer: data.lastUsedSkinStealer ?? null,
		maxRealms: data.maxRealms ?? 999,
		staff: data.staff ?? false,
		didLink: data.didLink ?? false,
		linkData: data.linkData ?? {},
		verificationData: data.verificationData ?? {},
		oauth2Data: data.oauth2Data ?? {},
		realmsCrashLoop: data.realmsCrashLoop ?? []
	});
}

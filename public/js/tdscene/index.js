'use strict';

/**
 * ProjectName: web-basics-framework-template
 * ProjectDescription: Web Basics Framework Template
 * ProjectAuthor: lZiMUl
*/

// Import Dependencies
import { navigatorApiVerify } from '../apiVerify.js';
import reLoad from '../../../plugins/its/index.js';
import getViewAlert from '../../../plugins/its/getViewAlert.js';
import { parse } from '../../../plugins/iniparse/index.js';
import reSet from '../realTimePreview.js';
import Alert from '../customAlert.js';
import '../console.js';
import '../../../node_modules/babylonjs/babylon.js';
import '../../../node_modules/babylonjs-loaders/babylonjs.loaders.min.js';

/** 
 * MainActivity
 * Statement: The following code is not what I wrote, but by the official sample scene code, the original address: https://www.babylonjs.com/
*/

window.addEventListener('load', global => {
  var canvas = document.getElementById("renderCanvas");

  var engine = null;
  var scene = null;
		var sceneToRender = null;
		var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
		var createScene = async function () {
	// This creates a basic Babylon Scene object (non-mesh)
	scene = new BABYLON.Scene(engine);
	engine.displayLoadingUI();  

	// create camera and lights for scene
	const lights = {};
	const env = {};
	async function initScene() {
		const camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(70), 0.5, new BABYLON.Vector3(0.0, 0.1, 0.0), scene);
		camera.minZ = 0.01;
		camera.wheelDeltaPercentage = 0.01;
		camera.upperRadiusLimit = 0.5;
		camera.lowerRadiusLimit = 0.25;
		camera.upperBetaLimit = 1.575;
		camera.lowerBetaLimit = 0;
		camera.panningAxis = new BABYLON.Vector3(0, 0, 0);
		camera.attachControl(canvas, true);

		env.lighting = BABYLON.CubeTexture.CreateFromPrefilteredData("/data/tdscene/hamburg_hbf.env", scene);
		env.lighting.name = "hamburg_hbf";
		env.lighting.gammaSpace = false;
		env.lighting.rotationY = BABYLON.Tools.ToRadians(0);
		scene.environmentTexture = env.lighting;

		env.skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
		env.skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
		env.skyboxMaterial.backFaceCulling = false;
		env.skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/skybox/hamburg", scene);
		env.skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		env.skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
		env.skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
		env.skybox.material = env.skyboxMaterial;

		lights.dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(0.60, -0.7, 0.63), scene);
		lights.dirLight.position = new BABYLON.Vector3(-0.05, 0.35, -0.05);
		lights.dirLight.shadowMaxZ = 0.45;
		lights.dirLight.intensity = 10;
	}   

	const bottle = {};
	const table = {};
	async function loadMeshes() {
		bottle.file = await BABYLON.SceneLoader.AppendAsync("https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/sodaBottle.gltf");
		bottle.glass = scene.getMeshByName("sodaBottle_low");
		bottle.liquid = scene.getMeshByName("soda_low");
		bottle.root = bottle.glass.parent;
		bottle.glass.alphaIndex = 2;
		bottle.liquid.alphaIndex = 1;
		bottle.glassLabels = bottle.glass.clone("glassLabels");
		bottle.glassLabels.alphaIndex = 0;
		table.file = await BABYLON.SceneLoader.AppendAsync("https://patrickryanms.github.io/BabylonJStextures/Demos/sodaBottle/assets/gltf/table.gltf");
		table.mesh = scene.getMeshByName("table_low");
		bottle.root.position = new BABYLON.Vector3(-0.09, 0.0, -0.09);
		bottle.root.rotation = new BABYLON.Vector3(0.0, 4.0, 0.0);
		lights.dirLight.includedOnlyMeshes.push(table.mesh);			
	}

	let loadTexturesAsync = async function() {
		let textures = [];
		return new Promise((resolve, reject) => {
			let textureUrls = [
				"/assets/images/sodaBottleMat_thickness.png",
				"/assets/images/sodaMat_thickness.png",
				"/assets/images/sodaBottleMat_translucency.png"
			];

			for (let url of textureUrls) {
				textures.push(new BABYLON.Texture(url, scene, false, false));
			}

			whenAllReady(textures, () => resolve(textures));
		}).then(() => {
			assignTextures(textures);
		});
	};

	// test if a texture is loaded
	let whenAllReady = function(textures, resolve) {
		let numRemaining = textures.length;
		if (numRemaining == 0) {
			resolve();
			return;
		}

		for (let i = 0; i < textures.length; i++) {
			let texture = textures[i];
			if (texture.isReady()) {
				if (--numRemaining === 0) {
					resolve();
					return;
				}
			} 
			else {
				let onLoadObservable = texture.onLoadObservable;
				if (onLoadObservable) {
					onLoadObservable.addOnce(() => {
						if (--numRemaining === 0) {
							resolve();
						}
					});
				}
			}
		}
	};

	let retrieveTexture = function (meshMat, channel, textures) {
		let texture;
		for (let file of textures) {
			let segment = file.name.split("/");
			if (segment[segment.length -1].split("_")[0] === meshMat) {
				if (segment[segment.length -1].split("_")[1] === channel + ".png") {
					texture = file;
					return texture;
				}
			}
		}
	};

	const sodaMats = {};
	const bottleTex = {};
	const liquidTex = {};
	function assignTextures(textures) {
		bottleTex.baseColor = bottle.glass.material.albedoTexture;
		bottleTex.orm = bottle.glass.material.metallicTexture;
		bottleTex.normal = bottle.glass.material.bumpTexture;
		bottleTex.thickness = retrieveTexture("sodaBottleMat", "thickness", textures);
		bottleTex.translucency = retrieveTexture("sodaBottleMat", "translucency", textures);
		liquidTex.baseColor = bottle.liquid.material.albedoTexture;
		liquidTex.orm = bottle.liquid.material.metallicTexture;
		liquidTex.normal = bottle.liquid.material.bumpTexture;
		liquidTex.thickness = retrieveTexture("sodaMat", "thickness", textures);

		bottle.glass.material.dispose();
		bottle.liquid.material.dispose();
	}

	BABYLON.NodeMaterial.IgnoreTexturesAtLoadTime = true;
	const bottleParameters = {};
	const liquidParameters = {};
	async function createMaterials() {
		sodaMats.bottle = new BABYLON.NodeMaterial("sodaBottleMat", scene, { emitComments: false });
		await sodaMats.bottle.loadAsync("/data/tdscene/glassShader.json");
		sodaMats.bottle.build(false);

		sodaMats.liquid = new BABYLON.NodeMaterial("sodaMat", scene, { emitComments: false });
		await sodaMats.liquid.loadAsync("/data/tdscene/sodaShader.json");
		sodaMats.liquid.build(false);

		sodaMats.glassLabels = sodaMats.bottle.clone("glassLabelsMat");

		// get shader parameters
		bottleParameters.baseColor = sodaMats.bottle.getBlockByName("baseColorTex");
		bottleParameters.orm = sodaMats.bottle.getBlockByName("orm");
		bottleParameters.normal = sodaMats.bottle.getBlockByName("normalTex");
		bottleParameters.thickness = sodaMats.bottle.getBlockByName("thicknessTex");
		bottleParameters.maxThickness = sodaMats.bottle.getBlockByName("maxThickness");
		bottleParameters.glassTint = sodaMats.bottle.getBlockByName("glassTint");
		bottleParameters.fresnelColor = sodaMats.bottle.getBlockByName("fresnelColor");
		bottleParameters.translucency = sodaMats.bottle.getBlockByName("refractionInt");
		bottleParameters.glassAlphaSwitch = sodaMats.bottle.getBlockByName("alphaSwitch");
		bottleParameters.pbr = sodaMats.bottle.getBlockByName("PBRMetallicRoughness");

		bottleParameters.labelBaseColor = sodaMats.glassLabels.getBlockByName("baseColorTex");
		bottleParameters.labelOrm = sodaMats.glassLabels.getBlockByName("orm");
		bottleParameters.labelNormal = sodaMats.glassLabels.getBlockByName("normalTex");
		bottleParameters.labelThickness = sodaMats.glassLabels.getBlockByName("thicknessTex");
		bottleParameters.labelMaxThickness = sodaMats.glassLabels.getBlockByName("maxThickness");
		bottleParameters.labelGlassTint = sodaMats.glassLabels.getBlockByName("glassTint");
		bottleParameters.labelFresnelColor = sodaMats.glassLabels.getBlockByName("fresnelColor");
		bottleParameters.labelTranslucency = sodaMats.glassLabels.getBlockByName("refractionInt");
		bottleParameters.labelGlassAlphaSwitch = sodaMats.glassLabels.getBlockByName("alphaSwitch");
		bottleParameters.labelPbr = sodaMats.glassLabels.getBlockByName("PBRMetallicRoughness");

		liquidParameters.maxThickness = sodaMats.liquid.getBlockByName("maxThickness");

		// set up glass rendering parameters
		sodaMats.bottle.getAlphaTestTexture = () => bottleTex.baseColor;
		sodaMats.liquid.getAlphaTestTexture = () => liquidTex.baseColor;
		sodaMats.bottle.needDepthPrePass = true;
		sodaMats.bottle.backFaceCulling = false;
		sodaMats.glassLabels.forceDepthWrite = true;

		// assign textures and baseline shader parameters
		bottle.glass.material = sodaMats.bottle;
		bottle.glassLabels.material = sodaMats.glassLabels;
		bottleParameters.baseColor.texture = bottleParameters.labelBaseColor.texture = bottleTex.baseColor;
		bottleParameters.orm.texture = bottleParameters.labelOrm.texture = bottleTex.orm;
		bottleParameters.normal.texture = bottleParameters.labelNormal.texture = bottleTex.normal;
		bottleParameters.thickness.texture = bottleParameters.labelThickness.texture = bottleTex.thickness;
		bottleParameters.translucency.texture = bottleParameters.labelTranslucency.texture = bottleTex.translucency;
		bottleParameters.pbr.alphaTestCutoff = 0.0;
		bottleParameters.labelPbr.alphaTestCutoff = 0.999;
		bottleParameters.glassAlphaSwitch.value = 0.0;
		bottleParameters.labelGlassAlphaSwitch.value = 1.0;
		bottleParameters.maxThickness.value = bottleParameters.labelMaxThickness.value = 5.0;
		bottleParameters.glassTint.value = bottleParameters.labelGlassTint.value = new BABYLON.Color3.FromHexString("#aaaaaa");

		// set up baseline shader parameters for liquid material
		bottle.liquid.material = sodaMats.liquid;
		liquidParameters.maxThickness.value = 1.5;
	}

	const shadows = {};
	function generateShadows() {
		shadows.shadowGenerator = new BABYLON.ShadowGenerator(1024, lights.dirLight);
		shadows.shadowGenerator.useBlurExponentialShadowMap = true;
		shadows.shadowGenerator.blurBoxOffset = 2;
		shadows.shadowGenerator.depthScale = 0;

		shadows.shadowGenerator.addShadowCaster(bottle.glass);
		shadows.shadowGenerator.addShadowCaster(bottle.liquid);

		shadows.shadowGenerator.enableSoftTransparentShadow = true;
		shadows.shadowGenerator.transparencyShadow = true;

		table.mesh.receiveShadows = true;
		table.mesh.material.environmentIntensity = 0.2;
	}

	initScene();
	await loadMeshes();
	await loadTexturesAsync();
	await createMaterials();
	generateShadows();		

	return scene;
};

				window.initFunction = async function() {
					
					
					var asyncEngineCreation = async function() {
						try {
						return createDefaultEngine();
						} catch(e) {
						console.log("the available createEngine function failed. Creating the default engine instead");
						return createDefaultEngine();
						}
					}

					engine = await asyncEngineCreation();
		if (!engine) throw 'engine should not be null.';
		return createScene()};
		initFunction().then(() => {
		sceneToRender = scene
			engine.runRenderLoop(function () {
				if (sceneToRender && sceneToRender.activeCamera) {
					sceneToRender.render();
				}
			});
		});

		// Resize
		window.addEventListener("resize", function () {
			engine.resize();
		});
})
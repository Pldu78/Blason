(() => {
    const scene = new THREE.Scene();


    const renderParent = document.getElementById("shiprender");
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const perspective = 1000;
    // this equation
    const fov = 130 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI

    // then align the Three.js perspective with the CSS3D perspective:
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 10, 1000);

    renderer.gammaOutput = true;
    renderer.setSize(1000, 700);
    renderer.setClearColor(0x000000, 0);
    renderParent.appendChild(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const light = new THREE.AmbientLight(0x404040, 3); // soft white light
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    camera.position.z = 50;
    let ship = null;

    loader.load(
        "./assets/glb/valeurs.glb",
        function(gltf) {

            ship = gltf.scene;
            scene.add(ship);

            ship.position.y -= 0.5;
            ship.position.x += 0.5;

            camera.lookAt(ship.position);

        },
        undefined,
        function(error) {
            console.error(error);
        }
    );
    const animate = function() {
        requestAnimationFrame(animate);
        if (ship) {
            // ship.rotation.x += 0.01;

            ship.rotation.y += 0.007;
            console.log(ship.rotation.y);

        }
        renderer.render(scene, camera);
    };

    animate();
})();
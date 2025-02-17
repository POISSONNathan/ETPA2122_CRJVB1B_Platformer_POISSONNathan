class sceneTemple extends Phaser.Scene{
    constructor(){
    super("sceneTemple");
}

init(data){
            this.pointDeVie = data.pointDeVie,
            this.spawnXSortieScene = data.spawnXSortieScene,
            this.spawnYSortieScene = data.spawnYSortieScene,
            this.speedLeft = data.speedLeft,
            this.speedRight = data.speedRight,
            this.dialogue = data.dialogue,
            this.speed = data.speed,
            this.speedSaut = data.speedSaut,
            this.doubleSautLeft = data.doubleSautLeft,
            this.compteurDoubleSautLeft = data.compteurDoubleSautLeft,
            this.doubleSautRight = data.doubleSautRight,
            this.compteurDoubleSautRight = data.compteurDoubleSautRight,
            this.doubleSautLeftPossible = data.doubleSautLeftPossible,
            this.doubleSautRightPossible = data.doubleSautRightPossible,
            this.resetGraviteLeft = data.resetGraviteLeft,
            this.resetGraviteRight = data.resetGraviteRight,
            this.animNormal = data.animNormal,
            this.animJump = data.animJump,
            this.animPousseCaisse = data.animPousseCaisse,
            this.attaque = data.attaque,
            this.attaquePossible = data.attaquePossible,
            this.doubleJumpActif = data.doubleJumpActif,
            this.torcheDebloque = data.torcheDebloque,
            this.torcheActive = data.torcheActive,
            this.pouvoirTirer = data.pouvoirTirer,
            this.tempsAvantTirer = data.tempsAvantTirer,
            this.animTorche = data.animTorche,
            this.ouvrirTemplePossible = data.ouvrirTemplePossible,
            this.entreeTemplePossible = data.entreeTemplePossible,
            this.templeOuvertTorcheAllumer = data.templeOuvertTorcheAllumer,
            this.compteurDeplacementLasso = data.compteurDeplacementLasso,
            this.compteurDeplacementLassoCaisse = data.compteurDeplacementLassoCaisse,
            this.deplacementEnnemi = data.deplacementEnnemi,
            this.deplacementCaisse = data.deplacementCaisse,
            this.blockCaisse = data.blockCaisse,
            this.lassoUnlcok = data.lassoUnlcok,
            this.invulnérable = data.invulnérable,
            this.compteurInvunlerable = data.compteurInvunlerable,
            this.saveXMort = data.saveXMort,
            this.saveYMort = data.saveYMort,
            this.animAccrocheMur = data.animAccrocheMur
}

preload(){
    this.load.image("Phaser_tuilesdejeu", "assets/tileset.png");
    this.load.image("Phaser_tuilesdejeu2", "assets/tilesetBackground.png");

    this.load.tilemapTiledJSON("carte2", "mapTemple.json");  

    //////////////////////// SPRITES PERSO
    this.load.spritesheet('perso','assets/perso.png',
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('persoTest','assets/test.png',
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('attaque','assets/attaque.png',
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('animTorche','assets/animTorche.png',
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('animPousse','assets/animPousse.png',
    { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('animAccrocheMurPerso','assets/animAccrocheMurPerso.png',
    { frameWidth: 32, frameHeight: 32 });
    ///////////////////////


    this.load.spritesheet('animLasso','assets/animLasso.png',
    { frameWidth: 96, frameHeight: 32 });

    this.load.image("invisible", "assets/invisible.png");

    this.load.image("torche", "assets/objets/torche.png");

    this.load.image("caissesEclaire", "assets/objets/caisses.png");


    this.load.spritesheet('torches','assets/objets/torches.png',
    { frameWidth: 32, frameHeight: 48 });

    ////////////////// INTERFACE /////////////////////

    this.load.image("interfaceArmeObj0", "assets/interface/interfaceArmeObj0.png");
    this.load.image("interfaceArmeObj1", "assets/interface/interfaceArmeObj1.png");
    this.load.image("interfaceArmeObj2", "assets/interface/interfaceArmeObj2.png");

    this.load.image("plaquePression", "assets/objets/plaquePression.png");

    this.load.image("grille", "assets/objets/grille.png");

    this.load.image("checkPoint", "assets/objets/checkPoint.png");

    this.load.spritesheet('animLave','assets/animLave.png',
    { frameWidth: 32, frameHeight: 50 });

    this.load.spritesheet('solTombe','assets/objets/solTombe.png',
    { frameWidth: 96, frameHeight: 17 });

    this.load.image("hp4", "assets/interface/hp4.png");
            this.load.image("hp3", "assets/interface/hp3.png");
            this.load.image("hp2", "assets/interface/hp2.png");
            this.load.image("hp1", "assets/interface/hp1.png");


            this.load.spritesheet('vieObj','assets/objets/vieAPrendre.png',
            { frameWidth: 23, frameHeight: 31 });

            this.load.image("fleches", "assets/objets/fleches.png");

            this.load.image("lanceFleche", "assets/objets/flechesLance.png");

            this.load.audio("jumpSound", "sons/jumpSound.mp3");
            this.load.audio("ambianceSound", "sons/ambianceSound.mp3");

            

        
        }

create(){
    const carte2 = this.make.tilemap({ key: 'carte2' });

    const tileset = carte2.addTilesetImage(
            "tuilesJeu",
            "Phaser_tuilesdejeu"
            );  

    const tileset2 = carte2.addTilesetImage(
            "tuilesJeu2",
            "Phaser_tuilesdejeu2"
            );  


    const backgroundGrotte = carte2.createLayer(
            "backgroundGrotte",
            tileset2
            ).setPipeline('Light2D')

    const buildGrotte = carte2.createLayer(
            "buildGrotte",
            tileset
            ).setPipeline('Light2D').setDepth(5)

    const lave = carte2.createLayer(
            "lave",
            tileset
            ).setDepth(5)

    const decors = carte2.createLayer(
            "decors",
            tileset2
            ).setPipeline('Light2D').setDepth(5)
    

    this.lights.enable();
    this.lights.setAmbientColor(0x111111);
    this.light = this.lights.addLight(0, 0, 400,100000000001110,4);

    this.torches = this.physics.add.staticGroup({
        immovable: true,
    })

    carte2.getObjectLayer('lights22').objects.forEach((light) => {
        this.lights.addLight(light.x, light.y, 400,100000000001110,4);
        this.torches.create(light.x + 16,light.y,'torches').setScale(0.7).setDepth(10000)
    });

    this.compteurDeplacementLassoStock = this.compteurDeplacementLasso
    this.compteurDeplacementLassoCaisseStock = this.compteurDeplacementLassoCaisse

    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////

    carte2.getObjectLayer('spawnJoueurGrotte').objects.forEach((spawnJoueurGrotte) => {
        this.spawnXGrotte = spawnJoueurGrotte.x, 
        this.spawnYGrotte=  spawnJoueurGrotte.y
    });

    this.player = this.physics.add.sprite(this.spawnXGrotte,this.spawnYGrotte, 'perso').setOrigin(0).setPipeline('Light2D').setDepth(10)
    this.player.body.setSize(16,32)

    this.physics.add.collider(this.player, buildGrotte,this.jumpAuto,null,this);
    buildGrotte.setCollisionByProperty({ estSolide: true });

    this.physics.add.collider(this.player, lave,this.respawnJoueur,null,this);
    lave.setCollisionByProperty({ killLave: true });

    this.player.setCollideWorldBounds(true);

    this.cameras.main.zoom = 2.9
    this.cameras.main.startFollow(this.player); 
    this.physics.world.setBounds(0, 0, 6400, 1920);
    this.cameras.main.setBounds(0, 0, 6400, 1920);

    this.solOuvert = false

    this.compteurSolRevient= 300
    this.solRevient = false
    this.sol2 = false
    this.compteurSol2 = 300

    this.compteurTirFleche = 250;
    this.compteurTirFlecheHaut = 250;
    this.compteurTirFlecheDroite = 250;
    this.compteurTirFlecheRapide = 100;

    this.compteurFlecheBasActive = 125
    this.activeFlecheBas = true

    this.tirFlecheHaut = true

    this.tirFlecheDroite = true

    this.tirFlecheRapide = true

    this.compteurInvunlerable = 100

    this.pointDeVieStock = 4

    this.stopAnimCaisse = false
    this.compteurStopAnimCaisse = 10

    this.compteurToucheSol = 25
    this.toucheSol = false


    this.anims.create({
        key: 'animVieObj',
        frames: this.anims.generateFrameNumbers('vieObj', {start:0,end:3}),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('perso', {start:0,end:4}),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'perso', frame: 5 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('perso', {start:6,end:10}),
        frameRate: 6,
        repeat: -1
    });

    /////////////////////////

    this.anims.create({
        key: 'jumpRight',
        frames: this.anims.generateFrameNumbers('persoTest', {start:0,end:3}),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'turnJump',
        frames: this.anims.generateFrameNumbers('persoTest', {start:8,end:10}),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'jumpLeft',
        frames: this.anims.generateFrameNumbers('persoTest', {start:4,end:7}),
        frameRate: 6,
        repeat: -1
    });

    /////////////////////////

    this.anims.create({
        key: 'animPousseRight',
        frames: this.anims.generateFrameNumbers('animPousse', {start:0,end:2}),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'animPousseLeft',
        frames: this.anims.generateFrameNumbers('animPousse', {start:3,end:5}),
        frameRate: 5,
        repeat: -1
    });

    ////////////////////////

    this.anims.create({
        key: 'attaqueRight',
        frames: this.anims.generateFrameNumbers('attaque', {start:0,end:4}),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'attaqueLeft',
        frames: this.anims.generateFrameNumbers('attaque', {start:5,end:9}),
        frameRate: 4,
        repeat: -1
    });
    this.anims.create({
        key: 'idleRight',
        frames: [ { key: 'attaque', frame: 10 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'idleLeft',
        frames: [ { key: 'attaque', frame: 11 } ],
        frameRate: 20
    });

    ////////////////////////

    this.anims.create({
        key: 'animLassoRight',
        frames: this.anims.generateFrameNumbers('animLasso', {start:0,end:10}),
        frameRate: 14,
        repeat: -1
    });

    this.anims.create({
        key: 'animLassoLeft',
        frames: this.anims.generateFrameNumbers('animLasso', {start:21,end:11}),
        frameRate: 14,
        repeat: -1
    });

    ////////////////////////

    this.anims.create({
        key: 'animTorcheRight',
        frames: this.anims.generateFrameNumbers('animTorche', {start:0,end:4}),
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'animTorcheLeft',
        frames: this.anims.generateFrameNumbers('animTorche', {start:5,end:9}),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'idleRightTorche',
        frames: [ { key: 'animTorche', frame: 10 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'idleLeftTorche',
        frames: [ { key: 'animTorche', frame: 11 } ],
        frameRate: 20
    });

    ////////////////////////

    this.anims.create({
        key: 'animTorches',
        frames: this.anims.generateFrameNumbers('torches', {start:0,end:4}),
        frameRate: 6,
        repeat: -1
    });

    ////////////////////////

    this.anims.create({
        key: 'animAccrocheMurPersoRight',
        frames: this.anims.generateFrameNumbers('animAccrocheMurPerso', {start:0,end:1}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'animAccrocheMurPersoLeft',
        frames: this.anims.generateFrameNumbers('animAccrocheMurPerso', {start:2,end:3}),
        frameRate: 10,
        repeat: -1
    });

    ////////////////////////

    this.anims.create({
        key: 'animationLave',
        frames: this.anims.generateFrameNumbers('animLave', {start:0,end:7}),
        frameRate: 10,
        repeat: -1
    });

    ////////////////////////

    this.anims.create({
        key: 'animSolOuvert',
        frames: this.anims.generateFrameNumbers('solTombe', {start:0,end:6}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'animSol1',
        frames: [ { key: 'solTombe', frame: 6 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'animSol2',
        frames: [ { key: 'solTombe', frame: 0 } ],
        frameRate: 20
    });


    /////////////////////////////

    this.balles = this.physics.add.group({
        immovable: true,
        allowGravity: false
    })

    ////////////////////////

    this.caisses = this.physics.add.group({
        immovable: true,
    })

    carte2.getObjectLayer('caissesDeplacables').objects.forEach((caisses) => {
        this.caisse = this.caisses.create(caisses.x + 16,caisses.y + 16,'caissesEclaire').setDepth(7)
        this.caisse.setPipeline('Light2D')
        this.caisse.body.setSize(28,32)

    });

    this.physics.add.collider(this.caisses,this.caisses,this.stopCaisseVelocite0,null,this)
    this.physics.add.collider(this.caisses,buildGrotte)
    this.physics.add.collider(this.player,this.caisses,this.stopCaisse,null,this)


    ////////////////////////////////////////////////////////

    carte2.getObjectLayer('grille').objects.forEach((grille) => {
        this.grille = this.physics.add.image(grille.x + 16,grille.y - 32,'grille')
        this.grille.body.setAllowGravity(false)
    });

    this.hauteurGrille = this.grille.y

    this.hauteurGrilleStock= this.grille.y

    ////////////////////////////////////////////////////////

    carte2.getObjectLayer('plaquePression1').objects.forEach((plaquePression1) => {
        this.plaquePression1 = this.physics.add.image(plaquePression1.x + 16 ,plaquePression1.y + 30,'plaquePression')
        this.plaquePression1.body.setAllowGravity(false)
    });
    carte2.getObjectLayer('plaquePression2').objects.forEach((plaquePression2) => {
        this.plaquePression2 = this.physics.add.image(plaquePression2.x + 16 ,plaquePression2.y + 30,'plaquePression')
        this.plaquePression2.body.setAllowGravity(false)
    });
    carte2.getObjectLayer('plaquePression3').objects.forEach((plaquePression3) => {
        this.plaquePression3 = this.physics.add.image(plaquePression3.x + 16,plaquePression3.y + 30 ,'plaquePression')
        this.plaquePression3.body.setAllowGravity(false)
    });
    carte2.getObjectLayer('plaquePression4').objects.forEach((plaquePression4) => {
        this.plaquePression4 = this.physics.add.image(plaquePression4.x + 16,plaquePression4.y + 30 ,'plaquePression')
        this.plaquePression4.body.setAllowGravity(false)
    });

    this.plaque1Active = false
    this.plaque1PlusUse = false
    this.plaque2Active = false
    this.plaque2PlusUse = false
    this.plaque3Active = false
    this.plaque3PlusUse = false
    this.plaque4Active = false
    this.plaque4PlusUse = false

    this.plaquePression1.setOffset(0,2)
    this.plaquePression2.setOffset(0,2)
    this.plaquePression3.setOffset(0,2)
    this.plaquePression4.setOffset(0,2)

    this.physics.add.overlap(this.caisses,this.plaquePression1,this.activePlaque1,null,this)
    this.physics.add.overlap(this.caisses,this.plaquePression2,this.activePlaque2,null,this)
    this.physics.add.overlap(this.caisses,this.plaquePression3,this.activePlaque3,null,this)
    this.physics.add.overlap(this.caisses,this.plaquePression4,this.activePlaque4,null,this)

    ///////////////////////////////////////////////////////////////

    this.retourAvantTemple = this.physics.add.image(64, 1760, 'invisible').setOrigin(0)
    this.retourAvantTemple.body.setAllowGravity(false)
    this.physics.add.overlap(this.player,this.retourAvantTemple,this.goOutTemple,null,this)

    this.sortirTemple = this.physics.add.image(this.grille.x - 16, this.grille.y, 'invisible').setOrigin(0)
    this.sortirTemple.body.setAllowGravity(false)
    this.sortirTemple.body.setSize(96,96)
    this.physics.add.overlap(this.player,this.sortirTemple,this.goEndTemple,null,this)

    /////////////////////////////////////////////////////////////////

    this.lave = this.physics.add.group({
        immovable: true,
        allowGravity: false
    })
    
    carte2.getObjectLayer('lave').objects.forEach((lave) => {
        this.lave.create(lave.x + 16,lave.y - 25,'animLave').setDepth(7)
    });

    ////////////////////////////////////////////////

    this.checkPoints = this.physics.add.group({
    });      

    carte2.getObjectLayer('checkPoint').objects.forEach((checkPoint) => {
        this.checkPoint = this.checkPoints.create(checkPoint.x, checkPoint.y, 'checkPoint').setOrigin(0);
        this.checkPoint.setPushable(false).setPipeline('Light2D')
        this.checkPoint.body.setAllowGravity(false)
    });

    this.physics.add.overlap(this.player,this.checkPoints,this.savePoint,null,this)

     ////////////////////////////////////////////////

     this.plaquesDispawn = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });      

    carte2.getObjectLayer('plaquesDispawn').objects.forEach((plaquesDispawn) => {
        this.plaqueDispawn = this.plaquesDispawn.create(plaquesDispawn.x, plaquesDispawn.y - 32, 'solTombe').setOrigin(0).setPipeline('Light2D');
        this.plaqueDispawn.setPushable(false)
        this.plaqueDispawn.body.setAllowGravity(false)
    });

    this.physics.add.collider(this.player,this.plaquesDispawn)
    
    ////////////////////////////////////////////////

    this.vieObj = this.physics.add.group({
    });      

    carte2.getObjectLayer('vieObj').objects.forEach((vieObj) => {
        this.vieAPrendre = this.vieObj.create(vieObj.x + 6, vieObj.y , 'vieObj').setOrigin(0).setScale(0.8);
        this.vieAPrendre.setPushable(false)
        this.vieAPrendre.body.setAllowGravity(false)
    });

    this.physics.add.overlap(this.player,this.vieObj,this.takeHp,null,this)

    ////////////////////////////////////////////

    this.lanceFleche = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });   
    this.lanceFlecheHaut = this.physics.add.group({
        immovable: true,
        allowGravity: false
    }); 
    this.lanceFlecheDroite = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });    
    this.lanceFlecheRapide = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });      

    this.fleches = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });  
    this.flechesHaut = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });  
    this.flechesDroite = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });  
    this.flechesRapide = this.physics.add.group({
        immovable: true,
        allowGravity: false
    });  


    this.physics.add.overlap(this.player,this.fleches,this.degatEnnemi,null,this)
    this.physics.add.collider(this.fleches,buildGrotte,this.destroyFleche,null,this)

    this.physics.add.overlap(this.player,this.flechesHaut,this.degatEnnemi,null,this)
    this.physics.add.collider(this.flechesHaut,buildGrotte,this.destroyFleche,null,this)

    this.physics.add.overlap(this.player,this.flechesDroite,this.degatEnnemi,null,this)
    this.physics.add.collider(this.flechesDroite,buildGrotte,this.destroyFleche,null,this)

    this.physics.add.overlap(this.player,this.flechesRapide,this.degatEnnemi,null,this)
    this.physics.add.collider(this.flechesRapide,buildGrotte,this.destroyFleche,null,this)

    this.physics.add.collider(this.fleches,this.caisses,this.destroyFleche,null,this)
    this.physics.add.collider(this.flechesHaut,this.caisses,this.destroyFleche,null,this)
    this.physics.add.collider(this.flechesDroite,this.caisses,this.destroyFleche,null,this)
    this.physics.add.collider(this.flechesRapide,this.caisses,this.destroyFleche,null,this)


    this.nbrFleche = 0
    this.nbrFlecheHaut = 0
    this.nbrFlecheDroite = 0
    this.nbrFlecheRapide = 0

    carte2.getObjectLayer('lanceFleche').objects.forEach((lanceFleche) => {
        this.lancFleche = this.lanceFleche.create(lanceFleche.x, lanceFleche.y + 28, 'lanceFleche').setOrigin(0).setPipeline('Light2D').setDepth(100);
        this.nbrFleche ++
    });

    this.nbrFlecheStock = this.nbrFleche 

    carte2.getObjectLayer('lanceFlecheHaut').objects.forEach((lanceFlecheHaut) => {
        this.lancFlecheHaut = this.lanceFlecheHaut.create(lanceFlecheHaut.x, lanceFlecheHaut.y , 'lanceFleche').setOrigin(0).setPipeline('Light2D').setDepth(100);
        this.nbrFlecheHaut ++
    });

    this.nbrFlecheStockHaut = this.nbrFlecheHaut
    
    carte2.getObjectLayer('lanceFlecheDroite').objects.forEach((lanceFlecheDroite) => {
        this.lancFlecheDroite = this.lanceFlecheDroite.create(lanceFlecheDroite.x + 28, lanceFlecheDroite.y , 'lanceFleche').setOrigin(0).setPipeline('Light2D').setDepth(100);
        this.nbrFlecheDroite ++
        this.lancFlecheDroite.angle = -90
    });

    this.nbrFlecheStockDroite = this.nbrFlecheDroite

    carte2.getObjectLayer('lanceFlecheRapide').objects.forEach((lanceFlecheRapide) => {
        this.lancFlecheRapide = this.lanceFlecheRapide.create(lanceFlecheRapide.x + 28, lanceFlecheRapide.y , 'lanceFleche').setOrigin(0).setPipeline('Light2D').setDepth(100);
        this.nbrFlecheRapide ++
        this.lancFlecheRapide.angle = -90
    });

    this.nbrFlecheStockRapide = this.nbrFlecheRapide
 

    


    ///////////////////////////////////////////////////////////////
    /////////////////////////TOUCHES///////////////////////////////
    ///////////////////////////////////////////////////////////////

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
        space: Phaser.Input.Keyboard.KeyCodes.SPACE,
        q: Phaser.Input.Keyboard.KeyCodes.Q,
        d: Phaser.Input.Keyboard.KeyCodes.D,
        a: Phaser.Input.Keyboard.KeyCodes.A,
        c: Phaser.Input.Keyboard.KeyCodes.C,
        v: Phaser.Input.Keyboard.KeyCodes.V,
        f: Phaser.Input.Keyboard.KeyCodes.F,
        e: Phaser.Input.Keyboard.KeyCodes.E
    });

    ///////////////////////////////////////////////////////////////
    ////////////////////////INTERFACE//////////////////////////////
    ///////////////////////////////////////////////////////////////
    
    this.inventaireEcran = this.add.image(810,260,'interfaceArmeObj0').setScale(0.6)
    this.inventaireEcran.setScrollFactor(0)
    this.inventaireEcran.setDepth(100)
    this.inventaireEcran.setInteractive()

    this.vieEcran = this.add.image(460,260,'hp4').setScale(0.6)
    this.vieEcran.setScrollFactor(0)
    this.vieEcran.setDepth(100)
    this.vieEcran.setInteractive()

 /////////////////// SONS /////////////////

 this.jumpSound = this.sound.add('jumpSound', {volume: 0.02});
 this.ambianceSound = this.sound.add('ambianceSound', {volume: 0.01,loop: true});
 this.ambianceSound.play()



}

update(){

    this.lave.children.iterate((child) => {
        child.anims.play('animationLave', true);
    });

    this.vieObj.children.iterate((child) => {
        child.anims.play('animVieObj', true);
    });

    this.lanceFleche.children.iterate((child) => {
        if (this.tirFleche == true && this.nbrFleche > 0){
            this.fleches.create(child.x + 5, child.y - 11, 'fleches').setOrigin(0).setPipeline('Light2D');
            this.fleches.setVelocityY(-300)
            this.nbrFleche --
        }
        if (this.nbrFleche == 0){
            this.tirFleche = false
            this.nbrFleche = this.nbrFlecheStock
        }
    });

    if(this.tirFleche == false){
        this.compteurTirFleche -=1 ;
        if(this.compteurTirFleche == 0){
            this.compteurTirFleche = 250;
            this.tirFleche = true ;
        }
    }

    if (this.activeFlecheBas == true){
        this.compteurFlecheBasActive --
        if (this.compteurFlecheBasActive == 0){
            this.tirFleche = false
            this.activeFlecheBas = true
            this.compteurFlecheBasActive = 0
        }
    }

    this.lanceFlecheHaut.children.iterate((child) => {
        if (this.tirFlecheHaut == true && this.nbrFlecheHaut > 0){
            this.flechesHaut1 = this.flechesHaut.create(child.x + 5, child.y - 6, 'fleches').setOrigin(0).setPipeline('Light2D').setDepth(100);
            this.flechesHaut1.setVelocityY(300)
            this.nbrFlecheHaut --
            this.flechesHaut1.flipY = true

        }
        if (this.nbrFlecheHaut == 0){
            this.tirFlecheHaut = false
            this.nbrFlecheHaut = this.nbrFlecheStockHaut
        }
    });
    if(this.tirFlecheHaut == false){
        this.compteurTirFlecheHaut -=1 ;
        if(this.compteurTirFlecheHaut == 0){
            this.compteurTirFlecheHaut = 250;
            this.tirFlecheHaut = true ;
        }
    }

    this.lanceFlecheDroite.children.iterate((child) => {
        if (this.tirFlecheDroite == true && this.nbrFlecheDroite > 0){
            this.flechesDroite1 = this.flechesDroite.create(child.x , child.y - 12, 'fleches').setOrigin(0).setPipeline('Light2D').setDepth(100);
            this.flechesDroite1.body.setSize(12,21)
            this.flechesDroite1.setOffset(-2,-20)
            this.flechesDroite1.setVelocityX(-300)
            this.nbrFlecheDroite --
            this.flechesDroite1.angle = -90
        }
        if (this.nbrFlecheDroite == 0){
            this.tirFlecheDroite = false
            this.nbrFlecheDroite = this.nbrFlecheStockDroite
        }
    });
    if(this.tirFlecheDroite == false){
        this.compteurTirFlecheDroite -=1 ;
        if(this.compteurTirFlecheDroite == 0){
            this.compteurTirFlecheDroite = 250;
            this.tirFlecheDroite = true ;
        }
    }

    this.lanceFlecheRapide.children.iterate((child) => {
        if (this.tirFlecheRapide == true && this.nbrFlecheRapide > 0){
            this.flechesRapide1 = this.flechesRapide.create(child.x , child.y - 12, 'fleches').setOrigin(0).setPipeline('Light2D').setDepth(100);
            this.flechesRapide1.body.setSize(12,21)
            this.flechesRapide1.setOffset(-2,-20)
            this.flechesRapide1.setVelocityX(-300)
            this.nbrFlecheRapide --
            this.flechesRapide1.angle = -90
        }
        if (this.nbrFlecheRapide == 0){
            this.tirFlecheRapide = false
            this.nbrFlecheRapide = this.nbrFlecheStockRapide
        }
    });
    if(this.tirFlecheRapide == false){
        this.compteurTirFlecheRapide -=1 ;
        if(this.compteurTirFlecheRapide == 0){
            this.compteurTirFlecheRapide = 100;
            this.tirFlecheRapide = true ;
        }
    }

    this.plaquesDispawn.children.iterate((child) => {
        if (this.solOuvert == false){
            child.anims.play('animSolOuvert', true);
            
            if (child.anims.currentFrame.index == 1){
                child.body.setSize(96,17)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 2){
                child.body.setSize(78,17)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 3){
                child.body.setSize(64,17)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 4){
                child.body.setSize(48,17)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 5){
                child.body.setSize(32,17)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 6){
                child.body.setSize(1,1)
                child.setOffset(0,0)
            }
            if (child.anims.currentFrame.index == 7){
                child.body.setSize(1,1)
                child.setOffset(-1,0)
                this.solOuvert = true
            }
        }
        if (this.solOuvert == true && this.sol2 == false){
            child.anims.play('animSol1', true);
            this.solRevient = true
        }

        if (this.solRevient == true){
            this.compteurSolRevient --
            if (this.compteurSolRevient == 0){
                this.compteurSolRevient = 300
                this.solRevient = false
                this.sol2 = true
            }
        }

        if (this.sol2 == true){
            this.compteurSol2 --
            child.anims.play('animSol2', true);
            child.body.setSize(96,17)
            child.setOffset(0,0)
            if (this.compteurSol2 == 0){
                this.compteurSol2 = 300
                this.solOuvert = false
                this.sol2 = false
            }
        }
    });

    this.torches.children.iterate((child) => {
        child.anims.play('animTorches', true);
    });

    if (this.player.direction == 'right'){
        this.light.x = this.player.x + 30;
    }
    if (this.player.direction == 'left'){
        this.light.x = this.player.x;
    }

    this.light.y = this.player.y;

        this.shot = Phaser.Input.Keyboard.JustDown(this.keys.e)
        this.attaqueTouche = Phaser.Input.Keyboard.JustDown(this.keys.a)
        this.lightTouche = Phaser.Input.Keyboard.JustDown(this.keys.c)
        this.interagir = Phaser.Input.Keyboard.JustDown(this.keys.f)
        this.noLightTouche = Phaser.Input.Keyboard.JustDown(this.keys.v)
        this.moveUp = Phaser.Input.Keyboard.JustDown(this.keys.space)
        this.moveLeft = (this.keys.q.isDown )  
        this.moveRight = (this.keys.d.isDown ) 
    

    if (this.player.direction == 'left'){
        this.player.setOffset(8,0)
    }
    if (this.player.direction == 'right'){
        this.player.setOffset(8,0)
    }

    if (this.torcheDebloque == true){
        if (this.lightTouche){
            this.torcheActive = true
        }
    }

    if (this.torcheActive == true){
        this.light.setIntensity(4)
        this.animTorche = true
        this.animNormal = false
        this.animJump = false
        this.attaquePossible = false

        if (this.noLightTouche){
            this.torcheActive = false
            this.animNormal = true
            this.attaquePossible = true
            this.animTorche = false
        }
    }

    if (this.torcheActive == false){
        this.light.setIntensity(0)
    }

    // frames utiliser selon les situations
    if (this.animNormal == true){
        this.frameLeft = 'left'
        this.frameRight = 'right'
        this.frameTurn = 'turn'
    }

    if (this.animAccrocheMur == true){
        this.frameLeft = 'animAccrocheMurPersoLeft'
        this.frameRight = 'animAccrocheMurPersoRight'
    }
    
    if (this.animPousseCaisse == true){
        this.frameLeft = 'animPousseLeft'
        this.frameRight = 'animPousseRight'
    }

    if (this.animJump == true){
        this.frameLeft = 'jumpLeft'
        this.frameRight = 'jumpRight'
        this.frameTurn = 'turnJump'
    }

    if (this.attaque == true){
        this.frameLeft = 'attaqueLeft'
        this.frameRight = 'attaqueRight'
        this.frameTurn = 'turnJump'
    }

    if (this.animTorche == true){
        this.frameLeft = 'animTorcheLeft'
        this.frameRight = 'animTorcheRight'
    }

    if (this.attaquePossible == true){
        if (this.attaqueTouche){ 
            this.attaque = true
            this.animNormal = false
            this.animJump = false
            this.attaquePossible = false

            this.createLasso = true
            this.test = true
        }
    }
    
    if (this.createLasso == true){
        this.lasso = this.physics.add.sprite(this.player.x,this.player.y,'animLasso').setOrigin(0)
        this.lasso.body.setAllowGravity(false)
        this.createLasso = false
        this.lasso.setPipeline('Light2D')

        this.physics.add.overlap(this.lasso,this.caisses,this.bougerCaisse,null,this)
    }

    if  (this.attaque == true){
        this.lasso.y = this.player.y

        if (this.test == true ){
            this.player.setVelocityX(this.speedRight/3);
            this.player.anims.play(this.frameRight, true);
            this.test = false
        }
        
        if (this.moveLeft){ 
            this.player.direction = 'left';
            this.player.setVelocityX(-this.speedLeft/3); 
            this.player.anims.play(this.frameLeft, true);

        }
        
        else if (this.moveRight){ 
            this.player.direction = 'right';
            this.player.setVelocityX(this.speedRight/2);
            this.player.anims.play(this.frameRight, true);
        }
        else{ 
            this.player.setVelocityX(0); 
            if (this.player.direction == 'left'){
                this.player.anims.play('idleLeft', true);     
            }
            if (this.player.direction == 'right'){
                this.player.anims.play('idleRight', true);     
            }
        }

            if (this.player.direction == 'right'){
                this.lasso.x = this.player.x + 32
                this.lasso.anims.play('animLassoRight', true);

                if (this.lasso.anims.currentFrame.index == 1){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(-4,12)
                }
                if (this.lasso.anims.currentFrame.index == 2){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(10,12)
                }
                if (this.lasso.anims.currentFrame.index == 3){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(26,12)
                }
                if (this.lasso.anims.currentFrame.index == 4){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(42,12)
                }
                if (this.lasso.anims.currentFrame.index == 5){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(58,12)
                }
                if (this.lasso.anims.currentFrame.index == 6){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(74,12)
                }
                if (this.lasso.anims.currentFrame.index == 7){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(58,12)
                }
                if (this.lasso.anims.currentFrame.index == 8){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(42,12)
                }
                if (this.lasso.anims.currentFrame.index == 9){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(26,12)
                }
                if (this.lasso.anims.currentFrame.index == 10){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(10,12)
                }
                if (this.lasso.anims.currentFrame.index == 11 ){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(-4,12)
                    this.attaque = false
                    this.animNormal = true
                    this.attaquePossible = true
                    this.lasso.destroy()
                }
            }

            if (this.player.direction == 'left'){
                this.lasso.anims.play('animLassoLeft', true);

                this.lasso.x = this.player.x - 94
                if (this.lasso.anims.currentFrame.index == 1){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(74,12)
                }
                if (this.lasso.anims.currentFrame.index == 2){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(74,12)
                }
                if (this.lasso.anims.currentFrame.index == 3){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(58,12)
                }
                if (this.lasso.anims.currentFrame.index == 4){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(42,12)
                }
                if (this.lasso.anims.currentFrame.index == 5){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(26,12)
                }
                if (this.lasso.anims.currentFrame.index == 6){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(-4,12)
                }
                if (this.lasso.anims.currentFrame.index == 7){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(26,12)
                }
                if (this.lasso.anims.currentFrame.index == 8){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(42,12)
                }
                if (this.lasso.anims.currentFrame.index == 9){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(58,12)
                }
                if (this.lasso.anims.currentFrame.index == 10){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(74,12)
                }

                if (this.lasso.anims.currentFrame.index == 11){
                    this.lasso.body.setSize(20,12)
                    this.lasso.setOffset(56,12)
                    this.attaque = false
                    this.animNormal = true
                    this.attaquePossible = true
                    this.lasso.destroy()
                }          
        }  
    }
    
    if (this.attaque == false){
        if (this.moveUp && this.player.body.blocked.down ) {
            this.player.setVelocityY(-this.speedSaut);
            this.jumpSound.play()

        }  
        if (this.moveLeft){ 
            this.player.direction = 'left';
            this.player.setVelocityX(-this.speedLeft); 
            this.player.anims.play(this.frameLeft, true);
        }
        else if (this.moveRight){ 
            this.player.direction = 'right';
            this.player.setVelocityX(this.speedRight);
            this.player.anims.play(this.frameRight, true);
        }
        else{ 
            this.player.setVelocityX(0); 
            if (this.animTorche == false){
                this.player.anims.play(this.frameTurn, true);
            }
            else{
                if (this.player.direction == 'right'){
                    this.player.anims.play('idleRightTorche', true);
                }
                if (this.player.direction == 'left'){
                    this.player.anims.play('idleLeftTorche', true);
                }
            }
        }

            if(this.doubleJumpActif == true){
                if(this.doubleSautRightPossible == true){
                    if (this.player.body.blocked.right ) {
                        if (this.moveUp) {
                            this.jumpSound.play()
                            this.doubleSautLeft = true
                        }  
                    }
                }

                if(this.doubleSautLeftPossible == true){
                    if (this.player.body.blocked.left ) {
                        if (this.moveUp) {
                            this.jumpSound.play()
                            this.doubleSautRight = true
                        }  
                    }
                }
            }
            
            if(this.doubleSautLeft == true){
                this.resetGraviteRight = false
                this.resetGraviteLeft = true
                this.doubleSautRightPossible = false
                this.doubleSautLeftPossible = true
                this.compteurDoubleSautLeft -=1 ;
                this.player.setVelocityX(-300);
                this.player.setVelocityY(-this.speedSaut + 75);
                if(this.compteurDoubleSautLeft == 0){
                    this.compteurDoubleSautLeft = 10
                    this.doubleSautLeft = false
                }
            }

            if(this.doubleSautRight == true){
                this.resetGraviteRight = true
                this.resetGraviteLeft = false
                this.doubleSautRightPossible = true
                this.doubleSautLeftPossible = false
                this.compteurDoubleSautRight -=1 ;
                this.player.setVelocityX(300);
                this.player.setVelocityY(-this.speedSaut + 75);
                if(this.compteurDoubleSautRight == 0){
                    this.compteurDoubleSautRight = 10
                    this.doubleSautRight = false
                }
            }

            if(this.invulnérable == false){
            if (this.resetGraviteLeft == true ){this.speedRight = 90}
            else{this.speedRight = this.speed}

            if (this.resetGraviteRight == true){this.speedLeft = 90}
            else{this.speedLeft = this.speed}
            }

            if (this.player.body.blocked.down){
                this.animAccrocheMur = false
                this.doubleSautRightPossible = true
                this.doubleSautLeftPossible = true
                this.resetGraviteLeft = false
                this.resetGraviteRight = false
                if (this.animPousseCaisse == false){
                    this.animNormal = true
                }
                this.animJump = false
                this.doubleJumpActif = false

                this.toucheSol = true

                this.compteurToucheSol = 25
            }      
            else{
                this.animNormal = false
                this.animJump = true
                this.doubleJumpActif = true
            }      
        } 
        
        if (this.toucheSol == true){
            this.compteurToucheSol --
            if(this.compteurToucheSol == 0){
                this.compteurToucheSol = 25
                this.toucheSol = false
                this.animAccrocheMur = false
            }
        }

        if (this.toucheSol == false){
            if (this.player.body.blocked.left ||this.player.body.blocked.right ) {
                this.player.setVelocityY(20); 
                this.animTorche = false
                this.torcheActive = false
                this.animAccrocheMur = true
                this.animJump = false
            }
            else{
                this.animAccrocheMur = false
            }
        }




        if (this.shot){
            this.tirer(this.player);
        }
    

    if (this.deplacementCaisse == true){
        this.compteurDeplacementLassoCaisse --
        if (this.compteurDeplacementLassoCaisse == 0){
            this.caisses.setVelocityX(0)
            this.compteurDeplacementLassoCaisse = this.compteurDeplacementLassoCaisseStock
            this.deplacementCaisse = false
            this.blockCaisse = true
        }
    }

    if (this.blockCaisse == true){
        this.caisses.children.iterate((child) => {
            if (child.x < this.player.x - 10 ){
                child.setVelocityX(0)
                this.stopAnimCaisse = true
            }
            if (child.x > this.player.x + 40 ){
                child.setVelocityX(0)
                this.stopAnimCaisse = true
            }
        });
    }

    if (this.stopAnimCaisse == true){
        this.compteurStopAnimCaisse --
        if (this.compteurStopAnimCaisse == 0){
            this.compteurStopAnimCaisse = 10
            this.animPousseCaisse = false
            this.stopAnimCaisse = false
            this.blockCaisse = false
        }
    }
    

    if (this.lassoUnlcok == true){
        this.inventaireEcran.setTexture('interfaceArmeObj1')
        if (this.pouvoirTirer == true){
            this.inventaireEcran.setTexture('interfaceArmeObj2')
        }
    }

    if (this.plaque1Active == true){
        this.grille.setVelocityY(20)
        if (this.grille.y > this.hauteurGrille + 30){
            this.grille.setVelocityY(0)
            this.plaque1Active = false
            this.hauteurGrille = this.grille.y
            this.plaque1PlusUse = true
        }
    }
    if (this.plaque2Active == true){
        this.grille.setVelocityY(20)
        if (this.grille.y > this.hauteurGrille + 30){
            this.grille.setVelocityY(0)
            this.plaque2Active = false
            this.hauteurGrille = this.grille.y
            this.plaque2PlusUse = true
        }
    }
    if (this.plaque3Active == true){
        this.grille.setVelocityY(20)
        if (this.grille.y > this.hauteurGrille + 30){
            this.grille.setVelocityY(0)
            this.plaque3Active = false
            this.hauteurGrille = this.grille.y
            this.plaque3PlusUse = true
        }
    }
    if (this.plaque4Active == true){
        this.grille.setVelocityY(20)
        if (this.grille.y > this.hauteurGrille + 30){
            this.grille.setVelocityY(0)
            this.plaque4Active = false
            this.hauteurGrille = this.grille.y
            this.plaque4PlusUse = true
        }
    }

    if(this.invulnérable == true){
        this.compteurInvunlerable -=1 ;
            if(this.compteurInvunlerable == 0){
                this.compteurInvunlerable = 100;
                this.invulnérable = false ;
                this.player.setTint(0xffffff)
            }
        }

    if (this.pointDeVie == 0){
        this.respawnJoueur()
    }

    if (this.pointDeVie > 4){
        this.pointDeVie = 4
    }

    this.barreDeVie()
}

jumpAuto(player,build){
    if (this.blockCaisse == false){
        if (player.body.blocked.down  && (player.body.blocked.right || player.body.blocked.left)){
            player.setVelocityY(-270)
        }
    }
}

destroyFleche(fleches,build){
    fleches.destroy()
}

degatEnnemi(player,ennemi){
    if(this.invulnérable == false){
        ennemi.destroy()
        this.pointDeVie --
        this.cameras.main.shake(150, 0.004);
        this.invulnérable = true
        player.setTint(0xff0000)
    }
}

takeHp(player,vieAPrendre){
    this.pointDeVie++
    vieAPrendre.destroy()
}

respawnJoueur(){
    this.player.x = this.saveXMort
    this.player.y = this.saveYMort - 10

    this.pointDeVie = this.pointDeVieStock - 2
    this.invulnérable = false
    this.player.setTint(0xffffff)
}

savePoint(player,checkPoint){
    this.saveXMort = checkPoint.x
    this.saveYMort = checkPoint.y
}

activePlaque1(caisse,plaquePression1){
    if (this.plaque1PlusUse == false){
        this.plaque1Active = true
        caisse.y += 0.1
    }
}
activePlaque2(caisse,plaquePression2){
    if (this.plaque2PlusUse == false){
        this.plaque2Active = true
        caisse.y += 0.1
    }
}
activePlaque3(caisse,plaquePression3){
    if (this.plaque3PlusUse == false){
        this.plaque3Active = true
        caisse.y += 0.1
    }
}
activePlaque4(caisse,plaquePression4){
    if (this.plaque4PlusUse == false){
        this.plaque4Active = true
        caisse.y += 0.1
    }
}

stopCaisseVelocite0(caisse1,caisse2){
    caisse1.setVelocityX(0)
    caisse2.setVelocityX(0)
}

bougerCaisse(lasso,caisse){
    this.blockCaisse = false
    lasso.destroy()

    this.attaque = false
    this.animNormal = true

    if (caisse.x < this.player.x){
        caisse.setVelocityX(100)
    }
    if (caisse.x > this.player.x){
        caisse.setVelocityX(-100)
    }

    this.attaquePossible = true
    this.deplacementCaisse = true
}

stopCaisse(player,caisse){
    if (this.torcheActive == false){
        this.compteurStopAnimCaisse = 10
        this.blockCaisse = true
        if (this.player.body.blocked.left){
            caisse.setVelocityX(-55)
        }
        if (this.player.body.blocked.right){
            caisse.setVelocityX(55)
        }

        this.animNormal = false
        this.animPousseCaisse = true

        this.compteurDeplacementLassoCaisse = this.compteurDeplacementLassoCaisseStock
        this.deplacementCaisse = false
    }
}

tirer(player) {
    if (this.pouvoirTirer == true){
        this.tempsAvantTirer = true
        if (player.direction == 'left') { 
            this.directionTir = -1; 
            this.imgBalle = 'balleLeft'
            this.distanceTir = -6
        } 
        else if (player.direction == 'right'){ 
            this.directionTir = 1 
            this.imgBalle = 'balleRight'
            this.distanceTir = 30
        }
        
        this.balle1 = this.balles.create(player.x + (this.distanceTir * this.directionTir), player.y + 16, this.imgBalle).setScale(0.4);

        this.balle1.setVelocity(900 * this.directionTir, 0);  
    }  
}

prendreTorche(player,torche){
    torche.destroy()
    this.torcheDebloque = true
}

barreDeVie (){
    if (this.pointDeVie == 4){
        this.vieEcran.setTexture('hp4')
    }
    if (this.pointDeVie == 3){
        this.vieEcran.setTexture('hp3')
    }
    if (this.pointDeVie == 2){
        this.vieEcran.setTexture('hp2')
    }
    if (this.pointDeVie == 1){
        this.vieEcran.setTexture('hp1')
    }
}


/////////////////////////////////////////
//////////changements de scènes//////////
/////////////////////////////////////////


goOutTemple(player,retourAvantTemple){
    if (this.interagir) { 
        this.scene.start("sceneJeu", {
            pointDeVie:this.pointDeVie,
            spawnXSortieScene: this.spawnXSortieScene,
            spawnYSortieScene: this.spawnYSortieScene,
            speedLeft: this.speedLeft,
            speedRight: this.speedRight,
            dialogue: this.dialogue,
            speed: this.speed,
            speedSaut: this.speedSaut,
            doubleSautLeft: this.doubleSautLeft,
            compteurDoubleSautLeft: this.compteurDoubleSautLeft,
            doubleSautRight: this.doubleSautRight,
            compteurDoubleSautRight: this.compteurDoubleSautRight,
            doubleSautLeftPossible: this.doubleSautLeftPossible,
            doubleSautRightPossible: this.doubleSautRightPossible,
            resetGraviteLeft: this.resetGraviteLeft,
            resetGraviteRight: this.resetGraviteRight,
            animNormal: this.animNormal,
            animJump: this.animJump,
            attaque: this.attaque,
            attaquePossible: this.attaquePossible,
            doubleJumpActif: this.doubleJumpActif,
            torcheDebloque: this.torcheDebloque,
            torcheActive: this.torcheActive,
            pouvoirTirer: this.pouvoirTirer,
            tempsAvantTirer: this.tempsAvantTirer,
            animTorche: this.animTorche,
            ouvrirTemplePossible: this.ouvrirTemplePossible,
            entreeTemplePossible: this.entreeTemplePossible,
            templeOuvertTorcheAllumer: this.templeOuvertTorcheAllumer,
            compteurDeplacementLasso: this.compteurDeplacementLasso,
            compteurDeplacementLassoCaisse: this.compteurDeplacementLassoCaisse,
            deplacementEnnemi: this.deplacementEnnemi,
            deplacementCaisse: this.deplacementCaisse,
            blockCaisse: this.blockCaisse,
            animPousseCaisse: this.animPousseCaisse,
            lassoUnlcok: this.lassoUnlcok,
            invulnérable: this.invulnérable,
            compteurInvunlerable: 200,
            saveXMort: this.saveXMort,
            saveYMort: this.saveYMort,
            animAccrocheMur: this.animAccrocheMur
        })
    }
}

goEndTemple(player,sortirTemple){
    if (this.interagir && this.grille.y > this.hauteurGrilleStock + 110) { 
        this.ambianceSound.stop()
        this.scene.start("sceneJeu", {
            pointDeVie:this.pointDeVie,
            spawnXSortieScene: this.spawnXSortieScene,
            spawnYSortieScene: this.spawnYSortieScene,
            speedLeft: this.speedLeft,
            speedRight: this.speedRight,
            dialogue: this.dialogue,
            speed: this.speed,
            speedSaut: this.speedSaut,
            doubleSautLeft: this.doubleSautLeft,
            compteurDoubleSautLeft: this.compteurDoubleSautLeft,
            doubleSautRight: this.doubleSautRight,
            compteurDoubleSautRight: this.compteurDoubleSautRight,
            doubleSautLeftPossible: this.doubleSautLeftPossible,
            doubleSautRightPossible: this.doubleSautRightPossible,
            resetGraviteLeft: this.resetGraviteLeft,
            resetGraviteRight: this.resetGraviteRight,
            animNormal: this.animNormal,
            animJump: this.animJump,
            attaque: this.attaque,
            attaquePossible: this.attaquePossible,
            doubleJumpActif: this.doubleJumpActif,
            torcheDebloque: this.torcheDebloque,
            torcheActive: this.torcheActive,
            pouvoirTirer: this.pouvoirTirer,
            tempsAvantTirer: this.tempsAvantTirer,
            animTorche: this.animTorche,
            ouvrirTemplePossible: this.ouvrirTemplePossible,
            entreeTemplePossible: this.entreeTemplePossible,
            templeOuvertTorcheAllumer: this.templeOuvertTorcheAllumer,
            compteurDeplacementLasso: this.compteurDeplacementLasso,
            compteurDeplacementLassoCaisse: this.compteurDeplacementLassoCaisse,
            deplacementEnnemi: this.deplacementEnnemi,
            deplacementCaisse: this.deplacementCaisse,
            blockCaisse: this.blockCaisse,
            animPousseCaisse: this.animPousseCaisse,
            lassoUnlcok: this.lassoUnlcok,
            invulnérable: this.invulnérable,
            compteurInvunlerable: 200,
            saveXMort: this.saveXMort,
            saveYMort: this.saveYMort,
            animAccrocheMur: this.animAccrocheMur,
            sortieTemple: true
        })
    }
}

}

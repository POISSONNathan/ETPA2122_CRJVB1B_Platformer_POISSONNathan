class accueil extends Phaser.Scene{
    constructor(){
    super("accueil");
}

preload(){
    this.load.image("bouttonPlay", "assets/menu/BouttonPlay.png");
    this.load.image("bouttonLeave", "assets/menu/BouttonQuit.png");
    this.load.image("accueil", "assets/menu/accueil.png");
    this.load.tilemapTiledJSON("carte", "map.json");  
}

create(){
const carte = this.make.tilemap({ key: 'carte' });

this.add.image(this.cameras.main.width/2,this.cameras.main.height/2,"accueil").setScale(0.53);

this.cursors = this.input.keyboard.createCursorKeys();

this.startButton = this.add.image(this.cameras.main.width/2,380, 'bouttonPlay').setScale(0.53).setInteractive();




this.startButton.on('pointerdown', function (pointer) {
        carte.getObjectLayer('spawnJoueur').objects.forEach((spawnJoueur) => {
            this.spawnXSortieScene = spawnJoueur.x, 
            this.spawnYSortieScene =  spawnJoueur.y
        });

        this.scene.scene.start("sceneJeu", {
        pointDeVie:4,
        spawnXSortieScene: this.spawnXSortieScene,
        spawnYSortieScene: this.spawnYSortieScene,
        speed: 300,
        dialogue: false
})
});

this.quitButton = this.add.image(this.cameras.main.width/2,500, 'bouttonLeave').setScale(0.53).setInteractive();

this.quitButton.on('pointerdown', function (pointer) {
        this.scene.scene.stop("accueil")
});
}
update(){}
}

//my functions
function sleep(ms = 3000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
//loading screen
let loadingScene = new Phaser.Scene("Load");
loadingScene.preload = function(){
    this.load.image('background','assets/loadingbg.jpg');
    this.load.image('logo','assets/logo.png');
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
}
loadingScene.create = function(){
    this.bg = this.add.sprite(600,350,'background').setScale(0.3);
    this.logo = this.add.sprite(150,500,'logo').setScale(0.5);
    
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
    });
    
    this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        assetText.destroy();
    });
    this.load.image('logo');
            for (var i = 0; i < 5000; i++) {
                this.load.image('logo');
            }
}

// create a scene
let gameScene = new Phaser.Scene("Game");
// load assets
gameScene.preload = function(){
    this.load.image('betup','assets/arrow.png');
    this.load.image('betdown','assets/arrow.png');
    this.load.image('harness','assets/harness2.png');
    this.load.image('bottomharness','assets/bottomharness.png');
    this.load.image('background','assets/slotbg2.jpg');
    this.load.image('logo','assets/logo.png');
    this.load.image('spin','assets/spin.png');
    this.load.image('seven','assets/symbols/7.png');
    this.load.image('banana','assets/symbols/banana.png');
    this.load.image('bar','assets/symbols/bar.png');
    this.load.image('berrys','assets/symbols/berrys.png');
    this.load.image('melons','assets/symbols/melons.png');
    this.load.image('orange','assets/symbols/orange.png');
    this.load.image('blur1','assets/symbols/blurbanana.png');
    this.load.image('blur2','assets/symbols/blurcherry.png');
    this.load.image('blur3','assets/symbols/blurmelons.png');
    this.load.image('blur4','assets/symbols/blurseven.png');
    this.load.image('topwin','assets/topstrip.png');
    this.load.image('midwin','assets/middlestrip.png');
    this.load.image('bottomwin','assets/bottomstrip.png');

};
let arr1 = ['banana','seven','bar','melons','bar','berrys','bar','orange','berrys']
let arr2 = ['banana','seven','bar','bar','orange','berrys','bar','bar','orange']
let arr3 = ['banana','seven','bar','melons','bar','banana','bar','seven','bar']
// let arr3 = ['seven','seven','seven','seven','bar','seven','bar','seven','seven']
let indices = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
var l1 = 0;
var l2 = 2;
var l3 = 3;
var balance = 1000;
var win = 0;
var bett = 10;
function rng(){ 
    return Math.floor(Math.random() * 9);
}
function check(){
    return null;
}

gameScene.create = function(){
    this.bg = this.add.sprite(600,350,'background');
    this.harness = this.add.sprite(600,350,'harness').setScale(0.5);
    this.bottomharness = this.add.sprite(600,630,'bottomharness').setScale(0.45);
    this.logo = this.add.sprite(600,80,'logo').setScale(0.4);
    this.betdown = this.add.sprite(750,610,'betdown').setInteractive().setScale(0.20).setAngle(-90);
    this.betup = this.add.sprite(750,650,'betup').setInteractive().setScale(0.20).setAngle(90);
    this.play = this.add.sprite(850,630,'spin').setInteractive().setScale(0.38);
    balanceText = this.add.text(330,626, 'Balance:', { fontSize: '32px', fill: '#000' }).setText(balance);
    bettText = this.add.text(630,626, '0', { fontSize: '32px', fill: '#000' }).setText(bett);
    winText = this.add.text(500,626, '10', { fontSize: '32px', fill: '#000' }).setText(win);
    loc11 = this.add.sprite(320,210,'bar').setTexture(arr1[l1]);
    loc12 = this.add.sprite(320,350,'melons').setTexture(arr1[l2]);
    loc13 = this.add.sprite(320,480,'banana').setTexture(arr1[l3]);
    loc21 = this.add.sprite(460,210,'bar').setTexture(arr1[l1]);
    loc22 = this.add.sprite(460,350,'melons').setTexture(arr1[l2]);
    loc23 = this.add.sprite(460,480,'banana').setTexture(arr1[l3]);
    loc31 = this.add.sprite(600,210,'bar').setTexture(arr1[l1]);
    loc32 = this.add.sprite(600,350,'melons').setTexture(arr1[l2]);
    loc33 = this.add.sprite(600,480,'banana').setTexture(arr1[l3]);
    loc41 = this.add.sprite(740,210,'bar').setTexture(arr1[l1]);
    loc42 = this.add.sprite(740,350,'melons').setTexture(arr1[l2]);
    loc43 = this.add.sprite(740,480,'banana').setTexture(arr1[l3]);
    loc51 = this.add.sprite(880,210,'bar').setTexture(arr1[l1]);
    loc52 = this.add.sprite(880,350,'melons').setTexture(arr1[l2]);
    loc53 = this.add.sprite(880,480,'banana').setTexture(arr1[l3]);
    topwin = this.add.sprite(600,370,'topwin').setScale(0.5).setVisible(false);
    midwin = this.add.sprite(600,350,'midwin').setScale(0.5).setVisible(false);
    bottomwin = this.add.sprite(600,350,'bottomwin').setScale(0.5).setVisible(false);
    
};

// var health = 100;
var timeSinceLastIncrement = 0;
var timesli = 0
gameScene.update = function(){
    // console.log(loc1)
    // avoids multi click
    timeSinceLastIncrement += 0.5;
    //decrease bet
    this.betdown.on('pointerdown',async function(pointer){
        if (timeSinceLastIncrement >= 10)  {
            timeSinceLastIncrement = 0;
            if(bett<balance){
                bett += 10
            }
            bettText.setText(bett)
        }
    });
    //increase bet
    this.betup.on('pointerdown',async function(pointer){
        if (timeSinceLastIncrement >= 10)  {
            timeSinceLastIncrement = 0;
            if(bett > 0){
                bett -= 10;
            }
            bettText.setText(bett)
        }
    });
    async function blur(sp1,sp2,sp3){
        for(var i = 0; i<3; i++){
        sp1.setTexture('blur1')
        sp2.setTexture('blur1')
        sp3.setTexture('blur1')
        await sleep(80)
        sp1.setTexture('blur2')
        sp2.setTexture('blur2')
        sp3.setTexture('blur2')
        await sleep(80)
        sp1.setTexture('blur3')
        sp2.setTexture('blur3')
        sp3.setTexture('blur3')
        await sleep(80)
        sp1.setTexture('blur4')
        sp2.setTexture('blur4')
        sp3.setTexture('blur4')
        await sleep(80)
        }
    }
    this.play.on('pointerdown',async function (pointer){
        if (timeSinceLastIncrement >= 10)  
        {
            timeSinceLastIncrement = 0;
            if(balance-bett<0){
                console.log("not enought balance");
            }else{
                async function blur(sp1,sp2,sp3){
                    for(var i = 0; i<3; i++){
                        sp1.setTexture('blur1')
                        sp2.setTexture('blur1')
                        sp3.setTexture('blur1')
                        // await sleep(15)
                        sp1.setTexture('blur2')
                        sp2.setTexture('blur2')
                        sp3.setTexture('blur2')
                        await sleep(15)
                        sp1.setTexture('blur3')
                        sp2.setTexture('blur3')
                        sp3.setTexture('blur3')
                        await sleep(15)
                        sp1.setTexture('blur4')
                        sp2.setTexture('blur4')
                        sp3.setTexture('blur4')
                        await sleep(15)

                    }
                }
                async function blink(line){
                        for(var i = 0; i<16; i++){
                            line.setVisible(true)
                            await sleep(40)
                            line.setVisible(false)
                            await sleep(40)
                        }
                        
                }
                   
                   for(var i = 0 ; i <3;i++){
                    for(var j = 0; j <5; j++){
                        indices[i][j] = rng()
                    }
                   }
                   console.log(indices)
                   // reel 1 
                   blur(loc11,loc12,loc13)
                   await sleep(130)
                   loc11.setTexture(arr1[indices[0][0]])
                   loc12.setTexture(arr2[indices[1][0]])
                   loc13.setTexture(arr3[indices[2][0]])
                   //reel 2
                   blur(loc21,loc22,loc23)
                   await sleep(130)
                   loc21.setTexture(arr1[indices[0][1]])
                   loc22.setTexture(arr2[indices[1][1]])
                   loc23.setTexture(arr3[indices[2][1]])
                   //reel 3
                   blur(loc31,loc32,loc33)
                   await sleep(130)
                   loc31.setTexture(arr1[indices[0][2]])
                   loc32.setTexture(arr2[indices[1][2]])
                   loc33.setTexture(arr3[indices[2][2]])
                   //reel 4
                   blur(loc41,loc42,loc43)
                   await sleep(130)
                   loc41.setTexture(arr1[indices[0][3]])
                   loc42.setTexture(arr2[indices[1][3]])
                   loc43.setTexture(arr3[indices[2][3]])
                   //reel 5
                   blur(loc51,loc52,loc53)
                   await sleep(130)
                   loc51.setTexture(arr1[indices[0][4]])
                   loc52.setTexture(arr2[indices[1][4]])
                   loc53.setTexture(arr3[indices[1][4]])

                   //check
                   if(arr1[indices[0][0]]==arr1[indices[0][1]] && arr1[indices[0][1]] == arr1[indices[0][2]] && arr1[indices[0][2]] == arr1[indices[0][3]] && arr1[indices[0][4]] == arr1[indices[0][0]]){
                       balance += bett*8;
                       win += bett*8;
                       blink(topwin)
                   }
                   if(arr2[indices[1][0]]==arr2[indices[1][1]] && arr2[indices[1][1]] == arr2[indices[1][2]] && arr2[indices[1][2]] == arr2[indices[1][3]] && arr2[indices[1][4]] == arr2[indices[1][0]]){
                        balance += bett*10;
                        win += bett*10;
                        blink(midwin)
                        
                   }
                    if(arr3[indices[2][0]]==arr3[indices[2][1]] && arr3[indices[2][1]] == arr3[indices[2][2]] && arr3[indices[2][2]] == arr3[indices[2][3]] && arr3[indices[2][4]] == arr3[indices[2][0]]){
                        balance += bett*3;
                        win += bett*3;
                        blink(bottomwin)
                    }else{
                       balance -= bett;
                   }
                   balanceText.setText(balance);
                   winText.setText(win);
                   console.log(balance)
        }
    }
    });

};
// create config
let config = {
    type:Phaser.AUTO,
    width:1200,
    height:700,
    scene:[gameScene]
};
// create a game and pass config
let game = new Phaser.Game(config);